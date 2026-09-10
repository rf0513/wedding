import { WeddingEvent, StoryEvent, RegistryItem, WeddingCustom, AttireItem, FAQItem, EventDressCode, TravelSpot, SurvivalTip } from './types';

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
  { id: '1', title: 'Mehendi (Henna)', day: '02', month: 'Feb', time: '11:00 AM', location: 'Thapar Suburbia', address: '4th Floor, Chembur, Mumbai', description: 'A relaxed start to the festivities with intricate henna designs, music, and light bites.', dressCode: 'Vibrant & Colorful', shuttleTime: '10:30 AM', calRange: '20270202T053000Z/20270202T090000Z' },
  { id: '2', title: 'Haldi Ceremony', day: '03', month: 'Feb', time: '1:00 PM', location: 'Thapar Suburbia', address: '4th Floor, Chembur, Mumbai', description: 'The traditional turmeric ceremony. Get ready to get messy and glow!', dressCode: 'Bright Yellows and Oranges', shuttleTime: '12:30 PM', calRange: '20270203T073000Z/20270203T110000Z' },
  { id: '3', title: 'Vows & Sangeet', day: '04', month: 'Feb', time: '5:00 PM', location: 'Turf Lawn and Banquet', address: 'Mahalaxmi Race Course, Mumbai', description: 'We exchange our vows followed by a musical evening of dance and celebration.', dressCode: 'Glamorous Indo-Western Style', shuttleTime: '4:30 PM', calRange: '20270204T113000Z/20270204T173000Z' },
  { id: '4', title: 'Wedding & Reception', day: '05', month: 'Feb', time: '4:30 PM', location: 'Mumbai Cricket Association Club', address: 'Bandra Kurla Complex (BKC), Mumbai', description: 'The traditional Maharashtrian wedding ceremony followed by a grand reception dinner.', dressCode: 'Traditional Indian or Formal Western', shuttleTime: '4:00 PM', calRange: '20270205T110000Z/20270205T173000Z' },
];

export const EVENTS_ES: WeddingEvent[] = [
  { id: '1', title: 'Mehendi (Henna)', day: '02', month: 'Feb', time: '11:00 AM', location: 'Thapar Suburbia', address: '4th Floor, Chembur, Mumbai', description: 'Un comienzo relajado de las festividades con diseños intrincados de henna, música y bocadillos.', dressCode: 'Vibrante y Colorido', shuttleTime: '10:30 AM', calRange: '20270202T053000Z/20270202T090000Z' },
  { id: '2', title: 'Ceremonia Haldi', day: '03', month: 'Feb', time: '1:00 PM', location: 'Thapar Suburbia', address: '4th Floor, Chembur, Mumbai', description: 'La tradicional ceremonia de la cúrcuma. ¡Prepárate para ensuciarte y brillar!', dressCode: 'Amarillos y Naranjas brillantes', shuttleTime: '12:30 PM', calRange: '20270203T073000Z/20270203T110000Z' },
  { id: '3', title: 'Votos y Sangeet', day: '04', month: 'Feb', time: '5:00 PM', location: 'Turf Lawn and Banquet', address: 'Mahalaxmi Race Course, Mumbai', description: 'Intercambiamos nuestros votos seguidos de una noche musical de baile y celebración.', dressCode: 'Estilo Indo-Occidental glamoroso', shuttleTime: '4:30 PM', calRange: '20270204T113000Z/20270204T173000Z' },
  { id: '4', title: 'Boda y Recepción', day: '05', month: 'Feb', time: '4:30 PM', location: 'Mumbai Cricket Association Club', address: 'Bandra Kurla Complex (BKC), Mumbai', description: 'La ceremonia de boda tradicional Maharashtriana seguida de una gran cena de recepción.', dressCode: 'Indio Tradicional u Occidental Formal', shuttleTime: '4:00 PM', calRange: '20270205T110000Z/20270205T173000Z' },
];

export function buildCalendarUrl(ev: WeddingEvent): string {
  const [start, end] = ev.calRange.split('/');
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Pavitra & Ramon — ' + ev.title)}&dates=${start}/${end}&location=${encodeURIComponent(ev.location + ', ' + ev.address)}&details=${encodeURIComponent(ev.description)}`;
}

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

