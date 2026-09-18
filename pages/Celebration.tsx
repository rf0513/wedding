import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import {
  CELEBRATIONS_EN, CELEBRATIONS_ES, getCelebration,
  EVENTS_EN, EVENTS_ES,
  ATTIRE_GUIDE_EN, ATTIRE_GUIDE_ES,
  HOTEL_QUERY,
} from '../constants';
import { Reveal, StepFrame, TileBand, PageHeader, btnGhostLight, linkArrow } from '../components/DecoUI';
import { RisingSun } from '../components/Ornaments';
import DaySwitcher from '../components/DaySwitcher';

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
const pad = (n: number) => String(n).padStart(2, '0');

/** Section heading: roman numeral rail + kicker + title. */
const SectionHead: React.FC<{ n: number; kicker: string; title: string; dark?: boolean }> = ({ n, kicker, title, dark = false }) => (
  <div className="grid grid-cols-[56px_minmax(0,1fr)] sm:grid-cols-[64px_minmax(0,1fr)] gap-x-3 items-end mb-8">
    <span className={`font-serif text-[40px] sm:text-[44px] leading-[.85] ${dark ? 'brass-text' : 'text-wedding-gold'}`} aria-hidden>{ROMAN[n - 1]}</span>
    <div>
      <p className={`m-0 mb-2 font-sans font-semibold text-[10px] tracking-[.3em] uppercase ${dark ? 'text-wedding-gold' : 'text-wedding-bronze'}`}>{kicker}</p>
      <h2 className={`m-0 font-serif font-normal text-[clamp(28px,6.5vw,40px)] leading-[1.05] ${dark ? 'text-wedding-cream' : 'text-wedding-ink'}`} style={{ textWrap: 'balance' as any }}>{title}</h2>
    </div>
  </div>
);

