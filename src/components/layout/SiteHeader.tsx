import Link from 'next/link';

import { siteConfig } from '@/config/site';
import { ThemeToggle } from '@/features/theme/ThemeToggle';

import { Container } from './Container';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-base-300 bg-base-100/80 backdrop-blur">
      <Container>
        <nav className="navbar min-h-14 px-0" aria-label="Main">
          <div className="flex-1">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              {siteConfig.name}
            </Link>
          </div>
          <ul className="menu menu-horizontal gap-1 px-0">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  );
}
