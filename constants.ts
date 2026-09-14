import { WeddingEvent, StoryEvent, RegistryItem, AttireItem, FAQItem, TravelSpot, SurvivalTip, Celebration } from './types';

const GH_RAW = 'https://github.com/rf0513/pavitra-and-ramon-wedding/blob/main/';

// ─── HERO PHOTO SEQUENCE ───
// The Home hero slowly crossfades through these photos (in order, looping), with the
// same duotone filter and parallax as before. Portrait or landscape both work; the
// image is cropped to `objectPosition` (where the faces are) — tweak per photo if a
// crop lands badly on phones.
//
// ➜ TO ADD MORE PHOTOS: upload the file to the rf0513/pavitra-and-ramon-wedding repo
//   and add one line below, e.g.
//   { src: `${GH_RAW}our-new-photo.jpg?raw=true`, objectPosition: 'center 40%' },
//   Keep the files reasonably sized (≤ 2–3 MB, ~2000px on the long edge) — guests
//   will be on hotel wifi and mobile data.
export const HERO_IMAGES: { src: string; objectPosition?: string }[] = [
  { src: `${GH_RAW}engagement-hug.jpg?raw=true`, objectPosition: 'center 30%' },
  { src: `${GH_RAW}engagement-hands.jpg?raw=true`, objectPosition: 'center 45%' },
  { src: `${GH_RAW}proposal.jpg?raw=true`, objectPosition: 'center 60%' },
  { src: `${GH_RAW}boat.jpeg?raw=true`, objectPosition: 'center 35%' },
  // ➜ drop additional hero photos here
];

export const WEDDING_DATA = {
  couple: {
    partner1: "Pavitra Kanse",
    partner2: "Ramon Feliu",
    hashtag: "#PR27"
  },
  date: "2 – 5 February 2027",
  hero: {
    // First frame of the sequence (kept for anything that wants a single still).
    image: HERO_IMAGES[0].src,
  },
  location: {
    city: "Mumbai, India",
    venue: "Various Locations"
  },
  btcAddress: 'bc1qh0z7g3ttt5mx4ey0a0qxx2l6qj8pl5xg6cx35d',
};

// ─── SCHEDULE ───
export const EVENTS_EN: WeddingEvent[] = [
  { id: '1', title: 'Mehendi (Henna)', day: '02', month: 'Feb', time: '11:00 AM', location: 'Thapar Suburbia', address: '4th Floor, Chembur, Mumbai', description: 'A relaxed start to the festivities with intricate henna designs, music, and light bites.', dressCode: 'Vibrant & Colorful', shuttleTime: '10:30 AM' },
  { id: '2', title: 'Haldi Ceremony', day: '03', month: 'Feb', time: '1:00 PM', location: 'Thapar Suburbia', address: '4th Floor, Chembur, Mumbai', description: 'The traditional turmeric ceremony. Get ready to get messy and glow!', dressCode: 'Bright Yellows and Oranges', shuttleTime: '12:30 PM' },
  { id: '3', title: 'Vows & Sangeet', day: '04', month: 'Feb', time: '5:00 PM', location: 'Turf Lawn and Banquet', address: 'Mahalaxmi Race Course, Mumbai', description: 'We exchange our vows followed by a musical evening of dance and celebration.', dressCode: 'Glamorous Indo-Western Style', shuttleTime: '4:30 PM' },
  { id: '4', title: 'Wedding & Reception', day: '05', month: 'Feb', time: '4:30 PM', location: 'Mumbai Cricket Association Club', address: 'Bandra Kurla Complex (BKC), Mumbai', description: 'The traditional Maharashtrian wedding ceremony followed by a grand reception dinner.', dressCode: 'Traditional Indian or Formal Western', shuttleTime: '4:00 PM' },
];

export const EVENTS_ES: WeddingEvent[] = [
  { id: '1', title: 'Mehendi (Henna)', day: '02', month: 'Feb', time: '11:00 AM', location: 'Thapar Suburbia', address: '4th Floor, Chembur, Mumbai', description: 'Un comienzo relajado de las festividades con diseños intrincados de henna, música y bocadillos.', dressCode: 'Vibrante y Colorido', shuttleTime: '10:30 AM' },
  { id: '2', title: 'Ceremonia Haldi', day: '03', month: 'Feb', time: '1:00 PM', location: 'Thapar Suburbia', address: '4th Floor, Chembur, Mumbai', description: 'La tradicional ceremonia de la cúrcuma. ¡Prepárate para ensuciarte y brillar!', dressCode: 'Amarillos y Naranjas brillantes', shuttleTime: '12:30 PM' },
  { id: '3', title: 'Votos y Sangeet', day: '04', month: 'Feb', time: '5:00 PM', location: 'Turf Lawn and Banquet', address: 'Mahalaxmi Race Course, Mumbai', description: 'Intercambiamos nuestros votos seguidos de una noche musical de baile y celebración.', dressCode: 'Estilo Indo-Occidental glamoroso', shuttleTime: '4:30 PM' },
  { id: '4', title: 'Boda y Recepción', day: '05', month: 'Feb', time: '4:30 PM', location: 'Mumbai Cricket Association Club', address: 'Bandra Kurla Complex (BKC), Mumbai', description: 'La ceremonia de boda tradicional Maharashtriana seguida de una gran cena de recepción.', dressCode: 'Indio Tradicional u Occidental Formal', shuttleTime: '4:00 PM' },
];

// ─── STORY ───
export const STORY_EVENTS_EN: StoryEvent[] = [
  { id: '1', date: 'Feb 2022', title: 'Metamates', desc: 'Pavi and Ramon met at work in Albuquerque, as simple co-workers who quickly became inseparable.', img: `${GH_RAW}tram.jpeg?raw=true` },
  { id: '2', date: 'May 2022', title: 'Rocky Mountains', desc: 'They began dating after a spontanous trip to Rocky Mountains National Park in Colorado over Memorial Day.', img: `${GH_RAW}rockies.jpeg?raw=true` },
  { id: '3', date: 'Dec 2023', title: 'Bay Area', desc: 'Pavi relocated for a new job, and Ramon was not very far behind to begin their California chapter.', img: `${GH_RAW}mackinac.jpeg?raw=true` },
  { id: '4', date: 'Oct 12, 2025', title: 'The Proposal', desc: "Sunset at Slacker's Hill. The Golden Gate Bridge, the San Francisco city skyline, and the hidden photographer as our witnesses.", img: `${GH_RAW}proposal.jpg?raw=true` },
];

export const STORY_EVENTS_ES: StoryEvent[] = [
  { id: '1', date: 'Feb 2022', title: 'Metamates', desc: 'Pavi y Ramon se conocieron en el trabajo en Albuquerque, como simples compañeros de trabajo que rápidamente se volvieron inseparables.', img: `${GH_RAW}tram.jpeg?raw=true` },
  { id: '2', date: 'May 2022', title: 'Montañas Rocosas', desc: 'Comenzaron a salir después de un viaje espontáneo al Parque Nacional de las Montañas Rocosas en Colorado durante el Día de los Caídos.', img: `${GH_RAW}rockies.jpeg?raw=true` },
  { id: '3', date: 'Dec 2023', title: 'Área de la Bahía', desc: 'Pavi se mudó por un nuevo trabajo, y Ramón no se quedó muy atrás para comenzar su capítulo en California.', img: `${GH_RAW}mackinac.jpeg?raw=true` },
  { id: '4', date: 'Oct 12, 2025', title: 'La Propuesta', desc: "Atardecer en Slacker's Hill. El puente Golden Gate, el horizonte de la ciudad de San Francisco y el fotógrafo oculto como nuestros testigos.", img: `${GH_RAW}proposal.jpg?raw=true` },
];

export const STORY_MAIN_IMAGE = 'https://lh3.googleusercontent.com/pw/AP1GczO1xDfNPI3ZJkGHdniIfQKvv9U2hBSBAwRjD-UdjmTpXE3SEsZnammzDWAutk-kbAJ0LK-1tpDHGVloUvvu50pd7gcqAzuMgRpqYtlgfWVVQsYzRgN2_nP1WvdfZCjhKwRixb2bXITrTqZ8hJv0K6rLJA=w1307-h872-s-no-gm?authuser=0';

// ─── REGISTRY ───
export const REGISTRY_ITEMS_EN: RegistryItem[] = [
  { id: 'charity', store: 'Educate Girls Globally', link: 'https://www.educategirls.org/', description: 'If you are attending this wedding, it is likely you have been blessed with opportunities. Others are not as fortunate. Consider supporting Educate Girls Globally, one of the most rigorously measured and impactful education charities in India.' },
  { id: 'btc', store: 'Bitcoin', link: WEDDING_DATA.btcAddress, description: 'If you insist of quantifying your love to us, you can send Bitcoin to the wallet below.' },
];

export const REGISTRY_ITEMS_ES: RegistryItem[] = [
  { id: 'charity', store: 'Educate Girls Globally', link: 'https://www.educategirls.org/', description: 'Si asistes a esta boda, es probable que hayas sido bendecido con oportunidades. Otros no son tan afortunados. Considere apoyar a Educate Girls Globally, una de las organizaciones benéficas educativas de mayor impacto en la India.' },
  { id: 'btc', store: 'Bitcoin', link: WEDDING_DATA.btcAddress, description: 'Si insistes en cuantificar tu amor por nosotros, puedes enviar Bitcoin a la siguiente billetera.' },
];

