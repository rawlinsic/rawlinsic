"use client";
/* Menu, "The Route": the whole site as a system map. Five lines (service
   areas) with their stations (services); transfer stations (industries);
   and the rest of the site. Search across everything. Phone: one line at a
   time, tap to open. Escape closes; focus stays inside. */
import { useEffect, useMemo, useRef, useState } from "react";
import { AREAS, CASES, SITE_INDEX, areaHref, caseHref, industryHref, subsectorHref, type SearchHit } from "@/lib/content/site";
import { LINE, TRANSFERS } from "@/lib/content/route";

export default function SystemMap({ open, onClose, prod }: { open: boolean; onClose: () => void; prod: boolean }) {
  const panel = useRef<HTMLDivElement>(null);
  const [hot, setHot] = useState<string | null>(null);
  const [openLine, setOpenLine] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [people, setPeople] = useState<SearchHit[]>([]);

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement, prev = html.style.overflow;
    html.style.overflow = "hidden";
    const opener = document.activeElement as HTMLElement | null;
    setQ(""); setOpenLine(null);
    requestAnimationFrame(() => panel.current?.querySelector<HTMLElement>("input")?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); }
      if (e.key === "Tab" && panel.current) {
        const f = Array.from(panel.current.querySelectorAll<HTMLElement>("a[href], button, input")).filter((x) => x.offsetParent !== null);
        if (!f.length) return;
        if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { html.style.overflow = prev; document.removeEventListener("keydown", onKey); opener?.focus?.(); };
  }, [open, onClose]);

  useEffect(() => {
    if (!q || people.length) return;
    fetch("/people-index.json").then((r) => r.json()).then(setPeople).catch(() => {});
  }, [q, people.length]);
  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (s.length < 2) return [];
    const cases: SearchHit[] = CASES.map((c) => ({ label: c.title, kind: "Case study", href: caseHref(c) }));
    return [...SITE_INDEX, ...cases, ...people].filter((h) => `${h.label} ${h.kind}`.toLowerCase().includes(s)).slice(0, 12);
  }, [q, people]);

  if (!open) return null;
  return (
    <div className="sm" role="dialog" aria-modal="true" aria-label="Site map" id="site-menu" ref={panel} data-hot={hot ?? undefined}>
      <div className="sm-top">
        <a href="/" className="sm-logo" aria-label="Rawlins home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/pages/rawlinslogo-blue-wordmark.png" alt="Rawlins" width={140} height={34} />
        </a>
        <label className="sm-search">
          <span className="sr-only">Search services, industries, case studies, and people</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
          <input type="search" placeholder="Where do you want to go?" value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
        <button type="button" className="sm-close" onClick={onClose}>Close <span aria-hidden="true">×</span></button>
      </div>

      {q.trim().length >= 2 ? (
        <div className="sm-body sm-results" aria-live="polite">
          {results.length ? <ul>{results.map((h, i) => <li key={h.href + i}><a href={h.href}><b>{h.label}</b><span>{h.kind}</span></a></li>)}</ul> : <p>No matches. Try a service, an industry, a state, or a name.</p>}
        </div>
      ) : (
        <div className="sm-body">
          <section className="sm-lines" aria-label="What we do">
            <p className="sm-h"><a href="/services">What we do</a> <span>Five lines</span></p>
            {AREAS.map((a) => {
              const L = LINE[a.id], isOpen = openLine === a.id;
              return (
                <div key={a.id} className={`sm-line${hot?.split(" ").includes(a.id) ? " is-hot" : ""}${isOpen ? " is-open" : ""}`} style={{ ["--c" as string]: L.color }}
                  onMouseEnter={() => setHot(a.id)} onMouseLeave={() => setHot(null)}>
                  <div className="sm-line-head">
                    <span className="sm-bullet">{L.code}</span>
                    <a href={areaHref(a)} onFocus={() => setHot(a.id)}>{a.name}</a>
                    <button type="button" className="sm-toggle" aria-expanded={isOpen} onClick={() => setOpenLine(isOpen ? null : a.id)}>
                      <span className="sr-only">Show {a.name} services</span><span aria-hidden="true">{isOpen ? "−" : "+"}</span>
                    </button>
                  </div>
                  <ol className="sm-stations">
                    {a.services.map((s, i) => (
                      <li key={s.id}><a href={`/services/${a.slug}/${s.slug}`} onFocus={() => setHot(a.id)}><span className="sm-dot" aria-hidden="true" /><span className="sm-code">{L.code}{i + 1}</span>{s.name}</a></li>
                    ))}
                  </ol>
                </div>
              );
            })}
          </section>
          <section className="sm-side">
            <div>
              <p className="sm-h"><a href="/industries">Transfer stations</a> <span>Who we work with</span></p>
              <ul className="sm-transfers">
                {TRANSFERS.map(({ industry: ind, lines }) => (
                  <li key={ind.id} onMouseEnter={() => setHot(lines.join(" "))} onMouseLeave={() => setHot(null)}>
                    <a href={industryHref(ind)}><span className="sm-ring" aria-hidden="true" />{ind.name}<span className="sm-served" aria-hidden="true">{lines.map((l) => <i key={l} style={{ background: LINE[l].color }} />)}</span></a>
                    {ind.subsectors.length > 0 && <ul>{ind.subsectors.map((s) => <li key={s.id}><a href={subsectorHref(ind, s)}>{s.name}</a></li>)}</ul>}
                  </li>
                ))}
              </ul>
            </div>
            <div className="sm-cols">
              <div><p className="sm-h"><a href="/insights/case-studies">Our work</a></p><ul className="sm-plain"><li><a href="/insights/case-studies">Case studies</a></li><li><a href="/insights/case-studies?status=ongoing">In the works</a></li><li><a href="/about/where-we-work">Where we work</a></li></ul></div>
              <div><p className="sm-h"><a href="/insights">Insights</a></p><ul className="sm-plain"><li><a href="/insights/news">News &amp; Recognition</a></li><li><a href="/insights/thought-leadership">Thought Leadership</a></li><li><a href="/insights/research">Research &amp; Publications</a></li><li><a href="/insights/podcast">Podcast</a></li></ul></div>
              <div><p className="sm-h"><a href="/about">About</a></p><ul className="sm-plain"><li><a href="/about/who-we-are">Who we are</a></li><li><a href="/about/how-we-work">How we work</a></li><li><a href="/about/our-people">Our people</a></li><li><a href="/careers">Careers</a></li></ul></div>
            </div>
          </section>
        </div>
      )}
      <div className="sm-foot">
        <a href="/#start" className="sm-start" onClick={onClose}>Where are you starting from? Plan your trip</a>
        <a href="/contact" className="sm-cta">Get in touch</a>
      </div>
      {!prod && <span className="sm-dev" hidden />}
    </div>
  );
}
