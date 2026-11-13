import { expect, test } from 'bun:test';
import { getPublishedProjects } from '@/lib/data/lastwork.data';
import { getServiceDetail, serviceDetails } from '@/lib/data/service-details.data';
import { services } from '@/lib/data/services.data';
import { LOCALES } from '@/lib/locale-path';

// Currency marks and long dashes: none may appear in the copy, in any language.
// The match is literal, so "zł" also rejects Polish words that contain it ("człowiek", "złożony"): write "osoba", "skomplikowany".
const FORBIDDEN = ['€', '$', 'zł', 'PLN', 'EUR', '—', '–'] as const;

/** Every string found in a value, however deeply nested. */
const collectStrings = (value: unknown): string[] => {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) {
    const items: unknown[] = value;
    return items.flatMap(collectStrings);
  }
  if (value !== null && typeof value === 'object') return Object.values(value).flatMap(collectStrings);
  return [];
};

test('every service has exactly one detail, and no detail has an unknown id', () => {
  const serviceIds = services.map((s) => s.id).sort();
  const detailIds = serviceDetails.map((d) => d.id).sort();
  expect(detailIds).toEqual(serviceIds);
  for (const s of services) expect(getServiceDetail(s.id)?.id).toBe(s.id);
});

test('each service preselects its own need on the contact form', () => {
  expect(Object.fromEntries(serviceDetails.map((d) => [d.id, d.need]))).toEqual({
    'llm-integration': 'llm',
    'ai-agents': 'agent',
    'rag-knowledge': 'rag',
    'saas-development': 'saas',
    'web-development': 'site',
    'web-redesign': 'refonte',
  });
});

test('every detail is complete in the three languages', () => {
  for (const d of serviceDetails) {
    for (const l of LOCALES) {
      expect(d.intro[l].trim().length).toBeGreaterThan(0);
      expect(d.useCases[l].length).toBeGreaterThanOrEqual(3);
      expect(d.useCases[l].length).toBeLessThanOrEqual(4);
      expect(d.deliverables[l].length).toBeGreaterThanOrEqual(4);
      expect(d.deliverables[l].length).toBeLessThanOrEqual(5);
      expect(d.steps[l].length).toBeGreaterThanOrEqual(3);
      expect(d.steps[l].length).toBeLessThanOrEqual(4);
      expect(d.faq[l].length).toBeGreaterThanOrEqual(2);
      expect(d.faq[l].length).toBeLessThanOrEqual(3);
    }
  }
});

test('steps and questions come in the same number in fr, en and pl', () => {
  for (const d of serviceDetails) {
    for (const l of LOCALES) {
      expect(d.steps[l]).toHaveLength(d.steps.fr.length);
      expect(d.faq[l]).toHaveLength(d.faq.fr.length);
    }
  }
});

test('no text is left empty and a step title is one to three words', () => {
  for (const text of collectStrings(serviceDetails)) expect(text.trim().length).toBeGreaterThan(0);
  for (const d of serviceDetails) {
    for (const l of LOCALES) {
      for (const step of d.steps[l]) {
        expect(step.title.trim().split(/\s+/).length).toBeLessThanOrEqual(3);
      }
    }
  }
});

test('no currency and no long dash in any text', () => {
  const offenders = collectStrings(serviceDetails).filter((text) =>
    FORBIDDEN.some((mark) => text.includes(mark)),
  );
  expect(offenders).toEqual([]);
});

test('no employer name next to the anonymized project', () => {
  expect(JSON.stringify(serviceDetails)).not.toMatch(/euroclear|w3lead/i);
});

test('every project slug points to a published project', () => {
  const published = getPublishedProjects().map((p) => p.slug);
  for (const d of serviceDetails) {
    if (d.projectSlug !== undefined) expect(published).toContain(d.projectSlug);
  }
});
