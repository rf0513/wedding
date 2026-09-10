import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { usePrefersReducedMotion } from './DecoUI';

/**
 * Opening curtain — plays once per browser session on first load of the Home page.
 * Two ziggurat-edged panels (ink with a gold stepped outline) slide apart from the
 * centre while "Pavitra & Ramon" is revealed one letter at a time. Tap/click/keypress
 * anywhere skips. Under prefers-reduced-motion nothing moves: the name is shown and
 * the overlay auto-dismisses after ~2.5s.
 */

const SESSION_KEY = 'pr-curtain-seen';

// Timeline (ms). Total ≈ 1.9s so impatient guests on phones aren't kept waiting.
const T_LETTERS = 50;     // stagger between letters
const T_OPEN_AT = 650;    // panels start sliding
const T_OPEN_DUR = 950;   // slide duration
const T_DONE = T_OPEN_AT + T_OPEN_DUR + 250;
const T_REDUCED = 2500;   // auto-dismiss under reduced motion

const hasSeen = () => {
  try { return sessionStorage.getItem(SESSION_KEY) === '1'; } catch { return false; }
};
const markSeen = () => {
  try { sessionStorage.setItem(SESSION_KEY, '1'); } catch {}
};

// Stepped (ziggurat) seam between the two panels. The seam runs down the viewport centre,
// offset by a stepped profile OFF(y): the left panel bulges out where the right panel is
// notched, so the closed curtain shows one continuous gold stepped seam and, as they part,
// each panel carries a complementary ziggurat edge. Both panels are 50% + OVERLAP wide.
const OVERLAP = 60;
const TIERS = [0, 16, 32, 48, 48, 32, 16, 0];            // seam offset (px) per tier, top → bottom
const YS = [0, 13, 24, 36, 50, 64, 76, 87, 100];          // tier boundaries (% of height)
function zigguratEdge(side: 'left' | 'right', inset: number) {
  const pts: string[] = [];
  const x = (off: number) =>
    side === 'left' ? `calc(100% - ${OVERLAP - off + inset}px)` : `${OVERLAP + off + inset}px`;
  for (let i = 0; i < TIERS.length; i++) {
    pts.push(`${x(TIERS[i])} ${YS[i]}%`, `${x(TIERS[i])} ${YS[i + 1]}%`);
  }
  if (side === 'left') pts.push('0 100%', '0 0');
  else pts.push('100% 100%', '100% 0');
  return `polygon(${pts.join(',')})`;
}

