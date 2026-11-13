import type { MetadataRoute } from 'next';
import { seoConfig, ogLocaleMap } from '@/lib/seo-config';
import { getPublishedProjects, hasDetailPage } from '@/lib/data/lastwork.data';

type ChangeFreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

type PageEntry = {
    path: string;
    priority: number;
    changeFrequency: ChangeFreq;
};

const buildLocaleUrl = (locale: string, path: string): string => {
    const base = seoConfig.baseUrl;
    return locale === seoConfig.defaultLocale ? `${base}${path}` : `${base}/${locale}${path}`;
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
    const lastModified = new Date();

    // Project detail pages: only published projects that have a real on-site page.
    // Projects with an external `link` leave the site, so they stay out of the sitemap.
    const projectPages: PageEntry[] = getPublishedProjects()
        .filter(hasDetailPage)
        .map((project) => ({
            path: `/projects/${project.slug}`,
            priority: 0.7,
            changeFrequency: 'monthly' as ChangeFreq,
        }));

    const multilingualPages: PageEntry[] = [
        { path: '', priority: 1.0, changeFrequency: 'weekly' },
        { path: '/projects', priority: 0.9, changeFrequency: 'weekly' },
        { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
        ...projectPages,
        { path: '/mentions-legales', priority: 0.3, changeFrequency: 'yearly' },
        { path: '/politique-confidentialite', priority: 0.3, changeFrequency: 'yearly' },
        { path: '/politique-cookies', priority: 0.3, changeFrequency: 'yearly' },
        { path: '/conditions-utilisation', priority: 0.3, changeFrequency: 'yearly' },
    ];

    const urls: MetadataRoute.Sitemap = [];

    for (const page of multilingualPages) {
        const languages = buildLanguagesMap(page.path);
        for (const locale of seoConfig.locales) {
            urls.push({
                url: buildLocaleUrl(locale, page.path),
                lastModified,
                changeFrequency: page.changeFrequency,
                priority: page.priority,
                alternates: { languages },
            });
        }
    }

    return urls;
}
