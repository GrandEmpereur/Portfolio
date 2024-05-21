import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { formatLegalText } from '@/lib/formatLegalText';
import { Metadata } from 'next';
import { Locale } from '@/i18nConfig';
import React from 'react';
import { getDictionary } from '@/get-dictionary';

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }) {
    const dict = await getDictionary(lang);

    return {
        title: dict.TemplateLegalNotices.metadata.title,
        description: dict.TemplateLegalNotices.metadata.description,
        openGraph: {
            title: dict.TemplateLegalNotices.metadata.title,
            description: dict.TemplateLegalNotices.metadata.description,
            url: `https://patrick.bartosik.fr/${lang}/legal-notices`,
            type: 'website',
            images: [
                {
                    url: 'https://patrick.bartosik.fr/img/legal-notices/legalNoticesHero.png',
                    width: 800,
                    height: 600,
                    alt: 'Legal Notices Image of Patrick Bartosik',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: dict.TemplateLegalNotices.metadata.title,
            description: dict.TemplateLegalNotices.metadata.description,
            images: [
                {
                    url: 'https://patrick.bartosik.fr/img/legal-notices/legalNoticesHero.png',
                    alt: 'Legal Notices Image of Patrick Bartosik',
                },
            ],
        },
    };
}

export default async function page({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    const dict = await getDictionary(lang);
    const formattedText = formatLegalText(dict.TemplateLegalNotices.legalText.join('\n'));
    return (
        <MaxWidthWrapper>
            <div className="py-10 px-6 sm:px-10 lg:px-16">
                {formattedText}
            </div>
        </MaxWidthWrapper>
    );
}
