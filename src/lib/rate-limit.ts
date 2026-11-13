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

/** Client IP as seen behind the proxy (first hop of x-forwarded-for), bounded in length. */
export const getClientIp = (headers: Headers): string => {
  const forwarded = headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return (forwarded || headers.get('x-real-ip') || 'unknown').slice(0, 64);
};
