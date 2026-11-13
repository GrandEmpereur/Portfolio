"use client";

import type { ComponentProps, MouseEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { prefersReducedMotion } from "@/lib/motion";
import { scrollToY } from "@/lib/scroll";

const FADE_MS = 240;
const SAFETY_MS = 4000;

/** Internal link: the page fades out (class `leaving` on <html>) before the route changes. Same-page anchors scroll smoothly. */
export const TransitionLink = ({ onClick, href, target, ...props }: ComponentProps<typeof Link>) => {
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || typeof href !== "string") return;
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (target && target !== "_self") return;

    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin) return;

    if (url.pathname === window.location.pathname) {
      if (url.search !== window.location.search) return;
      if (!url.hash) return;
      // same page, other section: smooth scroll instead of a hard jump
      const id = decodeURIComponent(url.hash.slice(1));
      const el = id ? document.getElementById(id) : null;
      if (!el && id !== "accueil") return;
      event.preventDefault();
      scrollToY(id === "accueil" || !el ? 0 : el.getBoundingClientRect().top + window.scrollY);
      return;
    }

    event.preventDefault();
    const html = document.documentElement;
    html.classList.add("leaving");
    // if the navigation never lands, never leave the page invisible
    window.setTimeout(() => html.classList.remove("leaving"), SAFETY_MS);
    window.setTimeout(() => router.push(href), prefersReducedMotion() ? 0 : FADE_MS);
  };

  return <Link href={href} target={target} onClick={handleClick} {...props} />;
};
