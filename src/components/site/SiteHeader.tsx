"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import { LOCALES, localePath, stripLocale, type Locale } from "@/lib/locale-path";
import { isBlogVisible } from "@/lib/data/blog.data";
import { canPin, isDesktop, scrollState } from "@/lib/motion";
import { scrollToY } from "@/lib/scroll";
import { TransitionLink } from "./TransitionLink";
import "./site.css";

type ChapterId = "accueil" | "profil" | "projets" | "methode" | "blog" | "contact";
type Variant = "home" | "contact" | "default";

const variantFor = (path: string): Variant => {
  if (path === "/") return "home";
  if (path === "/contact" || path.startsWith("/contact/")) return "contact";
  return "default";
};

const sectionTop = (id: string): number => {
  const el = document.getElementById(id);
  return el ? el.getBoundingClientRect().top : Number.POSITIVE_INFINITY;
};

const chapterTarget = (id: ChapterId): number => {
  if (id === "accueil") return 0;
  if (id === "profil") {
    if (canPin() && scrollState.heroEnd > scrollState.heroStart) {
      return scrollState.heroStart + (scrollState.heroEnd - scrollState.heroStart) * 0.96;
    }
    return sectionTop("profil") + window.scrollY;
  }
  return sectionTop(id) + window.scrollY;
};

export const SiteHeader = () => {
  const t = useScopedI18n("common.nav");
  const locale: Locale = useCurrentLocale();
  const pathname = usePathname();
  const path = stripLocale(pathname);
  const variant = variantFor(path);

  const chapters: ChapterId[] = ["accueil", "profil", "projets", "methode", ...(isBlogVisible() ? (["blog"] as const) : []), "contact"];

  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const chaptersRef = useRef<HTMLOListElement>(null);

  // current chapter + progress line, home only
  useEffect(() => {
    if (variant !== "home") return;
    const ids: ChapterId[] = ["accueil", "profil", "projets", "methode", ...(isBlogVisible() ? (["blog"] as const) : []), "contact"];
    const tick = () => {
      const vh = window.innerHeight;
      const mid = vh * 0.5;
      let i = 0;
      if (sectionTop("contact") <= mid) i = ids.indexOf("contact");
      else if (ids.includes("blog") && sectionTop("blog") <= mid) i = ids.indexOf("blog");
      else if (sectionTop("methode") <= mid) i = ids.indexOf("methode");
      else if (sectionTop("projets") <= mid) i = ids.indexOf("projets");
      else if (scrollState.heroPinned ? scrollState.heroProgress > 0.55 : sectionTop("profil") <= mid) i = ids.indexOf("profil");
      setActive(i);
      const max = document.documentElement.scrollHeight - vh;
      chaptersRef.current?.style.setProperty("--p", max > 0 ? Math.min(1, window.scrollY / max).toFixed(4) : "0");
    };
    tick();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    return () => {
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
    };
  }, [variant]);

  // close the mobile list on outside click, Escape, or route change
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const goTo = (id: ChapterId, index: number) => {
    // on small screens the first tap opens the list, the next one navigates
    if (!isDesktop() && !open) {
      setOpen(true);
      return;
    }
    setOpen(false);
    setActive(index);
    scrollToY(chapterTarget(id));
  };

  const languages = (
    <div className="sh-langs mono-label" role="group" aria-label={t("languages")}>
      {LOCALES.map((l, i) => (
        <span key={l}>
          {i > 0 ? " · " : null}
          <TransitionLink
            href={localePath(l, path)}
            hrefLang={l}
            lang={l}
            aria-current={l === locale ? "true" : undefined}
            className={l === locale ? "is-on" : undefined}
          >
            {l.toUpperCase()}
          </TransitionLink>
        </span>
      ))}
    </div>
  );

  const nameLink = (
    <TransitionLink
      className="sh-name mono-label"
      href={variant === "home" ? localePath(locale, "/#accueil") : localePath(locale, "/")}
      aria-label={t("home")}
    >
      {variant === "contact" ? <span aria-hidden="true">← </span> : null}
      {t("name")}
    </TransitionLink>
  );

  return (
    <header ref={headerRef} data-site-header className={open ? "sh is-open" : "sh"}>
      {nameLink}

      {variant === "home" ? (
        <nav aria-label={t("label")} className="sh-nav">
          <ol ref={chaptersRef} data-chapters className="sh-ch mono-label">
            {chapters.map((id, i) => (
              <li key={id}>
                <button
                  type="button"
                  data-chapter={id}
                  className={i === active ? "is-on" : undefined}
                  aria-current={i === active ? "true" : undefined}
                  aria-expanded={i === active ? open : undefined}
                  aria-label={i === active && !open ? `${t(`chapters.${id}`)}, ${t("openChapters")}` : undefined}
                  onClick={() => goTo(id, i)}
                >
                  {String(i + 1).padStart(2, "0")} {t(`chapters.${id}`)}
                </button>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}

      {variant === "contact" ? <span className="sh-mid mono-label">{t("contactPage")}</span> : null}

      <div className="sh-right">
        {languages}
        {variant === "contact" ? (
          <TransitionLink className="sh-cta" href={localePath(locale, "/")}>
            {t("close")}
          </TransitionLink>
        ) : (
          <TransitionLink className="sh-cta" href={localePath(locale, "/contact")}>
            <span className="sh-long">{t("contact")}</span>
            <span className="sh-short">{t("contactShort")}</span>
          </TransitionLink>
        )}
      </div>
    </header>
  );
};
