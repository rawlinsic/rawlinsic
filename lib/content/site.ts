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
    tag: "Direction, structure, & people", scene: "capitol", featuredCase: "cs-strategic",
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
    id: "delivery", slug: "project-delivery", name: "Program &Project Delivery",
    tag: "Getting programs & projects built", scene: "construction", featuredCase: "cs-transform",
    services: [
      /* content pass v7, 2.1 (Nov 11): Construction & Pre-Construction split in two; Program & Project Delivery renamed.
         The old addresses redirect (next.config.js). */
      svc("program-delivery", "Program Development", "interchange"),
      svc("preconstruction", "Preconstruction"),
      svc("construction", "Construction"),
      svc("alt-delivery", "Alternative Delivery & Partnering", "site"),
      svc("row", "Right of Way - remove part of precons. all tech specialty areas on PDN - these need to be mentioned on preconstruction", "rural"),
      svc("procurement", "Finance, Budget & Procurement", "office"),
      svc("lpa", "Local Public Agency & Federal-Aid Programs", "street"),
      svc("grants", "Grants & Funding", "crossing"),
      svc("owners-rep", "Owner's Representation", "site"),
    ],
  },
  {
    id: "om", slug: "operations-maintenance", name: "Operations & Maintenance",
    tag: "Keeping what you own safe, working, & affordable", scene: "dusk", featuredCase: "cs-pbmc",
    services: [
      svc("asset-mgmt", "Asset Management", "crossing"),
      svc("operations", "Maintenance Programs"), // renamed Nov 11 (was Maintenance & Operations; old address redirects)
      svc("traffic", "Traffic Operations & Safety", "interchange"),
    ],
  },
  {
    id: "aviation", slug: "drones-advanced-air-mobility", name: "Drones & Advanced Air Mobility",
    tag: "Programs, planning, response, & standards", scene: "drone", featuredCase: "cs-aero",
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
    tag: "Websites, tools, workflows, data, AI, & training", scene: "network", featuredCase: "cs-pdn",
    services: [
      svc("portals", "Websites, Portals & Digital Tools", "office"),
      svc("automation", "Integration & Automation"), // v12 rename (was Automation & Integration)
      svc("data-governance", "Data Governance"),
      svc("ai", "AI", "sky"),
      svc("dashboards", "Dashboards & Reporting", "office"),
      svc("training-video", "Digital Training & Video", "site"),
      svc("tech-strategy", "Technology & AI Strategy", "grid"),
      svc("smart-mobility", "Smart Mobility & Connected Systems - remove", "dusk"), // v12 new
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
    id: "transport", slug: "transportation", name: "Transportation Sector", scene: "interchange",
    who: "State DOTs, Local Governments, Aeronautics Organizations", // Nicole's wording (preview edit, Nov 11); the Who we work with file's line for this field was skipped
    // 31 agencies: 19 directly or through a prime, 12 through the drone standards pooled fund (CONTENT FIXES v3, section 3).
    // Transit: one partnering project (2019). Harbors: one client. Named for what they are, with no count.
    lead: "Most of our work is with state departments of transportation, and we've served more than 30 transportation agencies so far. We help them organize the department, choose and deliver projects, maintain and operate what they own, and put drones and digital tools to work. Most of that work is on highways and bridges. We also support state aeronautics programs, and we've worked on a light rail line and with a state harbors program.",
    featured: ["program-delivery", "preconstruction", "row", "construction", "operations", "traffic", "asset-mgmt", "portals", "drone-programs"],
    featuredCase: "cs-major",
    projects: ["cs-transform", "cs-proficiency", "cs-aero"],
    subsectors: [
      sub("sub-highways", "Highways & Bridges", "rural", "Most of our work is on state highway systems: how projects are chosen, readied, built, and maintained."),
      // "billion-dollar river crossings" was wrong: only one of them cost over a billion
      sub("sub-bridges", "Bridges & Structures - remove", "crossing", "Partnering on major river crossings, proficiency programs that cover bridge inspection, and a multi-state standard for drone data on structures."),
      sub("sub-aviation", "Aviation & Airports", "airport", "State aeronautics divisions, airports, and the drone and advanced air mobility programs growing around them. We help small aviation staffs run programs, plan for what's next, and compete for federal funding."),
      // Nicole's wording (preview edit, Nov 11, 11:5x PM); the Who we work with file's line for this field was skipped
      sub("sub-rail", "Rail & Transit", "rail", "Our transit work includes partnering facilitation on a $2 billion light rail line. Our team also includes the California Department of Transportation's former Chief of Rail and Mass Transportation."),
      /* v12: back under Transportation. Only harbors work so far (port security
         grant applications; one drone and uncrewed-vessel technology evaluation). */
      sub("sub-ports", "Ports & Harbors", "harbor", "Our work here so far is with one state harbors program: federal port security grant applications, and an evaluation of drones and uncrewed vessels for harbor inspection.", true),
    ],
  },
  {
    id: "gov", slug: "government-public-works", name: "Other Government Services", scene: "street",
    who: "Non-Transportation Infrastructure Support", // Nicole's wording (preview edit, Nov 11); the Who we work with file's line for this field was skipped
    // cs-local-am (through a state infrastructure office) and cs-pooled are the two Rawlins projects here.
    // Capital delivery and regional planning rest on experience from earlier roles; the lead says what that experience is.
    lead: "Cities, counties, and regional agencies carry capital programs, permitting, and federal requirements with lean staffs. Our work here so far is asset management with local agencies, through a state infrastructure office, and a multi-state research program on drone data standards. For capital project delivery and regional planning, we bring experience from city public works and the Federal Highway Administration.",
    featured: ["asset-mgmt", "program-delivery", "lpa", "grants", "research", "portals", "strategic-planning"], // adds "research": one of this industry's two projects is the pooled fund
    featuredCase: "cs-local-am",
    projects: ["cs-local-am", "cs-pooled"],
    subsectors: [
      sub("g-asset", "Asset Management", "street", "Local agencies start from different places with asset management. We start from where each one is: a self-assessment, a workshop, and an action plan."),
      sub("g-capital", "Capital Project Delivery & Permitting", "construction", "Cities deliver capital projects and review land development permits with small staffs. Experience on our team includes directing public works for the City of Las Vegas.", true),
      sub("g-mpo", "Regional & Metropolitan Planning Support", "grid", "Metropolitan planning organizations answer to federal performance and certification rules with lean staffs. People on our team worked with them at the Federal Highway Administration, including all eighteen in California.", true),
      sub("g-federal", "Federal & Multi-State Programs", "crossing", "Some problems are bigger than one state. We facilitate a multi-state research program building a shared drone data standard and recommended practices agencies can adopt."),
    ],
  },
  {
    id: "contractors", slug: "contractors-engineering-firms", name: "Contractors", scene: "site",
    who: "Partnering & Contracting Methods", // Nicole's wording (preview edit, Nov 11); the Who we work with file's line for this field was skipped
    // Partnering: cs-major, cs-db-partnering, cs-ia-partnering, cs-partnering (Fiscal > Contracts and Templates > Partnering).
    // Contracting model: cs-maint-model. Teaming: subcontracts under engineering and advisory firms (findings_cases.md, G).
    // "aviation" dropped from the teaming list: our aviation contracts on record are direct, and the drone program work is the one through a prime.
    // "right of way" added: right of way support on an engineering firm's district contract (2026 progress reports).
    lead: "Contractors and engineering firms come to us for what we know about the owner's side of the table. We facilitate partnering between contractors and public owners on major projects, and we've helped the maintenance contracting industry shape a contracting model state DOTs can tailor. Engineering and advisory firms also bring us onto their teams for state DOT work: program delivery, organization and workforce, right of way, technology, and drone programs.",
    featured: ["alt-delivery", "construction", "operations", "automation", "dashboards"],
    // was ["alt-delivery", "owners-rep", "automation", "training-video"]. Construction and Maintenance Programs are where this page's projects sit
    // (cs-ia-partnering, cs-db-partnering, cs-maint-model); Dashboards goes with cs-pv-pmo. Owner's Representation is a service for owners, not
    // contractors, and no project here uses Digital Training & Video.
    featuredCase: "cs-major",
    projects: ["cs-major", "cs-db-partnering", "cs-ia-partnering", "cs-maint-model"],
    subsectors: [],
  },
  {
    id: "private", slug: "private-sector", name: "Private Sector", scene: "office",
    who: "Firms Who Have Outgrown Their Current Tools or Processes", // Nicole's wording (preview edit, Nov 11); the Who we work with file's line for this field was skipped
    // One Rawlins project on the page (cs-pv-pmo); the others are our automation team's work before Rawlins, and their cards say so
    // (four when the Who we work with file was written; six with live-site Examples 06 and 07 back, Nov 11).
    // Nicole's wording (preview edit, Nov 11, 11:5x PM); the Who we work with file's new lead for this field was skipped.
    lead: "Companies that have outgrown their spreadsheets or tools, but don't have a build team. We connect the systems you already pay for and automate the work around them.",
    featured: ["automation", "ai", "dashboards", "data-governance", "portals"],
    projects: ["cs-pv-pmo", "cs-pv-capacity", "cs-pv-reporting", "cs-pv-service"],
    subsectors: [],
  },
  /* Built but hidden and noindex unless approved. Never linked. */
  {
    id: "intl", slug: "international", name: "International Markets", scene: "globe", hidden: true,
    /* INTERNATIONAL PAGE (Nov 11, 2026). Hidden: noindex, never linked on the live site, listed on previews only. */
    who: "Ministries of transport, national roads and aviation authorities, and city agencies outside the United States",
    // U.S. only to date: every Rawlins client is in the U.S., including territories (Jacob's AERO portfolio, Nov 2026). Don't add an international project or client.
    lead: "While our project work to date has been in the United States, our experience helping public agencies plan, deliver, and run transportation systems is highly transferable. The core operational and infrastructure challenges we solve in the US closely mirror those faced by ministries of transport and national authorities around the world.", // Nicole's wording, Nov 11
    featured: ["strategic-planning", "org-design", "program-delivery", "asset-mgmt", "data-governance", "tech-strategy", "drone-aam", "smart-mobility"], subsectors: [], projects: [],
  },
];

