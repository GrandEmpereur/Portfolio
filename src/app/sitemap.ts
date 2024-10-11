import { MetadataRoute } from 'next';
import { projects } from '@/lib/data/portfolio';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://patrick.bartosik.fr';
    const locales = ['fr', 'en'];
    const defaultLocale = 'fr';

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

    // Générer d'abord toutes les routes en français (sans préfixe)
    staticRoutes.forEach(({ route }) => {
        sitemapEntries.push({
            url: `${baseUrl}${route}`,
            changeFrequency: 'weekly',
            priority: route === '' ? 1 : 0.8,
        });
    });

    projects.forEach(project => {
        sitemapEntries.push({
            url: `${baseUrl}/portfolio${project.links.slug}`,
            changeFrequency: 'monthly',
            priority: 0.7,
        });
    });

    // Ensuite, générer toutes les routes en anglais (avec préfixe '/en')
    staticRoutes.forEach(({ route }) => {
        sitemapEntries.push({
            url: `${baseUrl}/en${route}`,
            changeFrequency: 'weekly',
            priority: route === '' ? 0.9 : 0.7,
        });
    });

    projects.forEach(project => {
        sitemapEntries.push({
            url: `${baseUrl}/en/portfolio${project.links.slug}`,
            changeFrequency: 'monthly',
            priority: 0.6,
        });
    });

    return sitemapEntries;
}
