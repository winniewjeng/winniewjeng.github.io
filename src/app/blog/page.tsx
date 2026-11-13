import { buildMetadata } from '@/lib/seo';

import { BlogIndex } from './BlogIndex';

export const metadata = buildMetadata({ title: 'Blog', path: '/blog/' });

export default function BlogPage() {
  return <BlogIndex page={1} />;
}
