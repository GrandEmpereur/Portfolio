"use client";

import { usePathname } from "next/navigation";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import { LOCALES, localePath, stripLocale, type Locale } from "@/lib/locale-path";
import { TransitionLink } from "./TransitionLink";

/** Language list of the footer: the header one is hidden on small screens. */
export const FooterLanguages = () => {
  const t = useScopedI18n("common.nav");
  const locale: Locale = useCurrentLocale();
  const path = stripLocale(usePathname());

  return (
    <ul className="sf-langs" aria-label={t("languages")}>
      {LOCALES.map((l) => (
        <li key={l}>
          <TransitionLink
            href={localePath(l, path)}
            hrefLang={l}
            lang={l}
            aria-current={l === locale ? "true" : undefined}
            className={l === locale ? "is-on" : undefined}
          >
            {l.toUpperCase()}
          </TransitionLink>
        </li>
      ))}
    </ul>
  );
};
