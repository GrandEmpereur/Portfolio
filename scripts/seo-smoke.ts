/**
 * SEO smoke check against a running server (dev or production build).
 *
 *   bun --no-env-file scripts/seo-smoke.ts [baseUrl]      (default http://localhost:3000)
 *
 * Reads the expected content (projects, services, FAQ) from the project modules, then checks the
 * HTML that is actually served. Exit code 0 when every check passes, 1 otherwise.
 */
import { getAgencyProjects, getFeaturedProjects, lastwork } from '../src/lib/data/lastwork.data';
import { services } from '../src/lib/data/services.data';
import { HOME_FAQ_IDS } from '../src/components/home/home-faq';
import { homeEnd as homeEndFr } from '../src/locales/fr/home-end';
import { homeEnd as homeEndEn } from '../src/locales/en/home-end';
import { homeEnd as homeEndPl } from '../src/locales/pl/home-end';
import { LOCALES, localePath, type Locale } from '../src/lib/locale-path';
import { seoConfig } from '../src/lib/seo-config';

const baseUrl = (process.argv[2] ?? 'http://localhost:3000').replace(/\/+$/, '');

// Each language file is `as const`, so its type holds the literal strings: widen to plain strings here.
type FaqCopy = { faq: Record<string, string | { question: string; answer: string }> };
const HOME_ENDS: Record<Locale, FaqCopy> = { fr: homeEndFr, en: homeEndEn, pl: homeEndPl };
const LEGAL_PATHS = ['/mentions-legales', '/politique-confidentialite', '/politique-cookies', '/conditions-utilisation'] as const;
const OTHER_PAGES = ['/services', '/contact', ...LEGAL_PATHS] as const;
const NAME = 'Patrick Bartosik';
const MAX_TITLE = 60;

const failures: string[] = [];
let total = 0;

const check = (label: string, ok: boolean, detail = ''): void => {
  total += 1;
  if (!ok) failures.push(detail ? `${label} (${detail})` : label);
};

const ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };

const decodeEntities = (value: string): string =>
  value
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec: string) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&([a-z]+);/gi, (match, name: string) => ENTITIES[name.toLowerCase()] ?? match);

const normalize = (value: string): string => decodeEntities(value).replace(/\s+/g, ' ').trim();

const stripTags = (html: string): string =>
  normalize(html.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, ' ').replace(/<[^>]+>/g, ' '));

const attributesOf = (tag: string): Record<string, string> => {
  const attrs: Record<string, string> = {};
  for (const match of tag.matchAll(/([a-zA-Z:-]+)\s*=\s*"([^"]*)"/g)) attrs[match[1].toLowerCase()] = match[2];
  return attrs;
};

const metaContent = (html: string, name: string): string | null => {
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    const attrs = attributesOf(match[0]);
    if (attrs.name === name && attrs.content !== undefined) return normalize(attrs.content);
  }
  return null;
};

const fetchPage = async (path: string): Promise<{ status: number; body: string } | null> => {
  try {
    const response = await fetch(`${baseUrl}${path || '/'}`, { headers: { 'user-agent': 'seo-smoke' } });
    return { status: response.status, body: await response.text() };
  } catch (error) {
    check(`${path || '/'} reachable`, false, error instanceof Error ? error.message : 'fetch failed');
    return null;
  }
};

/** Counts non-empty <h1> elements: [total, nonEmpty]. */
const h1Count = (html: string): { total: number; filled: number } => {
  const found = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
  return { total: found.length, filled: found.filter((m) => stripTags(m[1]).length > 0).length };
};

// What the homepage renders: featured projects and the agency list. Unpublished ones are checked for absence.
const displayedProjects = [...getFeaturedProjects(), ...getAgencyProjects()];
const unpublishedTitles = lastwork.filter((project) => project.published === false).map((project) => project.title);

