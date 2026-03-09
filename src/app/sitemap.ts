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

    // Date de dernière modification dynamique (reflète la date du dernier déploiement)
    const lastModified = new Date();

    // Pages statiques principales avec leurs configurations SEO
    const staticPages: Array<{
        path: string;
        priority: number;
        changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    }> = [
            {
                path: '',
                priority: 1.0,
                changeFrequency: 'weekly',
            },
            {
                path: '/projects',
                priority: 0.9,
                changeFrequency: 'weekly',
            },
            {
                path: '/contact',
                priority: 0.8,
                changeFrequency: 'monthly',
            },
        ];

    // Pages légales (FR uniquement — pas d'alternates en/pl)
    const legalPagesFr: Array<{
        path: string;
        priority: number;
        changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    }> = [
            {
                path: '/mentions-legales',
                priority: 0.3,
                changeFrequency: 'yearly',
            },
            {
                path: '/politique-confidentialite',
                priority: 0.3,
                changeFrequency: 'yearly',
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
                lastModified,
                changeFrequency: page.changeFrequency,
                priority: page.priority,
                alternates: {
                    languages,
                },
            });
        });
    });

    // Pages légales (FR uniquement avec hreflang fr + x-default)
    legalPagesFr.forEach((page) => {
        const frUrl = `${baseUrl}${page.path}`;
        urls.push({
            url: frUrl,
            lastModified,
            changeFrequency: page.changeFrequency,
            priority: page.priority,
            alternates: {
                languages: {
                    fr: frUrl,
                    'x-default': frUrl,
                },
            },
        });
    });

    // Dédupliquer les URLs (éviter les doublons pour la locale par défaut)
    const uniqueUrls = urls.filter((url, index, self) =>
        index === self.findIndex((u) => u.url === url.url)
    );

    return uniqueUrls;
}