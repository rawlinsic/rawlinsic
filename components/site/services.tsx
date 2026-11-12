/* Services: overview, the five heading pages, and every service page.
   Content: lib/content/catalog.ts (v11 + v12). Structure: handoff v7 section 3. */
import { allPeople } from "@/components/site/more";
import AutomationIntegrationInteractive from "@/components/automation-integration-interactive";
import { AREA_PHOTO, AREA_PHOTO_POS, PAGE_PHOTO, SERVICE_PHOTO } from "@/lib/content/media";
import TilesTour from "@/components/v8/tiles-tour";
import AutomationEcosystemBars from "@/components/automation-ecosystem-bars";
import DeliverStack from "@/components/v8/deliver-stack";
import { AREAS, CASES, INDUSTRIES, VISIBLE_INDUSTRIES, areaHref, caseById, caseHref, industryHref, serviceById, subsectorHref, type Area } from "@/lib/content/site";
import { APPLIED, AREAS as AREA_DATA, SERVICES, SUBSECTORS } from "@/lib/content/catalog";
import { AAM_SERVICES, LIFECYCLE } from "@/components/site/aam-data";
import { SERVICE_STEPS } from "@/lib/content/features";
import { Btn, CaseCards, Chips, Dev, Hero, List, People, Sec, ServiceCards, ServiceChips, Shell, Steps, Talk, rawlinsTitle, rosterFor, CaseNote, LineNote } from "@/components/site/ui";
import { AviationRoles, AviationTeam, BridgingSilos, NextLayer, type TeamCard } from "@/components/site/aviation";
import { AVIATION_ROLES, AVIATION_TEAM, formerlyFor } from "@/lib/content/people";
import { WhereWeLead } from "@/components/site/where-we-lead";
import { casePhoto } from "@/lib/content/v8";
import RouteList from "@/components/v8/route-list";

const firstSentence = (s: string) => (s.match(/^.*?[.!?](\s|$)/)?.[0] ?? s).trim();
const STATUS: Record<string, string> = { ok: "Content ready", warn: "Proven, copy needed", gap: "Needs expert content" };

/* Our aviation team, by name and by role: lib/content/people.ts */
export { AVIATION_ROLES, AVIATION_TEAM };
export const AVIATION_PAGES = ["drone-programs", "drone-aam", "drone-emergency", "research", "aero-division"];
/* the aviation team as portrait cards: Rawlins title and location from the roster, plus a former role */
const personSlug = (name: string) => name.toLowerCase().replace(/[.,]/g, "").replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
export const aviationCards = (): TeamCard[] => AVIATION_TEAM.map(([name]) => {
  const m = rosterFor(name);
  const slug = personSlug(m?.name ?? name);
    return { name, title: m ? rawlinsTitle(m) : "", formerly: formerlyFor(name), photo: m?.photo, location: m?.location, href: `/about/our-people#${slug}`, person: allPeople().find((x) => x.slug === slug) };
});

/* Broad digital proof (handoff 4.12); invoicing example not cleared, left out */
const DIGITAL_PROOF = [
  /* examples 06 and 07 are off the site until confirmed (content updates v4, 6.5); four of the five are from before Rawlins (scrub 3.1) */
  "Five examples of connected workflows: consultant contracting at a state DOT, and four from our automation team's work before Rawlins",
  "A statewide project delivery website, change request system, consultant contracting workflow, estimating tools, and training videos",
  "Repeated project fields filled in once from trusted agency data, and paper forms turned into web apps",
  "A website and wiki migration with every item reviewed: keep, update, combine, move, or retire",
  "Website modernization, procedures, and Power BI dashboards for a state DOT",
  "A tracking dashboard for an advanced air mobility program",
  // TODO(launch): needs the prime's and the client's written OK before launch. Both contracts bar public statements about the work without written consent. (comes from cs-drt)
  "Drone data that checked debris removal quantities, and proved correct when reports disagreed",
  "An accessibility (508) compliance add-in for Microsoft Word",
  "A planned AI pilot for cash-flow modeling",
];

