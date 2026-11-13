import type { ComponentType } from 'react';
import * as runtime from 'react/jsx-runtime';

import { mdxComponents } from './components';

type MDXComponent = ComponentType<{ components?: typeof mdxComponents }>;

const cache = new Map<string, MDXComponent>();

/**
 * Velite compiles MDX at build time to a function body; evaluate it with the
 * React JSX runtime. Code comes only from this repo's `content/` folder.
 * Results are cached so each document yields one stable component.
 */
function getMDXComponent(code: string): MDXComponent {
  let component = cache.get(code);
  if (!component) {
    const fn = new Function(code) as (scope: typeof runtime) => { default: MDXComponent };
    component = fn({ ...runtime }).default;
    cache.set(code, component);
  }
  return component;
}

export function MDXContent({ code }: { code: string }) {
  const Component = getMDXComponent(code);
  return (
    <div className="prose max-w-none prose-neutral dark:prose-invert">
      {/* eslint-disable-next-line react-hooks/static-components -- cached per document, stable identity */}
      <Component components={mdxComponents} />
    </div>
  );
}
