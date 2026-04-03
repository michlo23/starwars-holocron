'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function LangLink({ href, children, ...props }: React.ComponentProps<typeof Link>) {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');

  // Append ?lang=pl to href if current lang is PL
  let finalHref = href.toString();
  if (lang === 'pl') {
    const sep = finalHref.includes('?') ? '&' : '?';
    finalHref = `${finalHref}${sep}lang=pl`;
  }

  return <Link href={finalHref} {...props}>{children}</Link>;
}
