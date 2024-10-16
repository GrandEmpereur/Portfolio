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
        name: dict.TemplatePrivacyPolicy.metadata.title,
        description: dict.TemplatePrivacyPolicy.metadata.description,
        url: `https://patrick.bartosik.fr${lang === 'fr' ? '/privacy' : `/${lang}/privacy`}`,
        inLanguage: lang,
        isPartOf: {
            '@type': 'WebSite',
            name: 'Patrick Bartosik - Développeur Full Stack',
            url: 'https://patrick.bartosik.fr'
        }
    };

    return {
        title: dict.TemplatePrivacyPolicy.metadata.title,
        description: dict.TemplatePrivacyPolicy.metadata.description,
        keywords: "Politique de confidentialité, Protection des données, RGPD, Patrick Bartosik, Développeur Full Stack",
        openGraph: {
            title: dict.TemplatePrivacyPolicy.metadata.title,
            description: dict.TemplatePrivacyPolicy.metadata.description,
            url: `https://patrick.bartosik.fr${lang === 'fr' ? '/privacy' : `/${lang}/privacy`}`,
            siteName: 'Patrick Bartosik - Développeur Full Stack',
            type: 'website',
            locale: lang,
            images: [
                {
                    url: 'https://patrick.bartosik.fr/img/privacy-policy/privacyHero.png',
                    width: 1200,
                    height: 630,
                    alt: "Politique de confidentialité - Patrick Bartosik",
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: dict.TemplatePrivacyPolicy.metadata.title,
            description: dict.TemplatePrivacyPolicy.metadata.description,
            images: ['https://patrick.bartosik.fr/img/privacy-policy/privacyHero.png'],
            creator: '@patrick_bartosik',
        },
        alternates: {
            canonical: `https://patrick.bartosik.fr${lang === 'fr' ? '/privacy' : `/${lang}/privacy`}`,
            languages: {
                'fr': 'https://patrick.bartosik.fr/privacy',
                'en': 'https://patrick.bartosik.fr/en/privacy',
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
    const formattedText = formatLegalText(dict.TemplatePrivacyPolicy.legalText.join('\n'));
    return (
        <MaxWidthWrapper>
            <div className="py-10 px-6 sm:px-10 lg:px-16">
                <h1 className="text-3xl font-bold mb-6">{dict.TemplatePrivacyPolicy.metadata.title}</h1>
                {formattedText}
            </div>
        </MaxWidthWrapper>
    );
}
