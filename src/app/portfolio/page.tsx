import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { projects } from '@/lib/data/portfolio';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Bartosik Patrick - Portfolio ",
  description: "Discover the cutting-edge portfolio of Bartosik Patrick, a seasoned Full Stack Developer specializing in React, Next.js, and Tailwind CSS. Dive into a showcase of innovative web applications that blend aesthetics with functionality, crafted to push the boundaries of digital experiences.",
};

function GalleryPage() {
  return (
    <MaxWidthWrapper className='mt-8'>
      <section className='portfolio__section flex flex-col w-full gap-y-12'>
        <header className="portfolio__header space-y-4 text-center">
          <h1 className="portfolio__title text-3xl md:text-4xl font-semibold">Explore All My Project </h1>
          <p className="portfolio__description text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Discover in this gallery all the projects I have worked on. From e-commerce to school projects and side projects, you will find a wide range of web applications that I have developed or contributed to.
          </p>
        </header>

        <div className='portfolio__gallery grid grid-cols-1 sm:grid-cols-2 gap-8 place-items-center'>
          {projects.map((project, index) => (
            <div key={index} className="portfolio__item rounded overflow-hidden shadow-lg relative">
              <Link href={project.url} className="group">
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
                </div>

                <div className="portfolio__tags flex md:hidden flex-wrap gap-2 w-[300px] mt-5">
                  {project.tags.map((tag, idx) => (
                    <Badge key={idx} className="badge__item p-2" variant={"secondary"}>{tag}</Badge>
                  ))}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </MaxWidthWrapper>
  )
}

export default GalleryPage;
