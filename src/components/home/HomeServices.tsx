import { getCurrentLocale, getScopedI18n } from '@/locales/serveur';
import { services, splitTestimonial, type ServiceCategory } from '@/lib/data/services.data';
import { projectTestimonials } from '@/lib/data/testimonials.data';
import { localePath } from '@/lib/locale-path';
import { TransitionLink } from '@/components/site/TransitionLink';
import { HomeServicesMotion } from './HomeServicesMotion';
import './home-services.css';

// Which answer of the contact form's first question each service preselects.
const NEED_BY_SERVICE: Record<string, string> = {
  'llm-integration': 'llm',
  'ai-agents': 'agent',
  'rag-knowledge': 'rag',
  'saas-development': 'saas',
  'web-development': 'site',
  'web-redesign': 'refonte',
};

const STEPS = [
  { title: 'step1Title', text: 'step1Text' },
  { title: 'step2Title', text: 'step2Text' },
  { title: 'step3Title', text: 'step3Text' },
  { title: 'step4Title', text: 'step4Text' },
] as const;

// Most recent first, so the quote shown at rest is the latest one.
const testimonials = [...projectTestimonials].sort((a, b) => (a.date < b.date ? 1 : -1));

export const HomeServices = async () => {
  const [t, locale] = await Promise.all([getScopedI18n('homeServices'), getCurrentLocale()]);

  const groups: { category: ServiceCategory; code: string; title: string; text: string }[] = [
    { category: 'ai', code: '[IA]', title: t('aiTitle'), text: t('aiText') },
    { category: 'fullstack', code: '[FS]', title: t('fsTitle'), text: t('fsText') },
  ];

  return (
    <section id="methode" className="theme-light hs-section" aria-labelledby="hs-title">
      <HomeServicesMotion>
        <header className="hs-head">
          <p className="mono-label hs-index">{t('index')}</p>
          <h2 id="hs-title" className="display hs-big">
            {t('titleLine1')}
            <br />
            {t('titleLine2')}
          </h2>
        </header>

        <div className="hs-cats">
          {groups.map((group) => (
            <div key={group.category} className="hs-cat">
              <div className="hs-cat-head">
                <span className="mono-label hs-cat-code">{group.code}</span>
                <h3>{group.title}</h3>
                <p>{group.text}</p>
              </div>
              <ul className="hs-rows">
                {services
                  .filter((service) => service.category === group.category)
                  .map((service) => (
                    <li key={service.id}>
                      <span className="mono-label hs-code">{service.code}</span>
                      <h4>
                        {/* The link covers the whole row (see .hs-link::after). */}
                        <TransitionLink
                          className="hs-link"
                          href={localePath(locale, `/contact?need=${NEED_BY_SERVICE[service.id] ?? 'avis'}`)}
                        >
                          {service.title[locale]}
                        </TransitionLink>
                      </h4>
                      <span className="hs-arrow" aria-hidden="true">
                        ↗
                      </span>
                      <p>{service.description[locale]}</p>
                      {service.duration[locale] ? (
                        <span className="mono-label hs-duration">{service.duration[locale]}</span>
                      ) : null}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="hs-steps">
          <div className="hs-steps-head">
            <h3 className="display">{t('methodTitle')}</h3>
            <p className="mono-label hs-index">{t('methodHint')}</p>
          </div>
          <div className="hs-steps-grid">
            {STEPS.map((step, index) => (
              <article key={step.title} className="hs-step">
                <span className="display hs-step-n">{String(index + 1).padStart(2, '0')}</span>
                <h4>{t(step.title)}</h4>
                <p>{t(step.text)}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="hs-quote" aria-label={t('quoteLabel')}>
          {testimonials.map((testimonial, index) => {
            const { pull, rest } = splitTestimonial(testimonial.quote[locale]);
            const { name, role, company } = testimonial.author;
            return (
              <figure key={testimonial.projectSlug} id={`hs-quote-${index}`} className="hs-quote-item" data-quote-item>
                <div>
                  <span className="hs-quote-mark" aria-hidden="true">
                    “
                  </span>
                  <blockquote className="hs-quote-pull">{pull}</blockquote>
                </div>
                <div className="hs-quote-body">
                  {rest ? <p className="hs-quote-full">{rest}</p> : null}
                  <figcaption className="hs-quote-who">
                    {name} · {role.trim()}, {company}
                  </figcaption>
                </div>
              </figure>
            );
          })}
          <div className="mono-label hs-quote-tabs">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.projectSlug}
                type="button"
                aria-pressed={index === 0}
                aria-controls={`hs-quote-${index}`}
                data-quote-tab={index}
              >
                {String(index + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')} · {testimonial.author.name}
              </button>
            ))}
          </div>
        </div>
      </HomeServicesMotion>
    </section>
  );
};