// ─── PHOTOGRAPHY ───
// Pexels serves stable, hotlink-friendly URLs. `pexels(id)` builds one from the
// numeric photo id (the number at the end of any pexels.com/photo/... URL).
// ➜ TO SWAP A PHOTO: find one you love on pexels.com, copy the id, replace it below.
const pexels = (id: number, w = 1200) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

// ─── THE CELEBRATIONS (one page per day) ───
// Logistics (time, venue, shuttle, calendar) come from EVENTS_* via eventId, so
// they only need updating in one place. Everything else that informs and excites
// a guest about that day lives here.
export const CELEBRATIONS_EN: Celebration[] = [
  {
    id: 'mehendi', eventId: '1', day: 1, weekday: 'Tuesday', dateLabel: '2 February 2027',
    title: 'Mehendi', subtitle: 'The Henna Afternoon', marathiTitle: 'Mehendi',
    tagline: 'Where the week begins: henna, music, and a slow golden afternoon.',
    heroImage: pexels(28496968), accent: '#C2185B',
    intro: 'Every Indian wedding opens with a breath, not a bang. The Mehendi is ours: a relaxed, sun-drenched afternoon where artists trace intricate henna designs onto Pavitra\'s hands and feet while the ladies gather around with chai, snacks, and music. It is the moment the week officially begins, and the best chance to settle in, meet everyone, and get your own hands decorated.',
    significance: 'Mehendi (henna) is one of the oldest wedding traditions in South Asia. The paste, made from crushed henna leaves, cools the skin and calms a bride\'s nerves before her big days. Folklore adds a twist: the darker the stain, the deeper the love she will receive from her husband and in-laws. Somewhere in Pavitra\'s design, Ramon\'s name will be hidden, and tradition says he has to find it.',
    moments: [
      { time: '11:00 AM', title: 'Doors open', desc: 'Arrive to music, chai, and light bites. Find a spot near the artists.' },
      { title: 'The bridal mehendi', desc: 'Pavitra\'s henna is the centerpiece: an elaborate design that takes hours to apply. Gather round, chat, and watch it come to life.' },
      { title: 'Your turn', desc: 'Professional artists will be on hand to draw a small design on your palm or the back of your hand. Yes, you should.' },
      { title: 'Music & mingling', desc: 'Old Bollywood songs, laughter, and the first real chance to meet family from both sides.' },
      { time: '2:30 PM', title: 'Wind down', desc: 'The paste needs time to set. Head back to the hotel, let it dry, and flake it off for the reveal.' },
    ],
    expect: [
      'A ladies-only gathering. Gentlemen, you have the morning off.',
      'A calm, social pace: think garden party, not dance floor.',
      'Henna paste takes 20 to 30 minutes to dry and a few hours to set. Keep the hand you decorate free for a while.',
      'Light bites and drinks throughout the afternoon.',
      'Lots of photos. The henna, the outfits, and the colours make this one of the prettiest days of the week.',
    ],
    vibe: [
      { label: 'Energy', value: 'Relaxed' },
      { label: 'Dancing', value: 'Optional' },
      { label: 'Mess factor', value: 'Low' },
      { label: 'Duration', value: '3½ hours' },
    ],
    dress: {
      theme: 'Vibrant & Colorful',
      description: 'Fun, casual, and festive. This is the day for florals, bright colours, and anything that makes you happy.',
      women: 'A bright Anarkali, a light Lehenga, a flowy maxi dress, or a printed jumpsuit. Pastels and florals photograph beautifully against the henna.',
      men: 'Not needed: the Mehendi is ladies only. Gentlemen, the Travel Guide has ideas for a free morning in the city.',
      palette: ['#E91E63', '#9C27B0', '#00BCD4', '#8BC34A'],
      tips: [
        'Sleeveless or short sleeves make getting henna easier.',
        'Skip the dark colours: this is the brightest, lightest palette of the week.',
        'Comfortable flats or sandals. You will be sitting, chatting, and moving between rooms.',
        'If you would like henna, keep your right hand free of rings and bracelets.',
      ],
      attireIds: ['anarkali', 'lehenga'],
    },
    glossary: [
      { term: 'Mehendi', meaning: 'Henna: both the plant-based paste and the celebration itself.' },
      { term: 'Dupatta', meaning: 'The long scarf draped over an outfit. Optional today, and handy for the sun.' },
      { term: 'Chai', meaning: 'Spiced milk tea. There will be plenty.' },
      { term: 'Bollywood', meaning: 'Mumbai\'s film industry and the source of most of the music you will hear this week.' },
    ],
    notes: ['Ladies only.', 'Light bites and drinks are served.', 'Wraps up around 2:30 PM.'],
    tips: [
      'Ask the artist for a design that suits your Sangeet and wedding outfits; henna lasts about a week.',
      'Do not wash the hand for a few hours after the paste flakes off. A dab of lemon and sugar helps it darken.',
      'Arrive on time: the earlier you get your henna, the longer it has to set before the afternoon ends.',
    ],
  },
  {
    id: 'haldi', eventId: '2', day: 2, weekday: 'Wednesday', dateLabel: '3 February 2027',
    title: 'Haldi', subtitle: 'The Turmeric Ceremony', marathiTitle: 'Halad Chadavne',
    tagline: 'Yellow everywhere. Drums, laughter, turmeric, and the happiest mess of the week.',
    heroImage: pexels(33508493), accent: '#E6A100',
    intro: 'If the Mehendi is the calm, the Haldi is the storm, a bright, loud, joyful one. Family and friends take turns smearing a golden turmeric paste on Pavitra and Ramon to bless them, and it does not take long before the paste finds its way onto everyone else. Expect drums, dancing, flying flower petals, and the most photogenic chaos you will ever be part of.',
    significance: 'Haldi (turmeric) is sacred in Hindu tradition: it purifies, protects against the evil eye, and gives the skin a natural glow before the wedding. In Maharashtra the ritual is called Halad Chadavne. Applying it is a blessing, so when someone offers you the paste, it is an invitation to bless the couple too. The yellow also stands for new beginnings, which is why the whole day is dressed in it.',
    moments: [
      { time: '1:00 PM', title: 'Arrival', desc: 'Step off the shuttle into a sea of yellow and marigolds. Grab a seat, or better, stay standing.' },
      { title: 'The blessing', desc: 'Family members apply turmeric paste to the couple\'s face, arms, and feet, one by one, with blessings and a lot of teasing.' },
      { title: 'Everyone joins in', desc: 'Guests are invited to add their own dab. This is where it gets messy, and fun.' },
      { title: 'Dhol & dancing', desc: 'Live drummers kick off an impromptu dance session. No choreography needed.' },
      { time: '4:30 PM', title: 'Golden hour', desc: 'Sun-warmed, turmeric-stained, and grinning. Back to the hotel to shower it all off.' },
    ],
    expect: [
      'You will get turmeric on you. Embrace it: that is the point.',
      'Dhol drummers, loud and live. This is the most high-energy daytime event.',
      'A fast, playful ritual followed by a long, relaxed hang.',
      'Flower petals in the air and turmeric on the floor. Keep your phone in a pocket.',
      'Open to everyone. Bring the whole family.',
    ],
    vibe: [
      { label: 'Energy', value: 'High' },
      { label: 'Dancing', value: 'Spontaneous' },
      { label: 'Mess factor', value: 'Maximum' },
      { label: 'Duration', value: '3½ hours' },
    ],
    dress: {
      theme: 'Shades of Yellow & Orange',
      description: 'Simple, breathable, and ready to be stained. Turmeric does not wash out of silk, so leave the good stuff at the hotel.',
      women: 'A yellow or orange Kurta set, a cotton saree, or a sundress. Cotton and linen only.',
      men: 'A yellow or orange cotton Kurta, or a white or yellow linen shirt with chinos. Jeans are fine.',
      palette: ['#FBC02D', '#FFB300', '#FFF176', '#FF9800'],
      tips: [
        'Wear something you would not mind throwing away.',
        'Old sandals or flip-flops. Turmeric on the floor gets slippery.',
        'Avoid white if you want it to stay white.',
        'Consider a change of clothes for the ride home.',
      ],
      attireIds: ['yellow-kurta', 'kurta'],
    },
    glossary: [
      { term: 'Haldi', meaning: 'Turmeric, the golden spice, and the name of the ceremony.' },
      { term: 'Halad Chadavne', meaning: 'The Marathi name for the ritual: "applying the turmeric".' },
      { term: 'Ubtan', meaning: 'The paste itself: turmeric mixed with sandalwood, rosewater, and oil.' },
      { term: 'Dhol', meaning: 'A large two-sided drum played with sticks. When you hear it, dance.' },
    ],
    notes: ['Everyone is welcome.', 'Expect to get stained: dress accordingly.', 'Wraps up around 4:30 PM.'],
    tips: [
      'Turmeric tints skin for a day or two. It is a badge of honour, and it fades.',
      'Coconut oil on your skin beforehand makes the paste easier to wash off.',
      'Take pictures early; by the end everyone is the same shade of gold.',
    ],
  },
  {
    id: 'sangeet', eventId: '3', day: 3, weekday: 'Thursday', dateLabel: '4 February 2027',
    title: 'Vows & Sangeet', subtitle: 'An Evening of Vows, Song & Dance', marathiTitle: 'Sangeet',
    tagline: 'Two families, one dance floor. Dress to shine.',
    heroImage: pexels(28589007), accent: '#5E35B1',
    intro: 'This is the night we have been most excited to plan. It opens as the sun sets over the Mahalaxmi Race Course, with Pavitra and Ramon exchanging vows in their own words in front of everyone they love. Then the Sangeet takes over: choreographed performances by family and friends, dinner under the lights, and an open dance floor that runs Bollywood, Latin, and pop late into the night.',
    significance: 'Sangeet means "sung together". Traditionally the women of both families would gather in the days before a wedding to sing folk songs, tease the groom, and get to know each other. Today it has grown into the biggest party of the week: a night of performances, music, and dancing built to bring two families onto one floor. For us it also carries the vows, a nod to Ramon\'s Panamanian side and the Western ceremony many of you know, so both traditions get their moment.',
    moments: [
      { time: '5:00 PM', title: 'Cocktails on the lawn', desc: 'Arrive at golden hour. Drinks, the racecourse skyline, and the first look at everyone\'s outfits.' },
      { title: 'The vows', desc: 'Pavitra and Ramon exchange personal vows on the lawn. Short, heartfelt, and the emotional centerpiece of the night.' },
      { title: 'Performances', desc: 'Friends and family take the stage with numbers they have been secretly rehearsing for months. Cheer loudly.' },
      { title: 'Dinner', desc: 'A banquet spread with plenty of mild options, clearly labelled.' },
      { time: 'Until 11 PM', title: 'Open dance floor', desc: 'Bollywood, reggaeton, salsa, and pop. Nobody sits this one out.' },
    ],
    expect: [
      'A seated, emotional moment for the vows followed by a full-blown party.',
      'Performances from both families. Some are polished; the best ones are not.',
      'Cocktails, dinner, and a late night. Pace yourself.',
      'A mix of Indian and Western music. Everyone will find a song.',
      'The most glamorous outfits of the week, so bring your camera.',
    ],
    vibe: [
      { label: 'Energy', value: 'Very high' },
      { label: 'Dancing', value: 'Mandatory' },
      { label: 'Mess factor', value: 'None' },
      { label: 'Duration', value: '6 hours' },
    ],
    dress: {
      theme: 'Glitz, Glamour & Indo-Western',
      description: 'A night of dancing and performance. Wear something that sparkles and lets you move. Indian or Western both work; this is the night to mix them.',
      women: 'Lehenga Choli, an embroidered Anarkali, a sequined evening gown, or a cocktail dress with statement jewellery.',
      men: 'Bandhgala jacket, Sherwani, or a sharp suit. No tie needed. A Nehru jacket over a kurta is an easy win.',
      palette: ['#1A237E', '#311B92', '#880E4F', '#FFD700'],
      tips: [
        'Jewel tones and metallics photograph beautifully under the lights.',
        'Comfortable shoes, or a spare pair. You will be dancing for hours.',
        'February evenings are breezy (around 23°C / 73°F); a light shawl is enough.',
        'The lawn is grass. Block heels over stilettos.',
      ],
      attireIds: ['lehenga', 'anarkali', 'bandhgala', 'sherwani'],
    },
    glossary: [
      { term: 'Sangeet', meaning: '"Sung together": the musical celebration before a wedding.' },
      { term: 'Thumka', meaning: 'The signature Bollywood hip move. You will learn it tonight.' },
      { term: 'Nach', meaning: 'Dance, in Hindi. Also what will be yelled at you from the floor.' },
      { term: 'Shaadi', meaning: 'Wedding, in Hindi. As in "shaadi season".' },
    ],
    notes: ['Cocktails and dinner are served.', 'Runs late: until about 11 PM.', 'Mahalaxmi is across the city from the hotel; the shuttle leaves at 4:30 PM sharp.'],
    tips: [
      'If you would like to perform, let us know early: there is always room for one more act.',
      'Learn one Bollywood step before you arrive and you will be a hero on the floor.',
      'Evening traffic in Mumbai is no joke. Be on the shuttle, not in an Uber.',
    ],
  },
  {
    id: 'wedding', eventId: '4', day: 4, weekday: 'Friday', dateLabel: '5 February 2027',
    title: 'Wedding & Reception', subtitle: 'The Maharashtrian Wedding', marathiTitle: 'Lagna',
    tagline: 'Sacred fire, seven steps, and a grand reception to send us off.',
    heroImage: pexels(30171219), accent: '#B71C1C',
    intro: 'The day it all leads to. In a traditional Maharashtrian ceremony, Pavitra and Ramon are married before the sacred fire, with Sanskrit chants, a silk curtain, and a shower of rice from every guest in the room. Then the mood flips: a grand reception dinner where you finally get to hug the newlyweds, raise a glass, and celebrate late into the night.',
    significance: 'Rooted in Vedic tradition, a Hindu wedding treats marriage as a sacred bond, Vivah, witnessed by Agni, the fire. The heart of the ceremony is the Saptapadi: seven steps around the fire, each one a vow of respect, prosperity, and lifelong friendship. Maharashtrian weddings add their own beauty: the Antarpat, a silk curtain held between the couple until the auspicious moment; the Mangalashtak, eight verses of blessing chanted as the curtain falls; and the Mundavalya, strings of pearls tied across the forehead of both bride and groom.',
    moments: [
      { time: '4:30 PM', title: 'Arrival & seating', desc: 'Find a seat with a good view of the mandap, the canopy where the ceremony takes place.' },
      { title: 'The Antarpat', desc: 'A silk curtain is held between Pavitra and Ramon while the priests chant the Mangalashtak. When the final verse ends, the curtain drops and they see each other. Throw your rice.' },
      { title: 'The Saptapadi', desc: 'With the fire as witness, Pavitra and Ramon take seven steps together, each one a vow. This is the moment they are married.' },
      { title: 'Akshata', desc: 'Guests shower the newlyweds with rice grains as blessings. Yes, you too.' },
      { time: 'Until 11 PM', title: 'The reception', desc: 'A grand dinner to close the week. Congratulate the couple, eat well, and celebrate.' },
    ],
    expect: [
      'The ceremony is conducted in Sanskrit by a priest; this page is your guide to the key moments.',
      'A seated ceremony first, then a reception with dinner.',
      'Modest attire is appreciated during the ceremony.',
      'Rice, flower petals, and a lot of emotion.',
      'A grand reception dinner to close the week.',
    ],
    vibe: [
      { label: 'Energy', value: 'Ceremonial, then festive' },
      { label: 'Dancing', value: 'After dinner' },
      { label: 'Mess factor', value: 'Rice in your hair' },
      { label: 'Duration', value: '6½ hours' },
    ],
    dress: {
      theme: 'Traditional Indian',
      description: 'Regal and respectful. This is the main religious ceremony, so modest attire is appreciated. Bring out the silks and the jewellery.',
      women: 'A silk saree (Paithani, the Maharashtrian classic, or Kanjeevaram), a heavy traditional suit, or a formal Lehenga. Cover shoulders for the ceremony.',
      men: 'Sherwani, Kurta with a Nehru jacket, or a formal suit. A dark suit and tie is perfectly appropriate.',
      palette: ['#B71C1C', '#1B5E20', '#E65100', '#FFD700'],
      tips: [
        'Rich colours: reds, greens, golds, and deep oranges are traditional and auspicious.',
        'Avoid black or white as your main colour; both are associated with mourning in Hindu tradition.',
        'Comfortable enough to sit through the ceremony and stand through the reception.',
        'Jewellery is welcome. This is the day to wear it.',
      ],
      attireIds: ['saree', 'lehenga', 'sherwani', 'bandhgala'],
    },
    glossary: [
      { term: 'Lagna', meaning: 'The Marathi word for the wedding ceremony itself.' },
      { term: 'Mandap', meaning: 'The decorated canopy under which the ceremony takes place.' },
      { term: 'Antarpat', meaning: 'The silk curtain held between bride and groom until the auspicious moment.' },
      { term: 'Mangalashtak', meaning: 'Eight verses of blessing sung as the curtain is lowered.' },
      { term: 'Saptapadi', meaning: 'The seven steps around the sacred fire: the moment of marriage.' },
      { term: 'Mundavalya', meaning: 'Pearl strings tied across the forehead, worn by Maharashtrian brides and grooms.' },
      { term: 'Akshata', meaning: 'Rice grains, tinted with turmeric, thrown as blessings.' },
    ],
    notes: ['Ceremony first, reception dinner after.', 'Runs late: until about 11 PM.', 'BKC is a short ride from the hotel, but arrive on time: the ceremony starts at a fixed auspicious hour.'],
    tips: [
      'Be seated before the Antarpat: the muhurta (auspicious moment) will not wait.',
      'Keep the rice handed to you for the moment the curtain drops; that is when everyone throws it.',
      'Gifts are not expected, but if you would like to give something, see the Registry.',
    ],
  },
];

