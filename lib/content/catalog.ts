/* GENERATED from wireframe v11 (final data) + handoff v7 section 4 (v12) by the redesign build.
   Edit content here or regenerate; source notes live in the `src`/`basis` fields and are never rendered. */
/* eslint-disable */
export type SvcData = { id: string; name: string; area: string; st: string; intro: string; hear: string[]; quote: boolean; deliver: string[]; walk: string[]; industries: string[]; related: string[]; xp: string[]; src: Record<string, string> };
export type AreaData = { id: string; name: string; tag: string; services: string[]; lead: string; hear: string[]; feature: { title: string; steps: { t: string; d: string; services: string[] }[] }; keep: string; cases: string[] };
export type IndustryData = { id: string; ch: string[]; basis: string; services: string[]; people: string[][] };
export type SubsectorData = { id: string; name: string; st: string; deliver: string[]; services: string[]; intro: string; industry: string; ch: string[]; people: string[][]; basis: string; thin?: boolean };
export type CaseData = { id: string; ch: string; did: string[]; res: string[]; services: string[]; subsectors: string[]; industry: string; industry2?: string | null };
export const SERVICES: Record<string, SvcData> = {
 "strategic-planning": {
  "id": "strategic-planning",
  "name": "Strategic Planning & Performance Management",
  "area": "strategy",
  "st": "ok",
  "intro": "Translate leadership vision into measurable goals, developing roadmaps that balance short-term priorities with long-term ambitions. Establish clear goals, measures and feedback loops that tie team performance to strategic outcomes.",
  "hear": [
   "We have a strategic plan. We can't show it's working.” “We need a defensible way to decide what gets funded."
  ],
  "quote": true,
  "deliver": [
   "Strategic plans and multi-year action plans",
   "Performance measure libraries, measure profiles, and dashboard roadmaps",
   "Program effectiveness assessments",
   "Prioritization frameworks, scoring criteria, and screening tools",
   "Benchmarking and performance audits"
  ],
  "walk": [
   "Performance measures, KPI inventories and dashboard approaches tied to the plan's goals, plus the leadership rhythm to review them",
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
   "Our founder built Nevada DOT's five-year program of projects and its statewide asset management plan as Deputy Director and Chief Engineer",
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
  "intro": "Assess structures, processes, and culture to find what's slowing the organization down, then streamline the processes and procedures people use every day.",
  "hear": [
   "We're reorganizing, or standing up a new division.” “Our procedures live in people's heads, or in five versions of the same binder."
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
  "intro": "Guide organizations through change with frameworks that earn buy-in, reduce friction, and keep momentum at every level.",
  "hear": [
   "A reorganization, a new system, or a new way of delivering work, and staff who have seen changes come and go before."
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
   "The person who established Florida DOT's statewide Organizational Change Management Office is on our team",
   "So is Nevada DOT's former Assistant Director of Operations, who led organizational development and change"
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
  "intro": "Skills and proficiency programs that connect training, demonstrated skills, reviews and career progression, plus the HR structure behind them.",
  "hear": [
   "Our best people are retiring. Nobody's ready to step up."
  ],
  "quote": true,
  "deliver": [
   "Technical specialist proficiency programs",
   "Leadership academies and manager workshops",
   "Career pathways and succession planning",
   "Knowledge transfer and retention strategy",
   "HR advisory, process maps, classifications and salary surveys",
   "Course and curriculum design, computer-based training"
  ],
  "walk": [
   "Proficiency programs and career paths",
   "Training curricula and train-the-trainer models",
   "Self-paced online courses",
   "Job classifications, salary surveys and position descriptions"
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
   "We've run statewide training, quality management, and policy programs at Florida DOT",
   "We've reworked maintenance training at Michigan DOT and served on a national training committee of state transportation officials",
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
  "intro": "Streamline administrative functions by improving processes, controls and reporting. Advisory, training design, facilitation and executive coaching for agency leadership and administrative functions.",
  "hear": [
   "Leadership is stretched, and the decisions in front of it are big: a reorganization, a new program, a key seat left open."
  ],
  "quote": true,
  "deliver": [
   "Strategic advisory to executive leadership",
   "Interim leadership and PMO structuring",
   "Administrative program services",
   "Innovation pilot-to-production operating model"
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
  "src": {
   "intro": "Current rawlinsic.com copy",
   "hear": "Written from our records",
   "walk": "Based on executive-level advisory work orders and the service inventory"
  }
 },
 "program-delivery": {
  "id": "program-delivery",
  "name": "Program & Project Delivery",
  "area": "delivery",
  "st": "warn",
  "intro": "Support project teams from kickoff to close-out to deliver on time and within budget, managing risk, coordinating stakeholders and ensuring quality. Serve as the owner's representative when the work is outsourced.",
  "hear": [
   "Every manager runs projects their own way.” “We outsource the work. We need the contractor held to it."
  ],
  "quote": true,
  "deliver": [
   "Program and project leadership for complex, multi-agency work",
   "Team-based project delivery frameworks",
   "Project management and delivery manuals",
   "Interim program leadership and program management offices",
   "Program quality assurance"
  ],
  "walk": [
   "Project delivery manuals and playbooks",
   "Risk and quality tools",
   "Role-based training, built from what already exists"
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
   "We've led major project teams at Florida DOT and the North Carolina Turnpike Authority, including alternative delivery programs",
   "One of our project managers delivered a 13-mile, half-billion-dollar corridor in Las Vegas",
   "Our founder built Nevada DOT's matrix-based project management program"
  ],
  "src": {
   "intro": "Current rawlinsic.com copy",
   "hear": "Partner Field Guide v1",
   "walk": "Partner Field Guide v1"
  }
 },
 "owners-rep": {
  "id": "owners-rep",
  "name": "Owner's Representation",
  "area": "delivery",
  "st": "warn",
  "intro": "Serve as the owner's on-site representative: protect your interests, coordinate contractors, and make sure scope, quality, schedule, and standards are met.",
  "hear": [
   "We outsource the work. We need someone holding the contractor to it."
  ],
  "quote": true,
  "deliver": [
   "On-site representation of the owner's interests",
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
   "We've coordinated risk and stakeholders on a $1.2 billion Mississippi River crossing and a $2 billion light rail line"
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
  "intro": "Major projects go better when the delivery method fits the job and the owner and contractor agree up front how they'll work together.",
  "hear": [
   "A first project under a new delivery method",
   "Risk that no one has allocated",
   "No agreed way to raise and resolve issues under schedule pressure"
  ],
  "quote": false,
  "deliver": [
   "Choosing the right delivery method: design-build, progressive design-build, construction manager at risk, construction manager/general contractor, and public-private partnerships",
   "Selection criteria, procurement documents, and risk allocation",
   "Partnering facilitation: project charters, issue resolution ladders, joint risk workshops, and team evaluations",
   "Owner and contractor coordination on major projects"
  ],
  "walk": [
   "A delivery method recommendation with selection criteria",
   "Procurement documents and contract templates",
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
   "Our team has delivered public-private partnerships, alternative delivery contracts, and a managed lanes program across three departments"
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
  "intro": "Finance, budgeting, and procurement support that helps organizations put resources where they count, stay compliant, and choose the right way to deliver the work.",
  "hear": [
   "Choosing the right delivery method, writing documents industry will bid on, and administering the contract the same way after award."
  ],
  "quote": true,
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
   "Contract administration, compliance and closeout"
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
   "We've led finance and administration at Florida DOT"
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
  "intro": "Right of way depends on specialists who take years to develop and are hard to replace. We help agencies define those skills, build the path to them, and classify and pay for them so people stay.",
  "hear": [
   "Experienced agents and appraisers are retiring",
   "Classifications and pay don't reflect the specialized work",
   "Uniform Act compliance rests on a few people"
  ],
  "quote": false,
  "deliver": [
   "Right of way assessments and process improvement",
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
  "name": "Construction & Pre-Construction",
  "area": "delivery",
  "st": "warn",
  "intro": "Construction is where an agency carries the most risk and the most paperwork. We help construction offices standardize how work is administered, documented, and inspected, and get real use out of the software they already bought.",
  "hear": [
   "Each district administers contracts differently",
   "New construction software is in place, but the workflows still live on paper",
   "Inspectors and technicians need a clear path to proficiency"
  ],
  "quote": false,
  "deliver": [
   "Construction management and contract administration advisory",
   "Construction manuals, standard specifications, and inspection procedures",
   "Construction software workflows",
   "Constructability reviews and preconstruction support",
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
   "We led Michigan DOT's negotiations with industry that refined specifications, standard plans, and construction practices"
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
   "MPOs need help with performance reporting and certification"
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
   "We've helped deliver California's federal-aid program with Caltrans, 18 metropolitan planning organizations, and hundreds of local governments",
   "We've supported the leaders of 13 Federal Highway Administration division offices"
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
  "intro": "We help agencies find, win or issue the funding for programs they otherwise could not pursue, then turn the award into a working program.",
  "hear": [
   "There's grant money out there. Nobody has time to chase it."
  ],
  "quote": true,
  "deliver": [
   "Funding opportunity matching",
   "Federal grant applications: task structure, budget, narrative",
   "Issuing grants and solicitations on an agency's behalf",
   "Turning awards into working programs"
  ],
  "walk": [
   "A complete competitive application with task structure, budget and measurement plan",
   "Task structure and budget logic reusable for the next opportunity",
   "Or a published solicitation that attracts the right responses"
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
   "We've helped roll out new federal grant programs across 13 Federal Highway Administration division offices",
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
  "intro": "We help agencies align their expertise, digital tools and physical assets, so every decision drives measurable results. Manage assets across their lifecycle to maximize value and performance while controlling cost and risk.",
  "hear": [
   "Rising material costs, changing technology, incomplete inventories and too little money for aging infrastructure. Many agencies make worst-first, reactive decisions in silos, which costs more over the life of the asset."
  ],
  "quote": true,
  "deliver": [
   "Asset data foundation and inventories",
   "Performance-based management and levels of service",
   "Life cycle, risk and investment strategy",
   "Asset management governance and implementation",
   "Local-agency asset management workshops"
  ],
  "walk": [
   "Research and connection to technology that fits the agency's needs",
   "Performance measures that support the organization's goals",
   "Life cycle and cost planning strategies",
   "Proficiency programs that develop staff",
   "Frameworks that align asset data, performance management and governance"
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
   "One of our advisors built a performance-based asset maintenance firm from two people to operations in 43 states",
   "Our founder led Nevada DOT's statewide asset management plan",
   "We've done life cycle cost analysis for highway assets in the United States and Canada"
  ],
  "src": {
   "intro": "Janine Cooper, asset management answers",
   "hear": "Janine Cooper, asset management answers",
   "walk": "Janine Cooper, asset management answers"
  }
 },
 "operations": {
  "id": "operations",
  "name": "Maintenance & Operations",
  "area": "om",
  "st": "warn",
  "intro": "Optimize day-to-day operations and maintenance to reduce downtime, improve service reliability, and pay for results instead of hours.",
  "hear": [
   "Our field crews do it differently in every region."
  ],
  "quote": true,
  "deliver": [
   "Performance-based and flexible maintenance contracts: specifications, deduction models, and administration",
   "Maintenance quality assurance programs and maintenance rating programs",
   "Maintenance budgeting tied to performance",
   "Fleet and facilities: optimization, replacement planning, and predictive maintenance",
   "Winter operations, emergency readiness, and tabletop exercises",
   "Field assessments, operating standards, and crew training"
  ],
  "walk": [
   "Performance-based contract specifications and deduction models",
   "Quality assurance programs",
   "Field assessments, operating standards, checklists and crew training",
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
   "We've run Florida DOT's statewide maintenance program: 12,157 centerline miles and 7,152 bridges",
   "We've led Michigan DOT's statewide maintenance operations alignment and a five-year statewide contract with the county road agencies",
   "We've piloted performance-based maintenance in a Michigan DOT region",
   "Our founder led Nevada DOT's fleet optimization program for 2,700 pieces of equipment"
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
  "intro": "Operating the system you already have is often the fastest way to make it safer and more reliable. We help agencies organize for operations and safety, and make the case for the investments that follow.",
  "hear": [
   "Operations and safety work is split across divisions",
   "Investments are hard to justify without a benefit-cost case",
   "Traffic design staff need defined proficiencies"
  ],
  "quote": false,
  "deliver": [
   "Transportation systems management and operations planning and organization",
   "Highway safety program coordination",
   "Benefit-cost analysis for operations improvements",
   "Traffic operations division structure",
   "Traffic design proficiency: signing, pavement markings, and signals"
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
   "We've managed Michigan DOT's safety programs, led its connected vehicle and operations plans, and run a region's intelligent transportation systems",
   "We've championed Vision Zero as a city public works director"
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
   "No clear way to request a change, or to know what changed"
  ],
  "quote": false,
  "deliver": [
   "Program websites and resource libraries staff actually use",
   "Tools and generators: scope of work, cost estimating, and templates",
   "Forms turned into web apps on shared, trusted data",
   "Manuals and guidance published and kept current online",
   "Change request systems: submit, route, decide, update, and close out",
   "Website and wiki migrations, with every item reviewed: keep, update, combine, move, or retire"
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
   "We key the same information into three systems."
  ],
  "quote": true,
  "deliver": [
   "Workflow discovery with the staff who do the work",
   "Integrations and automation on platforms you already own (Make, Power Automate, Zapier, n8n, monday.com)",
   "Custom software and add-ins, such as an accessibility compliance add-in for Word",
   "Exception handling and access control",
   "Documentation and handoff, with no lock-in",
   "Connecting field and construction platforms to the rest of the agency's systems, so what the inspector records reaches the people who need it",
   "Small custom apps where an integration platform doesn't fit",
   "Repeated project fields filled in once, from trusted agency sources"
  ],
  "walk": [
   "Prioritized opportunity list",
   "Working integration or automation",
   "Exception-handling rules",
   "Documentation, training materials and owned artifacts"
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
   "Our automation team built the systems that helped grow Rawlins from a startup, and builds the same for clients"
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
  "intro": "Turn uncertain, fragmented or person-dependent data into governed information people can find, understand and use. Most organizations have already done governance on paper; the value is in putting it into practice.",
  "hear": [
   "Nobody can tell me which number is the right one."
  ],
  "quote": true,
  "deliver": [
   "Governance at the right level: project, program, or enterprise",
   "Data ownership and stewardship",
   "Policies, standards, and procedures",
   "Data inventory, glossary, and metadata",
   "Governance built into modernization projects",
   "Data readiness for AI and automation",
   "Executive data governance steering committees"
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
   "We've led enterprise data governance at Florida DOT and Nevada DOT's strategic data plan"
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
  "intro": "Select and implement AI where judgment is needed, trustworthy context exists, and the result can be governed and used. Part of what we bring is telling you when a problem doesn't need AI at all.",
  "hear": [
   "Our staff already use AI, and we have no policy for it."
  ],
  "quote": true,
  "deliver": [
   "AI policy, governance, and responsible-use guardrails",
   "Use-case and readiness assessments",
   "Custom connectors and retrieval workflows on your own information",
   "Setting up and administering commercial AI tools",
   "AI added to existing automated workflows",
   "AI security and control frameworks",
   "Staff enablement and adoption"
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
   "Reports are built by hand every month, and no one is sure which number is right."
  ],
  "quote": true,
  "deliver": [
   "Power BI dashboards",
   "Project screening and scoring tools for capital programming",
   "Position and workforce tracking dashboards",
   "State-of-practice and program status dashboards",
   "Maps and web platforms for program information"
  ],
  "walk": [
   "Project screening and scoring tools with dashboards for capital programming"
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
   "New tools rolled out with no way to learn them"
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
  "intro": "The front door when there's a broad mandate, competing priorities, or not enough evidence to choose an implementation. These engagements are valuable only when they end in a decision.",
  "hear": [
   "We bought the software, and nobody uses it.” Leadership wants AI, but useful cases, readiness, risk or ownership are unclear."
  ],
  "quote": true,
  "deliver": [
   "Data, workflow, and AI readiness assessments",
   "Use-case discovery and ranking",
   "Four-phase AI playbook: assess and align, govern and fund, build and pilot, scale and sustain",
   "Information technology and innovation strategic plans",
   "Technology assessments before purchase",
   "Pilot and proof-of-concept management"
  ],
  "walk": [
   "Ranked use cases, prerequisites, guardrails, success measures, and go or no-go decisions",
   "A roadmap that assigns each initiative to the right work and sequence",
   "Setup, training and change management so a new tool becomes how work gets done"
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
  "intro": "A drone program works when every division follows the same rules, trains the same way, and flies equipment that fits the job.",
  "hear": [
   "Drone use grew division by division, with different practices",
   "Pilots and crews need consistent, compliant training",
   "Equipment is bought without a standard"
  ],
  "quote": false,
  "deliver": [
   "Program assessment and use-case development",
   "Organizational structure and governance",
   "Policy, standard operating procedures, and program handbooks",
   "Equipment selection and procurement guidance",
   "Pilot, visual observer, and sensor operator training, including online courses",
   "Safety and regulatory compliance, including beyond-visual-line-of-sight operations and waivers",
   "Embedded operations support",
   "Performance measurement and return on investment",
   "Drone services: operational design domains, delivery corridors, safety management systems, airspace deconfliction, and ground transportation integration"
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
   "We've led drone programs since 2018, including a nationwide pilot network",
   "We wrote first-of-their-kind guidance manuals on drones and advanced air mobility",
   "We've done hundreds of complex and post-disaster bridge inspections with drones and rope access"
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
  "intro": "Advanced air mobility is coming before the rules are final. We help states and local governments plan for it now, so they aren't reacting later.",
  "hear": [
   "Local governments ask the state for guidance it doesn't have yet",
   "Siting and land use questions with no precedent",
   "Economic case for the investment"
  ],
  "quote": false,
  "deliver": [
   "Statewide advanced air mobility studies and phased roadmaps",
   "Feasibility, market, and economic impact studies",
   "Vertiport planning, siting guidance, and land use",
   "Air traffic management and multimodal integration",
   "Policy frameworks, rule-making support, and regulatory compliance",
   "Safety cases and pilot program design",
   "Community outreach and education",
   "Procurement support for vertiports and charging"
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
   "We wrote first-of-their-kind advanced air mobility guidance manuals and serve on national committees",
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
   "Drone as first responder, disaster response, and incident scene management",
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
   "Our aviation team has run disaster assessments and post-disaster bridge inspections"
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
  "intro": "Facilitating agencies, manufacturers, researchers and regulators so the guidance agencies rely on is written with them, not around them.",
  "hear": [
   "Agencies need guidance written with the people who will use it: states, manufacturers, researchers, and regulators."
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
   "Consensus standards agencies can write into their specifications",
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
   "We serve on national drone and advanced air mobility committees",
   "We've led research and innovation at the California Department of Transportation"
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
  "intro": "As aviation changes, states are asking whether and how to organize, govern, and fund a broader aeronautics role.",
  "hear": [
   "Rural airports, drones, and AAM fall between existing offices",
   "No stable funding source",
   "Legislative and governance options aren't clear"
  ],
  "quote": false,
  "deliver": [
   "National scan of how states run aeronautics",
   "Organizational and operational analysis",
   "Governance, regulatory, and funding models",
   "Implementation options and legislative strategy"
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
   "We need a plan for charging, including at airports and future vertiports"
  ],
  "quote": false,
  "deliver": [
   "Connected and automated vehicle readiness, including data governance for vehicle and roadside data",
   "Fleet and telematics integration, with an AI layer on top of the data you already collect",
   "Electrification and charging planning, including vertiport and airport charging",
   "Shared and on-demand mobility planning",
   "Smart city roadmaps"
  ],
  "walk": [
   "A readiness plan with clear owners for each data stream",
   "Fleet and telematics data connected to the systems you already use",
   "A charging and electrification plan sized to your fleet and facilities"
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
   "Members of our team led a smart cities and innovation practice across the Middle East and Africa",
   "We've led mobility engagements and built a city data platform for a major automaker",
   "Our team has worked on intelligent transportation systems for the U.S. Department of Transportation",
   "We wrote connected vehicle and operations plans at Michigan DOT",
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
  "tag": "Direction, structure, and people",
  "services": [
   "strategic-planning",
   "org-design",
   "change-mgmt",
   "workforce",
   "exec-advisory"
  ],
  "lead": "Plans people measure, organizations built to carry the work, and people ready to do it.",
  "hear": [
   "We have a strategic plan, and we can't show it's working",
   "We're reorganizing, or standing up a new division",
   "Our best people are retiring, and nobody's ready to step up"
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
  "tag": "Getting programs and projects built",
  "services": [
   "program-delivery",
   "owners-rep",
   "alt-delivery",
   "procurement",
   "row",
   "construction",
   "lpa",
   "grants"
  ],
  "lead": "From the first dollar programmed to the last project closed out, we help owners deliver on time, on budget, and the same way every time.",
  "hear": [
   "Every manager runs projects their own way",
   "Funded projects stall before they're ready to build",
   "We outsource the work, and we need the contractor held to it"
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
     "d": "Delivery method, documents, and contracts",
     "services": [
      "alt-delivery",
      "procurement"
     ]
    },
    {
     "t": "Right of way",
     "d": "Acquisition, relocation, and appraisal",
     "services": [
      "row"
     ]
    },
    {
     "t": "Build",
     "d": "Construction administration and inspection",
     "services": [
      "construction",
      "owners-rep"
     ]
    },
    {
     "t": "Close out",
     "d": "Quality, lessons learned, and handoff",
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
  "tag": "Keeping infrastructure safe, reliable, and affordable",
  "services": [
   "asset-mgmt",
   "operations",
   "traffic"
  ],
  "lead": "Most of an agency's money goes to keeping what it already owns safe and working. We help make every dollar of that count.",
  "hear": [
   "Worst-first, reactive decisions made in silos",
   "Field crews do it differently in every region",
   "Industry won't bid on specifications it doesn't trust"
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
   "cs-ut-am"
  ]
 },
 "tech": {
  "id": "tech",
  "name": "Digital Solutions",
  "tag": "Websites, tools, workflows, data, AI, and training",
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
  "lead": "Most problems start the same way: systems that don't talk to each other, the same information keyed in three times, and data nobody trusts. We make the systems you already own work together, automate the busywork, and put AI to work where it helps.",
  "hear": [
   "Our tools, manuals, and training are scattered across drives",
   "We key the same information into three systems",
   "We bought the software, and nobody uses it",
   "Leadership wants AI, and we have no plan or policy"
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
  "tag": "Programs, planning, response, and standards",
  "services": [
   "drone-programs",
   "drone-aam",
   "drone-emergency",
   "research",
   "aero-division"
  ],
  "lead": "Drones and advanced air mobility are moving faster than the rules and the org charts. We help agencies run drone programs that are safe, compliant, and useful across the agency, and plan for what's next.",
  "hear": [
   "We want drones in the field, safely and by the rules",
   "Local governments are asking us about air taxis and vertiports",
   "There's federal money out there, and nobody has time to chase it"
  ],
  "feature": {
   "title": "Define, enable, deliver",
   "steps": [
    {
     "t": "Define the program",
     "d": "Needs, vision, use cases, goals, stakeholders, grants, and legislative support",
     "services": []
    },
    {
     "t": "Enable the system",
     "d": "Policy, program framework, stakeholder engagement, infrastructure planning, and compliance",
     "services": []
    },
    {
     "t": "Deliver operations",
     "d": "Deployment, safety monitoring, performance, and continuous improvement",
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
    "Former Chief Operating Officer, Idaho Transportation Department"
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
   "Federal requirements on lean teams"
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
    "Built a performance-based asset maintenance firm to 43 states"
   ]
  ]
 },
 "contractors": {
  "id": "contractors",
  "ch": [
   "A first progressive design-build or construction manager project with a public owner",
   "Owner and contractor relationships strained by schedule and risk",
   "Internal workflows that don't scale with the firm"
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
    "Satheesh Vivekanandan",
    "AI solutions architect"
   ],
   [
    "Samantha Lloyd",
    "Workflow architect; automation and integrations"
   ]
  ]
 },
 "intl": {
  "id": "intl",
  "ch": [],
  "basis": "",
  "services": [],
  "people": []
 }
};
export const SUBSECTORS: Record<string, SubsectorData> = {
 "sub-highways": {
  "id": "sub-highways",
  "name": "Highways & Roads",
  "st": "ok",
  "deliver": [
   "Program and project delivery",
   "Right of way and construction",
   "Performance-based maintenance and quality assurance",
   "Traffic operations and safety",
   "Asset management"
  ],
  "services": [
   "program-delivery",
   "row",
   "construction",
   "operations",
   "traffic",
   "asset-mgmt"
  ],
  "intro": "Most of our work is on highway systems: how they're planned, funded, delivered, maintained, and operated.",
  "industry": "transport",
  "ch": [
   "Delivering a bigger program with fewer experienced people",
   "Proving to legislatures that money is well spent",
   "Districts that each work differently"
  ],
  "people": [],
  "basis": "Highway case studies and Our People bios"
 },
 "sub-bridges": {
  "id": "sub-bridges",
  "name": "Bridges & Structures",
  "st": "ok",
  "deliver": [
   "Coordination, risk, and partnering on major crossings",
   "Progressive design-build partnering",
   "Drone and rope-access bridge inspection",
   "Multi-state standards for drone data on structures",
   "Bridge inspection proficiency programs"
  ],
  "services": [
   "alt-delivery",
   "owners-rep",
   "drone-programs",
   "research"
  ],
  "intro": "From billion-dollar river crossings to the inspections that keep bridges open.",
  "industry": "transport",
  "ch": [
   "Risk on major crossings that no one has allocated",
   "A first design-build project with a new partner",
   "Inspection data with no shared standard"
  ],
  "people": [],
  "basis": "Major project, partnering, pooled fund, and bio records"
 },
 "sub-aviation": {
  "id": "sub-aviation",
  "name": "Aviation & Airports",
  "st": "ok",
  "deliver": [
   "State aeronautics programs and divisions",
   "Statewide drone programs",
   "Advanced air mobility planning",
   "Airport operations and training",
   "Federal aviation funding"
  ],
  "services": [
   "drone-programs",
   "drone-aam",
   "aero-division",
   "grants"
  ],
  "intro": "Drones and advanced air mobility are moving faster than the rules and the org charts. We help aeronautics divisions and DOTs run drone programs that are safe, compliant, and useful across the agency, and plan for what's next.",
  "industry": "transport",
  "ch": [
   "Drone use spread before policy did",
   "Training and equipment vary by division",
   "AAM planning with rules still being written",
   "Small staffs competing for federal funding"
  ],
  "people": [],
  "basis": "Aeronautics records and the aviation team's bios"
 },
 "sub-rail": {
  "id": "sub-rail",
  "name": "Rail & Transit",
  "st": "warn",
  "deliver": [
   "Collaborative project management and risk on light rail",
   "Transit performance improvement",
   "Rail and transit program leadership"
  ],
  "services": [
   "program-delivery",
   "owners-rep",
   "strategic-planning"
  ],
  "intro": "Transit and rail agencies get the same delivery discipline and the same experienced people.",
  "industry": "transport",
  "ch": [
   "Multi-agency coordination on a major transit build",
   "Budget and risk control under public scrutiny"
  ],
  "people": [],
  "basis": "Minneapolis light rail project; bios (Caltrans rail and mass transportation leadership, Federal Railroad Administration, transit performance work)"
 },
 "g-asset": {
  "id": "g-asset",
  "name": "Asset Management for Local Agencies",
  "st": "ok",
  "deliver": [
   "Self-assessments and steering committees",
   "Workshops on the state's competency framework",
   "Short, mid and long-term action plans"
  ],
  "services": [
   "asset-mgmt",
   "workforce"
  ],
  "intro": "Local agencies can use asset management to plan their programs, but each one starts from a different place. We meet them there.",
  "industry": "gov",
  "ch": [
   "No one owns asset management locally",
   "Inventories and plans are incomplete",
   "Elected officials need it explained simply"
  ],
  "people": [],
  "basis": "Midwestern state infrastructure office record; bios"
 },
 "g-capital": {
  "id": "g-capital",
  "name": "Capital Project Delivery & Permitting",
  "st": "gap",
  "deliver": [
   "Capital project delivery assessment",
   "Land development permitting review",
   "Project management roadmap and SOP framework"
  ],
  "services": [
   "program-delivery",
   "org-design"
  ],
  "intro": "Cities carry big capital programs and land development permitting with small staffs. Faster delivery comes from clear roles, standard procedures, and a roadmap staff can follow.",
  "industry": "gov",
  "ch": [
   "Capital projects and permits stall between departments",
   "Project management varies by manager",
   "Procedures aren't written down"
  ],
  "people": [
   [
    "Joey Paskey",
    "Ran planning, design, construction, and maintenance as Director of Public Works, City of Las Vegas"
   ],
   [
    "Chris Petersen, CPM",
    "Coordinated Nevada DOT roadway projects with internal and outside entities"
   ]
  ],
  "basis": "City proposal scope (not yet delivered); bios"
 },
 "g-mpo": {
  "id": "g-mpo",
  "name": "Regional & Metropolitan Planning Support",
  "st": "gap",
  "deliver": [
   "Performance-based planning and reporting",
   "TIP and UPWP support",
   "Certification readiness"
  ],
  "services": [
   "strategic-planning",
   "data-governance"
  ],
  "intro": "MPOs answer to federal performance and certification rules with lean staffs. We help them plan, program, and report with confidence.",
  "industry": "gov",
  "ch": [
   "Performance-based planning and reporting requirements",
   "Keeping the TIP and UPWP current",
   "Certification reviews"
  ],
  "people": [
   [
    "Paul Schneider, P.E.",
    "Worked with 18 MPOs on California's federal-aid program"
   ],
   [
    "Mayela Sosa",
    "FHWA executive who worked with MPOs, tribal, and local governments"
   ]
  ],
  "basis": "MPO business development material (not yet delivered); bios"
 },
 "g-federal": {
  "id": "g-federal",
  "name": "Federal & Multi-State Programs",
  "st": "ok",
  "deliver": [
   "Pooled-fund research and standards",
   "National research proposals",
   "Federal grant programs"
  ],
  "services": [
   "research",
   "grants"
  ],
  "intro": "Some problems are bigger than one state. We facilitate the multi-state research and standards that agencies end up writing into their own specifications.",
  "industry": "gov",
  "ch": [
   "States collect the same data with no shared standard",
   "Research has to reach consensus across many members",
   "Federal programs come with new rules"
  ],
  "people": [
   [
    "Mayela Sosa",
    "Senior FHWA executive on new federal grant programs"
   ],
   [
    "Paul Wheeler",
    "National UAS and AAM committees"
   ]
  ],
  "basis": "Pooled fund study record; bios"
 },
 "sub-ports": {
  "id": "sub-ports",
  "name": "Ports & Harbors",
  "st": "gap",
  "deliver": [
   "Port security grant packages",
   "Drone and uncrewed-vessel technology evaluation"
  ],
  "services": [
   "grants",
   "drone-programs"
  ],
  "intro": "Harbors run on security, funding, and new technology. Our work here so far: port security grant packages, and evaluations of drone and uncrewed-vessel technology.",
  "industry": "transport",
  "ch": [
   "Competitive federal security grants",
   "New technology to evaluate with a small staff"
  ],
  "people": [],
  "basis": "Hawaii harbors records",
  "thin": true
 }
};
export const CASES: Record<string, CaseData> = {
 "cs-proficiency": {
  "id": "cs-proficiency",
  "ch": "A department-wide restructuring set out to cut layers of supervision, update classifications and performance measures, and give staff a clear path to advance. Each new classification needed a defined route to proficiency, written with experts in dozens of disciplines.",
  "did": [
   "Built proficiency programs with agency experts in more than two dozen disciplines, from right of way and construction to bridge inspection and traffic design",
   "Drafted position descriptions and section primers for three bureaus",
   "Researched appraiser classifications nationwide and drafted a salary structure",
   "Designed and delivered a two-week advanced leadership program with the agency's human resources team",
   "Supported a statewide transportation worker proficiency rollout and a staffing utilization method",
   "Maintenance and winter operations training",
   "An appraisal tracker for the right of way appraiser program"
  ],
  "res": [
   "Multiple career pathways, improved compensation structures, and increased accountability",
   "A stronger team-based culture, with higher employee retention and efficiency",
   "Utilization process complete and in use",
   "Transportation worker proficiency program handed to the statewide coordinator",
   "Appraiser classification, certification, and salary structure delivered",
   "Winter operations training delivered"
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
  "res": [
   "Increased on-time project completion and reduced budget variances"
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
   "Economic impact and market studies for advanced air mobility",
   "A land development study for advanced air mobility",
   "A tracking dashboard for advanced air mobility",
   "Train-the-trainer support for the remote pilot program",
   "Leadership transition support for the Aeronautics Division"
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
   "Built current and future-state organization charts and position descriptions",
   "Construction workflows, a construction administration manual, and a training outline",
   "Benefit-cost analysis for interstate operations and safety program coordination",
   "Strategic communications and legislative support for the transformation",
   "Human resources documentation for the restructuring",
   "Leadership and technical training and competency-based staff development",
   "Performance management frameworks and dashboards",
   "An asset management strategy for resource allocation and maintenance decisions",
   "Built a prioritization tool now used to triage the highway project pipeline",
   "Launched a step-zero pilot for pavement preservation projects",
   "Man-hour and cost estimating packages",
   "Local public agency manual and responsible-charge training",
   "Maintenance training and equipment checklists",
   "An interactive organization chart linking each function to its description",
   "Supported the move to the department's construction management platform as the primary project system"
  ],
  "res": [
   "Delivery training modules published for agency use",
   "Comment system and instructions deployed",
   "Maintenance quality assurance handbook finalized",
   "The construction management platform is now the primary system on active projects"
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
   "Next: an AI pilot starting with cash-flow modeling, and a data assessment"
  ],
  "res": [
   "Organization chart for the initial division approved",
   "Final measures compiled by the core team",
   "Change impact template and first manual sections finalized",
   "Five-year work plan, organization design, and performance measures complete",
   "Manual and training about three-quarters complete, on track for year-end"
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
   "Used drone volume calculations to check debris removal quantities"
  ],
  "res": [
   "Response team training held and evaluated",
   "Drone data confirmed the debris quantities when reports disagreed"
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
  "ch": "The state wanted local agencies to use asset management and funding optimization to plan their programs. Each community started from a different place.",
  "did": [
   "Helped each agency name an asset management steering committee",
   "Ran self-assessment surveys and reviewed each agency's plans and inventories",
   "Led in-person workshops using the state's competency framework",
   "Built short, mid, and long-term action plans with each agency",
   "Prepared one-page materials for elected officials"
  ],
  "res": [
   "Workshops and action plans completed with each participating agency"
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
   "Designed a statewide maintenance system based on performance outcomes",
   "Developed benchmarking and cost modeling tools"
  ],
  "res": [
   "Cost savings, improved accountability, and enhanced roadway performance"
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
 "cs-workforce": {
  "id": "cs-workforce",
  "ch": "The department needed a clear picture of its vacancies, how divisions balance staffing supply and demand, and how peer agencies organize.",
  "did": [
   "Drafted the peer benchmarking framework and peer selection criteria",
   "Grouped and analyzed vacancy data by level and tenure",
   "Analyzed filled and open positions by division"
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
  "ch": "The department wanted to streamline how projects are delivered and funded, and to base maintenance funding on performance.",
  "did": [
   "Statewide program reviews with improvements to procurement and contractor performance",
   "Project execution and funding strategies, including federal grant applications",
   "Performance-based budgeting for maintenance funding",
   "Statewide asset tracking for infrastructure planning"
  ],
  "res": [
   "Increased access to federal infrastructure grants, leading to long-term funding stability",
   "Reduced maintenance costs and extended roadway lifespans"
  ],
  "services": [
   "program-delivery",
   "asset-mgmt",
   "procurement",
   "grants",
   "lpa"
  ],
  "subsectors": [
   "sub-highways"
  ],
  "industry": "transport",
  "industry2": null
 },
 "cs-strategic": {
  "id": "cs-strategic",
  "ch": "The department needed a strategic plan that staff at every level helped shape, turned into yearly actions with measures leadership could track.",
  "did": [
   "Ran engagement with executive leadership, a core team, all-staff workshops and surveys, and partners",
   "Facilitated vision, mission, values, goals, and measures",
   "Built the action plan and monitoring frameworks",
   "Facilitated division and district workshops for the first-year action plan",
   "Built a performance measures inventory and profile template"
  ],
  "res": [
   "Strategic plan for 2024 to 2029 complete",
   "Year 1 action plan complete",
   "Action plan tracking tool with progress dashboards in use",
   "Improved project predictability and streamlined resource allocation"
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
 "cs-nv-om": {
  "id": "cs-nv-om",
  "ch": "The department wanted a statewide look at how its operations, maintenance, fleet, and facilities were managed.",
  "did": [
   "Statewide assessment of operations and maintenance programs",
   "Performance-based asset management for fleet and facilities",
   "Fleet optimization program for more than 2,700 vehicles",
   "Predictive maintenance planning to reduce vehicle downtime and extend asset life"
  ],
  "res": [
   "Cost savings, improved service reliability, and extended asset lifespans",
   "Improved budget efficiency and operational performance"
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
   "Interviews with aviation stakeholders statewide",
   "Legislative bill language for the department's review"
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
  "ch": "The department's technology division needed a clear roadmap for innovation and technology investment, tied to agency goals.",
  "did": [
   "Leadership interviews, stakeholder engagement, and a strengths and weaknesses analysis",
   "A technology strategic plan aligned with agency goals and operating priorities",
   "A one-page visual summary for executive alignment"
  ],
  "res": [
   "Technology strategic plan delivered",
   "The technology division has the vision, structure, and tools to lead the agency forward"
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
   "Implemented a strategy based on the ISO 55000 asset management standard"
  ],
  "res": [
   "Cost savings, improved lifecycle management, and better funding allocation"
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
   "Statewide review of performance-based highway maintenance contracts",
   "Improved procurement models and contractor accountability measures"
  ],
  "res": [
   "Increased cost efficiency and improved service quality on interstate maintenance projects"
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
  "ch": "Agencies outsourcing highway maintenance needed a model that pays for performance.",
  "did": [
   "Created a performance-based outsourcing model used by agencies in Florida, Texas, Georgia, South Carolina, Utah, and Arizona"
  ],
  "res": [],
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
 "cs-pa-budget": {
  "id": "cs-pa-budget",
  "ch": "Maintenance budgets needed to be easier to explain and tied to performance.",
  "did": [
   "Developed a performance-based funding model for maintenance"
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
   "Developed an investment strategy for 29,000 acres of parkland",
   "Created a standard asset tracking and capital project planning framework"
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
  "ch": "Some of the largest projects in the country: a $1.2 billion Mississippi River crossing, a $275 million river bridge, and a $2 billion light rail line.",
  "did": [
   "I-74 Mississippi River Crossing, Iowa and Illinois ($1.2 billion): project coordination and risk management between state agencies and contractors",
   "I-70 Rocheport River Bridge, Missouri ($275 million): partnering facilitation, risk mitigation, and stakeholder coordination",
   "Southwest Light Rail Transit, Minnesota ($2.0 billion): collaborative project management, risk management, budget control, and multi-agency coordination"
  ],
  "res": [],
  "services": [
   "program-delivery",
   "owners-rep",
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
   "Working groups with 18 member states"
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
   "Linked it to the systems staff already use, including project status reporting and the department's dashboards",
   "Built the change request system: a web form, a tracker, automatic routing to reviewers and the department, quality check, and close-out",
   "Maintain the scope of work generator and cost estimating tool",
   "Produced how-to videos and online training for project managers"
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
   "Executive-level strategic advisory, including AI governance"
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
  "ch": "The department needed current construction specifications, one trusted home for hundreds of documents spread across an old wiki, and steady support across construction, harbors, airports, and project delivery.",
  "did": [
   "Updated standard specification sections 200 through 700, with section 100 in progress",
   "Reviewed hundreds of wiki documents and gave each one a disposition: keep, update, combine, move, or retire",
   "Backed up and preserved the original site before migration",
   "Planning the rollout of the department's construction management platform on live projects",
   "Remote pilot training for about 20 airport staff candidates",
   "Developing a professional engineer trainee program, using Tennessee's as the model",
   "Setting up records and data structure for the program"
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
   "sub-aviation"
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
  "a project-based technical services firm"
 ],
 [
  "Capacity",
  "a field services and drilling organization"
 ],
 [
  "Single source of truth",
  "a manufacturing firm of 100+ people"
 ],
 [
  "Sales to project handoff",
  "a 130-person professional services firm"
 ],
 [
  "Field reporting",
  "a field service and project delivery firm"
 ],
 [
  "Service handoff",
  "an install, service, and maintenance firm"
 ]
];
export const PRIV: { hear: string[]; start: string[] } = {
 "hear": [
  "The same data keyed into three systems",
  "Reports built by hand every month",
  "Handoffs from sales to delivery drop details",
  "Leadership wants AI, with no plan or policy"
 ],
 "start": [
  "A short call about where your workflows drag",
  "A small first project that fixes one workflow end to end",
  "A readiness check before bigger data or AI work",
  "Ongoing support once it's running"
 ]
};
export const STATES: string[] = [
 "Alaska",
 "Arkansas",
 "Delaware",
 "Florida",
 "Georgia",
 "Hawaii",
 "Idaho",
 "Illinois",
 "Indiana",
 "Iowa",
 "Louisiana",
 "Maryland",
 "Michigan",
 "Missouri",
 "Nevada",
 "New York",
 "North Carolina",
 "Ohio",
 "Oregon",
 "Pennsylvania",
 "Tennessee",
 "Texas",
 "Utah",
 "Virginia",
 "Washington",
 "Wisconsin"
];
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
