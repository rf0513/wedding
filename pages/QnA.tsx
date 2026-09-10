import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { FAQ_EN, FAQ_ES } from '../constants';
import { Sunburst, ChevronBand } from '../components/DecoUI';

const QnA: React.FC = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [open, setOpen] = useState(0);
  const faqs = language === 'en' ? FAQ_EN : FAQ_ES;
  const pad = (n: number) => String(n).padStart(2, '0');

  const goHome = () => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <main className="bg-wedding-cream text-wedding-ink pb-20">
      <div className="relative overflow-hidden bg-wedding-ink text-wedding-cream pt-28 px-6 pb-14 text-center">
        <Sunburst variant="header" />
        <div className="relative max-w-[640px] mx-auto">
          <p className="m-0 mb-[14px] font-sans font-semibold text-[10px] tracking-[.4em] uppercase text-wedding-gold">{t('guide_no')} 3</p>
          <h1 className="m-0 font-serif font-normal text-[clamp(36px,9vw,64px)] leading-[1.02]" style={{ textWrap: 'balance' as any }}>{t('qna_title')}</h1>
          <p className="mt-5 mx-auto mb-0 font-sans font-light text-[15px] leading-[1.65] text-wedding-cream/75">{t('qna_subtitle')}</p>
        </div>
      </div>
      <ChevronBand />

      <div className="max-w-[760px] mt-10 mx-auto px-6">
        <div className="border-t border-wedding-ink">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.id} className="border-b border-wedding-ink/35">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full grid grid-cols-[auto_minmax(0,1fr)_auto] gap-4 items-start py-[22px] bg-transparent border-0 text-left cursor-pointer text-wedding-ink"
                >
                  <span className="font-sans font-semibold text-[10px] leading-[1.9] tracking-[.3em] text-wedding-bronze min-w-[24px]">{pad(i + 1)}</span>
                  <span className="font-serif text-[clamp(19px,5vw,24px)] leading-[1.25]">{f.question}</span>
                  <span className="font-serif text-[22px] leading-none text-wedding-bronze transition-transform" style={{ transform: isOpen ? 'rotate(45deg)' : 'none' }}>+</span>
                </button>
                {isOpen && (
                  <p
                    className="mb-6 ml-10 font-sans font-light text-[15px] leading-[1.65] text-wedding-ink/85 animate-heroIn"
                    dangerouslySetInnerHTML={{ __html: f.answer }}
                  />
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-14 text-center">
          <a onClick={goHome} className="inline-block py-[15px] px-6 border border-wedding-ink text-wedding-ink font-sans font-semibold text-[10px] tracking-[.3em] uppercase no-underline cursor-pointer hover:bg-wedding-ink hover:text-wedding-goldLight">
            ← {t('rsvp_back_home')}
          </a>
        </div>
      </div>
    </main>
  );
};

export default QnA;
