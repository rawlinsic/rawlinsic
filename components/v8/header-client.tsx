"use client";
/* Header: logo, five menus, search, Get in touch. Desktop menus open on
   hover or click (Escape closes). Phones get a full-screen menu with
   search at the top. Every area carries its own color. The menus show real
   content with pictures that mean something: area photos, projects, the
   latest items, and our people (full site pass, Part 1, 1; Part 4, 3). */
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

type Link = { label: string; href: string; note?: string };
type Hit = { label: string; kind: string; href: string };
type Card = { title: string; who: string; href: string; photo: string; status: string; live: boolean; note?: string };
type Line = { k?: string; t: string };
export type NavData = {
  areas: { id: string; n: string; name: string; tag: string; href: string; color: string; ink: string; tint: string; photo: string; pos?: string; services: { name: string; href: string; q?: string; child?: boolean }[]; projects: string }[];
  industries: { name: string; href: string; who: string; head?: boolean; child?: boolean; subs: { name: string; href: string }[]; challenges: string[]; feature?: Card; projects: { title: string; href: string }[]; all: { label: string; href: string } }[];
  intl?: { name: string; href: string; note: string };
  work: Link[]; inWorks: Card[];
  insights: (Link & { photo: string; line?: Line; next?: Line & { ends?: string } })[];
  about: Link[]; faces: { name: string; photo: string }[]; facesLine: string; search: Hit[];
};
type Menu = "what" | "who" | "work" | "insights" | "about" | null;

const MENUS: [Exclude<Menu, null>, string][] = [["what", "What We Do"], ["who", "Who We Work With"], ["work", "Our Work"], ["insights", "Insights"], ["about", "About"]];

function useSearch(data: NavData["search"], q: string) {
  const [people, setPeople] = useState<Hit[]>([]);
  useEffect(() => {
    if (q.trim().length < 2 || people.length) return;
    fetch("/people-index.json").then((r) => r.json()).then(setPeople).catch(() => {});
  }, [q, people.length]);
  return useMemo(() => {
    const s = q.trim().toLowerCase();
    if (s.length < 2) return [];
    return [...data, ...people].filter((h) => `${h.label} ${h.kind}`.toLowerCase().includes(s)).slice(0, 10);
  }, [q, data, people]);
}

/* A project as a photo card: photo, status, title, client line */
function ProjectCard({ c }: { c: Card }) {
  return (
    <a className="mx-card" href={c.href}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={c.photo} alt="" loading="lazy" />
      <span className={`mx-dot${c.live ? " is-live" : ""}`}>{c.status}</span>
      <b>{c.title}</b>
      <span>{c.who}</span>
      {c.note && <em className="pg-dev">{c.note}</em>}
    </a>
  );
}

