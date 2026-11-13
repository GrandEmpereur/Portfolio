import { getCurrentLocale, getScopedI18n } from "@/locales/serveur";
import { localePath } from "@/lib/locale-path";
import { seoConfig } from "@/lib/seo-config";
import { TransitionLink } from "@/components/site/TransitionLink";
import { HOME_FAQ_IDS } from "./home-faq";
import { HomeEndMotion } from "./HomeEndMotion";
import "./home-end.css";

/** "https://github.com/GrandEmpereur" -> "GrandEmpereur", "https://www.linkedin.com/in/x" -> "/in/x" */
const pathOf = (url: string): string => new URL(url).pathname.replace(/\/$/, "");

export const HomeEnd = async () => {
  const locale = await getCurrentLocale();
  const t = await getScopedI18n("homeEnd");

  const facts = [
    { key: "mail", label: t("contact.facts.mail"), text: seoConfig.author.email, href: `mailto:${seoConfig.author.email}` },
    { key: "linkedin", label: t("contact.facts.linkedin"), text: pathOf(seoConfig.social.linkedin), href: seoConfig.social.linkedin },
    { key: "github", label: t("contact.facts.github"), text: pathOf(seoConfig.social.github).slice(1), href: seoConfig.social.github },
  ] as const;

  return (
    <section id="contact" className="he theme-dark">
      <HomeEndMotion />
      <div className="he-faq">
        <h2 className="mono-label he-faq-title">{t("faq.title")}</h2>
        {HOME_FAQ_IDS.map((id, index) => (
          <details key={id} name="faq" className="he-item">
            <summary className="he-q">
              <span className="mono-label he-num">{String(index + 1).padStart(2, "0")}</span>
              <span className="he-q-text">{t(`faq.${id}.question`)}</span>
              <i className="he-plus" aria-hidden="true" />
            </summary>
            <p className="he-a">{t(`faq.${id}.answer`)}</p>
          </details>
        ))}
      </div>
      <div className="he-contact">
        <div>
          <p className="mono-label he-label">{t("contact.label")}</p>
          <h2 className="display he-big">
            <span>{t("contact.title1")}</span>
            <span className="text-acc">{t("contact.title2")}</span>
          </h2>
        </div>
        <div className="he-side">
          <p className="he-text">{t("contact.text")}</p>
          <TransitionLink href={localePath(locale, "/contact")} className="btn he-cta">
            {t("contact.cta")} <span aria-hidden="true">↗</span>
          </TransitionLink>
          <dl className="he-facts">
            {facts.map(({ key, label, text, href }) => (
              <div key={key}>
                <dt className="mono-label">{label}</dt>
                <dd>
                  <a href={href} {...(key === "mail" ? {} : { target: "_blank", rel: "noopener noreferrer" })}>
                    {text}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};
