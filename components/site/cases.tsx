/* Projects (the full library, URL /insights/case-studies): index (filterable)
   and detail pages. The old state pages from the current site now redirect
   (next.config.js), so they no longer have their own pages here. */
import { PAGE_PHOTO } from "@/lib/content/media";
import { casePhoto, themeStyle } from "@/lib/content/v8";
import ProjectCard from "@/components/v8/project-card";
import { AREAS, CASES, VISIBLE_INDUSTRIES, areaHref, caseHref, caseTag, industryHref, serviceById, serviceHref, slugify, type CaseIndex, CASE_STATUS } from "@/lib/content/site";
import { CASES as CASE_DATA, SERVICES as SVC_DATA, SUBSECTORS } from "@/lib/content/catalog";
import CaseFilter, { type CaseRow } from "@/components/site/case-filter";
import { Btn, Chips, Dev, Hero, Sec, Shell, Steps, Talk, CaseNote } from "@/components/site/ui";

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
        lead={<p>Every project, by service and industry. Work underway is marked “In the works,” and our team’s earlier work is marked “Before Rawlins.”</p>}
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

/* A project's own page (Nicole, Nov 10: the pages looked bad and thin). The photo and title; the facts at a
   glance; the challenge in big type; what we did as numbered cards on navy; the results as cards; the services
   it drew on, each with its line and a link; and related projects as full cards. Only content already cleared
   for the site: our records hold more (dates, deliverables, numbers), and each piece needs the client's
   written OK first (the preview-only notes say so). */
const firstSentence = (t?: string) => (t ? (t.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? t) : "");
const Check = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m7.5 12.5 3 3 6-6.5" /></svg>
);

export function CaseDetail({ c }: { c: CaseIndex }) {
  const d = CASE_DATA[c.id];
  const ind = VISIBLE_INDUSTRIES.find((i) => i.id === c.industry);
  const subs = (d?.subsectors ?? []).map((id) => {
    const s = SUBSECTORS[id];
    const parent = s && VISIBLE_INDUSTRIES.find((i) => i.id === s.industry);
    const sub = parent?.subsectors.find((x) => x.id === id);
    return parent && sub ? { label: sub.name, href: `${industryHref(parent)}/${sub.slug}` } : null;
  }).filter(Boolean) as { label: string; href: string }[];
  /* the services: the project's own curated list (the record's longer list includes disciplines the work
     covered, like right of way staff training, which aren't services we delivered on it) */
  const svcIds = c.services.filter((id) => serviceById(id));
  const areaIds = Array.from(new Set(svcIds.map(areaOfService).filter(Boolean) as string[]));
  const related = CASES.filter((x) => x.id !== c.id && x.status !== "Before Rawlins" && x.services.some((s) => c.services.includes(s))).slice(0, 3);
  /* earlier work: the client line already says whose work it was */
  const lead = c.status === "Before Rawlins" ? c.who : `${c.who} · ${c.status}`;
  const [client, ...whoNote] = c.who.split(" · ");
  const facts = [
    { k: "Client", v: client },
    { k: "Status", v: caseTag(c) + (whoNote.length ? ` · ${whoNote.join(" · ").replace(/^Our (team|founder)'s work before Rawlins,?\s*/i, "").replace(/^./, (x) => x.toUpperCase())}` : "") },
    ...(c.states.length ? [{ k: c.states.length > 1 ? "States" : "State", v: c.states.join(", ") }] : []),
    ...(ind ? [{ k: "Industry", v: ind.name }] : []),
  ].map((f) => ({ ...f, v: f.v.replace(/ · $/, "") }));
  return (
    <Shell scene={sceneFor(c)} photo={casePhoto(c)}>
      <Hero crumbs={[["/insights", "Insights"], ["/insights/case-studies", "Projects"], [caseHref(c), c.title]]}
        kicker={caseTag(c)} title={c.title}
        lead={<><p>{lead}</p><CaseNote id={c.id} block /></>}
        actions={<><Btn href="/contact" primary>Talk to the team</Btn><Btn href="/insights/case-studies">See all projects</Btn></>} />

      <section data-nofill className="pj-glance" aria-label="At a glance">
        <div className="pg-wrap">
          <dl className="pj-facts">{facts.map((f) => <div key={f.k}><dt>{f.k}</dt><dd>{f.v}</dd></div>)}</dl>
          {areaIds.length > 0 && (
            <div className="pj-areas"><span>Where it fits</span>
              <ul>{areaIds.map((id) => { const a = AREAS.find((x) => x.id === id)!; return <li key={id} style={themeStyle(id)}><a href={areaHref(a)}>{a.name}</a></li>; })}</ul>
            </div>
          )}
          <Dev block>Our records have more on this project (dates, deliverables, results). Each piece needs the client&apos;s written OK before it goes on the site.</Dev>
        </div>
      </section>

      {d?.ch ? (
        <section data-nofill className="pj-sec pj-ch">
          <div className="pg-wrap pj-split"><h2 className="pj-h">The challenge</h2><p className="pj-ch-text">{d.ch}</p></div>
        </section>
      ) : null}

      {d?.did?.length ? (
        <section data-nofill className="pj-sec pj-did">
          <div className="pg-wrap">
            <h2 className="pj-h">What we did</h2>
            <ol className="pj-did-list">{d.did.map((x, i) => <li key={x}><span className="pj-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span><p>{x}</p></li>)}</ol>
            {d.tools?.length ? <div className="pj-tools"><span>Tools</span><ul>{d.tools.map((t) => <li key={t}>{t}</li>)}</ul></div> : null}
          </div>
        </section>
      ) : null}

      {d?.figure ? <Sec title={d.figure.title} intro={d.figure.intro ? <p>{d.figure.intro}</p> : undefined}><Steps steps={d.figure.steps} compact /></Sec> : null}

      {d?.res?.length ? (
        <section data-nofill className="pj-sec pj-res">
          <div className="pg-wrap">
            <h2 className="pj-h">Results</h2>
            <ul className="pj-res-list">{d.res.map((r) => <li key={r}><Check /><p>{r}</p></li>)}</ul>
          </div>
        </section>
      ) : null}

      {svcIds.length > 0 && (
        <section data-nofill className="pj-sec pj-svcs-sec">
          <div className="pg-wrap">
            <h2 className="pj-h">Services on this project</h2>
            <ul className="pj-svcs">
              {svcIds.map((id) => {
                const h = serviceById(id)!;
                const blurb = firstSentence(SVC_DATA[id]?.intro);
                return (
                  <li key={id} style={themeStyle(h.area.id)}>
                    <a href={serviceHref(id)}><span className="pj-svc-area">{h.area.name}</span><b>{h.service.name}</b>{blurb && <p>{blurb}</p>}<span className="pj-more">See the service</span></a>
                  </li>
                );
              })}
            </ul>
            {(ind || subs.length > 0) && <div className="pj-ind"><span>Industry</span><Chips items={[...(ind ? [{ label: ind.name, href: industryHref(ind) }] : []), ...subs]} /></div>}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section data-nofill className="pj-sec pj-rel">
          <div className="pg-wrap">
            <div className="h-row-head"><h2 className="pj-h">Related projects</h2><a className="v8-link" href="/insights/case-studies">All projects</a></div>
            <ul className="sv-cases">{related.map((r) => <ProjectCard key={r.id} c={r} />)}</ul>
          </div>
        </section>
      )}
      <Talk />
    </Shell>
  );
}
