// SEO Configuration centralisée
export const seoConfig = {
    baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://patrick.bartosik.fr',
    siteName: 'Bartosik Patrick',
    author: {
        name: 'Bartosik Patrick',
        email: 'contact@bartosik.fr',
        jobTitle: 'Full Stack Developer',
        url: 'https://patrick.bartosik.fr',
    },
    social: {
        github: 'https://github.com/GrandEmpereur',
        linkedin: 'https://www.linkedin.com/in/patrick-bartosik',
    },
    defaultLocale: 'fr',
    locales: ['en', 'fr', 'pl'],
    openGraph: {
        image: '/images/og-image.svg',
        imageWidth: 1200,
        imageHeight: 630,
    },
} as const;

export type Locale = typeof seoConfig.locales[number];

