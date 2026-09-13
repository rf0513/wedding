import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { SITE } from '../data/site';

type Form = {
  name: string; email: string; coming: 'yes' | 'no' | ''; party: string; names: string;
  arrive: string; depart: string; hotel: 'yes' | 'no' | ''; diet: string; wall: boolean; city: string; note: string;
};

const empty: Form = { name: '', email: '', coming: '', party: '1', names: '', arrive: '', depart: '', hotel: 'yes', diet: '', wall: true, city: '', note: '' };

const RSVP: React.FC = () => {
  const { t, lang } = useLanguage();
  const [f, setF] = useState<Form>(empty);
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const set = <K extends keyof Form>(k: K, v: Form[K]) => setF((x) => ({ ...x, [k]: v }));
  const coming = f.coming === 'yes';

  const lines = () => [
    `${t('f_name')}: ${f.name}`, `${t('f_email')}: ${f.email}`, `${t('f_coming')}: ${f.coming}`,
    ...(coming ? [
      `${t('f_party')}: ${f.party}`, `${t('f_names')}: ${f.names}`, `${t('f_arrive')}: ${f.arrive}`, `${t('f_depart')}: ${f.depart}`,
      `${t('f_hotel')}: ${f.hotel}`, `${t('f_diet')}: ${f.diet}`, `${t('f_city')}: ${f.city}`, `Wall: ${f.wall ? 'yes' : 'no'}`,
    ] : []),
    `${t('f_note')}: ${f.note}`, `Lang: ${lang}`,
  ];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.coming) return;
    if (!SITE.formEndpoint) {
      const subject = `RSVP ${SITE.hashtag}: ${f.name} (${f.coming})`;
      window.location.href = `mailto:${SITE.rsvpEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines().join('\n'))}`;
      setState('done');
      return;
    }
    setState('sending');
    try {
      const r = await fetch(SITE.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ ...f, lang, summary: lines().join('\n') }) });
      if (!r.ok) throw new Error(String(r.status));
      setState('done');
    } catch {
      setState('error');
    }
  };

  if (state === 'done') {
    return (
      <div className="wrap page">
        <div className="done rise">
          <h2>{coming ? t('done_title') : t('done_no_title')}</h2>
          <p className="lede i">{coming ? t('done_sub') : t('done_no_sub')}</p>
          {!SITE.formEndpoint && <p className="small muted">{t('f_mail_note')}</p>}
          <div className="hero-cta" style={{ justifyContent: 'center' }}>
            {coming && <Link to="/wear" className="btn">{t('nav_wear')}</Link>}
            <Link to="/" className="btn ghost">{t('nav_home')}</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wrap page" style={{ paddingTop: 40 }}>
      <section className="section narrow" style={{ width: '100%' }}>
        <div className="section-head">
          <span className="caps gold">{t('rsvp_by')} {t('rsvp_by_date')}</span>
          <h1 style={{ fontSize: 'clamp(44px, 10vw, 84px)' }}>{t('rsvp_title')}</h1>
          <p className="lede muted">{t('rsvp_sub')}</p>
        </div>

        <form className="form" onSubmit={submit}>
          <div className="two">
            <div className="field"><label htmlFor="name">{t('f_name')}</label><input id="name" required value={f.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" /></div>
            <div className="field"><label htmlFor="email">{t('f_email')}</label><input id="email" type="email" required value={f.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" /></div>
          </div>

          <div className="field">
            <label>{t('f_coming')}</label>
            <div className="choice">
              <button type="button" aria-pressed={f.coming === 'yes'} onClick={() => set('coming', 'yes')}>{t('f_yes')}</button>
              <button type="button" aria-pressed={f.coming === 'no'} onClick={() => set('coming', 'no')}>{t('f_no')}</button>
            </div>
          </div>

          {coming && (
            <>
              <div className="two">
                <div className="field">
                  <label htmlFor="party">{t('f_party')}</label>
                  <select id="party" value={f.party} onChange={(e) => set('party', e.target.value)}>
                    {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                  <span className="hint">{t('f_party_hint')}</span>
                </div>
                <div className="field"><label htmlFor="city">{t('f_city')}</label><input id="city" value={f.city} onChange={(e) => set('city', e.target.value)} placeholder="Panama City, Albuquerque, Oakland…" /></div>
              </div>
              {Number(f.party) > 1 && (
                <div className="field"><label htmlFor="names">{t('f_names')}</label><input id="names" value={f.names} onChange={(e) => set('names', e.target.value)} /></div>
              )}
              <div className="two">
                <div className="field"><label htmlFor="arrive">{t('f_arrive')}</label><input id="arrive" value={f.arrive} onChange={(e) => set('arrive', e.target.value)} /><span className="hint">{t('f_arrive_hint')}</span></div>
                <div className="field"><label htmlFor="depart">{t('f_depart')}</label><input id="depart" value={f.depart} onChange={(e) => set('depart', e.target.value)} /><span className="hint">{t('f_depart_hint')}</span></div>
              </div>
              <div className="field">
                <label>{t('f_hotel')}</label>
                <div className="choice">
                  <button type="button" aria-pressed={f.hotel === 'yes'} onClick={() => set('hotel', 'yes')}>{t('f_hotel_yes')}</button>
                  <button type="button" aria-pressed={f.hotel === 'no'} onClick={() => set('hotel', 'no')}>{t('f_hotel_no')}</button>
                </div>
              </div>
              <div className="field"><label htmlFor="diet">{t('f_diet')}</label><input id="diet" value={f.diet} onChange={(e) => set('diet', e.target.value)} /></div>
              <label className="checkline"><input type="checkbox" id="wall" checked={f.wall} onChange={(e) => set('wall', e.target.checked)} /><span>{t('f_wall')}</span></label>
            </>
          )}

          <div className="field"><label htmlFor="note">{t('f_note')}</label><textarea id="note" rows={3} value={f.note} onChange={(e) => set('note', e.target.value)} /></div>

          {state === 'error' && <p className="err">{t('err_generic')}</p>}
          <button type="submit" className="btn block" disabled={!f.coming || state === 'sending'}>{state === 'sending' ? t('f_sending') : t('f_send')}</button>
          {!SITE.formEndpoint && <p className="hint small muted">{t('f_mail_note')}</p>}
        </form>
      </section>
    </div>
  );
};

export default RSVP;
