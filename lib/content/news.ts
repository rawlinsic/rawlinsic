/* News & Recognition: one feed of short posts. Tags: Project (a project in the works), Award, Publication,
   Speaking, Event, New team member. Each post can link to its LinkedIn post.
   `placeholder` items show on preview deployments only, never in production. */
/* offHome: listed on News & recognition, not in the home "What's new" cards */
export type NewsItem = { tag: "Project" | "Award" | "Publication" | "Research" | "Speaking" | "Event" | "New team member"; date?: string; title: string; text?: string; href?: string; linkedin?: string; placeholder?: string; offHome?: boolean };
/* ends: the event's last day (YYYY-MM-DD). It drops off the site the next day. */
/* line: one sentence for under the home hero's buttons (full site pass, Part 5, 1.1) */
/* photo/logo/credit: a picture for the event's card on home (photo behind, the event's own logo over it) */
export type EventItem = { when: string; title: string; where?: string; note?: string; href?: string; placeholder?: string; ends?: string; line?: string; photo?: string; logo?: string; credit?: string };

export const NEWS: NewsItem[] = [
  {
    tag: "Publication", date: "April 2026", title: "Minimizing data governance fatigue to maximize value",
    text: "April Blackburn, former Florida DOT Chief Information Officer, on implementing effective data governance and the essential elements of a solid foundation.",
    href: "/insights/thought-leadership/minimizing-data-governance-fatigue",
  },
  /* Not about politics, for the home page (Nicole, Nov 10). From the Research & Publications list; the pooled fund
     study isn't one of the projects waiting on a client's OK. */
  { tag: "Research", title: "Multi-state drone standards and specifications",
    text: "A shared drone data standard and recommended practices states can adopt, for a multi-state pooled fund study.",
    href: "/insights/case-studies/multi-state-drone-standards" },
  /* Andy Palanisamy's LinkedIn article (Nov 4, 2026; shared in #ric-announcements the same day). Title copied from the article.
     Off the home page: it's about the election (Nicole, Nov 10). */
  { tag: "Publication", date: "November 2026", offHome: true,
    title: "America's Transportation Crossroads: What the 2026 Midterm Results Mean for Infrastructure, Mobility, and the Next Two Years",
    text: "Andy Palanisamy on what the election could mean for the next surface transportation bill, state DOT budgets, and transportation technology.",
    href: "https://www.linkedin.com/pulse/americas-transportation-crossroads-what-2026-midterm-mean-palanisamy-iyt2e/" },
  /* no "contract wins" on the site (Nicole, Nov 10); on home this spot shows a project in the works */
  { tag: "Project", title: "A project in the works", placeholder: "a project underway, from Projects (In the works)" },
  /* content pass v7, 12.2 (Rawlins' LinkedIn posts and HEEP's page, checked Nov 11). Placed here so home's What's new cards stay the same. */
  { tag: "Speaking", date: "November 2026", title: "AMOTIA 17th Annual Conference",
    text: "Rawlins sponsored AMOTIA's 17th Annual Conference, November 4 to 6 in Fort Lauderdale. Scott Rawlins joined a general session on how asset maintenance supports asset management." },
  { tag: "Event", date: "September 2026", title: "The first Hawaii Transportation Summit",
    text: "Rawlins sponsored the summit's lanyards and an educational session on leadership and AI. Scott Rawlins and Alicia McConnell moderated and took part in sessions." },
  { tag: "Award", date: "2025", title: "Ken G. Close Award for the HEEP UAS Committee",
    text: "The Highway Engineering Exchange Program gave its 2025 Ken G. Close Award to its UAS Committee. Alicia McConnell and Paul Wheeler of our team serve on the committee.",
    href: "https://www.heep.org/ken-g-close-award" },
  { tag: "New team member", title: "Welcome to a new team member", placeholder: "name, role, and a one-line background from Our People" },
];

/* AASHTO Annual Meeting (handoff v8, 4.1). Safe line only: ten of our people
   are going. Exhibiting or speaking is unverified, so it isn't claimed. */
export const EVENTS: EventItem[] = [
  { when: "Nov 15–18, 2026", title: "AASHTO Annual Meeting", where: "Louisville, Kentucky", note: "", ends: "2026-11-18",
    line: "We will be at the AASHTO Annual Meeting in Louisville, Nov 15–18.",
    /* Nicole, Nov 11: "the aashto photo/logo from their event website". The logo is the banner on AASHTO's event page
       (web.cvent.com, 2026 AASHTO Annual Meeting and Expo); the Louisville photo is from AASHTO's own announcement
       (aashtojournal.transportation.org, photo by Charles Delano, U.S. Army Corps of Engineers). */
    photo: "/images/pages/aashto-2026-louisville.webp", logo: "/images/pages/aashto-logo-white.png", credit: "Louisville photo: Charles Delano, U.S. Army Corps of Engineers" },
  /* content pass v7, 12.2: after AASHTO, which stays first until it ends on Nov 18 */
  { when: "Dec 6–10, 2026", title: "IHEEP 2026", where: "Austin, Texas", note: "", ends: "2026-12-10",
    href: "https://web.cvent.com/event/2b28935f-a05f-4812-b141-d649c7d831d1/summary",
    line: "Our drone team will be at IHEEP 2026 in Austin, Dec 6–10." },
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