// ─── DRESS CODE BY EVENT ───
export const EVENT_DRESS_CODES_EN: EventDressCode[] = [
  { id: 'mehendi', title: 'Mehendi', theme: 'Vibrant & Colorful', description: 'Fun, casual, and festive. Sleeveless or short sleeves are recommended for women getting henna.', options: { women: 'Bright Anarkali, Lehenga, or Maxi Dress. Floral prints work great.', men: '' }, colorPalette: ['#E91E63', '#9C27B0', '#00BCD4', '#8BC34A'] },
  { id: 'haldi', title: 'Haldi', theme: 'Shades of Yellow & Orange', description: 'Simple, breathable, and ready to get messy. Yellow or Orange is the color of the day.', options: { women: 'Yellow/Orange Kurta Set, Cotton Saree, or Sundress. Avoid expensive silks as they may get stained.', men: 'Yellow/Orange Kurta (Cotton/Linen) or White Shirt. Jeans/Chinos are okay.' }, colorPalette: ['#FBC02D', '#FFB300', '#FFF176', '#FF9800'] },
  { id: 'sangeet', title: 'Vows & Sangeet', theme: 'Glitz, Glamour & Indo-Western', description: 'A night of dancing and performance. Wear something that sparkles and is easy to move in.', options: { women: 'Lehenga Choli, Embroidered Anarkali, or Evening Gown.', men: 'Bandhgala Jacket, Sherwani, or a Formal Suit (No tie needed).' }, colorPalette: ['#1A237E', '#311B92', '#880E4F', '#FFD700'] },
  { id: 'wedding', title: 'Wedding & Reception', theme: 'Traditional Indian', description: 'Regal and respectful. This is the main religious ceremony. Modest attire is appreciated.', options: { women: 'Silk Saree (Paithani/Kanjeevaram) or Heavy Traditional Suit.', men: 'Sherwani, Kurta with Nehru Jacket, or Formal Suit.' }, colorPalette: ['#B71C1C', '#1B5E20', '#E65100', '#FFD700'] },
];

export const EVENT_DRESS_CODES_ES: EventDressCode[] = [
  { id: 'mehendi', title: 'Mehendi', theme: 'Vibrante y Colorido', description: 'Divertido, casual y festivo. Se recomiendan mangas cortas o sin mangas para las mujeres que se ponen henna.', options: { women: 'Anarkali brillante, Lehenga o vestido largo. Los estampados florales funcionan muy bien.', men: '' }, colorPalette: ['#E91E63', '#9C27B0', '#00BCD4', '#8BC34A'] },
  { id: 'haldi', title: 'Haldi', theme: 'Tonos de Amarillo y Naranja', description: 'Sencillo, transpirable y listo para ensuciarse. El amarillo o naranja es el color del día.', options: { women: 'Conjunto Kurta amarillo/naranja, sari de algodón o vestido de verano. Evita sedas caras, ya que pueden mancharse.', men: 'Kurta amarilla/naranja (algodón/lino) o camisa blanca. Jeans/Chinos están bien.' }, colorPalette: ['#FBC02D', '#FFB300', '#FFF176', '#FF9800'] },
  { id: 'sangeet', title: 'Votos y Sangeet', theme: 'Brillo, Glamour e Indo-Occidental', description: 'Una noche de baile y espectáculo. Ponte algo que brille y sea fácil de mover.', options: { women: 'Lehenga Choli, Anarkali bordado o vestido de noche.', men: 'Chaqueta Bandhgala, Sherwani o traje formal (no se necesita corbata).' }, colorPalette: ['#1A237E', '#311B92', '#880E4F', '#FFD700'] },
  { id: 'wedding', title: 'Boda y Recepción', theme: 'Indio Tradicional', description: 'Regio y respetuoso. Esta es la principal ceremonia religiosa. Se agradece vestimenta modesta.', options: { women: 'Sari de seda (Paithani/Kanjeevaram) o traje tradicional pesado.', men: 'Sherwani, Kurta con chaqueta Nehru o traje formal.' }, colorPalette: ['#B71C1C', '#1B5E20', '#E65100', '#FFD700'] },
];

