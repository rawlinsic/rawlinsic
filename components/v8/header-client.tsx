"use client";
/* Header: logo, five menus, search, Get in touch. Desktop menus open on
   hover or click (Escape closes). Phones get a full-screen menu with
   search at the top. Every area carries its own color. */
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

type Link = { label: string; href: string; note?: string };
type Hit = { label: string; kind: string; href: string };
export type NavData = {
  areas: { id: string; n: string; name: string; tag: string; href: string; color: string; ink: string; tint: string; photo: string; services: { name: string; href: string }[] }[];
  industries: { name: string; href: string; who: string; photo: string; subs: { name: string; href: string }[]; projects: { title: string; href: string; photo?: string; before?: boolean }[] }[];
  work: Link[]; featured: { title: string; who: string; href: string; photo: string };
  insights: Link[]; about: Link[]; search: Hit[];
};
type Menu = "what" | "who" | "work" | "insights" | "about" | null;
const MENUS: [Exclude<Menu, null>, string][] = [["what", "What we do"], ["who", "Who we work with"], ["work", "Our work"], ["insights", "Insights"], ["about", "About"]];

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

export default function HeaderClient({ data }: { data: NavData }) {
  const [open, setOpen] = useState<Menu>(null);
  const [ind, setInd] = useState(0);
  const [sheet, setSheet] = useState(false);
  const [find, setFind] = useState(false);
  const [q, setQ] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const openedAt = useRef(0);
  const bar = useRef<HTMLDivElement>(null);
  const hits = useSearch(data.search, q);

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

  const results = (
    <div className="hx-results" aria-live="polite">
      {q.trim().length >= 2 && (hits.length
        ? <ul>{hits.map((h, i) => <li key={h.href + i}><a href={h.href}><b>{h.label}</b><span>{h.kind}</span></a></li>)}</ul>
        : <p>No matches. Try a service, an industry, a state, or a name.</p>)}
    </div>
  );

  return (
    <header className={`hx${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`} onMouseLeave={hoverClose}>
      <div className="hx-bar" ref={bar}>
        <a href="/" className="hx-logo" aria-label="Rawlins home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/pages/rawlinslogo-blue-wordmark.png" alt="Rawlins" width={132} height={32} />
        </a>
        <nav className="hx-nav" aria-label="Main">
          <ul>
            {MENUS.map(([m, label]) => (
              <li key={m}>
                <button type="button" id={`hx-b-${m}`} aria-expanded={open === m} aria-controls={`hx-m-${m}`}
                  onMouseEnter={() => hoverOpen(m)} onClick={() => toggle(m)}>{label}</button>
              </li>
            ))}
          </ul>
        </nav>
        <button type="button" className="hx-icon" aria-label="Search" onClick={() => { setOpen(null); setFind(true); }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
        </button>
        <a href="/contact" className="hx-cta">Get in touch</a>
        <button type="button" className="hx-burger" aria-expanded={sheet} aria-controls="hx-sheet" onClick={() => setSheet(true)}>Menu</button>
      </div>

      {/* desktop menus */}
      <div className="hx-panel" id="hx-m-what" hidden={open !== "what"} onMouseEnter={() => window.clearTimeout(timer.current)}>
        <div className="mx-what">
          {data.areas.map((a) => (
            <section key={a.id} style={{ ["--a" as string]: a.color, ["--a-ink" as string]: a.ink, ["--a-tint" as string]: a.tint } as CSSProperties}>
              <a className="mx-area" href={a.href}><b>{a.name}</b><em>{a.tag}</em></a>
              <ul>{a.services.map((s) => <li key={s.href}><a href={s.href}>{s.name}</a></li>)}</ul>
            </section>
          ))}
        </div>
      </div>
      <div className="hx-panel" id="hx-m-who" hidden={open !== "who"} onMouseEnter={() => window.clearTimeout(timer.current)}>
        <div className="mx-who">
          <ul className="mx-inds">
            {data.industries.map((x, i) => (
              <li key={x.href}><a href={x.href} onMouseEnter={() => setInd(i)} onFocus={() => setInd(i)} aria-current={ind === i ? "true" : undefined}><b>{x.name}</b><span>{x.who}</span></a></li>
            ))}
          </ul>
          <div className="mx-subs">
            {data.industries[ind].subs.length > 0 && <>
              <p className="mx-k">Specialties</p>
              <ul>{data.industries[ind].subs.map((s) => <li key={s.href}><a href={s.href}>{s.name}</a></li>)}</ul>
            </>}
            {data.industries[ind].projects.length > 0 && <>
              <p className="mx-k">Featured projects</p>
              <ul className="mx-projs">{data.industries[ind].projects.map((p) => <li key={p.href}><a className="mx-proj" href={p.href}>{/* eslint-disable-next-line @next/next/no-img-element */}{p.photo && <img src={p.photo} alt="" loading="lazy" />}<span>{p.title}{p.before && <small className="mx-tag">Before Rawlins</small>}</span></a></li>)}</ul>
            </>}
            <a className="mx-more" href="/industries">Everyone we work with</a>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="mx-photo" src={data.industries[ind].photo} alt="" />
        </div>
      </div>
      <div className="hx-panel" id="hx-m-work" hidden={open !== "work"} onMouseEnter={() => window.clearTimeout(timer.current)}>
        <div className="mx-list">
          <ul>{data.work.map((l) => <li key={l.href}><a href={l.href}><b>{l.label}</b><span>{l.note}</span></a></li>)}</ul>
          <a className="mx-card" href={data.featured.href}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.featured.photo} alt="" /><span className="mx-k">Featured project</span><b>{data.featured.title}</b><span>{data.featured.who}</span>
          </a>
        </div>
      </div>
      <div className="hx-panel" id="hx-m-insights" hidden={open !== "insights"} onMouseEnter={() => window.clearTimeout(timer.current)}>
        <div className="mx-list"><ul className="mx-2">{data.insights.map((l) => <li key={l.href}><a href={l.href}><b>{l.label}</b><span>{l.note}</span></a></li>)}</ul></div>
      </div>
      <div className="hx-panel" id="hx-m-about" hidden={open !== "about"} onMouseEnter={() => window.clearTimeout(timer.current)}>
        <div className="mx-list"><ul className="mx-2">{data.about.map((l) => <li key={l.href}><a href={l.href}><b>{l.label}</b><span>{l.note}</span></a></li>)}</ul></div>
      </div>

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
                <summary>What we do</summary>
                <ul className="hx-areas">{data.areas.map((a) => (
                  <li key={a.id} style={{ ["--a" as string]: a.color, ["--a-ink" as string]: a.ink } as CSSProperties}>
                    <details><summary>{a.name}</summary>
                      <ul><li><a href={a.href}>{a.name} overview</a></li>{a.services.map((s) => <li key={s.href}><a href={s.href}>{s.name}</a></li>)}</ul>
                    </details>
                  </li>
                ))}</ul>
              </details>
              <details><summary>Who we work with</summary><ul>{data.industries.map((x) => (
                <li key={x.href}>
                  <a href={x.href}>{x.name}</a>
                  {x.subs.length > 0 && <ul>{x.subs.map((s) => <li key={s.href}><a href={s.href}>{s.name}</a></li>)}</ul>}
                  {x.projects.length > 0 && <><p className="mx-k">Featured projects</p><ul className="mx-projs">{x.projects.map((p) => <li key={p.href}><a className="mx-proj" href={p.href}>{/* eslint-disable-next-line @next/next/no-img-element */}{p.photo && <img src={p.photo} alt="" loading="lazy" />}<span>{p.title}{p.before && <small className="mx-tag">Before Rawlins</small>}</span></a></li>)}</ul></>}
                </li>
              ))}</ul></details>
              <details><summary>Our work</summary><ul>{data.work.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}</ul></details>
              <details><summary>Insights</summary><ul>{data.insights.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}</ul></details>
              <details><summary>About</summary><ul>{data.about.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}</ul></details>
            </div>
          )}
          <a href="/contact" className="hx-cta hx-cta-big">Get in touch</a>
        </div>
      )}
    </header>
  );
}
