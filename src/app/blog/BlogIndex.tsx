import { Pagination, PostList } from '@/features/posts/components';
import { getPostsPage } from '@/features/posts/queries';

/** Shared view for `/blog/` and `/blog/page/N/`. */
export function BlogIndex({ page }: { page: number }) {
  const { items, totalPages, totalItems } = getPostsPage(page);
  return (
    <>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
        <p className="mt-2 text-base-content/60">
          {totalItems} {totalItems === 1 ? 'post' : 'posts'}
          {totalPages > 1 && ` · page ${page} of ${totalPages}`}
        </p>
      </header>
      <PostList posts={items} />
      <Pagination page={page} totalPages={totalPages} />
    </>
  );
}
