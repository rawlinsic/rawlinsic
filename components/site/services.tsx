/* Services: overview, the five heading pages, and every service page.
   Content: lib/content/catalog.ts (v11 + v12). Structure: handoff v7 section 3. */
import AutomationIntegrationInteractive from "@/components/automation-integration-interactive";
import { AREA_PHOTO, PAGE_PHOTO, SERVICE_PHOTO } from "@/lib/content/media";
import AutomationEcosystemBars from "@/components/automation-ecosystem-bars";
import WhatWeDeliverPyramid from "@/components/what-we-deliver-pyramid";
import { AREAS, CASES, INDUSTRIES, VISIBLE_INDUSTRIES, areaHref, caseById, caseHref, industryHref, serviceById, subsectorHref, type Area } from "@/lib/content/site";
import { APPLIED, AREAS as AREA_DATA, SERVICES, SUBSECTORS } from "@/lib/content/catalog";
import { AamEcosystem, AamLandscape } from "@/components/site/aam";
import { AAM_SERVICES, DRONE_SERVICES, LIFECYCLE, WHERE_WE_LEAD } from "@/components/site/aam-data";
import { Btn, CaseCards, Chips, Dev, Hero, List, People, PROD, Sec, ServiceCards, ServiceChips, Shell, Steps, Talk } from "@/components/site/ui";

const firstSentence = (s: string) => (s.match(/^.*?[.!?](\s|$)/)?.[0] ?? s).trim();
const STATUS: Record<string, string> = { ok: "Content ready", warn: "Proven, copy needed", gap: "Needs expert content" };

/* Aviation team (bios on Our People) */
export const AVIATION_TEAM: string[][] = [
  ["Alicia McConnell, P.E.", "Has led drone programs since 2018, including a nationwide pilot network"],
  ["Paul Wheeler", "Wrote first-of-their-kind guidance manuals on drones and advanced air mobility"],
  ["Aaron Organ", "Airport operations and pilot training; built aviation curricula"],
  ["Jordan Stacy", "Commercial airport operations and aircraft rescue and firefighting"],
  ["John Zuleger, P.E.", "Drone and rope-access bridge inspection"],
];
const AVIATION_PAGES = ["drone-programs", "drone-aam", "drone-emergency", "research", "aero-division"];

/* Broad digital proof (handoff 4.12); invoicing example not cleared, left out */
const DIGITAL_PROOF = [
  "Seven applied solutions for agencies and growing firms, from consultant contracting at a state DOT to field reporting and sales-to-project handoffs",
  "A statewide project delivery website, change request system, consultant contracting workflow, estimating tools, and training videos",
  "Repeated project fields filled in once from trusted agency data, and paper forms turned into web apps",
  "A website and wiki migration with every item reviewed: keep, update, combine, move, or retire",
  "Website modernization, procedures, and Power BI dashboards for a state DOT",
  "A tracking dashboard for an advanced air mobility program",
  "Drone data validation that settled debris quantities when reports disagreed",
  "An accessibility (508) compliance add-in for Microsoft Word",
  "An AI pilot starting with cash-flow modeling",
];

/* ── Overview ── */
export function ServicesIndex() {
  return (
    <Shell scene="grid" photo={PAGE_PHOTO.services}>
      <Hero crumbs={[["/services", "Services"]]} kicker="What we do" title="Five areas. Most engagements draw on more than one."
        lead={<p>We help organizations plan, deliver, run, and modernize the infrastructure they own, and the organizations behind it.</p>}
        actions={<><Btn href="/contact" primary>Get in touch</Btn><Btn href="/insights/case-studies">See our work</Btn></>} />
      {AREAS.map((a, i) => (
        <Sec key={a.id} title={a.name} kicker={a.tag} tone={i % 2 ? "panel" : undefined}
          intro={<p>{AREA_DATA[a.id].lead} <a href={areaHref(a)}>More about {a.name}</a></p>}>
          <ServiceCards ids={a.services.map((s) => s.id)} blurb={(id) => firstSentence(SERVICES[id]?.intro ?? "")} />
        </Sec>
      ))}
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
      <Sec title="Featured work" tone="panel"><CaseCards ids={L.cases} /></Sec>
      <Talk />
    </Shell>
  );
}