export const CELEBRATIONS_ES: Celebration[] = [
  {
    id: 'mehendi', eventId: '1', day: 1, weekday: 'Martes', dateLabel: '2 de febrero de 2027',
    title: 'Mehendi', subtitle: 'La Tarde de la Henna', marathiTitle: 'Mehendi',
    tagline: 'Donde empieza la semana: henna, música y una tarde dorada sin prisa.',
    heroImage: pexels(28496968), accent: '#C2185B',
    intro: 'Toda boda india empieza con una respiración, no con una explosión. El Mehendi es la nuestra: una tarde relajada y soleada en la que artistas dibujan intrincados diseños de henna en las manos y los pies de Pavitra mientras las mujeres se reúnen con chai, bocadillos y música. Es el momento en que la semana empieza oficialmente y la mejor ocasión para aclimatarse, conocer a todos y decorarte las manos.',
    significance: 'El Mehendi (henna) es una de las tradiciones nupciales más antiguas del sur de Asia. La pasta, hecha de hojas de henna molidas, refresca la piel y calma los nervios de la novia antes de sus grandes días. El folclore añade un giro: cuanto más oscura la mancha, más profundo será el amor que recibirá de su esposo y su familia política. En algún lugar del diseño de Pavitra estará escondido el nombre de Ramón, y la tradición dice que él tiene que encontrarlo.',
    moments: [
      { time: '11:00 AM', title: 'Se abren las puertas', desc: 'Llega con música, chai y bocadillos. Busca un lugar cerca de las artistas.' },
      { title: 'El mehendi de la novia', desc: 'La henna de Pavitra es el centro de todo: un diseño elaborado que toma horas. Acércate, conversa y míralo cobrar vida.' },
      { title: 'Tu turno', desc: 'Habrá artistas profesionales para dibujarte un diseño pequeño en la palma o el dorso de la mano. Sí, deberías.' },
      { title: 'Música y conversación', desc: 'Canciones clásicas de Bollywood, risas y la primera oportunidad real de conocer a la familia de ambos lados.' },
      { time: '2:30 PM', title: 'Cierre', desc: 'La pasta necesita tiempo para fijarse. Regresa al hotel, déjala secar y retírala para ver el resultado.' },
    ],
    expect: [
      'Una reunión solo para damas. Caballeros, tienen la mañana libre.',
      'Un ritmo tranquilo y social: piensa en una fiesta de jardín, no en una pista de baile.',
      'La henna tarda de 20 a 30 minutos en secar y unas horas en fijarse. Mantén libre la mano que decores por un rato.',
      'Bocadillos y bebidas durante toda la tarde.',
      'Muchas fotos. La henna, los atuendos y los colores hacen de este uno de los días más bonitos de la semana.',
    ],
    vibe: [
      { label: 'Energía', value: 'Relajada' },
      { label: 'Baile', value: 'Opcional' },
      { label: 'Nivel de desorden', value: 'Bajo' },
      { label: 'Duración', value: '3½ horas' },
    ],
    dress: {
      theme: 'Vibrante y Colorido',
      description: 'Divertido, casual y festivo. Es el día de los estampados florales, los colores vivos y cualquier cosa que te haga feliz.',
      women: 'Un Anarkali brillante, una Lehenga ligera, un vestido largo vaporoso o un enterizo estampado. Los pasteles y florales lucen preciosos junto a la henna.',
      men: 'No aplica: el Mehendi es solo para damas. Caballeros, la Guía de Viaje tiene ideas para una mañana libre en la ciudad.',
      palette: ['#E91E63', '#9C27B0', '#00BCD4', '#8BC34A'],
      tips: [
        'Sin mangas o mangas cortas facilitan la aplicación de la henna.',
        'Evita los colores oscuros: esta es la paleta más luminosa de la semana.',
        'Sandalias o zapatos planos cómodos. Estarás sentada, conversando y moviéndote entre salones.',
        'Si quieres henna, lleva la mano derecha libre de anillos y pulseras.',
      ],
      attireIds: ['anarkali', 'lehenga'],
    },
    glossary: [
      { term: 'Mehendi', meaning: 'Henna: tanto la pasta vegetal como la celebración misma.' },
      { term: 'Dupatta', meaning: 'El pañuelo largo que se drapea sobre el atuendo. Opcional hoy, y útil para el sol.' },
      { term: 'Chai', meaning: 'Té con leche y especias. Habrá de sobra.' },
      { term: 'Bollywood', meaning: 'La industria del cine de Mumbai y la fuente de casi toda la música de esta semana.' },
    ],
    notes: ['Solo para damas.', 'Se sirven bocadillos y bebidas.', 'Termina alrededor de las 2:30 PM.'],
    tips: [
      'Pídele a la artista un diseño que combine con tus atuendos del Sangeet y la boda; la henna dura cerca de una semana.',
      'No te laves la mano durante unas horas después de retirar la pasta. Un toque de limón con azúcar ayuda a que oscurezca.',
      'Llega a tiempo: cuanto antes te hagan la henna, más tiempo tendrá para fijarse antes de que termine la tarde.',
    ],
  },
  {
    id: 'haldi', eventId: '2', day: 2, weekday: 'Miércoles', dateLabel: '3 de febrero de 2027',
    title: 'Haldi', subtitle: 'La Ceremonia de la Cúrcuma', marathiTitle: 'Halad Chadavne',
    tagline: 'Amarillo por todas partes. Tambores, risas, cúrcuma y el desorden más feliz de la semana.',
    heroImage: pexels(33508493), accent: '#E6A100',
    intro: 'Si el Mehendi es la calma, el Haldi es la tormenta: brillante, ruidosa y alegre. Familiares y amigos se turnan para untar una pasta dorada de cúrcuma sobre Pavitra y Ramón como bendición, y no pasa mucho tiempo antes de que la pasta llegue a todos los demás. Espera tambores, baile, pétalos de flores volando y el caos más fotogénico del que hayas sido parte.',
    significance: 'El Haldi (cúrcuma) es sagrado en la tradición hindú: purifica, protege del mal de ojo y da a la piel un brillo natural antes de la boda. En Maharashtra el ritual se llama Halad Chadavne. Aplicarlo es una bendición, así que cuando alguien te ofrezca la pasta, es una invitación a bendecir también a la pareja. El amarillo simboliza además los nuevos comienzos, y por eso todo el día se viste de ese color.',
    moments: [
      { time: '1:00 PM', title: 'Llegada', desc: 'Baja del transporte a un mar de amarillo y caléndulas. Busca asiento, o mejor, quédate de pie.' },
      { title: 'La bendición', desc: 'Los familiares aplican la pasta de cúrcuma en la cara, los brazos y los pies de la pareja, uno por uno, con bendiciones y muchas bromas.' },
      { title: 'Todos participan', desc: 'Los invitados están invitados a poner su propio toque. Aquí es donde se pone desordenado, y divertido.' },
      { title: 'Dhol y baile', desc: 'Los tambores en vivo arrancan una sesión de baile improvisada. No hace falta coreografía.' },
      { time: '4:30 PM', title: 'Hora dorada', desc: 'Con sol, teñidos de cúrcuma y sonriendo. De regreso al hotel a quitárselo todo en la ducha.' },
    ],
    expect: [
      'Te va a caer cúrcuma. Acéptalo: de eso se trata.',
      'Tambores dhol, fuertes y en vivo. Es el evento diurno de mayor energía.',
      'Un ritual rápido y juguetón seguido de una larga sobremesa relajada.',
      'Pétalos en el aire y cúrcuma en el piso. Guarda el teléfono en el bolsillo.',
      'Abierto a todos. Trae a toda la familia.',
    ],
    vibe: [
      { label: 'Energía', value: 'Alta' },
      { label: 'Baile', value: 'Espontáneo' },
      { label: 'Nivel de desorden', value: 'Máximo' },
      { label: 'Duración', value: '3½ horas' },
    ],
    dress: {
      theme: 'Tonos de Amarillo y Naranja',
      description: 'Sencillo, fresco y listo para mancharse. La cúrcuma no sale de la seda, así que deja lo bueno en el hotel.',
      women: 'Un conjunto Kurta amarillo o naranja, un sari de algodón o un vestido de verano. Solo algodón y lino.',
      men: 'Una Kurta de algodón amarilla o naranja, o una camisa de lino blanca o amarilla con chinos. Los jeans están bien.',
      palette: ['#FBC02D', '#FFB300', '#FFF176', '#FF9800'],
      tips: [
        'Usa algo que no te importe desechar.',
        'Sandalias viejas o chanclas. La cúrcuma en el piso se vuelve resbalosa.',
        'Evita el blanco si quieres que siga siendo blanco.',
        'Considera llevar ropa de cambio para el regreso.',
      ],
      attireIds: ['yellow-kurta', 'kurta'],
    },
    glossary: [
      { term: 'Haldi', meaning: 'Cúrcuma, la especia dorada, y el nombre de la ceremonia.' },
      { term: 'Halad Chadavne', meaning: 'El nombre en marathi del ritual: "aplicar la cúrcuma".' },
      { term: 'Ubtan', meaning: 'La pasta misma: cúrcuma mezclada con sándalo, agua de rosas y aceite.' },
      { term: 'Dhol', meaning: 'Un gran tambor de dos caras que se toca con baquetas. Cuando lo escuches, baila.' },
    ],
    notes: ['Todos son bienvenidos.', 'Espera mancharte: vístete en consecuencia.', 'Termina alrededor de las 4:30 PM.'],
    tips: [
      'La cúrcuma tiñe la piel por uno o dos días. Es una medalla de honor, y se va.',
      'Aceite de coco en la piel antes de llegar hace que la pasta se lave más fácil.',
      'Toma fotos temprano; al final todos son del mismo tono dorado.',
    ],
  },
  {
    id: 'sangeet', eventId: '3', day: 3, weekday: 'Jueves', dateLabel: '4 de febrero de 2027',
    title: 'Votos y Sangeet', subtitle: 'Una Noche de Votos, Canto y Baile', marathiTitle: 'Sangeet',
    tagline: 'Dos familias, una pista de baile. Vístete para brillar.',
    heroImage: pexels(28589007), accent: '#5E35B1',
    intro: 'Esta es la noche que más nos ha emocionado planear. Empieza mientras el sol se pone sobre el Hipódromo de Mahalaxmi, con Pavitra y Ramón intercambiando votos con sus propias palabras frente a todos los que aman. Luego el Sangeet toma el control: presentaciones coreografiadas de familiares y amigos, cena bajo las luces y una pista abierta con Bollywood, música latina y pop hasta tarde.',
    significance: 'Sangeet significa "cantado juntos". Tradicionalmente, las mujeres de ambas familias se reunían en los días previos a la boda para cantar canciones populares, bromear con el novio y conocerse. Hoy se ha convertido en la fiesta más grande de la semana: una noche de presentaciones, música y baile hecha para llevar a dos familias a una misma pista. Para nosotros también incluye los votos, un guiño al lado panameño de Ramón y a la ceremonia occidental que muchos conocen, para que ambas tradiciones tengan su momento.',
    moments: [
      { time: '5:00 PM', title: 'Cócteles en el césped', desc: 'Llega a la hora dorada. Bebidas, el horizonte del hipódromo y el primer vistazo a los atuendos de todos.' },
      { title: 'Los votos', desc: 'Pavitra y Ramón intercambian votos personales en el césped. Breves, sentidos y el corazón emocional de la noche.' },
      { title: 'Presentaciones', desc: 'Amigos y familiares suben al escenario con números que han ensayado en secreto durante meses. Aplaude fuerte.' },
      { title: 'Cena', desc: 'Un banquete con muchas opciones suaves, claramente etiquetadas.' },
      { time: 'Hasta las 11 PM', title: 'Pista abierta', desc: 'Bollywood, reguetón, salsa y pop. Nadie se queda sentado.' },
    ],
    expect: [
      'Un momento emotivo y sentado para los votos, seguido de una fiesta en toda regla.',
      'Presentaciones de ambas familias. Algunas pulidas; las mejores, no.',
      'Cócteles, cena y una noche larga. Dosifica tus energías.',
      'Una mezcla de música india y occidental. Todos encontrarán su canción.',
      'Los atuendos más glamorosos de la semana, así que trae tu cámara.',
    ],
    vibe: [
      { label: 'Energía', value: 'Muy alta' },
      { label: 'Baile', value: 'Obligatorio' },
      { label: 'Nivel de desorden', value: 'Ninguno' },
      { label: 'Duración', value: '6 horas' },
    ],
    dress: {
      theme: 'Brillo, Glamour e Indo-Occidental',
      description: 'Una noche de baile y espectáculo. Ponte algo que brille y te deje moverte. Indio u occidental, ambos funcionan; esta es la noche para mezclarlos.',
      women: 'Lehenga Choli, un Anarkali bordado, un vestido de noche con lentejuelas o un vestido de cóctel con joyería llamativa.',
      men: 'Chaqueta Bandhgala, Sherwani o un traje elegante. No hace falta corbata. Una chaqueta Nehru sobre una kurta es un acierto seguro.',
      palette: ['#1A237E', '#311B92', '#880E4F', '#FFD700'],
      tips: [
        'Los tonos joya y los metálicos lucen preciosos bajo las luces.',
        'Zapatos cómodos, o un par de repuesto. Bailarás por horas.',
        'Las noches de febrero son frescas (unos 23°C); un chal ligero es suficiente.',
        'El césped es césped. Tacón ancho antes que aguja.',
      ],
      attireIds: ['lehenga', 'anarkali', 'bandhgala', 'sherwani'],
    },
    glossary: [
      { term: 'Sangeet', meaning: '"Cantado juntos": la celebración musical previa a la boda.' },
      { term: 'Thumka', meaning: 'El movimiento de cadera característico de Bollywood. Lo aprenderás esta noche.' },
      { term: 'Nach', meaning: 'Baile, en hindi. También lo que te gritarán desde la pista.' },
      { term: 'Shaadi', meaning: 'Boda, en hindi. Como en "temporada de shaadi".' },
    ],
    notes: ['Se sirven cócteles y cena.', 'Termina tarde: alrededor de las 11 PM.', 'Mahalaxmi está al otro lado de la ciudad; el transporte sale a las 4:30 PM en punto.'],
    tips: [
      'Si quieres presentar un número, avísanos con tiempo: siempre hay espacio para uno más.',
      'Aprende un paso de Bollywood antes de llegar y serás la estrella de la pista.',
      'El tráfico nocturno en Mumbai no es broma. Ve en el transporte, no en un Uber.',
    ],
  },
  {
    id: 'wedding', eventId: '4', day: 4, weekday: 'Viernes', dateLabel: '5 de febrero de 2027',
    title: 'Boda y Recepción', subtitle: 'La Boda Maharashtriana', marathiTitle: 'Lagna',
    tagline: 'Fuego sagrado, siete pasos y una gran recepción para despedirnos.',
    heroImage: pexels(30171219), accent: '#B71C1C',
    intro: 'El día al que todo conduce. En una ceremonia tradicional maharashtriana, Pavitra y Ramón se casan ante el fuego sagrado, con cantos en sánscrito, una cortina de seda y una lluvia de arroz de cada invitado en la sala. Luego cambia el ambiente: una gran cena de recepción donde por fin podrás abrazar a los recién casados, brindar y celebrar hasta tarde.',
    significance: 'Arraigada en la tradición védica, una boda hindú entiende el matrimonio como un vínculo sagrado, Vivah, con Agni, el fuego, como testigo. El corazón de la ceremonia es el Saptapadi: siete pasos alrededor del fuego, cada uno un voto de respeto, prosperidad y amistad de por vida. Las bodas maharashtrianas añaden su propia belleza: el Antarpat, una cortina de seda sostenida entre la pareja hasta el momento auspicioso; el Mangalashtak, ocho versos de bendición cantados mientras cae la cortina; y el Mundavalya, hilos de perlas atados sobre la frente de la novia y el novio.',
    moments: [
      { time: '4:30 PM', title: 'Llegada y asientos', desc: 'Busca un asiento con buena vista del mandap, el dosel bajo el cual ocurre la ceremonia.' },
      { title: 'El Antarpat', desc: 'Una cortina de seda se sostiene entre Pavitra y Ramón mientras los sacerdotes cantan el Mangalashtak. Al terminar el último verso, la cortina cae y se ven el uno al otro. Lanza tu arroz.' },
      { title: 'El Saptapadi', desc: 'Con el fuego como testigo, Pavitra y Ramón dan siete pasos juntos, cada uno un voto. Este es el momento en que quedan casados.' },
      { title: 'Akshata', desc: 'Los invitados bañan a los recién casados con granos de arroz como bendición. Sí, tú también.' },
      { time: 'Hasta las 11 PM', title: 'La recepción', desc: 'Una gran cena para cerrar la semana. Felicita a la pareja, come bien y celebra.' },
    ],
    expect: [
      'La ceremonia la conduce un sacerdote en sánscrito; esta página es tu guía de los momentos clave.',
      'Primero una ceremonia sentada, luego una recepción con cena.',
      'Se agradece vestimenta modesta durante la ceremonia.',
      'Arroz, pétalos de flores y mucha emoción.',
      'Una gran cena de recepción para cerrar la semana.',
    ],
    vibe: [
      { label: 'Energía', value: 'Ceremonial, luego festiva' },
      { label: 'Baile', value: 'Después de la cena' },
      { label: 'Nivel de desorden', value: 'Arroz en el pelo' },
      { label: 'Duración', value: '6½ horas' },
    ],
    dress: {
      theme: 'Indio Tradicional',
      description: 'Regio y respetuoso. Esta es la ceremonia religiosa principal, así que se agradece vestimenta modesta. Saca las sedas y la joyería.',
      women: 'Un sari de seda (Paithani, el clásico maharashtriano, o Kanjeevaram), un traje tradicional elaborado o una Lehenga formal. Cubre los hombros durante la ceremonia.',
      men: 'Sherwani, Kurta con chaqueta Nehru o un traje formal. Un traje oscuro con corbata es perfectamente apropiado.',
      palette: ['#B71C1C', '#1B5E20', '#E65100', '#FFD700'],
      tips: [
        'Colores intensos: rojos, verdes, dorados y naranjas profundos son tradicionales y auspiciosos.',
        'Evita el negro o el blanco como color principal; ambos se asocian con el luto en la tradición hindú.',
        'Lo bastante cómodo para sentarte durante la ceremonia y estar de pie en la recepción.',
        'La joyería es bienvenida. Este es el día para usarla.',
      ],
      attireIds: ['saree', 'lehenga', 'sherwani', 'bandhgala'],
    },
    glossary: [
      { term: 'Lagna', meaning: 'La palabra en marathi para la ceremonia de boda.' },
      { term: 'Mandap', meaning: 'El dosel decorado bajo el cual se celebra la ceremonia.' },
      { term: 'Antarpat', meaning: 'La cortina de seda sostenida entre los novios hasta el momento auspicioso.' },
      { term: 'Mangalashtak', meaning: 'Ocho versos de bendición cantados mientras se baja la cortina.' },
      { term: 'Saptapadi', meaning: 'Los siete pasos alrededor del fuego sagrado: el momento del matrimonio.' },
      { term: 'Mundavalya', meaning: 'Hilos de perlas atados sobre la frente, usados por novias y novios maharashtrianos.' },
      { term: 'Akshata', meaning: 'Granos de arroz teñidos con cúrcuma que se lanzan como bendición.' },
    ],
    notes: ['Primero la ceremonia, después la cena de recepción.', 'Termina tarde: alrededor de las 11 PM.', 'BKC está cerca del hotel, pero llega a tiempo: la ceremonia empieza a una hora auspiciosa fija.'],
    tips: [
      'Ocupa tu asiento antes del Antarpat: el muhurta (momento auspicioso) no espera.',
      'Guarda el arroz que te entreguen para el momento en que cae la cortina; ahí es cuando todos lo lanzan.',
      'No se esperan regalos, pero si quieres dar algo, visita la sección de Regalos.',
    ],
  },
];

