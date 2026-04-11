'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import LangLink from './LangLink';
import LanguageSwitcher from './LanguageSwitcher';

function NavContent() {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') === 'pl' ? 'pl' : 'en';
  const aboutLabel = lang === 'pl' ? 'O stronie' : 'About';

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="flex items-center justify-between h-16">
        {/* Left side: logo — extra left padding on mobile for hamburger */}
        <LangLink href="/" className="flex items-center space-x-3 group pl-16 lg:pl-0">
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

        {/* Right side */}
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
    <nav className="sticky top-10 z-50 bg-[#09090b]/95 backdrop-blur-sm border-b border-[#2e2e35]">
      <Suspense>
        <NavContent />
      </Suspense>
    </nav>
  );
}
