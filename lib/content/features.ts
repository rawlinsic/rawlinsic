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
  /* Nov 13 (Nicole's Program & Project Delivery file, v6): How we do it on the 13 pages */
  "program-delivery": { title: "How we do it", steps: [
    { t: "", d: "Establish the objectives, funding categories, commitments, and decisions the program has to support." },
    { t: "", d: "Pull together what the agency already knows about each project, and agree what to do where information is missing." },
    { t: "", d: "Build the criteria, the sequence, and the milestones with the people who own them, and test them on real candidate projects." },
    { t: "", d: "Set the reporting and change-control routine, so leadership sees a problem while there is still time to act." },
  ] },
  finance: { title: "How we do it", steps: [
    { t: "", d: "Agree the decision the numbers have to support." },
    { t: "", d: "Pull the agency's own data: positions, pay, contracts, fleet, fuel, and work records." },
    { t: "", d: "Build the analysis with finance and HR staff, and test it against the budget." },
    { t: "", d: "Present options leadership can act on, with the assumptions on record." },
  ] },
  planning: { title: "How we do it", steps: [
    { t: "", d: "Read the plans and programs the agency already has, and talk with the people who build them." },
    { t: "", d: "Find where the long-range plan, the improvement program, and the asset plan disagree, and why." },
    { t: "", d: "Write the guidance, the selection method, or the organization that closes the gap, with the planning staff." },
    { t: "", d: "Hand it over with an owner and a routine for keeping it current." },
  ] },
  "proj-delivery": { title: "How we do it", steps: [
    { t: "", d: "Find out how projects move today: interviews, sample projects, current manuals, and what each discipline needs. Note where the written process and actual practice differ." },
    { t: "", d: "Define the steps, each discipline's activities, who is accountable, what each activity needs and hands over, and where reviews and escalations sit. Test the handoffs between disciplines." },
    { t: "", d: "Build the activity pages, process diagrams, templates, and resource library. Set who owns the content and how staff ask for a revision." },
    { t: "", d: "Pilot it on real projects, close the gaps, prepare staff, and agree how projects already under way move onto the new process." },
  ] },
  preconstruction: { title: "How we do it", steps: [
    { t: "", d: "Agree where preconstruction starts and ends for this agency, and which decisions each step has to support." },
    { t: "", d: "Map what each discipline receives, produces, approves, and hands over, and where information goes missing." },
    { t: "", d: "Build the scoping method, the estimate checks, the handoff rules, and the project manager's resources with the staff who will use them. Test them on real projects, including the hard ones." },
    { t: "", d: "Put them to use: prepare staff, name owners, and place projects already under way at the right point." },
  ] },
  construction: { title: "How we do it", steps: [
    { t: "", d: "Map the administrative process, the governing documents, the approval thresholds, and the escalation paths, and note where decisions and approvals slow down." },
    { t: "", d: "Reconcile the manuals, the directives, and day-to-day practice with the people who own each one." },
    { t: "", d: "Redesign the workflow across units, and write down the information, approvals, exceptions, and records it needs." },
    { t: "", d: "Pilot the change, help staff take it up, and name an owner for updates." },
  ] },
  "alt-delivery": { title: "How we do it", steps: [
    { t: "", d: "Assess the agency's authority, goals, staff experience, likely projects, and market." },
    { t: "", d: "Define the internal function: who decides what, what stays with the agency, and what it needs from its technical advisors." },
    { t: "", d: "Build the selection method, procedures, and role descriptions with the people who will own them, and test them on different kinds of projects." },
    { t: "", d: "Use the first project to adjust the procedures." },
  ] },
  procurement: { title: "How we do it", steps: [
    { t: "", d: "Map how services are acquired and managed today: the units, the demand that is coming, and the constraints." },
    { t: "", d: "Define what a scope has to contain, how effort is estimated, and who reviews what." },
    { t: "", d: "Write the procedures for evaluation, negotiation, management, and performance feedback with procurement staff and counsel." },
    { t: "", d: "Line the pipeline up with the work program, and report where it backs up." },
  ] },
  "federal-aid": { title: "How we do it", steps: [
    { t: "", d: "Compare what is programmed with what is ready." },
    { t: "", d: "Find where readiness breaks: environmental work, right of way, utilities, design, or procurement." },
    { t: "", d: "Write the guidance and the oversight steps with the people who run the program." },
    { t: "", d: "Train the staff in responsible charge." },
  ] },
  lpa: { title: "How we do it", steps: [
    { t: "", d: "Read other states' manuals and talk with peer programs." },
    { t: "", d: "Set the program structure with a steering committee: charter, chapter authors, and schedule." },
    { t: "", d: "Write the manual chapter by chapter with the department's own authors." },
    { t: "", d: "Build the certification process and the training, and launch them." },
  ] },
  grants: { title: "How we do it", steps: [
    { t: "", d: "Track the opportunities, and match them to what the agency is ready to do." },
    { t: "", d: "Build the task structure, the budget, and the partners." },
    { t: "", d: "Write the narrative to the scoring criteria, in the applicant's voice." },
    { t: "", d: "When the award comes, help with procurement, reporting, and the work itself." },
  ] },
  partnering: { title: "How we do it", steps: [
    { t: "", d: "Interview both sides' project managers, and agree who takes part and what the facilitator's role is." },
    { t: "", d: "Hold the kickoff: charter, shared goals, risk owners, decision dates, and the issue resolution ladder." },
    { t: "", d: "Run recurring sessions and progress surveys, and report the results to both sides." },
    { t: "", d: "Write up each session, and carry what worked back to the department's leaders." },
  ] },
  "owners-rep": { title: "How we do it", steps: [
    { t: "", d: "Agree the role in writing: what we review, who decides, and what the owner can rely on." },
    { t: "", d: "Set the rhythm: weekly calls, monthly field reviews, and reports to leadership." },
    { t: "", d: "Track commitments, deficiencies, and risks, and raise issues early." },
    { t: "", d: "Build the owner's own staff into the role." },
  ] },
  /* Nov 13 (Strategy & Organization file v2): How we do it on three pages */
  "org-design": { title: "How we do it", steps: [
    { t: "", d: "Assess the unit: interviews, its documents, its workload, and how peer agencies organize the same work." },
    { t: "", d: "Propose the structure, and work through it with leadership and human resources." },
    { t: "", d: "Write the position descriptions and primers with the unit's own experts." },
    { t: "", d: "Plan the move: who goes where, what it costs, and how progress is tracked." },
  ] },
  "change-mgmt": { title: "How we do it", steps: [
    { t: "", d: "Define the change: what is different, who is affected, and when." },
    { t: "", d: "Assess the impact by role, and agree the message with leadership." },
    { t: "", d: "Build the communications plan and the network of change champions." },
    { t: "", d: "Support the rollout with workshops and training, and check how it is going with the people affected." },
  ] },
  "exec-advisory": { title: "How we do it", steps: [
    { t: "", d: "Agree what the executive needs: the decisions ahead, the time frame, and how we will work together." },
    { t: "", d: "Set a standing rhythm: working sessions, written follow-up, and time on site." },
    { t: "", d: "Bring the research, the options, and the experience of people who have held the job." },
    { t: "", d: "Leave the documents behind: charters, plans, and briefing materials the office keeps using." },
  ] },
  /* Nov 13 (Nicole's Digital Solutions file, v5): "How we do it" on six of the seven pages; Videos keeps "How a training video
     comes together" above. Each step is one sentence, with no title. */
  portals: { title: "How we do it", steps: [
    { t: "", d: "Agree who the site is for and what they come to do." },
    { t: "", d: "Inventory what exists: the tools, manuals, forms, and training, and who owns each." },
    { t: "", d: "Build the site and its tools, and review a full preview copy with the people who will use it." },
    { t: "", d: "Launch, train the owners, and set how changes are requested and published." },
  ] },
  automation: { title: "How we do it", steps: [
    { t: "", d: "Agree the problem, who decides, and what a working result looks like." },
    { t: "", d: "Map the workflow as it runs today with the staff who do the work, and separate the symptoms from the causes." },
    { t: "", d: "Design and build on the platforms already in place, and test with real records." },
    { t: "", d: "Document it, train the owners, and hand it over." },
  ] },
  "data-governance": { title: "How we do it", steps: [
    { t: "", d: "Agree the decision the data has to support, and who has authority over it." },
    { t: "", d: "Inventory the data in scope: sources, owners, definitions, and quality." },
    { t: "", d: "Write the policy, the roles, and the workflows with the people who will hold them." },
    { t: "", d: "Set up the steering committee or working group that keeps it going." },
  ] },
  ai: { title: "How we do it", steps: [
    { t: "", d: "Agree what the organization wants AI for, and who governs it." },
    { t: "", d: "Review the candidate uses, the data behind each, and the risks, and rank them." },
    { t: "", d: "Set the policy, choose the tools, and run the first use with a small group." },
    { t: "", d: "Roll it out with training, and decide what is supported from then on." },
  ] },
  dashboards: { title: "How we do it", steps: [
    { t: "", d: "Agree the measures and the decisions they serve." },
    { t: "", d: "Find the data behind each measure, its owner, and its gaps." },
    { t: "", d: "Build the dashboard on a platform the organization already owns, and test it with the people who will use it." },
    { t: "", d: "Document it, and train the staff who will keep it current." },
  ] },
  "tech-strategy": { title: "How we do it", steps: [
    { t: "", d: "Agree the decision this work has to produce, and who makes it." },
    { t: "", d: "Interview leaders and staff, and review the systems, plans, and data already in place." },
    { t: "", d: "Rank the options with leadership, and write the plan or roadmap." },
    { t: "", d: "Set the governance that keeps the plan current: who reviews it, and how new requests come in." },
  ] },
};

/* Asset Management's steps before Nov 12 ("The asset life cycle"), kept for the record: the page now shows How we do it. */
export const ASSET_LIFE_CYCLE = { title: "The asset life cycle", steps: [
    { t: "Inventory", d: "Know what you own and where" }, { t: "Condition", d: "Know what shape it's in" }, { t: "Strategy", d: "Life cycle, risk, and investment decisions" },
    { t: "Delivery", d: "Maintain and replace on plan" }, { t: "Performance", d: "Measure the result and adjust" }] };
