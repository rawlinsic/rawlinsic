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
/* parent: the service it sits under in the menus (Nicole, Nov 12: Preconstruction and Construction under Project Delivery) */
export type Service = { id: string; slug: string; name: string; scene?: SceneKey; parent?: string };
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
      svc("exec-advisory", "Executive Advisory Services"),
      svc("strategic-planning", "Strategic Planning & Performance Management", "grid"),
      svc("org-design", "Organizational Design & Process Improvement"),
      svc("change-mgmt", "Change Management", "people"),
      svc("workforce", "Leadership and Workforce Development", "site"),
    ],
  },
  {
    id: "delivery", slug: "program-project-delivery", name: "Program & Project Delivery",
    /* Nov 13 (Nicole: "this link needs to be updated"): the address matches the name; /services/project-delivery redirects */
    tag: "Programs, projects, procurement, & funding", scene: "construction", featuredCase: "cs-transform",
    services: [
      /* content pass v7, 2.1 (Nov 11): Construction & Pre-Construction split in two; Program & Project Delivery renamed.
         Nov 12 (Nicole's list for this menu, in her order): Finance, Budget & Procurement split into Finance & Budget and
         Consultant & Contractor Procurement; Alternative Delivery & Partnering split in two; Local Public Agency &
         Federal-Aid Programs split in two; Grants & Funding renamed; Statewide & Metropolitan Planning and Project
         Delivery added; Preconstruction and Construction sit under Project Delivery; Right of Way is off the site
         (her note: it is part of preconstruction). The old addresses redirect (next.config.js). */
      svc("program-delivery", "Program Development", "interchange"),
      svc("finance", "Finance & Budget", "office"),
      svc("planning", "Statewide & Metropolitan Planning", "grid"),
      svc("proj-delivery", "Project Delivery", "construction"),
      { ...svc("preconstruction", "Preconstruction"), parent: "proj-delivery" },
      { ...svc("construction", "Construction"), parent: "proj-delivery" },
      svc("alt-delivery", "Alternative Delivery", "site"),
      svc("procurement", "Consultant & Contractor Procurement", "office"),
      svc("federal-aid", "Federal-Aid Programs", "street"),
      svc("lpa", "Local Public Agency Programs", "street"),
      svc("grants", "Grant Applications & Delivery", "crossing"),
      svc("partnering", "Partnering", "site"),
      svc("owners-rep", "Owner's Representation", "site"),
    ],
  },
  {
    id: "om", slug: "maintenance-operations", name: "Maintenance & Operations", // Nov 13 (Nicole): "everywhere it's operations and maintenance, it should be maintenance and operations"; the old address redirects
    tag: "Asset management, maintenance, contracting, & traffic operations", scene: "dusk", featuredCase: "cs-pbmc",
    services: [
      svc("asset-mgmt", "Asset Management", "crossing"),
      /* Nov 12 (Nicole's Operations & Maintenance file, v8): four services under Asset Management, the way Preconstruction
         and Construction sit under Project Delivery. Each was a line on the Maintenance Programs page. */
      { ...svc("mqa", "Maintenance Quality Assurance"), parent: "asset-mgmt" },
      { ...svc("outsourcing", "Maintenance Outsourcing"), parent: "asset-mgmt" },
      { ...svc("pbmc", "Performance-Based Maintenance Contracting"), parent: "asset-mgmt" },
      { ...svc("fleet", "Fleet & Facilities"), parent: "asset-mgmt" },
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
      svc("aero-division", "Aeronautics Division & Program Establishment", "airport"),
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
      svc("training-video", "Videos", "site"),
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
  subsectors: Subsector[]; featured: string[]; featuredCase?: string; projects: string[];
  /* apart: listed on its own line at the bottom of the Who We Work With menu, not with the others (International Markets) */
  apart?: boolean;
  /* more: projects the page shows after its featured projects, without adding them to the menu (Nicole, Nov 12) */
  more?: string[];
  /* parent: the headline it sits under in the Who We Work With menu (Nicole, Nov 12): Transportation Sector under
     Public Sector, Contractors under Private Sector. The headline keeps its own page. */
  parent?: string;
};

const sub = (id: string, name: string, scene: SceneKey, line: string, thin = false): Subsector =>
  ({ id, slug: slugify(name), name, scene, line, thin });

export const INDUSTRIES: Industry[] = [
  {
    /* Nov 12 (Nicole): this is now the Public Sector headline in the menu, with Transportation Sector under it. It keeps
       a page. "Other Government Services" and its four modes (Asset Management, Capital Project Delivery & Permitting,
       Regional & Metropolitan Planning Support, Federal & Multi-State Programs) are off the site; the old addresses
       redirect here (next.config.js). */
    id: "gov", slug: "public-sector", name: "Public Sector", scene: "street",
    who: "", // no line under the Public Sector headline (Nicole, Nov 12)
    // cs-local-am (through a state infrastructure office) and cs-pooled are the two Rawlins projects here.
    // Capital delivery and regional planning rest on experience from earlier roles; the lead says what that experience is.
    // Nov 12: put together from the Who We Work With page's opening sentence and the two leads this page and the
    // Transportation page already had. No new facts. Nicole to review.
    lead: "Most of our work is with the public agencies that own and run infrastructure: more than 30 transportation agencies, local agencies, and a multi-state research program. Most of that work is with state departments of transportation. With cities, counties, and regional agencies, our work so far is asset management with local agencies, through a state infrastructure office. For capital project delivery and regional planning, we bring experience from city public works and the Federal Highway Administration.",
    featured: ["asset-mgmt", "program-delivery", "planning", "lpa", "federal-aid", "grants", "research", "portals", "strategic-planning"],
    featuredCase: "cs-local-am",
    /* one from each page under it (Who We Work With read-as-built fixes v1, Nov 13) */
    projects: ["cs-proficiency", "cs-pooled", "cs-local-am"],
    subsectors: [],
  },
  {
    id: "transport", slug: "transportation", name: "Transportation Sector", scene: "interchange", parent: "gov",
    who: "Federal Government, State DOTs, & Local Governments", // Nicole's wording (preview edit, Nov 12, 4:24 PM); the Who we work with file's line for this field was skipped
    // 31 agencies: 19 directly or through a prime, 12 through the drone standards pooled fund (CONTENT FIXES v3, section 3).
    // Transit: one partnering project (2019). Harbors: one client. Named for what they are, with no count.
    lead: "Most of our work is with state departments of transportation, and we've served more than 30 transportation agencies so far. We help them organize the department, choose and deliver projects, maintain and operate what they own, and put drones and digital tools to work. Most of that work is on highways and bridges. We also support state aeronautics programs, and we've worked on a light rail line and with a state harbors program. With local governments, we've run asset management workshops and action plans with cities and county road commissions, through a state infrastructure office, and facilitated partnering on a light rail line. With the federal government, we facilitate a multi-state research program the Federal Highway Administration sits on, and we help states deliver federal-aid programs and compete for federal grants.", // the last two sentences: Nicole's wording, Nov 12
    featured: ["program-delivery", "preconstruction", "construction", "operations", "traffic", "asset-mgmt", "portals", "drone-programs"],
    featuredCase: "cs-major",
    /* Nov 13 (read-as-built fixes v1): the overview page is off this list; the network page and the interstate contracts are on */
    projects: ["cs-pdn", "cs-proficiency", "cs-pbmc", "cs-aero"],
    /* Nicole, Nov 12: the multi-state research project and the local agency asset management project show on this page too.
       They stay on the Public Sector page; the menu doesn't change. */
    more: ["cs-pooled", "cs-local-am"],
    subsectors: [
      sub("sub-highways", "Highways & Bridges", "rural", "Most of our work is on state highway systems: how projects are chosen, readied, built, and maintained."),
      /* Bridges & Structures is off the site (Nicole emptied its name, Nov 12, 5:22 PM, and asked for it out of the menu):
         Highways is now Highways & Bridges. Its old address redirects there (next.config.js). */
      sub("sub-aviation", "Aviation & Airports", "airport", "State aeronautics divisions, airports, and the drone and advanced air mobility programs growing around them. We help small aviation staffs run programs, plan for what's next, and compete for federal funding."),
      // Nicole's wording (preview edit, Nov 11, 11:5x PM); the Who we work with file's line for this field was skipped
      sub("sub-rail", "Rail & Transit", "rail", "Our transit work includes partnering facilitation on a $2 billion light rail line. Our team also includes the California Department of Transportation's former Chief of Rail and Mass Transportation."),
      /* v12: back under Transportation. Only harbors work so far (port security
         grant applications; one drone and uncrewed-vessel technology evaluation). */
      sub("sub-ports", "Ports & Harbors", "harbor", "Our work here so far is with one state harbors program: a federal port security grant application, and a demonstration of drones, an uncrewed surface vessel, and an underwater vehicle for harbor inspection.", true),
    ],
  },
  {
    /* Nov 13 (Who We Work With file v1): new page under Public Sector */
    id: "fed", slug: "federal-government", name: "Federal Government", scene: "crossing", parent: "gov",
    who: "Federal Programs, Multi-State Research, & Grants",
    lead: "Our work with the federal government runs through programs the states take part in. We facilitate a multi-state research program on drone standards that the Federal Highway Administration sits on, and we helped plan and facilitate a federal peer exchange on drone programs for western state transportation departments. We also help states deliver federal-aid programs and compete for federal grants. Our team includes former Federal Highway Administration division leaders.",
    featured: ["research", "grants", "federal-aid", "lpa", "drone-programs", "planning", "portals"],
    featuredCase: "cs-pooled",
    projects: ["cs-pooled", "cs-lpa-manual", "cs-aero", "cs-harbor", "cs-nc-ipd"],
    subsectors: [],
  },
  {
    /* Nov 13 (Who We Work With file v1): new page under Public Sector */
    id: "local", slug: "local-governments", name: "Local Governments", scene: "street", parent: "gov",
    who: "Cities, Counties, & Regional Agencies",
    lead: "Most of our work with cities, counties, and regional agencies so far has come through state programs. We've run asset management workshops and action plans with cities and county road commissions through a state infrastructure office, drafted a manual and built training for the local agencies that deliver federal-aid projects, written planning guidance on advanced air mobility for local governments, and facilitated partnering on a light rail line. We've also begun work with a city transportation department on resource planning. Our team includes a former Director of Public Works for the City of Las Vegas.",
    featured: ["asset-mgmt", "lpa", "federal-aid", "grants", "partnering", "drone-aam", "org-design", "portals"],
    featuredCase: "cs-local-am",
    projects: ["cs-local-am", "cs-lpa-manual", "cs-major", "cs-aero", "cs-nyc-parks", "cs-riverside"],
    subsectors: [],
  },
  {
    id: "private", slug: "private-sector", name: "Private Sector", scene: "office",
    who: "", // Nicole's wording (preview edit, Nov 11); the Who we work with file's line for this field was skipped
    // One Rawlins project on the page (cs-pv-pmo); the others are our automation team's work before Rawlins, and their cards say so
    // (four when the Who we work with file was written; six with live-site Examples 06 and 07 back, Nov 11).
    // Nicole's wording (preview edit, Nov 11, 11:5x PM); the Who we work with file's new lead for this field was skipped.
    lead: "Private firms come to us for two reasons. Contractors and engineering firms that work for public agencies want what we know from the owner's side of the table: how a department of transportation plans, contracts, and delivers its work. Firms of every kind bring us in to connect the systems they already pay for and automate the work around them.",
    featured: ["partnering", "alt-delivery", "automation", "dashboards", "ai", "portals"],
    projects: ["cs-major", "cs-pv-pmo", "cs-pv-capacity"],
    subsectors: [],
  },
  {
    id: "contractors", slug: "contractors", name: "Contractors", scene: "site", parent: "private",
    who: "Partnering & Contracting Methods", // Nicole's wording (preview edit, Nov 11); the Who we work with file's line for this field was skipped
    // Partnering: cs-major, cs-db-partnering, cs-ia-partnering, cs-partnering (Fiscal > Contracts and Templates > Partnering).
    // Contracting model: cs-maint-model. Teaming: subcontracts under engineering and advisory firms (findings_cases.md, G).
    // "aviation" dropped from the teaming list: our aviation contracts on record are direct, and the drone program work is the one through a prime.
    // "right of way" added: right of way support on an engineering firm's district contract (2026 progress reports).
    lead: "Contractors come to us for what we know about the owner's side of the table. We facilitate partnering between contractors and public owners on major projects, and we've helped the maintenance contracting industry shape a contracting model state DOTs can tailor.",
    featured: ["partnering", "alt-delivery", "construction", "outsourcing", "pbmc", "automation", "portals"],
    // was ["alt-delivery", "owners-rep", "automation", "training-video"]. Construction and Maintenance Programs are where this page's projects sit
    // (cs-ia-partnering, cs-db-partnering, cs-maint-model); Dashboards goes with cs-pv-pmo. Owner's Representation is a service for owners, not
    // contractors, and no project here uses Digital Training & Video.
    featuredCase: "cs-major",
    projects: ["cs-major", "cs-db-partnering", "cs-ia-partnering", "cs-maint-model", "cs-partnering", "cs-db-pursuit"],
    subsectors: [],
  },
  {
    /* Nov 13 (Who We Work With file v1): new page under Private Sector */
    id: "eng", slug: "engineering-consulting-firms", name: "Engineering & Consulting Firms", scene: "office", parent: "private",
    who: "Public Programs & Project Systems",
    lead: "Engineering and consulting firms add us to their teams on state DOT programs, for what our people know from running those programs inside an agency. Our automation team also builds the systems a firm runs its own projects on: project tracking, time, invoicing, and reporting.",
    featured: ["program-delivery", "org-design", "workforce", "drone-programs", "automation", "dashboards", "portals"],
    featuredCase: "cs-pv-pmo",
    projects: ["cs-pv-pmo", "cs-pv-reporting", "cs-pv-sales"],
    subsectors: [],
  },
  {
    /* Nov 13 (Who We Work With file v1): new page under Private Sector */
    id: "growth", slug: "growing-companies", name: "Growing Companies", scene: "office", parent: "private",
    who: "Firms Who Have Outgrown Their Current Tools or Processes",
    lead: "Companies that have outgrown their spreadsheets or tools, but don't have a build team. We connect the systems you already pay for and automate the work around them.",
    featured: ["portals", "automation", "ai", "data-governance", "dashboards", "tech-strategy", "change-mgmt"], // the six the old Private Sector page showed (project pages fixes file v1, Part 3); Websites, Portals & Digital Tools first (Nicole, Nov 13: "websites and tools should be listed as a service for growing companies")
    featuredCase: "cs-pv-pmo",
    projects: ["cs-pv-pmo", "cs-pv-capacity", "cs-pv-reporting", "cs-pv-service", "cs-pv-field", "cs-pv-single", "cs-pv-sales"],
    subsectors: [],
  },
  {
    /* INTERNATIONAL PAGE (Nov 11, 2026). On the live site since Nov 12 (Nicole's Operations & Maintenance file v8, Part 2): in the menu,
       footer, Who We Work With page, home ring, search engines, and site map, the same way it showed on previews. */
    id: "intl", slug: "international", name: "International Markets", scene: "globe", apart: true,
    who: "Ministries of transport, national roads and aviation authorities, and city agencies outside the United States",
    // U.S. only to date: every Rawlins client is in the U.S., including territories (Jacob's AERO portfolio, Nov 2026). Don't add an international project or client.
    lead: "While our project work to date has been in the United States, our experience helping public agencies plan, deliver, and run transportation systems is highly transferable. The core operational and infrastructure challenges we solve in the US closely mirror those faced by ministries of transport and national authorities around the world.", // Nicole's wording, Nov 11
    featured: ["strategic-planning", "org-design", "program-delivery", "asset-mgmt", "data-governance", "tech-strategy", "drone-aam", "smart-mobility", "portals"], subsectors: [], projects: [],
  },
];

/* the industries listed together; International Markets has its own line (apart) */
export const VISIBLE_INDUSTRIES = INDUSTRIES.filter((i) => !i.apart);

/* The International page's own sections (INTERNATIONAL PAGE, Nov 11, 2026). Rendered in components/v8/industry.tsx
   only for "intl". flag: a preview-only Content status note beside the line.
   "Why it carries over" (section and section-bar item) was deleted Nov 11: Nicole's lead on the page already says it. */
export const INTL: { abroad: { title: string; items: { t: string; flag?: string }[] }; region: { title: string; items: string[]; link: { href: string; label: string } } } = {
  abroad: {
    title: "How we work outside the U.S.",
    items: [
      // From the roster: Andy Palanisamy (Dubai); Samantha Lloyd, Kobus Pieters (Cape Town); Kiara Pienaar (Gauteng); Koussay Khelil (Ontario).
      { t: "Members of our team are based in the United Arab Emirates, South Africa, and Canada, alongside our people across the United States." },
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

/* Nov 13 (Nicole): "websites should be included on all of the pages for who we work with as a service" — Websites, Portals &
   Digital Tools is in every Who We Work With page's services (the industry lists above and the four modes' lists in catalog.ts) */
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
  { q: "We're starting our first design-build project with a public owner", services: ["alt-delivery", "partnering", "owners-rep"] },
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
  ["We've done the job", "Our people ran the programs our clients run: chief engineers, maintenance and operations leaders, technology and data chiefs, a right of way manager, a city public works director, and federal highway executives to name a few. They know how budgets, decisions, and projects move inside an agency, so what we recommend fits how your agency works."],
  ["Small enough to move fast", "We're a small and agile firm, and that works in your favor. There's no lengthy chain of approvals between you and the people doing the work. We get started quickly, adjust when things change, and get the job done."],
  ["Strategy and build under one roof", "Former agency leaders work alongside our in-house digital solutions team, so the plan and tools your project calls for come from one firm. Websites, workflows, dashboards, training, and more."],
  ["We build on systems you already own", "We use the systems and licenses you already own, and connect them. We can also build a custom solution if that's the right fit. Every build is documented and handed over, and you own the end result. We're also around to upkeep afterwards if desired."],
  ["We stay until it runs", "Recommendations are where we start. We write the manuals and procedures, build the tools, train your people, and stay until your team runs it on its own."],
];

/* How we've grown (content updates v4, 7.6). Also shows on Who we are. */
export const STORY: [string, string, string][] = [
  ["foundation", "Deep Transportation Agency Expertise", "Rawlins started with people who had worked inside public agencies. We know the constraints, the decision-making, and the culture it takes to get work done there."],
  ["EVOLUTION", "Advisory Capabilities", "We advise agency leaders on how to organize and deliver their programs: the plan, the structure, the processes, and the people who carry them out."],
  ["innovation", "Drones and Advanced Air Mobility", "We help agencies set up and run drone programs and plan for advanced air mobility: procedures, pilot training, emergency response, and guidance for local governments."],
  ["frontier", "Data Governance, Automation, & AI", "Our in-house team connects the systems clients already own, automates repeated steps, and puts AI to work where it helps. We also help agencies set up data governance, so the numbers behind a decision can be trusted."],
];

/* the four steps (About: How we work file v1, Nov 13); the same text is in lib/content/catalog.ts STEPS */
export const STEPS: [string, string][] = [
  ["Assess", "We agree on the decision the work has to support. Then we look at the written requirements and the actual practice side by side, with the people who do the work."],
  ["Rebuild", "We develop the structure, process, contract, or tool with the staff who will use it, and test it on real cases before it goes into use."],
  ["Train", "We prepare the people who will run it, with manuals, courses, short references, and support on the job."],
  ["Hand off", "We agree where it lives, who keeps it current, and how staff get help. The client owns everything we built, and we remain available for support afterward."],
];

/* Former roles (Who We Are leaders list; photos from the live roster) */
export const LEADERS: { name: string; role: string; photo: string }[] = [
  { name: "Scott Rawlins, P.E.", role: "Founder. Former Deputy Director and Chief Engineer, Nevada Department of Transportation", photo: "scott" },
  { name: "April Blackburn, PMP", role: "Former Chief Information Officer, Chief Technology Officer, and Interim Assistant Secretary of Finance and Administration, Florida Department of Transportation", photo: "april" },
  { name: "Dara Wheeler", role: "Former Chief Data and AI Officer and Chief Innovation Officer, California Department of Transportation", photo: "darawheeler" },
  { name: "Mayela Sosa", role: "Former Division Administrator, Federal Highway Administration Indiana and Hawaii Divisions", photo: "mayela" },
  { name: "Paul Steinman, P.E.", role: "Former Chief Operations Officer, Idaho Transportation Department, and District Secretary, Florida DOT", photo: "paulsteinman" },
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
  cs("cs-proficiency", "tennessee-career-paths-and-proficiency", "Career paths and proficiency programs across a department", "Tennessee Department of Transportation", ["Tennessee"], "Completed", "transport", ["workforce", "org-design", "change-mgmt", "traffic", "construction", "operations"]), // + right of way appraiser program, traffic design and construction proficiency (Nov 11)
  /* Nov 13 (projects file v4, Part 3): page G, page H, page I, page P */
  cs("cs-tn-reorg", "tennessee-department-reorganization", "A department reorganization: structures, positions, and the move to them", "Tennessee Department of Transportation", ["Tennessee"], "Completed", "transport", ["org-design", "change-mgmt", "exec-advisory", "finance", "program-delivery", "planning", "preconstruction", "lpa", "traffic"]),
  cs("cs-tn-amdiv", "tennessee-asset-management-division", "A new asset management division, from vision to hiring plan", "Tennessee Department of Transportation", ["Tennessee"], "Completed", "transport", ["asset-mgmt", "operations", "org-design", "fleet"]),
  cs("cs-tn-psm", "tennessee-professional-services-manuals", "Manuals and templates for buying consultant services", "Tennessee Department of Transportation", ["Tennessee"], "Completed", "transport", ["procurement", "alt-delivery"]),
  /* Nov 13 (M&O file v10, Part 4): new page, separate work orders from the reorganization */
  cs("cs-tn-leading", "tennessee-maintenance-and-traffic-leading-practices", "Leading practices reviews for maintenance and traffic operations", "Tennessee Department of Transportation", ["Tennessee"], "Completed", "transport", ["traffic", "operations"]),
  cs("cs-tn-it", "tennessee-it-strategic-plan-and-organization", "An IT strategic plan and a new IT organization", "Tennessee Department of Transportation", ["Tennessee"], "Completed", "transport", ["tech-strategy", "org-design", "strategic-planning"]),
  cs("cs-tn-ipd", "tennessee-integrated-program-delivery", "Integrated program delivery: transition projects, risk, and consultant onboarding", "Tennessee Department of Transportation", ["Tennessee"], "Completed", "transport", ["program-delivery", "preconstruction", "proj-delivery"]),
  cs("cs-pbmc", "tennessee-performance-based-maintenance-contracts", "Launching performance-based maintenance contracts on an interstate network", "Tennessee Department of Transportation", ["Tennessee"], "Completed", "transport", ["operations", "procurement", "pbmc", "mqa", "outsourcing", "owners-rep", "finance"]),
  // Contract read Nov 10: no publicity limit. The state keeps publication rights to the documents we produce, so don't post its documents on this site.
  cs("cs-aero", "tennessee-aviation-program", "Statewide aviation program support: drones, advanced air mobility, and federal funding", "Tennessee Department of Transportation, Aeronautics Division", ["Tennessee"], "Ongoing", "transport", ["drone-programs", "grants", "research", "drone-aam", "training-video"]),
  // TODO(launch): needs the client's written OK before launch. The contract bars public material about the client's projects without written approval.
  cs("cs-transform", "statewide-project-delivery-and-organization", "Statewide project delivery, prioritization, and organization", STATE_DOT, [], "Ongoing", "transport", []), // + LPA manual chapters, operations and safety benefit-cost analysis, construction manual and workflows, staff development, maintenance QA handbook (Nov 11)
  /* Nov 13 (projects file v4, Part 3): page B, page C, page D, page E, page F, page N, page O */
  cs("cs-pd-manual", "program-development-manual-and-project-selection", "A program development manual and project selection tools", STATE_DOT, [], "Ongoing", "transport", ["program-delivery", "planning", "federal-aid", "grants", "portals", "dashboards"]),
  cs("cs-consult-flow", "consultant-contracting-in-one-workflow", "Consultant contracting rebuilt as one connected workflow", STATE_DOT, [], "Ongoing", "transport", ["procurement", "automation", "portals"]),
  cs("cs-lpa-manual", "local-public-agency-manual-and-training", "A local public agency manual, certification process, and training", STATE_DOT, [], "Ongoing", "transport", ["lpa", "federal-aid"]),
  cs("cs-mqa-fleet", "maintenance-quality-assurance-training-and-fleet", "Maintenance quality assurance, operator training, and fleet", STATE_DOT, [], "Ongoing", "transport", ["operations", "asset-mgmt", "workforce", "mqa", "fleet", "outsourcing"]),
  cs("cs-cam", "construction-administration-manual", "A construction administration manual matched to new specifications", STATE_DOT, [], "Ongoing", "transport", ["construction", "org-design"]),
  cs("cs-reorg", "department-reorganization-from-chart-to-rollout", "A department reorganization, from functional chart to rollout", STATE_DOT, [], "Ongoing", "transport", ["org-design", "change-mgmt", "exec-advisory", "workforce", "finance"]),
  cs("cs-measures", "performance-measures-from-strategy-to-dashboards", "Performance measures, from strategy to dashboards", STATE_DOT, [], "Ongoing", "transport", ["strategic-planning", "dashboards", "exec-advisory", "asset-mgmt"]),
  // TODO(launch): subcontract read Nov 10: the prime's information stays confidential and the prime agreement's terms apply. Keep it unnamed and high level.
  cs("cs-pmdiv", "standing-up-a-project-delivery-division", "Standing up a project delivery division", STATE_DOT, [], "Ongoing", "transport", ["org-design", "change-mgmt", "workforce", "program-delivery", "preconstruction", "proj-delivery", "construction", "exec-advisory", "dashboards", "strategic-planning", "training-video"]),
  // Rawlins was prime on this client's purchase order. Jacob's portfolio asks whether this is a Rawlins client; it is.
  // TODO(launch): contract publicity terms not checked yet.
  cs("cs-txmaint", "performance-based-maintenance-and-rating-program", "Performance-based maintenance contracts and a maintenance rating program", STATE_DOT, [], "Completed", "transport", ["operations", "procurement", "asset-mgmt", "pbmc", "mqa", "owners-rep", "dashboards"]),
  // TODO(launch): needs the prime's and the client's written OK before launch. Both contracts bar public statements about the work without written consent.
  cs("cs-drt", "statewide-drone-response-team", "Statewide drone response team and drone program governance", STATE_DOT, [], "Ongoing", "transport", ["drone-programs", "drone-emergency", "org-design"]),
  // TODO(launch): contract publicity terms not checked yet.
  cs("cs-local-am", "michigan-local-asset-management", "Asset management workshops and action plans for local agencies", "State of Michigan, Michigan Infrastructure Office", ["Michigan"], "Completed", "gov", ["asset-mgmt", "workforce"]),
  cs("cs-mi-pbo", "michigan-performance-based-maintenance-operations", "Performance-based maintenance and operations", "Michigan Department of Transportation · Our team's work before Rawlins, completed 2014", ["Michigan"], "Before Rawlins", "transport", ["operations", "asset-mgmt", "pbmc", "mqa"]),
  // TODO(launch): the prime's subcontract (§12) keeps deliverables and client information confidential without the prime's written permission (findings_cases.md, Nov 6 sweep).
  cs("cs-workforce", "workforce-strategy-analysis", "Workforce strategy: vacancies, staffing, and peer benchmarks", STATE_DOT, [], "Completed", "transport", ["workforce", "org-design"]),
  cs("cs-nc-ipd", "north-carolina-integrated-program-delivery", "Integrated program delivery, from grant applications to maintenance contracts", "North Carolina Department of Transportation", ["North Carolina"], "Completed", "transport", ["program-delivery", "preconstruction", "grants", "operations", "alt-delivery", "pbmc", "proj-delivery"]),
  cs("cs-nc-am", "north-carolina-asset-management-review", "Asset management review across modes", `North Carolina Department of Transportation${FOUNDER}`, ["North Carolina"], "Before Rawlins", "transport", ["asset-mgmt", "operations", "procurement"]),
  cs("cs-strategic", "nevada-strategic-plan-and-action-plans", "A strategic plan, action plans, and performance management", "Nevada Department of Transportation", ["Nevada"], "Ongoing", "transport", ["strategic-planning", "org-design", "dashboards", "asset-mgmt"]),
  // on the live site as "Fleet Optimization & Asset Management" (Nevada page); our founder's career at the department, so before Rawlins.
  // Rawlins' own fleet work for the department is cs-nv-fleet-program.
  cs("cs-nv-fleet", "nevada-fleet-optimization", "Fleet optimization and asset management", `Nevada Department of Transportation${FOUNDER}`, ["Nevada"], "Before Rawlins", "transport", ["operations", "asset-mgmt", "fleet"]),
  cs("cs-nv-om", "nevada-maintenance-operations-review", "Maintenance and operations program review, and the work that followed", "Nevada Department of Transportation", ["Nevada"], "Completed", "transport", ["operations", "asset-mgmt", "program-delivery", "traffic", "outsourcing"]),
  // Rawlins work, 2022 to 2023, as a subconsultant on the same contract as cs-nv-om (work reports and scopes read Nov 11).
  // Scope only: no findings, figures, or survey results. See CASE_STATUS.
  cs("cs-nv-fleet-program", "nevada-fleet-analysis-and-implementation", "Fleet analysis and implementation support", "Nevada Department of Transportation", ["Nevada"], "Completed", "transport", ["operations", "asset-mgmt", "fleet"]),
  // title reworded Nov 11 (Nicole: "worded really bad"), using the Who we work with file's line for this work
  cs("cs-aerodiv", "nevada-aeronautics-division-research", "Research on how a state aviation role could be organized, governed, and funded", "Nevada Department of Transportation", ["Nevada"], "Ongoing", "transport", ["research", "aero-division", "exec-advisory", "org-design"]),
  cs("cs-de-tech", "delaware-technology-strategic-plan", "Technology strategic plan", "Delaware Department of Transportation", ["Delaware"], "Completed", "transport", ["tech-strategy", "strategic-planning"]),
  cs("cs-ut-am", "utah-asset-management-review", "Asset management program review", `Utah Department of Transportation${FOUNDER}`, ["Utah"], "Before Rawlins", "transport", ["asset-mgmt"]),
  cs("cs-va-maint", "virginia-performance-based-maintenance-review", "Review of performance-based highway maintenance contracts", `Virginia Department of Transportation${FOUNDER}`, ["Virginia"], "Before Rawlins", "transport", ["operations", "procurement", "pbmc"]),
  cs("cs-maint-model", "six-state-maintenance-outsourcing-model", "A flexible maintenance contracting model for DOTs", "AMOTIA (Association for the Management and Operations of Transportation Infrastructure Assets)", [], "Completed", "contractors", ["operations", "procurement", "outsourcing"]),
  cs("cs-pa-budget", "pennsylvania-maintenance-budgeting", "Maintenance budgeting", `Pennsylvania Department of Transportation${FOUNDER}`, ["Pennsylvania"], "Before Rawlins", "transport", ["finance", "operations"]),
  cs("cs-nyc-parks", "new-york-city-parks-asset-management", "Asset management for 29,000 acres of parkland", `New York City Parks and Recreation${FOUNDER}`, ["New York"], "Before Rawlins", "gov", ["asset-mgmt"]),
  /* no state tag: California isn't on the map */
  cs("cs-riverside", "riverside-county-fleet-and-facilities", "Facilities and fleet operations review", `Riverside County, California${FOUNDER}`, [], "Before Rawlins", "gov", ["operations", "asset-mgmt", "fleet"]),
  cs("cs-major", "major-river-crossings-and-transit", "Partnering on major river crossings and a light rail line", "Iowa, Illinois, Missouri, and Minnesota", ["Iowa", "Illinois", "Missouri", "Minnesota"], "Completed", "transport", ["program-delivery", "partnering", "owners-rep"]),
  // Backed by Rawlins partnering contracts in Fiscal > Contracts and Templates > Partnering. Jacob's portfolio describes partnering as limited because it doesn't include these records.
  cs("cs-partnering", "progressive-design-build-partnering", "Partnering facilitation for a progressive design-build bridge", "A state DOT and its contractor", [], "Ongoing", "transport", ["program-delivery", "procurement", "partnering", "alt-delivery", "construction"]),
  // Backed by Rawlins partnering contracts in Fiscal > Contracts and Templates > Partnering. Jacob's portfolio describes partnering as limited because it doesn't include these records.
  cs("cs-ia-partnering", "statewide-partnering-between-a-dot-and-its-construction-industry", "Statewide partnering between a DOT and its construction industry", "A state DOT and its construction industry", [], "Completed", "transport", ["partnering", "construction", "program-delivery", "alt-delivery"]),
  // Backed by Rawlins partnering contracts in Fiscal > Contracts and Templates > Partnering. Jacob's portfolio describes partnering as limited because it doesn't include these records.
  cs("cs-db-partnering", "partnering-through-construction-on-design-build-bridges-and-interstates", "Partnering through construction on design-build bridges and interstates", "State DOTs and their contractors", [], "Completed", "contractors", ["partnering", "program-delivery", "construction", "alt-delivery"]),
  /* Nov 13 (projects file v4, Part 3): page M */
  cs("cs-db-pursuit", "design-build-pursuit-advice-for-a-contractor", "Advice to a contractor through a design-build pursuit", "A contractor", [], "Completed", "contractors", []),
  cs("cs-pooled", "multi-state-drone-standards", "Multi-state drone standards and specifications", "A multi-state pooled fund study", [], "Ongoing", "gov", ["research", "drone-programs"]),
  // TODO(launch): needs the client's written OK before launch. The contract bars public material about the client's projects without written approval.
  cs("cs-pdn", "a-project-delivery-network", "A project delivery network: the process, the tools, the website, and the training", STATE_DOT, [], "Ongoing", "transport", ["portals", "automation", "training-video", "program-delivery", "preconstruction", "proj-delivery", "alt-delivery", "change-mgmt"]),
  cs("cs-tn-tech", "technology-modernization-and-ai-governance", "Technology modernization and AI governance", STATE_DOT, [], "Ongoing", "transport", ["tech-strategy", "data-governance", "ai", "exec-advisory", "change-mgmt"]),
  /* Nov 13 (projects file v4, Part 3): page J, page K, page R, page S */
  cs("cs-pd-prof", "position-descriptions-and-proficiency-programs", "Position descriptions and proficiency programs, bureau by bureau", STATE_DOT, [], "Ongoing", "transport", ["workforce", "org-design", "proj-delivery", "preconstruction", "construction", "planning", "federal-aid", "lpa", "procurement"]),
  cs("cs-pbmc2", "a-second-performance-based-maintenance-contract", "A second maintenance contract, built on the first one's lessons", STATE_DOT, [], "Completed", "transport", ["operations", "procurement", "partnering", "pbmc", "outsourcing"]),
  cs("cs-p3-division", "major-projects-p3-and-tolling-division", "A division for major projects, public-private partnerships, and tolling", STATE_DOT, [], "Ongoing", "transport", ["alt-delivery", "org-design"]),
  cs("cs-hr", "hr-procedures-orientation-and-onboarding", "HR procedures, orientation, and onboarding for a department", STATE_DOT, [], "Ongoing", "transport", ["workforce", "org-design", "change-mgmt", "training-video"]),
  // TODO(launch): purchase order read Nov 10: no publicity terms. Reconfirm current status and client permission. Keep the client unnamed.
  cs("cs-hi", "construction-standards-and-statewide-support", "A statewide assessment and a strategic roadmap", STATE_DOT, [], "Ongoing", "transport", ["construction", "portals", "program-delivery", "training-video", "drone-programs", "proj-delivery", "preconstruction", "operations", "exec-advisory", "tech-strategy"]),
  /* Nov 13 (projects file v4, Part 3): page L, page Q */
  cs("cs-harbor", "harbor-technology-demonstration", "A harbor technology demonstration, above and below the water", STATE_DOT, [], "Completed", "transport", ["drone-programs", "grants"]),
  cs("cs-knowledge", "construction-knowledge-site", "A construction knowledge site, cataloged and handed over", STATE_DOT, [], "Ongoing", "transport", ["portals", "data-governance", "dashboards", "construction", "ai"]),
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
  /* Nov 13 (projects file v4, Part 3): the new project pages' notes, as the file names them */
};
/* Nov 13 (projects file v4, Part 3): the new project pages carry the notes the file names */
CASE_STATUS["cs-pd-manual"] = CASE_STATUS["cs-transform"];
CASE_STATUS["cs-consult-flow"] = CASE_STATUS["cs-transform"];
CASE_STATUS["cs-lpa-manual"] = CASE_STATUS["cs-transform"];
CASE_STATUS["cs-mqa-fleet"] = CASE_STATUS["cs-transform"];
CASE_STATUS["cs-cam"] = CASE_STATUS["cs-transform"];
CASE_STATUS["cs-pd-prof"] = "Content status: work done through another firm. The client is not named until it is cleared.";
CASE_STATUS["cs-pbmc2"] = "Content status: work done through another firm. The client is not named until it is cleared.";
CASE_STATUS["cs-harbor"] = CASE_STATUS["cs-hi"];
CASE_STATUS["cs-db-pursuit"] = "Content status: the client is not cleared to name. Confirm there is no confidentiality term before launch.";
CASE_STATUS["cs-reorg"] = CASE_STATUS["cs-transform"];
CASE_STATUS["cs-measures"] = CASE_STATUS["cs-transform"];
CASE_STATUS["cs-knowledge"] = CASE_STATUS["cs-hi"];
CASE_STATUS["cs-p3-division"] = "Content status: work done through another firm. The client is not named until it is cleared.";
CASE_STATUS["cs-hr"] = "Content status: work done through another firm. The client is not named until it is cleared.";

/* Lines elsewhere that come from one of those projects carry its note too (keyed by the exact line). */
export const LINE_STATUS: Record<string, string> = {
  "Drone data that checked debris removal quantities, and proved correct when reports disagreed": CASE_STATUS["cs-drt"],
  "We've supported a state's drone response team with training, and used drone data to check debris removal quantities": CASE_STATUS["cs-drt"],
  /* content pass v7, Part 4: the Maintenance Programs row that comes partly from cs-drt */
  "Winter operations and emergency readiness": CASE_STATUS["cs-drt"],
  /* content pass v7, 5.2: project lines */
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


/* Nov 13: the card-level "To confirm" notes in the Websites, Portals & Digital Tools file (v2), preview only */
LINE_STATUS["**Accessibility, hosting, and security:** pages checked against Section 508 and WCAG, more than one language where needed, hosting and domain setup, security certificates, backups, access control, visitor analytics, and a privacy notice"] =
  "Content status: On the card \"Accessibility, hosting, and security,\" no record was found of a site checked against Section 508 or WCAG, or built in more than one language. Nicole to confirm.";
LINE_STATUS["**AI on the site:** search that answers from the site's own content, assistants, and document tools, with rules for their use"] =
  "Content status: On the cards \"AI on the site\" and \"Online services,\" no record was found of one built for a client. Listed at Nicole's direction as part of what the service covers.";
LINE_STATUS["**Online services:** event registration, booking and scheduling, sign-ups, surveys, online payments, and stores"] =
  LINE_STATUS["**AI on the site:** search that answers from the site's own content, assistants, and document tools, with rules for their use"];

/* Preview-only notes for a whole page (content pass v7: Owner's Representation, 2.11; Ports & Harbors, Part 6) */
/* services left out of the menu and their area page for now; their pages stay up (Nicole, Nov 13: Smart Mobility &
   Connected Systems, "for right now") */
export const LISTS_OFF = ["smart-mobility"];
export const isListed = (id: string) => !LISTS_OFF.includes(id);

export const PAGE_STATUS: Record<string, string> = {
  /* Nov 13: the "To confirm" note in the Strategy & Organization file (v2), preview only */
  "exec-advisory": "Content status: Interim leadership and program management office structuring are on the live site as services, so the card stays. No project in our records shows them delivered yet.",
  /* Nov 13: the "To confirm" notes in the Who We Work With file (v1), preview only */
  fed: "Content status: The peer exchange was delivered under a prime on a federal contract. Publicity terms not checked yet. No federal agency is a direct client in our records, so the page says the work runs through programs the states take part in.",
  local: "Content status: The city work started in September 2026 under a prime. Subcontract publicity terms not checked yet. Keep it unnamed.",
  eng: "Content status: The prime firms' subcontracts keep their information confidential. No firm is named, and no project on the site is marked as done through another firm. \"When your client needs more than the technology\" follows Jacob's Partner Field Guide, which is a draft for internal review. Jacob or Scott to confirm the offer can go on the site.",
  /* Nov 13: the "To confirm" notes in Nicole's Maintenance & Operations file (v10), preview only (Asset Management's and Maintenance Quality Assurance's came off: the work reports settle them) */
  fleet: "Content status: Nevada: the department's master agreement limits publishing information from the work. This page says what we did and nothing about what we found. Scott to confirm with the prime.",
  traffic: "Content status: Jacob's Nov 10 edition marks investment prioritization and reliability performance as proposed services, and says a full operations strategy has not been delivered. The page offers all three without claiming a project.",
  /* Nov 13: the "To confirm" notes in Nicole's Program & Project Delivery file (v6), preview only. Finance & Budget, Project
     Delivery, Alternative Delivery, Consultant & Contractor Procurement, Local Public Agency Programs, and Partnering have none. */
  "program-delivery": "Content status: Interim program leadership and program management office staffing are on the live site as services, so the line stays. No project in our records shows them delivered yet, and Jacob's portfolio asks leadership to define them before they are marketed as a standard service.",
  planning: "Content status: No metropolitan planning organization has been a Rawlins client yet. The metropolitan lines describe what we offer and what our people did in earlier roles. The statewide lines are Rawlins work.",
  "federal-aid": "Content status: Two states' work is behind this page so far, and most of it is local agency work.",
  grants: "Content status: Issuing grants and solicitations for an agency comes from our aviation team's interviews. No project in our records shows it yet. Applications are listed as prepared, and the one award is named.",
  // TODO(launch): Jacob's portfolio asks leadership to define this role: what authority it carries and how it avoids conflicts with other work for the same owner.
  "owners-rep": "Content status: Jacob's portfolio asks leadership to define this role: what authority it carries and how it avoids conflicts with other work for the same owner.",
  /* Nov 13 (Who We Work With read-as-built fixes v1): the To confirm text for Ports & Harbors */
  /* Nov 13: the "To confirm" note on the Challenges we hear lines in the Websites, Portals & Digital Tools file (v2), preview only */
  portals: "Content status: The last four lines are worded by the Branding chat from common website problems, not from a client record.",
  /* Nov 13: the "To confirm" notes in Nicole's Digital Solutions file (v5), preview only */
  "data-governance": "Content status: The reports through October 2026 show a governance steering committee chartered and facilitated weekly, a data policy, roles and decision rights, and a dataset inventory with owners and quality notes. They do not show a delivered data catalog or dictionary yet. Jacob to confirm.",
  ai: "Content status: The reports through October 2026 show AI strategy support, policy and governance documents, a commercial AI tool rolled out for one department, and use cases reviewed and ranked for a second. A first AI pilot, on cash-flow modeling, was starting in November 2026. Kobus or Jacob to confirm where it stands.",
  "training-video": "Content status: Overview videos for leadership, conferences, and legislators: no project in the reports through October 2026 shows one. Nicole to confirm.",
  "tech-strategy": "Content status: Pilot and proof-of-concept management: the reports through October 2026 show one technology pilot recommended to a department. Jacob to confirm what has run since.",
  "sub-ports": "Content status: The only work behind this page is one client's. The purchase order has no publicity terms. Jacob's portfolio says to reconfirm current status and client permission. Keep it unnamed. The grant application was submitted in July 2026 and was not awarded as of our Nov 2026 records. The demonstration was held in September 2026.",
};

export const caseHref = (c: CaseIndex) => `/insights/case-studies/${c.slug}`;

/* A project's categories (the areas shown on its card): the areas of the services it is tagged to. Nov 13 (Nicole): "you
   need to make sure every project has a category." Two projects are tagged to no service on purpose (projects file v4 takes
   the overview off the service pages, and the design-build pursuit has no service page), so theirs come from here. */
const CASE_AREAS_FROM: Record<string, { cases?: string[]; areas?: string[] }> = {
  // the overview: the areas of the eight projects it links to, the most used first
  "cs-transform": { cases: ["cs-pdn", "cs-pd-manual", "cs-consult-flow", "cs-lpa-manual", "cs-mqa-fleet", "cs-cam", "cs-reorg", "cs-measures"] },
  // design-build is Alternative Delivery, a Program & Project Delivery service
  "cs-db-pursuit": { areas: ["delivery"] },
};
const ownAreas = (c: CaseIndex) => Array.from(new Set(c.services.map((s) => serviceById(s)?.area.id).filter(Boolean) as string[]));
export const caseAreaIds = (c: CaseIndex): string[] => {
  const own = ownAreas(c);
  if (own.length) return own;
  const from = CASE_AREAS_FROM[c.id];
  if (from?.areas) return from.areas;
  if (from?.cases) {
    const n = new Map<string, number>();
    for (const id of from.cases) { const x = CASES.find((k) => k.id === id); if (x) for (const a of ownAreas(x)) n.set(a, (n.get(a) ?? 0) + 1); }
    return Array.from(n.entries()).sort((p, q) => q[1] - p[1]).map(([a]) => a);
  }
  return [];
};
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
          { title: "Featured services", items: i.featured.filter(isListed).map((id) => {
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
  ...AREAS.flatMap((a) => a.services.filter((s) => isListed(s.id)).map((s) => ({ label: s.name, kind: a.name, href: `/services/${a.slug}/${s.slug}` }))),
  ...VISIBLE_INDUSTRIES.map((i) => ({ label: i.name, kind: "Industry", href: industryHref(i) })),
  ...VISIBLE_INDUSTRIES.flatMap((i) => i.subsectors.map((s) => ({ label: s.name, kind: i.name, href: subsectorHref(i, s) }))),
  { label: "News & Recognition", kind: "Insights", href: "/insights/news" },
  { label: "Thought Leadership", kind: "Insights", href: "/insights/thought-leadership" },
  { label: "Research & Publications", kind: "Insights", href: "/insights/research" },
  { label: "Podcast: The Rawlins Way", kind: "Insights", href: "/insights/podcast" },
  { label: "Careers", kind: "About", href: "/careers" },
  { label: "Where we work", kind: "About", href: "/about/where-we-work" },
];
