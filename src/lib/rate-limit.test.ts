import { expect, test } from 'bun:test';
import { createRateLimiter } from '@/lib/rate-limit';
test('five per hour per key, then the window slides', () => {
  const allow = createRateLimiter({ limit: 5, windowMs: 3_600_000 });
  for (let i = 0; i < 5; i++) expect(allow('ip', 1000 + i)).toBe(true);
  expect(allow('ip', 2000)).toBe(false); expect(allow('other', 2000)).toBe(true); expect(allow('ip', 1000 + 3_600_001)).toBe(true);
});
