import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { DAYS } from '../data/site';
import DayCard from '../components/DayCard';

const Days: React.FC = () => {
  const { t, lang } = useLanguage();
  return (
    <div className="wrap page">
      <section className="section">
        <div className="section-head">
          <h1 style={{ fontSize: 'clamp(38px, 9vw, 72px)' }}>{t('days_title')}</h1>
          <p className="lede muted">{t('days_sub')}</p>
        </div>
        <div className="days">{DAYS[lang].map((d) => <DayCard key={d.id} day={d} />)}</div>
      </section>
    </div>
  );
};

export default Days;