const Curtain: React.FC = () => {
  const { t } = useLanguage();
  const reduced = usePrefersReducedMotion();
  const [show, setShow] = useState(() => !hasSeen());
  const [phase, setPhase] = useState<'closed' | 'open' | 'gone'>('closed');
  const [skipped, setSkipped] = useState(false); // skip → panels part faster
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (!show) return;
    markSeen();
    const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms));
    if (reduced) {
      later(() => setPhase('gone'), T_REDUCED);
    } else {
      later(() => setPhase('open'), T_OPEN_AT);
      later(() => setPhase('gone'), T_DONE);
    }
    return () => { timers.current.forEach(clearTimeout); timers.current = []; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  useEffect(() => {
    if (phase === 'gone') {
      const id = window.setTimeout(() => setShow(false), reduced ? 0 : 320);
      return () => clearTimeout(id);
    }
  }, [phase, reduced]);

  const skip = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (reduced) { setPhase('gone'); return; }
    setSkipped(true);
    setPhase((p) => (p === 'closed' ? 'open' : p));
    timers.current.push(window.setTimeout(() => setPhase('gone'), 420));
  };

  if (!show) return null;

  const open = phase !== 'closed';
  const gone = phase === 'gone';
  const slide = reduced ? 'none' : `transform ${skipped ? 420 : T_OPEN_DUR}ms cubic-bezier(.6,.05,.2,1)`;
  const letters = (word: string, offset: number) =>
    word.split('').map((ch, i) => (
      <span
        key={i}
        className="inline-block"
        style={{ animation: reduced ? 'none' : `curtainLetter .55s cubic-bezier(.2,.7,.2,1) ${(offset + i) * T_LETTERS}ms both` }}
      >
        {ch}
      </span>
    ));

  const panel = (side: 'left' | 'right') => (
    <div
      aria-hidden
      className={`absolute top-0 bottom-0 w-[calc(50%+60px)] ${side === 'left' ? 'left-0' : 'right-0'} will-change-transform`}
      style={{
        transform: open ? `translateX(${side === 'left' ? '-104%' : '104%'})` : 'none',
        transition: slide,
      }}
    >
      {/* gold stepped outline */}
      <div className="absolute inset-0 bg-wedding-gold" style={{ clipPath: zigguratEdge(side, 0) }} />
      {/* ink body */}
      <div className="absolute inset-0 bg-wedding-ink" style={{ clipPath: zigguratEdge(side, 3) }}>
        {/* inner hairline rule + chevron band echoing HeroFrame / ChevronBand */}
        <div className={`absolute top-[14px] bottom-[14px] ${side === 'left' ? 'left-[14px] right-[78px]' : 'right-[14px] left-[78px]'} border border-wedding-gold/45`} />
        <div className={`deco-chevron absolute top-[26px] bottom-[26px] w-[10px] opacity-40 ${side === 'left' ? 'left-[26px]' : 'right-[26px]'}`} />
      </div>
    </div>
  );

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={t('curtain_skip')}
      onClick={skip}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') { e.preventDefault(); skip(); } }}
      className="fixed inset-0 z-[70] overflow-hidden cursor-pointer select-none bg-transparent outline-none"
      style={{ opacity: gone ? 0 : 1, transition: reduced ? 'none' : 'opacity 300ms ease', pointerEvents: gone ? 'none' : 'auto' }}
    >
      <style>{`
        @keyframes curtainLetter { from { opacity: 0; transform: translateY(.45em); } to { opacity: 1; transform: none; } }
        @keyframes curtainRule { from { transform: scaleX(0); } to { transform: scaleX(1); } }
      `}</style>
      {panel('left')}
      {panel('right')}

      {/* Name, revealed letter by letter, then fades as the panels part */}
      <div
        className="absolute inset-0 grid place-items-center px-6 text-center pointer-events-none"
        style={{
          opacity: open ? 0 : 1,
          transform: open && !reduced ? 'translateY(-14px)' : 'none',
          transition: reduced ? 'none' : `opacity ${T_OPEN_DUR * 0.55}ms ease ${open ? 120 : 0}ms, transform ${T_OPEN_DUR * 0.7}ms cubic-bezier(.2,.7,.2,1)`,
        }}
      >
        <div>
          <p className="m-0 mb-4 font-sans font-semibold text-[10px] tracking-[.42em] uppercase text-wedding-gold" style={{ animation: reduced ? 'none' : `curtainLetter .6s ease both` }}>
            {t('the_wedding_of')}
          </p>
          <h1 className="m-0 font-serif font-normal text-wedding-cream text-[clamp(40px,11vw,104px)] leading-[1] tracking-[.06em] uppercase" aria-label="Pavitra & Ramon">
            <span className="block">{letters('Pavitra', 0)}</span>
            <span className="block text-[.42em] leading-[1.5] text-wedding-gold tracking-[.1em]">{letters('&', 8)}</span>
            <span className="block">{letters('Ramon', 10)}</span>
          </h1>
          <div className="flex items-center justify-center gap-[14px] mt-6">
            <span className="h-px w-[34px] bg-wedding-gold origin-right" style={{ animation: reduced ? 'none' : `curtainRule .5s ease ${16 * T_LETTERS}ms both` }} />
            <span className="block w-[10px] h-[10px] bg-wedding-gold rotate-45" style={{ animation: reduced ? 'none' : `curtainLetter .4s ease ${17 * T_LETTERS}ms both` }} />
            <span className="h-px w-[34px] bg-wedding-gold origin-left" style={{ animation: reduced ? 'none' : `curtainRule .5s ease ${16 * T_LETTERS}ms both` }} />
          </div>
          <p className="mt-7 mb-0 font-sans font-light text-[10px] tracking-[.3em] uppercase text-wedding-cream/55" style={{ animation: reduced ? 'none' : `curtainLetter .6s ease ${18 * T_LETTERS}ms both` }}>
            {t('curtain_skip')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Curtain;
