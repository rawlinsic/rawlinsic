/* Area page (v8). Carries what handoff v8 section 3 lists: what the area
   covers (lead), what we hear, how the pieces fit (its diagram, drawn on a
   dark stage as you scroll), its services, its projects, the industries it
   serves, a way to talk to someone, and the next area. The Digital and
   Drones areas keep their carried-over features (applied solutions, the
   AAM landscape and partners). */
import type { ReactNode } from "react";
import { AREAS, CASES, INDUSTRIES, areaHref, caseHref, caseWho, industryHref, type Area } from "@/lib/content/site";
import { AREAS as AREA_DATA, SERVICES } from "@/lib/content/catalog";
import { AREA_PHOTO, SERVICE_PHOTO } from "@/lib/content/media";
import { THEME, themeStyle, casePhoto } from "@/lib/content/v8";
import { Diagram } from "@/components/v8/diagram";
import SectionNav from "@/components/v8/section-nav";
import Scene from "@/components/v8/scene";

const PROD = process.env.VERCEL_ENV === "production";
const firstSentence = (s: string) => (s.match(/^.*?[.!?](\s|$)/)?.[0] ?? s).trim();
const quote = (s: string) => `“${s.replace(/[.”"]+$/, "")}.”`;

export default function AreaV8({ area, extra }: { area: Area; extra?: ReactNode }) {
  const L = AREA_DATA[area.id];
  const T = THEME[area.id];
  const k = AREAS.findIndex((a) => a.id === area.id);
  const next = AREAS[(k + 1) % AREAS.length];
  const cases = L.cases.map((id) => CASES.find((c) => c.id === id)).filter((c) => c && (!PROD || !c.needsSignoff)) as typeof CASES;
  const indIds = Array.from(new Set(area.services.flatMap((s) => SERVICES[s.id]?.industries ?? [])));
  const inds = indIds.map((id) => INDUSTRIES.find((i) => i.id === id)).filter((i) => i && !i.hidden);
  const sections: [string, string][] = [
    ["hear", "What we hear"], ["fit", L.feature.title], ...(extra ? [["more", "From our work"] as [string, string]] : []),
    ["services", "Services"], ...(cases.length ? [["work", "Our work"] as [string, string]] : []), ["talk", "Talk to us"],
  ];

  return (
    <div className="sv ar" style={themeStyle(area.id)}>
      <section className="sv-hero">
        <div className="v8-wrap sv-hero-in">
          <div className="sv-hero-copy">
            <nav className="crumbs" aria-label="Breadcrumb">
              <ol><li><a href="/">Home</a></li><li><a href="/#what">What we do</a></li><li aria-current="page">{area.name}</li></ol>
            </nav>
            <p className="sv-area">{area.tag}</p>
            <h1>{area.name}</h1>
            <p className="sv-intro">{L.lead}</p>
            <div className="v8-actions">
              <a className="v8-btn v8-btn-area" href={`/contact?topic=${encodeURIComponent(area.name)}`}>Get in touch</a>
              <a className="v8-btn v8-btn-ghost" href="#services">See the services</a>
            </div>
          </div>
          <figure className="sv-photo lf">
            <span className="lf-back" aria-hidden="true" />
            <span className="lf-mid" aria-hidden="true"><i /><i /><i /><i /></span>
            <span className="lf-front">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={AREA_PHOTO[area.id]} alt="" />
            </span>
          </figure>
        </div>
      </section>

      <SectionNav items={sections} />

      <section id="hear" className="sv-sec sv-hear">
        <div className="v8-wrap">
          <h2 className="v8-eyebrow">What we hear</h2>
          <ul className="sv-quotes">{L.hear.map((h) => <li key={h} data-reveal>{quote(h)}</li>)}</ul>
        </div>
      </section>

      <Scene steps={1} per={120} id="fit" className="sv-scene" label={L.feature.title}>
        <div className="v8-wrap sv-scene-in glow dg-scrub" data-step={0}>
          <div className="sv-scene-copy">
            <p className="v8-eyebrow">How the pieces fit</p>
            <h2 className="v8-h2">{L.feature.title}</h2>
            <span className="sv-scene-meter" aria-hidden="true"><i /></span>
          </div>
          <Diagram kind={T.diagram} steps={L.feature.steps} detail />
        </div>
      </Scene>

      {extra && <section id="more" className="sv-legacy">{extra}</section>}

      <section id="services" className="sv-sec">
        <div className="v8-wrap">
          <h2 className="v8-h2">Services</h2>
          <ul className="ar-svcs">
            {area.services.map((s) => (
              <li key={s.id} data-reveal>
                <a href={`/services/${area.slug}/${s.slug}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={SERVICE_PHOTO[s.id] ?? AREA_PHOTO[area.id]} alt="" loading="lazy" />
                  <span><b>{s.name}</b><em>{firstSentence(SERVICES[s.id]?.intro ?? "")}</em></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {cases.length > 0 && (
        <section id="work" className="sv-sec sv-hear">
          <div className="v8-wrap">
            <div className="h-row-head"><h2 className="v8-h2">Our work</h2><a className="v8-link" href={`/insights/case-studies?area=${area.slug}`}>All {area.name} projects</a></div>
            <ul className="sv-cases">
              {cases.map((c) => (
                <li key={c.id} data-reveal className="pc">
                  <a href={caseHref(c)}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={casePhoto(c)} alt="" loading="lazy" />
                    <span className={`pc-status${c.status === "Ongoing" ? " is-live" : ""}`}>{c.status === "Ongoing" ? "In the works" : "Completed"}</span>
                    <b>{c.title}</b>
                    <span className="pc-who">{caseWho(c, PROD)}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="sv-sec sv-links">
        <div className="v8-wrap">
          <h2 className="v8-eyebrow">Who we do this for</h2>
          <ul className="sv-chips">{inds.map((x) => <li key={x!.id}><a href={industryHref(x!)}>{x!.name}</a></li>)}</ul>
        </div>
      </section>

      <section id="talk" className="sv-talk">
        <div className="v8-wrap sv-talk-in">
          <div>
            <h2 className="v8-h2">Talk to the people who do this work</h2>
            <p className="v8-lead">Tell us what you&apos;re working on. We&apos;ll connect you with the person on our team who has done it.</p>
          </div>
          <div className="v8-actions"><a className="v8-btn v8-btn-area" href={`/contact?topic=${encodeURIComponent(area.name)}`}>Get in touch</a></div>
        </div>
      </section>

      <a className="sv-next" href={areaHref(next)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={AREA_PHOTO[next.id]} alt="" loading="lazy" />
        <span className="v8-wrap sv-next-in"><em>Next area</em><b>{next.name}</b><span>{next.tag}</span><i aria-hidden="true">→</i></span>
      </a>
    </div>
  );
}
