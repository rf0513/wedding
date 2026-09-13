import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { DRESS, GARMENTS } from '../data/site';

const COPY = {
  en: {
    before: ['Comfortable shoes you can stand in for hours, and one pair you can dance in.', 'Something yellow and cheap for the Haldi. A sundress or a linen shirt from home is perfect.', 'One Western formal outfit as a backup, in case shopping day doesn\'t go your way.', 'Sunglasses, a light layer for evenings, and space in your suitcase for what you\'re about to buy.'],
    with: ['Kurtas, sarees, lehengas, sherwanis: we go together on day zero with Pavitra\'s family, who know where to go and what to pay.', 'A tailor takes measurements that day and fits it before the Sangeet.', 'Expect to spend less than you would on one good outfit at home, for two or three.', 'If you\'d rather buy at home first, look for a kurta set or lehenga online; sizing is generous and alterations are easy here.'],
    tailorNote: 'Nobody has to own anything Indian when they land. Most guests want to, though, and it\'s the most fun part of the week.',
  },
  es: {
    before: ['Zapatos cómodos para estar de pie por horas, y un par para bailar.', 'Algo amarillo y barato para el Haldi. Un vestido de verano o una camisa de lino de casa es perfecto.', 'Un atuendo formal occidental de respaldo, por si el día de compras no sale como esperas.', 'Lentes de sol, una capa ligera para las noches y espacio en la maleta para lo que vas a comprar.'],
    with: ['Kurtas, saris, lehengas, sherwanis: vamos juntos el día cero con la familia de Pavitra, que sabe adónde ir y cuánto pagar.', 'Un sastre toma medidas ese día y lo ajusta antes del Sangeet.', 'Espera gastar menos de lo que gastarías en un buen atuendo en casa, por dos o tres.', 'Si prefieres comprar en casa primero, busca un conjunto kurta o una lehenga en línea; las tallas son generosas y los arreglos son fáciles aquí.'],
    tailorNote: 'Nadie tiene que tener ropa india al aterrizar. Pero la mayoría de los invitados quiere, y es la parte más divertida de la semana.',
  },
};

const Wear: React.FC = () => {
  const { t, lang } = useLanguage();
  const c = COPY[lang];
  return (
    <div className="wrap page">
      <section className="section">
        <div className="section-head">
          <h1 style={{ fontSize: 'clamp(38px, 9vw, 72px)' }}>{t('wear_title')}</h1>
          <p className="lede muted">{t('wear_sub')}</p>
        </div>
        <p className="serif" style={{ fontSize: 22, maxWidth: '40ch' }}>{c.tailorNote}</p>
        <div className="split">
          <div className="box a"><h3>{t('wear_before')}</h3><ul>{c.before.map((x) => <li key={x}>{x}</li>)}</ul></div>
          <div className="box b"><h3>{t('wear_with')}</h3><ul>{c.with.map((x) => <li key={x}>{x}</li>)}</ul></div>
        </div>
      </section>

      <section className="section">
        <h2>{t('by_event')}</h2>
        <div className="stack">
          {DRESS[lang].map((d) => (
            <div key={d.dayId} className="dress" style={{ ['--c' as string]: `var(--${d.dayId})` }}>
              <h3><Link to={`/days/${d.dayId}`} style={{ textDecoration: 'none' }}>{d.title}</Link><span className="pill">{d.theme}</span></h3>
              <p className="muted">{d.desc}</p>
              <div className="cols">
                <div className="col"><b>{t('women')}</b><span>{d.women}</span></div>
                <div className="col"><b>{t('men')}</b><span>{d.men}</span></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>{t('wear_glossary')}</h2>
          <p className="muted">{t('wear_glossary_sub')}</p>
        </div>
        <div className="glossary">
          {GARMENTS[lang].map((g) => (
            <div key={g.id} className="gitem">
              <div className="img"><img src={g.img} alt={g.name} loading="lazy" /></div>
              <div className="body">
                <b>{g.name}</b>
                <span className="say">{g.say} · {g.who === 'women' ? t('women') : t('men')}</span>
                <p>{g.desc}</p>
                <div className="for">{g.bestFor.map((b) => <span key={b} className="pill">{b}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Wear;
