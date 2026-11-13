import { expect, test } from 'bun:test';
import { categorizeLead, contactRequestSchema, scoreLead } from '@/lib/contact-request';
const base = { needs: ['site'], stage: 'idee', timing: 'plus-tard', budget: 'inconnu', message: 'Un site pour mon atelier, avant le printemps.', firstName: 'Camille', email: 'camille@exemple.test', channel: 'email', locale: 'fr' };
test('required fields are enough', () => { expect(contactRequestSchema.safeParse(base).success).toBe(true); });
test('rejects empty needs, short or blank message, bad email, unknown enum', () => {
  for (const bad of [{ needs: [] }, { message: 'trop court' }, { message: ' '.repeat(40) }, { email: 'camille@' }, { stage: 'autre' }, { firstName: 'C' }])
    expect(contactRequestSchema.safeParse({ ...base, ...bad }).success).toBe(false);
});
test('rejects a filled honeypot and a non http link', () => { expect(contactRequestSchema.safeParse({ ...base, website: 'x' }).success).toBe(false); expect(contactRequestSchema.safeParse({ ...base, link: 'javascript:alert(1)' }).success).toBe(false); });
test('score: floor, ceiling and thresholds', () => {
  const parse = (o: object) => contactRequestSchema.parse({ ...base, ...o });
  expect(scoreLead(parse({}))).toBe(0);
  expect(scoreLead(parse({ needs: ['agent', 'site'], stage: 'specs', timing: 'asap', budget: 'valide', phone: '+33 6 12 34 56 78', company: 'Atelier Test' }))).toBe(100);
  expect(scoreLead(parse({ needs: ['rag'], stage: 'renfort', timing: 'trimestre', budget: 'enveloppe' }))).toBe(55);
  expect(categorizeLead(70)).toBe('hot'); expect(categorizeLead(69)).toBe('warm'); expect(categorizeLead(40)).toBe('warm'); expect(categorizeLead(39)).toBe('cold');
});
