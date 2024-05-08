import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React from 'react'
import Image from 'next/image';

function page() {
  return (
    <MaxWidthWrapper className='mt-8'>
      <section id='Services' className='services flex flex-col w-full gap-y-12'>
        <div className="services__title">
          <h3 className='services__title-sub font-mono'>Services</h3>
          <h4 className='services__title-main keep-color '>This section regroup all my services and explanations</h4>
        </div>
      </section>
    </MaxWidthWrapper>
  )
}

export default page
