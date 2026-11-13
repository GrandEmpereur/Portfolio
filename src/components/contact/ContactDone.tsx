'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP } from '@/lib/gsap-config';
import { bookingUrl } from '@/lib/booking';
import { SOURCES } from '@/lib/contact-request';
import { localePath, type Locale } from '@/lib/locale-path';
import { isDesktop, prefersReducedMotion } from '@/lib/motion';
import { track } from '@/lib/track';
import { useScopedI18n } from '@/locales/client';
import { TransitionLink } from '@/components/site/TransitionLink';

interface ContactDoneProps {
  locale: Locale;
  firstName: string;
  email: string;
}

type Source = (typeof SOURCES)[number];

const NEXT_STEPS = [
  { code: '01', key: 'step1' },
  { code: '02', key: 'step2' },
  { code: '03', key: 'step3' },
] as const;

/** Shown after a successful send: what happens next, not a bare thank-you. */
export const ContactDone = ({ locale, firstName, email }: ContactDoneProps) => {
  const t = useScopedI18n('contactPage');
  const rootRef = useRef<HTMLDivElement>(null);
  const [source, setSource] = useState<Source | null>(null);
  const booking = bookingUrl(locale);

  useEffect(() => {
    rootRef.current?.querySelector<HTMLElement>('h2')?.focus({ preventScroll: true });
    if (!isDesktop()) window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }, []);

  useGSAP(
    () => {
      const root = rootRef.current;
      const title = root?.querySelector<HTMLElement>('h2');
      if (!root || !title || prefersReducedMotion()) return;
      // The title is text React renders and may render again: it is revealed as a whole, without splitting its DOM.
      gsap.from(title, { yPercent: 40, autoAlpha: 0, duration: 0.9, ease: 'pb', clearProps: 'transform,opacity,visibility' });
      gsap.from(root.querySelectorAll('.cx-thanks, .cx-next li, .cx-actions, .cx-sub, .cx-chips, .cx-source-ok'), {
        y: 22,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.07,
        delay: 0.25,
        ease: 'pb',
        clearProps: 'transform,opacity,visibility',
      });
    },
    { scope: rootRef },
  );

  const chooseSource = (value: Source) => {
    if (source) return;
    setSource(value);
    track('contact_source', { source: value });
    // A bonus question: a failure here must never reach the visitor.
    fetch('/api/contact-source', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source: value }),
    }).catch(() => undefined);
  };

  return (
    <div className="cx-done" ref={rootRef} data-lenis-prevent>
      <p className="mono-label cx-done-label">{t('done.label')}</p>
      <h2 className="display cx-done-title" tabIndex={-1}>
        {t('done.title1')} <span className="text-acc">{t('done.title2')}</span>
      </h2>
      <p className="cx-thanks">{firstName ? t('done.thanksNamed', { name: firstName }) : t('done.thanks')}</p>
      <ol className="cx-next">
        {NEXT_STEPS.map((item) => (
          <li key={item.code}>
            <span className="mono-label">{item.code}</span>
            <b>{t(`done.${item.key}.title`)}</b>
            <span>{t(`done.${item.key}.text`)}</span>
          </li>
        ))}
      </ol>
      <div className="cx-actions">
        {booking ? (
          <a
            className="btn"
            href={booking}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('contact_booking_click')}
          >
            {t('done.booking')} <span aria-hidden="true">↗</span>
          </a>
        ) : null}
        <TransitionLink className="btn btn-ghost" href={localePath(locale, '/#projets')}>
          {t('done.projects')}
        </TransitionLink>
      </div>
      <fieldset className="cx-source">
        <legend className="cx-sub">{t('done.sourceTitle')}</legend>
        <div className="cx-chips">
          {SOURCES.map((id) => (
            <label className="cx-chip" key={id}>
              <input
                type="radio"
                name="source"
                value={id}
                checked={source === id}
                disabled={source !== null}
                onChange={() => chooseSource(id)}
              />
              <span>{t(`done.source.${id}`)}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <p className="mono-label cx-source-ok" role="status">
        {source ? t('done.sourceThanks') : null}
      </p>
    </div>
  );
};
