
export interface WeddingEvent {
  id: string;
  title: string;
  day: string;
  month: string;
  time: string;
  location: string;
  address: string;
  description: string;
  dressCode: string;
  shuttleTime: string;
}

export interface StoryEvent {
  id: string;
  date: string;
  title: string;
  desc: string;
  img: string;
}

export interface RegistryItem {
  id: string;
  store: string;
  link: string;
  description: string;
}

export interface AttireItem {
  id: string;
  name: string;
  pronunciation?: string;
  description: string;
  gender: 'Women' | 'Men' | 'Unisex';
  bestFor: string[];
  imageUrl: string;
}

/** One moment in the rundown of a celebration day. */
export interface CelebrationMoment {
  /** Optional clock time, e.g. "11:00 AM". Leave empty for "sometime during". */
  time?: string;
  title: string;
  desc: string;
}

/** A word guests will hear that day, with a one-line meaning. */
export interface CelebrationTerm {
  term: string;
  meaning: string;
}

/**
 * Everything a guest needs (and everything that gets them excited) about one
 * day of the wedding. Logistics (time, venue, shuttle, calendar link) are not
 * duplicated here — they are pulled from the matching WeddingEvent via eventId.
 */
export interface Celebration {
  id: string;
  /** id of the WeddingEvent in EVENTS_* that carries the logistics. */
  eventId: string;
  day: number;
  weekday: string;
  dateLabel: string;
  title: string;
  subtitle: string;
  marathiTitle?: string;
  /** One-line hook shown under the title. */
  tagline: string;
  heroImage: string;
  /** Accent colour for this day (chips, rules, swatches). */
  accent: string;
  /** The exciting explanation of the event. */
  intro: string;
  /** The tradition and its meaning. */
  significance: string;
  moments: CelebrationMoment[];
  expect: string[];
  vibe: { label: string; value: string }[];
  dress: {
    theme: string;
    description: string;
    women: string;
    men: string;
    palette: string[];
    tips: string[];
    /** ids from ATTIRE_GUIDE_* to show as outfit inspiration. */
    attireIds: string[];
  };
  glossary: CelebrationTerm[];
  /** Short logistical notes shown in "Getting there" (who, food, end time…). */
  notes: string[];
  tips: string[];
}

export interface RSVPFormData {
  firstName: string;
  lastName: string;
  email: string;
  attending: 'yes' | 'no';
  guests: number | string;
  dietaryRestrictions: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface TravelSpot {
  id: string;
  title: string;
  desc: string;
  img?: string;
  query: string;
  link: string;
}

export interface SurvivalTip {
  id: string;
  title: string;
  html: string;
}
