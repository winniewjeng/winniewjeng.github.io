/**
 * Site-wide configuration. The single source of truth for anything that
 * identifies the site (names, URLs, navigation, social links).
 */
export const siteConfig = {
  name: 'winnie jeng',
  title: 'winnie jeng',
  description: 'Notes on computer science, literature, and the stars.',
  url: 'https://winniewjeng.github.io',
  locale: 'en-US',
  author: {
    name: 'Winnie Jeng',
    github: 'https://github.com/winniewjeng',
  },
  nav: [
    { label: 'Blog', href: '/blog/' },
    { label: 'Tags', href: '/tags/' },
    { label: 'About', href: '/about/' },
  ],
  postsPerPage: 10,
  recentPostsOnHome: 5,
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
