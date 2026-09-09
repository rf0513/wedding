import React, { useState } from 'react';
import { REGISTRY_ITEMS_EN, REGISTRY_ITEMS_ES } from '../constants';
import { ExternalLink, Gift, Copy, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Registry: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const { language, t } = useLanguage();
  
  const registryItems = language === 'en' ? REGISTRY_ITEMS_EN : REGISTRY_ITEMS_ES;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-wedding-pattern relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-wedding-marigold/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-wedding-rani/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
           <div className="inline-block p-4 rounded-full bg-wedding-gold/20 mb-4 backdrop-blur-sm">
             <Gift className="text-wedding-rani" size={40} />
           </div>
          <h1 className="font-serif text-6xl text-wedding-charcoal mb-6">{t('registry_title')}</h1>
          <p className="text-gray-600 font-light max-w-lg mx-auto leading-relaxed">
            {t('registry_desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
          {registryItems.map((item) => (
            <div 
              key={item.id}
              className="group block bg-white shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 rounded-xl overflow-hidden border border-gray-100 flex flex-col h-full"
            >
              <div className="relative overflow-hidden aspect-[4/3] flex-shrink-0">
                <img 
                  src={item.imageUrl} 
                  alt={item.store} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay only for links that are not BTC */}
                {item.id !== 'btc' && (
                    <div className="absolute inset-0 bg-wedding-rani/0 group-hover:bg-wedding-rani/40 transition-colors flex items-center justify-center pointer-events-none">
                      <ExternalLink className="text-white opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300" size={32} />
                    </div>
                )}
              </div>
              
              <div className="p-8 text-center bg-white relative flex-grow flex flex-col justify-between">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-wedding-gold text-white rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                   <Gift size={20} />
                </div>
                
                <div>
                    <h3 className="font-serif text-2xl text-wedding-charcoal mb-2 group-hover:text-wedding-rani transition-colors mt-2">{item.store}</h3>
                    <p className="text-sm text-gray-500 font-light mb-6">{item.description}</p>
                </div>

                {item.id === 'btc' ? (
                  <div className="mt-4">
                    <div className="bg-gray-100 p-3 rounded-lg text-xs break-all font-mono text-gray-600 border border-gray-200 mb-3 select-all">
                        {item.link}
                    </div>
                    <button 
                        onClick={() => handleCopy(item.link, item.id)}
                        className={`w-full py-3 px-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                            copied === item.id 
                            ? 'bg-wedding-green text-white' 
                            : 'bg-wedding-charcoal text-white hover:bg-black'
                        }`}
                    >
                        {copied === item.id ? (
                            <>{t('registry_copied')} <Check size={14} /></>
                        ) : (
                            <>{t('registry_copy')} <Copy size={14} /></>
                        )}
                    </button>
                  </div>
                ) : (
                  <a 
                    href={item.link}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full inline-block mt-4 py-3 px-4 rounded-full text-xs font-bold uppercase tracking-widest bg-wedding-rani text-white hover:bg-pink-700 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                  >
                    {t('registry_donate')} <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Registry;