const checkHomepage = async (locale: Locale): Promise<void> => {
  const path = localePath(locale, '/');
  const label = path;
  const page = await fetchPage(path);
  if (!page) return;
  const { status, body } = page;

  check(`${label}: status 200`, status === 200, `got ${status}`);
  if (status !== 200) return;

  const h1 = h1Count(body);
  check(`${label}: exactly one <h1>`, h1.total === 1, `found ${h1.total}`);
  check(`${label}: <h1> not empty`, h1.filled >= 1);

  const text = stripTags(body);
  for (const project of displayedProjects) {
    // The homepage shows the short name: "Odaje (ex M.Moustache)" in the data is listed as "Odaje".
    const shortTitle = project.title.split(' (')[0];
    check(`${label}: project "${shortTitle}" present`, text.includes(normalize(shortTitle)));
  }
  for (const service of services) {
    check(`${label}: service "${service.title[locale]}" present`, text.includes(normalize(service.title[locale])));
  }
  for (const id of HOME_FAQ_IDS) {
    const entry = HOME_ENDS[locale].faq[id];
    const question = typeof entry === 'string' ? entry : entry.question;
    check(`${label}: FAQ question ${id} present`, text.includes(normalize(question)), question);
  }

  for (const title of unpublishedTitles) {
    check(`${label}: unpublished "${title}" absent`, !body.toLowerCase().includes(title.toLowerCase()));
  }
  check(`${label}: no "€"`, !body.includes('€'));

  const alternates = [...body.matchAll(/<link\b[^>]*>/gi)]
    .map((m) => attributesOf(m[0]))
    .filter((attrs) => attrs.rel === 'alternate' && attrs.hreflang);
  check(`${label}: four hreflang alternates`, alternates.length === 4, `found ${alternates.length}`);

  const scripts = [...body.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  check(`${label}: has JSON-LD`, scripts.length > 0);
  scripts.forEach((script, index) => {
    try {
      JSON.parse(script[1]);
      check(`${label}: JSON-LD #${index + 1} is valid JSON`, true);
    } catch {
      check(`${label}: JSON-LD #${index + 1} is valid JSON`, false);
    }
    check(`${label}: JSON-LD #${index + 1} has no priceRange`, !script[1].includes('priceRange'));
  });

  const title = normalize(body.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? '');
  const description = metaContent(body, 'description') ?? '';
  check(`${label}: <title> present`, title.length > 0);
  check(`${label}: <title> at most ${MAX_TITLE} characters`, title.length <= MAX_TITLE, `${title.length}: ${title}`);
  check(`${label}: <title> has "${NAME}" once`, title.split(NAME).length - 1 === 1, title);
  check(`${label}: <title> has no Shopify or e-commerce`, !/shopify|e-?commerce/i.test(title), title);
  check(`${label}: description present`, description.length > 0);
  check(`${label}: description has no Shopify or e-commerce`, !/shopify|e-?commerce/i.test(description), description);
};

const checkOtherPage = async (path: string): Promise<void> => {
  const page = await fetchPage(path);
  if (!page) return;
  check(`${path}: status 200`, page.status === 200, `got ${page.status}`);
  if (page.status !== 200) return;
  const h1 = h1Count(page.body);
  check(`${path}: exactly one <h1>`, h1.total === 1, `found ${h1.total}`);
};

/** The services page: one anchored section per service, in every language, a short title and no price. */
const checkServicesPage = async (locale: Locale): Promise<void> => {
  const path = localePath(locale, '/services');
  const page = await fetchPage(path);
  if (!page) return;
  const { status, body } = page;
  check(`${path}: status 200`, status === 200, `got ${status}`);
  if (status !== 200) return;

  const h1 = h1Count(body);
  check(`${path}: exactly one <h1>`, h1.total === 1, `found ${h1.total}`);
  check(`${path}: <h1> not empty`, h1.filled >= 1);

  const text = stripTags(body);
  for (const service of services) {
    check(`${path}: section #${service.id}`, body.includes(`id="${service.id}"`));
    check(`${path}: service "${service.title[locale]}" present`, text.includes(normalize(service.title[locale])));
  }
  check(`${path}: no "€"`, !body.includes('€'));

  const title = normalize(body.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? '');
  check(`${path}: <title> at most ${MAX_TITLE} characters`, title.length <= MAX_TITLE, `${title.length}: ${title}`);
  check(`${path}: <title> has "${NAME}" once`, title.split(NAME).length - 1 === 1, title);
  check(`${path}: description present`, (metaContent(body, 'description') ?? '').length > 0);

  const scripts = [...body.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  check(`${path}: has JSON-LD`, scripts.length > 0);
  scripts.forEach((script, index) => {
    try {
      JSON.parse(script[1]);
      check(`${path}: JSON-LD #${index + 1} is valid JSON`, true);
    } catch {
      check(`${path}: JSON-LD #${index + 1} is valid JSON`, false);
    }
    check(`${path}: JSON-LD #${index + 1} has no price`, !/"price(Range|Currency)?"|"offers"/.test(script[1]));
  });
};

/** Path and query of a URL, so production URLs and tested-host URLs compare equal ("" becomes "/"). */
const pathOf = (url: string): string => {
  const parsed = new URL(url, baseUrl);
  return `${parsed.pathname || '/'}${parsed.search}`;
};

/** A production URL rewritten onto the tested host. */
const rebase = (url: string): string => `${baseUrl}${pathOf(url)}`;

const FORM_ROUTES = ['/api/contact', '/api/contact-simple', '/api/contact-source'] as const;
const OG_IMAGE = seoConfig.openGraph.image;

/** The Open Graph image is a static file: it must be served as a PNG. */
const checkOgImage = async (): Promise<void> => {
  try {
    const response = await fetch(`${baseUrl}${OG_IMAGE}`, { headers: { 'user-agent': 'seo-smoke' } });
    const type = response.headers.get('content-type') ?? '';
    check(`${OG_IMAGE}: status 200`, response.status === 200, `got ${response.status}`);
    check(`${OG_IMAGE}: served as image/png`, type.startsWith('image/png'), `got "${type}"`);
  } catch (error) {
    check(`${OG_IMAGE} reachable`, false, error instanceof Error ? error.message : 'fetch failed');
  }
};

/** Disallow rules of the `User-agent: *` group of a robots.txt body (comments stripped, groups merged). */
const wildcardDisallows = (robots: string): string[] => {
  const disallows: string[] = [];
  let inGroup = false;
  let previousWasAgent = false;
  for (const rawLine of robots.split(/\r?\n/)) {
    const line = rawLine.replace(/#.*$/, '').trim();
    if (!line) continue;
    const separator = line.indexOf(':');
    if (separator === -1) continue;
    const field = line.slice(0, separator).trim().toLowerCase();
    const value = line.slice(separator + 1).trim();
    if (field === 'user-agent') {
      // Consecutive user-agent lines share one group; a user-agent after rules starts a new group.
      inGroup = previousWasAgent ? inGroup || value === '*' : value === '*';
      previousWasAgent = true;
      continue;
    }
    previousWasAgent = false;
    if (field === 'disallow' && inGroup && value) disallows.push(value);
  }
  return disallows;
};

/** True when a robots.txt Disallow value (prefix match, "*" and "$" wildcards) blocks the path. */
const blocks = (rule: string, path: string): boolean => {
  // Escape regex metacharacters except "*" and a trailing "$", which robots.txt gives a meaning.
  const pattern = rule.replace(/[.+?^{}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*');
  return new RegExp(`^${pattern}`).test(path);
};

const checkRobots = async (): Promise<void> => {
  const page = await fetchPage('/robots.txt');
  if (!page) return;
  check('/robots.txt: status 200', page.status === 200, `got ${page.status}`);
  if (page.status !== 200) return;

  check('/robots.txt: declares a Sitemap', /^\s*sitemap:\s*\S+\/sitemap\.xml\s*$/im.test(page.body));
  const disallows = wildcardDisallows(page.body);
  check('/robots.txt: "*" group does not block "/"', !disallows.some((rule) => blocks(rule, '/')));
  check('/robots.txt: "*" group does not block a page', !disallows.some((rule) => blocks(rule, '/projects')));
  check(`/robots.txt: "*" group does not block ${OG_IMAGE}`, !disallows.some((rule) => blocks(rule, OG_IMAGE)));
  for (const route of FORM_ROUTES) {
    check(`/robots.txt: "*" group blocks ${route}`, disallows.some((rule) => blocks(rule, route)));
  }
};

/** Absolute links of a markdown body that point at the site itself, as paths. */
const internalLinkPaths = (markdown: string): string[] => {
  const siteOrigin = new URL(baseUrl).origin;
  const productionOrigin = new URL(seoConfig.baseUrl).origin;
  const paths = new Set<string>();
  for (const match of markdown.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)) {
    const url = new URL(match[1]);
    if (url.origin === siteOrigin || url.origin === productionOrigin) paths.add(pathOf(match[1]));
  }
  return [...paths];
};

const checkLlms = async (sitemapPaths: Set<string>): Promise<void> => {
  const page = await fetchPage('/llms.txt');
  if (!page) return;
  check('/llms.txt: status 200', page.status === 200, `got ${page.status}`);
  if (page.status !== 200) return;

  check('/llms.txt: starts with an H1', /^﻿?# \S/.test(page.body), page.body.slice(0, 40));
  check('/llms.txt: no "€"', !page.body.includes('€'));
  check('/llms.txt: no "Shopify"', !/shopify/i.test(page.body));

  for (const path of internalLinkPaths(page.body)) {
    if (sitemapPaths.has(path)) {
      check(`/llms.txt: ${path} in the sitemap`, true);
      continue;
    }
    const target = await fetchPage(path);
    check(`/llms.txt: ${path} in the sitemap or answers 200`, target?.status === 200, `got ${target?.status ?? 'no response'}`);
  }
};

const canonicalOf = (html: string): string | null => {
  for (const match of html.matchAll(/<link\b[^>]*>/gi)) {
    const attrs = attributesOf(match[0]);
    if (attrs.rel === 'canonical' && attrs.href) return attrs.href;
  }
  return null;
};

/** Returns the sitemap paths (production host swapped for the tested host) so other checks can reuse them. */
const checkSitemap = async (): Promise<Set<string>> => {
  const sitemapPaths = new Set<string>();
  const page = await fetchPage('/sitemap.xml');
  if (!page) return sitemapPaths;
  check('/sitemap.xml: status 200', page.status === 200, `got ${page.status}`);
  if (page.status !== 200) return sitemapPaths;

  const entries = [...page.body.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
  const locs = entries.map((entry) => entry.match(/<loc>([^<]+)<\/loc>/)?.[1] ?? '');
  check('/sitemap.xml: has entries', locs.length > 0);
  for (const loc of locs) sitemapPaths.add(pathOf(loc));

  for (const path of LEGAL_PATHS) {
    for (const locale of LOCALES) {
      const suffix = localePath(locale, path);
      check(`/sitemap.xml: ${suffix} present`, locs.some((loc) => loc.endsWith(suffix)));
    }
  }
  for (const project of lastwork.filter((item) => item.published === false)) {
    check(`/sitemap.xml: unpublished "${project.slug}" absent`, !page.body.includes(`/projects/${project.slug}`));
  }
  check('/sitemap.xml: no /fr/ URL', ![...sitemapPaths].some((path) => path === '/fr' || path.startsWith('/fr/')));
  check('/sitemap.xml: no API URL', ![...sitemapPaths].some((path) => path.startsWith('/api/')));

  // hreflang: every entry lists all its alternates, itself and x-default included.
  entries.forEach((entry, index) => {
    const loc = locs[index];
    const hrefs = [...entry.matchAll(/<xhtml:link\b[^>]*>/g)].map((m) => attributesOf(m[0]));
    const self = hrefs.some((attrs) => attrs.href && pathOf(attrs.href) === pathOf(loc));
    check(`/sitemap.xml: ${pathOf(loc)} lists itself in its hreflang alternates`, self);
    check(
      `/sitemap.xml: ${pathOf(loc)} has x-default`,
      hrefs.some((attrs) => attrs.hreflang === 'x-default'),
    );
  });

  // Every URL answers 200 and its canonical link is the URL itself.
  for (const loc of locs) {
    const target = await fetchPage(pathOf(loc));
    if (!target) continue;
    const label = `/sitemap.xml: ${pathOf(loc)}`;
    check(`${label} answers 200`, target.status === 200, `got ${target.status}`);
    if (target.status !== 200) continue;
    const canonical = canonicalOf(target.body);
    check(
      `${label} canonical is itself`,
      canonical !== null && rebase(canonical) === rebase(loc),
      `canonical ${canonical ?? 'missing'}`,
    );
  }
  return sitemapPaths;
};

/** A missing page must answer 404 with a <title> (Next.js adds the noindex itself). */
const checkNotFound = async (): Promise<void> => {
  for (const path of ['/seo-smoke-missing-page', '/en/seo-smoke-missing-page']) {
    const page = await fetchPage(path);
    if (!page) continue;
    check(`${path}: status 404`, page.status === 404, `got ${page.status}`);
    const title = normalize(page.body.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? '');
    check(`${path}: 404 page has a <title>`, title.length > 0);
  }
};

const main = async (): Promise<void> => {
  console.log(`seo-smoke against ${baseUrl}`);
  for (const locale of LOCALES) await checkHomepage(locale);
  for (const path of OTHER_PAGES) await checkOtherPage(path);
  for (const locale of LOCALES) await checkServicesPage(locale);
  await checkRobots();
  await checkOgImage();
  const sitemapPaths = await checkSitemap();
  await checkLlms(sitemapPaths);
  await checkNotFound();

  for (const failure of failures) console.log(`FAIL ${failure}`);
  console.log(failures.length === 0 ? `OK ${total} checks passed` : `${failures.length} failed out of ${total} checks`);
  process.exit(failures.length === 0 ? 0 : 1);
};

void main();
