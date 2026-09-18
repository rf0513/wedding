import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { WEDDING_DATA, EVENTS_EN, EVENTS_ES, REGISTRY_ITEMS_EN, REGISTRY_ITEMS_ES, CELEBRATIONS_EN, CELEBRATIONS_ES } from '../constants';
import { Reveal, StepFrame, HeroFrame, BrassBand, SectionTitle, TileBand, useCountdown, useSectionNav, btnPrimary, btnGhostDark, linkArrow } from '../components/DecoUI';
import { SunburstFloor, RayFan, MirrorEmblem, RisingSun, Lotus, PalmFan, CornerBrackets } from '../components/Ornaments';
import Curtain from '../components/Curtain';
import HeroSequence from '../components/HeroSequence';

const Home: React.FC = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const goSection = useSectionNav();
  const en = language === 'en';
  const cd = useCountdown('2027-02-02T11:00:00+05:30');

  const events = en ? EVENTS_EN : EVENTS_ES;
  const registryItems = en ? REGISTRY_ITEMS_EN : REGISTRY_ITEMS_ES;
  const celebrations = en ? CELEBRATIONS_EN : CELEBRATIONS_ES;
  const celebrationFor = (eventId: string) => celebrations.find((c) => c.eventId === eventId);
  const eventFor = (c: { eventId: string }) => events.find((e) => e.id === c.eventId);
  const pad = (n: number) => String(n).padStart(2, '0');
  const goDay = (id: string) => { navigate(`/celebrations/${id}`); window.scrollTo(0, 0); };
  const goPage = (path: string) => { navigate(path); window.scrollTo(0, 0); };

  // RSVP form
  const [rsvpDone, setRsvpDone] = useState(false);
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [form, setForm] = useState({ first: '', last: '', email: '', guests: '1', diet: '' });
  const submitRsvp = (e: React.FormEvent) => { e.preventDefault(); setRsvpDone(true); };
  const resetRsvp = () => { setRsvpDone(false); setForm({ first: '', last: '', email: '', guests: '1', diet: '' }); setAttending('yes'); };

  // Registry
  const charity = registryItems.find((r) => r.id === 'charity');
  const btc = registryItems.find((r) => r.id === 'btc');
  const [showBtc, setShowBtc] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyBtc = () => {
    try { navigator.clipboard.writeText(WEDDING_DATA.btcAddress); } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const guides = [
    { tag: `${t('guide_no')} 1`, title: t('nav_attire'), desc: en ? 'Lehengas, sarees, and sherwanis explained, plus where to buy or rent them.' : 'Lehengas, saris y sherwanis explicados, y dónde comprarlos o alquilarlos.', path: '/attire', Icon: Lotus },
    { tag: `${t('guide_no')} 2`, title: t('nav_travel'), desc: en ? 'Where to stay, what to see, where to eat, and how to survive Mumbai.' : 'Dónde alojarse, qué ver, dónde comer y cómo sobrevivir Mumbai.', path: '/travel', Icon: PalmFan },
    { tag: `${t('guide_no')} 3`, title: t('nav_qna'), desc: t('qna_subtitle'), path: '/qna', Icon: RisingSun },
  ];

  const label = 'font-sans font-semibold text-[10px] tracking-[.3em] uppercase';
  const field = 'w-full bg-transparent border-0 border-b border-wedding-gold/50 py-[10px] text-wedding-cream font-serif text-lg leading-[1.2] outline-none rounded-none focus:border-wedding-goldLight';

  return (
    <main>
      {/* ═══ OPENING CURTAIN (once per session) ═══ */}
      <Curtain />

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden marble-black">
        <div className="absolute inset-0 overflow-hidden">
          {/* Auto-advancing photo sequence (duotone + parallax live inside) — edit HERO_IMAGES in constants.ts */}
          <HeroSequence />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(12,11,10,.5) 0%,rgba(12,11,10,0) 22%,rgba(12,11,10,.2) 46%,rgba(12,11,10,.92) 74%,#0C0B0A 86%)' }} />
        </div>
        {/* Brass rays fan up from the floor behind the names, like the lobby sunburst */}
        <RayFan className="absolute left-1/2 -translate-x-1/2 -bottom-[560px] w-[1240px] h-[1240px]" spread={190} n={64} opacity={.55} />
        <HeroFrame />
        <div className="relative z-[2] pt-[min(34vh,300px)] px-6 sm:px-9 pb-16 sm:pb-20 text-center animate-heroIn">
          <RisingSun size={64} className="mx-auto mb-5" />
          <p className="m-0 mb-[18px] font-sans font-semibold text-[10px] tracking-[.46em] uppercase text-wedding-gold">{t('the_wedding_of')}</p>
          <h1 className="m-0 font-serif font-normal text-wedding-cream text-[clamp(50px,13vw,132px)] leading-[.96] tracking-[.05em] uppercase" style={{ textWrap: 'balance' as any }}>
            Pavitra
            <span className="block font-italic italic normal-case text-[.46em] leading-[1.35] brass-text tracking-[.04em]">&amp;</span>
            Ramon
          </h1>
          <div className="flex items-center justify-center gap-[14px] mt-7">
            <span className="h-px w-[34px] sm:w-[60px] bg-wedding-gold" />
            <span className="w-[7px] h-[7px] rotate-45 bg-wedding-gold" />
            <p className="m-0 font-sans text-xs sm:text-[13px] leading-[1.4] tracking-[.28em] uppercase text-wedding-cream">{t('hero_dates')}</p>
            <span className="w-[7px] h-[7px] rotate-45 bg-wedding-gold" />
            <span className="h-px w-[34px] sm:w-[60px] bg-wedding-gold" />
          </div>
          <p className="mt-3 mb-0 font-sans font-light text-xs tracking-[.34em] uppercase text-wedding-goldLight/80">Mumbai · India</p>
          <div className="flex flex-wrap gap-[10px] justify-center mt-9">
            {/* Real hrefs, not click handlers: these are the two most important
                buttons on the site, and without one they are invisible to the
                keyboard and announced as plain text. #/rsvp and #/celebrations
                are routes that bounce to the matching section. */}
            <a href="#/rsvp" onClick={(e) => { e.preventDefault(); goSection('rsvp'); }} className={btnPrimary}>{t('nav_rsvp')}</a>
            <a href="#/celebrations" onClick={(e) => { e.preventDefault(); goSection('celebrations'); }} className={btnGhostDark}>{t('home_view_events')}</a>
          </div>
        </div>
      </section>

      <BrassBand text={`${t('hero_dates')} · Mumbai`} />

      {/* ═══ COUNTDOWN MEDALLION + QUOTE ═══ */}
      <section className="marble-white text-wedding-ink pt-16 sm:pt-20 px-6 pb-16 sm:pb-24 overflow-hidden">
        <div className="max-w-[1100px] mx-auto grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] items-center gap-x-12 gap-y-12">
          <Reveal className="w-full max-w-[560px] mx-auto">
            <SunburstFloor disc="#0C0B0A" ray="#F2EFE9" ring="#F2EFE9" ground="#F2EFE9" outline="#C8A75C" className="animate-raysIn">
              <div className="font-serif text-[clamp(34px,8.5vw,72px)] leading-none tracking-[-.01em] tabular-nums text-wedding-ink">{cd.days}</div>
              <div className={`mt-1 ${label} text-[8px] sm:text-[10px] text-wedding-bronze`}>{t('cd_days')}</div>
            </SunburstFloor>
            <p className={`mt-6 mb-0 text-center ${label} text-wedding-bronze`}>{t('countdown_label')}</p>
          </Reveal>
          <Reveal delay={0.1} className="text-center lg:text-left">
            <div className="inlay marble-white px-9 py-10 sm:px-12 sm:py-12 lg:px-14 text-center">
              <RisingSun size={54} color="#0C0B0A" className="mx-auto" />
              <p className={`mt-4 mb-5 ${label} text-wedding-bronze`}>{t('home_note_kicker')}</p>
              <p className="m-0 font-italic italic text-[clamp(19px,2.4vw,23px)] leading-[1.55] text-wedding-ink" style={{ textWrap: 'pretty' as any }}>
                {t('home_note')}
              </p>
              <p className="mt-6 mb-0 font-serif text-[20px] tracking-[.04em] text-wedding-ink">{t('home_note_sign')}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <TileBand />

      {/* ═══ THE CELEBRATIONS ═══ */}
      <section id="celebrations" className="relative overflow-hidden marble-black text-wedding-cream pt-20 sm:pt-24 pb-20 sm:pb-24">
        <div className="absolute inset-0 deco-coffer opacity-[.22]" aria-hidden />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(200,167,92,.14), transparent 70%)' }} aria-hidden />
        <div className="relative max-w-[1160px] mx-auto px-5 sm:px-6">
          <Reveal>
            <SectionTitle tone="dark" kicker={t('home_celebrations_kicker')} title={t('home_celebrations_title')} desc={t('home_celebrations_desc')} />
          </Reveal>
          <div className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-x-3 sm:gap-x-6 gap-y-10 sm:gap-y-12">
            {celebrations.map((c, i) => {
              const ev = eventFor(c);
              return (
                <Reveal key={c.id} delay={(i % 4) * 0.07} className="h-full">
                  <a href={`#/celebrations/${c.id}`} onClick={(e) => { e.preventDefault(); goDay(c.id); }} className="group flex h-full flex-col no-underline cursor-pointer text-wedding-cream">
                    <div className="relative">
                      <StepFrame size={16} borderWidth={2} innerBg="#0C0B0A" innerPadding={6}>
                        <div className="relative overflow-hidden">
                          <img src={c.heroImage} alt={c.title} loading="lazy" className="block w-full aspect-[3/4] object-cover transition-all duration-[1.2s] ease-out group-hover:scale-[1.05]" style={{ filter: 'saturate(.7) sepia(.2) contrast(1.05)' }} />
                          <div className="absolute inset-0 transition-opacity duration-700 group-hover:opacity-70" style={{ background: 'linear-gradient(180deg,rgba(12,11,10,.1) 0%,rgba(12,11,10,0) 30%,rgba(12,11,10,.9) 100%)' }} />
                          <div className="absolute left-0 right-0 bottom-0 p-3 sm:p-5">
                            <p className={`m-0 mb-1.5 ${label} text-[9px] sm:text-[10px] text-wedding-gold`}>{t('day_label')} {pad(c.day)} <span className="hidden sm:inline">· {c.weekday}</span></p>
                            {/* Two lines' worth of box, bottom-aligned: "Mehendi" and
                                "Wedding & Reception" then start at the same height, so
                                the DAY kickers above them line up across the row. */}
                            <h3 className="m-0 flex items-end min-h-[2.1em] font-serif font-normal text-[clamp(20px,4.6vw,32px)] leading-[1.05] text-wedding-cream" style={{ textWrap: 'balance' as any }}>{c.title}</h3>
                          </div>
                        </div>
                      </StepFrame>
                      <span className="absolute -top-3 left-3 sm:left-5 px-3 py-[6px] brass font-sans font-semibold text-[9px] sm:text-[10px] tracking-[.3em] uppercase whitespace-nowrap deco-chamfer-8">{c.dateShort}</span>
                    </div>
                    {/* A flex column so the row reads as a row: the venue line reserves
                        two lines (long names wrap), and Explore is pinned to the bottom
                        so all four sit on one line however long the taglines run. */}
                    <div className="mt-4 pt-3 border-t border-wedding-gold/30 flex flex-1 flex-col">
                      {ev && <p className={`m-0 ${label} text-[9px] leading-[1.5] min-h-[27px] tracking-[.22em] text-wedding-cream/60`}>{ev.time} · {ev.location}</p>}
                      <p className="mt-2 mb-3 font-italic italic text-[15px] sm:text-[18px] leading-[1.35] text-wedding-cream/85">{c.tagline}</p>
                      <span className={`${linkArrow} mt-auto text-wedding-gold group-hover:text-wedding-goldLight`}>
                        {t('home_explore')}<span className="inline-block w-[22px] h-px bg-current transition-all group-hover:w-[34px]" />
                      </span>
                    </div>
                  </a>
                </Reveal>
              );
            })}
          </div>

          {/* ═══ PROGRAMME · at a glance (old #programme links land here) ═══ */}
          <Reveal id="programme" className="mt-16 sm:mt-20 scroll-mt-6">
            <div className="flex items-end justify-between gap-6 mb-5 flex-wrap">
              <div>
                <p className={`m-0 mb-2 ${label} text-wedding-gold`}>{t('events_subtitle')}</p>
                <h3 className="m-0 font-serif font-normal text-[clamp(26px,5vw,36px)] leading-[1.05] text-wedding-cream">{t('events_title')}</h3>
              </div>
              <p className="m-0 font-italic italic text-[17px] text-wedding-cream/70">{t('events_desc')}</p>
            </div>
            <div className="border-y border-wedding-gold/60">
              <div className={`hidden md:grid grid-cols-[88px_1.3fr_.8fr_1.1fr_.9fr_1.1fr] gap-x-6 py-3 border-b border-wedding-gold/30 ${label} text-[9px] text-wedding-gold/80`}>
                <span>{t('lbl_date')}</span><span /><span>{t('lbl_time')}</span><span>{t('lbl_venue')}</span><span>{t('lbl_shuttle')}</span><span>{t('lbl_dress')}</span>
              </div>
              {events.map((ev, i) => {
                const c = celebrationFor(ev.id);
                const cell = 'font-sans font-light text-[14px] leading-[1.45] text-wedding-cream/85';
                const mlabel = `md:hidden ${label} text-[8px] text-wedding-gold/80 mr-2`;
                return (
                  <div key={ev.id} className={`grid grid-cols-[64px_minmax(0,1fr)] md:grid-cols-[88px_1.3fr_.8fr_1.1fr_.9fr_1.1fr] gap-x-4 md:gap-x-6 gap-y-1.5 py-5 md:items-baseline ${i > 0 ? 'border-t border-wedding-gold/30' : ''}`}>
                    <div className="row-span-5 md:row-span-1">
                      <span className="font-serif text-[30px] md:text-[34px] leading-none text-wedding-cream">{ev.day}</span>
                      <span className={`block mt-1 ${label} text-[8px] text-wedding-gold`}>{ev.month}{c ? ` · ${c.weekday.slice(0, 3)}` : ''}</span>
                    </div>
                    <h4 className="m-0 font-serif font-normal text-[20px] md:text-[22px] leading-[1.15] text-wedding-cream">
                      {c ? (
                        <a href={`#/celebrations/${c.id}`} onClick={(e) => { e.preventDefault(); goDay(c.id); }} className="text-wedding-cream no-underline cursor-pointer hover:text-wedding-goldLight transition-colors">{ev.title}</a>
                      ) : ev.title}
                    </h4>
                    <p className={`m-0 ${cell}`}><span className={mlabel}>{t('lbl_time')}</span>{ev.time}</p>
                    <p className={`m-0 ${cell}`}><span className={mlabel}>{t('lbl_venue')}</span>{ev.location}<span className="hidden md:block text-[12px] text-wedding-cream/55">{ev.address}</span></p>
                    <p className={`m-0 ${cell}`}><span className={mlabel}>{t('lbl_shuttle')}</span>{ev.shuttleTime}</p>
                    <p className={`m-0 ${cell}`}><span className={mlabel}>{t('lbl_dress')}</span>{ev.dressCode}</p>
                  </div>
                );
              })}
            </div>
            <div className="pt-6 text-center">
              <a href="#/travel" onClick={(e) => { e.preventDefault(); goPage('/travel'); }} className={`${linkArrow} text-wedding-gold hover:text-wedding-goldLight`}>
                {t('see_map')}<span className="inline-block w-[22px] h-px bg-current" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <TileBand />

      {/* Our Journey used to sit here. It ran to about a third of this page's height
          and pushed everything practical below it, so it lives at /story now. */}

      {/* ═══ GUIDES ═══ */}
      <section className="relative overflow-hidden marble-black text-wedding-cream pt-20 sm:pt-24 pb-20 sm:pb-24">
        <div className="absolute inset-0 deco-coffer opacity-[.2]" aria-hidden />
        <div className="relative max-w-[1100px] mx-auto px-5 sm:px-6">
          <Reveal>
            <SectionTitle tone="dark" kicker={t('guides_list_title')} title={t('guides_title')} />
          </Reveal>
          <div className="mt-12 sm:mt-16 grid md:grid-cols-3 gap-5 sm:gap-6">
            {guides.map((g, i) => (
              <Reveal key={g.path} delay={i * 0.08} className="h-full">
                <a
                  href={`#${g.path}`}
                  onClick={(e) => { e.preventDefault(); goPage(g.path); }}
                  className="group relative flex h-full flex-col no-underline cursor-pointer border border-wedding-gold/50 hover:border-wedding-gold bg-wedding-ink/40 transition-colors"
                >
                  <CornerBrackets inset={6} size={18} />
                  <span className="absolute inset-[14px] border border-wedding-gold/25 pointer-events-none group-hover:border-wedding-gold/50 transition-colors" aria-hidden />
                  <div className="relative flex flex-1 flex-col px-7 pt-10 pb-9 text-center">
                    {/* The rising sun is a third the height of the lotus and the palm,
                        so give all three the same box and sit them on its floor —
                        otherwise this card's whole stack floats 40px high. */}
                    <div className="h-[84px] flex items-end justify-center">
                      <g.Icon size={g.Icon === RisingSun ? 84 : 78} className="mx-auto" />
                    </div>
                    <p className={`mt-5 mb-3 ${label} text-wedding-gold`}>{g.tag}</p>
                    <h3 className="m-0 mb-3 flex items-center justify-center min-h-[2.2em] font-serif font-normal text-[clamp(24px,5.5vw,30px)] leading-[1.1] text-wedding-cream">{g.title}</h3>
                    <p className="m-0 font-sans font-light text-[15px] leading-[1.6] text-wedding-cream/70">{g.desc}</p>
                    <div className="mt-auto pt-6">
                      <span className={`${linkArrow} text-wedding-gold group-hover:text-wedding-goldLight`}>
                        {t('home_explore')}<span className="inline-block w-[22px] h-px bg-current transition-all group-hover:w-[34px]" />
                      </span>
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TileBand />

      {/* ═══ RSVP ═══ */}
      <section id="rsvp" className="relative overflow-hidden marble-black text-wedding-cream pt-20 sm:pt-24 pb-24">
        <div className="absolute inset-0 deco-coffer opacity-[.18]" aria-hidden />
        <div
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 w-[900px] h-[900px] -top-[200px] rounded-full animate-spinSlow"
          style={{
            backgroundImage: 'repeating-conic-gradient(from 0deg,rgba(200,167,92,.2) 0 1.2deg,transparent 1.2deg 7.5deg)',
            WebkitMaskImage: 'radial-gradient(circle,#000 0%,transparent 62%)',
            maskImage: 'radial-gradient(circle,#000 0%,transparent 62%)',
          }}
        />
        <div className="max-w-[600px] mx-auto px-5 relative">
          <Reveal>
            <MirrorEmblem size={96} className="mx-auto mb-8" />
            <StepFrame size={20} borderWidth={2} innerBg="#0C0B0A" innerPadding={0}>
              <div className="pt-10 px-[26px] pb-9 sm:px-10">
              {rsvpDone ? (
                <div className="text-center animate-heroIn">
                  <p className={`m-0 mb-[14px] ${label} text-wedding-gold`}>{t('nav_rsvp')}</p>
                  <h2 className="m-0 mb-4 font-serif font-normal text-[clamp(38px,10vw,60px)] leading-none text-wedding-cream">{t('rsvp_thanks')}</h2>
                  <p className="mx-auto mb-0 max-w-[360px] font-sans font-light text-[15px] leading-[1.65] text-wedding-cream/75">{t('rsvp_thanks_msg')}</p>
                  <button onClick={resetRsvp} className={`mt-[26px] bg-transparent border-0 border-b border-wedding-gold text-wedding-gold ${label} pb-1 cursor-pointer`}>
                    {t('rsvp_another')}
                  </button>
                </div>
              ) : (
                <form onSubmit={submitRsvp} className="flex flex-col gap-[26px]">
                  <div className="text-center">
                    <p className={`m-0 mb-[14px] ${label} text-wedding-gold`}>{t('nav_rsvp')}</p>
                    <h2 className="m-0 mb-[10px] font-serif font-normal text-[clamp(30px,7.5vw,44px)] leading-[1.05] text-wedding-cream">{t('rsvp_respond_by')}</h2>
                    <p className="m-0 font-italic italic text-[20px] leading-none tracking-[.04em] text-wedding-goldLight">{t('rsvp_deadline')}</p>
                  </div>
                  <div className="grid gap-[18px]" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))' }}>
                    <label className="flex flex-col gap-2">
                      <span className={`${label} text-wedding-gold`}>{t('rsvp_first_name')}</span>
                      <input type="text" required autoComplete="given-name" value={form.first} onChange={(e) => setForm({ ...form, first: e.target.value })} className={field} />
                    </label>
                    <label className="flex flex-col gap-2">
                      <span className={`${label} text-wedding-gold`}>{t('rsvp_last_name')}</span>
                      <input type="text" required autoComplete="family-name" value={form.last} onChange={(e) => setForm({ ...form, last: e.target.value })} className={field} />
                    </label>
                  </div>
                  <label className="flex flex-col gap-2">
                    <span className={`${label} text-wedding-gold`}>{t('rsvp_email')}</span>
                    <input type="email" required autoComplete="email" inputMode="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" className={field} />
                  </label>
                  <div className="flex flex-col gap-[10px]">
                    <span className={`${label} text-wedding-gold`}>{t('rsvp_attending')}</span>
                    <div className="grid grid-cols-2 gap-2">
                      {(['yes', 'no'] as const).map((v) => (
                        <button key={v} type="button" onClick={() => setAttending(v)} className={`py-[15px] px-[10px] border border-wedding-gold font-sans font-semibold text-[10px] tracking-[.24em] uppercase cursor-pointer transition-all ${attending === v ? 'brass' : 'bg-transparent text-wedding-goldLight hover:bg-wedding-gold/10'}`}>
                          {t(v === 'yes' ? 'rsvp_yes' : 'rsvp_no')}
                        </button>
                      ))}
                    </div>
                  </div>
                  {attending === 'yes' && (
                    <div className="flex flex-col gap-[26px] animate-heroIn">
                      <label className="flex flex-col gap-2">
                        <span className={`${label} text-wedding-gold`}>{t('rsvp_guests')}</span>
                        <select value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} className={`${field} appearance-none`}>
                          <option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option>
                        </select>
                      </label>
                      <label className="flex flex-col gap-2">
                        <span className={`${label} text-wedding-gold`}>{t('rsvp_diet')}</span>
                        <textarea rows={2} value={form.diet} onChange={(e) => setForm({ ...form, diet: e.target.value })} className="w-full bg-transparent border border-wedding-gold/50 p-3 text-wedding-cream font-sans font-light text-[15px] leading-[1.5] outline-none rounded-none resize-y focus:border-wedding-goldLight" />
                      </label>
                    </div>
                  )}
                  <button type="submit" className="mt-1.5 py-[18px] px-[26px] brass border-0 font-sans font-semibold text-[11px] tracking-[.32em] uppercase cursor-pointer deco-chamfer-8 transition-colors">
                    {t('rsvp_send')}
                  </button>
                </form>
              )}
              </div>
            </StepFrame>
          </Reveal>
        </div>
      </section>
      <TileBand />

      {/* ═══ REGISTRY (last, and quiet) ═══ */}
      <section id="registry" className="marble-white text-wedding-ink pt-20 sm:pt-24 pb-20 sm:pb-24">
        <div className="max-w-[720px] mx-auto px-5 sm:px-6">
          <Reveal>
            <SectionTitle kicker={t('registry_kicker')} title={t('registry_title')} desc={t('registry_desc')} wide />
          </Reveal>
          <Reveal delay={0.08} className="mt-12">
            <div className="inlay marble-white px-8 py-10 sm:px-12 sm:py-12">
              {charity && (
                <>
                  <h3 className="m-0 mb-4 font-serif font-normal text-[clamp(24px,5vw,30px)] leading-[1.1]">{charity.store}</h3>
                  <p className="m-0 font-sans font-light text-[15px] leading-[1.65] text-wedding-ink/80">{charity.description}</p>
                  <a href={charity.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-7 py-[15px] px-6 bg-wedding-ink text-wedding-goldLight font-sans font-semibold text-[10px] tracking-[.3em] uppercase no-underline deco-chamfer-8 hover:bg-wedding-pine hover:text-wedding-cream">
                    {t('registry_donate')}
                  </a>
                </>
              )}
              {btc && (
                <div className="mt-9 pt-7 border-t border-wedding-ink/25">
                  <p className="m-0 font-sans font-light text-[14px] leading-[1.6] text-wedding-ink/70">{btc.description}</p>
                  <button onClick={() => setShowBtc((v) => !v)} className={`mt-3 bg-transparent border-0 border-b border-wedding-bronze p-0 pb-[3px] ${label} text-wedding-bronze cursor-pointer hover:text-wedding-ink hover:border-wedding-ink`}>
                    {showBtc ? t('registry_hide_btc') : t('registry_show_btc')}
                  </button>
                  {showBtc && (
                    <div className="flex flex-wrap gap-[10px] items-stretch mt-4 animate-heroIn">
                      <code className="flex-1 basis-[200px] min-w-0 py-[13px] px-[14px] border border-wedding-ink/35 font-mono text-xs leading-[1.5] break-all text-wedding-ink bg-wedding-ink/[.04]">{btc.link}</code>
                      <button onClick={copyBtc} className="py-[15px] px-5 border border-wedding-ink font-sans font-semibold text-[10px] tracking-[.3em] uppercase cursor-pointer whitespace-nowrap transition-all" style={{ background: copied ? '#0C0B0A' : 'transparent', color: copied ? '#E2C88A' : '#0C0B0A' }}>
                        {copied ? t('registry_copied') : t('registry_copy')}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default Home;
