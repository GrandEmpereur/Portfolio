import type { MetadataRoute } from 'next';
import { seoConfig } from '@/lib/seo-config';

/**
 * Sitemap configuration
 * Génère le sitemap.xml pour l'indexation des pages
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 * @see .cursor/rules/seo.md pour les best practices
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const { baseUrl, locales, defaultLocale } = seoConfig;

    // Date de dernière modification (à ajuster selon vos besoins)
    const currentDate = new Date();
    const lastModifiedHome = new Date('2025-11-06'); // Date de dernière mise à jour majeure
    const lastModifiedProjects = new Date('2025-11-06');
    const lastModifiedContact = new Date('2025-11-01');
    const lastModifiedLegal = new Date('2025-01-01');

    // Pages statiques principales avec leurs configurations SEO
    const staticPages: Array<{
        path: string;
        priority: number;
        changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
        lastModified: Date;
    }> = [
            {
                path: '',
                priority: 1.0,
                changeFrequency: 'weekly',
                lastModified: lastModifiedHome,
            },
            {
                path: '/projects',
                priority: 0.9,
                changeFrequency: 'weekly',
                lastModified: lastModifiedProjects,
            },
            {
                path: '/contact',
                priority: 0.8,
                changeFrequency: 'monthly',
                lastModified: lastModifiedContact,
            },
        ];

    // Pages légales (FR uniquement)
    const legalPagesFr: Array<{
        path: string;
        priority: number;
        changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
        lastModified: Date;
    }> = [
            {
                path: '/mentions-legales',
                priority: 0.3,
                changeFrequency: 'yearly',
                lastModified: lastModifiedLegal,
            },
            {
                path: '/politique-confidentialite',
                priority: 0.3,
                changeFrequency: 'yearly',
                lastModified: lastModifiedLegal,
            },
        ];

    // Générer les URLs pour toutes les locales
    const urls: MetadataRoute.Sitemap = [];

    // Pages principales multilingues
    staticPages.forEach((page) => {
        locales.forEach((locale) => {
            const url = locale === defaultLocale
                ? `${baseUrl}${page.path}`
                : `${baseUrl}/${locale}${page.path}`;

            // Créer les alternates pour les autres langues
            const languages: Record<string, string> = {};
            locales.forEach((lang) => {
                const altUrl = lang === defaultLocale
                    ? `${baseUrl}${page.path}`
                    : `${baseUrl}/${lang}${page.path}`;
                languages[lang] = altUrl;
            });

            urls.push({
                url,
                lastModified: page.lastModified,
                changeFrequency: page.changeFrequency,
                priority: page.priority,
                alternates: {
                    languages,
                },
            });
        });
    });

    // Pages légales (FR uniquement)
    legalPagesFr.forEach((page) => {
        urls.push({
            url: `${baseUrl}${page.path}`,
            lastModified: page.lastModified,
            changeFrequency: page.changeFrequency,
            priority: page.priority,
        });
    });

    // Dédupliquer les URLs (éviter les doublons pour la locale par défaut)
    const uniqueUrls = urls.filter((url, index, self) =>
        index === self.findIndex((u) => u.url === url.url)
    );

    return uniqueUrls;
}