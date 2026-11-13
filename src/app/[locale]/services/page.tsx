import type { Metadata } from 'next';
import { setStaticParamsLocale } from 'next-international/server';
import { getI18n } from '@/locales/serveur';
import { LOCALES, type Locale } from '@/lib/locale-path';
import { ogLocaleMap, seoConfig } from '@/lib/seo-config';
import { serializeJsonLd } from '@/lib/structured-data';
import { services, type ServiceCategory } from '@/lib/data/services.data';
import {
  getServicesBreadcrumbSchema,
  getServicesFaqSchema,
  getServicesSchema,
  servicesPageUrl,
} from '@/lib/services-structured-data';
import { SiteFooter } from '@/components/site/SiteFooter';
import { ServicesHead } from '@/components/services/ServicesHead';
import { ServiceSection } from '@/components/services/ServiceSection';
import { ServicesClosing } from '@/components/services/ServicesClosing';
import { ServicesMotion } from '@/components/services/ServicesMotion';
import '@/components/services/services.css';

const toLocale = (value: string): Locale => LOCALES.find((l) => l === value) ?? 'fr';

// One group per category: AI on a light background, Full Stack on a dark one.
const GROUPS: { category: ServiceCategory; theme: string }[] = [
  { category: 'ai', theme: 'theme-light' },
  { category: 'fullstack', theme: 'theme-dark' },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  setStaticParamsLocale(locale);
  const t = await getI18n();

  const title = t('servicesPage.metaTitle');
  const description = t('servicesPage.metaDescription');
  const url = servicesPageUrl(locale);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        'fr-FR': servicesPageUrl('fr'),
        'en-US': servicesPageUrl('en'),
        'pl-PL': servicesPageUrl('pl'),
        'x-default': servicesPageUrl('fr'),
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: seoConfig.siteName,
      locale: ogLocaleMap[locale] ?? locale,
      type: 'website',
      images: [
        {
          url: `${seoConfig.baseUrl}${seoConfig.openGraph.image}`,
          width: seoConfig.openGraph.imageWidth,
          height: seoConfig.openGraph.imageHeight,
          alt: title,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${seoConfig.baseUrl}${seoConfig.openGraph.image}`],
    },
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  setStaticParamsLocale(locale);
  const t = await getI18n();

  const faqSchema = getServicesFaqSchema(locale);
  const schemas: { key: string; data: unknown }[] = [
    { key: 'services', data: getServicesSchema(locale) },
    {
      key: 'breadcrumb',
      data: getServicesBreadcrumbSchema(locale, {
        home: t('common.nav.chapters.accueil'),
        services: t('servicesPage.breadcrumb'),
      }),
    },
    ...(faqSchema ? [{ key: 'faq', data: faqSchema }] : []),
  ];

  return (
    <>
      {schemas.map(({ key, data }) => (
        <script key={key} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />
      ))}

      <main id="main-content" className="text-fg">
        <ServicesMotion>
          <ServicesHead locale={locale} />
          {GROUPS.map((group) => (
            <div key={group.category} className={group.theme}>
              {services
                .filter((service) => service.category === group.category)
                .map((service) => (
                  <ServiceSection key={service.id} service={service} locale={locale} />
                ))}
            </div>
          ))}
          <ServicesClosing locale={locale} />
        </ServicesMotion>
      </main>
      <SiteFooter />
    </>
  );
}
