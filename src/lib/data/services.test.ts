import { expect, test } from 'bun:test';
import { services, splitTestimonial } from '@/lib/data/services.data';
import { projectTestimonials } from '@/lib/data/testimonials.data';

test('six services, three per trade, in order', () => {
  expect(services.map((s) => `${s.code}:${s.id}`)).toEqual([
    'IA·01:llm-integration',
    'IA·02:ai-agents',
    'IA·03:rag-knowledge',
    'FS·01:saas-development',
    'FS·02:web-development',
    'FS·03:web-redesign',
  ]);
});

test('no price anywhere', () => {
  expect(JSON.stringify(services)).not.toMatch(/€|pricing|price|prix|tarif/i);
});

test('every service is written in the three languages', () => {
  for (const s of services) {
    for (const l of ['fr', 'en', 'pl'] as const) {
      expect(s.title[l].length).toBeGreaterThan(0);
      expect(s.description[l].length).toBeGreaterThan(0);
    }
  }
});

test('no em dash in any text', () => {
  expect(JSON.stringify(services)).not.toMatch(/—/);
});

test('a testimonial splits into its closing sentence and the rest, in every language', () => {
  for (const t of projectTestimonials) {
    for (const l of ['fr', 'en', 'pl'] as const) {
      const { pull, rest } = splitTestimonial(t.quote[l]);
      expect(pull.length).toBeGreaterThan(0);
      expect(rest.length).toBeGreaterThan(0);
      expect(`${rest} ${pull}`).toBe(t.quote[l].trim());
      expect(pull).not.toMatch(/\. /);
    }
  }
  expect(splitTestimonial('One. Two.')).toEqual({ pull: 'Two.', rest: 'One.' });
  expect(splitTestimonial('Only one.')).toEqual({ pull: 'Only one.', rest: '' });
});
