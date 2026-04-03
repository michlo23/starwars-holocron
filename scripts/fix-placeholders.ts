#!/usr/bin/env tsx
import { writeFile } from 'fs/promises';
import { join } from 'path';
import sharp from 'sharp';

const STYLE = 'Cinematic digital concept art in the style of Star Wars universe. Dramatic volumetric lighting, deep shadows, rich atmospheric perspective. Color palette: deep space blacks, warm amber highlights, cool blue rim lighting, desaturated midtones. Painterly quality with sharp focal points. Epic scale, 16:9 cinematic composition. No text, no watermarks, no UI elements.';

const prompts: Record<string, string> = {
  'darth-revan': 'Hooded traveler in flowing robes standing before ancient star map hologram, mysterious silhouette, purple nebula glow in background, peaceful meditation pose',
  'mandalore': 'Desert canyon landscape with distant city domes under twin suns, sandy dunes and rocky outcrops, warm golden lighting, serene frontier atmosphere',
  'siege-of-mandalore': 'Futuristic city streets at twilight with geometric architecture, empty plaza with dramatic shadows, cinematic urban environment, atmospheric fog'
};

async function main() {
  for (const [slug, shortPrompt] of Object.entries(prompts)) {
    console.log(`\n🎨 ${slug}...`);
    try {
      const res = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'gpt-image-1.5', prompt: `${STYLE} ${shortPrompt}`, n: 1, size: '1536x1024', quality: 'high' })
      });
      if (!res.ok) { 
        console.log(`  ✗ API error: ${res.status}`);
        continue;
      }
      const data = await res.json();
      const buf = Buffer.from(data.data[0].b64_json, 'base64');
      const webp = await sharp(buf).resize(1536, 1024, { fit: 'cover' }).webp({ quality: 85 }).toBuffer();
      await writeFile(join(process.cwd(), 'public/images/posts', `${slug}.webp`), webp);
      console.log(`  ✓ ${Math.round(webp.length/1024)}KB`);
      await new Promise(r => setTimeout(r, 12000));
    } catch (e: any) {
      console.log(`  ✗ ${e.message}`);
    }
  }
  console.log('\n✅ Done');
}

main();
