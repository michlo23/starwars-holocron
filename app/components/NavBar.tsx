'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import LangLink from './LangLink';
import LanguageSwitcher from './LanguageSwitcher';
import { useSidebar } from './SidebarContext';

function NavContent() {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') === 'pl' ? 'pl' : 'en';
  const { isOpen, toggle } = useSidebar();

  const aboutLabel = lang === 'pl' ? 'O stronie' : 'About';

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          {/* Hamburger — visible only below lg */}
          <button
            onClick={toggle}
            className="lg:hidden p-2 -ml-2 rounded-lg text-[#a1a1aa] hover:text-amber-400 hover:bg-[#1c1c21] transition-colors"
            aria-label="Toggle navigation"
          >
            <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen
                ? <path d="M6 18L18 6M6 6l12 12" />
                : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>

          <LangLink href="/" className="flex items-center space-x-3 group">
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
          </LangLink>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center space-x-6">
            <LangLink href="/about" className="text-sm font-medium text-[#a1a1aa] hover:text-[#fafafa] transition-colors">
              {aboutLabel}
            </LangLink>
          </div>
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#09090b]/95 backdrop-blur-sm border-b border-[#2e2e35]">
      <Suspense>
        <NavContent />
      </Suspense>
    </nav>
  );
}
