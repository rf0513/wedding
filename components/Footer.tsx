import React from 'react';
import { WEDDING_DATA } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { TileBand } from './DecoUI';
import { MirrorEmblem, DecoRule } from './Ornaments';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="relative marble-black text-wedding-cream text-center border-t border-wedding-gold/35">
      <div className="absolute inset-0 deco-coffer opacity-[.14]" aria-hidden />
      <div className="relative px-6 pt-16 pb-14">
      <MirrorEmblem size={88} className="mx-auto mb-7" />
      <p className="m-0 mb-[14px] font-serif text-[clamp(30px,7vw,48px)] leading-[1.1]">{t('footer_msg')}</p>
      <p className="m-0 mb-[22px] font-sans font-semibold text-[10px] tracking-[.34em] uppercase text-wedding-gold">
        {WEDDING_DATA.couple.partner1} &amp; {WEDDING_DATA.couple.partner2}
      </p>
      <div className="flex items-center justify-center gap-3 text-wedding-cream/55 font-sans font-light text-[11px] tracking-[.28em] uppercase">
        <span>2 – 5 · II · 2027</span>
        <span className="w-1 h-1 bg-wedding-gold rotate-45" />
        <span>Mumbai</span>
        <span className="w-1 h-1 bg-wedding-gold rotate-45" />
        <span>{WEDDING_DATA.couple.hashtag}</span>
      </div>
      <DecoRule className="mt-10" />
      </div>
      <TileBand />
    </footer>
  );
};

export default Footer;
