import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Story: React.FC = () => {
  const { language, t } = useLanguage();

  const eventsEn = [
    {
      date: 'Feb 2022',
      title: 'Metamates',
      desc: 'Pavi and Ramon met at work in Albuquerque, as simple co-workers who quickly became inseparable.',
      img: 'https://github.com/rf0513/pavitra-and-ramon-wedding/blob/main/tram.jpeg?raw=true',
      color: 'bg-wedding-rani',
      align: 'left'
    },
    {
      date: 'May 2022',
      title: 'Rocky Mountains',
      desc: 'They began dating after a spontanous trip to Rocky Mountains National Park in Colorado over Memorial Day.',
      img: 'https://github.com/rf0513/pavitra-and-ramon-wedding/blob/main/rockies.jpeg?raw=true',
      color: 'bg-wedding-green',
      align: 'right'
    },
    {
      date: 'Dec 2023',
      title: 'Bay Area',
      desc: 'Pavi relocated for a new job, and Ramon was not very far behind to begin their California chapter.',
      img: 'https://github.com/rf0513/pavitra-and-ramon-wedding/blob/main/mackinac.jpeg?raw=true',
      color: 'bg-wedding-green',
      align: 'left'
    },
    {
      date: 'Oct 12, 2025',
      title: 'The Proposal',
      desc: "Sunset at Slacker's Hill. The Golden Gate Bridge, the San Francisco city skyline, and the hidden photographer as our witnesses.",
      img: 'https://github.com/rf0513/pavitra-and-ramon-wedding/blob/main/proposal.jpg?raw=true',
      color: 'bg-wedding-rani',
      align: 'right'
    }
  ];

  const eventsEs = [
    {
      date: 'Feb 2022',
      title: 'Metamates',
      desc: 'Pavi y Ramon se conocieron en el trabajo en Albuquerque, como simples compañeros de trabajo que rápidamente se volvieron inseparables.',
      img: 'https://github.com/rf0513/pavitra-and-ramon-wedding/blob/main/tram.jpeg?raw=true',
      color: 'bg-wedding-rani',
      align: 'left'
    },
    {
      date: 'May 2022',
      title: 'Montañas Rocosas',
      desc: 'Comenzaron a salir después de un viaje espontáneo al Parque Nacional de las Montañas Rocosas en Colorado durante el Día de los Caídos.',
      img: 'https://github.com/rf0513/pavitra-and-ramon-wedding/blob/main/rockies.jpeg?raw=true',
      color: 'bg-wedding-green',
      align: 'right'
    },
    {
      date: 'Dec 2023',
      title: 'Área de la Bahía',
      desc: 'Pavi se mudó por un nuevo trabajo, y Ramón no se quedó muy atrás para comenzar su capítulo en California.',
      img: 'https://github.com/rf0513/pavitra-and-ramon-wedding/blob/main/mackinac.jpeg?raw=true',
      color: 'bg-wedding-green',
      align: 'left'
    },
    {
      date: 'Oct 12, 2025',
      title: 'La Propuesta',
      desc: "Atardecer en Slacker's Hill. El puente Golden Gate, el horizonte de la ciudad de San Francisco y el fotógrafo oculto como nuestros testigos.",
      img: 'https://github.com/rf0513/pavitra-and-ramon-wedding/blob/main/proposal.jpg?raw=true',
      color: 'bg-wedding-rani',
      align: 'right'
    }
  ];

  const events = language === 'en' ? eventsEn : eventsEs;

  return (
    <div className="min-h-screen bg-wedding-pattern pt-24 pb-20 overflow-hidden relative">
      
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-wedding-marigold/15 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-wedding-rani/15 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24 animate-fade-in-up">
           <p className="text-wedding-rani text-sm tracking-widest uppercase mb-2 font-bold">{language === 'en' ? 'How We Met' : 'Cómo Nos Conocimos'}</p>
           <h1 className="font-serif text-6xl text-wedding-charcoal mb-12">{language === 'en' ? 'Our Journey' : 'Nuestro Viaje'}</h1>
           
           {/* Big Picture */}
           <div className="relative rounded-xl overflow-hidden shadow-xl border-4 border-white mx-auto max-w-4xl">
             <img 
               src="https://lh3.googleusercontent.com/pw/AP1GczO1xDfNPI3ZJkGHdniIfQKvv9U2hBSBAwRjD-UdjmTpXE3SEsZnammzDWAutk-kbAJ0LK-1tpDHGVloUvvu50pd7gcqAzuMgRpqYtlgfWVVQsYzRgN2_nP1WvdfZCjhKwRixb2bXITrTqZ8hJv0K6rLJA=w1307-h872-s-no-gm?authuser=0" 
               alt="Pavitra and Ramon" 
               className="w-full h-auto object-cover"
             />
           </div>
        </div>

        {/* Timeline */}
        <div className="relative animate-fade-in-up max-w-6xl mx-auto">
            {/* Center Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-wedding-gold -translate-x-1/2 origin-top"></div>

            {events.map((event, idx) => (
                <div key={idx} className="relative mb-16 md:mb-24 last:mb-0">
                    {/* Dot */}
                    <div className={`absolute left-4 md:left-1/2 -translate-x-1/2 top-0 md:top-6 w-4 h-4 rounded-full ring-4 ring-wedding-cream z-20 shadow-sm ${event.color}`}></div>

                    {/* Content Wrapper */}
                    <div className={`
                        relative ml-12 md:ml-0 
                        md:w-1/2 
                        ${event.align === 'left' ? 'md:pr-16 md:mr-auto md:text-right' : 'md:pl-16 md:ml-auto md:text-left'}
                    `}>
                        {/* Date Badge */}
                        <span className="inline-block bg-white text-wedding-marigold font-bold text-sm uppercase tracking-widest px-3 py-1 rounded shadow-sm mb-4 border border-wedding-gold/20">
                            {event.date}
                        </span>

                        {/* Card */}
                        <div className={`
                            bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white hover:shadow-xl transition-shadow
                            flex flex-col gap-6
                            ${event.align === 'left' ? 'md:flex-row-reverse' : 'md:flex-row'}
                            items-center
                        `}>
                            {/* Image - Fixed cropping issue by using h-auto and removing object-cover */}
                            <img 
                                src={event.img} 
                                alt={event.title} 
                                className="w-full md:w-48 h-auto rounded-xl shadow-md flex-shrink-0 bg-white border border-gray-100"
                            />
                            
                            {/* Text */}
                            <div className="flex-grow text-left">
                                <h3 className={`font-serif text-2xl md:text-3xl text-wedding-charcoal mb-2 ${event.align === 'left' ? 'md:text-right' : ''}`}>{event.title}</h3>
                                <p className={`text-gray-600 font-light leading-relaxed ${event.align === 'left' ? 'md:text-right' : ''}`}>{event.desc}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

      </div>
    </div>
  );
};

export default Story;