import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { DAYS, SITE } from '../data/site';
import DayCard from '../components/DayCard';

const Days: React.FC = () => {
  const { t, lang } = useLanguage();
  return (
    <div className="wrap page" style={{ paddingTop: 40 }}>
      <section className="section">
        <div className="section-head">
          <span className="caps gold">{SITE.dates[lang]} · {SITE.city}</span>
          <h1 style={{ fontSize: 'clamp(44px, 10vw, 84px)' }}>{t('days_title')}</h1>
          <p className="lede muted">{t('days_sub')}</p>
        </div>
        <div className="days">{DAYS[lang].map((d) => <DayCard key={d.id} day={d} />)}</div>
      </section>
    </div>
  );
};
export default Days;
