import { describe, expect, it } from 'vitest';

import {
  collectTags,
  filterPublished,
  getAdjacent,
  hasTag,
  paginate,
  sortByDateDesc,
} from './core';

const post = (slug: string, date: string, tags: string[] = [], draft = false) => ({
  slug,
  date,
  tags,
  draft,
});

const posts = [
  post('a', '2026-01-01T00:00:00.000Z', ['Next.js']),
  post('b', '2026-03-01T00:00:00.000Z', ['next.js', 'TypeScript']),
  post('c', '2026-02-01T00:00:00.000Z', [], true),
];

describe('sortByDateDesc', () => {
  it('orders newest first without mutating input', () => {
    expect(sortByDateDesc(posts).map((p) => p.slug)).toEqual(['b', 'c', 'a']);
    expect(posts.map((p) => p.slug)).toEqual(['a', 'b', 'c']);
  });
});

describe('filterPublished', () => {
  it('hides drafts unless requested', () => {
    expect(filterPublished(posts, false).map((p) => p.slug)).toEqual(['a', 'b']);
    expect(filterPublished(posts, true)).toHaveLength(3);
  });
});

describe('paginate', () => {
  const items = Array.from({ length: 7 }, (_, i) => i);
  it('slices pages', () => {
    expect(paginate(items, 2, 3)).toEqual({
      items: [3, 4, 5],
      page: 2,
      totalPages: 3,
      totalItems: 7,
    });
  });
  it('clamps out-of-range pages', () => {
    expect(paginate(items, 99, 3).page).toBe(3);
    expect(paginate(items, 0, 3).page).toBe(1);
  });
  it('always has at least one page', () => {
    expect(paginate([], 1, 3)).toEqual({ items: [], page: 1, totalPages: 1, totalItems: 0 });
  });
  it('rejects invalid page sizes', () => {
    expect(() => paginate(items, 1, 0)).toThrow(RangeError);
  });
});

describe('collectTags / hasTag', () => {
  it('merges tags case-insensitively and counts them', () => {
    expect(collectTags(posts)).toEqual([
      { label: 'Next.js', slug: 'next-js', count: 2 },
      { label: 'TypeScript', slug: 'typescript', count: 1 },
    ]);
  });
  it('matches by tag slug', () => {
    expect(hasTag(posts[1]!, 'typescript')).toBe(true);
    expect(hasTag(posts[0]!, 'typescript')).toBe(false);
  });
});

describe('getAdjacent', () => {
  const sorted = sortByDateDesc(posts);
  it('returns newer and older neighbours', () => {
    expect(getAdjacent(sorted, 'c')).toEqual({ newer: sorted[0], older: sorted[2] });
    expect(getAdjacent(sorted, 'b').newer).toBeUndefined();
    expect(getAdjacent(sorted, 'missing')).toEqual({});
  });
});
