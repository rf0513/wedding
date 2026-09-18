import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { CELEBRATIONS_EN, CELEBRATIONS_ES } from '../constants';

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * The "tabs" across the four celebration days. Rendered on a dark ground
 * (the page header); horizontally scrollable on phones.
 */
const DaySwitcher: React.FC<{ activeId: string; onSelect: (id: string) => void }> = ({ activeId, onSelect }) => {
  const { language, t } = useLanguage();
  const days = language === 'en' ? CELEBRATIONS_EN : CELEBRATIONS_ES;
  const navRef = useRef<HTMLElement>(null);

  // On phones the row scrolls; keep the active day centred without moving the page.
  useEffect(() => {
    const nav = navRef.current;
    const el = nav?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!nav || !el) return;
    nav.scrollTo({ left: el.offsetLeft - (nav.clientWidth - el.clientWidth) / 2, behavior: 'smooth' });
  }, [activeId]);

  return (
    <nav ref={navRef} aria-label={t('cel_switch_label')} className="hide-scrollbar flex justify-start sm:justify-center gap-2 overflow-x-auto -mx-6 px-6">
      {days.map((d) => {
        const active = d.id === activeId;
        return (
          <button
            key={d.id}
            onClick={() => onSelect(d.id)}
            aria-current={active ? 'page' : undefined}
            className="flex-none text-left py-[10px] px-[14px] border transition-all cursor-pointer"
            style={{
              borderColor: active ? '#C8A75C' : 'rgba(200,167,92,.35)',
              background: active ? 'linear-gradient(180deg,#E2C88A 0%,#C8A75C 48%,#B08F49 100%)' : 'rgba(12,11,10,.55)',
              color: active ? '#0C0B0A' : '#E2C88A',
            }}
          >
            <span className="block font-sans font-semibold text-[9px] tracking-[.3em] uppercase opacity-80">{t('day_label')} {pad(d.day)}</span>
            <span className="block mt-[3px] font-serif text-[15px] leading-none whitespace-nowrap">{d.title}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default DaySwitcher;
