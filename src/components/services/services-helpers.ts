import { getPublishedProjects, hasDetailPage } from '@/lib/data/lastwork.data';
import type { ServiceNeed } from '@/lib/data/service-details.data';
import { localePath, type Locale } from '@/lib/locale-path';

/** Answer of the contact form preselected when a service has no detail entry yet. */
const NEED_BY_SERVICE: Record<string, ServiceNeed> = {
  'llm-integration': 'llm',
  'ai-agents': 'agent',
  'rag-knowledge': 'rag',
  'saas-development': 'saas',
  'web-development': 'site',
  'web-redesign': 'refonte',
};

export const needFor = (serviceId: string): ServiceNeed => NEED_BY_SERVICE[serviceId] ?? 'avis';

export interface RelatedProject {
  title: string;
  href: string;
  external: boolean;
}

/** Detail page, else the project's external link, else the projects list. Null when the slug is not a published project. */
export const resolveProject = (slug: string | undefined, locale: Locale): RelatedProject | null => {
  if (!slug) return null;
  const project = getPublishedProjects().find((item) => item.slug === slug);
  if (!project) return null;
  if (hasDetailPage(project)) return { title: project.title, href: localePath(locale, `/projects/${slug}`), external: false };
  if (project.link) return { title: project.title, href: project.link, external: true };
  return { title: project.title, href: localePath(locale, '/projects'), external: false };
};
