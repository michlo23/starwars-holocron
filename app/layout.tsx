import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Holocron Archives - Star Wars Lore Database',
  description: 'Explore the comprehensive Star Wars universe through detailed articles on characters, battles, ships, planets, and lore.',
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
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#09090b]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z" />
                  </svg>
                </div>
                <span className="text-xl font-semibold text-[#fafafa] tracking-tight">
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
                <h3 className="text-sm font-semibold text-[#fafafa] mb-4">Holocron Archives</h3>
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
