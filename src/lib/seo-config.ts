/**
 * SEO Configuration centralisée
 * Configuration globale pour le SEO du site portfolio
 * @see .cursor/rules/seo.md pour les best practices
 */
export const seoConfig = {
    baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://patrick.bartosik.fr',
    siteName: 'Patrick Bartosik - Full Stack Developer',
    author: {
        name: 'Patrick Bartosik',
        email: 'contact@bartosik.fr',
        jobTitle: 'Full Stack Developer',
        url: 'https://patrick.bartosik.fr',
    },
    social: {
        github: 'https://github.com/GrandEmpereur',
        linkedin: 'https://www.linkedin.com/in/patrick-bartosik',
        instagram: 'https://www.instagram.com/empereur.patrick/',
    },
    defaultLocale: 'fr' as const,
    locales: ['en', 'fr', 'pl'] as const,
    openGraph: {
        image: '/api/og',
        imageWidth: 1200,
        imageHeight: 630,
        imageType: 'image/png',
    },
    verification: {
        google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
    },
} as const;

export type Locale = typeof seoConfig.locales[number];

