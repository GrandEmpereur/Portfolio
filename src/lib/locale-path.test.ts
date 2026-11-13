import { expect, test } from 'bun:test';
import { localePath } from '@/lib/locale-path';
test('french has no prefix', () => { expect(localePath('fr', '/contact')).toBe('/contact'); expect(localePath('fr', '/')).toBe('/'); });
test('other locales are prefixed', () => { expect(localePath('en', '/contact')).toBe('/en/contact'); expect(localePath('pl', '/')).toBe('/pl'); });
test('hash and query are kept', () => { expect(localePath('en', '/#projets')).toBe('/en#projets'); expect(localePath('pl', '/projects?x=1')).toBe('/pl/projects?x=1'); });
test('external and special links are untouched', () => { expect(localePath('en', 'https://www.nutricert.fr/')).toBe('https://www.nutricert.fr/'); expect(localePath('en', 'mailto:a@b.fr')).toBe('mailto:a@b.fr'); expect(localePath('en', '#faq')).toBe('#faq'); });
