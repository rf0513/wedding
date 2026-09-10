import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Chrome
    menu_label: "Contents",
    the_wedding_of: "The wedding of",
    hero_dates: "2 – 5 February 2027",
    curtain_skip: "Tap anywhere to skip",

    // Nav
    nav_home: "Home",
    nav_story: "Our Story",
    nav_events: "Schedule",
    nav_travel: "Travel Guide",
    nav_traditions: "Ceremonies & Attire",
    nav_registry: "Registry",
    nav_rsvp: "RSVP",
    nav_qna: "Q&A",

    // Home
    home_view_events: "View Schedule",
    home_quote: "“As soon as I saw you, I knew an adventure was going to happen.”",
    countdown_label: "Until the Mehendi",
    cd_days: "Days",
    cd_hours: "Hours",
    cd_minutes: "Minutes",

    // Story
    story_kicker: "How We Met",
    story_title: "Our Journey",
    journey_from: "Where it began",
    journey_home: "Home base",
    journey_next_stop: "Next stop",
    journey_abq: "Albuquerque, New Mexico",
    journey_bay: "Bay Area, California",
    journey_mumbai: "Mumbai, India",
    journey_wedding: "The Wedding · 2 – 5 February 2027",
    journey_place_1: "Albuquerque, NM",
    journey_place_2: "Rocky Mountains, CO",
    journey_place_3: "Bay Area, CA",
    journey_place_4: "San Francisco, CA",

    // Events / Programme
    events_subtitle: "The Schedule",
    events_title: "Wedding Schedule",
    events_desc: "Join us for a vibrant celebration of love across Mumbai's most beautiful venues.",
    events_shuttle: "Departs Taj The Trees at",
    lbl_time: "Time",
    lbl_venue: "Venue",
    lbl_shuttle: "Shuttle",
    lbl_dress: "Dress",
    add_to_calendar: "Add to calendar",
    see_map: "Venues on the map",

    // Guides
    guides_title: "Everything you need for the trip",
    guide_no: "Guide Nº",

    // Travel
    travel_welcome: "Welcome to India",
    travel_title: "Mumbai Travel Guide",
    travel_desc: "Mumbai is a city of dreams, chaos, and incredible energy. For our international guests, we've curated a list of high-end spots to ensure your visit is comfortable, delicious, and memorable.",
    travel_airport: "Airport",
    travel_stay: "Where to Stay",
    recommended: "Recommended",
    travel_sights: "Must-See Sights",
    travel_tour_title: "Want to see it all in one day?",
    travel_tour_desc: "We recommend booking a private full-day tour. It includes private air-conditioned transport and a tour guide.",
    travel_tour_btn: "View Tour on TripAdvisor",
    travel_shopping: "Retail Therapy",
    travel_shopping_desc: "From upscale boutiques to the safest street market in town.",
    travel_food: "Culinary Gems",
    travel_food_desc: "Hygiene and flavor are our top priorities. These are world-class establishments perfect for a nice dinner out.",
    travel_res_title: "Reservation Required",
    travel_res_desc: "We highly recommend making reservations in advance for these restaurants.",
    travel_zomato: "Find more restaurants on Zomato",
    travel_visit_website: "Visit Website",
    view_on_map: "View on map",
    travel_map_title: "Explore the Guide",
    travel_map_subtitle: "Select a place to find it on the map",
    map_hotel: "Your hotel · Taj The Trees, Vikhroli",
    map_route: "From Taj The Trees to",
    map_open_gmaps: "Open in Google Maps",
    map_not_to_scale: "Not to scale · an illustrated guide, not a navigation map",
    map_sea: "Arabian Sea",
    map_harbour: "Mumbai Harbour",
    travel_survival_title: "Mumbai Survival Guide",
    travel_survival_subtitle: "Essential tips for our friends from Panama & the US",

    // Traditions
    traditions_subtitle: "For Our Guests",
    traditions_title: "Ceremonies & Attire",
    traditions_desc: "We are so excited to welcome our family and friends from Panama and the US to Mumbai! We know Indian weddings can be complex, so we've put together this guide to help you navigate the ceremonies and the wardrobe.",
    traditions_tab_ceremonies: "The Ceremonies",
    traditions_tab_attire: "Attire Guide",
    traditions_significance: "Significance",
    traditions_wear: "What to Wear",
    traditions_expect: "What to Expect",
    traditions_see_examples: "See examples",
    traditions_perfect_for: "Perfect for",
    traditions_shop_title: "Where to Shop",
    traditions_shop_desc: "Whether you prefer to order online before your trip or experience the vibrant fashion of Mumbai in person, here are our curated recommendations.",
    traditions_q_title: "Still have questions?",
    traditions_q_desc: "Don't worry about getting everything perfect. The most important thing is your presence!",

    // Attire
    attire_by_event_title: "Dress Code by Event",
    attire_by_event_desc: "A quick guide on what to wear for each specific function.",
    attire_glossary_title: "Clothing Style Guide",
    attire_glossary_desc: "Unsure what a 'Lehenga' or 'Sherwani' is? Here is your cheat sheet.",
    attire_women: "Women",
    attire_men: "Men",

    // Registry
    registry_kicker: "Gifts",
    registry_title: "Registry",
    registry_desc: "Your attendance and love is all we need, but here are some suggestions if the plane ticket to Mumbai was not expensive enough:",
    registry_charity: "If you are attending this wedding, it is likely you have been blessed with opportunities. Others are not as fortunate. Consider supporting Educate Girls Globally, one of the most rigorously measured and impactful education charities in India.",
    registry_donate: "Donate Now",
    registry_btc: "If you insist of quantifying your love to us, you can send Bitcoin to the wallet below.",
    registry_copy: "Copy Address",
    registry_copied: "Copied",

    // RSVP
    rsvp_deadline: "December 15, 2026",
    rsvp_respond_by: "Kindly Respond By",
    rsvp_first_name: "First Name",
    rsvp_last_name: "Last Name",
    rsvp_email: "Email Address",
    rsvp_attending: "Will you be attending?",
    rsvp_yes: "Yes, happily!",
    rsvp_no: "Regretfully no",
    rsvp_guests: "Total Guests",
    rsvp_diet: "Dietary Requirements",
    rsvp_send: "Send RSVP",
    rsvp_thanks: "Dhanyavad!",
    rsvp_thanks_msg: "Your response has been recorded. We are counting down the days to see you in Mumbai!",
    rsvp_another: "Submit another response",
    rsvp_back_home: "Back to Home",

    // Q&A
    qna_title: "Frequently Asked Questions",
    qna_subtitle: "Everything you need to know for the big trip.",

    // Footer
    footer_msg: "See you in Mumbai!"
  },
  es: {
    // Chrome
    menu_label: "Contenido",
    the_wedding_of: "La boda de",
    hero_dates: "2 – 5 de febrero de 2027",
    curtain_skip: "Toca en cualquier lugar para saltar",

    // Nav
    nav_home: "Inicio",
    nav_story: "Nuestra Historia",
    nav_events: "Itinerario",
    nav_travel: "Guía de Viaje",
    nav_traditions: "Ceremonias y Vestimenta",
    nav_registry: "Regalos",
    nav_rsvp: "RSVP",
    nav_qna: "Preguntas",

    // Home
    home_view_events: "Ver Itinerario",
    home_quote: "“Tan pronto como te vi, supe que una aventura estaba por suceder.”",
    countdown_label: "Para el Mehendi",
    cd_days: "Días",
    cd_hours: "Horas",
    cd_minutes: "Minutos",

    // Story
    story_kicker: "Cómo Nos Conocimos",
    story_title: "Nuestro Viaje",
    journey_from: "Donde empezó",
    journey_home: "Nuestro hogar",
    journey_next_stop: "Próxima parada",
    journey_abq: "Albuquerque, Nuevo México",
    journey_bay: "Área de la Bahía, California",
    journey_mumbai: "Mumbai, India",
    journey_wedding: "La Boda · 2 – 5 de febrero de 2027",
    journey_place_1: "Albuquerque, NM",
    journey_place_2: "Montañas Rocosas, CO",
    journey_place_3: "Área de la Bahía, CA",
    journey_place_4: "San Francisco, CA",

    // Events / Programme
    events_subtitle: "El Itinerario",
    events_title: "Itinerario de la Boda",
    events_desc: "Únase a nosotros para una vibrante celebración del amor en los lugares más hermosos de Mumbai.",
    events_shuttle: "Sale de Taj The Trees a las",
    lbl_time: "Hora",
    lbl_venue: "Lugar",
    lbl_shuttle: "Transporte",
    lbl_dress: "Vestimenta",
    add_to_calendar: "Añadir al calendario",
    see_map: "Lugares en el mapa",

    // Guides
    guides_title: "Todo lo que necesitas para el viaje",
    guide_no: "Guía Nº",

    // Travel
    travel_welcome: "Bienvenidos a la India",
    travel_title: "Guía de Viaje a Mumbai",
    travel_desc: "Mumbai es una ciudad de sueños, caos y energía increíble. Para nuestros invitados internacionales, hemos seleccionado una lista de lugares exclusivos para asegurar que su visita sea cómoda, deliciosa y memorable.",
    travel_airport: "Aeropuerto",
    travel_stay: "Dónde Alojarse",
    recommended: "Recomendado",
    travel_sights: "Lugares Imperdibles",
    travel_tour_title: "¿Quieres ver todo en un día?",
    travel_tour_desc: "Recomendamos reservar un tour privado de día completo. Incluye transporte privado con aire acondicionado y guía.",
    travel_tour_btn: "Ver Tour en TripAdvisor",
    travel_shopping: "Terapia de Compras",
    travel_shopping_desc: "Desde boutiques exclusivas hasta el mercado callejero más seguro de la ciudad.",
    travel_food: "Joyas Culinarias",
    travel_food_desc: "La higiene y el sabor son nuestras prioridades. Estos son establecimientos de clase mundial perfectos para una cena agradable.",
    travel_res_title: "Reserva Requerida",
    travel_res_desc: "Recomendamos encarecidamente hacer reservas con antelación para estos restaurantes.",
    travel_zomato: "Encuentra más restaurantes en Zomato",
    travel_visit_website: "Visitar Sitio",
    view_on_map: "Ver en el mapa",
    travel_map_title: "Explorar la Guía",
    travel_map_subtitle: "Selecciona un lugar para ubicarlo en el mapa",
    map_hotel: "Tu hotel · Taj The Trees, Vikhroli",
    map_route: "De Taj The Trees a",
    map_open_gmaps: "Abrir en Google Maps",
    map_not_to_scale: "Sin escala · una guía ilustrada, no un mapa de navegación",
    map_sea: "Mar Arábigo",
    map_harbour: "Puerto de Mumbai",
    travel_survival_title: "Guía de Supervivencia",
    travel_survival_subtitle: "Consejos esenciales para nuestros amigos de Panamá y EE. UU.",

    // Traditions
    traditions_subtitle: "Para Nuestros Invitados",
    traditions_title: "Ceremonias y Vestimenta",
    traditions_desc: "¡Estamos muy emocionados de recibir a nuestra familia y amigos de Panamá y EE. UU. en Mumbai! Sabemos que las bodas indias pueden ser complejas, por lo que hemos preparado esta guía para ayudarlos con las ceremonias y el vestuario.",
    traditions_tab_ceremonies: "Las Ceremonias",
    traditions_tab_attire: "Guía de Vestimenta",
    traditions_significance: "Significado",
    traditions_wear: "Qué Usar",
    traditions_expect: "Qué Esperar",
    traditions_see_examples: "Ver ejemplos",
    traditions_perfect_for: "Perfecto para",
    traditions_shop_title: "Dónde Comprar",
    traditions_shop_desc: "Ya sea que prefieras ordenar en línea antes de tu viaje o experimentar la vibrante moda de Mumbai en persona, aquí están nuestras recomendaciones.",
    traditions_q_title: "¿Tienes preguntas?",
    traditions_q_desc: "No te preocupes por que todo sea perfecto. ¡Lo más importante es tu presencia!",

    // Attire
    attire_by_event_title: "Código de Vestimenta",
    attire_by_event_desc: "Una guía rápida sobre qué usar para cada función específica.",
    attire_glossary_title: "Guía de Estilos de Ropa",
    attire_glossary_desc: "¿No estás seguro de qué es un 'Lehenga' o 'Sherwani'? Aquí está tu hoja de trucos.",
    attire_women: "Mujeres",
    attire_men: "Hombres",

    // Registry
    registry_kicker: "Regalos",
    registry_title: "Regalos",
    registry_desc: "Su asistencia y amor es todo lo que necesitamos, pero aquí hay algunas sugerencias si el boleto de avión a Mumbai no fue lo suficientemente caro:",
    registry_charity: "Si asistes a esta boda, es probable que hayas sido bendecido con oportunidades. Otros no son tan afortunados. Considere apoyar a Educate Girls Globally, una de las organizaciones benéficas educativas de mayor impacto en la India.",
    registry_donate: "Donar Ahora",
    registry_btc: "Si insistes en cuantificar tu amor por nosotros, puedes enviar Bitcoin a la siguiente billetera.",
    registry_copy: "Copiar Dirección",
    registry_copied: "Copiado",

    // RSVP
    rsvp_deadline: "15 de diciembre de 2026",
    rsvp_respond_by: "Responder antes de",
    rsvp_first_name: "Nombre",
    rsvp_last_name: "Apellido",
    rsvp_email: "Correo Electrónico",
    rsvp_attending: "¿Asistirás?",
    rsvp_yes: "¡Sí, felizmente!",
    rsvp_no: "Lamentablemente no",
    rsvp_guests: "Total de Invitados",
    rsvp_diet: "Requerimientos Dietéticos",
    rsvp_send: "Enviar RSVP",
    rsvp_thanks: "¡Dhanyavad!",
    rsvp_thanks_msg: "Tu respuesta ha sido registrada. ¡Estamos contando los días para verte en Mumbai!",
    rsvp_another: "Enviar otra respuesta",
    rsvp_back_home: "Volver al Inicio",

    // Q&A
    qna_title: "Preguntas Frecuentes",
    qna_subtitle: "Todo lo que necesitas saber para el gran viaje.",

    // Footer
    footer_msg: "¡Nos vemos en Mumbai!"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
