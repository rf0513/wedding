import { WeddingEvent, RegistryItem, WeddingCustom, AttireItem, Guest, FAQItem, EventDressCode } from './types';

export const WEDDING_DATA = {
  couple: {
    partner1: "Pavitra Kanse",
    partner2: "Ramon Feliu",
    hashtag: "#PR27"
  },
  date: "February 2nd - 5th, 2027",
  location: {
    city: "Mumbai, India",
    venue: "Various Locations"
  },
  story: ``,
  travelInfo: "Fly into Chhatrapati Shivaji Maharaj International Airport (BOM). We recommend staying at Taj The Trees, Mumbai. Ubers and local taxis are readily available."
};

// MOCK GUEST DATABASE
export const GUEST_LIST: Guest[] = [
  {
    id: '1',
    firstName: 'Ramon',
    lastName: 'Feliu',
    hasPlusOne: true,
    hasRSVPd: false
  },
  // Add more guests here later
];

// FAQS
export const FAQ_EN: FAQItem[] = [
  {
    id: 'logistics',
    question: "Where should I fly into and stay?",
    answer: "Fly into Chhatrapati Shivaji Maharaj International Airport (BOM). We strongly recommend staying at <a href='https://www.tajhotels.com/en-in/hotels/taj-the-trees' target='_blank' rel='noopener noreferrer' class='text-wedding-rani font-bold hover:underline'>Taj The Trees</a> in Vikhroli, Mumbai. We will provide transportation from this hotel to all wedding events."
  },
  {
    id: 'visa',
    question: "Do I need a visa for India?",
    answer: "Yes, most international travelers need a visa. We strongly recommend applying for an e-Visa online at least 4 weeks before your trip. It is usually a straightforward digital process."
  },
  {
    id: 'money',
    question: "What about money and credit cards?",
    answer: "Most places accept Visa and Mastercard, but American Express and Discover may have acceptance issues. We recommend carrying some cash (Rupees) for small shops and tips. You can exchange currency at the airport upon arrival. The current exchange rate is roughly 1 USD ≈ 83 INR. Tipping 10% is customary at restaurants."
  },
  {
    id: 'phone',
    question: "How do I get phone data in India?",
    answer: "We recommend downloading the <a href='https://www.airalo.com/india-esim' target='_blank' rel='noopener noreferrer' class='text-wedding-rani font-bold hover:underline'>Airalo</a> app for an e-SIM. It is the easiest way to get 5G data. It costs around $20 for 10GB (valid for 7 days)."
  },
  {
    id: 'weather',
    question: "What is the weather like in Mumbai in February?",
    answer: "It is the best time of year! Expect warm days (around 28°C / 82°F) and pleasant, breezy evenings (around 23°C / 73°F). Sunrise is at 7 AM and Sunset at 6:45 PM. February should be dry without rain."
  },
  {
    id: 'food',
    question: "Will the food be too spicy?",
    answer: "We have curated the menu to cater to international palates. There will be plenty of mild options, and we'll label spicy dishes clearly. Safe, bottled water will be available everywhere."
  },
  {
    id: 'dress',
    question: "What should I wear?",
    answer: "You should plan on having three different outfits. Please check out our detailed guide on the <a href='#/traditions?tab=attire' class='text-wedding-rani font-bold hover:underline'>Ceremonies & Attire</a> page. In general, think bright, colorful, and modest. For the Vows & Sangeet, Western formal wear is perfectly fine."
  },
  {
    id: 'transport',
    question: "How do I get around?",
    answer: "Uber is the safest and easiest way to travel within Mumbai. We will also provide shuttles from Taj The Trees to all wedding events."
  }
];

