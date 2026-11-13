"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Brings the page back after a TransitionLink fade: new route, or back/forward from the bfcache. */
export const RouteTransition = (): null => {
  const pathname = usePathname();

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("leaving");
    // A page that stages its own entrance marks it with [data-enter="manual"] and releases "enter" itself.
    // Every other page is shown right away instead of waiting for the 2.5s fallback.
    if (!document.querySelector('[data-enter="manual"]')) html.classList.remove("enter");
  }, [pathname]);

  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) document.documentElement.classList.remove("leaving", "enter");
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  return null;
};
