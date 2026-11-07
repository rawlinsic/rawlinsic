"use client";
/* The Drones & Advanced Air Mobility page's own sections (v9), carried over
   from the current site and rebuilt so they read at a glance:
     Where we lead       the seven numbered areas as an editorial list beside a photo
     The next layer      the region map on navy: glowing routes, big labels; pick a
                         place on the map and its routes light up and fly
     Bridging silos      the eight partner groups in two rows, all of them
                         readable at once, joined by one Rawlins bridge
     Your aviation team  portrait cards that open each person's bio
   Content is the current site's, unchanged in substance. */
import { useState, type CSSProperties } from "react";
import { WHERE_WE_LEAD } from "@/components/site/aam-data";

/* ── Where we lead ── */
export function WhereWeLead({ photo }: { photo: string }) {
  return (
    <section className="av av-lead">
      <div className="v8-wrap av-lead-in">
        <div className="av-lead-copy">
          <h2 className="v8-h2">Where we lead</h2>
          <p className="v8-lead">Our team helped shape early guidance on drones and advanced air mobility and continues to support its evolution, working directly with transportation agencies and airports to turn strategy into deployable programs.</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="av-lead-photo" src={photo} alt="" loading="lazy" />
        </div>
        <ol className="av-lead-list">
          {WHERE_WE_LEAD.map((w, i) => (
            <li key={w.n} data-reveal style={{ ["--d" as string]: `${i * 60}ms` } as CSSProperties}>
              <span className="av-lead-n" aria-hidden="true">{w.n}</span>
              <div><h3>{w.t}</h3><p>{w.d}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── Integrate the next layer of your transportation system ── */
const NODES = [
  { id: "urban-air-taxi", label: "Air Taxi", x: 175, y: 140, desc: "Electric vertical takeoff and landing (eVTOL) aircraft providing on-demand urban and regional passenger transport." },
  { id: "package-delivery", label: "Package Delivery", x: 193, y: 420, desc: "Automated drone logistics for last-mile and middle-mile package delivery across urban and suburban areas." },
  { id: "residential", label: "Residential Areas", x: 492, y: 160, desc: "Suburban and residential communities served by drone delivery, air taxi connections, and emergency response drones." },
  { id: "medical", label: "Medical Supplies", x: 488, y: 370, desc: "Time-critical medical supply delivery including lab samples, medications, vaccines, and emergency equipment." },
  { id: "rural", label: "Rural & Agriculture", x: 805, y: 150, desc: "Agricultural monitoring, crop spraying, rural delivery services, and environmental data collection for remote areas." },
  { id: "city-center", label: "City Center", x: 760, y: 400, desc: "Dense urban cores integrating vertiport networks, drone corridors, and multimodal transit connections." },
];
type Kind = "air" | "delivery" | "medical";
const PATHS: [string, string, Kind][] = [
  ["urban-air-taxi", "residential", "air"], ["urban-air-taxi", "rural", "air"], ["residential", "rural", "air"], ["residential", "city-center", "air"], ["urban-air-taxi", "city-center", "air"],
  ["package-delivery", "residential", "delivery"], ["package-delivery", "medical", "delivery"], ["package-delivery", "city-center", "delivery"], ["package-delivery", "rural", "delivery"],
  ["medical", "residential", "medical"], ["medical", "city-center", "medical"], ["medical", "rural", "medical"],
];
const ROUTE: Record<Kind, string> = { air: "Air taxi routes", delivery: "Package delivery routes", medical: "Medical supply routes" };
const at = (id: string) => NODES.find((n) => n.id === id)!;
const arc = (a: string, b: string, i: number) => {
  const p = at(a), q = at(b);
  return `M ${p.x} ${p.y} Q ${(p.x + q.x) / 2} ${Math.min(p.y, q.y) - 70 - (i % 3) * 22} ${q.x} ${q.y}`;
};

export function NextLayer() {
  const [sel, setSel] = useState("urban-air-taxi");
  const node = at(sel);
  return (
    <section className="av av-map">
      <div className="v8-wrap">
        <div className="av-head">
          <h2 className="v8-h2">Integrate the next layer of your transportation system</h2>
        </div>
        <div className="av-map-in">
          <div className="av-map-stage">
            <svg viewBox="0 0 1000 540" preserveAspectRatio="none" aria-hidden="true" focusable="false">
              {PATHS.map(([a, b, k], i) => {
                const on = sel === a || sel === b;
                return (
                  <g key={i} className={`av-route is-${k}${on ? " is-on" : ""}`}>
                    <path d={arc(a, b, i)} />
                    {on && <circle r="5"><animateMotion dur={`${2.6 + (i % 3) * 0.5}s`} repeatCount="indefinite" path={arc(a, b, i)} /></circle>}
                  </g>
                );
              })}
            </svg>
            {NODES.map((n) => (
              <button key={n.id} type="button" className="av-place" aria-pressed={sel === n.id} onClick={() => setSel(n.id)}
                style={{ left: `${n.x / 10}%`, top: `${(n.y / 540) * 100}%` }}>
                <i aria-hidden="true" /><span>{n.label}</span>
              </button>
            ))}
          </div>
          <div className="av-map-side">
            <div className="av-map-card" aria-live="polite">
              <p className="v8-eyebrow">Selected place</p>
              <h3>{node.label}</h3>
              <p>{node.desc}</p>
            </div>
            <ul className="av-legend">
              {(Object.keys(ROUTE) as Kind[]).map((k) => <li key={k} className={`is-${k}`}><i aria-hidden="true" />{ROUTE[k]}</li>)}
            </ul>
            <p className="av-map-hint">Pick a place on the map to see its routes.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Bridging silos ── */
const ECO = [
  { label: "Aviation authorities", short: "FAA · ICAO · NASAO", desc: "Interpreting U.S. federal and international aviation regulatory bodies shaping airspace policy and certification standards." },
  { label: "Government agencies", short: "State DOTs · Security · Emergency", desc: "Aligning state, federal, and international transportation agencies, security forces, and emergency management services." },
  { label: "Standards organizations", short: "ACRA · AASHTO · NCHRP", desc: "Developing industry standards for technical requirements, performance benchmarks, and implementation frameworks." },
  { label: "Academic institutions", short: "Research · Universities · Labs", desc: "Steering research centers and universities advancing advanced air mobility technology, safety analysis, and workforce development." },
  { label: "Air navigation providers", short: "Drone traffic · Air traffic management", desc: "Integrating drone traffic management operators and air traffic management providers to enable safe airspace." },
  { label: "Operators and services", short: "Drone operations · Delivery · Providers", desc: "Informing commercial drone operators, delivery service providers, and aerial operations companies on industry best practices." },
  { label: "Industry", short: "Manufacturers · Technology · Integrators", desc: "Guiding aircraft manufacturers, technology providers, and systems integrators building the vehicles for tomorrow's airspace." },
  { label: "Cities and planning organizations", short: "Municipal · Planning · Transit", desc: "Integrating advanced air mobility across rural and urban communities." },
];

export function BridgingSilos() {
  const row = (items: typeof ECO, down: boolean) => (
    <ul className={`av-silo-row${down ? " is-down" : ""}`}>
      {items.map((e, i) => (
        <li key={e.label} data-reveal style={{ ["--d" as string]: `${i * 70}ms` } as CSSProperties}>
          <h3>{e.label}</h3>
          <p className="av-silo-who">{e.short}</p>
          <p>{e.desc}</p>
        </li>
      ))}
    </ul>
  );
  return (
    <section className="av av-silos">
      <div className="v8-wrap">
        <div className="av-head">
          <h2 className="v8-h2">Bridging silos</h2>
          <p className="v8-lead">Advanced air mobility touches every part of the aviation and transportation world. We help agencies work with all of it.</p>
        </div>
        <div className="av-silo">
          {row(ECO.slice(0, 4), false)}
          <div className="av-bridge" aria-hidden="true"><b>Rawlins</b><span>bridging silos</span></div>
          {row(ECO.slice(4), true)}
        </div>
      </div>
    </section>
  );
}

/* ── Your aviation team ── */
export type TeamCard = { name: string; title: string; photo?: string; location?: string; href: string };
export function AviationTeam({ people }: { people: TeamCard[] }) {
  return (
    <section className="av av-team">
      <div className="v8-wrap">
        <div className="av-head av-head-row">
          <h2 className="v8-h2">Your aviation team</h2>
          <a className="v8-link" href="/about/our-people">Everyone on our team</a>
        </div>
        <ul className="av-team-list">
          {people.map((p, i) => (
            <li key={p.name} data-reveal style={{ ["--d" as string]: `${i * 80}ms` } as CSSProperties}>
              <a href={p.href}>
                <span className="av-team-ph">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {p.photo ? <img src={p.photo} alt="" loading="lazy" /> : <span aria-hidden="true">{p.name.slice(0, 1)}</span>}
                </span>
                <b>{p.name}</b>
                <span className="av-team-role">{p.title}</span>
                {p.location && <span className="av-team-loc">{p.location}</span>}
                <span className="av-team-more">Read bio</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