function DigitalShowcase() {
  return (
    <>
      <Sec title="Making systems connect" kicker="What we build"
        intro={<p>Most of our digital work starts with systems that don&apos;t talk to each other. We connect the platforms, data, and tools an organization already pays for, then automate the busywork and add AI where it helps, with people in the loop.</p>}>
        <List items={DIGITAL_PROOF} cols />
      </Sec>
      <section className="pg-sec pg-sec-navy pg-legacy">
        <AutomationIntegrationInteractive embedded eyebrow="Applied solutions" title="Seven examples from our work" intro="Click an example to step through how it was built." />
      </section>
      <section className="pg-sec pg-sec-navy pg-legacy"><AutomationEcosystemBars /></section>
      <section className="pg-sec pg-sec-navy pg-legacy"><WhatWeDeliverPyramid /></section>
    </>
  );
}

function AviationShowcase() {
  return (
    <>
      <Sec title="Where we lead" intro={<p>Our team helped shape early guidance on drones and advanced air mobility and continues to support its evolution, working directly with transportation agencies and airports to turn strategy into deployable programs.</p>}>
        <ol className="pg-cards">{WHERE_WE_LEAD.map((w) => <li key={w.n}><div className="pg-card"><span className="pg-case-k">{w.n}</span><b>{w.t}</b><span>{w.d}</span></div></li>)}</ol>
      </Sec>
      <Sec title="Integrate the next layer of your transportation system" tone="panel"><AamLandscape /></Sec>
      <Sec title="Bridging silos" intro={<p>Advanced air mobility touches every part of the aviation and transportation world. We help agencies work with all of it.</p>}><AamEcosystem /></Sec>
      <Sec title="Your aviation team" tone="panel"><People people={AVIATION_TEAM} /></Sec>
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
          {cases.length > 4 && <p style={{ marginTop: 16 }}><a href={`/insights/case-studies?service=${hit.service.slug}`}>See all {cases.length} case studies</a></p>}
        </Sec>
      )}
      <Sec title="Related services"><ServiceChips ids={s.related} /></Sec>
      {AVIATION_PAGES.includes(id) && <Sec title="Your aviation team" tone="panel"><People people={AVIATION_TEAM} /></Sec>}
      <Talk />
    </Shell>
  );
}

