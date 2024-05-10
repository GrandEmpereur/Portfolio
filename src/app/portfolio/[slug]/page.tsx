'use client';
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { projects } from '@/lib/data/portfolio';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


export default function Page({ params }: { params: { slug: string } }) {
    const project = projects.find(project => project.slug === `/${params.slug}`)

    if (!project) {
        useRouter().push('/404')
    }


    return (
        <MaxWidthWrapper className='mt-8'>
            <section className='portfolio flex flex-col w-full gap-y-12'>
                <div className="portfolio__title">
                    <h4 className='portfolio__title-sub font-mono capitalize keep-color'>Portfolio</h4>
                    <h3 className='portfolio__title-main'>Project: {project ? project.title : 'Not Found'}</h3>
                </div>
                <div className=" flex flex-col gap-y-10">
                    <div className="slider flex">
                        {project?.Slider.map((slide, index) => (
                            <div key={index} className="slide">
                                <Image src={slide.image} alt={slide.alt} width={400} height={400} />
                            </div>
                        ))}
                    </div>

                    <div className="wraper w-full flex flex-wrap justify-between gap-8">
                        <div>
                            <h4> {project?.title} </h4>
                            <p className="w-[506px] pt-5"> {project?.description} </p>
                        </div>

                        <div className="flex flex-wrap flex-col gap-8">
                            <div className="flex flex-col gap-y-5">
                                <h4>Techno Used on this project</h4>
                                <div className="flex flex-wrap gap-5">
                                    {project?.tags.map(tag => (
                                        <div>
                                            <Badge key={tag} variant={'secondary'} className='tag p-2'>{tag}</Badge>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-y-5">
                                <h4>Other Tags</h4>
                                <div className="flex flex-wrap gap-5">
                                    {project?.otherTags.map(tag => (
                                        <div>
                                            <Badge key={tag} variant={'secondary'} className='tag p-2' >{tag}</Badge>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MaxWidthWrapper>
    )
}