import Hero from '@/components/About/Hero'
import React from 'react'
import Experience from '@/components/About/Experience';
import Skills from '@/components/About/Skills';
import Line from '@/components/Line';

function page() {
  return (
    <>
    <div className='relative '>
      <Line />
      <Hero />
      <Experience />
      <Skills />
    </div>
    </>
  )
}

export default page
