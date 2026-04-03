import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { sql } from '@/lib/db';
import type { Post, Era } from '@/lib/db';
import { getLang, t, i18n, tCategory, tEra, tCanon } from '@/lib/translations';

export const dynamic = 'force-dynamic';

const VALID_ERAS: Era[] = ['old_republic', 'prequel', 'clone_wars', 'imperial', 'rebellion', 'new_republic', 'first_order', 'legends'];

async function getPostsByEra(era: Era): Promise<Post[]> {
  return await sql<Post[]>`SELECT * FROM posts WHERE era = ${era} ORDER BY published_at DESC`;
}

export default async function EraPage({ params, searchParams }: { params: Promise<{ name: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const [{ name }, sp] = await Promise.all([params, searchParams]);
  const lang = getLang(sp);
  const langParam = lang === 'pl' ? '?lang=pl' : '';
  const era = name as Era;

  if (!VALID_ERAS.includes(era)) notFound();

  const posts = await getPostsByEra(era);
  const eraName = tEra(era, lang);

  return (
    <div className="min-h-screen bg-[#111114]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold text-[#fafafa] mb-4 tracking-tight">{eraName}</h1>
          <p className="text-lg text-[#a1a1aa]">{i18n('era.archivesFrom', lang, { era: eraName })}</p>
        </div>
        {posts.length === 0 ? (
          <div className="text-center py-16"><p className="text-[#a1a1aa]">{i18n('era.noPostsYet', lang)}</p></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.id} href={`/posts/${post.slug}${langParam}`}
                className="group block bg-[#1c1c21] border border-[#2e2e35] rounded-lg overflow-hidden hover:border-amber-500/50 transition-all">
                <div className="relative aspect-video overflow-hidden">
                  <Image src={post.image_url} alt={t(post, 'title', lang)} fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-[#fafafa] mb-2 group-hover:text-amber-400 transition-colors">{t(post, 'title', lang)}</h3>
                  <p className="text-sm text-[#a1a1aa] line-clamp-2">{t(post, 'excerpt', lang)}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-[#71717a]">
                    <span>{tCategory(post.category, lang)}</span>
                    <span>{tCanon(post.canon_status, lang)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
