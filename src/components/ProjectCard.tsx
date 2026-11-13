import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { ProjectAnchor } from '@/components/ProjectAnchor';
import { hasDetailPage, type Project } from '@/lib/data/lastwork.data';
import type { Locale } from '@/lib/locale-path';
import './projects.css';

interface ProjectCardProps {
  project: Project;
  locale: Locale;
  /** Above-the-fold cards load their image eagerly. */
  priority?: boolean;
}

export const ProjectCard = ({ project, locale, priority = false }: ProjectCardProps) => {
  const interactive = Boolean(project.link) || hasDetailPage(project);

  return (
    <li className="pj-item">
      <ProjectAnchor project={project} locale={locale} className={interactive ? 'pj-card pj-card-link' : 'pj-card'}>
        <div className="pj-media">
          {project.image && (
            <Image
              src={project.image}
              alt=""
              fill
              preload={priority}
              className="pj-img object-cover"
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          )}
        </div>
        <div className="pj-body">
          <p className="mono-label text-mut pj-meta">
            <span>{project.typeLabel}</span>
            {project.company && <span>{project.company}</span>}
          </p>
          <h2 className="display pj-name">
            {project.title}
            {interactive && <ArrowUpRight className="pj-arrow" aria-hidden="true" />}
          </h2>
          {project.description && <p className="pj-desc text-mut">{project.description}</p>}
          {project.technologies.length > 0 && (
            <ul className="mono-label text-mut pj-tags">
              {project.technologies.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          )}
        </div>
      </ProjectAnchor>
    </li>
  );
};
