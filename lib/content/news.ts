/* News & Recognition: one feed of short posts. Tags: Win, Award, Publication,
   Speaking, Event, New team member. Each post can link to its LinkedIn post.
   `placeholder` items show on preview deployments only, never in production. */
export type NewsItem = { tag: "Win" | "Award" | "Publication" | "Speaking" | "Event" | "New team member"; date?: string; title: string; text?: string; href?: string; linkedin?: string; placeholder?: string };
export type EventItem = { when: string; title: string; where?: string; placeholder?: string };

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

export const EVENTS: EventItem[] = [
  { when: "Upcoming", title: "Next event", placeholder: "event name, dates, location, and whether we're exhibiting or speaking (confirm before launch)" },
];
