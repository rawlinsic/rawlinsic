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
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { ProfileBody, holdPage, type Person } from "@/components/site/people";
import { AamScene } from "@/components/site/aam-scene";

/* ── Integrate the next layer of your transportation system ── */
/* The current site's map (Nicole, Nov 10: "we need to see the map and what that meant"): its drawn
   places and icons, in our colors. Places and routes sit where the current site has them (0 0 1000 660).
   Each name sits just above or below its icon, clear of the drawings and of the other names. */
const ICONS: Record<string, string> = {
  helicopter: '<g transform="scale(0.9) translate(2,2)"><path d="M4 12h3l2-4h6l2 4h3" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="12" cy="12" r="2.5" fill="currentColor" opacity="0.8"/><line x1="3" y1="8" x2="21" y2="8" stroke="currentColor" stroke-width="1" opacity="0.6"/><line x1="12" y1="8" x2="12" y2="9.5" stroke="currentColor" stroke-width="1"/><line x1="10" y1="14.5" x2="8" y2="18" stroke="currentColor" stroke-width="1"/><line x1="14" y1="14.5" x2="16" y2="18" stroke="currentColor" stroke-width="1"/></g>',
  package: '<g><rect x="5" y="8" width="14" height="12" rx="1" stroke="currentColor" stroke-width="1.5" fill="none"/><line x1="5" y1="13" x2="19" y2="13" stroke="currentColor" stroke-width="1" opacity="0.5"/><line x1="12" y1="8" x2="12" y2="20" stroke="currentColor" stroke-width="1" opacity="0.5"/><path d="M8 4L12 2L16 4" stroke="currentColor" stroke-width="1.5" fill="none"/><line x1="12" y1="2" x2="12" y2="8" stroke="currentColor" stroke-width="1"/></g>',
  residential: '<g><path d="M3 12L12 4l9 8" stroke="currentColor" stroke-width="1.5" fill="none"/><rect x="6" y="12" width="12" height="8" stroke="currentColor" stroke-width="1.2" fill="none"/><rect x="10" y="15" width="4" height="5" stroke="currentColor" stroke-width="1" fill="none"/></g>',
  medical: '<g><rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" stroke-width="1.5" fill="none"/><line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" stroke-width="2.5"/><line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" stroke-width="2.5"/></g>',
  rural: '<g><path d="M2 20L12 6l10 14" stroke="currentColor" stroke-width="1.2" fill="none"/><line x1="18" y1="20" x2="18" y2="10" stroke="currentColor" stroke-width="1.2"/><line x1="16" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="1"/><circle cx="8" cy="16" r="1" fill="currentColor" opacity="0.5"/></g>',
  city: '<g><rect x="2" y="10" width="5" height="11" stroke="currentColor" stroke-width="1" fill="none"/><rect x="8" y="4" width="5" height="17" stroke="currentColor" stroke-width="1" fill="none"/><rect x="14" y="7" width="5" height="14" stroke="currentColor" stroke-width="1" fill="none"/><rect x="20" y="12" width="3" height="9" stroke="currentColor" stroke-width="0.8" fill="none"/></g>',
};

