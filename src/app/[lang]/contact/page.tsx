import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import TypeFromWidget from '@/components/TypeFromWidget'
import { Locale } from '@/i18nConfig';
import { Metadata } from 'next';
import React from 'react'
import { getDictionary } from '@/get-dictionary';

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(lang);

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
      canonical: `https://patrick.bartosik.fr/${lang}/contact`,
      languages: {
        'fr': 'https://patrick.bartosik.fr/fr/contact',
        'en': 'https://patrick.bartosik.fr/en/contact',
      },
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
      <section id='Contact' className='contact flex flex-col w-full gap-y-12'>
        <div className="contact__title">
          <h1 className='contact__title-sub font-semibold text-2xl'>{dict.TemplateContact.contactMe.titleSub}</h1>
          <h4 className='contact__title-main keep-color'>{dict.TemplateContact.contactMe.titleMain}</h4>
          <p className='pt-2'>{dict.TemplateContact.contactMe.description}</p>
        </div>

        <TypeFromWidget />
      </section>
    </MaxWidthWrapper>
  )
}
