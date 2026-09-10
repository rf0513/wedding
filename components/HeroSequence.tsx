import React, { useEffect, useRef, useState } from 'react';
import { HERO_IMAGES } from '../constants';
import { usePrefersReducedMotion } from './DecoUI';

/**
 * Slow auto-advancing hero photo sequence (crossfade, ~4.5s per photo) behind the Home
 * hero. Keeps the duotone filter + parallax from the original single-image hero.
 *
 * - Photos are loaded one ahead of the one on screen, never all at once (they are big).
 * - A frame only advances once the next photo has actually loaded, so there is never a
 *   fade to blank on a slow connection.
 * - Pauses while the tab is hidden.
 * - prefers-reduced-motion: shows the first photo only, no crossfade, no parallax.
 *
 * To add photos, edit HERO_IMAGES in constants.ts.
 */

const HOLD_MS = 4500;   // time each photo is held
const FADE_MS = 1600;   // crossfade duration

const DUOTONE = 'grayscale(1) sepia(.35) hue-rotate(95deg) saturate(1.6) brightness(.82) contrast(1.12)';

const HeroSequence: React.FC<{ alt?: string }> = ({ alt = 'Pavitra and Ramon' }) => {
  const reduced = usePrefersReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  // Indices that have been mounted so far (grows as the sequence advances).
  const [mounted, setMounted] = useState<number[]>(HERO_IMAGES.length > 1 ? [0, 1] : [0]);
  const loaded = useRef<Set<number>>(new Set());
  const n = HERO_IMAGES.length;

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
    timer = window.setTimeout(tick, HOLD_MS);
    return () => clearTimeout(timer);
  }, [active, reduced, n]);

  // Keep one photo mounted (and therefore loading) ahead of the active one.
  useEffect(() => {
    const ahead = (active + 1) % n;
    setMounted((m) => (m.includes(ahead) ? m : [...m, ahead]));
  }, [active, n]);

  const frames = reduced ? [0] : mounted;

  return (
    <div ref={wrapRef} className="absolute left-0 -top-[6%] w-full h-[82%] will-change-transform">
      {frames.map((i) => {
        const img = HERO_IMAGES[i];
        const isActive = i === active;
        return (
          <img
            key={img.src}
            src={img.src}
            alt={isActive ? alt : ''}
            aria-hidden={!isActive}
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={() => loaded.current.add(i)}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              objectPosition: img.objectPosition || 'center 30%',
              filter: DUOTONE,
              opacity: isActive ? 1 : 0,
              transition: reduced ? 'none' : `opacity ${FADE_MS}ms ease-in-out`,
            }}
          />
        );
      })}
    </div>
  );
};

export default HeroSequence;
