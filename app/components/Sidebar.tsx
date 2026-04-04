'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import LangLink from './LangLink';
import { tCategory, tEra, type Lang } from '@/lib/translations';

const categories = [
  { key: 'character', icon: '/images/icons/cat-character.webp' },
  { key: 'battle', icon: '/images/icons/cat-battle.webp' },
  { key: 'ship', icon: '/images/icons/cat-ship.webp' },
  { key: 'planet', icon: '/images/icons/cat-planet.webp' },
  { key: 'lore', icon: '/images/icons/cat-lore.webp' },
  { key: 'timeline', icon: '/images/icons/cat-timeline.webp' },
  { key: 'scene', icon: '/images/icons/cat-scene.webp' },
];

const eras = [
  { key: 'old_republic', icon: '/images/icons/era-old-republic.webp' },
  { key: 'prequel', icon: '/images/icons/era-prequel.webp' },
  { key: 'clone_wars', icon: '/images/icons/era-clone-wars.webp' },
  { key: 'imperial', icon: '/images/icons/era-imperial.webp' },
  { key: 'rebellion', icon: '/images/icons/era-rebellion.webp' },
  { key: 'new_republic', icon: '/images/icons/era-new-republic.webp' },
  { key: 'first_order', icon: '/images/icons/era-first-order.webp' },
  { key: 'legends', icon: '/images/icons/era-legends.webp' },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const lang: Lang = searchParams.get('lang') === 'pl' ? 'pl' : 'en';

  const categoriesLabel = lang === 'pl' ? 'Kategorie' : 'Categories';
  const erasLabel = lang === 'pl' ? 'Ery' : 'Eras';

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-2.5 left-14 z-[60] lg:hidden rounded-full overflow-hidden active:scale-95 transition-transform ring-2 ring-[#111114]"
        aria-label="Menu"
        style={{ touchAction: 'manipulation', minWidth: '48px', minHeight: '48px' }}
      >
        <Image
          src={isOpen ? '/images/icons/menu-close.webp' : '/images/icons/menu-hamburger.webp'}
          alt="Menu"
          width={48}
          height={48}
          className="object-cover"
        />
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
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="p-4 space-y-6">
          {/* Categories */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-amber-500/80 mb-3 px-2">
              {categoriesLabel}
            </h3>
            <nav className="space-y-0.5">
              {categories.map(({ key, icon }) => (
                <LangLink
                  key={key}
                  href={`/category/${key}`}
                  className="flex items-center gap-3 px-2 py-2 text-sm text-[#d4d4d8] hover:text-amber-400 hover:bg-amber-500/10 rounded-lg transition-all active:bg-amber-500/20 group"
                  onClick={() => setIsOpen(false)}
                >
                  <Image
                    src={icon}
                    alt=""
                    width={28}
                    height={28}
                    className="rounded-md"
                  />
                  <span>{tCategory(key, lang)}</span>
                </LangLink>
              ))}
            </nav>
          </div>

          {/* Divider */}
          <div className="border-t border-[#2e2e35]/60" />

          {/* Eras */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-amber-500/80 mb-3 px-2">
              {erasLabel}
            </h3>
            <nav className="space-y-0.5">
              {eras.map(({ key, icon }) => (
                <LangLink
                  key={key}
                  href={`/era/${key}`}
                  className="flex items-center gap-3 px-2 py-2 text-sm text-[#d4d4d8] hover:text-amber-400 hover:bg-amber-500/10 rounded-lg transition-all active:bg-amber-500/20 group"
                  onClick={() => setIsOpen(false)}
                >
                  <Image
                    src={icon}
                    alt=""
                    width={28}
                    height={28}
                    className="rounded-md"
                  />
                  <span>{tEra(key, lang)}</span>
                </LangLink>
              ))}
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
}
