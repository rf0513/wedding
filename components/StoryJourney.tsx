import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { StoryEvent } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { Reveal, StepFrame, usePrefersReducedMotion } from './DecoUI';

/**
 * "Our Journey" as an animated route map.
 *
 * A dashed gold line runs down a rail on the left of the story section, connecting
 * three stations — Albuquerque, NM → the Bay Area, CA → Mumbai, India — with the
 * four existing milestones sitting on the route as numbered nodes. The line draws
 * itself as the reader scrolls (stroke-dashoffset on a mask over the dashed path)
 * and each node lights up as the line reaches it. It is an emblematic 1920s
 * travel-poster route, not geography.
 *
 * Geometry is measured from the DOM (offsetTop chain, so scroll-reveal transforms
 * don't skew it) and re-measured on resize, so the line always passes through the
 * nodes whatever the viewport or language.
 */

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
const RAIL_W = 46;          // width of the rail column (node box size)
const RAIL_X = RAIL_W / 2;  // x of the route line
const JOG = 18;             // how far the line steps sideways between nodes

type Station = { key: 'abq' | 'bay' | 'mumbai'; before?: string; end?: boolean };
// Stations are inserted before the milestone with the given id; `end` goes last.
const STATIONS: Station[] = [
  { key: 'abq', before: '1' },
  { key: 'bay', before: '3' },
  { key: 'mumbai', end: true },
];

type Row =
  | { kind: 'station'; key: Station['key']; id: string }
  | { kind: 'milestone'; ev: StoryEvent; index: number; id: string };

function offsetWithin(el: HTMLElement, root: HTMLElement) {
  let x = 0, y = 0, node: HTMLElement | null = el;
  while (node && node !== root) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y };
}

// Build a geometric "bayonet" route through the node centres: straight down, with a
// 45° step to the right and back between nodes when there's room.
function buildRoute(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return { d: '', fractions: pts.map(() => 0) };
  const segs: { x: number; y: number }[] = [pts[0]];
  const fractions: number[] = [0];
  let len = 0;
  const push = (p: { x: number; y: number }) => {
    const prev = segs[segs.length - 1];
    len += Math.hypot(p.x - prev.x, p.y - prev.y);
    segs.push(p);
  };
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1], b = pts[i];
    const gap = b.y - a.y;
    if (gap > 160) {
      const lead = 28;
      push({ x: a.x, y: a.y + lead });
      push({ x: a.x + JOG, y: a.y + lead + JOG });
      push({ x: a.x + JOG, y: b.y - lead - JOG });
      push({ x: a.x, y: b.y - lead });
    }
    push(b);
    fractions.push(len);
  }
  const d = segs.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  return { d, fractions: fractions.map((f) => (len ? f / len : 0)) };
}

