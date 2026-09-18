import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MirrorEmblem, RayFan, RisingSun } from './Ornaments';

// ─── Scroll-reveal wrapper (mirrors the design's [data-reveal] fade/rise-in) ───
export const Reveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'article' | 'section';
  id?: string;
}> = ({ children, className = '', delay = 0, as = 'div', id }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as as any;
  return (
    <Tag
      ref={ref}
      id={id}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(28px)',
        transition: `opacity .9s ${delay}s cubic-bezier(.2,.7,.2,1), transform .9s ${delay}s cubic-bezier(.2,.7,.2,1)`,
      }}
    >
      {children}
    </Tag>
  );
};

// ─── Stepped ziggurat double-frame (gold border + inner panel) ───
export const StepFrame: React.FC<{
  size?: 12 | 14 | 16 | 20;
  borderWidth?: number;
  innerBg?: string;
  innerPadding?: number;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  /** brass gradient border instead of flat gold */
  brass?: boolean;
}> = ({ size = 14, borderWidth = 2, innerBg = '#F2EFE9', innerPadding = 8, className = '', style, brass = true, children }) => (
  <div className={`deco-step-${size} ${className}`} style={{ padding: borderWidth, background: brass ? 'linear-gradient(160deg,#E2C88A 0%,#C8A75C 40%,#A98A45 70%,#D9BC78 100%)' : '#C8A75C', ...style }}>
    <div className={`deco-step-${size}`} style={{ background: innerBg, padding: innerPadding }}>
      {children}
    </div>
  </div>
);

// ─── Decorative rotating sunburst (behind RSVP / guide headers) ───
export const Sunburst: React.FC<{ variant?: 'rsvp' | 'header'; className?: string }> = ({ variant = 'rsvp', className = '' }) => (
  <div
    aria-hidden
    className={`pointer-events-none absolute left-1/2 -translate-x-1/2 w-[720px] h-[720px] ${
      variant === 'header' ? 'deco-sunburst-header' : 'deco-sunburst animate-spinSlow'
    } ${className}`}
    style={{ top: variant === 'header' ? -260 : -140 }}
  />
);

// ─── Herringbone chevron divider band ───
export const ChevronBand: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div aria-hidden className={`deco-chevron h-[10px] opacity-50 ${className}`} />
);

// ─── Static brass band under the hero: the dates, once ───
export const BrassBand: React.FC<{ text: string }> = ({ text }) => (
  <div className="brass text-wedding-ink border-y border-wedding-ink py-[13px] pb-[10px] px-4">
    <div className="flex items-center justify-center gap-4 font-sans font-semibold text-[11px] tracking-[.34em] uppercase whitespace-nowrap">
      <span className="hidden sm:block h-px w-[60px] bg-wedding-ink/60" />
      <span className="w-[6px] h-[6px] rotate-45 bg-wedding-ink" />
      <span>{text}</span>
      <span className="w-[6px] h-[6px] rotate-45 bg-wedding-ink" />
      <span className="hidden sm:block h-px w-[60px] bg-wedding-ink/60" />
    </div>
  </div>
);

// ─── Hero notched border + corner brackets ───
export const HeroFrame: React.FC = () => (
  <div className="absolute inset-[14px] border border-wedding-gold/75 pointer-events-none animate-frameIn" aria-hidden>
    <span className="absolute inset-[5px] border border-wedding-gold/35" />
    <span className="absolute -left-px -top-px w-[26px] h-[26px] bg-wedding-gold" style={{ clipPath: 'polygon(0 0,100% 0,100% 34%,66% 34%,66% 66%,34% 66%,34% 100%,0 100%)' }} />
    <span className="absolute -right-px -top-px w-[26px] h-[26px] bg-wedding-gold" style={{ clipPath: 'polygon(0 0,100% 0,100% 100%,66% 100%,66% 66%,34% 66%,34% 34%,0 34%)' }} />
    <span className="absolute -left-px -bottom-px w-[26px] h-[26px] bg-wedding-gold" style={{ clipPath: 'polygon(0 0,34% 0,34% 34%,66% 34%,66% 66%,100% 66%,100% 100%,0 100%)' }} />
    <span className="absolute -right-px -bottom-px w-[26px] h-[26px] bg-wedding-gold" style={{ clipPath: 'polygon(66% 0,100% 0,100% 100%,0 100%,0 66%,34% 66%,34% 34%,66% 34%)' }} />
  </div>
);

