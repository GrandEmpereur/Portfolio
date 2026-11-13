"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap-config";
import { prefersReducedMotion, whenFontsReady } from "@/lib/motion";
import { riseOnScroll } from "@/lib/reveal";

interface MotionProps {
  children: ReactNode;
}

const split = (target: Element, vars: SplitText.Vars): SplitText => SplitText.create(target, { aria: "auto", ...vars });

/** A block that rises and fades in when it enters the screen, in small staggered groups. */
const rise = (targets: gsap.DOMTarget, y = 28): void => riseOnScroll(targets, { y });

/** A big heading whose letters rise behind a mask, once. */
const heading = (el: Element | null): void => {
  if (!el) return;
  const lines = split(el, { type: "lines,words,chars", mask: "lines" });
  gsap.from(lines.chars, {
    yPercent: 118,
    duration: 0.95,
    stagger: 0.018,
    scrollTrigger: { trigger: el, start: "top 92%", once: true },
  });
};

/** Services, method and quote: reveals, step fill on scroll, word-by-word quote, quote tabs. */
export const HomeServicesMotion = ({ children }: MotionProps) => {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      const root = scope.current;
      if (!root || !contextSafe) return;

      const items = Array.from(root.querySelectorAll<HTMLElement>("[data-quote-item]"));
      const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-quote-tab]"));
      const reduced = prefersReducedMotion();
      const splits: (SplitText | null)[] = items.map(() => null);
      let cancelled = false;
      let active = 0;

      // Tabs work with or without motion: they only choose which quote is shown.
      const select = (index: number, animate: boolean) => {
        active = index;
        items.forEach((item, i) => {
          item.hidden = i !== index;
        });
        tabs.forEach((tab, i) => tab.setAttribute("aria-pressed", String(i === index)));
        if (!animate || reduced) return;
        const words = splits[index]?.words;
        if (words) gsap.fromTo(words, { yPercent: 45 }, { yPercent: 0, duration: 0.6, stagger: 0.05, overwrite: "auto" });
        gsap.fromTo(
          items[index].querySelectorAll(".hs-quote-full, .hs-quote-who"),
          { y: 12, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.08, overwrite: true },
        );
      };

      const onTab = (event: Event) => {
        const tab = event.currentTarget;
        if (!(tab instanceof HTMLElement)) return;
        const index = Number(tab.dataset.quoteTab);
        if (Number.isNaN(index) || index === active || !items[index]) return;
        select(index, true);
      };
      tabs.forEach((tab) => tab.addEventListener("click", onTab));
      // Only the first quote is shown at rest, without an entrance of its own.
      select(0, false);

      if (!reduced) {
        rise(root.querySelectorAll(".hs-cat-head"));
        rise(root.querySelectorAll(".hs-rows li"));

        // Method steps: numbers and text rise once, and each rule fills with the scroll.
        const grid = root.querySelector(".hs-steps-grid");
        const steps = Array.from(root.querySelectorAll<HTMLElement>(".hs-step"));
        if (grid && steps.length) {
          const numbers = root.querySelectorAll(".hs-step-n");
          const copy = root.querySelectorAll(".hs-step > h4, .hs-step > p");
          gsap.set(numbers, { yPercent: 70, opacity: 0 });
          gsap.set(copy, { y: 22, opacity: 0 });
          ScrollTrigger.create({
            trigger: grid,
            start: "top 86%",
            once: true,
            onEnter: () => {
              gsap.to(numbers, { yPercent: 0, opacity: 1, duration: 1, stagger: 0.13 });
              gsap.to(copy, { y: 0, opacity: 1, duration: 0.8, stagger: 0.06, delay: 0.15 });
            },
          });
          const fill = (progress: number) =>
            steps.forEach((step, k) =>
              step.style.setProperty("--f", Math.max(0, Math.min(1, progress * steps.length - k)).toFixed(3)),
            );
          ScrollTrigger.create({
            trigger: grid,
            start: "top 82%",
            end: "bottom 60%",
            onRefresh: (self) => fill(self.progress),
            onUpdate: (self) => fill(self.progress),
          });
        }

        rise(root.querySelectorAll(".hs-quote-tabs button"), 18);
        if (items[0]) rise(items[0].querySelectorAll(".hs-quote-full, .hs-quote-who"), 18);
      }

      // SplitText measures glyphs: wait for the fonts, and never run after the component is gone.
      if (!reduced) {
        whenFontsReady(
          contextSafe(() => {
            if (cancelled) return;
            heading(root.querySelector(".hs-head h2"));
            heading(root.querySelector(".hs-steps-head h3"));
            const quote = root.querySelector(".hs-quote");
            items.forEach((item, i) => {
              const pull = item.querySelector(".hs-quote-pull");
              if (!pull) return;
              const words = split(pull, { type: "words" });
              splits[i] = words;
              gsap.from(words.words, {
                opacity: 0.14,
                stagger: 0.1,
                ease: "none",
                scrollTrigger: { trigger: quote, start: "top 80%", end: "top 30%", scrub: true },
              });
            });
          }),
        );
      }

      return () => {
        cancelled = true;
        tabs.forEach((tab) => tab.removeEventListener("click", onTab));
      };
    },
    { scope },
  );

  return (
    <div ref={scope} className="hs-root">
      {children}
    </div>
  );
};

/** Blog teaser: heading and rows reveal on scroll. */
export const HomeBlogMotion = ({ children }: MotionProps) => {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      const root = scope.current;
      if (!root || !contextSafe || prefersReducedMotion()) return;
      let cancelled = false;

      rise(root.querySelectorAll(".hs-blog-head .mono-label, .hs-posts li"));
      whenFontsReady(
        contextSafe(() => {
          if (!cancelled) heading(root.querySelector(".hs-head h2"));
        }),
      );

      return () => {
        cancelled = true;
      };
    },
    { scope },
  );

  return (
    <div ref={scope} className="hs-root">
      {children}
    </div>
  );
};
