'use client';

import { useEffect } from 'react';
import { ScrollTrigger } from '@/lib/gsap-config';
import { whenFontsReady } from '@/lib/motion';
import { scrollToY } from '@/lib/scroll';

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
 * When the page loads with an anchor (/#projets), the pinned sections add height after the
 * browser has already jumped, so the position is wrong. Once fonts are ready and the pins are
 * measured, put the page back on the targeted element. Runs once, and never if the visitor
 * has already scrolled by themselves.
 */
export const HomeHashScroll = () => {
  useEffect(() => {
    const id = readTargetId();
    if (!id) return;

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
      for (const type of USER_SCROLL_EVENTS) window.removeEventListener(type, onUserScroll);
    };
  }, []);

  return null;
};