export const FAQ_ES: FAQItem[] = [
  {
    id: 'logistics',
    question: "¿A dónde debo volar y dónde debo alojarme?",
    answer: "Vuele al Aeropuerto Internacional Chhatrapati Shivaji Maharaj (BOM). Recomendamos encarecidamente alojarse en <a href='https://www.tajhotels.com/en-in/hotels/taj-the-trees' target='_blank' rel='noopener noreferrer' class='text-wedding-rani font-bold hover:underline'>Taj The Trees</a> en Vikhroli, Mumbai. Proporcionaremos transporte desde este hotel a todos los eventos de la boda."
  },
  {
    id: 'visa',
    question: "¿Necesito visa para la India?",
    answer: "Sí, la mayoría de los viajeros internacionales necesitan visa. Recomendamos encarecidamente solicitar una e-Visa en línea al menos 3 semanas antes de su viaje. Es un proceso digital sencillo."
  },
  {
    id: 'money',
    question: "¿Qué pasa con el dinero y las tarjetas de crédito?",
    answer: "La mayoría de los lugares aceptan Visa y Mastercard, pero American Express y Discover pueden tener problemas de aceptación. Recomendamos llevar algo de efectivo (Rupias) para tiendas pequeñas y propinas. Puede cambiar moneda en el aeropuerto a su llegada. El tipo de cambio actual es de aproximadamente 1 USD ≈ 83 INR. Es costumbre dejar una propina del 10% en los restaurantes."
  },
  {
    id: 'phone',
    question: "¿Cómo obtengo datos para mi teléfono?",
    answer: "Recomendamos descargar la aplicación <a href='https://www.airalo.com/india-esim' target='_blank' rel='noopener noreferrer' class='text-wedding-rani font-bold hover:underline'>Airalo</a> para obtener una e-SIM. Es la forma más fácil de obtener datos 5G. Cuesta alrededor de $20 por 10GB (válido por 7 días)."
  },
  {
    id: 'weather',
    question: "¿Cómo es el clima en Mumbai en febrero?",
    answer: "¡Es la mejor época del año! Espere días cálidos (alrededor de 28°C) y noches agradables y ventosas (alrededor de 18°C). Probablemente no necesite una chaqueta pesada, tal vez solo un chal ligero para la noche."
  },
  {
    id: 'food',
    question: "¿La comida será muy picante?",
    answer: "Hemos seleccionado el menú para satisfacer los paladares internacionales. Habrá muchas opciones suaves y etiquetaremos claramente los platos picantes. Habrá agua embotellada segura disponible en todas partes."
  },
  {
    id: 'dress',
    question: "¿Qué debo usar?",
    answer: "Deberías planificar tres atuendos diferentes. Consulta nuestra guía detallada en la página de <a href='#/traditions?tab=attire' class='text-wedding-rani font-bold hover:underline'>Ceremonias y Vestimenta</a>. En general, piense en colores brillantes y modestos. Para la recepción, la vestimenta formal occidental está perfectamente bien."
  },
  {
    id: 'transport',
    question: "¿Cómo me muevo por la ciudad?",
    answer: "Uber es la forma más segura y fácil de viajar dentro de Mumbai. También proporcionaremos transporte desde Taj The Trees a todos los eventos de la boda."
  }
];

// ENGLISH EVENTS
export const EVENTS_EN: WeddingEvent[] = [
  {
    id: '1',
    title: 'Mehendi (Henna)',
    date: 'Feb 02',
    time: '11:00 AM',
    location: 'Thapar Suburbia',
    address: '4th Floor, Chembur, Mumbai',
    description: 'A relaxed start to the festivities with intricate henna designs, music, and light bites.',
    dressCode: 'Vibrant & Colorful',
    iconName: 'art',
    shuttleTime: '10:30 AM'
  },
  {
    id: '2',
    title: 'Haldi Ceremony',
    date: 'Feb 03',
    time: '1:00 PM',
    location: 'Thapar Suburbia',
    address: '4th Floor, Chembur, Mumbai',
    description: 'The traditional turmeric ceremony. Get ready to get messy and glow!',
    dressCode: 'Bright Yellows and Oranges',
    iconName: 'art',
    shuttleTime: '12:30 PM'
  },
  {
    id: '3',
    title: 'Vows & Sangeet',
    date: 'Feb 04',
    time: '5:00 PM',
    location: 'Turf Lawn and Banquet',
    address: 'Mahalaxmi Race Course, Mumbai',
    description: 'We exchange our vows followed by a musical evening of dance and celebration.',
    dressCode: 'Glamorous Indo-Western Style',
    iconName: 'dance',
    shuttleTime: '4:30 PM'
  },
  {
    id: '4',
    title: 'Wedding & Reception',
    date: 'Feb 05',
    time: '4:30 PM',
    location: 'Mumbai Cricket Association Club',
    address: 'Bandra Kurla Complex (BKC), Mumbai',
    description: 'The traditional Maharashtrian wedding ceremony followed by a grand reception dinner.',
    dressCode: 'Traditional Indian or Formal Western',
    iconName: 'ring',
    shuttleTime: '4:00 PM'
  }
];