// ─── CEREMONIES ───
export const WEDDING_CUSTOMS_EN: WeddingCustom[] = [
  { id: 'mehendi', title: 'The Mehendi (Ladies Only)', marathiTitle: 'Mehendi', significance: 'Henna is applied to the bride’s hands and feet in intricate designs. Folklore says the darker the henna stain, the more love the bride will receive from her husband and in-laws.', whatToWear: 'Colorful, comfortable clothing. Sleeveless or short sleeves are practical if you plan to get a small henna design done on your hands.', whatToExpect: 'A relaxed afternoon of art and music. Guests can get small henna designs applied by professional artists while enjoying snacks and music.', imageUrl: 'https://images.unsplash.com/photo-1505932794465-147d1f1b2c97?q=80&w=800&auto=format&fit=crop' },
  { id: 'haldi', title: 'The Haldi Ceremony', marathiTitle: 'Halad Chadavne', significance: 'Turmeric paste is applied to the bride and groom to ward off evil spirits and provide a natural glow. It marks the beginning of the wedding rituals and signifies purification.', whatToWear: 'Yellow or Orange attire is traditional. Choose simple clothes (cotton kurtas or sundresses) that you do not mind getting stained with turmeric paste.', whatToExpect: 'A fun, messy, and high-energy event! Family members will smear turmeric paste on the couple (and often each other). Expect dhol (drums) and dancing.', imageUrl: 'https://cdn.shopify.com/s/files/1/1206/7410/files/C_J_-_Top_7_myths_of_Turmeric_debunked.jpg?v=1557222010' },
  { id: 'sangeet', title: 'The Sangeet', marathiTitle: 'Sangeet', significance: 'Literally translating to "Sung Together", this is a musical party designed to break the ice between the two families. It is a celebration of union through dance and song.', whatToWear: 'This is the time to sparkle! Glamorous Indian wear (Lehengas, Sherwanis) or formal Cocktail attire. Bring your dancing shoes.', whatToExpect: 'Choreographed dance performances by friends and family, followed by an open dance floor with a mix of Bollywood, Latin, and Pop hits.', imageUrl: 'https://i.ytimg.com/vi/Wy6CTfiQQgk/maxresdefault.jpg' },
  { id: 'wedding', title: 'The Wedding Ceremony', marathiTitle: 'Lagna', significance: 'Deeply rooted in Vedic traditions, this ceremony views marriage as a sacred bond ("Vivah") ordained by cosmic laws. The primary witness is Agni (the Sacred Fire). Through the Saptapadi ritual around the fire, the couple commits to seven vows of mutual respect, dharma (righteousness), and enduring friendship, seeking blessings from the Divine and their ancestors.', whatToWear: 'Traditional Indian Saree (Paithani styles are local to the region), Kurta Pajama, or a Formal Western Suit. Modest attire is appreciated for the ceremony.', whatToExpect: 'Conducted in Sanskrit, key moments include the "Antarpat" (silk curtain) and "Mangalashtak" chants. The couple wears "Mundavalya" (pearl forehead strings) symbolizing togetherness, and the bride wears green glass bangles for prosperity. Guests shower the couple with "Akshata" (rice) as blessings.', imageUrl: 'https://images.unsplash.com/photo-1597157639073-69284dc0fdaf?q=80&w=800&auto=format&fit=crop' },
];

