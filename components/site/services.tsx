/* Services: overview, the five heading pages, and every service page.
   Content: lib/content/catalog.ts (v11 + v12). Structure: handoff v7 section 3. */
import { allPeople } from "@/components/site/more";
import AutomationIntegrationInteractive from "@/components/automation-integration-interactive";
import { AREA_PHOTO, AREA_PHOTO_POS, PAGE_PHOTO, SERVICE_PHOTO } from "@/lib/content/media";
import TilesTour from "@/components/v8/tiles-tour";
import AutomationEcosystemBars from "@/components/automation-ecosystem-bars";
import { AREAS, CASES, INDUSTRIES, VISIBLE_INDUSTRIES, areaHref, caseById, caseHref, industryHref, serviceById, serviceHref, subsectorHref, type Area, isListed } from "@/lib/content/site";
import { AREAS as AREA_DATA, SERVICES, SUBSECTORS } from "@/lib/content/catalog";
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

const svgI = (d: string) => <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>;
/* icons for the advanced air mobility services, in the order of AAM_SERVICES */
const AAM_ICON = [
  "M4 19l5-14 6 9 5-6M4 19h16", // statewide studies and roadmaps
  "M12 21s-6-5.5-6-10a6 6 0 0 1 12 0c0 4.5-6 10-6 10zM12 11m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0", // local siting
  "M4 20h16M7 16v-5M12 16V8M17 16v-8", // economic and environmental impact
  "M6 3h9l3 3v15H6zM9 10h6M9 14h6M9 18h4", // policy and regulatory tracking
  "M4 7h16v12H4zM4 7l8 6 8-6", // solicitations and grants
  "M3 12h4l3-7 4 14 3-7h4", // manufacturer and market tracking
];
/* Inside a project delivery network (Preconstruction): each piece with a simple line icon */
const ic = (d: string) => <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>;
const NETWORK: [string, ReturnType<typeof ic>][] = [
  /* Nov 13 (Nicole's Program & Project Delivery file, v7): two new lines first */
  ["Five steps, from concept study to plans, specifications, and estimate", ic("M3 19h4v-4h4v-4h4V7h4V3")],
  ["Activities for 17 disciplines, each with its deliverables and responsible parties", ic("M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z")],
  ["Tools, templates, and workflows for every phase", ic("M4 5h7v6H4zM13 5h7v6h-7zM4 13h7v6H4zM13 16h7M16.5 13v6")],
  ["Project management plans and commitment tracking", ic("M9 6h11M9 12h11M9 18h11M4 6l1.2 1.2L7 5M4 12l1.2 1.2L7 11M4 18l1.2 1.2L7 17")],
  ["Risk registers and risk training", ic("M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6zM12 8v5M12 16v.5")],
  ["Online courses and a delivery website staff actually use", ic("M3 5h18v11H3zM8 20h8M12 16v4M10 8.5v4l3.5-2z")],
];

