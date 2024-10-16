import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import React from 'react';
import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Locale } from '@/i18nConfig';
import { getDictionary } from '@/get-dictionary';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
    const dict = await getDictionary(lang);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: dict.TemplateServices.metadata.title,
        description: dict.TemplateServices.metadata.description,
        url: `https://patrick.bartosik.fr/${lang}/services`,
        provider: {
            '@type': 'Person',
            name: 'Patrick Bartosik',
            url: 'https://patrick.bartosik.fr'
        }
    };

    return {
        title: dict.TemplateServices.metadata.title,
        description: dict.TemplateServices.metadata.description,
        keywords: "Services web, Développement Full Stack, React, Next.js, Tailwind CSS, Applications web, SEO, E-commerce, SaaS, API, CRM",
        openGraph: {
            title: dict.TemplateServices.metadata.title,
            description: dict.TemplateServices.metadata.description,
            url: `https://patrick.bartosik.fr/${lang}/services`,
            siteName: 'Patrick Bartosik - Développeur Full Stack',
            images: [
                {
                    url: 'https://patrick.bartosik.fr/img/services/services.png',
                    width: 1200,
                    height: 630,
                    alt: dict.TemplateServices.servicesPage.imageAlt,
                },
            ],
            locale: lang,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: dict.TemplateServices.metadata.title,
            description: dict.TemplateServices.metadata.description,
            images: ['https://patrick.bartosik.fr/img/services/services.png'],
        },
        alternates: {
            canonical: `https://patrick.bartosik.fr/${lang === 'fr' ? 'services' : `${lang}/services`}`,
            languages: {
                'fr': 'https://patrick.bartosik.fr/services',
                'en': 'https://patrick.bartosik.fr/en/services',
            },
        },
        other: {
            'application/ld+json': JSON.stringify(jsonLd),
        },
    };
}

export default async function page({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    const dict = await getDictionary(lang);
    return (
        <MaxWidthWrapper className='mt-8'>
            <section id='Services' className='services flex flex-col w-full gap-y-12'>
                <div className="services__title">
                    <h1 className='services__title-sub font-semibold text-2xl'>{dict.TemplateServices.servicesPage.titleSub}</h1>
                    <h4 className='services__title-main keep-color '>{dict.TemplateServices.servicesPage.titleMain}</h4>
                </div>

                <div className='w-full'>
                    <Image
                        src={'/img/services/services_banner.png'}
                        alt={dict.TemplateServices.servicesPage.imageAlt}
                        width={1440}
                        height={480}
                        layout='responsive'
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1440px'
                        loading='lazy'
                        priority={false}
                        style={{ objectFit: 'cover' }}
                        className='w-full'
                    />
                </div>

                <div className='flex flex-col gap-y-8'>
                    {dict.TemplateServices.servicesPage.servicesList.map((service, index) => (
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

                <div className="services__cta text-center mt-12">
                    <h3 className="text-2xl font-bold mb-4">{dict.TemplateServices.servicesPage.callToAction.title}</h3>
                    <p className="mb-6">{dict.TemplateServices.servicesPage.callToAction.description}</p>
                    <Link href={lang === 'fr' ? `/contact` : `/${lang}/contact`}>
                        <Button className='rounded-full' variant={'other'} size={'lg'}>
                            {dict.TemplateServices.servicesPage.callToAction.buttonText}
                        </Button>
                    </Link>
                </div>
            </section>
        </MaxWidthWrapper>
    );
}