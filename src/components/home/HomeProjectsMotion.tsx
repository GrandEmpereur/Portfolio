'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, SplitText, useGSAP } from '@/lib/gsap-config';
import { EASE, canPin, isFinePointer, prefersReducedMotion, whenFontsReady } from '@/lib/motion';
import { riseOnScroll } from '@/lib/reveal';

const PEEK_SIZE = 240;
// Each pinned project gets this share of the viewport height of scroll.
const SCROLL_PER_PROJECT = 0.85;

type Direction = 1 | -1;

/**
 * Attaches the motion of the projects chapter to the DOM rendered by HomeProjects:
 * pinned one-project-at-a-time chapter (900px+, no reduced motion), hover preview that follows
 * the mouse on the agency list (fine pointer). Without any of that the page is plain and complete.
 */
export const HomeProjectsMotion = () => {
  const rootRef = useRef<HTMLElement | null>(null);

  useGSAP(
    (_context, contextSafe) => {
      const root = rootRef.current;
      if (!root) return;
      const safe = <T extends Function>(fn: T): T => (contextSafe ? contextSafe(fn) : fn);
      const reduced = prefersReducedMotion();
      const cleanups: Array<() => void> = [];

      const all = (selector: string, from: ParentNode = root): HTMLElement[] =>
        Array.from(from.querySelectorAll<HTMLElement>(selector));

      /* A block that rises and fades in when it enters the screen, in small staggered groups. */
      const rise = (targets: HTMLElement[], y = 28) => riseOnScroll(targets, { y, ease: EASE.out });

      /* A giant title whose letters rise behind a line mask, once. Needs the final font metrics. */
      const reveal = (el: HTMLElement | null) => {
        if (!el) return;
        whenFontsReady(
          safe(() => {
            const split = SplitText.create(el, { type: 'lines,words,chars', mask: 'lines', aria: 'auto' });
            gsap.from(split.chars, {
              yPercent: 118,
              duration: 0.95,
              stagger: 0.018,
              ease: EASE.out,
              scrollTrigger: { trigger: el, start: 'top 92%', once: true },
            });
          }),
        );
      };

      if (!reduced) {
        reveal(root.querySelector<HTMLElement>('[data-hp-giant]'));
        reveal(root.querySelector<HTMLElement>('[data-hp-agency-title]'));
        rise(all('.hp-agency-intro, .hp-row'));
      }

      /* ---------- pinned chapter: one project at a time, with a counter ---------- */
      const stage = root.querySelector<HTMLElement>('[data-hp-stage]');
      if (canPin() && stage) {
        const items = all('[data-hp-step]', stage);
        const segs = all('.hp-segs li', stage);
        const cur = stage.querySelector<HTMLElement>('[data-hp-cur]');
        const count = items.length;

        if (count > 0 && cur) {
          root.classList.add('hp-pinned');
          cleanups.push(() => root.classList.remove('hp-pinned'));

          const titles = items.map((el) => {
            const title = el.querySelector<HTMLElement>('[data-hp-title]');
            return title ? SplitText.create(title, { type: 'words,chars', aria: 'auto' }).chars : [];
          });
          const figs = items.map((el) => el.querySelector<HTMLElement>('[data-hp-fig]'));
          const fades = items.map((el) => all('[data-hp-fade], [data-hp-fade-group] li, .hp-link', el));
          let active = -1;

          /* A project arrives: the image unveils, the title climbs letter by letter, the rest follows. */
          const show = (i: number, dir: Direction) => {
            const fig = figs[i];
            const img = fig?.firstElementChild ?? null;
            if (fig) {
              gsap.fromTo(
                fig,
                { clipPath: dir > 0 ? 'inset(100% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)' },
                { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.95, ease: EASE.inOut, overwrite: true },
              );
            }
            if (img) gsap.fromTo(img, { scale: 1.25 }, { scale: 1, duration: 1.3, ease: EASE.out, overwrite: true });
            gsap.fromTo(titles[i], { yPercent: 118 * dir }, { yPercent: 0, duration: 0.85, stagger: 0.022, ease: EASE.out, overwrite: true });
            gsap.fromTo(
              fades[i],
              { y: 18 * dir, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.045, delay: 0.12, ease: EASE.out, overwrite: true },
            );
          };

          const set = (i: number) => {
            if (i === active) return;
            const dir: Direction = i > active ? 1 : -1;
            const first = active === -1;
            active = i;
            items.forEach((el, k) => el.classList.toggle('is-active', k === i));
            segs.forEach((el, k) => el.classList.toggle('is-on', k === i));
            cur.textContent = String(i + 1).padStart(2, '0');
            if (first) return;
            gsap.fromTo(cur, { yPercent: 90 * dir, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.45, ease: EASE.out, overwrite: true });
            show(i, dir);
          };

          set(0);
          ScrollTrigger.create({
            trigger: stage,
            start: 'top top',
            end: () => `+=${Math.round(count * SCROLL_PER_PROJECT * window.innerHeight)}`,
            pin: true,
            refreshPriority: 1, // the hero (pinned above) takes 2 and refreshes first
            onEnter: () => show(Math.max(active, 0), 1),
            onUpdate: (self) => {
              const p = Math.min(self.progress * count, count - 0.0001);
              const i = Math.floor(p);
              set(i);
              segs.forEach((el, k) => el.style.setProperty('--f', k < i ? '1' : k === i ? (p - i).toFixed(3) : '0'));
            },
          });
          ScrollTrigger.sort();
          ScrollTrigger.refresh();
          // Fonts change glyph widths and the pinned layout depends on them.
          whenFontsReady(safe(() => ScrollTrigger.refresh()));
        }
      } else if (!reduced) {
        rise(all('.hp-proj'), 40);
      }

      /* ---------- hover preview that follows the mouse (agency list) ---------- */
      const rows = all('[data-peek]');
      if (isFinePointer() && rows.length) {
        const peek = document.createElement('div');
        peek.className = 'hp-peek';
        peek.setAttribute('aria-hidden', 'true');
        const image = document.createElement('i');
        peek.appendChild(image);
        root.appendChild(peek);
        gsap.set(peek, { x: 0, y: 0 });

        const moveX = gsap.quickTo(peek, 'x', { duration: reduced ? 0 : 0.5, ease: 'power3.out' });
        const moveY = gsap.quickTo(peek, 'y', { duration: reduced ? 0 : 0.5, ease: 'power3.out' });
        let on = false;
        const preloaded = new Set<string>();

        const target = (e: MouseEvent) => ({
          x: Math.min(e.clientX + 28, window.innerWidth - PEEK_SIZE - 12),
          y: Math.max(72, Math.min(e.clientY - PEEK_SIZE / 2, window.innerHeight - PEEK_SIZE - 12)),
        });

        const listeners = rows.map((row) => {
          const src = row.dataset.peek;
          const enter = (e: MouseEvent) => {
            if (!src) return;
            if (!preloaded.has(src)) {
              preloaded.add(src);
              new Image().src = src;
            }
            image.style.backgroundImage = `url("${src}")`;
            const pos = target(e);
            if (!on) gsap.set(peek, pos);
            moveX(pos.x);
            moveY(pos.y);
            on = true;
            peek.classList.add('is-on');
          };
          const move = (e: MouseEvent) => {
            const pos = target(e);
            moveX(pos.x);
            moveY(pos.y);
          };
          const leave = () => {
            on = false;
            peek.classList.remove('is-on');
          };
          row.addEventListener('mouseenter', enter);
          row.addEventListener('mousemove', move, { passive: true });
          row.addEventListener('mouseleave', leave);
          return () => {
            row.removeEventListener('mouseenter', enter);
            row.removeEventListener('mousemove', move);
            row.removeEventListener('mouseleave', leave);
          };
        });

        cleanups.push(() => {
          listeners.forEach((off) => off());
          peek.remove();
        });
      }

      return () => cleanups.forEach((off) => off());
    },
    { scope: rootRef },
  );

  // Anchor inside the section: resolves the section element used as GSAP scope.
  return (
    <span
      hidden
      ref={(node) => {
        rootRef.current = node?.closest<HTMLElement>('[data-hp-root]') ?? null;
      }}
    />
  );
};