/* Inside a project delivery network (Preconstruction): each piece with a simple line icon */
const ic = (d: string) => <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>;
const NETWORK: [string, ReturnType<typeof ic>][] = [
  ["Tools, templates, and workflows for every phase", ic("M4 5h7v6H4zM13 5h7v6h-7zM4 13h7v6H4zM13 16h7M16.5 13v6")],
  ["Project management plans and commitment tracking", ic("M9 6h11M9 12h11M9 18h11M4 6l1.2 1.2L7 5M4 12l1.2 1.2L7 11M4 18l1.2 1.2L7 17")],
  ["Risk registers and risk training", ic("M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6zM12 8v5M12 16v.5")],
  ["Online courses and a delivery website staff actually use", ic("M3 5h18v11H3zM8 20h8M12 16v4M10 8.5v4l3.5-2z")],
];

/* ── Overview ── */
export function ServicesIndex() {
  return (
    <Shell scene="grid" photo={PAGE_PHOTO.services}>
      <Hero crumbs={[["/services", "Services"]]} kicker="What we do" title="Many engagements draw on more than one area."
        lead={<p>We help organizations plan and deliver their programs, run and modernize what they own and the systems behind it, and strengthen the teams that do the work.</p>}
        actions={<><Btn href="/contact" primary>Get in touch</Btn><Btn href="/insights/case-studies">See our work</Btn></>} />
      {/* the five areas pop out one by one as you scroll (moved here from home, Nicole, Nov 10); the same eyebrow
          and title as home's What we do (Nicole, Nov 11) */}
      <section className="tt-head" data-nofill aria-labelledby="tt-head-h">
        <div className="v8-wrap"><p className="v8-eyebrow">What we do</p><h2 id="tt-head-h" className="v8-h2">From the plan, to the tools people use</h2></div>
      </section>
      <TilesTour label="What we do" hideLabel areas={AREAS.map((a) => ({
        id: a.id, name: a.name, tag: a.tag, lead: AREA_DATA[a.id]?.lead ?? "", href: areaHref(a), photo: AREA_PHOTO[a.id], pos: AREA_PHOTO_POS[a.id],
        services: a.services.map((sv) => ({ name: sv.name, href: `/services/${a.slug}/${sv.slug}` })),
      }))} />
      {/* the area-by-area service cards that repeated the tour are off (Nicole, Nov 11) */}
      <Talk />
    </Shell>
  );
}

/* ── Heading pages ── */
export function AreaPage({ area }: { area: Area }) {
  const L = AREA_DATA[area.id];
  return (
    <Shell scene={area.scene} photo={AREA_PHOTO[area.id]}>
      <Hero crumbs={[["/services", "Services"], [areaHref(area), area.name]]} kicker={area.tag} title={area.name}
        lead={<p>{L.lead}</p>} actions={<><Btn href="/contact" primary>Get in touch</Btn><Btn href="#services">See the services</Btn></>} />
      <Sec title="What we hear"><ul className="pg-hear">{L.hear.map((h) => <li key={h}>{h}</li>)}</ul></Sec>
      <Sec title={L.feature.title} tone="panel"><Steps steps={L.feature.steps} /></Sec>
      {area.id === "tech" && <DigitalShowcase />}
      {area.id === "aviation" && <AviationShowcase />}
      <Sec title="Services" id="services">
        <ServiceCards ids={L.services} blurb={(id) => firstSentence(SERVICES[id]?.intro ?? "")} />
      </Sec>
      <Sec title="Featured projects" tone="panel"><CaseCards ids={L.cases} /></Sec>
      <Talk />
    </Shell>
  );
}

export function DigitalShowcase() {
  return (
    <>
      <Sec title="Making systems connect" kicker="What we build"
        intro={<p>Most of our digital work starts with systems that don&apos;t talk to each other. We connect the platforms, data, and tools an organization already pays for, then automate the busywork and add AI where it helps, with people in the loop.</p>}>
        <List items={DIGITAL_PROOF} cols />
      </Sec>
      <section className="pg-sec pg-sec-navy pg-legacy">
        <AutomationIntegrationInteractive embedded eyebrow="Applied solutions" title="Examples from our team's work" intro="Click an example to step through how it was built. The first is Rawlins work for a state DOT. The others are from our automation team's work before Rawlins." />
      </section>
      <section className="pg-sec pg-sec-navy pg-legacy"><AutomationEcosystemBars /></section>
      <DeliverStack />
    </>
  );
}

export function AviationShowcase() {
  return (
    <>
      <WhereWeLead photo={SERVICE_PHOTO["drone-programs"]} />
      <NextLayer />
      <BridgingSilos />
      {/* roles first, then the people (full site pass, Parts 2 and 4) */}
      <AviationTeam roles={AVIATION_ROLES} people={aviationCards()} />
    </>
  );
}

