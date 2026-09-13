import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { DAYS, MILESTONES } from '../data/site';
import { daysBetween, mumbaiToday } from '../utils/dates';

/**
 * The strip at the top of the home page. It knows today's date in Mumbai and shows
 * the next thing a guest should do: a milestone before the trip, or the day's plan during it.
 */
const NowStrip: React.FC = () => {
  const { t, lang } = useLanguage();
  const today = mumbaiToday();

  const day = DAYS[lang].find((d) => d.date === today);
  if (day) {
    return (
      <Link to={`/days/${day.id}`} className="now dayof rise">
        <div>
          <div className="kicker">{t('countdown_today')} · {day.dayNum} {day.monthShort}</div>
          <div className="line">{day.strip}</div>
        </div>
        <div className="count"><b>→</b><span>{day.name.split(' ')[0]}</span></div>
      </Link>
    );
  }

  const m = MILESTONES[lang].find((x) => today >= x.from && today <= x.to) ?? MILESTONES[lang][0];
  const target = m.deadline ?? '2027-02-01';
  const left = daysBetween(today, target);
  return (
    <Link to={m.to_path} className="now rise">
      <div>
        <div className="kicker">{m.kicker}</div>
        <div className="line">{m.line}</div>
      </div>
      {left >= 0 && m.deadline && (
        <div className="count"><b>{left}</b><span>{t('countdown_days')} {t('countdown_left')}</span></div>
      )}
    </Link>
  );
};

export default NowStrip;
