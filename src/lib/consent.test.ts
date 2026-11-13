import { expect, test } from 'bun:test';
import { CONSENT_MAX_AGE_MS, parseConsent, serializeConsent } from '@/lib/consent';
const t0 = 1_800_000_000_000;
test('round trip', () => { expect(parseConsent(serializeConsent('denied', t0), t0 + 1000)).toBe('denied'); expect(parseConsent(serializeConsent('granted', t0), t0 + 1000)).toBe('granted'); });
test('expires after six months', () => { expect(parseConsent(serializeConsent('granted', t0), t0 + CONSENT_MAX_AGE_MS + 1)).toBeNull(); });
test('garbage means no choice', () => { expect(parseConsent(null, t0)).toBeNull(); expect(parseConsent('{bad', t0)).toBeNull(); expect(parseConsent('{"choice":"maybe","at":1}', t0)).toBeNull(); });
