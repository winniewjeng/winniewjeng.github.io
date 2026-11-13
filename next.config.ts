import type { NextConfig } from 'next';
import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from 'next/constants';

const nextConfig: NextConfig = {
  // Fully static site for GitHub Pages.
  output: 'export',
  // GitHub Pages serves `/blog/foo/index.html` for `/blog/foo/`.
  trailingSlash: true,
  // The Next image optimizer needs a server; static export serves images as-is.
  images: { unoptimized: true },
  reactStrictMode: true,
};

/**
 * Run the Velite content build alongside Next.js so `pnpm dev` / `pnpm build`
 * is all you need. In dev it watches `content/` and rebuilds on change.
 */
export default async function config(phase: string): Promise<NextConfig> {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const isBuild = phase === PHASE_PRODUCTION_BUILD;
  if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
    process.env.VELITE_STARTED = '1';
    const { build } = await import('velite');
    // Strict in builds: invalid content fails the build. Lenient in dev so a typo doesn't kill the server.
    await build({ watch: isDev, clean: !isDev, strict: !isDev });
  }
  return nextConfig;
}
