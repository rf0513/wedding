import React, { useState } from 'react';
import { Map, Sun, ShoppingBag, Coffee, AlertTriangle, Droplets, Car, Utensils, Camera, Landmark, Wine, CreditCard, ExternalLink, Plane, Bed, Navigation, ArrowRight, MapPin, ChevronRight, Mountain, Smartphone, Youtube } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Travel: React.FC = () => {
  const [activeLocationId, setActiveLocationId] = useState<string>('hotel');
  const { language, t } = useLanguage();

  const HOTEL_QUERY = "Taj The Trees, Vikhroli, Mumbai";

  const recommendationsEn = {
    sightseeing: [
      {
        id: 'gateway',
        title: "Gateway of India",
        desc: "Mumbai's most iconic monument. Built in 1924, it overlooks the Arabian Sea. Free public entry. We recommend visiting in the early morning or at sunset for the best photos without the intense heat.",
        img: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=800&auto=format&fit=crop",
        icon: <Landmark size={20} className="text-wedding-rani" />,
        query: "Gateway of India, Apollo Bandar, Colaba, Mumbai, Maharashtra 400001",
        category: 'Sightseeing',
        link: "https://www.tripadvisor.com/AttractionProductReview-g304554-d11487374-Private_Mumbai_Sightseeing_Tour_Traveller_s_Choice_Award_Winner-Mumbai_Maharashtra.html" 
      },
      {
        id: 'elephanta',
        title: "Elephanta Caves",
        desc: "A UNESCO World Heritage site featuring rock-cut Hindu caves dedicated to Lord Shiva. It requires a fun ferry ride from Gateway of India.",
        img: "https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?q=80&w=800&auto=format&fit=crop",
        icon: <Mountain size={20} className="text-wedding-rani" />,
        query: "Elephanta Caves, Gharapuri, Maharashtra 400094",
        category: 'Sightseeing',
        link: "https://www.tripadvisor.com/AttractionProductReview-g304554-d17800956-Elephanta_Caves_Island_Guided_Private_Tour-Mumbai_Maharashtra.html"
      },
      {
        id: 'siddhi',
        title: "Siddhivinayak Temple",
        desc: "Mumbai's most famous and affluent temple dedicated to Lord Ganesha. It is a spiritual power center. Pro-tip: Book a 'Special Darshan' pass online to skip the long queues.",
        img: "https://github.com/rf0513/pavitra-and-ramon-wedding/blob/main/siddhivinayak-temple-mumbai.jpg?raw=true",
        icon: <Sun size={20} className="text-wedding-rani" />,
        query: "Siddhivinayak Temple, SK Bole Marg, Prabhadevi, Mumbai, Maharashtra 400028",
        category: 'Sightseeing',
        link: "https://www.siddhivinayak.org/"
      },
      {
        id: 'csmvs',
        title: "CSMVS Museum",
        desc: "The Chhatrapati Shivaji Maharaj Vastu Sangrahalaya is a stunning Indo-Saracenic masterpiece. It is air-conditioned, peaceful, and houses incredible Indian art.",
        img: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxAVarqGSXmRhkIrXK7G0ZLunq9qAvw3Sf61owqcc_28NqpeEH3J2EnsYgMivA7-tc-UcjZOmg6HtVHjHsPWI5V8RXfuSSD6Bt7cpv5ZU2auU78rgyu54NU8mZSkxYyhCuh-2rU=s680-w680-h510-rw",
        icon: <Camera size={20} className="text-wedding-rani" />,
        query: "Chhatrapati Shivaji Maharaj Vastu Sangrahalaya, Mahatma Gandhi Road, Kala Ghoda, Fort, Mumbai, Maharashtra 400023",
        category: 'Sightseeing',
        link: "https://booking.csmvs.in/"
      }
    ],
    shopping: [
      {
        id: 'goodearth',
        title: "Good Earth (Colaba)",
        desc: "The pinnacle of Indian luxury design. Sustainable apparel, home décor, and dining. It is located in a beautiful heritage building. Zero bargaining required.",
        img: "https://djhiy8e1dslha.cloudfront.net/media/store_locator/MCG_2.jpg",
        icon: <ShoppingBag size={20} className="text-wedding-marigold" />,
        query: "Good Earth, Raghuvanshi Mills Compound, Senapati Bapat Marg, Lower Parel, Mumbai, Maharashtra 400013",
        category: 'Shopping',
        link: "https://www.goodearth.in/"
      },
      {
        id: 'jio',
        title: "Jio World Plaza",
        desc: "For those who prefer a world-class mall experience. It houses top international brands alongside premium Indian designers. Very comfortable and high-end.",
        img: "https://assets.gqindia.com/photos/6540d8942c253e02d52d3d1a/3:2/w_1620,h_1080,c_limit/Jio-World-Plaza-Everything-to-know-about-Indias-largest-luxury-mall-owned-by-Mukesh-Ambani.jpg",
        icon: <CreditCard size={20} className="text-wedding-marigold" />,
        query: "Jio World Plaza, G Block BKC, Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051",
        category: 'Shopping',
        link: "https://www.jioworldplaza.com/"
      },
      {
        id: 'colaba',
        title: "Colaba Causeway",
        desc: "The iconic street shopping experience. Located walking distance from Gateway of India, it is safe and vibrant. Buy cheap jewelry and shawls. Rule #1: Start bargaining at 50% of the asking price.",
        img: "https://www.theleela.com/prod/content/assets/aio-banner/dekstop/Colaba-Causeway.jpg?VersionId=2g.NeK1FW2Tc08yI6VZRFNWTX6EoGyfS",
        icon: <ShoppingBag size={20} className="text-wedding-marigold" />,
        query: "Colaba Causeway, Colaba, Mumbai, Maharashtra",
        category: 'Shopping',
        link: "https://www.youtube.com/watch?v=sLer0zRADaQ"
      }
    ],
    food: [
      {
        id: 'sealounge',
        title: "Sea Lounge at The Taj",
        desc: "Experience an old-world High Tea overlooking the harbor. Quiet, elegant, and historically significant.",
        icon: <Coffee size={20} className="text-wedding-green" />,
        link: "https://www.tajhotels.com/en-in/hotels/taj-mahal-palace-mumbai/restaurants/sea-lounge-mumbai",
        query: "Sea Lounge, The Taj Mahal Palace, Apollo Bandar, Colaba, Mumbai, Maharashtra 400001",
        category: 'Food'
      },
      {
        id: 'masque',
        title: "Masque",
        desc: "Consistently voted India's Best Restaurant. An ingredient-driven tasting menu of 10+ courses for foodies in a repurposed textile mill.",
        icon: <Utensils size={20} className="text-wedding-green" />,
        link: "https://www.masquerestaurant.com/",
        query: "Masque Restaurant, Shakti Mills Lane, Mahalakshmi, Mumbai, Maharashtra 400011",
        category: 'Food'
      },
      {
        id: 'avartana',
        title: "Avartana - ITC Maratha",
        desc: "Consistently ranked in Asia's 50 Best. Modernist Southern Indian tasting menu of 10+ courses for foodies. Sophisticated and artistic.",
        icon: <Wine size={20} className="text-wedding-green" />,
        link: "https://www.itchotels.com/in/en/itcmaratha-mumbai/fine-dine/avartana",
        query: "Avartana, ITC Maratha, Sahar Airport Road, Andheri East, Mumbai, Maharashtra 400099",
        category: 'Food'
      }
    ]
  };

  const recommendationsEs = {
    sightseeing: [
      {
        id: 'gateway',
        title: "Puerta de la India",
        desc: "El monumento más emblemático de Mumbai. Construido en 1924, domina el Mar Arábigo. Entrada pública gratuita. Recomendamos visitarlo temprano en la mañana o al atardecer para obtener las mejores fotos sin el intenso calor.",
        img: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=800&auto=format&fit=crop",
        icon: <Landmark size={20} className="text-wedding-rani" />,
        query: "Gateway of India, Apollo Bandar, Colaba, Mumbai, Maharashtra 400001",
        category: 'Sightseeing',
        link: "https://www.tripadvisor.com/AttractionProductReview-g304554-d11487374-Private_Mumbai_Sightseeing_Tour_Traveller_s_Choice_Award_Winner-Mumbai_Maharashtra.html"
      },
      {
        id: 'elephanta',
        title: "Cuevas de Elephanta",
        desc: "Un sitio del Patrimonio Mundial de la UNESCO con cuevas hindúes excavadas en la roca dedicadas a Lord Shiva. Requiere un divertido viaje en ferry desde la Puerta de la India.",
        img: "https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?q=80&w=800&auto=format&fit=crop",
        icon: <Mountain size={20} className="text-wedding-rani" />,
        query: "Elephanta Caves, Gharapuri, Maharashtra 400094",
        category: 'Sightseeing',
        link: "https://www.tripadvisor.com/AttractionProductReview-g304554-d17800956-Elephanta_Caves_Island_Guided_Private_Tour-Mumbai_Maharashtra.html"
      },
      {
        id: 'siddhi',
        title: "Templo Siddhivinayak",
        desc: "El templo más famoso de Mumbai dedicado a Lord Ganesha. Es un centro de poder espiritual. Consejo: Reserve un pase de 'Darshan Especial' en línea para evitar las largas filas.",
        img: "https://github.com/rf0513/pavitra-and-ramon-wedding/blob/main/siddhivinayak-temple-mumbai.jpg?raw=true",
        icon: <Sun size={20} className="text-wedding-rani" />,
        query: "Siddhivinayak Temple, SK Bole Marg, Prabhadevi, Mumbai, Maharashtra 400028",
        category: 'Sightseeing',
        link: "https://www.siddhivinayak.org/"
      },
      {
        id: 'csmvs',
        title: "Museo CSMVS",
        desc: "El Chhatrapati Shivaji Maharaj Vastu Sangrahalaya es una impresionante obra maestra indo-sarracena. Tiene aire acondicionado, es tranquilo y alberga increíble arte indio.",
        img: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxAVarqGSXmRhkIrXK7G0ZLunq9qAvw3Sf61owqcc_28NqpeEH3J2EnsYgMivA7-tc-UcjZOmg6HtVHjHsPWI5V8RXfuSSD6Bt7cpv5ZU2auU78rgyu54NU8mZSkxYyhCuh-2rU=s680-w680-h510-rw",
        icon: <Camera size={20} className="text-wedding-rani" />,
        query: "Chhatrapati Shivaji Maharaj Vastu Sangrahalaya, Mahatma Gandhi Road, Kala Ghoda, Fort, Mumbai, Maharashtra 400023",
        category: 'Sightseeing',
        link: "https://booking.csmvs.in/"
      }
    ],
    shopping: [
      {
        id: 'goodearth',
        title: "Good Earth (Colaba)",
        desc: "La cima del diseño de lujo indio. Ropa sostenible, decoración del hogar y cenas. Se encuentra en un hermoso edificio patrimonial. No se requiere regateo.",
        img: "https://djhiy8e1dslha.cloudfront.net/media/store_locator/MCG_2.jpg",
        icon: <ShoppingBag size={20} className="text-wedding-marigold" />,
        query: "Good Earth, Raghuvanshi Mills Compound, Senapati Bapat Marg, Lower Parel, Mumbai, Maharashtra 400013",
        category: 'Shopping',
        link: "https://www.goodearth.in/"
      },
      {
        id: 'jio',
        title: "Jio World Plaza",
        desc: "Para aquellos que prefieren una experiencia de centro comercial de clase mundial. Alberga las mejores marcas internacionales junto con diseñadores indios premium. Muy cómodo y de alta gama.",
        img: "https://assets.gqindia.com/photos/6540d8942c253e02d52d3d1a/3:2/w_1620,h_1080,c_limit/Jio-World-Plaza-Everything-to-know-about-Indias-largest-luxury-mall-owned-by-Mukesh-Ambani.jpg",
        icon: <CreditCard size={20} className="text-wedding-marigold" />,
        query: "Jio World Plaza, G Block BKC, Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051",
        category: 'Shopping',
        link: "https://www.jioworldplaza.com/"
      },
      {
        id: 'colaba',
        title: "Colaba Causeway",
        desc: "La icónica experiencia de compras callejeras. Ubicado a poca distancia de la Puerta de la India, es seguro y vibrante. Compre joyas y chales baratos. Regla #1: Comience a regatear al 50% del precio inicial.",
        img: "https://www.theleela.com/prod/content/assets/aio-banner/dekstop/Colaba-Causeway.jpg?VersionId=2g.NeK1FW2Tc08yI6VZRFNWTX6EoGyfS",
        icon: <ShoppingBag size={20} className="text-wedding-marigold" />,
        query: "Colaba Causeway, Colaba, Mumbai, Maharashtra",
        category: 'Shopping',
        link: "https://www.youtube.com/watch?v=sLer0zRADaQ"
      }
    ],
    food: [
      {
        id: 'sealounge',
        title: "Sea Lounge en The Taj",
        desc: "Experimente un té de la tarde (High Tea) con vistas al puerto. Tranquilo, elegante e históricamente significativo.",
        icon: <Coffee size={20} className="text-wedding-green" />,
        link: "https://www.tajhotels.com/en-in/hotels/taj-mahal-palace-mumbai/restaurants/sea-lounge-mumbai",
        query: "Sea Lounge, The Taj Mahal Palace, Apollo Bandar, Colaba, Mumbai, Maharashtra 400001",
        category: 'Food'
      },
      {
        id: 'masque',
        title: "Masque",
        desc: "Constantemente votado como el mejor restaurante de la India. Un menú de degustación de más de 10 platos impulsado por ingredientes locales en un molino textil renovado.",
        icon: <Utensils size={20} className="text-wedding-green" />,
        link: "https://www.masquerestaurant.com/",
        query: "Masque Restaurant, Shakti Mills Lane, Mahalakshmi, Mumbai, Maharashtra 400011",
        category: 'Food'
      },
      {
        id: 'avartana',
        title: "Avartana - ITC Maratha",
        desc: "Constantemente clasificado en los 50 mejores de Asia. Menú de degustación modernista del sur de la India. Sofisticado y artístico.",
        icon: <Wine size={20} className="text-wedding-green" />,
        link: "https://www.itchotels.com/in/en/itcmaratha-mumbai/fine-dine/avartana",
        query: "Avartana, ITC Maratha, Sahar Airport Road, Andheri East, Mumbai, Maharashtra 400099",
        category: 'Food'
      }
    ]
  };

  const recommendations = language === 'en' ? recommendationsEn : recommendationsEs;

  // Compile all locations for the map controller
  const MAP_LOCATIONS = [
    {
      id: 'hotel',
      title: 'Taj The Trees',
      subtitle: language === 'en' ? 'Our Recommended Hotel' : 'Hotel Recomendado',
      query: HOTEL_QUERY,
      type: 'stay',
      category: 'Hotel'
    },
    {
      id: 'airport',
      title: language === 'en' ? 'Mumbai Airport (BOM)' : 'Aeropuerto de Mumbai',
      subtitle: language === 'en' ? 'International Airport' : 'Aeropuerto Internacional',
      query: 'Chhatrapati Shivaji Maharaj International Airport',
      type: 'transit',
      category: language === 'en' ? 'Transit' : 'Tránsito'
    },
    ...recommendations.sightseeing.map(item => ({ ...item, type: 'visit', subtitle: language === 'en' ? 'Sightseeing' : 'Turismo' })),
    ...recommendations.shopping.map(item => ({ ...item, type: 'shop', subtitle: language === 'en' ? 'Shopping' : 'Compras' })),
    ...recommendations.food.map(item => ({ ...item, type: 'eat', subtitle: language === 'en' ? 'Dining' : 'Cena' }))
  ];

  const activeLocation = MAP_LOCATIONS.find(loc => loc.id === activeLocationId) || MAP_LOCATIONS[0];

  const getMapSrc = (location: typeof MAP_LOCATIONS[0]) => {
      const baseUrl = "https://maps.google.com/maps";
      
      if (location.id === 'hotel') {
          // Just show the hotel pin
          return `${baseUrl}?q=${encodeURIComponent(location.query)}&t=m&z=15&ie=UTF8&iwloc=near&output=embed`;
      } else {
          // Show directions from Hotel to Location
          // dirflg=d forces Driving mode
          return `${baseUrl}?saddr=${encodeURIComponent(HOTEL_QUERY)}&daddr=${encodeURIComponent(location.query)}&dirflg=d&t=m&ie=UTF8&iwloc=near&output=embed`;
      }
  }

  const getCategoryIcon = (type: string) => {
    switch(type) {
        case 'stay': return <Bed size={12} />;
        case 'transit': return <Plane size={12} />;
        case 'visit': return <Camera size={12} />;
        case 'shop': return <ShoppingBag size={12} />;
        case 'eat': return <Utensils size={12} />;
        default: return <MapPin size={12} />;
    }
  }

  const getCategoryColor = (type: string) => {
    switch(type) {
        case 'stay': return 'bg-wedding-charcoal';
        case 'transit': return 'bg-blue-600';
        case 'visit': return 'bg-wedding-rani';
        case 'shop': return 'bg-wedding-marigold';
        case 'eat': return 'bg-wedding-green';
        default: return 'bg-gray-400';
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-wedding-pattern relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-wedding-marigold/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-wedding-green/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <p className="text-wedding-rani text-sm tracking-widest uppercase mb-2 font-bold">{t('travel_welcome')}</p>
          <h1 className="font-serif text-5xl md:text-6xl text-wedding-charcoal mb-6">{t('travel_title')}</h1>
          <p className="text-gray-600 font-light max-w-2xl mx-auto leading-relaxed text-lg">
            {t('travel_desc')}
          </p>
        </div>

        {/* LOGISTICS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16 animate-fade-in-up max-w-5xl mx-auto">
            {/* Airport Card */}
            <div className="bg-white/90 backdrop-blur p-4 rounded-xl border-l-4 border-blue-500 shadow-md flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                    <Plane className="text-blue-600" size={20} />
                </div>
                <div className="min-w-0">
                    <h3 className="font-serif text-lg text-wedding-charcoal leading-tight">{language === 'en' ? 'Airport' : 'Aeropuerto'}</h3>
                    <div className="flex items-baseline gap-2">
                        <p className="text-xl font-bold text-blue-600 tracking-wider">BOM</p>
                        <p className="text-gray-500 text-xs truncate">Chhatrapati Shivaji Maharaj Int'l</p>
                    </div>
                </div>
            </div>

            {/* Hotel Card */}
            <div className="bg-white/90 backdrop-blur p-4 rounded-xl border-l-4 border-wedding-marigold shadow-md flex items-center gap-3">
                <div className="bg-wedding-cream p-2 rounded-full flex-shrink-0">
                    <Bed className="text-wedding-marigold" size={20} />
                </div>
                <div className="min-w-0">
                    <h3 className="font-serif text-lg text-wedding-charcoal leading-tight">{language === 'en' ? 'Where to Stay' : 'Dónde Alojarse'}</h3>
                    <div className="flex items-center gap-2">
                        <a href="https://www.tajhotels.com/en-in/hotels/taj-the-trees" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-wedding-marigold hover:text-wedding-rani transition-colors inline-flex items-center gap-1 truncate">
                            Taj The Trees <ExternalLink size={12} />
                        </a>
                        <p className="text-gray-400 text-[10px] hidden sm:block uppercase tracking-wide">{language === 'en' ? 'Recommended' : 'Recomendado'}</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Recommendations Sections */}
        <div className="space-y-20 mb-24">
            
            {/* Sightseeing */}
            <section className="animate-fade-in-up">
                <div className="flex items-center gap-3 mb-8 justify-center">
                    <Camera className="text-wedding-rani" size={28} />
                    <h2 className="font-serif text-4xl text-wedding-charcoal">{t('travel_sights')}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {recommendations.sightseeing.map((item) => (
                        <div 
                            key={item.id} 
                            className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group cursor-pointer flex flex-col" 
                            onClick={() => {
                                if (item.link) {
                                    window.open(item.link, '_blank');
                                } else {
                                    setActiveLocationId(item.id);
                                    const element = document.getElementById('travel-map');
                                    element?.scrollIntoView({ behavior: 'smooth' });
                                }
                            }}
                        >
                            <div className="h-40 overflow-hidden relative">
                                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                                {item.link && (
                                    <div className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ExternalLink size={14} className="text-wedding-charcoal" />
                                    </div>
                                )}
                            </div>
                            <div className="p-5 flex flex-col flex-grow">
                                <div className="flex items-center gap-2 mb-2">
                                    {item.icon}
                                    <h3 className="font-serif text-lg font-bold text-wedding-charcoal leading-tight">{item.title}</h3>
                                </div>
                                <p className="text-gray-600 text-xs leading-relaxed font-light mb-4 flex-grow">{item.desc}</p>
                                <div className="flex items-center gap-1 text-wedding-rani text-[10px] font-bold uppercase tracking-wider">
                                    {item.link 
                                        ? (language === 'en' ? 'Visit Website' : 'Visitar Sitio') 
                                        : (language === 'en' ? 'View on Map' : 'Ver en Mapa')
                                    } 
                                    <ArrowRight size={10} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 max-w-2xl mx-auto bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-wedding-gold/30 shadow-sm text-center">
                    <h3 className="font-serif text-xl text-wedding-charcoal mb-2">
                        {language === 'en' ? "Want to see it all in one day?" : "¿Quieres ver todo en un día?"}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 font-light">
                        {language === 'en' 
                            ? "We recommend booking a private full-day tour. It includes private air-conditioned transport and a tour guide."
                            : "Recomendamos reservar un tour privado de día completo. Incluye transporte privado con aire acondicionado y guía."}
                    </p>
                    <a 
                        href="https://www.tripadvisor.com/AttractionProductReview-g304554-d11482147-Private_Full_Day_Mumbai_City_Tour_with_Elephanta_Caves_Excursion-Mumbai_Maharashtr.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-wedding-rani text-white px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-pink-700 transition-colors shadow-md"
                    >
                        {language === 'en' ? "View Tour on TripAdvisor" : "Ver Tour en TripAdvisor"} <ExternalLink size={14} />
                    </a>
                </div>
            </section>

            {/* Shopping */}
            <section className="animate-fade-in-up">
                <div className="flex items-center gap-3 mb-2 justify-center">
                    <ShoppingBag className="text-wedding-marigold" size={28} />
                    <h2 className="font-serif text-4xl text-wedding-charcoal">{t('travel_shopping')}</h2>
                </div>
                <p className="text-center text-gray-500 mb-8 max-w-2xl mx-auto">
                    {t('travel_shopping_desc')}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {recommendations.shopping.map((item) => (
                        <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group cursor-pointer" onClick={() => {
                            if (item.link) {
                                window.open(item.link, '_blank');
                            } else {
                                setActiveLocationId(item.id);
                                const element = document.getElementById('travel-map');
                                element?.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}>
                            <div className="h-48 overflow-hidden relative">
                                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                                {item.link && (
                                    <div className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ExternalLink size={14} className="text-wedding-charcoal" />
                                    </div>
                                )}
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-3">
                                    {item.icon}
                                    <h3 className="font-serif text-xl font-bold text-wedding-charcoal">{item.title}</h3>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed font-light">{item.desc}</p>
                                <div className="mt-4 flex items-center gap-1 text-wedding-rani text-xs font-bold uppercase tracking-wider opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                    {item.link 
                                        ? (item.link.includes('youtube') ? (language === 'en' ? 'Watch Video' : 'Ver Video') : (language === 'en' ? 'Visit Website' : 'Visitar Sitio')) 
                                        : (language === 'en' ? 'View on Map' : 'Ver en el Mapa')
                                    } <ArrowRight size={12} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

             {/* Food - Compact Redesign */}
             <section className="animate-fade-in-up">
                <div className="flex items-center gap-3 mb-2 justify-center">
                    <Utensils className="text-wedding-green" size={28} />
                    <h2 className="font-serif text-4xl text-wedding-charcoal">{t('travel_food')}</h2>
                </div>
                
                <div className="text-center mb-8 max-w-2xl mx-auto flex flex-col items-center gap-3">
                    <div className="bg-wedding-cream border border-wedding-gold/30 px-4 py-2 rounded-lg text-sm text-wedding-charcoal">
                        <span className="font-bold text-wedding-rani block mb-1">
                            {language === 'en' ? "Reservation Required" : "Reserva Requerida"}
                        </span>
                        {language === 'en' 
                            ? "We highly recommend making reservations in advance for these restaurants." 
                            : "Recomendamos encarecidamente hacer reservas con antelación para estos restaurantes."}
                    </div>

                    <a 
                        href="https://www.zomato.com/mumbai/fine-dining-restaurants" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-wedding-charcoal hover:text-wedding-rani transition-colors border-b border-wedding-charcoal hover:border-wedding-rani pb-0.5 mt-2"
                    >
                        {language === 'en' ? "Find more restaurants on Zomato" : "Encuentra más restaurantes en Zomato"} 
                        <ExternalLink size={12} />
                    </a>
                </div>

                {/* Single Compact Card for Restaurants */}
                <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur rounded-2xl shadow-xl overflow-hidden border border-wedding-green/20">
                    <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                        {recommendations.food.map((item, index) => (
                            <div key={item.id} className="p-8 hover:bg-wedding-cream/30 transition-colors">
                                <div className="flex items-center gap-2 mb-3">
                                    {item.icon}
                                    <h3 className="font-serif text-xl font-bold text-wedding-charcoal">{item.title}</h3>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed font-light mb-6 min-h-[40px]">
                                    {item.desc}
                                </p>
                                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                                    <a 
                                        href={item.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-wedding-rani hover:text-pink-800 font-bold uppercase tracking-widest text-xs transition-colors"
                                    >
                                        {t('travel_visit_website')} <ExternalLink size={14} />
                                    </a>
                                     <button 
                                        onClick={() => {
                                            setActiveLocationId(item.id);
                                            const element = document.getElementById('travel-map');
                                            element?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className="text-gray-400 hover:text-wedding-green transition-colors p-2 rounded-full hover:bg-gray-100"
                                        title={language === 'en' ? 'View on Map' : 'Ver en Mapa'}
                                    >
                                        <MapPin size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>

        {/* Travel Map Section */}
        <div id="travel-map" className="mb-24 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-wedding-gold/20 animate-fade-in-up">
            <div className="bg-wedding-charcoal p-6 text-white text-center">
                <h3 className="font-serif text-2xl md:text-3xl text-wedding-gold">{t('travel_map_title')}</h3>
                <p className="text-xs text-gray-400 uppercase tracking-widest mt-2">
                   {language === 'en' ? 'Select a location to see driving directions from Taj The Trees' : 'Selecciona una ubicación para ver indicaciones desde Taj The Trees'}
                </p>
            </div>
            
            <div className="flex flex-col md:flex-row h-[85vh] md:h-[500px]">
                {/* Location List (Controller) */}
                <div className="w-full md:w-1/3 h-[50%] md:h-full bg-white p-2 md:p-4 overflow-y-auto space-y-2 shadow-inner relative z-10 border-r border-gray-100 scroll-smooth">
                     {MAP_LOCATIONS.map((loc) => (
                        <button
                            key={loc.id}
                            onClick={() => setActiveLocationId(loc.id)}
                            className={`w-full text-left p-4 rounded-lg border transition-all duration-300 group ${
                                activeLocationId === loc.id 
                                ? 'bg-wedding-cream border-wedding-rani shadow-md transform scale-[1.01] z-10' 
                                : 'bg-white border-transparent hover:bg-gray-50 hover:border-gray-200'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 md:w-6 md:h-6 rounded-full flex items-center justify-center text-white text-[12px] md:text-[10px] font-bold flex-shrink-0 transition-transform ${getCategoryColor(loc.type)} ${activeLocationId === loc.id ? 'scale-110' : ''}`}>
                                    {getCategoryIcon(loc.type)}
                                </div>
                                <div className="flex-grow min-w-0">
                                    <div className="flex justify-between items-center">
                                         <h4 className={`font-bold text-base md:text-sm truncate ${activeLocationId === loc.id ? 'text-wedding-rani' : 'text-wedding-charcoal'}`}>
                                            {loc.title}
                                        </h4>
                                    </div>
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">{loc.subtitle}</p>
                                    
                                    {activeLocationId === loc.id && (
                                        <div className="mt-1 flex items-center gap-1 text-[10px] text-wedding-rani font-bold uppercase tracking-widest animate-pulse">
                                            {loc.id === 'hotel' ? <MapPin size={10} /> : <Navigation size={10} />}
                                            {loc.id === 'hotel' ? (language === 'en' ? 'Location' : 'Ubicación') : (language === 'en' ? 'Showing Route' : 'Mostrando Ruta')}
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

        {/* Survival Guide */}
        <div className="animate-fade-in-up">
          <div className="bg-wedding-charcoal text-wedding-cream rounded-xl p-6 md:p-12 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-wedding-rani/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
             
             <div className="relative z-10">
                <div className="text-center mb-6 md:mb-10">
                   <h2 className="font-serif text-3xl md:text-4xl text-wedding-gold mb-2">{t('travel_survival_title')}</h2>
                   <p className="text-gray-400 font-light text-sm md:text-base">{t('travel_survival_subtitle')}</p>
                </div>

                <div className="flex overflow-x-auto pb-6 gap-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:gap-6 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scroll-smooth hide-scrollbar">
                   {/* Tip 1 */}
                   <div className="min-w-[260px] md:min-w-0 snap-center bg-white/10 backdrop-blur p-5 rounded-xl border border-white/10 hover:bg-white/20 transition-colors flex flex-col justify-start h-full">
                      <Droplets className="text-blue-400 mb-4" size={24} />
                      <h4 className="font-bold uppercase tracking-widest text-xs mb-2 text-white">{language === 'en' ? 'Water Safety' : 'Agua Potable'}</h4>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        {language === 'en' 
                          ? <span><strong>Strictly bottled water only.</strong> Do not drink tap water. Even when brushing your teeth, use bottled water if you have a sensitive stomach. Avoid ice in drinks at street stalls.</span>
                          : <span><strong>Estrictamente solo agua embotellada.</strong> No beba agua del grifo. Incluso al cepillarse los dientes. Evite el hielo en las bebidas en puestos callejeros.</span>
                        }
                      </p>
                   </div>

                   {/* Tip 2 */}
                   <div className="min-w-[260px] md:min-w-0 snap-center bg-white/10 backdrop-blur p-5 rounded-xl border border-white/10 hover:bg-white/20 transition-colors flex flex-col justify-start h-full">
                      <Car className="text-wedding-marigold mb-4" size={24} />
                      <h4 className="font-bold uppercase tracking-widest text-xs mb-2 text-white">{language === 'en' ? 'Getting Around' : 'Transporte'}</h4>
                      <p className="text-xs text-gray-300 leading-relaxed">
                         {language === 'en'
                            ? <span>Download <strong>Uber</strong>. It works perfectly here and you don't need to negotiate prices. Rickshaws (Tuk-tuks) are fun for short distances but only work in the suburbs (Bandra/Juhu).</span>
                            : <span>Descarga <strong>Uber</strong>. Funciona perfectamente y no necesitas negociar precios. Los Rickshaws (Tuk-tuks) son divertidos para distancias cortas pero solo funcionan en los suburbios.</span>
                         }
                      </p>
                   </div>
                   
                   {/* New E-SIM Tip */}
                   <div className="min-w-[260px] md:min-w-0 snap-center bg-white/10 backdrop-blur p-5 rounded-xl border border-white/10 hover:bg-white/20 transition-colors flex flex-col justify-start h-full">
                      <Smartphone className="text-green-400 mb-4" size={24} />
                      <h4 className="font-bold uppercase tracking-widest text-xs mb-2 text-white">{language === 'en' ? 'Connectivity' : 'Conectividad'}</h4>
                      <p className="text-xs text-gray-300 leading-relaxed">
                         {language === 'en'
                            ? <span>Download the <strong><a href="https://www.airalo.com/india-esim" target="_blank" rel="noopener noreferrer" className="underline hover:text-wedding-gold">Airalo</a></strong> app for an instant E-SIM. It provides reliable 5G data throughout Mumbai without needing a physical SIM card.</span>
                            : <span>Descarga la aplicación <strong><a href="https://www.airalo.com/india-esim" target="_blank" rel="noopener noreferrer" className="underline hover:text-wedding-gold">Airalo</a></strong> para una E-SIM instantánea. Proporciona datos 5G fiables en todo Mumbai sin necesidad de una tarjeta física.</span>
                         }
                      </p>
                   </div>

                   {/* Tip 3 */}
                   <div className="min-w-[260px] md:min-w-0 snap-center bg-white/10 backdrop-blur p-5 rounded-xl border border-white/10 hover:bg-white/20 transition-colors flex flex-col justify-start h-full">
                      <Utensils className="text-wedding-rani mb-4" size={24} />
                      <h4 className="font-bold uppercase tracking-widest text-xs mb-2 text-white">{language === 'en' ? 'Spice Warning' : 'Comida Picante'}</h4>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        {language === 'en'
                            ? <span>"Mild" in India is still "Spicy" for most. Ask for <strong>"Non-spicy"</strong> or <strong>"Sweet"</strong>. Yogurt (Curd/Raita) is the best antidote for a burning mouth, not water!</span>
                            : <span>"Suave" en la India sigue siendo "Picante" para la mayoría. Pide <strong>"No picante"</strong> o <strong>"Dulce"</strong>. ¡El yogur (Curd/Raita) es el mejor antídoto para el picante, no el agua!</span>
                        }
                      </p>
                   </div>

                   {/* Tip 4 */}
                   <div className="min-w-[260px] md:min-w-0 snap-center bg-white/10 backdrop-blur p-5 rounded-xl border border-white/10 hover:bg-white/20 transition-colors flex flex-col justify-start h-full">
                      <AlertTriangle className="text-yellow-400 mb-4" size={24} />
                      <h4 className="font-bold uppercase tracking-widest text-xs mb-2 text-white">{language === 'en' ? 'Traffic & Time' : 'Tráfico y Hora'}</h4>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        {language === 'en'
                            ? <span>Traffic is unpredictable. If Google Maps says 30 mins, plan for 45-60 mins. We run on "Indian Standard Time" (relaxed punctuality), but the wedding events will start on time!</span>
                            : <span>El tráfico es impredecible. Si Google Maps dice 30 min, planifica para 45-60. Funcionamos con "Hora Estándar India" (puntualidad relajada), ¡pero los eventos de la boda comenzarán a tiempo!</span>
                        }
                      </p>
                   </div>

                   {/* Tip 5 */}
                   <div className="min-w-[260px] md:min-w-0 snap-center bg-white/10 backdrop-blur p-5 rounded-xl border border-white/10 hover:bg-white/20 transition-colors flex flex-col justify-start h-full">
                      <Map className="text-green-400 mb-4" size={24} />
                      <h4 className="font-bold uppercase tracking-widest text-xs mb-2 text-white">{language === 'en' ? 'Navigation' : 'Navegación'}</h4>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        {language === 'en'
                            ? <span>Mumbai is safe, but crowded. Keep your bag close in markets. People are very friendly—if you get lost, just ask! Most people speak English.</span>
                            : <span>Mumbai es segura, pero concurrida. Mantén tu bolso cerca en los mercados. La gente es muy amable: si te pierdes, ¡pregunta! La mayoría habla inglés.</span>
                        }
                      </p>
                   </div>

                   {/* Tip 6 */}
                   <div className="min-w-[260px] md:min-w-0 snap-center bg-white/10 backdrop-blur p-5 rounded-xl border border-white/10 hover:bg-white/20 transition-colors flex flex-col justify-start h-full">
                      <ShoppingBag className="text-purple-400 mb-4" size={24} />
                      <h4 className="font-bold uppercase tracking-widest text-xs mb-2 text-white">{language === 'en' ? 'Currency' : 'Moneda'}</h4>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        {language === 'en'
                            ? <span>Most places take credit cards (Visa/Mastercard). Carry some cash (Rupees) for small shops or tips. 1 USD ≈ 83 INR.</span>
                            : <span>La mayoría acepta tarjetas de crédito. Lleva algo de efectivo (Rupias) para tiendas pequeñas o propinas. 1 USD ≈ 83 INR.</span>
                        }
                      </p>
                   </div>

                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Travel;