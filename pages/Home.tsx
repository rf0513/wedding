import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { WEDDING_DATA, EVENTS_EN, EVENTS_ES, STORY_EVENTS_EN, STORY_EVENTS_ES, STORY_MAIN_IMAGE, REGISTRY_ITEMS_EN, REGISTRY_ITEMS_ES, buildCalendarUrl } from '../constants';
import { Reveal, StepFrame, HeroFrame, Marquee, useCountdown, useSectionNav } from '../components/DecoUI';
import Curtain from '../components/Curtain';
import HeroSequence from '../components/HeroSequence';

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

const Home: React.FC = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const goSection = useSectionNav();
  const en = language === 'en';
  const cd = useCountdown('2027-02-02T11:00:00+05:30');

  const events = en ? EVENTS_EN : EVENTS_ES;
  const storyEvents = en ? STORY_EVENTS_EN : STORY_EVENTS_ES;
  const registryItems = en ? REGISTRY_ITEMS_EN : REGISTRY_ITEMS_ES;

  // RSVP form
  const [rsvpDone, setRsvpDone] = useState(false);
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [form, setForm] = useState({ first: '', last: '', email: '', guests: '1', diet: '' });

  const submitRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpDone(true);
  };
  const resetRsvp = () => {
    setRsvpDone(false);
    setForm({ first: '', last: '', email: '', guests: '1', diet: '' });
    setAttending('yes');
  };

  // Registry BTC copy
  const [copied, setCopied] = useState(false);
  const copyBtc = () => {
    try { navigator.clipboard.writeText(WEDDING_DATA.btcAddress); } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const guides = [
    { tag: `${t('guide_no')} 1`, title: t('nav_traditions'), desc: en ? 'Four ceremonies explained, what to wear to each, and where to shop.' : 'Cuatro ceremonias explicadas, qué usar en cada una y dónde comprar.', path: '/traditions' },
    { tag: `${t('guide_no')} 2`, title: t('nav_travel'), desc: en ? 'Where to stay, what to see, where to eat, and how to survive Mumbai.' : 'Dónde alojarse, qué ver, dónde comer y cómo sobrevivir Mumbai.', path: '/travel' },
    { tag: `${t('guide_no')} 3`, title: t('nav_qna'), desc: t('qna_subtitle'), path: '/qna' },
  ];

  return (
    <main>
      {/* ═══ OPENING CURTAIN (once per session) ═══ */}
      <Curtain />

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden bg-wedding-ink">
        <div className="absolute inset-0 overflow-hidden">
          {/* Auto-advancing photo sequence (duotone + parallax live inside) — edit HERO_IMAGES in constants.ts */}
          <HeroSequence />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(14,21,18,.45) 0%,rgba(14,21,18,0) 22%,rgba(14,21,18,.15) 48%,#0E1512 84%)' }} />
        </div>
        <HeroFrame />
        <div className="relative z-[2] pt-[min(38vh,320px)] px-9 pb-16 text-center animate-heroIn">
          <p className="m-0 mb-[18px] font-sans font-semibold text-[10px] tracking-[.42em] uppercase text-wedding-gold">{t('the_wedding_of')}</p>
          <h1 className="m-0 font-serif font-normal text-wedding-cream text-[clamp(46px,13vw,124px)] leading-[.98] tracking-[.04em] uppercase" style={{ textWrap: 'balance' as any }}>
            Pavitra
            <span className="block text-[.42em] leading-[1.4] text-wedding-gold not-italic tracking-[.1em]">&amp;</span>
            Ramon
          </h1>
          <div className="flex items-center justify-center gap-[14px] mt-[26px]">
            <span className="h-px w-[34px] bg-wedding-gold" />
            <p className="m-0 font-sans text-xs leading-[1.4] tracking-[.24em] uppercase text-wedding-cream">{t('hero_dates')}</p>
            <span className="h-px w-[34px] bg-wedding-gold" />
          </div>
          <p className="mt-2 mb-0 font-sans font-light text-xs tracking-[.3em] uppercase text-wedding-cream/70">Mumbai · India</p>
          <div className="flex flex-wrap gap-[10px] justify-center mt-[30px]">
            <a onClick={() => goSection('rsvp')} className="min-w-[150px] pt-[17px] px-[26px] pb-[14px] bg-wedding-gold text-wedding-ink font-sans font-semibold text-[11px] tracking-[.3em] uppercase no-underline cursor-pointer deco-chamfer-8 transition-colors hover:bg-wedding-goldLight">
              {t('nav_rsvp')}
            </a>
            <a onClick={() => goSection('programme')} className="min-w-[150px] pt-4 px-[26px] pb-[13px] border border-wedding-gold/70 text-wedding-goldLight font-sans font-semibold text-[11px] tracking-[.3em] uppercase no-underline cursor-pointer transition-all hover:bg-wedding-gold/10 hover:border-wedding-gold">
              {t('home_view_events')}
            </a>
          </div>
        </div>
      </section>

      <Marquee text="Mumbai ✦ 2 – 5 February 2027 ✦ #PR27 ✦ Pavitra & Ramon ✦ Mehendi ✦ Haldi ✦ Sangeet ✦ Lagna ✦ " />

      {/* ═══ COUNTDOWN + QUOTE ═══ */}
      <section className="bg-wedding-cream text-wedding-ink pt-[72px] px-6 pb-20">
        <div className="max-w-[720px] mx-auto">
          <Reveal>
            <p className="m-0 mb-[22px] text-center font-sans font-semibold text-[10px] tracking-[.4em] uppercase text-wedding-bronze">{t('countdown_label')}</p>
            <div className="grid grid-cols-3 border-y border-wedding-ink">
              {[[cd.days, t('cd_days')], [cd.hours, t('cd_hours')], [cd.minutes, t('cd_minutes')]].map(([val, label], i) => (
                <div key={label} className={`pt-[22px] px-2 pb-[18px] text-center ${i < 2 ? 'border-r border-wedding-ink/25' : ''}`}>
                  <div className="font-sans font-light text-[clamp(40px,11vw,64px)] leading-none tracking-[-.02em] tabular-nums">{val}</div>
                  <div className="mt-[10px] font-sans font-semibold text-[10px] tracking-[.3em] uppercase text-wedding-bronze">{label}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1} className="mt-[72px] text-center">
            <div
              className="w-14 h-14 mx-auto mb-[26px] rounded-full"
              style={{
                backgroundImage: 'repeating-conic-gradient(from 0deg,#C8A951 0 2deg,transparent 2deg 12deg)',
                WebkitMaskImage: 'radial-gradient(circle,#000 28%,transparent 70%)',
                maskImage: 'radial-gradient(circle,#000 28%,transparent 70%)',
              }}
            />
            <blockquote className="m-0 font-serif text-[clamp(24px,6vw,38px)] leading-[1.25] text-wedding-ink" style={{ textWrap: 'balance' as any }}>
              {t('home_quote')}
            </blockquote>
            <p className="mt-[22px] mb-0 font-sans font-semibold text-[10px] tracking-[.4em] uppercase text-wedding-bronze">A.A. Milne</p>
          </Reveal>
        </div>
      </section>

      {/* ═══ PROGRAMME ═══ */}
      <section id="programme" className="relative bg-wedding-ink pt-20 pb-[72px]">
        <div className="deco-chevron h-[10px] absolute top-0 left-0 right-0 opacity-50" />
        <div className="max-w-[760px] mx-auto px-6">
          <Reveal className="text-center mb-14">
            <p className="m-0 mb-[14px] font-sans font-semibold text-[10px] tracking-[.4em] uppercase text-wedding-gold">{t('events_subtitle')}</p>
            <h2 className="m-0 font-serif font-normal text-[clamp(34px,8vw,56px)] leading-[1.05] text-wedding-cream" style={{ textWrap: 'balance' as any }}>{t('events_title')}</h2>
            <p className="mt-[18px] mx-auto mb-0 max-w-[440px] font-sans font-light text-[15px] leading-[1.65] text-wedding-cream/72">{t('events_desc')}</p>
          </Reveal>
          <div className="flex flex-col">
            {events.map((ev, i) => (
              <Reveal key={ev.id} as="article" className="grid grid-cols-[78px_minmax(0,1fr)] gap-[18px] py-[34px] border-t border-wedding-gold/28">
                <div className="text-center">
                  <div className="font-sans font-light text-[56px] leading-none text-wedding-gold tracking-[-.03em]">{ev.day}</div>
                  <div className="mt-[6px] font-sans font-semibold text-[10px] tracking-[.3em] uppercase text-wedding-cream/60">{ev.month}</div>
                  <span className="block mx-auto mt-[14px] w-[22px] h-[22px] bg-wedding-gold deco-step-12 opacity-90" />
                </div>
                <div className="min-w-0">
                  <p className="m-0 mb-[6px] font-sans font-semibold text-[10px] tracking-[.3em] uppercase text-wedding-gold">{ROMAN[i]}</p>
                  <h3 className="m-0 mb-[10px] font-serif font-normal text-[clamp(24px,6vw,32px)] leading-[1.1] text-wedding-cream">{ev.title}</h3>
                  <p className="m-0 mb-[18px] font-sans font-light text-[15px] leading-[1.6] text-wedding-cream/75">{ev.description}</p>
                  <dl className="m-0 grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-[9px] text-[13px] leading-[1.45]">
                    <dt className="font-sans font-semibold text-[10px] leading-[1.45] tracking-[.25em] uppercase text-wedding-gold pt-[2px]">{t('lbl_time')}</dt>
                    <dd className="m-0 text-wedding-cream">{ev.time}</dd>
                    <dt className="font-sans font-semibold text-[10px] leading-[1.45] tracking-[.25em] uppercase text-wedding-gold pt-[2px]">{t('lbl_venue')}</dt>
                    <dd className="m-0 text-wedding-cream">{ev.location}<span className="block text-wedding-cream/60 font-light">{ev.address}</span></dd>
                    <dt className="font-sans font-semibold text-[10px] leading-[1.45] tracking-[.25em] uppercase text-wedding-gold pt-[2px]">{t('lbl_shuttle')}</dt>
                    <dd className="m-0 text-wedding-cream">{t('events_shuttle')} {ev.shuttleTime}</dd>
                    <dt className="font-sans font-semibold text-[10px] leading-[1.45] tracking-[.25em] uppercase text-wedding-gold pt-[2px]">{t('lbl_dress')}</dt>
                    <dd className="m-0">
                      <a onClick={() => { navigate('/traditions'); }} className="text-wedding-cream border-b border-wedding-gold/60 no-underline cursor-pointer pb-px hover:text-wedding-goldLight hover:border-wedding-goldLight">{ev.dressCode}</a>
                    </dd>
                  </dl>
                  <a href={buildCalendarUrl(ev)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-[10px] mt-5 font-sans font-semibold text-[10px] tracking-[.3em] uppercase text-wedding-gold no-underline pt-[2px] hover:text-wedding-goldLight">
                    {t('add_to_calendar')}<span className="inline-block w-[22px] h-px bg-current" />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="border-t border-wedding-gold/28 pt-7 text-center">
            <a onClick={() => navigate('/travel')} className="inline-flex items-center gap-[10px] font-sans font-semibold text-[10px] tracking-[.3em] uppercase text-wedding-gold no-underline cursor-pointer pt-[2px] hover:text-wedding-goldLight">
              {t('see_map')}<span className="inline-block w-[22px] h-px bg-current" />
            </a>
          </div>
        </div>
      </section>

      {/* ═══ STORY ═══ */}
      <section id="story" className="bg-wedding-cream text-wedding-ink pt-20 pb-[72px]">
        <div className="max-w-[760px] mx-auto px-6">
          <Reveal className="text-center mb-12">
            <p className="m-0 mb-[14px] font-sans font-semibold text-[10px] tracking-[.4em] uppercase text-wedding-bronze">{t('story_kicker')}</p>
            <h2 className="m-0 font-serif font-normal text-[clamp(34px,8vw,56px)] leading-[1.05] text-wedding-ink">{t('story_title')}</h2>
          </Reveal>
          <Reveal className="mb-16">
            <StepFrame size={20} borderWidth={3} innerBg="#0E1512" innerPadding={14}>
              <img src={STORY_MAIN_IMAGE} alt="Pavitra and Ramon" className="block w-full aspect-[3/2] object-cover" />
            </StepFrame>
          </Reveal>
          <div className="flex flex-col gap-14">
            {storyEvents.map((ev, i) => (
              <Reveal key={ev.id} as="article" className="grid grid-cols-1 gap-[22px]">
                <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 items-start">
                  <div className="font-serif text-[44px] leading-[.9] text-wedding-gold min-w-[56px]">{ROMAN[i]}</div>
                  <div>
                    <p className="mt-0.5 mb-2 font-sans font-semibold text-[10px] tracking-[.3em] uppercase text-wedding-bronze">{ev.date}</p>
                    <h3 className="m-0 mb-[10px] font-serif font-normal text-[clamp(24px,6vw,32px)] leading-[1.1]">{ev.title}</h3>
                    <p className="m-0 font-sans font-light text-[15px] leading-[1.65] text-wedding-ink/78">{ev.desc}</p>
                  </div>
                </div>
                <div style={{ marginLeft: i % 2 ? 0 : 56, marginRight: i % 2 ? 56 : 0 }}>
                  <StepFrame size={14} borderWidth={2} innerBg="#F3EEE1" innerPadding={10}>
                    <img src={ev.img} alt={ev.title} className="block w-full aspect-[4/3] object-cover" style={{ filter: 'saturate(.85) contrast(1.05)' }} />
                  </StepFrame>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GUIDES ═══ */}
      <section className="relative bg-wedding-ink pt-20 pb-[72px]">
        <div className="deco-chevron h-[10px] absolute top-0 left-0 right-0 opacity-50" />
        <div className="max-w-[760px] mx-auto px-6">
          <Reveal className="text-center mb-11">
            <p className="m-0 mb-[14px] font-sans font-semibold text-[10px] tracking-[.4em] uppercase text-wedding-gold">{t('traditions_subtitle')}</p>
            <h2 className="m-0 font-serif font-normal text-[clamp(34px,8vw,56px)] leading-[1.05] text-wedding-cream" style={{ textWrap: 'balance' as any }}>{t('guides_title')}</h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-4">
            {guides.map((g) => (
              <Reveal key={g.path}>
                <a
                  onClick={() => navigate(g.path)}
                  className="block no-underline cursor-pointer p-px bg-wedding-gold/55 deco-step-16 hover:bg-wedding-gold transition-colors"
                >
                  <div className="grid grid-cols-[44px_minmax(0,1fr)_auto] items-stretch bg-wedding-pine deco-step-16">
                    <div className="border-r border-dashed border-wedding-gold/50 grid place-items-center">
                      <span className="whitespace-nowrap font-sans font-semibold text-[9px] tracking-[.35em] uppercase text-wedding-gold" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>{g.tag}</span>
                    </div>
                    <div className="pt-6 px-5 pb-[22px]">
                      <h3 className="m-0 mb-2 font-serif font-normal text-[clamp(22px,5.5vw,28px)] leading-[1.1] text-wedding-cream">{g.title}</h3>
                      <p className="m-0 font-sans font-light text-sm leading-[1.55] text-wedding-cream/68">{g.desc}</p>
                    </div>
                    <div className="grid place-items-center pr-5 pl-[6px]">
                      <span className="font-serif text-[26px] text-wedding-gold">→</span>
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ REGISTRY ═══ */}
      <section id="registry" className="bg-wedding-cream text-wedding-ink pt-20 pb-[72px]">
        <div className="max-w-[760px] mx-auto px-6">
          <Reveal className="text-center mb-11">
            <p className="m-0 mb-[14px] font-sans font-semibold text-[10px] tracking-[.4em] uppercase text-wedding-bronze">{t('registry_kicker')}</p>
            <h2 className="m-0 font-serif font-normal text-[clamp(34px,8vw,56px)] leading-[1.05]">{t('registry_title')}</h2>
            <p className="mt-[18px] mx-auto mb-0 max-w-[480px] font-sans font-light text-[15px] leading-[1.65] text-wedding-ink/78">{t('registry_desc')}</p>
          </Reveal>
          <div className="grid grid-cols-1 gap-[18px]">
            {registryItems.map((item, i) => (
              <Reveal key={item.id} className="border-t border-wedding-ink pt-[26px] pb-1.5 grid grid-cols-1 gap-[14px]">
                <p className="m-0 font-sans font-semibold text-[10px] tracking-[.3em] uppercase text-wedding-bronze">{ROMAN[i]}</p>
                <h3 className="m-0 font-serif font-normal text-[26px] leading-[1.1]">{item.store}</h3>
                <p className="m-0 font-sans font-light text-[15px] leading-[1.65] text-wedding-ink/78">{item.description}</p>
                {item.id === 'btc' ? (
                  <div className="flex flex-wrap gap-[10px] items-stretch mt-1.5">
                    <code className="flex-1 basis-[220px] min-w-0 py-[13px] px-[14px] border border-wedding-ink/35 font-mono text-xs leading-[1.5] break-all text-wedding-ink bg-wedding-ink/[.04]">{item.link}</code>
                    <button onClick={copyBtc} className="py-[15px] px-5 border border-wedding-ink font-sans font-semibold text-[10px] tracking-[.3em] uppercase cursor-pointer whitespace-nowrap transition-all" style={{ background: copied ? '#0E1512' : 'transparent', color: copied ? '#E3C77A' : '#0E1512' }}>
                      {copied ? t('registry_copied') : t('registry_copy')}
                    </button>
                  </div>
                ) : (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="justify-self-start mt-1.5 py-[15px] px-6 bg-wedding-ink text-wedding-goldLight font-sans font-semibold text-[10px] tracking-[.3em] uppercase no-underline deco-chamfer-8 hover:bg-wedding-pine hover:text-wedding-cream">
                    {t('registry_donate')}
                  </a>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ RSVP ═══ */}
      <section id="rsvp" className="relative overflow-hidden bg-wedding-ink pt-20 pb-[88px]">
        <div
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 w-[720px] h-[720px] -top-[140px] rounded-full animate-spinSlow"
          style={{
            backgroundImage: 'repeating-conic-gradient(from 0deg,rgba(200,169,81,.22) 0 1.2deg,transparent 1.2deg 7.5deg)',
            WebkitMaskImage: 'radial-gradient(circle,#000 0%,transparent 62%)',
            maskImage: 'radial-gradient(circle,#000 0%,transparent 62%)',
          }}
        />
        <div className="max-w-[560px] mx-auto px-5 relative">
          <Reveal>
            <StepFrame size={20} borderWidth={2} innerBg="#0E1512" innerPadding={0} className="[&>div]:pt-10 [&>div]:px-[26px] [&>div]:pb-9">
              {rsvpDone ? (
                <div className="text-center animate-heroIn">
                  <p className="m-0 mb-[14px] font-sans font-semibold text-[10px] tracking-[.4em] uppercase text-wedding-gold">{t('nav_rsvp')}</p>
                  <h2 className="m-0 mb-4 font-serif font-normal text-[clamp(38px,10vw,60px)] leading-none text-wedding-cream">{t('rsvp_thanks')}</h2>
                  <p className="mx-auto mb-0 max-w-[360px] font-sans font-light text-[15px] leading-[1.65] text-wedding-cream/75">{t('rsvp_thanks_msg')}</p>
                  <button onClick={resetRsvp} className="mt-[26px] bg-transparent border-0 border-b border-wedding-gold text-wedding-gold font-sans font-semibold text-[10px] tracking-[.3em] uppercase pb-1 cursor-pointer">
                    {t('rsvp_another')}
                  </button>
                </div>
              ) : (
                <form onSubmit={submitRsvp} className="flex flex-col gap-[26px]">
                  <div className="text-center">
                    <p className="m-0 mb-[14px] font-sans font-semibold text-[10px] tracking-[.4em] uppercase text-wedding-gold">{t('nav_rsvp')}</p>
                    <h2 className="m-0 mb-[10px] font-serif font-normal text-[clamp(30px,7.5vw,44px)] leading-[1.05] text-wedding-cream">{t('rsvp_respond_by')}</h2>
                    <p className="m-0 font-sans font-light text-[13px] leading-none tracking-[.24em] uppercase text-wedding-goldLight">{t('rsvp_deadline')}</p>
                  </div>
                  <div className="grid gap-[18px]" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))' }}>
                    <label className="flex flex-col gap-2">
                      <span className="font-sans font-semibold text-[10px] tracking-[.3em] uppercase text-wedding-gold">{t('rsvp_first_name')}</span>
                      <input type="text" required value={form.first} onChange={(e) => setForm({ ...form, first: e.target.value })} className="w-full bg-transparent border-0 border-b border-wedding-gold/50 py-[10px] text-wedding-cream font-serif text-lg leading-[1.2] outline-none rounded-none focus:border-wedding-goldLight" />
                    </label>
                    <label className="flex flex-col gap-2">
                      <span className="font-sans font-semibold text-[10px] tracking-[.3em] uppercase text-wedding-gold">{t('rsvp_last_name')}</span>
                      <input type="text" required value={form.last} onChange={(e) => setForm({ ...form, last: e.target.value })} className="w-full bg-transparent border-0 border-b border-wedding-gold/50 py-[10px] text-wedding-cream font-serif text-lg leading-[1.2] outline-none rounded-none focus:border-wedding-goldLight" />
                    </label>
                  </div>
                  <label className="flex flex-col gap-2">
                    <span className="font-sans font-semibold text-[10px] tracking-[.3em] uppercase text-wedding-gold">{t('rsvp_email')}</span>
                    <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" className="w-full bg-transparent border-0 border-b border-wedding-gold/50 py-[10px] text-wedding-cream font-serif text-lg leading-[1.2] outline-none rounded-none focus:border-wedding-goldLight" />
                  </label>
                  <div className="flex flex-col gap-[10px]">
                    <span className="font-sans font-semibold text-[10px] tracking-[.3em] uppercase text-wedding-gold">{t('rsvp_attending')}</span>
                    <div className="grid grid-cols-2 gap-2">
                      <button type="button" onClick={() => setAttending('yes')} className="py-[15px] px-[10px] border border-wedding-gold font-sans font-semibold text-[10px] tracking-[.24em] uppercase cursor-pointer transition-all" style={{ background: attending === 'yes' ? '#C8A951' : 'transparent', color: attending === 'yes' ? '#0E1512' : '#E3C77A' }}>{t('rsvp_yes')}</button>
                      <button type="button" onClick={() => setAttending('no')} className="py-[15px] px-[10px] border border-wedding-gold font-sans font-semibold text-[10px] tracking-[.24em] uppercase cursor-pointer transition-all" style={{ background: attending === 'no' ? '#C8A951' : 'transparent', color: attending === 'no' ? '#0E1512' : '#E3C77A' }}>{t('rsvp_no')}</button>
                    </div>
                  </div>
                  {attending === 'yes' && (
                    <div className="flex flex-col gap-[26px] animate-heroIn">
                      <label className="flex flex-col gap-2">
                        <span className="font-sans font-semibold text-[10px] tracking-[.3em] uppercase text-wedding-gold">{t('rsvp_guests')}</span>
                        <select value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} className="w-full bg-transparent border-0 border-b border-wedding-gold/50 py-[10px] text-wedding-cream font-serif text-lg leading-[1.2] outline-none rounded-none appearance-none">
                          <option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option>
                        </select>
                      </label>
                      <label className="flex flex-col gap-2">
                        <span className="font-sans font-semibold text-[10px] tracking-[.3em] uppercase text-wedding-gold">{t('rsvp_diet')}</span>
                        <textarea rows={2} value={form.diet} onChange={(e) => setForm({ ...form, diet: e.target.value })} className="w-full bg-transparent border border-wedding-gold/50 p-3 text-wedding-cream font-sans font-light text-[15px] leading-[1.5] outline-none rounded-none resize-y focus:border-wedding-goldLight" />
                      </label>
                    </div>
                  )}
                  <button type="submit" className="mt-1.5 py-[18px] px-[26px] bg-wedding-gold text-wedding-ink border-0 font-sans font-semibold text-[11px] tracking-[.32em] uppercase cursor-pointer deco-chamfer-8 transition-colors hover:bg-wedding-goldLight">
                    {t('rsvp_send')}
                  </button>
                </form>
              )}
            </StepFrame>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default Home;
