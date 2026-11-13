/**
 * SEO Configuration centralisée
 * Configuration globale pour le SEO du site portfolio
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 * @see https://nextjs.org/learn/seo
 */
export const seoConfig = {
    baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://patrick.bartosik.fr',
    siteName: 'Patrick Bartosik',

    // Application metadata
    applicationName: 'Patrick Bartosik Portfolio',
    category: 'technology',

    // Theme configuration
    themeColor: '#0B0B0A',
    backgroundColor: '#0B0B0A',

    author: {
        name: 'Patrick Bartosik',
        email: 'contact@bartosik.fr',
        jobTitle: 'AI Engineer & Full Stack Developer',
        url: 'https://patrick.bartosik.fr',
    },
    social: {
        github: 'https://github.com/GrandEmpereur',
        linkedin: 'https://www.linkedin.com/in/patrick-bartosik',
        instagram: 'https://www.instagram.com/agencepatrickai/',
    },
    defaultLocale: 'fr' as const,
    locales: ['en', 'fr', 'pl'] as const,
    openGraph: {
        // Static file. Render it again after a design change: bun --no-env-file scripts/render-og.ts
        image: '/og/og-image.png',
        imageWidth: 1200,
        imageHeight: 630,
        imageType: 'image/png',
    },

    // Icons configuration (static files in public/)
    icons: {
        icon: '/favicon.ico',
        apple: '/images/Logo.png',
        shortcut: '/favicon.ico',
    },
} as const;

export const ogLocaleMap: Record<string, string> = {
    fr: 'fr_FR',
    en: 'en_US',
    pl: 'pl_PL',
};

export type Locale = typeof seoConfig.locales[number];

