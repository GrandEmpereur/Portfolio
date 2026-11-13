import { expect, test } from 'bun:test';
import {
  getAgencyProjects,
  getFeaturedProjects,
  getPublishedProjects,
  hasDetailPage,
  lastwork,
} from '@/lib/data/lastwork.data';

test('the published filter never lets an unpublished project through', () => {
  for (const list of [getPublishedProjects(), getFeaturedProjects(), getAgencyProjects()]) {
    expect(list.some((p) => p.published === false)).toBe(false);
  }
});

test('featured order', () => {
  expect(getFeaturedProjects().map((p) => p.slug)).toEqual(['traceguard', 'ariane', 'nutricert', 'bookish']);
});

test('seven agency projects', () => {
  expect(getAgencyProjects()).toHaveLength(7);
});

test('ariane is published, has no link and no detail page', () => {
  const ariane = lastwork.find((p) => p.slug === 'ariane');
  expect(ariane?.published).not.toBe(false);
  expect(ariane?.link).toBeUndefined();
  expect(ariane ? hasDetailPage(ariane) : true).toBe(false);
  expect(getPublishedProjects().some((p) => p.slug === 'ariane')).toBe(true);
});

test('ariane carries no employer name in any text field', () => {
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
