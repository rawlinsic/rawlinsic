"use client";
/* The Drones & Advanced Air Mobility page's own sections (v9), carried over
   from the current site and rebuilt so they read at a glance:
     (Where we lead lives in where-we-lead.tsx)
     The next layer      the region map on navy: glowing routes, big labels; pick a
                         place on the map and its routes light up and fly
     Bridging silos      the five partner groups Jacob's drone document names,
                         three above the Rawlins bridge and two below, all of
                         them readable at once
     Our aviation team   the six roles first (Jacob's "Team Structure (roles,
                         not names)"), then portrait cards that open each bio
   Words follow the service pages scrub (Nov 6) and full site pass Parts 2 and 4. */
import { useState, type CSSProperties } from "react";

/* ── Integrate the next layer of your transportation system ── */
const NODES = [
  { id: "urban-air-taxi", label: "Passenger aircraft", x: 175, y: 140, desc: "Electric vertical takeoff and landing (eVTOL) aircraft providing on-demand urban and regional passenger transport." },
  { id: "package-delivery", label: "Package Delivery", x: 193, y: 420, desc: "Automated drone logistics for last-mile and middle-mile package delivery across urban and suburban areas." },
  { id: "residential", label: "Residential Areas", x: 492, y: 160, desc: "Suburban and residential communities served by drone delivery, passenger aircraft connections, and emergency response drones." },
  { id: "medical", label: "Medical Supplies", x: 488, y: 370, desc: "Time-critical medical supply delivery including lab samples, medications, vaccines, and emergency equipment." },
  { id: "rural", label: "Rural & Agriculture", x: 805, y: 150, desc: "Agricultural monitoring, crop spraying, rural delivery services, and environmental data collection for remote areas." },
  { id: "city-center", label: "City Center", x: 760, y: 400, desc: "Dense urban cores integrating vertiport networks, drone corridors, and multimodal transit connections." },
];
/* two route kinds: people and cargo (package and medical deliveries are one kind) */
type Kind = "air" | "delivery";
const PATHS: [string, string, Kind][] = [
  ["urban-air-taxi", "residential", "air"], ["urban-air-taxi", "rural", "air"], ["residential", "rural", "air"], ["residential", "city-center", "air"], ["urban-air-taxi", "city-center", "air"],
  ["package-delivery", "residential", "delivery"], ["package-delivery", "medical", "delivery"], ["package-delivery", "city-center", "delivery"], ["package-delivery", "rural", "delivery"],
  ["medical", "residential", "delivery"], ["medical", "city-center", "delivery"], ["medical", "rural", "delivery"],
];
const ROUTE: Record<Kind, string> = { air: "People movement", delivery: "Cargo movement" };
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
  { label: "Aviation authorities", short: "FAA · ICAO · NASAO", desc: "Federal rules and guidance we track for agency programs, with international standards where they apply." },
  { label: "Government agencies", short: "State DOTs · Federal agencies · Emergency management", desc: "State and federal transportation agencies and emergency management offices." },
  /* ACRP: Airport Cooperative Research Program ("ACRA" was a typo carried over from the live site) */
  { label: "Standards organizations", short: "ACRP · AASHTO · NCHRP", desc: "Standards and research bodies whose guidance agencies adopt. Members of our team serve on national committees." },
  { label: "Academic institutions", short: "Research · Universities · Labs", desc: "Universities and research centers working on air mobility safety, technology, and workforce." },
  { label: "Industry", short: "Manufacturers · Technology · Integrators", desc: "Aircraft manufacturers, technology providers, and systems integrators." },
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
          <p className="v8-lead">The guidance your program relies on is being written now. We sit at the table where agencies, manufacturers, researchers, and regulators work it out, and bring what we learn back to your program.</p>
        </div>
        <div className="av-silo">
          {row(ECO.slice(0, 3), false)}
          <div className="av-bridge" aria-hidden="true"><b>Rawlins</b><span>bridging silos</span></div>
          {row(ECO.slice(3), true)}
        </div>
      </div>
    </section>
  );
}

/* ── Our aviation team ── */
/* The six roles (Jacob's "Team Structure (roles, not names)"): a two-digit
   number, the role, and the line under it. Three across; one column on phones. */
export function AviationRoles({ roles }: { roles: readonly (readonly [string, string])[] }) {
  return (
    <ol className="av-roles" aria-label="Roles on our aviation team">
      {roles.map(([t, d], i) => (
        <li key={t} data-reveal style={{ ["--d" as string]: `${i * 60}ms` } as CSSProperties}>
          <span className="av-role-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
          <b>{t}</b>
          <span>{d}</span>
        </li>
      ))}
    </ol>
  );
}

/* Portrait cards: Rawlins title and location from the roster, plus a former
   agency role when the person has one. With roles, the roles come first, then
   the people, then the link to everyone's bio (full site pass, Parts 2 and 4). */
export type TeamCard = { name: string; title: string; formerly?: string; photo?: string; location?: string; href: string };
export function AviationTeam({ people, title = "Our aviation team", roles }: { people: TeamCard[]; title?: string; roles?: readonly (readonly [string, string])[] }) {
  return (
    <section className={`av av-team${roles ? " has-roles" : ""}`}>
      <div className="v8-wrap">
        <div className="av-head av-head-row">
          <h2 className="v8-h2">{title}</h2>
          {!roles && <a className="v8-link" href="/about/our-people">Everyone on our team</a>}
        </div>
        {roles && <AviationRoles roles={roles} />}
        <ul className="av-team-list">
          {people.map((p, i) => (
            <li key={p.name} data-reveal style={{ ["--d" as string]: `${i * 80}ms` } as CSSProperties}>
              <a href={p.href}>
                <span className="av-team-ph">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {p.photo ? <img src={p.photo} alt="" loading="lazy" /> : <span aria-hidden="true">{p.name.slice(0, 1)}</span>}
                </span>
                <b>{p.name}</b>
                {p.title && <span className="av-team-role">{p.title}</span>}
                {p.formerly && <span className="av-team-former">{p.formerly}</span>}
                {p.location && <span className="av-team-loc">{p.location}</span>}
                <span className="av-team-more">Read bio</span>
              </a>
            </li>
          ))}
        </ul>
        {roles && <p className="av-team-all"><a className="v8-link" href="/about/our-people">Everyone&apos;s bio is on Our people</a></p>}
      </div>
    </section>
  );
}
