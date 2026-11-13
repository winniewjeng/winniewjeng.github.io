import { formatDate } from '@/lib/utils';

interface PostMetaProps {
  date: string;
  updated?: string;
  readingTime: number;
}

export function PostMeta({ date, updated, readingTime }: PostMetaProps) {
  return (
    <p className="flex flex-wrap gap-x-2 text-sm text-base-content/60">
      <time dateTime={date}>{formatDate(date)}</time>
      <span aria-hidden="true">·</span>
      <span>{Math.max(1, Math.round(readingTime))} min read</span>
      {updated && (
        <>
          <span aria-hidden="true">·</span>
          <span>
            Updated <time dateTime={updated}>{formatDate(updated)}</time>
          </span>
        </>
      )}
    </p>
  );
}
