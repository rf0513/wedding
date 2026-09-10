import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import {
  EVENTS_EN, EVENTS_ES,
  SIGHTSEEING_EN, SIGHTSEEING_ES,
  SHOPPING_EN, SHOPPING_ES,
  FOOD_EN, FOOD_ES,
  SURVIVAL_TIPS_EN, SURVIVAL_TIPS_ES,
  HOTEL_QUERY,
} from '../constants';
import { Reveal, StepFrame, Sunburst, ChevronBand, scrollToId } from '../components/DecoUI';

const Travel: React.FC = () => {
  const { language, t } = useLanguage();
  const en = language === 'en';
  const navigate = useNavigate();
  const [activeLocId, setActiveLocId] = useState('hotel');

  const events = en ? EVENTS_EN : EVENTS_ES;
  const sightseeing = en ? SIGHTSEEING_EN : SIGHTSEEING_ES;
  const shopping = en ? SHOPPING_EN : SHOPPING_ES;
  const food = en ? FOOD_EN : FOOD_ES;
  const tips = en ? SURVIVAL_TIPS_EN : SURVIVAL_TIPS_ES;
  const pad = (n: number) => String(n).padStart(2, '0');

  const locs = [
    { id: 'hotel', title: 'Taj The Trees', query: HOTEL_QUERY },
    { id: 'airport', title: en ? 'Airport (BOM)' : 'Aeropuerto (BOM)', query: 'Chhatrapati Shivaji Maharaj International Airport' },
    ...events.map((e) => ({ id: 'ev' + e.id, title: e.location, query: `${e.location}, ${e.address}` })),
    ...sightseeing.map((s) => ({ id: s.id, title: s.title, query: s.query })),
    ...shopping.map((s) => ({ id: s.id, title: s.title, query: s.query })),
    ...food.map((f) => ({ id: f.id, title: f.title, query: f.query })),
  ];
  const active = locs.find((l) => l.id === activeLocId) || locs[0];
  const mapSrc = active.id === 'hotel'
    ? `https://maps.google.com/maps?q=${encodeURIComponent(HOTEL_QUERY)}&t=m&z=15&ie=UTF8&iwloc=near&output=embed`
    : `https://maps.google.com/maps?saddr=${encodeURIComponent(HOTEL_QUERY)}&daddr=${encodeURIComponent(active.query)}&dirflg=d&t=m&ie=UTF8&iwloc=near&output=embed`;
  const mapCaption = active.id === 'hotel' ? t('map_hotel') : `${t('map_route')} ${active.title}`;

  const selectMapLoc = (id: string) => {
    setActiveLocId(id);
    scrollToId('travel-map');
  };

  const goHome = () => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <main className="bg-wedding-cream text-wedding-ink pb-20">
      <div className="relative overflow-hidden bg-wedding-ink text-wedding-cream pt-28 px-6 pb-14 text-center">
        <Sunburst variant="header" />
        <div className="relative max-w-[640px] mx-auto">
          <p className="m-0 mb-[14px] font-sans font-semibold text-[10px] tracking-[.4em] uppercase text-wedding-gold">{t('guide_no')} 2 · {t('travel_welcome')}</p>
          <h1 className="m-0 font-serif font-normal text-[clamp(36px,9vw,64px)] leading-[1.02]" style={{ textWrap: 'balance' as any }}>{t('travel_title')}</h1>
          <p className="mt-5 mx-auto mb-0 font-sans font-light text-[15px] leading-[1.65] text-wedding-cream/75">{t('travel_desc')}</p>
        </div>
      </div>
      <ChevronBand />

      <div className="max-w-[760px] mx-auto px-6">
        <div className="grid border border-wedding-ink mt-10" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))' }}>
          <div className="pt-[22px] px-5 pb-[18px] border-b border-wedding-ink">
            <p className="m-0 mb-[10px] font-sans font-semibold text-[10px] tracking-[.3em] uppercase text-wedding-bronze">{t('travel_airport')}</p>
            <div className="font-sans font-light text-[44px] leading-none tracking-[.06em]">BOM</div>
            <p className="mt-2 mb-0 font-sans font-light text-[13px] leading-[1.4] text-wedding-ink/70">Chhatrapati Shivaji Maharaj Int'l</p>
          </div>
          <div className="pt-[22px] px-5 pb-[18px] border-b border-wedding-ink">
            <p className="m-0 mb-[10px] font-sans font-semibold text-[10px] tracking-[.3em] uppercase text-wedding-bronze">{t('travel_stay')}</p>
            <a href="https://www.tajhotels.com/en-in/hotels/taj-the-trees" target="_blank" rel="noopener noreferrer" className="block font-serif text-[30px] leading-[1.1] text-wedding-ink no-underline hover:text-wedding-bronze">Taj The Trees ↗</a>
            <p className="mt-2 mb-0 font-sans font-light text-[13px] leading-[1.4] text-wedding-ink/70">Vikhroli, Mumbai · {t('recommended')}</p>
          </div>
        </div>

        {/* Sights */}
        <section className="mt-[72px]">
          <h2 className="m-0 mb-7 font-serif font-normal text-[clamp(30px,7vw,44px)] leading-[1.05]">{t('travel_sights')}</h2>
          <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))' }}>
            {sightseeing.map((it) => (
              <a key={it.id} href={it.link} target="_blank" rel="noopener noreferrer" className="block no-underline text-wedding-ink">
                <StepFrame size={14} borderWidth={2} innerBg="#F3EEE1" innerPadding={8}>
                  <img src={it.img} alt={it.title} className="block w-full aspect-[3/2] object-cover" style={{ filter: 'saturate(.85)' }} />
                </StepFrame>
                <h3 className="mt-4 mb-2 font-serif font-normal text-[22px] leading-[1.15]">{it.title}</h3>
                <p className="m-0 mb-[10px] font-sans font-light text-sm leading-[1.6] text-wedding-ink/75">{it.desc}</p>
                <span className="font-sans font-semibold text-[10px] tracking-[.3em] uppercase text-wedding-bronze">{t('travel_visit_website')} ↗</span>
              </a>
            ))}
          </div>
          <div className="mt-10 border border-wedding-ink py-[26px] px-[22px] text-center">
            <h3 className="m-0 mb-2 font-serif font-normal text-2xl leading-[1.15]">{t('travel_tour_title')}</h3>
            <p className="m-0 mb-[18px] font-sans font-light text-sm leading-[1.6] text-wedding-ink/75">{t('travel_tour_desc')}</p>
            <a href="https://www.tripadvisor.com/AttractionProductReview-g304554-d11482147-Private_Full_Day_Mumbai_City_Tour_with_Elephanta_Caves_Excursion-Mumbai_Maharashtr.html" target="_blank" rel="noopener noreferrer" className="inline-block py-[15px] px-6 bg-wedding-ink text-wedding-goldLight font-sans font-semibold text-[10px] tracking-[.3em] uppercase no-underline deco-chamfer-8 hover:text-wedding-cream">
              {t('travel_tour_btn')} ↗
            </a>
          </div>
        </section>

        {/* Shopping */}
        <section className="mt-[72px]">
          <h2 className="m-0 mb-2 font-serif font-normal text-[clamp(30px,7vw,44px)] leading-[1.05]">{t('travel_shopping')}</h2>
          <p className="m-0 mb-7 font-sans font-light text-[15px] leading-[1.6] text-wedding-ink/75">{t('travel_shopping_desc')}</p>
          <div className="flex flex-col">
            {shopping.map((it) => (
              <a key={it.id} href={it.link} target="_blank" rel="noopener noreferrer" className="grid grid-cols-[96px_minmax(0,1fr)] gap-[18px] items-start py-[22px] border-t border-wedding-ink/35 no-underline text-wedding-ink">
                <img src={it.img} alt={it.title} className="block w-24 h-24 object-cover border border-wedding-gold p-[3px] bg-wedding-cream" style={{ filter: 'saturate(.85)' }} />
                <div className="min-w-0">
                  <h3 className="m-0 mb-1.5 font-serif font-normal text-[22px] leading-[1.15]">{it.title}</h3>
                  <p className="m-0 mb-[10px] font-sans font-light text-sm leading-[1.6] text-wedding-ink/75">{it.desc}</p>
                  <span className="font-sans font-semibold text-[10px] tracking-[.3em] uppercase text-wedding-bronze">{it.cta} ↗</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Food */}
        <section className="mt-[72px]">
          <h2 className="m-0 mb-2 font-serif font-normal text-[clamp(30px,7vw,44px)] leading-[1.05]">{t('travel_food')}</h2>
          <p className="m-0 mb-[18px] font-sans font-light text-[15px] leading-[1.6] text-wedding-ink/75">{t('travel_food_desc')}</p>
          <div className="border border-wedding-gold py-[14px] px-4 flex gap-[14px] items-baseline mb-2">
            <span className="font-sans font-semibold text-[10px] leading-[1.4] tracking-[.3em] uppercase text-wedding-bronze whitespace-nowrap">{t('travel_res_title')}</span>
            <span className="font-sans font-light text-[13px] leading-[1.5] text-wedding-ink/80">{t('travel_res_desc')}</span>
          </div>
          <div className="flex flex-col">
            {food.map((it) => (
              <div key={it.id} className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 py-[22px] border-t border-wedding-ink/35">
                <div className="min-w-0">
                  <h3 className="m-0 mb-1.5 font-serif font-normal text-[22px] leading-[1.15]">{it.title}</h3>
                  <p className="m-0 mb-3 font-sans font-light text-sm leading-[1.6] text-wedding-ink/75">{it.desc}</p>
                  <div className="flex gap-5 flex-wrap">
                    <a href={it.link} target="_blank" rel="noopener noreferrer" className="font-sans font-semibold text-[10px] tracking-[.3em] uppercase text-wedding-bronze no-underline">{t('travel_visit_website')} ↗</a>
                    <a onClick={() => selectMapLoc(it.id)} className="font-sans font-semibold text-[10px] tracking-[.3em] uppercase text-wedding-ink no-underline cursor-pointer border-b border-wedding-ink pb-0.5">{t('view_on_map')}</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <a href="https://www.zomato.com/mumbai/fine-dining-restaurants" target="_blank" rel="noopener noreferrer" className="inline-block mt-[14px] font-sans font-semibold text-[10px] tracking-[.3em] uppercase text-wedding-ink no-underline border-b border-wedding-ink pb-[3px]">
            {t('travel_zomato')} ↗
          </a>
        </section>

        {/* Map */}
        <section id="travel-map" className="mt-[72px]">
          <StepFrame size={20} borderWidth={2} innerBg="#0E1512" innerPadding={0}>
            <div className="pt-[30px] px-[22px] pb-[18px] text-center">
              <h2 className="m-0 mb-2 font-serif font-normal text-[28px] leading-[1.1] text-wedding-cream">{t('travel_map_title')}</h2>
              <p className="m-0 font-sans font-light text-xs leading-[1.5] tracking-[.12em] uppercase text-wedding-cream/60">{t('travel_map_subtitle')}</p>
            </div>
            <div className="hide-scrollbar flex gap-2 overflow-x-auto pt-1.5 px-[22px] pb-[18px]">
              {locs.map((loc) => {
                const isActive = loc.id === active.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => setActiveLocId(loc.id)}
                    className="flex-none py-3 px-[14px] pb-[9px] font-sans font-semibold text-[10px] tracking-[.2em] uppercase cursor-pointer whitespace-nowrap transition-all border"
                    style={{ borderColor: isActive ? '#C8A951' : 'rgba(200,169,81,.35)', background: isActive ? '#C8A951' : 'transparent', color: isActive ? '#0E1512' : '#E3C77A' }}
                  >
                    {loc.title}
                  </button>
                );
              })}
            </div>
            <div className="h-[380px] bg-wedding-pine">
              <iframe src={mapSrc} width="100%" height="100%" style={{ border: 0, display: 'block', filter: 'grayscale(.35) sepia(.25) contrast(1.05)' }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Map" />
            </div>
            <div className="py-[14px] px-[22px] font-sans font-light text-xs leading-[1.5] text-wedding-cream/60 text-center">{mapCaption}</div>
          </StepFrame>
        </section>

        {/* Survival */}
        <section className="mt-[72px]">
          <h2 className="m-0 mb-2 font-serif font-normal text-[clamp(30px,7vw,44px)] leading-[1.05]">{t('travel_survival_title')}</h2>
          <p className="m-0 mb-7 font-sans font-light text-[15px] leading-[1.6] text-wedding-ink/75">{t('travel_survival_subtitle')}</p>
          <div className="grid gap-px bg-wedding-ink border border-wedding-ink" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))' }}>
            {tips.map((tip, i) => (
              <div key={tip.id} className="bg-wedding-cream pt-[22px] px-5 pb-5">
                <p className="m-0 mb-[10px] font-sans font-semibold text-[10px] tracking-[.3em] uppercase text-wedding-bronze">{pad(i + 1)} · {tip.title}</p>
                <p className="m-0 font-sans font-light text-sm leading-[1.6] text-wedding-ink/85" dangerouslySetInnerHTML={{ __html: tip.html }} />
              </div>
            ))}
          </div>
        </section>

        <div className="mt-16 text-center">
          <a onClick={goHome} className="inline-block py-[15px] px-6 border border-wedding-ink text-wedding-ink font-sans font-semibold text-[10px] tracking-[.3em] uppercase no-underline cursor-pointer hover:bg-wedding-ink hover:text-wedding-goldLight">
            ← {t('rsvp_back_home')}
          </a>
        </div>
      </div>
    </main>
  );
};

export default Travel;
