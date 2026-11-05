/* Rawlins redesign: one content layer for the menu, the home journey and
   (next) every page. Names, copy and case studies change here only.
   Source: wireframe v11 data (final state) + handoff v7 section 4 (v12).
   Source notes stay in comments, never on the page. */

/* ── Environment ─────────────────────────────────────────────── */
/* Dev-only blocks (Placeholder, Needs sign-off) render everywhere except
   the production deployment. Read on the server (VERCEL_ENV) and passed
   down, so a missing public env var can never leak them to production. */
export const isProductionEnv = () => process.env.VERCEL_ENV === "production";
/* Set in next.config.js from VERCEL_ENV at build time; also inlined into browser code. */
const PROD_BUILD = process.env.RAWLINS_ENV === "production";

export const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, " ").replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/* ── Scenes: what the 3D world shows behind a page or menu item ─ */
export type SceneKey =
  | "hero" | "people" | "grid" | "capitol" | "construction" | "dusk" | "network" | "drone"
  | "interchange" | "rural" | "crossing" | "airport" | "rail" | "harbor" | "street" | "site"
  | "office" | "map" | "rise" | "sky" | "globe";

/* ── Services: five headings ─────────────────────────────────── */
export type Service = { id: string; slug: string; name: string; scene?: SceneKey };
export type Area = {
  id: string; slug: string; name: string; tag: string; scene: SceneKey;
  services: Service[]; featuredCase?: string;
};

const svc = (id: string, name: string, scene?: SceneKey): Service => ({ id, slug: slugify(name), name, scene });

export const AREAS: Area[] = [
  {
    id: "strategy", slug: "strategy-organization", name: "Strategy & Organization",
    tag: "Direction, structure, and people", scene: "capitol", featuredCase: "cs-strategic",
    services: [
      svc("strategic-planning", "Strategic Planning & Performance Management", "grid"),
      svc("org-design", "Organizational Design & Process Improvement"),
      svc("change-mgmt", "Change Management", "people"),
      svc("workforce", "Workforce & Leadership Development", "site"),
      svc("exec-advisory", "Executive & Administrative Advisory"),
    ],
  },
  {
    id: "delivery", slug: "project-delivery", name: "Project Delivery",
    tag: "Getting programs and projects built", scene: "construction", featuredCase: "cs-transform",
    services: [
      svc("program-delivery", "Program & Project Delivery", "interchange"),
      svc("owners-rep", "Owner's Representation", "site"),
      svc("alt-delivery", "Alternative Delivery & Partnering", "site"),
      svc("procurement", "Finance, Budget & Procurement", "office"),
      svc("row", "Right of Way", "rural"),
      svc("construction", "Construction & Pre-Construction"),
      svc("lpa", "Local Public Agency & Federal-Aid Programs", "street"),
      svc("grants", "Grants & Funding", "crossing"),
    ],
  },
  {
    id: "om", slug: "operations-maintenance", name: "Operations & Maintenance",
    tag: "Keeping infrastructure safe, reliable, and affordable", scene: "dusk", featuredCase: "cs-mi-pbo",
    services: [
      svc("asset-mgmt", "Asset Management", "crossing"),
      svc("operations", "Maintenance & Operations"),
      svc("traffic", "Traffic Operations & Safety", "interchange"),
    ],
  },
  {
    id: "tech", slug: "digital-solutions", name: "Digital Solutions",
    tag: "Websites, tools, workflows, data, AI, and training", scene: "network", featuredCase: "cs-pdn",
    services: [
      svc("portals", "Websites, Portals & Digital Tools", "office"),
      svc("automation", "Integration & Automation"), // v12 rename (was Automation & Integration)
      svc("data-governance", "Data Governance"),
      svc("ai", "AI", "sky"),
      svc("dashboards", "Dashboards & Reporting", "office"),
      svc("training-video", "Digital Training & Video", "site"),
      svc("tech-strategy", "Technology & AI Strategy", "grid"),
      svc("smart-mobility", "Smart Mobility & Connected Systems", "dusk"), // v12 new
    ],
  },
  {
    id: "aviation", slug: "drones-advanced-air-mobility", name: "Drones & Advanced Air Mobility",
    tag: "Programs, planning, response, and standards", scene: "drone", featuredCase: "cs-aero",
    services: [
      svc("drone-programs", "Drone Program Development & Sustainment"),
      svc("drone-aam", "Advanced Air Mobility Strategy & Readiness", "sky"),
      svc("drone-emergency", "Emergency Response with Drones"),
      svc("research", "Research & Standards", "crossing"),
      svc("aero-division", "Aeronautics Division & Program Setup", "airport"),
    ],
  },
];

