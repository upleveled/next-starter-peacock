'use client';

import '../components/globals.css';
import { ThemeProvider } from 'next-themes';
import { useState } from 'react';
import { Footer, MobileNav, Nav } from '../components';
import { MenuProvider } from '../components/MenuContext';
import { cn } from '../utils/cn';

export default function LayoutComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenuOpen = () => {
    if (menuOpen) {
      setMenuOpen(false);
    } else {
      setMenuOpen(true);
    }
  };

  return (
    <body
      className={cn(
        'bg-background text-accent-1 font-body transition-colors',
        menuOpen && 'h-full w-full overflow-hidden',
      )}
    >
      <ThemeProvider>
        <MenuProvider value={{ toggleMenuOpen, menuOpen }}>
          <Nav />
          <MobileNav />
          <main className="main bg-background">{children}</main>
          <Footer />
        </MenuProvider>
      </ThemeProvider>
    </body>
  );
}
