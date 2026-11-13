import type { MetadataRoute } from 'next';
import { seoConfig, ogLocaleMap } from '@/lib/seo-config';
import { getPublishedProjects, hasDetailPage } from '@/lib/data/lastwork.data';

/**
 * sitemap.xml: canonical URLs only, one entry per language, each with all its hreflang alternates
 * (itself included) and x-default. Google ignores <priority> and <changefreq>, and only trusts <lastmod>
 * when it is accurate: there is no per-page modification date in the project, so none is emitted
 * rather than `new Date()` (which would change on every build and teach crawlers to ignore it).
 * @see https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
 */

// Same URL shape as the page metadata: French at the root ("/" for the homepage), en and pl prefixed.
const buildLocaleUrl = (locale: string, path: string): string => {
    const base = seoConfig.baseUrl;
    if (locale === seoConfig.defaultLocale) return `${base}${path || '/'}`;
    return `${base}/${locale}${path}`;
};

const buildLanguagesMap = (path: string): Record<string, string> => {
    const languages: Record<string, string> = {};
    for (const locale of seoConfig.locales) {
        const hreflangCode = ogLocaleMap[locale]?.replace('_', '-') ?? locale;
        languages[hreflangCode] = buildLocaleUrl(locale, path);
    }
    languages['x-default'] = buildLocaleUrl(seoConfig.defaultLocale, path);
    return languages;
};

export default function sitemap(): MetadataRoute.Sitemap {
    // Only projects with a real on-site page. Projects with an external `link` leave the site.
    const projectPaths = getPublishedProjects()
        .filter(hasDetailPage)
        .map((project) => `/projects/${project.slug}`);

    const paths = [
        '',
        '/services',
        '/projects',
        '/contact',
        ...projectPaths,
        '/mentions-legales',
        '/politique-confidentialite',
        '/politique-cookies',
        '/conditions-utilisation',
    ];

    return paths.flatMap((path) => {
        const languages = buildLanguagesMap(path);
        return seoConfig.locales.map((locale) => ({
            url: buildLocaleUrl(locale, path),
            alternates: { languages },
        }));
    });
}
