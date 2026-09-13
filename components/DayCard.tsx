import React from 'react';
import { Link } from 'react-router-dom';
import type { DayPlan } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const DayCard: React.FC<{ day: DayPlan }> = ({ day }) => {
  const { t } = useLanguage();
  return (
    <Link to={`/days/${day.id}`} className="dayrow" style={{ ['--a' as string]: `var(--${day.id}a)` }}>
      <div className="date"><b>{day.dayNum}</b><span>{day.monthShort}</span></div>
      <div>
        <div className="name">{day.name}</div>
        <div className="hook">{day.hook}</div>
        {day.tentative && <div className="note">{t('tentative')}</div>}
      </div>
      <span className="go" aria-hidden="true">→</span>
    </Link>
  );
};
export default DayCard;
