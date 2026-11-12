/* News & Recognition: one feed of short posts. Tags: Project (a project in the works), Award, Publication,
   Speaking, Event, New team member. Each post can link to its LinkedIn post.
   `placeholder` items show on preview deployments only, never in production. */
/* offHome: listed on News & recognition, not in the home "What's new" cards */
export type NewsItem = { tag: "Project" | "Award" | "Publication" | "Research" | "Speaking" | "Event" | "New team member" | "Recognition"; date?: string; title: string; text?: string; href?: string; linkedin?: string; placeholder?: string; offHome?: boolean; /* a picture on top of its home tile */ photo?: string };
/* ends: the event's last day (YYYY-MM-DD). It drops off the site the next day. */
/* line: one sentence for under the home hero's buttons (full site pass, Part 5, 1.1) */
/* photo/logo/credit: a picture for the event's card on home (photo behind, the event's own logo over it) */
export type EventItem = { when: string; title: string; where?: string; note?: string; href?: string; placeholder?: string; ends?: string; line?: string; photo?: string; logo?: string; badge?: string; credit?: string; banner?: boolean; /* the event's full name, for its home card */ cardTitle?: string; /* who was there for us, and the sessions they led (shown on the event's card in place of the sentence) */ who?: string; sessions?: { day: string; role: string; title: string }[] 
  /* Nov 11 (Nicole): events show under "Where we'll be next" until they end, then under "Where we've been", so past
     events stay on the site and it's clear they're over. intl: outside the U.S. (also listed on the International page).
     role: what we did there (Speaking, Sponsor, ...). past: what to say once it's over. pos: where to center the photo.
     ends is also what orders past events; where only the month or year is known it's set to that month's end. */
  intl?: boolean; role?: string; past?: string; pos?: string };

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
    href: "/insights/case-studies/multi-state-drone-standards",
    photo: "/images/pages/skylimit.webp" }, // the project's own photo, from the live site's Advanced Air Mobility page (Nicole, Nov 11: "let's have an image for the research one")
  /* Andy Palanisamy's LinkedIn article (Nov 4, 2026; shared in #ric-announcements the same day). Title copied from the article.
     Off the home page: it's about the election (Nicole, Nov 10). */
  { tag: "Publication", date: "November 2026", offHome: true,
    title: "America's Transportation Crossroads: What the 2026 Midterm Results Mean for Infrastructure, Mobility, and the Next Two Years",
    text: "Andy Palanisamy on what the election could mean for the next surface transportation bill, state DOT budgets, and transportation technology.",
    href: "https://www.linkedin.com/pulse/americas-transportation-crossroads-what-2026-midterm-mean-palanisamy-iyt2e/" },
  /* no "contract wins" on the site (Nicole, Nov 10); on home this spot shows a project in the works */
  { tag: "Project", title: "A project in the works", placeholder: "a project underway, from Projects (In the works)" },
  /* The event posts that were here (AMOTIA, Automechanika Dubai, ConTech / MENA, the Hawaii summit, LEAP, and the
     STEM Bridge Challenge; content pass v7 addendum, Part B) are in EVENTS below since Nov 11, so the News page can
     show them as past events with their photos. */
  // Andy's LinkedIn posts
  { tag: "Recognition", date: "2026", title: "Andy Palanisamy named a G100 Denim Club Country Partner",
    text: "Andy Palanisamy serves as the G100 Mission Million Denim Club Country Partner for the Smart & Sustainable Cities Wing in the UAE. G100 is a group of 100 global women leaders, and the Denim Club is its group of He-for-She champions." },
  // HEEP: heep.org
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
    /* the event's own header image, from AASHTO's 2026 Annual Meeting and Expo page (Nicole sent it, Nov 11) */
    /* Nov 11 (Nicole: "make the background image overlay a little darker so we can read the text"): the words in that
       image can't be darkened apart from the picture, so the image sits behind, blurred and darkened, and the card
       shows the same words as real text, with the meeting's badge. */
    photo: "/images/pages/aashto-2026-annual-meeting.webp", banner: true, badge: "/images/pages/aashto-2026-badge.png", cardTitle: "2026 AASHTO Annual Meeting and Expo" },
  /* content pass v7, 12.2: after AASHTO, which stays first until it ends on Nov 18 */
  { when: "Dec 6–10, 2026", title: "IHEEP 2026", where: "Austin, Texas", note: "", ends: "2026-12-10", role: "Attending",
    href: "https://web.cvent.com/event/2b28935f-a05f-4812-b141-d649c7d831d1/summary",
    line: "Our drone team will be at IHEEP 2026 in Austin, Dec 6–10." },
  /* Everything below was a News post until Nov 11. Each was checked then against Rawlins' or the person's own LinkedIn
     post, the event's sponsor board, or the publisher's page (content pass v7 addendum, Part B). They sit after the
     two above so the home page and the menu keep showing AASHTO first. */
  // Andy's LinkedIn posts, and his event graphic (three sessions, Nov 11 and 12)
  { when: "Nov 10–12, 2026", title: "Automechanika Dubai 2026", where: "Dubai Exhibition Centre, Expo City Dubai", ends: "2026-11-12", intl: true, role: "Speaking",
    // the three sessions, as written on Andy's event graphic (Nicole's "int'l" folder, Nov 11)
    who: "Andy Palanisamy",
    sessions: [
      { day: "Nov 11", role: "Moderator", title: "Smart Cities and Mobility Integration Across MEA" },
      { day: "Nov 12", role: "Speaker", title: "Policy and Progress: Enabling Innovation in a Regulated World" },
      { day: "Nov 12", role: "Moderator", title: "Total Lifecycle Management: From Procurement to End-of-Life Optimization" },
    ],
    line: "Andy Palanisamy is moderating sessions on smart cities and mobility integration across the Middle East and Africa, and on total lifecycle management from procurement to end of life, and speaking on enabling innovation in a regulated world.",
    past: "Andy Palanisamy moderated sessions on smart cities and mobility integration across the Middle East and Africa, and on total lifecycle management from procurement to end of life, and spoke on enabling innovation in a regulated world." },
  // Andy's LinkedIn posts
  { when: "Nov 9–10, 2026", title: "ConTech / MENA Construction Summit 2026", where: "Madinat Jumeirah, Dubai", ends: "2026-11-10", intl: true, role: "Attending",
    past: "Andy Palanisamy represented Rawlins at the ConTech / MENA Construction Summit." },
  // AMOTIA: the event's sponsor board ("Host State Night Event Sponsor") and Rawlins' LinkedIn post. Photo: Scott on the general session panel, by Janine Cooper.
  { when: "Nov 4–6, 2026", title: "AMOTIA 17th Annual Conference", where: "Fort Lauderdale, Florida", ends: "2026-11-06", role: "Sponsor and speaking",
    photo: "/images/pages/news-amotia-2026-general-session.webp", pos: "50% 30%",
    past: "Rawlins was the Host State Night event sponsor. Scott Rawlins joined a general session panel on how asset maintenance supports asset management." },
  // Hawaii: Ozzy Bravo's LinkedIn post ("Exclusive Sponsor for Lanyards and an Educational Session") and the sponsor board. The month is known, not the days.
  { when: "September 2026", title: "The first Hawaii Transportation Summit", where: "Hawaii", ends: "2026-09-30", role: "Sponsor and speaking",
    photo: "/images/pages/insights-hawaii-summit-2026-team.webp", pos: "50% 35%",
    past: "Rawlins was an exclusive sponsor, sponsoring the lanyards and an educational session on leadership and AI. Scott Rawlins and Alicia McConnell moderated and took part in sessions." },
  // Andy's LinkedIn posts (photos posted early Sep 2026; Nicole's "int'l" folder). Only the year is on record, so it's ordered by when the photos were posted.
  { when: "2026", title: "LEAP 2026", where: "Riyadh, Saudi Arabia", ends: "2026-09-03", intl: true, role: "Speaking",
    photo: "/images/pages/news-leap-2026-speaking.webp", pos: "60% 30%",
    past: "Andy Palanisamy spoke on the future of urban identity." },
  // Bridge Challenge: Dara Wheeler's LinkedIn post and the AASHTO Journal article (Apr 17, 2026)
  { when: "Apr 13, 2026", title: "AASHTO 2026 STEM Bridge Challenge", where: "Savannah, Georgia", ends: "2026-04-13", role: "Leading",
    href: "https://aashtojournal.transportation.org/winners-named-in-aashto-2026-bridge-challenge/",
    past: "Alicia McConnell helped lead the challenge, where middle and high school teams design, build, and test model bridges, at AASHTO's Spring Meeting." },
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

/* Events for a page, split by whether they're still to come: upcoming soonest first, past newest first. */
export const eventsByTime = (list: EventItem[] = EVENTS, now: Date = new Date()) => {
  const key = (e: EventItem) => e.ends ?? "9999";
  return {
    upcoming: list.filter((e) => isUpcoming(e, now)).sort((a, b) => key(a).localeCompare(key(b))),
    past: list.filter((e) => !isUpcoming(e, now)).sort((a, b) => key(b).localeCompare(key(a))),
  };
};
