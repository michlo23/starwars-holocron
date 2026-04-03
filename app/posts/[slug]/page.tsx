import Image from 'next/image';
export const dynamic = 'force-dynamic';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { sql } from '@/lib/db';
import type { Post } from '@/lib/db';
import { getLang, t } from '@/lib/lang';

async function getPost(slug: string): Promise<Post | null> {
  const posts = await sql<Post[]>`
    SELECT * FROM posts WHERE slug = ${slug} LIMIT 1
  `;
  return posts[0] || null;
}

async function getRelatedPosts(category: string, currentSlug: string): Promise<Post[]> {
  const posts = await sql<Post[]>`
    SELECT * FROM posts 
    WHERE category = ${category} AND slug != ${currentSlug}
    ORDER BY RANDOM()
    LIMIT 3
  `;
  return posts;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title_en} | Holocron Archives`,
    description: post.excerpt_en,
    openGraph: {
      title: post.title_en,
      description: post.excerpt_en,
      images: [{ url: post.image_url }],
    },
  };
}

export default async function PostPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const [{ slug }, sp] = await Promise.all([params, searchParams]);
  const lang = getLang(sp);
  const post = await getPost(slug);
  
  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.category, post.slug);

  return (
    <div className="min-h-screen bg-[#111114]">
      {/* Hero Image */}
      <div className="relative h-[40vh] min-h-[250px] md:h-[50vh] md:min-h-[400px] overflow-hidden">
        <Image
          src={post.image_url}
          alt={t(post, "title", lang)}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111114] via-[#111114]/80 to-transparent" />
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 md:px-8 -mt-32 relative z-10">
        <div className="bg-[#1c1c21] border border-[#2e2e35] rounded-lg p-8 md:p-12">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1 text-xs font-medium uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full">
              {post.category}
            </span>
            <span className="px-3 py-1 text-xs font-medium bg-[#2a2a30] text-[#a1a1aa] border border-[#2e2e35] rounded-full capitalize">
              {post.era.replace(/_/g, ' ')}
            </span>
            <span className="px-3 py-1 text-xs font-medium bg-[#2a2a30] text-[#a1a1aa] border border-[#2e2e35] rounded-full capitalize">
              {post.canon_status}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-semibold text-[#fafafa] mb-4 tracking-tight leading-tight">
            {t(post, "title", lang)}
          </h1>

          {/* Excerpt */}
          <p className="text-lg text-[#d4d4d8] mb-8 leading-relaxed">
            {t(post, "excerpt", lang)}
          </p>

          {/* Divider */}
          <div className="w-16 h-1 bg-amber-500 mb-8" />

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            {t(post, "content", lang).split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-[#d4d4d8] mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
          <h2 className="text-2xl font-semibold text-[#fafafa] mb-8 tracking-tight">
            Related Archives
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((related) => (
              <Link
                key={related.id}
                href={`/posts/${related.slug}`}
                className="group block bg-[#1c1c21] border border-[#2e2e35] rounded-lg overflow-hidden hover:border-amber-500/50 transition-all"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={related.image_url}
                    alt={t(related, "title", lang)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-[#fafafa] mb-2 group-hover:text-amber-400 transition-colors">
                    {t(related, "title", lang)}
                  </h3>
                  <p className="text-sm text-[#a1a1aa] line-clamp-2">
                    {t(related, "excerpt", lang)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
