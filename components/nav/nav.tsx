'use client';

import { useTheme } from 'next-themes';
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import { Loader, Moon, Rss, Sun } from 'react-feather';
import { Logo } from '../';
import SiteConfig from '../../config/index.json';
import { Container } from '../container';
import { Hamburger } from '../hamburger';

export function Nav() {
  const rssLink = `${SiteConfig.site.siteUrl}/rss.xml`;
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="relative z-10 border-b border-accent-8">
      <Container width="bleed">
        <nav className="navWrapper flex justify-between items-center py-3 xl:p-0">
          <Link href="/" className="flex items-center no-underline">
            <Logo />
            <span className="text-base text-foreground">
              {SiteConfig.author.name}
            </span>
          </Link>

          {/* TODO: make the links configurable */}
          <div className="relative">
            {mounted && (
              <div className="flex gap-4 lg:hidden">
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="transition-colors text-accent-4 hover:text-accent-1"
                >
                  {theme === 'dark' ? <Moon /> : <Sun />}
                </button>
                <Hamburger />
              </div>
            )}

            <nav className="hidden list-none md:flex md:items-center">
              <NavItem dataTestId="workPageLink" title="Works" href="/works" />
              <NavItem
                dataTestId="articlesPageLink"
                title="Articles"
                href="/articles"
              />
              <NavItem dataTestId="notesPageLink" title="Notes" href="/notes" />
              <NavItem dataTestId="aboutPageLink" title="About" href="/about" />

              <NavItem
                dataTestId="rssPageLink"
                title={<Rss className="text-foreground" />}
                href={rssLink}
                external
              />
              <div>
                {mounted ? (
                  <button
                    className="p-4 border-l border-accent-8 text-accent-4 hover:text-accent-1"
                    onClick={() =>
                      setTheme(theme === 'dark' ? 'light' : 'dark')
                    }
                  >
                    {theme === 'dark' ? <Moon /> : <Sun />}
                  </button>
                ) : (
                  <div className="p-4 border-l border-accent-8 text-accent-6">
                    <Loader className="animate-spin" />
                  </div>
                )}
              </div>
            </nav>
          </div>
        </nav>
      </Container>
    </header>
  );
}

function NavItem({
  title,
  href,
  dataTestId,
  external = false,
}: {
  title: string | ReactNode;
  href: string;
  dataTestId?: string;
  external?: boolean;
}) {
  const classes =
    'border-l border-accent-8 text-accent-4 hover:text-accent-1 p-4 uppercase';

  if (external) {
    return (
      <a
        data-test-id={dataTestId}
        href={href}
        className={classes}
        target="_blank"
        rel="noreferrer noopener"
      >
        {title}
      </a>
    );
  }

  return (
    <Link data-test-id={dataTestId} href={href} className={classes}>
      {title}
    </Link>
  );
}
