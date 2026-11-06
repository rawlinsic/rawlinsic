/* Step-by-step features on four service pages ("from our work"). One source
   for the words: the old page components and the v8 pages both read these. */
export type FeatureStep = { t: string; d: string };
export const SERVICE_STEPS: Record<string, { title: string; kicker?: string; steps: FeatureStep[] }> = {
  workforce: { title: "What a proficiency path looks like", kicker: "From our work", steps: [
    { t: "Core proficiencies", d: "What every person in the role must show" }, { t: "Electives", d: "Specialties that fit the work unit" },
    { t: "Demonstration", d: "Task sheets scored by a trained reviewer" }, { t: "Review", d: "Supervisor and peer sign-off" }, { t: "Advance", d: "A clear step to the next level" }] },
  "asset-mgmt": { title: "The asset life cycle", steps: [
    { t: "Inventory", d: "Know what you own and where" }, { t: "Condition", d: "Know what shape it's in" }, { t: "Strategy", d: "Life cycle, risk, and investment decisions" },
    { t: "Delivery", d: "Maintain and replace on plan" }, { t: "Performance", d: "Measure the result and adjust" }] },
  "strategic-planning": { title: "How a strategic plan comes together", kicker: "From our work", steps: [
    { t: "Engage", d: "Leadership, staff, and partners shape it" }, { t: "Set direction", d: "Vision, goals, and measures" },
    { t: "Act", d: "Yearly action plans by division" }, { t: "Track", d: "Progress dashboards leadership reviews" }] },
  "training-video": { title: "How a training video comes together", kicker: "From our work", steps: [
    { t: "Storyboard", d: "Who it's for and the one task it teaches" }, { t: "Script", d: "Written with the experts who do the work" }, { t: "Build", d: "Screens, narration, and examples" },
    { t: "Review", d: "Experts and leadership sign off" }, { t: "Publish", d: "On the program's site, next to the tool" }] },
};