// ─── Small deco corner-notch badge (used for the P&R logo mark) ───
export const LogoMark: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 48 }) => (
  <span className={`inline-grid place-items-center rounded-full bg-wedding-ink/60 backdrop-blur-md ${className}`} style={{ width: size, height: size }}>
    <MirrorEmblem size={size} />
  </span>
);

// ─── Kicker + title + rule, used at the top of every Home section ───
export const SectionTitle: React.FC<{
  kicker: string;
  title: string;
  desc?: string;
  tone?: 'light' | 'dark';
  align?: 'center' | 'left';
  className?: string;
  wide?: boolean;
  ornament?: boolean;
}> = ({ kicker, title, desc, tone = 'light', align = 'center', className = '', wide = false, ornament = true }) => {
  const dark = tone === 'dark';
  return (
    <div className={`${align === 'center' ? 'text-center' : 'text-left'} ${className}`}>
      {ornament && <RisingSun size={54} color={dark ? '#C8A75C' : '#0C0B0A'} className={align === 'center' ? 'mx-auto' : ''} />}
      <p className={`${ornament ? 'mt-3' : 'mt-0'} mb-[14px] font-sans font-semibold text-[10px] tracking-[.42em] uppercase ${dark ? 'text-wedding-gold' : 'text-wedding-bronze'}`}>{kicker}</p>
      <h2 className={`m-0 font-serif font-normal text-[clamp(34px,7.5vw,60px)] leading-[1.02] tracking-[.01em] ${dark ? 'text-wedding-cream' : 'text-wedding-ink'}`} style={{ textWrap: 'balance' as any }}>{title}</h2>
      {desc && <p className={`mt-[18px] mb-0 ${align === 'center' ? 'mx-auto' : ''} ${wide ? 'max-w-[620px]' : 'max-w-[480px]'} font-italic italic text-[clamp(18px,2.2vw,21px)] leading-[1.5] ${dark ? 'text-wedding-cream/75' : 'text-wedding-ink/75'}`}>{desc}</p>}
    </div>
  );
};

// ─── The lobby floor as a divider band ───
export const TileBand: React.FC<{ className?: string; size?: 'sm' | 'md' }> = ({ className = '', size = 'md' }) => (
  <div aria-hidden className={`${size === 'sm' ? 'deco-tiles-sm h-[14px]' : 'deco-tiles h-[24px]'} border-y border-wedding-gold/70 ${className}`} />
);

