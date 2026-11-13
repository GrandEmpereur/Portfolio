import { expect, test } from 'bun:test';
import {
  getAgencyProjects,
  getFeaturedProjects,
  getPublishedProjects,
  hasDetailPage,
  lastwork,
} from '@/lib/data/lastwork.data';

test('ariane exists but is never published', () => {
  expect(lastwork.some((p) => p.slug === 'ariane')).toBe(true);
  expect(getPublishedProjects().some((p) => p.slug === 'ariane')).toBe(false);
  expect(getFeaturedProjects().some((p) => p.slug === 'ariane')).toBe(false);
});

test('featured order', () => {
  expect(getFeaturedProjects().map((p) => p.slug)).toEqual(['traceguard', 'nutricert', 'bookish']);
});

test('seven agency projects', () => {
  expect(getAgencyProjects()).toHaveLength(7);
});

test('ariane carries no employer name anywhere in its data', () => {
  const ariane = lastwork.find((p) => p.slug === 'ariane');
  expect(ariane?.company).toBeUndefined();
  expect(JSON.stringify(ariane)).not.toMatch(/euroclear|w3lead/i);
});

test('the dead le-1.store link is gone and the project has no detail page', () => {
  expect(lastwork.some((p) => p.link?.includes('le-1.store'))).toBe(false);
  const le1 = lastwork.find((p) => p.slug === 'le-1-store');
  expect(le1?.link).toBeUndefined();
  expect(le1 ? hasDetailPage(le1) : true).toBe(false);
});

test('only published, link-free projects with a long description have a detail page', () => {
  const withDetail = getPublishedProjects().filter(hasDetailPage).map((p) => p.slug);
  expect(withDetail).toEqual(['traceguard', 'bookish']);
});

test('nutricert is the personal SaaS and points to nutricert.fr', () => {
  const nutricert = lastwork.find((p) => p.slug === 'nutricert');
  expect(nutricert?.link).toBe('https://www.nutricert.fr/');
  expect(nutricert?.type).toBe('personal');
  expect(nutricert?.category).toBe('saas');
});

test('traceguard is a personal demo without a public link', () => {
  const traceguard = lastwork.find((p) => p.slug === 'traceguard');
  expect(traceguard?.type).toBe('personal');
  expect(traceguard?.link).toBeUndefined();
});
