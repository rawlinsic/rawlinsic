/* Site header (server part): gathers the menu and search data from the
   content layer so the browser gets only what the menu shows. Nothing is typed
   into the menu: every line comes from lib/content (full site pass, Part 1,
   section 1, with Part 4, 3 for Who we work with). */
import { AREAS, CASES, INDUSTRIES, LEADERS, SITE_INDEX, VISIBLE_INDUSTRIES, areaHref, caseById, caseHref, caseTag, industryHref, isOurs, subsectorHref, type CaseIndex, CASE_STATUS } from "@/lib/content/site";
import { isJacobVersion } from "@/lib/preview-gh";
import { tc } from "@/lib/title-case";
import { INDUSTRIES as IND_DATA } from "@/lib/content/catalog";
import { AREA_PHOTO, PAGE_PHOTO, AREA_PHOTO_POS, NAV_AREA_PHOTO, NAV_AREA_PHOTO_POS } from "@/lib/content/media";
import { THEME, casePhoto } from "@/lib/content/v8";
import { EVENTS, NEWS, isUpcoming } from "@/lib/content/news";
import { RESEARCH } from "@/lib/content/research";
import { THOUGHT_LEADERSHIP } from "@/components/thought-leadership-data";
import HeaderClient, { type NavData } from "@/components/v8/header-client";

const PROD = process.env.VERCEL_ENV === "production";

/* Who we work with: the project shown as a photo card for each industry (Part 4, 3) */
const IND_CARD: Record<string, string> = { transport: "cs-proficiency", gov: "cs-local-am", contractors: "cs-major", private: "cs-pv-pmo" };
/* Our work: three projects in the works (Part 1, 1.3) */
const IN_THE_WORKS = ["cs-transform", "cs-proficiency", "cs-strategic"];

/* note: the preview-only In the works sign-off note (never in production) */
const card = (c: CaseIndex) => ({ title: tc(c.title), who: c.who, href: caseHref(c), photo: casePhoto(c), status: caseTag(c), live: c.status === "Ongoing", note: process.env.VERCEL_ENV === "production" ? undefined : CASE_STATUS[c.id] });
/* "Nov 15–18, 2026" → "Nov 15–18"; "Louisville, Kentucky" → "Louisville" */
const eventLine = (e: (typeof EVENTS)[number]) => [e.title, e.when.replace(/,\s*\d{4}$/, ""), e.where?.split(",")[0]].filter(Boolean).join(", ");
const monthOf = (d?: string) => (d ? Date.parse(`1 ${d}`) || 0 : 0);

export default function Header() {
  const intl = INDUSTRIES.find((i) => i.id === "intl");
  /* News: the next event while it's upcoming (the browser checks the date again), then the newest post */
  const next = EVENTS.find((e) => !e.placeholder && isUpcoming(e));
  const newest = [...NEWS].filter((n) => !n.placeholder).sort((a, b) => monthOf(b.date) - monthOf(a.date))[0];
  const article = [...THOUGHT_LEADERSHIP].sort((a, b) => b.date.localeCompare(a.date))[0];
  const data: NavData = {
    areas: AREAS.map((a) => ({
      id: a.id, n: THEME[a.id].n, name: a.name, tag: a.tag, href: areaHref(a), color: THEME[a.id].color, ink: THEME[a.id].ink, tint: THEME[a.id].tint, photo: NAV_AREA_PHOTO[a.id] ?? AREA_PHOTO[a.id], pos: NAV_AREA_PHOTO[a.id] ? NAV_AREA_PHOTO_POS[a.id] : AREA_PHOTO_POS[a.id],
      /* the preview-only "?" beside Owner's Representation is off (Nicole, Nov 11) */
      services: a.services.map((s) => ({ name: s.name, href: `/services/${a.slug}/${s.slug}`, q: undefined as string | undefined })),
      projects: `/insights/case-studies?area=${a.slug}`,
    })),
    industries: VISIBLE_INDUSTRIES.map((i) => {
      const feature = caseById(IND_CARD[i.id] ?? i.projects[0]);
      return {
        name: i.name, href: industryHref(i), who: i.who,
        subs: i.subsectors.map((s) => ({ name: s.name, href: subsectorHref(i, s) })),
        /* an industry with no specialties shows the challenges we hear there instead */
        challenges: i.subsectors.length ? [] : IND_DATA[i.id]?.ch ?? [],
        feature: feature && isOurs(feature) ? card(feature) : undefined,
        /* the industry's other featured projects: Rawlins work only (Part 1, 0.4) */
        projects: i.projects.map((id) => caseById(id)).filter((c): c is CaseIndex => !!c && isOurs(c) && c.id !== feature?.id).map((c) => ({ title: tc(c.title), href: caseHref(c) })),
        all: { label: `All ${i.name} Projects`, href: `/insights/case-studies?industry=${i.slug}` },
      };
    }),
    /* previews only: the hidden International page, with why it's hidden (Part 4, 1) */
    intl: !PROD && intl ? { name: intl.name, href: industryHref(intl), note: "" } : undefined,
    work: [
      { label: "All Projects", href: "/insights/case-studies", note: "" },
      { label: "Where We Work", href: "/about/where-we-work", note: "" },
    ],
    inWorks: IN_THE_WORKS.map((id) => caseById(id)).filter((c): c is CaseIndex => !!c).map(card),
    insights: [
      { label: "News & Recognition", href: "/insights/news", note: "Events, publications, and news", photo: PAGE_PHOTO.news,
        line: newest ? { k: "Latest", t: newest.title } : undefined,
        next: next ? { k: "Next", t: eventLine(next), ends: next.ends } : undefined },
      /* Thought Leadership sits last (Nicole, Nov 11) */
      { label: "Research & Publications", href: "/insights/research", note: "Guidance manuals and research", photo: PAGE_PHOTO.research,
        line: RESEARCH[0] ? { k: "Featured", t: RESEARCH[0].t } : undefined },
      { label: "Podcast", href: "/insights/podcast", note: "The Rawlins Way", photo: PAGE_PHOTO.podcast,
        line: { t: "The Rawlins Way: conversations with the people doing the work" } },
      { label: "Thought Leadership", href: THOUGHT_LEADERSHIP.length === 1 ? `/insights/thought-leadership/${THOUGHT_LEADERSHIP[0].slug}` : "/insights/thought-leadership", note: "Practical perspectives from our team", photo: PAGE_PHOTO.thought,
        line: article ? { k: "Latest", t: article.title } : undefined },
    ],
    about: [
      { label: "Who We Are", href: "/about/who-we-are", note: "Where we started, and where we're headed" },
      { label: "How We Work", href: "/about/how-we-work", note: "" },
      { label: "Our People", href: "/about/our-people", note: "" },
      { label: "Where We Work", href: "/about/where-we-work", note: "" },
      { label: "Careers", href: "/careers", note: "" },
    ],
    /* About: the first eight leaders (Part 1, 1.5; 27 people verified in content updates v4, 5) */
    faces: LEADERS.slice(0, 8).map((l) => ({ name: l.name.split(",")[0], photo: `/images/team/${l.photo}.webp` })),
    facesLine: "More than 25 of our people built their careers inside public agencies.",
    search: [...SITE_INDEX, ...CASES.map((c) => ({ label: c.title, kind: "Project", href: caseHref(c) }))],
  };
  return <HeaderClient data={data} aboutTopOnly={isJacobVersion()} />;
}