const StoryJourney: React.FC<{ events: StoryEvent[] }> = ({ events }) => {
  const { t } = useLanguage();
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLElement | null>>({});
  const [route, setRoute] = useState<{ d: string; fractions: number[]; h: number }>({ d: '', fractions: [], h: 0 });
  const [progress, setProgress] = useState(reduced ? 1 : 0);

  // Rows: stations interleaved with milestones.
  const rows: Row[] = [];
  events.forEach((ev, index) => {
    STATIONS.filter((s) => s.before === ev.id).forEach((s) => rows.push({ kind: 'station', key: s.key, id: 'st-' + s.key }));
    rows.push({ kind: 'milestone', ev, index, id: 'ms-' + ev.id });
  });
  STATIONS.filter((s) => s.end).forEach((s) => rows.push({ kind: 'station', key: s.key, id: 'st-' + s.key }));

  const measure = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    const pts = rows.map((r) => {
      const el = nodeRefs.current[r.id];
      if (!el) return null;
      const { x, y } = offsetWithin(el, root);
      return { x: x + el.offsetWidth / 2, y: y + el.offsetHeight / 2 };
    }).filter(Boolean) as { x: number; y: number }[];
    const { d, fractions } = buildRoute(pts);
    setRoute({ d, fractions, h: root.offsetHeight });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows.map((r) => r.id).join('|')]);

  useLayoutEffect(() => {
    measure();
    const root = rootRef.current;
    if (!root || !('ResizeObserver' in window)) {
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    }
    const ro = new ResizeObserver(() => measure());
    ro.observe(root);
    if ((document as any).fonts?.ready) (document as any).fonts.ready.then(measure);
    return () => ro.disconnect();
  }, [measure]);

  // Scroll-driven draw: the line tip tracks ~78% down the viewport.
  useEffect(() => {
    if (reduced) { setProgress(1); return; }
    let raf = 0;
    const update = () => {
      raf = 0;
      const root = rootRef.current;
      if (!root) return;
      const rect = root.getBoundingClientRect();
      const tip = window.innerHeight * 0.78;
      const p = (tip - rect.top) / rect.height;
      setProgress(Math.max(0, Math.min(1, p)));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [reduced]);

  const lit = (i: number) => progress >= (route.fractions[i] ?? 1) - 0.005;
  const setRef = (id: string) => (el: HTMLElement | null) => { nodeRefs.current[id] = el; };

  const stationCopy: Record<Station['key'], { sub: string; place: string; note?: string }> = {
    abq: { sub: t('journey_from'), place: t('journey_abq') },
    bay: { sub: t('journey_home'), place: t('journey_bay') },
    mumbai: { sub: t('journey_next_stop'), place: t('journey_mumbai'), note: t('journey_wedding') },
  };

  return (
    <div ref={rootRef} className="relative">
      {/* Route line (drawn on scroll) */}
      <svg aria-hidden className="absolute inset-0 w-full pointer-events-none" style={{ height: route.h || '100%', overflow: 'visible' }}>
        <defs>
          <mask id="journey-reveal" maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height={route.h || 1}>
            <path
              d={route.d}
              fill="none"
              stroke="#fff"
              strokeWidth={8}
              strokeLinejoin="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - progress}
              style={{ transition: reduced ? 'none' : 'stroke-dashoffset .35s linear' }}
            />
          </mask>
        </defs>
        {/* faint full route underneath, so the reader can see where the line is headed */}
        <path d={route.d} fill="none" stroke="#C8A951" strokeOpacity={0.18} strokeWidth={1.5} strokeDasharray="5 6" strokeLinejoin="round" />
        <path d={route.d} fill="none" stroke="#C8A951" strokeWidth={1.75} strokeDasharray="5 6" strokeLinejoin="round" mask="url(#journey-reveal)" />
      </svg>

      <ol className="relative m-0 p-0 list-none flex flex-col gap-12">
        {rows.map((row, i) => {
          const on = lit(i);
          if (row.kind === 'station') {
            const c = stationCopy[row.key];
            const isEnd = row.key === 'mumbai';
            return (
              <li key={row.id} className={`grid gap-4 items-center ${isEnd ? 'mt-2' : ''}`} style={{ gridTemplateColumns: `${RAIL_W}px minmax(0,1fr)` }}>
                <div className="grid place-items-center">
                  {isEnd ? (
                    // Destination: sunburst marker (same ray pattern as the quote section)
                    <span
                      ref={setRef(row.id)}
                      className="block w-[46px] h-[46px] rounded-full transition-opacity duration-700"
                      style={{
                        opacity: on ? 1 : 0.35,
                        backgroundImage: 'repeating-conic-gradient(from 0deg,#C8A951 0 2deg,transparent 2deg 12deg)',
                        WebkitMaskImage: 'radial-gradient(circle,#000 26%,transparent 70%)',
                        maskImage: 'radial-gradient(circle,#000 26%,transparent 70%)',
                      }}
                    />
                  ) : (
                    // Station: stepped diamond, fills gold as the line arrives
                    <span ref={setRef(row.id)} className="block w-[26px] h-[26px] rotate-45 deco-step-12 bg-wedding-gold p-[1.5px]">
                      <span className="block w-full h-full deco-step-12 transition-colors duration-700" style={{ background: on ? '#C8A951' : '#F3EEE1' }} />
                    </span>
                  )}
                </div>
                <div className="min-w-0 transition-opacity duration-700" style={{ opacity: on ? 1 : 0.55 }}>
                  <p className="m-0 mb-1 font-sans font-semibold text-[10px] tracking-[.3em] uppercase text-wedding-bronze">{c.sub}</p>
                  <p className={`m-0 font-serif leading-[1.1] text-wedding-ink ${isEnd ? 'text-[clamp(26px,6.5vw,34px)]' : 'text-[clamp(20px,5vw,24px)]'}`}>{c.place}</p>
                  {c.note && <p className="mt-2 mb-0 font-sans font-light text-[13px] leading-[1.5] tracking-[.12em] uppercase text-wedding-ink/70">{c.note}</p>}
                </div>
              </li>
            );
          }
          const { ev, index } = row;
          return (
            <li key={row.id}>
              <Reveal as="article" className="grid grid-cols-1 gap-[22px]">
                <div className="grid gap-4 items-start" style={{ gridTemplateColumns: `${RAIL_W}px minmax(0,1fr)` }}>
                  {/* Numbered node on the route */}
                  <span ref={setRef(row.id)} className="block w-[46px] h-[46px] deco-step-12 bg-wedding-gold p-[1.5px]">
                    <span className="grid place-items-center w-full h-full deco-step-12 transition-colors duration-700" style={{ background: on ? '#C8A951' : '#F3EEE1' }}>
                      <span className="font-serif text-[20px] leading-none text-wedding-ink pt-[3px]">{ROMAN[index]}</span>
                    </span>
                  </span>
                  <div className="min-w-0">
                    <p className="mt-[6px] mb-2 font-sans font-semibold text-[10px] tracking-[.3em] uppercase text-wedding-bronze">
                      {ev.date} · {t('journey_place_' + ev.id)}
                    </p>
                    <h3 className="m-0 mb-[10px] font-serif font-normal text-[clamp(24px,6vw,32px)] leading-[1.1]">{ev.title}</h3>
                    <p className="m-0 font-sans font-light text-[15px] leading-[1.65] text-wedding-ink/78">{ev.desc}</p>
                  </div>
                </div>
                {/* Photo sits beside the rail; alternate the right inset for rhythm */}
                <div style={{ marginLeft: RAIL_W + 16, marginRight: index % 2 ? 40 : 0 }}>
                  <StepFrame size={14} borderWidth={2} innerBg="#F3EEE1" innerPadding={10}>
                    <img src={ev.img} alt={ev.title} className="block w-full aspect-[4/3] object-cover" style={{ filter: 'saturate(.85) contrast(1.05)' }} />
                  </StepFrame>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default StoryJourney;
