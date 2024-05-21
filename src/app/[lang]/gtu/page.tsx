import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { formatLegalText } from '@/lib/formatLegalText';
import { Metadata } from 'next';
import { Locale } from '@/i18nConfig';
import React from 'react';
import { getDictionary } from '@/get-dictionary';

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }) {
    const dict = await getDictionary(lang);

    return {
        title: dict.TemplateGTU.metadata.title,
        description: dict.TemplateGTU.metadata.description,
        openGraph: {
            title: dict.TemplateGTU.metadata.title,
            description: dict.TemplateGTU.metadata.description,
            url: `https://patrick.bartosik.fr/${lang}/gtu`,
            type: 'website',
            images: [
                {
                    url: 'https://patrick.bartosik.fr/img/gtu/gtuHero.png',
                    width: 800,
                    height: 600,
                    alt: 'Image de GTU de Patrick Bartosik',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: dict.TemplateGTU.metadata.title,
            description: dict.TemplateGTU.metadata.description,
            images: [
                {
                    url: 'https://patrick.bartosik.fr/img/gtu/gtuHero.png',
                    alt: 'Image de GTU de Patrick Bartosik',
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
    const formattedText = formatLegalText(dict.TemplateGTU.legalText.join('\n'));
    return (
        <MaxWidthWrapper>
            <div className="py-10 px-6 sm:px-10 lg:px-16">
                {formattedText}
            </div>
        </MaxWidthWrapper>
    );
}
