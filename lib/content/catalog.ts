/* GENERATED from wireframe v11 (final data) + handoff v7 section 4 (v12) by the redesign build.
   Edit content here or regenerate; source notes live in the `src`/`basis` fields and are never rendered. */
/* eslint-disable */
export type SvcData = { id: string; name: string; area: string; st: string; intro: string; hear: string[]; quote: boolean; deliver: string[]; walk: string[]; industries: string[]; related: string[]; xp: string[]; cases?: string[]; src: Record<string, string>;
  /* Nov 12 (Nicole's Operations & Maintenance file): intro paragraphs split on a blank line; links: phrases in the intro that open
     another service; done: the "Where we've done it" lines ("**Label:** text" sets the bold lead-in) */
  links?: Record<string, string>; done?: string[];
  /* the What we deliver section's title where the page has its own (Operations & Maintenance: "What this service covers") */
  deliverTitle?: string;
  /* Nov 13 (Program & Project Delivery file, v6): sub, the pages under this one, linked under What this service covers;
     doneLinks, a "Where we've done it" line (by its bold name) that opens a project page (by project id) */
  sub?: string[]; doneLinks?: Record<string, string>;
  /* doneTo: the project page each "Where we've done it" line opens, in line order (null: no project page). Projects file v4, Part 4, Nov 13 */
  doneTo?: (string | null)[];
  /* cards: the projects shown first under "Where we've done it", in this order; the page shows cards only (Where we've done it file v1, Nov 13) */
  cards?: string[];
  /* cardLinks: phrases in a scope card's title that open another service page (Asset Management, M&O file v10) */
  cardLinks?: Record<string, string>;
  /* Nov 13 (Websites, Portals & Digital Tools file v2): a "## " line in deliver is a small label over a group of cards;
     connect, "Services that connect to this one" (each service with its own line); xpAfterWork, "The experience behind it"
     as its own section after the project cards */
  connect?: { id: string; line: string }[]; xpAfterWork?: boolean };
export type AreaData = { id: string; name: string; tag: string; services: string[]; lead: string; hear: string[]; bring?: string[]; feature: { title: string; lead?: string; /* links: each stage lists its services as links (Program & Project Delivery, Nov 13) */ links?: boolean; steps: { t: string; d: string; services: string[]; areas?: string[] }[] }; keep: string; cases: string[];
  /* xp: "The experience behind it" on the area page (Program & Project Delivery area page file v1, Nov 13) */
  xp?: string[];
  /* xpAfter: the experience section sits after the area's own blocks, right before the featured projects (Digital Solutions file v5, Nov 13) */
  xpAfter?: boolean;
  /* lines: a short line per service on the area page's service panels, where the area has one (Nov 12, Operations & Maintenance) */
  lines?: Record<string, string> };
export type IndustryData = { id: string; ch: string[]; bring?: string[]; ways?: { t: string; d: string }[]; basis: string; services: string[]; people: string[][] };
export type SubsectorData = { id: string; name: string; st: string; deliver: string[]; walk?: string[]; xp?: string[]; services: string[]; intro: string; industry: string; ch: string[]; people: string[][]; basis: string; thin?: boolean };
/* Nov 13 (projects file v4): when, the project's dates; didLinks, a What we did line that opens another project page (one
   id, or several when the line names several); a What we did line starting "## " is a small heading over a group */
