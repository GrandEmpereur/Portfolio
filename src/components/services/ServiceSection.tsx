import { getScopedI18n } from '@/locales/serveur';
import type { Service } from '@/lib/data/services.data';
import { getServiceDetail } from '@/lib/data/service-details.data';
import { localePath, type Locale } from '@/lib/locale-path';
import { TransitionLink } from '@/components/site/TransitionLink';
import { needFor, resolveProject } from './services-helpers';

interface ServiceSectionProps {
  service: Service;
  locale: Locale;
}

/** One service: sticky summary on the left (desktop), the long-form blocks on the right. */
export const ServiceSection = async ({ service, locale }: ServiceSectionProps) => {
  const t = await getScopedI18n('servicesPage');
  const detail = getServiceDetail(service.id);
  const titleId = `${service.id}-title`;

  const intro = detail?.intro[locale] || service.description[locale];
  const useCases = detail?.useCases[locale] ?? [];
  const deliverables = detail?.deliverables[locale] ?? [];
  const steps = detail?.steps[locale] ?? [];
  const faq = detail?.faq[locale] ?? [];
  const project = resolveProject(detail?.projectSlug, locale);
  const duration = service.duration[locale];
  const hasBlocks = useCases.length + deliverables.length + steps.length + faq.length > 0 || project !== null;
  const contactHref = localePath(locale, `/contact?need=${detail?.need ?? needFor(service.id)}`);

  return (
    <section
      id={service.id}
      aria-labelledby={titleId}
      className={hasBlocks ? 'sv-svc' : 'sv-svc sv-svc--short'}
    >
      <div className="sv-aside">
        <p className="mono-label sv-code">{service.code}</p>
        <h2 id={titleId} className="display sv-svc-title">
          {service.title[locale]}
        </h2>
        <p className="sv-intro">{intro}</p>

        <dl className="sv-facts">
          {duration ? (
            <div>
              <dt className="mono-label">{t('durationLabel')}</dt>
              <dd>{duration}</dd>
            </div>
          ) : null}
          <div>
            <dt className="mono-label">{t('technologiesLabel')}</dt>
            <dd>
              <ul className="sv-chips">
                {service.technologies.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>

        <TransitionLink href={contactHref} className="btn sv-cta">
          {t('cta')} <span aria-hidden="true">↗</span>
        </TransitionLink>
      </div>

      {hasBlocks ? (
        <div className="sv-main">
          {useCases.length > 0 ? (
            <div className="sv-block" data-sv-rise>
              <h3 className="mono-label sv-block-title">{t('useCasesTitle')}</h3>
              <ul className="sv-rows">
                {useCases.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {deliverables.length > 0 ? (
            <div className="sv-block" data-sv-rise>
              <h3 className="mono-label sv-block-title">{t('deliverablesTitle')}</h3>
              <ul className="sv-rows">
                {deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {steps.length > 0 ? (
            <div className="sv-block" data-sv-rise>
              <h3 className="mono-label sv-block-title">{t('stepsTitle')}</h3>
              <ol className="sv-steps">
                {steps.map((step, index) => (
                  <li key={step.title}>
                    <span className="display sv-step-n">{String(index + 1).padStart(2, '0')}</span>
                    <h4>{step.title}</h4>
                    <p>{step.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          ) : null}

          {project ? (
            <div className="sv-block" data-sv-rise>
              <h3 className="mono-label sv-block-title">{t('projectTitle')}</h3>
              <div className="sv-project">
                {/* The link covers the whole row (see .sv-project-link::after); the hover shift sits on the inner span. */}
                {project.external ? (
                  <a className="sv-project-link" href={project.href} target="_blank" rel="noopener noreferrer">
                    <span className="sv-project-text">
                      {project.title} <span className="mono-label">{t('projectCta')}</span>
                    </span>
                  </a>
                ) : (
                  <TransitionLink className="sv-project-link" href={project.href}>
                    <span className="sv-project-text">
                      {project.title} <span className="mono-label">{t('projectCta')}</span>
                    </span>
                  </TransitionLink>
                )}
                <span className="sv-arrow" aria-hidden="true">
                  ↗
                </span>
              </div>
            </div>
          ) : null}

          {faq.length > 0 ? (
            <div className="sv-block" data-sv-rise>
              <h3 className="mono-label sv-block-title">{t('faqTitle')}</h3>
              <div className="sv-faq">
                {faq.map((entry, index) => (
                  <details key={entry.question} name={`faq-${service.id}`} className="sv-item">
                    <summary className="sv-q">
                      <span className="mono-label sv-q-n">{String(index + 1).padStart(2, '0')}</span>
                      <span className="sv-q-text">{entry.question}</span>
                      <i className="sv-plus" aria-hidden="true" />
                    </summary>
                    <p className="sv-a">{entry.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
};
