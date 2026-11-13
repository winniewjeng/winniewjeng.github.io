import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PostList } from '@/features/posts/components';
import { getAllTags, getPostsByTag, getTagBySlug } from '@/features/posts/queries';
import { buildMetadata } from '@/lib/seo';

type Props = { params: Promise<{ tag: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: tag.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = getTagBySlug((await params).tag);
  if (!tag) return {};
  return buildMetadata({
    title: `#${tag.label}`,
    description: `Posts tagged ${tag.label}.`,
    path: `/tags/${tag.slug}/`,
  });
}

export default async function TagPage({ params }: Props) {
  const tag = getTagBySlug((await params).tag);
  if (!tag) notFound();
  return (
    <>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">#{tag.label}</h1>
        <p className="mt-2 text-base-content/60">
          {tag.count} {tag.count === 1 ? 'post' : 'posts'}
        </p>
      </header>
      <PostList posts={getPostsByTag(tag.slug)} />
    </>
  );
}
