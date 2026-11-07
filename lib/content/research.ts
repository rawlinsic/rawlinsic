/* Research & Publications: one list for the page and the Insights menu
   (full site pass, Part 1, 1.4). Each item can start with a link (a project
   or an article); `text` follows it. Wording: service pages scrub 1.5 and
   full site pass Part 4, 2. */
import { caseById, caseHref } from "@/lib/content/site";

export type ResearchItem = { k: string; t: string; link?: { href: string; label: string }; text: string };

const caseLink = (id: string) => {
  const c = caseById(id)!;
  return { href: caseHref(c), label: c.who };
};

export const RESEARCH: ResearchItem[] = [
  { k: "Guidance", t: "Guidance manuals on drones and advanced air mobility", text: "First-of-their-kind guidance manuals written by Paul Wheeler, a member of our team." },
  { k: "Standards", t: "Multi-state drone standards and specifications", link: caseLink("cs-pooled"), text: ": a shared drone data standard and recommended practices states can adopt." },
  { k: "Research", t: "Establishing a state aeronautics division", link: caseLink("cs-aerodiv"), text: ": a national scan, stakeholder interviews, and funding options." },
  { k: "Symposium", t: "A statewide drone and advanced air mobility symposium", link: caseLink("cs-aero"), text: ": we planned and ran it." },
  { k: "Thought leadership", t: "Minimizing data governance fatigue to maximize value", link: { href: "/insights/thought-leadership/minimizing-data-governance-fatigue", label: "A Q&A with April Blackburn" }, text: ", former Florida DOT Chief Information Officer." },
];
