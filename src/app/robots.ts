import { MetadataRoute } from 'next';
import { seoConfig } from '@/lib/seo-config';

/**
 * Robots.txt configuration
 * Configure les règles d'indexation pour les moteurs de recherche
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: [
                    '/',
                    '/en/',
                    '/pl/',
                    '/projects',
                    '/contact',
                    '/mentions-legales',
                    '/politique-confidentialite',
                    '/api/og',
                    '/_next/static/',
                    '/images/',
                    '/svg/',
                    '/og/',
                ],
                disallow: [
                    '/api/contact',
                    '/api/contact-simple',
                    '/admin/',
                    '/*.json$',
                    '/*_buildManifest.js$',
                    '/*_middlewareManifest.js$',
                    '/*_ssgManifest.js$',
                    '/*.js.map$',
                ],
            },
            // Règles spécifiques pour les bots AI agressifs
            {
                userAgent: ['GPTBot', 'ChatGPT-User', 'CCBot', 'anthropic-ai', 'Google-Extended'],
                disallow: ['/'],
            },
        ],
        sitemap: `${seoConfig.baseUrl}/sitemap.xml`,
        host: seoConfig.baseUrl,
    };
}

