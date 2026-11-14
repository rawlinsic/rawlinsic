/* Service page (v8). Carries everything handoff v8 section 3 lists: what it
   is, what we hear, what we deliver, what you walk away with, the experience
   behind it, where we've done it, often paired with, industries, and a way to
   talk to someone. How it moves:
     hero         lit by the service's own photo, with its area's line drawing
                  (each area's services get their own look)
     we hear      held while the client's words light up
     we deliver   held while the deliverables are dealt in as numbered cards
     how          the area's diagram drawing itself (where a service has steps)
     walk away    with the experience behind it alongside
   and the page ends by moving you on to the next service. The five drone
   service pages also show Our aviation team: the six roles, then the people
   (full site pass, Parts 2 and 4). */
import ProjectCard from "@/components/v8/project-card";
import Rail from "@/components/v8/rail";
import type { CSSProperties } from "react";
import { AREAS, CASES, PAGE_STATUS, areaHref, caseHref, caseTag, isOurs, serviceById, serviceHref, isListed } from "@/lib/content/site";
import { CASES as CASE_DATA, SERVICES } from "@/lib/content/catalog";
import { AREA_PHOTO, SERVICE_PHOTO } from "@/lib/content/media";
import { SERVICE_STEPS } from "@/lib/content/features";
import { THEME, themeStyle, casePhoto, type DiagramKind, hearTitle } from "@/lib/content/v8";
import Fit from "@/components/v8/fit";
import AreaMark from "@/components/v8/area-mark";
import LitText from "@/components/v8/lit-text";
import SectionNav from "@/components/v8/section-nav";
import Scene from "@/components/v8/scene";
import Panels from "@/components/v8/panels";
import RouteList from "@/components/v8/route-list";
import { AVIATION_PAGES, ServiceFeature, aviationCards } from "@/components/site/services";
import { AviationTeam } from "@/components/site/aviation";
import { AVIATION_ROLES } from "@/lib/content/people";
import { CaseNote, Dev, LineNote, TalkTitle, talkFor } from "@/components/site/ui";
import { PUBLICATIONS, TALKS } from "@/lib/content/research";

const PROD = process.env.VERCEL_ENV === "production";
const STATUS: Record<string, string> = { warn: "Proven, copy needed", gap: "Needs expert content" };
const STEP_KIND: Record<string, DiagramKind> = { "asset-mgmt": "cycle", "strategic-planning": "loop", workforce: "track", "training-video": "track" };
/* "Inside a project delivery network" moved from Program Delivery to Preconstruction (content pass v7, 2.3) */
/* pages that show their "From our work" block and their How we do it steps, the block first (Preconstruction's "Inside a
   project delivery network", put back by Nicole's Program & Project Delivery file v7, Nov 13) */
const FEATURE_AND_STEPS = ["preconstruction", "portals", "automation", "data-governance", "ai"]; // + four Digital Solutions pages (file v5, Nov 13)
const HAS_FEATURE = ["automation", "data-governance", "ai", "row", "preconstruction", "operations", "portals", "drone-aam", "drone-programs"];
/* a page that shows another page's graphic after its own steps (Nicole, Nov 12: the Maintenance Programs graphic goes on
   Asset Management, where its parts now have their own pages; its winter operations part came off) */
const FEATURE_FROM: Record<string, string> = { "asset-mgmt": "operations" };
/* papers and talks from our team shown under a page's projects, by title from lib/content/research.ts (John's review
   comment, Nov 12: Advanced Air Mobility Strategy & Readiness needs more than one example) */
/* each with a picture (Nicole, Nov 12: "they're too plain"). The talk shows that event: Paul presenting at the Nashville
   symposium (Nicole: "the talk picture needs to be of that event"). The paper has no picture of its own; the airport from
   the air is from the live site's AAM page */
