import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { formatLegalText } from '@/lib/formatLegalText';
import { Metadata } from 'next';
import { Locale } from '@/i18nConfig';
import React from 'react';
import { getDictionary } from '@/get-dictionary';

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
    const dict = await getDictionary(lang);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: dict.TemplateLegalNotices.metadata.title,
        description: dict.TemplateLegalNotices.metadata.description,
        url: `https://patrick.bartosik.fr${lang === 'fr' ? '/terms' : `/${lang}/terms`}`,
        inLanguage: lang,
        isPartOf: {
            '@type': 'WebSite',
            name: 'Patrick Bartosik - Développeur Full Stack',
            url: 'https://patrick.bartosik.fr'
        }
    };

    return {
        title: dict.TemplateLegalNotices.metadata.title,
        description: dict.TemplateLegalNotices.metadata.description,
        keywords: "Mentions légales, Conditions d'utilisation, Patrick Bartosik, Développeur Full Stack, Services web",
        openGraph: {
            title: dict.TemplateLegalNotices.metadata.title,
            description: dict.TemplateLegalNotices.metadata.description,
            url: `https://patrick.bartosik.fr${lang === 'fr' ? '/terms' : `/${lang}/terms`}`,
            siteName: 'Patrick Bartosik - Développeur Full Stack',
            type: 'website',
            locale: lang,
            images: [
                {
                    url: 'https://patrick.bartosik.fr/img/legal-notices/legalNoticesHero.png',
                    width: 1200,
                    height: 630,
                    alt: "Mentions légales - Patrick Bartosik",
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: dict.TemplateLegalNotices.metadata.title,
            description: dict.TemplateLegalNotices.metadata.description,
            images: ['https://patrick.bartosik.fr/img/legal-notices/legalNoticesHero.png'],
            creator: '@patrick_bartosik',
        },
        alternates: {
            canonical: `https://patrick.bartosik.fr${lang === 'fr' ? '/terms' : `/${lang}/terms`}`,
            languages: {
                'fr': 'https://patrick.bartosik.fr/terms',
                'en': 'https://patrick.bartosik.fr/en/terms',
            },
        },
        other: {
            'application/ld+json': JSON.stringify(jsonLd),
        },
    };
}

export default async function Page({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    const dict = await getDictionary(lang);
    const formattedText = formatLegalText(dict.TemplateLegalNotices.legalText.join('\n'));
    return (
        <MaxWidthWrapper>
            <div className="py-10 px-6 sm:px-10 lg:px-16">
                <h1 className="text-3xl font-bold mb-6">{dict.TemplateLegalNotices.metadata.title}</h1>
                {formattedText}
            </div>
        </MaxWidthWrapper>
    );
}
