/** Today's date in Mumbai, as YYYY-MM-DD. All schedule logic runs on Mumbai time. */
export const mumbaiToday = (): string => {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  return `${get('year')}-${get('month')}-${get('day')}`;
};

/** Whole days from `from` to `to` (both YYYY-MM-DD). Positive when `to` is later. */
export const daysBetween = (from: string, to: string): number => {
  const a = Date.UTC(+from.slice(0, 4), +from.slice(5, 7) - 1, +from.slice(8, 10));
  const b = Date.UTC(+to.slice(0, 4), +to.slice(5, 7) - 1, +to.slice(8, 10));
  return Math.round((b - a) / 86400000);
};

export const gcalUrl = (title: string, range: string, location: string, details: string) =>
  `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${range}&location=${encodeURIComponent(location)}&details=${encodeURIComponent(details)}`;
