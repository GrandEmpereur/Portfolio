/**
 * SEO Configuration centralisée
 * Configuration globale pour le SEO du site portfolio
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 * @see https://nextjs.org/learn/seo
 */
export const seoConfig = {
    baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://patrick.bartosik.fr',
    siteName: 'Patrick Bartosik - Full Stack Developer',

    // Application metadata
    applicationName: 'Patrick Bartosik Portfolio',
    category: 'technology',

    // Theme configuration
    themeColor: '#000000',
    backgroundColor: '#000000',

    author: {
        name: 'Patrick Bartosik',
        email: 'contact@bartosik.fr',
        jobTitle: 'Full Stack Developer',
        url: 'https://patrick.bartosik.fr',
        twitter: '@patrickbartosik',
    },
    social: {
        github: 'https://github.com/GrandEmpereur',
        linkedin: 'https://www.linkedin.com/in/patrick-bartosik',
        instagram: 'https://www.instagram.com/empereur.patrick/',
    },
    defaultLocale: 'fr' as const,
    locales: ['en', 'fr', 'pl'] as const,
    openGraph: {
        image: '/og/og-image.png',
        imageWidth: 1200,
        imageHeight: 630,
        imageType: 'image/png',
    },

    // Apple Web App configuration
    appleWebApp: {
        capable: true,
        statusBarStyle: 'black-translucent' as const,
        title: 'Patrick Bartosik',
    },

    // Icons configuration (static files in public/)
    icons: {
        icon: '/favicon.ico',
        apple: '/images/Logo.png',
        shortcut: '/favicon.ico',
    },

    // Verification tokens
    verification: {
        google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
    },
} as const;

export type Locale = typeof seoConfig.locales[number];