export const WEDDING_CUSTOMS_ES: WeddingCustom[] = [
  { id: 'mehendi', title: 'El Mehendi (Solo Damas)', marathiTitle: 'Mehendi', significance: 'La henna se aplica en las manos y pies de la novia en diseños intrincados. El folclore dice que cuanto más oscura es la mancha de henna, más amor recibirá la novia de su esposo y sus suegros.', whatToWear: 'Ropa colorida y cómoda. Sin mangas o mangas cortas es práctico si planeas hacerte un pequeño diseño de henna en las manos.', whatToExpect: 'Una tarde relajada de arte y música. Los invitados pueden hacerse pequeños diseños de henna aplicados por artistas profesionales mientras disfrutan de bocadillos y música.', imageUrl: 'https://images.unsplash.com/photo-1505932794465-147d1f1b2c97?q=80&w=800&auto=format&fit=crop' },
  { id: 'haldi', title: 'La Ceremonia Haldi', marathiTitle: 'Halad Chadavne', significance: 'Se aplica pasta de cúrcuma a los novios para alejar los malos espíritus y dar un brillo natural. Marca el comienzo de los rituales de boda y significa purificación.', whatToWear: 'La vestimenta amarilla o naranja es tradicional. Elija ropa sencilla (kurtas de algodón o vestidos de verano) que no le importe manchar con pasta de cúrcuma.', whatToExpect: '¡Un evento divertido, desordenado y de alta energía! Los familiares untarán pasta de cúrcuma a la pareja (y a menudo entre ellos). Espera dhol (tambores) y baile.', imageUrl: 'https://cdn.shopify.com/s/files/1/1206/7410/files/C_J_-_Top_7_myths_of_Turmeric_debunked.jpg?v=1557222010' },
  { id: 'sangeet', title: 'El Sangeet', marathiTitle: 'Sangeet', significance: 'Traduciéndose literalmente como "Cantado Juntos", es una fiesta musical diseñada para romper el hielo entre las dos familias. Es una celebración de la unión a través del baile y la canción.', whatToWear: '¡Es el momento de brillar! Ropa india glamorosa (Lehengas, Sherwanis) o vestimenta formal de cóctel. Trae tus zapatos de baile.', whatToExpect: 'Actuaciones de baile coreografiadas por amigos y familiares, seguidas de una pista de baile abierta con una mezcla de éxitos de Bollywood, latinos y pop.', imageUrl: 'https://i.ytimg.com/vi/Wy6CTfiQQgk/maxresdefault.jpg' },
  { id: 'wedding', title: 'La Ceremonia de Boda', marathiTitle: 'Lagna', significance: 'Arraigada en las tradiciones védicas, esta ceremonia ve el matrimonio como un vínculo sagrado ("Vivah"). El testigo principal es Agni (el Fuego Sagrado). A través del ritual Saptapadi alrededor del fuego, la pareja se compromete con siete votos de respeto mutuo, dharma (rectitud) y amistad duradera.', whatToWear: 'Sari indio tradicional (los estilos Paithani son locales de la región), Kurta Pajama o un traje occidental formal. Se agradece vestimenta modesta para la ceremonia.', whatToExpect: 'Conducido en sánscrito, los momentos clave incluyen el "Antarpat" (cortina de seda). La pareja usa "Mundavalya" (hilos de perlas) que simbolizan la unión, y la novia usa brazaletes de vidrio verde para la prosperidad. Los invitados rocían a la pareja con "Akshata" (arroz) como bendición.', imageUrl: 'https://images.unsplash.com/photo-1597157639073-69284dc0fdaf?q=80&w=800&auto=format&fit=crop' },
];

