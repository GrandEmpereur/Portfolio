import { Metadata } from 'next';
import ServerSideTranslations from '@/components/serveur/ServerSideTranslations';
import { Locale } from '@/i18nConfig';
import { getDictionary } from '@/get-dictionary';

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
    const dict = await getDictionary(lang);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: `${dict.TemplateHome.home.hero.hero_title} | Patrick Bartosik`,
        description: dict.TemplateHome.home.hero.seo_description,
        url: `https://patrick.bartosik.fr${lang === 'fr' ? '' : `/${lang}`}`,
        author: {
            '@type': 'Person',
            name: 'Patrick Bartosik',
            url: 'https://patrick.bartosik.fr',
        },
        potentialAction: {
            '@type': 'SearchAction',
            target: '{search_term_string}',
            'query-input': 'required name=search_term_string'
        }
    };

    return {
        title: `${dict.TemplateHome.home.hero.hero_title} | Patrick Bartosik`,
        description: dict.TemplateHome.home.hero.seo_description,
        keywords: "Développeur Full Stack, React, Next.js, Applications Web, SEO, Performance Web, Patrick Bartosik",
        openGraph: {
            title: `${dict.TemplateHome.home.hero.hero_title} | Patrick Bartosik`,
            description: dict.TemplateHome.home.hero.seo_description,
            url: `https://patrick.bartosik.fr${lang === 'fr' ? '' : `/${lang}`}`,
            siteName: 'Patrick Bartosik - Développeur Full Stack',
            images: [
                {
                    url: 'https://patrick.bartosik.fr/img/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'Patrick Bartosik - Développeur Full Stack',
                }
            ],
            locale: lang,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${dict.TemplateHome.home.hero.hero_title} | Patrick Bartosik`,
            description: dict.TemplateHome.home.hero.seo_description,
            images: ['https://patrick.bartosik.fr/img/og-image.jpg'],
            creator: '@patrick_bartosik',
        },
        alternates: {
            canonical: `https://patrick.bartosik.fr${lang === 'fr' ? '' : `/${lang}`}`,
            languages: {
                'fr': 'https://patrick.bartosik.fr/',
                'en': 'https://patrick.bartosik.fr/en',
            },
        },
        other: {
            'application/ld+json': JSON.stringify(jsonLd),
        },
    };
}

export default function Home({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    return <ServerSideTranslations params={{ lang }} />;
}
