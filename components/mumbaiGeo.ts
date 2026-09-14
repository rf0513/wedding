/**
 * Geography for the illustrated Mumbai map — real coordinates, drawn in the poster style.
 *
 * Everything here is [lat, lon]. The coastline and roads are simplified tracings of the
 * real thing (accurate to a few hundred metres — enough for orientation and honest
 * relative distances, not for navigation). Routes follow the roads a driver would actually
 * take from the hotel; the distance shown is measured along that line and the minutes are
 * typical ranges for Mumbai traffic.
 */

export type LatLon = [number, number];

// ---- Projection ---------------------------------------------------------------------
// Plain equirectangular with a cos(lat) correction — at city scale this is indistinguishable
// from Mercator. The frame is 400 × 580 map units; north is up.
export const VIEW = { w: 400, h: 580 };
const LON0 = 72.76, LON1 = 72.985, LAT1 = 19.18;
const KM_PER_DEG_LAT = 110.9;
const KM_PER_DEG_LON = 111.32 * Math.cos((19.025 * Math.PI) / 180);
export const PX_PER_KM = VIEW.w / ((LON1 - LON0) * KM_PER_DEG_LON);

export const project = ([lat, lon]: LatLon): [number, number] => [
  (lon - LON0) * KM_PER_DEG_LON * PX_PER_KM,
  (LAT1 - lat) * KM_PER_DEG_LAT * PX_PER_KM,
];

export const toPath = (pts: LatLon[], close = false) =>
  pts.map((p, i) => (i ? 'L' : 'M') + project(p).map((n) => n.toFixed(1)).join(' ')).join(' ') + (close ? ' Z' : '');

export function lengthKm(pts: LatLon[]) {
  let km = 0;
  for (let i = 1; i < pts.length; i++) {
    const [la1, lo1] = pts[i - 1], [la2, lo2] = pts[i];
    const dy = (la2 - la1) * KM_PER_DEG_LAT, dx = (lo2 - lo1) * KM_PER_DEG_LON;
    km += Math.hypot(dx, dy);
  }
  return km;
}

// ---- Places -------------------------------------------------------------------------
// `side` is where the label sits; `dx`/`dy` nudge it (map units) and, when the nudge is
// large, a hairline leader is drawn from the marker to the label. Keyed by the ids used in
// constants.ts (hotel, airport, ev1–ev4, and the sightseeing / shopping / food ids).
export type PlaceStyle = { ll: LatLon; side: 'l' | 'r' | 'b'; dx?: number; dy?: number; label?: string };

export const PLACES: Record<string, PlaceStyle> = {
  hotel:     { ll: [19.1030, 72.9250], side: 'r' },
  airport:   { ll: [19.0975, 72.8745], side: 'r', dy: 10 },
  avartana:  { ll: [19.1063, 72.8668], side: 'l', label: 'Avartana' },
  jio:       { ll: [19.0668, 72.8660], side: 'l', dy: -5 },
  ev4:       { ll: [19.0625, 72.8625], side: 'l', dy: 7, label: 'MCA Club · BKC' },          // Wedding & Reception
  ev1:       { ll: [19.0610, 72.8990], side: 'r', label: 'Thapar Suburbia' },                 // Mehendi (Chembur)
  ev2:       { ll: [19.0610, 72.8990], side: 'r', label: 'Thapar Suburbia' },                 // Haldi (same venue)
  siddhi:    { ll: [19.0170, 72.8302], side: 'r' },
  goodearth: { ll: [18.9985, 72.8265], side: 'l', label: 'Good Earth' },
  masque:    { ll: [18.9873, 72.8236], side: 'l', dy: -4 },
  ev3:       { ll: [18.9820, 72.8195], side: 'r', dy: 11, label: 'Turf Lawn · Race Course' },  // Vows & Sangeet
  csmvs:     { ll: [18.9269, 72.8326], side: 'l', dy: -9, label: 'CSMVS Museum' },
  gateway:   { ll: [18.9220, 72.8347], side: 'r', dy: -2 },
  sealounge: { ll: [18.9217, 72.8332], side: 'r', dx: 4, dy: 13, label: 'Sea Lounge · Taj Palace' },
  colaba:    { ll: [18.9175, 72.8285], side: 'l', dy: 12 },
  elephanta: { ll: [18.9633, 72.9310], side: 'b' },
};

