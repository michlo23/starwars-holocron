#!/usr/bin/env tsx
import { seedPosts, STYLE_BIBLE_PREFIX } from './seed-data';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import sharp from 'sharp';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;

const placeholders = ['chosen-one-prophecy', 'darth-revan', 'mandalore', 'siege-of-mandalore'];
const posts = seedPosts.filter(p => placeholders.includes(p.slug));

// Softer prompts to avoid moderation
const safePrompts: Record<string, string> = {
  'darth-revan': 'Mysterious figure in iconic red and black mask standing in ancient temple, dramatic backlighting, ceremonial robes flowing, Star Wars cinematic style',
  'mandalore': 'Arid desert planet with ancient architectural ruins, traditional armor displayed on monument, sunset golden hour lighting, vast wasteland horizon',
  'siege-of-mandalore': 'Clone troopers in distinctive blue armor standing in destroyed city streets at dusk, smoke and atmospheric lighting, Star Wars aesthetic',
  'chosen-one-prophecy': 'Ancient temple chamber with mystical glowing symbols on walls, hooded figure in meditation pose, ethereal light beams, mysterious atmosphere'
};

async function generateImage(slug: string, prompt: string): Promise<void> {
  console.log(`\n🎨 Regenerating ${slug}...`);
  const fullPrompt = `${STYLE_BIBLE_PREFIX} ${prompt}`;
  
  try {
    const res = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-image-1.5',
        prompt: fullPrompt,
        n: 1,
        size: '1536x1024',
        quality: 'high'
      })
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`API error: ${res.status} - ${error}`);
    }

    const data = await res.json();
    const buf = Buffer.from(data.data[0].b64_json, 'base64');
    const webp = await sharp(buf)
      .resize(1536, 1024, { fit: 'cover' })
      .webp({ quality: 85 })
      .toBuffer();

    const path = join(process.cwd(), 'public', 'images', 'posts', `${slug}.webp`);
    await writeFile(path, webp);
    console.log(`  ✓ Saved (${Math.round(webp.length / 1024)}KB)`);
    
    await new Promise(r => setTimeout(r, 12000)); // 12s between calls
  } catch (e: any) {
    console.error(`  ✗ Failed:`, e.message);
    throw e;
  }
}

async function main() {
  for (const slug of placeholders) {
    await generateImage(slug, safePrompts[slug]);
  }
  console.log('\n✅ All placeholders regenerated!');
}

main().catch(e => { console.error(e); process.exit(1); });
