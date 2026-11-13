"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap-config";
import { prefersReducedMotion } from "@/lib/motion";

/** The giant name. Static and centred without JavaScript or with reduced motion; scrolls slowly otherwise. */
export const FooterMarquee = ({ name }: { name: string }) => {
  const root = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      root.current.classList.add("is-running");
      const tween = gsap.to(".sf-track", { xPercent: -50, duration: 28, ease: "none", repeat: -1 });
      // no need to animate while the footer is off screen
      ScrollTrigger.create({
        trigger: root.current,
        onToggle: (self) => (self.isActive ? tween.play() : tween.pause()),
      });
      return () => root.current?.classList.remove("is-running");
    },
    { scope: root },
  );

  return (
    <p ref={root} className="display sf-wm" aria-hidden="true">
      <span className="sf-track">
        <span>{name}</span>
        <span className="sf-sep">·</span>
        <span className="sf-dup">{name}</span>
        <span className="sf-sep sf-dup">·</span>
      </span>
    </p>
  );
};
