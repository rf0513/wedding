import React from 'react';

/**
 * Ornaments drawn from the lobby that inspired the site: the black-and-white
 * sunburst floor, the fluted brass mirror, the rising sun and the gilded lotus
 * and palm panels of the mural. All are inline SVG so they scale, tint and
 * animate for free.
 */

const GOLD = '#C8A75C', GOLD_LIGHT = '#E2C88A', INK = '#0C0B0A', CREAM = '#F2EFE9';

const pt = (r: number, deg: number, cx = 0, cy = 0) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const;
};
const f = (n: number) => n.toFixed(1);

/* ─── The lobby floor: tapered rays around an ellipse ─── */
export const SunburstFloor: React.FC<{
  className?: string;
  ray?: string;        // ray colour
  ring?: string;       // checker ring colour
  ground?: string;     // colour of the centre ellipse fill
  outline?: string;    // ellipse / ring outline
  /** fade the outer rays into the ground at the rim */
  fade?: boolean;
  /** colour of the round slab the rays are inlaid into (none = transparent) */
  disc?: string;
  children?: React.ReactNode;
}> = ({ className = '', ray = INK, ring = INK, ground = 'transparent', outline = GOLD, fade = true, disc, children }) => {
  const N = 40;
  const spikes: string[] = [];
  const inner: string[] = [];
  for (let i = 0; i < N; i++) {
    const a = (i * 360) / N;
    const pattern = [490, 362, 432, 362];
    const r1 = pattern[i % 4];
    const r0 = 254, w = 4.2; // half-angle in degrees at the base
    const [ax, ay] = pt(r0, a - w), [bx, by] = pt(r0, a + w), [tx, ty] = pt(r1, a);
    const [nx, ny] = pt(r0 + 26, a); // notch so the base reads as a chevron
    spikes.push(`M${f(ax)} ${f(ay)} L${f(tx)} ${f(ty)} L${f(bx)} ${f(by)} L${f(nx)} ${f(ny)} Z`);
    // inner short spikes, offset by half a step
    const b = a + 180 / N;
    const [cx2, cy2] = pt(194, b - 3.2), [dx, dy] = pt(194, b + 3.2), [ex, ey] = pt(242, b);
    inner.push(`M${f(cx2)} ${f(cy2)} L${f(ex)} ${f(ey)} L${f(dx)} ${f(dy)} Z`);
  }
  // checker ring
  const ringSegs: string[] = [];
  const M = 48;
  for (let i = 0; i < M; i += 2) {
    const a0 = (i * 360) / M, a1 = ((i + 1) * 360) / M;
    const [p0x, p0y] = pt(166, a0), [p1x, p1y] = pt(166, a1), [p2x, p2y] = pt(184, a1), [p3x, p3y] = pt(184, a0);
    ringSegs.push(`M${f(p0x)} ${f(p0y)} L${f(p1x)} ${f(p1y)} L${f(p2x)} ${f(p2y)} L${f(p3x)} ${f(p3y)} Z`);
  }
  const id = React.useId().replace(/:/g, '');
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="-500 -500 1000 1000" className="block w-full h-auto" aria-hidden>
        <defs>
          <radialGradient id={`fade-${id}`} cx="50%" cy="50%" r="50%">
            <stop offset="72%" stopColor="#fff" />
            <stop offset="100%" stopColor="#fff" stopOpacity={fade ? 0 : 1} />
          </radialGradient>
          <mask id={`mask-${id}`}><rect x="-500" y="-500" width="1000" height="1000" fill={`url(#fade-${id})`} /></mask>
        </defs>
        {disc && <circle r="498" fill={disc} />}
        {disc && <circle r="492" fill="none" stroke={outline} strokeWidth="1.5" strokeOpacity=".8" />}
        <g mask={`url(#mask-${id})`}>
          <path d={spikes.join(' ')} fill={ray} />
          <path d={inner.join(' ')} fill={ray} fillOpacity=".9" />
        </g>
        <path d={ringSegs.join(' ')} fill={ring} />
        <circle r="166" fill="none" stroke={outline} strokeWidth="1.2" />
        <circle r="184" fill="none" stroke={outline} strokeWidth="1.2" strokeOpacity=".7" />
        <circle r="152" fill={ground} />
        <circle r="152" fill="none" stroke={outline} strokeWidth="1" strokeOpacity=".8" />
      </svg>
      {children && (
        <div className="absolute inset-0 grid place-items-center">
          <div className="w-[27%] text-center">{children}</div>
        </div>
      )}
    </div>
  );
};

