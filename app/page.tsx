import Image from 'next/image';
import Link from 'next/link';
import { sql } from '@/lib/db';
import type { Post } from '@/lib/db';
import { getLang, t, i18n, tCategory, tEra, tCanon } from '@/lib/translations';

export const dynamic = 'force-dynamic';

async function getLatestPosts(): Promise<Post[]> {
  return await sql<Post[]>`SELECT * FROM posts ORDER BY published_at DESC LIMIT 12`;
}

async function getFeaturedPosts(): Promise<Post[]> {
  return await sql<Post[]>`SELECT * FROM posts WHERE featured = true ORDER BY published_at DESC LIMIT 3`;
}

export default async function HomePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const lang = getLang(sp);
  const langParam = lang === 'pl' ? '?lang=pl' : '';
  const [featuredPosts, latestPosts] = await Promise.all([getFeaturedPosts(), getLatestPosts()]);
  const heroPost = featuredPosts[0];

  return (
    <div className="min-h-screen bg-[#111114]">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[350px] md:h-[60vh] md:min-h-[500px] overflow-hidden">
        <Image src="/images/branding/hero-banner.webp" alt="Holocron Archives" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111114] via-[#111114]/60 to-[#111114]/20" />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 md:p-16">
          <div className="max-w-7xl mx-auto">
            {heroPost ? (
              <>
                <div className="inline-block px-3 py-1 mb-4 text-xs font-medium uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full">
                  {i18n('home.featured', lang)}
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-semibold text-[#fafafa] mb-4 tracking-tight">
                  {t(heroPost, 'title', lang)}
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-[#d4d4d8] mb-6 max-w-3xl">
                  {t(heroPost, 'excerpt', lang)}
                </p>
                <Link href={`/posts/${heroPost.slug}${langParam}`}
                  className="inline-flex items-center px-6 py-3 text-sm font-medium text-[#09090b] bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors">
                  {i18n('home.readMore', lang)}
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </>
            ) : (
              <>
                <h1 className="text-5xl md:text-7xl font-semibold text-[#fafafa] mb-4 tracking-tight">Holocron Archives</h1>
                <p className="text-lg md:text-xl text-[#d4d4d8] max-w-3xl">{i18n('home.assembling', lang)}</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <h2 className="text-3xl font-semibold text-[#fafafa] tracking-tight mb-8">
          {i18n('home.latestArchives', lang)}
        </h2>
        {latestPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-[#a1a1aa]">{i18n('home.assembling', lang)}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <Link key={post.id} href={`/posts/${post.slug}${langParam}`}
                className="group block bg-[#1c1c21] border border-[#2e2e35] rounded-lg overflow-hidden hover:border-amber-500/50 transition-all">
                <div className="relative aspect-video overflow-hidden">
                  <Image src={post.image_url} alt={t(post, 'title', lang)} fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-3 right-3">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-[#111114]/80 backdrop-blur-sm text-amber-400 border border-amber-500/30 rounded-full">
                      {tCategory(post.category, lang)}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-[#fafafa] mb-2 group-hover:text-amber-400 transition-colors">
                    {t(post, 'title', lang)}
                  </h3>
                  <p className="text-sm text-[#a1a1aa] line-clamp-2">{t(post, 'excerpt', lang)}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-[#71717a]">
                    <span>{tEra(post.era, lang)}</span>
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
