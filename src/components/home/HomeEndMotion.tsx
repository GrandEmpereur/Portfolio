"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap-config";
import { isFinePointer, prefersReducedMotion, whenFontsReady } from "@/lib/motion";

const MAGNET_X = 10;
const MAGNET_Y = 8;

/**
 * Attaches the motion to the section rendered by HomeEnd (this component renders only an inert marker).
 * Without JavaScript or with reduced motion, nothing here runs: the FAQ is native <details name="faq">
 * and every text is already in the HTML.
 */
export const HomeEndMotion = () => {
  const marker = useRef<HTMLSpanElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      const root = marker.current?.closest<HTMLElement>("section");
      if (!root || !contextSafe || prefersReducedMotion()) return;

      const cleanups: Array<() => void> = [];
      let cancelled = false;

      // ---- blocks that rise into view, in small staggered groups ----
      const rising = Array.from(
        root.querySelectorAll<HTMLElement>(".he-faq-title, .he-item, .he-label, .he-text, .he-cta, .he-facts > div"),
      );
      gsap.set(rising, { y: 28, autoAlpha: 0 });
      ScrollTrigger.batch(rising, {
        start: "top 92%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.07, overwrite: true, clearProps: "transform" }),
      });

      // ---- FAQ: height animation only enhances the native open/close ----
      const padding = new Map<HTMLDetailsElement, number>();
      root.querySelectorAll<HTMLDetailsElement>("details.he-item").forEach((details) => {
        const summary = details.querySelector<HTMLElement>("summary");
        const answer = details.querySelector<HTMLElement>(".he-a");
        if (!summary || !answer) return;
        let closing = false;

        const onClick = contextSafe((event: MouseEvent) => {
          event.preventDefault();
          if (!gsap.isTweening(answer)) padding.set(details, parseFloat(getComputedStyle(answer).paddingBottom) || 0);
          const bottom = padding.get(details) ?? 0;

          if (details.open && !closing) {
            closing = true;
            gsap.set(answer, { overflow: "hidden" });
            gsap.to(answer, {
              height: 0,
              paddingBottom: 0,
              autoAlpha: 0,
              duration: 0.38,
              ease: "power2.inOut",
              overwrite: true,
              onComplete: () => {
                closing = false;
                details.open = false;
                gsap.set(answer, { clearProps: "all" });
              },
            });
            return;
          }

          closing = false;
          details.open = true;
          gsap.set(answer, { overflow: "hidden" });
          // clearProps leaves the answer at its natural size: never cut off, whatever happens
          gsap.fromTo(
            answer,
            { height: 0, paddingBottom: 0, autoAlpha: 0 },
            { height: "auto", paddingBottom: bottom, autoAlpha: 1, duration: 0.55, ease: "pb", overwrite: true, clearProps: "all" },
          );
        });

        summary.addEventListener("click", onClick);
        cleanups.push(() => summary.removeEventListener("click", onClick));
      });

      // ---- magnetic call to action: mouse only ----
      if (isFinePointer()) {
        const button = root.querySelector<HTMLElement>(".he-cta");
        if (button) {
          const moveX = gsap.quickTo(button, "x", { duration: 0.4, ease: "pb" });
          const moveY = gsap.quickTo(button, "y", { duration: 0.4, ease: "pb" });
          const onMove = (event: MouseEvent) => {
            const rect = button.getBoundingClientRect();
            moveX(((event.clientX - rect.left) / rect.width - 0.5) * MAGNET_X);
            moveY(((event.clientY - rect.top) / rect.height - 0.5) * MAGNET_Y);
          };
          const onLeave = () => {
            moveX(0);
            moveY(0);
          };
          button.addEventListener("mousemove", onMove);
          button.addEventListener("mouseleave", onLeave);
          cleanups.push(() => {
            button.removeEventListener("mousemove", onMove);
            button.removeEventListener("mouseleave", onLeave);
          });
        }
      }

      // ---- big title: letters rise behind a line mask, once. Split after the fonts are ready ----
      const title = root.querySelector<HTMLElement>(".he-big");
      if (title) {
        whenFontsReady(
          contextSafe(() => {
            if (cancelled) return;
            const split = SplitText.create(title, { type: "lines,chars", mask: "lines", linesClass: "he-ln", aria: "auto" });
            gsap.from(split.chars, {
              yPercent: 118,
              duration: 0.95,
              ease: "pb",
              stagger: 0.018,
              scrollTrigger: { trigger: title, start: "top 92%", once: true },
            });
          }),
        );
      }

      return () => {
        cancelled = true;
        cleanups.forEach((fn) => fn());
      };
    },
    { scope: marker },
  );

  return <span ref={marker} hidden />;
};
