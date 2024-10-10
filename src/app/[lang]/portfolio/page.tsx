import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import { Locale } from '@/i18nConfig';
import { getDictionary } from '@/get-dictionary';
import { projects } from '@/lib/data/portfolio';

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
    const dict = await getDictionary(lang);

    return {
        title: dict.TemplatePortfolio.metadata.title,
        description: dict.TemplatePortfolio.metadata.description,
        keywords: "Portfolio, Projets web, Développement Full Stack, React, Next.js, Applications web",
        openGraph: {
            title: dict.TemplatePortfolio.metadata.title,
            description: dict.TemplatePortfolio.metadata.description,
            url: `https://patrick.bartosik.fr/${lang}/portfolio`,
            siteName: 'Patrick Bartosik - Développeur Full Stack',
            images: [
                {
                    url: 'https://patrick.bartosik.fr/img/portfolio/portfolioHero.png',
                    width: 1200,
                    height: 630,
                    alt: 'Portfolio de Patrick Bartosik',
                },
            ],
            locale: lang,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: dict.TemplatePortfolio.metadata.title,
            description: dict.TemplatePortfolio.metadata.description,
            images: ['https://patrick.bartosik.fr/img/portfolio/portfolioHero.png'],
        },
        alternates: {
            canonical: `https://patrick.bartosik.fr/${lang}/portfolio`,
            languages: {
                'fr': 'https://patrick.bartosik.fr/fr/portfolio',
                'en': 'https://patrick.bartosik.fr/en/portfolio',
            },
        },
    };
}

export default async function GalleryPage({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    const dict = await getDictionary(lang);

    return (
        <MaxWidthWrapper className='mt-8'>
            <section className='portfolio__section flex flex-col w-full gap-y-12'>
                <header className="portfolio__header space-y-4 text-center">
                    <h1 className="portfolio__title text-3xl md:text-4xl font-semibold">{dict.TemplatePortfolio.portfolioPage.header.title}</h1>
                    <p className="portfolio__description text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                        {dict.TemplatePortfolio.portfolioPage.header.description}
                    </p>
                </header>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-10 place-items-center'>
                    {projects.map((project, index) => (
                        <div key={index} className="rounded overflow-hidden shadow-lg relative w-full">
                            <Link href={`/${lang}${project.url}`} className="group">
                                <Image
                                    className='w-[900px] h-[800px] object-contain rounded-lg lg:overflow-hidden lg:group-hover:scale-105 lg:transition-transform lg:duration-1000'
                                    src={project.placeholder}
                                    alt={`Project image of ${project.title[lang]}`}
                                    layout='responsive'
                                    width={1440}
                                    height={800}
                                    loading='lazy'
                                    placeholder='blur'
                                    blurDataURL={project.placeholder}
                                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                />

                                <div className="portfolio__tags absolute bottom-2 left-2 hidden md:flex flex-wrap gap-2 w-[300px]">
                                    {project.tags.slice(0, 5).map((tag, idx) => (
                                        <Badge key={idx} className="badge__item p-2" variant={"secondary"}>{tag}</Badge>
                                    ))}
                                    {project.tags.length > 5 && (
                                        <Badge className="badge__item p-2" variant={"secondary"}>+{project.tags.length - 5}</Badge>
                                    )}
                                </div>

                                <div className="portfolio__tags flex md:hidden flex-wrap gap-2 w-[300px] mt-5">
                                    {project.tags.slice(0, 5).map((tag, idx) => (
                                        <Badge key={idx} className="badge__item p-2" variant={"secondary"}>{tag}</Badge>
                                    ))}
                                    {project.tags.length > 5 && (
                                        <Badge className="badge__item p-2" variant={"secondary"}>+{project.tags.length - 5}</Badge>
                                    )}
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </MaxWidthWrapper>
    );
}
