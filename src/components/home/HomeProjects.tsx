import type { CSSProperties, ReactNode } from 'react';
import Image from 'next/image';
import { TransitionLink } from '@/components/site/TransitionLink';
import { getAgencyProjects, getFeaturedProjects, hasDetailPage, type Project } from '@/lib/data/lastwork.data';
import { localePath } from '@/lib/locale-path';
import { getCurrentLocale, getScopedI18n } from '@/locales/serveur';
import { HomeProjectsMotion } from './HomeProjectsMotion';
import './home-projects.css';

type FeaturedSlug = 'traceguard' | 'ariane' | 'nutricert' | 'bookish';
type AgencySlug = 'odaje' | 'tartine-chocolat' | 'qwetch' | 'easy-clothes' | 'balzac-paris' | 'isotoner' | 'le-1-store';

const FEATURED_SLUGS: readonly string[] = ['traceguard', 'ariane', 'nutricert', 'bookish'];
const AGENCY_SLUGS: readonly string[] = ['odaje', 'tartine-chocolat', 'qwetch', 'easy-clothes', 'balzac-paris', 'isotoner', 'le-1-store'];
// Screenshots are wide; the other visuals are square.
const SQUARE_IMAGE_SLUGS: readonly string[] = ['bookish'];

const isFeaturedSlug = (slug: string): slug is FeaturedSlug => FEATURED_SLUGS.includes(slug);
const isAgencySlug = (slug: string): slug is AgencySlug => AGENCY_SLUGS.includes(slug);

const pad2 = (n: number): string => String(n).padStart(2, '0');

interface ProjectLinkProps {
  project: Project;
  href: string;
  className: string;
  children: ReactNode;
}

/** External links open in a new tab; internal ones keep the page transition. */
const ProjectLink = ({ project, href, className, children }: ProjectLinkProps) =>
  project.link ? (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer" data-cursor="view">
      {children}
    </a>
  ) : (
    <TransitionLink className={className} href={href} data-cursor="view">
      {children}
    </TransitionLink>
  );

export const HomeProjects = async () => {
  const t = await getScopedI18n('homeProjects');
  const locale = await getCurrentLocale();

  const featured = getFeaturedProjects().filter((p) => isFeaturedSlug(p.slug));
  const agency = getAgencyProjects().filter((p) => isAgencySlug(p.slug));
  const total = featured.length;
  const titleStyle = { '--hp-chars': t('title').length } as CSSProperties;

  return (
    <section id="projets" className="hp theme-dark" aria-labelledby="hp-title" data-hp-root>
      <header className="hp-head pad-x">
        <p className="mono-label hp-eyebrow">{t('eyebrow')}</p>
        <h2 id="hp-title" className="display hp-giant" style={titleStyle} data-hp-giant>
          {t('title')}
        </h2>
      </header>

      <div className="hp-stage" data-hp-stage>
        <p className="mono-label hp-count" aria-hidden="true">
          <span className="hp-cur" data-hp-cur>
            01
          </span>{' '}
          / {pad2(total)}
        </p>

        {featured.map((project) => {
          const slug = project.slug as FeaturedSlug;
          const href = project.link ?? localePath(locale, `/projects/${slug}`);
          const square = SQUARE_IMAGE_SLUGS.includes(slug);
          const category = project.category;
          return (
            <article key={slug} className="hp-proj" data-hp-step>
              <div className="hp-proj-text">
                <p className="mono-label hp-type" data-hp-fade>
                  {category ? <span className="text-acc">[{t(`categories.${category}`)}]</span> : null} {t(`projects.${slug}.kind`)}
                </p>
                <h3 className="display hp-proj-title" data-hp-title>
                  {project.title}
                </h3>
                <p className="hp-desc" data-hp-fade>
                  {t(`projects.${slug}.description`)}
                </p>
                <ul className="hp-pills" data-hp-fade-group>
                  {t(`projects.${slug}.pills`)
                    .split('|')
                    .map((pill) => (
                      <li key={pill}>{pill}</li>
                    ))}
                </ul>
                {project.link || hasDetailPage(project) ? (
                  <ProjectLink project={project} href={href} className="mono-label hp-link">
                    {t(`projects.${slug}.cta`)} <span aria-hidden="true">{project.link ? '↗' : '→'}</span>
                  </ProjectLink>
                ) : null}
              </div>
              <figure className={square ? 'hp-fig' : 'hp-fig hp-fig-shot'} data-hp-fig>
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={t(`projects.${slug}.alt`)}
                    fill
                    sizes="(min-width: 900px) 48vw, 100vw"
                    className="hp-img"
                  />
                ) : null}
              </figure>
            </article>
          );
        })}

        <ol className="mono-label hp-segs" aria-hidden="true" style={{ gridTemplateColumns: `repeat(${total}, 1fr)` }}>
          {featured.map((project, i) => (
            <li key={project.slug}>
              {pad2(i + 1)} · {project.title}
            </li>
          ))}
        </ol>
      </div>

      <div className="hp-agency pad-x">
        <div className="hp-agency-head">
          <h3 className="display hp-agency-title" data-hp-agency-title>
            {t('agency.title')}
          </h3>
          <p className="mono-label hp-agency-intro">{t('agency.intro')}</p>
        </div>
        <ul className="hp-rows">
          {agency.map((project, i) => {
            const slug = project.slug as AgencySlug;
            const name = t(`agency.items.${slug}.name`);
            return (
              <li key={slug} className="hp-row" data-peek={project.image}>
                <span className="mono-label hp-row-code">W3·{pad2(i + 1)}</span>
                <h4 className="hp-row-name">
                  {project.link ? (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="hp-row-link">
                      {name}
                    </a>
                  ) : (
                    name
                  )}
                </h4>
                {project.link ? (
                  <span className="hp-row-arr" aria-hidden="true">
                    ↗
                  </span>
                ) : null}
                <p className="hp-row-desc">{t(`agency.items.${slug}.description`)}</p>
                {project.image ? (
                  <Image className="hp-row-thumb" src={project.image} alt="" width={64} height={64} sizes="64px" />
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>

      <HomeProjectsMotion />
    </section>
  );
};
