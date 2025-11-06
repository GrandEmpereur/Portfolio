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
                    '/api/og', // OG image generation
                ],
                disallow: [
                    '/api/*',
                    '/_next/',
                    '/admin/',
                    '/*.json$',
                    '/*_buildManifest.js$',
                    '/*_middlewareManifest.js$',
                    '/*_ssgManifest.js$',
                    '/*.js.map$',
                ],
            },
            // Règles spécifiques pour les bots agressifs
            {
                userAgent: ['GPTBot', 'ChatGPT-User', 'CCBot', 'anthropic-ai'],
                disallow: ['/'],
            },
        ],
        sitemap: `${seoConfig.baseUrl}/sitemap.xml`,
        host: seoConfig.baseUrl,
    };
}

