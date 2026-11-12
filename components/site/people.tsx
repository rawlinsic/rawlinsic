"use client";
/* Our People: flat, remote firm. Three groups by kind of work, each one a bar
   that opens to show its people (Nicole, Nov 11). Two filters, "Filter by
   area" and "Filter by role" (Advisors, Specialists, Business Operations), plus search.
   Photos are circles. A card opens the person's bio in a window; clicking
   outside the window closes it. A former agency role sits in the bio above the
   background text, under "Before Rawlins". No tiers.
   Source: lib/team-data.ts (the live roster). */
import { useEffect, useMemo, useRef, useState } from "react";

export type Person = {
  slug: string; name: string; photo: string; role: string; /* the roster role alone, for the role filter */ job?: string; group: "Advisors" | "Specialists" | "Business Operations";
  areas: string[]; formerly?: string; location?: string; email?: string; phone?: string; linkedin?: string; background: string; achievements: string;
};
type Opt = { value: string; label: string };

const GROUP_TEXT: Record<Person["group"], string> = {
  Advisors: "",
  Specialists: "",
  "Business Operations": "",
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
          {p.location && <p className="pp-loc"><Pin />Located in {p.location}</p>}
          <p className="pp-contact">
            {p.email && <a href={`mailto:${p.email}`}>{p.email}</a>}
            {p.phone && <a href={`tel:${p.phone.replace(/[^\d+]/g, "")}`}>{p.phone}</a>}
            {/* the LinkedIn icon in place of the word (Nicole, Nov 12) */}
            {p.linkedin && <a className="pp-in" href={p.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} on LinkedIn`}><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.6 8.65 21 11.2 21 14.4V21h-4v-5.8c0-1.38-.03-3.16-1.93-3.16-1.93 0-2.22 1.5-2.22 3.06V21H9z" /></svg></a>}
          </p>
        </div>
      </div>
      <div className="pp-bio">
        {/* the former agency role: not under the current title, but leading into the bio (Nicole, Nov 11) */}
        {p.formerly && <p className="pp-before"><span>Before Rawlins</span>{p.formerly.replace(/^Former\s+/, "").replace(/^./, (c) => c.toUpperCase())}</p>}
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

const GROUPS = ["Advisors", "Specialists", "Business Operations"] as const;

export default function PeopleDirectory({ people, areas, showDev }: { people: Person[]; areas: Opt[]; showDev: boolean }) {
  const [area, setArea] = useState("");
  const [role, setRole] = useState("");
  const [q, setQ] = useState("");
  const [shown, setShown] = useState<Record<string, boolean>>({});
  const [open, setOpen] = useState<Person | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);

  /* a link to one person (#their-name) opens their group and their bio */
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) { const p = people.find((x) => x.slug === id); if (p) { setShown((o) => ({ ...o, [p.group]: true })); setOpen(p); } }
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
    return people.filter((p) => (!area || p.areas.includes(area)) && (!role || p.group === role) && (!s || `${p.name} ${p.role} ${p.formerly ?? ""} ${p.background}`.toLowerCase().includes(s)));
  }, [people, area, role, q]); // eslint-disable-line react-hooks/exhaustive-deps
  const filtering = !!(area || role || q.trim());
  const close = () => { setOpen(null); window.history.replaceState(null, "", window.location.pathname); };

  return (
    <div>
      <div className="pp-tools pp3-tools">
        <label className="pg-search">
          <span className="sr-only">Search people</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
          <input type="search" placeholder="Search by name, role, or experience" value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
        <div className="pp3-filters">
          <div className="pp3-filter">
            <p className="pp3-label" id="pp-f-area">Filter by area</p>
            <div className="pg-filter" role="group" aria-labelledby="pp-f-area">
              <button type="button" aria-pressed={!area} onClick={() => setArea("")}>All areas</button>
              {areas.map((a) => <button key={a.value} type="button" aria-pressed={area === a.value} onClick={() => setArea(a.value)}>{a.label}</button>)}
            </div>
          </div>
          <div className="pp3-filter">
            <label className="pp3-label" htmlFor="pp-f-role">Filter by role</label>
            <span className="pp3-select">
              <select id="pp-f-role" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">All roles</option>
                {/* only the three groups (Nicole, Nov 12), not each job title */}
                {GROUPS.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </span>
          </div>
        </div>
      </div>
      {filtering && list.length === 0 && <p className="pp3-none" aria-live="polite">No one matches those filters. <button type="button" onClick={() => { setArea(""); setRole(""); setQ(""); }}>Clear filters</button></p>}
      {GROUPS.map((g) => {
        const group = list.filter((p) => p.group === g);
        if (!group.length) return null;
        /* a group opens from its bar; while a filter or search is on, every group with a match is open */
        const isOpen = filtering || !!shown[g];
        const id = `pp-${g.replace(/\s+/g, "-").toLowerCase()}`;
        return (
          <section key={g} className={`pp-group pp3-group${isOpen ? " is-open" : ""}`} aria-labelledby={`${id}-h`}>
            <h2 id={`${id}-h`} className="pp3-h">
              <button type="button" className="pp3-bar" aria-expanded={isOpen} aria-controls={`${id}-list`} disabled={filtering} onClick={() => setShown((o) => ({ ...o, [g]: !o[g] }))}>
                <span className="pp3-name">{g}</span>
                <span className="pp2-count">{group.length}</span>
                {!isOpen && (
                  <span className="pp3-faces" aria-hidden="true">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {group.slice(0, 7).map((p) => <img key={p.slug} src={p.photo} alt="" width={44} height={44} loading="lazy" />)}
                    {group.length > 7 && <i>+{group.length - 7}</i>}
                  </span>
                )}
                {!filtering && <span className="pp3-toggle">{isOpen ? "Hide" : "Show all"}</span>}
              </button>
            </h2>
            {GROUP_TEXT[g] && isOpen && <p className="pp-group-text">{GROUP_TEXT[g]}</p>}
            <ul id={`${id}-list`} className="pp-grid pp3-grid" hidden={!isOpen}>
              {group.map((p) => (
                <li key={p.slug} id={p.slug}>
                  <button type="button" className="pp-card pp3" onClick={() => { setOpen(p); window.history.replaceState(null, "", `#${p.slug}`); }}>
                    <span className="pp3-ph">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.photo} alt="" width={240} height={240} loading="lazy" />
                    </span>
                    <b>{p.name}</b>
                    <span className="pp-role">{p.role}</span>
                    {p.location && <span className="pp-loc"><Pin />{p.location}</span>}
                    {p.areas.length > 0 && <span className="pp-tags">{p.areas.slice(0, 3).map((a) => <i key={a}>{areas.find((x) => x.value === a)?.label}</i>)}</span>}
                    <span className="pp3-more">Read bio</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
      {/* clicking outside the window closes it, as well as the x (Nicole, Nov 11) */}
      <dialog ref={dlg} className="pp-dialog" data-lenis-prevent onClose={close} onClick={(e) => { if (e.target === dlg.current) close(); }} aria-labelledby="pp-name">
        {open && (
          <div className="pp-dialog-in">
            <button type="button" className="pp-close" onClick={() => setOpen(null)} aria-label="Close profile">×</button>
            <ProfileBody p={open} showDev={showDev} />
          </div>
        )}
      </dialog>
      {/* the "Titles pending" preview note was removed by Nicole (preview edit, Nov 12) */}
    </div>
  );
}
