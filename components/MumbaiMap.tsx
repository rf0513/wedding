import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { usePrefersReducedMotion } from './DecoUI';

/**
 * Illustrated Mumbai map — gold line-art on ink, in the spirit of a 1920s tourist-poster
 * map. Geometry is emblematic: a stylised angular peninsula with the Arabian Sea to the
 * west and the harbour (with Elephanta island) to the east. Pins are placed roughly
 * where the places sit relative to each other, NOT to scale — it is for orientation and
 * charm; the "Open in Google Maps" link next to the caption handles real directions.
 *
 * Pins are keyed by the ids used in constants.ts (hotel, airport, ev1–ev4, and the
 * sightseeing / shopping / food ids). Add a new place by giving it a position below.
 */

export type MapPin = { id: string; title: string; query: string };

// Positions in map units (the drawing is 360 wide, shown inside a 400 × 580 viewBox with
// room for labels on the right). `side` says where the label goes; `label` is a shorter
// poster-style name when the full title from constants.ts is too long for the map.
const POS: Record<string, { x: number; y: number; side: 'l' | 'r' | 'b'; dy?: number; label?: string }> = {
  airport:   { x: 214, y: 128, side: 'r' },
  avartana:  { x: 243, y: 158, side: 'r', label: 'Avartana' },
  hotel:     { x: 279, y: 196, side: 'r' },
  ev1:       { x: 268, y: 262, side: 'r', label: 'Thapar Suburbia' },   // Thapar Suburbia (Chembur) — Mehendi
  ev2:       { x: 268, y: 262, side: 'r', label: 'Thapar Suburbia' },   // same venue — Haldi
  jio:       { x: 214, y: 226, side: 'l' },
  ev4:       { x: 234, y: 250, side: 'l', dy: 4, label: 'MCA Club · BKC' },   // MCA Club (BKC) — Wedding & Reception
  siddhi:    { x: 163, y: 352, side: 'l' },
  goodearth: { x: 182, y: 378, side: 'l', label: 'Good Earth' },
  ev3:       { x: 196, y: 404, side: 'r', label: 'Turf Lawn · Race Course' },   // Turf Lawn, Mahalaxmi Race Course — Vows & Sangeet
  masque:    { x: 205, y: 428, side: 'r' },
  csmvs:     { x: 194, y: 486, side: 'l' },
  gateway:   { x: 214, y: 512, side: 'r' },
  sealounge: { x: 200, y: 528, side: 'l', label: 'Sea Lounge · Taj Palace' },
  colaba:    { x: 190, y: 548, side: 'l' },
  elephanta: { x: 302, y: 470, side: 'b' },   // island — label sits below it
};

// Stylised land masses (angular — no curves anywhere in this design language).
const LAND = 'M118 26 L246 26 L268 52 L276 118 L302 150 L304 236 L282 296 L258 356 L246 416 L232 462 L222 506 L214 540 L202 566 L190 560 L176 526 L166 486 L152 430 L140 372 L132 300 L128 210 L110 132 L104 68 Z';
const ELEPHANTA = 'M288 458 L312 452 L322 470 L312 486 L292 484 L282 470 Z';

const GOLD = '#C8A951', GOLD_LIGHT = '#E3C77A', INK = '#0E1512', PINE = '#16221D', CREAM = '#F3EEE1';

// 45°-then-straight dogleg from a to b (poster-style route, not a road).
function dogleg(a: { x: number; y: number }, b: { x: number; y: number }) {
  const dx = b.x - a.x, dy = b.y - a.y;
  const m = Math.min(Math.abs(dx), Math.abs(dy));
  const ex = a.x + Math.sign(dx) * m, ey = a.y + Math.sign(dy) * m;
  return `M${a.x} ${a.y} L${ex} ${ey} L${b.x} ${b.y}`;
}

