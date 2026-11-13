'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { gsap, ScrollTrigger, SplitText, useGSAP } from '@/lib/gsap-config';
import type { Locale } from '@/lib/locale-path';
import {
  canPin,
  isFinePointer,
  prefersReducedMotion,
  releaseEnter,
  scrollState,
  whenFontsReady,
} from '@/lib/motion';

interface HomeHeroMotionProps {
  locale: Locale;
  children: ReactNode;
}

const CLOCK_LOCALE: Record<Locale, string> = { fr: 'fr-FR', en: 'en-GB', pl: 'pl-PL' };
const SCRAMBLE_CHARS = '!<>-_\\/[]{}=+*^?#';

export const HomeHeroMotion = ({ locale, children }: HomeHeroMotionProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  // Cleanups for things GSAP's context cannot revert (html class, listeners, async guards)
  const teardown = useRef<Array<() => void>>([]);

  useEffect(
    () => () => {
      teardown.current.splice(0).forEach((fn) => fn());
    },
    [],
  );

  // Paris time, client only: the server renders a placeholder so hydration never differs.
  useEffect(() => {
    const el = rootRef.current?.querySelector<HTMLElement>('[data-clock]');
    if (!el) return;
    const format = new Intl.DateTimeFormat(CLOCK_LOCALE[locale], {
      timeZone: 'Europe/Paris',
      hour: '2-digit',
      minute: '2-digit',
    });
    const update = () => {
      el.textContent = format.format(new Date());
    };
    update();
    const id = window.setInterval(update, 20000);
    return () => window.clearInterval(id);
  }, [locale]);

  useGSAP(
    (_context, contextSafe) => {
      const root = rootRef.current;
      if (!root || !contextSafe) return;

      const html = document.documentElement;
      const run = { cancelled: false };
      teardown.current.push(() => {
        run.cancelled = true;
      });

      const one = (selector: string) => root.querySelector<HTMLElement>(selector);
      const many = (selector: string) => Array.from(root.querySelectorAll<HTMLElement>(selector));

      // ---------- no pinning: the hero is shown straight from the served HTML ----------
      if (!canPin()) {
        releaseEnter();
        if (prefersReducedMotion()) return;
        // small screens, motion allowed: the profile sentence lights up word by word, the facts rise in
        whenFontsReady(
          contextSafe(() => {
            if (run.cancelled) return;
            const intro = one('.hh-intro');
            const facts = many('.hh-facts > div');
            if (intro) {
              const words = SplitText.create(intro, { type: 'words', wordsClass: 'hh-iw', aria: 'auto' }).words;
              gsap.from(words, {
                opacity: 0.12,
                stagger: 0.03,
                ease: 'none',
                scrollTrigger: { trigger: intro, start: 'top 88%', end: 'top 38%', scrub: true },
              });
            }
            if (facts.length) {
              gsap.set(facts, { y: 26, autoAlpha: 0 });
              ScrollTrigger.batch(facts, {
                start: 'top 92%',
                once: true,
                onEnter: (batch) => {
                  gsap.to(batch, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.07, overwrite: true });
                },
              });
            }
          }),
        );
        return;
      }

      // ---------- chapter mode: pinned hero (desktop, motion allowed) ----------
      html.classList.add('pinned');
      scrollState.heroPinned = true;
      teardown.current.push(() => {
        html.classList.remove('pinned');
        scrollState.heroPinned = false;
        scrollState.heroProgress = 0;
        scrollState.heroStart = 0;
        scrollState.heroEnd = 0;
      });

      whenFontsReady(
        contextSafe(() => {
          if (run.cancelled) return;

          const stage = one('.hh-stage');
          const band = one('.hh-band');
          const photo = one('.hh-photo');
          const rule = one('.hh-rule');
          const role = one('.hh-role');
          const headline = one('.hh-headline');
          const meta = one('.hh-meta');
          const cue = one('.hh-cue');
          const intro = one('.hh-intro');
          const aboutLabel = one('.hh-about-label');
          const about = one('.hh-about');
          if (!stage || !band || !photo || !rule || !role || !headline || !meta || !cue || !intro || !aboutLabel) {
            releaseEnter();
            return;
          }

          // ---------- 01 · hero: entrance ----------
          const headlineChars = many('.hh-headline > span').flatMap((line) => {
            const split = SplitText.create(line, {
              type: 'words,chars',
              wordsClass: 'hh-wd',
              charsClass: 'hh-ch',
              aria: 'auto',
            });
            split.chars.forEach((char) => {
              if (char.textContent === '&') char.classList.add('hh-amp');
            });
            return split.chars;
          });

          const roleText = role.textContent ?? '';
          role.setAttribute('aria-label', roleText);
          const header = document.querySelector<HTMLElement>('[data-site-header]');

          const entrance = gsap.timeline({ paused: true });
          entrance
            .fromTo(
              band,
              { clipPath: 'inset(100% 0% 0% 0%)' },
              { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.25, ease: 'pbInOut' },
              0,
            )
            .from(photo, { scale: 1.22, duration: 2 }, 0)
            .from(rule, { scaleX: 0, transformOrigin: 'left center', duration: 1.1, ease: 'pbInOut' }, 0.3)
            .to(
              role,
              {
                scrambleText: { text: roleText, chars: SCRAMBLE_CHARS, revealDelay: 0.35, speed: 0.6 },
                duration: 1.5,
                ease: 'none',
              },
              0.2,
            );
          if (header) entrance.from(header, { yPercent: -170, duration: 0.9, clearProps: 'transform' }, 0.55);
          entrance
            .from(many('.hh-left > p, .hh-right > *'), { y: 18, autoAlpha: 0, duration: 0.8, stagger: 0.09 }, 0.85)
            .from(many('.hh-cue > *, .hh-caption, .hh-vf'), { autoAlpha: 0, duration: 0.8, stagger: 0.1 }, 1.15)
            .from(headlineChars, { yPercent: 120, duration: 1, stagger: 0.022 }, 0.3);

          // Starting states are now in place: reveal the page and play.
          releaseEnter();
          entrance.play();

          // ---------- depth: portrait and headline drift against the cursor ----------
          if (isFinePointer()) {
            const onMove = contextSafe((event: MouseEvent) => {
              const px = event.clientX / window.innerWidth - 0.5;
              const py = event.clientY / window.innerHeight - 0.5;
              gsap.to(band, { x: px * -18, y: py * -12, duration: 0.9, ease: 'power3.out', overwrite: 'auto' });
              gsap.to(headline, { x: px * 14, y: py * 7, duration: 0.9, ease: 'power3.out', overwrite: 'auto' });
            });
            const onLeave = contextSafe(() => {
              gsap.to([band, headline], { x: 0, y: 0, duration: 0.9, ease: 'power3.out', overwrite: 'auto' });
            });
            stage.addEventListener('mousemove', onMove, { passive: true });
            stage.addEventListener('mouseleave', onLeave);
            teardown.current.push(() => {
              stage.removeEventListener('mousemove', onMove);
              stage.removeEventListener('mouseleave', onLeave);
            });
          }

          // ---------- 01 → 02: the poster comes apart, the photo slides, the profile lights up word by word ----------
          const introWords = SplitText.create(intro, { type: 'words', wordsClass: 'hh-iw', aria: 'auto' }).words;
          const tl = gsap.timeline({
            defaults: { ease: 'power2.inOut' },
            scrollTrigger: {
              trigger: stage,
              start: 'top top',
              end: '+=140%',
              pin: true,
              scrub: 0.5,
              refreshPriority: 2,
              onUpdate: (self) => {
                scrollState.heroProgress = self.progress;
                // The profile only takes clicks and text selection once it has replaced the poster.
                if (about) about.style.pointerEvents = self.progress >= 0.44 ? 'auto' : 'none';
              },
              onRefresh: (self) => {
                scrollState.heroStart = self.start;
                scrollState.heroEnd = self.end;
              },
            },
          });
          tl.to(one('.hh-l1'), { xPercent: -14, autoAlpha: 0, duration: 0.4 }, 0)
            .to(one('.hh-l2'), { xPercent: 14, autoAlpha: 0, duration: 0.4 }, 0)
            .to([meta, rule, cue], { y: -24, autoAlpha: 0, duration: 0.32 }, 0)
            .fromTo(
              band,
              { left: '25vw', top: '2vh', width: '29vw', height: '98vh' },
              { left: '2.2vw', top: '13vh', width: '36vw', height: '74vh', duration: 0.62 },
              0.08,
            )
            .from(aboutLabel, { y: 20, autoAlpha: 0, duration: 0.15 }, 0.44)
            .from(intro, { autoAlpha: 0, duration: 0.04 }, 0.44)
            .from(introWords, { opacity: 0.12, duration: 0.06, stagger: 0.011, ease: 'none' }, 0.46)
            .from(many('.hh-facts > div'), { y: 26, autoAlpha: 0, duration: 0.2, stagger: 0.045 }, 0.66);

          const trigger = tl.scrollTrigger;
          if (trigger) {
            scrollState.heroStart = trigger.start;
            scrollState.heroEnd = trigger.end;
          }
          // The projects chapter (refreshPriority 1) is measured after this one, since the pin shifts everything below.
          ScrollTrigger.sort();
          ScrollTrigger.refresh();
        }),
      );
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="hh-motion">
      {children}
    </div>
  );
};
