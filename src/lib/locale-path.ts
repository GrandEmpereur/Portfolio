export type Locale = 'fr' | 'en' | 'pl';
export const LOCALES: readonly Locale[] = ['fr', 'en', 'pl'];

// Anything with a scheme (https:, mailto:, tel:), protocol-relative, or a bare hash is left alone.
const UNTOUCHED = /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i;

/** French lives at the root; en and pl are prefixed. Hash and query are kept. */
export const localePath = (locale: Locale, path: string): string => {
  if (UNTOUCHED.test(path)) return path;
  if (locale === 'fr') return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  // "/" alone, "/#x" and "/?x" collapse into the bare prefix: "/en", "/en#x", "/en?x"
  const rest = /^\/(?:$|[#?])/.test(normalized) ? normalized.slice(1) : normalized;
  return `/${locale}${rest}`;
};

/** The path without its language prefix: "/en/contact" -> "/contact", "/fr" -> "/". */
export const stripLocale = (pathname: string): string => pathname.replace(/^\/(?:fr|en|pl)(?=\/|$)/, '') || '/';
