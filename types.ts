
export interface WeddingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  address: string;
  description: string;
  iconName: 'ring' | 'dance' | 'art';
  shuttleTime?: string;
  dressCode?: string;
}

export interface RegistryItem {
  id: string;
  store: string;
  link: string;
  description: string;
  imageUrl: string;
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
  attending: string;
  guests: number | string;
  dietaryRestrictions: string;
}

export interface Guest {
  id: string;
  firstName: string;
  lastName: string;
  hasPlusOne: boolean;
  hasRSVPd: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}