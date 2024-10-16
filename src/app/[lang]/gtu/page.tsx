import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { formatLegalText } from '@/lib/formatLegalText';
import { Metadata } from 'next';
import { Locale } from '@/i18nConfig';
import React from 'react';
import { getDictionary } from '@/get-dictionary';

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }) {
    const dict = await getDictionary(lang);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: dict.TemplateGTU.metadata.title,
        description: dict.TemplateGTU.metadata.description,
        url: `https://patrick.bartosik.fr${lang === 'fr' ? '/gtu' : `/${lang}`}/gtu`,
        inLanguage: lang,
        isPartOf: {
            '@type': 'WebSite',
            name: 'Patrick Bartosik - Développeur Full Stack',
            url: 'https://patrick.bartosik.fr'
        }
    };

    return {
        title: dict.TemplateGTU.metadata.title,
        description: dict.TemplateGTU.metadata.description,
        keywords: "Conditions générales d'utilisation, CGU, Patrick Bartosik, Développeur Full Stack, Services web",
        openGraph: {
            title: dict.TemplateGTU.metadata.title,
            description: dict.TemplateGTU.metadata.description,
            url: `https://patrick.bartosik.fr${lang === 'fr' ? '/gtu' : `/${lang}`}/gtu`,
            siteName: 'Patrick Bartosik - Développeur Full Stack',
            type: 'website',
            locale: lang,
            images: [
                {
                    url: 'https://patrick.bartosik.fr/img/gtu/gtuHero.png',
                    width: 1200,
                    height: 630,
                    alt: "Conditions générales d'utilisation - Patrick Bartosik",
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: dict.TemplateGTU.metadata.title,
            description: dict.TemplateGTU.metadata.description,
            images: ['https://patrick.bartosik.fr/img/gtu/gtuHero.png'],
            creator: '@patrick_bartosik',
        },
        alternates: {
            canonical: `https://patrick.bartosik.fr${lang === 'fr' ? '/gtu' : `/${lang}`}/gtu`,
            languages: {
                'fr': 'https://patrick.bartosik.fr/gtu',
                'en': 'https://patrick.bartosik.fr/en/gtu',
            },
        },
        other: {
            'application/ld+json': JSON.stringify(jsonLd),
        },
    };
}

export default async function page({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    const dict = await getDictionary(lang);
    const formattedText = formatLegalText(dict.TemplateGTU.legalText.join('\n'));
    return (
        <MaxWidthWrapper>
            <div className="py-10 px-6 sm:px-10 lg:px-16">
                {formattedText}
            </div>
        </MaxWidthWrapper>
    );
}
