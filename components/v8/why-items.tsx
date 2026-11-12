/* "What sets us apart": the five reasons with the picture each one shows in the glass frame. One list, used by
   the home page's scroll story and by the same row on Who we are (Nicole, Nov 11), so the two never drift apart.
     1 our people (the moving lanes)   2 the numbers   3 a project from our work   4 the hub diagram
     5 the four steps
   people: everyone for the lanes, in the order tvPeople() gives. */
import { AREAS, CASES, NUMBERS, STEPS, WHY, areaHref, caseHref } from "@/lib/content/site";
import { AREAS as AREA_DATA } from "@/lib/content/catalog";
import { themeStyle, casePhoto } from "@/lib/content/v8";
import { CaseNote } from "@/components/site/ui";
import { Diagram } from "@/components/v8/diagram";
import PeopleStrip from "@/components/v8/people-strip";
import type { Person } from "@/components/site/people";
import type { StoryItem } from "@/components/v8/hero-story";

/* the TV in "We've done the job" (Nicole, Nov 10): Scott, the three Pauls, and Alicia first, then the rest of
   the aviation team, the former agency leaders, Nicole and the others; Ron, Koussay, and the admin and design
   roles last. Everyone is in it, so it keeps going. */
export function tvPeople(people: Person[]): Person[] {
  const named = (re: RegExp) => people.filter((p) => re.test(p.name));
  const lead = [...named(/^Scott Rawlins/), ...named(/^Paul Steinman/), ...named(/^Paul Schneider/), ...named(/^Paul Wheeler/), ...named(/^Alicia McConnell/)];
  const aerial = named(/^(Aaron Organ|Jordan Stacy|John Zuleger)/);
  const isLate = (p: Person) => /^(Ron Crew|Koussay Khelil)/.test(p.name) || (!/^Nicole Arakorpi/.test(p.name) && /Admin|Assistant|Account|Finance|Design|Content Creator|Culture/i.test(p.role));
  const taken = new Set([...lead, ...aerial].map((p) => p.slug));
  const rest = people.filter((p) => !taken.has(p.slug));
  return [
    ...lead, ...aerial,
    ...rest.filter((p) => p.formerly && !isLate(p)),
    ...rest.filter((p) => !p.formerly && !isLate(p)),
    ...rest.filter(isLate),
  ];
}

export function whyItems(everyone: Person[], showDev: boolean): StoryItem[] {
  const pdn = CASES.find((c) => c.id === "cs-pdn")!;
  return WHY.map(([h, p], i) => ({
    h, p,
    link: [
      { label: "Meet our people", href: "/about/our-people" },
      { label: "Reach out about your project", href: "/contact" },
      { label: "View featured projects", href: "/insights/case-studies" },
      { label: "See Digital Solutions", href: areaHref(AREAS.find((a) => a.id === "tech")!) },
      { label: "How we work", href: "/about/how-we-work" },
    ][i],
    visual: [
      <PeopleStrip key="team" people={everyone} lanes={4} showDev={showDev} />,
      /* combined experience in place of 2017 (Nicole, Nov 10); it carries a preview-only note until confirmed */
      <div key="nums" className="hs-nums">
        <dl className="nums">{[...NUMBERS.filter((n) => /combined experience/i.test(n.label)), ...NUMBERS.filter((n) => n.verified && !/Established/.test(n.label))].map((n) => (
          <div key={n.label}><dt>{n.label}</dt><dd>{n.value}</dd></div>
        ))}</dl>
      </div>,
      <a key="proof" className="hs-proof" href={caseHref(pdn)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={casePhoto(pdn)} alt="" loading="lazy" />
        <span><em>From our work</em><b>{pdn.title}</b><span>{pdn.who}</span><CaseNote id={pdn.id} /></span>
      </a>,
      <div key="hub" style={themeStyle("tech")}><Diagram kind="hub" steps={AREA_DATA.tech.feature.steps} center="The systems you already own" /></div>,
      <div key="track" style={themeStyle("strategy")}><Diagram kind="track" detail steps={STEPS.map(([t, d]) => ({ t, d }))} /></div>,
    ][i],
    phoneVisual: i === 0 ? <PeopleStrip people={everyone} across showDev={showDev} /> : undefined,
  }));
}
