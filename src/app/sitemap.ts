import { MetadataRoute } from 'next';

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://patrick.bartosik.fr';
    const locales = ['fr', 'en']; // Ajoutez toutes les langues supportées

    // Pages statiques principales
    const mainPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly' as ChangeFrequency,
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as ChangeFrequency,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/projects`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as ChangeFrequency,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as ChangeFrequency,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/services`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as ChangeFrequency,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/skills`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as ChangeFrequency,
            priority: 0.7,
        },
    ];

    // Générer les URLs multilingues
    const localizedUrls = mainPages.flatMap(page => {
        return locales.map(locale => ({
            url: page.url === baseUrl ? `${baseUrl}/${locale}` : `${baseUrl}/${locale}${page.url.replace(baseUrl, '')}`,
            lastModified: page.lastModified,
            changeFrequency: page.changeFrequency,
            priority: page.priority,
        }));
    });

    // Projets spécifiques (à adapter selon vos projets réels)
    const projects = [
        'project-1',
        'project-2',
        'project-3',
    ].flatMap(project => {
        return locales.map(locale => ({
            url: `${baseUrl}/${locale}/projects/${project}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as ChangeFrequency,
            priority: 0.7,
        }));
    });

    return [...mainPages, ...localizedUrls, ...projects];
}
