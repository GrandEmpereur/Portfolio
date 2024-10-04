'use client';

import React from 'react';
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Locale } from "@/i18nConfig";

type ProjectClientProps = {
    lang: Locale;
    dictionary: any;
    project: {
        id: number;
        title: {
            fr: string;
            en: string;
        };
        description: {
            fr: string;
            en: string;
        };
        placeholder: string;
        tags: string[];
        otherTags: string[];
        redirectToProd?: string;
        buttonLabel?: {
            fr: string;
            en: string;
        };
    };
};

const ProjectClient: React.FC<ProjectClientProps> = ({ lang, dictionary, project }) => {
    const router = useRouter();

    if (!project) {
        router.push('/404');
        return null;
    }

    return (
        <MaxWidthWrapper className='mt-8'>
            <section className='portfolio flex flex-col w-full gap-y-12'>
                <div className="portfolio__title">
                    <h4 className='portfolio__title-sub font-mono capitalize keep-color'>Portfolio</h4>
                    <h3 className='portfolio__title-main'>Project: {project.title[lang]}</h3>
                </div>
                <div className=" flex flex-col gap-y-10">
                    <div className="slider flex">
                        <div className='w-full lg:h-[350px] overflow-hidden'>
                            <Image
                                src={project.placeholder}
                                alt={`Project image of ${project.title[lang]}`}
                                width={1108}
                                height={537}
                                layout="responsive"
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 100vw"
                                priority
                            />
                        </div>
                    </div>

                    <div className="w-full flex flex-wrap justify-between gap-8">
                        <div>
                            <h4> {project.title[lang]} </h4>
                            <p className="w-full pt-5 lg:w-[506px]"> {project.description[lang]} </p>
                            {project.redirectToProd && (
                                <a href={project.redirectToProd} target="_blank" rel="noopener noreferrer">
                                    <Button variant={'other'} size={'lg'} className='mt-5 rounded-full'>{project.buttonLabel?.[lang] || dictionary.TemplatePortfolio.visitWebsite}</Button>
                                </a>
                            )}
                        </div>

                        <div className="flex flex-wrap flex-col gap-8">
                            <div className="flex flex-col gap-y-5">
                                <h4>{dictionary.TemplatePortfolio.techUsed}</h4>
                                <div className="flex flex-wrap gap-5">
                                    {project.tags.map((tag, index) => (
                                        <div key={index}>
                                            <Badge variant={'secondary'} className='tag p-2' >{tag}</Badge>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-y-5">
                                <h4>{dictionary.TemplatePortfolio.otherTags}</h4>
                                <div className="flex flex-wrap gap-5">
                                    {project.otherTags.map((tag, index) => (
                                        <div key={index}>
                                            <Badge variant={'secondary'} className='tag p-2' >{tag}</Badge>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MaxWidthWrapper>
    );
}

export default ProjectClient;
