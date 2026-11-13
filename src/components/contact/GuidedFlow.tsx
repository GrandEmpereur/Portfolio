'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { gsap, useGSAP } from '@/lib/gsap-config';
import { BUDGETS, CHANNELS, NEEDS, STAGES, TIMINGS } from '@/lib/contact-request';
import { localePath, type Locale } from '@/lib/locale-path';
import { isDesktop, prefersReducedMotion } from '@/lib/motion';
import { seoConfig } from '@/lib/seo-config';
import { track } from '@/lib/track';
import { useScopedI18n } from '@/locales/client';
import { Honeypot } from '@/components/form/Honeypot';
import { TransitionLink } from '@/components/site/TransitionLink';
import {
  firstInvalidStep,
  optionalFieldError,
  stepOfField,
  STEP_IDS,
  toGuidedPayload,
  toPartial,
  validateStep,
  type GuidedValues,
  type OptionalFieldError,
  type StepError,
  type StepId,
  type SubmitFailure,
} from './steps';

type SubmitNotice = 'rate_limit' | 'send_failed' | 'network';
type Notice = StepError | OptionalFieldError | 'invalid' | SubmitNotice;

const isSubmitNotice = (notice: Notice): notice is SubmitNotice =>
  notice === 'rate_limit' || notice === 'send_failed' || notice === 'network';

const TOTAL = STEP_IDS.length;
const pad = (n: number): string => String(n).padStart(2, '0');
const STAGE_CODES = ['A', 'B', 'C', 'D'] as const;
const BUDGET_CODES = ['A', 'B', 'C'] as const;

interface FormErrorProps {
  message: string | null;
  /** Adds the contact email as a way out (sending failures). */
  fallback?: boolean;
}

/** Error line shared by both forms. Always in the DOM so screen readers announce it when it fills. */
export const FormError = ({ message, fallback = false }: FormErrorProps) => {
  const t = useScopedI18n('contactPage');
  const email = seoConfig.author.email;
  return (
    <p className="cx-error" role="alert">
      {message ? (
        <span>
          {message}
          {fallback ? (
            <>
              {' '}
              {t('submitError.fallback')} <a href={`mailto:${email}`}>{email}</a>.
            </>
          ) : null}
        </span>
      ) : null}
    </p>
  );
};

interface GuidedFlowProps {
  locale: Locale;
  hidden: boolean;
  sending: boolean;
  onSubmit: (payload: Record<string, unknown>) => Promise<SubmitFailure | null>;
}

