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
import Rail from "@/components/v8/rail";
import type { ReactNode } from "react";
import { AREAS, CASES, areaHref, caseHref, isOurs, serviceById, serviceHref, type Area, isListed } from "@/lib/content/site";
import { AREAS as AREA_DATA, SERVICES } from "@/lib/content/catalog";
import { AREA_PHOTO, SERVICE_PHOTO, AREA_PHOTO_POS } from "@/lib/content/media";
import { THEME, themeStyle, casePhoto, hearTitle } from "@/lib/content/v8";
import Fit from "@/components/v8/fit";
import HearPicker from "@/components/v8/hear-picker";
import RouteList from "@/components/v8/route-list";
import AreaMark from "@/components/v8/area-mark";
import LitText from "@/components/v8/lit-text";
import SectionNav from "@/components/v8/section-nav";
import Scene from "@/components/v8/scene";
import Panels from "@/components/v8/panels";
import { CaseNote, Dev, LineNote, talkFor } from "@/components/site/ui";

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
  /* the area's services as listed on its page (LISTS_OFF: off the lists for now, Nov 13) */
  const listed = area.services.filter((s) => isListed(s.id));
  const many = listed.length >= 5;
  /* each life cycle stage with its services as links, where the area asks for them (Program & Project Delivery, Nov 13) */
  const fitSteps = L.feature.steps.map((st) => !L.feature.links ? st : {
    ...st,
    links: [
      ...st.services.filter(isListed).map((id) => serviceById(id)).filter((h): h is NonNullable<typeof h> => !!h).map((h) => ({ name: h.service.name, href: serviceHref(h.service.id) })),
      ...(st.areas ?? []).map((id) => AREAS.find((a) => a.id === id)).filter((a): a is Area => !!a).map((a) => ({ name: a.name, href: areaHref(a) })),
    ],
  });
  /* The experience behind it, in the service pages' style (Program & Project Delivery area page file v1, Nov 13). Redesigned Nov 13
     (Nicole: "needs a redesign of something better"): the heading held on the left, each line a card on a glowing route on the
     right. Digital Solutions shows it after its own blocks, right before the featured projects (file v5, Nov 13). */
  const xpSec = L.xp?.length ? (
    <section id="experience" className="sv-sec ar-xp2">
      <div className="v8-wrap ar-xp2-in">
        <div className="ar-xp2-h"><h2 className="v8-h2">The experience behind it</h2></div>
        <RouteList check ordered={false} stops={L.xp.map((x) => ({ d: <>{x}<LineNote text={x} /></> }))} />
      </div>
    </section>
  ) : null;
  const sections: [string, string][] = [
    ["services", "Services"], ["hear", hearTitle(L.hear)], ["fit", L.feature.title], ...(L.xp?.length && !L.xpAfter ? [["experience", "The experience behind it"] as [string, string]] : []), ...(extra ? [["more", "From our work"] as [string, string]] : []),
    ...(L.xp?.length && L.xpAfter ? [["experience", "The experience behind it"] as [string, string]] : []),
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
            {listed.map((s) => (
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

      <section id="hear" className={`svq${L.bring?.length ? " is-picker" : ""}`}>
        <div className="v8-wrap svq-in">
          <h2 className="v8-h2">{hearTitle(L.hear)}</h2>
          {/* each quote with Jacob's "What we bring" line: as a picker with a glowing line, like the help picker (Nicole, Nov 13) */}
          {L.bring?.length
            ? <HearPicker items={quotes(L.hear).map((q, i) => ({ q, b: L.bring?.[i] }))} />
            : <LitText lines={quotes(L.hear)} className={`svq-q is-${Math.min(quotes(L.hear).length, 4)}`} />}
        </div>
      </section>

      <Scene steps={1} per={100} id="fit" className="sv-scene fit-scene" label={L.feature.title}>
        <div className="v8-wrap fit-in">
          <Fit kind={T.diagram} eyebrow="How the pieces fit" title={L.feature.title} lead={L.feature.lead} steps={fitSteps} />
        </div>
      </Scene>

      {/* The experience behind it, in the service pages' style (Program & Project Delivery area page file v1, Nov 13) */}
      {/* redesigned Nov 13 (Nicole: "needs a redesign of something better"): the heading held on the left, each line a card
          on a glowing route on the right, the same as the list sections on the Who We Work With pages */}
      {!L.xpAfter && xpSec}

      {/* the carried-over features: each of their sections is its own panel */}
      {extra && <span id="more" className="ar-anchor" data-nopanel aria-hidden="true" />}
      {extra}
      {L.xpAfter && xpSec}

      {cases.length > 0 && (
        <section id="work" className="sv-sec ar-work">
          <div className="v8-wrap">
            <div className="h-row-head"><h2 className="v8-h2">Featured projects</h2><a className="v8-link" href={`/insights/case-studies?area=${area.slug}`}>All {area.name} projects</a></div>
            <Rail label="Featured projects">
              {cases.map((c) => <ProjectCard key={c.id} c={c} />)}
            </Rail>
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
              <ul className="sv-chips">{listed.map((s) => <li key={s.id}><a href={`/services/${area.slug}/${s.slug}`}><i aria-hidden="true" />{s.name}</a></li>)}</ul>
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
