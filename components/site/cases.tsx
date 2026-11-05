/* Case studies: index (filterable), detail pages, and the existing state
   pages (all their current content kept, results included). */
import { CASE_STUDIES, type CaseStudy } from "@/components/case-studies-data";
import { PAGE_PHOTO, SERVICE_PHOTO } from "@/lib/content/media";
import { AREAS, CASES, VISIBLE_INDUSTRIES, caseHref, caseWho, industryHref, serviceById, slugify, type CaseIndex } from "@/lib/content/site";
import { CASES as CASE_DATA, SUBSECTORS } from "@/lib/content/catalog";
import CaseFilter, { type CaseRow } from "@/components/site/case-filter";
import { Btn, CaseCards, Chips, Dev, Hero, List, PROD, Sec, ServiceChips, Shell, Talk } from "@/components/site/ui";

const areaOfService = (id: string) => serviceById(id)?.area.id;
const sceneFor = (c: CaseIndex) => {
  const first = c.services.map((id) => serviceById(id)).find(Boolean);
  return first?.service.scene ?? first?.area.scene ?? "interchange";
};

export function CaseIndexPage() {
  const rows: CaseRow[] = CASES.map((c) => ({
    id: c.id, href: caseHref(c), title: c.title, who: caseWho(c, PROD), status: c.status,
    areas: Array.from(new Set(c.services.map(areaOfService).filter(Boolean) as string[])).map((id) => AREAS.find((a) => a.id === id)!.slug),
    services: c.services.map((id) => serviceById(id)?.service.slug).filter(Boolean) as string[],
    industries: [c.industry, CASE_DATA[c.id]?.industry2].filter(Boolean).map((id) => VISIBLE_INDUSTRIES.find((i) => i.id === id)?.slug).filter(Boolean) as string[],
    states: PROD && c.needsSignoff ? [] : c.states.map(slugify),
    dev: c.needsSignoff && !PROD ? `Needs sign-off · shows as “${c.generic}” on launch` : undefined,
  }));
  const states = Array.from(new Set(CASES.filter((c) => !PROD || !c.needsSignoff).flatMap((c) => c.states))).sort();
  return (
    <Shell scene="map" photo={PAGE_PHOTO.cases}>
      <Hero crumbs={[["/insights", "Insights"], ["/insights/case-studies", "Case studies"]]} kicker="Our work" title="Case studies"
        lead={<p>Work from across the country, by service, industry, and state. Ongoing work is marked “In the works.”</p>}
        actions={<Btn href="/contact" primary>Get in touch</Btn>} />
      <Sec title="Browse the work">
        <CaseFilter rows={rows}
          areas={AREAS.map((a) => ({ value: a.slug, label: a.name }))}
          industries={VISIBLE_INDUSTRIES.map((i) => ({ value: i.slug, label: i.name }))}
          states={states.map((s) => ({ value: slugify(s), label: s }))}
          services={AREAS.flatMap((a) => a.services.map((s) => ({ value: s.slug, label: s.name })))} />
      </Sec>
      <Sec title="By state, from our current site" tone="panel" intro={<p>Our original case study pages, by state and project.</p>}>
        <ul className="pg-cards">
          {CASE_STUDIES.map((s) => (
            <li key={s.slug}><a href={`/insights/case-studies/${s.slug}`} className="pg-card pg-card-link"><b>{s.title}</b>{s.subtitle && <span>{s.subtitle}</span>}</a></li>
          ))}
        </ul>
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
  const stateLinks = PROD && c.needsSignoff ? [] : c.states.map((s) => ({ label: s, href: `/insights/case-studies?state=${slugify(s)}` }));
  const related = CASES.filter((x) => x.id !== c.id && x.services.some((s) => c.services.includes(s))).slice(0, 3);
  return (
    <Shell scene={sceneFor(c)} photo={SERVICE_PHOTO[c.services[0]] ?? PAGE_PHOTO.cases}>
      <Hero crumbs={[["/insights", "Insights"], ["/insights/case-studies", "Case studies"], [caseHref(c), c.title]]}
        kicker={c.status === "Ongoing" ? "In the works" : "Case study"} title={c.title}
        lead={<p>{caseWho(c, PROD)} · {c.status}</p>} actions={<Btn href="/contact" primary>Talk to the team</Btn>}>
        {c.needsSignoff && !PROD && <Dev>Needs client sign-off. On launch this page shows “{c.generic}” instead of the client name.</Dev>}
      </Hero>
      <Sec title="The challenge"><div className="pg-prose"><p>{d?.ch}</p></div></Sec>
      <Sec title="What we did" tone="panel"><List items={d?.did ?? []} /></Sec>
      {d?.res?.length ? <Sec title="Results"><List items={d.res} /></Sec> : null}
      <Sec title="Services and industry" tone={d?.res?.length ? "panel" : undefined}>
        <ServiceChips ids={c.services} />
        <div style={{ marginTop: 12 }}><Chips items={[...(ind ? [{ label: ind.name, href: industryHref(ind) }] : []), ...subs, ...stateLinks]} /></div>
      </Sec>
      {related.length > 0 && <Sec title="Related work"><CaseCards cases={related} /></Sec>}
      <Talk />
    </Shell>
  );
}

/* State pages from the current site: every word kept, in the new design */
const STATE_NAME: Record<string, string[]> = {
  delaware: ["Delaware"], louisiana: ["Louisiana"], michigan: ["Michigan"], nevada: ["Nevada"], "north-carolina": ["North Carolina"],
  tennessee: ["Tennessee"], utah: ["Utah"], virginia: ["Virginia"], "major-transportation-infrastructure": ["Iowa", "Illinois", "Missouri", "Minnesota"], "other-states-major-projects": [],
};
export function StateCasePage({ slug }: { slug: string }) {
  const s = CASE_STUDIES.find((x) => x.slug === slug) as CaseStudy;
  const names = STATE_NAME[slug] ?? [];
  const more = CASES.filter((c) => c.states.some((st) => names.includes(st)) && (!PROD || !c.needsSignoff));
  return (
    <Shell scene={slug.includes("major") ? "crossing" : "map"} photo={s.image || s.heroImage}>
      <Hero crumbs={[["/insights", "Insights"], ["/insights/case-studies", "Case studies"], [`/insights/case-studies/${slug}`, s.title]]}
        kicker={s.subtitle ?? "Case study"} title={s.title} lead={<p>{s.description}</p>} actions={<Btn href="/contact" primary>Talk to the team</Btn>} />
      {s.clientInfo && (
        <Sec tone="panel">
          <dl className="pg-facts">
            {s.clientInfo.client && <div><dt>Client</dt><dd>{s.clientInfo.client}</dd></div>}
            {s.clientInfo.location && <div><dt>Location</dt><dd>{s.clientInfo.location}</dd></div>}
            {s.clientInfo.year && <div><dt>Year</dt><dd>{s.clientInfo.year}</dd></div>}
            {s.clientInfo.services && <div><dt>Services</dt><dd>{s.clientInfo.services}</dd></div>}
          </dl>
        </Sec>
      )}
      <Sec title={s.sectionHeading ?? "Key projects"}>
        <div className="pg-projects">
          {s.projects.map((p) => (
            <article key={p.title} className="pg-project">
              <h3 className="pg-h3">{p.title}</h3>
              {p.budget && <p className="pg-case-k">{p.budget}</p>}
              <p>{p.description}</p>
              {p.bullets && <List items={p.bullets} />}
            </article>
          ))}
        </div>
        {s.impactNote && <p className="pg-impact">{s.impactNote}</p>}
      </Sec>
      {more.length > 0 && <Sec title={`More of our work${names.length === 1 ? ` in ${names[0]}` : ""}`} tone="panel"><CaseCards cases={more} /></Sec>}
      <Talk />
    </Shell>
  );
}
export const STATE_SLUGS = CASE_STUDIES.map((s) => s.slug);