export type CaseData = { id: string; ch: string; when?: string; didLinks?: Record<string, string | string[]>; did: string[]; res: string[]; services: string[]; subsectors: string[]; industry: string; industry2?: string | null; tools?: string[]; figure?: { title: string; intro?: string; steps: { t: string; d: string }[] } };
export const SERVICES: Record<string, SvcData> = {
 "strategic-planning": {
  "id": "strategic-planning",
  "name": "Strategic Planning & Performance Management",
  "area": "strategy",
  "st": "ok",
  "intro": "We help leadership turn its direction into goals, measures, and yearly action plans, with dashboards that show whether the plan is working and a leadership rhythm to review them.\n\nWe build the plan with the people who will carry it out: executives, staff, and outside partners, through interviews, surveys, focus groups, and workshops. We stay through the first action plans and the monitoring that follows.",
  "hear": [
   "We have a strategic plan. We can't show it's working.",
   "We need a defensible way to decide what gets funded.",
   "We have to prove to legislators and the public that the money is well spent.",
   "The plan has to be shaped by staff at every level and turned into yearly actions."
  ],
  "quote": true,
  "deliverTitle": "What this service covers",
  "deliver": [
   "**Strategic plans:** mission, vision, and values, goals, strategies, and measures, built with leadership, staff, and partners",
   "**Multi-year action plans:** yearly actions by division and district, with a framework to monitor and evaluate them",
   "**Performance measure libraries and measure profiles:** every measure the agency uses, who owns it, where its data comes from, and its target",
   "**Dashboard roadmaps:** which measures leadership reviews, how often, and what has to be built to show them",
   "**Program effectiveness assessments:** how a program is working against what it was set up to do",
   "**Prioritization frameworks, scoring criteria, and screening tools:** a written method for choosing what gets funded",
   "**Peer benchmarking and best-practice reviews:** how other agencies plan, measure, and report"
  ],
  "walk": [
   "A strategic plan staff helped shape",
   "Performance measures, KPI inventories, and dashboard approaches tied to the plan's goals, plus the leadership rhythm to review them",
   "Prioritization frameworks, scoring criteria, screening tools, and a written record of how each decision was made",
   "Action plan and monitoring frameworks that turn the plan into yearly work"
  ],
  "industries": [
   "transport",
   "aviation",
   "gov",
   "private"
  ],
  "related": [
   "dashboards",
   "asset-mgmt",
   "data-governance"
  ],
  "xp": [
   "Our founder drove the development of Nevada DOT's five-year program of projects and its statewide asset management plan",
   "A former Federal Highway Administration executive set up an annual strategic planning process that reached every level of the California Division"
  ],
  /* the project cards under "Where we've done it", in this order (Strategy & Organization file v2, Nov 13) */
  "cards": ["cs-strategic", "cs-measures", "cs-de-tech", "cs-tn-it", "cs-pmdiv"],
  "src": {
   "intro": "Current rawlinsic.com copy",
   "hear": "Partner Field Guide v1",
   "walk": "Partner Field Guide v1"
  }
 },
 "org-design": {
  "id": "org-design",
  "name": "Organizational Design & Process Improvement",
  "area": "strategy",
  "st": "ok",
  "intro": "We design the organization from current to future state, with position descriptions, classification and salary analysis, and change communications. Then we work on the processes and procedures people use every day.\n\nWe do the work with the people who run each unit. An assessment starts from interviews and the unit's own documents, and a new structure comes with what staff need to move into it: position descriptions, primers, and a transition plan.",
  "hear": [
   "We're reorganizing, or standing up a new division.",
   "Our procedures live in people's heads, or in five versions of the same binder.",
   "We need fewer layers of supervision and a wider span of control.",
   "We don't have a clear picture of our vacancies, or of how peer agencies organize."
  ],
  "quote": true,
  "deliverTitle": "What this service covers",
  "deliver": [
   "**Current and future-state organizational analysis:** from assessment interviews to a proposed organization chart, compared with how peer agencies organize the same work",
   "**New divisions and offices:** the purpose of the function, its structure, its roles, and a hiring plan",
   "**Position descriptions, primers, and classification:** what each position does, what each section is for, and where each sits in the classification and pay structure",
   "**Transition planning:** tracking the move of staff into the new structure, what the structure costs, and a status report for leadership",
   "**Business process inventory and improvement:** process maps, responsibility charts, and where work stalls",
   "**Consolidated procedures, manuals, and policies:** one current version, with an inventory of what is missing, outdated, or duplicated",
   "**Program quality assurance frameworks:** how a program checks its own work"
  ],
  "walk": [
   "Organizational design from current to future state",
   "Position descriptions, classification, and salary analysis",
   "Consolidated procedures and policies, with an inventory of what is missing, outdated, or duplicated",
   "A transition plan, with a way to track it"
  ],
  "industries": [
   "transport",
   "aviation",
   "gov",
   "private"
  ],
  "related": [
   "change-mgmt",
   "workforce",
   "exec-advisory"
  ],
  "xp": [
   "Members of our team helped reorganize Michigan DOT around transportation systems management and operations",
   "A former Arkansas DOT Deputy Director led restructuring and performance improvement across operations"
  ],
  /* the project cards under "Where we've done it", in this order (Strategy & Organization file v2, Nov 13) */
  "cards": ["cs-tn-reorg", "cs-reorg", "cs-tn-amdiv", "cs-pmdiv", "cs-p3-division", "cs-tn-it", "cs-hr", "cs-pd-prof", "cs-workforce"],
  "src": {
   "intro": "live",
   "hear": "Partner Field Guide v1",
   "walk": "Partner Field Guide v1"
  }
 },
 "change-mgmt": {
  "id": "change-mgmt",
  "name": "Change Management",
  "area": "strategy",
  "st": "ok",
  "intro": "We help staff understand and adopt a change, whether it's a reorganization, a new system, or a new way of delivering work: a change plan, change champions, communication, and training.\n\nWe build change management into a reorganization, a new delivery process, or a technology project from the start, with the leaders who will carry the message.",
  "hear": [
   "A reorganization, a new system, or a new way of delivering work, and staff who have seen changes come and go before.",
   "We have to bring staff through the change.",
   "Staff, legislators, and the public all need to hear about the change."
  ],
  "quote": true,
  "deliverTitle": "What this service covers",
  "deliver": [
   "**Change strategy and leadership alignment:** what is changing, for whom, and what leaders will say and do",
   "**Change champion networks:** staff in each unit who carry the change and bring back what they hear",
   "**Change impact assessments and responsibility charts:** what changes for each role, and who decides, who does the work, and who is kept informed",
   "**Stakeholder, legislative, and public communications:** stakeholder registers, communications plans, talking points, and answers to common questions",
   "**Training and adoption support:** rollout workshops, training, and check-ins with the people affected after the change takes effect"
  ],
  "walk": [
   "A change strategy and communications plan",
   "A network of change champions inside the organization",
   "Tools to track change impacts by role",
   "Training tied to the new process"
  ],
  "industries": [
   "transport",
   "aviation",
   "gov",
   "private"
  ],
  "related": [
   "org-design",
   "workforce",
   "automation"
  ],
  "xp": [
   "A member of our team set up Florida DOT's statewide Organizational Change Management Office and oversaw change management plans for more than 30 projects, technology and non-technology alike",
   "Our team includes Nevada DOT's former Assistant Director of Operations, whose work centered on organizational leadership, development, and change management"
  ],
  /* the project cards under "Where we've done it", in this order (Strategy & Organization file v2, Nov 13) */
  "cards": ["cs-reorg", "cs-tn-reorg", "cs-pdn", "cs-pmdiv", "cs-tn-tech", "cs-proficiency", "cs-hr"],
  "src": {
   "intro": "live",
   "hear": "Written from our records",
   "walk": "Based on project records"
  }
 },
 "workforce": {
  "id": "workforce",
  "name": "Leadership and Workforce Development",
  "area": "strategy",
  "st": "ok",
  "intro": "We help agencies grow people into the jobs they need filled: proficiency programs, career paths, training curricula, train-the-trainer models, and self-paced online courses, plus the HR structure behind them.\n\nWe write each program with the agency's own experts in the discipline, roll it out to staff through workshops and academies, and hand it to the agency to run.",
  "hear": [
   "Our best people are retiring. Nobody's ready to step up.",
   "We're delivering a bigger program with fewer experienced people.",
   "Staff don't see a clear path to advance.",
   "We don't know how our divisions balance staffing supply and demand."
  ],
  "quote": true,
  "deliverTitle": "What this service covers",
  "deliver": [
   "**Technical specialist proficiency programs:** what staff at each level need to be able to do, with task sheets and scored demonstrations",
   "**Leadership academies and manager workshops:** curricula, facilitation, and executive coaching",
   "**Career pathways and succession planning:** classification series, career paths, and who is ready for which role",
   "**Knowledge transfer and retention strategy:** recording what experienced staff know while they are still on the job",
   "**HR advisory, process maps, classifications, and salary surveys:** how hiring, classification, and pay work today, and where they slow down",
   "**Course and curriculum design, computer-based training:** classroom, online, and self-paced courses",
   "**Engineer trainee and rotation programs:** rotation curricula by discipline for new engineers"
  ],
  "walk": [
   "Proficiency programs and career paths",
   "Training curricula and train-the-trainer models",
   "Self-paced online courses",
   "Job classifications, salary surveys, and position descriptions"
  ],
  "industries": [
   "transport",
   "aviation",
   "gov"
  ],
  "related": [
   "org-design",
   "change-mgmt",
   "drone-programs"
  ],
  "xp": [
   "A former Florida DOT leader on our team ran its statewide training, quality management, and policy programs",
   "A member of our team reworked Michigan DOT's maintenance training as its statewide maintenance program coordinator, and is active on AASHTO's TC3 training committee",
   "One of our trainers has led more than 8,000 classroom hours"
  ],
  /* the project cards under "Where we've done it", in this order (Strategy & Organization file v2, Nov 13) */
  "cards": ["cs-proficiency", "cs-pd-prof", "cs-pmdiv", "cs-hr", "cs-workforce", "cs-mqa-fleet", "cs-reorg", "cs-local-am"],
  "src": {
   "intro": "Past proposal language",
   "hear": "Partner Field Guide v1",
   "walk": "Partner Field Guide v1"
  }
 },
 "exec-advisory": {
  "id": "exec-advisory",
  "name": "Executive Advisory Services",
  "area": "strategy",
  "st": "ok",
  "intro": "We advise agency leaders on their biggest decisions: reorganizations, new programs, and how to run and deliver their programs. For administrative functions, we provide advisory, training design, facilitation, and executive coaching, with clear processes, controls, and reporting.",
  "hear": [
   "Leadership is stretched, and the decisions in front of it are big: a reorganization, a new program, a key seat left open.",
   "Every big decision we make is under public and legislative scrutiny.",
   "Leadership has to steer a technology modernization and decide how to govern AI.",
   "Our administrative processes, controls, and reporting have to hold up to review."
  ],
  "quote": true,
  "deliverTitle": "What this service covers",
  "deliver": [
   "**Strategic advisory to executive leadership:** standing support to an executive, with regular working sessions, time on site, and written recommendations",
   "**Interim leadership and PMO structuring:** a senior advisor in the seat, or a program management office set up, while the agency hires",
   "**Administrative program services:** advisory, training design, and facilitation for finance, human resources, procurement, and information technology",
   "**Leadership transition support:** briefings and handoff materials for incoming leaders",
   "**Support for new leaders:** 100-day plans for new directors, coaching for new executives, and interview panels for leadership hires"
  ],
  "walk": [
   "A senior advisor who has held the job before",
   "Interim leadership or a PMO structure while the agency hires",
   "Administrative processes, controls, and reporting that hold up to review"
  ],
  "industries": [
   "transport",
   "gov"
  ],
  "related": [
   "strategic-planning",
   "tech-strategy",
   "program-delivery"
  ],
  "xp": [
   "Our founder ran daily operations of a department with 1,800 employees and a budget over $1 billion",
   "Our team includes executives from the Michigan, Florida, Idaho, and Arkansas transportation departments, and Florida DOT's former Interim Assistant Secretary of Finance and Administration"
  ],
  /* closest projects (Nicole, Nov 11): cs-tn-tech is executive advisory; the others are the nearest fits */
  "cases": [
   "cs-tn-tech",
   "cs-pmdiv",
   "cs-aerodiv"
  ],
  /* the project cards under "Where we've done it", in this order (Strategy & Organization file v2, Nov 13) */
  "cards": ["cs-tn-tech", "cs-tn-reorg", "cs-reorg", "cs-pmdiv", "cs-measures", "cs-aerodiv", "cs-hi"],
  "src": {
   "intro": "Current rawlinsic.com copy",
   "hear": "Written from our records",
   "walk": "Based on executive-level advisory work orders and the service inventory"
  }
 },
 "program-delivery": {
  "id": "program-delivery",
  "name": "Program Development",
  "area": "delivery",
  "st": "ok",
  "intro": "A credible work program connects investment priorities with the projects the agency can actually advance. We help agencies clarify selection methods, readiness requirements, milestones, and responsibilities, so leadership has a clearer basis for its commitments and can act when conditions change.\n\nAn agency's commitments to its legislature and the public come down to events: a project let, started, substantially completed, or open to traffic. We help define those commitments precisely and manage the milestones behind them.",
  "hear": [
   "Projects keep missing the year they were promised.",
   "It's hard to explain why one project was chosen over another.",
   "Our multi-year highway and bridge program is over-programmed.",
   "Program decisions are siloed by funding program."
  ],
  "quote": true,
  "deliverTitle": "What this service covers",
  "deliver": [
   "**Investment priorities:** agency objectives turned into selection criteria and an investment process the department can explain",
   "**Project selection by program:** selection criteria, score sheets, and screening tools for each funding program",
   "**Work program development:** which projects go in which year, based on what is ready, what is funded, and who is available to deliver them",
   "**Program controls and reporting:** milestones, owners, exception rules, and the reporting leaders use to act",
   "**Program assessments and roadmaps:** why the system is missing its commitments, and a sequence of improvements with owners",
   "**Program development manuals:** selection, programming, and the call for projects, written down for the people who run them",
   "**Workload and capacity planning:** staff effort by discipline matched to the program, and a plan for what goes to consultants",
   "**Program quality assurance:** quality checks at set points in delivery, with the checklists staff use for them",
   "**Program and project leadership** for complex, multi-agency work, including interim program leadership and program management offices"
  ],
  "walk": [
   "A written project selection method, with its criteria and data definitions",
   "A sequenced program, with its assumptions and decisions on record",
   "Milestones for each project, and reporting that shows leaders which ones are slipping",
   "A roadmap that names the decisions and resources each improvement needs"
  ],
  "industries": [
   "transport",
   "aviation",
   "gov"
  ],
  "related": [
   "procurement",
   "workforce",
   "dashboards",
   "portals"
  ],
  "xp": [
   "Members of our team led major projects at Florida DOT and the North Carolina Turnpike Authority, including design-build",
   "One of our project managers managed a 13-mile, half-billion-dollar corridor project in Las Vegas",
   "Our founder drove the development of Nevada DOT's matrix-based project management program"
  ],
  /* the project cards under "Where we've done it", in this order (the order its lines had; Where we've done it file v1, Nov 13) */
  "cards": ["cs-pd-manual", "cs-tn-reorg", "cs-nv-om"],
  "src": {
   "page": "Nicole's Program & Project Delivery file, v6 (Nov 13, 2026), Part 2"
  }
 },
 "preconstruction": {
  "id": "preconstruction",
  "name": "Preconstruction",
  "area": "delivery",
  "st": "ok",
  "intro": "A project advances more reliably when every discipline knows what it must provide and when the next team needs it. We help agencies set up delivery frameworks, scoping methods, project management resources, and clearer handoffs, so staff share one process and the agency keeps its own technical judgment and decisions.\n\nPreconstruction is where a project gets defined: its scope, its estimate, its right of way, its utilities, its environmental clearance, and who manages it. We help make each of those a process staff can repeat, with responsibilities and dependencies written down.",
  "hear": [
   "Projects are scoped differently every time.",
   "Construction and maintenance see the design too late.",
   "New project managers don't know where to start.",
   "Right of way and utilities reach the project team too late.",
   "The estimate depends on who prepared it."
  ],
  "quote": true,
  "deliverTitle": "What this service covers",
  "deliver": [
   "**Project delivery frameworks** from concept study to readiness for advertisement, with an interactive manual",
   "**Every discipline's part in the process:** activities, deliverables, and handoffs for planning, survey, road design, bridge design, pavement, hydraulics, geotechnical, environmental, traffic engineering, highway safety, intelligent transportation systems, right of way, and utilities, with construction and maintenance review along the way",
   "**Quality and cost estimate checks:** set points in the process where every discipline's work and the cost estimate are checked",
   "**Concept scoping and project evaluation:** a repeatable way to scope a project idea and compare candidates on the same basis",
   "**Handoffs from design through award into construction,** written as business rules the agency's systems can follow",
   "**Project management functions:** the unit, the manual, and staff capability",
   "**Estimating methods and tools:** what an estimate has to contain at each stage, who reviews it, and the tools behind it",
   "**Right of way built into project delivery:** activities, handoffs, and a right of way strategy meeting",
   "**Right of way programs:** assessments, procedures, appraiser career paths, and proficiency programs for right of way staff",
   "**Utilities:** coordination, relocation practice, and what other states do",
   "**Environmental process reviews:** program reviews, reevaluations, and clearances"
  ],
  "walk": [
   "An agency-owned interactive manual and process map",
   "Scoring forms staff apply themselves",
   "A transition plan that moves projects already underway onto the new process",
   "A handoff map and business rules for design through award",
   "An estimating procedure and a review checklist",
   "Right of way activities, and a strategy meeting, built into the project schedule"
  ],
  "industries": [
   "transport"
  ],
  "related": [
   "proj-delivery",
   "program-delivery",
   "construction",
   "portals"
  ],
  "xp": [
   "We've built project delivery frameworks for three state DOTs, and each one looks different",
   "One of our right of way advisors spent 43 years in Florida DOT right of way, 33 as a supervisor or manager, and took part in more than 1,000 eminent domain mediations"
  ],
  /* Featured projects, in this order (content pass v7, 2.4). cs-pmdiv, cs-pdn, and cs-transform carry their notes. */
  "cases": [
   "cs-tn-ipd",
   "cs-nc-ipd",
   "cs-pmdiv",
   "cs-pdn"
  ],
  /* the project cards under "Where we've done it", in this order (the order its lines had; Where we've done it file v1, Nov 13) */
  "cards": ["cs-pdn", "cs-tn-reorg", "cs-pmdiv", "cs-hi", "cs-pd-prof"],
  "src": {
   "page": "Nicole's Program & Project Delivery file, v6 (Nov 13, 2026), Part 2"
  }
 },
 "owners-rep": {
  "id": "owners-rep",
  "name": "Owner's Representation",
  "area": "delivery",
  "st": "ok",
  "intro": "We represent the owner: protecting your interests, coordinating contractors, and checking that scope, quality, schedule, and standards are met.\n\nWhen an agency contracts work out, someone on its side has to read the contract against what is happening in the field. We do that alongside the agency's staff: regular calls with the contractor, field reviews, a close look at deficiencies and remedies, and advice when performance falls short. The agency keeps its decisions.",
  "hear": [
   "We outsource the work. We need the contractor held to it.",
   "Our projects are late or over budget.",
   "We have a major build and many agencies to coordinate.",
   "Budget and risk have to hold up under public scrutiny."
  ],
  "quote": true,
  "deliverTitle": "What this service covers",
  "deliver": [
   "**Representation of the owner's interests:** an advisor on the owner's side in contract meetings and field reviews",
   "**Contractor and consultant coordination:** regular calls with the contractor and the agency on how the contract is being administered",
   "**Scope, quality, schedule, and standards oversight:** the work checked against the contract's requirements and standards",
   "**Commitment and risk tracking:** what each side has agreed to do, and the risks still open, kept on record",
   "**Contract start-up:** onboarding the contractor, mobilization, and launch",
   "**Performance reviews:** field reviews, deficiency and remedy calls, and scoring against the contract"
  ],
  "walk": [
   "A single point of accountability on the owner's side",
   "Regular reporting on scope, schedule, cost, and quality",
   "Issues raised early, with a record of how each was resolved"
  ],
  "industries": [
   "transport",
   "gov",
   "aviation"
  ],
  "related": [
   "program-delivery",
   "procurement",
   "operations"
  ],
  "xp": [
   "We've facilitated partnering, with risk registers and issue resolution, on a $1.2 billion Mississippi River crossing and a $2 billion light rail line"
  ],
  /* nearest owner-side work (Nicole, Nov 11); none of these is owner's representation, so the page calls them related */
  "cases": [
   "cs-pbmc",
   "cs-txmaint",
   "cs-major"
  ],
  /* the project cards under "Where we've done it", in this order (the order its lines had; Where we've done it file v1, Nov 13) */
  "cards": ["cs-pbmc", "cs-txmaint"],
  "src": {
   "page": "Nicole's Program & Project Delivery file, v6 (Nov 13, 2026), Part 2"
  }
 },
 "alt-delivery": {
  "id": "alt-delivery",
  "name": "Alternative Delivery",
  "area": "delivery",
  "st": "ok",
  "intro": "Choosing an alternative delivery method also changes the owner's job. We help agencies prepare their organization, staff, procedures, and decision methods for that change, and we support method selection and procurement readiness while the agency keeps its decisions.\n\nFaster delivery and lower cost are reasons to try a new method. Whether they follow depends on the project, the market, how risk is shared, and how ready the agency is to be that kind of owner.",
  "hear": [
   "This is our first project under a new delivery method.",
   "There is risk on this project that no one has allocated.",
   "How do we choose the right delivery method",
   "We want to use alternative delivery, and no one inside owns it."
  ],
  "quote": true,
  "deliverTitle": "What this service covers",
  "deliver": [
   "**Alternative delivery program development:** roles, manuals, procedures, and training for the agency's own team",
   "**Delivery method selection** across design-build, progressive design-build, construction manager at risk (also called construction manager/general contractor), and public-private partnerships",
   "**Procurement readiness:** scoring criteria and document review",
   "**The alternative delivery organization:** the division, its roles, and position descriptions",
   "**Design-build procurement manuals and documents:** the procurement manual, request for proposals language, and scoring method",
   "**Bridge bundling:** which bridges to bundle, and how to procure the bundles"
  ],
  "walk": [
   "A delivery method recommendation with selection criteria",
   "Delivery method manuals, procedures, and training",
   "A program design with roles and decision rights",
   "A decision record that gives the reasons, not only a ranking"
  ],
  "industries": [
   "transport",
   "gov",
   "contractors"
  ],
  "related": [
   "procurement",
   "program-delivery",
   "partnering"
  ],
  "xp": [
   "Our founder led Nevada DOT's Pioneer Program for public-private partnerships, design-build, and construction manager/general contractor",
   "A former executive at three state transportation departments on our team delivered public-private partnerships, alternative delivery contracts, and a managed lanes program",
   "We've researched progressive design-build nationally for a state DOT, written its peer review questions, and presented at its State of the Practice Workshop"
  ],
  /* related, not tagged: design-build and progressive design-build projects where our part was partnering (Nov 12 split) */
  "cases": [
   "cs-partnering",
   "cs-db-partnering"
  ],
  /* the project cards under "Where we've done it", in this order (the order its lines had; Where we've done it file v1, Nov 13) */
  "cards": ["cs-tn-psm", "cs-pdn", "cs-p3-division"],
  "src": {
   "page": "Nicole's Program & Project Delivery file, v6 (Nov 13, 2026), Part 2"
  }
 },
 "procurement": {
  "id": "procurement",
  "name": "Consultant & Contractor Procurement",
  "area": "delivery",
  "st": "ok",
  "intro": "We help organizations stay compliant and buy the services they need consistently, from solicitation through contract administration and closeout.\n\nBuying consultant work runs through several steps: the scope, the effort estimate, the evaluation, the negotiation, and how the work is managed afterward. We map that process with the units that run it, connect the steps, and write the procedures and templates. Where it helps, we build the workflow into a working system.",
  "hear": [
   "Consultant fees vary for comparable work.",
   "We need contracts industry will bid on, administered the same way in every district.",
   "Every advertisement gets assembled from scratch."
  ],
  "quote": true,
  "deliverTitle": "What this service covers",
  "deliver": [
   "**Procurement advisory** from solicitation to closeout",
   "**Consultant contract administration:** process documentation, templates, and invoice review, set against what other states do",
   "**Cost and price analysis and negotiation:** rate analysis, negotiation memo templates, and a negotiations manual",
   "**Consultant and professional services management:** fee methods, selection, and prequalification",
   "**Policies and procedures manuals** for professional services",
   "**Scope templates** by contract type and discipline",
   "**Advertisement and selection:** one-phase and two-phase processes, evaluation criteria, and scoring",
   "**Effort estimating and negotiation tools:** a tool that estimates the hours a scope should take, tied to the tasks in the delivery process",
   "**Consultant acquisition planning:** what goes to consultants, and when",
   "**Contract tracking and close-out:** an active contract list and a written close-out process",
   "**Contracting workflow systems:** intake, routing, scoring, generated letters, and invoice review"
  ],
  "walk": [
   "A procurement process that connects scope, effort, evaluation, negotiation, and contract management",
   "Manuals, templates, and flowcharts staff use",
   "Procedures for contract administration, compliance, and closeout",
   "A working system, when the agency wants one"
  ],
  "industries": [
   "transport",
   "gov"
  ],
  "related": [
   "program-delivery",
   "alt-delivery",
   "finance",
   "portals"
  ],
  "xp": [
   "One of our procurement specialists brings 35 years of government procurement in transportation and engineering services"
  ],
  /* the project cards under "Where we've done it", in this order (the order its lines had; Where we've done it file v1, Nov 13) */
  "cards": ["cs-tn-psm", "cs-consult-flow", "cs-pd-prof"],
  "src": {
   "page": "Nicole's Program & Project Delivery file, v6 (Nov 13, 2026), Part 2"
  }
 },
 "row": {
  "id": "row",
  // Off the site since Nov 12 (Nicole: remove; part of preconstruction). Kept for its text. Her note in the menu label also said:
  // "all tech specialty areas on PDN - these need to be mentioned on preconstruction" (not done; on the change list).
  "name": "Right of Way",
  "area": "delivery",
  "st": "warn",
  "intro": "Right of way readiness depends on timely information and coordinated work across the project team. We help agencies assess their right of way programs, improve procedures, define responsibilities and handoffs within project delivery, and develop the specialists the work depends on.",
  "hear": [
   "Experienced agents and appraisers are retiring",
   "Classifications and pay don't reflect the specialized work",
   "Right of way needs surface too late in design"
  ],
  "quote": false,
  "deliver": [
   "Right of way assessments and process improvement",
   "Right of way built into project delivery: activities, handoffs, and a right of way strategy meeting",
   "Acquisition, relocation, and property management procedures",
   "Right of way specialist and appraiser proficiency programs",
   "Appraiser classification series and salary structure",
   "Uniform Act compliance and local agency right of way support"
  ],
  "walk": [
   "Right of way procedures staff can follow, from acquisition through property management",
   "Proficiency paths for right of way specialists and appraisers",
   "Classifications and pay that match the work"
  ],
  "industries": [
   "transport",
   "gov"
  ],
  "related": [
   "workforce",
   "program-delivery",
   "lpa"
  ],
  "xp": [
   "One of our right of way advisors spent 43 years in Florida DOT right of way, 33 as a supervisor or manager, and took part in more than 1,000 eminent domain mediations"
  ],
  "src": {
   "intro": "Based on Southeastern DOT work orders (proficiency and appraiser classification); Ron Crew bio",
   "hear": "Written from our records",
   "walk": "Based on project records"
  }
 },
 "construction": {
  "id": "construction",
  "name": "Construction",
  "area": "delivery",
  "st": "ok",
  "intro": "Consistent construction administration depends on current guidance, clear decisions, and workable coordination among field staff, finance, contracts, suppliers, and contractors. We help agencies find the gaps in those processes, close them, and put more usable procedures in place.\n\nThe work reaches past the construction office. Payments involve finance and contractors. Materials information involves suppliers and laboratories. A manual may depend on a directive issued somewhere else. We bring those units together and write down what they agree.",
  "hear": [
   "Each district administers contracts differently.",
   "New construction software is in place, but the workflows still live on paper.",
   "Inspectors and technicians need a clear path to proficiency.",
   "Contract time, compliance paperwork, and payment cause the most friction with contractors.",
   "Our manuals and our directives don't say the same thing."
  ],
  "quote": true,
  "deliverTitle": "What this service covers",
  "deliver": [
   "**Construction administration and policy:** change orders, claims review, approval thresholds, and contractor payments",
   "**Construction manuals, policies, and inspection procedures:** written or updated to match current specifications and field practice",
   "**Construction software workflows:** how the work moves through the agency's inspection, materials, and contract systems, and where those systems overlap",
   "**Construction and maintenance input** at every step of project development",
   "**Construction, materials testing, and bridge inspection proficiency programs:** what staff at each level need to be able to do, with task sheets and workshops to roll them out",
   "**Field office staffing and organization:** staffing for each field office, and how district construction offices are organized",
   "**Claims and issue support:** the record organized, the issues laid out, and the discussion facilitated"
  ],
  "walk": [
   "A construction administration manual and inspection procedures",
   "Written workflows for the agency's construction software",
   "Proficiency programs for inspectors and technicians",
   "Reconciled guidance, with an owner for updates"
  ],
  "industries": [
   "transport",
   "gov",
   "contractors"
  ],
  "related": [
   "proj-delivery",
   "partnering",
   "drone-programs",
   "portals"
  ],
  "xp": [
   "Our team includes a former Arkansas DOT Chief Engineer of Operations who started as a field construction engineer",
   "A former Michigan DOT Engineer of Operations and Maintenance on our team chaired its negotiations with industry, which refined specifications, standard plans, and construction practices"
  ],
  /* the project cards under "Where we've done it", in this order (the order its lines had; Where we've done it file v1, Nov 13) */
  "cards": ["cs-cam", "cs-proficiency", "cs-pmdiv", "cs-pd-prof", "cs-hi"],
  "src": {
   "page": "Nicole's Program & Project Delivery file, v6 (Nov 13, 2026), Part 2"
  }
 },
 "lpa": {
  "id": "lpa",
  "name": "Local Public Agency Programs",
  "area": "delivery",
  "st": "ok",
  "intro": "We help states and local agencies with the manuals, oversight, certification, and training that keep local federal-aid projects moving.\n\nA state answers for the federal-aid projects its local agencies deliver. We help the state set up the program: who does what at headquarters, in the districts, and at the local agency; a manual that covers a project from start to closeout; a certification process; and training built on the manual.",
  "hear": [
   "Local agencies need clear manuals and oversight.",
   "Federal requirements land on lean teams.",
   "Each district oversees local projects its own way."
  ],
  "quote": true,
  "deliverTitle": "What this service covers",
  "deliver": [
   "**The local public agency manual:** chapters from federal-aid basics through financial management, including agencies that let their own contracts",
   "**Certification and oversight:** a certification process and an oversight policy",
   "**Training:** a core course on what a federal-aid project requires of a local agency, and training for the staff in responsible charge",
   "**Program structure:** roles for headquarters, districts, and local agencies",
   "**The local programs office:** assessment and organization"
  ],
  "walk": [
   "Local agency manuals and certification steps",
   "Training for local agency staff",
   "An oversight policy"
  ],
  "industries": [
   "transport",
   "gov"
  ],
  "related": [
   "federal-aid",
   "grants",
   "planning"
  ],
  "xp": [
   "A former Federal Highway Administration California Division leader on our team helped deliver the state's federal-aid program with Caltrans, 18 metropolitan planning organizations, and hundreds of local governments",
   "Our team includes the California Department of Transportation's former Chief of Planning and Local Assistance"
  ],
  /* the project cards under "Where we've done it", in this order (the order its lines had; Where we've done it file v1, Nov 13) */
  "cards": ["cs-lpa-manual", "cs-tn-reorg", "cs-pd-prof"],
  "src": {
   "page": "Nicole's Program & Project Delivery file, v6 (Nov 13, 2026), Part 2"
  }
 },
 "grants": {
  "id": "grants",
  "name": "Grant Applications & Delivery",
  "area": "delivery",
  "st": "ok",
  "intro": "We help agencies find funding, write applications reviewers can score, and put an award to work once it comes through. For agencies that award funds themselves, we help write and run the solicitation.",
  "hear": [
   "There's grant money out there. Nobody has time to chase it.",
   "We're a small staff competing for federal funding.",
   "New federal programs come with new rules.",
   "We're issuing grants of our own, and the solicitation has to draw the right responses."
  ],
  "quote": true,
  "deliverTitle": "What this service covers",
  "deliver": [
   "**Funding opportunity matching:** a running tracker of funding programs, matched to what the agency wants to do",
   "**Federal grant applications:** task structure, budget, narrative",
   "**Partners and support:** letters of support and coordination with the partners an application names",
   "**Issuing grants and solicitations on an agency's behalf:** writing the solicitation, publishing it, and evaluating what comes back",
   "**Turning awards into working programs:** the training, procurement, and progress reporting an award needs once it is won"
  ],
  "walk": [
   "A complete competitive application with task structure, budget, and measurement plan",
   "A task structure and a budget that can be used again for the next opportunity",
   "A published solicitation that attracts the right responses, when the agency is the one issuing grants"
  ],
  "industries": [
   "transport",
   "aviation",
   "gov"
  ],
  "related": [
   "drone-programs",
   "research",
   "procurement"
  ],
  "xp": [
   "A former Federal Highway Administration executive on our team helped 13 division offices roll out new federal grant programs",
   "Our proposal and grant team writes competitive federal applications"
  ],
  /* the project cards under "Where we've done it", in this order (the order its lines had; Where we've done it file v1, Nov 13) */
  "cards": ["cs-aero", "cs-harbor", "cs-pd-manual"],
  "src": {
   "page": "Nicole's Program & Project Delivery file, v6 (Nov 13, 2026), Part 2"
  }
 },
 "finance": {
  "id": "finance",
  "name": "Finance & Budget",
  "area": "delivery",
  "st": "ok",
  "intro": "We help organizations put resources where they count, with budgets tied to what the program has to deliver.\n\nMany of the budget questions agencies bring us are about a decision: what a reorganization will cost, whether to contract work out, how many people a function needs, what a pay change does to next year's request. We build the analysis from the agency's own numbers, with its finance and HR staff, so the answer holds up when it is presented.",
  "hear": [
   "Budgets aren't tied to what the program has to deliver.",
   "Our maintenance budget is hard to explain.",
   "We want to reorganize, and we have to stay inside the budget."
  ],
  "quote": true,
  "deliverTitle": "What this service covers",
  "deliver": [
   "**The cost of organizational change:** what a new structure costs in wages and benefits, position by position",
   "**Pay structure analysis:** salary surveys, compression analysis, and the budget effect of pay changes",
   "**Staffing and cost analysis:** what a function costs to run today, set against leading practice",
   "**Contract financial analysis:** the financial effect of contracting work out, built from the agency's contracts, fleet, fuel, and staffing records",
   "**Performance-based budgeting:** budgets tied to condition and service targets",
   "**Program funds management:** budget partitions, target allocations, and how estimate changes are handled",
   "**Financial and utilization analysis:** staff effort by discipline set against the work program, to show what the agency can deliver in house and what goes to consultants"
  ],
  "walk": [
   "Budgets tied to what the program has to deliver",
   "A budget that is easier to explain",
   "An analysis the agency can rerun when the numbers change"
  ],
  "industries": [
   "transport",
   "gov"
  ],
  "related": [
   "procurement",
   "program-delivery",
   "operations"
  ],
  "xp": [
   "Florida DOT's former Interim Assistant Secretary of Finance and Administration is on our team"
  ],
  /* the project cards under "Where we've done it", in this order (the order its lines had; Where we've done it file v1, Nov 13) */
  "cards": ["cs-tn-reorg", "cs-pa-budget"],
  "src": {
   "page": "Nicole's Program & Project Delivery file, v6 (Nov 13, 2026), Part 2"
  }
 },
 "planning": {
  "id": "planning",
  "name": "Statewide & Metropolitan Planning",
  "area": "delivery",
  "st": "ok",
  "intro": "We help agencies keep the long-range plan, the improvement program, and the work program connected, so the priorities in the plan carry through to what is programmed and to what is ready to deliver.\n\nFor a state department, that is the planning function itself: how it is organized, how the Statewide Transportation Improvement Program is built and kept current, and how it lines up with the asset management plan. For a metropolitan planning organization, it is meeting federal performance and certification rules with a lean staff.",
  "hear": [
   "The statewide program and the asset management plan don't agree.",
   "Keeping the transportation improvement program and the work program current takes everything we have.",
   "A federal certification review is coming.",
   "The federal performance-based planning and reporting requirements keep growing."
  ],
  "quote": true,
  "deliverTitle": "What this service covers",
  "deliver": [
   "**The planning organization:** how long-range planning, short-range planning, multimodal, freight, and local programs are organized and staffed",
   "**Statewide Transportation Improvement Program guidance:** grouped projects, fiscal constraint, and how the program lines up with the asset management plan",
   "**Performance-based planning and reporting:** the federal performance measures, target setting, and the reports that go with them",
   "**Project selection and prioritization methods:** criteria, scoring, and a record of why each project was chosen",
   "**Transportation improvement program and work program support:** building the improvement program and the planning work program, and keeping both current",
   "**Performance measures and progress tracking:** measures tied to the plan's goals, and a routine for reporting progress",
   "**Getting ready for federal certification reviews:** a review of documents and processes ahead of the federal review",
   "**Planning staff development:** proficiency programs for forecasting, modeling, data visualization, and statewide planning"
  ],
  "walk": [
   "A planning organization with clear roles",
   "Written guidance for the statewide program",
   "Performance measures and a reporting routine built around the federal requirements",
   "A project selection method the board can explain",
   "A readiness review ahead of certification"
  ],
  "industries": [
   "transport",
   "gov"
  ],
  "related": [
   "strategic-planning",
   "lpa",
   "dashboards"
  ],
  "xp": [
   "A former Federal Highway Administration California Division leader on our team helped deliver the state's federal-aid program with Caltrans, 18 metropolitan planning organizations, and hundreds of local governments",
   "One of our advisors gave state departments and metropolitan planning organizations technical assistance and training in performance-based planning and project prioritization, at the Federal Highway Administration",
   "A former Federal Highway Administration executive on our team worked with state departments, metropolitan planning organizations, and tribal and local governments on new federal grant programs",
   "Our team includes the California Department of Transportation's former Chief of Planning and Local Assistance"
  ],
  /* the project cards under "Where we've done it", in this order (the order its lines had; Where we've done it file v1, Nov 13) */
  "cards": ["cs-tn-reorg", "cs-pd-manual", "cs-pd-prof"],
  "src": {
   "page": "Nicole's Program & Project Delivery file, v6 (Nov 13, 2026), Part 2"
  }
 },
 "proj-delivery": {
  "id": "proj-delivery",
  "name": "Project Delivery",
  "area": "delivery",
  "st": "ok",
  "intro": "From concept study to construction closeout, we help you set up the processes, handoffs, and tools that make project delivery consistent, and we stay while staff put them to use.\n\nA project delivery network (PDN) lays out every step of a project, what each discipline does at each step, who is accountable, and what must be finished before the project moves forward. We build it with the agency’s own experts, starting from the processes and tools they already use.",
  "hear": [
   "Every manager runs projects their own way.",
   "Our procedures live in people's heads, or in five versions of the same binder.",
   "Each district administers contracts differently.",
   "We find out what's missing when the next group is ready to start."
  ],
  "quote": true,
  "deliverTitle": "What this service covers",
  "deliver": [
   "**Project delivery frameworks** from concept study to readiness for advertisement, with an interactive manual",
   "**Project delivery manuals, playbooks, risk and quality tools, and role-based training,** built from what already exists",
   "**Construction and maintenance input** at every step of project development",
   "**The project management organization:** the unit, its roles, position descriptions, and measures",
   "**Project manager's manuals and training:** the manual, courses, and onboarding that new and experienced project managers work from",
   "**Toolkits:** scope of work, cost estimating, risk, commitment and status reports, and request forms",
   "**Rollout:** orientation, pilot projects, and a plan for projects already under way",
   "**A home for it:** a website with a searchable library, computer-based training, and a way for staff to ask for changes"
  ],
  "walk": [
   "An agency-owned interactive manual and process map",
   "A transition plan that moves projects already underway onto the new process",
   "A toolkit and training staff can reach when they need them",
   "A way to keep it current: owners, versions, and a comment process",
   "A construction administration manual and inspection procedures"
  ],
  "industries": [
   "transport"
  ],
  "related": [
   "preconstruction",
   "construction",
   "program-delivery",
   "portals"
  ],
  "xp": [
   "We've built project delivery frameworks for three state DOTs, and each one looks different"
  ],
  "cases": [
   "cs-tn-ipd",
   "cs-nc-ipd",
   "cs-pmdiv",
   "cs-pdn"
  ],
  "sub": [
   "preconstruction",
   "construction"
  ],
  /* the project cards under "Where we've done it", in this order (the order its lines had; Where we've done it file v1, Nov 13) */
  "cards": ["cs-pdn", "cs-pmdiv", "cs-tn-ipd", "cs-pd-prof", "cs-nc-ipd"],
  "src": {
   "page": "Nicole's Program & Project Delivery file, v6 (Nov 13, 2026), Part 2"
  }
 },
 "federal-aid": {
  "id": "federal-aid",
  "name": "Federal-Aid Programs",
  "area": "delivery",
  "st": "ok",
  "intro": "For a federal program to succeed, programmed funding must turn into projects that are ready to advance. We help states and local agencies get there.\n\nGetting a project ready means environmental work, right of way, utilities, design, and procurement, and each carries schedule and funding risk. So does oversight, when a local agency delivers the project and the state answers for it. We help agencies write the guidance, set the oversight, and prepare the staff who carry both.",
  "hear": [
   "Programmed funds don't turn into projects ready to advance.",
   "New federal programs come with new rules.",
   "Our local agencies are in responsible charge, and they need to know what that means."
  ],
  "quote": true,
  "deliverTitle": "What this service covers",
  "deliver": [
   "**Federal-aid program development and compliance:** how the program is set up to meet federal requirements, from eligibility through financial management",
   "**Local public agency manuals and training** for the staff in responsible charge of federal-aid projects",
   "**Statewide Transportation Improvement Program guidance:** grouped projects and fiscal constraint",
   "**Program guidance for federal funding programs:** selection score sheets, eligibility, and the federal correspondence that goes with them",
   "**Oversight of local projects,** sized to the risk",
   "**Benefit-cost analysis** with the federal tools"
  ],
  "walk": [
   "A review of the program that shows which projects are ready and what the others need",
   "Written guidance for the federal programs staff run",
   "Oversight steps sized to the risk"
  ],
  "industries": [
   "transport",
   "gov"
  ],
  "related": [
   "lpa",
   "grants",
   "program-delivery"
  ],
  "xp": [
   "A former Federal Highway Administration California Division leader on our team helped deliver the state's federal-aid program with Caltrans, 18 metropolitan planning organizations, and hundreds of local governments",
   "A former Federal Highway Administration executive on our team supported the leaders of 13 division offices"
  ],
  /* the project cards under "Where we've done it", in this order (the order its lines had; Where we've done it file v1, Nov 13) */
  "cards": ["cs-lpa-manual", "cs-pd-prof"],
  "src": {
   "page": "Nicole's Program & Project Delivery file, v6 (Nov 13, 2026), Part 2"
  }
 },
 "partnering": {
  "id": "partnering",
  "name": "Partnering",
  "area": "delivery",
  "st": "ok",
  "intro": "We facilitate partnering between public owners and contractors on major projects. We set it up and run it: the charter, the risk register, the issue resolution ladder, and team evaluations through closeout.\n\nPartnering works best when it is set up before the pressure builds: who is at the table, who owns each risk, what gets decided by when, and where an issue goes when the people closest to it can't settle it.",
  "hear": [
   "We have no agreed way to raise and resolve issues under schedule pressure.",
   "Schedule and risk have strained the relationship between owner and contractor.",
   "This is our first progressive design-build or construction manager project with a public owner."
  ],
  "quote": true,
  "deliverTitle": "What this service covers",
  "deliver": [
   "**Partnering facilitation** between an owner and its contractor, from kickoff through closeout",
   "**A kickoff** that sets the charter, shared goals, communication protocols, and an issue resolution ladder before the pressure builds",
   "**Joint risk workshops, recurring partnering sessions, and anonymous team surveys** reported to both sides",
   "**Owner and contractor coordination** on major projects",
   "**Statewide partnering programs** between a department and its construction industry",
   "**Industry forums** between a department and its contractors"
  ],
  "walk": [
   "A signed partnering charter and an issue resolution ladder",
   "Regular team evaluations through the project",
   "A summary report after each session"
  ],
  "industries": [
   "transport",
   "gov",
   "contractors"
  ],
  "related": [
   "alt-delivery",
   "construction",
   "owners-rep"
  ],
  "xp": [
   "We've facilitated partnering, with risk registers and issue resolution, on a $1.2 billion Mississippi River crossing and a $2 billion light rail line",
   "We've prepared and moderated the first forum between a state DOT and its work zone industry association, with interviews on both sides beforehand"
  ],
  /* the project cards under "Where we've done it", in this order (the order its lines had; Where we've done it file v1, Nov 13) */
  "cards": ["cs-db-partnering"],
  "src": {
   "page": "Nicole's Program & Project Delivery file, v6 (Nov 13, 2026), Part 2"
  }
 },
 "asset-mgmt": {
  "id": "asset-mgmt",
  "name": "Asset Management",
  "area": "om",
  "st": "ok",
  "intro": "Asset management is how an organization brings together the right people, skills, and actions to make better decisions about its assets over time. It is more than the Transportation Asset Management Plan. It connects decisions across the whole organization.\n\nWe help agencies build that: a clear picture of what they own and what condition it is in, measures that connect strategy to field work, and a management structure that turns the agency's objectives into coordinated decisions.",
  "hear": [
   "We fix the worst first, and it costs us more over the life of the asset.",
   "No one owns asset management here.",
   "Each division makes its decisions on its own.",
   "We don't always know where our assets are, especially underground.",
   "Keeping the inventory current takes time and money we don't have."
  ],
  "quote": true,
  "deliverTitle": "What this service covers",
  "deliver": [
   "**The asset management organization:** the function's purpose, who owns the data, the analysis, and the budget recommendations, the organizational design, role descriptions, and support to its leaders as it starts up",
   "**Asset data foundation:** inventories, asset hierarchies, data collection specifications, and condition methods",
   "**Performance management:** levels of service, key performance indicators, and reporting tools",
   "**Life cycle and cost planning:** life cycle strategies and the timing of preservation work",
   "**Risk and resilience:** risk identification and risk management frameworks",
   "**Financial and investment strategy:** priorities based on condition, performance, and risk, aligned with programming and with federal requirements such as the Transportation Asset Management Plan",
   "**Governance and implementation:** policies, procedures, proficiency programs, and tracking of what gets put in place",
   "**Systems and data integration:** enterprise asset management systems and asset data governance",
   "**Asset information and assessment technology:** defining what information is needed, and comparing ways to collect and assess it, including automated methods checked against field assessment",
   "**Local agencies:** self-assessments, workshops, and action plans that start from where each agency is",
   "**Maintenance quality assurance, outsourcing, performance-based contracting, and fleet and facilities:** how condition is checked, who does the work, how a contract pays for it, and how the equipment and buildings behind it are managed"
  ],
  "walk": [
   "A functional model with role and responsibility definitions",
   "Performance measures that support the organization's goals",
   "Life cycle and cost planning strategies",
   "Frameworks that align asset data, performance management, and governance",
   "Research on technology that fits the agency's needs",
   "Proficiency programs that develop staff"
  ],
  "industries": [
   "transport",
   "gov",
   "aviation"
  ],
  "related": [
   "data-governance",
   "dashboards",
   "operations"
  ],
  "xp": [
   "Our founder drove the development of Nevada DOT's Transportation Asset Management Plan",
   "Before founding Rawlins, our founder led asset management reviews for the Utah and North Carolina transportation departments and New York City Parks",
   "One of our advisors has done life cycle cost analysis for highway assets on public and privately financed projects",
   "A former City of Las Vegas Director of Public Works on our team led the city's asset management programs"
  ],
  /* each name in the last card's title opens its page (M&O file v10, Nov 13) */
  "cardLinks": {"Maintenance quality assurance": "mqa", "outsourcing": "outsourcing", "performance-based contracting": "pbmc", "fleet and facilities": "fleet"},
  /* the project cards under "Where we've done it", in this order (M&O file v10, Part 3; Where we've done it file v1) */
  "cards": ["cs-tn-amdiv", "cs-strategic", "cs-local-am", "cs-measures", "cs-txmaint"],
  "src": {
   "page": "Nicole's Maintenance & Operations file, v10 (Nov 13, 2026), Part 2"
  }
 },
 "mqa": {
  "id": "mqa",
  "name": "Maintenance Quality Assurance",
  "area": "om",
  "st": "ok",
  "intro": "A maintenance quality assurance program shows whether the features an agency maintains meet expectations, and which maintenance needs come first. Some states call it a maintenance rating program.\n\nWe develop these programs so that the inventory, the condition standards, the way conditions are observed, and the way managers use the results all connect. The same program supports the agency's own management and, where maintenance is contracted, a performance-based contract.",
  "hear": [
   "We need a maintenance rating program decisions can rely on.",
   "Each district rates conditions its own way.",
   "We can't show which maintenance needs should come first.",
   "We outsource the work. We need the contractor held to it."
  ],
  "quote": true,
  "deliverTitle": "What this service covers",
  "deliver": [
   "**What to rate:** the assets and characteristics, how the results will be used, and whether the inventory is good enough to support it",
   "**Performance standards:** an observable standard for each feature",
   "**Sampling and rating:** sampling design, rating procedures, forms, and field data collection tools",
   "**Rater preparation and quality control:** training and checks so every district rates the same way",
   "**Piloting:** testing consistency, and deciding how results are rolled up and compared with service expectations",
   "**Scoring and targets:** condition against target, and what it costs to improve it, calculated from the agency's own data",
   "**The management routine:** explaining results, identifying priority needs, and connecting condition findings with budget and work planning",
   "**Contract use:** using the same standards to check a contractor's work",
   "**The handbook:** one document staff and contractors work from"
  ],
  "walk": [
   "Standards for each maintained feature",
   "Rating and sampling procedures, with the forms or app to collect them",
   "Training resources for raters",
   "A reporting structure",
   "Guidance for using the results, in a handbook"
  ],
  "industries": [
   "transport",
   "gov"
  ],
  "related": [
   "pbmc",
   "asset-mgmt",
   "dashboards"
  ],
  "xp": [
   "Florida DOT's former Director of Maintenance, who sponsored the modernization of its Maintenance Rating Program, is on our team",
   "Our team includes the owner's view and the contractor's view of how condition standards are measured"
  ],
  /* the project cards under "Where we've done it", in this order (M&O file v10, Part 3; Where we've done it file v1) */
  "cards": ["cs-pbmc", "cs-mqa-fleet", "cs-txmaint"],
  "src": {
   "page": "Nicole's Maintenance & Operations file, v10 (Nov 13, 2026), Part 2"
  }
 },
 "outsourcing": {
  "id": "outsourcing",
  "name": "Maintenance Outsourcing",
  "area": "om",
  "st": "ok",
  "intro": "We help agencies decide which maintenance work to keep in-house, which to contract, and which to combine, and then get ready to run the model they choose. The decision rests on what the work requires, the staff and equipment the agency has, the service it expects, and what the contractor market can provide.\n\nOur team includes people who have done this as owners and as contractors. That helps test whether the standards, the information, and the way risk is assigned will work in practice.",
  "hear": [
   "Our maintenance responsibilities keep growing, and our staff doesn't.",
   "We can't hire or keep enough maintenance staff.",
   "We don't know what it really costs us to do this work ourselves.",
   "We outsource the work. We need the contractor held to it."
  ],
  "quote": true,
  "deliverTitle": "What this service covers",
  "deliver": [
   "**Sourcing assessment:** the work required, the workforce and equipment the agency has, the service expected, and the contractor market available",
   "**Sourcing models:** the options compared, including the oversight and emergency responsibilities the agency keeps",
   "**In-house cost analysis:** the staff, equipment, and materials the work takes today, and the savings that could offset a contract",
   "**Contracting methods:** from staff support to full performance-based contracts, and how to combine them",
   "**Program requirements:** inventory assumptions, performance standards, measurement, payment logic, risk responsibilities, and exceptions, worked out with procurement and legal staff",
   "**Market engagement:** bringing industry and prospective bidders in before anything is advertised",
   "**Transition:** moving to the new model, and building the agency's ability to manage contracts"
  ],
  "walk": [
   "A sourcing assessment",
   "A recommended operating model",
   "Program requirements",
   "A performance and oversight framework",
   "Transition support"
  ],
  "industries": [
   "transport",
   "gov"
  ],
  "related": [
   "pbmc",
   "procurement",
   "finance"
  ],
  "xp": [
   "One of our advisors co-founded a performance-based asset maintenance firm that grew from two people to operations in 43 states",
   "A former Florida DOT district maintenance engineer on our team led a three-phase move to a performance-based contract that covers the department's maintenance in one county",
   "A former Michigan DOT division administrator on our team chaired the department's team in negotiating a five-year statewide contract with the County Road Association of Michigan"
  ],
  /* the project cards under "Where we've done it", in this order (M&O file v10, Part 3; Where we've done it file v1) */
  "cards": ["cs-pbmc", "cs-maint-model", "cs-mqa-fleet", "cs-nv-om"],
  "src": {
   "page": "Nicole's Maintenance & Operations file, v10 (Nov 13, 2026), Part 2"
  }
 },
 "pbmc": {
  "id": "pbmc",
  "name": "Performance-Based Maintenance Contracting",
  "area": "om",
  "st": "ok",
  "intro": "A performance-based maintenance contract pays a contractor to keep a road in a defined condition, instead of paying for each unit of work. Some states call these asset maintenance contracts or flexible asset maintenance contracts.\n\nWe help agencies develop the program, write the contract, take it to industry, and administer it once it is awarded.",
  "hear": [
   "Staff and contractors are learning a new contract model together.",
   "Every district administers the contract its own way.",
   "We outsource the work. We need the contractor held to it."
  ],
  "quote": true,
  "deliverTitle": "What this service covers",
  "deliver": [
   "**Program design:** which corridors or areas, what work is included, and for how long",
   "**Performance standards and measurement:** what the contractor is held to and how it is checked, tied to the quality assurance program",
   "**Baseline condition assessment:** the tools and training to score condition before the contract starts",
   "**Contract documents:** the scope, special specifications, and request for proposals",
   "**Cost estimate and work plan:** the contract's quantities, unit prices, and staffing, built from the asset inventory",
   "**Payment and deductions:** how the contractor is paid, and what happens when a standard is missed, applied the same way in every district",
   "**Contractor's-side review:** reading the agency's draft documents the way a bidder will",
   "**Industry review:** forums, comment matrices, and recommended responses before the contract is final",
   "**Contract administration:** contractor onboarding, regular advisory calls, field ride-alongs, and deduction tracking",
   "**Reviews of contracts already in place:** how they are working and what to change",
   "**Financial analysis:** the contract compared with the in-house cost",
   "**Lessons learned:** captured for the next contracts"
  ],
  "walk": [
   "Contract scope, specifications, and procurement documents",
   "A deduction method and a tracker to apply it",
   "Industry comments with recommended responses",
   "A financial analysis",
   "Support through the first contracts"
  ],
  "industries": [
   "transport",
   "gov"
  ],
  "related": [
   "mqa",
   "owners-rep",
   "procurement"
  ],
  /* hidden until Scott confirms (content fixes v1, 8.5): "We've piloted performance-based maintenance in a Michigan DOT region" */
  "xp": [
   "One of our advisors co-founded a performance-based asset maintenance firm that grew from two people to operations in 43 states",
   "Members of our team built Michigan DOT's performance-based maintenance program, at the agency and as its consultant",
   "Before founding Rawlins, our founder reviewed Virginia DOT's performance-based interstate maintenance contracts",
   "A former Michigan DOT region leader on our team led her region's pilot of the department's performance-based maintenance program"
  ],
  /* the project cards under "Where we've done it", in this order (M&O file v10, Part 3; Where we've done it file v1) */
  "cards": ["cs-pbmc", "cs-txmaint", "cs-pbmc2", "cs-nc-ipd"],
  "src": {
   "page": "Nicole's Maintenance & Operations file, v10 (Nov 13, 2026), Part 2"
  }
 },
 "fleet": {
  "id": "fleet",
  "name": "Fleet & Facilities",
  "area": "om",
  "st": "ok",
  "intro": "Fleet and facilities support every part of a transportation program. We help agencies manage them as assets: how equipment is chosen, shared, maintained, and replaced, what the buildings need, and who decides.\n\nThe work starts from the agency's own records: the inventory, how equipment is used, and how purchase, replacement, and facility decisions are made and documented today.",
  "hear": [
   "Every district chooses and replaces equipment its own way.",
   "Equipment sits unused in one district while another rents the same thing.",
   "Our facilities needs keep waiting."
  ],
  "quote": true,
  "deliverTitle": "What this service covers",
  "deliver": [
   "**The starting picture:** the assets, who decides, what depends on them, the records that exist, and the management questions to answer",
   "**How decisions are made:** a review of purchase, maintenance, replacement, and facility investment decisions and how they are documented",
   "**Fleet analysis:** the inventory, how it is used, what leadership expects of it, and where the gaps are",
   "**Selection, replacement, and disposal:** a process with criteria based on data, compared with other states",
   "**Own, lease, share, or rent:** the mix that fits the service level",
   "**Sharing and utilization:** what is shared today, what is underused, and a team that manages it",
   "**Equipment care:** policies, preventive maintenance measures, and training",
   "**Life cycle strategy:** the information and analysis a long-term fleet and facilities strategy needs",
   "**Facilities:** preservation needs grouped and costed",
   "**Responsibilities and implementation:** who owns what, the decision criteria, and a plan to put it in place"
  ],
  "walk": [
   "A management assessment with recommendations",
   "A side-by-side comparison with other states",
   "Decision criteria for replacement and disposal",
   "Reviewed policies and performance measures",
   "An implementation plan"
  ],
  "industries": [
   "transport",
   "gov"
  ],
  "related": [
   "asset-mgmt",
   "operations",
   "finance"
  ],
  "xp": [
   "Our founder drove the development of Nevada DOT's fleet program, which covered 2,700 pieces of equipment",
   "A former Michigan DOT division administrator on our team led a division that included statewide fleet and facilities",
   "Before founding Rawlins, our founder reviewed a county's fleet and facilities operations",
   "A former Florida DOT district maintenance engineer on our team led his district's move to a self-service motor pool"
  ],
  /* the project cards under "Where we've done it", in this order (M&O file v10, Part 3; Where we've done it file v1) */
  "cards": ["cs-nv-fleet-program", "cs-tn-amdiv", "cs-mqa-fleet"],
  "src": {
   "page": "Nicole's Maintenance & Operations file, v10 (Nov 13, 2026), Part 2"
  }
 },
 "operations": {
  "id": "operations",
  "name": "Maintenance Programs",
  "area": "om",
  "st": "ok",
  "intro": "We help agencies review how their maintenance program is organized and funded, tie the budget to a level of service, write the standards and procedures crews work from, and train the staff who apply them. We do the work with headquarters and district maintenance staff, so each district works from the same guidance.",
  "hear": [
   "Our field crews do it differently in every region.",
   "Maintenance costs keep climbing.",
   "Experienced people are retiring, and new staff need to learn the work."
  ],
  "quote": true,
  "deliverTitle": "What this service covers",
  "deliver": [
   "**Program reviews:** a statewide look at maintenance and operations: organization, budgeting, district operations, and performance management",
   "**Budgeting tied to performance:** level-of-service targets and what it costs to meet them",
   "**Pavement preservation:** selecting projects with data, and timing treatments",
   "**Operating standards and procedures:** written once and applied in every district, with field checklists",
   "**Warranty programs:** specifications and administration guides for warranted work",
   "**Training:** maintenance academies and courses for crews and supervisors",
   "**Proficiency programs:** what maintenance workers at each level need to be able to do, with modules, task sheets, and a rollout academy",
   "**Staffing and organization:** staffing analysis for maintenance facilities, and how headquarters and district maintenance are organized",
   "**Winter operations and emergency readiness:** plans, training, and tabletop exercises that test the plans",
   "**Maintenance in project development:** constructability and maintenance reviews built into the delivery process"
  ],
  "walk": [
   "A program assessment with recommendations",
   "Operating standards, procedures, and checklists",
   "Training courses and materials",
   "A tabletop exercise and what it showed",
   "A budget method tied to level of service"
  ],
  "industries": [
   "transport",
   "gov"
  ],
  "related": [
   "asset-mgmt",
   "traffic",
   "drone-emergency"
  ],
  "xp": [
   "Florida DOT's former Director of Maintenance, who led its statewide program, is on our team",
   "A former Michigan DOT division administrator on our team chaired its Statewide Maintenance Operations Alignment Team",
   "Before founding Rawlins, our founder reviewed Pennsylvania DOT's maintenance budgeting"
  ],
  /* the project cards under "Where we've done it", in this order (M&O file v10, Part 3; Where we've done it file v1) */
  "cards": ["cs-nv-om", "cs-proficiency", "cs-tn-leading", "cs-mqa-fleet", "cs-txmaint", "cs-hi"],
  "src": {
   "page": "Nicole's Maintenance & Operations file, v10 (Nov 13, 2026), Part 2"
  }
 },
 "traffic": {
  "id": "traffic",
  "name": "Traffic Operations & Safety",
  "area": "om",
  "st": "ok",
  "intro": "Operations investments need an organization and a delivery process that support safe, reliable use of the system. We help agencies connect operations with project development, maintenance, and investment decisions, through program reviews, guidance, and practical process support.",
  "hear": [
   "Operations and safety work is split across divisions.",
   "Operations projects compete with other needs, and we can't show their value the same way in every region.",
   "Our operations guidance, manuals, and standards are out of date.",
   "Traffic design staff need defined proficiencies."
  ],
  "quote": true,
  "deliverTitle": "What this service covers",
  "deliver": [
   "**Operations strategy and program development:** how the agency organizes, funds, prioritizes, and keeps up its operations and technology programs, including reviews of the plans it has",
   "**Capability assessment:** peer-practice and document reviews, a facilitated assessment, and an agreed list of gaps and actions",
   "**Investment prioritization:** criteria and evidence for safety, reliability, readiness, and operating cost, and a repeatable way to choose operations projects",
   "**Benefit-cost analysis:** the case for an operations improvement",
   "**Reliability performance:** explaining the federal reliability measures and connecting them to operations decisions",
   "**Guidance and manuals:** an inventory of governing documents, and guidance brought current with agency and peer practice",
   "**Operations in project delivery:** traffic and technology activities built into the delivery process",
   "**Traffic management centers:** reviews, stakeholder needs, and recommendations",
   "**Organization:** operations division structure, and where safety and operations work sits",
   "**Proficiency programs:** for traffic design staff: signing, pavement markings, and signals",
   "**Safety program coordination:** steps and checklists that bring safety projects through the delivery process"
  ],
  "walk": [
   "A program review with recommendations",
   "An assessment report with prioritized actions",
   "Updated guidance or manual content",
   "A benefit-cost case for an operations investment",
   "Proficiency programs for traffic design staff"
  ],
  "industries": [
   "transport",
   "gov"
  ],
  "related": [
   "operations",
   "org-design",
   "dashboards"
  ],
  "xp": [
   "Former Michigan DOT leaders on our team ran its operations division, including traffic and safety, and ran a region's intelligent transportation systems",
   "A former City of Las Vegas Director of Public Works on our team championed the city's Vision Zero initiative",
   "A former Michigan DOT Engineer of Operations and Maintenance on our team led the development of the department's operations and connected vehicle strategic plans",
   "One of our advisors led benefit-cost analysis work at the Federal Highway Administration",
   "We've calculated a benefit-cost ratio for a state DOT's interstate project with the federal operations benefit-cost tool, and trained its staff on a traffic operations system"
  ],
  /* the project cards under "Where we've done it", in this order (M&O file v10, Part 3; Where we've done it file v1) */
  "cards": ["cs-tn-leading", "cs-tn-reorg", "cs-nv-om"],
  "src": {
   "page": "Nicole's Maintenance & Operations file, v10 (Nov 13, 2026), Part 2"
  }
 },
 "portals": {
  "id": "portals",
  "name": "Websites, Portals & Digital Tools",
  "area": "tech",
  "st": "ok",
  "intro": "We plan, design, and build websites, and the portals and web-based tools that run on them. That can be a public site for an organization or a program, a portal where staff, clients, or partners sign in, or a working application with a database behind it.\n\nWe move manual tools and processes onto the web, automate the routine steps, and connect the site to the systems staff already use, so its tools and dashboards read from one place. We can take on the whole site or one part of it: structure and content, design, the build, SEO, accessibility, hosting, governance, and training for the people who keep it current. We review a full preview copy with the people who will use it before anything goes live.",
  "hear": [
   "Tools, manuals, and training spread across drives and intranet pages",
   "Five versions of the same form",
   "No clear way to request a change, or to know what changed",
   "Hundreds of documents sit on a separate, outdated site",
   "A process that still runs on spreadsheets and email",
   "Our website is out of date and hard to use on a phone",
   "We can't update our own site without a developer",
   "People search for what we do and don't find us"
  ],
  "quote": false,
  "deliverTitle": "What this service covers",
  "deliver": [
   "## Sites",
   "**Public websites:** organization, agency, and program sites, landing pages, and event pages, built new or redesigned, for phones and computers",
   "**Program websites and resource libraries:** the program's tools, manuals, and training in one place, with search, linked to the systems staff already use",
   "**Portals and intranets:** sign-in areas for staff, clients, and partners, each with the documents, tools, and updates that group needs",
   "**Design and content:** site structure, page writing and editing, visual design, photos, graphics, interactive diagrams and maps, and video",
   "**Search engine optimization (SEO):** page titles and descriptions, structured data, site maps, redirects, page speed, search console setup, and business listings",
   "**Sections staff keep current:** news and articles, job postings, event pages, team directories, podcasts, and video libraries",
   "## Tools and applications",
   "**Manual processes moved online:** spreadsheets, paper forms, and email hand-offs rebuilt as web-based tools, with the routine steps automated",
   "**Custom web applications:** an application built for one job, such as tracking requests, scoring projects, or producing a document from the answers to a form",
   "**Tools and generators:** scope of work, cost estimating, and templates tied to how the program works",
   "**Forms turned into web applications:** request forms and scoring tools rebuilt as web applications, in the organization's own account",
   "**Manuals and guidance online:** published as web pages and kept current",
   "**Change request systems:** submit, route, decide, update, and close out, with every decision recorded",
   "**Mapping and screening tools:** asset maps and project screening tools for program staff",
   "**Online services:** event registration, booking and scheduling, sign-ups, surveys, online payments, and stores",
   "## Data and connections",
   "**Databases behind the site:** one place that holds the records, so the site's tools, forms, and dashboards all read from it",
   "**Dashboards:** built on the site or brought in from the systems that hold the data, for staff, leadership, or the public",
   "**Integrations and automation:** the site connected to sign-in, document libraries, scheduling, finance, and project systems, so information is entered once and routine steps run on their own",
   "**AI on the site:** search that answers from the site's own content, assistants, and document tools, with rules for their use",
   "## Keeping it running",
   "**Website governance:** who owns each page and data source, how content is reviewed, updated, and retired, and who can change what",
   "**Website migrations:** every item reviewed and given a decision: keep, update, combine, move, or retire",
   "**Accessibility, hosting, and security:** pages checked against Section 508 and WCAG, more than one language where needed, hosting and domain setup, security certificates, backups, access control, visitor analytics, and a privacy notice",
   "**Review, training, and support:** a private preview copy where reviewers comment and edit wording, training and documentation for site owners, and updates after launch"
  ],
  "walk": [
   "A live site with one source of truth",
   "Tools and templates tied to how the program works",
   "A change process tracked from request to close-out",
   "Manual steps moved online and connected to the organization's other systems",
   "A site set up for phones, search engines, and accessibility",
   "Written rules for who owns and updates each part of the site",
   "The site, its accounts, and its content in the organization's name",
   "Site owners trained to keep it current"
  ],
  "industries": [
   "transport",
   "gov",
   "contractors"
  ],
  "related": [
   "automation",
   "training-video",
   "program-delivery"
  ],
  "xp": [
   "Florida DOT's former Chief Information Officer, who led its data governance, is on our team",
   "So is the nation's first Chief Data and AI Officer at a state department of transportation"
  ],
  "cards": [
   "cs-pdn",
   "cs-consult-flow",
   "cs-knowledge",
   "cs-pd-manual",
   "cs-hi"
  ],
  "xpAfterWork": true,
  "connect": [
   { "id": "automation", "line": "connects the site to the systems behind it, and automates the steps between them" },
   { "id": "data-governance", "line": "sets who owns the site's content and data, the definitions, and how both are kept current" },
   { "id": "dashboards", "line": "builds the dashboards the site shows, from the measures to the data behind them" },
   { "id": "ai", "line": "adds search, assistants, and document tools, with a policy for their use" },
   { "id": "training-video", "line": "produces the how-to and training videos published next to the tools they teach" },
   { "id": "tech-strategy", "line": "places the site in the organization's wider technology plan" }
  ],
  "src": {
   "intro": "Rawlins' own website and project delivery website records.",
   "hear": "Rawlins' own website and project delivery website records.",
   "walk": "Rawlins' own website and project delivery website records."
  }
 },
 "automation": {
  "id": "automation",
  "name": "Integration & Automation",
  "area": "tech",
  "st": "ok",
  "intro": "We connect the systems an organization already owns so information is entered once and moves on its own: construction management platforms linked to the rest of an agency's systems, repeated fields filled in once from trusted sources, and small custom apps where an integration platform does not fit. We document every workflow so the client's own team can run it.\n\nWe start from what a client already has, and build something new only when the existing systems cannot meet the need. Steps that follow a rule are automated. Steps that need judgment stay with a person or go to AI.",
  "hear": [
   "We key the same information into three systems.",
   "Our systems don't talk to each other.",
   "Field records disappear after the site visit.",
   "Handoffs run on email, spreadsheets, and scanned paper."
  ],
  "quote": true,
  "deliverTitle": "What this service covers",
  "deliver": [
   "**Workflow discovery:** with the staff who do the work",
   "**Integrations and automation:** on platforms the organization already owns (Make, Power Automate, Zapier, n8n, monday.com)",
   "**Small custom apps:** where an integration platform does not fit",
   "**Custom software and add-ins:** such as an accessibility compliance add-in for Word",
   "**Field and construction platforms:** connected to the rest of the agency's systems, so what the inspector records reaches the people who need it",
   "**Repeated project fields:** filled in once, from trusted agency sources",
   "**Exception handling and access control:** what happens when a step fails, and who can see and change what",
   "**Environment and constraints assessment:** network, servers, and access",
   "**Documentation and handoff:** written documentation and recorded walkthroughs, so the client's team owns and runs it"
  ],
  "walk": [
   "Prioritized opportunity list",
   "Working integration or automation",
   "Exception-handling rules",
   "Documentation, training materials, and files the client owns"
  ],
  "industries": [
   "transport",
   "gov",
   "private"
  ],
  "related": [
   "org-design",
   "procurement",
   "ai"
  ],
  "xp": [
   "Our automation team built Rawlins' own internal workflows, and builds the same kinds of workflows for clients"
  ],
  "cards": [
   "cs-consult-flow",
   "cs-pdn",
   "cs-pv-pmo"
  ],
  "src": {
   "intro": "Handoff v7 section 4.4 (systems connect thread)",
   "hear": "Partner Field Guide v1",
   "walk": "Data/AI catalog (internal)"
  }
 },
 "data-governance": {
  "id": "data-governance",
  "name": "Data Governance",
  "area": "tech",
  "st": "ok",
  "intro": "We turn uncertain, fragmented, or person-dependent data into governed information people can find, understand, and use. Where an agency has governance on paper, we start from it, and build owners, definitions, inventories, and storage rules into work already underway.",
  "hear": [
   "Nobody can tell me which number is the right one.",
   "We don't know what data we have, who owns it, or whether to trust it.",
   "Our data is fragmented, and it depends on whoever keeps it.",
   "We've done governance on paper. It isn't built into the work."
  ],
  "quote": true,
  "deliverTitle": "What this service covers",
  "deliver": [
   "**Governance at the right level:** a project, a program, or the whole enterprise",
   "**Data ownership and stewardship:** who owns each dataset, who keeps it, and who decides",
   "**Policies, standards, and procedures:** a data policy, and the roles, decision rights, and workflows behind it",
   "**Data inventory, glossary, and metadata:** what data exists, who owns it, what each term means, and how good it is",
   "**Governance built into modernization projects:** set up while a system is being replaced or a process is being rebuilt",
   "**Data readiness for AI and automation:** what has to be true of the data before a tool depends on it",
   "**Executive data governance steering committees:** a charter, an agenda, and regular facilitation",
   "**Records and document structures for programs:** how a program's files are named, organized, and tracked"
  ],
  "walk": [
   "Operating model and roadmap",
   "Stewardship model and responsibility chart",
   "Policies and procedures",
   "Data catalog and dictionary",
   "Data readiness assessment for AI and automation"
  ],
  "industries": [
   "transport",
   "gov",
   "private",
   "intl"
  ],
  "related": [
   "asset-mgmt",
   "strategic-planning",
   "ai"
  ],
  "xp": [
   "Florida DOT's former Chief Information Officer, who led its data governance, is on our team, and our founder led Nevada DOT's strategic data plan"
  ],
  "cards": [
   "cs-tn-tech",
   "cs-knowledge",
   "cs-pv-pmo"
  ],
  "src": {
   "intro": "Data/AI catalog (internal)",
   "hear": "Partner Field Guide v1",
   "walk": "Data/AI catalog (internal)"
  }
 },
 "ai": {
  "id": "ai",
  "name": "AI",
  "area": "tech",
  "st": "ok",
  "intro": "We put AI to work where judgment is needed, trustworthy context exists, and the result can be governed and used. When a problem needs a rule, a process, or a decision instead of a model, we say so.\n\nWe start with governance: who decides where AI is used, who is accountable, and which tools and data are approved. With that set, a tool is rolled out to staff with training and a policy they can follow.",
  "hear": [
   "Our staff already use AI, and we have no policy for it.",
   "We're not sure which problems actually need AI.",
   "Nobody has decided who pays for AI licenses or who manages them.",
   "We don't know if our data is ready for AI."
  ],
  "quote": true,
  "deliverTitle": "What this service covers",
  "deliver": [
   "**AI policy, governance, and responsible-use guardrails:** who decides, who is accountable, and which tools and data are approved",
   "**Use-case and readiness assessments:** candidate uses reviewed and ranked, including the ones that do not need AI",
   "**Setting up and administering commercial AI tools:** licensing, user onboarding, training, and rollout",
   "**Staff enablement and adoption:** training, communications, and support after rollout",
   "**Security review:** what data a tool can reach, and what leaves the organization",
   "**Custom connectors and retrieval workflows:** AI working from the organization's own information",
   "**AI added to existing automated workflows:** a model at the one step where judgment is needed",
   "**Pilot-to-production operating model:** how a pilot becomes a supported tool, or is stopped",
   "**Pilots on a single use case:** such as cash-flow forecasting"
  ],
  "walk": [
   "A ranked list of AI use cases, and the ones that don't need AI",
   "A working AI implementation",
   "Guardrails and a policy staff can follow",
   "Training and an owned tool"
  ],
  "industries": [
   "transport",
   "gov",
   "private",
   "intl"
  ],
  "related": [
   "tech-strategy",
   "org-design",
   "data-governance"
  ],
  "xp": [
   "The nation's first Chief Data and AI Officer at a state department of transportation is on our team"
  ],
  "cards": [
   "cs-tn-tech",
   "cs-knowledge"
  ],
  "src": {
   "intro": "Data/AI catalog (internal)",
   "hear": "Partner Field Guide v1",
   "walk": "Data/AI catalog (internal)"
  }
 },
 "dashboards": {
  "id": "dashboards",
  "name": "Dashboards & Reporting",
  "area": "tech",
  "st": "ok",
  "intro": "We build dashboards and scoring tools that put an organization's own data in front of the people making decisions, on platforms it already owns.\n\nWe start with the measures: what leadership wants to see, who owns each number, and where it comes from. Each dashboard is documented so the organization's own staff can keep it current.",
  "hear": [
   "Reports are built by hand every month, and no one is sure which number is right.",
   "We've outgrown our spreadsheets.",
   "Leaders need the big picture and each department's detail.",
   "We can't see where equipment is, how long it's booked, or when it's down."
  ],
  "quote": true,
  "deliverTitle": "What this service covers",
  "deliver": [
   "**Power BI dashboards:** built in the organization's own environment, on its own data",
   "**Project screening and scoring tools for capital programming:** criteria, weights, score sheets, and a ranked list",
   "**Position and workforce tracking dashboards:** positions, vacancies, and personnel transactions in one view",
   "**Program status dashboards and decision tools:** measures for executives, with the detail behind each",
   "**Maps and web platforms for program information:** asset and project maps for program staff"
  ],
  "walk": [
   "Project screening and scoring tools with dashboards for capital programming",
   "Dashboards on platforms the organization already owns, documented so its staff can update them",
   "A definition and an owner for each measure"
  ],
  "industries": [
   "transport",
   "aviation",
   "gov"
  ],
  "related": [
   "strategic-planning",
   "program-delivery",
   "asset-mgmt"
  ],
  "xp": [],
  "cards": [
   "cs-measures",
   "cs-strategic",
   "cs-pmdiv",
   "cs-pd-manual",
   "cs-knowledge",
   "cs-pv-pmo",
   "cs-txmaint"
  ],
  "src": {
   "intro": "Based on Power BI and position-tracking dashboards, project scoring tools, and action plan tracking records",
   "hear": "Written from our records",
   "walk": "Partner Field Guide v1"
  }
 },
 "training-video": {
  "id": "training-video",
  "name": "Videos",
  "area": "tech",
  "st": "ok",
  "intro": "We build short how-to videos and online courses with the experts who do the work, and publish them where staff already look.\n\nA video or course covers one task or tool. Courses are narrated and captioned, and they are published on the program's own site, next to the tool they teach.",
  "hear": [
   "Training depends on who your mentor was",
   "Manuals nobody reads",
   "New tools rolled out with no way to learn them",
   "Our people are retiring, and no one is ready"
  ],
  "quote": false,
  "deliverTitle": "What this service covers",
  "deliver": [
   "**Computer-based training modules:** self-paced courses, narrated and captioned",
   "**Short how-to videos:** one task or tool at a time",
   "**Overview videos:** for leadership, conferences, and legislators",
   "**Storyboards and scripts:** written with subject matter experts",
   "**Publishing:** on the program's site, next to the tool the training covers"
  ],
  "walk": [
   "Online courses and how-to videos",
   "Scripts reviewed by subject matter experts",
   "Training published on the program's site"
  ],
  "industries": [
   "transport",
   "gov",
   "private"
  ],
  "related": [
   "workforce",
   "portals",
   "change-mgmt"
  ],
  "xp": [],
  "cards": [
   "cs-pdn",
   "cs-aero",
   "cs-pmdiv",
   "cs-hr",
   "cs-hi"
  ],
  "src": {
   "intro": "Project delivery website records",
   "hear": "Written from our records",
   "walk": "Project delivery website records"
  }
 },
 "tech-strategy": {
  "id": "tech-strategy",
  "name": "Technology & AI Strategy",
  "area": "tech",
  "st": "ok",
  "intro": "This is where to start when there is a broad mandate, competing priorities, or not enough evidence to choose what to build. We assess what is in place, rank the options with leadership, and write the plan: what to build, what to buy, and in what order.\n\nAfter the decision, we help with setup, training, and change management for the staff who will use the tool.",
  "hear": [
   "We bought the software, and nobody uses it.",
   "Leadership wants AI, and no one is sure where it fits, whether we're ready, or who owns it.",
   "We need a technology roadmap tied to agency goals.",
   "We have a broad mandate, competing priorities, and not enough evidence to choose what to build."
  ],
  "quote": true,
  "deliverTitle": "What this service covers",
  "deliver": [
   "**Information technology and innovation strategic plans:** goals, initiatives, measures, and a work plan by year",
   "**Technology governance:** a steering committee, a project intake form, and a method for sizing and approving technology projects",
   "**Technology assessments before purchase:** requirements, overlap with systems already owned, and a review of the request for proposals",
   "**Data, workflow, and AI readiness assessments:** what is in place today, and what has to be true before a tool depends on it",
   "**Use-case discovery and ranking:** candidate projects ranked by value, readiness, and risk",
   "**Pilot and proof-of-concept management:** a defined test, success measures, and a go or no-go decision"
  ],
  "walk": [
   "Ranked use cases, prerequisites, guardrails, success measures, and go or no-go decisions",
   "A roadmap that assigns each initiative to the right work and sequence",
   "Setup, training, and change management for the staff who will use a new tool"
  ],
  "industries": [
   "transport",
   "aviation",
   "gov",
   "private",
   "intl"
  ],
  "related": [
   "ai",
   "data-governance",
   "exec-advisory"
  ],
  "xp": [
   "Florida DOT's former Chief Information Officer and Chief Technology Officer is on our team",
   "So is the nation's first Chief Data and AI Officer at a state department of transportation"
  ],
  "cards": [
   "cs-de-tech",
   "cs-tn-it",
   "cs-tn-tech",
   "cs-hi"
  ],
  "src": {
   "intro": "Data/AI catalog (internal)",
   "hear": "Partner Field Guide v1",
   "walk": "Data/AI catalog (internal)"
  }
 },
 "drone-programs": {
  "id": "drone-programs",
  "name": "Drone Program Development & Sustainment",
  "area": "aviation",
  "st": "ok",
  "intro": "We help agencies stand up, mature, and sustain a drone or aeronautics program that operates safely, follows federal and state rules, and works across every division, whether they're starting a program or strengthening one that already flies.",
  "hear": [
   "Drone use grew division by division, with different practices",
   "Pilots and crews need consistent, compliant training",
   "Equipment is bought without a standard",
   "A small staff has to grow a statewide drone program"
  ],
  "quote": false,
  "deliver": [
   "Program assessment and use-case development, including which maintenance and inspection tasks drones can support",
   "Organizational structure and governance",
   "Policy, standard operating procedures, and program handbooks",
   "Technology-neutral equipment selection and procurement guidance",
   "Pilot, visual observer, and sensor operator training, plus awareness training for staff who don't fly, including online courses",
   "Safety and regulatory compliance, including beyond-visual-line-of-sight waiver content",
   "Embedded operations support",
   "Performance measurement and return on investment",
   "Succession planning and a workforce pipeline for the program"
  ],
  "walk": [
   "Program manuals, procedures, checklists, templates, and policies",
   "Training modules and online courses",
   "Equipment selection matrices",
   "A program the whole agency follows"
  ],
  "industries": [
   "aviation",
   "transport",
   "gov"
  ],
  "related": [
   "drone-aam",
   "drone-emergency",
   "workforce"
  ],
  "xp": [
   "One of our aviation leads has run drone programs since 2018, including a nationwide network of pilots",
   "One of our advisors wrote first-of-their-kind guidance manuals on drones and advanced air mobility",
   "One of our engineers has performed and managed hundreds of complex and post-disaster bridge inspections with drones and rope access"
  ],
  "src": {
   "intro": "aviation catalog (internal)",
   "hear": "Written from our records",
   "walk": "aviation catalog (internal)"
  }
 },
 "drone-aam": {
  "id": "drone-aam",
  "name": "Advanced Air Mobility Strategy & Readiness",
  "area": "aviation",
  "st": "ok",
  "intro": "Agencies don't need to guess what advanced air mobility will mean for them. We break it into near-, medium-, and long-term steps across federal, state, and local concerns, then stay beside the agency as its reviewer while the technology and the rules catch up.",
  "hear": [
   "Local governments ask the state for guidance it doesn't have yet",
   "Siting and land use questions with no precedent",
   "Economic case for the investment",
   "Planning for advanced air mobility while the rules are still being written"
  ],
  "quote": false,
  "deliver": [
   "Statewide advanced air mobility studies and phased roadmaps",
   "Manufacturer and market tracking, in an interactive tool the agency owns",
   "Market, economic, and environmental impact studies",
   "Local siting guidance and land use, including environmental review for vertiport siting",
   "Agency policy, rule-making support, and tracking of federal, state, and local requirements",
   "Stakeholder outreach and symposia",
   "Solicitations and grants for vertiports, charging, and research, and evaluation of the responses"
  ],
  "walk": [
   "A statewide strategy and phased roadmap",
   "Planning guidance local governments can use",
   "Economic and market analysis to support decisions"
  ],
  "industries": [
   "aviation",
   "transport",
   "gov"
  ],
  "related": [
   "drone-programs",
   "strategic-planning",
   "grants"
  ],
  "xp": [
   "One of our advisors wrote first-of-their-kind advanced air mobility guidance manuals and serves on national committees",
   "Our team includes the California Department of Transportation's former Chief of Aeronautics"
  ],
  "src": {
   "intro": "aviation catalog (internal)",
   "hear": "Written from our records",
   "walk": "aviation catalog (internal)"
  }
 },
 "drone-emergency": {
  "id": "drone-emergency",
  "name": "Emergency Response with Drones",
  "area": "aviation",
  "st": "warn",
  "intro": "In an emergency, a drone team is only useful if it's trained, cleared to fly, and can get live video to the people making decisions.",
  "hear": [
   "Teams trained differently in each district",
   "Waivers and concepts of operations out of date",
   "No live feed into the emergency operations center"
  ],
  "quote": false,
  "deliver": [
   "Drone response team setup and training",
   "Live video into emergency operations centers",
   "Waivers and concepts of operations"
  ],
  "walk": [
   "A response team ready to deploy",
   "Live video procedures",
   "Updated waivers and concept of operations"
  ],
  "industries": [
   "aviation",
   "transport",
   "gov"
  ],
  "related": [
   "drone-programs",
   "operations"
  ],
  "xp": [
   // TODO(launch): needs the prime's and the client's written OK before launch. Both contracts bar public statements about the work without written consent.
   "We've supported a state's drone response team with training, and used drone data to check debris removal quantities",
   "One of our engineers has performed and managed hundreds of complex and post-disaster bridge inspections"
  ],
  "src": {
   "intro": "aviation catalog (internal)",
   "hear": "Written from our records",
   "walk": "aviation catalog (internal)"
  }
 },
 "research": {
  "id": "research",
  "name": "Research & Standards",
  "area": "aviation",
  "st": "ok",
  "intro": "We bring agencies, manufacturers, researchers, and regulators together so the guidance agencies rely on is written with them, not around them.",
  "hear": [
   "Agencies need guidance written with the people who will use it: states, manufacturers, researchers, and regulators.",
   "States collect the same drone data with no shared, tested standard.",
   "We need standards we can write into our specifications.",
   "Research has to reach consensus across many member states."
  ],
  "quote": true,
  "deliver": [
   "Multi-state pooled fund research and standards",
   "National research proposals and guidance manuals",
   "National training modules and technical briefs",
   "Symposia, peer exchanges, and working groups",
   "Literature reviews and state-of-practice scans"
  ],
  "walk": [
   "A shared data standard and recommended practices agencies can adopt",
   "Literature reviews and state-of-practice scans",
   "Symposia and peer exchanges",
   "Training modules built from the findings"
  ],
  "industries": [
   "aviation",
   "transport",
   "gov"
  ],
  "related": [
   "drone-programs",
   "grants"
  ],
  "xp": [
   "Members of our team serve on national drone and advanced air mobility committees",
   "Our team includes the California Department of Transportation's former Chief of Research, Innovation & System Information"
  ],
  "src": {
   "intro": "aviation catalog (internal)",
   "hear": "Written from our records",
   "walk": "Based on pooled fund, aeronautics research, and symposium records"
  }
 },
 "aero-division": {
  "id": "aero-division",
  "name": "Aeronautics Division & Program Establishment",
  "area": "aviation",
  "st": "warn",
  "intro": "As aviation changes, states are asking whether and how to organize, govern, and fund a broader aeronautics role. We help build that role, informed by a review of how peer states organize and fund theirs.",
  "hear": [
   "Rural airports, drones, and AAM fall between existing offices",
   "No stable funding source",
   "Legislative and governance options aren't clear",
   "The legislature has asked what role the department should play in aviation"
  ],
  "quote": false,
  "deliver": [
   "National scan of how states run aeronautics",
   "Organizational and operational analysis",
   "Governance, regulatory, and funding models",
   "Implementation options, legislative strategy, and draft legislative language for the agency's review"
  ],
  "walk": [
   "Implementation options with costs and tradeoffs",
   "A recommended structure and funding model"
  ],
  "industries": [
   "aviation",
   "transport"
  ],
  "related": [
   "org-design",
   "grants",
   "research"
  ],
  "xp": [],
  "src": {
   "intro": "aviation catalog (internal)",
   "hear": "Written from our records",
   "walk": "Based on project records"
  }
 },
 "smart-mobility": {
  "id": "smart-mobility",
  "name": "Smart Mobility & Connected Systems",
  "area": "tech",
  "st": "warn",
  "intro": "Vehicles, signals, chargers, and fleets now produce data an agency has to plan for, govern, and use. We help agencies get ready for connected and automated vehicles, tie fleet and telematics data into their own systems, and plan electrification and shared mobility so the pieces work together.",
  "hear": [
   "Connected vehicle data is coming, and we don't know who owns it or how to use it",
   "Our fleet and telematics systems don't talk to anything else",
   "We need a plan for electric vehicle charging"
  ],
  "quote": false,
  "deliver": [
   "Connected and automated vehicle readiness, including data governance for vehicle and roadside data",
   "Fleet and telematics integration, with an AI layer on top of the data you already collect",
   "Electrification and charging planning",
   "Shared and on-demand mobility planning",
   "Smart city roadmaps"
  ],
  "walk": [
   "A readiness plan with clear owners for each data stream",
   "Fleet and telematics data connected to the systems you already use"
  ],
  "industries": [
   "transport",
   "gov",
   "intl"
  ],
  "related": [
   "data-governance",
   "automation",
   "drone-aam"
  ],
  "xp": [
   "A member of our team led a global engineering firm's smart cities and innovation practice, with projects across the Middle East and Africa",
   "A member of our team led mobility engagements and a city data platform at a major automaker",
   "A member of our team contributed to the U.S. Department of Transportation's intelligent transportation systems program",
   "A former Michigan DOT leader on our team led its connected vehicle and operations plan",
   "Our team includes a former innovation and rail leader at the California Department of Transportation"
  ],
  "src": {
   "intro": "Handoff v7 section 4.5 (Andy, Steve Cook, Jen Pihl, Dara)",
   "hear": "Handoff v7 section 4.5",
   "walk": "Handoff v7 section 4.5"
  }
 }
};
export const AREAS: Record<string, AreaData> = {
 "strategy": {
  "id": "strategy",
  "name": "Strategy & Organization",
  "tag": "Direction, structure, & people",
  "services": [
   "strategic-planning",
   "org-design",
   "change-mgmt",
   "workforce",
   "exec-advisory"
  ],
  "lead": "We help agencies set a direction, organize around it, and prepare their people for the work. That covers strategic plans with measures and yearly action plans, organization design from current to future state, change management, proficiency programs and training, and advice to the executives leading the change. We do the work with agency staff, and the agency owns the result.",
  "hear": [
   "We have a strategic plan. We can't show it's working.",
   "We need a defensible way to decide what gets funded.",
   "We're reorganizing, or standing up a new division.",
   "Staff have seen changes come and go before.",
   "Our best people are retiring. Nobody's ready to step up.",
   "Leadership is stretched, and the decisions in front of it are big."
  ],
  "bring": [
   "Performance measures, KPI inventories, and dashboard approaches tied to the plan's goals, plus the leadership rhythm to review them.",
   "Prioritization frameworks, scoring criteria, screening tools, and a written record of how each decision was made.",
   "Organization design from current to future state, position descriptions, classification and salary analysis, and change communications.",
   "A change plan, a network of change champions inside the organization, communications, and training.",
   "Proficiency programs, career paths, training curricula, train-the-trainer models, and self-paced online courses.",
   "A senior advisor who has held the job, standing support to executives, and 100-day plans for new directors."
  ],
  "lines": {
   "strategic-planning": "Strategic plans, action plans, measures,\n& prioritization",
   "org-design": "Organization design, position descriptions,\n& procedures",
   "change-mgmt": "Change plans, champions, communications,\n& adoption",
   "workforce": "Proficiency programs, career paths, training, & HR",
   "exec-advisory": "Advice to executives, interim support,\n& leadership transitions"
  },
  "feature": {
   "title": "From plan to practice",
   "links": true,
   "lead": "The work runs in four stages: a plan, an organization shaped to carry it, people prepared for the change, and leadership tracking the result. Each of our services sits at one or more of those stages.",
   "steps": [
    {
     "t": "Plan",
     "d": "Goals, measures, and priorities people helped shape",
     "services": [
      "strategic-planning",
      "exec-advisory"
     ]
    },
    {
     "t": "Organize",
     "d": "Structure, roles, and processes that can carry the plan",
     "services": [
      "org-design",
      "exec-advisory"
     ]
    },
    {
     "t": "Prepare people",
     "d": "Proficiency paths, training, and leaders ready for the change",
     "services": [
      "workforce",
      "change-mgmt"
     ]
    },
    {
     "t": "Track",
     "d": "Action plans and dashboards leadership reviews",
     "services": [
      "strategic-planning",
      "dashboards"
     ]
    }
   ]
  },
  "keep": "",
  "xp": [
   "Our founder ran daily operations of a department with 1,800 employees and a budget over $1 billion",
   "A former Federal Highway Administration executive set up an annual strategic planning process that reached every level of the California Division",
   "Members of our team helped reorganize Michigan DOT around transportation systems management and operations",
   "A member of our team set up Florida DOT's statewide Organizational Change Management Office and oversaw change management plans for more than 30 projects, technology and non-technology alike",
   "A former Florida DOT leader on our team ran its statewide training, quality management, and policy programs"
  ],
  /* Featured projects (Strategy & Organization file v2, Nov 13) */
  "cases": [
   "cs-strategic",
   "cs-tn-reorg",
   "cs-proficiency"
  ]
 },
 "delivery": {
  "id": "delivery",
  "name": "Program & Project Delivery",
  "tag": "Programs, projects, procurement, & funding",
  "services": [
   "program-delivery",
   "finance",
   "planning",
   "proj-delivery",
   "preconstruction",
   "construction",
   "alt-delivery",
   "procurement",
   "federal-aid",
   "lpa",
   "grants",
   "partnering",
   "owners-rep"
  ],
  "lead": "From the projects an agency chooses to how it administers construction, we help owners set up the processes, decisions, and tools that make delivery consistent, and we stay while staff put them to use. We do the work with agency staff, and the agency owns the result.",
  "hear": [
   "Projects keep missing deadlines.",
   "There's grant money out there. Nobody has time to chase it.",
   "Every manager runs projects their own way.",
   "Our procedures live in people's heads, or in five versions of the same binder.",
   "How do we choose the right delivery method",
   "Each district administers contracts differently."
  ],
  "bring": [
   "Commitments defined precisely, readiness requirements for each project, and milestones with named owners, so leaders can act when conditions change.",
   "Funding strategy, grant narratives, budgets, and complete application packages, ready to submit.",
   "Project delivery manuals, playbooks, risk and quality tools, and role-based training, built from what already exists.",
   "A gap analysis of what exists, consolidated standard operating procedures and policies, and a clear inventory of what is missing, outdated, or duplicated.",
   "A screening method, a criteria guide, and a decision record, so the reasons for choosing a method are on file.",
   "A construction administration manual matched to current specifications, with approvals and decision paths written down."
  ],
  "lines": {
   "program-delivery": "Project selection, work programs, & commitment tracking",
   "finance": "Cost, staffing, & budget analysis for agency decisions",
   "planning": "Planning organization, program guidance, & federal requirements",
   "proj-delivery": "Delivery frameworks, manuals, & project management",
   "preconstruction": "Scoping, estimating, right of way, utilities, & handoffs",
   "construction": "Construction administration, manuals, & proficiency programs",
   "alt-delivery": "Program setup, method selection, & procurement readiness",
   "procurement": "Procurement manuals, scopes, selection, & contract administration",
   "federal-aid": "Program guidance, oversight, & project readiness",
   "lpa": "Manuals, certification, oversight, & training",
   "grants": "Funding strategy, federal applications, & putting awards to work",
   "partnering": "Charters, risk workshops, & issue resolution",
   "owners-rep": "Contract oversight on the owner's side"
  },
  "feature": {
   "title": "Across the project life cycle",
   "links": true,
   "lead": "A project starts in a program, moves through development and procurement, and ends with construction and close-out. Each of our services sits at one or more of those stages.",
   "steps": [
    {
     "t": "Plan",
     "d": "Selecting projects, setting the program by year, and funding it.",
     "services": [
      "program-delivery",
      "planning",
      "finance",
      "federal-aid",
      "lpa",
      "grants"
     ]
    },
    {
     "t": "Develop",
     "d": "Scope, design, right of way, utilities, and environmental clearance.",
     "services": [
      "proj-delivery",
      "preconstruction",
      "alt-delivery"
     ]
    },
    {
     "t": "Procure",
     "d": "Consultants before design, contractors before construction, and alternative delivery teams.",
     "services": [
      "procurement",
      "alt-delivery"
     ]
    },
    {
     "t": "Build",
     "d": "Construction administration, partnering, and contract oversight.",
     "services": [
      "construction",
      "partnering",
      "owners-rep"
     ]
    },
    {
     "t": "Close out",
     "d": "Contract close-out, lessons learned, and the handoff to maintenance.",
     "services": [
      "construction",
      "procurement"
     ],
     "areas": [
      "om"
     ]
    }
   ]
  },
  "keep": "",
  "xp": [
   "Members of our team led major projects at Florida DOT and the North Carolina Turnpike Authority, including design-build",
   "One of our project managers managed a 13-mile, half-billion-dollar corridor project in Las Vegas",
   "Our founder drove the development of Nevada DOT's matrix-based project management program",
   "A former Federal Highway Administration California Division leader on our team helped deliver the state's federal-aid program with Caltrans, 18 metropolitan planning organizations, and hundreds of local governments",
   "One of our right of way advisors spent 43 years in Florida DOT right of way, 33 as a supervisor or manager, and took part in more than 1,000 eminent domain mediations"
  ],
  /* Featured projects (area page file v1, Nov 13): the project delivery network project first; until the projects file
     is built that is cs-pdn */
  "cases": [
   "cs-pdn",
   "cs-pmdiv",
   "cs-major"
  ]
 },
 "om": {
  "id": "om",
  "name": "Maintenance & Operations",
  "tag": "Asset management, maintenance, contracting, & traffic operations",
  "services": [
   "asset-mgmt",
   "mqa",
   "outsourcing",
   "pbmc",
   "fleet",
   "operations",
   "traffic"
  ],
  "lead": "We help agencies understand the condition of what they own, direct resources to it, and organize maintenance around clear service expectations. Asset management connects that work to the agency's objectives and investment choices. Maintenance quality assurance shows how the system is performing. Sourcing and contract design decide how the work gets done.\n\nThe same work reaches the equipment and buildings behind maintenance, the standards and training crews work from, and how traffic is operated day to day. We do it with headquarters and district staff, and the agency owns the result.",
  "hear": [
   "We fix whatever's worst first, and we're always reacting.",
   "We can't hire or keep enough maintenance staff.",
   "We outsource the work. We need the contractor held to it.",
   "Every district chooses and replaces equipment its own way.",
   "Our field crews do it differently in every region.",
   "Each district rates conditions its own way."
  ],
  "bring": [
   "An inventory and condition picture, life cycle strategies, and measures that connect investment choices to the condition the agency is aiming for.",
   "A sourcing assessment that sets what the work requires against the staff, equipment, and contractor market available, and proficiency programs for the staff the agency has.",
   "Performance-based contract specifications, deduction models, quality assurance programs, and owner's representation.",
   "A selection, replacement, and disposal process with criteria based on data, and a comparison with other states.",
   "Operating standards, field checklists, crew training, and tabletop exercises that test emergency plans.",
   "An observable standard for each feature, sampling and rating procedures, rater training, and one handbook that staff and contractors work from."
  ],
  "lines": {
   "asset-mgmt": "Organization, asset data, life cycle planning, & investment strategy",
   "mqa": "Condition standards, sampling, rating, & reporting",
   "outsourcing": "Sourcing assessment, operating models, & transition",
   "pbmc": "Program design, contract documents, & contract administration",
   "fleet": "Fleet analysis, replacement criteria, equipment sharing, & facilities",
   "operations": "Program reviews, budgeting, standards, & training",
   "traffic": "Program reviews, guidance, project prioritization, & organization"
  },
  "feature": {
   "title": "Across the asset life cycle",
   "links": true,
   "lead": "An agency inventories what it owns, plans and funds the work, maintains and operates the system, and measures the result. What it measures sets the next plan. Each of our services sits at one or more of those stages.",
   "steps": [
    {
     "t": "Know what you own",
     "d": "Inventories, condition, and who owns the data.",
     "services": [
      "asset-mgmt",
      "fleet"
     ]
    },
    {
     "t": "Plan and fund",
     "d": "Life cycle strategies, risk, investment priorities, and the choice between in-house crews and contracts.",
     "services": [
      "asset-mgmt",
      "outsourcing",
      "operations"
     ]
    },
    {
     "t": "Maintain",
     "d": "Standards, training, equipment, and contracts that pay for a defined condition.",
     "services": [
      "operations",
      "pbmc",
      "fleet"
     ]
    },
    {
     "t": "Operate",
     "d": "Traffic operations, safety, winter operations, and emergency readiness.",
     "services": [
      "traffic",
      "operations"
     ]
    },
    {
     "t": "Measure",
     "d": "Condition against target, and what the results mean for the next budget.",
     "services": [
      "mqa",
      "pbmc"
     ]
    }
   ]
  },
  "keep": "",
  "xp": [
   "Our founder drove the development of Nevada DOT's Transportation Asset Management Plan",
   "Florida DOT's former Director of Maintenance, who led its statewide program, is on our team",
   "One of our advisors co-founded a performance-based asset maintenance firm that grew from two people to operations in 43 states",
   "A former Michigan DOT division administrator on our team led a division that included statewide fleet and facilities",
   "A former City of Las Vegas Director of Public Works on our team championed the city's Vision Zero initiative"
  ],
  /* Featured projects (M&O file v10, Nov 13) */
  "cases": [
   "cs-pbmc",
   "cs-mqa-fleet",
   "cs-tn-amdiv"
  ]
 },
 "tech": {
  "id": "tech",
  "name": "Digital Solutions",
  "tag": "Websites, tools, workflows, data, AI, & training",
  "services": [
   "portals",
   "automation",
   "data-governance",
   "ai",
   "dashboards",
   "training-video",
   "tech-strategy",
   "smart-mobility"
  ],
  "lead": "We help organizations get more from the systems they already own—and build custom solutions from the ground up when existing tools fall short. We connect your systems so information is entered once, put clear owners and definitions behind the data, create the websites, tools, and dashboards a program runs on, and add AI where it fits. A client can start with any one of these. Everything we build is fully documented and handed over, so you own the final result.",
  "hear": [
   "We bought the software, and nobody uses it.",
   "We key the same information into three systems.",
   "Nobody can tell me which number is the right one.",
   "Our staff already use AI, and we have no policy for it.",
   "Our tools, manuals, and training are spread across drives and intranet pages.",
   "Reports are built by hand every month."
  ],
  "bring": [
   "Technology assessments before the purchase, then setup, training, and change management for the staff who will use it.",
   "Automated workflows and integrations on tools the organization already owns, documented and handed over.",
   "Practical data governance: owners, definitions, inventories, and storage rules, built into work already underway.",
   "AI policy and guardrails, use-case ranking, licensing and governance advice, and a clear answer on where AI fits.",
   "A program website with the tools, a resource library, and training in one place, and a tracked way to request changes.",
   "Dashboards on platforms the organization already owns, documented so its own staff can keep them current."
  ],
  "feature": {
   "title": "What we build",
   "links": true,
   "lead": "A client can start with any of these.",
   "steps": [
    {
     "t": "Strategy and roadmap",
     "d": "What to build, what to buy, and in what order",
     "services": [
      "tech-strategy"
     ]
    },
    {
     "t": "Websites and tools",
     "d": "One front door for a program",
     "services": [
      "portals"
     ]
    },
    {
     "t": "Workflows and integrations",
     "d": "Connect what you already own",
     "services": [
      "automation"
     ]
    },
    {
     "t": "Data you can trust",
     "d": "Ownership, definitions, and quality",
     "services": [
      "data-governance"
     ]
    },
    {
     "t": "Dashboards",
     "d": "Decisions from current information",
     "services": [
      "dashboards"
     ]
    },
    {
     "t": "Training",
     "d": "Courses and videos people use",
     "services": [
      "training-video"
     ]
    },
    {
     "t": "AI where it helps",
     "d": "With guardrails and people in the loop",
     "services": [
      "ai"
     ]
    }
   ]
  },
  "keep": "autopage",
  "cases": [
   "cs-pdn",
   "cs-consult-flow",
   "cs-de-tech"
  ],
  "xpAfter": true,
  "lines": {
   "portals": "Program websites, resource libraries, web-based tools, dashboards & change requests",
   "automation": "Connected systems, automated workflows, & custom apps",
   "data-governance": "Owners, definitions, inventories, & policies",
   "ai": "Policy, use cases, tools, & adoption",
   "dashboards": "Dashboards, scoring tools, & maps",
   "training-video": "Online courses, how-to videos, & scripts",
   "tech-strategy": "Assessments, strategic plans, roadmaps, & governance"
  },
  "xp": [
   "Florida DOT's former Chief Information Officer and Chief Technology Officer is on our team",
   "The nation's first Chief Data and AI Officer at a state department of transportation is on our team",
   "Our automation team built Rawlins' own internal workflows, and builds the same kinds of workflows for clients"
  ]
 },
 "aviation": {
  "id": "aviation",
  "name": "Drones & Advanced Air Mobility",
  "tag": "Programs, planning, response, & standards",
  "services": [
   "drone-programs",
   "drone-aam",
   "drone-emergency",
   "research",
   "aero-division"
  ],
  "lead": "We build the program around the aircraft: the structure, policy, training, planning, and funding that let a public agency fly safely, follow the rules, and keep its program running.",
  "hear": [
   "We want drones in the field, safely and by the rules.",
   "Local governments are asking us about advanced air mobility and vertiports.",
   "There's grant money out there. Nobody has time to chase it."
  ],
  "bring": [
   "Program setup: concepts of operations, standard operating procedures, pilot training, policy, data handling, and advanced air mobility planning.",
   "Statewide studies and phased roadmaps, local siting guidance, and economic and environmental impact studies, with review of the vertiport concepts others design.",
   "Funding strategy, grant narratives, budgets, and complete application packages, ready to submit."
  ],
  "feature": {
   "title": "Crawl, walk, run",
   "lead": "We take a practical, phased approach that meets DOTs and other organizations where they are.",
   "steps": [
    {
     "t": "Set up the program",
     "d": "Structure, policy, procedures, equipment guidance, and a first use case",
     "services": []
    },
    {
     "t": "Train and solidify",
     "d": "Training, onboarding, compliance, and performance tracking",
     "services": []
    },
    {
     "t": "Run and advance",
     "d": "Advanced use cases, standards input, succession, and on-call support",
     "services": []
    }
   ]
  },
  "keep": "aampage",
  "cases": [
   "cs-aero",
   "cs-drt",
   "cs-pooled"
  ]
 }
};
export const INDUSTRIES: Record<string, IndustryData> = {
 "transport": {
  "id": "transport",
  "ch": [
   "Delivering a bigger program with fewer experienced people",
   "Proving to legislatures and the public that money is well spent",
   "Getting value from technology the agency already bought",
   "Standardizing how districts and divisions work"
  ],
  "bring": [
   // delivery networks (cs-nc-ipd, cs-transform), manuals and courses (cs-pmdiv), proficiency programs (cs-proficiency)
   "Delivery frameworks, manuals, and proficiency programs that write down how the work is done, so newer staff can do it.",
   // cs-strategic (plan, action plans, measures inventory), cs-transform (score sheets, prioritization tool), cs-pmdiv (measures with targets)
   "Strategic plans with yearly actions, performance measures, and project selection methods leadership can explain.",
   // cs-transform (apps on the agency's existing platform), cs-pdn (links to the systems staff already use)
   "Workflows, websites, and dashboards built on the systems you already own, connected before anything new is bought.",
   // cs-txmaint (uniform deduction method, rating matrix), cs-drt (statewide procedures), cs-proficiency (statewide rollout)
   "Uniform maintenance contract specifications and procedures, rating programs, and training that every district applies the same way."
  ],
  "basis": "Our People bios: former executives and engineers from Nevada, Florida, Michigan, Idaho, Arkansas, North Carolina, and California DOTs and FHWA. Approved claim: more than 30 former agency executives and engineers.",
  "services": [
   "program-delivery",
   "preconstruction",
   "construction",
   "alt-delivery",
   "lpa",
   "operations",
   "traffic",
   "asset-mgmt"
  ],
  "people": [
   [
    "Scott Rawlins, P.E.",
    "Founder. Former Deputy Director and Chief Engineer, Nevada DOT"
   ],
   [
    "Paul Steinman, P.E.",
    "Former Chief Operations Officer, Idaho Transportation Department, and District Secretary, Florida DOT"
   ],
   [
    "Rex Vines, P.E.",
    "Former Deputy Director and Chief Engineer of Operations, Arkansas DOT"
   ],
   [
    "April Blackburn, PMP",
    "Former Chief Information Officer, Florida DOT"
   ],
   [
    "Lance Grace",
    "Former Director, Office of Maintenance, Florida DOT"
   ],
   [
    "Ron Crew",
    "43 years in Florida DOT right of way"
   ],
   [
    "Alicia McConnell, P.E.",
    "Has led drone programs since 2018, including a nationwide pilot network"
   ]
  ]
 },
 "gov": {
  "id": "gov",
  "ch": [
   "Capital programs bigger than the staff behind them",
   "Asset decisions made worst-first",
   "Federal requirements on lean teams",
   "States collect the same data with no shared standard"
  ],
  "bring": [
   // an offer, not past work: see g-capital
   "A current-state look at workload and staffing, and a resource planning and prioritization framework.",
   // cs-local-am
   "Self-assessments, workshops, and action plans that start from where each agency is.",
   // cs-transform: local public agency manual chapters and responsible-charge training
   "Local public agency manuals and training for the staff in responsible charge of federal-aid projects.",
   // cs-pooled
   "Facilitation that brings member states to a standard they can test and adopt."
  ],
  "basis": "Local agency asset management record; pooled fund record; bios (Las Vegas public works, FHWA)",
  "services": [],
  "people": [
   [
    "Joey Paskey, P.E., PTOE",
    "Former Director of Public Works, City of Las Vegas"
   ],
   [
    "Mayela Sosa",
    "Former Division Administrator, FHWA Indiana and Hawaii Divisions"
   ],
   [
    "Paul Schneider, P.E.",
    "Former FHWA California Division executive; worked with 18 MPOs"
   ],
   [
    "David Rader",
    "Co-founded a performance-based asset maintenance firm that grew to 43 states"
   ]
  ]
 },
 "contractors": {
  "id": "contractors",
  "ch": [
   "A first progressive design-build or construction manager project with a public owner",
   "Owner and contractor relationships strained by schedule and risk",
   "Maintenance contracts that don't fit what each DOT needs",
   "Internal workflows that don't scale with the firm"
  ],
  "bring": [
   // cs-partnering
   "A kickoff that sets the charter, shared goals, communication protocols, and an issue resolution ladder before the pressure builds.",
   // cs-db-partnering, cs-partnering
   "Joint risk workshops, recurring partnering sessions, and anonymous team surveys reported to both sides.",
   // cs-maint-model
   "Research with DOT leaders, and a set of contracting methods a DOT can combine.",
   // cs-pv-pmo
   "Systems connected and workflows automated around how the firm's projects run."
  ],
  "ways": [
   // Contractors engaged us on the design-build and progressive design-build projects; a DOT and its industry on the statewide one.
   { "t": "As the partnering facilitator", "d": "Contractors and public owners bring us in to set up and run partnering on a project: the charter, the risk register, the issue resolution ladder, and team evaluations through closeout." },
   // cs-maint-model
   { "t": "For an industry association", "d": "We research what owners need and recommend contracting models that work for DOTs and for industry." },
   // "As a teammate on public work" moved to Engineering & Consulting Firms (Who We Work With file v1, Nov 13)
   // FLAG. Two closed agreements, 2023 to 2024: advice on a contractor's approach to a state DOT project, and proposal support for a service firm.
   { "t": "As an advisor on a pursuit", "d": "Contractors and service firms bring us in while they shape their approach to state transportation work. We review plans and proposal materials and bring the view from the owner's side of the table." },
   // FLAG (5.6). cs-pv-pmo.
   { "t": "As the builder of your internal systems", "d": "Our automation team connects a firm's project, time, and invoicing tools and builds the workflows around them." }
  ],
  "basis": "Partnering records; major project case studies; automation examples for project-based firms",
  "services": [],
  "people": [
   [
    "Paul Steinman, P.E.",
    "Delivered public-private partnerships and alternative delivery at three departments of transportation"
   ],
   [
    "Rex Vines, P.E.",
    "Rose from field construction engineer to Deputy Director and Chief Engineer of Operations, Arkansas DOT"
   ],
   [
    "Ben Rawlins, P.E.",
    "Leads our automation and AI team"
   ]
  ]
 },
 "private": {
  "id": "private",
  "ch": [],
  "basis": "Jacob, Data/AI catalog (target segment, use cases)",
  "services": [],
  "people": [
   [
    "Ben Rawlins, P.E.",
    "Chief AI Strategy Officer; leads our automation and AI team"
   ],
   [
    "Kobus Pieters",
    "AI & Automation Specialist"
   ],
   [
    "Samantha Lloyd",
    "AI & Automation Specialist"
   ]
  ]
 },
 "fed": {
  "id": "fed",
  "ch": [
   "States collect the same data with no shared standard",
   "Research that has to reach agreement across many member states",
   "Federal requirements on lean teams",
   "A small staff competing for federal funding"
  ],
  "bring": [
   "Facilitation that brings member states to a standard they can test and adopt.",
   "Working groups, subcommittees, and a record of what the members agreed and what is still open.",
   "Local public agency manuals and training for the staff in responsible charge of federal-aid projects.",
   "Grant applications from the narrative to the budget, forms, and commitment letters, ready to submit."
  ],
  "basis": "Who We Work With file v1 (Nov 13, 2026)",
  "services": [],
  "people": []
 },
 "local": {
  "id": "local",
  "ch": [
   "Asset decisions made worst-first",
   "No one owns asset management locally",
   "Federal-aid projects delivered by a small local staff",
   "Capital programs bigger than the staff behind them"
  ],
  "bring": [
   "Self-assessments, workshops, and action plans that start from where each agency is.",
   "A steering committee named inside the agency, and one-page materials for senior managers and elected officials.",
   "A local public agency manual, a certification process, and training for the staff in responsible charge.",
   "A current-state look at workload and staffing, and a resource planning and prioritization framework."
  ],
  "basis": "Who We Work With file v1 (Nov 13, 2026)",
  "services": [],
  "people": []
 },
 "eng": {
  "id": "eng",
  "ch": [
   "A program that needs people who have run the owner's side of it",
   "A client whose new technology needs an organization ready for it",
   "No clear view of project margin or staff utilization",
   "Won work keyed in again to set up the project"
  ],
  "bring": [
   "Former agency leaders on the firm's team for program delivery, organization and workforce, right of way, technology, and drone programs.",
   "Strategy, organization, written procedures, and data governance for the client, alongside the technology the firm is delivering.",
   "Project profitability and utilization dashboards, built from the project data the firm already has.",
   "A handoff from the sales system to the project system, and resource planning that looks ahead."
  ],
  "ways": [
   {
    "t": "As a teammate on public work",
    "d": "Engineering and advisory firms add us to their teams for state DOT programs: program delivery, organization and workforce, right of way, technology, and drone programs."
   },
   {
    "t": "When your client needs more than the technology",
    "d": "Bring us in for the organization around a technology project: the plan, the structure, the procedures, and the data governance."
   },
   {
    "t": "As the builder of your internal systems",
    "d": "Our automation team connects a firm's project, time, and invoicing tools and builds the workflows around them."
   }
  ],
  "basis": "Who We Work With file v1 (Nov 13, 2026)",
  "services": [],
  "people": []
 },
 "growth": {
  "id": "growth",
  "ch": [],
  "basis": "The Private Sector page's content, moved (Who We Work With file v1, Nov 13, 2026)",
  "services": [],
  "people": []
 },
 "intl": {
  "id": "intl",
  "ch": [
   "Investment is growing faster than our organization",
   "Our data sits in separate systems, and no one owns it",
   "We want to use AI, and need rules for it first",
   "We're planning for drones and air mobility while the rules are still being written"
  ],
  /* what we bring under each (Who We Work With read-as-built fixes v1, Nov 13): services, no claim of work outside the United States */
  "bring": [
   "Organization design, position descriptions, and proficiency programs, built with the agency's own staff.",
   "Data governance: owners, definitions, inventories, and a steering committee to keep it going.",
   "An AI policy and guardrails, use cases reviewed and ranked, and training for staff.",
   "Drone program procedures and training, planning guidance for advanced air mobility, and standards research with other agencies."
  ],
  "basis": "",
  "services": [],
  "people": []
 }
};
export const SUBSECTORS: Record<string, SubsectorData> = {
 "sub-highways": {
  "id": "sub-highways",
  "name": "Highways & Bridges",
  "st": "ok",
  "intro": "Most of our work is on state highway systems. We help departments choose and prioritize projects, get them ready and delivered, administer construction, and maintain and operate the roads afterward. That work ranges from department-wide reorganizations and project delivery frameworks to performance-based maintenance contracts and maintenance rating programs.",
  "ch": [
   "Delivering a bigger program with fewer experienced people",
   "Proving to legislatures that money is well spent",
   "Districts that each work differently",
   // cs-transform challenge: "decisions siloed by funding program"
   "Project decisions made one funding program at a time"
  ],
  "deliver": [
   // Jacob's portfolio, PC1: the documented framework runs from concept study through readiness for advertisement
   "Project delivery frameworks: the steps, handoffs, tools, and templates that take a project from concept to readiness for advertisement",
   // cs-transform: score sheets for more than a dozen programs, and a prioritization tool
   "Project selection and prioritization: scoring methods and screening tools",
   // cs-pmdiv, cs-transform, cs-proficiency
   "Project management manuals, courses, and proficiency programs for the people who deliver the work",
   // Jacob's portfolio RW1, RW2 (assessment delivered, procedure work current); cs-transform construction workflows and manual
   "Right of way program assessments and procedures, and construction administration workflows and manuals",
   // cs-pbmc, cs-txmaint
   "Performance-based maintenance contracts: specifications, deduction methods, industry review, and support through administration",
   // cs-txmaint rating matrix; cs-pbmc pass or fail criteria; maintenance academies (2022 work reports, cs-nv-om's client)
   "Maintenance quality assurance and rating programs, and training academies for maintenance staff",
   // 2022 work reports, cs-nv-om's client: fleet selection, centralized fleet maintenance, equipment sharing, care policy
   "Fleet programs: equipment selection, centralized maintenance, sharing, and care policies",
   // Jacob's portfolio TO1, TO5; cs-transform; 2023 work reports (traffic management center review and recommendations)
   "Traffic operations: program reviews, guidance, and traffic management center recommendations"
  ],
  "walk": [
   "A delivery process staff can follow, with the manuals, templates, and training to keep using it",
   "Selection and prioritization methods leadership can explain",
   "Maintenance contracts and quality measures written for every district",
   "Trained staff, and documentation your team owns"
  ],
  "xp": [
   // cs-nc-ipd and cs-transform
   "We've helped state transportation departments build project delivery networks: the steps, tools, and training that carry a project from concept toward construction",
   // cs-nv-om, and the 2022 and 2023 work reports for the same client (fleet, pavement program, traffic management center)
   "We've reviewed a state transportation department's maintenance and operations programs, with follow-on work on its fleet, its pavement program, and a traffic management center",
   // Scott Rawlins bio
   "Our founder was Deputy Director and Chief Engineer of the Nevada Department of Transportation, responsible for its daily operations",
   // bios; the same list as the Transportation basis line
   "People on our team held executive and engineering roles at the Nevada, Florida, Michigan, Idaho, Arkansas, North Carolina, and California transportation departments, and at the Federal Highway Administration",
   // Lance Grace bio (the same line as Maintenance Programs)
   "Florida DOT's former Director of Maintenance, who led its statewide program (12,157 centerline miles and 7,152 bridges), is on our team",
   // Ron Crew bio
   "One of our right of way advisors spent 43 years in Florida DOT right of way, 33 as a supervisor or manager"
  ],
  "services": ["program-delivery", "preconstruction", "construction", "operations", "traffic", "asset-mgmt", "portals"],
  "industry": "transport",
  "people": [],
  "basis": "Highway case studies and Our People bios"
 },
 "sub-aviation": {
  "id": "sub-aviation",
  "name": "Aviation & Airports",
  "st": "ok",
  // Airports: Jacob's drone portfolio says advisory roles only, and no airport master planning.
  "intro": "We work with state aeronautics programs and the drone and advanced air mobility programs growing around them. We help small aviation staffs run those programs, plan for what's next, and compete for federal funding. With airports, our role is advisory, focused on drones and advanced air mobility.",
  "ch": [
   "Drone use spread before policy did",
   "Training and equipment vary by division",
   "AAM planning with rules still being written",
   "Small staffs competing for federal funding"
  ],
  "deliver": [
   // cs-aero (procedures finalized and distributed), Jacob's drone portfolio (on-call support)
   "Statewide drone programs: operating procedures, handbooks, governance, and day-to-day support",
   // cs-aero, cs-hi
   "Drone training: visual observer and sensor operator courses, remote pilot training, and train-the-trainer materials",
   // FLAG (5.4). cs-drt.
   "Emergency response with drones: response team training and live video into the emergency operations center",
   // cs-aero
   "Advanced air mobility strategy, and planning guidance for local governments",
   // cs-aerodiv
   "Research on how a state aviation role could be organized, governed, and funded",
   // cs-aero (application submitted). Was "Federal aviation funding": the applications on record are for drone and
   // advanced air mobility programs, not airport funding.
   "Federal grant applications for drone and advanced air mobility programs",
   "Review of vertiport concepts others design"
  ],
  "walk": [
   "Statewide procedures every division follows",
   "Courses and train-the-trainer materials the agency keeps",
   "A strategy and local planning guidance for advanced air mobility",
   "A complete grant application, with its task structure and budget"
  ],
  "xp": [
   // Jacob's drone portfolio, Offering 1 ("Doing")
   "We work as an on-call extension of state aviation and drone program staff: program development, policy, training, and day-to-day support",
   "One of our aviation leads has run drone programs since 2018, including a nationwide network of pilots", // as on Drone Program Development
   // research.ts: NCHRP Research Report 1147 (2025), before they joined Rawlins
   "Two people on our team wrote the national guide to drone operations at transportation agencies, before they joined Rawlins",
   "Our team includes the California Department of Transportation's former Chief of Aeronautics", // as on Advanced Air Mobility
   // Aaron Organ and Jordan Stacy bios
   "Experience on our team includes airport operations, airfield safety, and airport training programs"
  ],
  "services": ["drone-programs", "drone-aam", "drone-emergency", "research", "aero-division", "grants", "portals"], // adds Emergency Response and Research & Standards
  "industry": "transport",
  "people": [],
  "basis": "Aeronautics records and the aviation team's bios"
 },
 "sub-rail": {
  "id": "sub-rail",
  "name": "Rail & Transit",
  "st": "warn",
  // One Rawlins project: partnering on the Southwest light rail line (2019), in cs-major. Everything on this page is that
  // project or a person's earlier role. No new offers are invented here.
  // Nicole's wording (preview edit, Nov 11, 11:5x PM); the Who we work with file's intro for this field was skipped.
  "intro": "Our transit work includes partnering facilitation on a $2 billion light rail line. Our team also includes the California Department of Transportation's former Chief of Rail and Mass Transportation.",
  "ch": [
   "Multi-agency coordination on a major transit build",
   "Budget and risk control under public scrutiny",
   // cs-db-partnering challenge; Jacob's portfolio AD4
   "Owner and contractor need a way to settle issues before they become disputes"
  ],
  "deliver": [
   // cs-major: what the partnering on the light rail line covered
   "Partnering facilitation on major transit builds: project charter, risk register, issue resolution process, and team evaluations",
   "Joint risk workshops between the owner and the contractor",
   "Coordination among the agencies and contractors on a major build"
  ],
  "walk": [
   "A signed partnering charter and an issue resolution ladder",
   "A shared risk register, with an owner for each risk",
   "Regular team evaluations through the project"
  ],
  "xp": [
   // cs-major names the project
   "We've facilitated partnering between the owner and the contractor on a $2 billion light rail line in Minneapolis",
   // Dara Wheeler bio
   "Our team includes the California Department of Transportation's former Chief of Rail and Mass Transportation",
   // Jen Pihl bio
   "One of our advisors supported economic analysis and the administration of major rail grant programs at the Federal Railroad Administration"
  ],
  "services": ["partnering", "owners-rep", "portals"], // the rail work was partnering (Nov 12 split)
  "industry": "transport",
  "people": [],
  "basis": "Minneapolis light rail project; bios (Caltrans rail and mass transportation leadership, Federal Railroad Administration)"
 },
 "sub-ports": {
  "id": "sub-ports",
  "name": "Ports & Harbors",
  "st": "gap",
  // Source: our final report to the client for its first purchase order (work through Aug 2026): four district port security
  // grant application packages; drones, uncrewed surface vessels, multibeam sonar, and green lidar evaluated for harbor and
  // infrastructure inspection; vendor and procurement options; a demonstration and training concept. Same client as cs-hi: keep it unnamed.
  "intro": "Our work here so far is with one state harbors program. We prepared its federal port security grant application, compared equipment options for underwater inspection and survey, and ran a two-day demonstration of aerial drones, an uncrewed surface vessel, an underwater vehicle, and mobile lidar for inspecting harbor infrastructure.",
  "ch": [
   "Competitive federal security grants",
   "New technology to evaluate with a small staff",
   "Equipment that has to serve more than one harbor"
  ],
  "deliver": [
   "Port security grant applications: investment justifications, budgets, and technical narratives",
   "Evaluation of drones, uncrewed surface vessels, sonar, and lidar for harbor and infrastructure inspection",
   "Equipment and vendor options, with the procurement paths for each",
   "Demonstrations of new inspection technology on the water, and training plans for the staff who will use it"
  ],
  "walk": [
   "Complete application packages, reusable for the next funding round",
   "A side-by-side evaluation of the technology options",
   "A plan for demonstrating the equipment and phasing it in"
  ],
  "xp": [
   // cs-nc-am (Before Rawlins)
   "Before founding Rawlins, our founder led an asset management review for a state transportation department that covered its ports and ferries",
   // cs-nc-ipd (BUILD and INFRA), cs-aero (construction technology), and this page's port security applications
   "Our grant team has prepared federal applications for highway, drone, and port security programs"
  ],
  "services": ["grants", "drone-programs", "portals"],
  "industry": "transport",
  "people": [],
  "basis": "Harbors records: final report on the client's first purchase order (work through Aug 2026)",
  "thin": true
 }
};
export const CASES: Record<string, CaseData> = {
 "cs-proficiency": {
  "id": "cs-proficiency",
  "ch": "EPIC (Empowering People Influencing Culture), a department-wide restructuring, set out to cut layers of supervision, update classifications and performance measures, and give staff a clear path to advance. Each new classification needed a defined route to proficiency, written with experts in dozens of disciplines. The goals were multiple career paths, pay set to industry benchmarks, and stronger checks and balances.",
  "when": "2023 to 2025",
  "did": [
   "Built proficiency programs with agency experts in more than two dozen disciplines, from right of way and construction to bridge inspection and traffic design",
   "Researched appraiser classifications nationwide and drafted a salary structure",
   "Designed a two-week advanced leadership program of about 40 sessions with the agency's human resources team, and delivered it twice in 2024",
   "Built the transportation worker proficiency program for maintenance crews in three levels, with a manual, modules, task sheets, and a rollout academy",
   "Supported its statewide rollout, and built a staffing utilization method",
   "Rolled out the construction technician program through academy workshops in the regions",
   "Wrote rotation curricula for graduate engineers in about a dozen disciplines",
   "Wrote the curriculum for the department's Management Academy"
  ],
  "res": [
   "Utilization process complete and in use",
   "Transportation worker proficiency program handed to the statewide coordinator",
   "Appraiser classification, certification, and salary structure delivered",
   "Construction technician program complete in April 2025",
   "Materials and tests program rolled out, and now run by the department itself",
   "Proficiency programs delivered at closeout for engineering specialists, graduate engineers, project managers, right of way, transportation workers, construction technicians, geodetic technicians, materials and testing technicians, bridge inspection technicians, and environmental specialists"
  ],
  "services": [
   "workforce",
   "org-design",
   "change-mgmt",
   "construction",
   "traffic"
  ],
  "subsectors": [
   "sub-highways"
  ],
  "industry": "transport",
  "industry2": null
 },
 "cs-tn-ipd": {
  "id": "cs-tn-ipd",
  "ch": "The department wanted a consistent project management life cycle, from planning through maintenance, with risk managed the same way on every project.",
  "when": "2019 to 2023",
  "did": [
   "Reworked the project management life cycle from planning to maintenance",
   "Introduced risk management practices to control scope, schedule, and budget",
   "Worked the department's transition projects in two regions: project schedules, master scopes of work, risk workshops, and risk registers",
   "Wrote an onboarding process for consultants"
  ],
  "res": [
   "The baseline schedule from the transition projects became the department's template",
   "The consultant onboarding process was shared with all regions for statewide use"
  ],
  "services": [
   "program-delivery"
  ],
  "subsectors": [
   "sub-highways"
  ],
  "industry": "transport",
  "industry2": null
 },
 "cs-pbmc": {
  "id": "cs-pbmc",
  "ch": "A region moved interstate maintenance to performance-based contracts. That meant a measurable quality baseline, procurement shaped with industry, and administering two new contracts while staff and contractors learned the model together.",
  "when": "2023 to 2025",
  "did": [
   "Wrote the report that recommended a performance-based maintenance contract for one region and a simpler maintenance quality assurance program",
   "Converted maintenance quality measures to pass or fail criteria and set the field assessment approach",
   "Monitored field data collection at 268 interstate sample sites, and analyzed the results",
   "Supported an industry forum and drafted the scope, contract, and request for proposals",
   "Supported the advertisement of both contracts, with pre-bid support and answers during the question period",
   "Presented the statewide maintenance quality assessment to executive and regional leadership",
   "Supported contractor onboarding with weekly advisory calls",
   "Reviewed contracts, fleet, fuel, and staffing for the financial analysis, and presented it to department leadership"
  ],
  "res": [
   "Two contracts awarded; Rawlins supported their administration",
   "Financial analysis completed and delivered"
  ],
  "services": [
   "operations",
   "procurement",
   "pbmc",
   "mqa",
   "outsourcing"
  ],
  "subsectors": [
   "sub-highways"
  ],
  "industry": "transport",
  "industry2": null
 },
 "cs-aero": {
  "id": "cs-aero",
  "ch": "A small aeronautics staff needed to grow a statewide drone program, prepare the state and local governments for advanced air mobility, and compete for federal funding to pay for both.",
  "when": "Since 2024",
  "did": [
   "Wrote and finalized statewide drone operating procedures",
   "Built visual observer and sensor operator courses and train-the-trainer materials",
   "Planned and ran a statewide drone and advanced air mobility symposium",
   "Developed an advanced air mobility strategy and planning guidance for local governments",
   "Coordinating the economic impact and market studies for advanced air mobility with the study team (in progress)",
   "Coordinated a land development study for advanced air mobility",
   "Built a tracking dashboard for advanced air mobility",
   "Supported train-the-trainer work for the remote pilot program",
   "Built a four-phase remote pilot training program: online modules, hands-on phases at training sites, and a final phase with mentors and evaluation rubrics",
   "Ran an Air Mobility Working Group and Task Force, with final reports",
   "Planned and ran a second statewide symposium in 2025",
   "Prepared federal applications for the department: a SMART grant, a Rural and Tribal Assistance grant, and a digital construction grant"
  ],
  "res": [
   "Symposium held",
   "Federal grant applications submitted in 2024 and 2025",
   "Updated drone procedures finalized and distributed",
   "Land development study complete",
   "A State Transportation Innovation Council grant awarded in September 2025",
   "First remote pilot candidate class held in June 2026",
   "Statewide Advanced Air Mobility Evaluation delivered in November 2024",
   "Planning guidance for local governments final in September 2026"
  ],
  "services": [
   "drone-programs",
   "grants",
   "research",
   "drone-aam"
  ],
  "subsectors": [
   "sub-aviation"
  ],
  "industry": "transport",
  "industry2": null
 },
 "cs-transform": {
  "id": "cs-transform",
  "ch": "The department needed a more reliable way to select, prioritize, and deliver projects within scope, schedule, and budget, under public and legislative scrutiny, with decisions siloed by funding program.",
  "when": "Since 2024",
  "did": [
   "A project delivery network, with its tools, website, and training",
   "A program development manual and project selection tools",
   "Consultant contracting rebuilt as one connected workflow",
   "A local public agency manual, certification process, and training",
   "Maintenance quality assurance, operator training, and fleet",
   "A construction administration manual matched to new specifications",
   "A department reorganization, from functional chart to rollout",
   "Performance measures, from strategy to dashboards"
  ],
  "didLinks": {
   "A project delivery network, with its tools, website, and training": "cs-pdn",
   "A program development manual and project selection tools": "cs-pd-manual",
   "Consultant contracting rebuilt as one connected workflow": "cs-consult-flow",
   "A local public agency manual, certification process, and training": "cs-lpa-manual",
   "Maintenance quality assurance, operator training, and fleet": "cs-mqa-fleet",
   "A construction administration manual matched to new specifications": "cs-cam",
   "A department reorganization, from functional chart to rollout": "cs-reorg",
   "Performance measures, from strategy to dashboards": "cs-measures"
  },
  "res": [],
  "services": [],
  "subsectors": [
   "sub-highways"
  ],
  "industry": "transport",
  "industry2": null
 },
 "cs-pmdiv": {
  "id": "cs-pmdiv",
  "ch": "The department set out to make project management its own division, with the roles, measures, processes, and training to manage scope, schedule, cost, and risk consistently, and to bring staff through the change.",
  "when": "Since 2025",
  "did": [
   "Interviewed staff on site for two days on how projects are managed today, and analyzed the department's five-year work program",
   "Recommended the division structure and initial build-out",
   "Mapped the current and future process, with responsibility charts and on-site workshops",
   "Wrote position descriptions and classification specifications for nine positions",
   "Developed delivery performance measures with targets",
   "Built change management tools: process maps, responsibility charts, and a change impact template",
   "Built a five-year work plan for the division",
   "Next: a pilot using AI for cash-flow modeling",
   "Drafted a web-based project delivery manual",
   "Built eleven project manager courses, now being converted to computer-based training",
   "Identified field staffing for 31 field offices and presented recommendations on the construction division to executives"
  ],
  "res": [
   "New project management organization approved in June 2026, with three new roles",
   "Final measures compiled by the working group",
   "Change impact template and first manual sections finalized",
   "Five-year work plan, position descriptions, measures, change management, and organization design complete by September 2026",
   "Manual and training in progress"
  ],
  "services": [
   "org-design",
   "change-mgmt",
   "workforce",
   "program-delivery",
   "strategic-planning"
  ],
  "subsectors": [
   "sub-highways"
  ],
  "industry": "transport",
  "industry2": null
 },
 "cs-txmaint": {
  "id": "cs-txmaint",
  "ch": "The department wanted performance-based and flexible maintenance contracts that industry would bid on and districts could administer the same way, plus a maintenance rating program decisions could rely on.",
  "when": "2025 to 2026",
  "did": [
   "Advised the department and its contractors on contract language and oversight, and ran a workshop with department leadership and the contracting industry",
   "Built an engineer's estimate for one district's contract from its asset inventory and work plan",
   "Built baseline condition assessment tools and trained district staff to use them",
   "Drafted special specifications for two districts' contracts",
   "Built a uniform deduction method and tracker",
   "Ran a structured industry review and recommended responses",
   "Facilitated the maintenance rating working group and built the rating matrix",
   "Prepared a winter operations tabletop exercise for district emergency response staff: the scenario, the presentation, and the moderator's outline",
   "Wrote a white paper on flexible asset maintenance contracts, with a checklist so more districts can follow",
   "Built a cloud-based cost estimating tool with documented formulas",
   "Evaluated four data collection vendors with a scoring matrix and a recommendation report",
   "Organized two peer exchanges with other state DOTs"
  ],
  "res": [
   "Final draft specifications provided for district review and procurement",
   "The first district's special specification taken to advertisement, pre-bid, and letting in 2026",
   "Tolerance criteria finalized for drainage, vegetation, aesthetics, litter and debris, pavement cracking, and paved shoulders"
  ],
  "services": [
   "operations",
   "procurement",
   "asset-mgmt",
   "dashboards",
   "pbmc",
   "mqa"
  ],
  "subsectors": [
   "sub-highways"
  ],
  "industry": "transport",
  "industry2": null
 },
 "cs-drt": {
  "id": "cs-drt",
  "ch": "Drone use had grown district by district, with different practices and training. The department also needed its drone response team ready for emergencies, with live video into the emergency operations center.",
  "when": "Since 2025",
  "did": [
   "Supported emergency drone response training and analyzed the results",
   "Coordinated live streaming into the emergency operations center",
   "Drafted waiver content and an updated concept of operations",
   "Revised statewide drone procedures and drafted a program handbook",
   "Briefed senior leadership on a centralized governance model",
   "Helped the drone response team check debris removal quantities with drone volume calculations",
   "Delivered the 2026 response team training: agenda, three flight areas, lessons learned, and a participant survey",
   "Supported live storm response in 2026: pre-staging, emergency flight authorizations, coordination with an airport, a military airfield, and air traffic control, and livestream workflows",
   "Built a public aircraft operations framework, with compliance and detect-and-avoid checklists",
   "Evaluated three fleet management platforms and rolled the chosen one out to the districts"
  ],
  "res": [
   "Response team training held and evaluated",
   "When debris reports disagreed, the drone data proved correct",
   "Drone program standard operating procedures final in May 2026"
  ],
  "services": [
   "drone-programs",
   "org-design",
   "drone-emergency"
  ],
  "subsectors": [
   "sub-aviation"
  ],
  "industry": "transport",
  "industry2": null
 },
 "cs-local-am": {
  "id": "cs-local-am",
  "ch": "The state wanted local agencies to use asset management to plan their programs and their funding. Each community started from a different place.",
  "when": "2024 to 2025",
  "did": [
   "Helped each agency name an asset management steering committee",
   "Ran self-assessment surveys and reviewed each agency's plans and inventories",
   "Led in-person workshops using the state's competency framework",
   "Built short, mid, and long-term action plans with each agency",
   "Prepared one-page materials for elected officials"
  ],
  "res": [
   "Workshops held and action plans built with seven local agencies: two county road commissions and five cities",
   "Summary of the first round presented to the office and the state infrastructure council in December 2024"
  ],
  "services": [
   "asset-mgmt",
   "workforce"
  ],
  "subsectors": [],
  "industry": "gov",
  "industry2": null
 },
 "cs-mi-pbo": {
  "id": "cs-mi-pbo",
  "ch": "Michigan moved toward a maintenance model based on performance outcomes and needed the tools to run it.",
  "did": [
   "Helped design and implement a performance-based program for statewide highway maintenance",
   "Measured current levels of service in the field, and set outcome-based performance measures",
   "Benchmarked maintenance activities, and built a cost model for them",
   "Wrote requirements and supported procurement for an enterprise asset management system"
  ],
  "res": [],
  "services": [
   "operations",
   "asset-mgmt"
  ],
  "subsectors": [
   "sub-highways"
  ],
  "industry": "transport",
  "industry2": null
 },
 "cs-workforce": {
  "id": "cs-workforce",
  "ch": "The department needed a clear picture of its vacancies, how divisions balance staffing supply and demand, and how peer agencies organize.",
  "when": "2024 to 2025",
  "did": [
   "Analyzed vacancies by division, classification, staffing level, and tenure, and how peer agencies organize"
  ],
  "res": [],
  "services": [
   "workforce",
   "org-design"
  ],
  "subsectors": [],
  "industry": "transport",
  "industry2": null
 },
 "cs-nc-ipd": {
  "id": "cs-nc-ipd",
  "ch": "The department wanted to improve how projects are delivered and funded.",
  "did": [
   "Reviewed programs with staff and recommended improvements to how projects are delivered and funded",
   "Supported BUILD and INFRA federal grant applications and the projects that were awarded",
   "Helped build a project delivery network and a department-wide project management discipline",
   "Set up quality management and risk management processes for preconstruction",
   "Helped develop performance-based maintenance contracts for two districts",
   "Supported development of a construction manager/general contractor program"
  ],
  "res": [],
  "services": [
   "program-delivery",
   "grants",
   "operations",
   "alt-delivery",
   "pbmc"
  ],
  "subsectors": [
   "sub-highways"
  ],
  "industry": "transport",
  "industry2": null
 },
 "cs-nc-am": {
  "id": "cs-nc-am",
  "ch": "The department wanted to move toward outcome-based asset management for highway maintenance and its other modes: ports, airports, rail, transit, fleet, and ferries.",
  "did": [
   "Held workshops with the department and stakeholders on levels of service and performance targets",
   "Reviewed leading practices nationally",
   "Recommended performance measures, levels of service, and measurement procedures",
   "Reviewed how the department plans, programs, and manages its assets",
   "Identified where maintenance funding could be allocated based on performance"
  ],
  "res": [],
  "services": [
   "asset-mgmt",
   "operations",
   "procurement"
  ],
  "subsectors": [],
  "industry": "transport",
  "industry2": null
 },
 "cs-strategic": {
  "id": "cs-strategic",
  "ch": "The department needed a strategic plan that staff at every level helped shape, turned into yearly actions with measures leadership could track.",
  "when": "Since 2022",
  "did": [
   "Ran engagement with executive leadership, a working group, all-staff workshops and surveys, and partners",
   "Facilitated vision, mission, values, goals, and measures",
   "Built the action plan and monitoring frameworks",
   "Facilitated division and district workshops for the first-year action plan",
   "Built a performance measures inventory and profile template",
   "Held eight staff focus groups, summits with planning partners and rural counties, and five district sessions with the Director",
   "Held 25 interviews with division heads and measure owners, and analyzed every performance measure the department uses",
   "Piloted the action plan framework with three divisions before it was approved for all"
  ],
  "res": [
   "Strategic plan for 2025 to 2029 complete",
   "Year 1 action plan complete",
   "Action plan tracking tool with progress dashboards in use",
   "Division action plans reviewed, approved, and finalized with the Director's Office in August 2025",
   "Monitoring guidelines and a monitoring policy delivered in September 2025"
  ],
  "services": [
   "strategic-planning",
   "org-design",
   "asset-mgmt",
   "dashboards"
  ],
  "subsectors": [
   "sub-highways"
  ],
  "industry": "transport",
  "industry2": null
 },
 "cs-nv-fleet": {
  "id": "cs-nv-fleet",
  "ch": "The department needed its fleet, about 2,700 pieces of equipment, to stay available, reliable, and affordable.",
  "did": [
   "Led a fleet optimization program for the department's fleet of about 2,700 pieces of equipment",
   "Planned predictive maintenance to reduce vehicle downtime and extend asset life"
  ],
  "res": [],
  "services": [
   "operations",
   "asset-mgmt"
  ],
  "subsectors": [
   "sub-highways"
  ],
  "industry": "transport",
  "industry2": null
 },
 "cs-nv-om": {
  "id": "cs-nv-om",
  "ch": "The department wanted a statewide look at how its maintenance, operations, fleet, and facilities were managed.",
  "when": "2022 to 2023",
  "did": [
   "Assessed the department's maintenance and operations programs statewide",
   "Reviewed asset management, performance management, fleet and facilities, district operations, organization, budgeting, and traffic operations",
   "Ran a Maintenance Academy in two events, with a final report",
   "Surveyed employees for the operations review, with more than 200 responses",
   "Delivered a data-driven process for choosing pavement projects, and supported the first year of the Pavement Improvement Program",
   "Wrote a chip seal warranty specification and a Warranty Administration Guide, with industry meetings",
   "Presented occupational health and safety practices from other states",
   "Reviewed the earlier studies for a northern Nevada traffic management center, met with the agencies involved on its direction, and organized visits to other traffic management centers",
   "Helped organize and discuss outsourcing concepts with industry and one district"
  ],
  "res": [
   "The department started its first two warranty pilot projects in summer 2023"
  ],
  "services": [
   "operations",
   "asset-mgmt"
  ],
  "subsectors": [
   "sub-highways"
  ],
  "industry": "transport",
  "industry2": null
 },
 "cs-nv-fleet-program": {
  "id": "cs-nv-fleet-program",
  "ch": "The department wanted its equipment chosen, shared, maintained, and replaced the same way in every district, with data behind each decision.",
  "did": [
   "Analyzed the equipment fleet: the inventory, the work done with it, what leadership expected, and what industry could provide, with a gap analysis and recommendations",
   "Surveyed employees statewide on how they use equipment and what they need",
   "Compared the department's fleet replacement and disposal process side by side with other western state DOTs",
   "Interviewed district leadership, supervisors, mechanics, and maintenance crews in the districts",
   "Reviewed the department's fleet policies and performance measures, with comments and recommendations",
   "Drafted a report on current and future fleet processes"
  ],
  "res": [
   "Department leadership approved the fleet analysis recommendations, and the work moved into implementation",
   "Fleet Implementation Report delivered and presented to executive leadership in early 2023"
  ],
  "services": [
   "operations",
   "asset-mgmt",
   "fleet"
  ],
  "subsectors": [
   "sub-highways"
  ],
  "industry": "transport",
  "industry2": null
 },
 "cs-aerodiv": {
  "id": "cs-aerodiv",
  "ch": "Aviation demands are changing: rural airports, drones, and advanced air mobility. The study asks how a broader aviation role could be organized, governed, and funded.",
  "when": "Since 2026",
  "did": [
   "Built a nine-task research plan with three implementation models",
   "Compiled a 100-source literature review",
   "Facilitated a technical advisory panel",
   "Interviewing aviation stakeholders statewide",
   "Scanned state aeronautics programs nationally and built a comparative matrix"
  ],
  "res": [],
  "services": [
   "research",
   "grants",
   "org-design",
   "aero-division"
  ],
  "subsectors": [
   "sub-aviation"
  ],
  "industry": "transport",
  "industry2": null
 },
 "cs-de-tech": {
  "id": "cs-de-tech",
  "ch": "The department's Division of Technology and Innovation Services, in Dover, needed a clear roadmap for innovation and technology investment, tied to agency goals.",
  "when": "2024 to 2025",
  "did": [
   "Interviewed eight division leaders and four outside stakeholders, and analyzed strengths and weaknesses",
   "Wrote a technology strategic plan aligned with agency goals and operating priorities",
   "Made a one-page visual summary for executive alignment"
  ],
  "res": [
   "Technology strategic plan approved by the department's chief information officer in April 2025"
  ],
  "services": [
   "tech-strategy",
   "strategic-planning"
  ],
  "subsectors": [],
  "industry": "transport",
  "industry2": null
 },
 "cs-ut-am": {
  "id": "cs-ut-am",
  "ch": "The department wanted its asset management programs to support long-term investment decisions.",
  "did": [
   "Reviewed the department's asset management programs",
   "Developed an asset management strategy, vision, and implementation plan, using the ISO 55000 standard as the guide"
  ],
  "res": [
   "A plan of action for improving the department's asset management"
  ],
  "services": [
   "asset-mgmt"
  ],
  "subsectors": [],
  "industry": "transport",
  "industry2": null
 },
 "cs-va-maint": {
  "id": "cs-va-maint",
  "ch": "The department wanted to know how its statewide performance-based maintenance contracts were working and how to improve them.",
  "did": [
   "Reviewed Turnkey Asset Maintenance Services (TAMS), the department's performance-based highway maintenance contracts, statewide",
   "Delivered an action plan, procurement recommendations, and performance measures and levels of service for interstate maintenance"
  ],
  "res": [
   "Process improvements that increase contractor accountability and let VDOT spend less time monitoring contractors' work"
  ],
  "services": [
   "operations",
   "procurement"
  ],
  "subsectors": [
   "sub-highways"
  ],
  "industry": "transport",
  "industry2": null
 },
 "cs-maint-model": {
  "id": "cs-maint-model",
  "ch": "Maintenance contractors wanted a contracting model DOTs could tailor, from staff support to full performance-based programs.",
  "did": [
   "Interviewed DOT leaders in Florida, Texas, Georgia, South Carolina, Utah, and Arizona about their maintenance needs",
   "Recommended Flexible Asset Management Services: four contracting methods a DOT can combine"
  ],
  "res": [],
  "services": [
   "operations",
   "procurement",
   "outsourcing"
  ],
  "subsectors": [
   "sub-highways"
  ],
  "industry": "contractors",
  "industry2": null
 },
 "cs-pa-budget": {
  "id": "cs-pa-budget",
  "ch": "Maintenance budgets needed to be easier to explain and tied to performance.",
  "did": [
   "Reviewed how maintenance budgets are allocated, compared them with leading practice, and delivered a white paper with near-, mid-, and long-term steps"
  ],
  "res": [],
  "services": [
   "finance",
   "operations"
  ],
  "subsectors": [],
  "industry": "transport",
  "industry2": null
 },
 "cs-nyc-parks": {
  "id": "cs-nyc-parks",
  "ch": "A city parks system needed a consistent way to track assets and plan capital projects.",
  "did": [
   "Helped set an asset investment strategy for 29,000 acres of parkland",
   "Developed a standard asset inspection protocol to inform capital planning, with a phased rollout",
   "Built a framework and tool to prioritize capital needs across asset types"
  ],
  "res": [],
  "services": [
   "asset-mgmt"
  ],
  "subsectors": [],
  "industry": "gov",
  "industry2": null
 },
 "cs-riverside": {
  "id": "cs-riverside",
  "ch": "The county wanted to find savings and efficiency in how it manages fleet and facilities.",
  "did": [
   "Reviewed the county's fleet and facility management operations"
  ],
  "res": [],
  "services": [
   "operations",
   "asset-mgmt"
  ],
  "subsectors": [],
  "industry": "gov",
  "industry2": null
 },
 "cs-major": {
  "id": "cs-major",
  "ch": "Three major projects: a $1.2 billion Mississippi River crossing, a $275 million river bridge, and a $2 billion light rail line.",
  "when": "2018 to 2021",
  "did": [
   "Facilitated partnering between the owner and contractor on the I-74 Mississippi River Crossing (Iowa and Illinois), the I-70 Rocheport River Bridge (Missouri), and Southwest Light Rail Transit (Minneapolis, Minnesota): a project charter, a risk register, an issue resolution process, and team evaluations",
   "Supported project coordination, risk management, budget control, and multi-agency coordination across the three projects"
  ],
  "res": [],
  "services": [
   "program-delivery",
   "partnering"
  ],
  "subsectors": [
   "sub-highways",
   "sub-rail"
  ],
  "industry": "transport",
  "industry2": "contractors"
 },
 "cs-partnering": {
  "id": "cs-partnering",
  "ch": "The owner's first progressive design-build project. Owner and contractor had to agree on how they would work together through preconstruction under schedule pressure.",
  "did": [
   "Facilitated the kickoff: project charter, partnership goals, and communication protocols",
   "Set up a five-step issue resolution ladder",
   "Ran joint risk-rating breakouts",
   "Set up anonymous team evaluation surveys"
  ],
  "res": [
   "Kickoff held and summarized"
  ],
  "services": [
   "program-delivery",
   "procurement",
   "partnering"
  ],
  "subsectors": [
   "sub-highways"
  ],
  "industry": "transport",
  "industry2": "contractors"
 },
 "cs-pooled": {
  "id": "cs-pooled",
  "ch": "Transportation departments collect drone data for surveying, construction, and inspection with no shared, tested standard. They need standards they can write into specifications.",
  "when": "Since 2026",
  "did": [
   "Organized working groups across six standard areas",
   "Facilitated subcommittee and consensus sessions",
   "Proposed a performance-based, sensor-neutral testing framework",
   "Compiled member states' existing standards",
   "Brought together working groups from 19 member states",
   "Ran a national baseline survey, with responses from 26 agencies",
   "Ran field calibration testing at bridges with two state DOTs",
   "Drafted bridge inspection guidance tied to the national bridge inspection manuals"
  ],
  "res": [],
  "services": [
   "research",
   "drone-programs"
  ],
  "subsectors": [
   "sub-highways",
   "sub-aviation"
  ],
  "industry": "gov",
  "industry2": null
 },
 "cs-pdn": {
  "id": "cs-pdn",
  "ch": "The department set out to map its project delivery process step by step, so every discipline's activities, deliverables, and responsible parties are written down in one place. Its project managers also needed one place to find the network's tools, templates, manuals, and training, and a reliable way to request and approve changes to them.",
  "when": "Since 2025",
  "did": [
   "## The process",
   "Mapped the process in five steps, from concept study to plans, specifications, and estimate, in weekly workshops with the department's experts",
   "Wrote the activities, deliverables, tasks, and responsible parties for 17 disciplines, in more than 200 task sheets",
   "Built quality checks and cost estimate checks into the steps",
   "Worked an alternative delivery screening tool and selection matrix into the network",
   "Updated the concept study checklists, decision trees, and guidance for safety program projects",
   "Starting a concept study pilot for pavement preservation projects",
   "## The tools",
   "Built the toolkit project teams use: a Master Scope of Work template and generator, a Cost Estimating Tool, a risk register and Risk Management Plan, a Project Commitment Document, a Project Status Report, concept study report templates and checklists, quality control checklists, and request forms for utilities, railroad, right of way, geotechnical, hydraulic, and bridge work",
   "Tied the Project Manager's Manual and a man-hour estimating tool to the network's tasks",
   "Built man-hour and cost estimating packages",
   "Posting and checking updates to the scope of work generator, cost estimating tool, and other templates before release",
   "Published clean copies of every tool and template, with tracked changes and reviewer comments removed",
   "## The website",
   "Built the network's website around its five steps, with the activity diagrams, the full manual, a resource library, and a training page",
   "Organized the resource library by discipline, with search, a download per discipline, and an updated date on every file",
   "Linked it to the systems staff already use, including the department's scheduling system and its project reporting portal",
   "Built a full preview copy of the site so reviewers could approve changes before go-live",
   "Checked every link in the manual, with none broken at release",
   "## The change request system",
   "Built the change request system: a web form, a tracker, automatic routing to reviewers and the department, quality check, and close-out",
   "## Training and rollout",
   "Built five self-paced courses for project teams, narrated and captioned, with video lessons in storyboard",
   "Trained project managers on the network, and held orientation sessions for department leadership, project managers, and delivery staff",
   "Wrote a project manager's manual and online courses, including consultant management",
   "Developed risk management training",
   "Supported pilot projects, and held implementation meetings with headquarters sections and all districts"
  ],
  "res": [
   "First version of the network delivered to the department in December 2025",
   "Version 2.0 in spring 2026, with training for project managers",
   "Site launched, and its next version went live after review with no downtime",
   "Version 2.3 of the network published on the site in October 2026",
   "Five courses published on the site, from a 20-minute orientation to building a project's scope of work and baseline schedule",
   "Change requests tracked from submission to close-out, with every decision recorded",
   "Change requests move through every step without anyone typing a status"
  ],
  "services": [
   "portals",
   "automation",
   "training-video",
   "program-delivery",
   "change-mgmt",
   "proj-delivery",
   "preconstruction",
   "alt-delivery"
  ],
  "subsectors": [
   "sub-highways"
  ],
  "industry": "transport",
  "industry2": null
 },
 "cs-tn-tech": {
  "id": "cs-tn-tech",
  "ch": "The department set out to modernize how it manages technology and data, and to govern new tools like AI, with executive leadership in the lead.",
  "when": "Since 2025",
  "did": [
   "Facilitated a technology and data governance steering committee for executive leadership",
   "Wrote more than ten standard operating procedures",
   "Ran a seven-month communications campaign for the modernization",
   "Prepared an advisory committee",
   "Providing executive-level strategic advisory, including AI governance",
   "Wrote a technology project delivery method, with an intake form and a tier worksheet",
   "Wrote a data policy and data governance roles, decision rights, and workflows",
   "Supported the department's AI strategy: a kickoff, a roadmap workshop, governance documents, and user onboarding",
   "Reviewed requirements for a new enterprise resource planning system",
   "Built a project management curriculum for the technology division"
  ],
  "res": [
   "More than ten standard operating procedures complete",
   "Two-year technology work plan presented to the senior team in April 2026"
  ],
  "services": [
   "tech-strategy",
   "data-governance",
   "ai",
   "change-mgmt",
   "exec-advisory"
  ],
  "subsectors": [
   "sub-highways"
  ],
  "industry": "transport",
  "industry2": null
 },
 "cs-hi": {
  "id": "cs-hi",
  "ch": "The department wanted an outside assessment of how it delivers projects, administers construction, and maintains its highways across its districts, and a roadmap for what to take on next.",
  "when": "Since 2026",
  "did": [
   "Planning the rollout of the department's construction management platform on live projects",
   "Spent a kickoff week on site with materials, harbors, airports, administration, and construction staff at each district",
   "Documented project delivery workflows by discipline with design staff, and assessed maintenance and emergency operations at four district offices",
   "Assessed three of the department's platforms for overlap and integration, and checked a design-build request for proposals against platform setup",
   "Built a materials source inventory, and reviewed contractor claims with districts",
   "The construction knowledge site and the harbor technology demonstration are their own projects"
  ],
  "didLinks": {
   "The construction knowledge site and the harbor technology demonstration are their own projects": [
    "cs-knowledge",
    "cs-harbor"
   ]
  },
  "res": [
   "Final report delivered to senior leadership in August 2026, with a strategic initiative roadmap"
  ],
  "services": [
   "construction",
   "portals",
   "program-delivery",
   "training-video",
   "drone-programs",
   "workforce",
   "data-governance"
  ],
  "subsectors": [
   "sub-highways",
   "sub-aviation",
   "sub-ports"
  ],
  "industry": "transport",
  "industry2": null
 },
 "cs-ia-partnering": {
  "id": "cs-ia-partnering",
  "ch": "The department and its contractors wanted an honest read on how well they work together on construction projects across the state, and a short list of what to fix first.",
  "did": [
   "Facilitated eight listening sessions: four with department headquarters and district leaders, and four with contractors, suppliers, and their association",
   "Gathered input from 30 people across the department and the industry",
   "Ran a statewide workshop where mixed groups worked through the five biggest issues",
   "Wrote an action plan for each issue, with champions and timelines"
  ],
  "res": [
   "Final report with five action plans: contract administration across districts, contract time, plan quality and early constructability input, compliance paperwork and payment, and consultant inspector roles"
  ],
  "services": [
   "partnering",
   "construction",
   "program-delivery"
  ],
  "subsectors": [
   "sub-highways"
  ],
  "industry": "transport",
  "industry2": "contractors",
  "figure": {
   "title": "At a glance",
   "steps": [
    {
     "t": "8 sessions",
     "d": ""
    },
    {
     "t": "30 voices",
     "d": ""
    },
    {
     "t": "1 statewide workshop",
     "d": ""
    },
    {
     "t": "5 action plans",
     "d": ""
    }
   ]
  }
 },
 "cs-db-partnering": {
  "id": "cs-db-partnering",
  "ch": "Three large projects, each with years of work between the owner and its contractor. Both sides needed a way to settle issues fast and keep working as one team through construction.",
  "did": [
   "Facilitated partnering on a design-build river bridge project: kickoff, a team mission statement with seven shared goals, an issue resolution ladder, a joint risk register, workshops through construction, and team surveys through closeout",
   "Facilitated partnering on an urban interstate design-build project: kickoff, recurring partnering workshops, and team surveys reported to both sides",
   "Facilitated partnering on a Mississippi River bridge replacement: a partnering charter, workshops, and team surveys"
  ],
  "res": [
   "Closeout survey and lessons learned delivered to both sides on the river bridge project"
  ],
  "services": [
   "partnering",
   "program-delivery",
   "construction"
  ],
  "subsectors": [
   "sub-highways"
  ],
  "industry": "contractors",
  "industry2": null,
  "figure": {
   "title": "Issue resolution ladder",
   "intro": "An unresolved issue moves up a level at set times.",
   "steps": [
    {
     "t": "4 hours",
     "d": ""
    },
    {
     "t": "1 day",
     "d": ""
    },
    {
     "t": "3 days",
     "d": ""
    },
    {
     "t": "1 week",
     "d": ""
    },
    {
     "t": "2 weeks",
     "d": ""
    }
   ]
  }
 },
 "cs-pv-pmo": {
  "id": "cs-pv-pmo",
  "ch": "The firm runs phased engineering projects across several tools, and its current setup doesn't fit how its phases, reviews, time, and invoicing actually work.",
  "when": "Since 2026",
  "did": [
   "Supporting the firm's current project tools while the new system is built",
   "Building a project management system around phased projects, time, and invoicing",
   "Moved the firm's time-tracking system by script, with a full audit trail",
   "Built measure dashboards and team targets",
   "Built project tracking boards, automations, and timesheet integrations",
   "Built estimate, schedule, and template workflows"
  ],
  "res": [],
  "services": [
   "automation",
   "dashboards",
   "data-governance"
  ],
  "subsectors": [],
  "industry": "private",
  "industry2": "contractors"
 },
 "cs-pv-reporting": {
  "id": "cs-pv-reporting",
  "ch": "The firm's project, accounting, customer, time, and reporting data lived in separate systems, and teams pushed data into spreadsheets by hand to get a usable view. Leaders needed to see both the whole firm and each department, and field staff had no easy way to reach site maps, photos, and documents from a phone.",
  "did": [
   "Moved the firm's data from Zoho into monday.com",
   "Connected its platforms with Make so data moved reliably",
   "Built dashboards that drill down from the firm-wide view to project detail",
   "Built a small mobile app so field staff can reach project files"
  ],
  "res": [
   "Leaders got a clear view of operations without rebuilding reports",
   "Project teams could reach records and files from the field",
   "Data moved reliably, with less handling by hand and more confidence in the numbers"
  ],
  "services": [
   "automation",
   "dashboards",
   "data-governance"
  ],
  "subsectors": [],
  "industry": "private",
  "industry2": null,
  "tools": [
   "Monday.com",
   "Make.com",
   "QuickBooks",
   "QuickBooks Time",
   "Looker Studio",
   "Google Drive"
  ]
 },
 "cs-pv-service": {
  "id": "cs-pv-service",
  "ch": "When a project was finished, it moved to the service team, but the handoff happened in silos. Service staff had little insight into what the install team had done and often started from scratch to learn a project's history, and project managers had no time to walk them through each one.",
  "did": [
   "Moved the workflow into monday.com and the firm's Google tools",
   "Tracked every client visit against the project history",
   "Captured what was done on site with on-site forms and a Google Calendar sync",
   "Filed attachments and records into a matching Google Drive structure"
  ],
  "res": [
   "Service teams stopped starting from zero",
   "Project knowledge followed the work instead of living in one project manager's memory",
   "The handoff from delivery to service became cleaner and faster"
  ],
  "services": [
   "automation"
  ],
  "subsectors": [],
  "industry": "private",
  "industry2": null,
  "tools": [
   "Monday.com",
   "Make.com",
   "Google Suite",
   "Google Calendar"
  ]
 },
 "cs-pv-field": {
  "id": "cs-pv-field",
  "ch": "Field staff captured information on every site visit, but it wasn't structured for later use. Attachments and field details were hard to find afterward, and office staff had to chase people down to learn what happened.",
  "did": [
   "Added form links directly to Google Calendar events",
   "Set up monday.com forms that create a record the moment field staff submit them",
   "Filed attachments automatically into the right Google Drive folders",
   "Connected what the field captures back to the project record"
  ],
  "res": [
   "Field information became easy to find, reuse, and report on",
   "Attachments landed in the right place automatically",
   "The office could see what happened on every site visit"
  ],
  "services": [
   "automation"
  ],
  "subsectors": [],
  "industry": "private",
  "industry2": null,
  "tools": [
   "Monday.com",
   "Make.com",
   "Google Calendar",
   "Google Drive"
  ]
 },
 "cs-pv-capacity": {
  "id": "cs-pv-capacity",
  "ch": "Capacity planning depended on scattered updates and local knowledge. There was no view of where equipment was, how long it was booked, or when it was down. People and equipment constraints were managed inconsistently, and equipment service windows never showed up in the plan.",
  "did": [
   "Built one capacity system in monday.com and Make",
   "Set it up as a template to manage people and equipment together",
   "Tracked locations, booking windows, use, and downtime",
   "Made unavailable equipment visible before it caused conflicts"
  ],
  "res": [
   "Capacity is visible before bottlenecks become emergencies",
   "The firm knows what's booked, available, or out of service",
   "Specialized equipment is scheduled right alongside people"
  ],
  "services": [
   "automation",
   "dashboards"
  ],
  "subsectors": [],
  "industry": "private",
  "industry2": null,
  "tools": [
   "Monday.com",
   "Make.com"
  ]
 },
 "cs-pv-single": {
  "id": "cs-pv-single",
  "ch": "Manufacturing was spread across workshops, with poor communication between the office and the floor. There was no reliable way to record time against a specific item, the data sat unused, and matching materials, time, and cost took heavy manual entry.",
  "did": [
   "Rebuilt the operation around one monday.com board structure",
   "Set up one source of truth, with permission levels for each workshop",
   "Used formulas and Make to calculate cost, materials, hours, and assignments automatically",
   "Added time tracking and signed work orders inside monday.com"
  ],
  "res": [
   "Estimated time, actual time, team, cost, and price sit in one place",
   "Leaders track workshop speed, profitability, staffing, and capacity",
   "Quotes and invoices are automated, and jobs are assigned by capacity"
  ],
  "services": [
   "automation",
   "dashboards"
  ],
  "subsectors": [],
  "industry": "private",
  "industry2": null,
  "tools": [
   "Monday.com",
   "Make.com",
   "Tracket",
   "DocuSign"
  ]
 },
 "cs-pv-sales": {
  "id": "cs-pv-sales",
  "ch": "The handoff from business development to delivery and finance ran on email and memory. Scope, fee, billing terms, and the project owner arrived late or incomplete, and project setup took one to two weeks.",
  "did": [
   "Set the few fields an opportunity needs before it can close as won",
   "Required scope, fee, terms, owner, and kickoff date in Salesforce",
   "Built an automation that creates the project record in monday.com at close",
   "Notified finance and delivery at once, with a standard kickoff checklist"
  ],
  "res": [
   "Project setup went from one to two weeks to billing-ready in days",
   "Finance has the setup information at close",
   "Project managers start kickoffs with what they need"
  ],
  "services": [
   "automation"
  ],
  "subsectors": [],
  "industry": "private",
  "industry2": null,
  "tools": [
   "Salesforce",
   "Monday.com",
   "Make.com",
   "QuickBooks",
   "SharePoint",
   "Teams"
  ]
 },
 "cs-pd-manual": {
  "id": "cs-pd-manual",
  "ch": "The department wanted a consistent, written way to select and prioritize projects across its funding programs.",
  "when": "Since 2025",
  "did": [
   "Interviewed program managers and wrote more than thirty State of Practice reports on the department's programs",
   "Reviewed twelve other states' prioritization processes",
   "Wrote white papers on the Statewide Transportation Improvement Program and how it works with the asset management plan and the state's priority program",
   "Worked through project selection templates with 14 programs, and built fillable score sheets",
   "Built a bridge screening and prioritization tool, with tutorials for program managers and bridge staff",
   "Built statewide asset mapping tools and a screening toolkit for concept studies",
   "Built a prioritization tool now used to triage the highway project pipeline",
   "Analyzed bridge inspection and condition data, and prepared bridge bundling options, maps by district, and procurement recommendations",
   "Calculated a benefit-cost ratio for an interstate project, and coordinated with the safety program",
   "Prepared a Call for Projects package",
   "Drafted the Program Development Manual"
  ],
  "res": [
   "Bridge screening process finalized",
   "Program Development Manual draft sent to the department in October 2026"
  ],
  "services": [
   "program-delivery",
   "planning",
   "federal-aid"
  ],
  "subsectors": [
   "sub-highways"
  ],
  "industry": "transport",
  "industry2": null
 },
 "cs-consult-flow": {
  "id": "cs-consult-flow",
  "ch": "The department wanted its consultant contracting steps connected in one workflow, on a platform it already used.",
  "when": "Since 2025",
  "did": [
   "Researched practice in other states: utilization in 9 states, expense and overhead in 11, and one requirement across all 50",
   "Wrote a national best practices report on consultant contract administration",
   "Mapped the contracting steps and who owns each form",
   "Rebuilt the first six steps of consultant contracting as one connected workflow, starting from a single intake form",
   "Built the workflow on the department's work management platform: intake forms with conditional logic, an advertisement request board, a proposal scoring engine with weighted criteria and firm ranking, contract execution routing, letters generated from records, task order and purchase order tracking, invoice review gates, and audit holds",
   "Turned the agreement request form and the consensus scoring tool into standalone web applications",
   "Wrote general engineering services scopes, and a man-hour estimating tool tied to the delivery network's tasks"
  ],
  "res": [
   "National best practices report approved in October 2025",
   "The two web applications moved into the department's own account in September 2026",
   "More than 20 staff across three divisions walked through the new contracting workflow"
  ],
  "services": [
   "procurement",
   "automation",
   "portals"
  ],
  "subsectors": [
   "sub-highways"
  ],
  "industry": "transport",
  "industry2": null
 },
 "cs-lpa-manual": {
  "id": "cs-lpa-manual",
  "ch": "The department wanted one manual for the local agencies that deliver federal-aid projects, with clear roles for headquarters, districts, and the agencies themselves.",
  "when": "Since 2025",
  "did": [
   "Analyzed seven states' manuals and interviewed five peer states",
   "Proposed the program structure, and set up the manual's charter, schedule, chapter authors, and steering committee",
   "Drafted an eleven-chapter manual, from federal-aid basics, environmental, and right of way through procurement, construction administration, financial management, closeout, and agencies that let their own contracts",
   "Drafted a certification process and an oversight policy",
   "Developed a five-module core training course and Responsible Charge training"
  ],
  "res": [
   "Manual, certification process, and oversight policy in draft",
   "Five core training modules built by October 2026"
  ],
  "services": [
   "lpa",
   "federal-aid"
  ],
  "subsectors": [
   "sub-highways"
  ],
  "industry": "transport",
  "industry2": null
 },
 "cs-mqa-fleet": {
  "id": "cs-mqa-fleet",
  "ch": "The department wanted a consistent way to rate maintenance quality across its districts, current training for the crews who operate its equipment, and a clearer picture of its fleet.",
  "when": "Since 2025",
  "did": [
   "Visited districts, interviewed staff, compared twelve peer states, and presented findings to headquarters",
   "Facilitated a Maintenance Quality Assurance Steering Committee, and set threshold criteria",
   "Wrote the field manual, with a mapping component, and the inspection handbook",
   "Trained inspectors in person, in three sessions",
   "Coordinated the content of a field data collection app",
   "Developed training for winter operations, load securement, diesel exhaust fluid, first echelon maintenance, and equipment safety, with 43 equipment demonstration checklists for the operator certification program",
   "Analyzed the fleet's life cycle, idle time, fuel, and usage, audited equipment records against system data, ran asset-sharing workshops in five districts, and wrote requirements for a fleet management system",
   "Reviewed all 13 responses to a maintenance outsourcing request for information, presented them to leadership, and prepared an outsourcing estimate for the department's evaluation"
  ],
  "res": [
   "Inspection handbook published in January 2026, and version 1.1 in May 2026",
   "Inspector training delivered in early 2026",
   "Winter operations training program developed and presented to the maintenance steering committee"
  ],
  "services": [
   "operations",
   "asset-mgmt",
   "workforce"
  ],
  "subsectors": [
   "sub-highways"
  ],
  "industry": "transport",
  "industry2": null
 },
 "cs-cam": {
  "id": "cs-cam",
  "ch": "The department was moving to new standard specifications and wanted its construction administration guidance to match.",
  "when": "Since 2025",
  "did": [
   "Interviewed seven districts, surveyed peer states, and briefed construction leadership",
   "Drafted the Construction Administration Manual and cross-referenced it to the new standard specifications",
   "Updated it to the 2026 specifications, with flow charts for calendar-day and working-day contracts and guidance on change orders",
   "Interviewed inspectors and technicians across districts, and presented the findings to construction leadership",
   "Documented construction workflows, and outlined construction training",
   "Prepared reorganization packets for district construction and maintenance in eight districts",
   "Supported the rollouts of construction inspection and preconstruction software: workflows, cutover and contract activation guidance, and user setup"
  ],
  "res": [
   "Manual updated to the 2026 standard specifications",
   "The construction management platform is now the primary system on active projects"
  ],
  "services": [
   "construction",
   "org-design"
  ],
  "subsectors": [
   "sub-highways"
  ],
  "industry": "transport",
  "industry2": null
 },
 "cs-tn-reorg": {
  "id": "cs-tn-reorg",
  "ch": "A department-wide restructuring set out to cut layers of supervision and update how every bureau is organized, classified, and staffed.",
  "when": "2022 to 2025",
  "did": [
   "Assessed divisions across engineering, planning, and administration, each with a proposed organization chart: right of way, utilities, program development, local programs, long range planning, multimodal transportation, freight and logistics, procurement, finance, aeronautics, civil rights, central services, and internal audit",
   "Designed organization structures for the engineering divisions and for district maintenance and construction, with transition plans",
   "Finalized organization structures for traffic design and traffic operations, and reviewed roles and responsibilities across traffic operations, traffic design, and information technology",
   "Wrote position descriptions and section primers for every bureau",
   "Built staff transition tracking tools for all four regions, and ran a restructuring status tracker for the department",
   "Worked out the wage and benefit cost of the new structure, re-analyzed pay after state pay increases, and kept positions, salaries, and benefits inside the proposed budget",
   "Ran rollout workshops for directors, wrote 100-day plans for new directors, and sat on interview panels for leadership hires",
   "Designed and ran on-site business meetings on utilization planning, the pavement program, plans and estimates, asset management, and traffic roles",
   "Met with regions and divisions on how the reorganization was going, and reported to human resources",
   "Built a project utilization program: staff effort by discipline for every region, with training and an online tool",
   "Assessed the human resources office, mapped its processes with responsibility charts, and finalized its organization chart"
  ],
  "res": [
   "493 position descriptions and 91 primers delivered",
   "Organization structures finalized for all bureaus against the next fiscal year's budget",
   "Eight assessment reports delivered at closeout",
   "The utilization program was used to build the department's consultant acquisition plan"
  ],
  "services": [
   "org-design",
   "change-mgmt",
   "exec-advisory",
   "finance",
   "program-delivery",
   "planning",
   "preconstruction",
   "lpa"
  ],
  "subsectors": [
   "sub-highways"
  ],
  "industry": "transport",
  "industry2": null
 },
 "cs-tn-amdiv": {
  "id": "cs-tn-amdiv",
  "ch": "The department created an Asset Management Division and needed it defined and staffed, starting with a new director.",
  "when": "2024 to 2025",
  "did": [
   "Wrote the vision for asset management at the department, and a 100-day plan, with the new director",
   "Built the organization chart and a prioritized hiring plan",
   "Wrote position descriptions for the director and every manager: fleet and facilities, bridge, pavement, ancillary infrastructure, transportation data systems, quality management, and performance management",
   "Wrote primers for all seven sections",
   "Wrote a fleet and facilities asset management strategy, and built fleet policies from fleet data",
   "Reviewed snow routes and dump trucks at county facilities, analyzed vehicle and equipment usage, and proposed a phased fleet surplus process",
   "Researched pavement treatments, deterioration curves, levels of service, and target setting"
  ],
  "res": [
   "Division stood up with its organization chart, hiring plan, position descriptions, and primers",
   "Fleet and facilities strategy presented to executive leadership"
  ],
  "services": [
   "asset-mgmt",
   "operations",
   "org-design"
  ],
  "subsectors": [
   "sub-highways"
  ],
  "industry": "transport",
  "industry2": null
 },
 "cs-tn-psm": {
  "id": "cs-tn-psm",
  "ch": "The department wanted its process for buying consultant services written down, from advertisement through negotiation and close-out.",
  "when": "2022 to 2024",
  "did": [
   "Assessed how the department buys consultant services",
   "Wrote a Professional Services Policies and Procedures Manual, a Design-Build Procurement Manual, and a Negotiations Manual",
   "Drew flowcharts for every delivery method",
   "Wrote a contract close-out process, and scope templates by contract type and discipline",
   "Drafted an adjusted-score design-build request for proposals and design-build procurement language",
   "Surveyed six states on two-phase and single-phase advertisement, and wrote guidance on running a two-phase process",
   "Built negotiation memo templates, rate analysis tools, and an active contract list to watch contract expirations",
   "Reviewed best practice on evaluating consultant performance"
  ],
  "res": [
   "All three manuals finalized in July 2023",
   "Advertisement request form finalized"
  ],
  "services": [
   "procurement",
   "alt-delivery"
  ],
  "subsectors": [
   "sub-highways"
  ],
  "industry": "transport",
  "industry2": null
 },
 "cs-pd-prof": {
  "id": "cs-pd-prof",
  "ch": "After a reorganization, the department needed every position described and a proficiency program for each specialty, bureau by bureau.",
  "when": "Since 2025",
  "did": [
   "Wrote position descriptions and primers for the engineering, planning, and administration bureaus, each reviewed with the department's experts",
   "Built a dashboard that tracked every position description",
   "Built proficiency programs as task sheets and demonstration sheets, many in week-long in-person sessions: engineering specialists at two levels in about 30 disciplines, and specialists in environmental work, geodetics, traffic design, professional services, project management, asset management, aeronautics, rail, planning, local programs, finance, and procurement",
   "Built proficiency programs for four right of way specialties",
   "Built an appraisal tracker for the right of way appraiser program"
  ],
  "res": [
   "Final lists of position descriptions and proficiency programs delivered at the end of 2025",
   "Right of way property management and excess lands program delivered final in October 2026"
  ],
  "services": [
   "workforce",
   "org-design",
   "proj-delivery",
   "preconstruction",
   "construction",
   "planning",
   "federal-aid",
   "lpa",
   "procurement"
  ],
  "subsectors": [
   "sub-highways"
  ],
  "industry": "transport",
  "industry2": null
 },
 "cs-pbmc2": {
  "id": "cs-pbmc2",
  "ch": "After two performance-based maintenance contracts in one region, the department set out to write the next one for a second region.",
  "when": "2025 to 2026",
  "did": [
   "Gathered lessons learned from the first region's contracts",
   "Drafted the scope of services with the region and the state maintenance office",
   "Checked baseline performance scores against the contract's criteria",
   "Wrote a snow and ice white paper and contract support recommendations",
   "Built the contract cost estimate and work plan from the asset inventory: work quantities, unit prices, a backlog maintenance plan, a staffing plan, and equipment and crew costs",
   "Organized a peer exchange between two state DOTs on performance-based maintenance contracts and maintenance rating"
  ],
  "res": [
   "Cost estimate and work plan finalized in late 2025",
   "The contract, now called a Flexible Asset Maintenance contract, kicked off with a partnering session in March 2026"
  ],
  "services": [
   "operations",
   "procurement",
   "partnering"
  ],
  "subsectors": [
   "sub-highways"
  ],
  "industry": "transport",
  "industry2": null
 },
 "cs-harbor": {
  "id": "cs-harbor",
  "ch": "The department wanted to see what uncrewed systems could do for its harbors: inspection above and below the water, and port security.",
  "when": "2026",
  "did": [
   "Ran a two-day harbor technology demonstration with aerial drones, an uncrewed surface vessel, a remotely operated underwater vehicle, and mobile lidar",
   "Wrote a structural summary report within days, after underwater footage showed concerns at a highway bridge",
   "Prepared a federal Port Security Grant application for drone port security",
   "Prepared drone and advanced air mobility use-case briefings and a drone roadmap",
   "Prepared a two-day remote pilot preparation course",
   "Supported remote pilot training for about 20 candidates"
  ],
  "res": [
   "Port Security Grant application submitted in July 2026",
   "Demonstration held in September 2026"
  ],
  "services": [
   "drone-programs",
   "grants"
  ],
  "subsectors": [
   "sub-ports",
   "sub-aviation"
  ],
  "industry": "transport",
  "industry2": null
 },
 "cs-db-pursuit": {
  "id": "cs-db-pursuit",
  "ch": "A contractor pursuing a design-build interchange project brought us in to advise through the pursuit.",
  "when": "2023 to 2024",
  "did": [
   "Advised on the contractor's approach to the pursuit",
   "Reviewed the owner's draft request for proposals and technical provisions",
   "Reviewed the contractor's alternative designs",
   "Stayed with the team through the best-and-final-offer meeting"
  ],
  "res": [],
  "services": [],
  "subsectors": [],
  "industry": "contractors",
  "industry2": null
 },
 "cs-reorg": {
  "id": "cs-reorg",
  "ch": "The department set out to reorganize, and needed the structure, the positions, and the rollout worked through with its executive team.",
  "when": "Since 2025",
  "did": [
   "Compared salaries and pay compression with other DOTs and the market",
   "Drafted a proposed functional organization chart and design rules, and vetted the options with senior leadership",
   "Took the functional and position-based charts through executive decisions",
   "Wrote position descriptions for executives and directors, and primers for twelve offices",
   "Built a classification framework and prepared civil service forms",
   "Prepared the rollout communications: questions and answers, talking points, and a transition support roadmap",
   "Wrote a reorganization timeline and an analysis of the hurdles for department leadership",
   "Ran a 45-day organization structure analysis: current and future-state charts for sixteen sections, with a financial impact analysis",
   "Built a change management toolkit: a process map, a triage form, a change champion network guide, leadership alignment, an impact assessment, a benefits scorecard, and a decision authority matrix",
   "Wrote case-for-change papers on appointing authority, career paths, and rotational programs, and a continuous performance management framework",
   "Wrote a 12-month communication plan",
   "Built an interactive organization chart that links each function to its description",
   "Gave strategic communications support for the department's improvement program",
   "Wrote human resources documentation for the restructuring",
   "Developed leadership and technical training and competency-based staff development",
   "Prepared reorganization packets for district construction and maintenance in eight districts"
  ],
  "res": [
   "Functional organization chart finalized for the executive team in November 2025",
   "Rollout communications delivered for the July 2026 announcement"
  ],
  "services": [
   "org-design",
   "change-mgmt",
   "exec-advisory",
   "workforce",
   "finance"
  ],
  "subsectors": [
   "sub-highways"
  ],
  "industry": "transport",
  "industry2": null
 },
 "cs-measures": {
  "id": "cs-measures",
  "ch": "The department wanted performance measures its executive team, its sections, and its districts could manage by.",
  "when": "Since 2025",
  "did": [
   "Wrote a performance measures strategy",
   "Facilitated a department-level workshop, then workshops for more than a dozen sections and for the districts",
   "Built a master library of measures tied to legislative mandates",
   "Drafted dashboards and tested them with users",
   "Set governance and rollout milestones for the measures",
   "Finalized the measures and governance for an executive dashboard",
   "Trained staff on the system that manages the measures"
  ],
  "res": [
   "Strategy approved by the executive team in March 2025",
   "Executive dashboard measures and governance finalized"
  ],
  "services": [
   "strategic-planning",
   "dashboards",
   "exec-advisory"
  ],
  "subsectors": [
   "sub-highways"
  ],
  "industry": "transport",
  "industry2": null
 },
 "cs-tn-it": {
  "id": "cs-tn-it",
  "ch": "As part of a department-wide restructuring, the department's IT division needed a strategic plan and an organization to carry it out.",
  "when": "2023 to 2024",
  "did": [
   "Wrote the IT Strategic Plan with the IT leadership team, with a one-page version",
   "Facilitated meetings between IT, traffic operations, and traffic design, with a summary report, a roles and responsibilities matrix, and recommendations",
   "Finalized the IT organization chart, with a transition plan and an implementation roadmap",
   "Prepared town hall materials, and set up quarterly exchanges with another state DOT's IT group"
  ],
  "res": [
   "IT Strategic Plan approved in September 2023",
   "IT organization chart finalized, with its transition plan"
  ],
  "services": [
   "tech-strategy",
   "org-design"
  ],
  "subsectors": [
   "sub-highways"
  ],
  "industry": "transport",
  "industry2": null
 },
 "cs-knowledge": {
  "id": "cs-knowledge",
  "ch": "The department needed one trusted home for hundreds of construction documents spread across an old wiki.",
  "when": "Since 2026",
  "did": [
   "Cataloged the construction knowledge site and gave each of 1,677 links a decision: keep, update, combine, move, or delete",
   "Backed up and preserved the original site before migration: 1,256 files and 23 training videos",
   "Logged each document's disposition in one tracking system",
   "Moved a maintenance contracts dashboard into the department's own system",
   "Inventoried the division's datasets, with owners and quality notes",
   "Reviewed and prioritized AI use cases"
  ],
  "res": [
   "Review of the wiki documents substantially complete",
   "Knowledge site transferred to department ownership"
  ],
  "services": [
   "portals",
   "data-governance",
   "dashboards",
   "construction"
  ],
  "subsectors": [
   "sub-highways"
  ],
  "industry": "transport",
  "industry2": null
 },
 "cs-p3-division": {
  "id": "cs-p3-division",
  "ch": "The department was building its capacity for major projects, public-private partnerships, and tolling, and needed the division and its positions defined.",
  "when": "Since 2025",
  "did": [
   "Wrote a primer for the department's public-private partnership division",
   "Wrote position descriptions for its alternative delivery project managers and a statewide public-private partnership project manager",
   "Rewrote the alternative delivery proficiencies for engineering specialists, reviewed with the department's experts",
   "Defined the new division's organization framework",
   "Wrote its position descriptions, from directors to technical specialists"
  ],
  "res": [
   "Public-private partnership division primer finalized in June 2025",
   "Organization framework for the new division finalized in June 2026"
  ],
  "services": [
   "alt-delivery",
   "org-design"
  ],
  "subsectors": [
   "sub-highways"
  ],
  "industry": "transport",
  "industry2": null
 },
 "cs-hr": {
  "id": "cs-hr",
  "ch": "The department's human resources office wanted its personnel transactions, onboarding, and orientation written down and run the same way.",
  "when": "Since 2025",
  "did": [
   "Mapped technical onboarding in on-site sessions, with a process map and a responsibility chart",
   "Built new employee and new leader orientation: a curriculum framework, and scripts for the orientation videos",
   "Wrote standard operating procedures for each personnel transaction, with how-to guides and a decision guide",
   "Built a quality assurance framework for HR transactions",
   "Ran a two-day HR leadership retreat, and a two-day onboarding workshop with a process map and a report",
   "Wrote a performance management toolkit: a framework, an individual performance plan template, guides, and supervisor training",
   "Presented a salary compression analysis"
  ],
  "res": [
   "Orientation package delivered in February 2026"
  ],
  "services": [
   "workforce",
   "org-design",
   "change-mgmt"
  ],
  "subsectors": [
   "sub-highways"
  ],
  "industry": "transport",
  "industry2": null
 },
 "cs-tn-leading": {
  "id": "cs-tn-leading",
  "ch": "The department wanted to compare how it staffs and runs maintenance and traffic operations with leading practice in other states.",
  "when": "2024",
  "did": [
   "Researched how other states staff and run traffic management centers and highway help truck programs, and reviewed the department's current practice",
   "Reviewed national practice for winter maintenance staffing and level of service, with fleet management practices",
   "Researched bridge inspection practice and wrote a white paper with recommendations",
   "Surveyed all states on traffic design practice, and compiled the results with national research",
   "Ran a peer survey on traffic modeling, and wrote a white paper on the business cases for operations management and intelligent transportation systems",
   "Analyzed staffing and cost at county maintenance facilities against leading national practice"
  ],
  "res": [
   "Findings and recommendations from each review presented to department leadership in 2024",
   "Traffic design survey results delivered in July 2024",
   "Summary presentation on staffing delivered to leadership in October 2024"
  ],
  "services": [
   "traffic",
   "operations"
  ],
  "subsectors": [
   "sub-highways"
  ],
  "industry": "transport",
  "industry2": null
 }

};
export const APPLIED: string[][] = [
 [
  "Process rebuild",
  "consultant contracting at a state department of transportation"
 ],
 [
  "Reporting",
  "a project-based technical services firm (our team's work before Rawlins)"
 ],
 [
  "Capacity",
  "a field services and drilling organization (our team's work before Rawlins)"
 ],
 [
  "Single source of truth",
  "a manufacturing firm of more than 100 people (our team's work before Rawlins)"
 ],
 [
  "Sales to project handoff",
  "a 130-person professional services firm (our team's work before Rawlins)"
 ],
 [
  "Field reporting",
  "a field service and project delivery firm (our team's work before Rawlins)"
 ],
 [
  "Service handoff",
  "an install, service, and maintenance firm (our team's work before Rawlins)"
 ]
];
export const PRIV: { hear: string[]; build: string[]; dot: string[]; start: string[] } = {
 "hear": [
  "The same data keyed into three systems",
  "Reports built by hand every month",
  "Field records that disappear after the site visit",
  "Leadership wants AI, with no plan or policy"
 ],
 // What we build: each line is on a Digital Solutions service page already. Capabilities, with no claim of past private-sector results.
 "build": [
  "Integrations that move data between the systems you already own",
  "Automated workflows: intake forms, routing, approvals, and document generation",
  "Dashboards that go from the whole firm down to one project",
  "Small custom apps where an off-the-shelf platform doesn't fit",
  "A readiness check and a usage policy before any AI work",
  "Documentation and training, so your team owns what we build"
 ],
 // FLAG, both lines. Engagement letters and agreements with land developers (2022 to 2026) and a retainer with a materials supplier (2025).
 "dot": [
  "We've helped land developers coordinate state DOT permitting for their projects: keeping communication with the department moving, and advising on direction, timing, and permit questions.",
  "We've advised a construction materials supplier on working with a state DOT, including product approval."
 ],
 "start": [
  "A short call about where your workflows drag",
  "A small first project that fixes one workflow end to end",
  "A readiness check before bigger data or AI work",
  "Ongoing support once it's running"
 ]
};
/* Where we work: two layers, matching the approved "Areas We Serve" map.
   No California, no international pins (content updates v4, 2.1). */
export const STATES_ACTIVE: string[] = [
 "Hawaii", "Alaska", "Nevada", "Utah", "Texas", "Arkansas", "Louisiana", "Tennessee", "Michigan", "Iowa", "Florida"
];
export const STATES_SERVED: string[] = [
 "Georgia", "North Carolina", "Virginia", "Maryland", "Delaware", "Pennsylvania", "New York", "Ohio", "Indiana", "Wisconsin", "Illinois", "Missouri", "Idaho", "Washington", "Oregon", "Minnesota"
];
export const STATES: string[] = [...STATES_ACTIVE, ...STATES_SERVED].sort();
export const STEPS: string[][] = [
 [
  "Assess",
  "We agree on the decision the work has to support. Then we look at the written requirements and the actual practice side by side, with the people who do the work."
 ],
 [
  "Rebuild",
  "We develop the structure, process, contract, or tool with the staff who will use it, and test it on real cases before it goes into use."
 ],
 [
  "Train",
  "We prepare the people who will run it, with manuals, courses, short references, and support on the job."
 ],
 [
  "Hand off",
  "We agree where it lives, who keeps it current, and how staff get help. The client owns everything we built, and we remain available for support afterward."
 ]
];