export const areaHref = (a: Area) => `/services/${a.slug}`;
export const serviceById = (id: string) => {
  for (const a of AREAS) {
    const s = a.services.find((x) => x.id === id);
    if (s) return { area: a, service: s };
  }
  return null;
};
export const serviceHref = (id: string) => {
  const hit = serviceById(id);
  return hit ? `/services/${hit.area.slug}/${hit.service.slug}` : "/services";
};

/* ── Industries ──────────────────────────────────────────────── */
export type Subsector = { id: string; slug: string; name: string; line: string; scene: SceneKey; thin?: boolean };
export type Industry = {
  id: string; slug: string; name: string; who: string; lead: string; scene: SceneKey;
  subsectors: Subsector[]; featured: string[]; featuredCase?: string; hidden?: boolean;
};

const sub = (id: string, name: string, scene: SceneKey, line: string, thin = false): Subsector =>
  ({ id, slug: slugify(name), name, scene, line, thin });

export const INDUSTRIES: Industry[] = [
  {
    id: "transport", slug: "transportation", name: "Transportation", scene: "interchange",
    who: "Run by former DOT chief engineers, maintenance directors, and program leaders",
    lead: "State DOTs are where most of our people built their careers. They've run districts, divisions, and whole departments, and they bring that experience to agencies working through the same problems now.",
    featured: ["program-delivery", "row", "construction", "operations", "traffic", "asset-mgmt", "portals", "drone-programs"],
    featuredCase: "cs-major",
    subsectors: [
      sub("sub-highways", "Highways & Roads", "rural", "Most of our work is on highway systems: how they're planned, funded, delivered, maintained, and operated."),
      sub("sub-bridges", "Bridges & Structures", "crossing", "From billion-dollar river crossings to the inspections that keep bridges open."),
      sub("sub-aviation", "Aviation & Airports", "airport", "Drones and advanced air mobility are moving faster than the rules and the org charts. We help aeronautics divisions and DOTs run drone programs that are safe, compliant, and useful across the agency, and plan for what's next."),
      sub("sub-rail", "Rail & Transit", "rail", "Transit and rail agencies get the same delivery discipline and the same experienced people."),
      /* v12: back under Transportation. Only harbors work so far (port security
         grant packages; drone and uncrewed-vessel technology evaluation). */
      sub("sub-ports", "Ports & Harbors", "harbor", "Harbors run on security, funding, and new technology. Our work here so far: port security grant packages, and evaluations of drone and uncrewed-vessel technology.", true),
    ],
  },
  {
    id: "gov", slug: "government-public-works", name: "Government & Public Works", scene: "street",
    who: "Former city public works and federal program leaders",
    lead: "Cities, counties, regional planning organizations, and federal programs that own and run public infrastructure with lean staffs.",
    featured: ["asset-mgmt", "program-delivery", "lpa", "grants", "portals", "strategic-planning"],
    featuredCase: "cs-nyc-parks",
    subsectors: [
      sub("g-asset", "Asset Management for Local Agencies", "street", "Local agencies can use asset management to plan their programs, but each one starts from a different place. We meet them there."),
      sub("g-capital", "Capital Project Delivery & Permitting", "construction", "Cities carry big capital programs and land development permitting with small staffs. Faster delivery comes from clear roles, standard procedures, and a roadmap staff can follow.", true),
      sub("g-mpo", "Regional & Metropolitan Planning Support", "grid", "Regional planning organizations answer to federal performance and certification rules with lean staffs. We help them plan, program, and report with confidence.", true),
      sub("g-federal", "Federal & Multi-State Programs", "crossing", "Some problems are bigger than one state. We facilitate the multi-state research and standards that agencies end up writing into their own specifications."),
    ],
  },
  {
    id: "contractors", slug: "contractors-engineering-firms", name: "Contractors & Engineering Firms", scene: "site",
    who: "People who've sat on the owner's side of the table",
    lead: "Contractors and engineering firms working with public owners. We help both sides of the table work together, and help firms run their own operations better.",
    featured: ["alt-delivery", "owners-rep", "automation", "training-video"],
    featuredCase: "cs-major",
    subsectors: [],
  },
  {
    id: "private", slug: "private-sector", name: "Private Sector", scene: "office",
    who: "An in-house team that builds, not just advises",
    lead: "Firms of about 50 to 500 people that have outgrown spreadsheets but don't have a build team. We connect the systems you already pay for and automate the work around them.",
    featured: ["automation", "ai", "dashboards", "data-governance", "portals"],
    subsectors: [],
  },
  /* Built but hidden and noindex until Scott and Andy approve. Never linked. */
  {
    id: "intl", slug: "international", name: "International", scene: "globe", hidden: true,
    who: "", lead: "Our work to date is in the United States.", featured: [], subsectors: [],
  },
];

