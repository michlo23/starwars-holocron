'use client';

import Image from 'next/image';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLang = searchParams.get('lang') || 'en';

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
    <div className="flex items-center gap-1">
      <button
        onClick={() => switchLang('en')}
        className={`rounded-full overflow-hidden transition-all active:scale-90 ${
          currentLang === 'en'
            ? 'ring-2 ring-amber-500 scale-105'
            : 'opacity-50 hover:opacity-80'
        }`}
        aria-label="English"
        style={{ touchAction: 'manipulation' }}
      >
        <Image
          src="/images/icons/lang-en.webp"
          alt="EN"
          width={32}
          height={32}
          className="rounded-full"
        />
      </button>
      <button
        onClick={() => switchLang('pl')}
        className={`rounded-full overflow-hidden transition-all active:scale-90 ${
          currentLang === 'pl'
            ? 'ring-2 ring-amber-500 scale-105'
            : 'opacity-50 hover:opacity-80'
        }`}
        aria-label="Polski"
        style={{ touchAction: 'manipulation' }}
      >
        <Image
          src="/images/icons/lang-pl.webp"
          alt="PL"
          width={32}
          height={32}
          className="rounded-full"
        />
      </button>
    </div>
  );
}