/** Look up a celebration by its id (route param) in the given language. */
export function getCelebration(id: string | undefined, lang: 'en' | 'es'): Celebration | undefined {
  return (lang === 'en' ? CELEBRATIONS_EN : CELEBRATIONS_ES).find((c) => c.id === id);
}

// ─── ATTIRE GLOSSARY ───
export const ATTIRE_GUIDE_EN: AttireItem[] = [
  { id: 'yellow-kurta', name: 'Kurta Set', pronunciation: 'Kur-ta', gender: 'Women', description: 'A comfortable, lightweight tunic worn with pants or leggings. Yellow or Orange is the traditional color for the Haldi ceremony as it signifies purity and glow.', bestFor: ['Haldi'], imageUrl: 'https://raw.githubusercontent.com/rf0513/pavitra-and-ramon-wedding/main/yellow-kurta.png' },
  { id: 'lehenga', name: 'Lehenga Choli', pronunciation: 'Leh-hen-gah', gender: 'Women', description: 'A three-piece outfit consisting of a long, full skirt (Lehenga), a fitted blouse (Choli), and a scarf drape (Dupatta). They can be simple or heavily embroidered.', bestFor: ['Vows & Sangeet', 'Wedding & Reception'], imageUrl: pexels(8881954, 800) },
  { id: 'saree', name: 'Saree', pronunciation: 'Saa-ree', gender: 'Women', description: 'A long drape of fabric (usually 6-9 yards) wrapped around the waist and draped over the shoulder, worn over a petticoat and a blouse. For our wedding, "Paithani" silk sarees are the local favorite.', bestFor: ['Wedding & Reception'], imageUrl: pexels(7037125, 800) },
  { id: 'kurta', name: 'Kurta Pajama', pronunciation: 'Kur-ta Pa-ja-ma', gender: 'Men', description: 'A loose, collarless shirt (Kurta) falling below the knees, worn with lightweight trousers (Pajama). It is comfortable and perfect for daytime events.', bestFor: ['Haldi', 'Mehendi'], imageUrl: pexels(28113665, 800) },
  { id: 'sherwani', name: 'Sherwani', pronunciation: 'Sher-va-nee', gender: 'Men', description: 'A coat-like garment worn over a kurta, usually made of heavier fabric like silk or wool with lining. It is the equivalent of a tuxedo in Indian formal wear.', bestFor: ['Wedding & Reception'], imageUrl: pexels(11748430, 800) },
  { id: 'anarkali', name: 'Anarkali', pronunciation: 'Ah-nar-ka-lee', gender: 'Women', description: 'A long, frock-style top that flares out from the waist, worn with slim pants. It is essentially a very elegant dress and is comfortable for dancing.', bestFor: ['Mehendi', 'Vows & Sangeet'], imageUrl: pexels(18380706, 800) },
  { id: 'bandhgala', name: 'Bandhgala / Jodhpuri', pronunciation: 'Band-ga-la', gender: 'Men', description: 'A formal evening suit featuring a coat with a standing collar (Nehru collar). It looks sharp, modern, and is a great alternative to a western suit.', bestFor: ['Vows & Sangeet', 'Wedding & Reception'], imageUrl: 'https://manyavar.scene7.com/is/image/manyavar/8905100475357.23637_19-05-2023-10-17:650x900?&dpr=on,2' },
];

