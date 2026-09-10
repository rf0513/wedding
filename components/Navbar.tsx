import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { LogoMark, useSectionNav } from './DecoUI';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const goSection = useSectionNav();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const goHome = () => {
    navigate('/');
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goView = (path: string) => {
    navigate(path);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const pad = (n: number) => String(n).padStart(2, '0');
  const menuItems = [
    { name: t('nav_home'), go: goHome },
    { name: t('nav_events'), go: () => { goSection('programme'); setMenuOpen(false); } },
    { name: t('nav_story'), go: () => { goSection('story'); setMenuOpen(false); } },
    { name: t('nav_traditions'), go: () => goView('/traditions') },
    { name: t('nav_travel'), go: () => goView('/travel') },
    { name: t('nav_qna'), go: () => goView('/qna') },
    { name: t('nav_registry'), go: () => { goSection('registry'); setMenuOpen(false); } },
    { name: t('nav_rsvp'), go: () => { goSection('rsvp'); setMenuOpen(false); } },
  ].map((m, i) => ({ ...m, num: pad(i + 1) }));

  const btnClasses = "h-10 px-[14px] border border-wedding-gold/55 bg-wedding-ink/75 backdrop-blur-md text-wedding-goldLight font-sans font-semibold text-[11px] tracking-[.28em] uppercase cursor-pointer pt-[3px] transition-colors hover:border-wedding-gold hover:bg-wedding-pine";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[60] flex justify-between items-center px-[18px] py-[14px] pointer-events-none">
        <a onClick={goHome} className="pointer-events-auto cursor-pointer no-underline flex items-center gap-[10px]">
          <LogoMark />
        </a>
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
            className={btnClasses}
          >
            {language === 'en' ? 'ES' : 'EN'}
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            className={`${btnClasses} flex items-center gap-[10px]`}
          >
            {menuOpen ? (language === 'en' ? 'Close' : 'Cerrar') : (language === 'en' ? 'Menu' : 'Menú')}
            <span className="inline-flex flex-col gap-1 -mt-[3px]">
              <span className="block w-4 h-[1.5px] bg-wedding-goldLight" />
              <span className="block w-4 h-[1.5px] bg-wedding-goldLight" />
            </span>
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[55] bg-wedding-ink/96 backdrop-blur-2xl flex flex-col justify-start overflow-y-auto px-7 pt-20 pb-8 animate-heroIn">
          <p className="mb-[22px] font-sans font-semibold text-[10px] tracking-[.4em] uppercase text-wedding-gold">
            {t('menu_label')}
          </p>
          <nav className="flex flex-col my-auto">
            {menuItems.map((m) => (
              <a
                key={m.num}
                onClick={m.go}
                className="flex items-baseline gap-[18px] py-[clamp(8px,1.6vh,13px)] border-t border-wedding-gold/[.18] cursor-pointer no-underline text-wedding-cream hover:text-wedding-goldLight hover:pl-2 transition-all"
              >
                <span className="font-sans font-light text-xs tracking-[.2em] text-wedding-gold min-w-[28px]">{m.num}</span>
                <span className="font-serif text-[clamp(26px,6.5vw,38px)] leading-[1.05] tracking-[.02em]">{m.name}</span>
              </a>
            ))}
          </nav>
          <div className="mt-6 flex-none flex justify-between items-center pt-6 border-t border-wedding-gold/[.18]">
            <span className="font-sans font-light text-[11px] tracking-[.3em] uppercase text-wedding-cream/55">Mumbai · 2027</span>
            <span className="font-sans font-semibold text-[11px] tracking-[.3em] text-wedding-gold">#PR27</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
