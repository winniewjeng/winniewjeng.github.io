/**
 * The content gateway: the only place that reads Velite output for posts.
 * Pages and components import from here, never from `#velite`, so the
 * content source can change without touching the UI.
 */
import { posts as allPosts, type Post } from '#velite';

import { siteConfig } from '@/config/site';

import {
  collectTags,
  filterPublished,
  getAdjacent,
  hasTag,
  paginate,
  sortByDateDesc,
  type Page,
  type Tag,
} from './core';

export type { Post, Page, Tag };

const includeDrafts = process.env.NODE_ENV !== 'production';

const published: Post[] = sortByDateDesc(filterPublished(allPosts, includeDrafts));

export function getAllPosts(): Post[] {
  return published;
}

export function getRecentPosts(limit: number = siteConfig.recentPostsOnHome): Post[] {
  return published.slice(0, limit);
}

export function getPostBySlug(slug: string): Post | undefined {
  return published.find((post) => post.slug === slug);
}

export function getAdjacentPosts(slug: string) {
  return getAdjacent(published, slug);
}

export function getPostsPage(page: number): Page<Post> {
  return paginate(published, page, siteConfig.postsPerPage);
}

export function getTotalPostPages(): number {
  return paginate(published, 1, siteConfig.postsPerPage).totalPages;
}

export function getAllTags(): Tag[] {
  return collectTags(published);
}

export function getTagBySlug(slug: string): Tag | undefined {
  return getAllTags().find((tag) => tag.slug === slug);
}

export function getPostsByTag(tagSlug: string): Post[] {
  return published.filter((post) => hasTag(post, tagSlug));
}
