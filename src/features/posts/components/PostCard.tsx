import Link from 'next/link';

import type { Post } from '../queries';

import { PostMeta } from './PostMeta';
import { TagList } from './TagList';

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="card bg-base-100 transition-colors card-border hover:border-primary/40">
      <div className="card-body gap-3">
        <PostMeta date={post.date} readingTime={post.metadata.readingTime} />
        <h2 className="card-title text-xl">
          <Link href={`/blog/${post.slug}/`} className="link link-hover">
            {post.title}
            {post.draft && (
              <span className="ml-2 badge align-middle badge-sm badge-warning">draft</span>
            )}
          </Link>
        </h2>
        <p className="text-base-content/80">{post.description}</p>
        <TagList tags={post.tags} />
      </div>
    </article>
  );
}
