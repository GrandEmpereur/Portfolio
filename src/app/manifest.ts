import type { MetadataRoute } from 'next';
import { seoConfig } from '@/lib/seo-config';

/**
 * Web App Manifest for PWA support
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/manifest
 * @see https://developer.mozilla.org/en-US/docs/Web/Manifest
 */
export default function manifest(): MetadataRoute.Manifest {
    return {
        name: seoConfig.siteName,
        short_name: 'Patrick B.',
        description: 'Full Stack Developer specializing in React, Next.js, and modern web applications',
        start_url: '/',
        display: 'standalone',
        background_color: seoConfig.backgroundColor,
        theme_color: seoConfig.themeColor,
        orientation: 'portrait-primary',
        categories: ['technology', 'development', 'portfolio'],
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
            {
                src: '/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'maskable',
            },
            {
                src: '/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any',
            },
            {
                src: '/apple-icon.png',
                sizes: '180x180',
                type: 'image/png',
            },
        ],
    };
}
