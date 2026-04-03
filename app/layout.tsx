import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://starwars.hezivio.com'),
  title: 'Holocron Archives - Star Wars Lore Database',
  description: 'Explore the comprehensive Star Wars universe through detailed articles on characters, battles, ships, planets, and lore.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Holocron Archives - Star Wars Lore Database',
    description: 'Explore the comprehensive Star Wars universe through detailed articles on characters, battles, ships, planets, and lore.',
    url: 'https://starwars.hezivio.com',
    siteName: 'Holocron Archives',
    images: [
      {
        url: '/images/branding/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Holocron Archives - Star Wars Lore Database',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Holocron Archives - Star Wars Lore Database',
    description: 'Explore the comprehensive Star Wars universe through detailed articles on characters, battles, ships, planets, and lore.',
    images: ['/images/branding/og-image.webp'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#111114] text-[#d4d4d8] antialiased">
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
