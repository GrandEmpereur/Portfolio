import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React from 'react'
import Image from 'next/image';
import { services } from '@/lib/data/services';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Bartosik Patrick - Services ",
  description: "Discover the cutting-edge portfolio of Bartosik Patrick, a seasoned Full Stack Developer specializing in React, Next.js, and Tailwind CSS. Dive into a showcase of innovative web applications that blend aesthetics with functionality, crafted to push the boundaries of digital experiences.",
};

function page() {
  return (
    <MaxWidthWrapper className='mt-8'>
      <section id='Services' className='services flex flex-col w-full gap-y-12'>
        <div className="services__title">
          <h1 className='services__title-sub font-semibold text-2xl'>Services</h1>
          <h4 className='services__title-main keep-color '>This section regroup all my services and explanations</h4>
        </div>

        <div className='w-full lg:h-[350px]'>
          <Image src={'/img/services/services.png'} alt={'Image'} width={1200} height={537} sizes="100vw" style={{ width: '100%', height:'100%',  objectFit: 'cover'  }} loading='eager' />
        </div>

        <div className='flex flex-col gap-y-8'>
          {services.map((service, index) => (
            <div key={index} id={service.id}  className="services__item rounded overflow-hidden shadow-lg relative ">
              <div className="group w-full flex flex-col justify-between lg:flex-row">
                <div className="services__content flex flex-col gap-y-8 ">
                  <h4 className="services__title underline">{service.title}</h4>
                  <p className="services__description w-full md:w-[613px]">{service.generalDescription}</p>
                  <div className="services__accordion">
                  </div>
                </div>

                <div className='w-full md:w-[600px]'>
                  <Accordion type="single" collapsible>
                    {service.detailedDescription.map((accordion, idx) => (
                        <AccordionItem key={idx} value={`${idx}`}>
                          <AccordionTrigger>{accordion.title}</AccordionTrigger>
                          <AccordionContent style={{borderBottom: '1px solid white'}}>
                            {accordion.description}
                          </AccordionContent>
                        </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </MaxWidthWrapper>
  )
}

export default page