// ---- Land & water -------------------------------------------------------------------
// The island city and Salsette, traced clockwise from Versova down the Arabian Sea coast,
// round Colaba Point and back up the harbour side to Thane Creek. Runs off the frame at the top.
export const ISLAND: LatLon[] = [
  [19.200, 72.800], [19.150, 72.805], [19.135, 72.810], [19.120, 72.822], [19.100, 72.826],
  [19.085, 72.828], [19.070, 72.826], [19.058, 72.821], [19.046, 72.817], [19.040, 72.822],
  [19.043, 72.832], [19.046, 72.840],                                   // Bandra → Mahim Bay
  [19.041, 72.843], [19.036, 72.837], [19.030, 72.834], [19.024, 72.826], [19.020, 72.815],
  [19.015, 72.811], [19.005, 72.812], [18.995, 72.811], [18.985, 72.808], // Worli → Haji Ali
  [18.978, 72.806], [18.968, 72.803], [18.958, 72.796], [18.948, 72.794], [18.943, 72.797], // Malabar Hill
  [18.948, 72.806], [18.954, 72.813], [18.948, 72.820], [18.938, 72.823], [18.928, 72.822], // Back Bay
  [18.920, 72.818], [18.910, 72.812], [18.898, 72.811], [18.889, 72.815],                   // Colaba Point
  [18.896, 72.821], [18.908, 72.826], [18.914, 72.829], [18.921, 72.836], [18.930, 72.840], // Gateway
  [18.940, 72.845], [18.952, 72.848], [18.962, 72.853], [18.975, 72.858], [18.995, 72.862], // Docks → Sewri
  [19.010, 72.868], [19.020, 72.878], [19.008, 72.885], [18.998, 72.898], [19.003, 72.915], // Trombay
  [19.015, 72.928], [19.030, 72.932], [19.045, 72.938], [19.060, 72.948], [19.080, 72.955], // Thane Creek
  [19.110, 72.962], [19.150, 72.968], [19.200, 72.975],
];

// Navi Mumbai / Uran shore on the far side of the harbour (mostly off-frame — it just closes the water).
export const MAINLAND: LatLon[] = [
  [19.200, 72.990], [19.150, 72.985], [19.100, 72.982], [19.075, 72.985], [19.050, 72.983],
  [19.020, 72.975], [18.990, 72.965], [18.960, 72.958], [18.940, 72.950], [18.920, 72.955],
  [18.900, 72.950], [18.880, 72.960], [18.850, 73.010], [19.200, 73.010],
];

export const ELEPHANTA: LatLon[] = [
  [18.975, 72.925], [18.973, 72.938], [18.962, 72.944], [18.952, 72.935], [18.955, 72.920], [18.965, 72.917],
];

export const POWAI_LAKE: LatLon[] = [
  [19.133, 72.895], [19.135, 72.905], [19.130, 72.912], [19.123, 72.910], [19.120, 72.900], [19.125, 72.893],
];

// Mahim Creek / Mithi River — the water that separates the island city from the suburbs.
export const MITHI: LatLon[] = [
  [19.044, 72.841], [19.050, 72.848], [19.058, 72.858], [19.062, 72.868], [19.070, 72.880], [19.080, 72.888], [19.095, 72.895],
];

// Airport runways (09/27 and 14/32) — a small landmark next to the airport pin.
export const RUNWAYS: LatLon[][] = [
  [[19.0895, 72.8530], [19.0905, 72.8860]],
  [[19.1035, 72.8590], [19.0830, 72.8710]],
];

