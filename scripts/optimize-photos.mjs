/**
 * Turns the couple's original photos into the optimised WebP files that ship with the
 * site. Source photos live in a separate repo so the originals stay full-resolution:
 *
 *   git clone https://github.com/rf0513/pavitra-and-ramon-wedding ../pavitra-and-ramon-wedding
 *   npm i -D sharp && node scripts/optimize-photos.mjs ../pavitra-and-ramon-wedding
 *
 * Output lands in assets/photos/ and is committed, so neither sharp nor the photo repo
 * is needed for a normal `npm run build`.
 */
import sharp from 'sharp';
import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';

const SRC = process.argv[2] ?? '../pavitra-and-ramon-wedding';
const OUT = new URL('../assets/photos/', import.meta.url).pathname;

// widths to emit per photo — heroes get two so phones can pick the small one
const PHOTOS = [
  { file: 'engagement-hug.jpg', name: 'engagement-hug', widths: [1280, 1920] },
  { file: 'engagement-hands.jpg', name: 'engagement-hands', widths: [1280, 1920] },
  { file: 'proposal.jpg', name: 'proposal', widths: [1280, 1920] },
  { file: 'boat.jpeg', name: 'boat', widths: [1280, 1920] },
  { file: 'tram.jpeg', name: 'tram', widths: [1520] },
  { file: 'rockies.jpeg', name: 'rockies', widths: [1520] },
  { file: 'mackinac.jpeg', name: 'mackinac', widths: [1520] },
  { file: 'siddhivinayak-temple-mumbai.jpg', name: 'siddhivinayak', widths: [800] },
  { file: 'yellow-kurta.png', name: 'yellow-kurta', widths: [640] },
];

await mkdir(OUT, { recursive: true });
const available = new Set(await readdir(SRC));
let total = 0;

for (const { file, name, widths } of PHOTOS) {
  if (!available.has(file)) {
    console.warn(`  ⚠ missing in ${SRC}: ${file} — skipped`);
    continue;
  }
  const input = path.join(SRC, file);
  const meta = await sharp(input).metadata();
  // A photo narrower than the widest tier would emit byte-identical files — collapse
  // those so we never ship the same pixels twice under two names.
  const targets = [...new Set(widths.map((w) => Math.min(w, meta.width ?? w)))];
  for (const target of targets) {
    const out = path.join(OUT, targets.length > 1 ? `${name}-${target}.webp` : `${name}.webp`);
    const info = await sharp(input)
      .rotate()                                  // honour EXIF orientation
      .resize({ width: target, withoutEnlargement: true })
      .webp({ quality: 78, effort: 6 })
      .toFile(out);
    total += info.size;
    console.log(`  ${path.basename(out).padEnd(28)} ${String(target).padStart(5)}px  ${(info.size / 1024).toFixed(0)} kB`);
  }
}
console.log(`\ntotal shipped: ${(total / 1024 / 1024).toFixed(2)} MB`);
