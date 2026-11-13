import Link from 'next/link';

import { slugify } from '@/lib/utils';

export function TagList({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Tags">
      {tags.map((tag) => (
        <li key={tag}>
          <Link
            href={`/tags/${slugify(tag)}/`}
            className="badge badge-soft badge-primary hover:badge-outline"
          >
            #{tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
