"use client";
/* Projects index filters: service area, industry, state, in the works,
   before Rawlins. Starts from the URL (?area= ?industry= ?state=
   ?status=ongoing ?status=before-rawlins ?service=). */
import { useEffect, useMemo, useState } from "react";

export type CaseRow = { id: string; href: string; photo: string; title: string; who: string; status: string; tag: string; areas: string[]; services: string[]; industries: string[]; states: string[] };
type Opt = { value: string; label: string };

export default function CaseFilter({ rows, areas, industries, states, services }: { rows: CaseRow[]; areas: Opt[]; industries: Opt[]; states: Opt[]; services: Opt[] }) {
  const [f, setF] = useState<{ k: string; v: string }>({ k: "all", v: "" });
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    for (const k of ["area", "industry", "state", "status", "service"]) { const v = q.get(k); if (v) { setF({ k, v }); break; } }
  }, []);
  const set = (k: string, v: string) => {
    setF({ k, v });
    const url = new URL(window.location.href);
    url.search = k === "all" ? "" : `?${k}=${v}`;
    window.history.replaceState(null, "", url);
  };
  const list = useMemo(() => rows.filter((r) => {
    if (f.k === "area") return r.areas.includes(f.v);
    if (f.k === "industry") return r.industries.includes(f.v);
    if (f.k === "state") return r.states.includes(f.v);
    if (f.k === "status") return f.v === "before-rawlins" ? r.status === "Before Rawlins" : r.status === "Ongoing";
    if (f.k === "service") return r.services.includes(f.v);
    return true;
  }), [rows, f]);
  const btn = (k: string, v: string, label: string) => (
    <button key={k + v} type="button" aria-pressed={f.k === k && f.v === v} onClick={() => set(k, v)}>{label}</button>
  );
  const svcLabel = f.k === "service" ? services.find((s) => s.value === f.v)?.label : null;
  return (
    <div>
      <div className="pg-filter" role="group" aria-label="Filter projects">
        {btn("all", "", "All")}
        {btn("status", "ongoing", "In the works")}
        {btn("status", "before-rawlins", "Before Rawlins")}
        <p className="pg-filter-label">By service area</p>
        {areas.map((a) => btn("area", a.value, a.label))}
        <p className="pg-filter-label">By industry</p>
        {industries.map((a) => btn("industry", a.value, a.label))}
        <p className="pg-filter-label">By state</p>
        {states.map((a) => btn("state", a.value, a.label))}
      </div>
      <p className="pg-count" aria-live="polite">{svcLabel ? `${svcLabel}: ` : ""}{list.length} {list.length === 1 ? "project" : "projects"}</p>
      <ul className="pg-cases">
        {list.map((c) => (
          <li key={c.id}>
            <a href={c.href} className="pg-case has-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.photo} alt="" loading="lazy" />
              <span className="pg-case-k">{c.tag}</span>
              <b>{c.title}</b>
              <span>{c.who}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
