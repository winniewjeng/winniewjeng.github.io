import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { MDXContent } from '@/components/mdx/MDXContent';
import { PostMeta, PostNavigation, TableOfContents, TagList } from '@/features/posts/components';
import { getAdjacentPosts, getAllPosts, getPostBySlug } from '@/features/posts/queries';
import { buildMetadata } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug((await params).slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}/`,
    image: post.cover?.src,
    type: 'article',
    publishedTime: post.date,
    modifiedTime: post.updated,
    tags: post.tags,
  });
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const { newer, older } = getAdjacentPosts(slug);

  return (
    <article>
      <header className="mb-8 space-y-4">
        <PostMeta date={post.date} updated={post.updated} readingTime={post.metadata.readingTime} />
        <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
        <p className="text-lg text-base-content/80">{post.description}</p>
        <TagList tags={post.tags} />
      </header>
      {post.cover && (
        // eslint-disable-next-line @next/next/no-img-element -- static export serves images as-is
        <img
          src={post.cover.src}
          width={post.cover.width}
          height={post.cover.height}
          alt=""
          className="mb-8 w-full rounded-box"
        />
      )}
      <TableOfContents toc={post.toc} />
      <MDXContent code={post.body} />
      <PostNavigation newer={newer} older={older} />
    </article>
  );
}
