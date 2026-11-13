/**
 * In-memory sliding-window limiter. Returns `true` when the call is allowed.
 * State lives in the server instance: good enough as a brake on a contact form.
 */
export const createRateLimiter = ({ limit, windowMs }: { limit: number; windowMs: number }) => {
  const hits = new Map<string, number[]>();

  return (key: string, now: number = Date.now()): boolean => {
    const recent = (hits.get(key) ?? []).filter((t) => t > now - windowMs);

    if (recent.length >= limit) {
      hits.set(key, recent);
      return false;
    }
    recent.push(now);
    hits.set(key, recent);

    // Opportunistic cleanup so the map cannot grow forever.
    if (hits.size > 5000) {
      for (const [k, list] of hits) {
        if (list.every((t) => t <= now - windowMs)) hits.delete(k);
      }
    }
    return true;
  };
};

type Limiter = ReturnType<typeof createRateLimiter>;
const globalForLimiter = globalThis as typeof globalThis & { __contactLimiter?: Limiter };

/** One limiter shared by the three contact routes: five sends per hour per IP. */
export const contactRateLimit: Limiter = (globalForLimiter.__contactLimiter ??= createRateLimiter({
  limit: 5,
  windowMs: 60 * 60 * 1000,
}));

/**
 * Client IP for rate limiting. Only headers the platform sets itself are trusted:
 * `x-vercel-forwarded-for`, then `x-real-ip`. The client can forge `x-forwarded-for`
 * freely, so it is read only as a last resort (local dev) and then by its LAST value,
 * the one appended by the nearest proxy.
 */
export const getClientIp = (headers: Headers): string => {
  const first = (value: string | null): string | undefined => value?.split(',')[0]?.trim() || undefined;
  const last = (value: string | null): string | undefined => value?.split(',').at(-1)?.trim() || undefined;
  const ip =
    first(headers.get('x-vercel-forwarded-for')) ??
    first(headers.get('x-real-ip')) ??
    last(headers.get('x-forwarded-for')) ??
    'unknown';
  return ip.slice(0, 64);
};

/**
 * Gate for confirmation emails sent to a visitor-supplied (unverified) address:
 * at most `perRecipient` per address and `global` overall, per window.
 * Returns true when a confirmation may be sent. Pure apart from its own state.
 */
export const createConfirmationGate = ({
  perRecipient,
  global,
  windowMs,
}: {
  perRecipient: number;
  global: number;
  windowMs: number;
}) => {
  const byRecipient = createRateLimiter({ limit: perRecipient, windowMs });
  const overall = createRateLimiter({ limit: global, windowMs });
  return (email: string, now: number = Date.now()): boolean =>
    byRecipient(email.trim().toLowerCase(), now) && overall('*', now);
};

const globalForGate = globalThis as typeof globalThis & { __confirmationGate?: ReturnType<typeof createConfirmationGate> };

/** Shared by the contact routes: 2 confirmations per address and 30 overall, per hour. */
export const confirmationGate = (globalForGate.__confirmationGate ??= createConfirmationGate({
  perRecipient: 2,
  global: 30,
  windowMs: 60 * 60 * 1000,
}));
