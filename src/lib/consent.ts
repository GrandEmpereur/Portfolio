export type ConsentChoice = 'granted' | 'denied';
export const CONSENT_KEY = 'pb-consent-v1' as const;
export const CONSENT_MAX_AGE_MS = 183 * 24 * 60 * 60 * 1000;
const CONSENT_EVENT = 'pb:consent';

export const serializeConsent = (choice: ConsentChoice, now: number): string => JSON.stringify({ choice, at: now });

/** Anything unreadable, unknown or older than six months means "no choice". */
export const parseConsent = (raw: string | null, now: number): ConsentChoice | null => {
  if (!raw) return null;
  try {
    const data: unknown = JSON.parse(raw);
    if (!data || typeof data !== 'object') return null;
    const { choice, at } = data as { choice?: unknown; at?: unknown };
    if (choice !== 'granted' && choice !== 'denied') return null;
    if (typeof at !== 'number' || !Number.isFinite(at)) return null;
    if (now - at > CONSENT_MAX_AGE_MS) return null;
    return choice;
  } catch {
    return null;
  }
};

export const readConsent = (): ConsentChoice | null => {
  if (typeof window === 'undefined') return null;
  try {
    return parseConsent(window.localStorage.getItem(CONSENT_KEY), Date.now());
  } catch {
    return null; // storage blocked
  }
};

const emit = () => window.dispatchEvent(new CustomEvent(CONSENT_EVENT));

export const writeConsent = (choice: ConsentChoice): void => {
  try {
    window.localStorage.setItem(CONSENT_KEY, serializeConsent(choice, Date.now()));
  } catch {
    // storage blocked: the choice only lives for this page view
  }
  emit();
};

export const clearConsent = (): void => {
  try {
    window.localStorage.removeItem(CONSENT_KEY);
  } catch {
    // ignore
  }
  emit();
};

export const onConsentChange = (cb: (c: ConsentChoice | null) => void): (() => void) => {
  const handler = () => cb(readConsent());
  window.addEventListener(CONSENT_EVENT, handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener(CONSENT_EVENT, handler);
    window.removeEventListener('storage', handler);
  };
};
