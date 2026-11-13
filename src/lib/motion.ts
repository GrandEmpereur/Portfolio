// No window access at module load: every helper checks at call time (safe during SSR).
export const EASE = { out: 'pb', inOut: 'pbInOut' } as const;

const mm = (query: string): boolean => typeof window !== 'undefined' && window.matchMedia(query).matches;

export const prefersReducedMotion = (): boolean => mm('(prefers-reduced-motion: reduce)');
export const isFinePointer = (): boolean => mm('(hover: hover) and (pointer: fine)');
export const isDesktop = (): boolean => mm('(min-width: 900px)');
export const canPin = (): boolean => isDesktop() && !prefersReducedMotion();

/** Calls cb exactly once, when fonts are ready or after timeoutMs, whichever comes first. */
export const whenFontsReady = (cb: () => void, timeoutMs = 1000): void => {
  let done = false;
  const run = () => {
    if (done) return;
    done = true;
    cb();
  };
  setTimeout(run, timeoutMs);
  if (typeof document !== 'undefined' && document.fonts?.ready) void document.fonts.ready.then(run, run);
  else run();
};

export const releaseEnter = (): void => {
  if (typeof document !== 'undefined') document.documentElement.classList.remove('enter');
};

/** Shared by HomeHeroMotion (writer) and SiteHeader (reader). */
export const scrollState = { heroProgress: 0, heroPinned: false, heroStart: 0, heroEnd: 0 };