const READING: Record<string, { t: string; photo: string }[]> = { "drone-aam": [
  { t: "Lessons learned while planning for advanced air mobility", photo: "/images/pages/aam-phase3.webp" },
  { t: "The Evolving Landscape of Advanced Air Mobility", photo: "/images/pages/research-paul-wheeler-nashville-symposium-2025.webp" },
] };
const names = (p: string[]) => (p.length > 1 ? `${p.slice(0, -1).join(", ")} and ${p[p.length - 1]}` : p[0] ?? "");
const firstSentence = (s: string) => (s.match(/^.*?[.!?](\s|$)/)?.[0] ?? s).trim();
const bare = (s: string) => `${s.replace(/[.”"]+$/, "")}.`; // the quote marks are drawn on the card
/* one card per quote: some entries hold two quotes in one string ("…” “…") */
const quotes = (hear: string[]) => hear.flatMap((h) => h.split(/["”]\s*["“]/)).map((h) => bare(h.replace(/^["“]/, "")));
/* Nov 12 (Nicole's Operations & Maintenance file): "**Label:** text" shows the label in bold */
/* the same "**Name:** line" as a card: the name on top, its line under it (Nicole, Nov 12: "each item shown as a name and a line").
   The line's first letter is capitalized in CSS only, so Edit text still finds the words as written. */
/* a name written with a trailing comma ("**Handoffs from design through award into construction,** written as…") drops it on the card */
/* an intro paragraph with its links to other services (Asset Management names the four services under it) */
const linked = (p: string, links?: Record<string, string>) => {
  const keys = Object.keys(links ?? {}).filter((k) => p.includes(k));
  if (!links || !keys.length) return p;
  const re = new RegExp(`(${keys.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`);
  return p.split(re).map((part, k) => (links[part] ? <a key={k} href={serviceHref(links[part])}>{part}</a> : part));
};
/* links: phrases in a card's name that open another service (Asset Management's last card, M&O file v10, Nov 13) */
const nameLine = (t: string, links?: Record<string, string>) => { const m = t.match(/^\*\*(.+?)[:,]?\*\*\s*([\s\S]*)$/); return m ? <><b className="svd-name">{linked(m[1], links)}</b><span className="svd-line">{m[2]}</span></> : t; };

export default function ServiceV8({ id }: { id: string }) {
  const hit = serviceById(id)!;
  const s = SERVICES[id];
  const area = hit.area;
  const T = THEME[area.id];
  const i = area.services.findIndex((x) => x.id === id);
  /* the next service in the list, skipping any that are off the lists for now (LISTS_OFF) */
  const nextSvc = area.services.slice(i + 1).find((x) => isListed(x.id));
  const nextArea = AREAS[(AREAS.findIndex((a) => a.id === area.id) + 1) % AREAS.length];
  /* a set order when the service has one (Preconstruction, content pass v7, 2.4); otherwise our own work first,
     earlier work (tagged Before Rawlins) after it */
  /* Where we've done it shows cards only (Where we've done it file v1, Nov 13): the page's own order first (s.cards, the order its
     lines had), then any other project tagged to it, then Before Rawlins projects last */
  const order = (c: (typeof CASES)[number]) => { const k = (s.cards ?? s.cases ?? []).indexOf(c.id); return (isOurs(c) ? 0 : 1000) + (k < 0 ? 99 : k); };
  /* a service's own list (s.cases) can also bring in the nearest projects that aren't tagged with it (Executive
     Advisory, Owner's Representation; Nicole, Nov 11); then the section is "Related projects", not "Where we've done it" */
  /* Nov 11 (Nicole: "include any projects that are relevant for pages"): the projects tagged with this service
     first; then a "Related projects" row with the service's own picks (s.cases) and projects whose records list
     this service. A page with nothing tagged leads with the related row. */
  const RELATED_SKIP: Record<string, string[]> = { "change-mgmt": ["cs-pdn"] }; // cs-pdn's "change system" is change requests, not change management
  const byId = (k: string) => CASES.find((c) => c.id === k);
  const tagged = CASES.filter((c) => c.services.includes(id)).sort((a, b) => order(a) - order(b));
  const relIds = [...(s.cases ?? []), ...Object.values(CASE_DATA).filter((d) => d.services.includes(id)).map((d) => d.id)];
  const related = relIds.filter((k, i) => relIds.indexOf(k) === i && !(RELATED_SKIP[id] ?? []).includes(k)).map(byId)
    .filter((c): c is (typeof CASES)[number] => !!c && !tagged.includes(c)).sort((a, b) => order(a) - order(b) || Number(!isOurs(a)) - Number(!isOurs(b)));
  const own = tagged.length > 0;
  const main = own ? tagged : related, rest = own ? related : [];
  const cases = main;
  const workTitle = own ? "Where we've done it" : "Related projects";
  const reading = (READING[id] ?? []).map(({ t, photo }) => {
    const pub = PUBLICATIONS.find((x) => x.title === t);
    if (pub) return { kind: "Paper", photo, title: pub.title, href: pub.href, meta: [pub.series.split(",")[0], pub.year, names(pub.people), pub.before ? "Before Rawlins" : ""].filter(Boolean).join(" · ") };
    const talk = TALKS.find((x) => x.title === t);
    return talk ? { kind: "Speaker", photo, title: talk.title, href: talk.href, meta: [talk.event, talk.when, names(talk.people)].filter(Boolean).join(" · ") } : null;
  }).filter((x): x is { kind: string; photo: string; title: string; href: string; meta: string } => !!x);
  const hasWork = cases.length > 0 || reading.length > 0;
  const talk = talkFor(area.id);
  const steps = SERVICE_STEPS[id];
  const hear = quotes(s.hear);
  /* "What this service covers" on the Operations & Maintenance pages (Nicole, Nov 12); "What we deliver" elsewhere */
  const deliverTitle = s.deliverTitle ?? "What we deliver";
  const photo = SERVICE_PHOTO[id] ?? AREA_PHOTO[area.id];
  const aviation = AVIATION_PAGES.includes(id);
  const sections: [string, string][] = [
    ["hear", hearTitle(s.hear)], ["deliver", deliverTitle],
    ...(steps && FEATURE_AND_STEPS.includes(id) ? [["feature", "From our work"] as [string, string]] : []),
    ...(steps ? [["how", steps.title] as [string, string]] : HAS_FEATURE.includes(id) ? [["feature", "From our work"] as [string, string]] : []),
    ...(FEATURE_FROM[id] ? [["feature", "What this covers"] as [string, string]] : []),
    ["walk", "What you walk away with"],
    ...(hasWork ? [["work", workTitle] as [string, string]] : []),
    ...(aviation ? [["aviation", "Our aviation team"] as [string, string]] : []),
    ["talk", "Talk to us"],
  ];
  const next = nextSvc
    ? { k: `Next in ${area.name}`, name: nextSvc.name, text: firstSentence(SERVICES[nextSvc.id]?.intro ?? ""), href: `/services/${area.slug}/${nextSvc.slug}`, photo: SERVICE_PHOTO[nextSvc.id] ?? AREA_PHOTO[area.id], style: themeStyle(area.id) }
    : { k: "Next area", name: nextArea.name, text: nextArea.tag, href: areaHref(nextArea), photo: AREA_PHOTO[nextArea.id], style: themeStyle(nextArea.id) };

  return (
    <div className="sv svc" style={themeStyle(area.id)}>
      <Panels className="pnl-page">
      <section className="sv-hero svh" data-scrub="page">
        <div className="svh-bg" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo} alt="" />
        </div>
        <AreaMark kind="loop" />
        <div className="v8-wrap sv-hero-in">
          <div className="sv-hero-copy">
            <nav className="crumbs" aria-label="Breadcrumb">
              <ol><li><a href="/#what">What We Do</a></li><li><a href={areaHref(area)}>{area.name}</a></li><li aria-current="page">{s.name}</li></ol>
            </nav>
            <p className="sv-area"><a href={areaHref(area)}>{area.name}</a></p>
            <h1>{s.name}</h1>
            {/* paragraphs split on a blank line (Nov 12) */}
            {s.intro.split("\n\n").filter((p) => p.trim()).map((p, k, all) => <p key={k} className="sv-intro">{linked(p, s.links)}{k === all.length - 1 && <LineNote text={s.intro} />}</p>)}
            <div className="v8-actions">
              <a className="v8-btn v8-btn-area" href="#talk">Talk to us</a>
              {hasWork && <a className="v8-btn v8-btn-ghost" href="#work">{workTitle}</a>}
            </div>
            {!PROD && s.st !== "ok" && <em className="v8-dev">Content status (preview only): {STATUS[s.st]}</em>}
            {PAGE_STATUS[id] && <Dev>{PAGE_STATUS[id]}</Dev>}
          </div>
          <figure className="sv-photo lf">
            <span className="lf-front">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo} alt="" />
            </span>
          </figure>
        </div>
      </section>

      {/* the button names the area, so it's clear the page is one of that area's services (John's review comment, Nov 12) */}
      <SectionNav items={sections} more={{ label: `${area.name} Services`, links: [{ name: area.name, href: areaHref(area), top: true }, ...area.services.filter((x) => isListed(x.id) || x.id === id).map((x) => ({ name: x.name, href: `/services/${area.slug}/${x.slug}`, current: x.id === id }))] }} />

      <section id="hear" className="svq">
        <div className="v8-wrap svq-in">
          <h2 className="v8-h2">{hearTitle(s.hear)}</h2>
          <LitText lines={hear} className={`svq-q is-${Math.min(hear.length, 4)}${hear.length === 1 && hear[0].length > 120 ? " is-long" : ""}`} />
        </div>
      </section>

      <Scene steps={1} per={Math.max(70, s.deliver.length * 17)} id="deliver" className="svd" label={deliverTitle}>
        <div className="v8-wrap svd-in">
          <AreaMark kind="loop" />
          <div className="svd-head">
            <h2 className="v8-h2">{deliverTitle}</h2>
          </div>
          <ul className={`svd-cards${s.deliver.length > 6 ? " is-3 is-4" : s.deliver.length > 4 ? " is-3" : ""}`} style={{ ["--n" as string]: s.deliver.length } as CSSProperties}>
            {s.deliver.map((d, k) => <li key={d} style={{ ["--i" as string]: k } as CSSProperties}><span>{String(k + 1).padStart(2, "0")}</span><div className="svd-t">{nameLine(d, s.cardLinks)}<LineNote text={d} /></div></li>)}
          </ul>
          {/* the pages under this one (Project Delivery: Preconstruction and Construction; Nicole's file v6, Nov 13) */}
          {s.sub?.length ? (
            <ul className="sv-chips svd-sub">
              {s.sub.map((r) => { const h = serviceById(r); return h ? <li key={r}><a href={serviceHref(r)}><i aria-hidden="true" />{h.service.name}</a></li> : null; })}
            </ul>
          ) : null}
        </div>
      </Scene>

      {steps && FEATURE_AND_STEPS.includes(id) && (
        <section id="feature" className="sv-legacy"><ServiceFeature id={id} /></section>
      )}
      {steps && (
        <Scene steps={1} per={100} id="how" className="sv-scene fit-scene" label={steps.title} fit>
          <div className="v8-wrap fit-in">
            <Fit kind={STEP_KIND[id] ?? T.diagram} eyebrow={steps.kicker} title={steps.title} steps={steps.steps} />
          </div>
        </Scene>
      )}
      {!steps && HAS_FEATURE.includes(id) && (
        <section id="feature" className="sv-legacy"><ServiceFeature id={id} /></section>
      )}
      {FEATURE_FROM[id] && (
        <section id="feature" className="sv-legacy"><ServiceFeature id={FEATURE_FROM[id]} /></section>
      )}

      <section id="walk" className="sv-sec svw">
        <div className={`v8-wrap svw-in${s.xp.length ? "" : " is-solo"}`}>
          <div>
            <h2 className="v8-h2">What you walk away with</h2>
            <RouteList check ordered={false} stops={s.walk.map((w) => ({ d: w }))} />
          </div>
          {s.xp.length > 0 && (
            <aside id="experience" className="svw-xp" aria-labelledby="svw-xp-h" data-reveal>
              <h2 id="svw-xp-h" className="v8-eyebrow">The experience behind it</h2>
              <ul>{s.xp.map((x) => <li key={x}>{x}<LineNote text={x} /></li>)}</ul>
            </aside>
          )}
        </div>
      </section>

      {hasWork && (
        <section id="work" className="sv-sec">
          <div className="v8-wrap">
            <div className="h-row-head"><h2 className="v8-h2">{workTitle}</h2>{tagged.length > 3 && <a className="v8-link" href={`/insights/case-studies?service=${hit.service.slug}`}>All {tagged.length} projects</a>}</div>
            {(cases.length > 0 || reading.length > 0) && <Rail label={workTitle}>
              {/* every project tagged to the page, in a row with arrows above it (Nicole, Nov 13); 3 before that */}
              {(own ? cases : cases.slice(0, 3)).map((c) => <ProjectCard key={c.id} c={c} />)}
              {/* papers and talks in the same row as the projects, as the same cards (Nicole, Nov 12) */}
              {reading.map((r) => (
                <li key={r.href} className="pc pcx" data-reveal>
                  <a href={r.href} target="_blank" rel="noopener noreferrer">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <span className="pcx-ph"><img src={r.photo} alt="" loading="lazy" /></span>
                    <span className="pcx-body">
                      <span className="pcx-status">{r.kind}</span>
                      <b>{r.title}</b>
                      <span className="pcx-who">{r.meta}</span>
                      <span className="pcx-more">{r.kind === "Paper" ? "Read the paper" : "View event"}</span>
                    </span>
                  </a>
                </li>
              ))}
            </Rail>}
            {rest.length > 0 && (
              <>
                <h3 className="sv-rel-h">Related projects</h3>
                <Rail label="Related projects">{rest.slice(0, 3).map((c) => <ProjectCard key={c.id} c={c} />)}</Rail>
              </>
            )}
          </div>
        </section>
      )}

      {aviation && <div id="aviation" className="sv-avteam"><AviationTeam roles={AVIATION_ROLES} people={aviationCards()} /></div>}

      <section id="talk" className="svt" data-nofill>
        <div className="v8-wrap svt-in">
          <div className="svt-talk">
            <h2 className="v8-h2"><TalkTitle title={talk.title} /></h2>
            {/* TODO(Nicole): closing line to come from Nicole (removed Nov 9) */}
            {talk.text ? <p className="v8-lead">{talk.text}</p> : null}
            <div className="v8-actions">
              <a className="v8-btn v8-btn-area" href={`/contact?topic=${encodeURIComponent(area.name)}`}>Get in touch</a>
              <a className="v8-btn v8-btn-ghost" href={areaHref(area)}>All of {area.name}</a>
            </div>
          </div>
          {s.related.filter(isListed).length > 0 && (
            <div className="svt-links">
              <div>
                <h3 className="v8-eyebrow">Often paired with</h3>
                <ul className="sv-chips">
                  {s.related.filter(isListed).map((r) => { const h = serviceById(r); return h ? <li key={r}><a href={serviceHref(r)} style={themeStyle(h.area.id)}><i aria-hidden="true" />{h.service.name}</a></li> : null; })}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      <a className="sv-next" href={next.href} style={next.style}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={next.photo} alt="" loading="lazy" />
        <span className="v8-wrap sv-next-in"><em>{next.k}</em><b>{next.name}</b><span>{next.text}</span><i aria-hidden="true">→</i></span>
      </a>
      </Panels>
    </div>
  );
}
