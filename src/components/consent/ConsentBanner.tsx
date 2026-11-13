'use client';

import { useEffect, useRef, useState } from 'react';
import { onConsentChange, readConsent, writeConsent } from '@/lib/consent';
import { localePath } from '@/lib/locale-path';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import './consent.css';

/**
 * Bottom region, never in the served HTML (shown after mount only when no choice is stored).
 * Not a modal: the page stays usable and focus is not trapped.
 */
export const ConsentBanner = () => {
  const t = useScopedI18n('common.consent');
  const locale = useCurrentLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const focusOnOpen = useRef(false);

  useEffect(() => {
    setOpen(readConsent() === null);
    const off = onConsentChange((choice) => setOpen(choice === null));
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element) || !event.target.closest('[data-consent-open]')) return;
      // Reopen only: the stored choice stays until the visitor picks again.
      focusOnOpen.current = true;
      setOpen(true);
    };
    document.addEventListener('click', onClick);
    return () => {
      off();
      document.removeEventListener('click', onClick);
    };
  }, []);

  // Reopened from the footer: bring keyboard users to the banner.
  useEffect(() => {
    if (open && focusOnOpen.current) {
      focusOnOpen.current = false;
      ref.current?.focus();
    }
  }, [open]);

  if (!open) return null;

  return (
    <section ref={ref} className="cs-banner" role="region" aria-label={t('title')} tabIndex={-1}>
      <div className="cs-text">
        <p className="cs-title mono-label">{t('title')}</p>
        <p className="cs-body">
          {t('body')}{' '}
          <a className="cs-link" href={localePath(locale, '/politique-cookies')}>
            {t('policy')}
          </a>
        </p>
      </div>
      <div className="cs-actions">
        <button type="button" className="cs-btn" onClick={() => writeConsent('denied')}>
          {t('refuse')}
        </button>
        <button type="button" className="cs-btn" onClick={() => writeConsent('granted')}>
          {t('accept')}
        </button>
      </div>
    </section>
  );
};
