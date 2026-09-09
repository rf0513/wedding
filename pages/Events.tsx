import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { EVENTS_EN, EVENTS_ES } from '../constants';
import { MapPin, Clock, Music, Heart, Utensils, Bed, Navigation, Bus, ChevronRight, Palette, Shirt } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Events: React.FC = () => {
  const [activeLocationId, setActiveLocationId] = useState<string>('hotel');
  const { language, t } = useLanguage();
  
  const events = language === 'en' ? EVENTS_EN : EVENTS_ES;

  const getIcon = (name: string) => {
      switch(name) {
          case 'dance': return <Music size={40} className="text-wedding-rani" />;
          case 'art': return <Palette size={40} className="text-wedding-marigold" />;
          case 'ring': return <Heart size={40} className="text-wedding-green" />;
          default: return <Clock size={40} className="text-wedding-gold" />;
      }
  }

  const HOTEL_QUERY = "Taj The Trees, Vikhroli, Mumbai";

  // Combine Hotel and Events into a single list for the map controller
  const MAP_LOCATIONS = [
    {
      id: 'hotel',
      title: 'Taj The Trees',
      subtitle: 'Recommended Hotel',
      address: 'Vikhroli, Mumbai',
      query: HOTEL_QUERY,
      type: 'stay',
      color: 'bg-wedding-charcoal'
    },
    ...events.map((event, index) => ({
      id: event.id,
      title: event.location,
      subtitle: event.title,
      address: event.address,
      query: `${event.location}, ${event.address}`,
      type: 'event',
      color: index === 0 ? 'bg-wedding-marigold' : index === 1 ? 'bg-wedding-rani' : 'bg-wedding-green'
    }))
  ];

  const activeLocation = MAP_LOCATIONS.find(loc => loc.id === activeLocationId) || MAP_LOCATIONS[0];

  const getMapSrc = (location: typeof MAP_LOCATIONS[0]) => {
      const baseUrl = "https://maps.google.com/maps";
      
      if (location.type === 'stay') {
          // iwloc=near hides the info window for a cleaner look
          return `${baseUrl}?q=${encodeURIComponent(location.query)}&t=m&z=15&ie=UTF8&iwloc=near&output=embed`;
      } else {
          // Show directions from Hotel to Event
          // dirflg=d forces Driving mode
          // Omit z to allow auto-zoom for the route
          return `${baseUrl}?saddr=${encodeURIComponent(HOTEL_QUERY)}&daddr=${encodeURIComponent(location.query)}&dirflg=d&t=m&ie=UTF8&iwloc=near&output=embed`;
      }
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-wedding-pattern relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-wedding-marigold/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-wedding-rani/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <p className="text-wedding-rani text-sm tracking-widest uppercase mb-2 font-bold">{t('events_subtitle')}</p>
          <h1 className="font-serif text-5xl md:text-6xl text-wedding-charcoal mb-6">{t('events_title')}</h1>
          <p className="text-gray-600 font-light max-w-lg mx-auto">
            {t('events_desc')}
          </p>
        </div>

        <div className="space-y-8 mb-20">
          {events.map((event, index) => (
            <div 
              key={event.id}
              className="bg-white/90 backdrop-blur-sm p-6 md:p-10 rounded-xl shadow-md border-l-8 border-wedding-rani flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
            >
              {/* Date/Time Column - Swapped: Date is now big, Time is small */}
              <div className="flex-shrink-0 w-full md:w-32 text-center md:text-right border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0 md:pr-6 flex flex-row md:flex-col justify-between md:justify-start items-center md:items-end">
                 <div>
                    <span className="block font-serif text-3xl text-wedding-marigold mb-1 font-bold group-hover:text-wedding-rani transition-colors">{event.date}</span>
                    <span className="text-xs uppercase tracking-wider text-gray-400 font-bold block">{event.time}</span>
                 </div>
                 <div className="lg:hidden bg-wedding-cream p-3 rounded-full">
                     {getIcon(event.iconName)}
                 </div>
              </div>

              {/* Details Column */}
              <div className="flex-grow w-full">
                <h3 className="font-serif text-2xl md:text-3xl text-wedding-charcoal mb-2">{event.title}</h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-gray-500 mb-4 font-medium">
                  <div className="flex items-center gap-1 text-wedding-green">
                    <MapPin size={18} />
                    {event.location}
                  </div>
                  <div className="hidden sm:block text-gray-300">•</div>
                  <div className="flex items-center gap-1">
                     <span className="italic">{event.address}</span>
                  </div>
                </div>

                {event.shuttleTime && (
                  <div className="inline-flex items-center gap-2 text-sm font-bold text-wedding-charcoal mb-4 bg-wedding-gold/20 px-3 py-2 rounded-lg border border-wedding-gold/40 w-full md:w-auto justify-center md:justify-start">
                    <Bus size={16} className="text-wedding-charcoal" />
                    <span>{t('events_shuttle')} {event.shuttleTime}</span>
                  </div>
                )}

                <p className="text-gray-600 leading-relaxed mb-4">
                  {event.description}
                </p>

                {event.dressCode && (
                  <div className="inline-block bg-wedding-cream/50 rounded-lg p-3 border border-wedding-gold/20">
                    <div className="flex items-start gap-2">
                        <Shirt size={16} className="text-wedding-rani mt-0.5" />
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm">
                            <span className="font-bold text-gray-500 uppercase tracking-wide text-xs">{t('event_dress_code_label')}:</span>
                            <Link 
                                to="/traditions?tab=attire" 
                                className="font-bold text-wedding-rani hover:text-wedding-charcoal transition-colors border-b border-wedding-rani/30 hover:border-wedding-charcoal pb-0.5"
                            >
                                {event.dressCode}
                            </Link>
                        </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Icon Desktop */}
              <div className="hidden lg:block bg-wedding-cream p-4 rounded-full group-hover:bg-wedding-gold/20 transition-colors">
                 {getIcon(event.iconName)}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Map Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-wedding-gold/20 animate-fade-in-up">
            <div className="bg-wedding-charcoal p-6 text-white text-center">
                <h3 className="font-serif text-2xl md:text-3xl text-wedding-gold">{t('events_map_title')}</h3>
                <p className="text-xs text-gray-400 uppercase tracking-widest mt-2">
                   {t('events_map_subtitle')}
                </p>
            </div>
            
            <div className="flex flex-col md:flex-row h-[85vh] md:h-[500px]">
                {/* Location List (Controller) */}
                <div className="w-full md:w-1/3 h-[50%] md:h-full bg-white p-2 md:p-4 overflow-y-auto space-y-2 shadow-inner relative z-10 border-r border-gray-100">
                     {MAP_LOCATIONS.map((loc) => (
                        <button
                            key={loc.id}
                            onClick={() => setActiveLocationId(loc.id)}
                            className={`w-full text-left p-4 rounded-lg border transition-all duration-300 group ${
                                activeLocationId === loc.id 
                                ? 'bg-wedding-cream border-wedding-rani shadow-md transform scale-[1.01]' 
                                : 'bg-white border-transparent hover:bg-gray-50 hover:border-gray-200'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 md:w-6 md:h-6 rounded-full flex items-center justify-center text-white text-[12px] md:text-[10px] font-bold flex-shrink-0 transition-transform ${loc.color} ${activeLocationId === loc.id ? 'scale-110' : ''}`}>
                                    {loc.type === 'stay' ? <Bed size={14} /> : <MapPin size={14} />}
                                </div>
                                <div className="flex-grow">
                                    <h4 className={`font-bold text-base md:text-sm ${activeLocationId === loc.id ? 'text-wedding-rani' : 'text-wedding-charcoal'}`}>
                                        {loc.title}
                                    </h4>
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">{loc.subtitle}</p>
                                    <p className="text-[10px] text-gray-400 leading-tight hidden md:block">{loc.address}</p>
                                    
                                    {activeLocationId === loc.id && (
                                        <div className="mt-2 flex items-center gap-1 text-[10px] text-wedding-rani font-bold uppercase tracking-widest animate-pulse">
                                            {loc.type === 'stay' ? <MapPin size={10} /> : <Navigation size={10} />}
                                            {loc.type === 'stay' ? t('events_viewing') : t('events_driving')}
                                        </div>
                                    )}
                                </div>
                                <ChevronRight 
                                    size={16} 
                                    className={`transition-all duration-300 ${activeLocationId === loc.id ? 'text-wedding-rani translate-x-1' : 'text-gray-300 group-hover:text-gray-400'}`} 
                                />
                            </div>
                        </button>
                     ))}
                </div>

                {/* Styled Map Embed */}
                <div className="w-full md:w-2/3 h-[50%] md:h-full relative bg-wedding-cream">
                    {/* The Map Iframe - Dynamically switching between Place view and Directions view */}
                    <iframe 
                        key={activeLocation.id} // Key forces re-render/reload when location changes
                        src={getMapSrc(activeLocation)}
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen={true} 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`Map showing ${activeLocation.title}`}
                        className="transition-opacity duration-500"
                    ></iframe>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Events;