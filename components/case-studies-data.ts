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

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "delaware",
    title: "Delaware",
    subtitle: "Technology Strategy",
    image: "/images/pages/delaware.webp",
    heroImage: "/images/pages/cs-hero-10.webp",
    description:
      "DelDOT\u2019s Division of Technology and Innovation Services plays a critical role in advancing the agency\u2019s mission through modern, efficient, and future-ready technology solutions. With a focus on smart infrastructure, data-driven decision-making, and customer-centric services, the division is committed to enabling innovation across all areas of transportation.",
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
          "Rawlins partnered with DelDOT to shape a comprehensive Technology Strategic Plan that provides a clear roadmap for future innovation and IT investment.",
        bullets: [
          "Facilitated discovery through leadership interviews, stakeholder engagement, and SWOT analysis.",
          "Developed a strategic plan aligned with agency goals and operational priorities.",
          "Delivered a high-impact visual summary to distill strategic priorities and enhance executive alignment.",
        ],
      },
    ],
    impactNote:
      "This effort ensures DelDOT\u2019s technology division is equipped with the vision, structure, and tools needed to lead confidently into the future.",
  },
  {
    slug: "louisiana",
    title: "Louisiana",
    subtitle: "Organizational Transformation",
    image: "/images/pages/louisiana.webp",
    heroImage: "/images/pages/cs-hero-9.webp",
    description:
      "Rawlins is actively supporting the Louisiana Department of Transportation and Development (DOTD) through a comprehensive transformation initiative that aims to enhance organizational efficiency, program delivery, workforce development, and accountability.",
    sectionHeading: "Key Projects & Initiatives",
    projects: [
      {
        title: "Organizational Structure & Efficiency",
        description:
          "Analyze DOTD\u2019s organizational structure, provide strategic recommendations, and support implementation for enhanced operational efficiency.",
        bullets: [
          "Analyze DOTD\u2019s organizational structure, provide strategic recommendations, and support implementation for enhanced operational efficiency.",
          "Streamline project selection, prioritization processes, and optimize district maintenance practices.",
          "Develop human resources documentation to facilitate successful organizational restructuring.",
        ],
      },
      {
        title: "Program Delivery Improvements",
        description:
          "Enhance project management methodologies to improve interdisciplinary coordination and accountability.",
        bullets: [
          "Enhance project management methodologies to improve interdisciplinary coordination and accountability.",
          "Optimize the Local Public Agency (LPA) program delivery to strengthen technical support, ensure compliance, and enhance efficiency.",
          "Establish an asset management strategy to optimize resource allocation and maintenance decision-making.",
        ],
      },
      {
        title: "Leadership, Staff Development & Performance Management",
        description:
          "Develop comprehensive leadership and technical training programs to cultivate talent, leadership skills, and career advancement opportunities.",
        bullets: [
          "Develop comprehensive leadership and technical training programs to cultivate talent, leadership skills, and career advancement opportunities.",
          "Create and implement competency-based staff development initiatives to elevate overall departmental performance.",
          "Design robust performance management frameworks and data-driven dashboards to reinforce departmental and individual accountability.",
        ],
      },
      {
        title: "Strategic Communication & Legislative Support",
        description:
          "Develop a strategic communications plan ensuring transparent and effective internal and external stakeholder engagement throughout the transformation process.",
        bullets: [
          "Develop a strategic communications plan ensuring transparent and effective internal and external stakeholder engagement throughout the transformation process.",
          "Provide legislative analysis and support, enhancing DOTD\u2019s reputation and strengthening stakeholder relations to drive statewide economic development.",
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
      "Michigan has been at the forefront of performance-based infrastructure operations, and we have supported the state in implementing innovative maintenance models and asset management solutions.",
    sectionHeading: "Key Projects & Initiatives",
    projects: [
      {
        title: "Performance-Based Operations Project",
        description:
          "Designed and implemented a statewide maintenance system based on performance outcomes.",
        bullets: [
          "Designed and implemented a statewide maintenance system based on performance outcomes.",
          "Developed benchmarking and cost modeling tools to improve maintenance efficiency.",
          "Resulted in cost savings, improved accountability, and enhanced roadway performance.",
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
      "Nevada\u2019s transportation network is vital for both economic development and community connectivity. Rawlins has played a significant role in modernizing infrastructure planning and maintenance across the state. Our work with the Nevada Department of Transportation (NDOT) has focused on strategic planning, asset management, and fleet optimization to ensure a more efficient, reliable, and cost-effective transportation system.",
    sectionHeading: "Key Projects & Initiatives",
    projects: [
      {
        title: "Strategic Plan (NDOT 2024\u20132029)",
        description:
          "Developed a 6-year strategic plan to align NDOT\u2019s priorities with long-term infrastructure goals.",
        bullets: [
          "Developed a 6-year strategic plan to align NDOT\u2019s priorities with long-term infrastructure goals.",
          "Focused on innovation, performance management, and organizational efficiency.",
          "Improved project predictability and streamlined resource allocation.",
        ],
      },
      {
        title: "Operations and Maintenance Program Review",
        description:
          "Conducted a statewide assessment of NDOT\u2019s operations and maintenance programs.",
        bullets: [
          "Conducted a statewide assessment of NDOT\u2019s operations and maintenance programs.",
          "Introduced performance-based asset management to optimize fleet and facility management.",
          "Resulted in cost savings, improved service reliability, and extended asset lifespans.",
        ],
      },
      {
        title: "Fleet Optimization & Asset Management",
        description:
          "Developed a comprehensive fleet optimization program for over 2,700 vehicles.",
        bullets: [
          "Developed a comprehensive fleet optimization program for over 2,700 vehicles.",
          "Implemented predictive maintenance planning to reduce vehicle downtime and extend asset life.",
          "Improved budget efficiency and operational performance.",
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
      "North Carolina\u2019s Department of Transportation (NCDOT) has made significant strides in asset management and program delivery efficiency. Our work has supported integrated project delivery, federal grant applications, and data-driven infrastructure improvements.",
    sectionHeading: "Key Projects & Initiatives",
    projects: [
      {
        title: "Integrated Program Delivery (IPD)",
        description:
          "Assisted NCDOT in streamlining project execution and funding strategies.",
        bullets: [
          "Assisted NCDOT in streamlining project execution and funding strategies.",
          "Conducted statewide program reviews and facilitated improvements in procurement and contractor performance.",
          "Increased access to federal infrastructure grants, leading to long-term funding stability.",
        ],
      },
      {
        title: "Asset Management Project",
        description:
          "Implemented performance-based budgeting to optimize maintenance funding.",
        bullets: [
          "Implemented performance-based budgeting to optimize maintenance funding.",
          "Developed statewide asset tracking systems for improved infrastructure planning.",
          "Resulted in reduced maintenance costs and extended roadway lifespans.",
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
      "Tennessee has been a leader in modernizing transportation project delivery and organizational effectiveness. Our work with the Tennessee Department of Transportation (TDOT) has focused on enhancing program management, improving risk assessment, and fostering a culture of innovation and accountability.",
    sectionHeading: "Key Projects & Initiatives",
    projects: [
      {
        title: "Integrated Program Delivery (IPD)",
        description:
          "Overhauled TDOT\u2019s project management lifecycle, from planning to maintenance.",
        bullets: [
          "Overhauled TDOT\u2019s project management lifecycle, from planning to maintenance.",
          "Introduced risk management strategies to improve project scope, schedule, and budget control.",
          "Resulted in increased on-time project completion and reduced budget variances.",
        ],
      },
      {
        title: "Empowering People Influencing Culture (EPIC)",
        description:
          "Developed an organizational restructuring initiative to enhance workforce productivity.",
        bullets: [
          "Developed an organizational restructuring initiative to enhance workforce productivity.",
          "Created multiple career pathways, improved compensation structures, and increased accountability.",
          "Strengthened team-based culture, leading to higher employee retention and efficiency.",
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
      "Utah\u2019s Department of Transportation (UDOT) has prioritized long-term asset management and cost reduction strategies. Our work has supported the development of sustainable infrastructure investment frameworks.",
    sectionHeading: "Key Projects & Initiatives",
    projects: [
      {
        title: "Asset Management Project",
        description:
          "Conducted a comprehensive review of UDOT\u2019s asset management programs.",
        bullets: [
          "Conducted a comprehensive review of UDOT\u2019s asset management programs.",
          "Implemented an ISO 55000-based strategy for long-term infrastructure sustainability.",
          "Resulted in cost savings, improved lifecycle management, and better funding allocation.",
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
      "Virginia\u2019s transportation infrastructure is a key component of economic growth and mobility. Our work has focused on enhancing highway maintenance programs, improving contractor performance, and refining asset management strategies.",
    sectionHeading: "Key Projects & Initiatives",
    projects: [
      {
        title: "Turnkey Asset Maintenance Services (TAMS) Review",
        description:
          "Conducted a statewide review of VDOT\u2019s performance-based highway maintenance contracts.",
        bullets: [
          "Conducted a statewide review of VDOT\u2019s performance-based highway maintenance contracts.",
          "Developed improved contract procurement models and enhanced contractor accountability measures.",
          "Increased cost efficiency and improved service quality on interstate maintenance projects.",
        ],
      },
    ],
  },
  {
    slug: "major-transportation-infrastructure",
    title: "Major Transportation Infrastructure Projects",
    subtitle: "High-Impact Infrastructure",
    image: "/images/pages/majortrans.webp",
    heroImage: "/images/pages/cs-hero-8.webp",
    description:
      "Rawlins has supported some of the largest and most complex transportation infrastructure projects in the United States, providing expert project management, risk mitigation, and multi-agency coordination.",
    sectionHeading: "Key Projects",
    projects: [
      {
        title: "I-74 Mississippi River Crossing (Iowa/Illinois)",
        description:
          "Provided project coordination and risk management strategies for this critical river crossing project.",
        budget: "$1.2 Billion",
        bullets: [
          "Provided project coordination and risk management strategies for this critical river crossing project.",
          "Ensured efficient collaboration between state agencies and contractors.",
        ],
      },
      {
        title: "I-70 Rocheport River Bridge (Missouri)",
        description:
          "Led partnering facilitation to align project goals with contractor capabilities.",
        budget: "$275 Million",
        bullets: [
          "Led partnering facilitation to align project goals with contractor capabilities.",
          "Improved risk mitigation strategies and stakeholder coordination.",
        ],
      },
      {
        title: "Southwest Light Rail Transit (Minnesota)",
        description:
          "Developed collaborative project management approaches for this massive transit expansion in Minneapolis.",
        budget: "$2.0 Billion",
        bullets: [
          "Developed collaborative project management approaches for this massive transit expansion in Minneapolis.",
          "Focused on risk management, budget control, and multi-agency coordination.",
        ],
      },
    ],
  },
  {
    slug: "other-states-major-projects",
    title: "Other States & Major Projects",
    subtitle: "Nationwide Impact",
    image: "/images/pages/transportation.webp",
    heroImage: "/images/pages/cs-hero-7.webp",
    description:
      "Rawlins has provided strategic consulting services across multiple states, delivering tailored solutions for transportation agencies with diverse operational needs.",
    sectionHeading: "Key Projects & Initiatives",
    projects: [
      {
        title: "Pennsylvania \u2014 Maintenance Budgeting Project",
        description:
          "Developed a performance-based funding model to improve budget transparency and optimize maintenance spending.",
        bullets: [
          "Developed a performance-based funding model to improve budget transparency and optimize maintenance spending.",
        ],
      },
      {
        title: "New York \u2014 NYC Parks & Recreation Asset Management",
        description:
          "Developed an investment strategy for 29,000 acres of parkland, creating a standardized asset tracking and capital project planning framework.",
        bullets: [
          "Developed an investment strategy for 29,000 acres of parkland, creating a standardized asset tracking and capital project planning framework.",
        ],
      },
      {
        title: "Riverside County, California \u2014 Facilities & Fleet Operations Review",
        description:
          "Conducted an operational review to identify cost-saving opportunities and efficiency improvements in fleet and facility management.",
        bullets: [
          "Conducted an operational review to identify cost-saving opportunities and efficiency improvements in fleet and facility management.",
        ],
      },
      {
        title: "AMOTIA Contracting Model Development",
        description:
          "Created a customized, performance-based outsourcing model for DOTs to enhance highway maintenance efficiency and cost-effectiveness.",
        bullets: [
          "Created a customized, performance-based outsourcing model for DOTs across Florida, Texas, Georgia, South Carolina, Utah, and Arizona to enhance highway maintenance efficiency and cost-effectiveness.",
        ],
      },
    ],
  },
];
