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