export const ATTIRE_GUIDE_ES: AttireItem[] = [
  { id: 'yellow-kurta', name: 'Kurta', pronunciation: 'Kur-ta', gender: 'Women', description: 'Una túnica cómoda y ligera que se usa con pantalones o leggings. El amarillo o naranja es el color tradicional de la ceremonia Haldi, ya que significa pureza y brillo.', bestFor: ['Haldi'], imageUrl: 'https://raw.githubusercontent.com/rf0513/pavitra-and-ramon-wedding/main/yellow-kurta.png' },
  { id: 'lehenga', name: 'Lehenga Choli', pronunciation: 'Leh-hen-gah', gender: 'Women', description: 'Un traje de tres piezas que consta de una falda larga y amplia (Lehenga), una blusa ajustada (Choli) y una bufanda drapeada (Dupatta). Pueden ser simples o muy bordados.', bestFor: ['Votos y Sangeet', 'Boda y Recepción'], imageUrl: pexels(8881954, 800) },
  { id: 'saree', name: 'Sari', pronunciation: 'Saa-ree', gender: 'Women', description: 'Una larga tela (generalmente 6-9 yardas) envuelta alrededor de la cintura y drapeada sobre el hombro, usada sobre una enagua y una blusa. Para nuestra boda, los saris de seda "Paithani" son los favoritos locales.', bestFor: ['Boda y Recepción'], imageUrl: pexels(7037125, 800) },
  { id: 'kurta', name: 'Kurta Pajama', pronunciation: 'Kur-ta Pa-ja-ma', gender: 'Men', description: 'Una camisa suelta y sin cuello (Kurta) que cae por debajo de las rodillas, usada con pantalones ligeros (Pajama). Es cómodo y perfecto para eventos diurnos.', bestFor: ['Haldi', 'Mehendi'], imageUrl: pexels(28113665, 800) },
  { id: 'sherwani', name: 'Sherwani', pronunciation: 'Sher-va-nee', gender: 'Men', description: 'Una prenda similar a un abrigo que se usa sobre una kurta, generalmente hecha de tela más pesada como seda o lana con forro. Es el equivalente a un esmoquin en la vestimenta formal india.', bestFor: ['Boda y Recepción'], imageUrl: pexels(11748430, 800) },
  { id: 'anarkali', name: 'Anarkali', pronunciation: 'Ah-nar-ka-lee', gender: 'Women', description: 'Un top largo estilo vestido que se ensancha desde la cintura, usado con pantalones ajustados. Es esencialmente un vestido muy elegante y es cómodo para bailar.', bestFor: ['Mehendi', 'Votos y Sangeet'], imageUrl: pexels(18380706, 800) },
  { id: 'bandhgala', name: 'Bandhgala / Jodhpuri', pronunciation: 'Band-ga-la', gender: 'Men', description: 'Un traje de noche formal que presenta un abrigo con cuello alto (cuello Nehru). Se ve elegante, moderno y es una gran alternativa a un traje occidental.', bestFor: ['Votos y Sangeet', 'Boda y Recepción'], imageUrl: 'https://manyavar.scene7.com/is/image/manyavar/8905100475357.23637_19-05-2023-10-17:650x900?&dpr=on,2' },
];

