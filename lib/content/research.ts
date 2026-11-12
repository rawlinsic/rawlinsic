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
  { k: "Guidance", t: "A national guide to drone operations at transportation agencies", link: { href: "https://www.nationalacademies.org/read/29132", label: "NCHRP Research Report 1147" }, text: ", by Paul Wheeler and Aaron Organ of our team, written before they joined Rawlins." },
  { k: "Standards", t: "Multi-state drone standards and specifications", link: caseLink("cs-pooled"), text: ": a shared drone data standard and recommended practices states can adopt." },
  { k: "Research", t: "Whether and how to establish a state aeronautics division", link: caseLink("cs-aerodiv"), text: ": a national scan, stakeholder interviews, and funding options." },
  { k: "Symposium", t: "A statewide drone and advanced air mobility symposium", link: caseLink("cs-aero"), text: ": we planned and ran it." },
  { k: "Thought leadership", t: "Minimizing data governance fatigue to maximize value", link: { href: "/insights/thought-leadership/minimizing-data-governance-fatigue", label: "A Q&A with April Blackburn" }, text: ", former Florida DOT Chief Information Officer." },
];

/* Published work by people on our team (Nicole, Nov 10: "do we not actually have any of the published
   articles?"). Each checked Nov 10 against the publisher's own page (title page or record lists the authors).
   All were written before these people joined Rawlins, so each says so. Not listed: AASHTO GUAS-1 (the AASHTO
   notice doesn't credit our people) and the bio-only items that couldn't be found in public records. */
export type Publication = { series: string; title: string; year: string; publisher: string; href: string; people: string[]; line?: string; before?: boolean };
const NAP = "Transportation Research Board, National Academies";
export const PUBLICATIONS: Publication[] = [
  { series: "NCHRP Research Report 1147", title: "Implementation of Uncrewed Aircraft Systems Operational Capabilities: A Guide", year: "2025", publisher: NAP,
    href: "https://www.nationalacademies.org/read/29132", people: ["Paul Wheeler", "Aaron Organ"], before: true,
    line: "Use cases, technology trends, and a framework state DOTs can use to coordinate drone and advanced air mobility programs." },
  { series: "NCHRP Web-Only Document 424", title: "Uncrewed Aircraft Systems Operational Capabilities", year: "2025", publisher: NAP,
    href: "https://www.nationalacademies.org/read/29133", people: ["Paul Wheeler", "Aaron Organ"], before: true,
    line: "The research behind the guide (NCHRP Project 23-20)." },
  { series: "NCHRP Research Report 1114", title: "Uncrewed Aerial Systems Applications for Bridge Inspections: Element-Level Bridge Data Collection", year: "2024", publisher: NAP,
    href: "https://www.nationalacademies.org/read/27881", people: ["Alicia McConnell", "John Zuleger"], before: true,
    line: "Drone flights at bridges to collect element-level inspection data, with time comparisons and data processing." },
  { series: "FHWA-HIF-23-063", title: "EDC-5 UAS Regional Workshops Report", year: "2023", publisher: "Federal Highway Administration",
    href: "https://rosap.ntl.bts.gov/view/dot/73628", people: ["Paul Wheeler", "Aaron Organ"], before: true },
  { series: "NETCR117", title: "Integration of UAS Into Operations Conducted by New England Departments of Transportation: Develop Implementation Procedures for UAS Applications", year: "2021", publisher: "New England Transportation Consortium",
    href: "https://rosap.ntl.bts.gov/view/dot/56187", people: ["Paul Wheeler"], before: true },
  { series: "NCHRP Domestic Scan 17-01", title: "Successful Approaches for the Use of Unmanned Aerial Systems by Surface Transportation Agencies", year: "2018", publisher: "National Cooperative Highway Research Program",
    href: "https://commons.und.edu/avi-fac/52/", people: ["Steve Cook", "Paul Wheeler"], before: true },
  /* content pass v7, 12.1 (checked Nov 11 against the publishers' pages) */
  { series: "Journal of Airport Management, Vol. 18, No. 2", title: "Lessons learned while planning for advanced air mobility", year: "2024", publisher: "Henry Stewart Publications",
    href: "https://hstalks.com/article/8318/download/", people: ["Paul Wheeler", "Aaron Organ"], before: true },
  { series: "Planning magazine", title: "Air Support for Transportation Planning", year: "2020", publisher: "American Planning Association",
    href: "https://www.planning.org/planning/2020/nov/air-support-for-transportation-planning/", people: ["Alicia McConnell"], before: true },
];

/* Talks: speaker pages that name Rawlins */
export type Talk = { title: string; event: string; when: string; href: string; people: string[] };
export const TALKS: Talk[] = [
  { title: "The Evolving Landscape of Advanced Air Mobility", event: "Tennessee Drone and Advanced Air Mobility Symposium, Nashville", when: "November 2025",
    href: "https://housmanassociates.swoogo.com/2025TDOTDAAMSymposium/speaker/1980131/paul-wheeler", people: ["Paul Wheeler"] },
];

/* Awards and recognition for Rawlins and our people (never "contract wins": Nicole, Nov 10) */
export type Award = { title: string; from: string; year: string; href: string; people: string[]; before?: boolean };
export const AWARDS: Award[] = [
  { title: "Bimla G. Rhinehart Award", from: "Caltrans Outstanding Management and Engineering in Transportation Awards", year: "2025",
    href: "https://dot.ca.gov/ctnews/archive/2025-04/news/80-management-awards", people: ["Dara Wheeler"], before: true },
  /* ARTBA's release, Oct 3, 2025 (he was at Parsons then) */
  { title: "Guy Kelcey Award", from: "American Road & Transportation Builders Association, for service to its Planning & Design Division", year: "2025",
    href: "https://www.artba.org/news/artba-announces-2025-division-award-winners/", people: ["Ozzy Bravo"], before: true },
  /* Jordan School District, May 2022 (via the Internet Archive), and State Aviation Journal, May 17, 2022 */
  { title: "Utah Aviation Educator of the Year", from: "Utah Department of Transportation, Division of Aeronautics", year: "2022",
    href: "https://stateaviationjournal.com/index.php/state-news/utah/first-ever-utah-aviation-conference-draws-500-builds-community", people: ["Aaron Organ"], before: true },
  /* content pass v7, 12.2 (HEEP's page, checked Nov 11) */
  { title: "Ken G. Close Award", from: "Highway Engineering Exchange Program (HEEP), given to its UAS Committee", year: "2025",
    href: "https://www.heep.org/ken-g-close-award", people: ["Alicia McConnell", "Paul Wheeler"] },
];
