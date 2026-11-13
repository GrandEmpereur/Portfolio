import type { Metadata } from 'next';
import { NotFoundView } from '@/components/NotFoundView';
import { getCurrentLocale, getScopedI18n } from '@/locales/serveur';

// The layout title template appends the site name ("Page introuvable | Patrick Bartosik").
export async function generateMetadata(): Promise<Metadata> {
  const t = await getScopedI18n('notFound');
  return { title: t('title') };
}

export default async function NotFound() {
  const [locale, t] = await Promise.all([getCurrentLocale(), getScopedI18n('notFound')]);

  return (
    <NotFoundView
      locale={locale}
      copy={{
        title: t('title'),
        heading: t('heading'),
        description: t('description'),
        homeButton: t('homeButton'),
        projectsButton: t('projectsButton'),
        contactButton: t('contactButton'),
      }}
    />
  );
}