/* ── Service pages ── */
export function ServicePage({ id }: { id: string }) {
  const hit = serviceById(id)!;
  const s = SERVICES[id];
  const area = hit.area;
  const cases = CASES.filter((c) => c.services.includes(id));
  const subs = Object.values(SUBSECTORS).filter((x) => x.services.includes(id));
  return (
    <Shell scene={hit.service.scene ?? area.scene} photo={SERVICE_PHOTO[id]}>
      <Hero crumbs={[["/services", "Services"], [areaHref(area), area.name], [`/services/${area.slug}/${hit.service.slug}`, s.name]]}
        kicker={area.name} title={s.name} lead={<p>{s.intro}</p>}
        actions={<><Btn href="/contact" primary>Talk to an expert</Btn>{cases.length > 0 && <Btn href="#work">See the work</Btn>}</>}>
        {s.st !== "ok" && <Dev>Content status: {STATUS[s.st]}</Dev>}
      </Hero>
      <Sec title="What we hear">
        {s.quote ? <blockquote className="pg-quote">{s.hear[0]}</blockquote> : <ul className="pg-hear">{s.hear.map((h) => <li key={h}>{h}</li>)}</ul>}
      </Sec>
      <Sec title="What we deliver" tone="panel"><List items={s.deliver} cols /></Sec>
      <ServiceFeature id={id} />
      <Sec title="What you walk away with"><List items={s.walk} /></Sec>
      {s.xp.length > 0 && <Sec title="The experience behind it" tone="panel"><List items={s.xp} /></Sec>}
      <Sec title="Where we do this">
        <Chips items={s.industries.map((i) => INDUSTRIES.find((x) => x.id === i)).filter((x) => x && !x.hidden).map((x) => ({ label: x!.name, href: industryHref(x!) }))} />
        {subs.length > 0 && (
          <div style={{ marginTop: 14 }}>
            <p className="pg-kicker">Sector specialties</p>
            <Chips items={subs.map((x) => { const ind = INDUSTRIES.find((i) => i.id === x.industry)!; const sub = ind.subsectors.find((y) => y.id === x.id); return sub ? { label: x.name, href: subsectorHref(ind, sub) } : null; }).filter(Boolean) as { label: string; href: string }[]} />
          </div>
        )}
      </Sec>
      {cases.length > 0 && (
        <Sec title="Where we've done this" tone="panel" id="work">
          <CaseCards cases={cases} limit={4} />
          {cases.length > 4 && <p style={{ marginTop: 16 }}><a href={`/insights/case-studies?service=${hit.service.slug}`}>See all {cases.length} projects</a></p>}
        </Sec>
      )}
      <Sec title="Related services"><ServiceChips ids={s.related} /></Sec>
      {AVIATION_PAGES.includes(id) && <Sec title="Our aviation team" tone="panel"><AviationRoles roles={AVIATION_ROLES} /><People people={AVIATION_TEAM} /></Sec>}
      <Talk />
    </Shell>
  );
}

