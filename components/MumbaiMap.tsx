import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { usePrefersReducedMotion } from './DecoUI';
import {
  VIEW, PX_PER_KM, project, toPath,
  PLACES, ISLAND, MAINLAND, ELEPHANTA, POWAI_LAKE, MITHI, RUNWAYS, ROADS, ROUTES,
} from './mumbaiGeo';

/**
 * Illustrated Mumbai map — gold line-art on ink, in the spirit of a 1920s tourist-poster
 * map, but drawn over real geography. The coastline, the arterial roads and every pin are
 * projected from actual coordinates (see mumbaiGeo.ts), so distances and directions on the
 * page are honest. Selecting a place draws the road route from the hotel; the caption under
 * the map gives the distance, typical drive time and the turns, and the "Open in Google
 * Maps" link handles live turn-by-turn navigation.
 */

export type MapPin = { id: string; title: string; query: string };

const GOLD = '#C8A75C', GOLD_LIGHT = '#E2C88A', INK = '#0C0B0A', PINE = '#1B1A18', CREAM = '#F2EFE9';

const MumbaiMap: React.FC<{ pins: MapPin[]; activeId: string; onSelect: (id: string) => void }> = ({ pins, activeId, onSelect }) => {
  const { t } = useLanguage();
  const reduced = usePrefersReducedMotion();

  // Pins that share a position (e.g. two events at one venue) collapse into one marker.
  const groups: { key: string; ids: string[]; title: string; place: typeof PLACES[string]; x: number; y: number }[] = [];
  pins.forEach((p) => {
    const place = PLACES[p.id];
    if (!place) return;
    const [x, y] = project(place.ll);
    const key = `${place.ll[0]},${place.ll[1]}`;
    const g = groups.find((v) => v.key === key);
    if (g) g.ids.push(p.id); else groups.push({ key, ids: [p.id], title: place.label || p.title, place, x, y });
  });
  const activeGroup = groups.find((g) => g.ids.includes(activeId)) || groups[0];
  const route = activeGroup && !activeGroup.ids.includes('hotel') ? ROUTES[activeGroup.ids[0]] : undefined;
  const routePath = route ? toPath(route.pts) : '';
  const ferryPath = route?.ferry ? toPath(route.ferry.pts) : '';
  const scaleKm = 5, scalePx = scaleKm * PX_PER_KM;
  const anim = (dur: string, delay = '0s') => (reduced ? 'none' : `mapRoute ${dur} cubic-bezier(.2,.7,.2,1) ${delay} both`);

  return (
    <svg
      viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
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
        <clipPath id="map-frame"><rect x="8" y="8" width={VIEW.w - 16} height={VIEW.h - 16} /></clipPath>
      </defs>

      {/* Sea */}
      <rect x="0" y="0" width={VIEW.w} height={VIEW.h} fill={INK} />
      <rect x="0" y="0" width={VIEW.w} height={VIEW.h} fill="url(#sea)" />

      <g clipPath="url(#map-frame)">
        {/* Land */}
        <path d={toPath(MAINLAND, true)} fill={PINE} stroke={GOLD} strokeOpacity=".7" strokeWidth="1" strokeLinejoin="miter" />
        <path d={toPath(ISLAND, true)} fill={PINE} stroke={GOLD} strokeWidth="1.4" strokeLinejoin="miter" />
        <path d={toPath(ELEPHANTA, true)} fill={PINE} stroke={GOLD} strokeWidth="1.2" />
        {/* Water on the land: Mahim Creek / Mithi River and Powai Lake */}
        <path d={toPath(MITHI)} fill="none" stroke={INK} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
        <path d={toPath(MITHI)} fill="none" stroke={GOLD} strokeOpacity=".35" strokeWidth=".6" strokeLinejoin="round" />
        <path d={toPath(POWAI_LAKE, true)} fill={INK} stroke={GOLD} strokeOpacity=".5" strokeWidth=".7" />

        {/* Road skeleton — the arterials a driver actually uses */}
        <g fill="none" strokeLinejoin="round" strokeLinecap="round">
          {ROADS.map((r, i) => (
            <path key={i} d={toPath(r.pts)} stroke={GOLD} strokeOpacity={r.major ? .42 : .26} strokeWidth={r.major ? 1.1 : .7} />
          ))}
          {RUNWAYS.map((r, i) => <path key={'rw' + i} d={toPath(r)} stroke={GOLD} strokeOpacity=".5" strokeWidth="1.6" strokeLinecap="butt" />)}
        </g>

        {/* Route from the hotel to the selected place (drawn in) */}
        {route && (
          <g key={activeGroup.key} fill="none" strokeLinejoin="round" strokeLinecap="round">
            <path d={routePath} stroke={INK} strokeWidth="4.5" strokeOpacity=".85" pathLength={1} strokeDasharray={1} style={{ animation: anim('1s') }} />
            <path d={routePath} stroke={GOLD_LIGHT} strokeWidth="2" pathLength={1} strokeDasharray={1} style={{ animation: anim('1s') }} />
            {ferryPath && (
              <path d={ferryPath} stroke={GOLD_LIGHT} strokeWidth="1.4" strokeDasharray="1 3" strokeLinecap="round" style={{ opacity: 0, animation: reduced ? 'none' : 'mapFade .4s ease 1s both' }} />
            )}
            {ferryPath && <style>{`@keyframes mapFade { to { opacity: 1; } }`}</style>}
          </g>
        )}
      </g>

      {/* Frame rule */}
      <rect x="8" y="8" width={VIEW.w - 16} height={VIEW.h - 16} fill="none" stroke={GOLD} strokeOpacity=".55" strokeWidth="1" />

      {/* Sea labels */}
      <text x="24" y="470" fill={GOLD} fillOpacity=".8" fontSize="9" letterSpacing="3" transform="rotate(-90 24 470)" textAnchor="middle">{t('map_sea').toUpperCase()}</text>
      <text x="346" y="290" fill={GOLD} fillOpacity=".8" fontSize="9" letterSpacing="3" transform="rotate(90 346 290)" textAnchor="middle">{t('map_harbour').toUpperCase()}</text>

      {/* Compass (sunburst rays + N) */}
      <g transform="translate(46 62)" aria-hidden>
        {Array.from({ length: 16 }).map((_, i) => (
          <line key={i} x1="0" y1="0" x2="0" y2={i % 4 === 0 ? -22 : i % 2 === 0 ? -15 : -10} stroke={GOLD} strokeWidth={i % 4 === 0 ? 1.2 : .7} strokeOpacity={i % 4 === 0 ? 1 : .6} transform={`rotate(${i * 22.5})`} />
        ))}
        <rect x="-4" y="-4" width="8" height="8" fill={INK} stroke={GOLD} strokeWidth="1" transform="rotate(45)" />
        <text x="0" y="-27" fill={GOLD} fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="Marcellus, serif">N</text>
      </g>

      {/* Scale bar */}
      <g transform={`translate(24 ${VIEW.h - 30})`} aria-hidden>
        <path d={`M0 -4 V4 M${scalePx / 2} -2 V2 M${scalePx} -4 V4`} stroke={GOLD} strokeWidth="1" />
        <path d={`M0 0 H${scalePx}`} stroke={GOLD} strokeWidth="1" />
        <text x={scalePx / 2} y="13" fill={GOLD} fontSize="7" letterSpacing="2" textAnchor="middle">{scaleKm} KM</text>
      </g>

      {/* Title cartouche (stepped) */}
      <g transform={`translate(${VIEW.w - 128} ${VIEW.h - 74})`} aria-hidden>
        <path d="M0 8 L8 8 L8 0 L102 0 L102 8 L110 8 L110 40 L102 40 L102 48 L8 48 L8 40 L0 40 Z" fill={INK} stroke={GOLD} strokeWidth="1" />
        <text x="55" y="24" fill={CREAM} fontSize="16" letterSpacing="3" textAnchor="middle" fontFamily="Marcellus, serif">MUMBAI</text>
        <text x="55" y="38" fill={GOLD} fontSize="7" letterSpacing="2.5" textAnchor="middle">BOMBAY · 2027</text>
      </g>

      {/* Pins — inactive first so the selected one draws on top */}
      {[...groups].sort((a, b) => (a === activeGroup ? 1 : 0) - (b === activeGroup ? 1 : 0)).map((g) => {
        const active = g === activeGroup;
        const isHotel = g.ids.includes('hotel');
        const isAirport = g.ids.includes('airport');
        const { x, y } = g;
        const { side, dx = 0, dy = 0 } = g.place;
        const lx = (side === 'r' ? x + 11 : side === 'l' ? x - 11 : x) + dx;
        const ly = (side === 'b' ? y + 26 : y + 3) + dy;
        const leader = Math.abs(dy) >= 9 && side !== 'b';
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
            {leader && (
              <path d={`M${x} ${y} L${side === 'r' ? lx - 3 : lx + 3} ${ly - 3}`} stroke={GOLD} strokeOpacity=".6" strokeWidth=".6" fill="none" />
            )}
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
              y={ly}
              textAnchor={side === 'r' ? 'start' : side === 'l' ? 'end' : 'middle'}
              fontSize={active ? 10 : primary ? 9.4 : 8.8}
              fontWeight={active || primary ? 600 : 400}
              letterSpacing="1.1"
              fill={active ? GOLD_LIGHT : primary ? CREAM : 'rgba(242,239,233,.78)'}
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
    </svg>
  );
};

export default MumbaiMap;
