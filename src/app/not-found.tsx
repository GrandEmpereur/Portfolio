import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Locale } from '@/i18nConfig';
import { getDictionary } from '@/get-dictionary';
import { Metadata } from 'next';

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
    const dict = await getDictionary(lang);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: dict.notFound.metadata.title,
        description: dict.notFound.metadata.description,
        url: `https://patrick.bartosik.fr/404`,
    };

    return {
        title: dict.notFound.metadata.title,
        description: dict.notFound.metadata.description,
        robots: {
            index: false,
            follow: false,
        },
        openGraph: {
            title: dict.notFound.metadata.title,
            description: dict.notFound.metadata.description,
            url: `https://patrick.bartosik.fr/404`,
            type: 'website',
            images: [
                {
                    url: 'https://patrick.bartosik.fr/img/404/404.png',
                    width: 1200,
                    height: 630,
                    alt: dict.notFound.metadata.imageAlt,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: dict.notFound.metadata.title,
            description: dict.notFound.metadata.description,
            images: ['https://patrick.bartosik.fr/img/404/404.png'],
        },
        other: {
            'application/ld+json': JSON.stringify(jsonLd),
        },
    };
}

type NotFoundProps = {
    params: { lang: Locale };
};

const NotFound: React.FC<NotFoundProps> = async ({ params }) => {
    const lang = params?.lang || 'fr';
    const dict = await getDictionary(lang);

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-black text-white">
            <div className="absolute top-0 left-0 right-0 bottom-0 z-0">
                <Image
                    className='w-full h-full object-contain rounded-lg lg:overflow-hidden lg:group-hover:scale-105 lg:transition-transform lg:duration-1000'
                    src="/img/404/404.png"
                    alt={dict.notFound.metadata.imageAlt}
                    layout='responsive'
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    width={1440}
                    height={1080}
                    priority
                    sizes='100vw'
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>
            </div>

            <div className="z-10 text-center p-4">
                <h1 className="text-6xl font-bold mb-4">404</h1>
                <p className="text-xl mb-6">{dict.notFound.description}</p>
                <div className="flex gap-4 justify-center">
                    <Link href={lang === 'fr' ? `/` : `/${lang}`}>
                        <Button className='rounded-full ' variant={'other'} size={'lg'}>
                            {dict.notFound.buttonHome}
                        </Button>
                    </Link>
                    <Link href={lang === 'fr' ? `/portfolio` : `/${lang}/portfolio`}>
                        <Button className='rounded-full ' variant={'other'} size={'lg'}>
                            {dict.notFound.buttonPortfolio}
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
