export type Lang = 'en' | 'pl';

export function getLang(searchParams: Record<string, string | string[] | undefined>): Lang {
  const lang = searchParams?.lang;
  if (lang === 'pl') return 'pl';
  return 'en';
}

export function t(post: any, field: string, lang: Lang): string {
  return lang === 'pl' ? post[`${field}_pl`] || post[`${field}_en`] : post[`${field}_en`];
}