/* One page-specific feature per service (wireframe FEAT + KEEP) */
export function ServiceFeature({ id }: { id: string }) {
  switch (id) {
    case "automation":
      return (
        <>
          <section className="pg-sec pg-sec-navy pg-legacy">
            <AutomationIntegrationInteractive embedded eyebrow="Applied solutions" title="From our team's work" intro="Five examples, including how we rebuilt consultant contracting at a state DOT, step by step. The first is Rawlins work. The others are from our automation team's work before Rawlins." />
          </section>
          <Sec title="Applied solutions" intro={<p>Where these came from:</p>}><List items={APPLIED.map((a) => `${a[0]}: ${a[1]}`)} cols /></Sec>
        </>
      );
    case "data-governance":
      return <section className="pg-sec pg-sec-navy pg-legacy"><AutomationEcosystemBars /></section>;
    case "ai":
      return (
        <>
          <section className="pg-sec pg-sec-navy pg-legacy"><AutomationEcosystemBars /></section>
          <Sec title="Applied solutions"><List items={APPLIED.map((a) => `${a[0]}: ${a[1]}`)} cols /></Sec>
        </>
      );
    case "workforce":
    case "asset-mgmt":
    case "strategic-planning": {
      const f = SERVICE_STEPS[id];
      return <Sec title={f.title} kicker={f.kicker}><Steps steps={f.steps} /></Sec>;
    }
    case "row":
      /* individual experience on our team, not Rawlins services (content pass v7, 2.7); redesigned Nov 11 */
      return (
        <div className="xg">
          <div className="v8-wrap">
            <div className="xg-head"><p className="v8-eyebrow">Our team</p><h2 className="v8-h2">Right of way experience on our team</h2></div>
            <ol className="xg-grid">
              {["Acquisition and relocation", "Property management and excess land", "Appraisal and appraiser certification", "Outdoor advertising and junkyard control", "Eminent domain litigation support and mediation", "Local agency right of way projects"].map((t, i) => (
                <li key={t}><span className="xg-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span><b>{t}</b></li>
              ))}
            </ol>
          </div>
        </div>
      );
    case "preconstruction": // moved from Program Delivery (content pass v7, 2.3); redesigned Nov 11
      return (
        <div className="nwk">
          <div className="v8-wrap nwk-in">
            <div className="nwk-head"><p className="v8-eyebrow">From our work</p><h2 className="v8-h2">Inside a project delivery network</h2></div>
            <ul className="nwk-grid">
              {NETWORK.map(([t, icon]) => <li key={t}><span className="nwk-ic" aria-hidden="true">{icon}</span><b>{t}</b></li>)}
            </ul>
          </div>
        </div>
      );
    case "operations": {
      const parts: [string, string, string[]][] = [
        ["Performance-based maintenance", "Contracts that pay for results: specifications, deduction models, and administration", ["cs-txmaint", "cs-pbmc", "cs-maint-model"]],
        ["Quality assurance and ratings", "Handbooks and rating programs decisions can rely on", ["cs-transform", "cs-txmaint"]],
        // Backed by the cs-nv-om operations and maintenance review. Jacob's portfolio lists fleet and facilities as not yet delivered.
        ["Fleet and facilities", "The right equipment, in the right shape, at the right cost", ["cs-nv-om"]],
        // TODO(launch): links cs-drt. needs the prime's and the client's written OK before launch. Both contracts bar public statements about the work without written consent.
        ["Winter operations and emergency readiness", "Plans tested before they're needed, including drone response teams", ["cs-txmaint", "cs-drt"]],
      ];
      /* redesigned Nov 11 (Nicole: "make that more clear"): the four kinds of work this service covers, each with
         what it means and the projects where we've done it */
      return (
        <div className="cov">
          <div className="v8-wrap">
            <div className="cov-head"><p className="v8-eyebrow">What this covers</p><h2 className="v8-h2">Four kinds of maintenance work, and where we&apos;ve done each</h2></div>
            <ol className="cov-grid">
              {parts.map(([t, d, ids], i) => (
                <li key={t}>
                  <div className="cov-top"><span className="cov-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span><h3>{t}<LineNote text={t} /></h3><p>{d}</p></div>
                  <div className="cov-proj">
                    <span className="cov-k">Where we&apos;ve done it</span>
                    <ul>{ids.map((k) => caseById(k)).filter(Boolean).map((c) => (
                      <li key={c!.id}><a href={caseHref(c!)}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={casePhoto(c!)} alt="" loading="lazy" /><span><b>{c!.title}</b><small>{c!.who}</small><CaseNote id={c!.id} /></span></a></li>
                    ))}</ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      );
    }
    case "portals":
      return <Sec title="Inside a delivery website" kicker="From our work"><List items={["A landing page with the program's tools, resource library, manuals, and training one click away", "Links to the systems staff already use: scheduling, status reporting, and dashboards", "A change request form tied to a tracker, with automatic routing to reviewers and decision makers", "Email at each step, from submission through quality check and close-out", "How-to videos and online courses published next to the tools they teach"]} /></Sec>;
    case "training-video": {
      const f = SERVICE_STEPS[id];
      return <Sec title={f.title} kicker={f.kicker}><Steps steps={f.steps} /></Sec>;
    }
    case "drone-aam":
      return (
        <>
          <NextLayer />
          <Sec title="Advanced air mobility services" tone="panel"><List items={AAM_SERVICES} cols /></Sec>
        </>
      );
    case "drone-programs":
      return (
        <Sec title="Program lifecycle">
          <RouteList stops={LIFECYCLE.map((l) => ({ tag: l.tag, t: l.t, extra: <List items={l.items} /> }))} />
        </Sec>
      );
    default:
      return null;
  }
}

export const ALL_SERVICE_PARAMS = AREAS.flatMap((a) => a.services.map((s) => ({ slug: a.slug, service: s.slug })));
export { VISIBLE_INDUSTRIES };
