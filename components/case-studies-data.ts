export interface CaseStudyProject {
  title: string;
  description: string;
  bullets?: string[];
  budget?: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  heroImage: string;
  sectionHeading?: string;
  projects: CaseStudyProject[];
  clientInfo?: {
    client?: string;
    location?: string;
    year?: string;
    services?: string;
  };
  impactNote?: string;
}

/* Wording matches Rawlins' qualifications document (content fixes v1, Nov 5 2026,
   section 5). Results lines with no record behind them were removed. */
export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "delaware",
    title: "Delaware",
    subtitle: "Technology Strategy",
    image: "/images/pages/delaware.webp",
    heroImage: "/images/pages/cs-hero-10.webp",
    description:
      "Delaware\u2019s transportation department needed a technology strategic plan to guide its innovation and IT investment.",
    sectionHeading: "Key Projects & Initiatives",
    clientInfo: {
      client: "Delaware Department of Transportation",
      location: "Dover, Delaware",
      year: "2024\u201325",
      services: "Strategic Planning, Stakeholder Engagement",
    },
    projects: [
      {
        title: "Technology Strategic Plan",
        description:
          "We helped DelDOT write a technology strategic plan that sets priorities for innovation and IT investment.",
        bullets: [
          "Facilitated discovery through leadership interviews, stakeholder engagement, and a strengths, weaknesses, opportunities, and threats analysis.",
          "Developed a strategic plan aligned with agency goals and operational priorities.",
          "Delivered a one-page visual summary of the priorities for leadership.",
        ],
      },
    ],
  },
  {
    slug: "louisiana",
    title: "Louisiana",
    subtitle: "Organizational Transformation",
    image: "/images/pages/louisiana.webp",
    heroImage: "/images/pages/cs-hero-9.webp",
    description:
      "We\u2019re supporting the Louisiana Department of Transportation and Development (DOTD) on a statewide effort to improve how it\u2019s organized, how it delivers projects, how it develops staff, and how it tracks performance.",
    sectionHeading: "Key Projects & Initiatives",
    projects: [
      {
        title: "Organizational Structure & Efficiency",
        description:
          "Analyze DOTD\u2019s organizational structure, recommend changes, and support putting them in place.",
        bullets: [
          "Analyze DOTD\u2019s organizational structure, recommend changes, and support putting them in place.",
          "Simplify how projects are selected and prioritized, and improve district maintenance practices.",
          "Prepare the human resources documentation the restructuring needs.",
        ],
      },
      {
        title: "Program Delivery Improvements",
        description:
          "Improve project management methods so disciplines coordinate and responsibilities are clear.",
        bullets: [
          "Improve project management methods so disciplines coordinate and responsibilities are clear.",
          "Improve the Local Public Agency (LPA) program: technical support, compliance, and efficiency.",
          "Set an asset management strategy to guide resource allocation and maintenance decisions.",
        ],
      },
      {
        title: "Leadership, Staff Development & Performance Management",
        description:
          "Build leadership and technical training programs and clear paths for advancement.",
        bullets: [
          "Build leadership and technical training programs and clear paths for advancement.",
          "Create competency-based staff development.",
          "Design performance management frameworks and dashboards that track department and individual accountability.",
        ],
      },
      {
        title: "Strategic Communication & Legislative Support",
        description:
          "Write a communications plan that keeps staff and outside stakeholders informed throughout the effort.",
        bullets: [
          "Write a communications plan that keeps staff and outside stakeholders informed throughout the effort.",
          "Provide legislative analysis and support.",
        ],
      },
    ],
  },
  {
    slug: "michigan",
    title: "Michigan",
    subtitle: "Performance-Based Operations",
    image: "/images/pages/michigan.webp",
    heroImage: "/images/pages/cs-hero-5.webp",
    description:
      "We supported the Michigan Department of Transportation in moving statewide highway maintenance to a performance-based approach, and helped local agencies use asset management.",
    sectionHeading: "Key Projects & Initiatives",
    projects: [
      {
        title: "Performance-Based Operations Project",
        description:
          "Helped design and implement a performance-based program for statewide highway maintenance.",
        bullets: [
          "Helped design and implement a performance-based program for statewide highway maintenance.",
          "Field measurement of current levels of service, and outcome-based performance measures.",
          "A cost model for maintenance activities.",
          "Requirements and procurement support for an enterprise asset management system.",
        ],
      },
    ],
  },
  {
    slug: "nevada",
    title: "Nevada",
    subtitle: "Infrastructure & Fleet",
    image: "/images/pages/nv.webp",
    heroImage: "/images/pages/cs-hero-2.webp",
    description:
      "We\u2019ve worked with the Nevada Department of Transportation on its six-year strategic plan and a statewide review of its operations and maintenance programs.",
    sectionHeading: "Key Projects & Initiatives",
    projects: [
      {
        title: "Strategic Plan (NDOT 2024\u20132029)",
        description:
          "Developed a 6-year strategic plan to align NDOT\u2019s priorities with long-term infrastructure goals.",
        bullets: [
          "Developed a 6-year strategic plan to align NDOT\u2019s priorities with long-term infrastructure goals.",
          "Covers culture, innovation, employee growth, asset management, performance management, and organizational structure.",
        ],
      },
      {
        title: "Operations and Maintenance Program Review",
        description:
          "Conducted a statewide assessment of NDOT\u2019s operations and maintenance programs.",
        bullets: [
          "Conducted a statewide assessment of NDOT\u2019s operations and maintenance programs.",
          "Reviewed asset management, performance management, fleet and facilities, district operations, organization, budgeting, and traffic operations.",
        ],
      },
    ],
  },
  {
    slug: "north-carolina",
    title: "North Carolina",
    subtitle: "Asset Management & Program Delivery",
    image: "/images/pages/nc.webp",
    heroImage: "/images/pages/cs-hero-3.webp",
    description:
      "We supported the North Carolina Department of Transportation on integrated project delivery, federal grant applications, and a review of its asset management practices.",
    sectionHeading: "Key Projects & Initiatives",
    projects: [
      {
        title: "Integrated Program Delivery (IPD)",
        description:
          "Reviewed programs with staff and recommended improvements to how projects are delivered and funded.",
        bullets: [
          "Reviewed programs with staff and recommended improvements to how projects are delivered and funded.",
          "Supported BUILD and INFRA federal grant applications and the projects that were awarded.",
        ],
      },
      {
        title: "Asset Management Project",
        description:
          "Reviewed asset management for highways, ports, airports, rail, transit, fleet, and ferries.",
        bullets: [
          "Reviewed asset management for highways, ports, airports, rail, transit, fleet, and ferries.",
          "Identified where maintenance funding could be allocated based on performance.",
        ],
      },
    ],
  },
  {
    slug: "tennessee",
    title: "Tennessee",
    subtitle: "Program Delivery & Workforce",
    image: "/images/pages/tnbig.webp",
    heroImage: "/images/pages/cs-hero-1.webp",
    description:
      "We\u2019ve supported the Tennessee Department of Transportation on integrated program delivery and on EPIC, a department-wide restructuring.",
    sectionHeading: "Key Projects & Initiatives",
    projects: [
      {
        title: "Integrated Program Delivery (IPD)",
        description:
          "Reworked the project management life cycle from planning to maintenance.",
        bullets: [
          "Reworked the project management life cycle from planning to maintenance.",
          "Introduced risk management strategies to improve project scope, schedule, and budget control.",
        ],
      },
      {
        title: "Empowering People Influencing Culture (EPIC)",
        description:
          "Supported the review and rollout of a new organizational structure.",
        bullets: [
          "Supported the review and rollout of a new organizational structure.",
          "Goals: multiple career paths, pay set to industry benchmarks, and stronger checks and balances.",
        ],
      },
    ],
  },
  {
    slug: "utah",
    title: "Utah",
    subtitle: "Long-term Asset Strategy",
    image: "/images/pages/utah.webp",
    heroImage: "/images/pages/cs-hero-6.webp",
    description:
      "We reviewed the Utah Department of Transportation\u2019s asset management practices for highway maintenance and helped it set a strategy and plan to improve them.",
    sectionHeading: "Key Projects & Initiatives",
    projects: [
      {
        title: "Asset Management Project",
        description:
          "Conducted a comprehensive review of UDOT\u2019s asset management programs.",
        bullets: [
          "Conducted a comprehensive review of UDOT\u2019s asset management programs.",
          "Developed an asset management strategy, vision, and implementation plan, using the ISO 55000 standard as the guide.",
          "Resulted in a plan of action for improving the department\u2019s asset management.",
        ],
      },
    ],
  },
  {
    slug: "virginia",
    title: "Virginia",
    subtitle: "Maintenance Contracts",
    image: "/images/pages/virginia.webp",
    heroImage: "/images/pages/cs-hero-4.webp",
    description:
      "We reviewed the Virginia Department of Transportation\u2019s performance-based Turnkey Asset Maintenance Services (TAMS) contracts for interstate maintenance.",
    sectionHeading: "Key Projects & Initiatives",
    projects: [
      {
        title: "Turnkey Asset Maintenance Services (TAMS) Review",
        description:
          "Conducted a statewide review of VDOT\u2019s performance-based highway maintenance contracts.",
        bullets: [
          "Conducted a statewide review of VDOT\u2019s performance-based highway maintenance contracts.",
          "Delivered an action plan, procurement recommendations, and performance measures and levels of service for interstate maintenance.",
          "Resulted in process improvements that increase contractor accountability and let VDOT spend less time monitoring contractors\u2019 work.",
        ],
      },
    ],
  },
  {
    slug: "major-transportation-infrastructure",
    title: "Major projects",
    subtitle: "Partnering on major crossings and transit",
    image: "/images/pages/majortrans.webp",
    heroImage: "/images/pages/cs-hero-8.webp",
    description:
      "We\u2019ve facilitated partnering on three major projects, keeping owners and contractors working from the same plan for risk and issues.",
    sectionHeading: "Key Projects",
    projects: [
      {
        title: "I-74 Mississippi River Crossing (Iowa/Illinois)",
        description:
          "Partnering facilitation between the owner and contractor: project charter, risk register, issue resolution process, and team evaluations.",
        budget: "$1.2 Billion",
      },
      {
        title: "I-70 Rocheport River Bridge (Missouri)",
        description:
          "Partnering facilitation between the owner and contractor: project charter, risk register, issue resolution process, and team evaluations.",
        budget: "$275 Million",
      },
      {
        title: "Southwest Light Rail Transit (Minnesota)",
        description:
          "Partnering facilitation between the owner and contractor: project charter, risk register, issue resolution process, and team evaluations.",
        budget: "$2.0 Billion",
      },
    ],
  },
  {
    slug: "other-states-major-projects",
    title: "More of our work",
    image: "/images/pages/transportation.webp",
    heroImage: "/images/pages/cs-hero-7.webp",
    description:
      "More of our work, from maintenance budgeting to parks, fleet, and facilities.",
    sectionHeading: "Key Projects & Initiatives",
    projects: [
      {
        title: "Pennsylvania: Maintenance budgeting",
        description:
          "Reviewed how maintenance budgets are allocated, compared them with leading practice, and delivered a white paper with near-, mid-, and long-term steps.",
        bullets: [
          "Reviewed how maintenance budgets are allocated, compared them with leading practice, and delivered a white paper with near-, mid-, and long-term steps.",
        ],
      },
      {
        title: "New York: NYC Parks & Recreation asset management",
        description:
          "Helped set an asset investment strategy for 29,000 acres of parkland.",
        bullets: [
          "Helped set an asset investment strategy for 29,000 acres of parkland.",
          "A standard asset inspection protocol to inform capital planning, with a phased rollout.",
          "A framework and tool to prioritize capital needs across asset types.",
        ],
      },
      {
        title: "Riverside County, California: Facilities & fleet operations review",
        description:
          "Conducted an operational review to identify cost-saving opportunities and efficiency improvements in fleet and facility management.",
        bullets: [
          "Conducted an operational review to identify cost-saving opportunities and efficiency improvements in fleet and facility management.",
        ],
      },
      {
        title: "AMOTIA Contracting Model Development",
        description:
          "Interviewed DOT leaders in Florida, Texas, Georgia, South Carolina, Utah, and Arizona about their maintenance needs.",
        bullets: [
          "Interviewed DOT leaders in Florida, Texas, Georgia, South Carolina, Utah, and Arizona about their maintenance needs.",
          "Recommended Flexible Asset Management Services: four contracting methods a DOT can combine.",
        ],
      },
    ],
  },
];
