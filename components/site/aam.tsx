"use client";
/* Pieces carried over from the current Advanced Air Mobility page
   (components/aam-page.tsx), rebuilt in the redesign style: the landscape
   interactive, the partner ecosystem, the program lifecycle, and the service
   portfolio. Content is the current page's, unchanged in substance. */
import { useState } from "react";

const NODES = [
  { id: "urban-air-taxi", label: "Air Taxi", x: 175, y: 122, desc: "Electric vertical takeoff and landing (eVTOL) aircraft providing on-demand urban and regional passenger transport." },
  { id: "package-delivery", label: "Package Delivery", x: 193, y: 419, desc: "Automated drone logistics for last-mile and middle-mile package delivery across urban and suburban areas." },
  { id: "residential", label: "Residential Areas", x: 492, y: 147, desc: "Suburban and residential communities served by drone delivery, air taxi connections, and emergency response drones." },
  { id: "medical", label: "Medical Supplies", x: 488, y: 363, desc: "Time-critical medical supply delivery including lab samples, medications, vaccines, and emergency equipment." },
  { id: "rural", label: "Rural & Agriculture", x: 773, y: 133, desc: "Agricultural monitoring, crop spraying, rural delivery services, and environmental data collection for remote areas." },
  { id: "city-center", label: "City Center", x: 702, y: 377, desc: "Dense urban cores integrating vertiport networks, drone corridors, and multimodal transit connections." },
];
const PATHS: [string, string, "air" | "delivery" | "medical"][] = [
  ["urban-air-taxi", "residential", "air"], ["urban-air-taxi", "rural", "air"], ["residential", "rural", "air"], ["residential", "city-center", "air"], ["urban-air-taxi", "city-center", "air"],
  ["package-delivery", "residential", "delivery"], ["package-delivery", "medical", "delivery"], ["package-delivery", "city-center", "delivery"], ["package-delivery", "rural", "delivery"],
  ["medical", "residential", "medical"], ["medical", "city-center", "medical"], ["medical", "rural", "medical"],
];
const ROUTE = { air: { c: "#2f7bf5", l: "Air taxi routes" }, delivery: { c: "#203864", l: "Package delivery routes" }, medical: { c: "#c2412d", l: "Medical supply routes" } };

export function AamLandscape() {
  const [sel, setSel] = useState("urban-air-taxi");
  const node = NODES.find((n) => n.id === sel)!;
  const at = (id: string) => NODES.find((n) => n.id === id)!;
  return (
    <div className="aam-land">
      <svg viewBox="0 0 1000 540" role="img" aria-label="How advanced air mobility connects a region: air taxi, package delivery, and medical supply routes between six kinds of places">
        <defs>
          <linearGradient id="aamGround" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e9f1fb" /><stop offset="1" stopColor="#dce6f2" /></linearGradient>
        </defs>
        <rect width="1000" height="540" rx="22" fill="url(#aamGround)" />
        {PATHS.map(([a, b, t], i) => {
          const p = at(a), q = at(b), mx = (p.x + q.x) / 2, my = Math.min(p.y, q.y) - 60 - (i % 3) * 18;
          const on = sel === a || sel === b;
          return <path key={i} d={`M${p.x},${p.y - 20} Q${mx},${my - 20} ${q.x},${q.y - 20}`} fill="none" stroke={ROUTE[t].c} strokeWidth={on ? 3 : 1.5} strokeDasharray={t === "air" ? "0" : "6 6"} opacity={on ? 0.95 : 0.3} />;
        })}
        {NODES.map((n) => (
          <g key={n.id} transform={`translate(${n.x},${n.y - 20})`}>
            <circle r={sel === n.id ? 26 : 20} fill={sel === n.id ? "#1b5ccc" : "#fff"} stroke="#1b5ccc" strokeWidth="2.5" />
            <text y="50" textAnchor="middle" fontSize="20" fontWeight="700" fill="#203864">{n.label}</text>
          </g>
        ))}
      </svg>
      <div className="aam-land-side">
        <div className="aam-legend">{Object.values(ROUTE).map((r) => <span key={r.l}><i style={{ background: r.c }} />{r.l}</span>)}</div>
        <div className="aam-pick" role="group" aria-label="Places">
          {NODES.map((n) => <button key={n.id} type="button" aria-pressed={sel === n.id} onClick={() => setSel(n.id)}>{n.label}</button>)}
        </div>
        <div className="aam-desc" aria-live="polite"><b>{node.label}</b><p>{node.desc}</p></div>
      </div>
    </div>
  );
}

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

export function AamEcosystem() {
  const [sel, setSel] = useState(0);
  return (
    <div className="aam-eco">
      <div className="aam-ring" aria-hidden="true">
        <svg viewBox="0 0 400 400">
          <circle cx="200" cy="200" r="150" fill="none" stroke="#c4d8f2" strokeWidth="2" />
          {ECO.map((_, i) => {
            const a = (i / ECO.length) * Math.PI * 2 - Math.PI / 2, x = 200 + Math.cos(a) * 150, y = 200 + Math.sin(a) * 150;
            return (
              <g key={i}>
                <line x1="200" y1="200" x2={x} y2={y} stroke={sel === i ? "#2f7bf5" : "#dce6f2"} strokeWidth={sel === i ? 3 : 1.5} />
                <circle cx={x} cy={y} r={sel === i ? 16 : 11} fill={sel === i ? "#1b5ccc" : "#fff"} stroke="#1b5ccc" strokeWidth="2.5" />
              </g>
            );
          })}
          <circle cx="200" cy="200" r="46" fill="#203864" />
          <text x="200" y="196" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="700">Rawlins</text>
          <text x="200" y="214" textAnchor="middle" fill="#c4d8f2" fontSize="11">bridging silos</text>
        </svg>
      </div>
      <div>
        <ul className="aam-eco-list" role="group" aria-label="Partners in the ecosystem">
          {ECO.map((e, i) => (
            <li key={e.label}><button type="button" aria-pressed={sel === i} onClick={() => setSel(i)}><b>{e.label}</b><span>{e.short}</span></button></li>
          ))}
        </ul>
        <p className="aam-eco-desc" aria-live="polite">{ECO[sel].desc}</p>
      </div>
    </div>
  );
}

