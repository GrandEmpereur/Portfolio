import type { MetadataRoute } from 'next';
import { seoConfig } from '@/lib/seo-config';

export default function sitemap(): MetadataRoute.Sitemap {
    const { baseUrl, locales, defaultLocale } = seoConfig;

    // Pages statiques
    const staticPages = ['', '/projects'];

    // Générer les URLs pour toutes les locales
    const urls: MetadataRoute.Sitemap = [];

    staticPages.forEach((page) => {
        locales.forEach((locale) => {
            const url = locale === defaultLocale
                ? `${baseUrl}${page}`
                : `${baseUrl}/${locale}${page}`;

            // Créer les alternates pour les autres langues
            const languages: Record<string, string> = {};
            locales.forEach((lang) => {
                const altUrl = lang === defaultLocale
                    ? `${baseUrl}${page}`
                    : `${baseUrl}/${lang}${page}`;
                languages[lang] = altUrl;
            });

            urls.push({
                url,
                lastModified: new Date(),
                changeFrequency: page === '' ? 'weekly' : 'monthly',
                priority: page === '' ? 1.0 : 0.8,
                alternates: {
                    languages,
                },
            });
        });
    });

    // Dédupliquer les URLs (éviter les doublons pour la locale par défaut)
    const uniqueUrls = urls.filter((url, index, self) =>
        index === self.findIndex((u) => u.url === url.url)
    );

    return uniqueUrls;
}