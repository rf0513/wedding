/**
 * Cuts an ambient loop out of a long video and encodes it for the web.
 *
 *   node scripts/optimize-video.mjs <input> --start 1:24 --duration 8 --name engagement
 *
 * Needs ffmpeg on PATH (brew install ffmpeg / apt install ffmpeg). Output lands in
 * assets/video/ and is committed, so ffmpeg is not needed for a normal `npm run build`.
 *
 * WHY A LOOP AND NOT THE WHOLE FILM: on the site this plays muted, on repeat, with no
 * controls — as motion behind the names rather than something a guest is asked to sit
 * and watch. That means it wants to be short and seamless, and it means the audio track
 * is dead weight, so it is stripped (which also removes any doubt about autoplay: every
 * browser allows muted autoplay, none reliably allows it with sound).
 *
 * Outputs, for one --name:
 *   <name>-loop.mp4     H.264, the compatible one, plays everywhere
 *   <name>-loop.webm    VP9, usually ~30% smaller; browsers pick it when they can
 *   <name>-poster.webp  first frame, shown until the video can play
 *
 * Aim for under ~2 MB on the mp4. If it comes out heavy, shorten it before raising the
 * CRF — eight good seconds beat twenty soft ones.
 */
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';

const run = promisify(execFile);
const OUT = new URL('../assets/video/', import.meta.url).pathname;

/* ── args ── */
const argv = process.argv.slice(2);
const input = argv.find((a) => !a.startsWith('--'));
const flag = (n, d) => {
  const i = argv.indexOf(`--${n}`);
  return i === -1 ? d : argv[i + 1];
};
if (!input) {
  console.error('usage: node scripts/optimize-video.mjs <input> [--start 0] [--duration 8] [--name clip] [--width 1280]');
  process.exit(1);
}
const start = flag('start', '0');
const duration = flag('duration', '8');
const name = flag('name', 'clip');
const width = flag('width', '1280');

const ffmpeg = process.env.FFMPEG_PATH || 'ffmpeg';
try {
  await run(ffmpeg, ['-version']);
} catch {
  console.error(`Could not run "${ffmpeg}". Install ffmpeg, or set FFMPEG_PATH to it.`);
  process.exit(1);
}

await mkdir(OUT, { recursive: true });
const kB = async (f) => `${((await stat(f)).size / 1024).toFixed(0)} kB`;

// -ss before -i seeks by keyframe (fast); scale to an even height because H.264 in
// yuv420p requires it. -an drops the audio. +faststart moves the index to the front so
// playback can begin before the whole file has arrived.
const common = ['-y', '-ss', start, '-t', duration, '-i', input, '-an', '-vf', `scale=${width}:-2`];

const mp4 = path.join(OUT, `${name}-loop.mp4`);
await run(ffmpeg, [...common,
  '-c:v', 'libx264', '-profile:v', 'high', '-crf', '26', '-preset', 'slow',
  '-pix_fmt', 'yuv420p', '-movflags', '+faststart', mp4]);
console.log(`  ${path.basename(mp4).padEnd(26)} ${await kB(mp4)}`);

const webm = path.join(OUT, `${name}-loop.webm`);
await run(ffmpeg, [...common,
  '-c:v', 'libvpx-vp9', '-crf', '34', '-b:v', '0', '-row-mt', '1', webm]);
console.log(`  ${path.basename(webm).padEnd(26)} ${await kB(webm)}`);

const poster = path.join(OUT, `${name}-poster.webp`);
await run(ffmpeg, ['-y', '-ss', start, '-i', input, '-frames:v', '1',
  '-vf', `scale=${width}:-2`, '-quality', '80', poster]);
console.log(`  ${path.basename(poster).padEnd(26)} ${await kB(poster)}`);
