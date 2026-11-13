'use client';

import { NotFoundView } from '@/components/NotFoundView';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';

/**
 * 404 shown inside a language segment.
 * A not-found file receives no params, so the server cannot know the language while a page is
 * prerendered (`getCurrentLocale` throws there). The client hooks read it from the URL instead.
 */
export const LocalizedNotFound = () => {
  const locale = useCurrentLocale();
  const t = useScopedI18n('notFound');

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
};
