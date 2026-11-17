/* Each page's name by its address, for the review tools (the comments list on every page, the all-changes page).
   Server side only: it reads the whole content layer. */
import { AREAS, CASES, INDUSTRIES, areaHref, caseHref, industryHref, subsectorHref } from "@/lib/content/site";
import { THOUGHT_LEADERSHIP } from "@/components/thought-leadership-data";
import { movedPath } from "@/lib/moved-pages";

const FIXED: Record<string, string> = {
  "/": "Home", "/services": "What We Do", "/industries": "Who We Work With", "/insights": "Insights",
  "/insights/case-studies": "All Projects", "/insights/news": "News & Recognition", "/insights/thought-leadership": "Thought Leadership",
  "/insights/research": "Research & Publications", "/insights/podcast": "Podcast", "/about": "About", "/about/who-we-are": "Who We Are",
  "/about/how-we-work": "How We Work", "/about/our-people": "Our People", "/about/where-we-work": "Where We Work", "/careers": "Careers",
  "/contact": "Contact", "/site-map": "Site Map", "/privacy-policy": "Privacy Policy", "/terms-of-service": "Terms of Service",
  "/accessibility": "Accessibility", "/review/changes": "All changes",
};

let names: Map<string, string> | null = null;
const all = () => {
  if (names) return names;
  names = new Map(Object.entries(FIXED));
  for (const a of AREAS) {
    names.set(areaHref(a), a.name);
    for (const s of a.services) names.set(`/services/${a.slug}/${s.slug}`, s.name);
  }
  for (const i of INDUSTRIES) {
    names.set(industryHref(i), i.name);
    for (const s of i.subsectors) names.set(subsectorHref(i, s), s.name);
  }
  for (const c of CASES) names.set(caseHref(c), c.title);
  for (const t of THOUGHT_LEADERSHIP) names.set(`/insights/thought-leadership/${t.slug}`, t.title);
  return names;
};

/* the page's name; an address that isn't known shows as its last part in words */
export function pageName(path: string): string {
  const p = movedPath((path || "/").replace(/\/+$/, "") || "/");
  const hit = all().get(p);
  if (hit) return hit;
  const last = p.split("/").filter(Boolean).pop() || "";
  return last ? last.replace(/-/g, " ").replace(/^\w/, (x) => x.toUpperCase()) : "Home";
}
export const pageNames = (paths: string[]) => Object.fromEntries(Array.from(new Set(paths)).map((p) => [p, pageName(p)]));
