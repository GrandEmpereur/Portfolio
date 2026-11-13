import type { Metadata } from 'next';
import { setStaticParamsLocale } from 'next-international/server';
import { getScopedI18n } from '@/locales/serveur';
import { providers, publisher, type ProviderId } from '@/lib/legal.data';
import {
  buildLegalMetadata,
  ContactValue,
  ExternalLink,
  LegalFacts,
  LegalLink,
  LegalPage,
  LegalSection,
  toLocale,
} from '@/components/legal/LegalPage';
import { SiteFooter } from '@/components/site/SiteFooter';

const PATH = '/politique-confidentialite';
const PROVIDER_ORDER: readonly ProviderId[] = ['vercel', 'cloudflare', 'ovh', 'resend', 'google', 'calcom'];

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  setStaticParamsLocale(locale);
  const t = await getScopedI18n('legalPages');
  return buildLegalMetadata({
    locale,
    path: PATH,
    title: t('privacy.meta.title'),
    description: t('privacy.meta.description'),
  });
}

export default async function PrivacyPolicyPage({ params }: PageProps) {
  const locale = toLocale((await params).locale);
  setStaticParamsLocale(locale);
  const t = await getScopedI18n('legalPages');
  const { address } = publisher;

  return (
    <>
      <LegalPage
        locale={locale}
        title={t('privacy.title')}
        intro={t('privacy.intro')}
        updatedLabel={t('common.updated')}
        frenchNote={t('common.frenchPrevails')}
      >
        <LegalSection id="responsable" title={t('privacy.controller.title')}>
          <p>{t('privacy.controller.text')}</p>
          <LegalFacts
            rows={[
              { label: t('common.label.name'), value: `${publisher.name}, ${publisher.legalForm}` },
              {
                label: t('common.label.address'),
                value: `${address.street}, ${address.postalCode} ${address.city}, ${address.country}`,
              },
              { label: t('common.label.email'), value: <a href={`mailto:${publisher.email}`}>{publisher.email}</a> },
              { label: t('common.label.phone'), value: publisher.phone },
            ]}
          />
        </LegalSection>

        <LegalSection id="demandes-de-contact" title={t('privacy.contact.title')}>
          <LegalFacts
            rows={[
              { label: t('privacy.label.purpose'), value: t('privacy.contact.purpose') },
              { label: t('privacy.label.basis'), value: t('privacy.contact.basis') },
              { label: t('privacy.label.data'), value: t('privacy.contact.data') },
              { label: t('privacy.label.required'), value: t('privacy.contact.required') },
              { label: t('privacy.label.scoring'), value: t('privacy.contact.scoring') },
              { label: t('privacy.label.recipients'), value: t('privacy.contact.recipients') },
              { label: t('privacy.label.retention'), value: t('privacy.contact.retention') },
            ]}
          />
        </LegalSection>

        <LegalSection id="mesure-d-audience" title={t('privacy.audience.title')}>
          <LegalFacts
            rows={[
              { label: t('privacy.label.purpose'), value: t('privacy.audience.purpose') },
              { label: t('privacy.label.basis'), value: t('privacy.audience.basis') },
              { label: t('privacy.label.data'), value: t('privacy.audience.data') },
              { label: t('privacy.label.recipients'), value: t('privacy.audience.recipients') },
            ]}
          />
          <p>
            <LegalLink locale={locale} path="/politique-cookies">
              {t('common.links.cookies')}
            </LegalLink>
          </p>
        </LegalSection>

        <LegalSection id="mesure-de-performance" title={t('privacy.performance.title')}>
          <LegalFacts
            rows={[
              { label: t('privacy.label.purpose'), value: t('privacy.performance.purpose') },
              { label: t('privacy.label.basis'), value: t('privacy.performance.basis') },
              { label: t('privacy.label.data'), value: t('privacy.performance.data') },
              { label: t('privacy.label.recipients'), value: t('privacy.performance.recipients') },
            ]}
          />
        </LegalSection>

        <LegalSection id="rendez-vous" title={t('privacy.booking.title')}>
          <LegalFacts
            rows={[
              { label: t('privacy.label.purpose'), value: t('privacy.booking.purpose') },
              { label: t('privacy.label.basis'), value: t('privacy.booking.basis') },
              { label: t('privacy.label.data'), value: t('privacy.booking.data') },
              { label: t('privacy.label.recipients'), value: t('privacy.booking.recipients') },
            ]}
          />
        </LegalSection>

        <LegalSection id="journaux-techniques" title={t('privacy.logs.title')}>
          <LegalFacts
            rows={[
              { label: t('privacy.label.purpose'), value: t('privacy.logs.purpose') },
              { label: t('privacy.label.basis'), value: t('privacy.logs.basis') },
              { label: t('privacy.label.data'), value: t('privacy.logs.data') },
              { label: t('privacy.label.recipients'), value: t('privacy.logs.recipients') },
            ]}
          />
        </LegalSection>

        <LegalSection id="prestataires" title={t('privacy.processors.title')}>
          <p>{t('privacy.processors.text')}</p>
          {PROVIDER_ORDER.map((id) => {
            const provider = providers[id];
            return (
              <article key={id} className="lg-card">
                <h3>{provider.name}</h3>
                <LegalFacts
                  rows={[
                    { label: t('providers.label.role'), value: t(`providers.${id}.role`) },
                    { label: t('providers.label.entity'), value: provider.entity },
                    { label: t('providers.label.address'), value: provider.address },
                    { label: t('providers.label.country'), value: t(`providers.${id}.country`) },
                    { label: t('providers.label.transfers'), value: t(`providers.${id}.transfers`) },
                    {
                      label: t('providers.label.contact'),
                      value: id === 'ovh' ? t('providers.ovhContact') : <ContactValue value={provider.contact} />,
                    },
                  ]}
                />
                <p>
                  <ExternalLink href={provider.url}>{t('common.moreInfo')}</ExternalLink>
                </p>
              </article>
            );
          })}
        </LegalSection>

        <LegalSection id="vos-droits" title={t('privacy.rights.title')}>
          <p>{t('privacy.rights.text')}</p>
          <ul className="lg-list">
            <li>{t('privacy.rights.access')}</li>
            <li>{t('privacy.rights.rectification')}</li>
            <li>{t('privacy.rights.erasure')}</li>
            <li>{t('privacy.rights.restriction')}</li>
            <li>{t('privacy.rights.objection')}</li>
            <li>{t('privacy.rights.portability')}</li>
            <li>{t('privacy.rights.withdrawal')}</li>
          </ul>
          <p>{t('privacy.rights.how')}</p>
          <p>
            <a href={`mailto:${publisher.email}`}>{publisher.email}</a>
          </p>
        </LegalSection>

        <LegalSection id="reclamation" title={t('privacy.complaint.title')}>
          <p>{t('privacy.complaint.text')}</p>
          <p>
            <ExternalLink href="https://www.cnil.fr">www.cnil.fr</ExternalLink>
          </p>
        </LegalSection>
      </LegalPage>
      <SiteFooter />
    </>
  );
}
