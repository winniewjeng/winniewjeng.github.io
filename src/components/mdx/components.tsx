import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { cn } from '@/lib/utils';

/** Internal links use next/link; external links open safely in a new tab. */
function Anchor({ href = '', ...props }: ComponentPropsWithoutRef<'a'>) {
  if (href.startsWith('/') || href.startsWith('#')) return <Link href={href} {...props} />;
  return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
}

const calloutStyles = {
  info: 'alert-info',
  tip: 'alert-success',
  warning: 'alert-warning',
  danger: 'alert-error',
} as const;

/** `<Callout type="tip">…</Callout>` in MDX. */
export function Callout({
  type = 'info',
  children,
}: {
  type?: keyof typeof calloutStyles;
  children: ReactNode;
}) {
  return (
    <div role="note" className={cn('not-prose my-6 alert block alert-soft', calloutStyles[type])}>
      {children}
    </div>
  );
}

/** `<Figure src="./diagram.png" alt="…" caption="…" />` in MDX. */
export function Figure({ src, alt, caption }: { src: string; alt: string; caption?: ReactNode }) {
  return (
    <figure>
      {/* eslint-disable-next-line @next/next/no-img-element -- static export serves images as-is */}
      <img src={src} alt={alt} loading="lazy" className="mx-auto rounded-box" />
      {caption && <figcaption className="text-center">{caption}</figcaption>}
    </figure>
  );
}

export const mdxComponents = {
  a: Anchor,
  Callout,
  Figure,
};
