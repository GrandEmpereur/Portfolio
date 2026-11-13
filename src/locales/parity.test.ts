// For each namespace, the three languages must expose exactly the same key paths.
import { expect, test } from 'bun:test';
import fr from '@/locales/fr'; import en from '@/locales/en'; import pl from '@/locales/pl';
const NAMESPACES = ['common', 'homeHero', 'homeProjects', 'homeServices', 'homeEnd', 'contactPage', 'legalPages'] as const;
const paths = (o: unknown, p = ''): string[] => (o && typeof o === 'object' ? Object.entries(o).flatMap(([k, v]) => paths(v, p ? `${p}.${k}` : k)) : [p]);
for (const ns of NAMESPACES) test(`${ns} has the same keys in fr, en and pl`, () => {
  const ref = paths(fr[ns]).sort();
  expect(paths(en[ns]).sort()).toEqual(ref); expect(paths(pl[ns]).sort()).toEqual(ref);
});