/* ─── Thin radiating lines; a glow behind hero titles ─── */
export const RayFan: React.FC<{ className?: string; color?: string; n?: number; spread?: number; opacity?: number; animate?: boolean }> = ({ className = '', color = GOLD, n = 72, spread = 360, opacity = .45, animate = true }) => {
  const id = React.useId().replace(/:/g, '');
  const lines: string[] = [];
  for (let i = 0; i < n; i++) {
    const a = -spread / 2 + (i * spread) / (n - 1);
    const [x, y] = pt(500, a);
    lines.push(`M0 0 L${f(x)} ${f(y)}`);
  }
  // The wrapper is what gets positioned (translate classes); the svg carries the
  // scale-in animation so the two transforms never fight.
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden>
    <svg viewBox="-500 -500 1000 1000" className={`block w-full h-full ${animate ? 'animate-raysIn' : ''}`}>
      <defs>
        <radialGradient id={`rf-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="8%" stopColor="#fff" stopOpacity="0" />
          <stop offset="30%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id={`rm-${id}`}><rect x="-500" y="-500" width="1000" height="1000" fill={`url(#rf-${id})`} /></mask>
      </defs>
      <path d={lines.join(' ')} stroke={color} strokeWidth="1.1" strokeOpacity={opacity} fill="none" mask={`url(#rm-${id})`} />
    </svg>
    </div>
  );
};

/* ─── The fluted brass mirror, with the monogram in the glass ─── */
export const MirrorEmblem: React.FC<{ className?: string; size?: number; glass?: string; monogram?: boolean; text?: string }> = ({ className = '', size = 120, glass = INK, monogram = true, text = 'P&R' }) => {
  const ticks: string[] = [];
  for (let i = 0; i < 96; i++) {
    const a = (i * 360) / 96;
    const long = i % 2 === 0;
    const [x0, y0] = pt(74, a), [x1, y1] = pt(long ? 100 : 92, a);
    ticks.push(`M${f(x0)} ${f(y0)} L${f(x1)} ${f(y1)}`);
  }
  return (
    <svg viewBox="-104 -104 208 208" width={size} height={size} className={className} aria-hidden>
      <circle r="101" fill="none" stroke={GOLD} strokeWidth="2" />
      <circle r="86" fill={GOLD} fillOpacity=".12" />
      <path d={ticks.join(' ')} stroke={GOLD} strokeWidth="2.2" strokeLinecap="round" />
      <circle r="72" fill={glass} stroke={GOLD_LIGHT} strokeWidth="1.5" />
      <circle r="66" fill="none" stroke={GOLD} strokeWidth=".8" strokeOpacity=".6" />
      {monogram && (
        <text y="11" textAnchor="middle" fontFamily="Marcellus, serif" fontSize="40" letterSpacing="1" fill={GOLD_LIGHT}>{text}</text>
      )}
    </svg>
  );
};

/* ─── Rising sun (centre of the mural) ─── */
export const RisingSun: React.FC<{ className?: string; color?: string; size?: number }> = ({ className = '', color = GOLD, size = 72 }) => {
  const rays: string[] = [];
  for (let i = 0; i <= 18; i++) {
    const a = -90 + i * 10;
    const len = i % 3 === 0 ? 46 : i % 3 === 1 ? 36 : 40;
    const [x0, y0] = pt(24, a), [x1, y1] = pt(len, a);
    rays.push(`M${f(x0)} ${f(y0)} L${f(x1)} ${f(y1)}`);
  }
  return (
    <svg viewBox="-52 -52 104 56" width={size} height={size * 56 / 104} className={className} aria-hidden>
      <path d={rays.join(' ')} stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      <path d="M-20 0 A20 20 0 0 1 20 0 Z" fill={color} />
      <path d="M-52 0 H52" stroke={color} strokeWidth="1.2" />
      <path d="M-46 3.5 H46" stroke={color} strokeWidth=".7" strokeOpacity=".7" />
    </svg>
  );
};

/* ─── Gilded lotus (papyrus) from the mural ─── */
export const Lotus: React.FC<{ className?: string; color?: string; size?: number }> = ({ className = '', color = GOLD, size = 96 }) => (
  <svg viewBox="0 0 100 110" width={size} height={size * 1.1} className={className} aria-hidden fill="none" stroke={color} strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
    {/* petals */}
    <path d="M50 62 C42 44 42 26 50 6 C58 26 58 44 50 62 Z" fill={color} fillOpacity=".16" />
    <path d="M50 62 C36 50 26 36 22 16 C38 26 46 42 50 62 Z" fill={color} fillOpacity=".12" />
    <path d="M50 62 C64 50 74 36 78 16 C62 26 54 42 50 62 Z" fill={color} fillOpacity=".12" />
    <path d="M50 62 C34 58 18 50 6 34 C26 38 40 48 50 62 Z" fill={color} fillOpacity=".08" />
    <path d="M50 62 C66 58 82 50 94 34 C74 38 60 48 50 62 Z" fill={color} fillOpacity=".08" />
    {/* calyx and stem */}
    <path d="M38 62 H62 L58 70 H42 Z" fill={color} fillOpacity=".25" />
    <path d="M50 70 V106" />
    <path d="M50 84 C44 84 38 88 34 96 C40 94 46 92 50 90 M50 92 C56 92 62 96 66 104 C60 102 54 100 50 98" />
    {/* ripples */}
    <path d="M18 106 H82 M26 110 H74" strokeOpacity=".6" />
  </svg>
);

/* ─── Fan palm from the mural ─── */
export const PalmFan: React.FC<{ className?: string; color?: string; size?: number }> = ({ className = '', color = GOLD, size = 96 }) => {
  const fronds: string[] = [];
  for (let i = 0; i <= 16; i++) {
    const a = -80 + i * 10;
    const len = 48 + (i % 2 ? 0 : 6);
    const [x, y] = pt(len, a, 50, 72);
    fronds.push(`M50 72 L${f(x)} ${f(y)}`);
  }
  return (
    <svg viewBox="0 0 100 110" width={size} height={size * 1.1} className={className} aria-hidden fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round">
      <path d="M50 72 A54 54 0 0 1 104 72" transform="translate(-4 0)" strokeOpacity=".5" />
      <path d={fronds.join(' ')} />
      <path d="M50 72 A38 38 0 0 1 88 72" transform="translate(-4 0)" strokeOpacity=".35" />
      <path d="M44 72 H56 L54 80 H46 Z" fill={color} fillOpacity=".25" />
      <path d="M50 80 V106" />
      <path d="M18 106 H82 M26 110 H74" strokeOpacity=".6" />
    </svg>
  );
};

/* ─── Ornamental rule: line · diamond · sun · diamond · line ─── */
export const DecoRule: React.FC<{ className?: string; color?: string; tone?: 'gold' | 'ink' }> = ({ className = '', color, tone = 'gold' }) => {
  const c = color || (tone === 'ink' ? INK : GOLD);
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden>
      <span className="h-px flex-1 max-w-[96px]" style={{ background: c }} />
      <span className="w-[7px] h-[7px] rotate-45" style={{ background: c }} />
      <RisingSun size={40} color={c} />
      <span className="w-[7px] h-[7px] rotate-45" style={{ background: c }} />
      <span className="h-px flex-1 max-w-[96px]" style={{ background: c }} />
    </div>
  );
};

