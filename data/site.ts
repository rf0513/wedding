import type { ConfirmedGuest, DayPlan, DressCode, Garment, Localized, Milestone, Spot, Trip } from '../types';

// Photos live in the public photo repo. Add a file there and reference it here.
export const PHOTO = (file: string) => `${import.meta.env.BASE_URL}photos/${file}`;

export const SITE = {
  bride: 'Pavitra',
  groom: 'Ramon',
  brideFull: 'Pavitra Kanse',
  groomFull: 'Ramon Feliu',
  hashtag: '#PR27',
  city: 'Mumbai',
  dates: { en: '2 – 5 February 2027', es: '2 – 5 de febrero de 2027' },
  hotel: {
    name: 'Taj The Trees',
    area: 'Vikhroli, Mumbai',
    query: 'Taj The Trees, Vikhroli, Mumbai',
    url: 'https://www.tajhotels.com/en-in/hotels/taj-the-trees',
  },
  airport: { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj International Airport' },
  rsvpDeadline: '2026-12-15',
  // Where "Tell us you're coming" submissions go.
  // Option A (recommended): paste a Formspree / Getform / Google Apps Script endpoint here and the form POSTs JSON to it.
  // Option B (default): leave empty and the form opens the guest's mail app with everything filled in, addressed to rsvpEmail.
  formEndpoint: '',
  rsvpEmail: 'rayfeliu@gmail.com',
  btcAddress: 'bc1qh0z7g3ttt5mx4ey0a0qxx2l6qj8pl5xg6cx35d',
  charity: { name: 'Educate Girls Globally', url: 'https://www.educategirls.org/' },
  visaUrl: 'https://indianvisaonline.gov.in/evisa/tvoa.html',
  esimUrl: 'https://www.airalo.com/india-esim',
};

export const HERO_PHOTO = { src: PHOTO('engagement-hug.jpg'), pos: 'center 38%' };
export const STORY_PHOTO = { src: PHOTO('engagement-hands.jpg'), pos: 'center 40%' };

// People who have said yes and are happy to be shown. First name + city only. Update by hand as confirmations come in.
export const CONFIRMED: ConfirmedGuest[] = [
  { name: 'Pavitra', city: 'Bay Area' },
  { name: 'Ramon', city: 'Bay Area' },
];

const mapsUrl = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
export const MAPS = mapsUrl;

const VENUES = {
  thapar: { name: 'Thapar Suburbia', area: 'Chembur', query: 'Thapar Suburbia, Chembur, Mumbai' },
  race: { name: 'Turf Lawn, Mahalaxmi Race Course', area: 'Mahalaxmi', query: 'Mahalaxmi Race Course, Mumbai' },
  mca: { name: 'MCA Club', area: 'Bandra Kurla Complex', query: 'Mumbai Cricket Association Club, BKC, Mumbai' },
  hotel: { name: SITE.hotel.name, area: SITE.hotel.area, query: SITE.hotel.query },
};

const PAL = {
  d0: ['#1F6E8C', '#67B7D1', '#F2A900', '#FFF8EE'],
  d1: ['#2F7D5B', '#8BC34A', '#E91E63', '#00BCD4'],
  d2: ['#F2A900', '#FFB300', '#FFF176', '#FF9800'],
  d3: ['#3B1A78', '#B5177A', '#1A237E', '#FFD700'],
  d4: ['#C62828', '#1B5E20', '#E65100', '#FFD700'],
  d5: ['#E07A5F', '#F2A900', '#1F6E8C', '#FFF8EE'],
};

// ────────────────────────────── THE DAYS ──────────────────────────────
export const DAYS: Localized<DayPlan[]> = {
  en: [
    {
      id: 'd0', date: '2027-02-01', dayNum: '1', monthShort: 'Feb', tentative: true, palette: PAL.d0,
      venue: VENUES.hotel,
      name: 'Land. Shop. Eat.',
      hook: 'Day zero: we take you dress shopping, then feed you.',
      trailer: 'You walk out of the airport at 2am into warm air that smells like the sea and diesel and jasmine. Someone is holding a sign with your name. Sleep. Then we go shopping.',
      what: 'Most flights from the US and Panama land in the small hours. A car will be waiting for you. Sleep in. Late morning we take everyone who wants to come to buy their outfits for the week, with people who know where to go. In the evening we all eat together at the hotel for the first time.',
      timeline: [
        { t: 'Night', title: 'You land', desc: 'A driver meets you past customs and takes you to Taj The Trees. About 40 minutes.' },
        { t: '11:00', title: 'Dress shopping run', desc: 'We leave from the lobby together. Kurtas, sarees, lehengas, sherwanis. Pavitra\'s family comes along so nobody overpays.' },
        { t: '19:30', title: 'Welcome dinner', desc: 'Everyone, at the hotel. Casual. Come as you are.' },
      ],
      role: { title: 'Your part: come hungry and open-minded.', desc: 'Try one thing you can\'t pronounce. Let someone hand you a kurta in a color you\'d never pick. It will look great.' },
      wear: 'Whatever you flew in. Comfortable shoes for the shopping run.',
      eat: 'Your first vada pav. It\'s a spiced potato fritter in a soft bun and it is the city\'s favorite snack.',
      phrase: { say: 'Namaskar', means: 'Hello, in Marathi. Works on everyone.' },
      strip: 'Day zero. Sleep in, then meet in the lobby at 11:00 for the shopping run.',
    },
    {
      id: 'd1', date: '2027-02-02', dayNum: '2', monthShort: 'Feb', palette: PAL.d1,
      venue: VENUES.thapar, time: '11:00', shuttle: '10:30', calRange: '20270202T053000Z/20270202T090000Z',
      name: 'Mehendi',
      hook: 'Henna on your hands, music, and a very relaxed afternoon.',
      trailer: 'A rooftop full of cushions and marigolds. Artists squeezing dark paste into patterns on Pavitra\'s hands while a singer keeps going. You get a design too.',
      what: 'The Mehendi is the soft opening of the week. Henna artists draw intricate designs on the bride\'s hands and feet, and on anyone else who sits down. There is music, chaat, and nowhere to be. Traditionally the darker the stain, the deeper the love. Ours will be dark.',
      timeline: [
        { t: '10:30', title: 'Shuttle leaves the hotel', desc: 'From the Taj The Trees lobby. Be five minutes early.' },
        { t: '11:00', title: 'Doors open', desc: 'Find a cushion. Someone will bring you something to drink.' },
        { t: '12:00', title: 'Pavitra\'s henna', desc: 'Come watch. Ramon\'s initials are hidden in the pattern and he has to find them.' },
        { t: '14:00', title: 'Lunch and music', desc: 'Small plates all afternoon. The singer takes requests.' },
        { t: '15:30', title: 'Shuttle back', desc: 'Evening is free. See the Mumbai ideas below if you have energy.' },
      ],
      role: { title: 'Your part: get henna.', desc: 'Everyone, men included. A small design on the palm takes ten minutes and lasts about two weeks. Keep the paste on for a few hours and don\'t wash it off early. Then hold your hand up in every photo for the rest of the trip.' },
      wear: 'Bright and colorful. Short sleeves if you want henna on your hands. Flats or sandals, you\'ll be sitting on the floor.',
      eat: 'Chaat: crunchy, tangy, sweet street snacks in small portions. Pani puri if you\'re brave. Bottled water is everywhere.',
      phrase: { say: 'Sundar!', means: 'Beautiful. Say it about the henna and mean it.' },
      strip: 'Mehendi today. Wear something bright and short-sleeved. Shuttle leaves the lobby at 10:30.',
    },
    {
      id: 'd2', date: '2027-02-03', dayNum: '3', monthShort: 'Feb', palette: PAL.d2,
      venue: VENUES.thapar, time: '13:00', shuttle: '12:30', calRange: '20270203T073000Z/20270203T110000Z',
      name: 'Haldi',
      hook: 'Turmeric, drums, and everyone gets messy.',
      trailer: 'A drummer starts before you\'re in the room. Bowls of yellow paste. Pavitra and Ramon sitting on low stools looking nervous. Then the aunties begin.',
      what: 'Haldi is turmeric paste applied to the bride and groom by family and friends, to bless them and make them glow before the wedding. It is loud, fast, and joyful, with a dhol drummer driving the whole thing. It will not stay on the couple. Wear yellow you don\'t love.',
      timeline: [
        { t: '12:30', title: 'Shuttle leaves the hotel', desc: 'From the lobby. Yellow is the dress code, and you\'ll see why in an hour.' },
        { t: '13:00', title: 'Doors open', desc: 'The dhol player is already going.' },
        { t: '13:30', title: 'The Haldi', desc: 'Family goes first. Then it\'s a free-for-all. Photos happen whether you like it or not.' },
        { t: '15:00', title: 'Lunch', desc: 'A Maharashtrian lunch, mild by default, with spice on the side.' },
        { t: '16:00', title: 'Shuttle back', desc: 'Shower. Nap. Then the evening rehearsal.' },
        { t: '19:00', title: 'Sangeet rehearsal', desc: 'For everyone dancing tomorrow. At the hotel. Low stakes, high volume.' },
      ],
      role: { title: 'Your part: smear turmeric on us.', desc: 'Take a handful from the bowl and put it on our faces, arms, and anywhere else. It\'s a blessing. Then expect someone to do the same to you. The drums will tell you when to dance. Dance.' },
      wear: 'Yellow or orange, cotton, cheap. It stains. Sundress, kurta, linen shirt. Nothing you\'d cry over.',
      eat: 'Puran poli, a sweet stuffed flatbread that is Pavitra\'s family\'s festival food. Plus a full Maharashtrian thali.',
      phrase: { say: 'Chala!', means: 'Come on, let\'s go. Marathi. Useful when the drums start.' },
      strip: 'Haldi today. Wear yellow you don\'t mind staining. Shuttle leaves the lobby at 12:30.',
    },
    {
      id: 'd3', date: '2027-02-04', dayNum: '4', monthShort: 'Feb', palette: PAL.d3,
      venue: VENUES.race, time: '17:00', shuttle: '16:30', calRange: '20270204T113000Z/20270204T173000Z',
      name: 'Vows & Sangeet',
      hook: 'We say our vows. Then two families have a dance-off.',
      trailer: 'Sunset on a lawn at the racecourse. We say our vows the way we would at home, in our own words. Then the lights come up and the Sangeet starts, and nobody sits down until midnight.',
      what: 'This is the night the two worlds meet. First the vows, a short Western-style ceremony written by us, in English and Spanish. Then the Sangeet: choreographed dance numbers from both families, a Panama number, a Bollywood number, and an open floor that mixes Bollywood, salsa, reggaeton, and whatever else the DJ can get away with. Cocktails and dinner run through the whole thing.',
      timeline: [
        { t: '16:30', title: 'Shuttle leaves the hotel', desc: 'Dressed to sparkle. Comfortable enough to dance in.' },
        { t: '17:00', title: 'Cocktails on the lawn', desc: 'Sunset is at 18:45. Get your photos before then.' },
        { t: '18:00', title: 'The vows', desc: 'Twenty minutes. Bring tissues, Ramon will need them.' },
        { t: '19:00', title: 'Sangeet performances', desc: 'Family numbers, friend numbers, the Panama number you rehearsed last night.' },
        { t: '20:30', title: 'Dinner and open floor', desc: 'Until they make us leave.' },
        { t: '23:30', title: 'Shuttles back', desc: 'Running every 30 minutes from 22:00. Take whichever one you need.' },
      ],
      role: { title: 'Your part: the Panama and US number.', desc: 'There will be a choreographed number from our side. Rehearsal is the evening before at the hotel and takes an hour. You don\'t have to be good. You have to be there. If you\'d rather not, you\'re in charge of cheering, loudly.' },
      wear: 'Glamorous. Lehenga, anarkali, or an evening gown. Bandhgala, sherwani, or a suit without the tie. Shoes you can dance in for four hours.',
      eat: 'Cocktail dinner: kebabs, live pasta and dosa counters, biryani, and a dessert table with kulfi.',
      phrase: { say: 'Chala nachuya', means: 'Let\'s dance. Marathi. The most useful phrase of the week.' },
      strip: 'Vows and Sangeet tonight. Wear something that sparkles and shoes you can dance in. Shuttle leaves at 16:30.',
    },
    {
      id: 'd4', date: '2027-02-05', dayNum: '5', monthShort: 'Feb', palette: PAL.d4,
      venue: VENUES.mca, time: '16:30', shuttle: '16:00', calRange: '20270205T110000Z/20270205T173000Z',
      name: 'The Wedding',
      hook: 'The Maharashtrian ceremony, then a reception until late.',
      trailer: 'Ramon arrives with a brass band and everyone who came with him, dancing. A silk curtain between the two of us. Chanting. The curtain drops. You throw rice. Then dinner for everyone we love.',
      what: 'The main event: a traditional Maharashtrian Hindu wedding. It starts with the baraat, the groom\'s procession, which is a moving dance party that ends at the door. Inside, the ceremony is conducted in Sanskrit with a priest, a sacred fire, and a series of rituals we\'ll explain as they happen. It runs about ninety minutes. Then the reception: dinner, toasts, and a dance floor.',
      timeline: [
        { t: '16:00', title: 'Shuttle leaves the hotel', desc: 'Traditional dress if you have it. Formal if you don\'t.' },
        { t: '16:30', title: 'The baraat', desc: 'Ramon\'s procession. Everyone from our side dances in with him. Yes, you.' },
        { t: '17:15', title: 'The ceremony', desc: 'Antarpat (the curtain), the garlands, the seven steps around the fire. A printed guide on every seat tells you what\'s happening.' },
        { t: '18:45', title: 'Akshata', desc: 'Everyone showers us with rice as a blessing. Aim high.' },
        { t: '19:30', title: 'Reception', desc: 'Dinner, toasts, first dance, then the floor opens.' },
        { t: '23:30', title: 'Shuttles back', desc: 'Every 30 minutes from 22:00. The after-party is at the hotel bar for anyone still standing.' },
      ],
      role: { title: 'Your part: dance in with Ramon, then throw the rice.', desc: 'The baraat is not a parade you watch. It\'s a crowd you\'re in. Follow the band, follow Ramon, and don\'t worry about the steps. Later, when the priest says it\'s time, throw the rice on your seat over us. It\'s the blessing that counts most.' },
      wear: 'Traditional Indian if you bought it on day zero: silk saree, sherwani, kurta with a Nehru jacket. Otherwise formal Western. Modest for the ceremony, the reception is relaxed.',
      eat: 'A wedding feast: the full spread, both vegetarian and not, with the dishes labeled. Dessert is jalebi and ice cream, which is a combination you didn\'t know you needed.',
      phrase: { say: 'Abhinandan', means: 'Congratulations. Marathi. Say it to us and to our parents.' },
      strip: 'Wedding day. Traditional or formal, shuttle leaves at 16:00. The baraat needs you.',
    },
    {
      id: 'd5', date: '2027-02-06', dayNum: '6', monthShort: 'Feb', tentative: true, palette: PAL.d5,
      venue: VENUES.hotel,
      name: 'The Morning After',
      hook: 'Brunch, goodbyes, and one last look at the sea.',
      trailer: 'Sunglasses at brunch. Henna still on your hands. The wedding replayed from six phones. Then a slow afternoon before flights, or a boat to an island if you\'re staying.',
      what: 'No schedule. A long brunch at the hotel for anyone awake. For those with late flights or extra days, we\'ll organize a group trip to the Gateway of India and a ferry to Elephanta, or a walk down Colaba Causeway to buy things you don\'t need.',
      timeline: [
        { t: '11:00', title: 'Brunch', desc: 'At the hotel. It goes until people stop showing up.' },
        { t: '14:00', title: 'Optional: south Mumbai', desc: 'Gateway of India, the Taj Palace hotel, Colaba Causeway. Cars from the hotel.' },
        { t: 'Night', title: 'Flights home', desc: 'Cars to the airport from the hotel. Tell us your departure and we\'ll book them.' },
      ],
      role: { title: 'Your part: send us your photos.', desc: 'Every one of them. Blurry ones too. We\'ll build the album from what you shot. Use the hashtag or drop them in the shared folder we\'ll send around.' },
      wear: 'Whatever is clean.',
      eat: 'Hotel brunch. Then, if you go south, a Bombay sandwich from a street cart and a kulfi at Chowpatty.',
      phrase: { say: 'Punha bhetu', means: 'See you again. Marathi. We mean it.' },
      strip: 'Brunch at 11:00. Tell us your flight time and a car will be waiting.',
    },
  ],
  es: [
    {
      id: 'd0', date: '2027-02-01', dayNum: '1', monthShort: 'Feb', tentative: true, palette: PAL.d0,
      venue: VENUES.hotel,
      name: 'Aterriza. Compra. Come.',
      hook: 'Día cero: te llevamos de compras y luego te damos de comer.',
      trailer: 'Sales del aeropuerto a las 2 de la mañana a un aire tibio que huele a mar, diésel y jazmín. Alguien sostiene un cartel con tu nombre. Duerme. Después nos vamos de compras.',
      what: 'La mayoría de los vuelos desde EE. UU. y Panamá aterrizan de madrugada. Un carro te estará esperando. Duerme hasta tarde. A media mañana llevamos a todos los que quieran a comprar sus atuendos para la semana, con gente que sabe adónde ir. En la noche cenamos todos juntos en el hotel por primera vez.',
      timeline: [
        { t: 'Noche', title: 'Aterrizas', desc: 'Un chofer te recibe al salir de aduana y te lleva al Taj The Trees. Unos 40 minutos.' },
        { t: '11:00', title: 'Salida de compras', desc: 'Salimos juntos del lobby. Kurtas, saris, lehengas, sherwanis. La familia de Pavitra nos acompaña para que nadie pague de más.' },
        { t: '19:30', title: 'Cena de bienvenida', desc: 'Todos, en el hotel. Informal. Ven como estés.' },
      ],
      role: { title: 'Tu parte: llega con hambre y mente abierta.', desc: 'Prueba algo que no puedas pronunciar. Deja que alguien te ponga una kurta de un color que nunca elegirías. Te va a quedar increíble.' },
      wear: 'Lo que traigas del vuelo. Zapatos cómodos para las compras.',
      eat: 'Tu primer vada pav. Es una croqueta de papa especiada en un pan suave y es el snack favorito de la ciudad.',
      phrase: { say: 'Namaskar', means: 'Hola, en maratí. Funciona con todo el mundo.' },
      strip: 'Día cero. Duerme hasta tarde y nos vemos en el lobby a las 11:00 para ir de compras.',
    },
    {
      id: 'd1', date: '2027-02-02', dayNum: '2', monthShort: 'Feb', palette: PAL.d1,
      venue: VENUES.thapar, time: '11:00', shuttle: '10:30', calRange: '20270202T053000Z/20270202T090000Z',
      name: 'Mehendi',
      hook: 'Henna en las manos, música y una tarde muy relajada.',
      trailer: 'Una terraza llena de cojines y caléndulas. Artistas dibujando con pasta oscura sobre las manos de Pavitra mientras una cantante no para. A ti también te hacen un diseño.',
      what: 'El Mehendi es la apertura suave de la semana. Artistas de henna dibujan diseños intrincados en las manos y pies de la novia, y en cualquiera que se siente. Hay música, chaat y ningún lugar adonde ir. Según la tradición, cuanto más oscura la mancha, más profundo el amor. La nuestra será oscura.',
      timeline: [
        { t: '10:30', title: 'Sale el shuttle del hotel', desc: 'Desde el lobby del Taj The Trees. Llega cinco minutos antes.' },
        { t: '11:00', title: 'Abren las puertas', desc: 'Busca un cojín. Alguien te traerá algo de beber.' },
        { t: '12:00', title: 'La henna de Pavitra', desc: 'Ven a ver. Las iniciales de Ramon están escondidas en el diseño y él tiene que encontrarlas.' },
        { t: '14:00', title: 'Almuerzo y música', desc: 'Platos pequeños toda la tarde. La cantante acepta pedidos.' },
        { t: '15:30', title: 'Shuttle de regreso', desc: 'La noche es libre. Mira las ideas de Mumbai más abajo si te queda energía.' },
      ],
      role: { title: 'Tu parte: hazte henna.', desc: 'Todos, hombres incluidos. Un diseño pequeño en la palma toma diez minutos y dura unas dos semanas. Deja la pasta unas horas y no te la laves antes de tiempo. Después levanta la mano en cada foto del resto del viaje.' },
      wear: 'Colorido y alegre. Mangas cortas si quieres henna en las manos. Sandalias o zapatos planos, vas a estar sentado en el piso.',
      eat: 'Chaat: bocados callejeros crujientes, ácidos y dulces en porciones pequeñas. Pani puri si te atreves. Hay agua embotellada en todas partes.',
      phrase: { say: 'Sundar!', means: 'Hermoso. Dilo de la henna y dilo en serio.' },
      strip: 'Hoy es el Mehendi. Ponte algo colorido y de manga corta. El shuttle sale del lobby a las 10:30.',
    },
    {
      id: 'd2', date: '2027-02-03', dayNum: '3', monthShort: 'Feb', palette: PAL.d2,
      venue: VENUES.thapar, time: '13:00', shuttle: '12:30', calRange: '20270203T073000Z/20270203T110000Z',
      name: 'Haldi',
      hook: 'Cúrcuma, tambores y todos terminan manchados.',
      trailer: 'Un tamborilero empieza antes de que entres. Bowls de pasta amarilla. Pavitra y Ramon sentados en banquitos con cara de nervios. Y entonces empiezan las tías.',
      what: 'El Haldi es pasta de cúrcuma que familia y amigos aplican a los novios para bendecirlos y hacerlos brillar antes de la boda. Es ruidoso, rápido y alegre, con un tambor dhol marcando todo. No se va a quedar solo en los novios. Ponte amarillo que no te importe.',
      timeline: [
        { t: '12:30', title: 'Sale el shuttle del hotel', desc: 'Desde el lobby. El código es amarillo, y en una hora sabrás por qué.' },
        { t: '13:00', title: 'Abren las puertas', desc: 'El dhol ya está sonando.' },
        { t: '13:30', title: 'El Haldi', desc: 'Primero la familia. Después es de todos contra todos. Las fotos pasan quieras o no.' },
        { t: '15:00', title: 'Almuerzo', desc: 'Un almuerzo maharashtriano, suave por defecto, con el picante aparte.' },
        { t: '16:00', title: 'Shuttle de regreso', desc: 'Ducha. Siesta. Y luego el ensayo de la noche.' },
        { t: '19:00', title: 'Ensayo del Sangeet', desc: 'Para todos los que bailan mañana. En el hotel. Poca presión, mucho volumen.' },
      ],
      role: { title: 'Tu parte: úntanos cúrcuma.', desc: 'Toma un puñado del bowl y pónnoslo en la cara, los brazos y donde sea. Es una bendición. Después espera que alguien te haga lo mismo. Los tambores te dirán cuándo bailar. Baila.' },
      wear: 'Amarillo o naranja, de algodón, barato. Mancha. Vestido de verano, kurta, camisa de lino. Nada que te duela perder.',
      eat: 'Puran poli, un pan dulce relleno que es la comida de fiesta de la familia de Pavitra. Más un thali maharashtriano completo.',
      phrase: { say: 'Chala!', means: 'Vamos, dale. Maratí. Útil cuando empiezan los tambores.' },
      strip: 'Hoy es el Haldi. Ponte amarillo que se pueda manchar. El shuttle sale del lobby a las 12:30.',
    },
    {
      id: 'd3', date: '2027-02-04', dayNum: '4', monthShort: 'Feb', palette: PAL.d3,
      venue: VENUES.race, time: '17:00', shuttle: '16:30', calRange: '20270204T113000Z/20270204T173000Z',
      name: 'Votos y Sangeet',
      hook: 'Decimos nuestros votos. Luego dos familias se baten a bailar.',
      trailer: 'Atardecer en el césped del hipódromo. Decimos nuestros votos como lo haríamos en casa, con nuestras palabras. Luego se encienden las luces, empieza el Sangeet y nadie se sienta hasta la medianoche.',
      what: 'Esta es la noche en que los dos mundos se encuentran. Primero los votos, una ceremonia corta al estilo occidental escrita por nosotros, en inglés y español. Después el Sangeet: números de baile coreografiados de ambas familias, un número panameño, un número de Bollywood y una pista abierta que mezcla Bollywood, salsa, reguetón y lo que el DJ se atreva. Cócteles y cena durante toda la noche.',
      timeline: [
        { t: '16:30', title: 'Sale el shuttle del hotel', desc: 'Vestidos para brillar. Cómodos para bailar.' },
        { t: '17:00', title: 'Cócteles en el césped', desc: 'El sol se pone a las 18:45. Tómate las fotos antes.' },
        { t: '18:00', title: 'Los votos', desc: 'Veinte minutos. Trae pañuelos, Ramon los va a necesitar.' },
        { t: '19:00', title: 'Presentaciones del Sangeet', desc: 'Números de la familia, de los amigos, y el número panameño que ensayaste anoche.' },
        { t: '20:30', title: 'Cena y pista abierta', desc: 'Hasta que nos saquen.' },
        { t: '23:30', title: 'Shuttles de regreso', desc: 'Cada 30 minutos desde las 22:00. Toma el que necesites.' },
      ],
      role: { title: 'Tu parte: el número de Panamá y EE. UU.', desc: 'Habrá un número coreografiado de nuestro lado. El ensayo es la noche anterior en el hotel y dura una hora. No tienes que ser bueno. Tienes que estar. Si prefieres no bailar, te toca animar, fuerte.' },
      wear: 'Glamoroso. Lehenga, anarkali o vestido de noche. Bandhgala, sherwani o traje sin corbata. Zapatos para bailar cuatro horas.',
      eat: 'Cena de cóctel: kebabs, estaciones de pasta y dosa en vivo, biryani y una mesa de postres con kulfi.',
      phrase: { say: 'Chala nachuya', means: 'Vamos a bailar. Maratí. La frase más útil de la semana.' },
      strip: 'Esta noche: votos y Sangeet. Ponte algo que brille y zapatos para bailar. El shuttle sale a las 16:30.',
    },
    {
      id: 'd4', date: '2027-02-05', dayNum: '5', monthShort: 'Feb', palette: PAL.d4,
      venue: VENUES.mca, time: '16:30', shuttle: '16:00', calRange: '20270205T110000Z/20270205T173000Z',
      name: 'La Boda',
      hook: 'La ceremonia maharashtriana y luego la recepción hasta tarde.',
      trailer: 'Ramon llega con una banda de metales y todos los que vinieron con él, bailando. Una cortina de seda entre los dos. Cantos. Cae la cortina. Lanzas arroz. Después, cena para todos los que amamos.',
      what: 'El evento principal: una boda hindú maharashtriana tradicional. Empieza con el baraat, la procesión del novio, que es una fiesta de baile en movimiento que termina en la puerta. Adentro, la ceremonia se realiza en sánscrito con un sacerdote, un fuego sagrado y una serie de rituales que explicaremos mientras ocurren. Dura unos noventa minutos. Luego la recepción: cena, brindis y pista de baile.',
      timeline: [
        { t: '16:00', title: 'Sale el shuttle del hotel', desc: 'Vestimenta tradicional si la tienes. Formal si no.' },
        { t: '16:30', title: 'El baraat', desc: 'La procesión de Ramon. Todos los de nuestro lado entran bailando con él. Sí, tú.' },
        { t: '17:15', title: 'La ceremonia', desc: 'Antarpat (la cortina), las guirnaldas, los siete pasos alrededor del fuego. Una guía impresa en cada asiento te dice qué está pasando.' },
        { t: '18:45', title: 'Akshata', desc: 'Todos nos bañan de arroz como bendición. Apunta alto.' },
        { t: '19:30', title: 'Recepción', desc: 'Cena, brindis, primer baile y luego se abre la pista.' },
        { t: '23:30', title: 'Shuttles de regreso', desc: 'Cada 30 minutos desde las 22:00. El after es en el bar del hotel para quien siga en pie.' },
      ],
      role: { title: 'Tu parte: entra bailando con Ramon y luego lanza el arroz.', desc: 'El baraat no es un desfile que miras. Es una multitud en la que estás. Sigue a la banda, sigue a Ramon y no te preocupes por los pasos. Más tarde, cuando el sacerdote lo indique, lanza sobre nosotros el arroz que está en tu asiento. Es la bendición que más cuenta.' },
      wear: 'Indio tradicional si lo compraste el día cero: sari de seda, sherwani, kurta con chaqueta Nehru. Si no, formal occidental. Recatado para la ceremonia, la recepción es relajada.',
      eat: 'Un banquete de boda: todo el despliegue, vegetariano y no, con los platos etiquetados. El postre es jalebi con helado, una combinación que no sabías que necesitabas.',
      phrase: { say: 'Abhinandan', means: 'Felicidades. Maratí. Dínoslo a nosotros y a nuestros padres.' },
      strip: 'Día de boda. Tradicional o formal, el shuttle sale a las 16:00. El baraat te necesita.',
    },
    {
      id: 'd5', date: '2027-02-06', dayNum: '6', monthShort: 'Feb', tentative: true, palette: PAL.d5,
      venue: VENUES.hotel,
      name: 'La Mañana Siguiente',
      hook: 'Brunch, despedidas y una última mirada al mar.',
      trailer: 'Lentes de sol en el brunch. La henna todavía en las manos. La boda repetida desde seis teléfonos. Luego una tarde lenta antes de los vuelos, o un bote a una isla si te quedas.',
      what: 'Sin horario. Un brunch largo en el hotel para quien esté despierto. Para los que tienen vuelos tarde o días extra, organizaremos una salida en grupo a la Puerta de la India y un ferry a Elephanta, o una caminata por Colaba Causeway para comprar cosas que no necesitas.',
      timeline: [
        { t: '11:00', title: 'Brunch', desc: 'En el hotel. Dura hasta que la gente deje de llegar.' },
        { t: '14:00', title: 'Opcional: el sur de Mumbai', desc: 'Puerta de la India, el hotel Taj Palace, Colaba Causeway. Carros desde el hotel.' },
        { t: 'Noche', title: 'Vuelos a casa', desc: 'Carros al aeropuerto desde el hotel. Dinos tu hora de salida y los reservamos.' },
      ],
      role: { title: 'Tu parte: mándanos tus fotos.', desc: 'Todas. Las borrosas también. Armaremos el álbum con lo que ustedes tomaron. Usa el hashtag o súbelas a la carpeta compartida que enviaremos.' },
      wear: 'Lo que esté limpio.',
      eat: 'Brunch del hotel. Luego, si vas al sur, un sándwich Bombay de un carrito y un kulfi en Chowpatty.',
      phrase: { say: 'Punha bhetu', means: 'Nos vemos de nuevo. Maratí. Lo decimos en serio.' },
      strip: 'Brunch a las 11:00. Dinos la hora de tu vuelo y habrá un carro esperando.',
    },
  ],
};

// ────────────────────────────── NOW STRIP ──────────────────────────────
export const MILESTONES: Localized<Milestone[]> = {
  en: [
    { id: 'rsvp', from: '2000-01-01', to: '2026-12-15', deadline: '2026-12-15', kicker: 'Do this now', line: 'Tell us you\'re coming, then book your flight into Mumbai (BOM).', to_path: '/rsvp' },
    { id: 'visa', from: '2026-12-16', to: '2027-01-10', deadline: '2027-01-10', kicker: 'Do this now', line: 'Apply for your Indian e-visa. It\'s a website and about twenty minutes.', to_path: '/travel#visa' },
    { id: 'pack', from: '2027-01-11', to: '2027-01-28', deadline: '2027-02-01', kicker: 'Almost time', line: 'Pack something yellow, something sparkly, and shoes you can dance in.', to_path: '/wear' },
    { id: 'fly', from: '2027-01-29', to: '2027-01-31', deadline: '2027-02-01', kicker: 'This week', line: 'Check your pickup. Someone will be holding your name past customs.', to_path: '/travel#landing' },
    { id: 'after', from: '2027-02-07', to: '2099-12-31', kicker: 'Thank you', line: 'You came to Mumbai for us. Photos are on their way.', to_path: '/story' },
  ],
  es: [
    { id: 'rsvp', from: '2000-01-01', to: '2026-12-15', deadline: '2026-12-15', kicker: 'Haz esto ahora', line: 'Dinos que vienes y luego reserva tu vuelo a Mumbai (BOM).', to_path: '/rsvp' },
    { id: 'visa', from: '2026-12-16', to: '2027-01-10', deadline: '2027-01-10', kicker: 'Haz esto ahora', line: 'Solicita tu e-visa para India. Es una página web y unos veinte minutos.', to_path: '/travel#visa' },
    { id: 'pack', from: '2027-01-11', to: '2027-01-28', deadline: '2027-02-01', kicker: 'Ya casi', line: 'Empaca algo amarillo, algo que brille y zapatos para bailar.', to_path: '/wear' },
    { id: 'fly', from: '2027-01-29', to: '2027-01-31', deadline: '2027-02-01', kicker: 'Esta semana', line: 'Revisa tu recogida. Alguien estará sosteniendo tu nombre al salir de aduana.', to_path: '/travel#landing' },
    { id: 'after', from: '2027-02-07', to: '2099-12-31', kicker: 'Gracias', line: 'Viniste a Mumbai por nosotros. Las fotos van en camino.', to_path: '/story' },
  ],
};

// ────────────────────────────── DRESS CODES ──────────────────────────────
export const DRESS: Localized<DressCode[]> = {
  en: [
    { dayId: 'd1', title: 'Mehendi', theme: 'Bright & colorful', desc: 'Relaxed and festive. You\'ll be sitting on cushions and getting henna, so think short sleeves and easy fabrics.', women: 'Bright anarkali, a light lehenga, or a floral maxi dress.', men: 'Cotton kurta with jeans or chinos, or a linen shirt in a real color.' },
    { dayId: 'd2', title: 'Haldi', theme: 'Yellow & orange', desc: 'Simple, cotton, and cheap. Turmeric stains for good. This is not the day for silk.', women: 'Yellow or orange kurta set, cotton saree, or a sundress.', men: 'Yellow or orange cotton kurta, or a white shirt you\'re done with. Jeans are fine.' },
    { dayId: 'd3', title: 'Vows & Sangeet', theme: 'Glamorous, Indo-Western', desc: 'The night to sparkle. Indian or Western, as long as it shines and you can dance in it.', women: 'Lehenga choli, embroidered anarkali, or an evening gown.', men: 'Bandhgala, sherwani, or a dark suit, no tie.' },
    { dayId: 'd4', title: 'Wedding & Reception', theme: 'Traditional Indian or formal', desc: 'Regal and respectful. This is the religious ceremony. Modest for the ceremony, relaxed for the reception.', women: 'Silk saree (Paithani is the local style), a heavy lehenga, or a formal gown.', men: 'Sherwani, kurta with a Nehru jacket, or a formal suit.' },
  ],
  es: [
    { dayId: 'd1', title: 'Mehendi', theme: 'Colorido y alegre', desc: 'Relajado y festivo. Vas a estar sentado en cojines y haciéndote henna, así que piensa en mangas cortas y telas fáciles.', women: 'Anarkali de colores, una lehenga ligera o un vestido largo floral.', men: 'Kurta de algodón con jeans o chinos, o una camisa de lino de un color de verdad.' },
    { dayId: 'd2', title: 'Haldi', theme: 'Amarillo y naranja', desc: 'Sencillo, de algodón y barato. La cúrcuma mancha para siempre. No es el día de la seda.', women: 'Conjunto kurta amarillo o naranja, sari de algodón o vestido de verano.', men: 'Kurta de algodón amarilla o naranja, o una camisa blanca que ya no quieras. Jeans están bien.' },
    { dayId: 'd3', title: 'Votos y Sangeet', theme: 'Glamoroso, indo-occidental', desc: 'La noche para brillar. Indio u occidental, mientras brille y puedas bailar.', women: 'Lehenga choli, anarkali bordado o vestido de noche.', men: 'Bandhgala, sherwani o traje oscuro, sin corbata.' },
    { dayId: 'd4', title: 'Boda y Recepción', theme: 'Indio tradicional o formal', desc: 'Elegante y respetuoso. Es la ceremonia religiosa. Recatado para la ceremonia, relajado para la recepción.', women: 'Sari de seda (Paithani es el estilo local), lehenga pesada o vestido formal.', men: 'Sherwani, kurta con chaqueta Nehru o traje formal.' },
  ],
};

export const GARMENTS: Localized<Garment[]> = {
  en: [
    { id: 'kurta-w', name: 'Kurta set', say: 'KUR-ta', who: 'women', desc: 'A long, light tunic with pants. The most comfortable thing you will own after this trip.', bestFor: ['Mehendi', 'Haldi'], img: PHOTO('yellow-kurta.png') },
    { id: 'anarkali', name: 'Anarkali', say: 'ah-nar-KA-lee', who: 'women', desc: 'A long, flared dress-style top with slim pants. Elegant and easy to dance in.', bestFor: ['Mehendi', 'Sangeet'], img: 'https://images.cbazaar.com/images/faux-georgette-embroidered-anarkali-suit-slswe301032ra-u.jpg' },
    { id: 'lehenga', name: 'Lehenga choli', say: 'leh-HEN-ga CHO-lee', who: 'women', desc: 'Full skirt, fitted blouse, and a draped scarf. From simple to seriously embroidered.', bestFor: ['Sangeet', 'Wedding'], img: 'https://images.pexels.com/photos/27155546/pexels-photo-27155546.jpeg' },
    { id: 'saree', name: 'Saree', say: 'SAH-ree', who: 'women', desc: 'Six yards of fabric draped over a blouse and petticoat. Someone will help you tie it, we promise.', bestFor: ['Wedding'], img: 'https://images.pexels.com/photos/9418783/pexels-photo-9418783.jpeg' },
    { id: 'kurta-m', name: 'Kurta pajama', say: 'KUR-ta pa-JA-ma', who: 'men', desc: 'A loose collarless shirt to the knee with light trousers. Daytime uniform.', bestFor: ['Mehendi', 'Haldi'], img: 'https://manyavar.scene7.com/is/image/manyavar/SDES1295-328-Mustard-401_02-12-2025-14-48:650x900' },
    { id: 'bandhgala', name: 'Bandhgala', say: 'BAND-ga-la', who: 'men', desc: 'A fitted jacket with a standing collar. The sharpest thing in the room that isn\'t a sherwani.', bestFor: ['Sangeet', 'Wedding'], img: 'https://manyavar.scene7.com/is/image/manyavar/8905100475357.23637_19-05-2023-10-17:650x900?&dpr=on,2' },
    { id: 'sherwani', name: 'Sherwani', say: 'sher-VAH-nee', who: 'men', desc: 'A long, structured coat over a kurta. The Indian tuxedo.', bestFor: ['Wedding'], img: 'https://manyavar.scene7.com/is/image/manyavar/I02_O951D504-333_03_04-04-2022-21-00:650x900?&dpr=on,2' },
  ],
  es: [
    { id: 'kurta-w', name: 'Conjunto kurta', say: 'KUR-ta', who: 'women', desc: 'Una túnica larga y ligera con pantalón. Lo más cómodo que tendrás después de este viaje.', bestFor: ['Mehendi', 'Haldi'], img: PHOTO('yellow-kurta.png') },
    { id: 'anarkali', name: 'Anarkali', say: 'ah-nar-KA-li', who: 'women', desc: 'Un top largo y acampanado tipo vestido con pantalón ajustado. Elegante y fácil para bailar.', bestFor: ['Mehendi', 'Sangeet'], img: 'https://images.cbazaar.com/images/faux-georgette-embroidered-anarkali-suit-slswe301032ra-u.jpg' },
    { id: 'lehenga', name: 'Lehenga choli', say: 'le-JEN-ga CHO-li', who: 'women', desc: 'Falda amplia, blusa ajustada y un chal drapeado. De sencillo a seriamente bordado.', bestFor: ['Sangeet', 'Boda'], img: 'https://images.pexels.com/photos/27155546/pexels-photo-27155546.jpeg' },
    { id: 'saree', name: 'Sari', say: 'SA-ri', who: 'women', desc: 'Seis yardas de tela drapeadas sobre una blusa y una enagua. Alguien te ayudará a ponértelo, lo prometemos.', bestFor: ['Boda'], img: 'https://images.pexels.com/photos/9418783/pexels-photo-9418783.jpeg' },
    { id: 'kurta-m', name: 'Kurta pajama', say: 'KUR-ta pa-YA-ma', who: 'men', desc: 'Camisa suelta sin cuello hasta la rodilla con pantalón ligero. El uniforme de día.', bestFor: ['Mehendi', 'Haldi'], img: 'https://manyavar.scene7.com/is/image/manyavar/SDES1295-328-Mustard-401_02-12-2025-14-48:650x900' },
    { id: 'bandhgala', name: 'Bandhgala', say: 'BAND-ga-la', who: 'men', desc: 'Chaqueta entallada con cuello alto. Lo más elegante del salón que no sea un sherwani.', bestFor: ['Sangeet', 'Boda'], img: 'https://manyavar.scene7.com/is/image/manyavar/8905100475357.23637_19-05-2023-10-17:650x900?&dpr=on,2' },
    { id: 'sherwani', name: 'Sherwani', say: 'sher-VA-ni', who: 'men', desc: 'Un abrigo largo y estructurado sobre una kurta. El esmoquin indio.', bestFor: ['Boda'], img: 'https://manyavar.scene7.com/is/image/manyavar/I02_O951D504-333_03_04-04-2022-21-00:650x900?&dpr=on,2' },
  ],
};

// ────────────────────────────── FREE-AFTERNOON MUMBAI ──────────────────────────────
export const SPOTS: Localized<Spot[]> = {
  en: [
    { id: 'gateway', title: 'Gateway of India', desc: 'The city\'s front door, on the water. Go at sunset. Free.', query: 'Gateway of India, Mumbai' },
    { id: 'elephanta', title: 'Elephanta Caves', desc: 'A ferry from the Gateway to an island of carved temples. Half a day, worth it.', query: 'Elephanta Caves, Mumbai' },
    { id: 'marine', title: 'Marine Drive', desc: 'The long curve of seafront. Sit on the wall with everyone else at dusk.', query: 'Marine Drive, Mumbai' },
    { id: 'colaba', title: 'Colaba Causeway', desc: 'Street shopping: jewelry, scarves, sandals. Start bargaining at half the asking price.', query: 'Colaba Causeway, Mumbai' },
    { id: 'sealounge', title: 'Sea Lounge, Taj Mahal Palace', desc: 'High tea in the old hotel overlooking the harbor. Reserve.', query: 'Sea Lounge, Taj Mahal Palace, Mumbai', link: 'https://www.tajhotels.com/en-in/hotels/taj-mahal-palace-mumbai/restaurants/sea-lounge-mumbai' },
    { id: 'masque', title: 'Masque', desc: 'One of the best tasting menus in India, in an old textile mill. Book weeks ahead.', query: 'Masque Restaurant, Mumbai', link: 'https://www.masquerestaurant.com/' },
  ],
  es: [
    { id: 'gateway', title: 'Puerta de la India', desc: 'La puerta de entrada de la ciudad, frente al mar. Ve al atardecer. Gratis.', query: 'Gateway of India, Mumbai' },
    { id: 'elephanta', title: 'Cuevas de Elephanta', desc: 'Un ferry desde la Puerta a una isla de templos tallados. Medio día, vale la pena.', query: 'Elephanta Caves, Mumbai' },
    { id: 'marine', title: 'Marine Drive', desc: 'La larga curva del malecón. Siéntate en el muro con todo el mundo al anochecer.', query: 'Marine Drive, Mumbai' },
    { id: 'colaba', title: 'Colaba Causeway', desc: 'Compras callejeras: joyería, pañuelos, sandalias. Empieza a regatear a la mitad del precio.', query: 'Colaba Causeway, Mumbai' },
    { id: 'sealounge', title: 'Sea Lounge, Taj Mahal Palace', desc: 'Té de la tarde en el hotel antiguo con vista al puerto. Reserva.', query: 'Sea Lounge, Taj Mahal Palace, Mumbai', link: 'https://www.tajhotels.com/en-in/hotels/taj-mahal-palace-mumbai/restaurants/sea-lounge-mumbai' },
    { id: 'masque', title: 'Masque', desc: 'Uno de los mejores menús de degustación de India, en una antigua fábrica textil. Reserva con semanas de anticipación.', query: 'Masque Restaurant, Mumbai', link: 'https://www.masquerestaurant.com/' },
  ],
};

// ────────────────────────────── THE STORY, IN TRIPS ──────────────────────────────
// Add an `img` to any trip once you've dropped the photo in the photo repo. Trips without one render a labeled tile.
export const TRIPS: Localized<Trip[]> = {
  en: [
    { id: 'abq', when: 'February 2022', where: 'Albuquerque, New Mexico', flag: '🇺🇸', title: 'Coworkers, briefly', desc: 'We met at work in Albuquerque. Colleagues for about a week, inseparable after that.', img: PHOTO('tram.jpg') },
    { id: 'rockies', when: 'May 2022', where: 'Rocky Mountain National Park, Colorado', flag: '🇺🇸', title: 'The first trip', desc: 'A spontaneous Memorial Day drive to the Rockies. We left as friends and came back as something else.', img: PHOTO('rockies.jpg') },
    { id: 'bay', when: 'December 2023', where: 'Bay Area, California', flag: '🇺🇸', title: 'California', desc: 'Pavitra moved for a new job. Ramon followed not long after. Home base, since then.', img: PHOTO('mackinac.jpg') },
    { id: 'panama', when: 'Three trips', where: 'Panama', flag: '🇵🇦', title: 'Pavitra learns the farm', desc: 'Three trips to Panama so far: the beach, the family farm in the countryside, and a lot of Ramon\'s relatives making sure she was fed. She now has opinions about patacones.' },
    { id: 'mumbai', when: 'Three trips', where: 'Mumbai', flag: '🇮🇳', title: 'Ramon learns Mumbai', desc: 'Three trips to Mumbai so far. On the first he was nervous about the water, the traffic, and the spice. By the third he was ordering for the table. Everything in the travel guide is what he learned.' },
    { id: 'proposal', when: 'October 12, 2025', where: 'Slacker\'s Hill, San Francisco', flag: '🇺🇸', title: 'The proposal', desc: 'Sunset above the Golden Gate, the city behind us, and a photographer hiding in the bushes. She said yes.', img: PHOTO('proposal.jpg') },
    { id: 'parents', when: '2025', where: 'California', flag: '🇵🇦🇮🇳', title: 'The parents meet', desc: 'Both sets of parents flew to California and met for the first time. Two languages, one table, and it went better than any of us planned.' },
    { id: 'engagement', when: 'September 2026', where: 'Mumbai', flag: '🇮🇳', title: 'The engagement ceremony', desc: 'A traditional engagement in Mumbai with Pavitra\'s family. Ramon in a kurta, rings, blessings, and the first taste of what February will be. Photos coming to this page soon.' },
  ],
  es: [
    { id: 'abq', when: 'Febrero 2022', where: 'Albuquerque, Nuevo México', flag: '🇺🇸', title: 'Compañeros de trabajo, por poco tiempo', desc: 'Nos conocimos en el trabajo en Albuquerque. Colegas por una semana, inseparables después.', img: PHOTO('tram.jpg') },
    { id: 'rockies', when: 'Mayo 2022', where: 'Parque Nacional de las Montañas Rocosas, Colorado', flag: '🇺🇸', title: 'El primer viaje', desc: 'Un viaje espontáneo a las Rocosas por el Memorial Day. Salimos como amigos y volvimos como otra cosa.', img: PHOTO('rockies.jpg') },
    { id: 'bay', when: 'Diciembre 2023', where: 'Área de la Bahía, California', flag: '🇺🇸', title: 'California', desc: 'Pavitra se mudó por un nuevo trabajo. Ramon la siguió poco después. Nuestra base desde entonces.', img: PHOTO('mackinac.jpg') },
    { id: 'panama', when: 'Tres viajes', where: 'Panamá', flag: '🇵🇦', title: 'Pavitra aprende la finca', desc: 'Tres viajes a Panamá hasta ahora: la playa, la finca de la familia en el interior y muchos parientes de Ramon asegurándose de que comiera. Ahora tiene opiniones sobre los patacones.' },
    { id: 'mumbai', when: 'Tres viajes', where: 'Mumbai', flag: '🇮🇳', title: 'Ramon aprende Mumbai', desc: 'Tres viajes a Mumbai hasta ahora. En el primero le preocupaban el agua, el tráfico y el picante. Para el tercero ya pedía por toda la mesa. Todo lo que dice la guía de viaje es lo que él aprendió.' },
    { id: 'proposal', when: '12 de octubre de 2025', where: 'Slacker\'s Hill, San Francisco', flag: '🇺🇸', title: 'La propuesta', desc: 'Atardecer sobre el Golden Gate, la ciudad detrás y un fotógrafo escondido entre los arbustos. Dijo que sí.', img: PHOTO('proposal.jpg') },
    { id: 'parents', when: '2025', where: 'California', flag: '🇵🇦🇮🇳', title: 'Los padres se conocen', desc: 'Los dos pares de padres volaron a California y se conocieron por primera vez. Dos idiomas, una mesa, y salió mejor de lo que cualquiera planeó.' },
    { id: 'engagement', when: 'Septiembre 2026', where: 'Mumbai', flag: '🇮🇳', title: 'La ceremonia de compromiso', desc: 'Un compromiso tradicional en Mumbai con la familia de Pavitra. Ramon en kurta, anillos, bendiciones y una primera probada de lo que será febrero. Pronto habrá fotos en esta página.' },
  ],
};
