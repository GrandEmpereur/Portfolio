import type { Metadata } from 'next';
import { setStaticParamsLocale } from 'next-international/server';
import { getScopedI18n } from '@/locales/serveur';
import {
  buildLegalMetadata,
  LegalLink,
  LegalPage,
  LegalSection,
  toLocale,
} from '@/components/legal/LegalPage';
import { SiteFooter } from '@/components/site/SiteFooter';

const PATH = '/politique-cookies';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  setStaticParamsLocale(locale);
  const t = await getScopedI18n('legalPages');
  return buildLegalMetadata({
    locale,
    path: PATH,
    title: t('cookies.meta.title'),
    description: t('cookies.meta.description'),
  });
}

export default async function CookiePolicyPage({ params }: PageProps) {
  const locale = toLocale((await params).locale);
  setStaticParamsLocale(locale);
  const t = await getScopedI18n('legalPages');

  return (
    <>
      <LegalPage
        locale={locale}
        title={t('cookies.title')}
        intro={t('cookies.intro')}
        updatedLabel={t('common.updated')}
        frenchNote={t('common.frenchPrevails')}
      >
        <LegalSection id="avant-le-choix" title={t('cookies.before.title')}>
          <p>{t('cookies.before.text')}</p>
        </LegalSection>

        <LegalSection id="strictement-necessaire" title={t('cookies.necessary.title')}>
          <p>{t('cookies.necessary.text1')}</p>
          <p>{t('cookies.necessary.text2')}</p>
        </LegalSection>

        <LegalSection id="apres-accord" title={t('cookies.after.title')}>
          <p>{t('cookies.after.text1')}</p>
          <p>{t('cookies.after.text2')}</p>
          <p>
            <LegalLink locale={locale} path="/politique-confidentialite">
              {t('common.links.privacy')}
            </LegalLink>
          </p>
        </LegalSection>

        <LegalSection id="accepter-ou-refuser" title={t('cookies.choice.title')}>
          <p>{t('cookies.choice.text1')}</p>
          <p>{t('cookies.choice.text2')}</p>
        </LegalSection>

        <LegalSection id="modifier-votre-choix" title={t('cookies.change.title')}>
          <p>{t('cookies.change.text1')}</p>
          <p>{t('cookies.change.text2')}</p>
        </LegalSection>
      </LegalPage>
      <SiteFooter />
    </>
  );
}
