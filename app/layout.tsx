import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import Image from 'next/image';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Holocron Archives - Star Wars Lore Database',
  description: 'Explore the comprehensive Star Wars universe through detailed articles on characters, battles, ships, planets, and lore.',
  icons: {
    icon: '/favicon.ico',
    apple: '/images/branding/icon-192.webp',
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
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-[#09090b]/95 backdrop-blur-sm border-b border-[#2e2e35]">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center space-x-3 group">
                <Image
                  src="/images/branding/logo-header.webp"
                  alt="Holocron Archives"
                  width={36}
                  height={36}
                  className="rounded-lg group-hover:brightness-110 transition-all"
                  priority
                />
                <span className="text-xl font-semibold text-[#fafafa] tracking-tight group-hover:text-amber-400 transition-colors">
                  Holocron Archives
                </span>
              </Link>

              <div className="flex items-center space-x-6">
                <Link href="/" className="text-sm font-medium text-[#a1a1aa] hover:text-[#fafafa] transition-colors">
                  Archives
                </Link>
                <Link href="/category/character" className="text-sm font-medium text-[#a1a1aa] hover:text-[#fafafa] transition-colors">
                  Characters
                </Link>
                <Link href="/category/battle" className="text-sm font-medium text-[#a1a1aa] hover:text-[#fafafa] transition-colors">
                  Battles
                </Link>
                <Link href="/about" className="text-sm font-medium text-[#a1a1aa] hover:text-[#fafafa] transition-colors">
                  About
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {children}

        {/* Footer */}
        <footer className="border-t border-[#2e2e35] mt-16">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <Image
                    src="/images/branding/logo-header.webp"
                    alt="Holocron Archives"
                    width={28}
                    height={28}
                    className="rounded"
                  />
                  <h3 className="text-sm font-semibold text-[#fafafa]">Holocron Archives</h3>
                </div>
                <p className="text-sm text-[#a1a1aa]">
                  A comprehensive database of Star Wars lore, exploring characters, battles, ships, planets, and the rich history of the galaxy far, far away.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#fafafa] mb-4">Categories</h3>
                <ul className="space-y-2">
                  <li><Link href="/category/character" className="text-sm text-[#a1a1aa] hover:text-amber-400">Characters</Link></li>
                  <li><Link href="/category/battle" className="text-sm text-[#a1a1aa] hover:text-amber-400">Battles</Link></li>
                  <li><Link href="/category/ship" className="text-sm text-[#a1a1aa] hover:text-amber-400">Ships</Link></li>
                  <li><Link href="/category/planet" className="text-sm text-[#a1a1aa] hover:text-amber-400">Planets</Link></li>
                  <li><Link href="/category/lore" className="text-sm text-[#a1a1aa] hover:text-amber-400">Lore</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#fafafa] mb-4">Eras</h3>
                <ul className="space-y-2">
                  <li><Link href="/era/old_republic" className="text-sm text-[#a1a1aa] hover:text-amber-400">Old Republic</Link></li>
                  <li><Link href="/era/prequel" className="text-sm text-[#a1a1aa] hover:text-amber-400">Prequel Era</Link></li>
                  <li><Link href="/era/clone_wars" className="text-sm text-[#a1a1aa] hover:text-amber-400">Clone Wars</Link></li>
                  <li><Link href="/era/rebellion" className="text-sm text-[#a1a1aa] hover:text-amber-400">Rebellion Era</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-[#2e2e35] text-center">
              <p className="text-sm text-[#71717a]">
                Built with Next.js & deployed on Coolify. Content generated with care for the Star Wars fan community.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
