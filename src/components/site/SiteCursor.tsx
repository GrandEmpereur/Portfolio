"use client";

import { useEffect, useRef } from "react";
import { useScopedI18n } from "@/locales/client";
import { isFinePointer, prefersReducedMotion } from "@/lib/motion";
import "./site.css";

const INTERACTIVE = "[data-cursor], [data-peek], a, button, summary";

/**
 * Dot + ring, mouse only. Elements opt in to a label with data-cursor="view" | "open" | "read"
 * (any other value is shown as is); <summary> defaults to "open"; [data-peek] hides the ring.
 */
export const SiteCursor = () => {
  const t = useScopedI18n("common.cursor");
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const view = t("view");
  const open = t("open");
  const read = t("read");

  useEffect(() => {
    if (!isFinePointer() || prefersReducedMotion()) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    const html = document.documentElement;
    const labels: Record<string, string> = { view, open, read };
    let seen = false;

    // `translate`, not `transform`: the ring size goes through `scale`, and `transform` would be shrunk by it.
    const onMove = (e: MouseEvent) => {
      const pos = `${e.clientX}px ${e.clientY}px`;
      dot.style.translate = pos;
      if (!seen) {
        seen = true;
        ring.style.transition = "none";
        ring.style.translate = pos;
        void ring.offsetWidth;
        ring.style.transition = "";
        html.classList.add("has-cursor");
      } else ring.style.translate = pos;
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target instanceof Element ? e.target.closest(INTERACTIVE) : null;
      const holder = target?.closest("[data-cursor]") ?? (target?.matches("summary") ? target : null);
      const key = holder instanceof HTMLElement ? holder.dataset.cursor ?? "open" : "";
      ring.classList.toggle("is-hidden", !!target?.closest("[data-peek]"));
      ring.classList.toggle("is-label", !!holder);
      ring.classList.toggle("is-link", !!target && !holder);
      ring.textContent = holder ? labels[key] ?? key : "";
    };

    const onLeave = () => {
      seen = false;
      html.classList.remove("has-cursor");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    html.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      html.removeEventListener("mouseleave", onLeave);
      html.classList.remove("has-cursor");
    };
  }, [view, open, read]);

  return (
    <>
      <div ref={ringRef} className="cur-ring" aria-hidden="true" />
      <div ref={dotRef} className="cur-dot" aria-hidden="true" />
    </>
  );
};
