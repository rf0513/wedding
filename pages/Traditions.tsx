import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { WEDDING_CUSTOMS_EN, WEDDING_CUSTOMS_ES, ATTIRE_GUIDE_EN, ATTIRE_GUIDE_ES, EVENT_DRESS_CODES_EN, EVENT_DRESS_CODES_ES } from '../constants';
import { Reveal, StepFrame, Sunburst, ChevronBand } from '../components/DecoUI';

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

const Traditions: React.FC = () => {
  const { language, t } = useLanguage();
  const en = language === 'en';
  const [tab, setTab] = useState<'ceremonies' | 'attire'>('ceremonies');
  const navigate = useNavigate();
  const goHome = () => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const customs = en ? WEDDING_CUSTOMS_EN : WEDDING_CUSTOMS_ES;
  const dressCodes = en ? EVENT_DRESS_CODES_EN : EVENT_DRESS_CODES_ES;
  const attire = en ? ATTIRE_GUIDE_EN : ATTIRE_GUIDE_ES;
  const womenAttire = attire.filter((a) => a.gender === 'Women');
  const menAttire = attire.filter((a) => a.gender === 'Men');

  const selectAttireTab = () => {
    setTab('attire');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="bg-wedding-cream text-wedding-ink pb-20">
      <div className="relative overflow-hidden bg-wedding-ink text-wedding-cream pt-28 px-6 pb-14 text-center">
        <Sunburst variant="header" />
        <div className="relative max-w-[640px] mx-auto">
          <p className="m-0 mb-[14px] font-sans font-semibold text-[10px] tracking-[.4em] uppercase text-wedding-gold">{t('guide_no')} 1 · {t('traditions_subtitle')}</p>
          <h1 className="m-0 font-serif font-normal text-[clamp(36px,9vw,64px)] leading-[1.02]" style={{ textWrap: 'balance' as any }}>{t('traditions_title')}</h1>
          <p className="mt-5 mx-auto mb-0 font-sans font-light text-[15px] leading-[1.65] text-wedding-cream/75">{t('traditions_desc')}</p>
        </div>
      </div>
      <ChevronBand />

      <div className="max-w-[760px] mx-auto px-6">
        <div className="grid grid-cols-2 border border-wedding-ink my-10 mb-14">
          <button onClick={() => setTab('ceremonies')} className="py-4 px-2 border-0 font-sans font-semibold text-[10px] tracking-[.28em] uppercase cursor-pointer transition-all" style={{ background: tab === 'ceremonies' ? '#0E1512' : 'transparent', color: tab === 'ceremonies' ? '#E3C77A' : '#0E1512' }}>
            {t('traditions_tab_ceremonies')}
          </button>
          <button onClick={selectAttireTab} className="py-4 px-2 border-0 border-l border-wedding-ink font-sans font-semibold text-[10px] tracking-[.28em] uppercase cursor-pointer transition-all" style={{ background: tab === 'attire' ? '#0E1512' : 'transparent', color: tab === 'attire' ? '#E3C77A' : '#0E1512' }}>
            {t('traditions_tab_attire')}
          </button>
        </div>

        {tab === 'ceremonies' && (
          <div className="flex flex-col gap-[72px]">
            {customs.map((c, i) => (
              <Reveal key={c.id} as="article">
                <StepFrame size={14} borderWidth={2} innerBg="#F3EEE1" innerPadding={8}>
                  <img src={c.imageUrl} alt={c.title} className="block w-full aspect-[16/10] object-cover" style={{ filter: 'saturate(.85)' }} />
                </StepFrame>
                <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 mt-[22px] items-start">
                  <div className="font-serif text-[44px] leading-[.9] text-wedding-gold min-w-[56px]">{ROMAN[i]}</div>
                  <div>
                    <p className="mt-0.5 mb-2 font-sans font-semibold text-[10px] tracking-[.3em] uppercase text-wedding-bronze">{c.marathiTitle}</p>
                    <h2 className="m-0 font-serif font-normal text-[clamp(26px,6.5vw,36px)] leading-[1.1]">{c.title}</h2>
                  </div>
                </div>
                <dl className="mt-[22px] mb-0 flex flex-col border-t border-wedding-ink/35">
                  <div className="py-4 border-b border-wedding-ink/20">
                    <dt className="font-sans font-semibold text-[10px] tracking-[.3em] uppercase text-wedding-bronze mb-2">{t('traditions_significance')}</dt>
                    <dd className="m-0 font-sans font-light text-[15px] leading-[1.65] text-wedding-ink/85">{c.significance}</dd>
                  </div>
                  <div className="py-4 border-b border-wedding-ink/20">
                    <dt className="font-sans font-semibold text-[10px] tracking-[.3em] uppercase text-wedding-bronze mb-2">{t('traditions_wear')}</dt>
                    <dd className="m-0 font-sans font-light text-[15px] leading-[1.65] text-wedding-ink/85">
                      {c.whatToWear} <a onClick={selectAttireTab} className="text-wedding-bronze cursor-pointer no-underline border-b border-wedding-gold font-normal">{t('traditions_see_examples')}</a>
                    </dd>
                  </div>
                  <div className="py-4 border-b border-wedding-ink/35">
                    <dt className="font-sans font-semibold text-[10px] tracking-[.3em] uppercase text-wedding-bronze mb-2">{t('traditions_expect')}</dt>
                    <dd className="m-0 font-sans font-light text-[15px] leading-[1.65] text-wedding-ink/85">{c.whatToExpect}</dd>
                  </div>
                </dl>
              </Reveal>
            ))}
          </div>
        )}

        {tab === 'attire' && (
          <div className="flex flex-col gap-20">
            <section>
              <h2 className="m-0 mb-2 font-serif font-normal text-[clamp(30px,7vw,44px)] leading-[1.05]">{t('attire_by_event_title')}</h2>
              <p className="m-0 mb-7 font-sans font-light text-[15px] leading-[1.6] text-wedding-ink/75">{t('attire_by_event_desc')}</p>
              <div className="flex flex-col">
                {dressCodes.map((d) => (
                  <div key={d.id} className="py-[26px] border-t border-wedding-ink/35">
                    <div className="flex justify-between items-start gap-4 flex-wrap">
                      <div>
                        <h3 className="m-0 mb-1.5 font-serif font-normal text-2xl leading-[1.1]">{d.title}</h3>
                        <p className="m-0 font-sans font-semibold text-[10px] leading-[1.4] tracking-[.28em] uppercase text-wedding-bronze">{d.theme}</p>
                      </div>
                      <div className="flex">
                        {d.colorPalette.map((hex, idx) => (
                          <span key={idx} className="block w-[22px] h-[22px] border border-wedding-ink/30 -ml-px" style={{ background: hex }} />
                        ))}
                      </div>
                    </div>
                    <p className="mt-[14px] mb-[18px] font-sans font-light text-[15px] leading-[1.6] text-wedding-ink/80 italic">{d.description}</p>
                    <div className="grid gap-[18px]" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))' }}>
                      <div>
                        <p className="m-0 mb-1.5 font-sans font-semibold text-[10px] tracking-[.3em] uppercase text-wedding-bronze">{t('attire_women')}</p>
                        <p className="m-0 font-sans font-light text-sm leading-[1.6] text-wedding-ink/85">{d.options.women}</p>
                      </div>
                      {d.options.men && (
                        <div>
                          <p className="m-0 mb-1.5 font-sans font-semibold text-[10px] tracking-[.3em] uppercase text-wedding-bronze">{t('attire_men')}</p>
                          <p className="m-0 font-sans font-light text-sm leading-[1.6] text-wedding-ink/85">{d.options.men}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="m-0 mb-2 font-serif font-normal text-[clamp(30px,7vw,44px)] leading-[1.05]">{t('attire_glossary_title')}</h2>
              <p className="m-0 mb-7 font-sans font-light text-[15px] leading-[1.6] text-wedding-ink/75">{t('attire_glossary_desc')}</p>
              {[[t('attire_women'), womenAttire], [t('attire_men'), menAttire]].map(([label, items]: any) => (
                <React.Fragment key={label}>
                  <p className="mt-9 mb-[14px] font-sans font-semibold text-[10px] tracking-[.3em] uppercase text-wedding-bronze first:mt-0">{label}</p>
                  <div className="hide-scrollbar flex gap-[18px] overflow-x-auto -mx-6 px-6 pb-3" style={{ scrollSnapType: 'x mandatory' }}>
                    {items.map((a: any) => (
                      <div key={a.id} className="flex-none w-[240px]" style={{ scrollSnapAlign: 'start' }}>
                        <StepFrame size={14} borderWidth={2} innerBg="#F3EEE1" innerPadding={8}>
                          <img src={a.imageUrl} alt={a.name} className="block w-full aspect-[3/4] object-cover object-top" style={{ filter: 'saturate(.9)' }} />
                        </StepFrame>
                        <h3 className="mt-[14px] mb-0.5 font-serif font-normal text-[22px] leading-[1.1]">{a.name}</h3>
                        <p className="m-0 mb-2 font-sans font-light text-xs italic leading-[1.4] text-wedding-bronze">{a.pronunciation}</p>
                        <p className="m-0 mb-[10px] font-sans font-light text-[13px] leading-[1.55] text-wedding-ink/80">{a.description}</p>
                        <p className="m-0 font-sans font-semibold text-[9px] leading-[1.6] tracking-[.25em] uppercase text-wedding-bronze">{t('traditions_perfect_for')}: {a.bestFor.join(' · ')}</p>
                      </div>
                    ))}
                  </div>
                </React.Fragment>
              ))}
            </section>

            <section>
              <h2 className="m-0 mb-2 font-serif font-normal text-[clamp(30px,7vw,44px)] leading-[1.05]">{t('traditions_shop_title')}</h2>
              <p className="m-0 mb-7 font-sans font-light text-[15px] leading-[1.6] text-wedding-ink/75">{t('traditions_shop_desc')}</p>
              <div className="grid gap-px bg-wedding-ink border border-wedding-ink" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))' }}>
                <div className="bg-wedding-cream py-6 px-5">
                  <p className="m-0 mb-1 font-sans font-semibold text-[10px] tracking-[.3em] uppercase text-wedding-bronze">Ship to Home</p>
                  <h3 className="m-0 mb-5 font-serif font-normal text-2xl leading-[1.1]">Order Online</h3>
                  <a href="https://www.lashkaraa.com/" target="_blank" rel="noopener noreferrer" className="block font-serif text-[19px] text-wedding-ink no-underline hover:text-wedding-bronze">Lashkaraa ↗</a>
                  <p className="mt-1 mb-4 font-sans font-light text-sm leading-[1.55] text-wedding-ink/75">Trendy, high-quality, and approachable Indian wear designed specifically for international customers. Reliable shipping and great prices.</p>
                  <a href="https://www.manyavar.com/" target="_blank" rel="noopener noreferrer" className="block font-serif text-[19px] text-wedding-ink no-underline hover:text-wedding-bronze">Manyavar &amp; Mohey ↗</a>
                  <p className="mt-1 mb-0 font-sans font-light text-sm leading-[1.55] text-wedding-ink/75">The most trusted brand for men's traditional wear (Kurtas &amp; Sherwanis). Their sizing is standard and fits well.</p>
                </div>
                <div className="bg-wedding-cream py-6 px-5">
                  <p className="m-0 mb-1 font-sans font-semibold text-[10px] tracking-[.3em] uppercase text-wedding-bronze">Try &amp; Buy / Rent</p>
                  <h3 className="m-0 mb-5 font-serif font-normal text-2xl leading-[1.1]">Visit in Mumbai</h3>
                  <div className="flex justify-between items-baseline gap-[10px]">
                    <span className="font-serif text-[19px]">Kalki Fashion</span>
                    <span className="font-sans font-semibold text-[9px] tracking-[.3em] uppercase text-wedding-bronze">Buy · Santacruz West</span>
                  </div>
                  <p className="mt-1 mb-4 font-sans font-light text-sm leading-[1.55] text-wedding-ink/75">A massive multi-story boutique. The best place to try on different styles of Lehengas and Sarees at mid-to-high price points.</p>
                  <div className="flex justify-between items-baseline gap-[10px]">
                    <span className="font-serif text-[19px]">Flyrobe</span>
                    <span className="font-sans font-semibold text-[9px] tracking-[.3em] uppercase text-wedding-bronze">Rent · Santacruz West</span>
                  </div>
                  <p className="mt-1 mb-0 font-sans font-light text-sm leading-[1.55] text-wedding-ink/75">Why buy an outfit you'll wear once? Visit their store to try on premium designer outfits and rent them for a fraction of the cost.</p>
                </div>
              </div>
            </section>
          </div>
        )}

        <div className="mt-[72px] border border-wedding-gold py-7 px-[22px] text-center">
          <h3 className="m-0 mb-2 font-serif font-normal text-2xl leading-[1.15]">{t('traditions_q_title')}</h3>
          <p className="m-0 font-sans font-light text-[15px] leading-[1.6] text-wedding-ink/80">{t('traditions_q_desc')}</p>
        </div>
        <div className="mt-12 text-center">
          <a onClick={goHome} className="inline-block py-[15px] px-6 border border-wedding-ink text-wedding-ink font-sans font-semibold text-[10px] tracking-[.3em] uppercase no-underline cursor-pointer hover:bg-wedding-ink hover:text-wedding-goldLight">
            ← {t('rsvp_back_home')}
          </a>
        </div>
      </div>
    </main>
  );
};

export default Traditions;