/* ─── Corner brackets for framed panels (stepped, like the wall inlays) ─── */
export const CornerBrackets: React.FC<{ color?: string; inset?: number; size?: number; className?: string }> = ({ color = GOLD, inset = 10, size = 22, className = '' }) => {
  const clip = (q: 'tl' | 'tr' | 'bl' | 'br') => ({
    tl: 'polygon(0 0,100% 0,100% 34%,66% 34%,66% 66%,34% 66%,34% 100%,0 100%)',
    tr: 'polygon(0 0,100% 0,100% 100%,66% 100%,66% 66%,34% 66%,34% 34%,0 34%)',
    bl: 'polygon(0 0,34% 0,34% 34%,66% 34%,66% 66%,100% 66%,100% 100%,0 100%)',
    br: 'polygon(66% 0,100% 0,100% 100%,0 100%,0 66%,34% 66%,34% 34%,66% 34%)',
  }[q]);
  const base: React.CSSProperties = { position: 'absolute', width: size, height: size, background: color };
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      <span style={{ ...base, left: inset, top: inset, clipPath: clip('tl') }} />
      <span style={{ ...base, right: inset, top: inset, clipPath: clip('tr') }} />
      <span style={{ ...base, left: inset, bottom: inset, clipPath: clip('bl') }} />
      <span style={{ ...base, right: inset, bottom: inset, clipPath: clip('br') }} />
    </div>
  );
};

export const ORN = { GOLD, GOLD_LIGHT, INK, CREAM };
