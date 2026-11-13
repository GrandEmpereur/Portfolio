import { NotFoundView } from '@/components/NotFoundView';
import fr from '@/locales/fr';

// Rendered outside any locale context: French copy, unprefixed paths (French is the default language).
export default function NotFound() {
  return <NotFoundView locale="fr" copy={fr.notFound} />;
}
