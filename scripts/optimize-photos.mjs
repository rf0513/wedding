/**
 * Turns the couple's original photos into the optimised WebP files that ship with the
 * site. Source photos live in a separate repo so the originals stay full-resolution:
 *
 *   git clone https://github.com/rf0513/pavitra-and-ramon-wedding ../pavitra-and-ramon-wedding
 *   npm i -D sharp && node scripts/optimize-photos.mjs ../pavitra-and-ramon-wedding
 *
 * Output lands in assets/photos/ and is committed, so neither sharp nor the photo repo
 * is needed for a normal `npm run build`.
 *
 * TWO WAYS IN:
 *
 *  1. Photos with a fixed job on the site (a hero frame, a story milestone) are listed
 *     in PHOTOS below, so their name and widths stay stable and the imports in
 *     constants.ts keep resolving.
 *
 *  2. Anything dropped into a `gallery/` folder inside the photo repo is picked up
 *     automatically — no edit here. Each one is emitted at three widths plus a square
 *     thumbnail, and gallery-manifest.json is written next to them so the site can
 *     import the whole set without anyone maintaining a list by hand.
 */
import sharp from 'sharp';
import { mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SRC = process.argv[2] ?? '../pavitra-and-ramon-wedding';
const OUT = new URL('../assets/photos/', import.meta.url).pathname;
const GALLERY_SRC = path.join(SRC, 'gallery');
const GALLERY_OUT = path.join(OUT, 'gallery');

const GALLERY_WIDTHS = [640, 1280, 1920];
const THUMB = 480;
const IMAGE_RE = /\.(jpe?g|png|webp|avif|tiff?|heic)$/i;

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

/* ── gallery/: whatever is in there, at three widths plus a thumbnail ── */
const galleryFiles = await readdir(GALLERY_SRC).catch(() => null);
if (!galleryFiles) {
  console.log(`\n  (no ${path.relative(process.cwd(), GALLERY_SRC)} folder — skipping the gallery)`);
} else {
  const photos = galleryFiles.filter((f) => IMAGE_RE.test(f)).sort();
  console.log(`\ngallery — ${photos.length} photo${photos.length === 1 ? '' : 's'}`);
  await mkdir(GALLERY_OUT, { recursive: true });
  const manifest = [];

  for (const file of photos) {
    const input = path.join(GALLERY_SRC, file);
    const slug = file.replace(IMAGE_RE, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    // .rotate() first so EXIF-rotated phone photos report the dimensions they will
    // actually display at, not the sensor's.
    const meta = await sharp(input).rotate().metadata();
    const targets = [...new Set(GALLERY_WIDTHS.map((w) => Math.min(w, meta.width ?? w)))];
    const entry = { slug, width: meta.width ?? 0, height: meta.height ?? 0, srcSet: {}, thumb: `${slug}-thumb.webp` };

    for (const target of targets) {
      const name = `${slug}-${target}.webp`;
      const info = await sharp(input).rotate()
        .resize({ width: target, withoutEnlargement: true })
        .webp({ quality: 78, effort: 6 })
        .toFile(path.join(GALLERY_OUT, name));
      entry.srcSet[target] = name;
      total += info.size;
    }
    const tInfo = await sharp(input).rotate()
      .resize(THUMB, THUMB, { fit: 'cover', position: 'attention' })  // crop toward the faces
      .webp({ quality: 74, effort: 6 })
      .toFile(path.join(GALLERY_OUT, entry.thumb));
    total += tInfo.size;

    manifest.push(entry);
    console.log(`  ${slug.padEnd(28)} ${targets.join('/')}px + thumb`);
  }

  await writeFile(path.join(GALLERY_OUT, 'gallery-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  console.log(`  → gallery-manifest.json (${manifest.length} entries)`);
}

console.log(`\ntotal shipped: ${(total / 1024 / 1024).toFixed(2)} MB`);
