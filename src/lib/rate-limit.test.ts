import { expect, test } from 'bun:test';
import { createRateLimiter } from '@/lib/rate-limit';
test('five per hour per key, then the window slides', () => {
  const allow = createRateLimiter({ limit: 5, windowMs: 3_600_000 });
  for (let i = 0; i < 5; i++) expect(allow('ip', 1000 + i)).toBe(true);
  expect(allow('ip', 2000)).toBe(false); expect(allow('other', 2000)).toBe(true); expect(allow('ip', 1000 + 3_600_001)).toBe(true);
});

import { createConfirmationGate, getClientIp } from '@/lib/rate-limit';
import { safeDisplayName } from '@/lib/contact-request';

test('a forged x-forwarded-for never changes the key when a platform header is present', () => {
  const a = new Headers({ 'x-vercel-forwarded-for': '203.0.113.7', 'x-forwarded-for': '1.1.1.1' });
  const b = new Headers({ 'x-vercel-forwarded-for': '203.0.113.7', 'x-forwarded-for': '2.2.2.2' });
  expect(getClientIp(a)).toBe('203.0.113.7');
  expect(getClientIp(b)).toBe('203.0.113.7');
  expect(getClientIp(new Headers({ 'x-real-ip': '198.51.100.4', 'x-forwarded-for': '9.9.9.9' }))).toBe('198.51.100.4');
  expect(getClientIp(new Headers({ 'x-forwarded-for': 'spoofed, 10.0.0.1' }))).toBe('10.0.0.1');
  expect(getClientIp(new Headers())).toBe('unknown');
});

test('confirmation gate: two per address per hour, case-insensitive, plus a global cap', () => {
  const gate = createConfirmationGate({ perRecipient: 2, global: 3, windowMs: 3_600_000 });
  expect(gate('Victim@Example.test', 1000)).toBe(true);
  expect(gate(' victim@example.test ', 1001)).toBe(true);
  expect(gate('victim@example.test', 1002)).toBe(false);
  expect(gate('other@example.test', 1003)).toBe(true);
  expect(gate('third@example.test', 1004)).toBe(false);
  expect(gate('victim@example.test', 1000 + 3_600_001)).toBe(true);
});

test('display name filter keeps real names and drops anything else', () => {
  for (const ok of ['Jean-Noël', "O'Brien", 'Łukasz']) expect(safeDisplayName(ok)).toBe(ok);
  for (const bad of ['Click http://evil.test', '<b>Bob</b>', 'a'.repeat(41), '', 'x@y.z', '1234'])
    expect(safeDisplayName(bad)).toBeUndefined();
});
