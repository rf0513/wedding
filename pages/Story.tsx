import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { TRIPS } from '../data/site';

const Story: React.FC = () => {
  const { t, lang } = useLanguage();
  return (
    <div className="wrap page">
      <section className="section">
        <div className="section-head">
          <h1 style={{ fontSize: 'clamp(38px, 9vw, 72px)' }}>{t('story_title')}</h1>
          <p className="lede muted">{t('story_sub')}</p>
        </div>
      </section>
      <section className="trips">
        {TRIPS[lang].map((tr) => (
          <article key={tr.id} className="trip">
            {tr.img ? (
              <div className="img"><img src={tr.img} alt={tr.title} loading="lazy" /></div>
            ) : (
              <div className="img empty">{tr.flag} {tr.where}</div>
            )}
            <div className="txt">
              <div className="where"><span className="flag" aria-hidden="true">{tr.flag}</span><span className="eyebrow">{tr.when} · {tr.where}</span></div>
              <h3>{tr.title}</h3>
              <p>{tr.desc}</p>
            </div>
          </article>
        ))}
      </section>
      <p className="bigquote">{lang === 'en' ? 'Six trips. Two families. One more flight, and this time you\'re on it.' : 'Seis viajes. Dos familias. Un vuelo más, y esta vez vienes tú.'}</p>
    </div>
  );
};

export default Story;
