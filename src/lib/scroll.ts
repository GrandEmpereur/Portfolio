import type Lenis from 'lenis';
import { prefersReducedMotion } from '@/lib/motion';

/** Filled by SmoothScroll when Lenis is running. */
export const scroller: { lenis: Lenis | null } = { lenis: null };

export const scrollToY = (y: number, opts: { immediate?: boolean } = {}): void => {
  if (scroller.lenis) {
    scroller.lenis.scrollTo(y, { immediate: opts.immediate });
    return;
  }
  window.scrollTo({ top: y, behavior: opts.immediate || prefersReducedMotion() ? 'auto' : 'smooth' });
};

const SAVED_KEY = 'pb:scroll';
let savedScroll: number | null | undefined;

/** Called when the page is left: remembers where the visitor was, for a reload or a back/forward load. */
export const saveScrollPosition = (): void => {
  try {
    const value = { path: window.location.pathname, y: Math.round(window.scrollY) };
    window.sessionStorage.setItem(SAVED_KEY, JSON.stringify(value));
  } catch {
    // Storage unavailable: there will simply be nothing to restore.
  }
};

/**
 * The position saved before a reload or a back/forward load of this same page, or null.
 * The answer is kept for the life of the document (React runs effects twice in development)
 * until forgetSavedScroll() is called.
 */
export const savedScrollPosition = (): number | null => {
  if (savedScroll !== undefined) return savedScroll;
  savedScroll = null;
  try {
    const raw = window.sessionStorage.getItem(SAVED_KEY);
    window.sessionStorage.removeItem(SAVED_KEY);
    const [nav] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    if (!raw || !nav || (nav.type !== 'reload' && nav.type !== 'back_forward')) return null;
    const saved: unknown = JSON.parse(raw);
    if (typeof saved !== 'object' || saved === null) return null;
    const { path, y } = saved as { path?: unknown; y?: unknown };
    if (path === window.location.pathname && typeof y === 'number' && y > 0) savedScroll = y;
  } catch {
    // Unreadable value: start at the top.
  }
  return savedScroll;
};

export const forgetSavedScroll = (): void => {
  savedScroll = null;
};
