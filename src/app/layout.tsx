import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import type { ReactNode } from 'react';

import { Container } from '@/components/layout/Container';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { siteConfig } from '@/config/site';
import { ThemeProvider } from '@/features/theme/ThemeProvider';
import { buildMetadata } from '@/lib/seo';

import './globals.css';

const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  ...buildMetadata(),
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: `%s · ${siteConfig.name}` },
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.github }],
  alternates: {
    canonical: '/',
    types: { 'application/rss+xml': [{ url: '/feed.xml', title: siteConfig.title }] },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1d232a' },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col bg-base-100 font-sans text-base-content antialiased">
        <ThemeProvider>
          <a
            href="#main"
            className="btn sr-only btn-primary btn-sm focus:not-sr-only focus:absolute focus:m-2"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main" className="flex-1 py-10">
            <Container>{children}</Container>
          </main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
