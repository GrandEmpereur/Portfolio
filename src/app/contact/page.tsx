'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React from 'react'
import Image from 'next/image';

function page() {
  return (
    <MaxWidthWrapper className='mt-8'>
      <section id='Contact' className='contact flex flex-col w-full gap-y-12'>
        <div className="contact__title">
          <h3 className='contact__title-sub font-mono'>About me</h3>
          <h4 className='contact__title-main keep-color '>All You Want to Know About Me</h4>
        </div>

        <div className='w-full'>
          <Image src={'/img/contact/banner.jpg'} alt={''} width={1108} height={537} style={{ width: '100%', objectFit: 'cover' }} />
        </div>

        <section className="my-12 px-4 md:px-6 lg:my-24">
          <div className="mx-auto max-w-2xl space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get in Touch</h1>
              <p className="mt-2 text-gray-500 dark:text-gray-400 md:text-xl">
                Have a question or want to work together? Fill out the form below and we'll get back to you as soon as
                possible.
              </p>
            </div>
          </div>
        </section>
      </section>
    </MaxWidthWrapper>
  )
}

export default page
