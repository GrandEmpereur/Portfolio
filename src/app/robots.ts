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
                    '/_next/',
                    '/404',
                    '/500',
                ],
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: [
                    '/api/',
                    '/admin/',
                    '/private/',
                ],
            },
            {
                userAgent: 'Bingbot',
                allow: '/',
                disallow: [
                    '/api/',
                    '/admin/',
                    '/private/',
                ],
            },
        ],
        sitemap: 'https://patrick.bartosik.fr/sitemap.xml',
        host: 'https://patrick.bartosik.fr',
    };
}
