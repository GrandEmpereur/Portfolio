import { z } from 'zod';

export const NEEDS = ['llm', 'agent', 'rag', 'saas', 'site', 'refonte', 'avis'] as const;
export const STAGES = ['idee', 'specs', 'existant', 'renfort'] as const;
export const TIMINGS = ['asap', 'mois', 'trimestre', 'plus-tard'] as const;
export const BUDGETS = ['valide', 'enveloppe', 'inconnu'] as const;
export const CHANNELS = ['email', 'visio', 'tel'] as const;
export const SOURCES = ['google', 'social', 'recommendation', 'event', 'autre'] as const;
export const REQUEST_LOCALES = ['fr', 'en', 'pl'] as const;

// Messages stay neutral: the screen shows its own translated copy.
const text = (min: number, max: number) => z.string().trim().min(min, 'invalid').max(max, 'invalid');

/** Optional trimmed string; an empty string counts as "not provided". */
const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, 'invalid')
    .optional()
    .transform((v) => (v ? v : undefined));

const httpLink = z
  .string()
  .trim()
  .max(300, 'invalid')
  .optional()
  .transform((v) => (v ? v : undefined))
  .refine(
    (v) => {
      if (v === undefined) return true;
      try {
        const { protocol } = new URL(v);
        return protocol === 'http:' || protocol === 'https:';
      } catch {
        return false;
      }
    },
    { error: 'invalid' },
  );

const phone = z
  .string()
  .trim()
  .optional()
  .transform((v) => (v ? v : undefined))
  .refine((v) => v === undefined || /^[0-9 +().-]{6,30}$/.test(v), { error: 'invalid' });

const email = z.string().trim().max(255, 'invalid').pipe(z.email('invalid'));

export const contactRequestSchema = z.object({
  needs: z.array(z.enum(NEEDS)).min(1, 'invalid').max(NEEDS.length),
  stage: z.enum(STAGES),
  timing: z.enum(TIMINGS),
  budget: z.enum(BUDGETS),
  budgetAmount: optionalText(60),
  message: text(20, 2000),
  link: httpLink,
  firstName: text(2, 80),
  lastName: optionalText(80),
  email,
  company: optionalText(120),
  phone,
  channel: z.enum(CHANNELS).default('email'),
  locale: z.enum(REQUEST_LOCALES),
  // Honeypot: must stay empty.
  website: z.string().trim().max(0, 'invalid').optional(),
});

export type ContactRequest = z.infer<typeof contactRequestSchema>;

export const contactSourceSchema = z.object({
  email,
  source: z.enum(SOURCES),
});

export type ContactSource = z.infer<typeof contactSourceSchema>;

export type LeadCategory = 'hot' | 'warm' | 'cold';

const STAGE_POINTS: Record<ContactRequest['stage'], number> = { idee: 0, specs: 15, existant: 15, renfort: 10 };
const TIMING_POINTS: Record<ContactRequest['timing'], number> = { asap: 20, mois: 15, trimestre: 10, 'plus-tard': 0 };
const BUDGET_POINTS: Record<ContactRequest['budget'], number> = { valide: 25, enveloppe: 15, inconnu: 0 };
const STRONG_NEEDS: readonly string[] = ['llm', 'agent', 'rag', 'saas'];

export const scoreLead = (r: ContactRequest): number => {
  let score = 0;
  if (r.needs.some((n) => STRONG_NEEDS.includes(n))) score += 20;
  score += STAGE_POINTS[r.stage];
  score += TIMING_POINTS[r.timing];
  score += BUDGET_POINTS[r.budget];
  if (r.phone) score += 10;
  if (r.company) score += 10;
  return Math.min(score, 100);
};

export const categorizeLead = (score: number): LeadCategory => {
  if (score >= 70) return 'hot';
  if (score >= 40) return 'warm';
  return 'cold';
};

/** Strips line breaks and control characters so a value can sit in an email subject safely. */
export const singleLine = (value: string, max = 80): string =>
  Array.from(value)
    .map((ch) => {
      const code = ch.codePointAt(0) ?? 0;
      return code < 32 || code === 127 || code === 0x2028 || code === 0x2029 ? ' ' : ch;
    })
    .join('')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
