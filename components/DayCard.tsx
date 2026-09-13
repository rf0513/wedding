import React from 'react';
import { Link } from 'react-router-dom';
import type { DayPlan } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const DayCard: React.FC<{ day: DayPlan }> = ({ day }) => {
  const { t } = useLanguage();
  return (
    <Link to={`/days/${day.id}`} className={`daycard ${day.id}`} style={{ ['--c' as string]: `var(--${day.id})` }}>
      <div className="date"><b>{day.dayNum}</b><span>{day.monthShort}</span></div>
      <div>
        <div className="name">{day.name}</div>
        <div className="hook">{day.hook}</div>
        {day.tentative && <div style={{ marginTop: 6 }}><span className="pill tent">{t('tentative')}</span></div>}
      </div>
      <div className="arrow" aria-hidden="true">→</div>
    </Link>
  );
};

export default DayCard;