// ─── ATTIRE GLOSSARY ───
export const ATTIRE_GUIDE_EN: AttireItem[] = [
  { id: 'yellow-kurta', name: 'Kurta Set', pronunciation: 'Kur-ta', gender: 'Women', description: 'A comfortable, lightweight tunic worn with pants or leggings. Yellow or Orange is the traditional color for the Haldi ceremony as it signifies purity and glow.', bestFor: ['Haldi'], imageUrl: 'https://raw.githubusercontent.com/rf0513/pavitra-and-ramon-wedding/main/yellow-kurta.png' },
  { id: 'lehenga', name: 'Lehenga Choli', pronunciation: 'Leh-hen-gah', gender: 'Women', description: 'A three-piece outfit consisting of a long, full skirt (Lehenga), a fitted blouse (Choli), and a scarf drape (Dupatta). They can be simple or heavily embroidered.', bestFor: ['Vows & Sangeet', 'Wedding & Reception'], imageUrl: 'https://images.pexels.com/photos/27155546/pexels-photo-27155546.jpeg' },
  { id: 'saree', name: 'Saree', pronunciation: 'Saa-ree', gender: 'Women', description: 'A long drape of fabric (usually 6-9 yards) wrapped around the waist and draped over the shoulder, worn over a petticoat and a blouse. For our wedding, "Paithani" silk sarees are the local favorite.', bestFor: ['Wedding & Reception'], imageUrl: 'https://images.pexels.com/photos/9418783/pexels-photo-9418783.jpeg' },
  { id: 'kurta', name: 'Kurta Pajama', pronunciation: 'Kur-ta Pa-ja-ma', gender: 'Men', description: 'A loose, collarless shirt (Kurta) falling below the knees, worn with lightweight trousers (Pajama). It is comfortable and perfect for daytime events.', bestFor: ['Haldi', 'Mehendi'], imageUrl: 'https://manyavar.scene7.com/is/image/manyavar/SDES1295-328-Mustard-401_02-12-2025-14-48:650x900' },
  { id: 'sherwani', name: 'Sherwani', pronunciation: 'Sher-va-nee', gender: 'Men', description: 'A coat-like garment worn over a kurta, usually made of heavier fabric like silk or wool with lining. It is the equivalent of a tuxedo in Indian formal wear.', bestFor: ['Wedding & Reception'], imageUrl: 'https://manyavar.scene7.com/is/image/manyavar/I02_O951D504-333_03_04-04-2022-21-00:650x900?&dpr=on,2' },
  { id: 'anarkali', name: 'Anarkali', pronunciation: 'Ah-nar-ka-lee', gender: 'Women', description: 'A long, frock-style top that flares out from the waist, worn with slim pants. It is essentially a very elegant dress and is comfortable for dancing.', bestFor: ['Mehendi', 'Vows & Sangeet'], imageUrl: 'https://images.cbazaar.com/images/faux-georgette-embroidered-anarkali-suit-slswe301032ra-u.jpg' },
  { id: 'bandhgala', name: 'Bandhgala / Jodhpuri', pronunciation: 'Band-ga-la', gender: 'Men', description: 'A formal evening suit featuring a coat with a standing collar (Nehru collar). It looks sharp, modern, and is a great alternative to a western suit.', bestFor: ['Vows & Sangeet', 'Wedding & Reception'], imageUrl: 'https://manyavar.scene7.com/is/image/manyavar/8905100475357.23637_19-05-2023-10-17:650x900?&dpr=on,2' },
];

export const ATTIRE_GUIDE_ES: AttireItem[] = [
  { id: 'yellow-kurta', name: 'Kurta', pronunciation: 'Kur-ta', gender: 'Women', description: 'Una túnica cómoda y ligera que se usa con pantalones o leggings. El amarillo o naranja es el color tradicional de la ceremonia Haldi, ya que significa pureza y brillo.', bestFor: ['Haldi'], imageUrl: 'https://raw.githubusercontent.com/rf0513/pavitra-and-ramon-wedding/main/yellow-kurta.png' },
  { id: 'lehenga', name: 'Lehenga Choli', pronunciation: 'Leh-hen-gah', gender: 'Women', description: 'Un traje de tres piezas que consta de una falda larga y amplia (Lehenga), una blusa ajustada (Choli) y una bufanda drapeada (Dupatta). Pueden ser simples o muy bordados.', bestFor: ['Votos y Sangeet', 'Boda y Recepción'], imageUrl: 'https://images.pexels.com/photos/27155546/pexels-photo-27155546.jpeg' },
  { id: 'saree', name: 'Sari', pronunciation: 'Saa-ree', gender: 'Women', description: 'Una larga tela (generalmente 6-9 yardas) envuelta alrededor de la cintura y drapeada sobre el hombro, usada sobre una enagua y una blusa. Para nuestra boda, los saris de seda "Paithani" son los favoritos locales.', bestFor: ['Boda y Recepción'], imageUrl: 'https://images.pexels.com/photos/9418783/pexels-photo-9418783.jpeg' },
  { id: 'kurta', name: 'Kurta Pajama', pronunciation: 'Kur-ta Pa-ja-ma', gender: 'Men', description: 'Una camisa suelta y sin cuello (Kurta) que cae por debajo de las rodillas, usada con pantalones ligeros (Pajama). Es cómodo y perfecto para eventos diurnos.', bestFor: ['Haldi', 'Mehendi'], imageUrl: 'https://manyavar.scene7.com/is/image/manyavar/SDES1295-328-Mustard-401_02-12-2025-14-48:650x900' },
  { id: 'sherwani', name: 'Sherwani', pronunciation: 'Sher-va-nee', gender: 'Men', description: 'Una prenda similar a un abrigo que se usa sobre una kurta, generalmente hecha de tela más pesada como seda o lana con forro. Es el equivalente a un esmoquin en la vestimenta formal india.', bestFor: ['Boda y Recepción'], imageUrl: 'https://manyavar.scene7.com/is/image/manyavar/I02_O951D504-333_03_04-04-2022-21-00:650x900?&dpr=on,2' },
  { id: 'anarkali', name: 'Anarkali', pronunciation: 'Ah-nar-ka-lee', gender: 'Women', description: 'Un top largo estilo vestido que se ensancha desde la cintura, usado con pantalones ajustados. Es esencialmente un vestido muy elegante y es cómodo para bailar.', bestFor: ['Mehendi', 'Votos y Sangeet'], imageUrl: 'https://images.cbazaar.com/images/faux-georgette-embroidered-anarkali-suit-slswe301032ra-u.jpg' },
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
  { id: 'dress', question: 'What should I wear?', answer: 'You should plan on having three different outfits. Please check out our detailed guide on the Ceremonies &amp; Attire page. In general, think bright, colorful, and modest. For the Vows &amp; Sangeet, Western formal wear is perfectly fine.' },
  { id: 'transport', question: 'How do I get around?', answer: 'Uber is the safest and easiest way to travel within Mumbai. We will also provide shuttles from Taj The Trees to all wedding events.' },
];

