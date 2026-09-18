import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { LogoMark, useSectionNav, usePrefersReducedMotion } from './DecoUI';
import { CELEBRATIONS_EN, CELEBRATIONS_ES } from '../constants';
import { MirrorEmblem } from './Ornaments';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const goSection = useSectionNav();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Escape closes the menu. Without it the overlay is a trap: the only way out is
  // finding the Close button.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  // The bar is transparent over the hero and lays down an ink ground once you scroll,
  // so links never sit unreadably on white marble — and never collide with the text
  // underneath them.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
  const days = language === 'en' ? CELEBRATIONS_EN : CELEBRATIONS_ES;
  type MenuItem = { name: string; href: string; go: () => void; children?: { label: string; name: string; href: string; go: () => void }[] };
  const menuItems: (MenuItem & { num: string })[] = ([
    { name: t('nav_home'), href: '#/', go: goHome },
    {
      name: t('nav_celebrations'),
      href: '#/celebrations',
      go: () => { goSection('celebrations'); setMenuOpen(false); },
      children: days.map((d) => ({ label: `${t('day_label')} ${pad(d.day)}`, name: d.title, href: `#/celebrations/${d.id}`, go: () => goView(`/celebrations/${d.id}`) })),
    },
    { name: t('nav_story'), href: '#/story', go: () => { goSection('story'); setMenuOpen(false); } },
    { name: t('nav_attire'), href: '#/attire', go: () => goView('/attire') },
    { name: t('nav_travel'), href: '#/travel', go: () => goView('/travel') },
    { name: t('nav_qna'), href: '#/qna', go: () => goView('/qna') },
    { name: t('nav_rsvp'), href: '#/rsvp', go: () => { goSection('rsvp'); setMenuOpen(false); } },
    { name: t('nav_registry'), href: '#/registry', go: () => { goSection('registry'); setMenuOpen(false); } },
  ] as MenuItem[]).map((m, i) => ({ ...m, num: pad(i + 1) }));

  const btnClasses = "h-10 px-[14px] border border-wedding-gold/60 bg-wedding-ink/70 backdrop-blur-md text-wedding-goldLight font-sans font-semibold text-[11px] tracking-[.28em] uppercase cursor-pointer pt-[3px] transition-colors hover:border-wedding-goldLight hover:bg-wedding-ink/90 deco-chamfer-8";

  // Shown as a real bar from lg up. The hamburger stays at every width because it is
  // the full index — these five are the shortcuts, not the whole contents.
  const primaryNav = [
    { name: t('nav_celebrations'), href: '#/celebrations', go: () => goSection('celebrations') },
    { name: t('nav_story'), href: '#/story', go: () => goSection('story') },
    { name: t('nav_attire'), href: '#/attire', go: () => goView('/attire') },
    { name: t('nav_travel'), href: '#/travel', go: () => goView('/travel') },
    { name: t('nav_qna'), href: '#/qna', go: () => goView('/qna') },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[60] flex justify-between items-center gap-5 px-[18px] py-[14px] pointer-events-none">
        {/* Visual ground only — kept pointer-events-none so the hero stays clickable
            through the transparent bar, exactly as before. */}
        <span
          aria-hidden
          className={`absolute inset-0 border-b transition-[background-color,border-color] duration-300 ${
            scrolled && !menuOpen
              ? 'bg-wedding-ink/95 backdrop-blur-md border-wedding-gold/25'
              : 'bg-transparent border-transparent'
          }`}
        />
        <a href="#/" onClick={(e) => { e.preventDefault(); goHome(); }} aria-label="Pavitra & Ramon — home" className="relative pointer-events-auto cursor-pointer no-underline flex items-center gap-[10px]">
          <LogoMark />
        </a>

        <nav aria-label={t('menu_label')} className="relative pointer-events-auto hidden lg:flex items-center gap-7">
          {primaryNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => { e.preventDefault(); item.go(); }}
              className="font-sans font-semibold text-[11px] tracking-[.22em] uppercase text-wedding-cream/85 no-underline cursor-pointer whitespace-nowrap transition-colors hover:text-wedding-goldLight"
            >
              {item.name}
            </a>
          ))}
        </nav>

        <div className="relative pointer-events-auto flex items-center gap-2">
          <a
            href="#/rsvp"
            onClick={(e) => { e.preventDefault(); goSection('rsvp'); }}
            className="hidden lg:inline-flex items-center h-10 px-[18px] pt-[3px] brass font-sans font-semibold text-[11px] tracking-[.28em] uppercase no-underline cursor-pointer deco-chamfer-8"
          >
            {t('nav_rsvp')}
          </a>
          <button
            type="button"
            onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
            aria-label={language === 'en' ? 'Cambiar a español' : 'Switch to English'}
            className={btnClasses}
          >
            {language === 'en' ? 'ES' : 'EN'}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={menuOpen}
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
        <div className="fixed inset-0 z-[55] marble-black overflow-y-auto">
          {/* Opaque ink ground — never rely on backdrop-filter for legibility. */}
          <span aria-hidden className="pointer-events-none absolute inset-0 deco-coffer opacity-[.18]" />
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-[280px] w-[720px] h-[720px] deco-sunburst-header"
          />
          <div
            className="relative min-h-full flex flex-col justify-start px-7 pt-20 pb-8"
            style={{ animation: reduced ? 'none' : 'menuIn .34s cubic-bezier(.2,.7,.2,1) both' }}
          >
          <p className="mb-[22px] font-sans font-semibold text-[10px] tracking-[.4em] uppercase text-wedding-gold">
            {t('menu_label')}
          </p>
          <nav className="flex flex-col my-auto">
            {menuItems.map((m) => (
              <React.Fragment key={m.num}>
                <a
                  href={m.href}
                  onClick={(e) => { e.preventDefault(); m.go(); }}
                  style={{ animation: reduced ? 'none' : `menuRow .4s cubic-bezier(.2,.7,.2,1) ${80 + Number(m.num) * 26}ms both` }}
                  className="flex items-baseline gap-[18px] py-[clamp(8px,1.6vh,13px)] border-t border-wedding-gold/[.18] cursor-pointer no-underline text-wedding-cream hover:text-wedding-goldLight hover:pl-2 transition-all"
                >
                  <span className="font-sans font-light text-xs tracking-[.2em] text-wedding-gold min-w-[28px]">{m.num}</span>
                  <span className="font-serif text-[clamp(26px,6.5vw,38px)] leading-[1.05] tracking-[.02em]">{m.name}</span>
                </a>
                {m.children && (
                  <div
                    style={{ animation: reduced ? 'none' : `menuRow .4s cubic-bezier(.2,.7,.2,1) ${110 + Number(m.num) * 26}ms both` }}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-1 pl-[46px] pb-[clamp(8px,1.6vh,14px)]"
                  >
                    {m.children.map((c) => (
                      <a
                        key={c.name}
                        href={c.href}
                        onClick={(e) => { e.preventDefault(); c.go(); }}
                        className="block py-[6px] cursor-pointer no-underline text-wedding-cream/85 hover:text-wedding-goldLight transition-colors"
                      >
                        <span className="block font-sans font-semibold text-[9px] tracking-[.3em] uppercase text-wedding-gold">{c.label}</span>
                        <span className="block font-serif text-[clamp(16px,4.2vw,20px)] leading-[1.15]">{c.name}</span>
                      </a>
                    ))}
                  </div>
                )}
              </React.Fragment>
            ))}
          </nav>
          <div className="mt-6 flex-none flex justify-between items-center pt-6 border-t border-wedding-gold/[.18]">
            <span className="font-sans font-light text-[11px] tracking-[.3em] uppercase text-wedding-cream/55">{t('hero_dates')}</span>
            <MirrorEmblem size={40} />
            <span className="font-sans font-light text-[11px] tracking-[.3em] uppercase text-wedding-cream/55">Mumbai</span>
          </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
