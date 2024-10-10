'use client';

import React from 'react';
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { ProjectClientProps } from '@/types/ProjectType';
import Line from '../Line';
import { cn } from "@/lib/utils";

const ProjectClient: React.FC<ProjectClientProps> = ({ lang, dictionary, project }) => {
    const router = useRouter();

    // Redirection vers une page 404 si le projet n'existe pas
    if (!project) {
        router.push('/404');
        return null;
    }

    return (
        <MaxWidthWrapper className='mt-8'>
            <Line />
            <section className='portfolio flex flex-col w-full gap-y-24'>

                {/* Titre du projet */}
                <div className="w-full flex flex-col gap-y-4">
                    <h3 className='keep-color font-normal'>Portfolio</h3>
                    <h1 className='font-bold'>Project: {project.title[lang]}</h1>
                </div>

                {/* Image principale du projet */}
                <div className="flex flex-col mt-[-50px]">
                    <div className='w-full lg:h-[480px] overflow-hidden'>
                        <Image
                            src={project.media.placeholder}
                            alt={`Project image of ${project.title[lang]}`}
                            width={1440}
                            height={480}
                            layout="responsive"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 100vw"
                            priority
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <div className='pt-3'>
                        {project.info && (
                            <div className='w-full flex justify-between items-center flex-wrap md:flex-nowrap'>
                                <div className='flex flex-col gap-y-5'>
                                    <p className='text-white text-xl font-bold' >{project.info.projet}</p>
                                </div>
                                <div className='flex flex-col gap-y-5'>
                                    <p className='text-white text-xl font-bold' >{project.info.client}</p>
                                </div>
                                <div className='flex flex-col gap-y-5'>
                                    <p className='text-white text-xl font-bold'>{project.info.category}</p>
                                </div>
                                <div className='flex flex-col gap-y-5'>
                                    <p className='text-white text-xl font-bold' >{project.info.year}</p>
                                </div>
                            </div>
                        )
                        }
                    </div>
                </div>

                {/* Détails principaux du projet et compétences */}
                <div className="w-full flex flex-col justify-between gap-12">
                    <div className='flex justify-between items-start flex-col lg:flex-row '>
                        <div>
                            <h3>{project.title[lang]}</h3>
                        </div>

                        <div className='flex flex-col gap-y-10 pt-5 lg:pt-0'>
                            <p className="w-full lg:w-[600px] text-2xl text-white">{project.overview[lang]}</p>
                            {/* Bouton vers le projet en production */}
                            {project.links.liveProject && (
                                <a href={project.links.liveProject} target="_blank" rel="noopener noreferrer">
                                    <Button variant={'other'} size={'lg'} className='mt-5 rounded-full'>
                                        {project.cta.label?.[lang] || dictionary.TemplatePortfolio.visitWebsite}
                                    </Button>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Compétences clés et supplémentaires */}
                    <div className="flex justify-between gap-8 flex-col md:flex-row">
                        <div className="flex flex-col gap-y-5">
                            <h3>{project.keySkills.title[lang]}</h3>
                            <div className="flex flex-wrap gap-5">
                                {project.keySkills.skillsList.map((skill, index) => (
                                    <Badge key={index} variant={'other'} className='tag p-2'>{skill}</Badge>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-5">
                            <h3>{project.additionalSkills.title[lang]}</h3>
                            <div className="flex flex-wrap gap-5">
                                {project.additionalSkills.skillsList.map((skill, index) => (
                                    <Badge key={index} variant={'other'} className='tag p-2'>{skill}</Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sections alternées avec images fixes */}
                {[
                    { title: "Contexte", content: project.context[lang], image: project.media.placeholder },
                    { title: "Objectif", content: project.objectives[lang], image: project.media.more[0] },
                    { title: "Solution", content: project.solution[lang], image: project.media.more[2] },
                    { title: "Resultat", content: project.results[lang], image: project.media.more[1] }
                ].map((section, index) => {
                    const isEven = index % 2 === 0;

                    return (
                        <div key={section.title} className={cn(
                            "w-full flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-16",
                            isEven ? "lg:flex-row lg:translate-y-10" : "lg:flex-row-reverse lg:-translate-y-10"
                        )}>
                            <div className="w-full lg:w-1/2 lg:max-w-[630px]">
                                <div className="relative overflow-hidden rounded-lg">
                                    <Image
                                        src={section.image}
                                        alt={`${section.title} image of ${project.title[lang]}`}
                                        width={630}
                                        height={335}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 100vw"
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2 flex flex-col gap-y-4">
                                <h4 className="text-3xl font-bold">{section.title}</h4>
                                <p className="text-xl">{section.content}</p>
                            </div>
                        </div>
                    );
                })}

                {/* Galerie d'images supplémentaires */}
                <section className="mt-24">
                    <h2 className="text-3xl font-bold mb-8">D'autres images du projet</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {project.media.more.slice(3).map((image, index) => (
                            <div 
                                key={index} 
                                className={cn(
                                    "relative overflow-hidden rounded-lg",
                                    index % 2 === 0 ? "lg:translate-y-10" : "lg:-translate-y-10"
                                )}
                            >
                                <Image
                                    src={image}
                                    alt={`Image supplémentaire ${index + 1} du projet ${project.title[lang]}`}
                                    width={630}
                                    height={335}
                                    layout='responsive'
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 100vw"
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </section>
            </section>
        </MaxWidthWrapper>
    );
}

export default ProjectClient;
