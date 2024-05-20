import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import TypeFromWidget from '@/components/TypeFromWidget'
import { Locale } from '@/i18nConfig';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Bartosik Patrick - Contact Me ",
  description: "Discover the cutting-edge portfolio of Bartosik Patrick, a seasoned Full Stack Developer specializing in React, Next.js, and Tailwind CSS. Dive into a showcase of innovative web applications that blend aesthetics with functionality, crafted to push the boundaries of digital experiences.",
};

function page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return (
    <MaxWidthWrapper className='mt-8'>
      <section id='Contact' className='contact flex flex-col w-full gap-y-12'>
        <div className="contact__title">
          <h1 className='contact__title-sub font-semibold text-2xl'>Contact Me</h1>
          <h4 className='contact__title-main keep-color'>Let's Discuss About Your Project</h4>
        </div>

        <TypeFromWidget />
      </section>
    </MaxWidthWrapper>  
  )
}

export default page
