'use client';

import { useState } from 'react';
import { useForm, type FieldErrors } from 'react-hook-form';
import type { Locale } from '@/lib/locale-path';
import { simpleContactSchema } from '@/lib/simple-contact-schema';
import { useScopedI18n } from '@/locales/client';
import { Honeypot } from '@/components/form/Honeypot';
import { FormError } from './GuidedFlow';
import type { SubmitFailure } from './steps';

interface DirectValues {
  name: string;
  email: string;
  message: string;
  /** Honeypot: must stay empty. */
  website: string;
}

type FieldName = 'name' | 'email' | 'message';
type Notice = FieldName | 'rate_limit' | 'send_failed' | 'network';

type SubmitNotice = 'rate_limit' | 'send_failed' | 'network';
const isSubmitNotice = (notice: Notice): notice is SubmitNotice =>
  notice === 'rate_limit' || notice === 'send_failed' || notice === 'network';

const FIELD_ORDER: readonly FieldName[] = ['name', 'email', 'message'];
const shape = simpleContactSchema.shape;
// Same rules as the server schema, so the screen never accepts what the route would refuse.
const valid = {
  name: (value: string): boolean => shape.name.safeParse(value).success,
  email: (value: string): boolean => shape.email.safeParse(value).success,
  message: (value: string): boolean => shape.message.safeParse(value).success,
};

interface DirectFormProps {
  locale: Locale;
  hidden: boolean;
  sending: boolean;
  onSubmit: (payload: Record<string, unknown>) => Promise<SubmitFailure | null>;
}

/** Three fields, for visitors who already know what to write. */
export const DirectForm = ({ locale, hidden, sending, onSubmit }: DirectFormProps) => {
  const t = useScopedI18n('contactPage');
  const { register, handleSubmit } = useForm<DirectValues>({
    defaultValues: { name: '', email: '', message: '', website: '' },
  });
  const [notice, setNotice] = useState<Notice | null>(null);

  const onInvalid = (errors: FieldErrors<DirectValues>) => {
    setNotice(FIELD_ORDER.find((name) => errors[name]) ?? 'message');
  };

  const onValid = async (values: DirectValues) => {
    // Honeypot filled: a bot. Nothing happens, nothing is sent.
    if (values.website) return;
    const failure = await onSubmit({
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
      locale,
      website: values.website,
    });
    if (!failure) return;
    if (failure.kind === 'validation') {
      setNotice(FIELD_ORDER.find((name) => failure.fields.includes(name)) ?? 'message');
      return;
    }
    setNotice(failure.kind);
  };

  const message = !notice ? null : isSubmitNotice(notice) ? t(`submitError.${notice}`) : t(`direct.errors.${notice}`);

  return (
    <form
      className="cx-form cx-direct"
      hidden={hidden}
      noValidate
      onSubmit={handleSubmit(onValid, onInvalid)}
      onChange={() => setNotice(null)}
    >
      <Honeypot register={register} label={t('honeypotLabel')} />
      <h2 className="display cx-q">{t('direct.title')}</h2>
      <p className="cx-hint">{t('direct.hint')}</p>
      <div className="cx-fields cx-two cx-grow">
        <div className="cx-field">
          <label className="mono-label" htmlFor="cx-d-name">
            {t('direct.name')}
          </label>
          <input
            id="cx-d-name"
            type="text"
            autoComplete="name"
            maxLength={100}
            {...register('name', { validate: valid.name })}
          />
        </div>
        <div className="cx-field">
          <label className="mono-label" htmlFor="cx-d-email">
            {t('direct.email')}
          </label>
          <input
            id="cx-d-email"
            type="email"
            autoComplete="email"
            inputMode="email"
            maxLength={255}
            {...register('email', { validate: valid.email })}
          />
        </div>
        <div className="cx-field cx-wide cx-fill">
          <label className="mono-label" htmlFor="cx-d-message">
            {t('direct.message')}
          </label>
          <textarea
            id="cx-d-message"
            maxLength={2000}
            placeholder={t('direct.messagePlaceholder')}
            {...register('message', { validate: valid.message })}
          />
        </div>
      </div>
      <FormError message={message} fallback={notice !== null && isSubmitNotice(notice)} />
      <div className="cx-actions">
        <button type="submit" className="btn cx-send" disabled={sending}>
          {sending ? t('actions.sending') : t('direct.send')} <span aria-hidden="true">↗</span>
        </button>
      </div>
    </form>
  );
};
