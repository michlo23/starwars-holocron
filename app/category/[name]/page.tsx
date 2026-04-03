import Image from 'next/image';
export const dynamic = 'force-dynamic';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { sql } from '@/lib/db';
import type { Post, Category } from '@/lib/db';

const VALID_CATEGORIES: Category[] = ['character', 'battle', 'ship', 'planet', 'lore', 'timeline', 'scene'];

async function getPostsByCategory(category: Category): Promise<Post[]> {
  const posts = await sql<Post[]>`
    SELECT * FROM posts 
    WHERE category = ${category}
    ORDER BY published_at DESC
  `;
  return posts;
}

export default async function CategoryPage({ params }: { params: { name: string } }) {
  const category = params.name as Category;
  
  if (!VALID_CATEGORIES.includes(category)) {
    notFound();
  }

  const posts = await getPostsByCategory(category);

  return (
    <div className="min-h-screen bg-[#111114]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold text-[#fafafa] mb-4 tracking-tight capitalize">
            {category}s
          </h1>
          <p className="text-lg text-[#a1a1aa]">
            Explore all {category}-related archives from across the Star Wars galaxy.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#a1a1aa]">No posts found in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
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
        )}
      </div>
    </div>
  );
}
