/**
 * Pure, framework-free post logic. Kept separate from `queries.ts` so it can
 * be unit-tested without generated content.
 */
import { slugify } from '@/lib/utils';

export interface PostLike {
  slug: string;
  date: string;
  draft: boolean;
  tags: string[];
}

export interface Tag {
  label: string;
  slug: string;
  count: number;
}

export interface Page<T> {
  items: T[];
  page: number;
  totalPages: number;
  totalItems: number;
}

/** Newest first; ties broken by slug for deterministic output. */
export function sortByDateDesc<T extends PostLike>(posts: readonly T[]): T[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

/** Drafts are visible in development and hidden in production builds. */
export function filterPublished<T extends PostLike>(
  posts: readonly T[],
  includeDrafts: boolean,
): T[] {
  return includeDrafts ? [...posts] : posts.filter((post) => !post.draft);
}

export function paginate<T>(items: readonly T[], page: number, perPage: number): Page<T> {
  if (!Number.isInteger(perPage) || perPage < 1) throw new RangeError('perPage must be >= 1');
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const current = Math.min(Math.max(1, Math.trunc(page)), totalPages);
  const start = (current - 1) * perPage;
  return {
    items: items.slice(start, start + perPage),
    page: current,
    totalPages,
    totalItems: items.length,
  };
}

/** Unique tags (case-insensitive by slug) with post counts, most used first. */
export function collectTags(posts: readonly PostLike[]): Tag[] {
  const tags = new Map<string, Tag>();
  for (const post of posts) {
    for (const label of post.tags) {
      const slug = slugify(label);
      const existing = tags.get(slug);
      if (existing) existing.count += 1;
      else tags.set(slug, { label, slug, count: 1 });
    }
  }
  return [...tags.values()].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

export function hasTag(post: PostLike, tagSlug: string): boolean {
  return post.tags.some((label) => slugify(label) === tagSlug);
}

/** Neighbours in a newest-first list: `newer` is the previous item, `older` the next. */
export function getAdjacent<T extends PostLike>(
  sortedPosts: readonly T[],
  slug: string,
): { newer?: T; older?: T } {
  const index = sortedPosts.findIndex((post) => post.slug === slug);
  if (index === -1) return {};
  return { newer: sortedPosts[index - 1], older: sortedPosts[index + 1] };
}