export const VISIBLE_INDUSTRIES = INDUSTRIES.filter((i) => !i.hidden);
export const industryHref = (i: Industry) => `/industries/${i.slug}`;
export const subsectorHref = (i: Industry, s: Subsector) => `/industries/${i.slug}/${s.slug}`;

/* ── "What are you trying to fix?" ───────────────────────────── */
export const PROBLEMS: { q: string; services: string[] }[] = [
  { q: "Our projects are late or over budget", services: ["program-delivery", "alt-delivery", "owners-rep"] },
  { q: "We're reorganizing or standing up something new", services: ["org-design", "change-mgmt"] },
  { q: "Our people are retiring and no one is ready", services: ["workforce", "training-video"] },
  { q: "We don't know what we own or what shape it's in", services: ["asset-mgmt", "data-governance"] },
  { q: "Maintenance costs keep climbing", services: ["operations", "asset-mgmt"] },
  { q: "Our systems don't talk to each other", services: ["automation", "portals"] },
  { q: "We want to use AI responsibly", services: ["ai", "tech-strategy"] },
  { q: "We want a drone program, or to plan for air taxis", services: ["drone-programs", "drone-aam"] },
  { q: "There's funding out there and no one to chase it", services: ["grants"] },
];

/* ── Home copy ───────────────────────────────────────────────── */
/* Headline: Nicole's pick, pending Ben and Scott (handoff section 9). */
export const HOME = {
  eyebrow: "For the organizations that build and run infrastructure",
  headline: "We help organizations plan, deliver, and adopt better ways of working, from strategy through operations and technology.",
  line: "We find what's broken, fix it, and stay until it runs.",
};

/* Numbers strip (v12). `verified: false` = dev-only placeholder; launch rule:
   leave the tile out rather than show an unverified number. */
export const NUMBERS: { value: string; count?: number; suffix?: string; label: string; verified: boolean }[] = [
  { value: "2017", label: "Established", verified: true },
  { value: "30+", count: 30, suffix: "+", label: "Former agency executives and engineers", verified: true },
  { value: "[N]", label: "States where we've worked", verified: false },
  { value: "30+", count: 30, suffix: "+", label: "Transportation agencies served", verified: true },
  { value: "[N]+", label: "Years of combined experience", verified: false },
];

export const WHY: [string, string][] = [
  ["We've done the job", "Our people ran the programs our clients run: chief engineers, maintenance directors, chief information officers, right of way managers, and federal program executives. We know the work from the inside, so we skip the learning curve."],
  ["Small enough to move fast", "Senior people do the work, with no layers between you and them. Decisions happen in days, not quarters."],
  ["Strategy and build under one roof", "The team that writes the plan works next to an in-house team that builds the tools: integrations, automation, dashboards, and AI. Nothing stalls waiting on another vendor."],
  ["We stay until it works", "We start with what you already have, and we stay through training and rollout. You own everything we build."],
  /* v12 fifth point; "making systems connect" thread */
  ["We make the systems you already own work together", "We connect the platforms, data, and tools you already pay for, and build small custom apps where an off-the-shelf integration doesn't fit."],
];