// SPANISH EVENTS
export const EVENTS_ES: WeddingEvent[] = [
  {
    id: '1',
    title: 'Mehendi (Henna)',
    date: 'Feb 02',
    time: '11:00 AM',
    location: 'Thapar Suburbia',
    address: '4th Floor, Chembur, Mumbai',
    description: 'Un comienzo relajado de las festividades con diseños intrincados de henna, música y bocadillos.',
    dressCode: 'Vibrante y Colorido',
    iconName: 'art',
    shuttleTime: '10:30 AM'
  },
  {
    id: '2',
    title: 'Ceremonia Haldi',
    date: 'Feb 03',
    time: '1:00 PM',
    location: 'Thapar Suburbia',
    address: '4th Floor, Chembur, Mumbai',
    description: 'La tradicional ceremonia de la cúrcuma. ¡Prepárate para ensuciarte y brillar!',
    dressCode: 'Amarillos y Naranjas brillantes',
    iconName: 'art',
    shuttleTime: '12:30 PM'
  },
  {
    id: '3',
    title: 'Votos y Sangeet',
    date: 'Feb 04',
    time: '5:00 PM',
    location: 'Turf Lawn and Banquet',
    address: 'Mahalaxmi Race Course, Mumbai',
    description: 'Intercambiamos nuestros votos seguidos de una noche musical de baile y celebración.',
    dressCode: 'Estilo Indo-Occidental glamoroso',
    iconName: 'dance',
    shuttleTime: '4:30 PM'
  },
  {
    id: '4',
    title: 'Boda y Recepción',
    date: 'Feb 05',
    time: '4:30 PM',
    location: 'Mumbai Cricket Association Club',
    address: 'Bandra Kurla Complex (BKC), Mumbai',
    description: 'La ceremonia de boda tradicional Maharashtriana seguida de una gran cena de recepción.',
    dressCode: 'Indio Tradicional u Occidental Formal',
    iconName: 'ring',
    shuttleTime: '4:00 PM'
  }
];

// Default export for backward compatibility if needed, though pages should switch
export const EVENTS = EVENTS_EN;

export const REGISTRY_ITEMS_EN: RegistryItem[] = [
  {
    id: 'charity',
    store: 'Educate Girls Globally',
    link: 'https://www.educategirls.org/',
    description: 'If you are attending this wedding, it is likely you have been blessed with opportunities. Others are not as fortunate. Consider supporting Educate Girls Globally, one of the most rigorously measured and impactful education charities in India.',
    imageUrl: 'https://www.educategirls.ngo/wp-content/uploads/2024/10/Educate-Girls-6.jpg'
  },
  {
    id: 'btc',
    store: 'Bitcoin',
    link: 'bc1qh0z7g3ttt5mx4ey0a0qxx2l6qj8pl5xg6cx35d',
    description: 'If you insist of quantifying your love to us, you can send Bitcoin to the wallet below.',
    imageUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&q=80&w=800'
  }
];

