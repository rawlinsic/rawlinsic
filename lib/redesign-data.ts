/* ─────────────────────────────────────────────────────────────
   Redesign site structure (dev site, branch `redesign`).
   Source: "Rawlins Site Wireframe v2 (Nov 2 2026).html" plus the
   case study drafts and service inventory in
   Rawlins Branding/services-nav-2026-10-29/.

   LINE NAMES ARE PLACEHOLDERS (Nicole, 2026-11-04). Rename a line by
   changing its `name` (and `menuName`) here; every page, menu and
   filter reads from this file.

   Source keys on each text field (`*Src`) say where the copy came
   from. Anything tagged "dai" or "aero" is from Jacob's internal
   catalogs and must be reviewed by Jacob before launch.
   ───────────────────────────────────────────────────────────── */

export type SrcKey =
  | "site" // current rawlinsic.com copy
  | "pfg" // Partner Field Guide v1 (Oct 12 draft, internal review)
  | "dai" // Jacob, Data/AI catalog (INTERNAL, review before publishing)
  | "aero" // Jacob, AERO catalog (INTERNAL, review before publishing)
  | "janine" // Janine Cooper, asset management answers
  | "voice" // Jacob, Brand Voice and Tone Kit (approved example)
  | "prop" // past proposal language
  | "rec" // our project records
  | "hr"; // HR Service Offerings deck

export type ContentStatus = "ok" | "warn" | "gap"; // ready | copy needed | needs SME content

export interface Service {
  id: string;
  slug: string;
  name: string;
  status: ContentStatus;
  activities: string[];
  industries: string[];
  related: string[];
  intro?: string;
  introSrc?: SrcKey;
  challenge?: string;
  challengeSrc?: SrcKey;
  walkAway?: string[];
  walkAwaySrc?: SrcKey;
}

