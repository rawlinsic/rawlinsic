/* Projects (the full library, URL /insights/case-studies): index (filterable)
   and detail pages. The old state pages from the current site now redirect
   (next.config.js), so they no longer have their own pages here. */
import { PAGE_PHOTO } from "@/lib/content/media";
import { casePhoto } from "@/lib/content/v8";
import { AREAS, CASES, VISIBLE_INDUSTRIES, caseHref, caseTag, industryHref, serviceById, slugify, type CaseIndex, CASE_STATUS } from "@/lib/content/site";
import { CASES as CASE_DATA, SUBSECTORS } from "@/lib/content/catalog";
import CaseFilter, { type CaseRow } from "@/components/site/case-filter";
import { Btn, CaseCards, Chips, Hero, List, Sec, ServiceChips, Shell, Steps, Talk, CaseNote } from "@/components/site/ui";

const areaOfService = (id: string) => serviceById(id)?.area.id;
const sceneFor = (c: CaseIndex) => {
  const first = c.services.map((id) => serviceById(id)).find(Boolean);
  return first?.service.scene ?? first?.area.scene ?? "interchange";
};

export function CaseIndexPage() {
  const rows: CaseRow[] = CASES.map((c) => ({
    id: c.id, href: caseHref(c), photo: casePhoto(c), title: c.title, who: c.who, status: c.status, tag: caseTag(c), note: process.env.VERCEL_ENV === "production" ? undefined : CASE_STATUS[c.id],
    areas: Array.from(new Set(c.services.map(areaOfService).filter(Boolean) as string[])).map((id) => AREAS.find((a) => a.id === id)!.slug),
    services: c.services.map((id) => serviceById(id)?.service.slug).filter(Boolean) as string[],
    industries: [c.industry, CASE_DATA[c.id]?.industry2].filter(Boolean).map((id) => VISIBLE_INDUSTRIES.find((i) => i.id === id)?.slug).filter(Boolean) as string[],
    states: c.states.map(slugify),
  }));
  const states = Array.from(new Set(CASES.flatMap((c) => c.states))).sort();
  return (
    <Shell scene="map" photo={PAGE_PHOTO.cases}>
      <Hero crumbs={[["/insights", "Insights"], ["/insights/case-studies", "Projects"]]} kicker="Our work" title="Projects"
        lead={<p>Every project, by service, industry, and state. Work underway is marked “In the works,” and our team’s earlier work is marked “Before Rawlins.”</p>}
        actions={<Btn href="/contact" primary>Get in touch</Btn>} />
      <Sec title="Browse the work">
        <CaseFilter rows={rows}
          areas={AREAS.map((a) => ({ value: a.slug, label: a.name }))}
          industries={VISIBLE_INDUSTRIES.map((i) => ({ value: i.slug, label: i.name }))}
          states={states.map((s) => ({ value: slugify(s), label: s }))}
          services={AREAS.flatMap((a) => a.services.map((s) => ({ value: s.slug, label: s.name })))} />
      </Sec>
      <Talk />
    </Shell>
  );
}

export function CaseDetail({ c }: { c: CaseIndex }) {
  const d = CASE_DATA[c.id];
  const ind = VISIBLE_INDUSTRIES.find((i) => i.id === c.industry);
  const subs = (d?.subsectors ?? []).map((id) => {
    const s = SUBSECTORS[id];
    const parent = s && VISIBLE_INDUSTRIES.find((i) => i.id === s.industry);
    const sub = parent?.subsectors.find((x) => x.id === id);
    return parent && sub ? { label: sub.name, href: `${industryHref(parent)}/${sub.slug}` } : null;
  }).filter(Boolean) as { label: string; href: string }[];
  const stateLinks = c.states.map((s) => ({ label: s, href: `/insights/case-studies?state=${slugify(s)}` }));
  const related = CASES.filter((x) => x.id !== c.id && x.services.some((s) => c.services.includes(s))).slice(0, 3);
  /* earlier work: the client line already says whose work it was */
  const lead = c.status === "Before Rawlins" ? c.who : `${c.who} · ${c.status}`;
  /* the case's own photo (same as its card), so the page never shows a different place than the work */
  return (
    <Shell scene={sceneFor(c)} photo={casePhoto(c)}>
      <Hero crumbs={[["/insights", "Insights"], ["/insights/case-studies", "Projects"], [caseHref(c), c.title]]}
        kicker={caseTag(c)} title={c.title}
        lead={<><p>{lead}</p><CaseNote id={c.id} block /></>} actions={<Btn href="/contact" primary>Talk to the team</Btn>} />
      <Sec title="The challenge"><div className="pg-prose"><p>{d?.ch}</p></div></Sec>
      <Sec title="What we did" tone="panel">
        <List items={d?.did ?? []} />
        {d?.tools?.length ? <p style={{ marginTop: 16 }}><b>Tools:</b> {d.tools.join(", ")}</p> : null}
      </Sec>
      {d?.figure ? <Sec title={d.figure.title} intro={d.figure.intro ? <p>{d.figure.intro}</p> : undefined}><Steps steps={d.figure.steps} compact /></Sec> : null}
      {d?.res?.length ? <Sec title="Results" tone={d?.figure ? "panel" : undefined}><List items={d.res} /></Sec> : null}
      <Sec title="Services and industry" tone={!!d?.res?.length !== !!d?.figure ? "panel" : undefined}>
        <ServiceChips ids={c.services} />
        <div style={{ marginTop: 12 }}><Chips items={[...(ind ? [{ label: ind.name, href: industryHref(ind) }] : []), ...subs, ...stateLinks]} /></div>
      </Sec>
      {related.length > 0 && <Sec title="Related work"><CaseCards cases={related} /></Sec>}
      <Talk />
    </Shell>
  );
}
