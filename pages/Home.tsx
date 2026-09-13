import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { CONFIRMED, DAYS, HERO_PHOTOS, SITE } from '../data/site';
import { HANDLED, PROMISES } from '../data/copy';
import NowStrip from '../components/NowStrip';
import DayCard from '../components/DayCard';

const useCycle = (n: number, ms: number) => {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (n < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setI((x) => (x + 1) % n), ms);
    return () => clearInterval(id);
  }, [n, ms]);
  return i;
};

const Home: React.FC = () => {
  const { t, lang } = useLanguage();
  const i = useCycle(HERO_PHOTOS.length, 5000);

  return (
    <div className="wrap page">
      <NowStrip />

      <section className="hero">
        <div className="hero-photo">
          {HERO_PHOTOS.map((p, k) => (
            <img key={p.src} src={p.src} alt="" loading={k === 0 ? 'eager' : 'lazy'}
              style={{ position: 'absolute', inset: 0, objectPosition: p.pos, opacity: k === i ? 1 : 0, transition: 'opacity 1.2s ease' }} />
          ))}
          <span className="badge">{SITE.dates[lang]}</span>
        </div>
        <div className="hero-text">
          <div className="eyebrow">{t('hero_kicker')}</div>
          <h1>{SITE.bride} <span className="amp">&amp;</span> {SITE.groom}</h1>
          <p className="lede">{t('hero_sub')}</p>
          <div className="hero-meta"><span>{SITE.city}</span><span>{SITE.dates[lang]}</span><span>{SITE.hashtag}</span></div>
          <div className="hero-cta">
            <Link to="/rsvp" className="btn gold">{t('cta_rsvp')}</Link>
            <Link to="/days" className="btn ghost">{t('cta_days')}</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>{t('promises_title')}</h2>
        <ul className="promises">
          {PROMISES[lang].map((p) => (
            <li key={p.what}>
              <span className="yw">{lang === 'en' ? 'you will' : 'vas a'}</span>
              <div className="what">{p.what}<span className="why">{p.why}</span></div>
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>{t('days_title')}</h2>
          <p className="muted">{t('days_sub')}</p>
        </div>
        <div className="days">
          {DAYS[lang].map((d) => <DayCard key={d.id} day={d} />)}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>{t('handled_title')}</h2>
          <p className="muted">{t('handled_sub')}</p>
        </div>
        <ul className="handled">
          {HANDLED[lang].map((h) => (
            <li key={h.title}><span className="check" aria-hidden="true">✓</span><div><b>{h.title}</b><span>{h.desc}</span></div></li>
          ))}
        </ul>
        <div className="yourjob">
          <span className="eyebrow" style={{ color: 'var(--marigold)' }}>{t('yourjob_title')}</span>
          <b>{t('yourjob_line')}</b>
          <span className="serif">{t('yourjob_sub')}</span>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>{t('wall_title')}</h2>
          <p className="muted">{t('wall_sub')}</p>
        </div>
        <div className="wall">
          {CONFIRMED.map((g) => <span key={g.name + g.city}>{g.name} <em>· {g.city}</em></span>)}
          <Link to="/rsvp" className="you" style={{ textDecoration: 'none' }}>+ {t('wall_you')}</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
