import Image from 'next/image';
import { getCurrentLocale, getScopedI18n } from '@/locales/serveur';
import { localePath, type Locale } from '@/lib/locale-path';
import { TransitionLink } from '@/components/site/TransitionLink';
import { HomeHeroMotion } from './HomeHeroMotion';
import './home-hero.css';

export const HomeHero = async () => {
  const t = await getScopedI18n('homeHero');
  const locale = (await getCurrentLocale()) as Locale;

  return (
    <HomeHeroMotion locale={locale}>
      <section id="accueil" className="hh-root theme-dark" data-enter="manual">
        <div className="hh-stage">
          <figure className="hh-band">
            <Image
              src="/images/portrait-studio.jpg"
              alt={t('portraitAlt')}
              fill
              preload
              sizes="(min-width: 900px) 36vw, 100vw"
              className="hh-photo"
            />
            <i className="hh-vf" aria-hidden="true" />
            <figcaption className="mono-label hh-caption">
              {t('caption')} <span data-clock>--:--</span>
            </figcaption>
          </figure>

          <div className="hh-poster">
            <p className="mono-label hh-cue" aria-hidden="true">
              <i />
              <span>{t('scroll')}</span>
            </p>
            <div className="hh-meta">
              <div className="hh-left">
                {/* the h1 carries the keywords; the big poster title below is a paragraph */}
                <h1 className="mono-label hh-role">{t('role')}</h1>
                <p className="mono-label hh-status">
                  <i className="hh-dot" aria-hidden="true" />
                  {t('available')}
                </p>
              </div>
              <div className="hh-right">
                <p className="hh-lede">{t('lede')}</p>
                <div className="hh-cta">
                  <TransitionLink href="#projets" className="btn">
                    {t('ctaProjects')} <span aria-hidden="true">↗</span>
                  </TransitionLink>
                  <TransitionLink href={localePath(locale, '/contact')} className="btn btn-ghost">
                    {t('ctaContact')}
                  </TransitionLink>
                </div>
              </div>
            </div>
            <hr className="hh-rule" />
            <p className="display hh-headline">
              <span className="hh-l1">{t('headlineLine1')}</span>
              <span className="hh-l2">{t('headlineLine2')}</span>
            </p>
          </div>

          <div className="hh-about" id="profil">
            <p className="mono-label hh-about-label">{t('profile.label')}</p>
            <p className="hh-intro">
              {t('profile.intro.part1')}
              <em>{t('profile.intro.em1')}</em>
              {t('profile.intro.part2')}
              <em>{t('profile.intro.em2')}</em>
              {t('profile.intro.part3')}
              <em>{t('profile.intro.em3')}</em>
              {t('profile.intro.part4')}
              <em>{t('profile.intro.em4')}</em>
              {t('profile.intro.part5')}
            </p>
            <dl className="hh-facts">
              <div>
                <dt className="mono-label">{t('profile.facts.services.label')}</dt>
                <dd>{t('profile.facts.services.value')}</dd>
              </div>
              <div>
                <dt className="mono-label">{t('profile.facts.experience.label')}</dt>
                <dd>{t('profile.facts.experience.value')}</dd>
              </div>
              <div>
                <dt className="mono-label">{t('profile.facts.base.label')}</dt>
                <dd>{t('profile.facts.base.value')}</dd>
              </div>
              <div>
                <dt className="mono-label">{t('profile.facts.availability.label')}</dt>
                <dd>
                  <i className="hh-dot" aria-hidden="true" />
                  {t('profile.facts.availability.value')}
                </dd>
              </div>
              <div>
                <dt className="mono-label">{t('profile.facts.stack.label')}</dt>
                <dd>{t('profile.facts.stack.value')}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </HomeHeroMotion>
  );
};
