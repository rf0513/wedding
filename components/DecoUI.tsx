import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// ─── Scroll-reveal wrapper (mirrors the design's [data-reveal] fade/rise-in) ───
export const Reveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'article' | 'section';
}> = ({ children, className = '', delay = 0, as = 'div' }) => {
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
}> = ({ size = 14, borderWidth = 2, innerBg = '#F3EEE1', innerPadding = 8, className = '', style, children }) => (
  <div className={`deco-step-${size} ${className}`} style={{ padding: borderWidth, background: '#C8A951', ...style }}>
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

// ─── Scrolling marquee ticker ───
export const Marquee: React.FC<{ text: string }> = ({ text }) => (
  <div className="bg-wedding-gold text-wedding-ink overflow-hidden py-3 pb-[9px] border-y border-wedding-ink">
    <div className="flex w-max animate-marquee font-sans font-semibold text-[11px] tracking-[.34em] uppercase whitespace-nowrap">
      <span className="pr-9">{text}</span>
      <span className="pr-9">{text}</span>
    </div>
  </div>
);

// ─── Hero notched border + corner brackets ───
export const HeroFrame: React.FC = () => (
  <div className="absolute inset-[14px] border border-wedding-gold/75 pointer-events-none animate-frameIn" aria-hidden>
    <span className="absolute -left-px -top-px w-[26px] h-[26px] bg-wedding-gold" style={{ clipPath: 'polygon(0 0,100% 0,100% 34%,66% 34%,66% 66%,34% 66%,34% 100%,0 100%)' }} />
    <span className="absolute -right-px -top-px w-[26px] h-[26px] bg-wedding-gold" style={{ clipPath: 'polygon(0 0,100% 0,100% 100%,66% 100%,66% 66%,34% 66%,34% 34%,0 34%)' }} />
    <span className="absolute -left-px -bottom-px w-[26px] h-[26px] bg-wedding-gold" style={{ clipPath: 'polygon(0 0,34% 0,34% 34%,66% 34%,66% 66%,100% 66%,100% 100%,0 100%)' }} />
    <span className="absolute -right-px -bottom-px w-[26px] h-[26px] bg-wedding-gold" style={{ clipPath: 'polygon(66% 0,100% 0,100% 100%,0 100%,0 66%,34% 66%,34% 34%,66% 34%)' }} />
  </div>
);

// ─── Small deco corner-notch badge (used for the P&R logo mark) ───
export const LogoMark: React.FC<{ className?: string }> = ({ className = '' }) => (
  <span className={`grid place-items-center w-10 h-10 bg-wedding-gold deco-step-12 ${className}`}>
    <span className="font-serif text-[15px] leading-none tracking-[.06em] text-wedding-ink pt-[2px]">P&amp;R</span>
  </span>
);

// ─── Live countdown to the first event ───
export function useCountdown(targetISO: string) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const iv = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(iv);
  }, []);
  const target = new Date(targetISO).getTime();
  const diff = Math.max(0, target - now);
  const pad = (n: number) => String(n).padStart(2, '0');
  return {
    days: String(Math.floor(diff / 864e5)),
    hours: pad(Math.floor(diff / 36e5) % 24),
    minutes: pad(Math.floor(diff / 6e4) % 60),
  };
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
