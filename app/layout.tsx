import '../components/globals.css';
import { Manrope, Young_Serif } from 'next/font/google';
import LayoutComponent from '../components/layoutComponent';

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
  return (
    <html lang="en" className={`${manrope.variable} ${youngSerif.variable}`}>
      <LayoutComponent>{children}</LayoutComponent>
    </html>
  );
}