export const REGISTRY_ITEMS_ES: RegistryItem[] = [
  {
    id: 'charity',
    store: 'Educate Girls Globally',
    link: 'https://www.educategirls.org/',
    description: 'Si asistes a esta boda, es probable que hayas sido bendecido con oportunidades. Otros no son tan afortunados. Considere apoyar a Educate Girls Globally, una de las organizaciones benéficas educativas de mayor impacto en la India.',
    imageUrl: 'https://www.educategirls.ngo/wp-content/uploads/2024/10/Educate-Girls-6.jpg'
  },
  {
    id: 'btc',
    store: 'Bitcoin',
    link: 'bc1qh0z7g3ttt5mx4ey0a0qxx2l6qj8pl5xg6cx35d',
    description: 'Si insistes en cuantificar tu amor por nosotros, puedes enviar Bitcoin a la siguiente billetera.',
    imageUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&q=80&w=800'
  }
];

export const REGISTRY_ITEMS = REGISTRY_ITEMS_EN;

export const EVENT_DRESS_CODES_EN: EventDressCode[] = [
  {
    id: 'mehendi',
    title: 'Mehendi',
    theme: 'Vibrant & Colorful',
    description: 'Fun, casual, and festive. Sleeveless or short sleeves are recommended for women getting henna.',
    options: {
        women: "Bright Anarkali, Lehenga, or Maxi Dress. Floral prints work great.",
        men: "" // Men are not required to attend
    },
    colorPalette: ['#E91E63', '#9C27B0', '#00BCD4', '#8BC34A'] // Pink, Purple, Blue, Green
  },
  {
    id: 'haldi',
    title: 'Haldi',
    theme: 'Shades of Yellow & Orange',
    description: 'Simple, breathable, and ready to get messy. Yellow or Orange is the color of the day.',
    options: {
        women: "Yellow/Orange Kurta Set, Cotton Saree, or Sundress. Avoid expensive silks as they may get stained.",
        men: "Yellow/Orange Kurta (Cotton/Linen) or White Shirt. Jeans/Chinos are okay."
    },
    colorPalette: ['#FBC02D', '#FFB300', '#FFF176', '#FF9800'] // Yellows & Orange
  },
  {
    id: 'sangeet',
    title: 'Vows & Sangeet',
    theme: 'Glitz, Glamour & Indo-Western',
    description: 'A night of dancing and performance. Wear something that sparkles and is easy to move in.',
    options: {
        women: "Lehenga Choli, Embroidered Anarkali, or Evening Gown.",
        men: "Bandhgala Jacket, Sherwani, or a Formal Suit (No tie needed)."
    },
    colorPalette: ['#1A237E', '#311B92', '#880E4F', '#FFD700'] // Midnight Blue, Deep Purple, Burgundy, Gold
  },
  {
    id: 'wedding',
    title: 'Wedding & Reception',
    theme: 'Traditional Indian',
    description: 'Regal and respectful. This is the main religious ceremony. Modest attire is appreciated.',
    options: {
        women: "Silk Saree (Paithani/Kanjeevaram) or Heavy Traditional Suit.",
        men: "Sherwani, Kurta with Nehru Jacket, or Formal Suit."
    },
    colorPalette: ['#B71C1C', '#1B5E20', '#E65100', '#FFD700'] // Red, Green, Orange, Gold
  }
];

