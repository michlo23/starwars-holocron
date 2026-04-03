#!/usr/bin/env tsx
import { sql } from '../lib/db';
import { seedPosts, STYLE_BIBLE_PREFIX } from './seed-data';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import sharp from 'sharp';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error('OPENAI_API_KEY environment variable is required');
  process.exit(1);
}

async function generateImage(prompt: string, slug: string): Promise<string> {
  const fullPrompt = `${STYLE_BIBLE_PREFIX} ${prompt}`;
  
  console.log(`\n🎨 Generating image for ${slug}...`);
  console.log(`Prompt: ${prompt.substring(0, 100)}...`);

  const imagePath = join(process.cwd(), 'public', 'images', 'posts', `${slug}.webp`);
  await mkdir(join(process.cwd(), 'public', 'images', 'posts'), { recursive: true });

  // Check if image already exists (resume support)
  try {
    const { stat } = await import('fs/promises');
    await stat(imagePath);
    console.log(`  ⏭ Image already exists, skipping generation`);
    return `/images/posts/${slug}.webp`;
  } catch {}

  // Try up to 2 times — second attempt with softened prompt
  for (let attempt = 0; attempt < 2; attempt++) {
    const attemptPrompt = attempt === 0 ? fullPrompt : 
      `${STYLE_BIBLE_PREFIX} Peaceful atmospheric scene: ${prompt.replace(/war|battle|fighting|attack|destroy|weapon|lightsaber|ignited|fire|explosion|laser|death|kill|purge|siege/gi, 'adventure')}`;
    
    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-image-1.5',
          prompt: attemptPrompt,
          n: 1,
          size: '1536x1024',
          quality: 'high',
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        if (error.includes('moderation_blocked') && attempt === 0) {
          console.log(`  ⚠ Moderation blocked, retrying with softer prompt...`);
          await new Promise(r => setTimeout(r, 5000));
          continue;
        }
        throw new Error(`OpenAI API error: ${response.status} - ${error}`);
      }

      const data = await response.json();
      const b64Data = data.data[0].b64_json;

      console.log(`  ↓ Decoding image...`);
      const imageBuffer = Buffer.from(b64Data, 'base64');

      console.log(`  ⚙ Converting to WebP...`);
      const webpBuffer = await sharp(imageBuffer)
        .resize(1536, 1024, { fit: 'cover', position: 'center' })
        .webp({ quality: 85 })
        .toBuffer();

      await writeFile(imagePath, webpBuffer);
      console.log(`  ✓ Saved to /images/posts/${slug}.webp`);
      return `/images/posts/${slug}.webp`;
    } catch (error: any) {
      if (attempt === 1 || !error.message?.includes('moderation')) {
        // Generate placeholder
        console.log(`  ⚠ Using placeholder for ${slug}`);
        const placeholder = await sharp({
          create: { width: 1536, height: 1024, channels: 3, background: { r: 17, g: 17, b: 20 } }
        }).webp({ quality: 80 }).toBuffer();
        await writeFile(imagePath, placeholder);
        return `/images/posts/${slug}.webp`;
      }
    }
  }
  return `/images/posts/${slug}.webp`;
}

async function seedDatabase() {
  console.log('🌌 Star Wars Holocron Seeder\n');
  console.log('='.repeat(50));

  try {
    // Create tables if they don't exist
    console.log('\n📊 Setting up database schema...');
    await sql.file(join(process.cwd(), 'schema.sql'));
    console.log('✓ Database schema ready');

    // Process each post
    let successCount = 0;
    let failureCount = 0;

    for (const [index, post] of seedPosts.entries()) {
      console.log(`\n[${index + 1}/${seedPosts.length}] Processing: ${post.title_en}`);
      
      try {
        // Generate image
        const imageUrl = await generateImage(post.image_specific, post.slug);
        
        // Insert post
        await sql`
          INSERT INTO posts (
            slug, title_en, title_pl, content_en, content_pl,
            excerpt_en, excerpt_pl, category, image_url, image_prompt,
            era, canon_status, featured
          ) VALUES (
            ${post.slug},
            ${post.title_en},
            ${post.title_pl},
            ${post.content_en},
            ${post.content_pl},
            ${post.excerpt_en},
            ${post.excerpt_pl},
            ${post.category},
            ${imageUrl},
            ${STYLE_BIBLE_PREFIX + ' ' + post.image_specific},
            ${post.era},
            ${post.canon_status},
            ${post.featured}
          )
          ON CONFLICT (slug) DO UPDATE SET
            image_url = EXCLUDED.image_url,
            title_en = EXCLUDED.title_en,
            title_pl = EXCLUDED.title_pl
        `;
        
        console.log(`✓ Post saved to database`);
        successCount++;
        
        // Rate limiting - wait 10 seconds between requests
        if (index < seedPosts.length - 1) {
          console.log(`⏳ Waiting 10 seconds (rate limiting)...`);
          await new Promise(resolve => setTimeout(resolve, 10000));
        }
      } catch (error) {
        console.error(`✗ Failed to process ${post.slug}:`, error);
        failureCount++;
      }
    }

    console.log('\n' + '='.repeat(50));
    console.log(`\n🎉 Seeding complete!`);
    console.log(`✓ Successful: ${successCount}`);
    console.log(`✗ Failed: ${failureCount}`);
    console.log(`\n📊 Total posts in database: ${successCount}`);

  } catch (error) {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

seedDatabase();
