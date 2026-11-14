/* Projects (the full library, URL /insights/case-studies): index (filterable)
   and detail pages. The old state pages from the current site now redirect
   (next.config.js), so they no longer have their own pages here. */
import { PAGE_PHOTO } from "@/lib/content/media";
import { FEATURED_CASES, THEME, casePhoto, themeStyle } from "@/lib/content/v8";
import ProjectCard from "@/components/v8/project-card";
import { EdBtn, EdHero } from "@/components/site/editorial";
import Rail from "@/components/v8/rail";
import { CASE_EXTRA } from "@/lib/content/case-extra";
import { AREAS, CASES, VISIBLE_INDUSTRIES, areaHref, caseAreaIds, caseHref, caseTag, industryHref, serviceById, serviceHref, slugify, type CaseIndex, CASE_STATUS, isListed } from "@/lib/content/site";
import { CASES as CASE_DATA, SERVICES as SVC_DATA, SUBSECTORS } from "@/lib/content/catalog";
import CaseFilter, { type CaseRow } from "@/components/site/case-filter";
import { Btn, Chips, Dev, Hero, Sec, Shell, Steps, Talk, CaseNote, LineNote } from "@/components/site/ui";

const areaOfService = (id: string) => serviceById(id)?.area.id;
const sceneFor = (c: CaseIndex) => {
  const first = c.services.map((id) => serviceById(id)).find(Boolean);
  return first?.service.scene ?? first?.area.scene ?? "interchange";
};

/* the three pictures at the top: the first three finished projects on the home page's featured list (the same three the
   Our Work menu shows) */
const TOP_TRIO = FEATURED_CASES.map((id) => CASES.find((c) => c.id === id)).filter((c): c is CaseIndex => !!c && c.status === "Completed").slice(0, 3);

