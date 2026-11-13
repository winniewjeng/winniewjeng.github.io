import Link from 'next/link';

import { getAllTags } from '@/features/posts/queries';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'Tags', path: '/tags/' });

export default function TagsPage() {
  const tags = getAllTags();
  return (
    <>
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Tags</h1>
      {tags.length === 0 ? (
        <p className="text-base-content/60">No tags yet.</p>
      ) : (
        <ul className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <li key={tag.slug}>
              <Link href={`/tags/${tag.slug}/`} className="btn gap-2 btn-outline btn-sm">
                #{tag.label}
                <span className="badge badge-sm">{tag.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
