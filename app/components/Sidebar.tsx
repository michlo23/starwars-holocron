'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import LangLink from './LangLink';
import { tCategory, tEra, i18n, type Lang } from '@/lib/translations';

const categories = ['character', 'battle', 'ship', 'planet', 'lore', 'timeline', 'scene'];
const eras = ['old_republic', 'prequel', 'clone_wars', 'imperial', 'rebellion', 'new_republic', 'first_order', 'legends'];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const lang: Lang = searchParams.get('lang') === 'pl' ? 'pl' : 'en';

  const categoriesLabel = lang === 'pl' ? 'Kategorie' : 'Categories';
  const erasLabel = lang === 'pl' ? 'Ery' : 'Eras';

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-20 left-4 z-50 lg:hidden bg-[#1c1c21] border border-[#2e2e35] rounded-lg p-2 hover:bg-[#27272a] transition-colors"
        aria-label="Toggle sidebar"
      >
        <svg
          className="w-6 h-6 text-amber-500"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-[#0d0d0f] border-r border-[#2e2e35] z-40
          transform transition-transform duration-300 ease-in-out overflow-y-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="p-6 space-y-8">
          {/* Categories Section */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-500 mb-4 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
              {categoriesLabel}
            </h3>
            <nav className="space-y-1">
              {categories.map((category) => (
                <LangLink
                  key={category}
                  href={`/category/${category}`}
                  className="block px-3 py-2 text-sm text-[#d4d4d8] hover:text-amber-400 hover:bg-[#1c1c21] rounded-md transition-all hover:translate-x-1 hover:shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                  onClick={() => setIsOpen(false)}
                >
                  {tCategory(category, lang)}
                </LangLink>
              ))}
            </nav>
          </div>

          {/* Eras Section */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-500 mb-4 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              {erasLabel}
            </h3>
            <nav className="space-y-1">
              {eras.map((era) => (
                <LangLink
                  key={era}
                  href={`/era/${era}`}
                  className="block px-3 py-2 text-sm text-[#d4d4d8] hover:text-amber-400 hover:bg-[#1c1c21] rounded-md transition-all hover:translate-x-1 hover:shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                  onClick={() => setIsOpen(false)}
                >
                  {tEra(era, lang)}
                </LangLink>
              ))}
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
}
