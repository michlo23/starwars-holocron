'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLang = searchParams.get('lang') || 'en';

  // On mount: if no ?lang in URL, check localStorage and redirect
  useEffect(() => {
    if (!searchParams.has('lang')) {
      const stored = localStorage.getItem('holocron-lang');
      if (stored === 'pl') {
        const params = new URLSearchParams(searchParams.toString());
        params.set('lang', 'pl');
        router.replace(`${pathname}?${params.toString()}`);
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const switchLang = useCallback((lang: string) => {
    // Save to localStorage
    localStorage.setItem('holocron-lang', lang);

    const params = new URLSearchParams(searchParams.toString());
    if (lang === 'en') {
      params.delete('lang');
    } else {
      params.set('lang', lang);
    }
    const query = params.toString();
    router.push(`${pathname}${query ? `?${query}` : ''}`);
  }, [router, pathname, searchParams]);

  return (
    <div className="flex items-center gap-1 bg-[#1c1c21] border border-[#2e2e35] rounded-lg p-0.5">
      <button
        onClick={() => switchLang('en')}
        className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
          currentLang === 'en'
            ? 'bg-amber-500 text-[#09090b]'
            : 'text-[#a1a1aa] hover:text-[#fafafa]'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => switchLang('pl')}
        className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
          currentLang === 'pl'
            ? 'bg-amber-500 text-[#09090b]'
            : 'text-[#a1a1aa] hover:text-[#fafafa]'
        }`}
      >
        PL
      </button>
    </div>
  );
}
