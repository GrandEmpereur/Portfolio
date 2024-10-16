import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import TypeFromWidget from '@/components/TypeFromWidget'
import { Locale } from '@/i18nConfig';
import { Metadata } from 'next';
import React from 'react'
import { getDictionary } from '@/get-dictionary';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(lang);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: dict.TemplateContact.metadata.title,
    description: dict.TemplateContact.metadata.description,
    url: `https://patrick.bartosik.fr/${lang}/contact`,
  };

  return {
    title: dict.TemplateContact.metadata.title,
    description: dict.TemplateContact.metadata.description,
    keywords: "Contact, Développeur Full Stack, React, Next.js, Projets web, Consultation",
    openGraph: {
      title: dict.TemplateContact.metadata.title,
      description: dict.TemplateContact.metadata.description,
      url: `https://patrick.bartosik.fr/${lang}/contact`,
      siteName: 'Patrick Bartosik - Développeur Full Stack',
      images: [
        {
          url: 'https://patrick.bartosik.fr/img/contact/contactHero.png',
          width: 1200,
          height: 630,
          alt: 'Contactez Patrick Bartosik',
        },
      ],
      locale: lang,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.TemplateContact.metadata.title,
      description: dict.TemplateContact.metadata.description,
      images: ['https://patrick.bartosik.fr/img/contact/contactHero.png'],
    },
    alternates: {
      canonical: `https://patrick.bartosik.fr/${lang === 'fr' ? 'contact' : `${lang}/contact`}`,
      languages: {
        'fr': 'https://patrick.bartosik.fr/contact',
        'en': 'https://patrick.bartosik.fr/en/contact',
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
    <MaxWidthWrapper>
      <section id='Contact' className='contact flex flex-col w-full gap-y-5'>
        <div className="contact__title">
          <h1 className='contact__title-sub font-semibold text-2xl'>{dict.TemplateContact.contactMe.titleSub}</h1>
          <h2 className='contact__title-main keep-color text-4xl font-bold mb-4'>{dict.TemplateContact.contactMe.titleMain}</h2>
          <p className='text-lg mb-6'>{dict.TemplateContact.contactMe.description}</p>
        </div>

        <TypeFromWidget />

        <div className="contact__benefits mb-8">
          <h3 className='text-2xl font-semibold mb-4'>{dict.TemplateContact.contactMe.callToAction}</h3>
          <Accordion type="single" collapsible className="w-full">
            {dict.TemplateContact.contactMe.benefits.map((benefit, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{benefit.title}</AccordionTrigger>
                <AccordionContent>
                  {benefit.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <p className='text-lg mb-1'>{dict.TemplateContact.contactMe.formIntro}</p>
      </section>
    </MaxWidthWrapper>
  )
}