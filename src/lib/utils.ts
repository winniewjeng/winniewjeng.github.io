import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { siteConfig } from '@/config/site';

/** Compose class names, letting later Tailwind classes override earlier ones. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

const dateFormatter = new Intl.DateTimeFormat(siteConfig.locale, {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});

/** Format an ISO date string for display, e.g. `November 12, 2026`. */
export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}

/** URL-safe slug for arbitrary labels such as tags: `Data Structures` -> `data-structures`. */
export function slugify(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Absolute URL on this site for a path. */
export function absoluteUrl(path = '/'): string {
  return new URL(path, siteConfig.url).toString();
}
