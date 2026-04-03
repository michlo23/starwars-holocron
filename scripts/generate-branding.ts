#!/usr/bin/env tsx
import { mkdir, writeFile, readFile } from 'fs/promises';
import { join } from 'path';
import sharp from 'sharp';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const STYLE_BIBLE = "Cinematic digital concept art in the style of Star Wars universe. Dramatic volumetric lighting, deep shadows, rich atmospheric perspective. Color palette: deep space blacks, warm amber highlights, cool blue rim lighting, desaturated midtones. Painterly quality with sharp focal points. Epic scale, 16:9 cinematic composition. No text, no watermarks, no UI elements.";

const BRANDING_DIR = join(process.cwd(), 'public', 'images', 'branding');
const PUBLIC_DIR = join(process.cwd(), 'public');

interface BrandingAsset {
  name: string;
  prompt: string;
  size: '1024x1024' | '1536x1024' | '1024x1792';
  outputs: { path: string; width: number; height: number; format: 'webp' | 'png' | 'ico' }[];
}

const assets: BrandingAsset[] = [
  {
    name: 'Logo',
    prompt: `${STYLE_BIBLE} A glowing Jedi holocron floating in space, geometric crystalline shape with warm amber and gold energy emanating from within, subtle blue force energy accents, the holocron is ornate with ancient Jedi symbols etched on its surface, dramatic rim lighting, isolated on pure black background, centered composition, mystical and powerful artifact feel. Square format, clean design suitable for a logo mark.`,
    size: '1024x1024',
    outputs: [
      { path: join(BRANDING_DIR, 'logo.webp'), width: 512, height: 512, format: 'webp' },
      { path: join(BRANDING_DIR, 'logo-header.webp'), width: 200, height: 200, format: 'webp' },
    ],
  },
  {
    name: 'Favicon / Icon',
    prompt: `${STYLE_BIBLE} A simple geometric holocron icon, glowing amber and gold crystal pyramid shape with inner light, minimalist but recognizable at small sizes, clean edges, warm amber glow on pure black background, centered, simple iconic design suitable for a favicon or app icon. No complex details, bold silhouette.`,
    size: '1024x1024',
    outputs: [
      { path: join(PUBLIC_DIR, 'favicon.ico'), width: 32, height: 32, format: 'ico' },
      { path: join(BRANDING_DIR, 'icon-192.webp'), width: 192, height: 192, format: 'webp' },
      { path: join(BRANDING_DIR, 'icon-512.webp'), width: 512, height: 512, format: 'webp' },
    ],
  },
  {
    name: 'Hero Banner',
    prompt: `${STYLE_BIBLE} Epic panoramic vista of the Star Wars galaxy, sweeping nebula clouds in deep purples and blues, distant Star Destroyer silhouettes against a glowing star field, ancient Jedi temple ruins on a rocky asteroid in foreground, warm amber light from a binary sunset casting long shadows, Force energy trails connecting cosmic elements, incredibly wide cinematic composition with depth layers, atmospheric and awe-inspiring, sense of vast galactic scale and ancient history.`,
    size: '1536x1024',
    outputs: [
      { path: join(BRANDING_DIR, 'hero-banner.webp'), width: 1536, height: 878, format: 'webp' },
    ],
  },
  {
    name: 'OG Image',
    prompt: `${STYLE_BIBLE} A dramatic social media card composition featuring a glowing Jedi holocron artifact in the center foreground, behind it a panoramic Star Wars galaxy vista with nebula clouds, distant starships, and Force energy. Warm amber and gold tones dominate with cool blue accents. Clean lower third area suitable for text overlay. Rich atmospheric depth, cinematic lighting. The holocron is the hero element, emanating warm light that illuminates the scene. Wide format composition.`,
    size: '1536x1024',
    outputs: [
      { path: join(BRANDING_DIR, 'og-image.webp'), width: 1200, height: 630, format: 'webp' },
    ],
  },
];

async function generateImage(prompt: string, size: string): Promise<Buffer> {
  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-image-1.5',
      prompt,
      n: 1,
      size,
      quality: 'high',
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenAI API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const b64Data = data.data[0].b64_json;

  return Buffer.from(b64Data, 'base64');
}

async function processOutputs(
  sourceBuffer: Buffer,
  outputs: BrandingAsset['outputs'],
) {
  for (const out of outputs) {
    const dir = join(out.path, '..');
    await mkdir(dir, { recursive: true });

    if (out.format === 'ico') {
      // For .ico we create a 32x32 PNG and wrap it manually
      const pngBuf = await sharp(sourceBuffer)
        .resize(out.width, out.height, { fit: 'cover' })
        .png()
        .toBuffer();
      // Write as PNG first, then convert to ICO format
      // Simple ICO: just write the PNG with ICO header
      const ico = createIco(pngBuf, out.width, out.height);
      await writeFile(out.path, ico);
      console.log(`  ✓ ${out.path} (${out.width}x${out.height} ico)`);
    } else {
      const buf = await sharp(sourceBuffer)
        .resize(out.width, out.height, { fit: 'cover', position: 'center' })
        .webp({ quality: 88 })
        .toBuffer();
      await writeFile(out.path, buf);
      console.log(`  ✓ ${out.path} (${out.width}x${out.height} webp, ${(buf.length / 1024).toFixed(0)}KB)`);
    }
  }
}

function createIco(pngBuffer: Buffer, width: number, height: number): Buffer {
  // ICO file format:
  // Header (6 bytes) + Directory entry (16 bytes) + PNG data
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);        // Reserved
  header.writeUInt16LE(1, 2);        // Type: 1 = ICO
  header.writeUInt16LE(1, 4);        // Count: 1 image

  const dirEntry = Buffer.alloc(16);
  dirEntry.writeUInt8(width >= 256 ? 0 : width, 0);   // Width (0 = 256)
  dirEntry.writeUInt8(height >= 256 ? 0 : height, 1);  // Height (0 = 256)
  dirEntry.writeUInt8(0, 2);          // Color palette
  dirEntry.writeUInt8(0, 3);          // Reserved
  dirEntry.writeUInt16LE(1, 4);       // Color planes
  dirEntry.writeUInt16LE(32, 6);      // Bits per pixel
  dirEntry.writeUInt32LE(pngBuffer.length, 8);  // Size of image data
  dirEntry.writeUInt32LE(22, 12);     // Offset to image data (6 + 16)

  return Buffer.concat([header, dirEntry, pngBuffer]);
}

async function main() {
  if (!OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEY not set');
    process.exit(1);
  }

  console.log('🎨 Star Wars Holocron — Branding Asset Generator\n');
  console.log('='.repeat(50));

  await mkdir(BRANDING_DIR, { recursive: true });

  for (const [i, asset] of assets.entries()) {
    console.log(`\n[${i + 1}/${assets.length}] Generating: ${asset.name}`);
    try {
      const raw = await generateImage(asset.prompt, asset.size);
      console.log(`  ↓ Downloaded (${(raw.length / 1024).toFixed(0)}KB)`);
      await processOutputs(raw, asset.outputs);

      // Rate limit: 15s between requests
      if (i < assets.length - 1) {
        console.log('  ⏳ Rate-limit pause (15s)...');
        await new Promise(r => setTimeout(r, 15000));
      }
    } catch (err) {
      console.error(`  ✗ Failed:`, err);
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('🎉 Branding generation complete!');
}

main();