export const EVENT_DRESS_CODES_ES: EventDressCode[] = [
  {
    id: 'mehendi',
    title: 'Mehendi',
    theme: 'Vibrante y Colorido',
    description: 'Divertido, casual y festivo. Se recomiendan mangas cortas o sin mangas para las mujeres que se ponen henna.',
    options: {
        women: "Anarkali brillante, Lehenga o vestido largo. Los estampados florales funcionan muy bien.",
        men: "" // No aplica para hombres
    },
    colorPalette: ['#E91E63', '#9C27B0', '#00BCD4', '#8BC34A']
  },
  {
    id: 'haldi',
    title: 'Haldi',
    theme: 'Tonos de Amarillo y Naranja',
    description: 'Sencillo, transpirable y listo para ensuciarse. El amarillo o naranja es el color del día.',
    options: {
        women: "Conjunto Kurta amarillo/naranja, sari de algodón o vestido de verano. Evita sedas caras, ya que pueden mancharse.",
        men: "Kurta amarilla/naranja (algodón/lino) o camisa blanca. Jeans/Chinos están bien."
    },
    colorPalette: ['#FBC02D', '#FFB300', '#FFF176', '#FF9800']
  },
  {
    id: 'sangeet',
    title: 'Votos y Sangeet',
    theme: 'Brillo, Glamour e Indo-Occidental',
    description: 'Una noche de baile y espectáculo. Ponte algo que brille y sea fácil de mover.',
    options: {
        women: "Lehenga Choli, Anarkali bordado o vestido de noche.",
        men: "Chaqueta Bandhgala, Sherwani o traje formal (no se necesita corbata)."
    },
    colorPalette: ['#1A237E', '#311B92', '#880E4F', '#FFD700']
  },
  {
    id: 'wedding',
    title: 'Boda y Recepción',
    theme: 'Indio Tradicional',
    description: 'Regio y respetuoso. Esta es la principal ceremonia religiosa. Se agradece vestimenta modesta.',
    options: {
        women: "Sari de seda (Paithani/Kanjeevaram) o traje tradicional pesado.",
        men: "Sherwani, Kurta con chaqueta Nehru o traje formal."
    },
    colorPalette: ['#B71C1C', '#1B5E20', '#E65100', '#FFD700']
  }
];

export const WEDDING_CUSTOMS_EN: WeddingCustom[] = [
  {
    id: 'mehendi',
    title: 'The Mehendi (Ladies Only)',
    marathiTitle: 'Mehendi',
    significance: 'Henna is applied to the bride’s hands and feet in intricate designs. Folklore says the darker the henna stain, the more love the bride will receive from her husband and in-laws.',
    whatToWear: 'Colorful, comfortable clothing. Sleeveless or short sleeves are practical if you plan to get a small henna design done on your hands.',
    whatToExpect: 'A relaxed afternoon of art and music. Guests can get small henna designs applied by professional artists while enjoying snacks and music.',
    imageUrl: 'https://images.unsplash.com/photo-1505932794465-147d1f1b2c97?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'haldi',
    title: 'The Haldi Ceremony',
    marathiTitle: 'Halad Chadavne',
    significance: 'Turmeric paste is applied to the bride and groom to ward off evil spirits and provide a natural glow. It marks the beginning of the wedding rituals and signifies purification.',
    whatToWear: 'Yellow or Orange attire is traditional. Choose simple clothes (cotton kurtas or sundresses) that you do not mind getting stained with turmeric paste.',
    whatToExpect: 'A fun, messy, and high-energy event! Family members will smear turmeric paste on the couple (and often each other). Expect dhol (drums) and dancing.',
    imageUrl: 'https://cdn.shopify.com/s/files/1/1206/7410/files/C_J_-_Top_7_myths_of_Turmeric_debunked.jpg?v=1557222010'
  },
  {
    id: 'sangeet',
    title: 'The Sangeet',
    marathiTitle: 'Sangeet',
    significance: 'Literally translating to "Sung Together", this is a musical party designed to break the ice between the two families. It is a celebration of union through dance and song.',
    whatToWear: 'This is the time to sparkle! Glamorous Indian wear (Lehengas, Sherwanis) or formal Cocktail attire. Bring your dancing shoes.',
    whatToExpect: 'Choreographed dance performances by friends and family, followed by an open dance floor with a mix of Bollywood, Latin, and Pop hits.',
    imageUrl: 'https://i.ytimg.com/vi/Wy6CTfiQQgk/maxresdefault.jpg'
  },
  {
    id: 'wedding',
    title: 'The Wedding Ceremony',
    marathiTitle: 'Lagna',
    significance: 'Deeply rooted in Vedic traditions, this ceremony views marriage as a sacred bond ("Vivah") ordained by cosmic laws. The primary witness is Agni (the Sacred Fire). Through the Saptapadi ritual around the fire, the couple commits to seven vows of mutual respect, dharma (righteousness), and enduring friendship, seeking blessings from the Divine and their ancestors.',
    whatToWear: 'Traditional Indian Saree (Paithani styles are local to the region), Kurta Pajama, or a Formal Western Suit. Modest attire is appreciated for the ceremony.',
    whatToExpect: 'Conducted in Sanskrit, key moments include the "Antarpat" (silk curtain) and "Mangalashtak" chants. The couple wears "Mundavalya" (pearl forehead strings) symbolizing togetherness, and the bride wears green glass bangles for prosperity. Guests shower the couple with "Akshata" (rice) as blessings.',
    imageUrl: 'https://images.unsplash.com/photo-1597157639073-69284dc0fdaf?q=80&w=800&auto=format&fit=crop'
  }
];

