'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import LangLink from './LangLink';
import { tCategory, tEra, type Lang } from '@/lib/translations';

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
      {/* Mobile hamburger — fixed in navbar area, always on top */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-[60] lg:hidden p-2 rounded-lg bg-[#1c1c21]/90 border border-[#2e2e35] text-amber-400 hover:bg-amber-500/20 active:bg-amber-500/30 transition-colors backdrop-blur-sm"
        aria-label="Menu"
        style={{ touchAction: 'manipulation' }}
      >
        <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          {isOpen
            ? <path d="M6 18L18 6M6 6l12 12" />
            : <path d="M4 6h16M4 12h16M4 18h16" />}
        </svg>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[45] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-[#0d0d0f]/95 backdrop-blur-md
          border-r border-[#2e2e35] z-[45]
          transform transition-transform duration-300 ease-in-out overflow-y-auto
          scrollbar-thin scrollbar-thumb-[#2e2e35] scrollbar-track-transparent
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="p-5 space-y-6">
          {/* Categories */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-amber-500/80 mb-3 flex items-center gap-2 px-2">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
              {categoriesLabel}
            </h3>
            <nav className="space-y-0.5">
              {categories.map((category) => (
                <LangLink
                  key={category}
                  href={`/category/${category}`}
                  className="block px-3 py-2 text-sm text-[#d4d4d8] hover:text-amber-400 hover:bg-amber-500/10 rounded-md transition-all active:bg-amber-500/20"
                  onClick={() => setIsOpen(false)}
                >
                  {tCategory(category, lang)}
                </LangLink>
              ))}
            </nav>
          </div>

          {/* Divider */}
          <div className="border-t border-[#2e2e35]/60" />

          {/* Eras */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-amber-500/80 mb-3 flex items-center gap-2 px-2">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              {erasLabel}
            </h3>
            <nav className="space-y-0.5">
              {eras.map((era) => (
                <LangLink
                  key={era}
                  href={`/era/${era}`}
                  className="block px-3 py-2 text-sm text-[#d4d4d8] hover:text-amber-400 hover:bg-amber-500/10 rounded-md transition-all active:bg-amber-500/20"
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
