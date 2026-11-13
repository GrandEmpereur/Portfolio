import Image from 'next/image';
import { ArrowLeft, ArrowRight, Github } from 'lucide-react';
import { ProjectAnchor } from '@/components/ProjectAnchor';
import { TransitionLink } from '@/components/site/TransitionLink';
import type { Project } from '@/lib/data/lastwork.data';
import { localePath, type Locale } from '@/lib/locale-path';
import './projects.css';

interface ProjectDetailContentProps {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
  locale: Locale;
  translations: {
    role: string;
    technologies: string;
    features: string;
    year: string;
    viewGithub: string;
    backToProjects: string;
    nextProjectLabel: string;
    prevProjectLabel: string;
  };
}

export const ProjectDetailContent = ({
  project,
  prevProject,
  nextProject,
  locale,
  translations,
}: ProjectDetailContentProps) => (
  <main id="main-content" className="pd pad-x text-fg">
    <div className="pd-inner">
      <header className="pd-head">
        <div className="pd-badges mono-label text-mut">
          <span className="pd-badge">{project.typeLabel}</span>
          {project.company && <span className="pd-badge">{project.company}</span>}
        </div>
        <h1 className="display pd-title">{project.title}</h1>
        {project.description && <p className="pd-lead text-mut">{project.description}</p>}
      </header>

      {project.image && (
        <div className="pd-media">
          <Image
            src={project.image}
            alt={project.title}
            fill
            preload
            quality={80}
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>
      )}

      {project.longDescription && (
        <section className="pd-section">
          <p className="pd-text text-mut">{project.longDescription}</p>
        </section>
      )}

      {(project.role || project.year) && (
        <section className="pd-section">
          <dl className="pd-facts">
            {project.role && (
              <div>
                <dt className="mono-label text-mut">{translations.role}</dt>
                <dd>{project.role}</dd>
              </div>
            )}
            {project.year && (
              <div>
                <dt className="mono-label text-mut">{translations.year}</dt>
                <dd>{project.year}</dd>
              </div>
            )}
          </dl>
        </section>
      )}

      {project.technologies.length > 0 && (
        <section className="pd-section">
          <h2 className="mono-label text-mut">{translations.technologies}</h2>
          <ul className="pd-tags">
            {project.technologies.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </section>
      )}

      {project.features && project.features.length > 0 && (
        <section className="pd-section">
          <h2 className="mono-label text-mut">{translations.features}</h2>
          <ol className="pd-features">
            {project.features.map((feature, index) => (
              <li key={feature}>
                <span className="mono-label text-mut" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>{feature}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className="pd-section">
        <div className="pd-actions">
          {project.githubUrl && (
            <a className="btn" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github size={16} aria-hidden="true" />
              {translations.viewGithub}
            </a>
          )}
          <TransitionLink className="btn btn-ghost" href={localePath(locale, '/projects')}>
            <ArrowLeft size={16} aria-hidden="true" />
            {translations.backToProjects}
          </TransitionLink>
        </div>
      </section>
    </div>

    {(prevProject || nextProject) && (
      <nav
        className="pd-nav"
        aria-label={`${translations.prevProjectLabel} / ${translations.nextProjectLabel}`}
      >
        {prevProject ? (
          <ProjectAnchor project={prevProject} locale={locale} className="pd-nav-link is-prev">
            <ArrowLeft aria-hidden="true" />
            <div>
              <p className="mono-label text-mut">{translations.prevProjectLabel}</p>
              <p className="pd-nav-title">{prevProject.title}</p>
            </div>
          </ProjectAnchor>
        ) : (
          <div />
        )}
        {nextProject && (
          <ProjectAnchor project={nextProject} locale={locale} className="pd-nav-link is-next">
            <div>
              <p className="mono-label text-mut">{translations.nextProjectLabel}</p>
              <p className="pd-nav-title">{nextProject.title}</p>
            </div>
            <ArrowRight aria-hidden="true" />
          </ProjectAnchor>
        )}
      </nav>
    )}
  </main>
);