/* How we've grown (current site's Evolving Impact, kept) */
export const STORY: [string, string, string][] = [
  ["Foundation", "Deep transportation agency experience", "Our people built their careers inside public agencies. We know how projects, programs, budgets, and decisions actually work there."],
  ["Evolution", "Advisory for any organization", "We help organizations modernize processes, develop their people, and adopt new technology, and we keep long-term relationships with our clients."],
  ["Innovation", "Drones and advanced air mobility", "We plan, implement, and integrate drones and advanced air mobility into existing transportation networks."],
  ["Frontier", "Data, automation, and AI", "We help organizations govern their data, automate the busywork, and use AI, so people can focus on the work that needs them."],
];

export const STEPS: [string, string][] = [
  ["Assess", "We find what's working, what isn't, and why, with the people who do the work."],
  ["Rebuild", "We fix the structure, process, contract, or system that's holding things back."],
  ["Train", "We get your people ready to run it: manuals, courses, and hands-on support."],
  ["Hand off", "We stay until it runs on its own, and you own everything we built."],
];

/* Former roles (Who We Are leaders list; photos from the live roster) */
export const LEADERS: { name: string; role: string; photo: string }[] = [
  { name: "Scott Rawlins, P.E.", role: "Founder. Former Deputy Director and Chief Engineer, Nevada Department of Transportation", photo: "scott" },
  { name: "April Blackburn, PMP", role: "Former Chief Information Officer, Chief Technology Officer, and Interim Assistant Secretary of Finance and Administration, Florida Department of Transportation", photo: "april" },
  { name: "Dara Wheeler", role: "Former Chief Data and AI Officer and Chief Innovation Officer, California Department of Transportation", photo: "darawheeler" },
  { name: "Mayela Sosa", role: "Former Division Administrator, Federal Highway Administration Indiana and Hawaii Divisions", photo: "mayela" },
  { name: "Paul Steinman, P.E.", role: "Former Chief Operating Officer, Idaho Transportation Department", photo: "paulsteinman" },
  { name: "Rex Vines, P.E.", role: "Former Deputy Director and Chief Engineer of Operations, Arkansas Department of Transportation", photo: "rex" },
  { name: "Paul Schneider, P.E.", role: "Former member, Federal Highway Administration California Division executive leadership team", photo: "paulschneider" },
  { name: "Joey Paskey, P.E., PTOE", role: "Former Director of Public Works, City of Las Vegas", photo: "joey" },
  { name: "Lance Grace", role: "Former Director, Office of Maintenance, Florida Department of Transportation", photo: "lance" },
  { name: "Mark Geib, P.E.", role: "Former operations division administrator, Michigan Department of Transportation", photo: "mark" },
  { name: "Ben Rawlins, P.E.", role: "Chief AI Strategy Officer. Leads the automation and AI team", photo: "ben" },
];

/* ── Case studies (index data for the map, menu and "In the works") ──
   needsSignoff: newly named clients (TX, AR, FL, IL, Alaska-led pooled fund,
   HI, TN technology). In production they show only the generic descriptor
   and are never placed on the map. visibility: public | generic | internal. */
export type CaseIndex = {
  id: string; slug: string; title: string; who: string; generic: string;
  states: string[]; status: "Ongoing" | "Completed"; industry: string; services: string[];
  needsSignoff?: boolean; visibility: "public" | "generic" | "internal";
};

const cs = (
  id: string, slug: string, title: string, who: string, states: string[], status: "Ongoing" | "Completed",
  industry: string, services: string[], generic = "", needsSignoff = false,
): CaseIndex => ({
  id, slug, title, status, industry, services, needsSignoff,
  /* production builds never carry an uncleared client's name or state */
  who: PROD_BUILD && needsSignoff ? (generic || who) : who,
  states: PROD_BUILD && needsSignoff ? [] : states,
  generic: generic || who, visibility: needsSignoff ? "generic" : "public",
});

