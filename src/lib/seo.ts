import type { Metadata } from 'next';

import { siteConfig } from '@/config/site';

import { absoluteUrl } from './utils';

interface BuildMetadataInput {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
}

/** Per-page metadata with consistent canonical URLs and OpenGraph/Twitter cards. */
export function buildMetadata({
  title,
  description = siteConfig.description,
  path = '/',
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  tags,
}: BuildMetadataInput = {}): Metadata {
  const url = absoluteUrl(path);
  const images = image ? [{ url: absoluteUrl(image) }] : undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: title ?? siteConfig.title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale.replace('-', '_'),
      images,
      ...(type === 'article'
        ? { type, publishedTime, modifiedTime, tags, authors: [siteConfig.author.name] }
        : { type }),
    },
    twitter: {
      card: images ? 'summary_large_image' : 'summary',
      title: title ?? siteConfig.title,
      description,
      images: image ? [absoluteUrl(image)] : undefined,
    },
  };
}
