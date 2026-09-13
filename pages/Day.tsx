import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { DAYS, MAPS, SITE } from '../data/site';
import { gcalUrl } from '../utils/dates';
import Ornament from '../components/Ornament';

const Day: React.FC = () => {
  const { id } = useParams();
  const { t, lang } = useLanguage();
  const days = DAYS[lang];
  const idx = days.findIndex((d) => d.id === id);
  if (idx < 0) return <Navigate to="/days" replace />;
  const day = days[idx];
  const prev = days[idx - 1];
  const next = days[idx + 1];

  return (
    <div className="wrap page">
      <section className="stack">
        <div className="dayhero rise" style={{ ['--t' as string]: `var(--${day.id})` }}>
          <span className="caps">{day.dayNum} {day.monthShort} 2027{day.tentative && <> · <span className="it" style={{ textTransform: 'none', letterSpacing: 0, fontSize: 16 }}>{t('tentative')}</span></>}</span>
          <h1>{day.name}</h1>
          <p className="trailer">{day.trailer}</p>
          <div className="facts caps" style={{ color: 'var(--ink)' }}>
            {day.time && <span>{day.time}</span>}
            {day.venue && <span>{day.venue.name}</span>}
            {day.shuttle && <span>{t('shuttle')} {day.shuttle}</span>}
          </div>
        </div>
        <div className="daynav">
          <Link to="/days" className="link">{t('all_days')}</Link>
          <span className="it muted">{idx + 1} / {days.length}</span>
        </div>
      </section>

      <section className="infogrid">
        {day.venue && (
          <div className="info">
            <span className="caps">{t('venue')}</span>
            <b>{day.venue.name}</b>
            <span>{day.venue.area}</span>
            <a className="link" href={MAPS(day.venue.query)} target="_blank" rel="noopener" style={{ alignSelf: 'flex-start', marginTop: 6 }}>{t('open_map')}</a>
          </div>
        )}
        {day.shuttle && (
          <div className="info">
            <span className="caps">{t('shuttle')}</span>
            <b>{day.shuttle}</b>
            <span>{t('from_hotel')} · {SITE.hotel.name}</span>
          </div>
        )}
        {day.calRange && day.venue && (
          <div className="info">
            <span className="caps">{day.dayNum} {day.monthShort}</span>
            <b>{day.time}</b>
            <a className="link" href={gcalUrl(`${day.name} · ${SITE.bride} & ${SITE.groom}`, day.calRange, day.venue.query, day.hook)} target="_blank" rel="noopener" style={{ alignSelf: 'flex-start', marginTop: 6 }}>{t('add_cal')}</a>
          </div>
        )}
      </section>

      <section className="section narrow" style={{ width: '100%' }}>
        <span className="caps gold">{t('day_what')}</span>
        <p style={{ fontSize: 18 }}>{day.what}</p>
      </section>

      <section className="section">
        <span className="caps gold">{t('day_timeline')}</span>
        <ul className="timeline">
          {day.timeline.map((x) => (
            <li key={x.t + x.title}><span className="t">{x.t}</span><div><b>{x.title}</b><span>{x.desc}</span></div></li>
          ))}
        </ul>
      </section>

      <section className="role">
        <Ornament short />
        <b>{day.role.title}</b>
        <p>{day.role.desc}</p>
        <Ornament short />
      </section>

      <section className="infogrid">
        <div className="info">
          <span className="caps">{t('day_wear')}</span>
          <div className="swatches">{day.palette.map((c) => <i key={c} style={{ background: c }} />)}</div>
          <span>{day.wear}</span>
          <Link to="/wear" className="link" style={{ alignSelf: 'flex-start', marginTop: 6 }}>{t('day_full_guide')}</Link>
        </div>
        <div className="info">
          <span className="caps">{t('day_eat')}</span>
          <span>{day.eat}</span>
        </div>
        <div className="info phrase">
          <span className="caps">{t('day_phrase')}</span>
          <span className="say">{day.phrase.say}</span>
          <span className="means">{day.phrase.means}</span>
        </div>
      </section>

      <div className="daynav">
        {prev ? <Link to={`/days/${prev.id}`} className="go">← {prev.name}</Link> : <span />}
        {next ? <Link to={`/days/${next.id}`} className="go">{next.name} →</Link> : <span />}
      </div>
    </div>
  );
};
export default Day;
