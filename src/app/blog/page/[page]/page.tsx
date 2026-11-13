import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { pageHref } from '@/features/posts/components';
import { getTotalPostPages } from '@/features/posts/queries';
import { buildMetadata } from '@/lib/seo';

import { BlogIndex } from '../../BlogIndex';

type Props = { params: Promise<{ page: string }> };

export const dynamicParams = false;

// Static export needs at least one param, so page 1 is generated too (its canonical is /blog/).
export function generateStaticParams() {
  return Array.from({ length: getTotalPostPages() }, (_, i) => ({ page: String(i + 1) }));
}

function parsePage(value: string): number | null {
  const page = Number(value);
  return Number.isInteger(page) && page >= 1 && page <= getTotalPostPages() ? page : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = parsePage((await params).page) ?? 1;
  return buildMetadata({ title: page > 1 ? `Blog · Page ${page}` : 'Blog', path: pageHref(page) });
}

export default async function BlogPaginatedPage({ params }: Props) {
  const page = parsePage((await params).page);
  if (page === null) notFound();
  return <BlogIndex page={page} />;
}
