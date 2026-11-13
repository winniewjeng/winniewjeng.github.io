import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode, { type Options as PrettyCodeOptions } from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { defineCollection, defineConfig, s } from 'velite';

/**
 * Content layer.
 *
 * Every collection is validated with zod. Production builds run in strict
 * mode (see next.config.ts), so a post with bad frontmatter fails the build
 * with a readable error; in dev it is reported and skipped.
 * Application code must NOT import `#velite` directly; go through the
 * feature query modules (e.g. `src/features/posts/queries.ts`).
 */

const prettyCodeOptions: PrettyCodeOptions = {
  theme: { light: 'github-light', dark: 'github-dark' },
  keepBackground: false,
};

const posts = defineCollection({
  name: 'Post',
  pattern: 'posts/**/index.mdx',
  schema: s
    .object({
      title: s.string().max(120),
      description: s.string().max(300),
      date: s.isodate(),
      updated: s.isodate().optional(),
      tags: s.array(s.string()).default([]),
      draft: s.boolean().default(false),
      cover: s.image().optional(),
      slug: s.path(),
      metadata: s.metadata(),
      toc: s.toc(),
      body: s.mdx(),
    })
    .transform(({ slug, ...data }) => ({
      ...data,
      // `posts/hello-world` -> `hello-world`
      slug: slug.replace(/^posts\//, ''),
    })),
});

const pages = defineCollection({
  name: 'Page',
  pattern: 'pages/**/*.mdx',
  schema: s
    .object({
      title: s.string().max(120),
      description: s.string().max(300).optional(),
      slug: s.path(),
      body: s.mdx(),
    })
    .transform(({ slug, ...data }) => ({
      ...data,
      slug: slug.replace(/^pages\//, ''),
    })),
});

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: { posts, pages },
  mdx: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, prettyCodeOptions],
      rehypeKatex,
      [rehypeAutolinkHeadings, { behavior: 'wrap', properties: { className: ['heading-anchor'] } }],
    ],
  },
});
