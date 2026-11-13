import type { Metadata } from 'next';
import { NotFoundView } from '@/components/NotFoundView';
import { seoConfig } from '@/lib/seo-config';
import fr from '@/locales/fr';

// Next.js already adds <meta name="robots" content="noindex"> to a 404; only the title was missing.
export const metadata: Metadata = {
  title: `${fr.notFound.title} | ${seoConfig.siteName}`,
};

// Rendered outside any locale context: French copy, unprefixed paths (French is the default language).
export default function NotFound() {
  return <NotFoundView locale="fr" copy={fr.notFound} />;
}
