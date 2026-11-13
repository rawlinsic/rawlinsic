/* Area page (v8). Carries what handoff v8 section 3 lists: what the area
   covers (lead), its services, what we hear, how the pieces fit (its
   diagram, drawn on a navy stage as you scroll), its projects, the
   industries it serves, a way to talk to someone, and the next area.
   How it looks:
     hero        lit by the area's photo, with the area's line drawing; the
                 area's services sit right in it as photo panels that open
                 on hover (the home page's area panels, one level down)
     we hear     the clients' words side by side, lighting up as they come in
     pieces fit  the steps as big cards joined by a line that draws itself
   The Digital and Drones areas keep their carried-over features (applied
   solutions, the AAM landscape and partners). */
import ProjectCard from "@/components/v8/project-card";
import type { ReactNode } from "react";
import { AREAS, CASES, areaHref, caseHref, isOurs, type Area } from "@/lib/content/site";
import { AREAS as AREA_DATA, SERVICES } from "@/lib/content/catalog";
import { AREA_PHOTO, SERVICE_PHOTO, AREA_PHOTO_POS } from "@/lib/content/media";
import { THEME, themeStyle, casePhoto, hearTitle } from "@/lib/content/v8";
import Fit from "@/components/v8/fit";
import AreaMark from "@/components/v8/area-mark";
import LitText from "@/components/v8/lit-text";
import SectionNav from "@/components/v8/section-nav";
import Scene from "@/components/v8/scene";
import Panels from "@/components/v8/panels";
import { CaseNote, Dev, talkFor } from "@/components/site/ui";

