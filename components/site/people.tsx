"use client";
/* Our People: flat, remote firm. Grouped by kind of work, filters by service
   area, search, and a profile with the person's bio. Cards show the Rawlins
   title and location; a former agency role is in the profile. No tiers.
   Source: lib/team-data.ts (the live roster). */
import { useEffect, useMemo, useRef, useState } from "react";

export type Person = {
  slug: string; name: string; photo: string; role: string; group: "Advisors" | "Specialists" | "Business Operations";
  areas: string[]; formerly?: string; location?: string; email?: string; phone?: string; linkedin?: string; background: string; achievements: string;
};
type Opt = { value: string; label: string };

const GROUP_TEXT: Record<Person["group"], string> = {
  Advisors: "People who bring agency and industry experience: they've run the programs our clients run.",
  Specialists: "People who build and deliver: digital tools, automation, training and video, and design.",
  "Business Operations": "The people who keep Rawlins running.",
};

function Bio({ text }: { text: string }) {
  const blocks = text.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  return (
    <>
      {blocks.map((b, i) => {
        const lines = b.split("\n").map((l) => l.trim()).filter(Boolean);
        if (lines.every((l) => /^[-•]\s/.test(l))) return <ul key={i}>{lines.map((l) => <li key={l}>{l.replace(/^[-•]\s*/, "")}</li>)}</ul>;
        const intro = lines.filter((l) => !/^[-•]\s/.test(l)), items = lines.filter((l) => /^[-•]\s/.test(l));
        return (
          <div key={i}>
            {intro.map((l) => <p key={l}>{l}</p>)}
            {items.length > 0 && <ul>{items.map((l) => <li key={l}>{l.replace(/^[-•]\s*/, "")}</li>)}</ul>}
          </div>
        );
      })}
    </>
  );
}

/* A small map pin, as on the live site's profiles. */
export function Pin() {
  return <svg className="pp-pin" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>;
}

/* A person's profile (photo, titles, contact, bio). Used in the Our people
   window and in the pop-up on the home page. With no bio yet ("Coming soon!"),
   there's no background section; previews say a bio is needed (full site
   pass, Part 4, 1). */
export function ProfileBody({ p, showDev = false }: { p: Person; showDev?: boolean }) {
  return (
    <>
      <div className="pp-head">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.photo} alt={p.name} width={140} height={140} />
        <div>
          <h2 id="pp-name" className="pg-h2">{p.name}</h2>
          <p className="pp-role">{p.role}</p>
          {p.formerly && <p className="pp-formerly">{p.formerly}</p>}
          {p.location && <p className="pp-loc"><Pin />Located in {p.location}</p>}
          <p className="pp-contact">
            {p.email && <a href={`mailto:${p.email}`}>{p.email}</a>}
            {p.phone && <a href={`tel:${p.phone.replace(/[^\d+]/g, "")}`}>{p.phone}</a>}
            {p.linkedin && <a href={p.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
          </p>
        </div>
      </div>
      <div className="pp-bio">
        {p.background.trim() === "Coming soon!"
          ? (showDev ? <p className="pg-dev pg-dev-block">Placeholder: bio needed</p> : null)
          : <><h3 className="pg-h3">Background</h3><Bio text={p.background} /></>}
        {p.achievements && p.achievements.trim() !== "Coming soon!" && <><h3 className="pg-h3">Achievements</h3><Bio text={p.achievements} /></>}
      </div>
    </>
  );
}

/* While a profile window is open, the page behind it holds still. */
export function holdPage(on: boolean) {
  const l = (window as unknown as { __lenis?: { stop(): void; start(): void } }).__lenis;
  if (on) l?.stop(); else l?.start();
}

export default function PeopleDirectory({ people, areas, showDev }: { people: Person[]; areas: Opt[]; showDev: boolean }) {
  const [area, setArea] = useState("");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<Person | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) { const p = people.find((x) => x.slug === id); if (p) setOpen(p); }
  }, [people]);
  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
    holdPage(!!open);
  }, [open]);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return people.filter((p) => (!area || p.areas.includes(area)) && (!s || `${p.name} ${p.role} ${p.formerly ?? ""} ${p.background}`.toLowerCase().includes(s)));
  }, [people, area, q]);

  return (
    <div>
      <div className="pp-tools pp2-tools">
        <label className="pg-search">
          <span className="sr-only">Search people</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
          <input type="search" placeholder="Search by name, role, or experience" value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
        <div className="pg-filter" role="group" aria-label="Filter by service area">
          <button type="button" aria-pressed={!area} onClick={() => setArea("")}>Everyone</button>
          {areas.map((a) => <button key={a.value} type="button" aria-pressed={area === a.value} onClick={() => setArea(a.value)}>{a.label}</button>)}
        </div>
        <p className="pg-count" aria-live="polite">{list.length} {list.length === 1 ? "person" : "people"}</p>
      </div>
      {(["Advisors", "Specialists", "Business Operations"] as const).map((g) => {
        const group = list.filter((p) => p.group === g);
        if (!group.length) return null;
        return (
          <section key={g} className="pp-group" aria-labelledby={`pp-${g}`}>
            <h2 id={`pp-${g}`} className="pg-h2">{g} <span className="pp2-count">{group.length}</span></h2>
            <p className="pp-group-text">{GROUP_TEXT[g]}</p>
            <ul className="pp-grid">
              {group.map((p) => (
                <li key={p.slug} id={p.slug}>
                  <button type="button" className="pp-card pp2" onClick={() => { setOpen(p); window.history.replaceState(null, "", `#${p.slug}`); }}>
                    <span className="pp2-ph">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.photo} alt="" width={240} height={240} loading="lazy" />
                    </span>
                    <span className="pp2-body">
                      <b>{p.name}</b>
                      <span className="pp-role">{p.role}</span>
                      {p.location && <span className="pp-loc"><Pin />{p.location}</span>}
                      {p.areas.length > 0 && <span className="pp-tags">{p.areas.slice(0, 3).map((a) => <i key={a}>{areas.find((x) => x.value === a)?.label}</i>)}</span>}
                      <span className="pp2-more">Read bio</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
      <dialog ref={dlg} className="pp-dialog" data-lenis-prevent onClose={() => { setOpen(null); window.history.replaceState(null, "", window.location.pathname); }} aria-labelledby="pp-name">
        {open && (
          <div className="pp-dialog-in">
            <button type="button" className="pp-close" onClick={() => setOpen(null)} aria-label="Close profile">×</button>
            <ProfileBody p={open} showDev={showDev} />
          </div>
        )}
      </dialog>
      {showDev && <p className="pg-dev pg-dev-block">Titles pending: cards show current roles until Nicole and Scott approve a titles table. Groups (Advisors, Specialists, Business Operations) and area tags are drafted from the roster&apos;s roles and categories; confirm.</p>}
    </div>
  );
}
