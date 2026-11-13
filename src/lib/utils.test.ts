import { describe, expect, it } from 'vitest';

import { absoluteUrl, cn, formatDate, slugify } from './utils';

describe('slugify', () => {
  it('lowercases and hyphenates', () => {
    expect(slugify('Data Structures')).toBe('data-structures');
  });
  it('handles ampersands, accents and punctuation', () => {
    expect(slugify('Organization & Programming')).toBe('organization-and-programming');
    expect(slugify('  Café: notes! ')).toBe('cafe-notes');
  });
});

describe('formatDate', () => {
  it('formats ISO dates in UTC', () => {
    expect(formatDate('2026-11-12T00:00:00.000Z')).toBe('November 12, 2026');
  });
});

describe('cn', () => {
  it('merges conflicting tailwind classes', () => {
    expect(cn('p-2', false && 'hidden', 'p-4')).toBe('p-4');
  });
});

describe('absoluteUrl', () => {
  it('resolves paths against the site url', () => {
    expect(absoluteUrl('/blog/')).toBe('https://winniewjeng.github.io/blog/');
  });
});