export const VISIBLE_INDUSTRIES = INDUSTRIES.filter((i) => !i.hidden);

/* The International page's own sections (INTERNATIONAL PAGE, Nov 11, 2026). Rendered in components/v8/industry.tsx
   only for "intl". flag: a preview-only Content status note beside the line.
   "Why it carries over" (section and section-bar item) was deleted Nov 11: Nicole's lead on the page already says it. */
export const INTL: { abroad: { title: string; items: { t: string; flag?: string }[] }; region: { title: string; items: string[]; link: { href: string; label: string } } } = {
  abroad: {
    title: "How we work outside the U.S.",
    items: [
      // From the roster: Andy Palanisamy (Dubai); Samantha Lloyd, Kobus Pieters (Cape Town); Kiara Pienaar (Gauteng); Koussay Khelil (Ontario).
      { t: "Members of our team are based in the United Arab Emirates, Europe, South Africa, and Canada, alongside our people across the United States." },
      // Andy Palanisamy's bio: Head of Practice for Smart Cities and Innovation at Parsons in Dubai, before Rawlins.
      { t: "Experience on our team includes leading the smart cities and innovation practice for a global engineering firm in Dubai, with smart city and mobility projects across the Middle East and Africa." },
      { t: "Our in-house team builds the manuals, training, dashboards, and AI tools from wherever they are based, with time on site where the work needs it." },
      // the Rawlins Global line (our registered entity in the Middle East) was removed by Nicole, Nov 11
      // TODO(launch): Scott and Andy to confirm.
      { t: "Where a project needs in-country presence, we work with local partners.", flag: "Scott and Andy to confirm." },
    ],
  },
  region: {
    title: "Where you'll find us",
    // Andy's LinkedIn posts, Nov and Sep 2026. Same items as News & Recognition.
    // Nov 12: the page now shows these as event cards from lib/content/news.ts (EVENTS marked intl); this list is the record.
    items: [
      "Automechanika Dubai 2026, November: moderating and speaking on smart cities, regulation, and asset lifecycle management",
      "ConTech / MENA Construction Summit 2026, Dubai, November",
      "LEAP 2026, Riyadh: speaking on the future of urban identity",
    ],
    link: { href: "/insights/news", label: "See all news" },
  },
};
export const industryHref = (i: Industry) => `/industries/${i.slug}`;
export const subsectorHref = (i: Industry, s: Subsector) => `/industries/${i.slug}/${s.slug}`;

