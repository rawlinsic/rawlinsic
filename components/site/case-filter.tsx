"use client";
/* Projects index filters: service area, industry, state, in the works,
   before Rawlins. Starts from the URL (?area= ?industry= ?state=
   ?status=ongoing ?status=before-rawlins ?service=). */
import { useEffect, useMemo, useState } from "react";
import type React from "react";

export type CaseRow = { id: string; href: string; photo: string; title: string; who: string; status: string; tag: string; note?: string; areas: string[]; services: string[]; industries: string[]; states: string[] };
type Opt = { value: string; label: string; color?: string };

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
      {/* redesigned Nov 13 (Nicole: "needs a better design"): one panel; the status switch with the count beside it, then a
          row for each way to browse. The words are unchanged. */}
      <div className="pg-filter pf2" role="group" aria-label="Filter projects">
        <div className="pf2-top">
          <div className="pf2-seg">
            {btn("all", "", "All")}
            {btn("status", "ongoing", "In the works")}
            {btn("status", "before-rawlins", "Before Rawlins")}
          </div>
          <p className="pg-count pf2-count" aria-live="polite">{svcLabel ? `${svcLabel}: ` : ""}<b>{list.length}</b> {list.length === 1 ? "project" : "projects"}</p>
        </div>
        <div className="pf2-row">
          <p className="pg-filter-label">By service area</p>
          <div className="pf2-chips">{areas.map((a) => <span key={a.value} className="pf2-area" style={a.color ? ({ ["--dot" as string]: a.color } as React.CSSProperties) : undefined}>{btn("area", a.value, a.label)}</span>)}</div>
        </div>
        <div className="pf2-row">
          <p className="pg-filter-label">By industry</p>
          <div className="pf2-chips">{industries.map((a) => btn("industry", a.value, a.label))}</div>
        </div>
        {/* By state is off (Nicole, Nov 10); ?state= links still filter */}
      </div>
      <ul className="pg-cases">
        {list.map((c) => (
          <li key={c.id}>
            <a href={c.href} className="pg-case has-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.photo} alt="" loading="lazy" />
              <span className="pg-case-k">{c.tag}</span>
              <b>{c.title}</b>
              <span>{c.who}</span>
              {c.note && <em className="pg-dev">{c.note}</em>}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
