/* Everything the site search looks through (Nov 12, Nicole: "the search on the site doesn't work right"), built once
   at deploy: each page's name plus the words around it (a service's opening and what it covers, a project's client,
   states, and services, people's titles), so a search for a state, a client, or a topic finds the pages about it.
   Nov 23 (Nicole: yes, after a search for "EPIC" and "14%" found nothing): a project also carries its page's
   challenge, what we did, and results, the same lines its page shows (components/site/cases.tsx CaseDetail).
   Loaded by the header's search the first time someone types (components/v8/header-client.tsx). */
import { AREAS, CASES, INDUSTRIES, areaHref, caseHref, industryHref, serviceById, subsectorHref, isListed } from "@/lib/content/site";
import { AREAS as AREA_DATA, SERVICES, CASES as CASE_DATA } from "@/lib/content/catalog";
import { CASE_EXTRA } from "@/lib/content/case-extra";
import { TEAM_MEMBERS } from "@/lib/team-data";
import { THOUGHT_LEADERSHIP } from "@/components/thought-leadership-data";
import { PUBLICATIONS } from "@/lib/content/research";

export const dynamic = "force-static";

type Hit = { label: string; kind: string; href: string; text?: string };
const clean = (s = "", max = 700) => s.replace(/\*\*/g, "").replace(/\s+/g, " ").trim().slice(0, max);
/* a project page's own words: the challenge, what we did (a "## " line is a small heading there) with its Tools row,
   and results, with the lines from our records (CASE_EXTRA) that the page adds under each */
const caseWords = (id: string) => {
  const d = CASE_DATA[id], x = CASE_EXTRA[id] ?? {};
  return [d?.ch ?? "", ...(d?.did ?? []), ...(x.did ?? []), ...(d?.tools ?? []), ...(d?.res ?? []), ...(x.res ?? [])]
    .map((t) => t.replace(/^## /, "")).join(" ");
};

export function GET() {
  const hits: Hit[] = [
    ...AREAS.map((a) => ({ label: a.name, kind: "What we do", href: areaHref(a), text: clean(`${a.tag} ${AREA_DATA[a.id]?.lead ?? ""}`) })),
    ...AREAS.flatMap((a) => a.services.filter((s) => isListed(s.id)).map((s) => {
      const d = SERVICES[s.id];
      return { label: s.name, kind: a.name, href: `/services/${a.slug}/${s.slug}`, text: clean(`${d?.intro ?? ""} ${(d?.deliver ?? []).filter((x) => !x.startsWith("## ")).join(" ")}`) };
    })),
    ...INDUSTRIES.map((i) => ({ label: i.name, kind: "Who we work with", href: industryHref(i), text: clean(`${i.who} ${i.lead}`) })),
    ...INDUSTRIES.flatMap((i) => i.subsectors.map((s) => ({ label: s.name, kind: i.name, href: subsectorHref(i, s), text: clean(s.line) }))),
    ...CASES.map((c) => ({ label: c.title, kind: "Project", href: caseHref(c),
      text: clean(`${c.who} ${c.states.join(" ")} ${c.status} ${c.services.map((id) => serviceById(id)?.service.name ?? "").join(" ")} ${caseWords(c.id)}`, 20000) })),
    ...TEAM_MEMBERS.map((p) => ({ label: p.name, kind: p.title || p.role, href: "/about/our-people", text: clean(p.location) })),
    ...THOUGHT_LEADERSHIP.map((a) => ({ label: a.title, kind: "Thought leadership", href: `/insights/thought-leadership/${a.slug}` })),
    ...PUBLICATIONS.map((p) => ({ label: p.title, kind: "Research & publications", href: "/insights/research", text: clean(`${p.publisher} ${p.people.join(" ")}`) })),
    { label: "Who We Are", kind: "About", href: "/about/who-we-are" },
    { label: "Our People", kind: "About", href: "/about/our-people", text: "team leaders staff experts" },
    { label: "How We Work", kind: "About", href: "/about/how-we-work" },
    { label: "Where We Work", kind: "About", href: "/about/where-we-work", text: "states map locations" },
    { label: "Careers", kind: "About", href: "/careers", text: "jobs openings join" },
    { label: "Contact", kind: "Get in touch", href: "/contact", text: "email phone address talk to us" },
    { label: "All Projects", kind: "Our work", href: "/insights/case-studies", text: "case studies work" },
    { label: "Insights", kind: "Insights", href: "/insights" },
    { label: "News & Recognition", kind: "Insights", href: "/insights/news", text: "events awards conferences" },
    { label: "Thought Leadership", kind: "Insights", href: "/insights/thought-leadership", text: "articles" },
    { label: "Research & Publications", kind: "Insights", href: "/insights/research", text: "papers guidance reports" },
    { label: "Podcast: The Rawlins Way", kind: "Insights", href: "/insights/podcast", text: "episodes" },
  ];
  return Response.json(hits);
}