export const FAQ_ES: FAQItem[] = [
  { id: 'logistics', question: '¿A dónde debo volar y dónde debo alojarme?', answer: "Vuele al Aeropuerto Internacional Chhatrapati Shivaji Maharaj (BOM). Recomendamos encarecidamente alojarse en <a href='https://www.tajhotels.com/en-in/hotels/taj-the-trees' target='_blank' rel='noopener noreferrer' class='text-wedding-bronze font-semibold underline'>Taj The Trees</a> en Vikhroli, Mumbai. Proporcionaremos transporte desde este hotel a todos los eventos de la boda." },
  { id: 'visa', question: '¿Necesito visa para la India?', answer: 'Sí, la mayoría de los viajeros internacionales necesitan visa. Recomendamos encarecidamente solicitar una e-Visa en línea al menos 3 semanas antes de su viaje. Es un proceso digital sencillo.' },
  { id: 'money', question: '¿Qué pasa con el dinero y las tarjetas de crédito?', answer: 'La mayoría de los lugares aceptan Visa y Mastercard, pero American Express y Discover pueden tener problemas de aceptación. Recomendamos llevar algo de efectivo (Rupias) para tiendas pequeñas y propinas. Puede cambiar moneda en el aeropuerto a su llegada. El tipo de cambio actual es de aproximadamente 1 USD ≈ 83 INR. Es costumbre dejar una propina del 10% en los restaurantes.' },
  { id: 'phone', question: '¿Cómo obtengo datos para mi teléfono?', answer: "Recomendamos descargar la aplicación <a href='https://www.airalo.com/india-esim' target='_blank' rel='noopener noreferrer' class='text-wedding-bronze font-semibold underline'>Airalo</a> para obtener una e-SIM. Es la forma más fácil de obtener datos 5G. Cuesta alrededor de $20 por 10GB (válido por 7 días)." },
  { id: 'weather', question: '¿Cómo es el clima en Mumbai en febrero?', answer: '¡Es la mejor época del año! Espere días cálidos (alrededor de 28°C) y noches agradables y ventosas (alrededor de 18°C). Probablemente no necesite una chaqueta pesada, tal vez solo un chal ligero para la noche.' },
  { id: 'food', question: '¿La comida será muy picante?', answer: 'Hemos seleccionado el menú para satisfacer los paladares internacionales. Habrá muchas opciones suaves y etiquetaremos claramente los platos picantes. Habrá agua embotellada segura disponible en todas partes.' },
  { id: 'dress', question: '¿Qué debo usar?', answer: 'Deberías planificar tres atuendos diferentes. Consulta nuestra guía detallada en la página de Ceremonias y Vestimenta. En general, piense en colores brillantes y modestos. Para la recepción, la vestimenta formal occidental está perfectamente bien.' },
  { id: 'transport', question: '¿Cómo me muevo por la ciudad?', answer: 'Uber es la forma más segura y fácil de viajar dentro de Mumbai. También proporcionaremos transporte desde Taj The Trees a todos los eventos de la boda.' },
];
