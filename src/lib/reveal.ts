import { gsap, ScrollTrigger } from '@/lib/gsap-config';

interface RiseOptions {
  /** Starting offset in pixels. */
  y?: number;
  /** Ease of the entrance. The GSAP default applies when it is left out. */
  ease?: string;
  /** Remove the inline transform once shown (needed around a stretched link). */
  clearTransform?: boolean;
}

/**
 * Blocks that rise and fade in when they enter the screen, in small staggered groups.
 *
 * Opacity, never visibility: the blocks stay in the tab order and in the accessibility tree.
 *
 * A block that is jumped past (anchor link, scroll position restored after a reload, End key)
 * is revealed too: ScrollTrigger fires `onEnter` for it as long as `limitCallbacks` stays off
 * (see gsap-config.ts).
 */
export const riseOnScroll = (
  targets: gsap.DOMTarget,
  { y = 28, ease, clearTransform = false }: RiseOptions = {},
): void => {
  const els = gsap.utils.toArray<Element>(targets);
  if (!els.length) return;
  gsap.set(els, { y, opacity: 0 });
  ScrollTrigger.batch(els, {
    start: 'top 92%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.07,
        overwrite: true,
        ...(ease ? { ease } : {}),
        ...(clearTransform ? { clearProps: 'transform' } : {}),
      }),
  });
};
