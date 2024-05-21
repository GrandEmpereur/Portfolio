import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import React from 'react';
import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Metadata } from 'next';
import { Locale } from '@/i18nConfig';
import { getDictionary } from '@/get-dictionary';

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }) {
    const dict = await getDictionary(lang);

    return {
        title: dict.TemplateServices.metadata.title,
        description: dict.TemplateServices.metadata.description,
        openGraph: {
            title: dict.TemplateServices.metadata.title,
            description: dict.TemplateServices.metadata.description,
            url: `https://patrick.bartosik.fr/${lang}/services`,
            type: 'website',
            images: [
                {
                    url: 'https://patrick.bartosik.fr/img/services/services.png',
                    width: 800,
                    height: 600,
                    alt: dict.TemplateServices.servicesPage.imageAlt,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: dict.TemplateServices.metadata.title,
            description: dict.TemplateServices.metadata.description,
            images: [
                {
                    url: 'https://patrick.bartosik.fr/img/services/services.png',
                    alt: dict.TemplateServices.servicesPage.imageAlt,
                },
            ],
        },
    };
}

export default async function page({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    const dict = await getDictionary(lang);
    const services = dict.TemplateServices.servicesPage.servicesList;

    return (
        <MaxWidthWrapper className='mt-8'>
            <section id='Services' className='services flex flex-col w-full gap-y-12'>
                <div className="services__title">
                    <h1 className='services__title-sub font-semibold text-2xl'>{dict.TemplateServices.servicesPage.titleSub}</h1>
                    <h4 className='services__title-main keep-color '>{dict.TemplateServices.servicesPage.titleMain}</h4>
                </div>

                <div className='w-full lg:h-[350px]'>
                    <Image src={'/img/services/services.png'} alt={dict.TemplateServices.servicesPage.imageAlt} width={1200} height={537} sizes="100vw" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading='eager' />
                </div>

                <div className='flex flex-col gap-y-8'>
                    {services.map((service, index) => (
                        <div key={index} id={service.id} className="services__item rounded overflow-hidden shadow-lg relative ">
                            <div className="group w-full flex flex-col justify-between lg:flex-row">
                                <div className="services__content flex flex-col gap-y-8 ">
                                    <h4 className="services__title underline">{service.title}</h4>
                                    <p className="services__description w-full md:w-[613px]">{service.generalDescription}</p>
                                </div>

                                <div className='w-full md:w-[600px]'>
                                    <Accordion type="single" collapsible>
                                        {service.detailedDescription.map((accordion, idx) => (
                                            <AccordionItem key={idx} value={`${idx}`}>
                                                <AccordionTrigger>{accordion.title}</AccordionTrigger>
                                                <AccordionContent style={{ borderBottom: '1px solid white' }}>
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
    );
}
