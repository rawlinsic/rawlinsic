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
import type { CSSProperties } from "react";
import { AREAS, CASES, areaHref, caseHref, caseTag, isOurs, serviceById, serviceHref } from "@/lib/content/site";
import { SERVICES } from "@/lib/content/catalog";
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
import { CaseNote, Dev, LineNote, TALK } from "@/components/site/ui";

const PROD = process.env.VERCEL_ENV === "production";
const STATUS: Record<string, string> = { warn: "Proven, copy needed", gap: "Needs expert content" };
const STEP_KIND: Record<string, DiagramKind> = { "asset-mgmt": "cycle", "strategic-planning": "loop", workforce: "track", "training-video": "track" };
const HAS_FEATURE = ["automation", "data-governance", "ai", "row", "program-delivery", "operations", "portals", "drone-aam", "drone-programs"];
const firstSentence = (s: string) => (s.match(/^.*?[.!?](\s|$)/)?.[0] ?? s).trim();
const bare = (s: string) => `${s.replace(/[.”"]+$/, "")}.`; // the quote marks are drawn on the card
/* one card per quote: some entries hold two quotes in one string ("…” “…") */
const quotes = (hear: string[]) => hear.flatMap((h) => h.split(/["”]\s*["“]/)).map((h) => bare(h.replace(/^["“]/, "")));

export default function ServiceV8({ id }: { id: string }) {
  const hit = serviceById(id)!;
  const s = SERVICES[id];
  const area = hit.area;
  const T = THEME[area.id];
  const i = area.services.findIndex((x) => x.id === id);
  const nextSvc = area.services[i + 1];
  const nextArea = AREAS[(AREAS.findIndex((a) => a.id === area.id) + 1) % AREAS.length];
  /* our own work first; earlier work (tagged Before Rawlins) after it */
  const cases = CASES.filter((c) => c.services.includes(id)).sort((a, b) => Number(!isOurs(a)) - Number(!isOurs(b)));
  const steps = SERVICE_STEPS[id];
  const hear = quotes(s.hear);
  const photo = SERVICE_PHOTO[id] ?? AREA_PHOTO[area.id];
  const aviation = AVIATION_PAGES.includes(id);
  const sections: [string, string][] = [
    ["hear", hearTitle(s.hear)], ["deliver", "What we deliver"],
    ...(steps ? [["how", steps.title] as [string, string]] : HAS_FEATURE.includes(id) ? [["feature", "From our work"] as [string, string]] : []),
    ["walk", "What you walk away with"],
    ...(cases.length ? [["work", "Where we've done it"] as [string, string]] : []),
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
        <AreaMark kind={T.diagram} />
        <div className="v8-wrap sv-hero-in">
          <div className="sv-hero-copy">
            <nav className="crumbs" aria-label="Breadcrumb">
              <ol><li><a href="/#what">What we do</a></li><li><a href={areaHref(area)}>{area.name}</a></li><li aria-current="page">{s.name}</li></ol>
            </nav>
            <p className="sv-area"><a href={areaHref(area)}>{area.name}</a></p>
            <h1>{s.name}</h1>
            <p className="sv-intro">{s.intro}</p>
            <div className="v8-actions">
              <a className="v8-btn v8-btn-area" href="#talk">Talk to us</a>
              {cases.length > 0 && <a className="v8-btn v8-btn-ghost" href="#work">Where we&apos;ve done it</a>}
            </div>
            {!PROD && s.st !== "ok" && <em className="v8-dev">Content status (preview only): {STATUS[s.st]}</em>}
          </div>
          <figure className="sv-photo lf">
            <span className="lf-back" aria-hidden="true" />
            <span className="lf-mid" aria-hidden="true"><i /><i /><i /><i /></span>
            <span className="lf-front">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo} alt="" />
            </span>
          </figure>
        </div>
        <nav className="sv-sibs" aria-label={`${area.name} services`}>
          <ol className="v8-wrap">
            {area.services.map((x, k) => (
              <li key={x.id}><a href={`/services/${area.slug}/${x.slug}`} aria-current={x.id === id ? "page" : undefined}>{x.name}</a></li>
            ))}
          </ol>
        </nav>
      </section>

      <SectionNav items={sections} />

      <section id="hear" className="svq">
        <div className="v8-wrap svq-in">
          <h2 className="v8-h2">{hearTitle(s.hear)}</h2>
          <LitText lines={hear} className={`svq-q is-${Math.min(hear.length, 4)}${hear.length === 1 && hear[0].length > 120 ? " is-long" : ""}`} />
        </div>
      </section>

      <Scene steps={1} per={Math.max(70, s.deliver.length * 17)} id="deliver" className="svd" label="What we deliver">
        <div className="v8-wrap svd-in">
          <AreaMark kind={T.diagram} />
          <div className="svd-head">
            <h2 className="v8-h2">What we deliver</h2>
          </div>
          <ul className={`svd-cards${s.deliver.length > 4 ? " is-3" : ""}`} style={{ ["--n" as string]: s.deliver.length } as CSSProperties}>
            {s.deliver.map((d, k) => <li key={d} style={{ ["--i" as string]: k } as CSSProperties}><span>{String(k + 1).padStart(2, "0")}</span>{d}</li>)}
          </ul>
        </div>
      </Scene>

      {steps && (
        <Scene steps={1} per={100} id="how" className="sv-scene fit-scene" label={steps.title}>
          <div className="v8-wrap fit-in">
            <Fit kind={STEP_KIND[id] ?? T.diagram} eyebrow={steps.kicker} title={steps.title} steps={steps.steps} />
          </div>
        </Scene>
      )}
      {!steps && HAS_FEATURE.includes(id) && (
        <section id="feature" className="sv-legacy"><ServiceFeature id={id} /></section>
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

      {cases.length > 0 && (
        <section id="work" className="sv-sec">
          <div className="v8-wrap">
            <div className="h-row-head"><h2 className="v8-h2">Where we&apos;ve done it</h2>{cases.length > 3 && <a className="v8-link" href={`/insights/case-studies?service=${hit.service.slug}`}>All {cases.length} projects</a>}</div>
            <ul className="sv-cases">
              {cases.slice(0, 3).map((c) => <ProjectCard key={c.id} c={c} />)}
            </ul>
          </div>
        </section>
      )}

      {aviation && <div id="aviation" className="sv-avteam"><AviationTeam roles={AVIATION_ROLES} people={aviationCards()} /></div>}

      <section id="talk" className="svt" data-nofill>
        <div className="v8-wrap svt-in">
          <div className="svt-talk">
            <h2 className="v8-h2">{TALK.title}</h2>
            {/* TODO(Nicole): closing line to come from Nicole (removed Nov 9) */}
            {TALK.text ? <p className="v8-lead">{TALK.text}</p> : null}
            <div className="v8-actions">
              <a className="v8-btn v8-btn-area" href={`/contact?topic=${encodeURIComponent(area.name)}`}>Get in touch</a>
              <a className="v8-btn v8-btn-ghost" href={areaHref(area)}>All of {area.name}</a>
            </div>
          </div>
          {s.related.length > 0 && (
            <div className="svt-links">
              <div>
                <h3 className="v8-eyebrow">Often paired with</h3>
                <ul className="sv-chips">
                  {s.related.map((r) => { const h = serviceById(r); return h ? <li key={r}><a href={serviceHref(r)} style={themeStyle(h.area.id)}><i aria-hidden="true" />{h.service.name}</a></li> : null; })}
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
