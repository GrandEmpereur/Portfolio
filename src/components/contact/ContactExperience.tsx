'use client';

import { useRef, useState, type ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { gsap, useGSAP } from '@/lib/gsap-config';
import type { Locale } from '@/lib/locale-path';
import { isDesktop, prefersReducedMotion, releaseEnter, whenFontsReady } from '@/lib/motion';
import { seoConfig } from '@/lib/seo-config';
import { track } from '@/lib/track';
import { useScopedI18n } from '@/locales/client';
import { ContactDone } from './ContactDone';
import { ContactDossier } from './ContactDossier';
import { DirectForm } from './DirectForm';
import { GuidedFlow } from './GuidedFlow';
import './contact.css';
import { GUIDED_DEFAULTS, type GuidedValues, type SubmitEndpoint, type SubmitFailure } from './steps';

type Mode = 'guided' | 'direct';

interface ContactExperienceProps {
  locale: Locale;
  /** The page's only <h1>, rendered on the server so it is in the served HTML. */
  heading: ReactNode;
}

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;
const text = (value: unknown): string => (typeof value === 'string' ? value : '');

/** POSTs JSON to a contact route and maps its answer. Never throws. */
const post = async (endpoint: SubmitEndpoint, payload: Record<string, unknown>): Promise<SubmitFailure | null> => {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (response.ok) return null;
    const data: unknown = await response.json().catch(() => null);
    const error = isRecord(data) ? data.error : undefined;
    if (response.status === 429 || error === 'rate_limit') return { kind: 'rate_limit' };
    if (error === 'validation') {
      const fields = isRecord(data) && Array.isArray(data.fields) ? data.fields.filter((f): f is string => typeof f === 'string') : [];
      return { kind: 'validation', fields };
    }
    return { kind: 'send_failed' };
  } catch {
    return { kind: 'network' };
  }
};

export const ContactExperience = ({ locale, heading }: ContactExperienceProps) => {
  const t = useScopedI18n('contactPage');
  const methods = useForm<GuidedValues>({ defaultValues: GUIDED_DEFAULTS });
  const [mode, setMode] = useState<Mode>('guided');
  const [done, setDone] = useState<{ firstName: string; email: string } | null>(null);
  const [sending, setSending] = useState(false);
  const sendingRef = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const shownMode = useRef<Mode>(mode);

  /** One request at a time. Success switches to the confirmation; a failure is handed back to the form. */
  const submit = async (
    endpoint: SubmitEndpoint,
    submitMode: Mode,
    payload: Record<string, unknown>,
    who: { firstName: string; email: string },
  ): Promise<SubmitFailure | null> => {
    if (sendingRef.current) return null;
    sendingRef.current = true;
    setSending(true);
    const failure = await post(endpoint, payload);
    sendingRef.current = false;
    setSending(false);
    if (failure) return failure;
    track('contact_submit', { mode: submitMode });
    setDone(who);
    return null;
  };

  const submitGuided = (payload: Record<string, unknown>) =>
    submit('/api/contact', 'guided', payload, { firstName: text(payload.firstName), email: text(payload.email) });

  const submitDirect = (payload: Record<string, unknown>) =>
    submit('/api/contact-simple', 'direct', payload, {
      firstName: text(payload.name).split(/\s+/)[0] ?? '',
      email: text(payload.email),
    });

  // Page entrance: only on a wide screen with motion allowed. Start states are set here, then the page is released.
  useGSAP(
    (_context, contextSafe) => {
      const root = rootRef.current;
      if (!root || !contextSafe) return;
      if (prefersReducedMotion() || !isDesktop()) {
        releaseEnter();
        return;
      }

      const title = root.querySelector<HTMLElement>('h1');
      const legend = root.querySelector<HTMLElement>('.cx-flow .cx-step.is-active legend');
      const items = root.querySelectorAll<HTMLElement>(
        [
          '.cx-label',
          '.cx-lede',
          '.cx-recap > div',
          '.cx-assure li',
          '.cx-modes',
          '.cx-flow .cx-progress',
          '.cx-flow .cx-actions',
          '.cx-flow .cx-step.is-active :is(.cx-hint, .cx-opt, .cx-sub, .cx-chips, .cx-fields, .cx-legal)',
        ].join(', '),
      );
      gsap.set([title, legend].filter(Boolean), { autoAlpha: 0 });
      gsap.set(items, { y: 18, autoAlpha: 0 });

      let cancelled = false;
      whenFontsReady(
        contextSafe(() => {
          if (cancelled) return;
          // The title and the question are React-owned text: they are revealed as a whole, never split
          // (splitting them emptied their letters as soon as React rendered again).
          if (title) {
            gsap.fromTo(
              title,
              { yPercent: 28, autoAlpha: 0 },
              { yPercent: 0, autoAlpha: 1, duration: 1, ease: 'pb', clearProps: 'transform,opacity,visibility' },
            );
          }
          if (legend) {
            gsap.fromTo(
              legend,
              { yPercent: 40, autoAlpha: 0 },
              { yPercent: 0, autoAlpha: 1, duration: 0.8, delay: 0.3, ease: 'pb', clearProps: 'transform,opacity,visibility' },
            );
          }
          gsap.to(items, {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            stagger: 0.04,
            delay: 0.25,
            ease: 'pb',
            clearProps: 'transform,opacity,visibility',
          });
          releaseEnter();
        }),
      );

      return () => {
        cancelled = true;
      };
    },
    { scope: rootRef },
  );

  // Switching between the guided flow and the direct message: the panel that appears rises in.
  useGSAP(
    () => {
      if (shownMode.current === mode) return;
      shownMode.current = mode;
      if (prefersReducedMotion()) return;
      const panel = rootRef.current?.querySelector(mode === 'guided' ? '.cx-flow' : '.cx-direct');
      if (panel) gsap.from(panel, { y: 18, autoAlpha: 0, duration: 0.5, ease: 'pb', clearProps: 'transform,opacity,visibility' });
    },
    { scope: rootRef, dependencies: [mode] },
  );

  const email = seoConfig.author.email;

  return (
    <FormProvider {...methods}>
      <div ref={rootRef} className="cx-page theme-dark" data-enter="manual" data-mode={mode}>
        <ContactDossier heading={heading} />
        <div className="cx-stage">
          <noscript>
            <p className="cx-noscript">
              {t('noscript')} <a href={`mailto:${email}`}>{email}</a>
            </p>
          </noscript>
          {done ? (
            <ContactDone locale={locale} firstName={done.firstName} email={done.email} />
          ) : (
            <>
              <div className="cx-modes" role="group" aria-label={t('modes.label')}>
                <button type="button" aria-pressed={mode === 'guided'} onClick={() => setMode('guided')}>
                  {t('modes.guided')}
                </button>
                <button type="button" aria-pressed={mode === 'direct'} onClick={() => setMode('direct')}>
                  {t('modes.direct')}
                </button>
              </div>
              <GuidedFlow locale={locale} hidden={mode !== 'guided'} sending={sending} onSubmit={submitGuided} />
              <DirectForm locale={locale} hidden={mode !== 'direct'} sending={sending} onSubmit={submitDirect} />
            </>
          )}
        </div>
      </div>
    </FormProvider>
  );
};
