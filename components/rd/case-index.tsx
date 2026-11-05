"use client";
/* Case study index: the 13 new studies (filterable by line and
   industry) plus every existing state case study page, kept as-is
   (Nicole, 2026-11-04: not a replacement). */
import { useState } from "react";
import { LINES, INDUSTRIES, NEW_CASE_STUDIES, SERVICE_BY_ID, caseHref } from "@/lib/redesign-data";
import { CASE_STUDIES } from "@/components/case-studies-data";
import { Card, Grid } from "@/components/rd/ui";

export default function CaseIndex() {
  const [f, setF] = useState("all");
  const list = NEW_CASE_STUDIES.filter((c) =>
    f === "all" ? true
      : f.startsWith("ind-") ? c.industry === f.slice(4)
      : c.services.some((id) => SERVICE_BY_ID[id]?.line.id === f)
  );
  const chip = (id: string, label: string) => (
    <button key={id} type="button" className="rd-chip" aria-pressed={f === id} onClick={() => setF(id)}>{label}</button>
  );
  return (
    <>
      <div className="rd-chip-group">
        <h3>Service line</h3>
        <div className="rd-chips">{chip("all", "All")}{LINES.map((l) => chip(l.id, l.name))}</div>
      </div>
      <div className="rd-chip-group">
        <h3>Industry</h3>
        <div className="rd-chips">{INDUSTRIES.filter((i) => i.id !== "intl").map((i) => chip("ind-" + i.id, i.short))}</div>
      </div>
      <div style={{ marginTop: 32 }}>
        {list.length ? (
          <Grid>
            {list.map((c) => <Card key={c.id} href={caseHref(c)} image={c.image} meta={`${c.who} · ${c.status}`} title={c.title} />)}
          </Grid>
        ) : <p>No case study matches this filter yet.</p>}
      </div>
    </>
  );
}

export function ExistingCases() {
  return (
    <Grid>
      {CASE_STUDIES.map((c: any) => (
        <Card key={c.slug} href={`/insights/case-studies/${c.slug}`} image={c.image} meta={c.subtitle} title={c.title} />
      ))}
    </Grid>
  );
}
