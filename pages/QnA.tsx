import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { FAQ_EN, FAQ_ES } from '../constants';
import { TileBand, PageHeader, btnGhostLight } from '../components/DecoUI';

const QnA: React.FC = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [open, setOpen] = useState(0);
  const faqs = language === 'en' ? FAQ_EN : FAQ_ES;
  const pad = (n: number) => String(n).padStart(2, '0');

  const goHome = () => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <main className="marble-white text-wedding-ink pb-20">
      <PageHeader kicker={`${t('guide_no')} 3`} title={t('qna_title')} desc={t('qna_subtitle')} />
      <TileBand />

      <div className="max-w-[820px] mt-12 mx-auto px-6">
        <div className="inlay marble-white px-6 py-4 sm:px-10 sm:py-6">
        <div className="">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.id} className={i < faqs.length - 1 ? 'border-b border-wedding-ink/35' : ''}>
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
        </div>
        <div className="mt-14 text-center">
          <a onClick={goHome} className={btnGhostLight}>
            ← {t('rsvp_back_home')}
          </a>
        </div>
      </div>
    </main>
  );
};

export default QnA;
