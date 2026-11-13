/** Content gateway for standalone MDX pages (e.g. About). */
import { pages, type Page as ContentPage } from '#velite';

export type { ContentPage };

export function getPageBySlug(slug: string): ContentPage | undefined {
  return pages.find((page) => page.slug === slug);
}
