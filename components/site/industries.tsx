/* Who we work with: overview, industry pages, sub-sector pages, Private
   Sector (its own plain-language layout), and the hidden International page. */
import { AREAS, CASES, VISIBLE_INDUSTRIES, caseById, industryHref, isOurs, subsectorHref, type CaseIndex, type Industry, type Subsector } from "@/lib/content/site";
import { INDUSTRY_PHOTO, PAGE_PHOTO } from "@/lib/content/media";
import { CASES as CASE_DATA, INDUSTRIES as IND_DATA, PRIV, SERVICES, SUBSECTORS } from "@/lib/content/catalog";
import { AVIATION_TEAM } from "@/components/site/services";
import { Btn, CaseCards, Dev, Hero, List, People, Sec, ServiceChips, Shell, Talk } from "@/components/site/ui";

export function IndustriesIndex() {
  return (
    <Shell scene="interchange" photo={PAGE_PHOTO.industries}>
      <Hero crumbs={[["/industries", "Who we work with"]]} kicker="Who we work with" title="Public agencies and private firms, wherever the work is."
        lead={<p>Most of our work is with organizations that own and run public infrastructure: more than 30 transportation agencies so far, plus local governments and a multi-state research program. We also work with contractors and engineering firms on public projects, and with private firms on their systems and workflows. Our work so far is across the United States, and our team can do it anywhere.</p>}
        actions={<Btn href="/contact" primary>Get in touch</Btn>} />
      <Sec title="Industries">
        <ul className="pg-cards">
          {VISIBLE_INDUSTRIES.map((i) => (
            <li key={i.id}>
              <a href={industryHref(i)} className="pg-card pg-card-link">
                <b>{i.name}</b>
                <span>{i.lead}</span>
                <span className="pg-case-k">{i.who}</span>
              </a>
            </li>
          ))}
        </ul>
      </Sec>
      <Talk />
    </Shell>
  );
}

export function IndustryPage({ ind }: { ind: Industry }) {
  if (ind.id === "private") return <PrivateSector ind={ind} />;
  if (ind.id === "intl") return <International />;
  const d = IND_DATA[ind.id];
  const svcIds = Object.values(SERVICES).filter((s) => s.industries.includes(ind.id)).map((s) => s.id);
  /* Featured projects: Rawlins work only (no Before Rawlins cases). Contractors &
     Engineering Firms shows its own list, in this order (an engineering firm is
     the client on cs-pv-pmo). */
  const cases = (ind.id === "contractors"
    ? CONTRACTOR_CASES.map((id) => caseById(id)).filter(Boolean) as CaseIndex[]
    : [...ind.projects.map((id) => caseById(id)).filter(Boolean) as CaseIndex[], ...CASES.filter((c) => c.industry === ind.id && !ind.projects.includes(c.id))]
  ).filter(isOurs);
  return (
    <Shell scene={ind.scene} photo={INDUSTRY_PHOTO[ind.id]}>
      <Hero crumbs={[["/industries", "Who we work with"], [industryHref(ind), ind.name]]} kicker="Who we work with" title={ind.name}
        lead={<p>{ind.lead}</p>} actions={<><Btn href="/contact" primary>Get in touch</Btn><Btn href="#work">See the work</Btn></>} />
      {d.ch.length > 0 && <Sec title="Challenges we hear"><ul className="pg-hear">{d.ch.map((c) => <li key={c}>{c}</li>)}</ul></Sec>}
      {ind.subsectors.length > 0 && (
        <Sec title={ind.id === "transport" ? "Transportation specialties" : "Specialties"} tone="panel">
          <ul className="pg-cards">
            {ind.subsectors.map((s) => (
              <li key={s.id}>
                <a href={subsectorHref(ind, s)} className="pg-card pg-card-link">
                  <b>{s.name}</b><span>{s.line}</span>
                  {s.thin && <Dev>Placeholder: thin content</Dev>}
                </a>
              </li>
            ))}
          </ul>
        </Sec>
      )}
      <Sec title="How we help" intro={<p>Services we use most here:</p>}>
        <ServiceChips ids={ind.featured} />
        <div style={{ marginTop: 22 }}>
          {AREAS.map((a) => {
            const ids = a.services.map((s) => s.id).filter((id) => svcIds.includes(id) && !ind.featured.includes(id));
            return ids.length ? <div key={a.id} style={{ marginTop: 14 }}><p className="pg-kicker">{a.name}</p><ServiceChips ids={ids} /></div> : null;
          })}
        </div>
      </Sec>
      {d.people.length > 0 && <Sec title="Who you'll work with" tone="panel"><People people={d.people} /></Sec>}
      {cases.length > 0 && <Sec title="Featured projects" id="work"><CaseCards cases={cases} limit={6} /><p style={{ marginTop: 16 }}><a href={`/insights/case-studies?industry=${ind.slug}`}>All {ind.name} projects</a></p></Sec>}
      <Talk />
    </Shell>
  );
}

