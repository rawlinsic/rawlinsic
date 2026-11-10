/* Rawlins redesign: one content layer for the menu, the home journey and
   (next) every page. Names, copy and case studies change here only.
   Source: wireframe v11 data (final state) + handoff v7 section 4 (v12).
   Source notes stay in comments, never on the page. */

/* ── Environment ─────────────────────────────────────────────── */
/* Dev-only blocks (Placeholder notes) render everywhere except the
   production deployment. Read on the server (VERCEL_ENV) and passed down, so
   a missing public env var can never leak them to production. */
export const isProductionEnv = () => process.env.VERCEL_ENV === "production";

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
      /* v8: renamed and listed first (handoff v8, section 6, default) */
      svc("exec-advisory", "Executive Advisory"),
      svc("strategic-planning", "Strategic Planning & Performance Management", "grid"),
      svc("org-design", "Organizational Design & Process Improvement"),
      svc("change-mgmt", "Change Management", "people"),
      svc("workforce", "Workforce & Leadership Development", "site"),
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
    tag: "Keeping what you own safe, working, and affordable", scene: "dusk", featuredCase: "cs-pbmc",
    services: [
      svc("asset-mgmt", "Asset Management", "crossing"),
      svc("operations", "Maintenance & Operations"),
      svc("traffic", "Traffic Operations & Safety", "interchange"),
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
/* who: one plain line about who the industry covers (menu, overview cards).
   projects: its Featured projects, in order (the Who we work with menu). */
export type Industry = {
  id: string; slug: string; name: string; who: string; lead: string; scene: SceneKey;
  subsectors: Subsector[]; featured: string[]; featuredCase?: string; hidden?: boolean; projects: string[];
};

const sub = (id: string, name: string, scene: SceneKey, line: string, thin = false): Subsector =>
  ({ id, slug: slugify(name), name, scene, line, thin });

export const INDUSTRIES: Industry[] = [
  {
    id: "transport", slug: "transportation", name: "Transportation", scene: "interchange",
    who: "State DOTs, aeronautics divisions, harbors, and transit",
    lead: "Most of our work is with state departments of transportation: more than 30 transportation agencies so far. We work across highways, bridges, aviation, harbors, and transit, from how a department is organized to how its projects get delivered and its roads get maintained.",
    featured: ["program-delivery", "row", "construction", "operations", "traffic", "asset-mgmt", "portals", "drone-programs"],
    featuredCase: "cs-major",
    projects: ["cs-transform", "cs-proficiency", "cs-aero"],
    subsectors: [
      sub("sub-highways", "Highways & Roads", "rural", "Most of our work is on highway systems: how they're planned, funded, delivered, maintained, and operated."),
      sub("sub-bridges", "Bridges & Structures", "crossing", "From partnering on billion-dollar river crossings to bridge inspector proficiency programs and drone inspection standards."),
      sub("sub-aviation", "Aviation & Airports", "airport", "State aeronautics divisions, airports, and the drone and advanced air mobility programs growing around them. We help small aviation staffs run programs, plan for what's next, and compete for federal funding."),
      sub("sub-rail", "Rail & Transit", "rail", "Our transit work so far is partnering facilitation on a $2 billion light rail line. Our team also includes the California Department of Transportation's former Chief of Rail and Mass Transportation."),
      /* v12: back under Transportation. Only harbors work so far (port security
         grant applications; one drone and uncrewed-vessel technology evaluation). */
      sub("sub-ports", "Ports & Harbors", "harbor", "Harbors run on security, funding, and new technology. Our work here so far: port security grant applications, and an evaluation of drone and uncrewed-vessel technology.", true),
    ],
  },
  {
    id: "gov", slug: "government-public-works", name: "Government & Public Works", scene: "street",
    who: "Local agencies and multi-state programs",
    lead: "Local governments and federal and multi-state programs that own and run public infrastructure, often with lean staffs. Our work here includes asset management with local agencies and drone standards for a multi-state research program.",
    featured: ["asset-mgmt", "program-delivery", "lpa", "grants", "portals", "strategic-planning"],
    featuredCase: "cs-local-am",
    projects: ["cs-local-am", "cs-pooled"],
    subsectors: [
      sub("g-asset", "Asset Management for Local Agencies", "street", "Local agencies can use asset management to plan their programs, but each one starts from a different place. We meet them there."),
      sub("g-capital", "Capital Project Delivery & Permitting", "construction", "Cities carry big capital programs and land development permitting with small staffs. Clear roles, standard procedures, and a roadmap staff can follow keep projects and permits moving. Our team includes a former Director of Public Works for the City of Las Vegas.", true),
      sub("g-mpo", "Regional & Metropolitan Planning Support", "grid", "Metropolitan planning organizations answer to federal performance and certification rules with lean staffs. Our team includes former Federal Highway Administration executives who worked with them, including all eighteen in California.", true),
      sub("g-federal", "Federal & Multi-State Programs", "crossing", "Some problems are bigger than one state. We facilitate a multi-state research program building a shared drone data standard and recommended practices agencies can adopt."),
    ],
  },
  {
    id: "contractors", slug: "contractors-engineering-firms", name: "Contractors & Engineering Firms", scene: "site",
    who: "Partnering, contracting models, and teaming on public work",
    lead: "Contractors and engineering firms working with public owners. We help both sides of the table work together, through partnering on major projects and contracting models that work for owners and industry. Engineering firms also bring us onto their teams for state DOT work: program delivery, organization and workforce, technology, aviation, and drone programs.",
    featured: ["alt-delivery", "owners-rep", "automation", "training-video"],
    featuredCase: "cs-major",
    projects: ["cs-major", "cs-db-partnering", "cs-ia-partnering", "cs-maint-model"],
    subsectors: [],
  },
  {
    id: "private", slug: "private-sector", name: "Private Sector", scene: "office",
    who: "Growing firms that have outgrown their spreadsheets",
    lead: "Firms that have outgrown spreadsheets but don't have a build team. We connect the systems you already pay for and automate the work around them.",
    featured: ["automation", "ai", "dashboards", "data-governance", "portals"],
    projects: ["cs-pv-pmo", "cs-pv-capacity", "cs-pv-reporting", "cs-pv-service"],
    subsectors: [],
  },
  /* Built but hidden and noindex until Scott and Andy approve. Never linked. */
  {
    id: "intl", slug: "international", name: "International", scene: "globe", hidden: true,
    who: "", lead: "Our work to date is in the United States.", featured: [], subsectors: [], projects: [],
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
  { q: "We want a drone program, or to plan for advanced air mobility", services: ["drone-programs", "drone-aam"] },
  { q: "There's grant money out there. Nobody has time to chase it", services: ["grants"] },
  /* so contractors and private firms see themselves (content updates v4, 7.8) */
  { q: "We're starting our first design-build project with a public owner", services: ["alt-delivery", "owners-rep"] },
  { q: "We've outgrown our spreadsheets", services: ["automation", "dashboards"] },
];

/* ── Home copy ───────────────────────────────────────────────── */
/* Headline: Nicole's pick, pending Ben and Scott (handoff section 9). */
export const HOME = {
  eyebrow: "Trusted Advisors • Proven Execution",
  headline: "We help organizations plan, deliver, and adopt better ways of working — from strategy through operations and technology.",
  line: "We find what's broken, fix it, and stay until it runs.",
};

/* Numbers strip (v12). `verified: false` = dev-only placeholder; launch rule:
   leave the tile out rather than show an unverified number. */
export const NUMBERS: { value: string; count?: number; suffix?: string; label: string; verified: boolean }[] = [
  { value: "2017", label: "Established", verified: true },
  /* 27 verified (content updates v4, section 5) */
  { value: "25+", count: 25, suffix: "+", label: "People on our team who came from public agencies", verified: true },
  /* "[N] States where we've worked" left out: the map shows the states (2.4) */
  /* 31 verified: 19 agencies directly or through a prime, plus 12 through the drone standards pooled fund */
  { value: "30+", count: 30, suffix: "+", label: "Transportation agencies served", verified: true },
  { value: "[N]+", label: "Years of combined experience", verified: false },
];

/* Why Rawlins (full site pass, Part 5, 1.3): five reasons, in display order.
   Home shows them as tabs, each with its own proof; Who we are numbers them. */
export const WHY: [string, string][] = [
  ["We've done the job", "Our people ran the programs our clients run: chief engineers, operations and maintenance leaders, technology and data chiefs, a right of way manager, a city public works director, and federal highway executives. They know how budgets, decisions, and projects move inside an agency, so what we recommend fits how your agency works."],
  ["Senior people do the work", "The senior people you meet are the people who do the work. Several clients treat our team as part of their own staff, and have kept working with us for years."],
  ["Strategy and build under one roof", "Former agency leaders work alongside our in-house automation and AI team, so the plan and the tools it calls for come from one firm: websites, workflows, dashboards, and training."],
  ["We build on what you already own", "We use the systems and licenses you already own, connect them, and build new only when nothing you have can do the job. Every build is documented and handed over, so you own the result."],
  ["We stay until it runs", "Recommendations are where we start. We write the manuals and procedures, build the tools, train your people, and stay until your team runs it on its own."],
];

/* How we've grown (content updates v4, 7.6). Also shows on Who we are. */
export const STORY: [string, string, string][] = [
  ["Where we started", "Agency experience", "Our founder spent 17 years at the Nevada Department of Transportation, including as Deputy Director and Chief Engineer, and started Rawlins in 2017 to bring that experience to other agencies."],
  ["Advisory", "Strategy, delivery, and people", "We help organizations set direction, deliver their programs, and develop their people. Several clients have kept working with us for years."],
  ["Drones", "Drones and advanced air mobility", "We help agencies run drone programs, write shared drone standards, and plan for advanced air mobility."],
  ["Digital", "Data, automation, and AI", "Our in-house team connects the systems clients already own, automates the busywork, and puts AI to work where it helps."],
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
  { name: "Paul Steinman, P.E.", role: "Former Chief Operating Officer, Idaho Transportation Department, and District Secretary, Florida DOT", photo: "paulsteinman" },
  { name: "Rex Vines, P.E.", role: "Former Deputy Director and Chief Engineer of Operations, Arkansas Department of Transportation", photo: "rex" },
  { name: "Paul Schneider, P.E.", role: "Former member, Federal Highway Administration California Division executive leadership team", photo: "paulschneider" },
  { name: "Joey Paskey, P.E., PTOE", role: "Former Director of Public Works, City of Las Vegas", photo: "joey" },
  { name: "Lance Grace", role: "Former Director, Office of Maintenance, Florida Department of Transportation", photo: "lance" },
  { name: "Mark Geib, P.E.", role: "Former Transportation Systems Management and Operations Division Administrator, Michigan Department of Transportation", photo: "mark" },
  { name: "Ben Rawlins, P.E.", role: "Chief AI Strategy Officer. Leads the automation and AI team", photo: "ben" },
];

/* ── Case studies (index data for the map, menu and "In the works") ──
   Unnamed clients (content updates v4, section 1): the client line is "A state
   DOT" (or as listed), with no state tags, and the case shows everywhere like
   any other. "Before Rawlins": our founder's work, or our team's work before
   they joined; tagged, never featured on home or as an area's featured case. */
export type CaseStatus = "Ongoing" | "Completed" | "Before Rawlins";
export type CaseIndex = {
  id: string; slug: string; title: string; who: string;
  states: string[]; status: CaseStatus; industry: string; services: string[];
};

const cs = (
  id: string, slug: string, title: string, who: string, states: string[], status: CaseStatus,
  industry: string, services: string[],
): CaseIndex => ({ id, slug, title, who, states, status, industry, services });

const STATE_DOT = "A state DOT";
const FOUNDER = " · Our founder's work before Rawlins";
const TEAM = " · Our team's work before Rawlins";

export const CASES: CaseIndex[] = [
  cs("cs-proficiency", "tennessee-career-paths-and-proficiency", "Career paths and proficiency programs across a department", "Tennessee Department of Transportation", ["Tennessee"], "Ongoing", "transport", ["workforce", "org-design", "change-mgmt"]),
  cs("cs-tn-ipd", "tennessee-integrated-program-delivery", "Integrated program delivery", "Tennessee Department of Transportation", ["Tennessee"], "Completed", "transport", ["program-delivery"]),
  cs("cs-pbmc", "tennessee-performance-based-maintenance-contracts", "Launching performance-based maintenance contracts on an interstate network", "Tennessee Department of Transportation", ["Tennessee"], "Completed", "transport", ["operations", "procurement"]),
  cs("cs-aero", "tennessee-aviation-program", "Statewide aviation program support: drones, advanced air mobility, and federal funding", "Tennessee Department of Transportation, Aeronautics Division", ["Tennessee"], "Ongoing", "transport", ["drone-programs", "grants", "research", "drone-aam"]),
  cs("cs-transform", "statewide-project-delivery-and-organization", "Statewide project delivery, prioritization, and organization", STATE_DOT, [], "Ongoing", "transport", ["program-delivery", "org-design", "change-mgmt", "strategic-planning", "automation", "data-governance"]),
  cs("cs-pmdiv", "standing-up-a-project-delivery-division", "Standing up a project delivery division", STATE_DOT, [], "Ongoing", "transport", ["org-design", "change-mgmt", "workforce", "program-delivery"]),
  cs("cs-txmaint", "performance-based-maintenance-and-rating-program", "Performance-based maintenance contracts and a maintenance rating program", STATE_DOT, [], "Completed", "transport", ["operations", "procurement", "asset-mgmt"]),
  cs("cs-drt", "statewide-drone-response-team", "Statewide drone response team and drone program governance", STATE_DOT, [], "Ongoing", "transport", ["drone-programs", "drone-emergency"]),
  cs("cs-local-am", "michigan-local-asset-management", "Asset management workshops and action plans for local agencies", "State of Michigan, Michigan Infrastructure Office", ["Michigan"], "Completed", "gov", ["asset-mgmt", "workforce"]),
  cs("cs-mi-pbo", "michigan-performance-based-maintenance-operations", "Performance-based maintenance and operations", "Michigan Department of Transportation · Our team's work before Rawlins, completed 2014", ["Michigan"], "Before Rawlins", "transport", ["operations", "asset-mgmt"]),
  cs("cs-workforce", "workforce-strategy-analysis", "Workforce strategy analysis", STATE_DOT, [], "Completed", "transport", ["workforce", "org-design"]),
  cs("cs-nc-ipd", "north-carolina-integrated-program-delivery", "Integrated program delivery", "North Carolina Department of Transportation", ["North Carolina"], "Completed", "transport", ["program-delivery", "grants", "operations", "alt-delivery"]),
  cs("cs-nc-am", "north-carolina-asset-management-review", "Asset management review across modes", `North Carolina Department of Transportation${FOUNDER}`, ["North Carolina"], "Before Rawlins", "transport", ["asset-mgmt", "operations", "procurement"]),
  cs("cs-strategic", "nevada-six-year-strategic-plan", "Six-year strategic plan, action plans, and performance management", "Nevada Department of Transportation", ["Nevada"], "Ongoing", "transport", ["strategic-planning", "org-design", "dashboards"]),
  cs("cs-nv-om", "nevada-operations-maintenance-review", "Operations and maintenance program review", "Nevada Department of Transportation", ["Nevada"], "Completed", "transport", ["operations", "asset-mgmt"]),
  cs("cs-aerodiv", "nevada-aeronautics-division-research", "Research on establishing a state aeronautics division and sustainable funding", "Nevada Department of Transportation", ["Nevada"], "Ongoing", "transport", ["research", "aero-division"]),
  cs("cs-de-tech", "delaware-technology-strategic-plan", "Technology strategic plan", "Delaware Department of Transportation", ["Delaware"], "Completed", "transport", ["tech-strategy", "strategic-planning"]),
  cs("cs-ut-am", "utah-asset-management-review", "Asset management program review", `Utah Department of Transportation${FOUNDER}`, ["Utah"], "Before Rawlins", "transport", ["asset-mgmt"]),
  cs("cs-va-maint", "virginia-performance-based-maintenance-review", "Review of performance-based highway maintenance contracts", `Virginia Department of Transportation${FOUNDER}`, ["Virginia"], "Before Rawlins", "transport", ["operations", "procurement"]),
  cs("cs-maint-model", "six-state-maintenance-outsourcing-model", "A flexible maintenance contracting model for DOTs", "AMOTIA (Association for the Management and Operations of Transportation Infrastructure Assets)", [], "Completed", "contractors", ["operations", "procurement"]),
  cs("cs-pa-budget", "pennsylvania-maintenance-budgeting", "Maintenance budgeting", `Pennsylvania Department of Transportation${FOUNDER}`, ["Pennsylvania"], "Before Rawlins", "transport", ["procurement", "operations"]),
  cs("cs-nyc-parks", "new-york-city-parks-asset-management", "Asset management for 29,000 acres of parkland", `New York City Parks and Recreation${FOUNDER}`, ["New York"], "Before Rawlins", "gov", ["asset-mgmt"]),
  /* no state tag: California isn't on the map */
  cs("cs-riverside", "riverside-county-fleet-and-facilities", "Facilities and fleet operations review", `Riverside County, California${FOUNDER}`, [], "Before Rawlins", "gov", ["operations", "asset-mgmt"]),
  cs("cs-major", "major-river-crossings-and-transit", "Partnering on major river crossings and a light rail line", "Iowa, Illinois, Missouri, and Minnesota", ["Iowa", "Illinois", "Missouri", "Minnesota"], "Completed", "transport", ["program-delivery", "alt-delivery"]),
  cs("cs-partnering", "progressive-design-build-partnering", "Partnering facilitation for a progressive design-build bridge", "A state DOT and its contractor", [], "Ongoing", "transport", ["program-delivery", "procurement", "alt-delivery"]),
  cs("cs-ia-partnering", "statewide-partnering-between-a-dot-and-its-construction-industry", "Statewide partnering between a DOT and its construction industry", "A state DOT and its construction industry", [], "Completed", "transport", ["alt-delivery", "construction", "program-delivery"]),
  cs("cs-db-partnering", "partnering-through-construction-on-design-build-bridges-and-interstates", "Partnering through construction on design-build bridges and interstates", "State DOTs and their contractors", [], "Completed", "contractors", ["alt-delivery", "program-delivery", "construction"]),
  cs("cs-pooled", "multi-state-drone-standards", "Multi-state drone standards and specifications", "A multi-state pooled fund study", [], "Ongoing", "gov", ["research", "drone-programs"]),
  cs("cs-pdn", "project-delivery-website-and-change-system", "A project delivery website, tools, and change system staff use every day", STATE_DOT, [], "Ongoing", "transport", ["portals", "automation", "training-video", "program-delivery"]),
  cs("cs-tn-tech", "technology-modernization-and-ai-governance", "Technology modernization and AI governance", STATE_DOT, [], "Ongoing", "transport", ["tech-strategy", "data-governance", "ai"]),
  cs("cs-hi", "construction-standards-and-statewide-support", "Construction standards, program knowledge, and statewide support", STATE_DOT, [], "Ongoing", "transport", ["construction", "portals", "program-delivery", "training-video", "drone-programs"]),
  /* Private sector: our own project, then our automation team's work before Rawlins */
  cs("cs-pv-pmo", "project-management-system-for-an-engineering-firm", "A project management system for an engineering firm", "An engineering firm", [], "Ongoing", "private", ["automation", "dashboards", "data-governance"]),
  cs("cs-pv-reporting", "project-accounting-and-reporting-in-one-view", "Project accounting and reporting in one view", `A project-based technical services firm${TEAM}`, [], "Before Rawlins", "private", ["automation", "dashboards", "data-governance"]),
  cs("cs-pv-service", "project-history-that-follows-the-work-to-the-service-team", "Project history that follows the work to the service team", `An install, service, and maintenance firm${TEAM}`, [], "Before Rawlins", "private", ["automation"]),
  cs("cs-pv-field", "field-reports-the-office-can-find", "Field reports the office can find", `A field service and project delivery firm${TEAM}`, [], "Before Rawlins", "private", ["automation"]),
  cs("cs-pv-capacity", "capacity-planning-for-people-and-equipment", "Capacity planning for people and equipment", `A field services and drilling company${TEAM}`, [], "Before Rawlins", "private", ["automation", "dashboards"]),
];

export const caseHref = (c: CaseIndex) => `/insights/case-studies/${c.slug}`;
export const caseById = (id: string) => CASES.find((c) => c.id === id);
/* Rawlins' own work (not "Before Rawlins") */
export const isOurs = (c: CaseIndex) => c.status !== "Before Rawlins";
/* The tag a case card shows */
export const caseTag = (c: CaseIndex, done = "Completed") => (c.status === "Ongoing" ? "In the works" : c.status === "Before Rawlins" ? "Before Rawlins" : done);

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
          : { kind: "link" as const, title: "Applied solutions", text: "Featured projects for growing firms.", href: serviceHref("automation"), cta: "See the examples" },
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
          id: "cases", label: "Projects", href: "/insights/case-studies", scene: "map",
          groups: [
            { title: "By service area", items: AREAS.map((a) => leaf(`cs-a-${a.id}`, a.name, `/insights/case-studies?area=${a.slug}`, a.scene)) },
            { title: "By industry", items: VISIBLE_INDUSTRIES.map((i) => leaf(`cs-i-${i.id}`, i.name, `/insights/case-studies?industry=${i.slug}`, i.scene)) },
            { title: "By state", items: Array.from(new Set(CASES.flatMap((c) => c.states))).sort().map((s) => leaf(`cs-s-${slugify(s)}`, s, `/insights/case-studies?state=${slugify(s)}`, "map")) },
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
    feature: { kind: "link", title: "Our people", text: "More than 25 people from public agencies, working next to the team that builds the tools.", href: "/about/our-people", cta: "Meet the team" },
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
