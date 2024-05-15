import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { projects } from '@/lib/data/portfolio';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Metadata } from 'next';
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: `Bartosik Patrick - Portfolio`,
    description: "Discover the cutting-edge portfolio of Bartosik Patrick, a seasoned Full Stack Developer specializing in React, Next.js, and Tailwind CSS. Dive into a showcase of innovative web applications that blend aesthetics with functionality, crafted to push the boundaries of digital experiences.",
};

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
                        <div className='w-full lg:h-[350px] overflow-hidden'>
                            <Image
                                src={project?.placeholder ? project.placeholder : '/default-placeholder.png'}
                                alt={project?.title ? `Project image of ${project.title}` : 'Default image'}
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
                            <h4> {project?.title} </h4>
                            <p className="w-full pt-5 lg:w-[506px]"> {project?.description} </p>
                            {project?.redirectToProd && (
                                <a href={project.redirectToProd} target="_blank">
                                    <Button variant={'other'} size={'lg'} className='mt-5 rounded-full'>Visit the website</Button>
                                </a>
                            )}
                        </div>

                        <div className="flex flex-wrap flex-col gap-8">
                            <div className="flex flex-col gap-y-5">
                                <h4>Techno Used on this project</h4>
                                <div className="flex flex-wrap gap-5">
                                    {project?.tags.map((tag, index) => (
                                        <div key={index}>
                                            <Badge variant={'secondary'} className='tag p-2' >{tag}</Badge>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-y-5">
                                <h4>Other Tags</h4>
                                <div className="flex flex-wrap gap-5">
                                    {project?.otherTags.map((tag, index) => (
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
    )
}