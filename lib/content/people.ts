/* People lines shared by Our people and every people card on the site.
   AVIATION_TEAM and AVIATION_ROLES used to live in components/site/services.tsx
   (it still re-exports them). They sit here so the people cards
   (components/site/ui.tsx) can read the former roles without an import loop. */
import { LEADERS } from "@/lib/content/site";
import { INDUSTRIES as IND_DATA } from "@/lib/content/catalog";

/* Our aviation team (bios on Our People) */
export const AVIATION_TEAM: string[][] = [
  ["Alicia McConnell, P.E.", "Has led drone programs since 2018, including a nationwide pilot network"],
  ["Paul Wheeler", "Wrote first-of-their-kind guidance manuals on drones and advanced air mobility"],
  ["Aaron Organ", "Airport operations and pilot training; built aviation curricula"],
  ["Jordan Stacy", "Commercial airport operations and aircraft rescue and firefighting"],
  ["John Zuleger, P.E.", "Drone and rope-access bridge inspection"],
];

/* Our aviation team, by role (Jacob's drone document, "Team Structure (roles, not names)").
   Names and bios stay on Our People. Shown first, then the people (full site pass, Part 4, 2). */
export const AVIATION_ROLES: [string, string][] = [
  ["Advanced air mobility and program strategy", "Statewide advanced air mobility studies and roadmaps, state program development, and research and standards work"],
  ["Drone programs and policy", "Program setup, policies, standard operating procedures, checklists, onboarding, training, and agency structure"],
  ["Program data and decision tools", "Training, including animated online courses, and custom decision tools for aviation programs"],
  ["Environmental and impact studies", "Environmental and economic impact studies, including for vertiport and charging sites"],
  ["State program leads", "Standing up a state aeronautics division, and support for state drone programs"],
  ["Grants and funding", "Finding, writing, and in some cases issuing grants for state agencies"],
];

/* A person's former agency role: lines that start "Former", from the leaders
   list, each industry's people list, and the aviation team (the list Our
   people uses). Keyed by the name before the first comma, without nicknames. */
export const bareName = (n: string) => n.split(",")[0].replace(/\s*\(.*?\)\s*/g, " ").trim().toLowerCase();
export const FORMERLY: Record<string, string> = (() => {
  const out: Record<string, string> = {};
  const add = (name: string, line: string) => {
    const l = line.replace(/^Founder\.\s*/, "");
    if (/^Former/.test(l) && !out[bareName(name)]) out[bareName(name)] = l;
  };
  LEADERS.forEach((l) => add(l.name, l.role));
  Object.values(IND_DATA).forEach((i) => i.people.forEach(([n, l]) => add(n, l)));
  AVIATION_TEAM.forEach(([n, l]) => add(n, l));
  return out;
})();
export const formerlyFor = (name: string) => FORMERLY[bareName(name)];
