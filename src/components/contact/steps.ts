import {
  BUDGETS,
  CHANNELS,
  contactRequestSchema,
  STAGES,
  TIMINGS,
  type ContactRequest,
} from '@/lib/contact-request';

export const STEP_IDS = ['need', 'context', 'budget', 'brief', 'who'] as const;
export type StepId = (typeof STEP_IDS)[number];

export type StepError =
  | 'need.required'
  | 'context.stage'
  | 'context.timing'
  | 'budget.required'
  | 'brief.short'
  | 'who.firstName'
  | 'who.email';

const field = contactRequestSchema.shape;
const ok = (schema: { safeParse: (value: unknown) => { success: boolean } }, value: unknown): boolean =>
  schema.safeParse(value).success;

/** What a step still needs before the visitor can move on. Reuses the field validators of the server schema. */
export const validateStep = (step: StepId, values: Partial<ContactRequest>): StepError | null => {
  switch (step) {
    case 'need':
      return ok(field.needs, values.needs) ? null : 'need.required';
    case 'context':
      if (!ok(field.stage, values.stage)) return 'context.stage';
      return ok(field.timing, values.timing) ? null : 'context.timing';
    case 'budget':
      return ok(field.budget, values.budget) ? null : 'budget.required';
    case 'brief':
      return ok(field.message, values.message) ? null : 'brief.short';
    case 'who':
      if (!ok(field.firstName, values.firstName)) return 'who.firstName';
      return ok(field.email, values.email) ? null : 'who.email';
  }
};

export const firstInvalidStep = (values: Partial<ContactRequest>): { step: StepId; error: StepError } | null => {
  for (const step of STEP_IDS) {
    const error = validateStep(step, values);
    if (error) return { step, error };
  }
  return null;
};

/** Optional fields that the server still rejects when malformed. */
export type OptionalFieldError = 'link' | 'phone';

export const optionalFieldError = (step: StepId, values: Partial<ContactRequest>): OptionalFieldError | null => {
  if (step === 'brief' && !ok(field.link, values.link ?? '')) return 'link';
  if (step === 'who' && !ok(field.phone, values.phone ?? '')) return 'phone';
  return null;
};

/** Where each server-reported invalid field lives in the flow. */
export const stepOfField = (name: string): StepId => {
  switch (name) {
    case 'needs':
      return 'need';
    case 'stage':
    case 'timing':
      return 'context';
    case 'budget':
    case 'budgetAmount':
      return 'budget';
    case 'message':
    case 'link':
      return 'brief';
    default:
      return 'who';
  }
};

// ---------------------------------------------------------------------------
// Form values of the guided flow (one react-hook-form for the five questions)
// ---------------------------------------------------------------------------

export type Need = ContactRequest['needs'][number];
export type Stage = ContactRequest['stage'];
export type Timing = ContactRequest['timing'];
export type Budget = ContactRequest['budget'];
export type Channel = ContactRequest['channel'];

export interface GuidedValues {
  needs: Need[];
  stage: Stage | '';
  timing: Timing | '';
  budget: Budget | '';
  budgetAmount: string;
  message: string;
  link: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  channel: Channel;
  /** Honeypot: must stay empty. */
  website: string;
}

export const GUIDED_DEFAULTS: GuidedValues = {
  needs: [],
  stage: '',
  timing: '',
  budget: '',
  budgetAmount: '',
  message: '',
  link: '',
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  phone: '',
  channel: 'email',
  website: '',
};

const pick = <T extends string>(list: readonly T[], value: string): T | undefined => list.find((item) => item === value);

export const toPartial = (values: GuidedValues): Partial<ContactRequest> => ({
  needs: values.needs,
  stage: pick(STAGES, values.stage),
  timing: pick(TIMINGS, values.timing),
  budget: pick(BUDGETS, values.budget),
  message: values.message,
  link: values.link,
  firstName: values.firstName,
  email: values.email,
  phone: values.phone,
});

/** JSON body for POST /api/contact. Empty optional fields are left out. */
export const toGuidedPayload = (values: GuidedValues, locale: string): Record<string, unknown> => {
  const optional: Record<string, string> = {};
  const entries: Array<[string, string]> = [
    ['budgetAmount', values.budgetAmount],
    ['link', values.link],
    ['lastName', values.lastName],
    ['company', values.company],
    ['phone', values.phone],
  ];
  for (const [key, value] of entries) {
    const trimmed = value.trim();
    if (trimmed) optional[key] = trimmed;
  }
  return {
    needs: values.needs,
    stage: values.stage,
    timing: values.timing,
    budget: values.budget,
    message: values.message.trim(),
    firstName: values.firstName.trim(),
    email: values.email.trim(),
    channel: pick(CHANNELS, values.channel) ?? 'email',
    locale,
    website: values.website,
    ...optional,
  };
};

export type SubmitFailure =
  | { kind: 'validation'; fields: string[] }
  | { kind: 'rate_limit' }
  | { kind: 'send_failed' }
  | { kind: 'network' };

export type SubmitEndpoint = '/api/contact' | '/api/contact-simple';
