import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import { Locale } from '@/i18nConfig';
import { getDictionary } from '@/get-dictionary';

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } } ) {
    const dict = await getDictionary(lang);

    return {
        title: dict.TemplatePortfolio.metadata.title,
        description: dict.TemplatePortfolio.metadata.description,
        openGraph: {
            title: dict.TemplatePortfolio.metadata.title,
            description: dict.TemplatePortfolio.metadata.description,
            url: `https://patrick.bartosik.fr/${lang}/portfolio`,
            type: 'website',
            images: [
                {
                    url: 'https://patrick.bartosik.fr/img/portfolio/portfolioHero.png',
                    width: 800,
                    height: 600,
                    alt: 'Portfolio Image of Patrick Bartosik',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: dict.TemplatePortfolio.metadata.title,
            description: dict.TemplatePortfolio.metadata.description,
            images: [
                {
                    url: 'https://patrick.bartosik.fr/img/portfolio/portfolioHero.png',
                    alt: 'Portfolio Image of Patrick Bartosik',
                },
            ],
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

                <div className='portfolio__gallery grid grid-cols-1 sm:grid-cols-2 gap-8 place-items-center'>
                    {dict.TemplatePortfolio.portfolioPage.projects.map((project, index) => (
                        <div key={index} className="portfolio__item rounded overflow-hidden shadow-lg relative">
                            <Link href={`/${lang}${project.url}`} className="group">
                                <Image
                                    className='portfolio__image w-full h-full object-contain rounded-lg lg:overflow-hidden lg:group-hover:scale-105 lg:transition-transform lg:duration-1000'
                                    src={project.placeholder}
                                    alt={`Project image of ${project.title}`}
                                    layout='responsive'
                                    width={900}
                                    height={800}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 100vw"
                                    loading='lazy'
                                />

                                <div className="portfolio__tags absolute bottom-2 left-2 hidden md:flex flex-wrap gap-2 w-[300px]">
                                    {project.tags.map((tag, idx) => (
                                        <Badge key={idx} className="badge__item p-2" variant={"secondary"}>{tag}</Badge>
                                    ))}
                                    {project.otherTags.map((tag, idx) => (
                                        <Badge key={idx} className="badge__item p-2" variant={"secondary"}>{tag}</Badge>
                                    ))}
                                </div>

                                <div className="portfolio__tags flex md:hidden flex-wrap gap-2 w-[300px] mt-5">
                                    {project.tags.map((tag, idx) => (
                                        <Badge key={idx} className="badge__item p-2" variant={"secondary"}>{tag}</Badge>
                                    ))}
                                    {project.otherTags.map((tag, idx) => (
                                        <Badge key={idx} className="badge__item p-2" variant={"secondary"}>{tag}</Badge>
                                    ))}
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </MaxWidthWrapper>
    );
}