export const WEDDING_CUSTOMS_ES: WeddingCustom[] = [
  {
    id: 'mehendi',
    title: 'El Mehendi (Solo Damas)',
    marathiTitle: 'Mehendi',
    significance: 'La henna se aplica en las manos y pies de la novia en diseños intrincados. El folclore dice que cuanto más oscura es la mancha de henna, más amor recibirá la novia de su esposo y sus suegros.',
    whatToWear: 'Ropa colorida y cómoda. Sin mangas o mangas cortas es práctico si planeas hacerte un pequeño diseño de henna en las manos.',
    whatToExpect: 'Una tarde relajada de arte y música. Los invitados pueden hacerse pequeños diseños de henna aplicados por artistas profesionales mientras disfrutan de bocadillos y música.',
    imageUrl: 'https://images.unsplash.com/photo-1505932794465-147d1f1b2c97?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'haldi',
    title: 'La Ceremonia Haldi',
    marathiTitle: 'Halad Chadavne',
    significance: 'Se aplica pasta de cúrcuma a los novios para alejar los malos espíritus y dar un brillo natural. Marca el comienzo de los rituales de boda y significa purificación.',
    whatToWear: 'La vestimenta amarilla o naranja es tradicional. Elija ropa sencilla (kurtas de algodón o vestidos de verano) que no le importe manchar con pasta de cúrcuma.',
    whatToExpect: '¡Un evento divertido, desordenado y de alta energía! Los familiares untarán pasta de cúrcuma a la pareja (y a menudo entre ellos). Espera dhol (tambores) y baile.',
    imageUrl: 'https://cdn.shopify.com/s/files/1/1206/7410/files/C_J_-_Top_7_myths_of_Turmeric_debunked.jpg?v=1557222010'
  },
  {
    id: 'sangeet',
    title: 'El Sangeet',
    marathiTitle: 'Sangeet',
    significance: 'Traduciéndose literalmente como "Cantado Juntos", es una fiesta musical diseñada para romper el hielo entre las dos familias. Es una celebración de la unión a través del baile y la canción.',
    whatToWear: '¡Es el momento de brillar! Ropa india glamorosa (Lehengas, Sherwanis) o vestimenta formal de cóctel. Trae tus zapatos de baile.',
    whatToExpect: 'Actuaciones de baile coreografiadas por amigos y familiares, seguidas de una pista de baile abierta con una mezcla de éxitos de Bollywood, latinos y pop.',
    imageUrl: 'https://i.ytimg.com/vi/Wy6CTfiQQgk/maxresdefault.jpg'
  },
  {
    id: 'wedding',
    title: 'La Ceremonia de Boda',
    marathiTitle: 'Lagna',
    significance: 'Arraigada en las tradiciones védicas, esta ceremonia ve el matrimonio como un vínculo sagrado ("Vivah"). El testigo principal es Agni (el Fuego Sagrado). A través del ritual Saptapadi alrededor del fuego, la pareja se compromete con siete votos de respeto mutuo, dharma (rectitud) y amistad duradera.',
    whatToWear: 'Sari indio tradicional (los estilos Paithani son locales de la región), Kurta Pajama o un traje occidental formal. Se agradece vestimenta modesta para la ceremonia.',
    whatToExpect: 'Conducido en sánscrito, los momentos clave incluyen el "Antarpat" (cortina de seda). La pareja usa "Mundavalya" (hilos de perlas) que simbolizan la unión, y la novia usa brazaletes de vidrio verde para la prosperidad. Los invitados rocían a la pareja con "Akshata" (arroz) como bendición.',
    imageUrl: 'https://images.unsplash.com/photo-1597157639073-69284dc0fdaf?q=80&w=800&auto=format&fit=crop'
  }
];

