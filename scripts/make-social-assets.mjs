/**
 * Generates the share card and the raster icons, so a link to the site shows a real
 * preview in WhatsApp / iMessage / Slack instead of a bare URL.
 *
 *   npm i -D playwright sharp && node scripts/make-social-assets.mjs
 *
 * Outputs (all committed, so a normal `npm run build` needs neither dependency):
 *   public/og-image.jpg     1200x630 share card
 *   public/icon-192.png     192x192  PWA / Android
 *   public/icon-180.png     180x180  apple-touch-icon
 *   public/icon-32.png      32x32    classic tab favicon fallback
 *
 * They live in public/ rather than assets/ because og:image must be an absolute,
 * stable URL — a crawler cannot follow a content hash that changes every build.
 *
 * The card is composed in the browser from the same photo, fonts and ornaments the
 * hero uses, then screenshotted — so it stays in step with the site's look by
 * construction rather than by somebody remembering to re-export a PNG.
 */
import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const OUT = path.join(ROOT, 'public');
await mkdir(OUT, { recursive: true });

/* ── Icons: rasterise the SVG favicon for the platforms that will not take one ── */
const svg = await readFile(path.join(OUT, 'favicon.svg')); // hand-drawn source
for (const size of [192, 180, 32]) {
  const file = path.join(OUT, `icon-${size}.png`);
  await sharp(svg, { density: 384 }).resize(size, size).png().toFile(file);
  console.log(`  ${path.basename(file).padEnd(16)} ${size}x${size}`);
}

/* ── Share card ── */
const photo = await readFile(path.join(ROOT, 'assets/photos/engagement-hug-1920.webp'));
const photoUri = `data:image/webp;base64,${photo.toString('base64')}`;

// Brass ray fan, same construction as <RayFan> in components/Ornaments.tsx.
const rays = Array.from({ length: 64 }, (_, i) => {
  const a = -90 + (i - 31.5) * (190 / 64);
  const rad = (a * Math.PI) / 180;
  return `M600 900 L${(600 + 1400 * Math.cos(rad)).toFixed(1)} ${(900 + 1400 * Math.sin(rad)).toFixed(1)}`;
}).join(' ');

const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Marcellus&family=Josefin+Sans:wght@300;600&family=Cormorant+Garamond:ital@1&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:1200px;height:630px;overflow:hidden;background:#0C0B0A;position:relative;font-kerning:normal}
  .photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 28%;
    filter:grayscale(1) sepia(.5) hue-rotate(-8deg) saturate(1.15) brightness(.72) contrast(1.12)}
  .wash{position:absolute;inset:0;background:linear-gradient(180deg,rgba(12,11,10,.68) 0%,rgba(12,11,10,.26) 38%,rgba(12,11,10,.88) 84%,#0C0B0A 100%)}
  .rays{position:absolute;left:0;top:0;width:1200px;height:630px;opacity:.34;
    -webkit-mask-image:radial-gradient(ellipse 46% 62% at 50% 62%,transparent 30%,#000 78%)}
  .frame{position:absolute;inset:18px;border:1.5px solid rgba(200,167,92,.75)}
  .frame::after{content:'';position:absolute;inset:6px;border:1px solid rgba(200,167,92,.35)}
  .corner{position:absolute;width:30px;height:30px;background:#C8A75C;
    clip-path:polygon(0 0,100% 0,100% 34%,66% 34%,66% 66%,34% 66%,34% 100%,0 100%)}
  .inner{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 60px}
  .kicker{font-family:'Josefin Sans',sans-serif;font-weight:600;font-size:17px;letter-spacing:.46em;
    text-transform:uppercase;color:#C8A75C;margin:22px 0 14px;text-indent:.46em}
  h1{font-family:Marcellus,serif;font-weight:400;font-size:118px;line-height:.96;letter-spacing:.05em;
    text-transform:uppercase;color:#F2EFE9}
  .amp{display:block;font-family:'Cormorant Garamond',serif;font-style:italic;font-size:.44em;
    line-height:1.3;text-transform:none;color:#E2C88A}
  .rule{display:flex;align-items:center;justify-content:center;gap:16px;margin-top:30px}
  .rule i{display:block;width:74px;height:1px;background:#C8A75C}
  .rule b{display:block;width:9px;height:9px;background:#C8A75C;transform:rotate(45deg)}
  .dates{font-family:'Josefin Sans',sans-serif;font-weight:300;font-size:22px;letter-spacing:.28em;
    text-transform:uppercase;color:#F2EFE9;text-indent:.28em}
  .place{font-family:'Josefin Sans',sans-serif;font-weight:300;font-size:16px;letter-spacing:.34em;
    text-transform:uppercase;color:#E2C88A;margin-top:15px;text-indent:.34em}
</style></head><body>
  <img class="photo" src="${photoUri}">
  <div class="wash"></div>
  <svg class="rays" viewBox="0 0 1200 630"><path d="${rays}" stroke="#C8A75C" stroke-width="1.1"/></svg>
  <div class="frame">
    <span class="corner" style="left:-1px;top:-1px"></span>
    <span class="corner" style="right:-1px;top:-1px;transform:scaleX(-1)"></span>
    <span class="corner" style="left:-1px;bottom:-1px;transform:scaleY(-1)"></span>
    <span class="corner" style="right:-1px;bottom:-1px;transform:scale(-1)"></span>
  </div>
  <div class="inner">
    <svg width="76" height="41" viewBox="-52 -52 104 56">
      <path d="${Array.from({ length: 19 }, (_, i) => {
        const a = ((-90 + i * 10 - 90) * Math.PI) / 180;
        const len = i % 3 === 0 ? 46 : i % 3 === 1 ? 36 : 40;
        return `M${(24 * Math.cos(a)).toFixed(1)} ${(24 * Math.sin(a)).toFixed(1)} L${(len * Math.cos(a)).toFixed(1)} ${(len * Math.sin(a)).toFixed(1)}`;
      }).join(' ')}" stroke="#C8A75C" stroke-width="1.3" stroke-linecap="round"/>
      <path d="M-20 0 A20 20 0 0 1 20 0 Z" fill="#C8A75C"/>
      <path d="M-52 0 H52" stroke="#C8A75C" stroke-width="1.2"/>
      <path d="M-46 3.5 H46" stroke="#C8A75C" stroke-width=".7" stroke-opacity=".7"/>
    </svg>
    <p class="kicker">The Wedding Of</p>
    <h1>Pavitra<span class="amp">&amp;</span>Ramon</h1>
    <div class="rule"><i></i><b></b><span class="dates">2 &ndash; 5 February 2027</span><b></b><i></i></div>
    <p class="place">Mumbai &middot; India</p>
  </div>
</body></html>`;

// CHROMIUM_PATH / HTTPS_PROXY are escape hatches for sandboxed or proxied machines;
// on a normal laptop neither is set and Playwright's own Chromium is used directly.
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
  proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY, bypass: '127.0.0.1,localhost' } : undefined,
});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2, ignoreHTTPSErrors: true });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(400);
const png = await page.screenshot({ type: 'png' });
await browser.close();

// JPEG at 2x downscaled to 1200x630: smaller than PNG and universally previewable.
const file = path.join(OUT, 'og-image.jpg');
const info = await sharp(png).resize(1200, 630).jpeg({ quality: 88, mozjpeg: true }).toFile(file);
console.log(`  ${path.basename(file).padEnd(16)} 1200x630  ${(info.size / 1024).toFixed(0)} kB`);
