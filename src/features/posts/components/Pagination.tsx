import Link from 'next/link';

import { cn } from '@/lib/utils';

/** Page 1 lives at `/blog/`; later pages at `/blog/page/N/`. */
export function pageHref(page: number): string {
  return page <= 1 ? '/blog/' : `/blog/page/${page}/`;
}

export function Pagination({ page, totalPages }: { page: number; totalPages: number }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="mt-10 flex justify-center" aria-label="Pagination">
      <div className="join">
        {pages.map((n) => (
          <Link
            key={n}
            href={pageHref(n)}
            className={cn('btn join-item btn-sm', n === page && 'btn-active btn-primary')}
            aria-current={n === page ? 'page' : undefined}
          >
            {n}
          </Link>
        ))}
      </div>
    </nav>
  );
}
