import type { MetadataRoute } from 'next';

import { getAllPosts, getAllTags } from '@/features/posts/queries';
import { absoluteUrl } from '@/lib/utils';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['/', '/blog/', '/tags/', '/about/'].map((path) => ({
    url: absoluteUrl(path),
  }));
  const posts = getAllPosts().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}/`),
    lastModified: post.updated ?? post.date,
  }));
  const tags = getAllTags().map((tag) => ({ url: absoluteUrl(`/tags/${tag.slug}/`) }));
  return [...staticRoutes, ...posts, ...tags];
}
