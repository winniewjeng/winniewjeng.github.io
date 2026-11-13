import type { Post } from '../queries';

type TocEntry = Post['toc'][number];

function TocItems({ items }: { items: TocEntry[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.url}>
          <a href={item.url}>{item.title}</a>
          {item.items.length > 0 && <TocItems items={item.items} />}
        </li>
      ))}
    </ul>
  );
}

export function TableOfContents({ toc }: { toc: TocEntry[] }) {
  if (toc.length === 0) return null;
  return (
    <details className="collapse-arrow collapse my-8 rounded-box bg-base-200" open>
      <summary className="collapse-title text-sm font-semibold">On this page</summary>
      <nav className="menu collapse-content w-full menu-sm" aria-label="Table of contents">
        <TocItems items={toc} />
      </nav>
    </details>
  );
}