// ---- Roads --------------------------------------------------------------------------
// Named segments; routes below are stitched from these so the drawn line is the real road.
const S = {
  // Eastern Express Highway: Sion → Chembur → Ghatkopar → Vikhroli → Bhandup
  eeh: [
    [19.041, 72.866], [19.048, 72.880], [19.053, 72.891], [19.058, 72.901], [19.064, 72.906],
    [19.075, 72.910], [19.086, 72.915], [19.096, 72.920], [19.103, 72.925], [19.112, 72.929],
    [19.125, 72.934], [19.145, 72.942], [19.180, 72.955],
  ] as LatLon[],
  // Eastern Freeway: Chembur (Chheda Nagar) → Wadala → Sewri → Orange Gate
  freeway: [
    [19.058, 72.901], [19.050, 72.898], [19.040, 72.892], [19.030, 72.882], [19.020, 72.874],
    [19.010, 72.868], [18.996, 72.862], [18.980, 72.858], [18.966, 72.853], [18.955, 72.847],
  ] as LatLon[],
  // P. D'Mello Road → Fort → Kala Ghoda → Gateway
  fort: [[18.955, 72.847], [18.945, 72.842], [18.938, 72.838], [18.932, 72.835], [18.927, 72.833], [18.922, 72.834]] as LatLon[],
  // Dr Ambedkar Road: Sion → Dadar → Parel → Byculla → CST
  ambedkar: [
    [19.041, 72.866], [19.033, 72.858], [19.024, 72.850], [19.017, 72.845], [19.008, 72.842],
    [18.999, 72.840], [18.985, 72.836], [18.970, 72.834], [18.958, 72.834], [18.945, 72.840],
  ] as LatLon[],
  // Dadar TT → Prabhadevi (Siddhivinayak)
  dadarWest: [[19.017, 72.845], [19.019, 72.838], [19.018, 72.832], [19.017, 72.8302]] as LatLon[],
  // Parel → Elphinstone → Senapati Bapat Marg → Mahalaxmi
  sbMarg: [[18.999, 72.840], [19.000, 72.832], [18.9985, 72.8265], [18.993, 72.825], [18.9873, 72.8236], [18.984, 72.822], [18.982, 72.8195]] as LatLon[],
  // Western Express Highway: Bandra → Airport → Andheri → Jogeshwari
  weh: [
    [19.040, 72.840], [19.050, 72.843], [19.062, 72.848], [19.075, 72.853], [19.088, 72.857],
    [19.100, 72.860], [19.115, 72.862], [19.135, 72.861], [19.180, 72.862],
  ] as LatLon[],
  // Mahim Causeway → Dadar
  mahim: [[19.040, 72.840], [19.030, 72.841], [19.017, 72.845]] as LatLon[],
  // Bandra–Worli Sea Link, then the Coastal Road under Malabar Hill to Marine Drive
  seaLink: [[19.048, 72.838], [19.043, 72.829], [19.040, 72.825], [19.032, 72.815], [19.022, 72.813]] as LatLon[],
  coastal: [
    [19.022, 72.813], [19.010, 72.812], [18.995, 72.811], [18.984, 72.810], [18.972, 72.805],
    [18.960, 72.800], [18.952, 72.810], [18.948, 72.818], [18.940, 72.823], [18.930, 72.822], [18.925, 72.822],
  ] as LatLon[],
  // Annie Besant Road / Pedder Road: Worli → Race Course → Chowpatty
  besant: [[19.012, 72.817], [19.000, 72.818], [18.988, 72.820], [18.982, 72.8195], [18.975, 72.817], [18.965, 72.811], [18.956, 72.812]] as LatLon[],
  // Santacruz–Chembur Link Road: Amar Mahal → Kurla → BKC
  sclr: [[19.064, 72.906], [19.067, 72.895], [19.068, 72.885], [19.070, 72.876], [19.068, 72.869], [19.065, 72.865]] as LatLon[],
  bkc: [[19.065, 72.865], [19.0625, 72.8625], [19.058, 72.852], [19.052, 72.844]] as LatLon[],
  // Sion–Panvel Highway: Sion → Chembur → Mankhurd
  sionPanvel: [[19.041, 72.866], [19.046, 72.885], [19.052, 72.900], [19.055, 72.915], [19.058, 72.935], [19.062, 72.960]] as LatLon[],
  // JVLR: Vikhroli → Powai → Jogeshwari
  jvlr: [[19.112, 72.929], [19.116, 72.918], [19.120, 72.909], [19.126, 72.899], [19.129, 72.888], [19.132, 72.875], [19.135, 72.861]] as LatLon[],
  // Saki Vihar Road → Sakinaka → Andheri–Kurla Road → Sahar
  sakinaka: [[19.120, 72.909], [19.112, 72.898], [19.104, 72.888], [19.108, 72.880], [19.107, 72.872]] as LatLon[],
  sahar: [[19.107, 72.872], [19.102, 72.876], [19.0975, 72.8745]] as LatLon[],
  andheri: [[19.108, 72.880], [19.115, 72.866], [19.115, 72.862]] as LatLon[],
  saharElevated: [[19.098, 72.859], [19.100, 72.868], [19.0975, 72.8745]] as LatLon[],
  chembur: [[19.058, 72.901], [19.061, 72.899]] as LatLon[],
};

