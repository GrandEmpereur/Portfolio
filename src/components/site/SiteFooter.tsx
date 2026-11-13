import { getCurrentLocale, getScopedI18n } from "@/locales/serveur";
import { localePath } from "@/lib/locale-path";
import { seoConfig } from "@/lib/seo-config";
import { FooterLanguages } from "./FooterLanguages";
import { FooterMarquee } from "./FooterMarquee";
import { TransitionLink } from "./TransitionLink";
import "./site.css";

const LEGAL = [
  { key: "mentions", path: "/mentions-legales" },
  { key: "privacy", path: "/politique-confidentialite" },
  { key: "cookies", path: "/politique-cookies" },
  { key: "terms", path: "/conditions-utilisation" },
] as const;

export const SiteFooter = async () => {
  const locale = await getCurrentLocale();
  const t = await getScopedI18n("common");

  const social = [
    { key: "linkedin", href: seoConfig.social.linkedin },
    { key: "github", href: seoConfig.social.github },
    { key: "instagram", href: seoConfig.social.instagram },
  ] as const;

  return (
    <footer data-site-footer className="sf theme-dark">
      <FooterMarquee name={t("nav.name")} />
      <div className="sf-foot mono-label">
        <span>{t("footer.rights", { year: new Date().getFullYear().toString() })}</span>
        <nav aria-label={t("footer.navLabel")}>
          <ul>
            {LEGAL.map(({ key, path }) => (
              <li key={key}>
                <TransitionLink href={localePath(locale, path)}>{t(`footer.legal.${key}`)}</TransitionLink>
              </li>
            ))}
            <li>
              <button type="button" data-consent-open>
                {t("footer.manageCookies")}
              </button>
            </li>
          </ul>
        </nav>
        <ul aria-label={t("footer.follow")}>
          {social.map(({ key, href }) => (
            <li key={key}>
              <a href={href} target="_blank" rel="noopener noreferrer">
                {t(`footer.social.${key}`)}
              </a>
            </li>
          ))}
          <li>
            <a href={`mailto:${seoConfig.author.email}`}>{t("footer.social.email")}</a>
          </li>
        </ul>
        <FooterLanguages />
      </div>
    </footer>
  );
};
