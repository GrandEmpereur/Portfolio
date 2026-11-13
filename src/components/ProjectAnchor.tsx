import type { ReactNode } from 'react';
import { TransitionLink } from '@/components/site/TransitionLink';
import { hasDetailPage, type Project } from '@/lib/data/lastwork.data';
import { localePath, type Locale } from '@/lib/locale-path';

interface ProjectAnchorProps {
  project: Project;
  locale: Locale;
  className?: string;
  children: ReactNode;
}

/**
 * Where a project leads: its external site (new tab), its detail page (page transition),
 * or nowhere. A project with neither a link nor a detail page is a plain block, never a link to a 404.
 */
export const ProjectAnchor = ({ project, locale, className, children }: ProjectAnchorProps) => {
  if (project.link) {
    return (
      <a className={className} href={project.link} target="_blank" rel="noopener noreferrer" data-cursor="open">
        {children}
      </a>
    );
  }
  if (hasDetailPage(project)) {
    return (
      <TransitionLink className={className} href={localePath(locale, `/projects/${project.slug}`)} data-cursor="view">
        {children}
      </TransitionLink>
    );
  }
  return <div className={className}>{children}</div>;
};