export const ROADS: { pts: LatLon[]; major?: boolean }[] = [
  { pts: S.eeh, major: true }, { pts: S.freeway, major: true }, { pts: S.weh, major: true },
  { pts: S.seaLink, major: true }, { pts: S.coastal, major: true },
  { pts: S.fort }, { pts: S.ambedkar }, { pts: S.dadarWest }, { pts: S.sbMarg }, { pts: S.mahim },
  { pts: S.besant }, { pts: S.sclr }, { pts: S.bkc }, { pts: S.sionPanvel }, { pts: S.jvlr },
  { pts: S.sakinaka }, { pts: S.sahar }, { pts: S.andheri }, { pts: S.saharElevated },
];

// ---- Routes from the hotel -----------------------------------------------------------
const rev = (a: LatLon[]) => [...a].reverse();
const slice = (a: LatLon[], from: LatLon, to: LatLon) => {
  const i = a.findIndex((p) => p[0] === from[0] && p[1] === from[1]);
  const j = a.findIndex((p) => p[0] === to[0] && p[1] === to[1]);
  if (i < 0 || j < 0) throw new Error('route point not on road');
  return i <= j ? a.slice(i, j + 1) : rev(a.slice(j, i + 1));
};

const HOTEL: LatLon = [19.103, 72.925];
const eehSouthTo = (p: LatLon) => slice(S.eeh, HOTEL, p);
const CHHEDA: LatLon = [19.058, 72.901], AMAR_MAHAL: LatLon = [19.064, 72.906], SION: LatLon = [19.041, 72.866];
const DADAR: LatLon = [19.017, 72.845], PAREL: LatLon = [18.999, 72.840];

const toSoBo = [...eehSouthTo(CHHEDA), ...S.freeway.slice(1), ...S.fort.slice(1)];
const toDadar = [...eehSouthTo(SION), ...slice(S.ambedkar, SION, DADAR).slice(1)];
const toParel = [...toDadar, ...slice(S.ambedkar, DADAR, PAREL).slice(1)];
const toBkc = [...eehSouthTo(AMAR_MAHAL), ...S.sclr.slice(1), ...S.bkc.slice(1, 2)];
const toSahar = [...slice(S.eeh, HOTEL, [19.112, 72.929]), ...slice(S.jvlr, [19.112, 72.929], [19.120, 72.909]).slice(1), ...S.sakinaka.slice(1)];

export type Route = {
  pts: LatLon[];
  km: number;
  minutes: [number, number];           // typical range by car
  via: { en: string; es: string };
  steps: { en: string[]; es: string[] };
  ferry?: { pts: LatLon[]; minutes: number };
};

// The simplified polylines cut corners; real road distance runs about a fifth longer
// (checked against the Google Maps figures for the hotel → venue drives).
const WINDING = 1.2;
const route = (pts: LatLon[], minutes: [number, number], via: Route['via'], steps: Route['steps'], ferry?: Route['ferry']): Route =>
  ({ pts, km: lengthKm(pts) * WINDING, minutes, via, steps, ferry });

const VIA_FREEWAY = { en: 'Eastern Express Hwy · Eastern Freeway', es: 'Eastern Express Hwy · Eastern Freeway' };
const STEPS_SOBO = {
  en: ['South on the Eastern Express Highway', 'At Chembur, take the Eastern Freeway to Orange Gate', 'P. D\'Mello Road into Fort, then Kala Ghoda'],
  es: ['Al sur por la Eastern Express Highway', 'En Chembur, toma la Eastern Freeway hasta Orange Gate', 'P. D\'Mello Road hacia Fort y luego Kala Ghoda'],
};
const VIA_DADAR = { en: 'Eastern Express Hwy · Dr Ambedkar Rd', es: 'Eastern Express Hwy · Dr Ambedkar Rd' };
const stepsDadar = (last: string, lastEs: string) => ({
  en: ['South on the Eastern Express Highway to Sion', 'Dr Ambedkar Road through Dadar', last],
  es: ['Al sur por la Eastern Express Highway hasta Sion', 'Dr Ambedkar Road a través de Dadar', lastEs],
});
const VIA_SCLR = { en: 'Eastern Express Hwy · Santacruz–Chembur Link Rd', es: 'Eastern Express Hwy · Santacruz–Chembur Link Rd' };
const STEPS_BKC = {
  en: ['South on the Eastern Express Highway to Ghatkopar', 'Santacruz–Chembur Link Road west across Kurla', 'Into Bandra Kurla Complex (G Block)'],
  es: ['Al sur por la Eastern Express Highway hasta Ghatkopar', 'Santacruz–Chembur Link Road al oeste por Kurla', 'Hacia Bandra Kurla Complex (bloque G)'],
};
const VIA_JVLR = { en: 'JVLR · Saki Vihar Rd · Andheri–Kurla Rd', es: 'JVLR · Saki Vihar Rd · Andheri–Kurla Rd' };
const stepsSahar = (last: string, lastEs: string) => ({
  en: ['North one exit to Gandhi Nagar, then west on JVLR past Powai', 'Saki Vihar Road to Saki Naka, then Andheri–Kurla Road', last],
  es: ['Al norte una salida hasta Gandhi Nagar, luego al oeste por JVLR pasando Powai', 'Saki Vihar Road hasta Saki Naka, luego Andheri–Kurla Road', lastEs],
});

