import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { SITE } from '../data/site';

const Gifts: React.FC = () => {
  const { t, lang } = useLanguage();
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(SITE.btcAddress); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* ignore */ }
  };
  const charity = lang === 'en'
    ? 'If you can fly to Mumbai for a wedding, you\'ve been lucky. Not everyone has. Educate Girls Globally is one of the most rigorously measured education charities in India, and it\'s the one we\'d pick.'
    : 'Si puedes volar a Mumbai para una boda, has tenido suerte. No todos la tienen. Educate Girls Globally es una de las organizaciones educativas mejor evaluadas de India, y es la que elegiríamos.';
  return (
    <div className="wrap page">
      <section className="section">
        <div className="section-head">
          <h1 style={{ fontSize: 'clamp(38px, 9vw, 72px)' }}>{t('gifts_title')}</h1>
          <p className="lede muted">{t('gifts_sub')}</p>
        </div>
        <div className="gift">
          <h3>{SITE.charity.name}</h3>
          <p className="muted">{charity}</p>
          <div><a className="btn gold" href={SITE.charity.url} target="_blank" rel="noopener">{t('gifts_charity_btn')}</a></div>
        </div>
        <div className="gift">
          <p className="muted">{t('gifts_btc')}</p>
          <div className="mono">{SITE.btcAddress}</div>
          <div><button type="button" className="btn ghost sm" onClick={copy}>{copied ? t('copied') : t('copy')}</button></div>
        </div>
      </section>
    </div>
  );
};

export default Gifts;
