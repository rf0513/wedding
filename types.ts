export type Lang = 'en' | 'es';
export type Localized<T> = Record<Lang, T>;

export interface DayPlan {
  id: 'd0' | 'd1' | 'd2' | 'd3' | 'd4' | 'd5';
  /** ISO date in Mumbai time */
  date: string;
  dayNum: string;
  monthShort: string;
  /** Whether the plan is still being arranged (renders a "plan in progress" pill) */
  tentative?: boolean;
  /** Google Calendar UTC range for the headline event, if any */
  calRange?: string;
  venue?: { name: string; area: string; query: string };
  time?: string;
  shuttle?: string;
  palette: string[];
  name: string;
  hook: string;
  trailer: string;
  what: string;
  timeline: { t: string; title: string; desc: string }[];
  role: { title: string; desc: string };
  wear: string;
  eat: string;
  phrase: { say: string; means: string };
  strip: string;
}

export interface Milestone {
  id: string;
  /** Inclusive start date (YYYY-MM-DD, Mumbai time) */
  from: string;
  /** Inclusive end date */
  to: string;
  kicker: string;
  line: string;
  to_path: string;
  /** Deadline the countdown counts to, if any */
  deadline?: string;
}

export interface Promise_ {
  what: string;
  why: string;
}

export interface Handled {
  title: string;
  desc: string;
}

export interface DressCode {
  dayId: DayPlan['id'];
  title: string;
  theme: string;
  desc: string;
  women: string;
  men: string;
}

export interface Garment {
  id: string;
  name: string;
  say: string;
  who: 'women' | 'men';
  desc: string;
  bestFor: string[];
  img: string;
}

export interface BriefSection {
  id: string;
  title: string;
  did: string;
  points: string[];
}

export interface Spot {
  id: string;
  title: string;
  desc: string;
  query: string;
  link?: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Trip {
  id: string;
  when: string;
  where: string;
  flag: string;
  title: string;
  desc: string;
  img?: string;
}

export interface ConfirmedGuest {
  name: string;
  city: string;
}
