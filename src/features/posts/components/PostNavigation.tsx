import Link from 'next/link';

import type { Post } from '../queries';

export function PostNavigation({ newer, older }: { newer?: Post; older?: Post }) {
  if (!newer && !older) return null;
  return (
    <nav className="mt-12 grid gap-4 sm:grid-cols-2" aria-label="More posts">
      {older ? (
        <Link
          href={`/blog/${older.slug}/`}
          className="card p-4 card-border hover:border-primary/40"
        >
          <span className="text-xs text-base-content/60">← Older</span>
          <span className="font-medium">{older.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {newer && (
        <Link
          href={`/blog/${newer.slug}/`}
          className="card p-4 text-right card-border hover:border-primary/40"
        >
          <span className="text-xs text-base-content/60">Newer →</span>
          <span className="font-medium">{newer.title}</span>
        </Link>
      )}
    </nav>
  );
}