export interface Line {
  id: string;
  slug: string;
  name: string;
  menuName: string;
  lead: string;
  leadSrc: SrcKey;
  steps: string[];
  image: string;
  services: Service[];
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/\//g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

type Raw = [
  string,
  string,
  ContentStatus,
  string[],
  string[],
  string[],
  Partial<Pick<Service, "intro" | "introSrc" | "challenge" | "challengeSrc" | "walkAway" | "walkAwaySrc">>?
];

const svc = (r: Raw): Service => ({
  id: r[0],
  slug: slugify(r[1]),
  name: r[1],
  status: r[2],
  activities: r[3],
  industries: r[4],
  related: r[5],
  ...(r[6] || {}),
});

/* ---------- INDUSTRIES ---------- */
export interface Industry {
  id: string;
  slug: string;
  name: string;
  short: string;
  lead: string;
  image: string;
}

export const INDUSTRIES: Industry[] = [
  { id: "dot", slug: "state-dots", name: "State Departments of Transportation", short: "State DOTs", image: "/images/pages/cs-hero-1.webp",
    lead: "Our core market and the source of our proof. Former DOT leaders working alongside current DOT staff." },
  { id: "local", slug: "local-regional-government", name: "Local & Regional Government", short: "Local & Regional", image: "/images/pages/cs-hero-6.webp",
    lead: "Cities, counties, MPOs, regional planning organizations, and public works departments." },
  { id: "aviation", slug: "aviation-aeronautics-airports", name: "Aviation, Aeronautics & Airports", short: "Aviation & Airports", image: "/images/pages/aam-aerial-view.webp",
    lead: "State aeronautics divisions, airports, and drone programs." },
  { id: "federal", slug: "federal-multi-state", name: "Federal & Multi-State Programs", short: "Federal & Multi-State", image: "/images/pages/cs-hero-8.webp",
    lead: "Pooled-fund research, national standards, and federally funded programs." },
  { id: "contractors", slug: "contractors-engineering-firms", name: "Contractors & Engineering Firms", short: "Contractors & Firms", image: "/images/pages/cs-hero-4.webp",
    lead: "Partnering facilitation and teaming on public projects." },
  { id: "private", slug: "private-sector", name: "Private Sector", short: "Private Sector", image: "/images/pages/auto-team.webp",
    // dai
    lead: "Organizations of roughly 50 to 500 people that are past needing to be told to adopt a CRM but don't have an in-house build team." },
  { id: "intl", slug: "international", name: "International", short: "International", image: "/images/pages/aam-skyline.webp",
    // Pending Scott and Andy's approval. Built on the dev site only.
    lead: "Transportation ministries and authorities outside the U.S." },
];

/* ---------- SERVICE LINES ---------- */
export const LINES: Line[] = [
  {
    id: "strategy",
    slug: "strategy-organization",
    name: "Strategy & Organization", // PLACEHOLDER NAME (vs Advisory / Agency Transformation)
    menuName: "Strategy & Organization",
    lead: "Planning, structure, people, and process work. It applies to any public agency, and to private organizations too.",
    leadSrc: "rec",
    steps: ["Discover", "Strategize", "Implement", "Optimize", "Sustain"],
    image: "/images/pages/strategy-bg.webp",
    services: ([
      ["strategic-planning", "Strategic Planning & Performance Management", "ok",
        ["Strategic plans and multi-year action plans", "KPI libraries, measure profiles, and dashboard roadmaps", "Program effectiveness assessments", "Prioritization frameworks, scoring criteria, and screening tools", "SWOT, benchmarking, and performance audits"],
        ["dot", "local", "aviation"], ["dashboards", "asset-mgmt", "data-governance"],
        { intro: "Translate leadership vision into measurable goals, developing roadmaps that balance short-term priorities with long-term organizational ambitions. Establish clear goals, measures, and feedback loops that tie team performance to strategic outcomes.", introSrc: "site",
          challenge: "“We have a strategic plan. We can't show it's working.” “We need a defensible way to decide what gets funded.”", challengeSrc: "pfg",
          walkAway: ["Performance measures, KPI inventories, and dashboard approaches tied to the plan's goals, plus the leadership rhythm to review them", "Prioritization frameworks, scoring criteria, screening tools, and a decision structure that holds up when someone asks why", "Action plan and monitoring frameworks that turn the plan into yearly work"], walkAwaySrc: "pfg" }],
      ["org-design", "Organizational Analysis, Design & Restructuring", "ok",
        ["Current and future-state org structure analysis", "Position descriptions, primers, and classification", "Salary compression, workload, and responsibility analysis", "Standing up new divisions"],
        ["dot", "local", "aviation"], ["ocm", "hr", "uas"],
        { intro: "Assess structures, processes, and culture to identify inefficiencies and surface opportunities for meaningful, data-informed improvement.", introSrc: "site",
          challenge: "“We're reorganizing, or standing up a new division.”", challengeSrc: "pfg",
          walkAway: ["Org design from current to future state", "Position descriptions, classification, and salary analysis", "Change communications for the transition"], walkAwaySrc: "pfg" }],
      ["ocm", "Organizational Change Management", "ok",
        ["Change strategy and leadership alignment", "Stakeholder engagement and change champion networks", "Reorganization communications", "Partnering facilitation on major programs"],
        ["dot", "local", "contractors", "private"], ["org-design", "ai", "leadership"],
        { intro: "Guide organizations through transformation with frameworks that earn buy-in, reduce friction, and sustain momentum across every level. Change work begins when an engagement defines who must act differently, and continues through handoff.", introSrc: "site",
          challenge: "A technically correct solution that is never built into normal work.", challengeSrc: "dai",
          walkAway: ["Vision and leadership alignment", "Stakeholder engagement and communications strategy", "Change champion network", "Risk and resistance management"], walkAwaySrc: "prop" }],
      ["workforce", "Workforce, Proficiency & Leadership Development", "warn",
        ["Technical specialist proficiency programs", "Leadership academies and manager workshops", "Career pathways and succession planning", "Knowledge transfer and retention strategy", "Course and curriculum design, computer-based training"],
        ["dot", "local", "aviation"], ["hr", "row", "uas"],
        { intro: "Skills and proficiency programs that connect training, demonstrated skills, reviews, and career progression.", introSrc: "prop",
          challenge: "“Our best people are retiring. Nobody's ready to step up.”", challengeSrc: "pfg",
          walkAway: ["Proficiency programs and career paths", "Training curricula and train-the-trainer models", "Self-paced online courses"], walkAwaySrc: "pfg" }],
      ["hr", "Human Resources & Talent Advisory", "warn",
        ["HR executive and division advisory", "HR process maps and RACIs", "Job classifications and salary surveys"],
        ["dot", "local"], ["workforce", "org-design", "automation"],
        { intro: "HR's role in a transformation: strategic workforce planning and talent management, change management and employee engagement, performance management and accountability, and compliance, policy, and risk management.", introSrc: "hr",
          walkAway: ["Assessments, analyses, and recommendations", "Salary surveys and job classifications", "Organizational and cost charts", "Primers and position descriptions", "Proficiency programs and performance management strategies"], walkAwaySrc: "hr" }],
      ["process", "Process, Procedure & Policy Improvement", "ok",
        ["Business process inventory and optimization", "Consolidated SOPs, manuals, and policies", "Quality manuals and review workflows", "Program reviews: environmental, utilities, freight, and internal audit"],
        ["dot", "local", "private"], ["automation", "program-delivery", "qa"],
        { intro: "Analyze and streamline end-to-end processes and procedures to reduce waste and risk, improve consistency, and strengthen operational performance.", introSrc: "site",
          challenge: "“Our procedures live in people's heads, or in five versions of the same binder.”", challengeSrc: "pfg",
          walkAway: ["A gap analysis of what exists", "Consolidated SOPs and policies", "A clear inventory of what is missing, outdated, or duplicated"], walkAwaySrc: "pfg" }],
      ["exec-advisory", "Executive & Administrative Advisory", "ok",
        ["Strategic advisory to executive leadership", "Interim leadership and PMO structuring", "Administrative program services", "Innovation pilot-to-production operating model"],
        ["dot", "local"], ["leadership", "ai", "strategic-planning"],
        { intro: "Streamline administrative functions by improving processes, controls, and reporting. Advisory, training design, facilitation, and executive coaching for agency administrative functions.", introSrc: "site" }],
      ["finance", "Finance, Budget & Procurement", "ok",
        ["Procurement advisory from solicitation to closeout", "Consultant contract administration", "Financial and utilization analysis", "Maintenance and performance-based budgeting"],
        ["dot", "local"], ["alt-delivery", "automation", "maintenance"],
        { intro: "Provide finance, budgeting, and procurement management to help organizations allocate resources effectively, maintain fiscal responsibility, and ensure compliance.", introSrc: "site",
          walkAway: ["Scope and solicitation development", "Proposal evaluation and source selection", "Cost and price analysis and negotiation", "Contract administration, compliance, and closeout"], walkAwaySrc: "prop" }],
      ["it-strategy", "Organizational IT & Technology Strategy", "ok",
        ["IT and innovation strategic plans", "Technology assessments before purchase"],
        ["dot", "local", "private"], ["discovery", "data-governance"],
        { intro: "Define how technology investments, platforms, and capabilities will support business goals, translating priorities into a practical roadmap for modernization, security, and measurable outcomes.", introSrc: "site",
          challenge: "“We bought the software, and nobody uses it.”", challengeSrc: "pfg",
          walkAway: ["Technology assessments before the purchase", "Setup, training, and change management so the tool becomes how work gets done"], walkAwaySrc: "pfg" }],
      ["legislative", "Legislative, Stakeholder & Communications Support", "warn",
        ["Legislative strategy and support", "Stakeholder and public communications"],
        ["dot", "aviation"], ["alt-delivery", "aam", "ocm"],
        { intro: "Communications plans, legislative analysis, and stakeholder-relations support for agency programs.", introSrc: "prop" }],
    ] as Raw[]).map(svc),
  },
  {
    id: "infrastructure",
    slug: "infrastructure",
    name: "Infrastructure",
    menuName: "Infrastructure",
    lead: "Program delivery, asset management, and operations for the organizations that build and run public infrastructure.",
    leadSrc: "rec",
    steps: ["Discover", "Strategize", "Implement", "Optimize", "Sustain"],
    image: "/images/pages/operations-bg.webp",
    services: ([
      ["program-delivery", "Program & Project Delivery", "warn",
        ["Project Delivery Network (PDN)", "Integrated Program Delivery", "Project management and project delivery manuals", "Program management and bridge program support", "Life-cycle cost analysis"],
        ["dot", "local"], ["process", "workforce", "dashboards"],
        { intro: "Support project teams from kickoff to close-out to deliver on time and within budget, managing risk, coordinating stakeholders, and ensuring quality deliverables.", introSrc: "site",
          challenge: "“Every manager runs projects their own way.”", challengeSrc: "pfg",
          walkAway: ["Project delivery manuals and playbooks", "Risk and quality tools", "Role-based training, built from what already exists"], walkAwaySrc: "pfg" }],
      ["leadership", "Program & Project Leadership / Owner's Representation", "ok",
        ["Interim program leadership", "Owner's representative", "Partnering facilitation for owners and contractors"],
        ["dot", "local", "contractors"], ["alt-delivery", "exec-advisory"],
        { intro: "Guide senior leaders in leading complex, multistakeholder programs and projects. Serve as the owner's representative: protecting your interests, coordinating contractors, and making sure scope, quality, schedule, and standards are met.", introSrc: "site",
          challenge: "“We outsource the work. We need the contractor held to it.”", challengeSrc: "pfg",
          walkAway: ["Owner's representation", "Partnering charters, issue resolution ladders, and team evaluations"], walkAwaySrc: "rec" }],
      ["alt-delivery", "Alternative Delivery & Procurement", "gap",
        ["Design-build, progressive design-build, CMAR, and P3 selection and documents", "Delivery-method selection matrices", "Pioneer Program and PDSA support"],
        ["dot", "contractors"], ["finance", "legislative", "leadership"],
        { intro: "Design-build, progressive design-build, CMAR, P3, and predevelopment agreements: project-selection criteria, standardized procedures, procurement documents, contract templates, decision tools, risk-allocation strategies, and delivery-phase controls.", introSrc: "prop" }],
      ["construction", "Construction & Pre-Construction", "gap",
        ["Construction management advisory", "Construction manuals and specifications", "Construction software implementation", "Constructability and claims support"],
        ["dot", "local", "contractors"], ["automation", "uas", "workforce"], {}],
      ["asset-mgmt", "Asset Management", "ok",
        ["Asset data foundation and inventories", "Performance-based management and levels of service", "Life cycle, risk, and investment strategy", "Asset management governance and implementation", "Local-agency asset management workshops"],
        ["dot", "local", "aviation"], ["data-governance", "dashboards", "maintenance"],
        { intro: "We help agencies align their expertise, digital tools, and physical assets, so every decision drives measurable results. Manage assets across their lifecycle to maximize value and performance while controlling cost and risk.", introSrc: "janine",
          challenge: "Rising material costs, changing technology, incomplete inventories, and too little money for deteriorating infrastructure. Many agencies make worst-first, reactive decisions in silos, which costs more over the life of the asset.", challengeSrc: "janine",
          walkAway: ["Research and connection to technology that fits the agency's needs", "Performance measures that support the organization's goals", "Life cycle and cost planning strategies", "Legislative assistance for innovative project delivery", "Proficiency programs that develop staff", "Frameworks that align asset data, performance management, and governance"], walkAwaySrc: "janine" }],
      ["maintenance", "Maintenance & Operations", "warn",
        ["Performance-based maintenance contracts", "Maintenance quality assurance programs", "Fleet and facilities optimization", "Winter operations training and tabletop exercises", "Maintenance rating programs"],
        ["dot", "local"], ["asset-mgmt", "finance", "uas"],
        { intro: "Optimize day-to-day operations and maintenance to reduce downtime, improve service reliability, and increase work execution efficiency.", introSrc: "site",
          challenge: "“Our field crews do it differently in every region.” “We outsource the work. We need the contractor held to it.”", challengeSrc: "pfg",
          walkAway: ["Performance-based contract specifications and deduction models", "Quality assurance programs", "Field assessments, operating standards, checklists, and crew training", "Tabletop exercises that test plans before an emergency does"], walkAwaySrc: "pfg" }],
      ["row", "Right of Way", "gap",
        ["Right of way and appraiser proficiency programs", "Right of way training, licensure, and manuals", "Right of way assessments and appraiser classification"],
        ["dot"], ["workforce", "process"], {}],
      ["traffic", "Traffic Operations & Safety", "gap",
        ["Transportation systems management and operations support", "Safety program coordination", "Traffic operations organization"],
        ["dot", "local"], ["dashboards", "org-design"], {}],
      ["lpa", "Local Public Agency & Federal Programs", "warn",
        ["LPA manuals, oversight, and certification", "Federal program development", "MPO support: performance reporting, TIP, and UPWP"],
        ["dot", "local", "federal"], ["grants", "program-delivery"],
        { intro: "For a Federal program to succeed, programmed funding must translate into projects that are ready to advance.", introSrc: "voice" }],
      ["qa", "Program Quality Assurance", "ok",
        ["Quality assurance and control frameworks", "Implementation strategies"],
        ["dot", "local"], ["process", "program-delivery"],
        { intro: "Embed quality governance, reviews, and feedback loops to ensure program deliverables meet defined standards and stakeholder expectations.", introSrc: "site" }],
    ] as Raw[]).map(svc),
  },
  {
    id: "data-ai",
    slug: "data-automation-ai",
    name: "Data, Automation & AI", // PLACEHOLDER NAME (vs Data Governance, Automation & AI)
    menuName: "Data, Automation & AI",
    lead: "Technology creates value only when trusted information reaches the right person or process and changes a decision, action, or result.",
    leadSrc: "dai",
    steps: ["Align", "Understand", "Prioritize", "Design", "Implement", "Adopt & sustain"],
    image: "/images/pages/technology-bg.webp",
    services: ([
      ["discovery", "Strategy & Discovery", "ok",
        ["Data, workflow, and AI readiness assessments", "Use-case discovery and ranking", "Integrated data, automation, and AI roadmaps"],
        ["dot", "local", "private"], ["it-strategy", "strategic-planning"],
        { intro: "The front door when a client has a broad mandate, competing priorities, or not enough evidence to choose an implementation. These engagements are valuable only when they end in a decision.", introSrc: "dai",
          challenge: "Leadership wants AI, but useful cases, readiness, risk, or ownership are unclear.", challengeSrc: "dai",
          walkAway: ["Ranked use cases, prerequisites, guardrails, success measures, and go or no-go decisions", "A coordinated roadmap that assigns each initiative to the right offering and sequence"], walkAwaySrc: "dai" }],
      ["data-governance", "Data Governance & Management", "ok",
        ["Governance operating model: project, program, or enterprise", "Ownership and stewardship", "Data inventory, glossary, and metadata", "Governance built into modernization work"],
        ["dot", "local", "private", "intl"], ["asset-mgmt", "strategic-planning"],
        { intro: "Turn uncertain, fragmented, or person-dependent data into governed information people can find, understand, and use. Most agencies have already done governance on paper; the value is in putting it into practice.", introSrc: "dai",
          challenge: "“Nobody can tell me which number is the right one.”", challengeSrc: "pfg",
          walkAway: ["Operating model and roadmap", "Stewardship model and RACI", "Policies and procedures", "Data catalog and dictionary", "Governance requirements built into existing processes", "Data readiness assessment for AI and automation"], walkAwaySrc: "dai" }],
      ["automation", "Automation & Integration", "ok",
        ["Workflow discovery", "Integrations on tools you already own", "Custom add-ins and extensions", "Documentation and handoff with no lock-in"],
        ["dot", "local", "private"], ["process", "finance", "hr"],
        { intro: "We connect existing systems and remove duplicate data entry so staff can spend less time moving information between applications. We document the workflow so the agency can maintain it.", introSrc: "voice",
          challenge: "“We key the same information into three systems.”", challengeSrc: "pfg",
          walkAway: ["Prioritized opportunity list", "Environment and constraints assessment", "Working integration or automation", "Exception-handling rules", "Documentation, training materials, and owned artifacts"], walkAwaySrc: "dai" }],
      ["ai", "AI Enablement & Governance", "ok",
        ["AI policy and guardrails", "Custom connectors and retrieval workflows", "Administering commercial AI platforms", "AI added to existing automated workflows"],
        ["dot", "local", "private", "intl"], ["ocm", "exec-advisory"],
        { intro: "Select and implement AI where judgment is needed, trustworthy context exists, and the result can be governed and used. Part of what we bring is telling you when a problem doesn't need AI at all.", introSrc: "dai",
          challenge: "“Our staff already use AI, and we have no policy for it.”", challengeSrc: "pfg",
          walkAway: ["Prioritized use-case list and readiness assessment", "Recommendation on where AI decisions sit and who is accountable", "A working AI implementation", "Responsible-use guardrails", "Documentation, training, and an owned tool"], walkAwaySrc: "dai" }],
      ["dashboards", "Dashboards, Reporting & Decision Tools", "warn",
        ["Power BI dashboards", "Project screening and scoring tools", "Interactive decision tools"],
        ["dot", "aviation", "local"], ["strategic-planning", "program-delivery", "aam"],
        { walkAway: ["Project screening and scoring tools with dashboards for capital programming"], walkAwaySrc: "pfg" }],
    ] as Raw[]).map(svc),
  },
  {
    id: "aeronautics",
    slug: "aeronautics",
    name: "Aeronautics", // PLACEHOLDER NAME (vs AERO in the menu)
    menuName: "Aeronautics",
    lead: "Converting an agency's interest in aerial technology into a program that is safe, compliant, funded, staffed, and durable enough to outlast the people who started it.",
    leadSrc: "aero",
    steps: ["Define the program", "Enable the system", "Deliver operations"],
    image: "/images/pages/aam-hero.webp",
    services: ([
      ["uas", "UAS Program Development & Sustainment", "ok",
        ["Program assessment and use-case development", "Organizational structure, policy, and SOPs", "Equipment and procurement guidance", "Pilot and crew training", "FAA compliance, performance measurement, and ROI"],
        ["aviation", "dot", "local"], ["workforce", "org-design", "construction"],
        { intro: "We help public agencies stand up, mature, and sustain drone and aeronautics programs that operate safely, comply with federal and state rules, and work across all of the agency's divisions instead of inside one champion's silo.", introSrc: "aero",
          challenge: "“We want drones in the field, safely and by the rules.”", challengeSrc: "pfg",
          walkAway: ["Program manuals, SOPs, checklists, templates, forms, and policies", "An onboarding program", "Training modules and animated computer-based training", "Equipment-selection matrices", "Org charts and role descriptions"], walkAwaySrc: "aero" }],
      ["aam", "Advanced Air Mobility Strategy & Readiness", "ok",
        ["Statewide AAM studies and phased roadmaps", "Local siting guidance", "Economic and environmental impact studies", "Vertiport and charging solicitations"],
        ["aviation", "dot", "local"], ["legislative", "dashboards", "grants"],
        { intro: "We help state agencies and other public bodies understand, plan, and prepare for advanced air mobility: statewide studies and phased roadmaps that bridge federal, state, and local concerns, local siting guidance, economic and environmental impact studies, policy development, and intelligence on the manufacturer ecosystem.", introSrc: "aero",
          challenge: "Advanced air mobility is coming whether the agency is ready or not, and the rules are still being written.", challengeSrc: "aero" }],
      ["aero-grants", "Grant Strategy & Funding Acquisition", "ok",
        ["Funding opportunity matching", "Grant applications: task structure, budget, and narrative", "Issuing grants on an agency's behalf"],
        ["aviation", "dot", "federal"], ["grants", "finance"],
        { intro: "We help agencies find, win, or issue the funding for programs they otherwise could not pursue: sourcing grants, drafting competitive federal applications, and helping agencies publish solicitations of their own.", introSrc: "aero",
          challenge: "“There's grant money out there. Nobody has time to chase it.”", challengeSrc: "pfg",
          walkAway: ["A complete competitive application with task structure, budget, and measurement plan", "Task structure and budget logic reusable for the next opportunity", "Or a published solicitation that attracts the right responses"], walkAwaySrc: "aero" }],
      ["funded", "Funded Program Implementation", "ok",
        ["Turning awards into working programs", "Multi-agency coordination"],
        ["aviation", "federal"], ["program-delivery", "uas"],
        { intro: "Coordinating the technology, governance, data, and training so an award survives the grant period, and agency staff don't become full-time federal program managers.", introSrc: "aero" }],
      ["research", "Applied Research, Standards & Convening", "ok",
        ["Pooled-fund research", "National guidelines and training modules", "Symposia and peer exchanges"],
        ["federal", "aviation"], ["research-x", "uas"],
        { intro: "Facilitating agencies, manufacturers, researchers, and regulators so the guidance states rely on is written with them, not around them.", introSrc: "aero" }],
      ["emergency", "Emergency Response & Disaster Operations", "warn",
        ["Drone response team setup and training", "Live video into emergency operations centers", "Emergency management support"],
        ["aviation", "dot"], ["uas", "maintenance"], {}],
    ] as Raw[]).map(svc),
  },
];

/* ---------- ACROSS EVERY LINE ---------- */
export interface Cross {
  id: string;
  slug: string;
  name: string;
  desc: string;
  related: string[];
  image: string;
}
export const CROSS: Cross[] = [
  { id: "training-x", slug: "training-workforce-development", name: "Training & Workforce Development", image: "/images/pages/auto-team.webp",
    desc: "Runs through every line: proficiency programs, leadership training, pilot training, and AI training.", related: ["workforce", "uas", "ai", "row"] },
  { id: "ocm-x", slug: "change-management", name: "Change Management", image: "/images/pages/auto-collab.webp",
    desc: "Every engagement plans for how people adopt the change.", related: ["ocm", "ai", "org-design"] },
  { id: "grants", slug: "grants-funding", name: "Grants & Funding", image: "/images/pages/aam-planning.webp",
    desc: "Grant strategy and applications for aeronautics, technology, and infrastructure programs.", related: ["aero-grants", "lpa", "funded"] },
  { id: "research-x", slug: "research-thought-leadership", name: "Research & Thought Leadership", image: "/images/pages/connectingdots.webp",
    desc: "National research, standards work, articles, and the podcast.", related: ["research"] },
];

/* ---------- NEW CASE STUDIES (public descriptors only) ----------
   Source: Rawlins Case Study Drafts v1 (Nov 2 2026).md. Results list
   only what our records state. These are added ALONGSIDE the existing
   state case-study pages (Nicole, 2026-11-04: not a replacement). */
export interface NewCaseStudy {
  id: string;
  slug: string;
  title: string;
  who: string;
  status: string;
  industry: string;
  services: string[];
  image: string;
  challenge: string;
  did: string[];
  results: string[];
}
export const NEW_CASE_STUDIES: NewCaseStudy[] = [
  { id: "cs-proficiency", slug: "workforce-proficiency-and-classification", image: "/images/pages/cs-hero-1.webp",
    title: "Workforce proficiency programs and position classification", who: "A Southeastern state DOT", status: "Ongoing", industry: "dot",
    services: ["workforce", "org-design", "hr", "process", "dashboards"],
    challenge: "A department-wide restructuring set out to cut supervision layers, widen spans of control, and update classifications, position descriptions, and performance measures. Each new classification needed a defined path staff could follow to reach proficiency, written with experts across dozens of disciplines.",
    did: ["Built discipline proficiency programs with agency experts: core and elective proficiencies, task sheets, and demonstration scoring sheets", "Drafted position descriptions and section primers for three bureaus", "Researched appraiser classifications nationwide and drafted a salary structure", "Designed and delivered a two-week advanced leadership program with the agency's HR team", "Supported a statewide transportation worker proficiency rollout and a staffing utilization method"],
    results: ["Utilization rate process and program complete and operational", "Transportation worker proficiency program handed to the statewide coordinator", "Appraiser classification, certification, and salary structure delivered"] },
  { id: "cs-txmaint", slug: "performance-based-maintenance-and-rating-program", image: "/images/pages/cs-hero-4.webp",
    title: "Performance-based maintenance contracting and a maintenance rating program", who: "A large Southwestern state DOT", status: "Completed", industry: "dot",
    services: ["maintenance", "alt-delivery", "asset-mgmt", "dashboards"],
    challenge: "The department wanted performance-based and flexible asset maintenance contracts that industry would bid on and districts could administer the same way, plus an agreed maintenance rating program that decisions could rely on.",
    did: ["Drafted special specifications for two districts' contracts", "Built a uniform deduction methodology and tracker", "Ran structured industry review and recommended responses", "Facilitated the maintenance rating program working group and built the rating matrix", "Developed a winter operations tabletop exercise concept"],
    results: ["Final draft specifications provided for district review and procurement preparation", "Final comments on the second district's specifications submitted"] },
  { id: "cs-pbmc", slug: "interstate-performance-based-maintenance-contracts", image: "/images/pages/cs-hero-5.webp",
    title: "Launching performance-based maintenance contracts on an interstate network", who: "A Southeastern state DOT", status: "Completed", industry: "dot",
    services: ["maintenance", "alt-delivery", "qa", "finance"],
    challenge: "The region moved interstate maintenance to performance-based contracts. That meant a measurable quality baseline, procurement with industry input, and administering two new contracts while staff and contractors learned the model together.",
    did: ["Converted maintenance quality metrics to pass/fail criteria and set the field assessment approach", "Reviewed field data from 268 interstate sample sites", "Supported an industry forum and drafted the scope, contract, and RFP", "Supported contractor onboarding with weekly advisory calls", "Calculated staffing, equipment, and cost offsets"],
    results: ["Two contracts awarded; Rawlins supported their administration", "Financial analysis completed and delivered"] },
  { id: "cs-transform", slug: "statewide-transformation-project-delivery", image: "/images/pages/cs-hero-9.webp",
    title: "Statewide transformation: project delivery, prioritization, and organization", who: "A Gulf South state DOT", status: "Ongoing", industry: "dot",
    services: ["program-delivery", "lpa", "maintenance", "org-design", "strategic-planning", "automation", "data-governance", "ai", "traffic"],
    challenge: "The department needed a more reliable way to select, prioritize, and deliver projects within scope, schedule, and budget, under public and legislative scrutiny, with decisions siloed by funding program.",
    did: ["Built and supported the Project Delivery Network: tools, templates, workflows, a website, and computer-based training", "Drafted a program development manual and project selection score sheets for more than a dozen programs", "Drafted local public agency manual chapters and training", "Finalized a maintenance quality assurance handbook", "Mapped consultant contracting steps and built working intake and review apps on the agency's existing platform", "Built current and future-state org charts and position descriptions"],
    results: ["Delivery training modules published for agency use", "Comment form, run sheet, and instructions deployed", "Maintenance quality assurance handbook v1.1 finalized"] },
  { id: "cs-pmdiv", slug: "standing-up-a-project-delivery-division", image: "/images/pages/cs-hero-3.webp",
    title: "Standing up a project delivery division", who: "A South-Central state DOT", status: "Ongoing", industry: "dot",
    services: ["org-design", "ocm", "workforce", "strategic-planning", "program-delivery"],
    challenge: "The department set out to make project management its own division, with the roles, measures, processes, and training to manage scope, schedule, cost, and risk consistently, and to bring staff through the change.",
    did: ["Recommended the division structure and initial build-out", "Drafted class specifications for new roles", "Developed delivery performance metrics with targets", "Built change management tools: swimlanes, RACI, and a change impact template", "Drafted a web-based project delivery manual and a set of project management courses"],
    results: ["Org chart for the initial division approved", "Final metrics compiled by the core team", "Change impact template and first manual sections finalized"] },
  { id: "cs-aero", slug: "state-aeronautics-program-support", image: "/images/pages/aam-aerial-view.webp",
    title: "State aeronautics program support: drones, AAM, and federal funding", who: "A Southeastern state aeronautics division", status: "Ongoing", industry: "aviation",
    services: ["uas", "aam", "aero-grants", "research"],
    challenge: "A small aeronautics staff needed to grow a statewide drone program, prepare the state and local governments for advanced air mobility, and compete for federal funding to pay for both.",
    did: ["Wrote and finalized statewide UAS operating procedures", "Built visual observer and sensor operator courses and train-the-trainer materials", "Planned and ran a statewide drone and AAM symposium", "Developed an AAM strategy and planning guidance for local governments", "Prepared a federal construction-technology grant application"],
    results: ["Symposium held", "Federal grant application submitted", "Updated UAS procedures finalized and distributed"] },
  { id: "cs-drt", slug: "drone-response-team-and-uas-governance", image: "/images/pages/aam-control-room.webp",
    title: "Statewide drone response team and UAS program governance", who: "A Southeastern state DOT", status: "Ongoing", industry: "aviation",
    services: ["emergency", "uas", "org-design", "legislative"],
    challenge: "Drone use had grown district by district, with inconsistent practices and training. The department also needed its drone response team ready to deploy in emergencies with live video into the emergency operations center.",
    did: ["Supported emergency drone response training and analyzed the results", "Coordinated live streaming into the emergency operations center", "Drafted waiver content and an updated concept of operations", "Revised statewide UAS procedures and drafted a program handbook", "Briefed senior leadership on a centralized governance model"],
    results: ["Response team training held and evaluated"] },
  { id: "cs-local-am", slug: "local-agency-asset-management-workshops", image: "/images/pages/cs-hero-6.webp",
    title: "Asset management workshops and action plans for local agencies", who: "A Midwestern state infrastructure office", status: "Completed", industry: "local",
    services: ["asset-mgmt", "lpa", "workforce"],
    challenge: "The state wanted local agencies to use asset management and funding optimization to plan their programs. Each community started from a different place.",
    did: ["Helped each agency name an asset management steering committee", "Ran self-assessment surveys and reviewed each agency's plans and inventories", "Led in-person workshops using the state's competency framework", "Built short, mid, and long-term action plans with each agency", "Prepared one-page materials for elected officials"],
    results: ["Workshops and action plans completed with local agencies"] },
  { id: "cs-workforce", slug: "workforce-strategy-analysis", image: "/images/pages/cs-hero-2.webp",
    title: "Workforce strategy analysis", who: "A Southeastern state DOT", status: "Completed", industry: "dot",
    services: ["hr", "workforce", "org-design"],
    challenge: "The department needed a clear picture of its vacancies, how divisions balance staffing supply and demand, and how peer agencies organize.",
    did: ["Drafted the peer benchmarking framework and peer selection criteria", "Grouped and analyzed vacancy data by level and tenure", "Analyzed filled versus open positions by division"],
    results: [] },
  { id: "cs-strategic", slug: "six-year-strategic-plan", image: "/images/pages/cs-hero-10.webp",
    title: "Six-year strategic plan, action plans, and performance management", who: "A Western state DOT", status: "Ongoing", industry: "dot",
    services: ["strategic-planning", "ocm", "legislative", "asset-mgmt", "dashboards"],
    challenge: "The department needed a strategic plan that staff at every level helped shape, turned into yearly actions with measures leadership could track.",
    did: ["Ran engagement with executive leadership, a core team, all-staff workshops and surveys, and partners", "Facilitated vision, mission, values, goals, and measures", "Built the action plan and monitoring frameworks", "Facilitated division and district workshops for the first-year action plan", "Built a performance measures inventory and profile template"],
    results: ["Final strategic plan complete", "Year 1 action plan complete", "Action plan tracking tool with progress dashboards in use"] },
  { id: "cs-aerodiv", slug: "establishing-a-state-aeronautics-division", image: "/images/pages/aam-policy-planning.webp",
    title: "Research on establishing a state aeronautics division and sustainable funding", who: "A Western state DOT", status: "Ongoing", industry: "aviation",
    services: ["research", "aero-grants", "aam", "org-design", "legislative"],
    challenge: "Aviation demands are changing: rural airports, drones, and advanced air mobility. The study asks how a broader aviation role could be organized, governed, and funded.",
    did: ["Built a nine-task research plan with three implementation models", "Compiled a 100-source literature review", "Facilitated a technical advisory panel"],
    results: [] },
  { id: "cs-pooled", slug: "multi-state-uas-standards", image: "/images/pages/aam-tech-network.webp",
    title: "Multi-state UAS standards and specifications", who: "A multi-state pooled fund study", status: "Ongoing", industry: "federal",
    services: ["research", "uas"],
    challenge: "State DOTs collect drone data for surveying, construction, and inspection with no shared, tested standard. They need standards they can write into specifications.",
    did: ["Organized working groups across six standard areas", "Facilitated subcommittee and consensus sessions", "Proposed a performance-based, sensor-neutral testing framework", "Compiled member states' existing standards"],
    results: [] },
  { id: "cs-partnering", slug: "partnering-progressive-design-build-bridge", image: "/images/pages/cs-hero-8.webp",
    title: "Partnering facilitation for a progressive design-build bridge", who: "A contractor and state DOT", status: "Ongoing", industry: "contractors",
    services: ["alt-delivery", "leadership", "legislative"],
    challenge: "The owner's first progressive design-build project. Owner and contractor had to agree on how they would work together through preconstruction under schedule pressure.",
    did: ["Facilitated the kickoff: project charter, partnership goals, and communication protocols", "Set up a five-rung issue resolution ladder", "Ran joint risk-rating breakouts", "Set up anonymous team evaluation surveys"],
    results: ["Kickoff held and summarized"] },
];

/* ---------- PEOPLE + PLACES ---------- */
// Source: Partner Field Guide. Photos are matched from lib/team-data.ts by name.
export const LEADERS: [string, string][] = [
  ["Scott Rawlins, P.E.", "Founder. Former Deputy Director and Chief Engineer, Nevada DOT"],
  ["April Blackburn, PMP", "Former CIO, CTO, and Interim Assistant Secretary of Finance and Administration, Florida DOT"],
  ["Dara Wheeler", "Former Chief Data and AI Officer and Chief Innovation Officer, Caltrans"],
  ["Mayela Sosa", "Former Division Administrator, FHWA Indiana and Hawaii Divisions"],
  ["Paul Steinman, P.E.", "Former Chief Operating Officer, Idaho Transportation Department"],
  ["Paul Schneider, P.E.", "Former member, FHWA California Division Executive Leadership Team"],
  ["Joey Paskey, P.E., PTOE", "Former Director of Public Works, City of Las Vegas"],
  ["Lance Grace", "Former Director, Office of Maintenance, Florida DOT"],
  ["Mark Geib, P.E.", "Former TSMO Division Administrator, Michigan DOT"],
  ["Ben Rawlins, P.E.", "Chief AI Strategy Officer. Leads the automation and AI team"],
];

// Our project records. Confirm before publishing.
export const STATES_SERVED = ["Tennessee", "Louisiana", "Texas", "Nevada", "Arkansas", "Michigan", "Florida", "North Carolina", "Illinois", "Alaska (pooled fund lead)"];

/* ---------- LOOKUPS ---------- */
export type ServiceRef = Service & { line: Line };
export const SERVICE_BY_ID: Record<string, ServiceRef> = {};
LINES.forEach((l) => l.services.forEach((s) => (SERVICE_BY_ID[s.id] = { ...s, line: l })));
export const CROSS_BY_ID: Record<string, Cross> = Object.fromEntries(CROSS.map((c) => [c.id, c]));
export const INDUSTRY_BY_ID: Record<string, Industry> = Object.fromEntries(INDUSTRIES.map((i) => [i.id, i]));

export const lineHref = (l: Line) => `/services/${l.slug}`;
export const serviceHref = (s: ServiceRef) => `/services/${s.line.slug}/${s.slug}`;
export const crossHref = (c: Cross) => `/services/${c.slug}`;
export const industryHref = (i: Industry) => `/industries/${i.slug}`;
export const caseHref = (c: NewCaseStudy) => `/insights/case-studies/${c.slug}`;

/** href + label for any related id (a service or an across-every-line page) */
export function refLink(id: string): { href: string; name: string; group: string } | null {
  const s = SERVICE_BY_ID[id];
  if (s) return { href: serviceHref(s), name: s.name, group: s.line.name };
  const c = CROSS_BY_ID[id];
  if (c) return { href: crossHref(c), name: c.name, group: "Across every line" };
  return null;
}

export const casesForService = (id: string) => NEW_CASE_STUDIES.filter((c) => c.services.includes(id));
export const casesForLine = (l: Line) =>
  NEW_CASE_STUDIES.filter((c) => c.services.some((id) => SERVICE_BY_ID[id]?.line.id === l.id));
export const servicesForIndustry = (indId: string) =>
  Object.values(SERVICE_BY_ID).filter((s) => s.industries.includes(indId));
