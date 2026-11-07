/* News & Recognition: one feed of short posts. Tags: Win, Award, Publication,
   Speaking, Event, New team member. Each post can link to its LinkedIn post.
   `placeholder` items show on preview deployments only, never in production. */
export type NewsItem = { tag: "Win" | "Award" | "Publication" | "Speaking" | "Event" | "New team member"; date?: string; title: string; text?: string; href?: string; linkedin?: string; placeholder?: string };
/* ends: the event's last day (YYYY-MM-DD). It drops off the site the next day. */
export type EventItem = { when: string; title: string; where?: string; note?: string; href?: string; placeholder?: string; ends?: string };

export const NEWS: NewsItem[] = [
  {
    tag: "Publication", date: "April 2026", title: "Minimizing data governance fatigue to maximize value",
    text: "April Blackburn, former Florida DOT Chief Information Officer, on implementing effective data governance and the essential elements of a solid foundation.",
    href: "/insights/thought-leadership/minimizing-data-governance-fatigue",
  },
  { tag: "Publication", date: "November 2026", title: "Andy's LinkedIn article on the midterms and transportation", placeholder: "add the article's title, a one-line summary, and the LinkedIn link (Andy's own post, Nov 4)" },
  { tag: "Win", title: "A recent contract win", placeholder: "cleared client name or a generic descriptor, one line on the work" },
  { tag: "New team member", title: "Welcome to a new team member", placeholder: "name, role, and a one-line background from Our People" },
  { tag: "Speaking", title: "A recent talk or panel", placeholder: "event, topic, and who spoke" },
];

/* AASHTO Annual Meeting (handoff v8, 4.1). Safe line only: ten of our people
   are going. Exhibiting or speaking is unverified, so it isn't claimed. */
export const EVENTS: EventItem[] = [
  { when: "Nov 15–18, 2026", title: "AASHTO Annual Meeting", where: "Louisville, Kentucky", note: "Ten of our people will be there.", ends: "2026-11-18" },
];

/* An event shows until the end of its last day, Pacific time (our office is in
   Reno). Pages that list events revalidate hourly, so a past event drops off
   on its own without a new deploy. */
export const isUpcoming = (e: EventItem, now: Date = new Date()) => {
  if (!e.ends) return true;
  const [y, m, d] = e.ends.split("-").map(Number);
  const nextDayPacific = Date.UTC(y, m - 1, d + 1, 8); // midnight PST (UTC-8) the day after
  return now.getTime() < nextDayPacific;
};
