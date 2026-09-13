import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { CONFIRMED, DAYS, HERO_PHOTO, SITE } from '../data/site';
import { HANDLED, PROMISES } from '../data/copy';
import NowStrip from '../components/NowStrip';
import DayCard from '../components/DayCard';
import Ornament from '../components/Ornament';

const Home: React.FC = () => {
  const { t, lang } = useLanguage();
  return (
    <div className="wrap page">
      <section className="stack">
        <div className="hero rise">
          <img src={HERO_PHOTO.src} alt="" style={{ objectPosition: HERO_PHOTO.pos }} fetchPriority="high" />
          <div className="hero-text">
            <span className="caps">{t('the_wedding_of')}</span>
            <h1>{SITE.bride} <span className="amp">&amp;</span> {SITE.groom}</h1>
            <span className="date">{SITE.dates[lang]} · {SITE.city}</span>
            <div className="hero-cta">
              <Link to="/rsvp" className="btn light">{t('cta_rsvp')}</Link>
            </div>
          </div>
        </div>
        <NowStrip />
      </section>

      <section className="section narrow" style={{ textAlign: 'center' }}>
        <Ornament short />
        <p className="lede i" style={{ marginInline: 'auto' }}>{t('hero_sub')}</p>
      </section>

      <section className="section">
        <h2><span className="it" style={{ color: 'var(--gold)' }}>{t('promises_title')}</span></h2>
        <ul className="promises">
          {PROMISES[lang].map((p) => (
            <li key={p.what}>
              <div className="what"><span className="yw">{lang === 'en' ? 'you will ' : 'vas a '}</span>{p.what}</div>
              <p className="why">{p.why}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <div className="section-head">
          <span className="caps gold">{SITE.dates[lang]}</span>
          <h2>{t('days_title')}</h2>
          <p className="muted">{t('days_sub')}</p>
        </div>
        <div className="days">{DAYS[lang].map((d) => <DayCard key={d.id} day={d} />)}</div>
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
          <span className="caps gold">{t('yourjob_title')}</span>
          <b>{t('yourjob_line')}</b>
          <span className="it">{t('yourjob_sub')}</span>
          <Ornament short />
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>{t('wall_title')}</h2>
          <p className="muted">{t('wall_sub')}</p>
        </div>
        <div className="wall">
          {CONFIRMED.map((g) => <span key={g.name + g.city}>{g.name} <em>{g.city}</em></span>)}
          <span><Link to="/rsvp">{t('wall_you')}</Link></span>
        </div>
      </section>
    </div>
  );
};
export default Home;