export function CaseIndexPage() {
  const rows: CaseRow[] = CASES.map((c) => ({
    id: c.id, href: caseHref(c), photo: casePhoto(c), title: c.title, who: c.who, status: c.status, tag: caseTag(c), note: process.env.VERCEL_ENV === "production" ? undefined : CASE_STATUS[c.id],
    areas: caseAreaIds(c).map((id) => AREAS.find((a) => a.id === id)!.slug),
    services: c.services.map((id) => serviceById(id)?.service.slug).filter(Boolean) as string[],
    /* a project also counts under its sector's headline: Transportation Sector under Public Sector, Contractors under Private Sector (Nov 12) */
    /* Nov 13: a project also counts under each Who We Work With page that lists it (the four new pages) */
    industries: Array.from(new Set([c.industry, CASE_DATA[c.id]?.industry2, ...VISIBLE_INDUSTRIES.filter((x) => x.projects.includes(c.id)).map((x) => x.id)].filter(Boolean).flatMap((id) => { const i = VISIBLE_INDUSTRIES.find((x) => x.id === id); const up = i && VISIBLE_INDUSTRIES.find((x) => x.id === i.parent); return [i?.slug, up?.slug]; }).filter(Boolean) as string[])),
    states: c.states.map(slugify),
  }));
  const states = Array.from(new Set(CASES.flatMap((c) => c.states))).sort();
  return (
    <Shell>
      {/* Nov 13 (Nicole): the photo top is off; styled like the Research top, reversed: three of our projects' pictures on the
          left, each opening its project; the words on the right with the title in the glowing blue */}
      <EdHero reverse crumbs={[["/insights", "Insights"], ["/insights/case-studies", "Projects"]]} kicker="Our work" title={<em>Projects</em>}
        lead={<p>Our projects, by service and industry. Work underway is marked “In the works,” and our team’s earlier work is marked “Before Rawlins.”</p>}
        actions={<EdBtn href="/contact">Get in touch</EdBtn>}
        aside={
          <div className="pjx-trio">
            {TOP_TRIO.map((c, k) => (
              <a key={c.id} className={`pjx-ph is-${k + 1}`} href={caseHref(c)} aria-label={c.title}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={casePhoto(c)} alt="" />
                <span>{c.title}</span>
              </a>
            ))}
          </div>
        } />
      {/* "Browse the work" heading off; the filters are dropdowns (Nicole, Nov 13: "this takes up too much space") */}
      <Sec>
        <CaseFilter rows={rows}
          areas={AREAS.map((a) => ({ value: a.slug, label: a.name, color: THEME[a.id]?.color }))}
          industries={VISIBLE_INDUSTRIES.map((i) => ({ value: i.slug, label: i.name }))}
          states={states.map((s) => ({ value: slugify(s), label: s }))}
          services={AREAS.flatMap((a) => a.services.filter((s) => isListed(s.id)).map((s) => ({ value: s.slug, label: s.name })))} />
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

/* What we did in groups: a line starting "## " opens a group with that heading; numbering runs on across groups */
function didGroups(items: { t: string; review: boolean }[]) {
  const out: { h: string; start: number; items: { t: string; review: boolean }[] }[] = [];
  let n = 0;
  for (const it of items) {
    if (it.t.startsWith("## ")) { out.push({ h: it.t.slice(3), start: n, items: [] }); continue; }
    if (!out.length) out.push({ h: "", start: n, items: [] });
    out[out.length - 1].items.push(it); n++;
  }
  return out;
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
  /* the services: the project's own curated list (the record's longer list includes disciplines the work
     covered, like right of way staff training, which aren't services we delivered on it) */
  const svcIds = c.services.filter((id) => serviceById(id) && isListed(id));
  const areaIds = Array.from(new Set(svcIds.map(areaOfService).filter(Boolean) as string[]));
  const related = CASES.filter((x) => x.id !== c.id && x.status !== "Before Rawlins" && x.services.some((s) => c.services.includes(s))).slice(0, 3);
  /* earlier work: the client line already says whose work it was */
  const lead = c.status === "Before Rawlins" ? c.who : `${c.who} · ${c.status}`;
  const [client, ...whoNote] = c.who.split(" · ");
  /* more from our records, kept general (Nicole, Nov 10: generic rather than nothing; flagged for review on
     previews so the client or Scott can remove a line; an emptied line drops out) */
  const x = CASE_EXTRA[c.id] ?? {};
  const xDid = (x.did ?? []).map((t) => t.trim()).filter(Boolean);
  const xRes = (x.res ?? []).map((t) => t.trim()).filter(Boolean);
  /* the project's dates from the projects file (Nov 13) win over the review-only ones from our records */
  const when = d?.when?.trim();
  const anyExtra = !!((!when && x.when?.trim()) || xDid.length || xRes.length);
  /* the automation examples (our automation team's work before Rawlins, live-site Examples 02 to 07) carry no
     preview notes anywhere (Nicole, Nov 11: we're using them), so their pages skip the "Our records have more" note */
  const isExample = c.industry === "private" && c.status === "Before Rawlins";
  const facts = [
    { k: "Client", v: client },
    { k: "Status", v: caseTag(c) + (whoNote.length ? ` · ${whoNote.join(" · ").replace(/^Our (team|founder)'s work before Rawlins,?\s*/i, "").replace(/^./, (x) => x.toUpperCase())}` : "") },
    ...(when ? [{ k: "When", v: when }] : x.when?.trim() ? [{ k: "When", v: x.when.trim(), review: true }] : []),
    ...(c.states.length ? [{ k: c.states.length > 1 ? "States" : "State", v: c.states.join(", ") }] : []),
    ...(ind ? [{ k: "Industry", v: ind.name }] : []),
  ].map((f) => ({ ...f, v: f.v.replace(/ · $/, "") })) as { k: string; v: string; review?: boolean }[];
  return (
    <Shell scene={sceneFor(c)} photo={casePhoto(c)}>
      <Hero crumbs={[["/insights", "Insights"], ["/insights/case-studies", "Projects"], [caseHref(c), c.title]]}
        kicker={caseTag(c)} title={c.title}
        lead={<><p>{lead}</p><CaseNote id={c.id} block /></>}
        actions={<><Btn href="/contact" primary>Talk to the team</Btn><Btn href="/insights/case-studies">See all projects</Btn></>} />

      <section data-nofill className="pj-glance" aria-label="At a glance">
        <div className="pg-wrap">
          <dl className="pj-facts">{facts.map((f) => <div key={f.k}><dt>{f.k}</dt><dd>{f.v}{f.review && <> <Dev>For review</Dev></>}</dd></div>)}</dl>
          {areaIds.length > 0 && (
            <div className="pj-areas"><span>Where it fits</span>
              <ul>{areaIds.map((id) => { const a = AREAS.find((x) => x.id === id)!; return <li key={id} style={themeStyle(id)}><a href={areaHref(a)}>{a.name}</a></li>; })}</ul>
            </div>
          )}
          {anyExtra
            ? <Dev block>For review: lines marked &ldquo;For review&rdquo; come from our records and are kept general, because the client&apos;s contract may limit what we can publish. Remove any that can&apos;t go on the site (empty it with Edit text).</Dev>
            : isExample ? null : <Dev block>Our records have more on this project (dates, deliverables, results). Each piece needs the client&apos;s written OK before it goes on the site.</Dev>}
        </div>
      </section>

      {d?.ch ? (
        <section data-nofill className="pj-sec pj-ch">
          <div className="pg-wrap pj-split"><h2 className="pj-h">The challenge</h2><p className="pj-ch-text">{d.ch}</p></div>
        </section>
      ) : null}

      {d?.did?.length || xDid.length ? (
        <section data-nofill className="pj-sec pj-did">
          <div className="pg-wrap">
            <h2 className="pj-h">What we did</h2>
            {/* Nov 13 (projects file v4): a "## " line is a small heading over the lines under it (page A's five groups), and a
                line in didLinks opens the project page it names (the overview's eight projects) */}
            {didGroups([...(d?.did ?? []).map((t) => ({ t, review: false })), ...xDid.map((t) => ({ t, review: true }))]).map((g, gi) => (
              <div key={gi} className={g.h ? "pj-did-group" : undefined}>
                {g.h && <h3 className="pj-did-h">{g.h}</h3>}
                <ol className="pj-did-list" start={g.start + 1}>
                  {g.items.map((it, i) => {
                    const to = d?.didLinks?.[it.t];
                    const ids = to ? (Array.isArray(to) ? to : [to]) : [];
                    const links = ids.map((id) => CASES.find((x) => x.id === id)).filter((x): x is CaseIndex => !!x);
                    return (
                      <li key={it.t}><span className="pj-n" aria-hidden="true">{String(g.start + i + 1).padStart(2, "0")}</span>
                        <p>{links.length === 1 ? <a href={caseHref(links[0])}>{it.t}</a> : it.t}{links.length > 1 && <>: {links.map((l, k) => <span key={l.id}>{k ? "; " : ""}<a href={caseHref(l)}>{l.title}</a></span>)}</>}<LineNote text={it.t} /></p>
                        {it.review && <Dev>For review</Dev>}</li>
                    );
                  })}
                </ol>
              </div>
            ))}
            {d?.tools?.length ? <div className="pj-tools"><span>Tools</span><ul>{d.tools.map((t) => <li key={t}>{t}</li>)}</ul></div> : null}
          </div>
        </section>
      ) : null}

      {d?.figure ? <Sec title={d.figure.title} intro={d.figure.intro ? <p>{d.figure.intro}</p> : undefined}><Steps steps={d.figure.steps} compact /></Sec> : null}

      {d?.res?.length || xRes.length ? (
        <section data-nofill className="pj-sec pj-res">
          <div className="pg-wrap">
            <h2 className="pj-h">Results</h2>
            <ul className="pj-res-list">
              {[...(d?.res ?? []).map((t) => ({ t, review: false })), ...xRes.map((t) => ({ t, review: true }))].map((it) => (
                <li key={it.t}><Check /><p>{it.t}<LineNote text={it.t} />{it.review && <> <Dev>For review</Dev></>}</p></li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {svcIds.length > 0 && (
        <section data-nofill className="pj-sec pj-svcs-sec">
          <div className="pg-wrap">
            <h2 className="pj-h">Services on this project</h2>
            {/* styled like the service pages' "What this service covers" cards (Nicole, Nov 13): a glowing bar, the number, the
                name, its line */}
            <ul className="pj-svcs is-cards">
              {svcIds.map((id, k) => {
                const h = serviceById(id)!;
                const blurb = firstSentence(SVC_DATA[id]?.intro);
                return (
                  <li key={id} style={themeStyle(h.area.id)}>
                    <a href={serviceHref(id)}><span className="pj-svc-n">{String(k + 1).padStart(2, "0")}</span><b>{h.service.name}</b><span className="pj-svc-area">{h.area.name}</span>{blurb && <p>{blurb}</p>}<span className="pj-more">See the service</span></a>
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
            <Rail label="Related projects">{related.map((r) => <ProjectCard key={r.id} c={r} />)}</Rail>
          </div>
        </section>
      )}
      <Talk />
    </Shell>
  );
}
