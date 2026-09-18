/**
 * Cuts an ambient loop out of a long video and encodes it for the web.
 *
 * THE BIG FILE NEVER ENTERS THE REPO. Point this at wherever the original sits —
 * Downloads, an external drive, anywhere — and only the few-hundred-kB loop it
 * produces is committed. A 20-minute 4K ceremony recording stays on your laptop.
 *
 *   npm i -D playwright            # not needed; ffmpeg is the only dependency
 *   brew install ffmpeg            # or: apt install ffmpeg
 *
 * 1. FIND THE MOMENT — writes a numbered still every 15s, named by timestamp, so
 *    you can flip through them in Finder instead of scrubbing:
 *
 *      node scripts/optimize-video.mjs ~/Downloads/ceremony.mov --contact-sheet
 *
 * 2. CUT IT — take the timestamp off the still you liked:
 *
 *      node scripts/optimize-video.mjs ~/Downloads/ceremony.mov \
 *        --start 4:15 --duration 8 --name engagement --pingpong
 *
 * Output lands in assets/video/ and is committed, so ffmpeg is not needed for a
 * normal `npm run build`.
 *
 * WHY A LOOP AND NOT THE WHOLE FILM: on the site this plays muted, on repeat, with
 * no controls — as motion behind the names rather than something a guest is asked to
 * sit and watch. So it wants to be short and seamless, and the audio track is dead
 * weight, so it is stripped (which also removes any doubt about autoplay: every
 * browser allows muted autoplay, none reliably allows it with sound).
 *
 * --pingpong plays the clip forwards then backwards, so the last frame is the first
 * frame and the loop never jumps. It doubles the on-screen length for the same
 * source, and it is the difference between an ambient loop and a visible stutter
 * every eight seconds. Use it unless the action reads wrong in reverse — someone
 * pouring, walking through a door, anything with a clear arrow of time.
 *
 * Outputs, for one --name:
 *   <name>-loop.mp4     H.264, the compatible one, plays everywhere
 *   <name>-loop.webm    VP9, usually ~30% smaller; browsers pick it when they can
 *   <name>-poster.webp  first frame, shown until the video can play
 *
 * Aim for under ~2 MB on the mp4. If it comes out heavy, shorten it before raising
 * the CRF — eight good seconds beat twenty soft ones.
 */
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdir, stat, readdir, rename, rm } from 'node:fs/promises';
import path from 'node:path';

const run = promisify(execFile);
const ROOT = new URL('..', import.meta.url).pathname;
const OUT = path.join(ROOT, 'assets/video');
const SHEET = path.join(ROOT, '.contact-sheet');

/* ── args ── */
const argv = process.argv.slice(2);
const input = argv.find((a) => !a.startsWith('--'));
const has = (n) => argv.includes(`--${n}`);
const flag = (n, d) => {
  const i = argv.indexOf(`--${n}`);
  return i === -1 || !argv[i + 1] || argv[i + 1].startsWith('--') ? d : argv[i + 1];
};
if (!input) {
  console.error(`usage:
  node scripts/optimize-video.mjs <input> --contact-sheet [--every 15]
  node scripts/optimize-video.mjs <input> [--start 0] [--duration 8] [--name clip] [--width 1280] [--pingpong]`);
  process.exit(1);
}

const ffmpeg = process.env.FFMPEG_PATH || 'ffmpeg';
try {
  await run(ffmpeg, ['-version']);
} catch {
  console.error(`Could not run "${ffmpeg}". Install ffmpeg (brew install ffmpeg), or set FFMPEG_PATH to it.`);
  process.exit(1);
}

const kB = async (f) => `${((await stat(f)).size / 1024).toFixed(0)} kB`;
const hms = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}-${String(s % 60).padStart(2, '0')}`;

/* ── 1. contact sheet ── */
if (has('contact-sheet')) {
  const every = Number(flag('every', '15'));
  await rm(SHEET, { recursive: true, force: true });
  await mkdir(SHEET, { recursive: true });
  // fps=1/every gives one frame per `every` seconds, in order, so frame N is at
  // (N-1) * every seconds — which is what the rename below turns into the filename.
  await run(ffmpeg, ['-y', '-i', input, '-vf', `fps=1/${every},scale=640:-2`, '-q:v', '4',
    path.join(SHEET, 'f%04d.jpg')]);
  const frames = (await readdir(SHEET)).filter((f) => f.endsWith('.jpg')).sort();
  for (const f of frames) {
    const n = Number(f.match(/(\d+)/)[1]);
    await rename(path.join(SHEET, f), path.join(SHEET, `t${hms((n - 1) * every)}.jpg`));
  }
  console.log(`  ${frames.length} stills, one every ${every}s → ${path.relative(process.cwd(), SHEET)}/`);
  console.log(`  Each is named for its timestamp: t01-30.jpg is 1:30.`);
  console.log(`  Pick one, then re-run with --start <that timestamp> --duration 8 --pingpong`);
  process.exit(0);
}

/* ── 2. encode the loop ── */
const start = flag('start', '0');
const duration = flag('duration', '8');
const name = flag('name', 'clip');
const width = flag('width', '1280');
const pingpong = has('pingpong');

await mkdir(OUT, { recursive: true });

// -ss before -i seeks by keyframe (fast). -an drops the audio. Scale to an even
// height because H.264 in yuv420p requires it.
const trim = ['-y', '-ss', start, '-t', duration, '-i', input, '-an'];
// reverse buffers the segment in memory — fine at eight seconds, do not point this
// at a whole film.
const video = pingpong
  ? ['-filter_complex', `[0:v]scale=${width}:-2,split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1[v]`, '-map', '[v]']
  : ['-vf', `scale=${width}:-2`];

const mp4 = path.join(OUT, `${name}-loop.mp4`);
await run(ffmpeg, [...trim, ...video,
  '-c:v', 'libx264', '-profile:v', 'high', '-crf', '26', '-preset', 'slow',
  '-pix_fmt', 'yuv420p', '-movflags', '+faststart', mp4]);
console.log(`  ${path.basename(mp4).padEnd(26)} ${await kB(mp4)}`);

const webm = path.join(OUT, `${name}-loop.webm`);
await run(ffmpeg, [...trim, ...video,
  '-c:v', 'libvpx-vp9', '-crf', '34', '-b:v', '0', '-row-mt', '1', webm]);
console.log(`  ${path.basename(webm).padEnd(26)} ${await kB(webm)}`);

const poster = path.join(OUT, `${name}-poster.webp`);
await run(ffmpeg, ['-y', '-ss', start, '-i', input, '-frames:v', '1',
  '-vf', `scale=${width}:-2`, '-quality', '80', poster]);
console.log(`  ${path.basename(poster).padEnd(26)} ${await kB(poster)}`);

console.log(`\n${pingpong ? `loops seamlessly (${Number(duration) * 2}s on screen)` : 'add --pingpong if the loop visibly jumps when it restarts'}`);
