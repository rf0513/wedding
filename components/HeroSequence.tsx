import React, { useEffect, useMemo, useRef, useState } from 'react';
import { HERO_IMAGES } from '../constants';
import { usePrefersReducedMotion } from './DecoUI';

/**
 * Slow auto-advancing hero sequence (crossfade, ~4.5s per frame) behind the Home hero.
 * Keeps the duotone filter + parallax from the original single-image hero.
 *
 * - Frames are loaded one ahead of the one on screen, never all at once (they are big).
 * - A frame only advances once the next one has actually loaded, so there is never a
 *   fade to blank on a slow connection.
 * - Pauses while the tab is hidden.
 * - prefers-reduced-motion: shows the first photo only, no crossfade, no parallax.
 *
 * One frame is a silent video loop rather than a photo. It plays muted, on repeat,
 * with no controls — motion behind the names, not something a guest is asked to sit
 * and watch. It is dropped entirely on a metered or slow connection and under reduced
 * motion, and its poster stands in if it fails, so the sequence is never blank.
 *
 * To add frames, edit HERO_IMAGES in constants.ts.
 */

const HOLD_MS = 4500;   // time each frame is held, unless it sets its own `hold`
const FADE_MS = 1600;   // crossfade duration

const DUOTONE = 'grayscale(1) sepia(.5) hue-rotate(-8deg) saturate(1.15) brightness(.78) contrast(1.15)';

/**
 * Half a megabyte of video is a fair trade on wifi and a rude one on a train in
 * Mumbai. Guests told us to save data, or on a 2G/3G-class connection, get the
 * poster instead — the sequence just treats that frame as a photo.
 */
function useAllowVideo() {
  const [allow, setAllow] = useState(true);
  useEffect(() => {
    const c = (navigator as any).connection;
    if (!c) return;                       // Safari/Firefox: no signal, assume it's fine
    const check = () => setAllow(!c.saveData && !/^(slow-)?2g$|^3g$/.test(c.effectiveType ?? ''));
    check();
    c.addEventListener?.('change', check);
    return () => c.removeEventListener?.('change', check);
  }, []);
  return allow;
}

const HeroSequence: React.FC<{ alt?: string }> = ({ alt = 'Pavitra and Ramon' }) => {
  const reduced = usePrefersReducedMotion();
  const allowVideo = useAllowVideo();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  // Indices that have been mounted so far (grows as the sequence advances).
  const [mounted, setMounted] = useState<number[]>(HERO_IMAGES.length > 1 ? [0, 1] : [0]);
  const loaded = useRef<Set<number>>(new Set());
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});
  const n = HERO_IMAGES.length;

  // A frame plays video only if it has one AND the connection can afford it.
  const playsVideo = useMemo(
    () => (i: number) => Boolean(HERO_IMAGES[i].video) && allowVideo && !reduced,
    [allowVideo, reduced]
  );

  // Parallax (same as the original hero image).
  useEffect(() => {
    if (reduced) return;
    const onScroll = () => {
      const el = wrapRef.current;
      if (el) el.style.transform = `translateY(${Math.min(window.scrollY, 900) * 0.28}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [reduced]);

  // Advance loop.
  useEffect(() => {
    if (reduced || n < 2) return;
    let timer = 0;
    const tick = () => {
      if (document.visibilityState === 'hidden') { timer = window.setTimeout(tick, 1000); return; }
      const next = (active + 1) % n;
      if (loaded.current.has(next)) {
        setActive(next);
      } else {
        // Not ready yet — check again shortly rather than fading to nothing.
        timer = window.setTimeout(tick, 400);
      }
    };
    // A video frame holds long enough to play through rather than cutting mid-loop.
    timer = window.setTimeout(tick, (playsVideo(active) && HERO_IMAGES[active].hold) || HOLD_MS);
    return () => clearTimeout(timer);
  }, [active, reduced, n, playsVideo]);

  // Keep one frame mounted (and therefore loading) ahead of the active one.
  useEffect(() => {
    const ahead = (active + 1) % n;
    setMounted((m) => (m.includes(ahead) ? m : [...m, ahead]));
  }, [active, n]);

  // Only the frame on screen runs; the rest rewind and sit still so we are not
  // decoding video behind a photo.
  useEffect(() => {
    Object.keys(videoRefs.current).forEach((k) => {
      const el = videoRefs.current[Number(k)];
      if (!el) return;
      if (Number(k) === active) {
        el.play().catch(() => {/* autoplay refused; the poster is already showing */});
      } else {
        el.pause();
        el.currentTime = 0;
      }
    });
  }, [active, mounted]);

  const frames = reduced ? [0] : mounted;

  return (
    <div ref={wrapRef} className="absolute left-0 -top-[6%] w-full h-[82%] will-change-transform">
      {frames.map((i) => {
        const frame = HERO_IMAGES[i];
        const isActive = i === active;
        const shared = {
          className: 'absolute inset-0 w-full h-full object-cover',
          style: {
            objectPosition: frame.objectPosition || 'center 30%',
            filter: DUOTONE,
            opacity: isActive ? 1 : 0,
            transition: reduced ? 'none' : `opacity ${FADE_MS}ms ease-in-out`,
          } as React.CSSProperties,
        };

        if (playsVideo(i)) {
          return (
            <video
              key={frame.src}
              ref={(el) => { videoRefs.current[i] = el; }}
              poster={frame.src}
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden
              // canplaythrough, not canplay: the advance loop waits on this, and we
              // want the whole loop buffered before it goes on screen.
              onCanPlayThrough={() => loaded.current.add(i)}
              // If the video will not decode, the poster stays and the sequence
              // carries on as if this were a photo.
              onError={() => loaded.current.add(i)}
              {...shared}
            >
              <source src={frame.video!.webm} type="video/webm" />
              <source src={frame.video!.mp4} type="video/mp4" />
            </video>
          );
        }

        return (
          <img
            key={frame.src}
            src={frame.src}
            srcSet={frame.srcSet}
            sizes="100vw"
            alt={isActive ? alt : ''}
            aria-hidden={!isActive}
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={() => loaded.current.add(i)}
            {...shared}
          />
        );
      })}
    </div>
  );
};

export default HeroSequence;
