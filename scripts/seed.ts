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
  
  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: fullPrompt,
        n: 1,
        size: '1792x1024',
        quality: 'hd',
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    const imageUrl = data.data[0].url;

    // Download image
    console.log(`  ↓ Downloading image...`);
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

    // Convert to WebP and optimize
    console.log(`  ⚙ Converting to WebP...`);
    const webpBuffer = await sharp(imageBuffer)
      .resize(1536, 1024, { fit: 'cover', position: 'center' })
      .webp({ quality: 85 })
      .toBuffer();

    // Save to public/images/posts/
    const imagePath = join(process.cwd(), 'public', 'images', 'posts', `${slug}.webp`);
    await mkdir(join(process.cwd(), 'public', 'images', 'posts'), { recursive: true });
    await writeFile(imagePath, webpBuffer);

    console.log(`  ✓ Saved to /images/posts/${slug}.webp`);
    return `/images/posts/${slug}.webp`;
  } catch (error) {
    console.error(`  ✗ Failed to generate image for ${slug}:`, error);
    throw error;
  }
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
            ${STYLE_BIBLE_PREFIX} ${post.image_specific},
            ${post.era},
            ${post.canon_status},
            ${post.featured}
          )
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
