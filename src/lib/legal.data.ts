import { seoConfig } from '@/lib/seo-config';

/**
 * Single source for the publisher identity and the processors named on the legal pages.
 * Every value is copied from docs/superpowers/specs/2026-11-13-legal-facts.md; nothing is added.
 * Not published (to be confirmed by the publisher): VAT number, RCS/RNE number.
 * An empty `phone` hides its line on the pages.
 */
export const LEGAL_UPDATED_AT = '2026-11-13' as const;

export interface PublisherAddress {
  street: string;
  postalCode: string;
  city: string;
  country: string;
}

export interface Publisher {
  name: string;
  legalForm: string;
  siren: string;
  siret: string;
  address: PublisherAddress;
  apeCode: string;
  email: string;
  phone: string;
  publicationDirector: string;
}

export const publisher: Publisher = {
  name: 'Patrick Bartosik',
  legalForm: 'Entrepreneur individuel (EI)',
  siren: '900 938 218',
  siret: '900 938 218 00014',
  address: {
    street: '28 bis rue Honoré Sohier',
    postalCode: '93600',
    city: 'Aulnay-sous-Bois',
    country: 'France',
  },
  apeCode: '70.22Z',
  email: seoConfig.author.email,
  phone: '',
  publicationDirector: 'Patrick Bartosik',
};

export interface Provider {
  name: string;
  role: string;
  entity: string;
  address: string;
  contact: string;
  transfers: string;
  url: string;
}

export type ProviderId = 'vercel' | 'ovh' | 'cloudflare' | 'resend' | 'google' | 'calcom';

export const providers: Record<ProviderId, Provider> = {
  vercel: {
    name: 'Vercel',
    role: 'Hébergeur',
    entity: 'Vercel Inc.',
    address: '440 N Barranca Ave #4133, Covina, CA 91723, États-Unis',
    contact: 'privacy@vercel.com, https://vercel.com/help',
    transfers:
      'DPA intégré aux conditions, clauses contractuelles types 2021, Data Privacy Framework UE-États-Unis',
    url: 'https://vercel.com/legal/privacy-policy',
  },
  ovh: {
    name: 'OVH',
    role: 'Bureau d\'enregistrement du nom de domaine',
    entity: 'OVH SAS, capital 50 000 000 €, RCS Lille Métropole 424 761 419 00045',
    address: '2 rue Kellermann, 59100 Roubaix, France',
    contact: '1007 (depuis l\'étranger +33 9 72 10 10 07)',
    transfers: 'Aucun',
    url: 'https://www.ovhcloud.com/fr/terms-and-conditions/',
  },
  cloudflare: {
    name: 'Cloudflare',
    role: 'DNS et proxy devant le site',
    entity: 'Cloudflare, Inc.',
    address: '101 Townsend St., San Francisco, CA 94107, États-Unis',
    contact: '+1 (650) 319-8930, privacyquestions@cloudflare.com',
    transfers: 'Data Privacy Framework, clauses contractuelles types en repli',
    url: 'https://www.cloudflare.com/privacypolicy/',
  },
  resend: {
    name: 'Resend',
    role: 'Envoi des e-mails du formulaire',
    entity: 'Plus Five Five, Inc.',
    address: '2261 Market Street #5039, San Francisco, CA 94114, États-Unis',
    contact: 'privacy@resend.com',
    transfers: 'Clauses contractuelles types 2021, Data Privacy Framework',
    url: 'https://resend.com/legal/dpa',
  },
  google: {
    name: 'Google',
    role: 'Analytics et Tag Manager, après consentement',
    entity: 'Google Ireland Limited',
    address: 'Gordon House, Barrow Street, Dublin 4, Irlande',
    contact: 'https://policies.google.com/technologies/partner-sites?hl=fr',
    transfers: 'Google LLC certifiée Data Privacy Framework, clauses contractuelles types sinon',
    url: 'https://policies.google.com/privacy?hl=fr&gl=fr',
  },
  calcom: {
    name: 'Cal.com',
    role: 'Prise de rendez-vous, si activée',
    entity: 'Cal.com, Inc.',
    address: '2261 Market Street #4382, San Francisco, CA 94114, États-Unis',
    contact: 'privacy@cal.com',
    transfers: 'Clauses contractuelles types, Data Privacy Framework tant que certifié',
    url: 'https://cal.com/dpa',
  },
};
