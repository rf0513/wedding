import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { SITE } from '../data/site';
import { IconDays, IconHome, IconPlane, IconRsvp, IconWear } from './Icons';

export const TopBar: React.FC = () => {
  const { t, lang, setLang } = useLanguage();
  const cls = ({ isActive }: { isActive: boolean }) => (isActive ? 'active' : undefined);
  return (
    <header className="topbar">
      <div className="wrap">
        <Link to="/" className="brand">P <span className="serif" style={{ color: 'var(--marigold-deep)' }}>&amp;</span> R <span className="tag">{SITE.hashtag}</span></Link>
        <nav className="topnav" aria-label="Main">
          <NavLink to="/days" className={cls}>{t('nav_days')}</NavLink>
          <NavLink to="/wear" className={cls}>{t('nav_wear')}</NavLink>
          <NavLink to="/travel" className={cls}>{t('nav_travel')}</NavLink>
          <NavLink to="/story" className={cls}>{t('nav_story')}</NavLink>
          <NavLink to="/gifts" className={cls}>{t('nav_gifts')}</NavLink>
          <NavLink to="/rsvp" className={cls}>{t('nav_rsvp')}</NavLink>
        </nav>
        <div className="lang" role="group" aria-label="Language">
          <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
          <button type="button" aria-pressed={lang === 'es'} onClick={() => setLang('es')}>ES</button>
        </div>
      </div>
    </header>
  );
};

export const TabBar: React.FC = () => {
  const { t } = useLanguage();
  const cls = ({ isActive }: { isActive: boolean }) => (isActive ? 'active' : undefined);
  return (
    <nav className="tabbar" aria-label="Main">
      <ul>
        <li><NavLink to="/" end className={cls}><IconHome />{t('nav_home')}</NavLink></li>
        <li><NavLink to="/days" className={cls}><IconDays />{t('nav_days')}</NavLink></li>
        <li><NavLink to="/wear" className={cls}><IconWear />{t('nav_wear')}</NavLink></li>
        <li><NavLink to="/travel" className={cls}><IconPlane />{t('nav_travel_short')}</NavLink></li>
        <li><NavLink to="/rsvp" className={cls}><IconRsvp />{t('nav_rsvp')}</NavLink></li>
      </ul>
    </nav>
  );
};

export const Footer: React.FC = () => {
  const { t, lang } = useLanguage();
  return (
    <footer>
      <div className="big">{t('footer_big')}</div>
      <div className="row">
        <span>{SITE.brideFull} &amp; {SITE.groomFull}</span>
        <span>·</span>
        <span>{SITE.dates[lang]}</span>
        <span>·</span>
        <span>{SITE.hashtag}</span>
      </div>
      <div className="row" style={{ textTransform: 'none', letterSpacing: 0, fontWeight: 500 }}>
        <Link to="/story">{t('nav_story')}</Link>
        <Link to="/gifts">{t('nav_gifts')}</Link>
      </div>
    </footer>
  );
};
