import { seoConfig } from './seo-config';
import { services as allServices, type Service } from './data/services.data';
import { getServiceDetail, type ServiceDetail } from './data/service-details.data';
import { getBreadcrumbSchema } from './structured-data';
import { localePath, type Locale } from './locale-path';

// JSON-LD of the /services page. Rendered with `serializeJsonLd` (see structured-data.ts).
// No `offers`, no price field: the site shows no price anywhere.

const PERSON_ID = `${seoConfig.baseUrl}/#person`;

/** Absolute URL of the services page in the given language (French has no prefix). */
export const servicesPageUrl = (locale: Locale): string => `${seoConfig.baseUrl}${localePath(locale, '/services')}`;

type DetailLookup = (id: string) => ServiceDetail | undefined;

/** One `Service` per service, provided by the site's Person, as a single @graph. */
export const getServicesSchema = (locale: Locale, items: readonly Service[] = allServices) => {
  const pageUrl = servicesPageUrl(locale);
  return {
    '@context': 'https://schema.org',
    '@graph': items.map((service) => ({
      '@type': 'Service',
      '@id': `${pageUrl}#${service.id}`,
      name: service.title[locale],
      description: service.description[locale],
      serviceType: service.title[locale],
      url: `${pageUrl}#${service.id}`,
      provider: { '@type': 'Person', '@id': PERSON_ID, name: seoConfig.author.name },
      areaServed: [
        { '@type': 'Country', name: 'France' },
        { '@type': 'Place', name: 'Europe' },
      ],
      availableLanguage: ['fr', 'en', 'pl'],
    })),
  };
};

/** Home, then Services. Names come from the page's own strings. */
export const getServicesBreadcrumbSchema = (locale: Locale, names: { home: string; services: string }) =>
  getBreadcrumbSchema(
    [
      { name: names.home, url: locale === seoConfig.defaultLocale ? '/' : `/${locale}` },
      { name: names.services, url: localePath(locale, '/services') },
    ],
    locale,
  );

/**
 * FAQPage built from the questions the page renders (same services, same order).
 * Returns null when no service has a question, so the page emits no empty FAQPage.
 */
export const getServicesFaqSchema = (
  locale: Locale,
  items: readonly Service[] = allServices,
  lookup: DetailLookup = getServiceDetail,
) => {
  const entries = items.flatMap((service) => lookup(service.id)?.faq[locale] ?? []);
  if (entries.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entries.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
};
