'use client';

import '../components/globals.css';
import { ThemeProvider } from 'next-themes';
import { Manrope, Young_Serif } from 'next/font/google';
import { useState } from 'react';
import { Footer, MobileNav, Nav } from '../components';
import { MenuProvider } from '../components/MenuContext';
import { cn } from '../utils/cn';

const manrope = Manrope({
  display: 'swap',
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-manrope',
});

const youngSerif = Young_Serif({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-young-serif',
});

export default function RootLayout({
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
    <html lang="en" className={`${manrope.variable} ${youngSerif.variable}`}>
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
    </html>
  );
}
