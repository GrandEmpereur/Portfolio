import { Metadata } from 'next';
import ServerSideTranslations from '@/components/serveur/ServerSideTranslations';
import { Locale } from '@/i18nConfig';
import { getDictionary } from '@/get-dictionary';

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
    const dict = await getDictionary(lang);

    return {
        title: `${dict.TemplateHome.home.hero.hero_title} | Patrick Bartosik`,
        description: dict.TemplateHome.home.hero.hero_description,
        keywords: "Développeur Full Stack, React, Next.js, Applications Web, SEO, Performance Web",
        openGraph: {
            title: `${dict.TemplateHome.home.hero.hero_title} | Patrick Bartosik`,
            description: dict.TemplateHome.home.hero.hero_description,
            url: `https://patrick.bartosik.fr/${lang}`,
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
            description: dict.TemplateHome.home.hero.hero_description,
            images: ['https://patrick.bartosik.fr/img/og-image.jpg'],
        },
        alternates: {
            canonical: `https://patrick.bartosik.fr/`,
            languages: {
                'fr': 'https://patrick.bartosik.fr/fr',
                'en': 'https://patrick.bartosik.fr/en',
            },
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