export const CASES: CaseIndex[] = [
  cs("cs-proficiency", "tennessee-career-paths-and-proficiency", "Career paths and proficiency programs across a department", "Tennessee Department of Transportation", ["Tennessee"], "Ongoing", "transport", ["workforce", "org-design", "change-mgmt"]),
  cs("cs-tn-ipd", "tennessee-integrated-program-delivery", "Integrated program delivery", "Tennessee Department of Transportation", ["Tennessee"], "Completed", "transport", ["program-delivery"]),
  cs("cs-pbmc", "tennessee-performance-based-maintenance-contracts", "Launching performance-based maintenance contracts on an interstate network", "Tennessee Department of Transportation", ["Tennessee"], "Completed", "transport", ["operations", "procurement"]),
  cs("cs-aero", "tennessee-aviation-program", "Statewide aviation program support: drones, advanced air mobility, and federal funding", "Tennessee Department of Transportation, Aeronautics Division", ["Tennessee"], "Ongoing", "transport", ["drone-programs", "grants", "research", "drone-aam"]),
  cs("cs-transform", "louisiana-statewide-transformation", "Statewide transformation: project delivery, prioritization, and organization", "Louisiana Department of Transportation and Development", ["Louisiana"], "Ongoing", "transport", ["program-delivery", "org-design", "change-mgmt", "strategic-planning", "automation", "data-governance"]),
  cs("cs-pmdiv", "standing-up-a-project-delivery-division", "Standing up a project delivery division", "Arkansas Department of Transportation", ["Arkansas"], "Ongoing", "transport", ["org-design", "change-mgmt", "workforce", "program-delivery"], "A Mid-South state DOT", true),
  cs("cs-txmaint", "performance-based-maintenance-and-rating-program", "Performance-based maintenance contracts and a maintenance rating program", "Texas Department of Transportation", ["Texas"], "Completed", "transport", ["operations", "procurement", "asset-mgmt"], "A Gulf South state DOT", true),
  cs("cs-drt", "statewide-drone-response-team", "Statewide drone response team and drone program governance", "Florida Department of Transportation", ["Florida"], "Ongoing", "transport", ["drone-programs", "drone-emergency"], "A Southeast state DOT", true),
  cs("cs-local-am", "michigan-local-asset-management", "Asset management workshops and action plans for local agencies", "State of Michigan, Michigan Infrastructure Office", ["Michigan"], "Completed", "gov", ["asset-mgmt", "workforce"]),
  cs("cs-mi-pbo", "michigan-performance-based-maintenance-operations", "Performance-based maintenance and operations", "Michigan Department of Transportation", ["Michigan"], "Completed", "transport", ["operations", "asset-mgmt"]),
  cs("cs-workforce", "north-carolina-workforce-strategy", "Workforce strategy analysis", "North Carolina Department of Transportation", ["North Carolina"], "Completed", "transport", ["workforce", "org-design"]),
  cs("cs-nc-ipd", "north-carolina-integrated-program-delivery", "Integrated program delivery and asset management", "North Carolina Department of Transportation", ["North Carolina"], "Completed", "transport", ["program-delivery", "asset-mgmt", "grants"]),
  cs("cs-strategic", "nevada-six-year-strategic-plan", "Six-year strategic plan, action plans, and performance management", "Nevada Department of Transportation", ["Nevada"], "Ongoing", "transport", ["strategic-planning", "org-design", "dashboards"]),
  cs("cs-nv-om", "nevada-operations-maintenance-review", "Operations and maintenance program review and fleet optimization", "Nevada Department of Transportation", ["Nevada"], "Completed", "transport", ["operations", "asset-mgmt"]),
  cs("cs-aerodiv", "nevada-aeronautics-division-research", "Research on establishing a state aeronautics division and sustainable funding", "Nevada Department of Transportation", ["Nevada"], "Ongoing", "transport", ["research", "aero-division"]),
  cs("cs-de-tech", "delaware-technology-strategic-plan", "Technology strategic plan", "Delaware Department of Transportation", ["Delaware"], "Completed", "transport", ["tech-strategy", "strategic-planning"]),
  cs("cs-ut-am", "utah-asset-management-review", "Asset management program review", "Utah Department of Transportation", ["Utah"], "Completed", "transport", ["asset-mgmt"]),
  cs("cs-va-maint", "virginia-performance-based-maintenance-review", "Review of performance-based highway maintenance contracts", "Virginia Department of Transportation", ["Virginia"], "Completed", "transport", ["operations", "procurement"]),
  cs("cs-maint-model", "six-state-maintenance-outsourcing-model", "Performance-based maintenance outsourcing model", "Departments of transportation in six states", [], "Completed", "transport", ["operations", "procurement"]),
  cs("cs-pa-budget", "pennsylvania-maintenance-budgeting", "Maintenance budgeting", "Pennsylvania", ["Pennsylvania"], "Completed", "transport", ["procurement", "operations"]),
  cs("cs-nyc-parks", "new-york-city-parks-asset-management", "Asset management for 29,000 acres of parkland", "New York City Parks and Recreation", ["New York"], "Completed", "gov", ["asset-mgmt"]),
  cs("cs-riverside", "riverside-county-fleet-and-facilities", "Facilities and fleet operations review", "Riverside County, California", ["California"], "Completed", "gov", ["operations", "asset-mgmt"]),
  cs("cs-major", "major-river-crossings-and-transit", "Major river crossings and transit: coordination, risk, and partnering", "Iowa, Illinois, Missouri, and Minnesota", ["Iowa", "Illinois", "Missouri", "Minnesota"], "Completed", "transport", ["program-delivery", "owners-rep", "alt-delivery"]),
  cs("cs-partnering", "progressive-design-build-partnering", "Partnering facilitation for a progressive design-build bridge", "Illinois · contractor and state transportation department", ["Illinois"], "Ongoing", "transport", ["program-delivery", "procurement", "alt-delivery"], "A Midwest state DOT and its contractor", true),
  cs("cs-pooled", "multi-state-drone-standards", "Multi-state drone standards and specifications", "Pooled fund study led by Alaska", ["Alaska"], "Ongoing", "gov", ["research", "drone-programs"], "A multi-state pooled fund study", true),
  cs("cs-pdn", "louisiana-project-delivery-website", "A project delivery website, tools, and change system staff use every day", "Louisiana Department of Transportation and Development", ["Louisiana"], "Ongoing", "transport", ["portals", "automation", "training-video", "program-delivery"]),
  cs("cs-tn-tech", "technology-modernization-and-ai-governance", "Technology modernization and AI governance", "Tennessee Department of Transportation", ["Tennessee"], "Ongoing", "transport", ["tech-strategy", "data-governance", "ai"], "A Southeast state DOT", true),
  cs("cs-hi", "construction-standards-and-statewide-support", "Construction standards, program knowledge, and statewide support", "Hawaii Department of Transportation", ["Hawaii"], "Ongoing", "transport", ["construction", "portals", "program-delivery", "training-video", "drone-programs"], "A Pacific state DOT", true),
];

