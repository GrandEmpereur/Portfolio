import type { Locale } from '@/lib/locale-path';

// Static references so Next can inline each NEXT_PUBLIC_* variable at build time.
const URLS: Record<Locale, string | undefined> = {
  fr: process.env.NEXT_PUBLIC_CAL_URL_FR,
  en: process.env.NEXT_PUBLIC_CAL_URL_EN,
  pl: process.env.NEXT_PUBLIC_CAL_URL_PL,
};

/** Cal.com booking page for the language, or null when not configured. */
export const bookingUrl = (locale: Locale): string | null => URLS[locale]?.trim() || null;
