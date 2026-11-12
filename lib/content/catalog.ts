/* GENERATED from wireframe v11 (final data) + handoff v7 section 4 (v12) by the redesign build.
   Edit content here or regenerate; source notes live in the `src`/`basis` fields and are never rendered. */
/* eslint-disable */
export type SvcData = { id: string; name: string; area: string; st: string; intro: string; hear: string[]; quote: boolean; deliver: string[]; walk: string[]; industries: string[]; related: string[]; xp: string[]; cases?: string[]; src: Record<string, string> };
export type AreaData = { id: string; name: string; tag: string; services: string[]; lead: string; hear: string[]; bring?: string[]; feature: { title: string; steps: { t: string; d: string; services: string[] }[] }; keep: string; cases: string[] };
export type IndustryData = { id: string; ch: string[]; bring?: string[]; ways?: { t: string; d: string }[]; basis: string; services: string[]; people: string[][] };
export type SubsectorData = { id: string; name: string; st: string; deliver: string[]; walk?: string[]; xp?: string[]; services: string[]; intro: string; industry: string; ch: string[]; people: string[][]; basis: string; thin?: boolean };
export type CaseData = { id: string; ch: string; did: string[]; res: string[]; services: string[]; subsectors: string[]; industry: string; industry2?: string | null; tools?: string[]; figure?: { title: string; intro?: string; steps: { t: string; d: string }[] } };
export const SERVICES: Record<string, SvcData> = {
 "strategic-planning": {
  "id": "strategic-planning",
  "name": "Strategic Planning & Performance Management",
  "area": "strategy",
  "st": "ok",
  "intro": "We help leadership turn its direction into goals, measures, and yearly action plans, with dashboards that show whether the plan is working and a leadership rhythm to review them.",
  "hear": [
   "We have a strategic plan. We can't show it's working.",
   "We need a defensible way to decide what gets funded.",
   "We have to prove to legislators and the public that the money is well spent.",
   "The plan has to be shaped by staff at every level and turned into yearly actions."
  ],
  "quote": true,
  "deliver": [
   "Strategic plans and multi-year action plans",
   "Performance measure libraries, measure profiles, and dashboard roadmaps",
   "Program effectiveness assessments",
   "Prioritization frameworks, scoring criteria, and screening tools",
   "Peer benchmarking and best-practice reviews"
  ],
  "walk": [
   "Performance measures, KPI inventories, and dashboard approaches tied to the plan's goals, plus the leadership rhythm to review them",
   "Prioritization frameworks, scoring criteria, screening tools, and a decision structure that holds up when someone asks why",
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
  "intro": "We design the organization from current to future state, with position descriptions, classification and salary analysis, and change communications. Then we fix the processes and procedures people use every day.",
  "hear": [
   "We're reorganizing, or standing up a new division.",
   "Our procedures live in people's heads, or in five versions of the same binder.",
   "We need fewer layers of supervision and a wider span of control.",
   "We don't have a clear picture of our vacancies, or of how peer agencies organize."
  ],
  "quote": true,
  "deliver": [
   "Current and future-state organizational analysis",
   "Position descriptions, primers, and classification",
   "Business process inventory and improvement",
   "Consolidated procedures, manuals, and policies",
   "Program quality assurance frameworks"
  ],
  "walk": [
   "Organizational design from current to future state",
   "Position descriptions, classification, and salary analysis",
   "Consolidated procedures and policies, with an inventory of what is missing, outdated, or duplicated"
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
  "intro": "We help staff understand and adopt a change, whether it's a reorganization, a new system, or a new way of delivering work: a change plan, change champions, communication, and training.",
  "hear": [
   "A reorganization, a new system, or a new way of delivering work, and staff who have seen changes come and go before.",
   "We have to bring staff through the change.",
   "Staff, legislators, and the public all need to hear about the change."
  ],
  "quote": true,
  "deliver": [
   "Change strategy and leadership alignment",
   "Change champion networks",
   "Change impact assessments and responsibility charts",
   "Stakeholder, legislative, and public communications",
   "Training and adoption support"
  ],
  "walk": [
   "A change strategy and communications plan",
   "A network of change champions inside the organization",
   "Tools to track change impacts by role",
   "Training that turns a new process into how work gets done"
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
  "src": {
   "intro": "live",
   "hear": "Written from our records",
   "walk": "Based on Louisiana, Arkansas, and Nevada records"
  }
 },
 "workforce": {
  "id": "workforce",
  "name": "Workforce & Leadership Development",
  "area": "strategy",
  "st": "warn",
  "intro": "We help agencies grow people into the jobs they need filled: proficiency programs, career paths, training curricula, train-the-trainer models, and self-paced online courses, plus the HR structure behind them.",
  "hear": [
   "Our best people are retiring. Nobody's ready to step up.",
   "We're delivering a bigger program with fewer experienced people.",
   "Staff don't see a clear path to advance.",
   "We don't know how our divisions balance staffing supply and demand."
  ],
  "quote": true,
  "deliver": [
   "Technical specialist proficiency programs",
   "Leadership academies and manager workshops",
   "Career pathways and succession planning",
   "Knowledge transfer and retention strategy",
   "HR advisory, process maps, classifications, and salary surveys",
   "Course and curriculum design, computer-based training",
   "Engineer trainee and rotation programs"
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
  "src": {
   "intro": "Past proposal language",
   "hear": "Partner Field Guide v1",
   "walk": "Partner Field Guide v1"
  }
 },
 "exec-advisory": {
  "id": "exec-advisory",
  "name": "Executive Advisory",
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
  "deliver": [
   "Strategic advisory to executive leadership",
   "Interim leadership and PMO structuring",
   "Administrative program services",
   "Leadership transition support: briefings and handoff materials for incoming leaders"
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
  "src": {
   "intro": "Current rawlinsic.com copy",
   "hear": "Written from our records",
   "walk": "Based on executive-level advisory work orders and the service inventory"
  }
 },
 "program-delivery": {
  "id": "program-delivery",
  "name": "Program Delivery",
  "area": "delivery",
  "st": "warn",
  "intro": "A credible work program connects investment priorities with the projects the agency can actually advance. We help agencies clarify selection methods, readiness requirements, milestones, and responsibilities, so leadership has a clearer basis for its commitments and can act when conditions change.",
  "hear": [
   "Projects keep missing the year they were promised",
   "It's hard to explain why one project was chosen over another",
   "Our multi-year highway and bridge program is over-programmed",
   "Program decisions are siloed by funding program"
  ],
  "quote": false,
  "deliver": [
   "Investment priorities and program alignment: a selection method the department can explain",
   "Work program development: five-year programs built around what each project needs",
   "Program controls, milestones, and performance reporting",
   "Program assessments that become an implementation roadmap, early wins first",
   "Consultant and professional services management: fee methods, selection, and prequalification",
   "Program quality assurance",
   "Program and project leadership for complex, multi-agency work",
   "Interim program leadership and program management offices"
  ],
  "walk": [
   "A selection method the department can defend",
   "Interim milestones and status reporting leadership can act on",
   "A roadmap that puts early wins first"
  ],
  "industries": [
   "transport",
   "aviation",
   "gov"
  ],
  "related": [
   "procurement",
   "workforce",
   "dashboards"
  ],
  "xp": [
   "Members of our team led major projects at Florida DOT and the North Carolina Turnpike Authority, including design-build",
   "One of our project managers managed a 13-mile, half-billion-dollar corridor project in Las Vegas",
   "Our founder drove the development of Nevada DOT's matrix-based project management program"
  ],
  "src": {
   "intro": "Current rawlinsic.com copy",
   "hear": "Partner Field Guide v1",
   "walk": "Partner Field Guide v1"
  }
 },
 "preconstruction": {
  "id": "preconstruction",
  "name": "Preconstruction",
  "area": "delivery",
  "st": "ok",
  "intro": "A project advances more reliably when every discipline knows what it must provide and when the next team needs it. We help agencies set up delivery frameworks, scoping methods, project management resources, and clearer handoffs, so staff share one process and the agency keeps its own technical judgment and decisions.",
  "hear": [
   "Projects are scoped differently every time",
   "Construction and maintenance see the design too late",
   "New project managers don't know where to start",
   "Every manager runs projects their own way"
  ],
  "quote": false,
  "deliver": [
   "Project delivery frameworks from concept study to readiness for advertisement, with an interactive manual",
   "Concept scoping and project evaluation",
   "Handoffs from design through award into construction, written as business rules the agency's systems can follow",
   "Project management functions: the unit, the manual, and staff capability",
   "Estimating methods and tools"
  ],
  "walk": [
   "An agency-owned interactive manual and process map",
   "Scoring forms staff apply themselves",
   "A transition plan that moves projects already underway onto the new process"
  ],
  "industries": [
   "transport"
  ],
  /* not set by the content pass: the neighboring Project Delivery services */
  "related": [
   "program-delivery",
   "construction",
   "row"
  ],
  "xp": [
   "We've built project delivery frameworks for three state DOTs, and each one looks different"
  ],
  /* Featured projects, in this order (content pass v7, 2.4). cs-pmdiv, cs-pdn, and cs-transform carry their notes. */
  "cases": [
   "cs-tn-ipd",
   "cs-nc-ipd",
   "cs-pmdiv",
   "cs-pdn",
   "cs-transform"
  ],
  "src": {
   "intro": "Site content pass v7 (Nov 11 2026)",
   "hear": "Site content pass v7 (Nov 11 2026)",
   "walk": "Site content pass v7 (Nov 11 2026)"
  }
 },
 "owners-rep": {
  "id": "owners-rep",
  "name": "Owner's Representation",
  "area": "delivery",
  "st": "warn",
  "intro": "We represent the owner: protecting your interests, coordinating contractors, and checking that scope, quality, schedule, and standards are met.",
  "hear": [
   "We outsource the work. We need the contractor held to it.",
   "Our projects are late or over budget.",
   "We have a major build and many agencies to coordinate.",
   "Budget and risk have to hold up under public scrutiny."
  ],
  "quote": true,
  "deliver": [
   "Representation of the owner's interests",
   "Contractor and consultant coordination",
   "Scope, quality, schedule, and standards oversight",
   "Commitment and risk tracking"
  ],
  "walk": [
   "A single point of accountability on the owner's side",
   "Regular reporting on scope, schedule, cost, and quality",
   "Issues raised and resolved early, before they become claims"
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
  "src": {
   "intro": "live",
   "hear": "Partner Field Guide v1",
   "walk": "Written from our records"
  }
 },
 "alt-delivery": {
  "id": "alt-delivery",
  "name": "Alternative Delivery & Partnering",
  "area": "delivery",
  "st": "ok",
  "intro": "Choosing an alternative delivery method also changes the owner's job. We help agencies prepare their organization, staff, procedures, and decision methods for that change, and we support method selection, procurement readiness, and partnering while the agency keeps its decisions.",
  "hear": [
   "A first project under a new delivery method",
   "Risk that no one has allocated",
   "No agreed way to raise and resolve issues under schedule pressure",
   "Choosing the right delivery method"
  ],
  "quote": false,
  "deliver": [
   "Alternative delivery program development: roles, manuals, procedures, and training for the agency's own team",
   "Delivery method selection across design-build, progressive design-build, construction manager at risk (also called construction manager/general contractor), and public-private partnerships",
   "Procurement readiness: scoring criteria and document review",
   // Backed by Rawlins partnering contracts in Fiscal > Contracts and Templates > Partnering. Jacob's portfolio describes partnering as limited because it doesn't include these records.
   "Risk allocation and partnering facilitation: project charters, issue resolution ladders, joint risk workshops, and team evaluations",
   "Owner and contractor coordination on major projects"
  ],
  "walk": [
   "A delivery method recommendation with selection criteria",
   "Delivery method manuals, procedures, and training",
   // Backed by Rawlins partnering contracts in Fiscal > Contracts and Templates > Partnering. Jacob's portfolio describes partnering as limited because it doesn't include these records.
   "A signed partnering charter and an issue resolution ladder",
   "Regular team evaluations through the project"
  ],
  "industries": [
   "transport",
   "gov",
   "contractors"
  ],
  "related": [
   "procurement",
   "program-delivery",
   "owners-rep"
  ],
  "xp": [
   "Our founder led Nevada DOT's Pioneer Program for public-private partnerships, design-build, and construction manager/general contractor",
   "A former executive at three state transportation departments on our team delivered public-private partnerships, alternative delivery contracts, and a managed lanes program"
  ],
  "src": {
   "intro": "Written from our records",
   "hear": "Written from our records",
   "walk": "Based on partnering records, proposals, and the current site"
  }
 },
 "procurement": {
  "id": "procurement",
  "name": "Finance, Budget & Procurement",
  "area": "delivery",
  "st": "warn",
  "intro": "We help organizations put resources where they count, stay compliant, and buy the services they need consistently, from budgeting through procurement and contract administration.",
  "hear": [
   "Consultant fees vary for comparable work",
   "Budgets aren't tied to what the program has to deliver",
   "Our maintenance budget is hard to explain",
   "Contracts industry will bid on, administered the same way in every district"
  ],
  "quote": false,
  "deliver": [
   "Procurement advisory from solicitation to closeout",
   "Consultant contract administration",
   "Financial and utilization analysis",
   "Performance-based budgeting",
   "Cost and price analysis and negotiation"
  ],
  "walk": [
   "Scope and solicitation development",
   "Proposal evaluation and source selection",
   "Cost and price analysis and negotiation",
   "Contract administration, compliance, and closeout"
  ],
  "industries": [
   "transport",
   "gov"
  ],
  "related": [
   "program-delivery",
   "automation",
   "operations"
  ],
  "xp": [
   "One of our procurement specialists brings 35 years of government procurement in transportation and engineering services",
   "Florida DOT's former Interim Assistant Secretary of Finance and Administration is on our team"
  ],
  "src": {
   "intro": "live",
   "hear": "Written from our records",
   "walk": "Past proposal language"
  }
 },
 "row": {
  "id": "row",
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
   "walk": "Based on Tennessee and Louisiana records"
  }
 },
 "construction": {
  "id": "construction",
  "name": "Construction",
  "area": "delivery",
  "st": "warn",
  "intro": "Consistent construction administration depends on current guidance, clear decisions, and workable coordination among field staff, finance, contracts, suppliers, and contractors. We help agencies find the gaps in those processes, close them, and put more usable procedures in place.",
  "hear": [
   "Each district administers contracts differently",
   "New construction software is in place, but the workflows still live on paper",
   "Inspectors and technicians need a clear path to proficiency",
   "Contract time, compliance paperwork, and payment cause the most friction with contractors"
  ],
  "quote": false,
  "deliver": [
   "Construction administration and policy: change orders, claims review, approval thresholds, and contractor payments",
   // TODO: Rawlins drafts standard specifications for a client that isn't cleared. Add specifications back only when cleared.
   "Construction manuals, policies, and inspection procedures",
   "Construction software workflows",
   "Construction and maintenance input at every step of project development",
   "Construction, materials testing, and bridge inspection proficiency programs"
  ],
  "walk": [
   "A construction administration manual and inspection procedures",
   "Software workflows staff actually use",
   "Proficiency programs for inspectors and technicians"
  ],
  "industries": [
   "transport",
   "gov",
   "contractors"
  ],
  "related": [
   "program-delivery",
   "alt-delivery",
   "drone-programs"
  ],
  "xp": [
   "Our team includes a former Arkansas DOT Chief Engineer of Operations who started as a field construction engineer",
   "A former Michigan DOT Engineer of Operations and Maintenance on our team chaired its negotiations with industry, which refined specifications, standard plans, and construction practices"
  ],
  "src": {
   "intro": "Based on Gulf South DOT Task 8 records; Southeastern DOT proficiency work orders; bios",
   "hear": "Written from our records",
   "walk": "Based on Tennessee and Louisiana records"
  }
 },
 "lpa": {
  "id": "lpa",
  "name": "Local Public Agency & Federal-Aid Programs",
  "area": "delivery",
  "st": "warn",
  "intro": "For a federal program to succeed, programmed funding must turn into projects that are ready to advance. We help states and local agencies get there.",
  "hear": [
   "Programmed funds don't turn into projects ready to advance",
   "Local agencies need clear manuals and oversight",
   "MPOs need help with performance reporting and certification",
   "Federal requirements land on lean teams"
  ],
  "quote": false,
  "deliver": [
   "Local public agency manuals, oversight, and certification",
   "Federal-aid program development and compliance",
   "Metropolitan planning organization support: performance reporting, transportation improvement programs, and work programs",
   "Training for local agencies"
  ],
  "walk": [
   "Local agency manuals and certification steps",
   "A program that moves funded projects to construction",
   "Training for local agency staff"
  ],
  "industries": [
   "transport",
   "gov"
  ],
  "related": [
   "grants",
   "program-delivery",
   "row"
  ],
  "xp": [
   "A former Federal Highway Administration California Division leader on our team helped deliver the state's federal-aid program with Caltrans, 18 metropolitan planning organizations, and hundreds of local governments",
   "A former Federal Highway Administration executive on our team supported the leaders of 13 division offices"
  ],
  "src": {
   "intro": "Based on Gulf South DOT LPA manual work; bios",
   "hear": "Written from our records",
   "walk": "Based on Tennessee and Louisiana records"
  }
 },
 "grants": {
  "id": "grants",
  "name": "Grants & Funding",
  "area": "delivery",
  "st": "ok",
  "intro": "A strong operational idea deserves a fundable application. We help agencies find the funding, write the application reviewers can score, and issue grants of their own, so programs that would otherwise stall get started. When an award comes through, we help put it to work.",
  "hear": [
   "There's grant money out there. Nobody has time to chase it.",
   "We're a small staff competing for federal funding.",
   "New federal programs come with new rules.",
   "We're issuing grants of our own, and the solicitation has to draw the right responses."
  ],
  "quote": true,
  "deliver": [
   "Funding opportunity matching",
   "Federal grant applications: task structure, budget, narrative",
   "Issuing grants and solicitations on an agency's behalf",
   "Turning awards into working programs"
  ],
  "walk": [
   "A complete competitive application with task structure, budget, and measurement plan",
   "Task structure and budget logic reusable for the next opportunity",
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
  "src": {
   "intro": "aviation catalog (internal)",
   "hear": "Partner Field Guide v1",
   "walk": "aviation catalog (internal)"
  }
 },
 "asset-mgmt": {
  "id": "asset-mgmt",
  "name": "Asset Management",
  "area": "om",
  "st": "ok",
  "intro": "We help organizations know what they own, what shape it's in, and where the next dollar does the most good. Then we set up the measures and governance that keep those decisions consistent.",
  "hear": [
   "Rising material costs, changing technology, incomplete inventories, and too little money for aging infrastructure. Many agencies make worst-first, reactive decisions in silos, which costs more over the life of the asset.",
   "No one owns asset management here.",
   "Our elected officials need it explained simply.",
   "We don't always know where our assets are, especially underground."
  ],
  "quote": true,
  "deliver": [
   "Asset data foundation, inventories, and inspection protocols",
   "Performance-based management and levels of service",
   "Life cycle, risk, and investment strategy, including capital priorities across asset types",
   "Asset management reviews, governance, and implementation plans, using ISO 55000 as a guide",
   "Local-agency asset management workshops",
   "Asset information and assessment technology, tested against what experienced raters see",
   "Standing up an asset management division: section design, position descriptions, measures, and advisory to its leaders"
  ],
  "walk": [
   "Research and connection to technology that fits the agency's needs",
   "Performance measures that support the organization's goals",
   "Life cycle and cost planning strategies",
   "Proficiency programs that develop staff",
   "Frameworks that align asset data, performance management, and governance"
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
   "One of our advisors co-founded a performance-based asset maintenance firm that grew from two people to operations in 43 states",
   "Our founder led Nevada DOT's statewide asset management plan",
   "One of our advisors has done life cycle cost analysis for highway assets on public and privately financed projects",
   "Before founding Rawlins, our founder led asset management reviews for the Utah and North Carolina transportation departments and New York City Parks"
  ],
  "src": {
   "intro": "Janine Cooper, asset management answers",
   "hear": "Janine Cooper, asset management answers",
   "walk": "Janine Cooper, asset management answers"
  }
 },
 "operations": {
  "id": "operations",
  "name": "Maintenance Programs",
  "area": "om",
  "st": "warn",
  "intro": "We help maintenance and operations run the same way in every region: contracts that pay for results instead of hours, quality programs people trust, and fleets, facilities, and crews ready for winter and emergencies.",
  "hear": [
   "Our field crews do it differently in every region.",
   "Maintenance costs keep climbing.",
   "Staff and contractors are learning a new contract model together.",
   "We need a maintenance rating program decisions can rely on."
  ],
  "quote": true,
  "deliver": [
   "Performance-based and flexible maintenance contracts: specifications, deduction models, administration, and reviews of contracts already in place",
   "Maintenance quality assurance programs and maintenance rating programs",
   "Maintenance budgeting tied to performance: level-of-service targets and what each point of improvement costs",
   // Backed by the cs-nv-om review and by cs-nv-fleet-program (Rawlins fleet analysis and implementation support, 2022 to 2023).
   "Fleet and facilities: operations reviews, right-sizing, replacement planning, and predictive maintenance",
   "Winter operations, emergency readiness, and tabletop exercises",
   "Field assessments, operating standards, and crew training",
   "Maintenance sourcing: what to keep in house, what to outsource, and building a market of bidders first"
  ],
  "walk": [
   "Performance-based contract specifications and deduction models",
   "Quality assurance programs",
   "Field assessments, operating standards, checklists, and crew training",
   "Tabletop exercises that test plans before an emergency does"
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
   "Florida DOT's former Director of Maintenance, who led its statewide program (12,157 centerline miles and 7,152 bridges), is on our team",
   "A former Michigan DOT division administrator on our team led its statewide maintenance operations alignment and chaired the negotiations for a five-year statewide contract with the county road agencies",
   /* hidden until Scott confirms (content fixes v1, 8.5): "We've piloted performance-based maintenance in a Michigan DOT region" */
   "Our founder led Nevada DOT's fleet program, with 2,700 pieces of equipment",
   "Members of our team built Michigan DOT's performance-based maintenance program, at the agency and as its consultant",
   "Before founding Rawlins, our founder reviewed Virginia DOT's performance-based interstate maintenance contracts, Pennsylvania DOT's maintenance budgeting, and a county's fleet and facilities operations"
  ],
  "src": {
   "intro": "Current rawlinsic.com copy",
   "hear": "Partner Field Guide v1",
   "walk": "Partner Field Guide v1"
  }
 },
 "traffic": {
  "id": "traffic",
  "name": "Traffic Operations & Safety",
  "area": "om",
  "st": "warn",
  "intro": "Operations investments need an organization and a delivery process that support safe, reliable use of the system. We help agencies connect operations with project development, maintenance, and investment decisions, through program reviews, guidance, and practical process support.",
  "hear": [
   "Operations and safety work is split across divisions",
   "Investments are hard to justify without a benefit-cost case",
   "Traffic design staff need defined proficiencies",
   "Operations guidance, manuals, and standards are out of date"
  ],
  "quote": false,
  "deliver": [
   "Transportation systems management and operations planning and organization",
   "Highway safety program coordination",
   "Benefit-cost analysis for operations improvements",
   "Traffic operations division structure",
   "Traffic design proficiency: signing, pavement markings, and signals",
   "Operations guidance, manuals, and standards brought current, with operations built into project delivery",
   "Operations capability assessments and peer-state benchmarking"
  ],
  "walk": [
   "An operations and safety organization with clear roles",
   "A benefit-cost case for investments",
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
   "Former Michigan DOT leaders on our team ran its operations division, including traffic and safety, led its connected vehicle and operations plan, and ran a region's intelligent transportation systems",
   "A former City of Las Vegas Director of Public Works on our team championed the city's Vision Zero initiative"
  ],
  "src": {
   "intro": "Based on Gulf South DOT Tasks 13 and 33; Southeastern DOT traffic design proficiency; bios",
   "hear": "Written from our records",
   "walk": "Based on Tennessee and Louisiana records"
  }
 },
 "portals": {
  "id": "portals",
  "name": "Websites, Portals & Digital Tools",
  "area": "tech",
  "st": "ok",
  "intro": "We build the digital front door for a program: one place where staff find the tools, manuals, and training they need, and where changes are requested, decided, and tracked.",
  "hear": [
   "Tools, manuals, and training spread across drives and intranet pages",
   "Five versions of the same form",
   "No clear way to request a change, or to know what changed",
   "Hundreds of documents sit on a separate, outdated site"
  ],
  "quote": false,
  "deliver": [
   "Program websites and resource libraries staff actually use, linked to the systems they already use",
   "Tools and generators: scope of work, cost estimating, and templates",
   "Forms turned into web apps on shared, trusted data",
   "Manuals and guidance published and kept current online",
   "Change request systems: submit, route, decide, update, and close out",
   "Website migrations, with every item reviewed: keep, update, combine, move, or retire"
  ],
  "walk": [
   "A live site with one source of truth",
   "Tools and templates tied to how the program works",
   "A change process tracked from request to close-out"
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
  "xp": [],
  "src": {
   "intro": "Louisiana delivery website records",
   "hear": "Louisiana delivery website records",
   "walk": "Louisiana delivery website records"
  }
 },
 "automation": {
  "id": "automation",
  "name": "Integration & Automation",
  "area": "tech",
  "st": "ok",
  "intro": "We connect the systems you already own so information moves on its own: construction platforms like Headlight linked to the rest of an agency's systems, repeated fields filled in once from trusted sources, and small custom apps where an integration platform doesn't fit. We document every workflow so your team can run it.",
  "hear": [
   "We key the same information into three systems.",
   "Our systems don't talk to each other.",
   "Field records disappear after the site visit.",
   "Handoffs run on email, spreadsheets, and scanned paper."
  ],
  "quote": true,
  "deliver": [
   "Workflow discovery with the staff who do the work",
   "Integrations and automation on platforms you already own (Make, Power Automate, Zapier, n8n, monday.com)",
   "Custom software and add-ins, such as an accessibility compliance add-in for Word",
   "Exception handling and access control",
   "Documentation and handoff, so your team owns and runs it",
   "Connecting field and construction platforms to the rest of the agency's systems, so what the inspector records reaches the people who need it",
   "Small custom apps where an integration platform doesn't fit",
   "Repeated project fields filled in once, from trusted agency sources",
   "Environment and constraints assessment (network, servers, and access)"
  ],
  "walk": [
   "Prioritized opportunity list",
   "Working integration or automation",
   "Exception-handling rules",
   "Documentation, training materials, and owned artifacts"
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
  "intro": "We turn uncertain, fragmented, or person-dependent data into governed information people can find, understand, and use. Most agencies have already done some governance work on paper. We build owners, definitions, inventories, and storage rules into work already underway.",
  "hear": [
   "Nobody can tell me which number is the right one.",
   "We don't know what data we have, who owns it, or whether to trust it.",
   "Our data is fragmented, and it depends on whoever keeps it.",
   "We've done governance on paper. It isn't built into the work."
  ],
  "quote": true,
  "deliver": [
   "Governance at the right level: project, program, or enterprise",
   "Data ownership and stewardship",
   "Policies, standards, and procedures",
   "Data inventory, glossary, and metadata",
   "Governance built into modernization projects",
   "Data readiness for AI and automation",
   "Executive data governance steering committees",
   "Records and document structures for programs"
  ],
  "walk": [
   "Operating model and roadmap",
   "Stewardship model and RACI",
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
  "intro": "We put AI to work where judgment is needed, trustworthy context exists, and the result can be governed and used. When a problem needs a rule, a process, or a decision instead of a model, we say so.",
  "hear": [
   "Our staff already use AI, and we have no policy for it.",
   "We're not sure which problems actually need AI.",
   "Nobody has decided who pays for AI licenses or who manages them.",
   "We don't know if our data is ready for AI."
  ],
  "quote": true,
  "deliver": [
   "AI policy, governance, and responsible-use guardrails",
   "Use-case and readiness assessments",
   "Custom connectors and retrieval workflows on your own information",
   "Setting up and administering commercial AI tools",
   "AI added to existing automated workflows",
   "Security review and guardrails for AI use",
   "Staff enablement and adoption",
   "Innovation pilot-to-production operating model",
   "Pilots on a single use case, such as cash-flow forecasting"
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
  "xp": [],
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
  "st": "warn",
  "intro": "Dashboards and scoring tools that put the organization's own data in front of the people making decisions, built on platforms it already owns.",
  "hear": [
   "Reports are built by hand every month, and no one is sure which number is right.",
   "We've outgrown our spreadsheets.",
   "Leaders need the big picture and each department's detail.",
   "We can't see where equipment is, how long it's booked, or when it's down."
  ],
  "quote": true,
  "deliver": [
   "Power BI dashboards",
   "Project screening and scoring tools for capital programming",
   "Position and workforce tracking dashboards",
   "Program status dashboards and decision tools",
   "Maps and web platforms for program information"
  ],
  "walk": [
   "Project screening and scoring tools with dashboards for capital programming",
   "Dashboards on platforms you already own, documented so your team can update them"
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
  "src": {
   "intro": "Based on Power BI and position-tracking dashboards, project scoring tools, and action plan tracking records",
   "hear": "Written from our records",
   "walk": "Partner Field Guide v1"
  }
 },
 "training-video": {
  "id": "training-video",
  "name": "Digital Training & Video",
  "area": "tech",
  "st": "warn",
  "intro": "Training people will actually use: short how-to videos and online courses, built with the experts who do the work.",
  "hear": [
   "Training depends on who your mentor was",
   "Manuals nobody reads",
   "New tools rolled out with no way to learn them",
   "Our people are retiring, and no one is ready"
  ],
  "quote": false,
  "deliver": [
   "Computer-based training modules",
   "Short how-to videos for specific tasks",
   "Overview videos for leadership, conferences, and legislators",
   "Storyboards and scripts written with subject matter experts",
   "Training published where staff already look"
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
  "src": {
   "intro": "Louisiana delivery website records",
   "hear": "Written from our records",
   "walk": "Louisiana delivery website records"
  }
 },
 "tech-strategy": {
  "id": "tech-strategy",
  "name": "Technology & AI Strategy",
  "area": "tech",
  "st": "ok",
  "intro": "Start here when there's a broad mandate, competing priorities, or not enough evidence to choose what to build. We assess the technology before the purchase, then help with setup, training, and change management so the tool becomes how work gets done.",
  "hear": [
   "We bought the software, and nobody uses it.",
   "Leadership wants AI, and no one is sure where it fits, whether we're ready, or who owns it.",
   "We need a technology roadmap tied to agency goals.",
   "We have a broad mandate, competing priorities, and not enough evidence to choose what to build."
  ],
  "quote": true,
  "deliver": [
   "Data, workflow, and AI readiness assessments",
   "Use-case discovery and ranking",
   "Information technology and innovation strategic plans",
   "Technology assessments before purchase",
   "Pilot and proof-of-concept management"
  ],
  "walk": [
   "Ranked use cases, prerequisites, guardrails, success measures, and go or no-go decisions",
   "A roadmap that assigns each initiative to the right work and sequence",
   "Setup, training, and change management so a new tool becomes how work gets done"
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
  "name": "Aeronautics Division & Program Setup",
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
   "walk": "Nevada record"
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
  "lead": "Plans people measure, organizations built to carry the work, and people ready to do it.",
  "hear": [
   "We have a strategic plan. We can't show it's working.",
   "We're reorganizing, or standing up a new division.",
   "Our best people are retiring. Nobody's ready to step up.",
   "We need a defensible way to decide what gets funded."
  ],
  "bring": [
   "Performance measures, KPI inventories, and dashboard approaches tied to the plan's goals, plus the leadership rhythm to review them.",
   "Organization design from current to future state, position descriptions, classification and salary analysis, and change communications.",
   "Proficiency programs, career paths, training curricula, train-the-trainer models, and self-paced online courses.",
   "Prioritization frameworks, scoring criteria, screening tools, and a decision structure that holds up when someone asks why."
  ],
  "feature": {
   "title": "From plan to practice",
   "steps": [
    {
     "t": "Plan",
     "d": "Goals, measures, and priorities people helped shape",
     "services": []
    },
    {
     "t": "Organize",
     "d": "Structure, roles, and processes that can carry the plan",
     "services": []
    },
    {
     "t": "Prepare people",
     "d": "Proficiency paths, training, and leaders ready for the change",
     "services": []
    },
    {
     "t": "Track",
     "d": "Action plans and dashboards leadership reviews",
     "services": []
    }
   ]
  },
  "keep": "",
  "cases": [
   "cs-strategic",
   "cs-proficiency",
   "cs-pmdiv"
  ]
 },
 "delivery": {
  "id": "delivery",
  "name": "Project Delivery",
  "tag": "Getting programs & projects built",
  "services": [
   "program-delivery",
   "preconstruction",
   "construction",
   "alt-delivery",
   "row",
   "procurement",
   "lpa",
   "grants",
   "owners-rep"
  ],
  "lead": "From the projects an agency chooses to how it administers construction, we help owners set up the processes, decisions, and tools that make delivery consistent, and we stay while staff put them to use.",
  "hear": [
   "Every manager runs projects their own way.",
   "Our procedures live in people's heads, or in five versions of the same binder.",
   "There's grant money out there. Nobody has time to chase it."
  ],
  "bring": [
   "Project delivery manuals, playbooks, risk and quality tools, and role-based training, built from what already exists.",
   "A gap analysis of what exists, consolidated standard operating procedures and policies, and a clear inventory of what is missing, outdated, or duplicated.",
   "Funding strategy, grant narratives, budgets, and complete application packages, ready to submit."
  ],
  "feature": {
   "title": "Across the project life cycle",
   "steps": [
    {
     "t": "Plan and program",
     "d": "Selection, prioritization, and funding",
     "services": [
      "program-delivery",
      "grants",
      "lpa"
     ]
    },
    {
     "t": "Procure",
     "d": "Delivery method and procurement readiness",
     "services": [
      "alt-delivery",
      "procurement"
     ]
    },
    {
     "t": "Right of way",
     "d": "Readiness, procedures, and coordination",
     "services": [
      "row"
     ]
    },
    {
     "t": "Build",
     "d": "Construction administration and field consistency",
     "services": [
      "construction",
      "owners-rep"
     ]
    },
    {
     "t": "Close out",
     "d": "Lessons learned and the handoff to maintenance",
     "services": [
      "program-delivery"
     ]
    }
   ]
  },
  "keep": "",
  "cases": [
   "cs-transform",
   "cs-major",
   "cs-pmdiv"
  ]
 },
 "om": {
  "id": "om",
  "name": "Operations & Maintenance",
  "tag": "Keeping what you own safe, working, & affordable",
  "services": [
   "asset-mgmt",
   "operations",
   "traffic"
  ],
  "lead": "Keeping what you already own safe and working takes a big share of the budget. We help make every dollar of that count.",
  "hear": [
   "We fix whatever's worst first, and we're always reacting.",
   "We outsource the work. We need the contractor held to it.",
   "Our field crews do it differently in every region."
  ],
  "bring": [
   "A clear picture of what you own, what shape it's in, and where the next dollar does the most good, with measures that keep those decisions consistent.",
   "Performance-based contract specifications, deduction models, quality assurance programs, and owner's representation.",
   "Field assessments, operating standards, checklists, crew training, and tabletop exercises that test plans before an emergency does."
  ],
  "feature": {
   "title": "Across the asset life cycle",
   "steps": [
    {
     "t": "Know what you own",
     "d": "Inventories and condition",
     "services": [
      "asset-mgmt"
     ]
    },
    {
     "t": "Plan and fund",
     "d": "Life cycle, risk, and investment strategy",
     "services": [
      "asset-mgmt"
     ]
    },
    {
     "t": "Maintain",
     "d": "Performance-based contracts and crews",
     "services": [
      "operations"
     ]
    },
    {
     "t": "Operate",
     "d": "Traffic operations and safety",
     "services": [
      "traffic"
     ]
    },
    {
     "t": "Measure",
     "d": "Quality assurance and ratings",
     "services": [
      "operations"
     ]
    }
   ]
  },
  "keep": "",
  "cases": [
   "cs-txmaint",
   "cs-pbmc",
   "cs-local-am"
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
  "lead": "Many problems start the same way: systems that don't talk to each other, the same information keyed in three times, and data nobody trusts. We make the systems you already own work together, automate the busywork, and put AI to work where it helps.",
  "hear": [
   "We key the same information into three systems.",
   "Nobody can tell me which number is the right one.",
   "Our staff already use AI, and we have no policy for it.",
   "We bought the software, and nobody uses it."
  ],
  "bring": [
   "Automated workflows and integrations on tools you already own, documented and handed over so you own the result.",
   "Practical data governance: owners, definitions, inventories, and storage rules, built into work already underway.",
   "AI policy and guardrails, use-case ranking, licensing and governance advice, and a straight answer on where AI fits.",
   "Technology assessments before the purchase, then setup, training, and change management so the tool becomes how work gets done."
  ],
  "feature": {
   "title": "What we build",
   "steps": [
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
   "cs-transform",
   "cs-de-tech"
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
   "row",
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
    "Former Chief Operating Officer, Idaho Transportation Department, and District Secretary, Florida DOT"
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
   "An assessment of how projects and permits move, and a roadmap staff can follow.",
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
   // FLAG (5.5). Subcontracts under engineering and advisory firms: findings_cases.md, G.
   { "t": "As a teammate on public work", "d": "Engineering and advisory firms add us to their teams for state DOT programs: program delivery, organization and workforce, right of way, technology, and drone programs." },
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
  "ch": [
   "The same data keyed into three systems",
   "Reports built by hand every month",
   "Leadership wants AI with no plan or policy"
  ],
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
 "intl": {
  "id": "intl",
  "ch": [
   "Investment is growing faster than our organization",
   "Our data sits in separate systems, and no one owns it",
   "We want to use AI, and need rules for it first",
   "We're planning for drones and air mobility while the rules are still being written"
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
   "Maintenance contracts and quality measures every district administers the same way",
   "Trained staff, and documentation your team owns"
  ],
  "xp": [
   // cs-nc-ipd and cs-transform
   "We've helped state transportation departments build project delivery networks: the steps, tools, and training that carry a project from concept toward construction",
   // cs-nv-om, and the 2022 and 2023 work reports for the same client (fleet, pavement program, traffic management center)
   "We've reviewed a state transportation department's operations and maintenance programs, with follow-on work on its fleet, its pavement program, and a traffic management center",
   // Scott Rawlins bio
   "Our founder was Deputy Director and Chief Engineer of the Nevada Department of Transportation, responsible for its daily operations",
   // bios; the same list as the Transportation basis line
   "People on our team held executive and engineering roles at the Nevada, Florida, Michigan, Idaho, Arkansas, North Carolina, and California transportation departments, and at the Federal Highway Administration",
   // Lance Grace bio (the same line as Maintenance Programs)
   "Florida DOT's former Director of Maintenance, who led its statewide program (12,157 centerline miles and 7,152 bridges), is on our team",
   // Ron Crew bio
   "One of our right of way advisors spent 43 years in Florida DOT right of way, 33 as a supervisor or manager"
  ],
  "services": ["program-delivery", "preconstruction", "row", "construction", "operations", "traffic", "asset-mgmt"],
  "industry": "transport",
  "people": [],
  "basis": "Highway case studies and Our People bios"
 },
 "sub-bridges": {
  "id": "sub-bridges",
  "name": "Bridges & Structures - remove",
  "st": "ok",
  // Rawlins doesn't design or inspect bridges (CONTENT FIXES v3; Jacob's portfolio, "Boundaries that matter in scopes").
  // Only one crossing cost over a billion dollars, so "billion-dollar river crossings" is gone.
  "intro": "Our bridge work is on the programs around the structure: how the owner and the contractor work together while it's built, how inspectors are trained, and how inspection data is collected. We've facilitated partnering on major river crossings, including a $1.2 billion Mississippi River bridge. We've built proficiency programs that cover bridge inspection, and we facilitate a multi-state program developing a shared standard for drone data on structures.",
  "ch": [
   "Risk on major crossings that no one has allocated",
   "A first design-build project with a new partner",
   "Inspection data with no shared standard",
   // cs-proficiency challenge
   "Inspectors need a defined route to proficiency"
  ],
  "deliver": [
   // cs-major
   "Partnering on major crossings: project charters, risk registers, issue resolution ladders, and team evaluations",
   // cs-db-partnering, cs-partnering
   "Partnering for design-build and progressive design-build bridge projects, from kickoff through closeout",
   // cs-proficiency
   "Proficiency programs for bridge inspection staff",
   // cs-pooled: structure inspection working group
   "Multi-state standards for drone data on structures",
   // John Zuleger's comment 11 on Jacob's drone portfolio (CONTENT FIXES v3, section 6)
   "Reviews of which inspection and maintenance tasks drones can support",
   // Field Guide recent work list; cs-transform
   "Screening and scoring tools for highway and bridge programs"
  ],
  "walk": [
   "A signed partnering charter and an issue resolution ladder",
   "Team evaluations through the project, reported to both sides",
   "A written route to proficiency for inspection staff",
   "A shared data standard and recommended practices a department can adopt"
  ],
  "xp": [
   // cs-major. Public construction costs.
   "We've facilitated partnering on a $1.2 billion Mississippi River crossing and a $275 million river bridge in Missouri",
   // cs-db-partnering
   "We've carried partnering from kickoff through closeout on a design-build river bridge project, with team surveys reported to both sides",
   // research.ts: NCHRP Research Report 1114 (2024), before they joined Rawlins
   "Two people on our team were the principal investigator and a co-author of the 2024 national research report that proposed AASHTO guidelines for drones in bridge inspection, before they joined Rawlins",
   // John Zuleger bio; the work was at his earlier firm
   "One of our engineers performed and managed hundreds of complex and post-disaster bridge inspections with drones and rope access, before joining Rawlins"
  ],
  "services": ["alt-delivery", "workforce", "research", "drone-programs", "owners-rep"], // adds "workforce" for the proficiency programs
  "industry": "transport",
  "people": [],
  "basis": "Major project, partnering, pooled fund, and bio records"
 },
 "sub-aviation": {
  "id": "sub-aviation",
  "name": "Aviation & Airports",
  "st": "ok",
  // Airports: Jacob's drone portfolio says advisory roles only, and no airport master planning.
  "intro": "State aeronautics programs, and the drone and advanced air mobility programs growing around them. We help small aviation staffs run those programs, plan for what's next, and compete for federal funding. With airports, our role is advisory, focused on drones and advanced air mobility.",
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
  "services": ["drone-programs", "drone-aam", "drone-emergency", "research", "aero-division", "grants"], // adds Emergency Response and Research & Standards
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
  "services": ["alt-delivery", "owners-rep"],
  "industry": "transport",
  "people": [],
  "basis": "Minneapolis light rail project; bios (Caltrans rail and mass transportation leadership, Federal Railroad Administration)"
 },
 "g-asset": {
  "id": "g-asset",
  "name": "Asset Management",
  "st": "ok",
  // cs-local-am (Rawlins Case Study Drafts v1): kickoffs, steering committees, self-assessments, document reviews, workshops, action plans, one-pagers.
  "intro": "Local agencies can use asset management to plan their programs and their funding, but each one starts from a different place. We start from the agency's own staff, plans, and inventories: a self-assessment, a workshop built around what it shows, and an action plan the agency can carry out.",
  "ch": [
   "No one owns asset management locally",
   "Inventories and plans are incomplete",
   "Elected officials need it explained simply",
   // Janine Cooper's asset management answers (findings_jacob.md, 6)
   "Decisions get made worst-first, one department at a time"
  ],
  "deliver": [
   "An asset management steering committee named inside the agency",
   "Self-assessment surveys, and a review of the agency's plans and inventories",
   "In-person workshops built on the state's competency framework",
   "Short, mid, and long-term action plans",
   "One-page materials for senior managers and elected officials"
  ],
  "walk": [
   "An action plan with short, mid, and long-term tasks",
   "A steering committee that owns it",
   "A clear view of strengths, gaps, and the resources needed",
   "A one-page explanation elected officials can use"
  ],
  "xp": [
   // FLAG (5.7). cs-local-am.
   "We've held asset management workshops and built action plans with local agencies, for a state infrastructure office",
   // Joey Paskey bio
   "A former Director of Public Works for the City of Las Vegas on our team led the city's asset management programs",
   // cs-nyc-parks and cs-riverside (Before Rawlins)
   "Before founding Rawlins, our founder helped set an asset investment strategy for New York City's 29,000 acres of parkland, and reviewed a county's fleet and facilities operations"
  ],
  "services": ["asset-mgmt", "workforce"],
  "industry": "gov",
  "people": [],
  "basis": "State infrastructure office record; bios"
 },
 "g-capital": {
  "id": "g-capital",
  "name": "Capital Project Delivery & Permitting",
  "st": "gap",
  // No completed city project. The deliver and walk lines describe what we offer; none claims past work.
  // The assess-and-roadmap method is the one used in cs-nv-om and cs-hi.
  "intro": "Cities deliver capital projects and review land development permits with small staffs, and each depends on the other. We assess how projects and permits move, from intake to acceptance, and turn the findings into a roadmap for project management, written procedures, and training. It's the assessment method we use with state transportation departments, and experience on our team includes directing public works for the City of Las Vegas.",
  "ch": [
   "Capital projects and permits stall between departments",
   "Project management varies by manager",
   "Procedures aren't written down",
   "Experienced staff are leaving, and their knowledge goes with them"
  ],
  "deliver": [
   "Capital project delivery assessment, from initiation through construction, acceptance, and closeout",
   "Land development permitting review, from intake through approval",
   "Current-state workflows that show the handoffs, decisions, and gaps between departments",
   "A project management roadmap with near, mid, and longer-term actions",
   "A prioritized set of standard operating procedures",
   "A training and proficiency framework by role"
  ],
  "walk": [
   "One assessment and roadmap that covers capital delivery and permitting together",
   "Workflows that show who does what, and where work stalls",
   "A short list of the procedures to write first",
   "A training framework tied to the roadmap"
  ],
  "xp": [
   // Joey Paskey bio
   "A former Director of Public Works for the City of Las Vegas on our team oversaw planning, design, construction, and maintenance of the city's infrastructure",
   // Amy Neidringhaus bio
   "A former North Carolina DOT district engineer on our team was the first point of contact for utilities, developers, and eleven municipalities in a fast-growing county",
   // Chris Petersen bio (private-sector roles)
   "One of our project managers managed City of Las Vegas roadway projects, and later quality control on city and county improvement projects",
   // cs-nv-om
   "We've carried out the same kind of assessment for a state transportation department's operations and maintenance programs",
   // FLAG (5.8). Sep and Oct 2026 work reports: best-practice research under way; the staffing assessment and the framework come next.
   "We've begun work on a resource planning and prioritization framework for a city transportation department, on an engineering firm's team"
  ],
  "services": ["program-delivery", "org-design", "workforce"], // adds "workforce" for the training framework
  "industry": "gov",
  "people": [ // kept; not shown
   ["Joey Paskey, P.E., PTOE", "Ran planning, design, construction, and maintenance as Director of Public Works, City of Las Vegas"],
   ["Chris Petersen, CPM", "Coordinated Nevada DOT roadway projects with internal and outside entities"]
  ],
  "basis": "City scope of work (Sep 2026, not yet delivered); bios"
 },
 "g-mpo": {
  "id": "g-mpo",
  "name": "Regional & Metropolitan Planning Support",
  "st": "gap",
  // No Rawlins project. The deliver and walk lines describe what we offer; none claims past work.
  "intro": "Metropolitan planning organizations answer to federal performance and certification rules with lean staffs. People on our team worked with them from the federal and state side: at the Federal Highway Administration, where one worked with all eighteen in California and another trained planning organizations in performance-based planning, and as Chief of Planning and Local Assistance at the California Department of Transportation.",
  "ch": [
   "Federal performance-based planning and reporting requirements",
   "Keeping the transportation improvement program and the work program current",
   "Getting ready for a federal certification review"
  ],
  "deliver": [
   "Performance-based planning and reporting",
   "Project selection and prioritization methods",
   "Transportation improvement program and work program support",
   "Performance measures and progress tracking",
   "Getting ready for federal certification reviews"
  ],
  "walk": [
   "Performance measures and a reporting routine built around the federal requirements",
   "A project selection method the board can explain",
   "A readiness review ahead of certification"
  ],
  "xp": [
   // Paul Schneider bio (the same line as Local Public Agency & Federal-Aid Programs)
   "A former Federal Highway Administration California Division leader on our team helped deliver the state's federal-aid program with Caltrans, 18 metropolitan planning organizations, and hundreds of local governments",
   // Jen Pihl bio
   "One of our advisors gave state departments and metropolitan planning organizations technical assistance and training in performance-based planning and project prioritization, at the Federal Highway Administration",
   // Mayela Sosa bio
   "A former Federal Highway Administration executive on our team worked with state departments, metropolitan planning organizations, and tribal and local governments on new federal grant programs",
   // Dara Wheeler bio
   "Our team includes the California Department of Transportation's former Chief of Planning and Local Assistance"
  ],
  "services": ["strategic-planning", "lpa", "dashboards", "data-governance"], // adds Local Public Agency & Federal-Aid Programs and Dashboards & Reporting
  "industry": "gov",
  "people": [ // kept; not shown
   ["Paul Schneider, P.E.", "Worked with 18 MPOs on California's federal-aid program"],
   ["Mayela Sosa", "FHWA executive who worked with MPOs, tribal, and local governments"]
  ],
  "basis": "Bios (no Rawlins project)"
 },
 "g-federal": {
  "id": "g-federal",
  "name": "Federal & Multi-State Programs",
  "st": "ok",
  // cs-pooled: 18 member states (kickoff deck, Jul 2026). In progress: no results yet, and the copy claims none.
  // Grants: cs-nc-ipd (BUILD and INFRA), cs-aero (application submitted).
  "intro": "Some problems are bigger than one state. We facilitate a multi-state research program in which 18 member states are developing a shared drone data standard and recommended practices agencies can adopt. We also help agencies prepare applications for federal grant programs. Experience on our team includes rolling out and reviewing federal grant programs at the Federal Highway Administration and the Federal Railroad Administration.",
  "ch": [
   "States collect the same data with no shared standard",
   "Research has to reach consensus across many members",
   "Federal programs come with new rules",
   "We're a small staff competing for federal funding"
  ],
  "deliver": [
   // cs-pooled
   "Pooled-fund facilitation: working groups, subcommittees, and consensus sessions",
   "Standards research: compiling members' existing standards and proposing a testing framework",
   "Recommended practices and guidebooks agencies can adopt",
   // Sep 2026 progress report: a federal peer exchange for western states' drone programs
   "Peer exchanges: agendas, facilitation, and follow-up materials",
   // cs-aerodiv
   "Research plans, literature reviews, and technical advisory panels",
   // cs-aero, cs-nc-ipd. "National research proposals" is gone: those are proposals we write to win research work, not something a client receives.
   "Federal grant applications, including multi-state ones: narrative, budget, forms, and commitment letters"
  ],
  "walk": [
   "A record of what the members agreed, and what is still open",
   "A testing framework members can run in their own states",
   "A shared data standard and recommended practices members can adopt",
   "A complete grant application, ready to submit"
  ],
  "xp": [
   // cs-pooled
   "We facilitate a pooled fund study on drone standards for 18 member states",
   // FLAG (5.9). Sep 2026 progress report.
   "We helped plan and facilitate a federal peer exchange on drone programs for western state transportation departments in September 2026",
   "A former Federal Highway Administration executive on our team helped 13 division offices roll out new federal grant programs", // as on Grants & Funding
   "Members of our team serve on national drone and advanced air mobility committees", // as on Research & Standards
   // Jen Pihl bio
   "One of our advisors served as a technical reviewer for federal discretionary grant programs"
  ],
  "services": ["research", "grants"],
  "industry": "gov",
  "people": [ // kept; not shown
   ["Mayela Sosa", "Senior FHWA executive on new federal grant programs"],
   ["Paul Wheeler", "National UAS and AAM committees"]
  ],
  "basis": "Pooled fund study record; bios"
 },
 "sub-ports": {
  "id": "sub-ports",
  "name": "Ports & Harbors",
  "st": "gap",
  // Source: our final report to the client for its first purchase order (work through Aug 2026): four district port security
  // grant application packages; drones, uncrewed surface vessels, multibeam sonar, and green lidar evaluated for harbor and
  // infrastructure inspection; vendor and procurement options; a demonstration and training concept. Same client as cs-hi: keep it unnamed.
  "intro": "Harbors run on security, funding, and new technology. Our work here so far is with one state harbors program: we supported its federal port security grant applications, and evaluated drones, uncrewed surface vessels, sonar, and lidar for inspecting harbor infrastructure.",
  "ch": [
   "Competitive federal security grants",
   "New technology to evaluate with a small staff",
   "Equipment that has to serve more than one harbor"
  ],
  "deliver": [
   "Port security grant applications: investment justifications, budgets, and technical narratives",
   "Evaluation of drones, uncrewed surface vessels, sonar, and lidar for harbor and infrastructure inspection",
   "Equipment and vendor options, with the procurement paths for each",
   "Demonstration and training plans for new inspection technology"
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
  "services": ["grants", "drone-programs"],
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
  "did": [
   "Built proficiency programs with agency experts in more than two dozen disciplines, from right of way and construction to bridge inspection and traffic design",
   "Drafted position descriptions and section primers for three bureaus",
   "Researched appraiser classifications nationwide and drafted a salary structure",
   "Designed and delivered a two-week advanced leadership program with the agency's human resources team",
   "Supported a statewide transportation worker proficiency rollout and a staffing utilization method",
   "Built an appraisal tracker for the right of way appraiser program"
  ],
  "res": [
   "Utilization process complete and in use",
   "Transportation worker proficiency program handed to the statewide coordinator",
   "Appraiser classification, certification, and salary structure delivered"
  ],
  "services": [
   "workforce",
   "org-design",
   "change-mgmt",
   "row",
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
  "did": [
   "Reworked the project management life cycle from planning to maintenance",
   "Introduced risk management practices to control scope, schedule, and budget"
  ],
  "res": [],
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
  "did": [
   "Converted maintenance quality measures to pass or fail criteria and set the field assessment approach",
   "Reviewed field data from 268 interstate sample sites",
   "Supported an industry forum and drafted the scope, contract, and request for proposals",
   "Supported contractor onboarding with weekly advisory calls",
   "Calculated staffing, equipment, and cost offsets"
  ],
  "res": [
   "Two contracts awarded; Rawlins supported their administration",
   "Financial analysis completed and delivered"
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
 "cs-aero": {
  "id": "cs-aero",
  "ch": "A small aeronautics staff needed to grow a statewide drone program, prepare the state and local governments for advanced air mobility, and compete for federal funding to pay for both.",
  "did": [
   "Wrote and finalized statewide drone operating procedures",
   "Built visual observer and sensor operator courses and train-the-trainer materials",
   "Planned and ran a statewide drone and advanced air mobility symposium",
   "Developed an advanced air mobility strategy and planning guidance for local governments",
   "Prepared a federal construction-technology grant application",
   "Coordinating the economic impact and market studies for advanced air mobility with the study team (in progress)",
   "Coordinated a land development study for advanced air mobility",
   "Built a tracking dashboard for advanced air mobility",
   "Supported train-the-trainer work for the remote pilot program"
  ],
  "res": [
   "Symposium held",
   "Federal grant application submitted",
   "Updated drone procedures finalized and distributed",
   "Land development study complete"
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
  "did": [
   "Built and supported a project delivery network: tools, templates, workflows, a website, and online training",
   "Drafted a program development manual and project selection score sheets for more than a dozen programs",
   "Drafted local public agency manual chapters and training",
   "Finalized a maintenance quality assurance handbook",
   "Mapped consultant contracting steps and built working intake and review apps on the agency's existing platform",
   "Rebuilt the first six steps of consultant contracting as one connected workflow, starting from a single intake form",
   "Built current and future-state organization charts for more than 15 divisions, with position descriptions",
   "Construction workflows, a construction administration manual, and a training outline",
   "Benefit-cost analysis for interstate operations and safety program coordination",
   "Strategic communications support for the department's improvement program",
   "Human resources documentation for the restructuring",
   "Leadership and technical training and competency-based staff development",
   "Built a prioritization tool now used to triage the highway project pipeline",
   "Starting a step-zero pilot for pavement preservation projects",
   "Updated step zero checklists, decision trees, and guidance for safety program projects",
   "A project manager manual and online courses, including consultant management",
   "Man-hour and cost estimating packages",
   // TODO: two local public agency lines say the same thing; Nicole to pick one.
   "Local public agency manual and responsible-charge training",
   "Maintenance training (load securement, winter operations, first echelon maintenance, and equipment safety) with equipment demonstration checklists",
   "An interactive organization chart linking each function to its description",
   "Supported the move to the department's construction management platform as the primary project system"
  ],
  "res": [
   "Delivery training modules published for agency use",
   "Comment system and instructions deployed",
   "Maintenance quality assurance handbook finalized",
   "The construction management platform is now the primary system on active projects",
   "Winter operations training delivered",
   "More than 20 staff across three divisions walked through the new contracting workflow"
  ],
  "services": [
   "program-delivery",
   "org-design",
   "change-mgmt",
   "strategic-planning",
   "automation",
   "data-governance",
   "operations",
   "workforce",
   "asset-mgmt",
   "construction",
   "traffic",
   "lpa"
  ],
  "subsectors": [
   "sub-highways"
  ],
  "industry": "transport",
  "industry2": null
 },
 "cs-pmdiv": {
  "id": "cs-pmdiv",
  "ch": "The department set out to make project management its own division, with the roles, measures, processes, and training to manage scope, schedule, cost, and risk consistently, and to bring staff through the change.",
  "did": [
   "Recommended the division structure and initial build-out",
   "Drafted class specifications for new roles",
   "Developed delivery performance measures with targets",
   "Built change management tools: process maps, responsibility charts, and a change impact template",
   "Drafted a web-based project delivery manual and a set of project management courses",
   "Built a five-year work plan for the division",
   "Next: a pilot using AI for cash-flow modeling"
  ],
  "res": [
   "Organization chart for the initial division approved",
   "Final measures compiled by the working group",
   "Change impact template and first manual sections finalized",
   "Five-year work plan, organization design, and performance measures complete",
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
  "did": [
   "Drafted special specifications for two districts' contracts",
   "Built a uniform deduction method and tracker",
   "Ran a structured industry review and recommended responses",
   "Facilitated the maintenance rating working group and built the rating matrix",
   "Developed a winter operations tabletop exercise concept"
  ],
  "res": [
   "Final draft specifications provided for district review and procurement"
  ],
  "services": [
   "operations",
   "procurement",
   "asset-mgmt",
   "dashboards"
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
  "did": [
   "Supported emergency drone response training and analyzed the results",
   "Coordinated live streaming into the emergency operations center",
   "Drafted waiver content and an updated concept of operations",
   "Revised statewide drone procedures and drafted a program handbook",
   "Briefed senior leadership on a centralized governance model",
   "Helped the drone response team check debris removal quantities with drone volume calculations"
  ],
  "res": [
   "Response team training held and evaluated",
   "When debris reports disagreed, the drone data proved correct"
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
  "did": [
   "Helped each agency name an asset management steering committee",
   "Ran self-assessment surveys and reviewed each agency's plans and inventories",
   "Led in-person workshops using the state's competency framework",
   "Built short, mid, and long-term action plans with each agency",
   "Prepared one-page materials for elected officials"
  ],
  "res": [
   "Workshops held and action plans built with local agencies"
  ],
  "services": [
   "asset-mgmt",
   "workforce"
  ],
  "subsectors": [
   "g-asset"
  ],
  "industry": "gov",
  "industry2": null
 },
 "cs-mi-pbo": {
  "id": "cs-mi-pbo",
  "ch": "Michigan moved toward a maintenance model based on performance outcomes and needed the tools to run it.",
  "did": [
   "Helped design and implement a performance-based program for statewide highway maintenance",
   "Field measurement of current levels of service, and outcome-based performance measures",
   "Benchmarking and a cost model for maintenance activities",
   "Requirements and procurement support for an enterprise asset management system"
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
  "did": [
   "Analyzed vacancies, staffing by division, and how peer agencies organize"
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
   "alt-delivery"
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
  "did": [
   "Ran engagement with executive leadership, a working group, all-staff workshops and surveys, and partners",
   "Facilitated vision, mission, values, goals, and measures",
   "Built the action plan and monitoring frameworks",
   "Facilitated division and district workshops for the first-year action plan",
   "Built a performance measures inventory and profile template"
  ],
  "res": [
   "Strategic plan for 2024 to 2029 complete",
   "Year 1 action plan complete",
   "Action plan tracking tool with progress dashboards in use"
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
   "Predictive maintenance planning to reduce vehicle downtime and extend asset life"
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
  "ch": "The department wanted a statewide look at how its operations, maintenance, fleet, and facilities were managed.",
  "did": [
   "Statewide assessment of operations and maintenance programs",
   "Reviewed asset management, performance management, fleet and facilities, district operations, organization, budgeting, and traffic operations"
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
   "Department leadership approved the fleet analysis recommendations, and the work moved into implementation"
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
 "cs-aerodiv": {
  "id": "cs-aerodiv",
  "ch": "Aviation demands are changing: rural airports, drones, and advanced air mobility. The study asks how a broader aviation role could be organized, governed, and funded.",
  "did": [
   "Built a nine-task research plan with three implementation models",
   "Compiled a 100-source literature review",
   "Facilitated a technical advisory panel",
   "Interviewing aviation stakeholders statewide"
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
  "did": [
   "Leadership interviews, stakeholder engagement, and a strengths and weaknesses analysis",
   "A technology strategic plan aligned with agency goals and operating priorities",
   "A one-page visual summary for executive alignment"
  ],
  "res": [
   "Technology strategic plan delivered"
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
   "Statewide review of Turnkey Asset Maintenance Services (TAMS), the department's performance-based highway maintenance contracts",
   "An action plan, procurement recommendations, and performance measures and levels of service for interstate maintenance"
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
   "procurement"
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
   "procurement",
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
   "A standard asset inspection protocol to inform capital planning, with a phased rollout",
   "A framework and tool to prioritize capital needs across asset types"
  ],
  "res": [],
  "services": [
   "asset-mgmt"
  ],
  "subsectors": [
   "g-asset"
  ],
  "industry": "gov",
  "industry2": null
 },
 "cs-riverside": {
  "id": "cs-riverside",
  "ch": "The county wanted to find savings and efficiency in how it manages fleet and facilities.",
  "did": [
   "Operational review of fleet and facility management"
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
  "did": [
   "Partnering facilitation between the owner and contractor: project charter, risk register, issue resolution process, and team evaluations",
   "I-74 Mississippi River Crossing, Iowa and Illinois ($1.2 billion)",
   "I-70 Rocheport River Bridge, Missouri ($275 million)",
   "Southwest Light Rail Transit, Minneapolis, Minnesota ($2.0 billion)",
   "Project coordination, risk management, budget control, and multi-agency coordination across the three projects"
  ],
  "res": [],
  "services": [
   "program-delivery",
   "alt-delivery"
  ],
  "subsectors": [
   "sub-bridges",
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
   "alt-delivery"
  ],
  "subsectors": [
   "sub-bridges"
  ],
  "industry": "transport",
  "industry2": "contractors"
 },
 "cs-pooled": {
  "id": "cs-pooled",
  "ch": "Transportation departments collect drone data for surveying, construction, and inspection with no shared, tested standard. They need standards they can write into specifications.",
  "did": [
   "Organized working groups across six standard areas",
   "Facilitated subcommittee and consensus sessions",
   "Proposed a performance-based, sensor-neutral testing framework",
   "Compiled member states' existing standards",
   "Brought together working groups from 18 member states"
  ],
  "res": [],
  "services": [
   "research",
   "drone-programs"
  ],
  "subsectors": [
   "g-federal",
   "sub-bridges",
   "sub-aviation"
  ],
  "industry": "gov",
  "industry2": null
 },
 "cs-pdn": {
  "id": "cs-pdn",
  "ch": "Project managers across the department needed one place to find the delivery network's tools, templates, manuals, and training, and a reliable way to request and approve changes to them.",
  "did": [
   "Built the delivery website and resource library: tools, scheduling, the project manager's manual, and training",
   "Linked it to the systems staff already use, including the department's scheduling system and its project reporting portal",
   "Built the change request system: a web form, a tracker, automatic routing to reviewers and the department, quality check, and close-out",
   "Posting and checking updates to the scope of work generator, cost estimating tool, and other templates before release",
   "Built online courses for project managers, including video"
  ],
  "res": [
   "Change requests tracked from submission to close-out, with every decision recorded",
   "Training published on the site for project managers"
  ],
  "services": [
   "portals",
   "automation",
   "training-video",
   "program-delivery",
   "change-mgmt"
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
  "did": [
   "Facilitated a technology and data governance steering committee for executive leadership",
   "Wrote more than ten standard operating procedures",
   "Ran a seven-month communications campaign for the modernization",
   "Prepared an advisory committee",
   "Providing executive-level strategic advisory, including AI governance"
  ],
  "res": [
   "More than ten standard operating procedures complete"
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
  "ch": "The department needed one trusted home for hundreds of construction documents spread across an old wiki, and steady support across construction, project delivery, and the department's other divisions.",
  "did": [
   "Reviewed hundreds of wiki documents and gave each one a disposition: keep, update, combine, move, or retire",
   "Backed up and preserved the original site before migration",
   "Planning the rollout of the department's construction management platform on live projects",
   "Supported remote pilot training for about 20 candidates",
   "Supported federal port security grant applications for the department's harbors",
   "Evaluated drones, uncrewed surface vessels, sonar, and lidar for harbor inspection"
  ],
  "res": [],
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
   "alt-delivery",
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
   "A design-build river bridge project: kickoff, a team mission statement with seven shared goals, an issue resolution ladder, a joint risk register, workshops through construction, and team surveys through closeout",
   "An urban interstate design-build project: kickoff, recurring partnering workshops, and team surveys reported to both sides",
   "A Mississippi River bridge replacement: partnering charter, workshops, and team surveys"
  ],
  "res": [
   "Closeout survey and lessons learned delivered to both sides on the river bridge project"
  ],
  "services": [
   "alt-delivery",
   "program-delivery",
   "construction"
  ],
  "subsectors": [
   "sub-bridges"
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
  "did": [
   "Supporting the firm's current project tools while the new system is built",
   "Building a project management system around phased projects, time, and invoicing"
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
  "We find what's working, what isn't, and why, with the people who do the work."
 ],
 [
  "Rebuild",
  "We fix the structure, process, contract, or system that's holding things back."
 ],
 [
  "Train",
  "We get your people ready to run it: manuals, courses, and hands-on support."
 ],
 [
  "Hand off",
  "We stay until it runs on its own, and you own everything we built."
 ]
];
