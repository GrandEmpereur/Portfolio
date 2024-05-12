'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React from 'react'
import { Widget } from '@typeform/embed-react'

function page() {
  return (
    <MaxWidthWrapper className='mt-8'>
      <section id='Contact' className='contact flex flex-col w-full gap-y-12'>
        <div className="contact__title">
          <h3 className='contact__title-sub font-mono'>Contact Me</h3>
          <h4 className='contact__title-main keep-color'>Let's Discuss Your Project</h4>
        </div>

        <section className="my-5">
          <Widget id="ULVw4QxO" style={{ width: '100%', height: '800px' }} className="my-form" />
        </section>
      </section>
    </MaxWidthWrapper>  
  )
}

export default page
