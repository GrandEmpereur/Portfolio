// Minimal typings for `bun:test` (no @types/bun in the project and no new dependency allowed).
// Covers the matchers the repo's unit tests use; delete this file if @types/bun is ever added.
declare module 'bun:test' {
  interface Matchers {
    toBe(expected: unknown): void;
    toEqual(expected: unknown): void;
    toStrictEqual(expected: unknown): void;
    toBeNull(): void;
    toBeUndefined(): void;
    toBeDefined(): void;
    toBeTruthy(): void;
    toBeFalsy(): void;
    toBeGreaterThan(n: number): void;
    toBeGreaterThanOrEqual(n: number): void;
    toBeLessThan(n: number): void;
    toBeLessThanOrEqual(n: number): void;
    toHaveLength(n: number): void;
    toContain(item: unknown): void;
    toMatch(pattern: RegExp | string): void;
    toThrow(expected?: unknown): void;
    toHaveProperty(key: string, value?: unknown): void;
    readonly not: Matchers;
  }
  export const expect: (actual: unknown) => Matchers;
  export const test: (name: string, fn: () => void | Promise<void>) => void;
  export const it: typeof test;
  export const describe: (name: string, fn: () => void) => void;
  export const beforeEach: (fn: () => void | Promise<void>) => void;
  export const afterEach: (fn: () => void | Promise<void>) => void;
}
