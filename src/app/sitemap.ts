import { MetadataRoute } from 'next';
import { projects } from '@/lib/data/portfolio';

function parseCustomDate(dateString: string): Date {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
}

function getSafeDate(dateString: string): Date {
    try {
        return parseCustomDate(dateString);
    } catch {
        return new Date();
    }
}

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://patrick.bartosik.fr';
    const lastModified = new Date().toISOString();
    const locales = ['fr', 'en'];

    const staticRoutes = [
        { route: '' },
        { route: '/about' },
        { route: '/contact' },
        { route: '/portfolio' },
        { route: '/services' },
        { route: '/terms' },
        { route: '/privacy' },
        { route: '/gtu' },
    ];

    const sitemapEntries: MetadataRoute.Sitemap = [];

    // Générer les routes statiques pour chaque langue
    locales.forEach(locale => {
        staticRoutes.forEach(({ route }) => {
            const localizedRoute = `/${locale}${route}`;
            sitemapEntries.push({
                url: `${baseUrl}${localizedRoute}`,
                lastModified,
                changeFrequency: 'weekly',
                priority: route === '' ? 1 : 0.8,
            });
        });
    });

    // Générer les routes pour les projets dans chaque langue
    projects.forEach(project => {
        locales.forEach(locale => {
            const localizedProjectRoute = `/${locale}/portfolio${project.slug}`;
            sitemapEntries.push({
                url: `${baseUrl}${localizedProjectRoute}`,
                lastModified: getSafeDate(project.lastModified).toISOString(),
                changeFrequency: 'monthly',
                priority: 0.7,
            });
        });
    });

    return sitemapEntries;
}