// ─── TRAVEL: SIGHTS / SHOPPING / FOOD ───
export const SIGHTSEEING_EN: TravelSpot[] = [
  { id: 'gateway', title: 'Gateway of India', desc: "Mumbai's most iconic monument. Built in 1924, it overlooks the Arabian Sea. Free public entry. We recommend visiting in the early morning or at sunset for the best photos without the intense heat.", img: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=800&auto=format&fit=crop', query: 'Gateway of India, Apollo Bandar, Colaba, Mumbai, Maharashtra 400001', link: 'https://www.tripadvisor.com/AttractionProductReview-g304554-d11487374-Private_Mumbai_Sightseeing_Tour_Traveller_s_Choice_Award_Winner-Mumbai_Maharashtra.html' },
  { id: 'elephanta', title: 'Elephanta Caves', desc: 'A UNESCO World Heritage site featuring rock-cut Hindu caves dedicated to Lord Shiva. It requires a fun ferry ride from Gateway of India.', img: 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?q=80&w=800&auto=format&fit=crop', query: 'Elephanta Caves, Gharapuri, Maharashtra 400094', link: 'https://www.tripadvisor.com/AttractionProductReview-g304554-d17800956-Elephanta_Caves_Island_Guided_Private_Tour-Mumbai_Maharashtra.html' },
  { id: 'siddhi', title: 'Siddhivinayak Temple', desc: "Mumbai's most famous and affluent temple dedicated to Lord Ganesha. It is a spiritual power center. Pro-tip: Book a 'Special Darshan' pass online to skip the long queues.", img: `${GH_RAW}siddhivinayak-temple-mumbai.jpg?raw=true`, query: 'Siddhivinayak Temple, SK Bole Marg, Prabhadevi, Mumbai, Maharashtra 400028', link: 'https://www.siddhivinayak.org/' },
  { id: 'csmvs', title: 'CSMVS Museum', desc: 'The Chhatrapati Shivaji Maharaj Vastu Sangrahalaya is a stunning Indo-Saracenic masterpiece. It is air-conditioned, peaceful, and houses incredible Indian art.', img: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxAVarqGSXmRhkIrXK7G0ZLunq9qAvw3Sf61owqcc_28NqpeEH3J2EnsYgMivA7-tc-UcjZOmg6HtVHjHsPWI5V8RXfuSSD6Bt7cpv5ZU2auU78rgyu54NU8mZSkxYyhCuh-2rU=s680-w680-h510-rw', query: 'Chhatrapati Shivaji Maharaj Vastu Sangrahalaya, Mahatma Gandhi Road, Kala Ghoda, Fort, Mumbai, Maharashtra 400023', link: 'https://booking.csmvs.in/' },
];

export const SIGHTSEEING_ES: TravelSpot[] = [
  { id: 'gateway', title: 'Puerta de la India', desc: 'El monumento más emblemático de Mumbai. Construido en 1924, domina el Mar Arábigo. Entrada pública gratuita. Recomendamos visitarlo temprano en la mañana o al atardecer para obtener las mejores fotos sin el intenso calor.', img: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=800&auto=format&fit=crop', query: 'Gateway of India, Apollo Bandar, Colaba, Mumbai, Maharashtra 400001', link: 'https://www.tripadvisor.com/AttractionProductReview-g304554-d11487374-Private_Mumbai_Sightseeing_Tour_Traveller_s_Choice_Award_Winner-Mumbai_Maharashtra.html' },
  { id: 'elephanta', title: 'Cuevas de Elephanta', desc: 'Un sitio del Patrimonio Mundial de la UNESCO con cuevas hindúes excavadas en la roca dedicadas a Lord Shiva. Requiere un divertido viaje en ferry desde la Puerta de la India.', img: 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?q=80&w=800&auto=format&fit=crop', query: 'Elephanta Caves, Gharapuri, Maharashtra 400094', link: 'https://www.tripadvisor.com/AttractionProductReview-g304554-d17800956-Elephanta_Caves_Island_Guided_Private_Tour-Mumbai_Maharashtra.html' },
  { id: 'siddhi', title: 'Templo Siddhivinayak', desc: "El templo más famoso de Mumbai dedicado a Lord Ganesha. Es un centro de poder espiritual. Consejo: Reserve un pase de 'Darshan Especial' en línea para evitar las largas filas.", img: `${GH_RAW}siddhivinayak-temple-mumbai.jpg?raw=true`, query: 'Siddhivinayak Temple, SK Bole Marg, Prabhadevi, Mumbai, Maharashtra 400028', link: 'https://www.siddhivinayak.org/' },
  { id: 'csmvs', title: 'Museo CSMVS', desc: 'El Chhatrapati Shivaji Maharaj Vastu Sangrahalaya es una impresionante obra maestra indo-sarracena. Tiene aire acondicionado, es tranquilo y alberga increíble arte indio.', img: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxAVarqGSXmRhkIrXK7G0ZLunq9qAvw3Sf61owqcc_28NqpeEH3J2EnsYgMivA7-tc-UcjZOmg6HtVHjHsPWI5V8RXfuSSD6Bt7cpv5ZU2auU78rgyu54NU8mZSkxYyhCuh-2rU=s680-w680-h510-rw', query: 'Chhatrapati Shivaji Maharaj Vastu Sangrahalaya, Mahatma Gandhi Road, Kala Ghoda, Fort, Mumbai, Maharashtra 400023', link: 'https://booking.csmvs.in/' },
];

export const SHOPPING_EN: (TravelSpot & { cta: string })[] = [
  { id: 'goodearth', title: 'Good Earth (Colaba)', desc: 'The pinnacle of Indian luxury design. Sustainable apparel, home décor, and dining. It is located in a beautiful heritage building. Zero bargaining required.', img: 'https://djhiy8e1dslha.cloudfront.net/media/store_locator/MCG_2.jpg', query: 'Good Earth, Raghuvanshi Mills Compound, Senapati Bapat Marg, Lower Parel, Mumbai, Maharashtra 400013', link: 'https://www.goodearth.in/', cta: 'Visit Website' },
  { id: 'jio', title: 'Jio World Plaza', desc: 'For those who prefer a world-class mall experience. It houses top international brands alongside premium Indian designers. Very comfortable and high-end.', img: 'https://assets.gqindia.com/photos/6540d8942c253e02d52d3d1a/3:2/w_1620,h_1080,c_limit/Jio-World-Plaza-Everything-to-know-about-Indias-largest-luxury-mall-owned-by-Mukesh-Ambani.jpg', query: 'Jio World Plaza, G Block BKC, Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051', link: 'https://www.jioworldplaza.com/', cta: 'Visit Website' },
  { id: 'colaba', title: 'Colaba Causeway', desc: 'The iconic street shopping experience. Located walking distance from Gateway of India, it is safe and vibrant. Buy cheap jewelry and shawls. Rule #1: Start bargaining at 50% of the asking price.', img: 'https://www.theleela.com/prod/content/assets/aio-banner/dekstop/Colaba-Causeway.jpg?VersionId=2g.NeK1FW2Tc08yI6VZRFNWTX6EoGyfS', query: 'Colaba Causeway, Colaba, Mumbai, Maharashtra', link: 'https://www.youtube.com/watch?v=sLer0zRADaQ', cta: 'Watch Video' },
];

export const SHOPPING_ES: (TravelSpot & { cta: string })[] = [
  { id: 'goodearth', title: 'Good Earth (Colaba)', desc: 'La cima del diseño de lujo indio. Ropa sostenible, decoración del hogar y cenas. Se encuentra en un hermoso edificio patrimonial. No se requiere regateo.', img: 'https://djhiy8e1dslha.cloudfront.net/media/store_locator/MCG_2.jpg', query: 'Good Earth, Raghuvanshi Mills Compound, Senapati Bapat Marg, Lower Parel, Mumbai, Maharashtra 400013', link: 'https://www.goodearth.in/', cta: 'Visitar Sitio' },
  { id: 'jio', title: 'Jio World Plaza', desc: 'Para aquellos que prefieren una experiencia de centro comercial de clase mundial. Alberga las mejores marcas internacionales junto con diseñadores indios premium. Muy cómodo y de alta gama.', img: 'https://assets.gqindia.com/photos/6540d8942c253e02d52d3d1a/3:2/w_1620,h_1080,c_limit/Jio-World-Plaza-Everything-to-know-about-Indias-largest-luxury-mall-owned-by-Mukesh-Ambani.jpg', query: 'Jio World Plaza, G Block BKC, Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051', link: 'https://www.jioworldplaza.com/', cta: 'Visitar Sitio' },
  { id: 'colaba', title: 'Colaba Causeway', desc: 'La icónica experiencia de compras callejeras. Ubicado a poca distancia de la Puerta de la India, es seguro y vibrante. Compre joyas y chales baratos. Regla #1: Comience a regatear al 50% del precio inicial.', img: 'https://www.theleela.com/prod/content/assets/aio-banner/dekstop/Colaba-Causeway.jpg?VersionId=2g.NeK1FW2Tc08yI6VZRFNWTX6EoGyfS', query: 'Colaba Causeway, Colaba, Mumbai, Maharashtra', link: 'https://www.youtube.com/watch?v=sLer0zRADaQ', cta: 'Ver Video' },
];

export const FOOD_EN: TravelSpot[] = [
  { id: 'sealounge', title: 'Sea Lounge at The Taj', desc: 'Experience an old-world High Tea overlooking the harbor. Quiet, elegant, and historically significant.', query: 'Sea Lounge, The Taj Mahal Palace, Apollo Bandar, Colaba, Mumbai, Maharashtra 400001', link: 'https://www.tajhotels.com/en-in/hotels/taj-mahal-palace-mumbai/restaurants/sea-lounge-mumbai' },
  { id: 'masque', title: 'Masque', desc: "Consistently voted India's Best Restaurant. An ingredient-driven tasting menu of 10+ courses for foodies in a repurposed textile mill.", query: 'Masque Restaurant, Shakti Mills Lane, Mahalakshmi, Mumbai, Maharashtra 400011', link: 'https://www.masquerestaurant.com/' },
  { id: 'avartana', title: 'Avartana - ITC Maratha', desc: "Consistently ranked in Asia's 50 Best. Modernist Southern Indian tasting menu of 10+ courses for foodies. Sophisticated and artistic.", query: 'Avartana, ITC Maratha, Sahar Airport Road, Andheri East, Mumbai, Maharashtra 400099', link: 'https://www.itchotels.com/in/en/itcmaratha-mumbai/fine-dine/avartana' },
];

export const FOOD_ES: TravelSpot[] = [
  { id: 'sealounge', title: 'Sea Lounge en The Taj', desc: 'Experimente un té de la tarde (High Tea) con vistas al puerto. Tranquilo, elegante e históricamente significativo.', query: 'Sea Lounge, The Taj Mahal Palace, Apollo Bandar, Colaba, Mumbai, Maharashtra 400001', link: 'https://www.tajhotels.com/en-in/hotels/taj-mahal-palace-mumbai/restaurants/sea-lounge-mumbai' },
  { id: 'masque', title: 'Masque', desc: 'Constantemente votado como el mejor restaurante de la India. Un menú de degustación de más de 10 platos impulsado por ingredientes locales en un molino textil renovado.', query: 'Masque Restaurant, Shakti Mills Lane, Mahalakshmi, Mumbai, Maharashtra 400011', link: 'https://www.masquerestaurant.com/' },
  { id: 'avartana', title: 'Avartana - ITC Maratha', desc: 'Constantemente clasificado en los 50 mejores de Asia. Menú de degustación modernista del sur de la India. Sofisticado y artístico.', query: 'Avartana, ITC Maratha, Sahar Airport Road, Andheri East, Mumbai, Maharashtra 400099', link: 'https://www.itchotels.com/in/en/itcmaratha-mumbai/fine-dine/avartana' },
];

export const HOTEL_QUERY = 'Taj The Trees, Vikhroli, Mumbai';

// ─── SURVIVAL GUIDE ───
export const SURVIVAL_TIPS_EN: SurvivalTip[] = [
  { id: 'water', title: 'Water Safety', html: '<strong>Strictly bottled water only.</strong> Do not drink tap water. Even when brushing your teeth, use bottled water if you have a sensitive stomach. Avoid ice in drinks at street stalls.' },
  { id: 'transit', title: 'Getting Around', html: "Download <strong>Uber</strong>. It works perfectly here and you don't need to negotiate prices. Rickshaws (Tuk-tuks) are fun for short distances but only work in the suburbs (Bandra/Juhu)." },
  { id: 'connectivity', title: 'Connectivity', html: 'Download the <strong><a href="https://www.airalo.com/india-esim" target="_blank" rel="noopener noreferrer" class="text-wedding-bronze underline">Airalo</a></strong> app for an instant E-SIM. It provides reliable 5G data throughout Mumbai without needing a physical SIM card.' },
  { id: 'spice', title: 'Spice Warning', html: '"Mild" in India is still "Spicy" for most. Ask for <strong>"Non-spicy"</strong> or <strong>"Sweet"</strong>. Yogurt (Curd/Raita) is the best antidote for a burning mouth, not water!' },
  { id: 'traffic', title: 'Traffic & Time', html: 'Traffic is unpredictable. If Google Maps says 30 mins, plan for 45-60 mins. We run on "Indian Standard Time" (relaxed punctuality), but the wedding events will start on time!' },
  { id: 'navigation', title: 'Navigation', html: 'Mumbai is safe, but crowded. Keep your bag close in markets. People are very friendly—if you get lost, just ask! Most people speak English.' },
  { id: 'currency', title: 'Currency', html: 'Most places take credit cards (Visa/Mastercard). Carry some cash (Rupees) for small shops or tips. 1 USD ≈ 83 INR.' },
];

export const SURVIVAL_TIPS_ES: SurvivalTip[] = [
  { id: 'water', title: 'Agua Potable', html: '<strong>Estrictamente solo agua embotellada.</strong> No beba agua del grifo. Incluso al cepillarse los dientes. Evite el hielo en las bebidas en puestos callejeros.' },
  { id: 'transit', title: 'Transporte', html: 'Descarga <strong>Uber</strong>. Funciona perfectamente y no necesitas negociar precios. Los Rickshaws (Tuk-tuks) son divertidos para distancias cortas pero solo funcionan en los suburbios.' },
  { id: 'connectivity', title: 'Conectividad', html: 'Descarga la aplicación <strong><a href="https://www.airalo.com/india-esim" target="_blank" rel="noopener noreferrer" class="text-wedding-bronze underline">Airalo</a></strong> para una E-SIM instantánea. Proporciona datos 5G fiables en todo Mumbai sin necesidad de una tarjeta física.' },
  { id: 'spice', title: 'Comida Picante', html: '"Suave" en la India sigue siendo "Picante" para la mayoría. Pide <strong>"No picante"</strong> o <strong>"Dulce"</strong>. ¡El yogur (Curd/Raita) es el mejor antídoto para el picante, no el agua!' },
  { id: 'traffic', title: 'Tráfico y Hora', html: 'El tráfico es impredecible. Si Google Maps dice 30 min, planifica para 45-60. Funcionamos con "Hora Estándar India" (puntualidad relajada), ¡pero los eventos de la boda comenzarán a tiempo!' },
  { id: 'navigation', title: 'Navegación', html: 'Mumbai es segura, pero concurrida. Mantén tu bolso cerca en los mercados. La gente es muy amable: si te pierdes, ¡pregunta! La mayoría habla inglés.' },
  { id: 'currency', title: 'Moneda', html: 'La mayoría acepta tarjetas de crédito. Lleva algo de efectivo (Rupias) para tiendas pequeñas o propinas. 1 USD ≈ 83 INR.' },
];

// ─── FAQ ───
export const FAQ_EN: FAQItem[] = [
  { id: 'logistics', question: 'Where should I fly into and stay?', answer: "Fly into Chhatrapati Shivaji Maharaj International Airport (BOM). We strongly recommend staying at <a href='https://www.tajhotels.com/en-in/hotels/taj-the-trees' target='_blank' rel='noopener noreferrer' class='text-wedding-bronze font-semibold underline'>Taj The Trees</a> in Vikhroli, Mumbai. We will provide transportation from this hotel to all wedding events." },
  { id: 'visa', question: 'Do I need a visa for India?', answer: 'Yes, most international travelers need a visa. We strongly recommend applying for an e-Visa online at least 4 weeks before your trip. It is usually a straightforward digital process.' },
  { id: 'money', question: 'What about money and credit cards?', answer: 'Most places accept Visa and Mastercard, but American Express and Discover may have acceptance issues. We recommend carrying some cash (Rupees) for small shops and tips. You can exchange currency at the airport upon arrival. The current exchange rate is roughly 1 USD ≈ 83 INR. Tipping 10% is customary at restaurants.' },
  { id: 'phone', question: 'How do I get phone data in India?', answer: "We recommend downloading the <a href='https://www.airalo.com/india-esim' target='_blank' rel='noopener noreferrer' class='text-wedding-bronze font-semibold underline'>Airalo</a> app for an e-SIM. It is the easiest way to get 5G data. It costs around $20 for 10GB (valid for 7 days)." },
  { id: 'weather', question: 'What is the weather like in Mumbai in February?', answer: 'It is the best time of year! Expect warm days (around 28°C / 82°F) and pleasant, breezy evenings (around 23°C / 73°F). Sunrise is at 7 AM and Sunset at 6:45 PM. February should be dry without rain.' },
  { id: 'food', question: 'Will the food be too spicy?', answer: "We have curated the menu to cater to international palates. There will be plenty of mild options, and we'll label spicy dishes clearly. Safe, bottled water will be available everywhere." },
  { id: 'dress', question: 'What should I wear?', answer: 'You should plan on having three different outfits. Each celebration has its own page with a full dress guide, and the Wardrobe &amp; Shopping guide explains the outfits and where to find them. In general, think bright, colorful, and modest. For the Vows &amp; Sangeet, Western formal wear is perfectly fine.' },
  { id: 'transport', question: 'How do I get around?', answer: 'Uber is the safest and easiest way to travel within Mumbai. We will also provide shuttles from Taj The Trees to all wedding events.' },
];

export const FAQ_ES: FAQItem[] = [
  { id: 'logistics', question: '¿A dónde debo volar y dónde debo alojarme?', answer: "Vuele al Aeropuerto Internacional Chhatrapati Shivaji Maharaj (BOM). Recomendamos encarecidamente alojarse en <a href='https://www.tajhotels.com/en-in/hotels/taj-the-trees' target='_blank' rel='noopener noreferrer' class='text-wedding-bronze font-semibold underline'>Taj The Trees</a> en Vikhroli, Mumbai. Proporcionaremos transporte desde este hotel a todos los eventos de la boda." },
  { id: 'visa', question: '¿Necesito visa para la India?', answer: 'Sí, la mayoría de los viajeros internacionales necesitan visa. Recomendamos encarecidamente solicitar una e-Visa en línea al menos 3 semanas antes de su viaje. Es un proceso digital sencillo.' },
  { id: 'money', question: '¿Qué pasa con el dinero y las tarjetas de crédito?', answer: 'La mayoría de los lugares aceptan Visa y Mastercard, pero American Express y Discover pueden tener problemas de aceptación. Recomendamos llevar algo de efectivo (Rupias) para tiendas pequeñas y propinas. Puede cambiar moneda en el aeropuerto a su llegada. El tipo de cambio actual es de aproximadamente 1 USD ≈ 83 INR. Es costumbre dejar una propina del 10% en los restaurantes.' },
  { id: 'phone', question: '¿Cómo obtengo datos para mi teléfono?', answer: "Recomendamos descargar la aplicación <a href='https://www.airalo.com/india-esim' target='_blank' rel='noopener noreferrer' class='text-wedding-bronze font-semibold underline'>Airalo</a> para obtener una e-SIM. Es la forma más fácil de obtener datos 5G. Cuesta alrededor de $20 por 10GB (válido por 7 días)." },
  { id: 'weather', question: '¿Cómo es el clima en Mumbai en febrero?', answer: '¡Es la mejor época del año! Espere días cálidos (alrededor de 28°C) y noches agradables y ventosas (alrededor de 18°C). Probablemente no necesite una chaqueta pesada, tal vez solo un chal ligero para la noche.' },
  { id: 'food', question: '¿La comida será muy picante?', answer: 'Hemos seleccionado el menú para satisfacer los paladares internacionales. Habrá muchas opciones suaves y etiquetaremos claramente los platos picantes. Habrá agua embotellada segura disponible en todas partes.' },
  { id: 'dress', question: '¿Qué debo usar?', answer: 'Deberías planificar tres atuendos diferentes. Cada celebración tiene su propia página con una guía de vestimenta completa, y la guía de Vestuario y Compras explica los atuendos y dónde conseguirlos. En general, piense en colores brillantes y modestos. Para la recepción, la vestimenta formal occidental está perfectamente bien.' },
  { id: 'transport', question: '¿Cómo me muevo por la ciudad?', answer: 'Uber es la forma más segura y fácil de viajar dentro de Mumbai. También proporcionaremos transporte desde Taj The Trees a todos los eventos de la boda.' },
];
