import { MetadataRoute } from 'next';
import { seoConfig } from '@/lib/seo-config';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: ['/', '/api/og'],
                disallow: ['/api/*', '/_next/', '/admin/'],
            },
        ],
        sitemap: `${seoConfig.baseUrl}/sitemap.xml`,
        host: seoConfig.baseUrl,
    };
}

