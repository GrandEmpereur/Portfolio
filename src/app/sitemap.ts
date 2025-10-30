import type { MetadataRoute } from 'next';
import { seoConfig } from '@/lib/seo-config';

export default function sitemap(): MetadataRoute.Sitemap {
    const { baseUrl, locales, defaultLocale } = seoConfig;

    // Pages statiques principales
    const staticPages = ['', '/projects', '/contact'];

    // Pages légales (FR uniquement pour l'instant)
    const legalPagesFr = ['/mentions-legales', '/politique-confidentialite'];

    // Générer les URLs pour toutes les locales
    const urls: MetadataRoute.Sitemap = [];

    // Pages principales multilingues
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
                priority: page === '' ? 1.0 : page === '/contact' ? 0.9 : 0.8,
                alternates: {
                    languages,
                },
            });
        });
    });

    // Pages légales (FR uniquement)
    legalPagesFr.forEach((page) => {
        urls.push({
            url: `${baseUrl}${page}`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        });
    });

    // Dédupliquer les URLs (éviter les doublons pour la locale par défaut)
    const uniqueUrls = urls.filter((url, index, self) =>
        index === self.findIndex((u) => u.url === url.url)
    );

    return uniqueUrls;
}