const firstSentence = (s: string) => (s.match(/^.*?[.!?](\s|$)/)?.[0] ?? s).trim();
const bare = (s: string) => `${s.replace(/[.”"]+$/, "")}.`; // the quote marks are drawn on the card
/* one card per quote: some entries hold two quotes in one string ("…” “…") */
const quotes = (hear: string[]) => hear.flatMap((h) => h.split(/["”]\s*["“]/)).map((h) => bare(h.replace(/^["“]/, "")));

export default function AreaV8({ area, extra }: { area: Area; extra?: ReactNode }) {
  const L = AREA_DATA[area.id];
  const T = THEME[area.id];
  const k = AREAS.findIndex((a) => a.id === area.id);
  const next = AREAS[(k + 1) % AREAS.length];
  /* Featured projects: Rawlins work only (no Before Rawlins cases) */
  const cases = L.cases.map((id) => CASES.find((c) => c.id === id)).filter((c) => c && isOurs(c)) as typeof CASES;
  const many = area.services.length >= 5;
  const sections: [string, string][] = [
    ["services", "Services"], ["hear", hearTitle(L.hear)], ["fit", L.feature.title], ...(extra ? [["more", "From our work"] as [string, string]] : []),
    ...(cases.length ? [["work", "Featured projects"] as [string, string]] : []), ["talk", "Talk to us"],
  ];

  return (
    <div className="sv ar" style={themeStyle(area.id)}>
      <Panels className="pnl-page">
      <section className="sv-hero svh arh" data-scrub="page">
        <div className="svh-bg" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={AREA_PHOTO[area.id]} alt="" style={AREA_PHOTO_POS[area.id] ? { objectPosition: AREA_PHOTO_POS[area.id] } : undefined} />
        </div>
        <AreaMark kind="loop" /> {/* one drawing for every What We Do page (Nicole, Nov 10) */}
        <div className="v8-wrap arh-top">
          <div>
            <nav className="crumbs" aria-label="Breadcrumb">
              <ol><li><a href="/">Home</a></li><li><a href="/#what">What We Do</a></li><li aria-current="page">{area.name}</li></ol>
            </nav>
            <p className="sv-area">{area.tag}</p>
            <h1>{area.name}</h1>
          </div>
          <div className="arh-side">
            {/* paragraphs split on a blank line (Nov 12) */}
            {L.lead.split("\n\n").filter((p) => p.trim()).map((p, k) => <p key={k} className="sv-intro">{p}</p>)}
            <div className="v8-actions">
              <a className="v8-btn v8-btn-area" href={`/contact?topic=${encodeURIComponent(area.name)}`}>Get in touch</a>
              {cases.length > 0 && <a className="v8-btn v8-btn-ghost" href="#work">See our work</a>}
            </div>
          </div>
        </div>
        <div id="services" className="v8-wrap arh-svcs">
          <h2 className="arh-svcs-h">Our services</h2>
          <ul className={`ways ways-svc${many ? " is-many" : ""}`}>
            {area.services.map((s) => (
              <li key={s.id} className="way">
                <a href={`/services/${area.slug}/${s.slug}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={SERVICE_PHOTO[s.id] ?? AREA_PHOTO[area.id]} alt="" loading="lazy" />
                  {many && <span className="way-v" aria-hidden="true">{s.name}</span>}
                  <span className="way-txt">
                    <b>{s.name}</b>
                    {/* the area's own line for the service where it has one (Operations & Maintenance, Nov 12) */}
                    <span className="way-q">{L.lines?.[s.id] ?? firstSentence(SERVICES[s.id]?.intro ?? "")}</span>
                    <span className="way-more">Explore</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SectionNav items={sections} />

      <section id="hear" className="svq">
        <div className="v8-wrap svq-in">
          <h2 className="v8-h2">{hearTitle(L.hear)}</h2>
          {/* each quote with Jacob's "What we bring" line under it (full site pass, Part 5, 2) */}
          <LitText lines={quotes(L.hear)} notes={L.bring} noteLabel="What we bring" className={`svq-q is-${Math.min(quotes(L.hear).length, 4)}${L.bring?.length ? " has-notes" : ""}`} />
        </div>
      </section>

      <Scene steps={1} per={100} id="fit" className="sv-scene fit-scene" label={L.feature.title}>
        <div className="v8-wrap fit-in">
          <Fit kind={T.diagram} eyebrow="How the pieces fit" title={L.feature.title} steps={L.feature.steps} />
        </div>
      </Scene>

      {/* the carried-over features: each of their sections is its own panel */}
      {extra && <span id="more" className="ar-anchor" data-nopanel aria-hidden="true" />}
      {extra}

      {cases.length > 0 && (
        <section id="work" className="sv-sec ar-work">
          <div className="v8-wrap">
            <div className="h-row-head"><h2 className="v8-h2">Featured projects</h2><a className="v8-link" href={`/insights/case-studies?area=${area.slug}`}>All {area.name} projects</a></div>
            <ul className="sv-cases">
              {cases.map((c) => <ProjectCard key={c.id} c={c} />)}
            </ul>
          </div>
        </section>
      )}

      <section id="talk" className="svt" data-nofill>
        <div className="v8-wrap svt-in">
          <div className="svt-talk">
            <h2 className="v8-h2">{talkFor(area.id).title}</h2>
            {/* TODO(Nicole): closing line to come from Nicole (removed Nov 9) */}
            {talkFor(area.id).text ? <p className="v8-lead">{talkFor(area.id).text}</p> : null}
            <div className="v8-actions"><a className="v8-btn v8-btn-area" href={`/contact?topic=${encodeURIComponent(area.name)}`}>Get in touch</a></div>
          </div>
          <div className="svt-links">
            <div>
              <h3 className="v8-eyebrow">{area.name} services</h3>
              <ul className="sv-chips">{area.services.map((s) => <li key={s.id}><a href={`/services/${area.slug}/${s.slug}`}><i aria-hidden="true" />{s.name}</a></li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      <a className="sv-next" href={areaHref(next)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={AREA_PHOTO[next.id]} alt="" loading="lazy" style={AREA_PHOTO_POS[next.id] ? { objectPosition: AREA_PHOTO_POS[next.id] } : undefined} />
        <span className="v8-wrap sv-next-in"><em>Next area</em><b>{next.name}</b><span>{next.tag}</span><i aria-hidden="true">→</i></span>
      </a>
      </Panels>
    </div>
  );
}
