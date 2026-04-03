import Image from 'next/image';
import Link from 'next/link';
import { sql } from '@/lib/db';
import type { Post } from '@/lib/db';

async function getLatestPosts(): Promise<Post[]> {
  const posts = await sql<Post[]>`
    SELECT * FROM posts 
    ORDER BY published_at DESC 
    LIMIT 12
  `;
  return posts;
}

async function getFeaturedPosts(): Promise<Post[]> {
  const posts = await sql<Post[]>`
    SELECT * FROM posts 
    WHERE featured = true
    ORDER BY published_at DESC 
    LIMIT 3
  `;
  return posts;
}

export default async function HomePage() {
  const [featuredPosts, latestPosts] = await Promise.all([
    getFeaturedPosts(),
    getLatestPosts(),
  ]);

  return (
    <div className="min-h-screen bg-[#111114]">
      {/* Hero Banner */}
      <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
        {featuredPosts[0] && (
          <>
            <Image
              src={featuredPosts[0].image_url}
              alt={featuredPosts[0].title_en}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111114] via-[#111114]/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
              <div className="max-w-7xl mx-auto">
                <div className="inline-block px-3 py-1 mb-4 text-xs font-medium uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full">
                  Featured
                </div>
                <h1 className="text-4xl md:text-6xl font-semibold text-[#fafafa] mb-4 tracking-tight">
                  {featuredPosts[0].title_en}
                </h1>
                <p className="text-lg md:text-xl text-[#d4d4d8] mb-6 max-w-3xl">
                  {featuredPosts[0].excerpt_en}
                </p>
                <Link
                  href={`/posts/${featuredPosts[0].slug}`}
                  className="inline-flex items-center px-6 py-3 text-sm font-medium text-[#09090b] bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors"
                >
                  Read More
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Latest Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-semibold text-[#fafafa] tracking-tight">
            Latest Archives
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestPosts.map((post) => (
            <Link
              key={post.id}
              href={`/posts/${post.slug}`}
              className="group block bg-[#1c1c21] border border-[#2e2e35] rounded-lg overflow-hidden hover:border-amber-500/50 transition-all"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={post.image_url}
                  alt={post.title_en}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-[#111114]/80 backdrop-blur-sm text-amber-400 border border-amber-500/30 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-[#fafafa] mb-2 group-hover:text-amber-400 transition-colors">
                  {post.title_en}
                </h3>
                <p className="text-sm text-[#a1a1aa] line-clamp-2">
                  {post.excerpt_en}
                </p>
                <div className="mt-4 flex items-center justify-between text-xs text-[#71717a]">
                  <span className="capitalize">{post.era.replace(/_/g, ' ')}</span>
                  <span>{post.canon_status}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
