#!/usr/bin/env tsx
import { sql } from '../lib/db';
import { seedPosts, STYLE_BIBLE_PREFIX } from './seed-data';
import { mkdir, writeFile, stat } from 'fs/promises';
import { join } from 'path';
import sharp from 'sharp';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;

async function main() {
  const existing = await sql`SELECT slug FROM posts`;
  const existingSlugs = new Set(existing.map(r => r.slug));
  const remaining = seedPosts.filter(p => !existingSlugs.has(p.slug));
  
  console.log(`Found ${existing.length} existing posts, ${remaining.length} remaining`);
  
  for (const post of remaining) {
    console.log(`\nProcessing: ${post.slug}`);
    const imagePath = join(process.cwd(), 'public', 'images', 'posts', `${post.slug}.webp`);
    await mkdir(join(process.cwd(), 'public', 'images', 'posts'), { recursive: true });

    let imageUrl = `/images/posts/${post.slug}.webp`;
    
    let hasImage = false;
    try { await stat(imagePath); hasImage = true; console.log('  Image exists'); } catch {}
    
    if (!hasImage) {
      const prompt = `${STYLE_BIBLE_PREFIX} ${post.image_specific}`;
      try {
        const res = await fetch('https://api.openai.com/v1/images/generations', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ model: 'gpt-image-1.5', prompt, n: 1, size: '1536x1024', quality: 'high' })
        });
        if (!res.ok) {
          console.log('  API error, placeholder');
          const ph = await sharp({ create: { width: 1536, height: 1024, channels: 3, background: { r: 17, g: 17, b: 20 } } }).webp().toBuffer();
          await writeFile(imagePath, ph);
        } else {
          const data = await res.json();
          const buf = Buffer.from(data.data[0].b64_json, 'base64');
          const webp = await sharp(buf).resize(1536, 1024, { fit: 'cover' }).webp({ quality: 85 }).toBuffer();
          await writeFile(imagePath, webp);
          console.log('  ✓ Image generated');
        }
      } catch (e: any) {
        console.log('  Error:', e.message, '- placeholder');
        const ph = await sharp({ create: { width: 1536, height: 1024, channels: 3, background: { r: 17, g: 17, b: 20 } } }).webp().toBuffer();
        await writeFile(imagePath, ph);
      }
      await new Promise(r => setTimeout(r, 10000));
    }

    await sql`INSERT INTO posts (slug, title_en, title_pl, content_en, content_pl, excerpt_en, excerpt_pl, category, image_url, image_prompt, era, canon_status, featured)
      VALUES (${post.slug}, ${post.title_en}, ${post.title_pl}, ${post.content_en}, ${post.content_pl}, ${post.excerpt_en}, ${post.excerpt_pl}, ${post.category}, ${imageUrl}, ${STYLE_BIBLE_PREFIX + ' ' + post.image_specific}, ${post.era}, ${post.canon_status}, ${post.featured})
      ON CONFLICT (slug) DO UPDATE SET image_url = EXCLUDED.image_url`;
    console.log('  ✓ DB saved');
  }
  
  const total = await sql`SELECT COUNT(*) FROM posts`;
  console.log(`\n✅ Done! Total posts: ${total[0].count}`);
  await sql.end();
}

main().catch(e => { console.error(e); process.exit(1); });