export const ATTIRE_GUIDE_EN: AttireItem[] = [
  {
    id: 'yellow-kurta',
    name: 'Kurta Set',
    pronunciation: 'Kur-ta',
    gender: 'Women',
    description: 'A comfortable, lightweight tunic worn with pants or leggings. Yellow or Orange is the traditional color for the Haldi ceremony as it signifies purity and glow.',
    bestFor: ['Haldi'],
    imageUrl: 'https://raw.githubusercontent.com/rf0513/pavitra-and-ramon-wedding/main/yellow-kurta.png' 
  },
  {
    id: 'lehenga',
    name: 'Lehenga Choli',
    pronunciation: 'Leh-hen-gah',
    gender: 'Women',
    description: 'A three-piece outfit consisting of a long, full skirt (Lehenga), a fitted blouse (Choli), and a scarf drape (Dupatta). They can be simple or heavily embroidered.',
    bestFor: ['Vows & Sangeet', 'Wedding & Reception'],
    imageUrl: 'https://images.pexels.com/photos/27155546/pexels-photo-27155546.jpeg'
  },
  {
    id: 'saree',
    name: 'Saree',
    pronunciation: 'Saa-ree',
    gender: 'Women',
    description: 'A long drape of fabric (usually 6-9 yards) wrapped around the waist and draped over the shoulder, worn over a petticoat and a blouse. For our wedding, "Paithani" silk sarees are the local favorite.',
    bestFor: ['Wedding & Reception'],
    imageUrl: 'https://images.pexels.com/photos/9418783/pexels-photo-9418783.jpeg'
  },
  {
    id: 'kurta',
    name: 'Kurta Pajama',
    pronunciation: 'Kur-ta Pa-ja-ma',
    gender: 'Men',
    description: 'A loose, collarless shirt (Kurta) falling below the knees, worn with lightweight trousers (Pajama). It is comfortable and perfect for daytime events.',
    bestFor: ['Haldi', 'Mehendi'],
    imageUrl: 'https://manyavar.scene7.com/is/image/manyavar/SDES1295-328-Mustard-401_02-12-2025-14-48:650x900'
  },
  {
    id: 'sherwani',
    name: 'Sherwani',
    pronunciation: 'Sher-va-nee',
    gender: 'Men',
    description: 'A coat-like garment worn over a kurta, usually made of heavier fabric like silk or wool with lining. It is the equivalent of a tuxedo in Indian formal wear.',
    bestFor: ['Wedding & Reception'],
    imageUrl: 'https://manyavar.scene7.com/is/image/manyavar/I02_O951D504-333_03_04-04-2022-21-00:650x900?&dpr=on,2'
  },
  {
    id: 'anarkali',
    name: 'Anarkali',
    pronunciation: 'Ah-nar-ka-lee',
    gender: 'Women',
    description: 'A long, frock-style top that flares out from the waist, worn with slim pants. It is essentially a very elegant dress and is comfortable for dancing.',
    bestFor: ['Mehendi', 'Vows & Sangeet'],
    imageUrl: 'https://images.cbazaar.com/images/faux-georgette-embroidered-anarkali-suit-slswe301032ra-u.jpg'
  },
  {
    id: 'bandhgala',
    name: 'Bandhgala / Jodhpuri',
    pronunciation: 'Band-ga-la',
    gender: 'Men',
    description: 'A formal evening suit featuring a coat with a standing collar (Nehru collar). It looks sharp, modern, and is a great alternative to a western suit.',
    bestFor: ['Vows & Sangeet', 'Wedding & Reception'],
    imageUrl: 'https://manyavar.scene7.com/is/image/manyavar/8905100475357.23637_19-05-2023-10-17:650x900?&dpr=on,2'
  }
];

