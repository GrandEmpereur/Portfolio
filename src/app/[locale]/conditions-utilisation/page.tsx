import type { Metadata } from 'next';
import { setStaticParamsLocale } from 'next-international/server';
import { getScopedI18n } from '@/locales/serveur';
import { publisher } from '@/lib/legal.data';
import {
  buildLegalMetadata,
  LegalLink,
  LegalPage,
  LegalSection,
  toLocale,
} from '@/components/legal/LegalPage';
import { SiteFooter } from '@/components/site/SiteFooter';

const PATH = '/conditions-utilisation';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  setStaticParamsLocale(locale);
  const t = await getScopedI18n('legalPages');
  return buildLegalMetadata({
    locale,
    path: PATH,
    title: t('terms.meta.title'),
    description: t('terms.meta.description'),
  });
}

export default async function TermsOfUsePage({ params }: PageProps) {
  const locale = toLocale((await params).locale);
  setStaticParamsLocale(locale);
  const t = await getScopedI18n('legalPages');

  return (
    <>
      <LegalPage
        locale={locale}
        title={t('terms.title')}
        intro={t('terms.intro')}
        updatedLabel={t('common.updated')}
        frenchNote={t('common.frenchPrevails')}
      >
        <LegalSection id="objet" title={t('terms.object.title')}>
          <p>{t('terms.object.text')}</p>
        </LegalSection>

        <LegalSection id="acces" title={t('terms.access.title')}>
          <p>{t('terms.access.text')}</p>
        </LegalSection>

        <LegalSection id="propriete-intellectuelle" title={t('terms.ip.title')}>
          <p>{t('terms.ip.text')}</p>
        </LegalSection>

        <LegalSection id="exactitude" title={t('terms.accuracy.title')}>
          <p>{t('terms.accuracy.text')}</p>
        </LegalSection>

        <LegalSection id="responsabilite" title={t('terms.liability.title')}>
          <p>{t('terms.liability.text')}</p>
        </LegalSection>

        <LegalSection id="liens-externes" title={t('terms.links.title')}>
          <p>{t('terms.links.text')}</p>
        </LegalSection>

        <LegalSection id="droit-applicable" title={t('terms.law.title')}>
          <p>{t('terms.law.text')}</p>
          <p>
            <a href={`mailto:${publisher.email}`}>{publisher.email}</a>
          </p>
        </LegalSection>

        <LegalSection id="voir-aussi" title={t('common.seeAlso')}>
          <ul className="lg-list">
            <li>
              <LegalLink locale={locale} path="/mentions-legales">
                {t('common.links.mentions')}
              </LegalLink>
            </li>
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
          </ul>
        </LegalSection>
      </LegalPage>
      <SiteFooter />
    </>
  );
}