/* ── Overview ── */
export function ServicesIndex() {
  return (
    <Shell>
      {/* Nov 13 (Nicole): the photo top is off. The What we do heading is the top now, styled like the Insights page: the blue
          eyebrow above, the headline with its last words glowing, and the line from the old top in gray under it. Then the five
          areas pop out one by one as you scroll (moved here from home, Nov 10). The same words as home's What we do. */}
      <section className="tt-head is-top" data-nofill aria-labelledby="tt-head-h">
        <div className="ed-wrap fan-head">
          <nav className="pg-crumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><span aria-current="page">What We Do</span></li></ol></nav>
          <p className="v8-eyebrow">What we do</p>
          <h1 id="tt-head-h" className="fan-h is-wide">Many engagements draw on <span className="hl-glow">more than one area.</span></h1>
          <p className="tt-lead">We help organizations plan and deliver their programs, run and modernize what they own and the systems behind it, and strengthen the teams that do the work.</p>
        </div>
      </section>
      <TilesTour label="What we do" hideLabel areas={AREAS.map((a) => ({
        id: a.id, name: a.name, tag: a.tag, lead: AREA_DATA[a.id]?.lead ?? "", href: areaHref(a), photo: AREA_PHOTO[a.id], pos: AREA_PHOTO_POS[a.id],
        services: a.services.filter((sv) => isListed(sv.id)).map((sv) => ({ name: sv.name, href: `/services/${a.slug}/${sv.slug}` })),
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
  /* Nov 13 (Nicole): "Making systems connect" is off the page, and What we deliver moved above What we build
     (app/services/[slug]/page.tsx); the applied solutions graphic and the four panels stay here */
  return (
    <>
      <section className="pg-sec pg-sec-navy pg-legacy">
        {/* Nicole, Nov 11: this eyebrow, title, and line, shown without an expand arrow. The seven examples carry no
            preview notes anywhere (Nicole, Nov 11: we're using them). */}
        <AutomationIntegrationInteractive embedded openIntro eyebrow="Smarter systems, streamlined workflows" title="Applied solutions"
          intro={<p className="section-text">The graphic below showcases applied solutions in practice. Tap an icon to see the challenge, what we built, and the result.</p>} />
      </section>
      <section className="pg-sec pg-sec-navy pg-legacy"><AutomationEcosystemBars /></section>
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
        <Chips items={s.industries.map((i) => INDUSTRIES.find((x) => x.id === i)).filter((x) => x && !x.apart).map((x) => ({ label: x!.name, href: industryHref(x!) }))} />
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
      /* the "Applied solutions" list under the graphic came off (Nicole, Nov 13: "remove the applied solutions duplicated
         section"); the graphic's seven examples say the same */
      return (
        <section className="pg-sec pg-sec-navy pg-legacy">
          <AutomationIntegrationInteractive embedded eyebrow="Applied solutions" title="From our team's work" intro="Seven examples, including how we rebuilt consultant contracting at a state DOT, step by step. The first is Rawlins work. The others are from our automation team's work before Rawlins." />
        </section>
      );
    case "data-governance":
      return <section className="pg-sec pg-sec-navy pg-legacy"><AutomationEcosystemBars /></section>;
    case "ai":
      /* the "Applied solutions" list came off this page only (Digital Solutions file v5, Nov 13): none of the seven lists AI */
      return <section className="pg-sec pg-sec-navy pg-legacy"><AutomationEcosystemBars /></section>;
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
      /* M&O file v10 (Nov 13): four parts, one for each service under Asset Management, in menu order; each title opens its page */
      const parts: [string, string, string[], string][] = [
        ["Maintenance quality assurance", "Condition standards, rating procedures, and a handbook staff and contractors work from.", ["cs-mqa-fleet", "cs-txmaint", "cs-pbmc"], "mqa"],
        ["Maintenance outsourcing", "Which work to keep in-house, which to contract, and which to combine.", ["cs-maint-model", "cs-pbmc", "cs-nv-om"], "outsourcing"],
        ["Performance-based maintenance contracting", "Contracts that pay for a defined condition: specifications, deduction methods, and administration.", ["cs-pbmc", "cs-txmaint", "cs-pbmc2"], "pbmc"],
        ["Fleet and facilities", "How equipment is chosen, shared, maintained, and replaced, and what the buildings need.", ["cs-nv-fleet-program", "cs-tn-amdiv", "cs-mqa-fleet"], "fleet"],
      ];
      /* redesigned Nov 11 (Nicole: "make that more clear"): the kinds of work this service covers (three since Nov 12), each with
         what it means and the projects where we've done it */
      return (
        <div className="cov">
          <div className="v8-wrap">
            <div className="cov-head"><p className="v8-eyebrow">What this covers</p><h2 className="v8-h2">Four services under asset management, and where we&apos;ve done each</h2></div>
            <ol className="cov-grid">
              {parts.map(([t, d, ids, sid], i) => (
                <li key={t}>
                  <div className="cov-top"><span className="cov-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span><h3><a href={serviceHref(sid)}>{t}</a><LineNote text={t} /></h3><p>{d}</p></div>
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
      /* Inside a delivery website (redesigned Nov 11): the five parts drawn as the site itself, in a browser window */
      return (
        <div className="dw">
          <div className="v8-wrap dw-in">
            <div className="dw-head"><p className="v8-eyebrow">From our work</p><h2 className="v8-h2">Inside a delivery website</h2></div>
            <div className="dw-win" role="list">
              <div className="dw-bar" aria-hidden="true"><i /><i /><i /><span>Project delivery website</span></div>
              <div className="dw-grid">
                <div className="dw-part dw-land" role="listitem"><b>01</b><p>A landing page with the program&apos;s tools, resource library, manuals, and training one click away</p></div>
                <div className="dw-part dw-links" role="listitem"><b>02</b><p>Links to the systems staff already use: scheduling, status reporting, and dashboards</p><span className="dw-chips" aria-hidden="true"><i>Scheduling</i><i>Status</i><i>Dashboards</i></span></div>
                <div className="dw-part dw-form" role="listitem"><b>03</b><p>A change request form tied to a tracker, with automatic routing to reviewers and decision makers</p><span className="dw-flow" aria-hidden="true"><i>Form</i><em /><i>Review</i><em /><i>Decision</i></span></div>
                <div className="dw-part dw-mail" role="listitem"><b>04</b><p>Email at each step, from submission through quality check and close-out</p></div>
                <div className="dw-part dw-video" role="listitem"><b>05</b><p>How-to videos and online courses published next to the tools they teach</p><span className="dw-play" aria-hidden="true" /></div>
              </div>
            </div>
          </div>
        </div>
      );
    case "training-video": {
      const f = SERVICE_STEPS[id];
      return <Sec title={f.title} kicker={f.kicker}><Steps steps={f.steps} /></Sec>;
    }
    case "drone-aam":
      return (
        <>
          <NextLayer />
          {/* redesigned Nov 11 (Nicole: "needs better design") */}
          <div className="aams">
            <div className="v8-wrap">
              <div className="aams-head"><p className="v8-eyebrow">What we offer</p><h2 className="v8-h2">Advanced air mobility services</h2></div>
              <ul className="aams-grid">
                {AAM_SERVICES.map((t, i) => <li key={t}><span className="aams-ic">{svgI(AAM_ICON[i] ?? AAM_ICON[0])}</span><b>{t}</b></li>)}
              </ul>
            </div>
          </div>
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
