"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@/lib/gsap-config";
import { prefersReducedMotion } from "@/lib/motion";
import { riseOnScroll } from "@/lib/reveal";

interface ServicesMotionProps {
  children: ReactNode;
}

/** Reveal on scroll for every `[data-sv-rise]` block. The starting state is set here, never in CSS. */
export const ServicesMotion = ({ children }: ServicesMotionProps) => {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || prefersReducedMotion()) return;
      riseOnScroll(root.querySelectorAll("[data-sv-rise]"), { clearTransform: true });
    },
    { scope },
  );

  return (
    <div ref={scope} className="sv-root">
      {children}
    </div>
  );
};