const NODES = [
  { id: "urban-air-taxi", label: "Passenger aircraft", icon: "helicopter", x: 174.83, y: 121.83, lx: 174.83, ly: 70, desc: "Electric vertical takeoff and landing (eVTOL) aircraft providing on-demand urban and regional passenger transport." },
  { id: "package-delivery", label: "Package Delivery", icon: "package", x: 192.74, y: 418.69, lx: 192.74, ly: 470, desc: "Automated drone logistics for last-mile and middle-mile package delivery across urban and suburban areas." },
  { id: "residential", label: "Residential Areas", icon: "residential", x: 491.83, y: 146.83, lx: 491.83, ly: 95, desc: "Suburban and residential communities served by drone delivery, passenger aircraft connections, and emergency response drones." },
  { id: "medical", label: "Medical Supplies", icon: "medical", x: 487.76, y: 362.72, lx: 487.76, ly: 311, desc: "Time-critical medical supply delivery including lab samples, medications, vaccines, and emergency equipment." },
  { id: "rural", label: "Rural & Agriculture", icon: "rural", x: 773.2, y: 132.58, lx: 773.2, ly: 81, desc: "Agricultural monitoring, crop spraying, rural delivery services, and environmental data collection for remote areas." },
  { id: "city-center", label: "City Center", icon: "city", x: 702, y: 377.09, lx: 702, ly: 325, desc: "Dense urban cores integrating vertiport networks, drone corridors, and multimodal transit connections." },
];
/* two route kinds: people and cargo (package and medical deliveries are one kind) */
type Kind = "air" | "delivery";
const PATHS: [string, string, Kind][] = [
  ["urban-air-taxi", "residential", "air"], ["urban-air-taxi", "rural", "air"], ["residential", "rural", "air"], ["residential", "city-center", "air"], ["urban-air-taxi", "city-center", "air"],
  ["package-delivery", "residential", "delivery"], ["package-delivery", "medical", "delivery"], ["package-delivery", "city-center", "delivery"], ["package-delivery", "rural", "delivery"],
  ["medical", "residential", "delivery"], ["medical", "city-center", "delivery"], ["medical", "rural", "delivery"],
];
const ROUTE: Record<Kind, string> = { air: "People movement", delivery: "Cargo movement" };
const W = 1000, H = 660;
const at = (id: string) => NODES.find((n) => n.id === id)!;
/* the current site's sweeping routes */
const arc = (a: string, b: string) => {
  const p = at(a), q = at(b), mx = (p.x + q.x) / 2, my = (p.y + q.y) / 2, k = `${a}>${b}`;
  const c: Record<string, [number, number]> = {
    "urban-air-taxi>rural": [mx, -50], "urban-air-taxi>residential": [mx, -20], "urban-air-taxi>city-center": [mx - 40, my - 60],
    "residential>rural": [mx, -30], "residential>city-center": [mx + 20, my - 30], "package-delivery>residential": [mx - 60, my - 40],
    "package-delivery>rural": [mx, my - 80], "package-delivery>city-center": [mx - 20, my + 30], "medical>residential": [mx - 30, my - 40],
    "medical>rural": [mx + 20, my - 50],
  };
  const [cx, cy] = c[k] ?? [mx - (q.y - p.y) * 0.12, my + (q.x - p.x) * 0.12];
  return `M ${p.x} ${p.y} Q ${cx} ${cy} ${q.x} ${q.y}`;
};
const pct = (x: number, y: number): CSSProperties => ({ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` });

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
            <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
              <AamScene on={sel} />
              {PATHS.map(([a, b, k], i) => {
                const on = sel === a || sel === b;
                return (
                  <g key={i} className={`av-route is-${k}${on ? " is-on" : ""}`}>
                    <path d={arc(a, b)} />
                    {on && <circle r="5"><animateMotion dur={`${2.6 + (i % 3) * 0.5}s`} repeatCount="indefinite" path={arc(a, b)} /></circle>}
                  </g>
                );
              })}
            </svg>
            {NODES.map((n) => (
              <button key={n.id} type="button" className="av-place" aria-pressed={sel === n.id} aria-label={n.label} onClick={() => setSel(n.id)} style={pct(n.x, n.y)}>
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" dangerouslySetInnerHTML={{ __html: ICONS[n.icon] }} />
              </button>
            ))}
            {NODES.map((n) => (
              <span key={n.id} className={`av-place-label${sel === n.id ? " is-on" : ""}`} style={pct(n.lx, n.ly)} onClick={() => setSel(n.id)} aria-hidden="true">{n.label}</span>
            ))}
          </div>
          <div className="av-map-side">
            <div className="av-map-card" aria-live="polite">
              <h3>{node.label}</h3>
              <p>{node.desc}</p>
            </div>
            <ul className="av-legend">
              {(Object.keys(ROUTE) as Kind[]).map((k) => <li key={k} className={`is-${k}`}><i aria-hidden="true" />{ROUTE[k]}</li>)}
            </ul>
            <p className="av-map-hint">Pick an icon on the map to see its routes.</p>
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
export type TeamCard = { name: string; title: string; formerly?: string; photo?: string; location?: string; href: string; person?: Person };
export function AviationTeam({ people, title = "Our aviation team", roles }: { people: TeamCard[]; title?: string; roles?: readonly (readonly [string, string])[] }) {
  /* a card opens that person's bio in a pop-up right here (Nicole, Nov 10); it's still a real link to Our people */
  const [open, setOpen] = useState<Person | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
    holdPage(!!open);
  }, [open]);
  const pick = (e: MouseEvent<HTMLAnchorElement>, p?: Person) => {
    if (!p || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    setOpen(p);
  };
  return (
    <>
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
              <a href={p.href} onClick={(e) => pick(e, p.person)} aria-haspopup={p.person ? "dialog" : undefined}>
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
    <dialog ref={dlg} className="pp-dialog" data-lenis-prevent onClose={() => setOpen(null)} onClick={(e) => { if (e.target === dlg.current) setOpen(null); }} aria-labelledby="pp-name">
      {open && (
        <div className="pp-dialog-in">
          <button type="button" className="pp-close" onClick={() => setOpen(null)} aria-label="Close profile">×</button>
          <ProfileBody p={open} />
        </div>
      )}
    </dialog>
    </>
  );
}
