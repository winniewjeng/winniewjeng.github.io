import { siteConfig } from '@/config/site';

import { Container } from './Container';

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-base-300 py-8 text-sm text-base-content/70">
      <Container className="flex flex-wrap items-center justify-between gap-4">
        <p>
          © {new Date().getFullYear()} {siteConfig.author.name}
        </p>
        <nav className="flex gap-4" aria-label="Footer">
          <a className="link link-hover" href="/feed.xml">
            RSS
          </a>
          <a className="link link-hover" href={siteConfig.author.github} rel="me">
            GitHub
          </a>
        </nav>
      </Container>
    </footer>
  );
}