export const ATTIRE_GUIDE_ES: AttireItem[] = [
  {
    id: 'yellow-kurta',
    name: 'Kurta',
    pronunciation: 'Kur-ta',
    gender: 'Women',
    description: 'Una túnica cómoda y ligera que se usa con pantalones o leggings. El amarillo o naranja es el color tradicional de la ceremonia Haldi, ya que significa pureza y brillo.',
    bestFor: ['Haldi'],
    imageUrl: 'https://raw.githubusercontent.com/rf0513/pavitra-and-ramon-wedding/main/yellow-kurta.png' 
  },
  {
    id: 'lehenga',
    name: 'Lehenga Choli',
    pronunciation: 'Leh-hen-gah',
    gender: 'Women',
    description: 'Un traje de tres piezas que consta de una falda larga y amplia (Lehenga), una blusa ajustada (Choli) y una bufanda drapeada (Dupatta). Pueden ser simples o muy bordados.',
    bestFor: ['Votos y Sangeet', 'Boda y Recepción'],
    imageUrl: 'https://images.pexels.com/photos/27155546/pexels-photo-27155546.jpeg'
  },
  {
    id: 'saree',
    name: 'Sari',
    pronunciation: 'Saa-ree',
    gender: 'Women',
    description: 'Una larga tela (generalmente 6-9 yardas) envuelta alrededor de la cintura y drapeada sobre el hombro, usada sobre una enagua y una blusa. Para nuestra boda, los saris de seda "Paithani" son los favoritos locales.',
    bestFor: ['Boda y Recepción'],
    imageUrl: 'https://images.pexels.com/photos/9418783/pexels-photo-9418783.jpeg'
  },
  {
    id: 'kurta',
    name: 'Kurta Pajama',
    pronunciation: 'Kur-ta Pa-ja-ma',
    gender: 'Men',
    description: 'Una camisa suelta y sin cuello (Kurta) que cae por debajo de las rodillas, usada con pantalones ligeros (Pajama). Es cómodo y perfecto para eventos diurnos.',
    bestFor: ['Haldi', 'Mehendi'],
    imageUrl: 'https://manyavar.scene7.com/is/image/manyavar/SDES1295-328-Mustard-401_02-12-2025-14-48:650x900'
  },
  {
    id: 'sherwani',
    name: 'Sherwani',
    pronunciation: 'Sher-va-nee',
    gender: 'Men',
    description: 'Una prenda similar a un abrigo que se usa sobre una kurta, generalmente hecha de tela más pesada como seda o lana con forro. Es el equivalente a un esmoquin en la vestimenta formal india.',
    bestFor: ['Boda y Recepción'],
    imageUrl: 'https://manyavar.scene7.com/is/image/manyavar/I02_O951D504-333_03_04-04-2022-21-00:650x900?&dpr=on,2'
  },
  {
    id: 'anarkali',
    name: 'Anarkali',
    pronunciation: 'Ah-nar-ka-lee',
    gender: 'Women',
    description: 'Un top largo estilo vestido que se ensancha desde la cintura, usado con pantalones ajustados. Es esencialmente un vestido muy elegante y es cómodo para bailar.',
    bestFor: ['Mehendi', 'Votos y Sangeet'],
    imageUrl: 'https://images.cbazaar.com/images/faux-georgette-embroidered-anarkali-suit-slswe301032ra-u.jpg'
  },
  {
    id: 'bandhgala',
    name: 'Bandhgala / Jodhpuri',
    pronunciation: 'Band-ga-la',
    gender: 'Men',
    description: 'Un traje de noche formal que presenta un abrigo con cuello alto (cuello Nehru). Se ve elegante, moderno y es una gran alternativa a un traje occidental.',
    bestFor: ['Votos y Sangeet', 'Boda y Recepción'],
    imageUrl: 'https://manyavar.scene7.com/is/image/manyavar/8905100475357.23637_19-05-2023-10-17:650x900?&dpr=on,2'
  }
];

export const ATTIRE_GUIDE = ATTIRE_GUIDE_EN;