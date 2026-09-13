import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { DAYS, MAPS, SITE } from '../data/site';
import { gcalUrl } from '../utils/dates';

const Day: React.FC = () => {
  const { id } = useParams();
  const { t, lang } = useLanguage();
  const days = DAYS[lang];
  const idx = days.findIndex((d) => d.id === id);
  if (idx < 0) return <Navigate to="/days" replace />;
  const day = days[idx];
  const prev = days[idx - 1];
  const next = days[idx + 1];
  const light = day.id === 'd2' || day.id === 'd5';

  return (
    <div className="wrap page">
      <section className="stack">
        <div className="daynav">
          <Link to="/days">← {t('all_days')}</Link>
          <span className="muted small">{idx + 1} / {days.length}</span>
        </div>
        <div className={`dayhero rise ${light ? 'light' : ''}`} style={{ ['--c' as string]: `var(--${day.id})` }}>
          <div className="eyebrow">{day.dayNum} {day.monthShort} 2027 {day.tentative && <>· {t('tentative')}</>}</div>
          <h1>{day.name}</h1>
          <p className="trailer">{day.trailer}</p>
          <div className="facts">
            {day.time && <span>{day.time}</span>}
            {day.venue && <span>{day.venue.name}, {day.venue.area}</span>}
            {day.shuttle && <span>{t('shuttle')} {day.shuttle} {t('from_hotel')}</span>}
          </div>
        </div>
      </section>

      <section className="infogrid">
        {day.venue && (
          <div className="info">
            <span className="eyebrow">{t('venue')}</span>
            <b>{day.venue.name}</b>
            <span>{day.venue.area}</span>
            <a href={MAPS(day.venue.query)} target="_blank" rel="noopener">{t('open_map')} ↗</a>
          </div>
        )}
        {day.shuttle && (
          <div className="info">
            <span className="eyebrow">{t('shuttle')}</span>
            <b>{day.shuttle}</b>
            <span>{t('from_hotel')} · {SITE.hotel.name}</span>
          </div>
        )}
        {day.calRange && day.venue && (
          <div className="info">
            <span className="eyebrow">{day.dayNum} {day.monthShort}</span>
            <b>{day.time}</b>
            <a href={gcalUrl(`${day.name} · ${SITE.bride} & ${SITE.groom}`, day.calRange, day.venue.query, day.hook)} target="_blank" rel="noopener">{t('add_cal')} ↗</a>
          </div>
        )}
      </section>

      <section className="section">
        <h2>{t('day_what')}</h2>
        <p style={{ fontSize: 18 }}>{day.what}</p>
      </section>

      <section className="section">
        <h2>{t('day_timeline')}</h2>
        <ul className="timeline">
          {day.timeline.map((x) => (
            <li key={x.t + x.title}><span className="t">{x.t}</span><div><b>{x.title}</b><span>{x.desc}</span></div></li>
          ))}
        </ul>
      </section>

      <section className="role" style={{ ['--c' as string]: `var(--${day.id})` }}>
        <b>{day.role.title}</b>
        <p>{day.role.desc}</p>
      </section>

      <section className="infogrid">
        <div className="info">
          <span className="eyebrow">{t('day_wear')}</span>
          <div className="swatches">{day.palette.map((c) => <i key={c} style={{ background: c }} />)}</div>
          <span>{day.wear}</span>
          <Link to="/wear">{t('day_full_guide')} →</Link>
        </div>
        <div className="info">
          <span className="eyebrow">{t('day_eat')}</span>
          <span>{day.eat}</span>
        </div>
        <div className="phrase">
          <span className="eyebrow">{t('day_phrase')}</span>
          <span className="say">{day.phrase.say}</span>
          <span className="means">{day.phrase.means}</span>
        </div>
      </section>

      <div className="daynav">
        {prev ? <Link to={`/days/${prev.id}`}>← {prev.name}</Link> : <span />}
        {next ? <Link to={`/days/${next.id}`}>{next.name} →</Link> : <span />}
      </div>
    </div>
  );
};

export default Day;
