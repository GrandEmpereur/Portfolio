import { Fragment, type ReactNode } from 'react';
import type { Metadata } from 'next';
import { LEGAL_UPDATED_AT } from '@/lib/legal.data';
import { LOCALES, localePath, type Locale } from '@/lib/locale-path';
import { ogLocaleMap, seoConfig } from '@/lib/seo-config';
import { TransitionLink } from '@/components/site/TransitionLink';
import './legal.css';

const INTL_LOCALE: Record<Locale, string> = { fr: 'fr-FR', en: 'en-GB', pl: 'pl-PL' };
const HREFLANG: Record<Locale, string> = { fr: 'fr-FR', en: 'en', pl: 'pl' };

export const toLocale = (value: string): Locale => (LOCALES.find((l) => l === value) ?? 'fr');

const absolute = (locale: Locale, path: string): string => `${seoConfig.baseUrl}${localePath(locale, path)}`;

interface LegalMetadataInput {
  locale: Locale;
  /** Unprefixed path, e.g. `/mentions-legales`. */
  path: string;
  title: string;
  description: string;
}

/** Canonical URL for the current language and `hreflang` alternates for the three languages. */
export const buildLegalMetadata = ({ locale, path, title, description }: LegalMetadataInput): Metadata => {
  const url = absolute(locale, path);
  return {
    title,
    description,
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    alternates: {
      canonical: url,
      languages: {
        [HREFLANG.fr]: absolute('fr', path),
        [HREFLANG.en]: absolute('en', path),
        [HREFLANG.pl]: absolute('pl', path),
        'x-default': absolute('fr', path),
      },
    },
    openGraph: {
      title,
      description,
      url,
      locale: ogLocaleMap[locale] ?? locale,
      images: [
        {
          url: `${seoConfig.baseUrl}${seoConfig.openGraph.image}`,
          width: seoConfig.openGraph.imageWidth,
          height: seoConfig.openGraph.imageHeight,
          alt: title,
        },
      ],
    },
  };
};

interface LegalPageProps {
  locale: Locale;
  title: string;
  intro?: string;
  updatedLabel: string;
  /** Shown on non-French pages only. */
  frenchNote: string;
  children: ReactNode;
}

export const LegalPage = ({ locale, title, intro, updatedLabel, frenchNote, children }: LegalPageProps) => {
  const date = new Intl.DateTimeFormat(INTL_LOCALE[locale], { dateStyle: 'long', timeZone: 'UTC' }).format(
    new Date(`${LEGAL_UPDATED_AT}T00:00:00Z`),
  );

  return (
    <main id="main-content" className="lg pad-x text-fg">
      <div className="lg-inner">
        <header className="lg-head">
          <h1 className="display lg-title">{title}</h1>
          <p className="lg-meta mono-label text-mut">
            <span>
              {updatedLabel} : <time dateTime={LEGAL_UPDATED_AT}>{date}</time>
            </span>
            {locale !== 'fr' && <span>{frenchNote}</span>}
          </p>
          {intro && <p className="lg-intro">{intro}</p>}
        </header>
        {children}
      </div>
    </main>
  );
};

interface LegalSectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

export const LegalSection = ({ id, title, children }: LegalSectionProps) => (
  <section id={id} aria-labelledby={`${id}-title`} className="lg-section">
    <h2 id={`${id}-title`}>{title}</h2>
    <div className="lg-body">{children}</div>
  </section>
);

export interface LegalFact {
  label: string;
  value: ReactNode;
}

/** Label/value list. A row whose value is empty is not rendered. */
export const LegalFacts = ({ rows }: { rows: readonly LegalFact[] }) => (
  <dl className="lg-facts">
    {rows
      .filter((row) => row.value !== '' && row.value !== null && row.value !== undefined && row.value !== false)
      .map((row) => (
        <div key={row.label}>
          <dt>{row.label}</dt>
          <dd>{row.value}</dd>
        </div>
      ))}
  </dl>
);

/** Turns e-mail addresses and web addresses of a comma-separated contact string into links. */
export const ContactValue = ({ value }: { value: string }) => {
  const parts = value.split(', ');
  return (
    <>
      {parts.map((part, index) => (
        <Fragment key={part}>
          {index > 0 && ', '}
          {/^https?:\/\//.test(part) ? (
            <a href={part} target="_blank" rel="noopener noreferrer">
              {part}
            </a>
          ) : /^[^\s@]+@[^\s@]+$/.test(part) ? (
            <a href={`mailto:${part}`}>{part}</a>
          ) : (
            part
          )}
        </Fragment>
      ))}
    </>
  );
};

export const ExternalLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

/** Internal link that stays in the visitor's language. */
export const LegalLink = ({ locale, path, children }: { locale: Locale; path: string; children: ReactNode }) => (
  <TransitionLink href={localePath(locale, path)}>{children}</TransitionLink>
);
