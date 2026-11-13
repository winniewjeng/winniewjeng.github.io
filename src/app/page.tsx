import Link from 'next/link';

import { siteConfig } from '@/config/site';
import { PostList } from '@/features/posts/components';
import { getAllPosts, getRecentPosts } from '@/features/posts/queries';

export default function HomePage() {
  const recent = getRecentPosts();
  const hasMore = getAllPosts().length > recent.length;

  return (
    <>
      <section className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">
          Hi, I&apos;m {siteConfig.author.name}.
        </h1>
        <p className="mt-4 text-lg text-base-content/80">{siteConfig.description}</p>
      </section>

      <section aria-labelledby="recent-posts">
        <h2 id="recent-posts" className="mb-6 text-2xl font-semibold">
          Recent posts
        </h2>
        <PostList posts={recent} />
        {hasMore && (
          <Link href="/blog/" className="btn mt-6 btn-ghost">
            All posts →
          </Link>
        )}
      </section>
    </>
  );
}