/* ── "What are you trying to fix?" ───────────────────────────── */
export const PROBLEMS: { q: string; services: string[] }[] = [
  { q: "Our projects are late or over budget", services: ["program-delivery", "preconstruction", "alt-delivery", "owners-rep"] },
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
/* The words beside the glass frame as the home hero zooms out (hero-story.tsx).
   Placeholders for Nicole to write (Edit text on the preview); each is its own
   wording so an edit changes only that one. 1st: frame on the right, words on
   the left; 2nd: the other way (Nicole, Nov 9: two sides). */
export const HOME_STORY: { k?: string; h: string; p: string; cta?: { label: string; href: string } }[] = [
  { k: "How we work", h: "We find what's broken, fix it, and stay until it runs.", p: "Like many organizations today, you're facing complex, interconnected challenges: technology-driven transformation, resource constraints, and shifting regulatory demands. That's where we come in. From strategy and proven frameworks to the systems and products that put them to work, we help you turn decisions into action.", cta: { label: "See what we do", href: "/services" } },
];

export const HOME = {
  eyebrow: "Trusted Advisors • Proven Execution",
  headline: "Pairing advisory services with digital solutions to solve complex challenges at the intersection of strategy, delivery, & operations",
  line: "We find what's broken, fix it, and stay until it runs.",
};

/* Numbers strip (v12). `verified: false` = dev-only placeholder; launch rule:
   leave the tile out rather than show an unverified number. */
export const NUMBERS: { value: string; count?: number; suffix?: string; label: string; verified: boolean }[] = [
  { value: "2017", label: "Established", verified: true },
  /* 27 verified (content updates v4, section 5) */
  { value: "25+", count: 25, suffix: "+", label: "People on our team came from public agencies", verified: true },
  /* "[N] States where we've worked" left out: the map shows the states (2.4) */
  /* 31 verified: 19 agencies directly or through a prime, plus 12 through the drone standards pooled fund */
  { value: "30+", count: 30, suffix: "+", label: "Transportation agencies served", verified: true },
  /* 850+: the years stated in 33 of the 50 team bios add up to about 880 (Nov 10). The other 17 bios state no
     years, so the real total is higher. Still marked unverified until Rawlins confirms it. */
  { value: "850+", count: 850, suffix: "+", label: "Years of combined experience", verified: false },
];

/* Why Rawlins (full site pass, Part 5, 1.3): five reasons, in display order.
   Home shows them as tabs, each with its own proof; Who we are numbers them. */
export const WHY: [string, string][] = [
  ["We've done the job", "Our people ran the programs our clients run: chief engineers, operations and maintenance leaders, technology and data chiefs, a right of way manager, a city public works director, and federal highway executives to name a few. They know how budgets, decisions, and projects move inside an agency, so what we recommend fits how your agency works."],
  ["Small enough to move fast", "We're a small and agile firm, and that works in your favor. There's no lengthy chain of approvals between you and the people doing the work. We get started quickly, adjust when things change, and get the job done."],
  ["Strategy and build under one roof", "Former agency leaders work alongside our in-house digital solutions team, so the plan and tools your project calls for come from one firm. Websites, workflows, dashboards, training, and more."],
  ["We build on systems you already own", "We use the systems and licenses you already own, and connect them. We can also build a custom solution if that's the right fit. Every build is documented and handed over, and you own the end result. We're also around to upkeep afterwards if desired."],
  ["We stay until it runs", "Recommendations are where we start. We write the manuals and procedures, build the tools, train your people, and stay until your team runs it on its own."],
];

/* How we've grown (content updates v4, 7.6). Also shows on Who we are. */
export const STORY: [string, string, string][] = [
  ["foundation", "Deep Transportation Agency Expertise", "Our founder, Scott Rawlins, spent 17 years at the Nevada Department of Transportation, including as Deputy Director and Chief Engineer, and started Rawlins in 2017 to bring that experience to other agencies. Our team has worked inside complex public agencies for years, so we know the constraints, the decision-making, and the culture it takes to get work done."],
  ["EVOLUTION", "Advisory Capabilities", "We partner with enterprises to modernize processes, empower team members, and embrace new technologies, coordinating these actions to achieve meaningful results. We pride ourselves on establishing long-term relationships with our family of clients."],
  ["innovation", "Drones and Advanced Air Mobility", "We guide the planning, implementation, and integration of advanced air mobility and uncrewed aircraft systems within existing transport networks, supporting the development of multimodal connected communities."],
  ["frontier", "Data Governance, Automation, & AI", "Our in-house team connects the systems clients already own, automates the busywork, and puts AI to work where it helps. We help agencies navigate governance structures, improve data practices, incorporate analytics, and use emerging tools. Our automation and integration specialists streamline workflows, enabling people to focus on the uniquely human work that matters most for organizational success."],
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
  cs("cs-proficiency", "tennessee-career-paths-and-proficiency", "Career paths and proficiency programs across a department", "Tennessee Department of Transportation", ["Tennessee"], "Ongoing", "transport", ["workforce", "org-design", "change-mgmt", "row", "traffic", "construction"]), // + right of way appraiser program, traffic design and construction proficiency (Nov 11)
  cs("cs-tn-ipd", "tennessee-integrated-program-delivery", "Integrated program delivery", "Tennessee Department of Transportation", ["Tennessee"], "Completed", "transport", ["program-delivery", "preconstruction"]),
  cs("cs-pbmc", "tennessee-performance-based-maintenance-contracts", "Launching performance-based maintenance contracts on an interstate network", "Tennessee Department of Transportation", ["Tennessee"], "Completed", "transport", ["operations", "procurement"]),
  // Contract read Nov 10: no publicity limit. The state keeps publication rights to the documents we produce, so don't post its documents on this site.
  cs("cs-aero", "tennessee-aviation-program", "Statewide aviation program support: drones, advanced air mobility, and federal funding", "Tennessee Department of Transportation, Aeronautics Division", ["Tennessee"], "Ongoing", "transport", ["drone-programs", "grants", "research", "drone-aam"]),
  // TODO(launch): needs the client's written OK before launch. The contract bars public material about the client's projects without written approval.
  cs("cs-transform", "statewide-project-delivery-and-organization", "Statewide project delivery, prioritization, and organization", STATE_DOT, [], "Ongoing", "transport", ["program-delivery", "preconstruction", "org-design", "change-mgmt", "strategic-planning", "automation", "data-governance", "lpa", "traffic", "construction", "workforce", "operations"]), // + LPA manual chapters, operations and safety benefit-cost analysis, construction manual and workflows, staff development, maintenance QA handbook (Nov 11)
  // TODO(launch): subcontract read Nov 10: the prime's information stays confidential and the prime agreement's terms apply. Keep it unnamed and high level.
  cs("cs-pmdiv", "standing-up-a-project-delivery-division", "Standing up a project delivery division", STATE_DOT, [], "Ongoing", "transport", ["org-design", "change-mgmt", "workforce", "program-delivery", "preconstruction"]),
  // Rawlins was prime on this client's purchase order. Jacob's portfolio asks whether this is a Rawlins client; it is.
  // TODO(launch): contract publicity terms not checked yet.
  cs("cs-txmaint", "performance-based-maintenance-and-rating-program", "Performance-based maintenance contracts and a maintenance rating program", STATE_DOT, [], "Completed", "transport", ["operations", "procurement", "asset-mgmt"]),
  // TODO(launch): needs the prime's and the client's written OK before launch. Both contracts bar public statements about the work without written consent.
  cs("cs-drt", "statewide-drone-response-team", "Statewide drone response team and drone program governance", STATE_DOT, [], "Ongoing", "transport", ["drone-programs", "drone-emergency"]),
  // TODO(launch): contract publicity terms not checked yet.
  cs("cs-local-am", "michigan-local-asset-management", "Asset management workshops and action plans for local agencies", "State of Michigan, Michigan Infrastructure Office", ["Michigan"], "Completed", "gov", ["asset-mgmt", "workforce"]),
  cs("cs-mi-pbo", "michigan-performance-based-maintenance-operations", "Performance-based maintenance and operations", "Michigan Department of Transportation · Our team's work before Rawlins, completed 2014", ["Michigan"], "Before Rawlins", "transport", ["operations", "asset-mgmt"]),
  // TODO(launch): the prime's subcontract (§12) keeps deliverables and client information confidential without the prime's written permission (findings_cases.md, Nov 6 sweep).
  cs("cs-workforce", "workforce-strategy-analysis", "Workforce strategy analysis", STATE_DOT, [], "Completed", "transport", ["workforce", "org-design"]),
  cs("cs-nc-ipd", "north-carolina-integrated-program-delivery", "Integrated program delivery", "North Carolina Department of Transportation", ["North Carolina"], "Completed", "transport", ["program-delivery", "preconstruction", "grants", "operations", "alt-delivery"]),
  cs("cs-nc-am", "north-carolina-asset-management-review", "Asset management review across modes", `North Carolina Department of Transportation${FOUNDER}`, ["North Carolina"], "Before Rawlins", "transport", ["asset-mgmt", "operations", "procurement"]),
  cs("cs-strategic", "nevada-six-year-strategic-plan", "Six-year strategic plan, action plans, and performance management", "Nevada Department of Transportation", ["Nevada"], "Ongoing", "transport", ["strategic-planning", "org-design", "dashboards"]),
  // on the live site as "Fleet Optimization & Asset Management" (Nevada page); our founder's career at the department, so before Rawlins.
  // Rawlins' own fleet work for the department is cs-nv-fleet-program.
  cs("cs-nv-fleet", "nevada-fleet-optimization", "Fleet optimization and asset management", `Nevada Department of Transportation${FOUNDER}`, ["Nevada"], "Before Rawlins", "transport", ["operations", "asset-mgmt"]),
  cs("cs-nv-om", "nevada-operations-maintenance-review", "Operations and maintenance program review", "Nevada Department of Transportation", ["Nevada"], "Completed", "transport", ["operations", "asset-mgmt"]),
  // Rawlins work, 2022 to 2023, as a subconsultant on the same contract as cs-nv-om (work reports and scopes read Nov 11).
  // Scope only: no findings, figures, or survey results. See CASE_STATUS.
  cs("cs-nv-fleet-program", "nevada-fleet-analysis-and-implementation", "Fleet analysis and implementation support", "Nevada Department of Transportation", ["Nevada"], "Completed", "transport", ["operations", "asset-mgmt"]),
  // title reworded Nov 11 (Nicole: "worded really bad"), using the Who we work with file's line for this work
  cs("cs-aerodiv", "nevada-aeronautics-division-research", "Research on how a state aviation role could be organized, governed, and funded", "Nevada Department of Transportation", ["Nevada"], "Ongoing", "transport", ["research", "aero-division"]),
  cs("cs-de-tech", "delaware-technology-strategic-plan", "Technology strategic plan", "Delaware Department of Transportation", ["Delaware"], "Completed", "transport", ["tech-strategy", "strategic-planning"]),
  cs("cs-ut-am", "utah-asset-management-review", "Asset management program review", `Utah Department of Transportation${FOUNDER}`, ["Utah"], "Before Rawlins", "transport", ["asset-mgmt"]),
  cs("cs-va-maint", "virginia-performance-based-maintenance-review", "Review of performance-based highway maintenance contracts", `Virginia Department of Transportation${FOUNDER}`, ["Virginia"], "Before Rawlins", "transport", ["operations", "procurement"]),
  cs("cs-maint-model", "six-state-maintenance-outsourcing-model", "A flexible maintenance contracting model for DOTs", "AMOTIA (Association for the Management and Operations of Transportation Infrastructure Assets)", [], "Completed", "contractors", ["operations", "procurement"]),
  cs("cs-pa-budget", "pennsylvania-maintenance-budgeting", "Maintenance budgeting", `Pennsylvania Department of Transportation${FOUNDER}`, ["Pennsylvania"], "Before Rawlins", "transport", ["procurement", "operations"]),
  cs("cs-nyc-parks", "new-york-city-parks-asset-management", "Asset management for 29,000 acres of parkland", `New York City Parks and Recreation${FOUNDER}`, ["New York"], "Before Rawlins", "gov", ["asset-mgmt"]),
  /* no state tag: California isn't on the map */
  cs("cs-riverside", "riverside-county-fleet-and-facilities", "Facilities and fleet operations review", `Riverside County, California${FOUNDER}`, [], "Before Rawlins", "gov", ["operations", "asset-mgmt"]),
  cs("cs-major", "major-river-crossings-and-transit", "Partnering on major river crossings and a light rail line", "Iowa, Illinois, Missouri, and Minnesota", ["Iowa", "Illinois", "Missouri", "Minnesota"], "Completed", "transport", ["program-delivery", "alt-delivery"]),
  // Backed by Rawlins partnering contracts in Fiscal > Contracts and Templates > Partnering. Jacob's portfolio describes partnering as limited because it doesn't include these records.
  cs("cs-partnering", "progressive-design-build-partnering", "Partnering facilitation for a progressive design-build bridge", "A state DOT and its contractor", [], "Ongoing", "transport", ["program-delivery", "procurement", "alt-delivery"]),
  // Backed by Rawlins partnering contracts in Fiscal > Contracts and Templates > Partnering. Jacob's portfolio describes partnering as limited because it doesn't include these records.
  cs("cs-ia-partnering", "statewide-partnering-between-a-dot-and-its-construction-industry", "Statewide partnering between a DOT and its construction industry", "A state DOT and its construction industry", [], "Completed", "transport", ["alt-delivery", "construction", "program-delivery"]),
  // Backed by Rawlins partnering contracts in Fiscal > Contracts and Templates > Partnering. Jacob's portfolio describes partnering as limited because it doesn't include these records.
  cs("cs-db-partnering", "partnering-through-construction-on-design-build-bridges-and-interstates", "Partnering through construction on design-build bridges and interstates", "State DOTs and their contractors", [], "Completed", "contractors", ["alt-delivery", "program-delivery", "construction"]),
  cs("cs-pooled", "multi-state-drone-standards", "Multi-state drone standards and specifications", "A multi-state pooled fund study", [], "Ongoing", "gov", ["research", "drone-programs"]),
  // TODO(launch): needs the client's written OK before launch. The contract bars public material about the client's projects without written approval.
  cs("cs-pdn", "project-delivery-website-and-change-system", "A project delivery website, tools, and change system staff use every day", STATE_DOT, [], "Ongoing", "transport", ["portals", "automation", "training-video", "program-delivery", "preconstruction"]),
  cs("cs-tn-tech", "technology-modernization-and-ai-governance", "Technology modernization and AI governance", STATE_DOT, [], "Ongoing", "transport", ["tech-strategy", "data-governance", "ai", "exec-advisory"]),
  // TODO(launch): purchase order read Nov 10: no publicity terms. Reconfirm current status and client permission. Keep the client unnamed.
  cs("cs-hi", "construction-standards-and-statewide-support", "Construction standards, program knowledge, and statewide support", STATE_DOT, [], "Ongoing", "transport", ["construction", "portals", "program-delivery", "training-video", "drone-programs"]),
  /* Private sector: our own project, then our automation team's work before Rawlins */
  // TODO(launch): our invoice cites a work order dated Aug 1, 2026. The agreement itself wasn't found, so its confidentiality terms aren't checked. Confirm before launch.
  cs("cs-pv-pmo", "project-management-system-for-an-engineering-firm", "A project management system for an engineering firm", "An engineering firm", [], "Ongoing", "private", ["automation", "dashboards", "data-governance"]),
  cs("cs-pv-reporting", "project-accounting-and-reporting-in-one-view", "Project accounting and reporting in one view", `A project-based technical services firm${TEAM}`, [], "Before Rawlins", "private", ["automation", "dashboards", "data-governance"]),
  cs("cs-pv-service", "project-history-that-follows-the-work-to-the-service-team", "Project history that follows the work to the service team", `An install, service, and maintenance firm${TEAM}`, [], "Before Rawlins", "private", ["automation"]),
  cs("cs-pv-field", "field-reports-the-office-can-find", "Field reports the office can find", `A field service and project delivery firm${TEAM}`, [], "Before Rawlins", "private", ["automation"]),
  cs("cs-pv-capacity", "capacity-planning-for-people-and-equipment", "Capacity planning for people and equipment", `A field services and drilling company${TEAM}`, [], "Before Rawlins", "private", ["automation", "dashboards"]),
  // back on the site at Nicole's direction (Nov 11): live-site Examples 06 and 07
  cs("cs-pv-single", "one-source-of-truth-for-a-manufacturing-firm", "One source of truth for a manufacturing firm", `A manufacturing firm${TEAM}`, [], "Before Rawlins", "private", ["automation", "dashboards"]),
  cs("cs-pv-sales", "from-closed-deal-to-billing-ready-in-days", "From closed deal to billing-ready in days", `A professional services firm${TEAM}`, [], "Before Rawlins", "private", ["automation"]),
];

/* Preview-only "Content status" notes for In the works projects that need sign-off before launch
   (Nov 9). Shown on each one's case card and case page, never in production. No client names here. */
/* content pass v7, 5.1 (Nov 11): cs-aero's note removed (its contract has no publicity limit); three added. */
export const CASE_STATUS: Record<string, string> = {
  "cs-transform": "Content status: needs the client's written OK before launch. The contract bars public material about the client's projects without written approval.",
  "cs-pdn": "Content status: needs the client's written OK before launch. The contract bars public material about the client's projects without written approval.",
  "cs-drt": "Content status: needs the prime's and the client's written OK before launch. Both contracts bar public statements about the work without written consent.",
  "cs-pmdiv": "Content status: the subcontract keeps the prime's information confidential and binds us to the prime agreement's terms. Keep it unnamed and high level.",
  "cs-hi": "Content status: the purchase order has no publicity terms. Jacob's portfolio says to reconfirm current status and client permission. Keep it unnamed.",
  "cs-pv-pmo": "Content status: our invoice cites a work order dated Aug 1, 2026. The agreement itself wasn't found, so its confidentiality terms aren't checked. Confirm before launch.",
  "cs-workforce": "Content status: the prime's subcontract keeps all deliverables and client information confidential without the prime's written permission. Needs the prime's written OK before launch.",
  "cs-txmaint": "Content status: contract publicity terms not checked yet.",
  "cs-local-am": "Content status: contract publicity terms not checked yet.",
  // Nicole asked on Nov 11 whether we can talk about this. Our Nov 6 contract check lists this client's terms as not checked,
  // and the study includes draft legislation, which our notes say to keep internal.
  "cs-aerodiv": "Content status: we haven't confirmed we can talk about this. The contract's publicity terms aren't checked, and the study includes draft legislation, which stays internal. Scott or Paul to confirm with the department before launch.",
  /* the Nevada fleet project (Who we work with addendum v2, 1.4). cs-nv-om comes from the same contract, so it carries the same note. */
  "cs-nv-fleet-program": "Content status: Rawlins work as a subconsultant, from our work reports and scopes (2022 to 2023). The department's master agreement says information and data from the work can't be used in a publication without its written permission, and the prime's subcontract form needs the prime's consent to share information developed in the work. The original 2021 subcontract isn't in SharePoint. Kept to what we did, with no findings or figures. Scott to confirm with the prime before launch.",
  "cs-nv-om": "Content status: same contract as the fleet project. Kept to what we did, with no findings or figures. Scott to confirm with the prime before launch.",
};
/* Lines elsewhere that come from one of those projects carry its note too (keyed by the exact line). */
export const LINE_STATUS: Record<string, string> = {
  "Drone data that checked debris removal quantities, and proved correct when reports disagreed": CASE_STATUS["cs-drt"],
  "We've supported a state's drone response team with training, and used drone data to check debris removal quantities": CASE_STATUS["cs-drt"],
  /* content pass v7, Part 4: the Maintenance Programs row that comes partly from cs-drt */
  "Winter operations and emergency readiness": CASE_STATUS["cs-drt"],
  /* content pass v7, 5.2: project lines */
  // TODO(launch): Jacob's portfolio says sources describe this at different stages. Confirm it's final.
  "Finalized a maintenance quality assurance handbook": "Content status: Jacob's portfolio says sources describe this at different stages. Confirm it's final.",
  "Maintenance quality assurance handbook finalized": "Content status: Jacob's portfolio says sources describe this at different stages. Confirm it's final.",
  // TODO(launch): findings_cases.md (Nov 6) says the Tennessee version wasn't started and is an internal client matter.
  "Leadership transition support: briefings and handoff materials for incoming leaders": "Content status: our records say this wasn't started where it came up and is an internal client matter. Confirm before launch.",
  // TODO(launch): Jacob's portfolio says the completed tools need confirmation.
  "Man-hour and cost estimating packages": "Content status: Jacob's portfolio says the completed tools need confirmation.",
  /* Who we work with (Nov 11) */
  // 5.3 cs-hi's two harbors lines
  "Supported federal port security grant applications for the department's harbors": `${CASE_STATUS["cs-hi"]} The applications were not awarded as of our Nov 2026 records.`,
  "Evaluated drones, uncrewed surface vessels, sonar, and lidar for harbor inspection": CASE_STATUS["cs-hi"],
  // 5.4 Aviation & Airports, What we deliver
  "Emergency response with drones: response team training and live video into the emergency operations center": CASE_STATUS["cs-drt"],
  // 5.5 Contractors & Engineering Firms, How firms work with us
  // TODO(launch): the prime firms' subcontracts keep their information confidential. Keep this general.
  "Engineering and advisory firms add us to their teams for state DOT programs: program delivery, organization and workforce, right of way, technology, and drone programs.": "Content status: the prime firms' subcontracts keep their information confidential. Keep this general: no firm names and no project details.",
  // 5.6 Contractors & Engineering Firms, How firms work with us
  "Our automation team connects a firm's project, time, and invoicing tools and builds the workflows around them.": CASE_STATUS["cs-pv-pmo"],
  // 5.7 Asset Management for Local Agencies, The experience behind it
  "We've held asset management workshops and built action plans with local agencies, for a state infrastructure office": CASE_STATUS["cs-local-am"],
  // 5.8 Capital Project Delivery & Permitting, The experience behind it
  // TODO(launch): started Sep 2026 under a prime; subcontract publicity terms not checked.
  "We've begun work on a resource planning and prioritization framework for a city transportation department, on an engineering firm's team": "Content status: this work started in Sep 2026 under a prime. Subcontract publicity terms not checked yet. Keep it unnamed.",
  // 5.9 Federal & Multi-State Programs, The experience behind it
  // TODO(launch): delivered under a prime on a federal contract; publicity terms not checked.
  "We helped plan and facilitate a federal peer exchange on drone programs for western state transportation departments in September 2026": "Content status: delivered under a prime on a federal contract. Publicity terms not checked yet.",
  /* Who we work with addendum v2, Part 3: high-level lines for work we can't describe in detail */
  "Contractors and service firms bring us in while they shape their approach to state transportation work. We review plans and proposal materials and bring the view from the owner's side of the table.": "Content status: from two closed agreements (2023 to 2024). Both keep the client's information confidential, so this stays unnamed and general. Scott to confirm it belongs on a site state DOTs read.",
  "We've helped land developers coordinate state DOT permitting for their projects: keeping communication with the department moving, and advising on direction, timing, and permit questions.": "Content status: from three engagements with land developers (2022 to 2026). One agreement treats everything about the work as confidential, so this stays unnamed and general. Scott to confirm.",
  "We've advised a construction materials supplier on working with a state DOT, including product approval.": "Content status: from a 2025 retainer, read from the draft agreement because the signed copy is a scan. It keeps non-public information confidential. Unnamed and general. Scott to confirm.",
};

/* Integration & Automation intro (content pass v7, Part 4) */
// TODO(launch): Headlight is named as a general example. Jacob's portfolio says vendor relationships need a leadership decision before public use.
LINE_STATUS["We connect the systems you already own so information moves on its own: construction platforms like Headlight linked to the rest of an agency's systems, repeated fields filled in once from trusted sources, and small custom apps where an integration platform doesn't fit. We document every workflow so your team can run it."] = "Content status: Named as a general example. Jacob's portfolio says vendor relationships need a leadership decision before public use.";

/* Preview-only notes for a whole page (content pass v7: Owner's Representation, 2.11; Ports & Harbors, Part 6) */
export const PAGE_STATUS: Record<string, string> = {
  // TODO(launch): Jacob's portfolio asks leadership to define this role: what authority it carries and how it avoids conflicts with other work for the same owner.
  "owners-rep": "Content status: Jacob's portfolio asks leadership to define this role: what authority it carries and how it avoids conflicts with other work for the same owner.",
  // TODO(launch): the only work behind this page is cs-hi's client. Same note as cs-hi.
  "sub-ports": `Content status: the only work behind this page is cs-hi's client. ${CASE_STATUS["cs-hi"].replace("Content status: the", "The")} As of our Nov 2026 records the grant applications were submitted and not awarded, and the records don't show whether the planned technology demonstration was held.`,
};

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
    feature: { kind: "link", title: "our people", text: "More than 25 people from public agencies, working next to the team that builds the tools.", href: "/about/our-people", cta: "Meet the team" },
    groups: [{
      items: [
        leaf("who-we-are", "Who we are", "/about/who-we-are", "hero"),
        leaf("how-we-work", "How we work", "/about/how-we-work", "construction"),
        leaf("our-people", "our people", "/about/our-people", "people"),
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