const MumbaiMap: React.FC<{ pins: MapPin[]; activeId: string; onSelect: (id: string) => void }> = ({ pins, activeId, onSelect }) => {
  const { t } = useLanguage();
  const reduced = usePrefersReducedMotion();

  // Pins that share a position (e.g. two events at one venue) collapse into one marker.
  const groups: { key: string; ids: string[]; title: string; pos: typeof POS[string] }[] = [];
  pins.forEach((p) => {
    const pos = POS[p.id];
    if (!pos) return;
    const key = `${pos.x},${pos.y}`;
    const g = groups.find((x) => x.key === key);
    if (g) g.ids.push(p.id); else groups.push({ key, ids: [p.id], title: pos.label || p.title, pos });
  });
  const activeGroup = groups.find((g) => g.ids.includes(activeId)) || groups[0];
  const hotel = POS.hotel;
  const showRoute = activeGroup && !activeGroup.ids.includes('hotel');

  return (
    <svg
      viewBox="0 0 400 580"
      className="block w-full h-auto max-w-[520px] mx-auto select-none"
      role="img"
      aria-label={t('travel_map_title')}
      style={{ fontFamily: '"Josefin Sans", sans-serif' }}
    >
      <style>{`
        @keyframes mapRoute { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        @keyframes mapPulse { 0% { r: 7; opacity: .9; } 100% { r: 18; opacity: 0; } }
        .map-pin { cursor: pointer; }
        .map-pin:focus { outline: none; }
        .map-pin:focus-visible .map-pin-label { fill: ${GOLD_LIGHT}; }
      `}</style>
      <defs>
        {/* horizontal hairline "waves" for the sea */}
        <pattern id="sea" width="28" height="14" patternUnits="userSpaceOnUse">
          <path d="M0 3 H10 M16 3 H26 M6 10 H18" stroke={GOLD} strokeOpacity=".22" strokeWidth=".8" />
        </pattern>
        <mask id="map-route-mask">
          {showRoute && (
            <path
              key={activeGroup.key}
              d={dogleg(hotel, activeGroup.pos)}
              fill="none" stroke="#fff" strokeWidth={6} strokeLinejoin="round" pathLength={1} strokeDasharray={1}
              style={{ animation: reduced ? 'none' : 'mapRoute .9s cubic-bezier(.2,.7,.2,1) both', strokeDashoffset: reduced ? 0 : undefined }}
            />
          )}
        </mask>
      </defs>

      {/* Sea */}
      <rect x="0" y="0" width="400" height="580" fill={INK} />
      <rect x="0" y="0" width="400" height="580" fill="url(#sea)" />

      {/* Frame rule */}
      <rect x="8" y="8" width="384" height="564" fill="none" stroke={GOLD} strokeOpacity=".55" strokeWidth="1" />

      <g transform="translate(-6 0)">

      {/* Land */}
      <path d={LAND} fill={PINE} stroke={GOLD} strokeWidth="1.4" strokeLinejoin="miter" />
      <path d={LAND} fill="none" stroke={GOLD} strokeOpacity=".35" strokeWidth=".7" style={{ transform: 'scale(.975, .985)', transformOrigin: '206px 296px' }} />
      <path d={ELEPHANTA} fill={PINE} stroke={GOLD} strokeWidth="1.2" />

      {/* Sea labels */}
      <text x="56" y="330" fill={GOLD} fillOpacity=".8" fontSize="9" letterSpacing="3" transform="rotate(-90 56 330)" textAnchor="middle">{t('map_sea').toUpperCase()}</text>
      <text x="376" y="330" fill={GOLD} fillOpacity=".8" fontSize="9" letterSpacing="3" transform="rotate(90 376 330)" textAnchor="middle">{t('map_harbour').toUpperCase()}</text>

      {/* Compass (sunburst rays + N) */}
      <g transform="translate(48 60)" aria-hidden>
        {Array.from({ length: 16 }).map((_, i) => (
          <line key={i} x1="0" y1="0" x2="0" y2={i % 4 === 0 ? -22 : i % 2 === 0 ? -15 : -10} stroke={GOLD} strokeWidth={i % 4 === 0 ? 1.2 : .7} strokeOpacity={i % 4 === 0 ? 1 : .6} transform={`rotate(${i * 22.5})`} />
        ))}
        <rect x="-4" y="-4" width="8" height="8" fill={INK} stroke={GOLD} strokeWidth="1" transform="rotate(45)" />
        <text x="0" y="-27" fill={GOLD} fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="Marcellus, serif">N</text>
      </g>

      {/* Title cartouche (stepped) */}
      <g transform="translate(262 26)" aria-hidden>
        <path d="M0 8 L8 8 L8 0 L102 0 L102 8 L110 8 L110 40 L102 40 L102 48 L8 48 L8 40 L0 40 Z" fill={INK} stroke={GOLD} strokeWidth="1" />
        <text x="55" y="24" fill={CREAM} fontSize="16" letterSpacing="3" textAnchor="middle" fontFamily="Marcellus, serif">MUMBAI</text>
        <text x="55" y="38" fill={GOLD} fontSize="7" letterSpacing="2.5" textAnchor="middle">BOMBAY · 2027</text>
      </g>

      {/* Route from the hotel to the selected place */}
      {showRoute && (
        <g mask="url(#map-route-mask)">
          <path d={dogleg(hotel, activeGroup.pos)} fill="none" stroke={GOLD} strokeWidth="1.5" strokeDasharray="4 4" strokeLinejoin="round" />
        </g>
      )}

      {/* Pins */}
      {groups.map((g) => {
        const active = g === activeGroup;
        const isHotel = g.ids.includes('hotel');
        const isAirport = g.ids.includes('airport');
        const { x, y, side, dy = 0 } = g.pos;
        const lx = side === 'r' ? x + 11 : side === 'l' ? x - 11 : x;
        const ly = side === 'b' ? y + 26 : y + 3;
        const primary = isHotel || isAirport;
        return (
          <g
            key={g.key}
            className="map-pin"
            role="button"
            tabIndex={0}
            aria-label={g.title}
            aria-pressed={active}
            onClick={() => onSelect(g.ids[0])}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(g.ids[0]); } }}
          >
            <title>{g.title}</title>
            {active && !reduced && (
              <circle cx={x} cy={y} r="7" fill="none" stroke={GOLD_LIGHT} strokeWidth="1" style={{ animation: 'mapPulse 1.6s ease-out infinite' }} />
            )}
            {/* hit area */}
            <circle cx={x} cy={y} r="11" fill="transparent" />
            {isHotel ? (
              // Hotel: stepped square (matches the logo mark)
              <path transform={`translate(${x} ${y})`} d="M-6 -3 L-3 -3 L-3 -6 L3 -6 L3 -3 L6 -3 L6 3 L3 3 L3 6 L-3 6 L-3 3 L-6 3 Z" fill={GOLD} stroke={INK} strokeWidth=".8" />
            ) : isAirport ? (
              // Airport: four-point star
              <path transform={`translate(${x} ${y})`} d="M0 -8 L2 -2 L8 0 L2 2 L0 8 L-2 2 L-8 0 L-2 -2 Z" fill={active ? GOLD_LIGHT : GOLD} />
            ) : (
              // Everything else: diamond, filled when active
              <path transform={`translate(${x} ${y}) rotate(45)`} d={active ? 'M-5 -5 H5 V5 H-5 Z' : 'M-4 -4 H4 V4 H-4 Z'} fill={active ? GOLD_LIGHT : INK} stroke={GOLD} strokeWidth="1.2" />
            )}
            <text
              className="map-pin-label"
              x={lx}
              y={ly + dy}
              textAnchor={side === 'r' ? 'start' : side === 'l' ? 'end' : 'middle'}
              fontSize={active ? 10 : primary ? 9.4 : 8.8}
              fontWeight={active || primary ? 600 : 400}
              letterSpacing="1.1"
              fill={active ? GOLD_LIGHT : primary ? CREAM : 'rgba(243,238,225,.78)'}
              stroke={INK}
              strokeWidth="3"
              paintOrder="stroke"
              style={{ transition: 'fill .3s' }}
            >
              {g.title.toUpperCase()}
            </text>
          </g>
        );
      })}

      </g>
    </svg>
  );
};

export default MumbaiMap;