export const GuidedFlow = ({ locale, hidden, sending, onSubmit }: GuidedFlowProps) => {
  const t = useScopedI18n('contactPage');
  const { register, setValue, getValues, handleSubmit, control } = useFormContext<GuidedValues>();
  const needs = useWatch({ control, name: 'needs' });

  // Arriving from a service row (/contact?need=rag): that need is already ticked.
  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get('need');
    const need = NEEDS.find((id) => id === wanted);
    if (need && getValues('needs').length === 0) setValue('needs', [need], { shouldDirty: true });
  }, [getValues, setValue]);
  const stage = useWatch({ control, name: 'stage' });
  const timing = useWatch({ control, name: 'timing' });
  const budget = useWatch({ control, name: 'budget' });
  const channel = useWatch({ control, name: 'channel' });

  const formRef = useRef<HTMLFormElement>(null);
  const [step, setStep] = useState(0);
  const [notice, setNotice] = useState<Notice | null>(null);
  const direction = useRef<1 | -1>(1);
  const animatedStep = useRef(step);
  const focusedStep = useRef(step);

  const stepId: StepId = STEP_IDS[step] ?? STEP_IDS[0];
  const isLast = step === TOTAL - 1;
  const current = pad(step + 1);

  const showStep = (index: number) => {
    const next = Math.max(0, Math.min(TOTAL - 1, index));
    direction.current = next >= step ? 1 : -1;
    setNotice(null);
    setStep(next);
  };

  const go = (delta: 1 | -1) => {
    if (delta > 0) {
      const partial = toPartial(getValues());
      const error = validateStep(stepId, partial) ?? optionalFieldError(stepId, partial);
      if (error) {
        setNotice(error);
        return;
      }
    }
    showStep(step + delta);
  };

  const toggleNeed = (id: GuidedValues['needs'][number]) => {
    const selected = getValues('needs');
    setValue('needs', selected.includes(id) ? selected.filter((item) => item !== id) : [...selected, id], { shouldDirty: true });
    setNotice(null);
  };

  const onValid = async (values: GuidedValues) => {
    // Honeypot filled: a bot. Nothing happens, nothing is sent.
    if (values.website) return;
    const partial = toPartial(values);
    const broken = firstInvalidStep(partial);
    if (broken) {
      showStep(STEP_IDS.indexOf(broken.step));
      setNotice(broken.error);
      return;
    }
    for (const [index, id] of STEP_IDS.entries()) {
      const extra = optionalFieldError(id, partial);
      if (extra) {
        showStep(index);
        setNotice(extra);
        return;
      }
    }
    const failure = await onSubmit(toGuidedPayload(values, locale));
    if (!failure) return;
    if (failure.kind === 'validation') {
      const field = failure.fields[0] ?? '';
      showStep(STEP_IDS.indexOf(stepOfField(field)));
      setNotice(field === 'link' ? 'link' : field === 'phone' ? 'phone' : 'invalid');
      return;
    }
    setNotice(failure.kind);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key !== 'Enter' || event.nativeEvent.isComposing) return;
    const target = event.target;
    if (target instanceof HTMLTextAreaElement || target instanceof HTMLButtonElement || target instanceof HTMLAnchorElement) return;
    event.preventDefault();
    if (sending) return;
    if (isLast) formRef.current?.requestSubmit();
    else go(1);
  };

  // Digits tick the options of the current question, unless the focus is in a text field.
  useEffect(() => {
    if (hidden) return;
    const onDigit = (event: globalThis.KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey || event.isComposing || !/^[1-9]$/.test(event.key)) return;
      const target = event.target;
      if (target instanceof HTMLTextAreaElement) return;
      if (target instanceof HTMLInputElement && target.type !== 'checkbox' && target.type !== 'radio') return;
      if (target instanceof HTMLElement && target.isContentEditable) return;
      const index = Number(event.key) - 1;
      if (stepId === 'need') {
        const id = NEEDS[index];
        if (id) toggleNeed(id);
      } else if (stepId === 'context') {
        const id = STAGES[index];
        if (id) {
          setValue('stage', id, { shouldDirty: true });
          setNotice(null);
        }
      } else if (stepId === 'budget') {
        const id = BUDGETS[index];
        if (id) {
          setValue('budget', id, { shouldDirty: true });
          setNotice(null);
        }
      }
    };
    document.addEventListener('keydown', onDigit);
    return () => document.removeEventListener('keydown', onDigit);
  });

  // The question changes: focus it, bring it back to the top, tell analytics.
  useEffect(() => {
    if (hidden) return;
    track('contact_step_view', { step: stepId });
  }, [stepId, hidden]);

  useEffect(() => {
    if (focusedStep.current === step) return;
    focusedStep.current = step;
    const active = formRef.current?.querySelector<HTMLElement>('.cx-step.is-active');
    active?.querySelector<HTMLElement>('legend')?.focus({ preventScroll: true });
    if (active) active.scrollTop = 0;
    if (!isDesktop()) window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }, [step]);

  useGSAP(
    () => {
      if (animatedStep.current === step) return;
      animatedStep.current = step;
      const active = formRef.current?.querySelector<HTMLElement>('.cx-step.is-active');
      const legend = active?.querySelector<HTMLElement>('legend');
      if (!active || !legend || prefersReducedMotion()) return;
      const dir = direction.current;
      // The question is text React renders and may render again: it is revealed as a whole, without splitting its DOM.
      gsap.fromTo(
        legend,
        { yPercent: 40 * dir, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.7, ease: 'pb', clearProps: 'transform,opacity,visibility' },
      );
      gsap.fromTo(
        active.querySelectorAll('.cx-hint, .cx-opt, .cx-sub, .cx-chips, .cx-fields, .cx-legal'),
        { y: 20 * dir, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.035, delay: 0.1, ease: 'pb', clearProps: 'transform,opacity,visibility' },
      );
    },
    { scope: formRef, dependencies: [step], revertOnUpdate: true },
  );

  const noticeMessage = !notice ? null : isSubmitNotice(notice) ? t(`submitError.${notice}`) : t(`errors.${notice}`);
  const stepClass = (id: StepId) => (id === stepId ? 'cx-step is-active' : 'cx-step');
  const optional = (
    <span className="cx-opt-tag">· {t('optional')}</span>
  );

  return (
    <form
      ref={formRef}
      className="cx-form cx-flow"
      hidden={hidden}
      noValidate
      onSubmit={handleSubmit(onValid)}
      onKeyDown={onKeyDown}
      onChange={() => setNotice(null)}
    >
      <Honeypot register={register} label={t('honeypotLabel')} />
      <div className="cx-progress mono-label">
        <span>
          <b>{current}</b> / {pad(TOTAL)}
        </span>
        <span className="cx-bar">
          <i style={{ transform: `scaleX(${((step + 1) / TOTAL).toFixed(3)})` }} />
        </span>
        <span className="sr-only" aria-live="polite">
          {t('progress.step', { current: step + 1, total: TOTAL })}
        </span>
      </div>

      <fieldset className={stepClass('need')} data-step="need" data-lenis-prevent>
        <legend className="display cx-q" tabIndex={-1}>
          {t('steps.need.title')}
        </legend>
        <p className="cx-hint">{t('steps.need.hint')}</p>
        <div className="cx-opts cx-cols">
          {NEEDS.map((id) => (
            <label className="cx-opt" key={id}>
              <input type="checkbox" name="need" value={id} checked={needs.includes(id)} onChange={() => toggleNeed(id)} />
              <span className="mono-label cx-code">{t(`steps.need.options.${id}.code`)}</span>
              <span className="cx-t">{t(`steps.need.options.${id}.title`)}</span>
              <i className="cx-tick" aria-hidden="true" />
              <span className="cx-d">{t(`steps.need.options.${id}.description`)}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className={stepClass('context')} data-step="context" data-lenis-prevent>
        <legend className="display cx-q" tabIndex={-1}>
          {t('steps.context.title')}
        </legend>
        <div className="cx-opts cx-cols" role="radiogroup" aria-label={t('steps.context.stageLabel')}>
          {STAGES.map((id, index) => (
            <label className="cx-opt" key={id}>
              <input
                type="radio"
                name="stage"
                value={id}
                checked={stage === id}
                onChange={() => {
                  setValue('stage', id, { shouldDirty: true });
                  setNotice(null);
                }}
              />
              <span className="mono-label cx-code">{STAGE_CODES[index]}</span>
              <span className="cx-t">{t(`steps.context.stage.${id}.title`)}</span>
              <i className="cx-tick" aria-hidden="true" />
            </label>
          ))}
        </div>
        <p className="cx-sub">{t('steps.context.timingTitle')}</p>
        <div className="cx-chips" role="radiogroup" aria-label={t('steps.context.timingLabel')}>
          {TIMINGS.map((id) => (
            <label className="cx-chip" key={id}>
              <input
                type="radio"
                name="timing"
                value={id}
                checked={timing === id}
                onChange={() => {
                  setValue('timing', id, { shouldDirty: true });
                  setNotice(null);
                }}
              />
              <span>{t(`steps.context.timing.${id}.label`)}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className={stepClass('budget')} data-step="budget" data-lenis-prevent>
        <legend className="display cx-q" tabIndex={-1}>
          {t('steps.budget.title')}
        </legend>
        <p className="cx-hint">{t('steps.budget.hint')}</p>
        <div className="cx-opts" role="radiogroup" aria-label={t('steps.budget.groupLabel')}>
          {BUDGETS.map((id, index) => (
            <label className="cx-opt" key={id}>
              <input
                type="radio"
                name="budget"
                value={id}
                checked={budget === id}
                onChange={() => {
                  setValue('budget', id, { shouldDirty: true });
                  setNotice(null);
                }}
              />
              <span className="mono-label cx-code">{BUDGET_CODES[index]}</span>
              <span className="cx-t">{t(`steps.budget.options.${id}.title`)}</span>
              <i className="cx-tick" aria-hidden="true" />
            </label>
          ))}
        </div>
        <div className="cx-fields cx-after">
          <div className="cx-field">
            <label className="mono-label" htmlFor="cx-amount">
              {t('steps.budget.amountLabel')} {optional}
            </label>
            <input
              id="cx-amount"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              maxLength={60}
              placeholder={t('steps.budget.amountPlaceholder')}
              {...register('budgetAmount')}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className={stepClass('brief')} data-step="brief" data-lenis-prevent>
        <legend className="display cx-q" tabIndex={-1}>
          {t('steps.brief.title')}
        </legend>
        <p className="cx-hint">{t('steps.brief.hint')}</p>
        <div className="cx-fields cx-grow">
          <div className="cx-field cx-fill">
            <label className="mono-label" htmlFor="cx-message">
              {t('steps.brief.messageLabel')}
            </label>
            <textarea id="cx-message" maxLength={2000} placeholder={t('steps.brief.messagePlaceholder')} {...register('message')} />
          </div>
          <div className="cx-field">
            <label className="mono-label" htmlFor="cx-link">
              {t('steps.brief.linkLabel')} {optional}
            </label>
            <input
              id="cx-link"
              type="url"
              inputMode="url"
              maxLength={300}
              placeholder={t('steps.brief.linkPlaceholder')}
              {...register('link')}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className={stepClass('who')} data-step="who" data-lenis-prevent>
        <legend className="display cx-q" tabIndex={-1}>
          {t('steps.who.title')}
        </legend>
        <div className="cx-fields cx-two">
          <div className="cx-field">
            <label className="mono-label" htmlFor="cx-first-name">
              {t('steps.who.firstName')}
            </label>
            <input id="cx-first-name" type="text" autoComplete="given-name" maxLength={80} {...register('firstName')} />
          </div>
          <div className="cx-field">
            <label className="mono-label" htmlFor="cx-last-name">
              {t('steps.who.lastName')}
            </label>
            <input id="cx-last-name" type="text" autoComplete="family-name" maxLength={80} {...register('lastName')} />
          </div>
          <div className="cx-field cx-wide">
            <label className="mono-label" htmlFor="cx-email">
              {t('steps.who.email')}
            </label>
            <input id="cx-email" type="email" autoComplete="email" inputMode="email" maxLength={255} {...register('email')} />
          </div>
          <div className="cx-field">
            <label className="mono-label" htmlFor="cx-company">
              {t('steps.who.company')} {optional}
            </label>
            <input id="cx-company" type="text" autoComplete="organization" maxLength={120} {...register('company')} />
          </div>
          <div className="cx-field">
            <label className="mono-label" htmlFor="cx-phone">
              {t('steps.who.phone')} {optional}
            </label>
            <input id="cx-phone" type="tel" autoComplete="tel" inputMode="tel" maxLength={30} {...register('phone')} />
          </div>
        </div>
        <div className="cx-pref">
          <p className="cx-sub">{t('steps.who.channelTitle')}</p>
          <div className="cx-chips" role="radiogroup" aria-label={t('steps.who.channelLabel')}>
            {CHANNELS.map((id) => (
              <label className="cx-chip" key={id}>
                <input
                  type="radio"
                  name="channel"
                  value={id}
                  checked={channel === id}
                  onChange={() => setValue('channel', id, { shouldDirty: true })}
                />
                <span>{t(`steps.who.channel.${id}`)}</span>
              </label>
            ))}
          </div>
        </div>
        <p className="cx-legal">
          {t('steps.who.legalBefore')}{' '}
          <TransitionLink href={localePath(locale, '/politique-confidentialite')}>{t('steps.who.legalLink')}</TransitionLink>
          {t('steps.who.legalAfter')}
        </p>
      </fieldset>

      <FormError message={noticeMessage} fallback={notice !== null && isSubmitNotice(notice)} />
      <div className="cx-actions">
        {step > 0 ? (
          <button type="button" className="btn btn-ghost cx-back" onClick={() => go(-1)}>
            <span aria-hidden="true">←</span> {t('actions.back')}
          </button>
        ) : null}
        <span className="mono-label cx-keyhint">{t('actions.keyhint')}</span>
        {isLast ? (
          <button type="submit" className="btn cx-send" disabled={sending}>
            {sending ? t('actions.sending') : t('actions.send')} <span aria-hidden="true">↗</span>
          </button>
        ) : (
          <button type="button" className="btn cx-continue" onClick={() => go(1)}>
            {t('actions.next')} <span aria-hidden="true">↗</span>
          </button>
        )}
      </div>
    </form>
  );
};
