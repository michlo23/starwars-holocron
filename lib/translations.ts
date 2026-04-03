export type Lang = 'en' | 'pl';

const translations = {
  // Navigation
  'nav.archives': { en: 'Archives', pl: 'Archiwum' },
  'nav.characters': { en: 'Characters', pl: 'Postacie' },
  'nav.battles': { en: 'Battles', pl: 'Bitwy' },
  'nav.about': { en: 'About', pl: 'O stronie' },

  // Homepage
  'home.featured': { en: 'Featured', pl: 'Wyróżnione' },
  'home.readMore': { en: 'Read More', pl: 'Czytaj więcej' },
  'home.latestArchives': { en: 'Latest Archives', pl: 'Najnowsze wpisy' },
  'home.assembling': { en: 'Archives are being assembled…', pl: 'Archiwa są kompletowane…' },
  'home.runSeed': { en: 'Run the seed script to populate posts.', pl: 'Uruchom skrypt seed, aby dodać posty.' },

  // Categories
  'category.character': { en: 'Characters', pl: 'Postacie' },
  'category.battle': { en: 'Battles', pl: 'Bitwy' },
  'category.ship': { en: 'Ships', pl: 'Statki' },
  'category.planet': { en: 'Planets', pl: 'Planety' },
  'category.lore': { en: 'Lore', pl: 'Wiedza' },
  'category.timeline': { en: 'Timeline', pl: 'Oś czasu' },
  'category.scene': { en: 'Scenes', pl: 'Sceny' },
  'category.explore': { en: 'Explore all {category}-related archives from across the Star Wars galaxy.', pl: 'Przeglądaj wszystkie wpisy z kategorii {category} z galaktyki Star Wars.' },
  'category.noPostsYet': { en: 'No posts found in this category yet.', pl: 'Brak wpisów w tej kategorii.' },

  // Eras
  'era.old_republic': { en: 'Old Republic', pl: 'Stara Republika' },
  'era.prequel': { en: 'Prequel Era', pl: 'Era Prequeli' },
  'era.clone_wars': { en: 'Clone Wars', pl: 'Wojny Klonów' },
  'era.imperial': { en: 'Imperial Era', pl: 'Era Imperium' },
  'era.rebellion': { en: 'Rebellion Era', pl: 'Era Rebelii' },
  'era.new_republic': { en: 'New Republic', pl: 'Nowa Republika' },
  'era.first_order': { en: 'First Order', pl: 'Najwyższy Porządek' },
  'era.legends': { en: 'Legends', pl: 'Legendy' },
  'era.archivesFrom': { en: 'Archives from the {era} era of the Star Wars timeline.', pl: 'Wpisy z ery {era} osi czasu Star Wars.' },
  'era.noPostsYet': { en: 'No posts found in this era yet.', pl: 'Brak wpisów w tej erze.' },

  // Canon status
  'canon.canon': { en: 'Canon', pl: 'Kanon' },
  'canon.legends': { en: 'Legends', pl: 'Legendy' },
  'canon.mixed': { en: 'Mixed', pl: 'Mieszane' },

  // Post page
  'post.relatedArchives': { en: 'Related Archives', pl: 'Powiązane wpisy' },
  'post.notFound': { en: 'Post Not Found', pl: 'Nie znaleziono wpisu' },

  // Footer
  'footer.description': {
    en: 'A comprehensive database of Star Wars lore, exploring characters, battles, ships, planets, and the rich history of the galaxy far, far away.',
    pl: 'Kompleksowa baza wiedzy o Star Wars — postacie, bitwy, statki, planety i bogata historia galaktyki dalekiej, dalekiej…',
  },
  'footer.categories': { en: 'Categories', pl: 'Kategorie' },
  'footer.eras': { en: 'Eras', pl: 'Ery' },
  'footer.builtWith': {
    en: 'Built with Next.js & deployed on Coolify. Content generated with care for the Star Wars fan community.',
    pl: 'Zbudowane w Next.js i wdrożone na Coolify. Treści tworzone z myślą o społeczności fanów Star Wars.',
  },

  // About page
  'about.title': { en: 'About Holocron Archives', pl: 'O Holocron Archives' },
} as const;

type TranslationKey = keyof typeof translations;

export function i18n(key: TranslationKey, lang: Lang, replacements?: Record<string, string>): string {
  const entry = translations[key];
  let text: string = entry?.[lang] || entry?.['en'] || key;
  if (replacements) {
    for (const [k, v] of Object.entries(replacements)) {
      text = text.replace(`{${k}}`, v);
    }
  }
  return text;
}

export function tCategory(category: string, lang: Lang): string {
  const key = `category.${category}` as TranslationKey;
  return translations[key]?.[lang] || category;
}

export function tEra(era: string, lang: Lang): string {
  const key = `era.${era}` as TranslationKey;
  return translations[key]?.[lang] || era.replace(/_/g, ' ');
}

export function tCanon(status: string, lang: Lang): string {
  const key = `canon.${status}` as TranslationKey;
  return translations[key]?.[lang] || status;
}

// Post field helper
export function t(post: any, field: string, lang: Lang): string {
  return lang === 'pl' ? post[`${field}_pl`] || post[`${field}_en`] : post[`${field}_en`];
}

export function getLang(searchParams: Record<string, string | string[] | undefined>): Lang {
  const lang = searchParams?.lang;
  if (lang === 'pl') return 'pl';
  return 'en';
}
