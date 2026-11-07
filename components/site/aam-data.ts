/* Drone and advanced air mobility lists. Words follow Jacob's drone document
   (service pages scrub, Nov 6, sections 1.1 to 1.3): the three phases the team
   calls crawl, walk, run (durations left out; his are placeholders), the six
   advanced air mobility work packages, and Where we lead. */
export const LIFECYCLE = [
  { t: "Set up the program", tag: "Crawl", items: ["Current-state review across divisions", "A first use case worth expanding", "Comparison with peer states", "Organizational structure and governance", "Policies, procedures, checklists, and forms", "Equipment guidance"] },
  { t: "Train and solidify", tag: "Walk", items: ["Pilot and crew training", "An onboarding program", "First operations under the new procedures", "Compliance discipline", "Performance tracking"] },
  { t: "Run and advance", tag: "Run", items: ["More and more advanced use cases", "Succession planning", "Input to standards", "Agency-led operation, with on-call support"] },
];
export const AAM_SERVICES = ["Statewide studies and roadmaps", "Local siting guidance", "Economic and environmental impact studies", "Policy and regulatory tracking", "Solicitations and grants", "Manufacturer and market tracking"];
export const WHERE_WE_LEAD = [
  { n: "01", t: "Policy and system planning", d: "Develop policy, system plans, and standardized guidance for local implementation." },
  { n: "02", t: "Regulatory navigation", d: "Provide regulatory understanding for compliance and guide regulatory coordination." },
  { n: "03", t: "Siting guidance", d: "Where air mobility facilities can fit into communities, plus review of vertiport concepts others design." },
  { n: "04", t: "Functional frameworks", d: "Establish functional frameworks that support scalable program delivery and operational readiness." },
  { n: "05", t: "Safety and data policies", d: "Safety, compliance, and data-handling policies built into how the agency flies." },
  { n: "06", t: "Program expansion", d: "Expanding drone use to more divisions and uses, with on-call support as the program grows." },
  { n: "07", t: "Funding", d: "Grant strategy and complete applications, ready to submit." },
];
