import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { WEDDING_CUSTOMS_EN, WEDDING_CUSTOMS_ES, ATTIRE_GUIDE_EN, ATTIRE_GUIDE_ES, EVENT_DRESS_CODES_EN, EVENT_DRESS_CODES_ES } from '../constants';
import { Info, Sparkles, Shirt, Globe, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { AttireItem } from '../types';

const Traditions: React.FC = () => {
  const { search } = useLocation();
  const { language, t } = useLanguage();

  const [activeTab, setActiveTab] = useState<'ceremonies' | 'attire'>(() => {
    const params = new URLSearchParams(search);
    return params.get('tab') === 'attire' ? 'attire' : 'ceremonies';
  });

  const customs = language === 'en' ? WEDDING_CUSTOMS_EN : WEDDING_CUSTOMS_ES;
  const attire = language === 'en' ? ATTIRE_GUIDE_EN : ATTIRE_GUIDE_ES;
  const dressCodes = language === 'en' ? EVENT_DRESS_CODES_EN : EVENT_DRESS_CODES_ES;

  const womenAttire = attire.filter(item => item.gender === 'Women');
  const menAttire = attire.filter(item => item.gender === 'Men');

  const getEventEmojis = (eventId: string) => {
    switch (eventId) {
      case 'sangeet':
        return { women: '💃', men: '🕺' };
      case 'wedding':
        return { women: '🥻', men: '🤵' };
      default:
        return { women: '👩', men: '👨' };
    }
  };

  const renderAttireList = (items: AttireItem[]) => (
    <div className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scroll-smooth hide-scrollbar">
      {items.map((item) => (
        <div key={item.id} className="min-w-[280px] md:min-w-0 snap-center bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-gray-100 group hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
          <div className="relative aspect-[3/4] overflow-hidden flex-shrink-0">
              <img 
              src={item.imageUrl} 
              alt={item.name} 
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
          </div>
          <div className="p-6 md:p-8 flex flex-col flex-grow">
              <div className="mb-4">
                <h3 className="font-serif text-2xl md:text-3xl text-wedding-charcoal mb-1 leading-none">{item.name}</h3>
                {item.pronunciation && (
                  <span className="text-wedding-marigold text-sm font-light italic">({item.pronunciation})</span>
                )}
              </div>
              
              <p className="text-gray-600 font-light leading-relaxed mb-6 flex-grow">
                {item.description}
              </p>
              
              <div className="border-t border-gray-100 pt-4 mt-auto">
                <span className="text-xs font-bold uppercase tracking-widest text-wedding-rani block mb-2">{t('traditions_perfect_for')}</span>
                <div className="flex flex-wrap gap-2">
                    {item.bestFor.map(event => (
                      <span key={event} className="bg-wedding-cream text-wedding-charcoal text-xs px-2 py-1 rounded border border-wedding-gold/30">
                        {event}
                      </span>
                    ))}
                </div>
              </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-20 bg-wedding-pattern relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-wedding-marigold/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-wedding-rani/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in-up">
          <p className="text-wedding-rani text-sm tracking-widest uppercase mb-2 font-bold">{t('traditions_subtitle')}</p>
          <h1 className="font-serif text-5xl md:text-6xl text-wedding-charcoal mb-6">{t('traditions_title')}</h1>
          <p className="text-gray-600 font-light max-w-2xl mx-auto leading-relaxed text-lg">
            {t('traditions_desc')}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-16 animate-fade-in-up">
           <div className="bg-white/80 backdrop-blur rounded-full p-1 shadow-md inline-flex border border-wedding-gold/30">
              <button 
                onClick={() => setActiveTab('ceremonies')}
                className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all ${
                  activeTab === 'ceremonies' 
                    ? 'bg-wedding-rani text-white shadow-md' 
                    : 'text-gray-500 hover:text-wedding-charcoal'
                }`}
              >
                {t('traditions_tab_ceremonies')}
              </button>
              <button 
                onClick={() => setActiveTab('attire')}
                className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all ${
                  activeTab === 'attire' 
                    ? 'bg-wedding-rani text-white shadow-md' 
                    : 'text-gray-500 hover:text-wedding-charcoal'
                }`}
              >
                {t('traditions_tab_attire')}
              </button>
           </div>
        </div>

        {/* Ceremonies Content */}
        {activeTab === 'ceremonies' && (
          <div className="space-y-16 animate-fade-in-up">
            {customs.map((custom, index) => (
              <div 
                key={custom.id} 
                className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Image Section */}
                <div className="w-full md:w-1/2 relative group">
                  <div className="absolute inset-0 bg-wedding-gold/20 transform rotate-3 rounded-2xl transition-transform group-hover:rotate-6"></div>
                  <div className="relative overflow-hidden rounded-2xl shadow-xl aspect-video">
                    <img 
                      src={custom.imageUrl} 
                      alt={custom.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden flex flex-col justify-end p-6">
                      <span className="text-wedding-gold font-bold text-xs uppercase tracking-widest mb-1">
                        {custom.marathiTitle}
                      </span>
                      <h3 className="text-white font-serif text-3xl leading-none">{custom.title}</h3>
                    </div>
                  </div>
                </div>

                {/* Text Content */}
                <div className="w-full md:w-1/2 space-y-6">
                  <div className="hidden md:block">
                    <span className="text-wedding-marigold font-bold text-xs uppercase tracking-widest mb-1 block">
                      {custom.marathiTitle}
                    </span>
                    <h2 className="text-4xl font-serif text-wedding-charcoal mb-4">{custom.title}</h2>
                    <div className="w-16 h-1 bg-wedding-rani mb-6"></div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border-l-4 border-wedding-gold shadow-sm">
                    <div className="flex items-start gap-3 mb-2">
                        <Info className="text-wedding-gold mt-1 flex-shrink-0" size={20} />
                        <div>
                          <h4 className="font-bold text-wedding-charcoal text-sm uppercase tracking-wide mb-1">{t('traditions_significance')}</h4>
                          <p className="text-gray-600 font-light leading-relaxed">{custom.significance}</p>
                        </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-white/90 backdrop-blur-sm p-5 rounded-xl border border-wedding-gold/30 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-2 mb-3">
                              <div className="bg-wedding-gold/20 p-2 rounded-full">
                                  <Shirt className="text-wedding-marigold" size={18} />
                              </div>
                              <h4 className="font-bold text-wedding-charcoal text-sm uppercase">{t('traditions_wear')}</h4>
                          </div>
                          <p className="text-gray-600 text-sm font-light leading-relaxed">{custom.whatToWear}</p>
                          <button onClick={() => setActiveTab('attire')} className="text-xs text-wedding-rani underline mt-2 font-bold uppercase tracking-wider">{t('traditions_see_examples')}</button>
                      </div>

                      <div className="bg-white/90 backdrop-blur-sm p-5 rounded-xl border border-wedding-gold/30 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-2 mb-3">
                              <div className="bg-wedding-gold/20 p-2 rounded-full">
                                  <Sparkles className="text-wedding-marigold" size={18} />
                              </div>
                              <h4 className="font-bold text-wedding-charcoal text-sm uppercase">{t('traditions_expect')}</h4>
                          </div>
                          <p className="text-gray-600 text-sm font-light leading-relaxed">{custom.whatToExpect}</p>
                      </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Attire Guide Content */}
        {activeTab === 'attire' && (
          <div className="animate-fade-in-up space-y-24">
            
            {/* 1. Dress Code by Event */}
            <section>
                <div className="text-center mb-12">
                    <h2 className="font-serif text-4xl text-wedding-charcoal mb-4">{t('attire_by_event_title')}</h2>
                    <p className="text-gray-600 font-light max-w-2xl mx-auto">{t('attire_by_event_desc')}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {dressCodes.map((event) => {
                      const emojis = getEventEmojis(event.id);
                      return (
                        <div key={event.id} className="bg-white/90 backdrop-blur p-8 rounded-2xl border border-wedding-gold/20 shadow-lg relative overflow-hidden transition-transform hover:-translate-y-1 duration-300">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-wedding-gold/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                            
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-serif text-2xl text-wedding-charcoal font-bold">{event.title}</h3>
                                        <p className="text-wedding-rani text-xs font-bold uppercase tracking-widest">{event.theme}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        {event.colorPalette.map(color => (
                                            <div key={color} className="w-6 h-6 rounded-full border border-gray-100 shadow-sm ring-1 ring-white" style={{backgroundColor: color}} title={color}></div>
                                        ))}
                                    </div>
                                </div>
                                
                                <p className="text-gray-600 text-sm mb-6 font-light italic border-b border-gray-100 pb-4">
                                    {event.description}
                                </p>
                                
                                <div className={event.options.men ? "grid grid-cols-1 sm:grid-cols-2 gap-6" : "grid grid-cols-1 gap-6"}>
                                    <div>
                                        <h4 className="font-bold text-wedding-charcoal text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
                                            <span className="text-xl">{emojis.women}</span> {t('attire_women')}
                                        </h4>
                                        <p className="text-sm text-gray-600 font-light leading-relaxed">{event.options.women}</p>
                                    </div>
                                    {event.options.men && (
                                    <div>
                                        <h4 className="font-bold text-wedding-charcoal text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
                                            <span className="text-xl">{emojis.men}</span> {t('attire_men')}
                                        </h4>
                                        <p className="text-sm text-gray-600 font-light leading-relaxed">{event.options.men}</p>
                                    </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                  })}
                </div>
            </section>

            {/* 2. Glossary */}
            <section>
                 <div className="text-center mb-12">
                    <h2 className="font-serif text-4xl text-wedding-charcoal mb-4">{t('attire_glossary_title')}</h2>
                    <p className="text-gray-600 font-light max-w-2xl mx-auto">{t('attire_glossary_desc')}</p>
                </div>
                
                {/* Women's Attire */}
                <div className="mb-16">
                    <h3 className="font-serif text-2xl text-wedding-charcoal mb-6 flex items-center gap-2 px-4 md:px-0">
                        <span className="text-3xl">👩</span> {t('attire_women')}
                    </h3>
                    {renderAttireList(womenAttire)}
                </div>

                {/* Men's Attire */}
                <div>
                     <h3 className="font-serif text-2xl text-wedding-charcoal mb-6 flex items-center gap-2 px-4 md:px-0">
                        <span className="text-3xl">👨</span> {t('attire_men')}
                    </h3>
                    {renderAttireList(menAttire)}
                </div>
            </section>

            {/* 3. Shopping Section */}
            <div className="mt-20">
               <div className="text-center mb-12">
                  <h3 className="font-serif text-4xl text-wedding-charcoal mb-4">{t('traditions_shop_title')}</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto font-light">
                    {t('traditions_shop_desc')}
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {/* Online Section */}
                  <div className="bg-white/80 backdrop-blur p-8 rounded-2xl border border-wedding-gold/30 shadow-lg relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-wedding-rani/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                      
                      <div className="flex items-center gap-4 mb-8 relative z-10">
                          <div className="bg-white p-3 rounded-full shadow-md">
                             <Globe className="text-wedding-rani" size={24} />
                          </div>
                          <div>
                            <h4 className="font-serif text-2xl text-wedding-charcoal">Order Online</h4>
                            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Ship to Home</p>
                          </div>
                      </div>
                      
                      <div className="space-y-8 relative z-10">
                          <div className="flex flex-col">
                             <a href="https://www.lashkaraa.com/" target="_blank" rel="noopener noreferrer" className="font-bold text-wedding-charcoal text-lg hover:text-wedding-rani transition-colors inline-flex items-center gap-2">
                                Lashkaraa
                             </a>
                             <p className="text-sm text-gray-600 font-light mt-1">Trendy, high-quality, and approachable Indian wear designed specifically for international customers. Reliable shipping and great prices.</p>
                          </div>
                          <div className="w-full h-px bg-wedding-gold/20"></div>
                          <div className="flex flex-col">
                             <a href="https://www.manyavar.com/" target="_blank" rel="noopener noreferrer" className="font-bold text-wedding-charcoal text-lg hover:text-wedding-rani transition-colors inline-flex items-center gap-2">
                                Manyavar & Mohey
                             </a>
                             <p className="text-sm text-gray-600 font-light mt-1">The most trusted brand for men's traditional wear (Kurtas & Sherwanis). Their sizing is standard and fits well.</p>
                          </div>
                      </div>
                  </div>

                  {/* Mumbai Section */}
                  <div className="bg-white/80 backdrop-blur p-8 rounded-2xl border border-wedding-gold/30 shadow-lg relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-wedding-marigold/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>

                      <div className="flex items-center gap-4 mb-8 relative z-10">
                          <div className="bg-white p-3 rounded-full shadow-md">
                             <MapPin className="text-wedding-marigold" size={24} />
                          </div>
                          <div>
                            <h4 className="font-serif text-2xl text-wedding-charcoal">Visit in Mumbai</h4>
                            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Try & Buy / Rent</p>
                          </div>
                      </div>
                      
                      <div className="space-y-8 relative z-10">
                          <div className="flex flex-col">
                             <div className="flex justify-between items-start">
                                <span className="font-bold text-wedding-charcoal text-lg">Kalki Fashion</span>
                                <span className="bg-wedding-green text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">Buy</span>
                             </div>
                             <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Santacruz West</span>
                             <p className="text-sm text-gray-600 font-light">A massive multi-story boutique. The best place to try on different styles of Lehengas and Sarees at mid-to-high price points.</p>
                          </div>
                          <div className="w-full h-px bg-wedding-gold/20"></div>
                          <div className="flex flex-col">
                             <div className="flex justify-between items-start">
                                <span className="font-bold text-wedding-charcoal text-lg">Flyrobe</span>
                                <span className="bg-wedding-rani text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">Rent</span>
                             </div>
                             <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Santacruz West</span>
                             <p className="text-sm text-gray-600 font-light">Why buy an outfit you'll wear once? Visit their store to try on premium designer outfits and rent them for a fraction of the cost.</p>
                          </div>
                      </div>
                  </div>
               </div>
            </div>
          </div>
        )}
        
        {/* Footer Note */}
        <div className="mt-20 text-center bg-white/50 backdrop-blur-md p-8 rounded-2xl border border-wedding-rani/20">
           <h3 className="font-serif text-2xl text-wedding-charcoal mb-2">{language === 'en' ? 'Still have questions?' : '¿Tienes preguntas?'}</h3>
           <p className="text-gray-600 font-light mb-0">
             {language === 'en' ? "Don't worry about getting everything perfect. The most important thing is your presence!" : "No te preocupes por que todo sea perfecto. ¡Lo más importante es tu presencia!"}
           </p>
        </div>

      </div>
    </div>
  );
};

export default Traditions;