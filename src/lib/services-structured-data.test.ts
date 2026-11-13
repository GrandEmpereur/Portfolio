import { expect, test } from 'bun:test';
import { services } from '@/lib/data/services.data';
import type { ServiceDetail } from '@/lib/data/service-details.data';
import { getServicesBreadcrumbSchema, getServicesFaqSchema, getServicesSchema } from '@/lib/services-structured-data';

test('one Service per service, tied to the Person and with no price field', () => {
  const schema = getServicesSchema('en');
  expect(schema['@graph']).toHaveLength(services.length);
  const first = schema['@graph'][0];
  expect(first['@type']).toBe('Service');
  expect(first.url.endsWith('/en/services#llm-integration')).toBe(true);
  expect(first.provider['@id'].endsWith('/#person')).toBe(true);
  expect(JSON.stringify(schema)).not.toMatch(/offers|price/i);
});

test('French URLs carry no locale prefix', () => {
  expect(getServicesSchema('fr')['@graph'][0].url).not.toContain('/fr/');
});

test('breadcrumb lists home then services', () => {
  const crumbs = getServicesBreadcrumbSchema('pl', { home: 'Start', services: 'Usługi' }).itemListElement;
  expect(crumbs.map((c) => c.name)).toEqual(['Start', 'Usługi']);
  expect(crumbs[1].item.endsWith('/pl/services')).toBe(true);
});

test('FAQPage is omitted without questions and built from the rendered ones otherwise', () => {
  expect(getServicesFaqSchema('fr', services, () => undefined)).toBeNull();
  const detail: ServiceDetail = {
    id: services[0].id,
    need: 'llm',
    intro: { fr: '', en: '', pl: '' },
    useCases: { fr: [], en: [], pl: [] },
    deliverables: { fr: [], en: [], pl: [] },
    steps: { fr: [], en: [], pl: [] },
    faq: { fr: [{ question: 'Q ?', answer: 'R.' }], en: [], pl: [] },
  };
  const faq = getServicesFaqSchema('fr', services, (id) => (id === detail.id ? detail : undefined));
  expect(faq?.mainEntity).toHaveLength(1);
  expect(getServicesFaqSchema('en', services, (id) => (id === detail.id ? detail : undefined))).toBeNull();
});
