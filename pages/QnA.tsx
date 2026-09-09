import React from 'react';
import { FAQ_EN, FAQ_ES } from '../constants';
import { HelpCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const QnA: React.FC = () => {
  const { language, t } = useLanguage();
  
  const faqs = language === 'en' ? FAQ_EN : FAQ_ES;

  return (
    <div className="min-h-screen pt-24 pb-20 bg-wedding-pattern relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-wedding-marigold/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-wedding-rani/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
           <div className="inline-block p-4 rounded-full bg-wedding-gold/20 mb-4 backdrop-blur-sm">
             <HelpCircle className="text-wedding-rani" size={40} />
           </div>
          <h1 className="font-serif text-5xl md:text-6xl text-wedding-charcoal mb-6">{t('qna_title')}</h1>
          <p className="text-gray-600 font-light max-w-lg mx-auto leading-relaxed">
            {t('qna_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:gap-8">
          {faqs.map((faq, index) => (
            <div 
              key={faq.id}
              className="bg-white/95 backdrop-blur-sm p-8 rounded-xl shadow-md border-l-4 border-wedding-rani hover:shadow-lg transition-shadow duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="font-serif text-2xl text-wedding-charcoal mb-4 flex items-start gap-3">
                 <span className="text-wedding-rani font-sans font-bold text-sm mt-2">Q.</span>
                 {faq.question}
              </h3>
              <div className="pl-7">
                 <p className="text-gray-600 leading-relaxed font-light" dangerouslySetInnerHTML={{ __html: faq.answer }}>
                 </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QnA;