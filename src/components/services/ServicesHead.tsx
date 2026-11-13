import { getScopedI18n } from '@/locales/serveur';
import { services, type ServiceCategory } from '@/lib/data/services.data';
import { localePath, type Locale } from '@/lib/locale-path';
import { TransitionLink } from '@/components/site/TransitionLink';

interface ServicesHeadProps {
  locale: Locale;
}

/** Index label, the single h1, the lede, and the in-page index of the six services. */
export const ServicesHead = async ({ locale }: ServicesHeadProps) => {
  const t = await getScopedI18n('servicesPage');
  const groups: { category: ServiceCategory; code: string; title: string }[] = [
    { category: 'ai', code: '[IA]', title: t('groupAi') },
    { category: 'fullstack', code: '[FS]', title: t('groupFs') },
  ];

  return (
    <header className="theme-dark sv-head">
      <p className="mono-label sv-index">{t('index')}</p>
      <h1 className="display sv-title">{t('title')}</h1>
      <p className="sv-lede">{t('lede')}</p>

      <nav aria-label={t('indexNav')} className="sv-toc">
        <p className="mono-label sv-toc-label">{t('indexLabel')}</p>
        <div className="sv-toc-groups">
          {groups.map((group) => (
            <div key={group.category} className="sv-toc-group">
              <p className="mono-label sv-toc-group-title">
                <span className="sv-toc-code">{group.code}</span> {group.title}
              </p>
              <ul className="sv-toc-rows">
                {services
                  .filter((service) => service.category === group.category)
                  .map((service) => (
                    <li key={service.id} data-sv-rise>
                      <span className="mono-label sv-toc-n">{service.code}</span>
                      <TransitionLink className="sv-toc-link" href={localePath(locale, `/services#${service.id}`)}>
                        <span className="sv-toc-text">{service.title[locale]}</span>
                      </TransitionLink>
                      <span className="sv-toc-arrow" aria-hidden="true">
                        ↓
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
};
