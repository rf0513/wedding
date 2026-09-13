import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { DAYS, MILESTONES } from '../data/site';
import { daysBetween, mumbaiToday } from '../utils/dates';

/** One line under the hero: the next thing a guest should do, by today's date in Mumbai. */
const NowStrip: React.FC = () => {
  const { t, lang } = useLanguage();
  const today = mumbaiToday();
  const day = DAYS[lang].find((d) => d.date === today);
  if (day) {
    return (
      <Link to={`/days/${day.id}`} className="now">
        <span className="caps gold">{t('countdown_today')}</span>
        <span className="line">{day.strip}</span>
      </Link>
    );
  }
  const m = MILESTONES[lang].find((x) => today >= x.from && today <= x.to) ?? MILESTONES[lang][0];
  const left = m.deadline ? daysBetween(today, m.deadline) : -1;
  return (
    <Link to={m.to_path} className="now">
      <span className="caps gold">{m.kicker}</span>
      <span className="line">{m.line}</span>
      {left >= 0 && <span className="count">{left} {t('countdown_days')} {t('countdown_left')}</span>}
    </Link>
  );
};
export default NowStrip;
