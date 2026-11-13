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

const baseUrl = (process.argv[2] ?? 'http://localhost:3000').replace(/\/+$/, '');

// Each language file is `as const`, so its type holds the literal strings: widen to plain strings here.
type FaqCopy = { faq: Record<string, string | { question: string; answer: string }> };
const HOME_ENDS: Record<Locale, FaqCopy> = { fr: homeEndFr, en: homeEndEn, pl: homeEndPl };
const LEGAL_PATHS = ['/mentions-legales', '/politique-confidentialite', '/politique-cookies', '/conditions-utilisation'] as const;
const OTHER_PAGES = ['/contact', ...LEGAL_PATHS] as const;
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
  check(`${label}: "Ariane" absent`, !/ariane/i.test(body));
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

const checkSitemap = async (): Promise<void> => {
  const page = await fetchPage('/sitemap.xml');
  if (!page) return;
  check('/sitemap.xml: status 200', page.status === 200, `got ${page.status}`);
  if (page.status !== 200) return;

  const locs = [...page.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  for (const path of LEGAL_PATHS) {
    for (const locale of LOCALES) {
      const suffix = localePath(locale, path);
      check(`/sitemap.xml: ${suffix} present`, locs.some((loc) => loc.endsWith(suffix)));
    }
  }
  check('/sitemap.xml: "ariane" absent', !/ariane/i.test(page.body));
};

const main = async (): Promise<void> => {
  console.log(`seo-smoke against ${baseUrl}`);
  for (const locale of LOCALES) await checkHomepage(locale);
  for (const path of OTHER_PAGES) await checkOtherPage(path);
  await checkSitemap();

  for (const failure of failures) console.log(`FAIL ${failure}`);
  console.log(failures.length === 0 ? `OK ${total} checks passed` : `${failures.length} failed out of ${total} checks`);
  process.exit(failures.length === 0 ? 0 : 1);
};

void main();
