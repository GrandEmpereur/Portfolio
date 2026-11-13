import type { Metadata } from 'next';
import { setStaticParamsLocale } from 'next-international/server';
import { getScopedI18n } from '@/locales/serveur';
import { providers, publisher } from '@/lib/legal.data';
import {
  buildLegalMetadata,
  ContactValue,
  LegalFacts,
  LegalLink,
  LegalPage,
  LegalSection,
  toLocale,
} from '@/components/legal/LegalPage';
import { SiteFooter } from '@/components/site/SiteFooter';

const PATH = '/mentions-legales';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  setStaticParamsLocale(locale);
  const t = await getScopedI18n('legalPages');
  return buildLegalMetadata({
    locale,
    path: PATH,
    title: t('mentions.meta.title'),
    description: t('mentions.meta.description'),
  });
}

export default async function LegalNoticePage({ params }: PageProps) {
  const locale = toLocale((await params).locale);
  setStaticParamsLocale(locale);
  const t = await getScopedI18n('legalPages');
  const { address } = publisher;

  return (
    <>
      <LegalPage
        locale={locale}
        title={t('mentions.title')}
        intro={t('mentions.intro')}
        updatedLabel={t('common.updated')}
        frenchNote={t('common.frenchPrevails')}
      >
        <LegalSection id="editeur" title={t('mentions.publisher.title')}>
          <p>{t('mentions.publisher.text')}</p>
          <LegalFacts
            rows={[
              { label: t('common.label.name'), value: `${publisher.name}, ${publisher.legalForm}` },
              {
                label: t('common.label.address'),
                value: `${address.street}, ${address.postalCode} ${address.city}, ${address.country}`,
              },
              { label: t('common.label.siren'), value: publisher.siren },
              { label: t('common.label.siret'), value: publisher.siret },
              { label: t('common.label.email'), value: <a href={`mailto:${publisher.email}`}>{publisher.email}</a> },
              { label: t('common.label.phone'), value: publisher.phone },
              { label: t('common.label.director'), value: publisher.publicationDirector },
            ]}
          />
        </LegalSection>

        <LegalSection id="hebergeur" title={t('mentions.host.title')}>
          <p>{t('mentions.host.text')}</p>
          <LegalFacts
            rows={[
              { label: t('common.label.company'), value: providers.vercel.entity },
              { label: t('common.label.address'), value: providers.vercel.address },
              { label: t('common.label.contact'), value: <ContactValue value={providers.vercel.contact} /> },
            ]}
          />
        </LegalSection>

        <LegalSection id="domaine" title={t('mentions.domain.title')}>
          <p>{t('mentions.domain.text')}</p>
          <LegalFacts
            rows={[
              { label: t('common.label.company'), value: providers.ovh.entity },
              { label: t('common.label.address'), value: providers.ovh.address },
              { label: t('common.label.contact'), value: t('providers.ovhContact') },
            ]}
          />
        </LegalSection>

        <LegalSection id="reseau" title={t('mentions.network.title')}>
          <p>{t('mentions.network.text')}</p>
          <LegalFacts
            rows={[
              { label: t('common.label.company'), value: providers.cloudflare.entity },
              { label: t('common.label.address'), value: providers.cloudflare.address },
              { label: t('common.label.contact'), value: <ContactValue value={providers.cloudflare.contact} /> },
            ]}
          />
        </LegalSection>

        <LegalSection id="propriete-intellectuelle" title={t('mentions.ip.title')}>
          <p>{t('mentions.ip.text1')}</p>
          <p>{t('mentions.ip.text2')}</p>
        </LegalSection>

        <LegalSection id="signalement" title={t('mentions.report.title')}>
          <p>{t('mentions.report.text')}</p>
          <p>
            <a href={`mailto:${publisher.email}`}>{publisher.email}</a>
          </p>
        </LegalSection>

        <LegalSection id="voir-aussi" title={t('mentions.data.title')}>
          <p>{t('mentions.data.privacy')}</p>
          <p>{t('mentions.data.cookies')}</p>
          <ul className="lg-list">
            <li>
              <LegalLink locale={locale} path="/politique-confidentialite">
                {t('common.links.privacy')}
              </LegalLink>
            </li>
            <li>
              <LegalLink locale={locale} path="/politique-cookies">
                {t('common.links.cookies')}
              </LegalLink>
            </li>
            <li>
              <LegalLink locale={locale} path="/conditions-utilisation">
                {t('common.links.terms')}
              </LegalLink>
            </li>
          </ul>
        </LegalSection>
      </LegalPage>
      <SiteFooter />
    </>
  );
}
