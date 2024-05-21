import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import TypeFromWidget from '@/components/TypeFromWidget'
import { Locale } from '@/i18nConfig';
import { Metadata } from 'next';
import React from 'react'
import { getDictionary } from '@/get-dictionary';

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }) {
  const dict = await getDictionary(lang);

  return {
    title: dict.TemplateContact.metadata.title,
    description: dict.TemplateContact.metadata.description,
    openGraph: {
      title: dict.TemplateContact.metadata.title,
      description: dict.TemplateContact.metadata.description,
      url: `https://patrick.bartosik.fr/${lang}/contact`,
      type: 'website',
      images: [
        {
          url: 'https://patrick.bartosik.fr/img/contact/contactHero.png',
          width: 800,
          height: 600,
          alt: 'Image de contact de Patrick Bartosik',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.TemplateContact.metadata.title,
      description: dict.TemplateContact.metadata.description,
      images: [
        {
          url: 'https://patrick.bartosik.fr/img/contact/contactHero.png',
          alt: 'Image de contact de Patrick Bartosik',
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
