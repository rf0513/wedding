import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { ATTIRE_GUIDE_EN, ATTIRE_GUIDE_ES, CELEBRATIONS_EN, CELEBRATIONS_ES } from '../constants';
import { Reveal, StepFrame, TileBand, PageHeader, btnGhostLight, linkArrow } from '../components/DecoUI';
import { Lotus } from '../components/Ornaments';

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Guide Nº 1 — the cross-cutting wardrobe reference: dress codes at a glance
 * (linking to each day's full guide), the clothing glossary, and where to shop.
 */
const Attire: React.FC = () => {
  const { language, t } = useLanguage();
  const en = language === 'en';
  const navigate = useNavigate();
  const goHome = () => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const goDay = (id: string) => { navigate(`/celebrations/${id}`); window.scrollTo(0, 0); };

  const days = en ? CELEBRATIONS_EN : CELEBRATIONS_ES;
  const attire = en ? ATTIRE_GUIDE_EN : ATTIRE_GUIDE_ES;
  const womenAttire = attire.filter((a) => a.gender === 'Women');
  const menAttire = attire.filter((a) => a.gender === 'Men');

  return (
    <main className="marble-white text-wedding-ink pb-20">
      <PageHeader kicker={`${t('guide_no')} 1 · ${t('traditions_subtitle')}`} title={t('attire_title')} desc={t('attire_desc')} />
      <TileBand />

      <div className="max-w-[760px] mx-auto px-6 flex flex-col gap-20 pt-14">
        {/* At a glance */}
        <Reveal as="section">
          <h2 className="m-0 mb-2 font-serif font-normal text-[clamp(30px,7vw,44px)] leading-[1.05]">{t('attire_glance_title')}</h2>
          <p className="m-0 mb-7 font-sans font-light text-[15px] leading-[1.6] text-wedding-ink/75">{t('attire_glance_desc')}</p>
          <div className="flex flex-col border-t border-wedding-ink">
            {days.map((d) => (
              <a key={d.id} href={`#/celebrations/${d.id}`} onClick={(e) => { e.preventDefault(); goDay(d.id); }} className="group grid grid-cols-[52px_minmax(0,1fr)_auto] gap-x-4 items-center py-[22px] border-b border-wedding-ink/35 no-underline cursor-pointer text-wedding-ink hover:pl-2 transition-all">
                <span className="font-sans font-light text-[34px] leading-none text-wedding-bronze tracking-[-.02em]">{pad(d.day)}</span>
                <div className="min-w-0">
                  <h3 className="m-0 mb-1 font-serif font-normal text-[22px] leading-[1.1]">{d.title}</h3>
                  <p className="m-0 font-sans font-semibold text-[10px] leading-[1.4] tracking-[.28em] uppercase text-wedding-bronze">{d.dress.theme}</p>
                  <p className="mt-2 mb-0 font-sans font-light text-[14px] leading-[1.55] text-wedding-ink/75">{d.dress.description}</p>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <div className="flex">
                    {d.dress.palette.map((hex, i) => (
                      <span key={i} className="block w-[18px] h-[18px] border border-wedding-ink/30 -ml-px" style={{ background: hex }} />
                    ))}
                  </div>
                  <span className="font-sans font-semibold text-[9px] tracking-[.3em] uppercase text-wedding-bronze whitespace-nowrap group-hover:text-wedding-ink">{t('attire_day_guide')} →</span>
                </div>
              </a>
            ))}
          </div>
        </Reveal>

        {/* Glossary */}
        <Reveal as="section">
          <h2 className="m-0 mb-2 font-serif font-normal text-[clamp(30px,7vw,44px)] leading-[1.05]">{t('attire_glossary_title')}</h2>
          <p className="m-0 mb-7 font-sans font-light text-[15px] leading-[1.6] text-wedding-ink/75">{t('attire_glossary_desc')}</p>
          {[[t('attire_women'), womenAttire], [t('attire_men'), menAttire]].map(([label, items]: any) => (
            <React.Fragment key={label}>
              <p className="mt-9 mb-[14px] font-sans font-semibold text-[10px] tracking-[.3em] uppercase text-wedding-bronze first:mt-0">{label}</p>
              <div className="hide-scrollbar flex sm:grid gap-[18px] overflow-x-auto sm:overflow-visible -mx-6 px-6 sm:mx-0 sm:px-0 pb-3" style={{ scrollSnapType: 'x mandatory', gridTemplateColumns: `repeat(${Math.min(items.length, 4)}, minmax(0,1fr))` }}>
                {items.map((a: any) => (
                  <div key={a.id} className="flex-none w-[220px] sm:w-auto" style={{ scrollSnapAlign: 'start' }}>
                    <StepFrame size={14} borderWidth={2} innerBg="#F2EFE9" innerPadding={8}>
                      <img src={a.imageUrl} alt={a.name} loading="lazy" className="block w-full aspect-[3/4] object-cover object-top" style={{ filter: 'saturate(.9)' }} />
                    </StepFrame>
                    <h3 className="mt-[14px] mb-0.5 font-serif font-normal text-[20px] leading-[1.1]">{a.name}</h3>
                    <p className="m-0 mb-2 font-sans font-light text-xs italic leading-[1.4] text-wedding-bronze">{a.pronunciation}</p>
                    <p className="m-0 mb-[10px] font-sans font-light text-[13px] leading-[1.55] text-wedding-ink/80">{a.description}</p>
                    <p className="m-0 font-sans font-semibold text-[9px] leading-[1.6] tracking-[.25em] uppercase text-wedding-bronze">{t('traditions_perfect_for')}: {a.bestFor.join(' · ')}</p>
                  </div>
                ))}
              </div>
            </React.Fragment>
          ))}
        </Reveal>

        {/* Where to shop */}
        <Reveal as="section">
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
        </Reveal>

        <div>
          <div className="inlay marble-white py-10 px-[22px] text-center">
            <Lotus size={64} className="mx-auto mb-4" />
            <h3 className="m-0 mb-2 font-serif font-normal text-2xl leading-[1.15]">{t('traditions_q_title')}</h3>
            <p className="m-0 font-sans font-light text-[15px] leading-[1.6] text-wedding-ink/80">{t('traditions_q_desc')}</p>
            <a href="#/qna" onClick={(e) => { e.preventDefault(); navigate('/qna'); window.scrollTo(0, 0); }} className={`${linkArrow} mt-6 text-wedding-bronze hover:text-wedding-ink`}>
              {t('traditions_q_link')}<span className="inline-block w-[22px] h-px bg-current" />
            </a>
          </div>
          <div className="mt-12 text-center">
            <a href="#/" onClick={(e) => { e.preventDefault(); goHome(); }} className={btnGhostLight}>
              ← {t('rsvp_back_home')}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Attire;
