import { notFound } from 'next/navigation';

import { MDXContent } from '@/components/mdx/MDXContent';
import { getPageBySlug } from '@/features/pages/queries';
import { buildMetadata } from '@/lib/seo';

const page = getPageBySlug('about');

export const metadata = buildMetadata({
  title: page?.title ?? 'About',
  description: page?.description,
  path: '/about/',
});

export default function AboutPage() {
  if (!page) notFound();
  return (
    <>
      <h1 className="mb-8 text-3xl font-bold tracking-tight">{page.title}</h1>
      <MDXContent code={page.body} />
    </>
  );
}