export const caseHref = (c: CaseIndex) => `/insights/case-studies/${c.slug}`;
export const caseById = (id: string) => CASES.find((c) => c.id === id);
/* What a visitor sees as the client line (production hides uncleared names). */
export const caseWho = (c: CaseIndex, prod: boolean) => (prod && c.needsSignoff ? c.generic : c.who);

/* ── Menu tree (stacked, nested) ─────────────────────────────── */
export type MenuNode = {
  id: string; label: string; href: string; scene: SceneKey; note?: string; thin?: boolean;
  groups?: { title?: string; items: MenuNode[] }[];
  feature?: { kind: "case"; id: string } | { kind: "picker" } | { kind: "link"; title: string; text: string; href: string; cta: string };
};

const leaf = (id: string, label: string, href: string, scene: SceneKey, thin?: boolean): MenuNode => ({ id, label, href, scene, thin });

export const MENU: MenuNode[] = [
  {
    id: "what", label: "What we do", href: "/services", scene: "capitol", feature: { kind: "picker" },
    groups: [{
      items: AREAS.map((a) => ({
        id: a.id, label: a.name, href: areaHref(a), scene: a.scene, note: a.tag,
        feature: a.featuredCase ? { kind: "case" as const, id: a.featuredCase } : undefined,
        groups: [{ title: a.name, items: a.services.map((s) => leaf(s.id, s.name, `/services/${a.slug}/${s.slug}`, s.scene ?? a.scene)) }],
      })),
    }],
  },
  {
    id: "who", label: "Who we work with", href: "/industries", scene: "interchange",
    feature: { kind: "case", id: "cs-major" },
    groups: [{
      items: VISIBLE_INDUSTRIES.map((i) => ({
        id: i.id, label: i.name, href: industryHref(i), scene: i.scene, note: i.who,
        feature: i.featuredCase
          ? { kind: "case" as const, id: i.featuredCase }
          : { kind: "link" as const, title: "Applied solutions", text: "Seven examples of connected systems and automated workflows we've built for growing firms.", href: serviceHref("automation"), cta: "See the examples" },
        groups: [
          ...(i.subsectors.length ? [{ title: "Sub-sectors", items: i.subsectors.map((s) => leaf(s.id, s.name, subsectorHref(i, s), s.scene, s.thin)) }] : []),
          { title: "Featured services", items: i.featured.map((id) => {
            const hit = serviceById(id)!;
            return leaf(`${i.id}-${id}`, hit.service.name, serviceHref(id), hit.service.scene ?? hit.area.scene);
          }) },
        ],
      })),
    }],
  },
  {
    id: "work", label: "Our work", href: "/insights/case-studies", scene: "map",
    feature: { kind: "case", id: "cs-transform" },
    groups: [{
      items: [
        {
          id: "cases", label: "Case studies", href: "/insights/case-studies", scene: "map",
          groups: [
            { title: "By service area", items: AREAS.map((a) => leaf(`cs-a-${a.id}`, a.name, `/insights/case-studies?area=${a.slug}`, a.scene)) },
            { title: "By industry", items: VISIBLE_INDUSTRIES.map((i) => leaf(`cs-i-${i.id}`, i.name, `/insights/case-studies?industry=${i.slug}`, i.scene)) },
            { title: "By state", items: Array.from(new Set(CASES.filter((c) => !c.needsSignoff).flatMap((c) => c.states))).sort().map((s) => leaf(`cs-s-${slugify(s)}`, s, `/insights/case-studies?state=${slugify(s)}`, "map")) },
          ],
        },
        leaf("in-the-works", "In the works", "/insights/case-studies?status=ongoing", "construction"),
        leaf("where", "Where we work", "/about/where-we-work", "globe"),
      ],
    }],
  },
  {
    id: "insights", label: "Insights", href: "/insights", scene: "network",
    feature: { kind: "link", title: "Minimizing data governance fatigue", text: "April Blackburn, former Florida DOT Chief Information Officer, on keeping data governance useful.", href: "/insights/thought-leadership/minimizing-data-governance-fatigue", cta: "Read the Q&A" },
    groups: [{
      items: [
        leaf("news", "News & Recognition", "/insights/news", "people"),
        leaf("thought", "Thought Leadership", "/insights/thought-leadership", "network"),
        leaf("research", "Research & Publications", "/insights/research", "crossing"),
        leaf("podcast", "Podcast", "/insights/podcast", "office"),
      ],
    }],
  },
  {
    id: "about", label: "About", href: "/about", scene: "hero",
    feature: { kind: "link", title: "Our people", text: "More than 30 former agency executives and engineers, working next to the team that builds the tools.", href: "/about/our-people", cta: "Meet the team" },
    groups: [{
      items: [
        leaf("who-we-are", "Who we are", "/about/who-we-are", "hero"),
        leaf("how-we-work", "How we work", "/about/how-we-work", "construction"),
        leaf("our-people", "Our people", "/about/our-people", "people"),
        leaf("careers", "Careers", "/careers", "rise"),
      ],
    }],
  },
];

