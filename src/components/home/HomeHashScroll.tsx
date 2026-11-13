'use client';

import { useEffect } from 'react';
import { ScrollTrigger } from '@/lib/gsap-config';
import { whenFontsReady } from '@/lib/motion';
import { forgetSavedScroll, savedScrollPosition, saveScrollPosition, scrollToY } from '@/lib/scroll';

const USER_SCROLL_EVENTS = ['wheel', 'touchstart', 'keydown'] as const;

const readTargetId = (): string | null => {
  const raw = window.location.hash.slice(1);
  if (!raw) return null;
  try {
    return decodeURIComponent(raw);
  } catch {
    return null;
  }
};

/**
 * When the page loads with an anchor (/#projets), or is reloaded halfway down, the pinned
 * sections add height after the browser has already placed the page, so the position is wrong
 * (and the hero is built in a broken state). Once fonts are ready and the pins are measured,
 * put the page back on the targeted element or on the position it had before the reload.
 * Runs once, and never if the visitor has already scrolled by themselves.
 */
export const HomeHashScroll = () => {
  useEffect(() => {
    const id = readTargetId();
    const saved = id ? null : savedScrollPosition();
    // The boot script switched restoration to manual for this load: hand it back to the browser when done.
    const nativeRestoration = () => {
      try {
        window.history.scrollRestoration = 'auto';
      } catch {
        // Not supported: nothing to hand back.
      }
    };
    window.addEventListener('pagehide', saveScrollPosition);
    if (!id && saved === null) {
      nativeRestoration();
      return () => window.removeEventListener('pagehide', saveScrollPosition);
    }

    let cancelled = false;
    let userScrolled = false;
    let frame = 0;

    const onUserScroll = () => {
      userScrolled = true;
    };
    for (const type of USER_SCROLL_EVENTS) window.addEventListener(type, onUserScroll, { passive: true });

    const place = () => {
      if (cancelled || userScrolled) return;
      ScrollTrigger.refresh();
      if (saved !== null) {
        scrollToY(saved, { immediate: true });
        forgetSavedScroll();
        nativeRestoration();
        return;
      }
      nativeRestoration();
      if (!id) return;
      if (id === 'accueil') {
        scrollToY(0, { immediate: true });
        return;
      }
      const el = document.getElementById(id);
      if (!el) return;
      scrollToY(el.getBoundingClientRect().top + window.scrollY, { immediate: true });
    };

    whenFontsReady(() => {
      if (cancelled || userScrolled) return;
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(place);
      });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.removeEventListener('pagehide', saveScrollPosition);
      for (const type of USER_SCROLL_EVENTS) window.removeEventListener(type, onUserScroll);
    };
  }, []);

  return null;
};
