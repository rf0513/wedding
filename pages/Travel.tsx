import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { BRIEF, FAQ } from '../data/copy';
import { MAPS, SPOTS } from '../data/site';

const Travel: React.FC = () => {
  const { t, lang } = useLanguage();
  return (
    <div className="wrap page" style={{ paddingTop: 40 }}>
      <section className="section">
        <div className="section-head">
          <h1 style={{ fontSize: 'clamp(44px, 10vw, 84px)' }}>{t('travel_title')}</h1>
          <p className="lede muted">{t('travel_sub')}</p>
        </div>
        <nav className="jump" aria-label="Sections">
          {BRIEF[lang].map((b) => <a key={b.id} href={`#/travel#${b.id}`}>{b.title}</a>)}
        </nav>
      </section>

      {BRIEF[lang].map((b, i) => (
        <section key={b.id} id={b.id} className="brief">
          <h3><span className="n">{i + 1}</span>{b.title}</h3>
          <p className="did">{b.did}</p>
          <ul>{b.points.map((p) => <li key={p} dangerouslySetInnerHTML={{ __html: p }} />)}</ul>
        </section>
      ))}

      <section className="section" id="free">
        <div className="section-head">
          <h2>{t('travel_free')}</h2>
          <p className="muted">{t('travel_free_sub')}</p>
        </div>
        <div className="spots">
          {SPOTS[lang].map((s) => (
            <div key={s.id} className="spot">
              <b>{s.title}</b>
              <p>{s.desc}</p>
              <div className="links">
                <a className="link" href={MAPS(s.query)} target="_blank" rel="noopener">{t('open_map')}</a>
                {s.link && <a className="link" href={s.link} target="_blank" rel="noopener">Web</a>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="faq">
        <h2>{t('faq_title')}</h2>
        <div>
          {FAQ[lang].map((f) => (
            <details key={f.q} className="faq">
              <summary>{f.q}</summary>
              <div className="a" dangerouslySetInnerHTML={{ __html: f.a }} />
            </details>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Travel;
