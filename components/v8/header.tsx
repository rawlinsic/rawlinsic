/* Site header (server part): gathers the menu and search data from the
   content layer so the browser gets only what the menu shows. */
import { AREAS, CASES, SITE_INDEX, VISIBLE_INDUSTRIES, areaHref, caseById, caseHref, industryHref, isOurs, subsectorHref } from "@/lib/content/site";
import { INDUSTRY_PHOTO, AREA_PHOTO } from "@/lib/content/media";
import { THEME, FEATURED_CASES, casePhoto } from "@/lib/content/v8";
import HeaderClient, { type NavData } from "@/components/v8/header-client";

export default function Header() {
  const featured = FEATURED_CASES.map((id) => CASES.find((c) => c.id === id)).find((c) => c && isOurs(c))!;
  const data: NavData = {
    areas: AREAS.map((a) => ({
      id: a.id, n: THEME[a.id].n, name: a.name, tag: a.tag, href: areaHref(a), color: THEME[a.id].color, ink: THEME[a.id].ink, tint: THEME[a.id].tint, photo: AREA_PHOTO[a.id],
      services: a.services.map((s) => ({ name: s.name, href: `/services/${a.slug}/${s.slug}` })),
    })),
    industries: VISIBLE_INDUSTRIES.map((i) => ({
      name: i.name, href: industryHref(i), who: i.who, photo: INDUSTRY_PHOTO[i.id],
      subs: i.subsectors.map((s) => ({ name: s.name, href: subsectorHref(i, s) })),
      projects: i.projects.map((id) => caseById(id)).filter(Boolean).map((c) => ({ title: c!.title, href: caseHref(c!), before: !isOurs(c!) })),
    })),
    work: [
      { label: "All projects", href: "/insights/case-studies", note: "Every project, by area, industry, and state" },
      { label: "In the works", href: "/insights/case-studies?status=ongoing", note: "What we're doing now" },
      { label: "Where we work", href: "/about/where-we-work", note: "The states we've worked in" },
    ],
    featured: { title: featured.title, who: featured.who, href: caseHref(featured), photo: casePhoto(featured) },
    insights: [
      { label: "Thought leadership", href: "/insights/thought-leadership", note: "Articles from people who've done the job" },
      { label: "Podcast", href: "/insights/podcast", note: "The Rawlins Way" },
      { label: "News & recognition", href: "/insights/news", note: "Wins, talks, events, new people" },
      { label: "Research & publications", href: "/insights/research", note: "Guidance manuals and research" },
    ],
    about: [
      { label: "Who we are", href: "/about/who-we-are", note: "Founded in 2017, and how we've grown" },
      { label: "How we work", href: "/about/how-we-work", note: "Assess, rebuild, train, hand off" },
      { label: "Our people", href: "/about/our-people", note: "People who've done the job" },
      { label: "Where we work", href: "/about/where-we-work", note: "The states we've worked in" },
      { label: "Careers", href: "/careers", note: "Work with us" },
    ],
    search: [...SITE_INDEX, ...CASES.map((c) => ({ label: c.title, kind: "Project", href: caseHref(c) }))],
  };
  return <HeaderClient data={data} />;
}
