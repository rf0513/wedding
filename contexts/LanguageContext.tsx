import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
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
    home_hero_subtitle: "Celebrate with us",
    home_view_events: "View Schedule",
    home_scroll: "Scroll",
    home_quote: "\"As soon as I saw you, I knew an adventure was going to happen.\"",
    home_read_story: "Read Our Story",
    home_guide_ceremonies: "Guide to Ceremonies",
    home_guide_travel: "Mumbai Travel Guide",
    
    // Events (Now Schedule)
    events_subtitle: "The Schedule",
    events_title: "Wedding Schedule",
    events_desc: "Join us for a vibrant celebration of love across Mumbai's most beautiful venues.",
    events_shuttle: "Shuttle departs Taj The Trees at",
    events_map_title: "Event Map & Locations",
    events_map_subtitle: "Select a location to view details",
    events_viewing: "Currently Viewing",
    events_driving: "Driving Route From Hotel",
    event_dress_code_label: "Dress Code",

    // Travel
    travel_welcome: "Welcome to India",
    travel_title: "Mumbai Travel Guide",
    travel_desc: "Mumbai is a city of dreams, chaos, and incredible energy. For our international guests, we've curated a list of high-end spots to ensure your visit is comfortable, delicious, and memorable.",
    travel_sights: "Must-See Sights",
    travel_shopping: "Retail Therapy",
    travel_shopping_desc: "From upscale boutiques to the safest street market in town.",
    travel_food: "Culinary Gems",
    travel_food_desc: "Hygiene and flavor are our top priorities. These are world-class establishments perfect for a nice dinner out.",
    travel_visit_website: "Visit Website",
    travel_map_title: "Explore the Guide",
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
    traditions_see_examples: "See Examples",
    traditions_perfect_for: "Perfect For",
    traditions_shop_title: "Where to Shop",
    traditions_shop_desc: "Whether you prefer to order online before your trip or experience the vibrant fashion of Mumbai in person, here are our curated recommendations.",
    
    // Attire specific
    attire_by_event_title: "Dress Code by Event",
    attire_by_event_desc: "A quick guide on what to wear for each specific function.",
    attire_glossary_title: "Clothing Style Guide",
    attire_glossary_desc: "Unsure what a 'Lehenga' or 'Sherwani' is? Here is your cheat sheet.",
    attire_women: "Women",
    attire_men: "Men",

    // Registry
    registry_title: "Registry",
    registry_desc: "Your attendance and love is all we need, but here are some suggestions if the plane ticket to Mumbai was not expensive enough:",
    registry_donate: "Donate Now",
    registry_copy: "Copy Address",
    registry_copied: "Copied",
    
    // RSVP
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
    rsvp_lookup_title: "Find Your Invitation",
    rsvp_lookup_btn: "Find Invitation",
    rsvp_error_not_found: "We couldn't find your name. Please check the spelling or contact Pavitra & Ramon.",
    rsvp_welcome: "Welcome,",
    rsvp_party_of: "Seat Reserved",
    rsvp_party_of_2: "Plus One Available",
    rsvp_already_registered: "You have already responded!",
    rsvp_already_registered_msg: "If you need to change your response, please contact the couple directly.",
    rsvp_back_home: "Back to Home",

    // Q&A
    qna_title: "Frequently Asked Questions",
    qna_subtitle: "Everything you need to know for the big trip.",

    // Footer
    footer_msg: "See you in Mumbai!"
  },
  es: {
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
    home_hero_subtitle: "Celebra con nosotros",
    home_view_events: "Ver Itinerario",
    home_scroll: "Desplazar",
    home_quote: "\"Tan pronto como te vi, supe que una aventura estaba por suceder.\"",
    home_read_story: "Nuestra Historia",
    home_guide_ceremonies: "Guía de Ceremonias",
    home_guide_travel: "Guía de Mumbai",

    // Events (Now Schedule)
    events_subtitle: "El Itinerario",
    events_title: "Itinerario de la Boda",
    events_desc: "Únase a nosotros para una vibrante celebración del amor en los lugares más hermosos de Mumbai.",
    events_shuttle: "El transporte sale de Taj The Trees a las",
    events_map_title: "Mapa de Eventos",
    events_map_subtitle: "Selecciona una ubicación para ver detalles",
    events_viewing: "Viendo Actualmente",
    events_driving: "Ruta desde el Hotel",
    event_dress_code_label: "Código de Vestimenta",

    // Travel
    travel_welcome: "Bienvenidos a la India",
    travel_title: "Guía de Viaje a Mumbai",
    travel_desc: "Mumbai es una ciudad de sueños, caos y energía increíble. Para nuestros invitados internacionales, hemos seleccionado una lista de lugares exclusivos para asegurar que su visita sea cómoda, deliciosa y memorable.",
    travel_sights: "Lugares Imperdibles",
    travel_shopping: "Terapia de Compras",
    travel_shopping_desc: "Desde boutiques exclusivas hasta el mercado callejero más seguro de la ciudad.",
    travel_food: "Joyas Culinarias",
    travel_food_desc: "La higiene y el sabor son nuestras prioridades. Estos son establecimientos de clase mundial perfectos para una cena agradable.",
    travel_visit_website: "Visitar Sitio",
    travel_map_title: "Explorar la Guía",
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
    traditions_see_examples: "Ver Ejemplos",
    traditions_perfect_for: "Perfecto Para",
    traditions_shop_title: "Dónde Comprar",
    traditions_shop_desc: "Ya sea que prefieras ordenar en línea antes de tu viaje o experimentar la vibrante moda de Mumbai en persona, aquí están nuestras recomendaciones.",

    // Attire specific
    attire_by_event_title: "Código de Vestimenta",
    attire_by_event_desc: "Una guía rápida sobre qué usar para cada función específica.",
    attire_glossary_title: "Guía de Estilos de Ropa",
    attire_glossary_desc: "¿No estás seguro de qué es un 'Lehenga' o 'Sherwani'? Aquí está tu hoja de trucos.",
    attire_women: "Mujeres",
    attire_men: "Hombres",

    // Registry
    registry_title: "Regalos",
    registry_desc: "Su asistencia y amor es todo lo que necesitamos, pero aquí hay algunas sugerencias si el boleto de avión a Mumbai no fue lo suficientemente caro:",
    registry_donate: "Donar Ahora",
    registry_copy: "Copiar Dirección",
    registry_copied: "Copiado",

    // RSVP
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
    rsvp_lookup_title: "Encuentra tu Invitación",
    rsvp_lookup_btn: "Buscar Invitación",
    rsvp_error_not_found: "No pudimos encontrar tu nombre. Por favor verifica la ortografía o contacta a Pavitra y Ramón.",
    rsvp_welcome: "Bienvenido,",
    rsvp_party_of: "Asiento Reservado",
    rsvp_party_of_2: "Acompañante Disponible",
    rsvp_already_registered: "¡Ya has respondido!",
    rsvp_already_registered_msg: "Si necesitas cambiar tu respuesta, por favor contacta a la pareja directamente.",
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