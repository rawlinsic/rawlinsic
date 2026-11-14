"use client";
/* Projects index filters: service area, industry, state, in the works,
   before Rawlins. Starts from the URL (?area= ?industry= ?state=
   ?status=ongoing ?status=before-rawlins ?service=). */
import { useEffect, useMemo, useState } from "react";

export type CaseRow = { id: string; href: string; photo: string; title: string; who: string; status: string; tag: string; note?: string; areas: string[]; services: string[]; industries: string[]; states: string[] };
type Opt = { value: string; label: string; color?: string };

export default function CaseFilter({ rows, areas, industries, states, services }: { rows: CaseRow[]; areas: Opt[]; industries: Opt[]; states: Opt[]; services: Opt[] }) {
  /* Nov 13 (Nicole: "can we just have nice looking drop downs? this takes up too much space"): three dropdowns that work
     together (status, service area, industry), the count beside them. ?area= ?industry= ?status= ?service= ?state= links
     still filter. */
  const [f, setF] = useState<{ status: string; area: string; industry: string; service: string; state: string }>({ status: "", area: "", industry: "", service: "", state: "" });
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    setF({ status: q.get("status") ?? "", area: q.get("area") ?? "", industry: q.get("industry") ?? "", service: q.get("service") ?? "", state: q.get("state") ?? "" });
  }, []);
  const set = (k: keyof typeof f, v: string) => {
    const next = { ...f, [k]: v };
    setF(next);
    const url = new URL(window.location.href);
    const q = new URLSearchParams();
    (Object.keys(next) as (keyof typeof f)[]).forEach((key) => { if (next[key]) q.set(key, next[key]); });
    url.search = q.toString() ? `?${q}` : "";
    window.history.replaceState(null, "", url);
  };
  const list = useMemo(() => rows.filter((r) =>
    (!f.status || (f.status === "before-rawlins" ? r.status === "Before Rawlins" : r.status === "Ongoing"))
    && (!f.area || r.areas.includes(f.area))
    && (!f.industry || r.industries.includes(f.industry))
    && (!f.service || r.services.includes(f.service))
    && (!f.state || r.states.includes(f.state))), [rows, f]);
  const svcLabel = f.service ? services.find((s) => s.value === f.service)?.label : null;
  const stLabel = f.state ? states.find((s) => s.value === f.state)?.label : null;
  const sel = (k: "status" | "area" | "industry", label: string, opts: Opt[]) => (
    <label className={`pf3-sel${f[k] ? " is-on" : ""}`}>
      <span className="sr-only">{label}</span>
      <select value={f[k]} onChange={(e) => set(k, e.target.value)}>
        <option value="">{label}</option>
        {opts.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </label>
  );
  return (
    <div>
      <div className="pf3" role="group" aria-label="Filter projects">
        {sel("status", "All", [{ value: "ongoing", label: "In the works" }, { value: "before-rawlins", label: "Before Rawlins" }])}
        {sel("area", "By service area", areas)}
        {sel("industry", "By industry", industries)}
        {(svcLabel || stLabel) && (
          <button type="button" className="pf3-clear" onClick={() => { set("service", ""); setF((x) => ({ ...x, service: "", state: "" })); }}>{svcLabel ?? stLabel} ×</button>
        )}
        <p className="pg-count pf3-count" aria-live="polite"><b>{list.length}</b> {list.length === 1 ? "project" : "projects"}</p>
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
