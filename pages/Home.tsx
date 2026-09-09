import React from 'react';
import { Link } from 'react-router-dom';
import { WEDDING_DATA } from '../constants';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Home: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[100dvh] min-h-[600px] flex items-end justify-center text-center px-4 pb-24 md:pb-32 overflow-hidden">
        {/* Background Image - No Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://github.com/rf0513/pavitra-and-ramon-wedding/blob/main/engagement-hug.jpg?raw=true" 
            alt="Pavitra and Ramon" 
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Content with Drop Shadow for Contrast */}
        <div className="relative z-10 text-white animate-fade-in-up drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] w-full max-w-5xl mx-auto">
          <p className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase mb-1 text-wedding-gold font-bold">
            {t('home_hero_subtitle')}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl mb-3 leading-none">
            {WEDDING_DATA.couple.partner1} <br className="md:hidden" /> 
            <span className="hidden md:inline text-wedding-gold italic text-2xl md:text-4xl mx-3">&</span>
            <span className="md:hidden text-wedding-gold italic text-2xl my-1 block">&</span>
            {/* Display inline on desktop to save vertical space, stacked on mobile */}
            {WEDDING_DATA.couple.partner2}
          </h1>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 font-sans text-sm md:text-base tracking-wide font-medium">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-wedding-gold" />
              <span>{WEDDING_DATA.date}</span>
            </div>
            <div className="hidden md:block w-px h-6 bg-wedding-gold shadow-sm"></div>
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-wedding-gold" />
              <span>{WEDDING_DATA.location.city}</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center w-full px-6 sm:px-0">
            <Link 
              to="/rsvp" 
              className="w-full sm:w-auto inline-block bg-wedding-rani hover:bg-pink-700 text-white font-sans uppercase tracking-widest text-xs py-4 sm:py-3 px-10 rounded-full transition-all duration-300 hover:tracking-[0.2em] shadow-lg border-2 border-transparent hover:border-wedding-gold text-center"
            >
              {t('nav_rsvp')}
            </Link>
            <Link 
              to="/schedule" 
              className="w-full sm:w-auto inline-block bg-transparent hover:bg-white/10 text-white font-sans uppercase tracking-widest text-xs py-4 sm:py-3 px-10 rounded-full transition-all duration-300 shadow-sm border-2 border-white hover:border-wedding-gold backdrop-blur-[2px] text-center"
            >
              {t('home_view_events')}
            </Link>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce text-white/90 drop-shadow-md">
          <span className="block text-[10px] uppercase tracking-widest mb-1 text-wedding-gold">{t('home_scroll')}</span>
          <div className="w-px h-8 bg-wedding-gold mx-auto"></div>
        </div>
      </div>

      {/* Intro / Quote Section */}
      <section className="py-20 md:py-24 px-6 bg-wedding-cream relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-wedding-marigold/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-wedding-rani/10 rounded-full blur-3xl translate-x-1/4 translate-y-1/4"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="font-serif text-3xl md:text-5xl text-wedding-charcoal mb-8 leading-snug">
            {t('home_quote')}
          </h2>
          <p className="font-sans text-wedding-rani uppercase tracking-widest text-xs font-bold mb-8">
             A.A. Milne
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-wedding-rani to-wedding-marigold mx-auto mb-8"></div>
          
          <div className="mt-8">
             <Link to="/story" className="text-wedding-rani font-bold uppercase tracking-widest text-xs hover:text-wedding-marigold transition-colors inline-flex items-center gap-2 border-b-2 border-wedding-rani pb-1 p-2">
               {t('home_read_story')} <ArrowRight size={16} />
             </Link>
          </div>
        </div>
      </section>

      {/* Guides Grid Section */}
      <section className="flex flex-col md:flex-row w-full">
         {/* Ceremonies & Attire */}
         <div className="w-full md:w-1/2 h-72 md:h-[600px] relative group overflow-hidden border-b md:border-b-0 md:border-r border-white/20">
             <img 
                src="https://images.unsplash.com/photo-1597157639073-69284dc0fdaf?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Traditions" 
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" 
             />
             <Link to="/traditions" className="absolute inset-0 bg-wedding-green/80 opacity-0 group-hover:opacity-90 transition-opacity flex items-center justify-center">
                <span className="text-white font-serif text-3xl md:text-4xl tracking-wide border-2 border-white px-6 py-3 md:px-8 md:py-4">{t('home_guide_ceremonies')}</span>
             </Link>
             <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/80 to-transparent w-full md:hidden">
                <span className="text-white font-serif text-2xl drop-shadow-md">{t('home_guide_ceremonies')}</span>
             </div>
         </div>

         {/* Travel Guide */}
         <div className="w-full md:w-1/2 h-72 md:h-[600px] relative group overflow-hidden">
             <img 
                src="https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=800&auto=format&fit=crop" 
                alt="Gateway of India" 
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" 
             />
             <Link to="/travel" className="absolute inset-0 bg-wedding-marigold/80 opacity-0 group-hover:opacity-90 transition-opacity flex items-center justify-center">
                <span className="text-white font-serif text-3xl md:text-4xl tracking-wide border-2 border-white px-6 py-3 md:px-8 md:py-4">{t('home_guide_travel')}</span>
             </Link>
             <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/80 to-transparent w-full md:hidden">
                <span className="text-white font-serif text-2xl drop-shadow-md">{t('home_guide_travel')}</span>
             </div>
         </div>
      </section>
    </div>
  );
};

export default Home;