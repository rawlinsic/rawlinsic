/* Step-by-step features on four service pages ("from our work"). One source
   for the words: the old page components and the v8 pages both read these. */
export type FeatureStep = { t: string; d: string };
export const SERVICE_STEPS: Record<string, { title: string; kicker?: string; steps: FeatureStep[] }> = {
  workforce: { title: "What a proficiency path looks like", kicker: "From our work", steps: [
    { t: "Required proficiencies", d: "What every person in the role must show" }, { t: "Electives", d: "Specialties that fit the work unit" },
    { t: "Demonstration", d: "Task sheets scored by a trained reviewer" }, { t: "Review", d: "Supervisor and peer sign-off" }, { t: "Advance", d: "A clear step to the next level" }] },
  "strategic-planning": { title: "How a strategic plan comes together", kicker: "From our work", steps: [
    { t: "Engage", d: "Leadership, staff, and partners shape it" }, { t: "Set direction", d: "Vision, goals, and measures" },
    { t: "Act", d: "Yearly action plans by division" }, { t: "Track", d: "Progress dashboards leadership reviews" }] },
  "training-video": { title: "How a training video comes together", kicker: "From our work", steps: [
    { t: "Storyboard", d: "Who it's for and the one task it teaches" }, { t: "Script", d: "Written with the experts who do the work" }, { t: "Build", d: "Screens, narration, and examples" },
    { t: "Review", d: "Experts and leadership sign off" }, { t: "Publish", d: "On the program's site, next to the tool" }] },
  /* Nov 12 (Nicole's Operations & Maintenance file, v8): "How we do it" on the Operations & Maintenance pages. Each step is one
     sentence, so the cards carry it as text with no title. */
  "asset-mgmt": { title: "How we do it", steps: [
    { t: "", d: "Define the function: its purpose, the assets it covers, the decisions it makes, and how it relates to existing offices." },
    { t: "", d: "Map who owns the data, the analysis, the budget recommendations, and the action in the field." },
    { t: "", d: "Design the organization and the roles, and connect each measure to the decisions and resources a unit controls." },
    { t: "", d: "Support onboarding and the management routines, and document how the agency will review performance and keep the structure current." },
  ] },
  mqa: { title: "How we do it", steps: [
    { t: "", d: "Define the assets and characteristics to rate, how the results will be used, and the state of the inventory." },
    { t: "", d: "Set observable performance standards, sampling and rating procedures, rater preparation, and quality control." },
    { t: "", d: "Pilot the approach, test consistency, and define how results are rolled up and compared with service expectations." },
    { t: "", d: "Build the management routine: explain results, identify priority needs, and connect condition findings with budget and work planning." },
  ] },
  outsourcing: { title: "How we do it", steps: [
    { t: "", d: "Assess the required work, the workforce and equipment capacity, the service expectations, and the contractor market." },
    { t: "", d: "Compare the sourcing models that are feasible, including what the agency keeps." },
    { t: "", d: "Define the inventory assumptions, standards, measurement, payment logic, and risk responsibilities with procurement and legal staff." },
    { t: "", d: "Prepare the implementation and market engagement plans, and support the transition." },
  ] },
  pbmc: { title: "How we do it", steps: [
    { t: "", d: "Set a measurable baseline of maintenance quality before the contract." },
    { t: "", d: "Write the standards, payment, and deduction rules." },
    { t: "", d: "Take the draft to industry and revise it." },
    { t: "", d: "Support the agency through award." },
    { t: "", d: "Help administer the contract alongside agency staff, and record what to change next time." },
  ] },
  fleet: { title: "How we do it", steps: [
    { t: "", d: "Document how equipment is chosen, used, maintained, and replaced today." },
    { t: "", d: "Interview the people who use and maintain it, and survey staff statewide." },
    { t: "", d: "Compare with other states." },
    { t: "", d: "Recommend the process, the measures, and the responsibilities." },
    { t: "", d: "Help put the approved recommendations in place." },
  ] },
  operations: { title: "How we do it", steps: [
    { t: "", d: "Review the program with the people who run it, in the districts and at headquarters." },
    { t: "", d: "Set the standards and the budget method." },
    { t: "", d: "Write the procedures, checklists, and training." },
    { t: "", d: "Test readiness with exercises." },
    { t: "", d: "Hand it to the staff who will keep it current." },
  ] },
  traffic: { title: "How we do it", steps: [
    { t: "", d: "Review the current program, its plans and documents, and who is responsible for what." },
    { t: "", d: "Compare with relevant peer practice." },
    { t: "", d: "Agree on the gaps, the priorities, and who owns each action." },
    { t: "", d: "Write the recommendations, guidance, or method." },
    { t: "", d: "Connect it to project delivery, training, and investment decisions." },
  ] },
};

/* Asset Management's steps before Nov 12 ("The asset life cycle"), kept for the record: the page now shows How we do it. */
export const ASSET_LIFE_CYCLE = { title: "The asset life cycle", steps: [
    { t: "Inventory", d: "Know what you own and where" }, { t: "Condition", d: "Know what shape it's in" }, { t: "Strategy", d: "Life cycle, risk, and investment decisions" },
    { t: "Delivery", d: "Maintain and replace on plan" }, { t: "Performance", d: "Measure the result and adjust" }] };
