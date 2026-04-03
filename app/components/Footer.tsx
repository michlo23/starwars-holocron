'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import LangLink from './LangLink';

function FooterContent() {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') === 'pl' ? 'pl' : 'en';

  const l = {
    categories: lang === 'pl' ? 'Kategorie' : 'Categories',
    characters: lang === 'pl' ? 'Postacie' : 'Characters',
    battles: lang === 'pl' ? 'Bitwy' : 'Battles',
    ships: lang === 'pl' ? 'Statki' : 'Ships',
    planets: lang === 'pl' ? 'Planety' : 'Planets',
    lore: lang === 'pl' ? 'Wiedza' : 'Lore',
    eras: lang === 'pl' ? 'Ery' : 'Eras',
    oldRepublic: lang === 'pl' ? 'Stara Republika' : 'Old Republic',
    prequel: lang === 'pl' ? 'Era Prequeli' : 'Prequel Era',
    cloneWars: lang === 'pl' ? 'Wojny Klonów' : 'Clone Wars',
    rebellion: lang === 'pl' ? 'Era Rebelii' : 'Rebellion Era',
    description: lang === 'pl'
      ? 'Kompleksowa baza wiedzy o Star Wars — postacie, bitwy, statki, planety i bogata historia galaktyki dalekiej, dalekiej…'
      : 'A comprehensive database of Star Wars lore, exploring characters, battles, ships, planets, and the rich history of the galaxy far, far away.',
    builtWith: lang === 'pl'
      ? 'Zbudowane w Next.js i wdrożone na Coolify. Treści tworzone z myślą o społeczności fanów Star Wars.'
      : 'Built with Next.js & deployed on Coolify. Content generated with care for the Star Wars fan community.',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <Image src="/images/branding/logo-header.webp" alt="Holocron Archives" width={28} height={28} className="rounded" />
            <h3 className="text-sm font-semibold text-[#fafafa]">Holocron Archives</h3>
          </div>
          <p className="text-sm text-[#a1a1aa]">{l.description}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-[#fafafa] mb-4">{l.categories}</h3>
          <ul className="space-y-2">
            <li><LangLink href="/category/character" className="text-sm text-[#a1a1aa] hover:text-amber-400">{l.characters}</LangLink></li>
            <li><LangLink href="/category/battle" className="text-sm text-[#a1a1aa] hover:text-amber-400">{l.battles}</LangLink></li>
            <li><LangLink href="/category/ship" className="text-sm text-[#a1a1aa] hover:text-amber-400">{l.ships}</LangLink></li>
            <li><LangLink href="/category/planet" className="text-sm text-[#a1a1aa] hover:text-amber-400">{l.planets}</LangLink></li>
            <li><LangLink href="/category/lore" className="text-sm text-[#a1a1aa] hover:text-amber-400">{l.lore}</LangLink></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-[#fafafa] mb-4">{l.eras}</h3>
          <ul className="space-y-2">
            <li><LangLink href="/era/old_republic" className="text-sm text-[#a1a1aa] hover:text-amber-400">{l.oldRepublic}</LangLink></li>
            <li><LangLink href="/era/prequel" className="text-sm text-[#a1a1aa] hover:text-amber-400">{l.prequel}</LangLink></li>
            <li><LangLink href="/era/clone_wars" className="text-sm text-[#a1a1aa] hover:text-amber-400">{l.cloneWars}</LangLink></li>
            <li><LangLink href="/era/rebellion" className="text-sm text-[#a1a1aa] hover:text-amber-400">{l.rebellion}</LangLink></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-[#2e2e35] text-center">
        <p className="text-sm text-[#71717a]">{l.builtWith}</p>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-[#2e2e35] mt-16">
      <Suspense>
        <FooterContent />
      </Suspense>
    </footer>
  );
}