export default function HeaderClient({ data, aboutTopOnly = false }: { data: NavData; aboutTopOnly?: boolean }) {
  const [open, setOpen] = useState<Menu>(null);
  /* opens on the first sector under a headline (Transportation Sector), as it did before the headlines (Nov 12) */
  const [ind, setInd] = useState(() => Math.max(0, data.industries.findIndex((x) => x.child)));
  const [sheet, setSheet] = useState(false);
  const [find, setFind] = useState(false);
  const [q, setQ] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const openedAt = useRef(0);
  const bar = useRef<HTMLDivElement>(null);
  const hits = useSearch(data.search, q);
  /* News & recognition: "Next: <event>" until the day after it ends (Pacific), then the newest post */
  const [today, setToday] = useState<number | null>(null);
  useEffect(() => { setToday(Date.now()); }, []);
  const upcoming = (ends?: string) => {
    if (!ends || today === null) return true;
    const [y, m, d] = ends.split("-").map(Number);
    return today < Date.UTC(y, m - 1, d + 1, 8);
  };
  const lineOf = (l: NavData["insights"][number]) => (l.next && upcoming(l.next.ends) ? l.next : l.line);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const close = useCallback(() => { setOpen(null); setFind(false); setSheet(false); setQ(""); }, []);
  useEffect(() => {
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") { const m = open; close(); if (m) document.getElementById(`hx-b-${m}`)?.focus(); } };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [open, close]);
  useEffect(() => {
    const lock = sheet || find;
    document.documentElement.style.overflow = lock ? "hidden" : "";
    if (lock) requestAnimationFrame(() => document.querySelector<HTMLInputElement>(".hx-find input, .hx-sheet input")?.focus());
  }, [sheet, find]);

  const show = (m: Menu) => { if (m !== open) openedAt.current = Date.now(); setOpen(m); };
  const hoverOpen = (m: Menu) => { window.clearTimeout(timer.current); timer.current = window.setTimeout(() => show(m), 90); };
  /* a click right after hover-open keeps the menu open (it used to close it) */
  const toggle = (m: Menu) => { window.clearTimeout(timer.current); if (open === m && Date.now() - openedAt.current > 500) setOpen(null); else show(m); };
  const hoverClose = () => { window.clearTimeout(timer.current); timer.current = window.setTimeout(() => setOpen(null), 160); };
  /* Review comments on menu items (Nicole, Nov 12: "the comments disappear and you can't click them"). The pins and
     their cards are drawn outside the header, so moving the mouse onto one counted as leaving the menu: it closed
     and took the pin with it. A menu now stays open while the mouse is on a pin or a comment card, and while a
     card is open (being read or written). It closes as before once the mouse is somewhere else. */
  const onTool = (t: EventTarget | null) => t instanceof Element && !!t.closest(".pc-pin, .pc-pop");
  const cardOpen = () => !!document.querySelector(".pc-pop");
  const leave = (e: { relatedTarget: EventTarget | null }) => { if (onTool(e.relatedTarget) || cardOpen()) { window.clearTimeout(timer.current); return; } hoverClose(); };
  useEffect(() => {
    if (!open) return;
    const over = (e: MouseEvent) => {
      const t = e.target instanceof Element ? e.target : null;
      if (!t || t.closest("header.hx")) return; // inside the header: its own handlers decide
      if (onTool(t) || cardOpen()) { window.clearTimeout(timer.current); return; }
      window.clearTimeout(timer.current); timer.current = window.setTimeout(() => setOpen(null), 160);
    };
    document.addEventListener("mouseover", over);
    return () => document.removeEventListener("mouseover", over);
  }, [open]);

  const results = (
    <div className="hx-results" aria-live="polite">
      {q.trim().length >= 2 && (hits.length
        ? <ul>{hits.map((h, i) => <li key={h.href + i}><a href={h.href}><b>{h.label}</b><span>{h.kind}</span></a></li>)}</ul>
        : <p>No matches. Try a service, an industry, a state, or a name.</p>)}
    </div>
  );

  return (
    <header className={`hx${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`} onMouseLeave={leave}>
      <div className="hx-bar" ref={bar}>
        <a href="/" className="hx-logo" aria-label="Rawlins home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/pages/rawlinslogo-blue-wordmark.png" alt="Rawlins" width={132} height={32} />
        </a>
        <nav className="hx-nav" aria-label="Main">
          <ul>
            {MENUS.map(([m, label]) => (
              <li key={m}>
                {m === "about" && aboutTopOnly
                  ? <span className="hx-top-only">{label}</span>
                  : <button type="button" id={`hx-b-${m}`} aria-expanded={open === m} aria-controls={`hx-m-${m}`}
                    onMouseEnter={() => hoverOpen(m)} onClick={() => toggle(m)}>{label}</button>}
              </li>
            ))}
          </ul>
        </nav>
        <button type="button" className="hx-icon" aria-label="Search" onClick={() => { setOpen(null); setFind(true); }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
        </button>
        <a href="/contact" className="hx-cta">Get In Touch</a>
        <button type="button" className="hx-burger" aria-expanded={sheet} aria-controls="hx-sheet" onClick={() => setSheet(true)}>Menu</button>
      </div>

      {/* desktop menus */}
      <div className="hx-panel" id="hx-m-what" hidden={open !== "what"} onMouseEnter={() => window.clearTimeout(timer.current)}>
        {/* the two links sit at the top of the panel (Nicole, Nov 11); sentence case is her call */}
        <p className="mx-foot mx-foot-top"><a href="/services">See all services</a><a href="/contact">Not sure where yours fits? Tell us what you&apos;re trying to fix</a></p>
        <div className="mx-what">
          {data.areas.map((a) => (
            <section key={a.id} style={{ ["--a" as string]: a.color, ["--a-ink" as string]: a.ink, ["--a-tint" as string]: a.tint } as CSSProperties}>
              {/* the photo opens the area too (Nicole, Nov 10) */}
              <a className="mx-area-phl" href={a.href} tabIndex={-1} aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="mx-area-ph" src={a.photo} alt="" loading="lazy" style={a.pos ? { objectPosition: a.pos } : undefined} />
              </a>
              {/* no line under the name (Nicole, Nov 11) */}
              <a className="mx-area" href={a.href}><b>{a.name}</b></a>
              <ul>{a.services.map((s) => <li key={s.href} className={s.child ? "is-child" : undefined}><a href={s.href}>{s.name}</a>{s.q && <span className="mx-q" title={s.q} tabIndex={0} aria-label={s.q}>?</span>}</li>)}</ul>
              <a className="mx-go" href={a.projects}>Projects in This Area</a>
            </section>
          ))}
        </div>
      </div>
      <div className="hx-panel" id="hx-m-who" hidden={open !== "who"} onMouseEnter={() => window.clearTimeout(timer.current)}>
        {/* at the top, like What We Do and Insights (Nicole, Nov 12) */}
        <p className="mx-foot mx-foot-top"><a href="/industries">All Industries</a></p>
        <div className="mx-who">
          <ul className="mx-inds">
            {data.industries.map((x, i) => (
              <li key={x.href} className={x.head ? "mx-head" : x.child ? "mx-child" : undefined}><a href={x.href} onMouseEnter={() => setInd(i)} onFocus={() => setInd(i)} aria-current={ind === i ? "true" : undefined}><b>{x.name}</b>{x.who && <span>{x.who}</span>}</a></li>
            ))}
            {data.intl && <li className="mx-intl"><a href={data.intl.href}><b>{data.intl.name}</b></a>{data.intl.note && <em className="v8-dev">{data.intl.note}</em>}</li>}
          </ul>
          <div className="mx-subs">
            {data.industries[ind].subs.length > 0 ? <>
              <p className="mx-k">MODES</p>
              <ul>{data.industries[ind].subs.map((s) => <li key={s.href}><a href={s.href}>{s.name}</a></li>)}</ul>
            </> : data.industries[ind].challenges.length > 0 && <>
              <p className="mx-k">Challenges We Hear</p>
              <ul className="mx-hear">{data.industries[ind].challenges.map((c) => <li key={c}>{c}</li>)}</ul>
            </>}
          </div>
          <div className="mx-feat">
            {data.industries[ind].feature && <><p className="mx-k">Relevant Projects</p><ProjectCard c={data.industries[ind].feature!} /></>}
            {data.industries[ind].projects.length > 0 && (
              <ul className="mx-plinks">{data.industries[ind].projects.map((p) => <li key={p.href}><a href={p.href}>{p.title}</a></li>)}</ul>
            )}
            <a className="mx-go" href={data.industries[ind].all.href}>{data.industries[ind].all.label}</a>
          </div>
        </div>
      </div>
      <div className="hx-panel" id="hx-m-work" hidden={open !== "work"} onMouseEnter={() => window.clearTimeout(timer.current)}>
        <div className="mx-list mx-work">
          <div>
            <ul>{data.work.map((l) => <li key={l.href}><a href={l.href}><b>{l.label}</b><span>{l.note}</span></a></li>)}</ul>
            <p className="mx-k mx-k-gap">Browse by Area</p>
            <ul className="mx-chips">{data.areas.map((a) => <li key={a.id}><a href={a.projects} style={{ ["--a" as string]: a.color } as CSSProperties}><i aria-hidden="true" />{a.name}</a></li>)}</ul>
          </div>
          <div>
            <p className="mx-k">featured projects</p>
            <ul className="mx-live">{data.inWorks.map((c) => (
              <li key={c.href}><a className="mx-proj" href={c.href}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.photo} alt="" loading="lazy" />
                <span><b>{c.title}</b><span>{c.who}</span><small className={`mx-dot${c.live ? " is-live" : ""}`}>{c.status}</small>{c.note && <em className="pg-dev">{c.note}</em>}</span>
              </a></li>
            ))}</ul>
            <a className="mx-go" href="/insights/case-studies">View All Projects</a>
          </div>
        </div>
      </div>
      <div className="hx-panel" id="hx-m-insights" hidden={open !== "insights"} onMouseEnter={() => window.clearTimeout(timer.current)}>
        {/* the Insights page itself (Nicole, Nov 10: "where is the insights page in the menu?"); at the top since Nov 11 */}
        <p className="mx-foot mx-foot-top"><a href="/insights">All Insights</a></p>
        <ul className="mx-ins">{data.insights.map((l) => {
          const line = lineOf(l);
          return (
            <li key={l.href}><a href={l.href}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={l.photo} alt="" loading="lazy" />
              <b>{l.label}</b>
              {line && <span>{line.k && <em>{line.k}</em>}{line.t}</span>}
            </a></li>
          );
        })}</ul>
      </div>
      {!aboutTopOnly && <div className="hx-panel" id="hx-m-about" hidden={open !== "about"} onMouseEnter={() => window.clearTimeout(timer.current)}>
        {/* About (Nicole, Nov 10): Who we are as a photo card, then the other pages as plain links, the same
            style as the other menus (no icons, no faces panel) */}
        <div className="mx-list mx-about ma2">
          {data.about[0] && (
            <a className="ma-feature" href={data.about[0].href}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/pages/team-group-outdoor.webp" alt="" loading="lazy" />
              <span><em>how we've grown</em><b>{data.about[0].label}</b>{data.about[0].note && <span>{data.about[0].note}</span>}<i>Our Story</i></span>
            </a>
          )}
          {/* no descriptions under the items (Nicole, Nov 11): a line shows only where one is written in header.tsx */}
          <ul>{data.about.slice(1).map((l) => <li key={l.href}><a href={l.href}><b>{l.label}</b>{l.note && <span>{l.note}</span>}</a></li>)}</ul>
        </div>
      </div>}

      {/* search */}
      {find && (
        <div className="hx-find" role="dialog" aria-modal="true" aria-label="Search">
          <div className="hx-find-in">
            <label className="hx-q"><span className="sr-only">Search services, industries, projects, and people</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
              <input type="search" placeholder="Search services, industries, projects, people" value={q} onChange={(e) => setQ(e.target.value)} />
            </label>
            <button type="button" className="hx-x" onClick={close}>Close</button>
            {results}
          </div>
        </div>
      )}

      {/* phone menu */}
      {sheet && (
        <div className="hx-sheet" id="hx-sheet" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="hx-sheet-top">
            <a href="/" className="hx-logo" aria-label="Rawlins home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/pages/rawlinslogo-blue-wordmark.png" alt="Rawlins" width={120} height={29} />
            </a>
            <button type="button" className="hx-x" onClick={close}>Close</button>
          </div>
          <label className="hx-q"><span className="sr-only">Search</span><input type="search" placeholder="Search" value={q} onChange={(e) => setQ(e.target.value)} /></label>
          {q.trim().length >= 2 ? results : (
            <div className="hx-acc">
              <details open>
                <summary>What We Do</summary>
                <ul className="hx-areas">{data.areas.map((a) => (
                  <li key={a.id} style={{ ["--a" as string]: a.color, ["--a-ink" as string]: a.ink } as CSSProperties}>
                    <details><summary>{a.name}</summary>
                      <ul><li><a href={a.href}>{a.name} Overview</a></li>{a.services.map((s) => <li key={s.href} className={s.child ? "is-child" : undefined}><a href={s.href}>{s.name}</a>{s.q && <span className="mx-q" title={s.q} aria-label={s.q}>?</span>}</li>)}<li><a href={a.projects}>Projects in This Area</a></li></ul>
                    </details>
                  </li>
                ))}</ul>
              </details>
              <details><summary>Who We Work With</summary><ul>{data.industries.map((x) => {
                const projects = [...(x.feature ? [{ title: x.feature.title, href: x.feature.href, photo: x.feature.photo }] : []), ...x.projects];
                return (
                  <li key={x.href} className={x.head ? "mx-head" : x.child ? "mx-child" : undefined}>
                    <a href={x.href}>{x.name}</a>
                    {x.subs.length > 0 && <ul>{x.subs.map((s) => <li key={s.href}><a href={s.href}>{s.name}</a></li>)}</ul>}
                    {projects.length > 0 && <><p className="mx-k">Relevant Projects</p><ul className="mx-projs">{projects.map((p) => <li key={p.href}><a className={"photo" in p ? "mx-proj" : undefined} href={p.href}>{/* eslint-disable-next-line @next/next/no-img-element */}{"photo" in p && <img src={p.photo} alt="" loading="lazy" />}<span>{p.title}</span></a></li>)}</ul></>}
                  </li>
                );
              })}{data.intl && <li><a href={data.intl.href}>{data.intl.name}</a><em className="v8-dev">{data.intl.note}</em></li>}</ul></details>
              <details><summary>Our Work</summary><ul>{data.work.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}</ul></details>
              <details><summary>Insights</summary><ul>{data.insights.map((l) => <li key={l.href}><a className="hx-noted" href={l.href}>{l.label}<span>{l.note}</span></a></li>)}</ul></details>
              {aboutTopOnly ? <p className="hx-acc-top">About</p> : <details><summary>About</summary><ul>{data.about.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}</ul></details>}
            </div>
          )}
          <a href="/contact" className="hx-cta hx-cta-big">Get In Touch</a>
        </div>
      )}
    </header>
  );
}