export const ROUTES: Record<string, Route> = {
  airport: route([...toSahar, ...S.sahar.slice(1)], [25, 45], VIA_JVLR, stepsSahar('Sahar Road to Terminal 2', 'Sahar Road hasta la Terminal 2')),
  avartana: route([...toSahar, PLACES.avartana.ll], [25, 45], VIA_JVLR, stepsSahar('ITC Maratha is on Sahar Airport Road', 'ITC Maratha está en Sahar Airport Road')),
  ev1: route([...eehSouthTo(CHHEDA), ...S.chembur.slice(1)], [20, 35], { en: 'Eastern Express Hwy', es: 'Eastern Express Hwy' }, {
    en: ['South on the Eastern Express Highway', 'Exit at Chheda Nagar for Chembur'],
    es: ['Al sur por la Eastern Express Highway', 'Salida en Chheda Nagar hacia Chembur'],
  }),
  ev2: route([...eehSouthTo(CHHEDA), ...S.chembur.slice(1)], [20, 35], { en: 'Eastern Express Hwy', es: 'Eastern Express Hwy' }, {
    en: ['South on the Eastern Express Highway', 'Exit at Chheda Nagar for Chembur'],
    es: ['Al sur por la Eastern Express Highway', 'Salida en Chheda Nagar hacia Chembur'],
  }),
  ev4: route(toBkc, [30, 55], VIA_SCLR, STEPS_BKC),
  jio: route([...toBkc.slice(0, -1), PLACES.jio.ll], [30, 55], VIA_SCLR, STEPS_BKC),
  siddhi: route([...toDadar, ...S.dadarWest.slice(1)], [45, 75], VIA_DADAR,
    stepsDadar('At Dadar TT turn west to Prabhadevi', 'En Dadar TT gira al oeste hacia Prabhadevi')),
  goodearth: route([...toParel, ...slice(S.sbMarg, PAREL, PLACES.goodearth.ll).slice(1)], [45, 75], VIA_DADAR,
    stepsDadar('At Parel cross to Senapati Bapat Marg, Lower Parel', 'En Parel cruza hacia Senapati Bapat Marg, Lower Parel')),
  masque: route([...toParel, ...slice(S.sbMarg, PAREL, PLACES.masque.ll).slice(1)], [50, 80], VIA_DADAR,
    stepsDadar('Senapati Bapat Marg south to Mahalaxmi', 'Senapati Bapat Marg al sur hasta Mahalaxmi')),
  ev3: route([...toParel, ...slice(S.sbMarg, PAREL, PLACES.ev3.ll).slice(1)], [50, 80], VIA_DADAR,
    stepsDadar('Senapati Bapat Marg south to the Race Course gate', 'Senapati Bapat Marg al sur hasta la entrada del hipódromo')),
  csmvs: route([...toSoBo.slice(0, -1)], [55, 90], VIA_FREEWAY, STEPS_SOBO),
  gateway: route(toSoBo, [55, 90], VIA_FREEWAY, STEPS_SOBO),
  sealounge: route([...toSoBo, PLACES.sealounge.ll], [55, 90], VIA_FREEWAY, STEPS_SOBO),
  colaba: route([...toSoBo, [18.918, 72.829], PLACES.colaba.ll], [55, 90], VIA_FREEWAY, STEPS_SOBO),
  elephanta: route(toSoBo, [55, 90], VIA_FREEWAY, {
    en: [...STEPS_SOBO.en, 'Ferry from the Gateway of India (about an hour each way)'],
    es: [...STEPS_SOBO.es, 'Ferry desde la Puerta de la India (alrededor de una hora por trayecto)'],
  }, { pts: [[18.922, 72.836], [18.930, 72.860], [18.950, 72.900], [18.960, 72.925], PLACES.elephanta.ll], minutes: 60 }),
};