// ─── Sub-page header: black marble, coffered ceiling, brass rays ───
export const PageHeader: React.FC<{
  kicker: string;
  title: string;
  desc?: string;
  children?: React.ReactNode;
  tall?: boolean;
  /** Photo behind the header, given the hero's duotone so it reads as ground, not as
   *  a picture. Without one the header keeps its plain black marble. */
  bgImage?: string;
  /** Where the crop sits — a portrait in a wide header needs biasing, or it keeps the
   *  middle of the frame and loses whoever is standing at the bottom of it. */
  bgPosition?: string;
  bgAlt?: string;
}> = ({ kicker, title, desc, children, tall = false, bgImage, bgPosition = 'center 50%', bgAlt = '' }) => (
  <div className={`relative overflow-hidden marble-black text-wedding-cream px-6 text-center ${bgImage ? 'pt-36 sm:pt-40' : 'pt-28'} ${tall ? 'pb-[150px]' : bgImage ? 'pb-24 sm:pb-28' : 'pb-16'}`}>
    {bgImage && (
      <>
        <img
          src={bgImage}
          alt={bgAlt}
          aria-hidden={!bgAlt}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: bgPosition, filter: 'grayscale(1) sepia(.5) hue-rotate(-8deg) saturate(1.15) brightness(.78) contrast(1.12)' }}
        />
        {/* Wash: the title has to stay readable over whatever the photo is doing, and
            the section below has to start from solid ink rather than a hard seam. */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg,rgba(12,11,10,.82) 0%,rgba(12,11,10,.34) 42%,rgba(12,11,10,.72) 82%,#0C0B0A 100%)' }}
          aria-hidden
        />
      </>
    )}
    <div className={`absolute inset-0 deco-coffer ${bgImage ? 'opacity-[.14]' : 'opacity-[.28]'}`} aria-hidden />
    <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(200,167,92,.16), transparent 70%)' }} aria-hidden />
    <RayFan className="absolute left-1/2 -translate-x-1/2 -top-[300px] w-[900px] h-[900px]" spread={360} opacity={.35} />
    <div className="relative max-w-[720px] mx-auto animate-heroIn">
      <RisingSun size={56} className="mx-auto" />
      <p className="mt-4 mb-[14px] font-sans font-semibold text-[10px] tracking-[.42em] uppercase text-wedding-gold">{kicker}</p>
      <h1 className="m-0 font-serif font-normal text-[clamp(38px,9vw,72px)] leading-[1] tracking-[.02em] text-wedding-cream" style={{ textWrap: 'balance' as any }}>{title}</h1>
      {desc && <p className="mt-6 mx-auto mb-0 max-w-[560px] font-italic italic text-[clamp(18px,2.4vw,22px)] leading-[1.5] text-wedding-cream/75">{desc}</p>}
    </div>
    {children && <div className="relative mt-9">{children}</div>}
  </div>
);

// ─── Buttons ───
export const btnPrimary = 'inline-block min-w-[150px] pt-[17px] px-[26px] pb-[14px] brass font-sans font-semibold text-[11px] tracking-[.3em] uppercase no-underline cursor-pointer deco-chamfer-8 transition-colors text-center';
export const btnGhostDark = 'inline-block min-w-[150px] pt-4 px-[26px] pb-[13px] border border-wedding-gold/70 text-wedding-goldLight font-sans font-semibold text-[11px] tracking-[.3em] uppercase no-underline cursor-pointer transition-all hover:bg-wedding-gold/10 hover:border-wedding-gold text-center';
export const btnGhostLight = 'inline-block py-[15px] px-6 border border-wedding-ink text-wedding-ink font-sans font-semibold text-[10px] tracking-[.3em] uppercase no-underline cursor-pointer transition-colors hover:bg-wedding-ink hover:text-wedding-goldLight text-center';
export const linkArrow = 'inline-flex items-center gap-[10px] font-sans font-semibold text-[10px] tracking-[.3em] uppercase no-underline cursor-pointer pt-[2px]';

// ─── Days remaining until the first event ───
// Days only: an hours-and-minutes readout implies a precision nobody needs sixteen
// months out, and it forced a re-render every half minute to say the same thing.
export function useCountdown(targetISO: string) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const iv = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(iv);
  }, []);
  const diff = Math.max(0, new Date(targetISO).getTime() - now);
  return { days: String(Math.floor(diff / 864e5)) };
}

// ─── Anchor-scroll helpers (Home is one long scroll; guide pages are real routes) ───
export function scrollToId(id: string) {
  requestAnimationFrame(() => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 8, behavior: 'smooth' });
  });
}

export function useSectionNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (id: string) => {
    if (pathname !== '/') {
      navigate('/');
      setTimeout(() => scrollToId(id), 80);
    } else {
      scrollToId(id);
    }
  };
}

// ─── prefers-reduced-motion (every new animation checks this) ───
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined' && 'matchMedia' in window
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );
  useEffect(() => {
    if (!('matchMedia' in window)) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}
