import React from 'react';
import { WEDDING_DATA } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-wedding-charcoal text-wedding-cream py-6 border-t-4 border-wedding-rani">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="font-serif text-xl mb-2 text-wedding-gold">
          {WEDDING_DATA.couple.partner1} & {WEDDING_DATA.couple.partner2}
        </h2>
        <p className="font-sans text-[10px] tracking-[0.2em] uppercase mb-3 text-wedding-marigold font-bold">
          {WEDDING_DATA.date} • {WEDDING_DATA.location.city}
        </p>
        <div className="flex justify-center items-center gap-2 mb-2 opacity-50">
           <div className="w-8 h-px bg-wedding-gold"></div>
           <div className="text-wedding-rani text-xs">❤</div>
           <div className="w-8 h-px bg-wedding-gold"></div>
        </div>
        <p className="text-[10px] text-gray-500">
          {t('footer_msg')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;