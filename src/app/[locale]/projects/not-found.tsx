import { NotFoundView } from '@/components/NotFoundView';
import { getCurrentLocale, getScopedI18n } from '@/locales/serveur';

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
