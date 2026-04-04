'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';

function LangIcon({ code, active }: { code: string; active: boolean }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <circle cx="16" cy="16" r="15" fill="#09090b" stroke={active ? '#f59e0b' : '#3f3f46'} strokeWidth="1.5" />
      {active && (
        <circle cx="16" cy="16" r="13" fill="none" stroke="#f59e0b" strokeWidth="0.5" opacity="0.3" />
      )}
      <text
        x="16"
        y="17"
        textAnchor="middle"
        dominantBaseline="central"
        fill={active ? '#fbbf24' : '#71717a'}
        fontSize="12"
        fontWeight="bold"
        fontFamily="system-ui, sans-serif"
        letterSpacing="0.5"
      >
        {code}
      </text>
      {active && (
        <>
          <text
            x="16"
            y="17"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#fbbf24"
            fontSize="12"
            fontWeight="bold"
            fontFamily="system-ui, sans-serif"
            letterSpacing="0.5"
            filter="url(#glow)"
          >
            {code}
          </text>
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </>
      )}
    </svg>
  );
}

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
    <div className="flex items-center gap-1.5">
      <button
        onClick={() => switchLang('en')}
        className="bg-transparent border-0 p-0 leading-[0] transition-transform active:scale-90 hover:scale-110 cursor-pointer"
        aria-label="English"
        style={{ touchAction: 'manipulation' }}
      >
        <LangIcon code="EN" active={currentLang === 'en'} />
      </button>
      <button
        onClick={() => switchLang('pl')}
        className="bg-transparent border-0 p-0 leading-[0] transition-transform active:scale-90 hover:scale-110 cursor-pointer"
        aria-label="Polski"
        style={{ touchAction: 'manipulation' }}
      >
        <LangIcon code="PL" active={currentLang === 'pl'} />
      </button>
    </div>
  );
}
