/* News & Recognition: one feed of short posts. Tags: Win, Award, Publication,
   Speaking, Event, New team member. Each post can link to its LinkedIn post.
   `placeholder` items show on preview deployments only, never in production. */
export type NewsItem = { tag: "Win" | "Award" | "Publication" | "Speaking" | "Event" | "New team member"; date?: string; title: string; text?: string; href?: string; linkedin?: string; placeholder?: string };
/* ends: the event's last day (YYYY-MM-DD). It drops off the site the next day. */
/* line: one sentence for under the home hero's buttons (full site pass, Part 5, 1.1) */
export type EventItem = { when: string; title: string; where?: string; note?: string; href?: string; placeholder?: string; ends?: string; line?: string };

export const NEWS: NewsItem[] = [
  {
    tag: "Publication", date: "April 2026", title: "Minimizing data governance fatigue to maximize value",
    text: "April Blackburn, former Florida DOT Chief Information Officer, on implementing effective data governance and the essential elements of a solid foundation.",
    href: "/insights/thought-leadership/minimizing-data-governance-fatigue",
  },
  /* Andy Palanisamy's LinkedIn article (Nov 4, 2026; shared in #ric-announcements the same day). Title copied from the article. */
  { tag: "Publication", date: "November 2026",
    title: "America's Transportation Crossroads: What the 2026 Midterm Results Mean for Infrastructure, Mobility, and the Next Two Years",
    text: "Andy Palanisamy on what the election could mean for the next surface transportation bill, state DOT budgets, and transportation technology.",
    href: "https://www.linkedin.com/pulse/americas-transportation-crossroads-what-2026-midterm-mean-palanisamy-iyt2e/" },
  { tag: "Win", title: "A recent contract win", placeholder: "cleared client name or a generic descriptor, one line on the work" },
  { tag: "New team member", title: "Welcome to a new team member", placeholder: "name, role, and a one-line background from Our People" },
  { tag: "Speaking", title: "A recent talk or panel", placeholder: "event, topic, and who spoke" },
];

/* AASHTO Annual Meeting (handoff v8, 4.1). Safe line only: ten of our people
   are going. Exhibiting or speaking is unverified, so it isn't claimed. */
export const EVENTS: EventItem[] = [
  { when: "Nov 15–18, 2026", title: "AASHTO Annual Meeting", where: "Louisville, Kentucky", note: "Ten of our people will be there.", ends: "2026-11-18",
    line: "We will be at the AASHTO Annual Meeting in Louisville, Nov 15–18." },
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
