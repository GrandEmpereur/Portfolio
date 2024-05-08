import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image';

const projects = [
  { title: 'Project 1', image: '/img/lastWorks/project3.png', tags: ['React', 'Tailwind', 'Firebase', 'Firebase', 'Firebase', 'Firebase'], url: '/portfolio/project-test' },
  { title: 'Project 2', image: '/img/lastWorks/project3.png', tags: ['React', 'Tailwind', 'Firebase'], url: '#' },
  { title: 'Project 3', image: '/img/lastWorks/project3.png', tags: ['React', 'Tailwind', 'Firebase'], url: '#' },
  { title: 'Project 4', image: '/img/lastWorks/project3.png', tags: ['React', 'Tailwind', 'Firebase'], url: '#' },
  { title: 'Project 5', image: '/img/lastWorks/project3.png', tags: ['React', 'Tailwind', 'Firebase'], url: '#' },
  { title: 'Project 6', image: '/img/lastWorks/project3.png', tags: ['React', 'Tailwind', 'Firebase'], url: '#' },
  { title: 'Project 7', image: '/img/lastWorks/project3.png', tags: ['React', 'Tailwind', 'Firebase'], url: '#' },
  { title: 'Project 8', image: '/img/lastWorks/project3.png', tags: ['React', 'Tailwind', 'Firebase'], url: '#' },
  { title: 'Project 9', image: '/img/lastWorks/project3.png', tags: ['React', 'Tailwind', 'Firebase'], url: '#' },
  { title: 'Project 10', image: '/img/lastWorks/project3.png', tags: ['React', 'Tailwind', 'Firebase'], url: '#' },
]

function GalleryPage() {
  return (
    <MaxWidthWrapper className='mt-8'>
      <section className='portfolio__section flex flex-col w-full gap-y-12'>
        <header className="portfolio__header space-y-4 text-center">
          <h1 className="portfolio__title text-3xl md:text-4xl font-bold">Explore My Photography Portfolio</h1>
          <p className="portfolio__description text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Discover a showcase of diverse photographic styles and subjects that highlight my best work.
          </p>
        </header>

        <div className='portfolio__gallery grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-center'>
          {projects.map((project, index) => (
            <div key={index} className="portfolio__item rounded overflow-hidden shadow-lg relative">
              <Link href={project.url} className="group">
                <Image className='portfolio__image w-full object-cover rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-300'
                  width={400}
                  height={400}
                  src={project.image}
                  alt={`Project image of ${project.title}`}
                />
                <div className="portfolio__tags absolute bottom-2 left-2 flex flex-wrap gap-2" style={{width: '250px'}}>
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

export default GalleryPage

