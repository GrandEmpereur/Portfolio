import { expect, test } from 'bun:test';
import { firstInvalidStep, validateStep } from '@/components/contact/steps';
test('each step names what is missing', () => {
  expect(validateStep('need', { needs: [] })).toBe('need.required');
  expect(validateStep('context', {})).toBe('context.stage'); expect(validateStep('context', { stage: 'specs' })).toBe('context.timing');
  expect(validateStep('budget', {})).toBe('budget.required');
  expect(validateStep('brief', { message: 'court' })).toBe('brief.short'); expect(validateStep('brief', { message: ' '.repeat(30) })).toBe('brief.short');
  expect(validateStep('who', { firstName: 'Camille', email: 'camille@' })).toBe('who.email'); expect(validateStep('who', { email: 'camille@exemple.test' })).toBe('who.firstName');
});
test('a complete request has no invalid step', () => { expect(firstInvalidStep({ needs: ['saas'], stage: 'specs', timing: 'mois', budget: 'enveloppe', message: 'Un assistant pour nos procédures internes.', firstName: 'Camille', email: 'camille@exemple.test' })).toBeNull(); });
test('submit goes back to the first broken step', () => { expect(firstInvalidStep({ needs: ['saas'], stage: 'specs', timing: 'mois' })).toEqual({ step: 'budget', error: 'budget.required' }); });
