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
    nav_travel: "Mumbai",
    nav_celebrations: "The Celebrations",
    nav_attire: "What to Wear",
    nav_registry: "Registry",
    nav_rsvp: "RSVP",
    nav_qna: "Q&A",

    // Home
    home_view_events: "The Four Days",
    // ➜ EDIT: a short welcome from the two of you (this is a draft)
    home_note_kicker: "A note from us",
    home_note: "We met in Albuquerque, made a home in the Bay Area, and are getting married in Mumbai. Over four days we will gather our families from India, Panama and the United States, and nothing would make us happier than to have you there, from the first henna on Tuesday to the last dance on Friday.",
    home_note_sign: "Pavitra & Ramon",
    countdown_label: "Until the Mehendi",
    cd_days: "Days",

    // Story
    story_kicker: "How We Met",
    story_title: "Our Journey",
    story_desc: "From a desk in Albuquerque to a rooftop in Mumbai, by way of a mountain and a bridge.",
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
    journey_place_5: "Mumbai, India",

    // Events / Programme
    events_subtitle: "At a glance",
    events_title: "The Programme",
    events_desc: "Shuttles leave from Taj The Trees before every event.",
    events_shuttle: "Departs Taj The Trees at",
    lbl_time: "Time",
    lbl_venue: "Venue",
    lbl_shuttle: "Shuttle",
    lbl_dress: "Dress",
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
    map_hotel_desc: "Every route on this map starts here. Wedding-day shuttles leave from the lobby.",
    map_route: "From Taj The Trees to",
    map_distance: "Distance",
    map_drive: "By car",
    map_via: "Via",
    map_ferry: "ferry",
    map_shuttle: "Shuttle from the hotel at",
    map_open_gmaps: "Open in Google Maps",
    map_open_directions: "Turn-by-turn in Google Maps",
    map_note: "Real geography, simplified · drive times are typical; Mumbai traffic can double them",
    map_sea: "Arabian Sea",
    map_harbour: "Mumbai Harbour",
    travel_survival_title: "Mumbai Survival Guide",
    travel_survival_subtitle: "Essential tips for our friends from Panama & the US",

    // Home · celebrations + guides
    home_celebrations_kicker: "Four Days in Mumbai",
    home_celebrations_title: "The Celebrations",
    home_celebrations_desc: "Each day has its own page: what it means, how it unfolds, what to wear, and how to get there.",
    home_explore: "Explore",
    guides_list_title: "The Guides",
    day_label: "Day",

    // Celebration pages
    cel_switch_label: "The four days",
    cel_intro_kicker: "The Celebration",
    cel_intro_title: "The Story Behind It",
    cel_tradition: "The tradition",
    cel_moments_kicker: "The rundown",
    cel_moments_title: "How the Day Unfolds",
    cel_expect_kicker: "Know before you go",
    cel_expect_title: "What to Expect",
    cel_vibe_title: "The Vibe",
    cel_dress_kicker: "What to wear",
    cel_dress_title: "Dress Guide",
    cel_dress_tips: "Style Notes",
    cel_inspo_title: "Outfit Inspiration",
    cel_full_wardrobe: "What to Wear & Where to Shop",
    cel_glossary_kicker: "A little vocabulary",
    cel_glossary_title: "Words You'll Hear",
    cel_logistics_kicker: "Logistics",
    cel_logistics_title: "Getting There",
    cel_notes_title: "Good to Know",
    cel_directions: "Directions from the Hotel",
    cel_tips_kicker: "From Pavitra & Ramon",
    cel_tips_title: "Insider Tips",
    cel_prev: "Previous",
    cel_next: "Next",
    cel_all: "All four days",
    lbl_date: "Date",
    lbl_when: "When",
    lbl_until: "until",

    // Wardrobe guide
    traditions_subtitle: "For Our Guests",
    attire_title: "What to Wear",
    attire_desc: "Unsure what a Lehenga or a Sherwani is, or where to find one? This is your cheat sheet. For the dress code of a specific day, head to that celebration's page.",
    attire_glance_title: "Dress Code at a Glance",
    attire_glance_desc: "Four days, four moods. Tap a day for the full guide.",
    attire_day_guide: "Full guide",
    attire_glossary_title: "Clothing Style Guide",
    attire_glossary_desc: "The outfits you'll see all week, explained.",
    attire_women: "Women",
    attire_men: "Men",
    traditions_perfect_for: "Perfect for",
    traditions_shop_title: "Where to Shop",
    traditions_shop_desc: "Whether you prefer to order online before your trip or experience the vibrant fashion of Mumbai in person, here are our curated recommendations.",
    traditions_q_title: "Still have questions?",
    traditions_q_desc: "Don't worry about getting everything perfect. The most important thing is your presence.",
    traditions_q_link: "Read the Q&A",

    // Registry
    registry_kicker: "Gifts",
    registry_title: "Registry",
    registry_desc: "Your attendance and love is all we need, but here are some suggestions if the plane ticket to Mumbai was not expensive enough:",
    registry_charity: "If you are attending this wedding, it is likely you have been blessed with opportunities. Others are not as fortunate. Consider supporting Educate Girls Globally, one of the most rigorously measured and impactful education charities in India.",
    registry_donate: "Donate Now",
    registry_btc: "If you insist on quantifying your love to us, you can send Bitcoin to the wallet below.",
    registry_show_btc: "Show wallet address",
    registry_hide_btc: "Hide wallet address",
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
    qna_title: "Q&A",
    qna_subtitle: "Everything you need to know for the big trip.",

    // Footer
    footer_msg: "See you in Mumbai"
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
    nav_travel: "Mumbai",
    nav_celebrations: "Las Celebraciones",
    nav_attire: "Qué Ponerse",
    nav_registry: "Regalos",
    nav_rsvp: "RSVP",
    nav_qna: "Preguntas",

    // Home
    home_view_events: "Los Cuatro Días",
    home_note_kicker: "Una nota de nosotros",
    home_note: "Nos conocimos en Albuquerque, hicimos un hogar en el Área de la Bahía y nos casamos en Mumbai. Durante cuatro días reuniremos a nuestras familias de India, Panamá y Estados Unidos, y nada nos haría más felices que tenerte allí, desde la primera henna del martes hasta el último baile del viernes.",
    home_note_sign: "Pavitra y Ramón",
    countdown_label: "Para el Mehendi",
    cd_days: "Días",

    // Story
    story_kicker: "Cómo Nos Conocimos",
    story_title: "Nuestro Viaje",
    story_desc: "De un escritorio en Albuquerque a una azotea en Mumbai, pasando por una montaña y un puente.",
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
    journey_place_5: "Mumbai, India",

    // Events / Programme
    events_subtitle: "De un vistazo",
    events_title: "El Programa",
    events_desc: "Los traslados salen de Taj The Trees antes de cada evento.",
    events_shuttle: "Sale de Taj The Trees a las",
    lbl_time: "Hora",
    lbl_venue: "Lugar",
    lbl_shuttle: "Transporte",
    lbl_dress: "Vestimenta",
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
    map_hotel_desc: "Todas las rutas de este mapa empiezan aquí. Los traslados de la boda salen desde el lobby.",
    map_route: "De Taj The Trees a",
    map_distance: "Distancia",
    map_drive: "En coche",
    map_via: "Por",
    map_ferry: "ferry",
    map_shuttle: "Traslado desde el hotel a las",
    map_open_gmaps: "Abrir en Google Maps",
    map_open_directions: "Indicaciones paso a paso en Google Maps",
    map_note: "Geografía real, simplificada · los tiempos son típicos; el tráfico de Mumbai puede duplicarlos",
    map_sea: "Mar Arábigo",
    map_harbour: "Puerto de Mumbai",
    travel_survival_title: "Guía de Supervivencia",
    travel_survival_subtitle: "Consejos esenciales para nuestros amigos de Panamá y EE. UU.",

    // Home · celebrations + guides
    home_celebrations_kicker: "Cuatro Días en Mumbai",
    home_celebrations_title: "Las Celebraciones",
    home_celebrations_desc: "Cada día tiene su propia página: qué significa, cómo transcurre, qué ponerse y cómo llegar.",
    home_explore: "Explorar",
    guides_list_title: "Las Guías",
    day_label: "Día",

    // Celebration pages
    cel_switch_label: "Los cuatro días",
    cel_intro_kicker: "La Celebración",
    cel_intro_title: "La historia detrás",
    cel_tradition: "La tradición",
    cel_moments_kicker: "El recorrido",
    cel_moments_title: "Cómo transcurre el día",
    cel_expect_kicker: "Antes de ir",
    cel_expect_title: "Qué esperar",
    cel_vibe_title: "El ambiente",
    cel_dress_kicker: "Qué ponerse",
    cel_dress_title: "Guía de vestimenta",
    cel_dress_tips: "Notas de estilo",
    cel_inspo_title: "Inspiración de atuendos",
    cel_full_wardrobe: "Qué ponerse y dónde comprar",
    cel_glossary_kicker: "Un poco de vocabulario",
    cel_glossary_title: "Palabras que escucharás",
    cel_logistics_kicker: "Logística",
    cel_logistics_title: "Cómo llegar",
    cel_notes_title: "Bueno saberlo",
    cel_directions: "Direcciones desde el hotel",
    cel_tips_kicker: "De Pavitra y Ramón",
    cel_tips_title: "Consejos de los novios",
    cel_prev: "Anterior",
    cel_next: "Siguiente",
    cel_all: "Los cuatro días",
    lbl_date: "Fecha",
    lbl_when: "Cuándo",
    lbl_until: "hasta",

    // Wardrobe guide
    traditions_subtitle: "Para Nuestros Invitados",
    attire_title: "Qué Ponerse",
    attire_desc: "¿No sabes qué es una Lehenga o un Sherwani, ni dónde conseguirlos? Esta es tu hoja de trucos. Para el código de vestimenta de un día específico, visita la página de esa celebración.",
    attire_glance_title: "Código de vestimenta de un vistazo",
    attire_glance_desc: "Cuatro días, cuatro ambientes. Toca un día para ver la guía completa.",
    attire_day_guide: "Guía completa",
    attire_glossary_title: "Guía de Estilos de Ropa",
    attire_glossary_desc: "Los atuendos que verás toda la semana, explicados.",
    attire_women: "Mujeres",
    attire_men: "Hombres",
    traditions_perfect_for: "Perfecto para",
    traditions_shop_title: "Dónde Comprar",
    traditions_shop_desc: "Ya sea que prefieras ordenar en línea antes de tu viaje o experimentar la vibrante moda de Mumbai en persona, aquí están nuestras recomendaciones.",
    traditions_q_title: "¿Tienes preguntas?",
    traditions_q_desc: "No te preocupes por que todo sea perfecto. Lo más importante es tu presencia.",
    traditions_q_link: "Leer las preguntas",

    // Registry
    registry_kicker: "Regalos",
    registry_title: "Regalos",
    registry_desc: "Su asistencia y amor es todo lo que necesitamos, pero aquí hay algunas sugerencias si el boleto de avión a Mumbai no fue lo suficientemente caro:",
    registry_charity: "Si asistes a esta boda, es probable que hayas sido bendecido con oportunidades. Otros no son tan afortunados. Considere apoyar a Educate Girls Globally, una de las organizaciones benéficas educativas de mayor impacto en la India.",
    registry_donate: "Donar Ahora",
    registry_btc: "Si insistes en cuantificar tu amor por nosotros, puedes enviar Bitcoin a la siguiente billetera.",
    registry_show_btc: "Mostrar dirección de la billetera",
    registry_hide_btc: "Ocultar dirección",
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
    qna_title: "Preguntas",
    qna_subtitle: "Todo lo que necesitas saber para el gran viaje.",

    // Footer
    footer_msg: "Nos vemos en Mumbai"
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
