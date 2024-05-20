import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/private/'], // Disallow private directory for all user agents
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: '/private/', // Disallow private directory for Googlebot as well
            },
            {
                userAgent: 'Bingbot',
                disallow: '/',
            },
            {
                userAgent: 'Applebot',
                disallow: '/',
            },
        ],
        sitemap: 'https://patrick.bartosik.fr/sitemap.xml', // Ensure this URL is correct and accessible
        host: 'https://patrick.bartosik.fr', // Optional: Specify your preferred domain
    };
}
