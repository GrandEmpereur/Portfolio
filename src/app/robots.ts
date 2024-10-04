import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',
                    '/admin/',
                    '/private/',
                    '/*.json',
                    '/*.xml',
                ],
            },
        ],
        sitemap: 'https://patrick.bartosik.fr/sitemap.xml',
        host: 'https://patrick.bartosik.fr',
    };
}
