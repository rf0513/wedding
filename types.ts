
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
  /** Google Calendar UTC range, e.g. "20270202T053000Z/20270202T090000Z" */
  calRange: string;
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

export interface WeddingCustom {
  id: string;
  title: string;
  marathiTitle?: string;
  significance: string;
  whatToWear: string;
  whatToExpect: string;
  imageUrl: string;
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

export interface EventDressCode {
  id: string;
  title: string;
  theme: string;
  description: string;
  options: {
    women: string;
    men: string;
  };
  colorPalette: string[];
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