const Celebration: React.FC = () => {
  const { id } = useParams();
  const { language, t } = useLanguage();
  const en = language === 'en';
  const navigate = useNavigate();

  const list = en ? CELEBRATIONS_EN : CELEBRATIONS_ES;
  const cel = getCelebration(id, language);
  const events = en ? EVENTS_EN : EVENTS_ES;
  const attire = en ? ATTIRE_GUIDE_EN : ATTIRE_GUIDE_ES;

  useEffect(() => {
    if (!cel) navigate('/', { replace: true });
  }, [cel, navigate]);
  if (!cel) return null;

  const ev = events.find((e) => e.id === cel.eventId) || events[0];
  const idx = list.findIndex((c) => c.id === cel.id);
  const prev = idx > 0 ? list[idx - 1] : undefined;
  const next = idx < list.length - 1 ? list[idx + 1] : undefined;
  const endTime = cel.moments[cel.moments.length - 1]?.time?.replace(/^(Until|Hasta las)\s+/i, '') ?? '';
  const inspo = cel.dress.attireIds.map((aid) => attire.find((a) => a.id === aid)).filter(Boolean) as typeof attire;
  const directionsHref = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(HOTEL_QUERY)}&destination=${encodeURIComponent(`${ev.location}, ${ev.address}`)}`;

  const goDay = (dayId: string) => { navigate(`/celebrations/${dayId}`); window.scrollTo(0, 0); };
  const goHome = () => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const label = 'font-sans font-semibold text-[10px] tracking-[.3em] uppercase text-wedding-bronze';
  const body = 'font-sans font-light text-[16px] leading-[1.65] text-wedding-ink/85';
  const prose = `${body} max-w-[600px]`;

  return (
    <main className="marble-white text-wedding-ink pb-20">
      {/* ═══ HEADER ═══ */}
      <PageHeader
        kicker={`${t('day_label')} ${pad(cel.day)} · ${cel.weekday} · ${cel.dateLabel}`}
        title={cel.title}
        desc={cel.tagline}
        tall
      >
        <div className="flex items-center justify-center gap-[14px] -mt-3 mb-8">
          <span className="h-px w-[34px] bg-wedding-gold" />
          <p className="m-0 font-serif text-[clamp(16px,4vw,20px)] leading-[1.3] tracking-[.06em] uppercase text-wedding-goldLight">{cel.subtitle}</p>
          <span className="h-px w-[34px] bg-wedding-gold" />
        </div>
        <DaySwitcher activeId={cel.id} onSelect={goDay} />
      </PageHeader>
      <TileBand />

      <div className="max-w-[760px] mx-auto px-6">
        {/* ═══ HERO IMAGE (overlaps the header) ═══ */}
        <Reveal className="-mt-[150px] relative z-[2]">
          <StepFrame size={20} borderWidth={3} innerBg="#0C0B0A" innerPadding={12}>
            <img src={cel.heroImage} alt={cel.title} className="block w-full aspect-[4/3] sm:aspect-[16/10] object-cover" style={{ filter: 'saturate(.9)' }} />
          </StepFrame>
        </Reveal>

        {/* ═══ AT A GLANCE ═══ */}
        <Reveal className="mt-10">
          <div className="grid border border-wedding-ink bg-wedding-cream/60" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(170px,1fr))' }}>
            <div className="pt-[20px] px-5 pb-[18px] border-b border-wedding-ink/35 -mb-px">
              <p className={`m-0 mb-2 ${label}`}>{t('lbl_when')}</p>
              <div className="font-serif text-[26px] leading-[1.1]">{ev.time}</div>
              <p className="mt-1 mb-0 font-sans font-light text-[13px] leading-[1.4] text-wedding-ink/70">{endTime ? `${t('lbl_until')} ${endTime}` : cel.dateLabel}</p>
            </div>
            <div className="pt-[20px] px-5 pb-[18px] border-b border-wedding-ink/35 -mb-px">
              <p className={`m-0 mb-2 ${label}`}>{t('lbl_venue')}</p>
              <div className="font-serif text-[22px] leading-[1.15]">{ev.location}</div>
              <p className="mt-1 mb-0 font-sans font-light text-[13px] leading-[1.4] text-wedding-ink/70">{ev.address}</p>
            </div>
            <div className="pt-[20px] px-5 pb-[18px] border-b border-wedding-ink/35 -mb-px">
              <p className={`m-0 mb-2 ${label}`}>{t('lbl_shuttle')}</p>
              <div className="font-serif text-[26px] leading-[1.1]">{ev.shuttleTime}</div>
              <p className="mt-1 mb-0 font-sans font-light text-[13px] leading-[1.4] text-wedding-ink/70">{t('events_shuttle').replace(/ at$| a las$/, '')}</p>
            </div>
            <div className="pt-[20px] px-5 pb-[18px] border-b border-wedding-ink/35 -mb-px">
              <p className={`m-0 mb-2 ${label}`}>{t('lbl_dress')}</p>
              <div className="font-serif text-[22px] leading-[1.15]">{cel.dress.theme}</div>
              <div className="flex mt-2">
                {cel.dress.palette.map((hex, i) => (
                  <span key={i} className="block w-[18px] h-[18px] border border-wedding-ink/30 -ml-px" style={{ background: hex }} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-7 gap-y-3 mt-4">
            <a href={directionsHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-[10px] font-sans font-semibold text-[10px] tracking-[.3em] uppercase text-wedding-bronze no-underline pt-[2px] hover:text-wedding-ink">
              {t('cel_directions')} ↗
            </a>
          </div>
        </Reveal>

        {/* ═══ I · THE CELEBRATION ═══ */}
        <Reveal as="section" className="mt-[72px]">
          <SectionHead n={1} kicker={cel.marathiTitle ? `${t('cel_intro_kicker')} · ${cel.marathiTitle}` : t('cel_intro_kicker')} title={t('cel_intro_title')} />
          <p className="m-0 max-w-[640px] font-serif text-[clamp(19px,4.6vw,23px)] leading-[1.5] text-wedding-ink" style={{ textWrap: 'pretty' as any }}>{cel.intro}</p>
          <div className="mt-8 pt-6 border-t border-wedding-ink/35">
            <p className={`m-0 mb-2 ${label}`}>{t('cel_tradition')}</p>
            <p className={`m-0 ${prose}`}>{cel.significance}</p>
          </div>
        </Reveal>

        {/* ═══ II · HOW THE DAY UNFOLDS ═══ */}
        <Reveal as="section" className="mt-[72px]">
          <SectionHead n={2} kicker={t('cel_moments_kicker')} title={t('cel_moments_title')} />
          <ol className="m-0 p-0 list-none relative">
            <span aria-hidden className="absolute left-[11px] top-3 bottom-3 w-px bg-wedding-gold/60" />
            {cel.moments.map((m, i) => (
              <li key={i} className="relative grid grid-cols-[24px_minmax(0,1fr)] gap-x-5 py-[18px]">
                <span className="relative z-[1] mt-[6px] w-[24px] h-[24px] grid place-items-center bg-wedding-cream">
                  <span className="block w-[14px] h-[14px] rotate-45 border border-wedding-gold" style={{ background: i === 0 || i === cel.moments.length - 1 ? '#C8A75C' : '#F2EFE9' }} />
                </span>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="m-0 font-serif font-normal text-[22px] leading-[1.15]">{m.title}</h3>
                    {m.time && <span className="font-sans font-semibold text-[10px] tracking-[.28em] uppercase text-wedding-bronze">{m.time}</span>}
                  </div>
                  <p className={`mt-2 mb-0 ${prose}`}>{m.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* ═══ III · WHAT TO EXPECT ═══ */}
        <Reveal as="section" className="mt-[72px]">
          <SectionHead n={3} kicker={t('cel_expect_kicker')} title={t('cel_expect_title')} />
          <ul className="m-0 p-0 list-none border-t border-wedding-ink/35">
            {cel.expect.map((x, i) => (
              <li key={i} className="grid grid-cols-[32px_minmax(0,1fr)] gap-x-3 py-[14px] border-b border-wedding-ink/20">
                <span className="font-sans font-semibold text-[10px] leading-[2.1] tracking-[.3em] text-wedding-bronze">{pad(i + 1)}</span>
                <span className={body}>{x}</span>
              </li>
            ))}
          </ul>
          <p className={`mt-9 mb-3 ${label}`}>{t('cel_vibe_title')}</p>
          <div className="grid gap-px bg-wedding-ink border border-wedding-ink" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))' }}>
            {cel.vibe.map((v) => (
              <div key={v.label} className="bg-wedding-cream pt-[18px] px-4 pb-4 text-center">
                <div className="font-serif text-[clamp(18px,4.5vw,22px)] leading-[1.15]">{v.value}</div>
                <div className={`mt-2 ${label}`}>{v.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ═══ IV · DRESS GUIDE ═══ */}
        <Reveal as="section" className="mt-[72px]">
          <SectionHead n={4} kicker={t('cel_dress_kicker')} title={t('cel_dress_title')} />
          <div className="flex justify-between items-start gap-4 flex-wrap">
            <h3 className="m-0 font-serif font-normal text-[clamp(22px,5.5vw,28px)] leading-[1.1]">{cel.dress.theme}</h3>
            <div className="flex">
              {cel.dress.palette.map((hex, i) => (
                <span key={i} className="block w-[26px] h-[26px] border border-wedding-ink/30 -ml-px" style={{ background: hex }} />
              ))}
            </div>
          </div>
          <p className="mt-[14px] mb-6 font-serif text-[18px] leading-[1.5] text-wedding-ink/85">{cel.dress.description}</p>
          <div className="grid gap-px bg-wedding-ink border border-wedding-ink" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))' }}>
            <div className="bg-wedding-cream py-5 px-5">
              <p className={`m-0 mb-2 ${label}`}>{t('attire_women')}</p>
              <p className={`m-0 ${body} text-[15px]`}>{cel.dress.women}</p>
            </div>
            <div className="bg-wedding-cream py-5 px-5">
              <p className={`m-0 mb-2 ${label}`}>{t('attire_men')}</p>
              <p className={`m-0 ${body} text-[15px]`}>{cel.dress.men}</p>
            </div>
          </div>
          <p className={`mt-8 mb-3 ${label}`}>{t('cel_dress_tips')}</p>
          <ul className="m-0 p-0 list-none">
            {cel.dress.tips.map((tip, i) => (
              <li key={i} className="grid grid-cols-[18px_minmax(0,1fr)] gap-x-3 py-[9px] border-t border-wedding-ink/20">
                <span className="mt-[9px] block w-[7px] h-[7px] rotate-45 bg-wedding-gold" />
                <span className="font-sans font-light text-[15px] leading-[1.6] text-wedding-ink/85">{tip}</span>
              </li>
            ))}
          </ul>

          {inspo.length > 0 && (
            <>
              <p className={`mt-10 mb-[14px] ${label}`}>{t('cel_inspo_title')}</p>
              <div className="hide-scrollbar flex sm:grid gap-[18px] overflow-x-auto sm:overflow-visible -mx-6 px-6 sm:mx-0 sm:px-0 pb-3" style={{ scrollSnapType: 'x mandatory', gridTemplateColumns: `repeat(${Math.min(inspo.length, 4)}, minmax(0,1fr))` }}>
                {inspo.map((a) => (
                  <div key={a.id} className="flex-none w-[220px] sm:w-auto" style={{ scrollSnapAlign: 'start' }}>
                    <StepFrame size={14} borderWidth={2} innerBg="#F2EFE9" innerPadding={8}>
                      <img src={a.imageUrl} alt={a.name} loading="lazy" className="block w-full aspect-[3/4] object-cover object-top" style={{ filter: 'saturate(.9)' }} />
                    </StepFrame>
                    <h4 className="mt-[14px] mb-0.5 font-serif font-normal text-[20px] leading-[1.1]">{a.name}</h4>
                    <p className="m-0 mb-2 font-sans font-light text-xs italic leading-[1.4] text-wedding-bronze">{a.pronunciation}</p>
                    <p className="m-0 font-sans font-light text-[13px] leading-[1.55] text-wedding-ink/80">{a.description}</p>
                  </div>
                ))}
              </div>
            </>
          )}
          <a href="#/attire" onClick={(e) => { e.preventDefault(); navigate('/attire'); window.scrollTo(0, 0); }} className="inline-flex items-center gap-[10px] mt-6 font-sans font-semibold text-[10px] tracking-[.3em] uppercase text-wedding-bronze no-underline cursor-pointer pt-[2px] hover:text-wedding-ink">
            {t('cel_full_wardrobe')}<span className="inline-block w-[22px] h-px bg-current" />
          </a>
        </Reveal>

        {/* ═══ V · WORDS YOU'LL HEAR ═══ */}
        <Reveal as="section" className="mt-[72px]">
          <SectionHead n={5} kicker={t('cel_glossary_kicker')} title={t('cel_glossary_title')} />
          <dl className="m-0 grid gap-x-8 border-t border-wedding-ink/35" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))' }}>
            {cel.glossary.map((g) => (
              <div key={g.term} className="py-[14px] border-b border-wedding-ink/20">
                <dt className="m-0 font-serif text-[20px] leading-[1.2]">{g.term}</dt>
                <dd className="mt-1 mb-0 font-sans font-light text-[14px] leading-[1.6] text-wedding-ink/80">{g.meaning}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* ═══ VI · GETTING THERE (dark panel) ═══ */}
        <Reveal as="section" className="mt-[72px]">
          <StepFrame size={20} borderWidth={2} innerBg="#0C0B0A" innerPadding={0}>
            <div className="pt-8 px-6 sm:px-8 pb-8 text-wedding-cream">
              <SectionHead n={6} kicker={t('cel_logistics_kicker')} title={t('cel_logistics_title')} dark />
              <div className="grid gap-px bg-wedding-gold/35 border border-wedding-gold/35" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))' }}>
                <div className="bg-wedding-ink pt-5 px-5 pb-[18px]">
                  <p className="m-0 mb-2 font-sans font-semibold text-[10px] tracking-[.3em] uppercase text-wedding-gold">{t('lbl_shuttle')}</p>
                  <div className="font-serif text-[34px] leading-none text-wedding-goldLight">{ev.shuttleTime}</div>
                  <p className="mt-2 mb-0 font-sans font-light text-[13px] leading-[1.45] text-wedding-cream/70">{t('events_shuttle').replace(/ at$| a las$/, '')} · {cel.weekday}</p>
                </div>
                <div className="bg-wedding-ink pt-5 px-5 pb-[18px]">
                  <p className="m-0 mb-2 font-sans font-semibold text-[10px] tracking-[.3em] uppercase text-wedding-gold">{t('lbl_venue')}</p>
                  <div className="font-serif text-[22px] leading-[1.15]">{ev.location}</div>
                  <p className="mt-2 mb-0 font-sans font-light text-[13px] leading-[1.45] text-wedding-cream/70">{ev.address}<span className="block">{ev.time}{endTime ? ` – ${endTime}` : ''}</span></p>
                </div>
              </div>
              <p className="mt-7 mb-2 font-sans font-semibold text-[10px] tracking-[.3em] uppercase text-wedding-gold">{t('cel_notes_title')}</p>
              <ul className="m-0 p-0 list-none">
                {cel.notes.map((n, i) => (
                  <li key={i} className="grid grid-cols-[18px_minmax(0,1fr)] gap-x-3 py-[7px] border-t border-wedding-gold/20">
                    <span className="mt-[8px] block w-[7px] h-[7px] rotate-45 bg-wedding-gold" />
                    <span className="font-sans font-light text-[15px] leading-[1.6] text-wedding-cream/85">{n}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-x-7 gap-y-4 mt-7">
                <a href={directionsHref} target="_blank" rel="noopener noreferrer" className="pt-4 px-[22px] pb-[13px] bg-wedding-gold text-wedding-ink font-sans font-semibold text-[10px] tracking-[.3em] uppercase no-underline deco-chamfer-8 hover:bg-wedding-goldLight">
                  {t('cel_directions')} ↗
                </a>
                <a href="#/travel" onClick={(e) => { e.preventDefault(); navigate('/travel'); window.scrollTo(0, 0); }} className="font-sans font-semibold text-[10px] tracking-[.3em] uppercase text-wedding-goldLight no-underline cursor-pointer pt-[2px] hover:text-wedding-cream">
                  {t('see_map')}
                </a>
              </div>
            </div>
          </StepFrame>
        </Reveal>

        {/* ═══ VII · INSIDER TIPS ═══ */}
        <Reveal as="section" className="mt-[72px]">
          <SectionHead n={7} kicker={t('cel_tips_kicker')} title={t('cel_tips_title')} />
          <div className="border border-wedding-gold bg-wedding-cream/60">
            {cel.tips.map((tip, i) => (
              <div key={i} className={`grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 py-[18px] px-5 ${i > 0 ? 'border-t border-wedding-gold/50' : ''}`}>
                <span className="font-serif text-[26px] leading-[1] text-wedding-gold min-w-[30px]">{ROMAN[i]}</span>
                <p className={`m-0 ${body} text-[15px]`}>{tip}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ═══ PREV / NEXT ═══ */}
        <div className="mt-[72px] grid grid-cols-2 border border-wedding-ink bg-wedding-cream/60">
          {prev ? (
            <a href={`#/celebrations/${prev.id}`} onClick={(e) => { e.preventDefault(); goDay(prev.id); }} className="group block py-5 px-5 no-underline cursor-pointer text-wedding-ink hover:bg-wedding-ink hover:text-wedding-cream transition-colors">
              <p className="m-0 mb-1 font-sans font-semibold text-[9px] tracking-[.3em] uppercase text-wedding-bronze group-hover:text-wedding-gold">← {t('day_label')} {pad(prev.day)}</p>
              <p className="m-0 font-serif text-[clamp(18px,4.5vw,24px)] leading-[1.15]">{prev.title}</p>
            </a>
          ) : (
            <a href="#/" onClick={(e) => { e.preventDefault(); goHome(); }} className="group block py-5 px-5 no-underline cursor-pointer text-wedding-ink hover:bg-wedding-ink hover:text-wedding-cream transition-colors">
              <p className="m-0 mb-1 font-sans font-semibold text-[9px] tracking-[.3em] uppercase text-wedding-bronze group-hover:text-wedding-gold">← {t('nav_home')}</p>
              <p className="m-0 font-serif text-[clamp(18px,4.5vw,24px)] leading-[1.15]">Pavitra &amp; Ramon</p>
            </a>
          )}
          {next ? (
            <a href={`#/celebrations/${next.id}`} onClick={(e) => { e.preventDefault(); goDay(next.id); }} className="group block py-5 px-5 text-right border-l border-wedding-ink no-underline cursor-pointer text-wedding-ink hover:bg-wedding-ink hover:text-wedding-cream transition-colors">
              <p className="m-0 mb-1 font-sans font-semibold text-[9px] tracking-[.3em] uppercase text-wedding-bronze group-hover:text-wedding-gold">{t('day_label')} {pad(next.day)} →</p>
              <p className="m-0 font-serif text-[clamp(18px,4.5vw,24px)] leading-[1.15]">{next.title}</p>
            </a>
          ) : (
            <a href="#/attire" onClick={(e) => { e.preventDefault(); navigate('/attire'); window.scrollTo(0, 0); }} className="group block py-5 px-5 text-right border-l border-wedding-ink no-underline cursor-pointer text-wedding-ink hover:bg-wedding-ink hover:text-wedding-cream transition-colors">
              <p className="m-0 mb-1 font-sans font-semibold text-[9px] tracking-[.3em] uppercase text-wedding-bronze group-hover:text-wedding-gold">{t('guide_no')} 1 →</p>
              <p className="m-0 font-serif text-[clamp(18px,4.5vw,24px)] leading-[1.15]">{t('nav_attire')}</p>
            </a>
          )}
        </div>

        <div className="mt-12 text-center">
          <a href="#/" onClick={(e) => { e.preventDefault(); goHome(); }} className={btnGhostLight}>
            ← {t('rsvp_back_home')}
          </a>
        </div>
      </div>
    </main>
  );
};

export default Celebration;