/* Search index for the menu (services, industries, case studies; people are
   added from lib/team-data.ts by the menu). */
export type SearchHit = { label: string; kind: string; href: string };
export const SITE_INDEX: SearchHit[] = [
  ...AREAS.map((a) => ({ label: a.name, kind: "Service area", href: areaHref(a) })),
  ...AREAS.flatMap((a) => a.services.map((s) => ({ label: s.name, kind: a.name, href: `/services/${a.slug}/${s.slug}` }))),
  ...VISIBLE_INDUSTRIES.map((i) => ({ label: i.name, kind: "Industry", href: industryHref(i) })),
  ...VISIBLE_INDUSTRIES.flatMap((i) => i.subsectors.map((s) => ({ label: s.name, kind: i.name, href: subsectorHref(i, s) }))),
  { label: "News & Recognition", kind: "Insights", href: "/insights/news" },
  { label: "Thought Leadership", kind: "Insights", href: "/insights/thought-leadership" },
  { label: "Research & Publications", kind: "Insights", href: "/insights/research" },
  { label: "Podcast: The Rawlins Way", kind: "Insights", href: "/insights/podcast" },
  { label: "Careers", kind: "About", href: "/careers" },
  { label: "Where we work", kind: "About", href: "/about/where-we-work" },
];