const CONTRACTOR_CASES = ["cs-major", "cs-db-partnering", "cs-ia-partnering", "cs-partnering", "cs-maint-model", "cs-pv-pmo"];
/* Private Sector: our own project first, then our automation team's work before Rawlins (tagged) */
const PRIVATE_CASES = ["cs-pv-pmo", "cs-pv-capacity", "cs-pv-reporting", "cs-pv-service", "cs-pv-field"];

export function SubsectorPage({ ind, sub }: { ind: Industry; sub: Subsector }) {
  const d = SUBSECTORS[sub.id];
  const list = CASES.filter((c) => CASE_DATA[c.id]?.subsectors.includes(sub.id));
  const aviation = sub.id === "sub-aviation";
  return (
    <Shell scene={sub.scene} photo={INDUSTRY_PHOTO[sub.id]}>
      <Hero crumbs={[["/industries", "Who we work with"], [industryHref(ind), ind.name], [subsectorHref(ind, sub), sub.name]]} kicker={ind.name} title={sub.name}
        lead={<p>{d?.intro || sub.line}</p>} actions={<Btn href="/contact" primary>Talk to an expert</Btn>}>
        {sub.thin && <Dev>Placeholder: only harbors work stands behind this page so far. Build it out.</Dev>}
      </Hero>
      {d?.ch?.length ? <Sec title="What we hear"><ul className="pg-hear">{d.ch.map((c) => <li key={c}>{c}</li>)}</ul></Sec> : null}
      {d?.deliver?.length ? <Sec title="What we deliver" tone="panel"><List items={d.deliver} cols /></Sec> : null}
      {aviation && <Sec title="Your aviation team"><People people={AVIATION_TEAM} /></Sec>}
      {d?.people?.length ? <Sec title="Who you'll work with"><People people={d.people} /></Sec> : null}
      <Sec title="Services behind this" tone={aviation ? "panel" : undefined}><ServiceChips ids={d?.services ?? []} /></Sec>
      {list.length > 0 && <Sec title="Where we've done this" tone="panel"><CaseCards cases={list} /></Sec>}
      <Talk />
    </Shell>
  );
}

function PrivateSector({ ind }: { ind: Industry }) {
  return (
    <Shell scene="office" photo={INDUSTRY_PHOTO.private}>
      <Hero crumbs={[["/industries", "Who we work with"], [industryHref(ind), ind.name]]} kicker="Private sector" title="For growing firms"
        lead={<p>{ind.lead}</p>} actions={<Btn href="/contact" primary>Book a short call</Btn>} />
      <Sec title="Sound familiar?"><ul className="pg-hear">{PRIV.hear.map((h) => <li key={h}>{h}</li>)}</ul></Sec>
      <Sec title="Featured projects" tone="panel" id="work"><CaseCards ids={PRIVATE_CASES} /></Sec>
      <Sec title="Ways to start">
        <ol className="pg-cards">{PRIV.start.map((s, i) => <li key={s}><div className="pg-card"><span className="pg-case-k">{String(i + 1).padStart(2, "0")}</span><b>{s}</b></div></li>)}</ol>
        <Dev block>Ways to start: confirm wording with Ben. Hours and pricing stay internal.</Dev>
      </Sec>
      <Sec title="Services" tone="panel"><ServiceChips ids={["automation", "ai", "data-governance", "dashboards", "tech-strategy", "change-mgmt"]} /></Sec>
      <Sec title="Who you'll work with"><People people={IND_DATA.private.people} /></Sec>
      <Talk title="Tell us where your workflows drag" text="A short call is enough to see whether we can help, and what a small first project would look like." />
    </Shell>
  );
}

/* Hidden until Scott and Andy approve: not linked anywhere, noindex. */
export function International() {
  return (
    <Shell scene="globe" photo={INDUSTRY_PHOTO.intl}>
      <Hero crumbs={[["/industries", "Who we work with"], ["/industries/international", "International"]]} kicker="International" title="Transport agencies everywhere do the same job"
        lead={<p><b>Our work to date is in the United States.</b> A U.S. state department of transportation runs highways, bridges, aviation, and transit for millions of people. That&apos;s the same job a ministry of transport or a national roads authority does, and the lessons carry over.</p>}
        actions={<Btn href="/contact" primary>Get in touch</Btn>}>
        <Dev>Hidden page: not linked, noindex. Needs Scott and Andy&apos;s approval before it goes live.</Dev>
      </Hero>
      <Sec title="What carries over">
        <List cols items={[
          "Transport data governance and readiness for new regulation",
          "AI governance, security, and control frameworks",
          "Organizational transformation for ministries and transport authorities",
          "Drone programs and advanced air mobility planning",
          "Smart mobility and connected systems",
        ]} />
      </Sec>
      <Sec title="How we deliver" tone="panel">
        <List items={[
          "Through Rawlins Global, our registered entity in the Middle East",
          "With members of our team based in Dubai, South Africa, and Canada",
          "With local partners who know the country and its institutions",
          "With a named regional lead as your single point of contact",
        ]} />
      </Sec>
      <Sec title="Services"><ServiceChips ids={["data-governance", "ai", "tech-strategy", "org-design", "change-mgmt", "drone-programs", "drone-aam", "smart-mobility"]} /></Sec>
      <Talk />
    </Shell>
  );
}