/* One page-specific feature per service (wireframe FEAT + KEEP) */
function ServiceFeature({ id }: { id: string }) {
  switch (id) {
    case "automation":
      return (
        <>
          <section className="pg-sec pg-sec-navy pg-legacy">
            <AutomationIntegrationInteractive embedded eyebrow="Applied solutions" title="From our work" intro="Seven examples, including how we rebuilt consultant contracting at a state DOT, step by step." />
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
      return <Sec title="What a proficiency path looks like" kicker="From our work"><Steps steps={[
        { t: "Core proficiencies", d: "What every person in the role must show" }, { t: "Electives", d: "Specialties that fit the work unit" },
        { t: "Demonstration", d: "Task sheets scored by a trained reviewer" }, { t: "Review", d: "Supervisor and peer sign-off" }, { t: "Advance", d: "A clear step to the next level" }]} /></Sec>;
    case "asset-mgmt":
      return <Sec title="The asset life cycle"><Steps steps={[
        { t: "Inventory", d: "Know what you own and where" }, { t: "Condition", d: "Know what shape it's in" }, { t: "Strategy", d: "Life cycle, risk, and investment decisions" },
        { t: "Delivery", d: "Maintain and replace on plan" }, { t: "Performance", d: "Measure the result and adjust" }]} /></Sec>;
    case "strategic-planning":
      return <Sec title="How a strategic plan comes together" kicker="From our work"><Steps steps={[
        { t: "Engage", d: "Leadership, staff, and partners shape it" }, { t: "Set direction", d: "Vision, goals, and measures" },
        { t: "Act", d: "Yearly action plans by division" }, { t: "Track", d: "Progress dashboards leadership reviews" }]} /></Sec>;
    case "row":
      return <Sec title="The depth behind it"><List cols items={["Acquisition and relocation", "Property management and excess land", "Appraisal and appraiser certification", "Outdoor advertising and junkyard control", "Eminent domain litigation support and mediation", "Local agency right of way projects"]} /></Sec>;
    case "program-delivery":
      return <Sec title="Inside a project delivery network" kicker="From our work"><List items={["Tools, templates, and workflows for every phase", "Project management plans and commitment tracking", "Risk registers and risk training", "Online courses and a delivery website staff actually use"]} /></Sec>;
    case "operations": {
      const parts: [string, string, string[]][] = [
        ["Performance-based maintenance", "Contracts that pay for results: specifications, deduction models, and administration", ["cs-txmaint", "cs-pbmc", "cs-va-maint", "cs-maint-model"]],
        ["Quality assurance and ratings", "Handbooks and rating programs decisions can rely on", ["cs-transform", "cs-txmaint"]],
        ["Fleet and facilities", "The right equipment, in the right shape, at the right cost", ["cs-nv-om", "cs-riverside"]],
        ["Winter operations and emergency readiness", "Plans tested before they're needed, including drone response teams", ["cs-txmaint", "cs-drt"]],
      ];
      return (
        <Sec title="What this covers">
          <ul className="pg-cards">
            {parts.map(([t, d, ids]) => (
              <li key={t} className="pg-card">
                <b>{t}</b><span>{d}</span>
                <Chips items={ids.map((i) => caseById(i)).filter((c) => c && (!PROD || !c.needsSignoff)).map((c) => ({ label: c!.title, href: caseHref(c!) }))} />
              </li>
            ))}
          </ul>
        </Sec>
      );
    }
    case "portals":
      return <Sec title="Inside a delivery website" kicker="From our work"><List items={["A landing page with the program's tools, resource library, manuals, and training one click away", "Links to the systems staff already use: scheduling, status reporting, and dashboards", "A change request form tied to a tracker, with automatic routing to reviewers and decision makers", "Email at each step, from submission through quality check and close-out", "How-to videos and online courses published next to the tools they teach"]} /></Sec>;
    case "training-video":
      return <Sec title="How a training video comes together" kicker="From our work"><Steps steps={[
        { t: "Storyboard", d: "Who it's for and the one task it teaches" }, { t: "Script", d: "Written with the experts who do the work" }, { t: "Build", d: "Screens, narration, and examples" },
        { t: "Review", d: "Experts and leadership sign off" }, { t: "Publish", d: "On the program's site, next to the tool" }]} /></Sec>;
    case "drone-aam":
      return (
        <>
          <Sec title="Integrate the next layer of your transportation system"><AamLandscape /></Sec>
          <Sec title="Advanced air mobility services" tone="panel"><List items={AAM_SERVICES} cols /></Sec>
        </>
      );
    case "drone-programs":
      return (
        <>
          <Sec title="Program lifecycle">
            <ol className="pg-cards">{LIFECYCLE.map((l, i) => <li key={l.t}><div className="pg-card"><span className="pg-case-k">{String(i + 1).padStart(2, "0")} · {l.tag}</span><b>{l.t}</b><List items={l.items} /></div></li>)}</ol>
          </Sec>
          <Sec title="Drone services" tone="panel"><List items={DRONE_SERVICES} cols /></Sec>
        </>
      );
    default:
      return null;
  }
}

export const ALL_SERVICE_PARAMS = AREAS.flatMap((a) => a.services.map((s) => ({ slug: a.slug, service: s.slug })));
export { VISIBLE_INDUSTRIES };
