import { getScopedI18n } from '@/locales/serveur';
import { bookingUrl } from '@/lib/booking';
import { localePath, type Locale } from '@/lib/locale-path';
import { TransitionLink } from '@/components/site/TransitionLink';

interface ServicesClosingProps {
  locale: Locale;
}

/** Closing call to action: the contact form, plus the booking link when the language has one. */
export const ServicesClosing = async ({ locale }: ServicesClosingProps) => {
  const t = await getScopedI18n('servicesPage');
  const booking = bookingUrl(locale);

  return (
    <section className="theme-light sv-close" aria-labelledby="sv-close-title">
      <div>
        <p className="mono-label sv-close-label">{t('closingLabel')}</p>
        <h2 id="sv-close-title" className="display sv-close-big">
          <span>{t('closingTitle1')}</span>
          <span className="text-acc">{t('closingTitle2')}</span>
        </h2>
      </div>
      <div className="sv-close-side" data-sv-rise>
        <p className="sv-close-text">{t('closingText')}</p>
        <div className="sv-close-actions">
          <TransitionLink href={localePath(locale, '/contact')} className="btn">
            {t('closingCta')} <span aria-hidden="true">↗</span>
          </TransitionLink>
          {booking ? (
            <a href={booking} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              {t('closingBooking')} <span aria-hidden="true">↗</span>
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
};
