"use client";
/* Full-screen menu: stacked, nested columns (top level → second → third),
   a featured card that matches, the problem picker and search at the top.
   Behind it the 3D world plays the scene of whatever you point at.
   Phone: the same levels as a drill-down with a back arrow. */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  CASES, MENU, PROBLEMS, SITE_INDEX, caseById, caseHref, caseWho, serviceById, serviceHref,
  type MenuNode, type SearchHit,
} from "@/lib/content/site";
import { getPageScene, getWorld, hasJourney, setWorldLayer } from "@/components/world/host";
import { want3D } from "@/components/site/scene-mode";
import { SCENE_PHOTO } from "@/lib/content/media";
import type { SceneKey } from "@/lib/content/site";

type View = "browse" | "picker" | "search";

export default function SiteMenu({ open, onClose, prod }: { open: boolean; onClose: () => void; prod: boolean }) {
  const panel = useRef<HTMLDivElement>(null);
  const [path, setPath] = useState<number[]>([0]); // indexes into MENU → groups → items
  const [depth, setDepth] = useState(0); // phone drill-down depth
  const [view, setView] = useState<View>("browse");
  const [query, setQuery] = useState("");
  const [problem, setProblem] = useState<number | null>(null);
  const [people, setPeople] = useState<SearchHit[]>([]);
  const [wide, setWide] = useState(true);
  const [scene, setScene] = useState("capitol");
  const [worldOK, setWorldOK] = useState<boolean | null>(null);
  const [three, setThree] = useState(false);
  useEffect(() => { setThree(want3D()); }, []);
  const sceneTimer = useRef<number>(0);

  /* resolve the path into nodes */
  const l1 = MENU[path[0] ?? 0];
  const l2Items = useMemo(() => l1.groups?.flatMap((g) => g.items) ?? [], [l1]);
  const l2 = path[1] !== undefined ? l2Items[path[1]] : undefined;
  const featureNode = l2 && l2.feature ? l2 : l1;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  /* world: menu layer while open; the scene follows what you point at */
  useEffect(() => {
    if (!open) return;
    if (!three) { setWorldOK(true); return; }
    let alive = true;
    setWorldLayer("menu");
    getWorld().then((w) => { if (!alive) return; setWorldOK(!!w); w?.focus(scene); });
    return () => {
      alive = false;
      getWorld().then((w) => {
        if (!w) return;
        const page = getPageScene();
        if (hasJourney()) { setWorldLayer("journey"); w.release(); }
        else if (page) { setWorldLayer("journey"); w.focus(page); }
        else setWorldLayer("off");
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, three]);
  const point = useCallback((key: string) => {
    window.clearTimeout(sceneTimer.current);
    sceneTimer.current = window.setTimeout(() => {
      setScene(key);
      if (three) getWorld().then((w) => w?.focus(key));
    }, 120);
  }, [three]);

  /* open/close housekeeping: scroll lock, focus, Escape, focus trap */
  const opener = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!open) return;
    opener.current = document.activeElement as HTMLElement;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    setView("browse"); setQuery(""); setProblem(null); setDepth(0);
    requestAnimationFrame(() => panel.current?.querySelector<HTMLElement>(".mn-col1 a")?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); }
      if (e.key === "Tab" && panel.current) {
        const f = Array.from(panel.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), input")).filter((el) => el.offsetParent !== null);
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      opener.current?.focus?.();
    };
  }, [open, onClose]);

  /* search: people load only when someone searches */
  useEffect(() => {
    if (view !== "search" || people.length) return;
    fetch("/people-index.json").then((r) => r.json()).then((list: SearchHit[]) => {
      setPeople(list);
    }).catch(() => {});
  }, [view, people.length]);
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    const caseHits: SearchHit[] = CASES.map((c) => ({ label: c.title, kind: `Case study · ${caseWho(c, prod)}`, href: caseHref(c) }));
    return [...SITE_INDEX, ...caseHits, ...people].filter((h) => h.label.toLowerCase().includes(q) || h.kind.toLowerCase().includes(q)).slice(0, 14);
  }, [query, people, prod]);

  /* keyboard: arrows move within and across columns */
  const onColKey = (e: React.KeyboardEvent<HTMLUListElement>, col: number) => {
    const items = Array.from(e.currentTarget.querySelectorAll<HTMLElement>(":scope > li > a, :scope > li > button, :scope .mn-g > li > a"));
    const i = items.indexOf(document.activeElement as HTMLElement);
    if (e.key === "ArrowDown") { e.preventDefault(); items[Math.min(items.length - 1, i + 1)]?.focus(); }
    if (e.key === "ArrowUp") { e.preventDefault(); items[Math.max(0, i - 1)]?.focus(); }
    if (e.key === "ArrowRight") {
      const next = panel.current?.querySelector<HTMLElement>(`.mn-col${col + 1} a`);
      if (next) { e.preventDefault(); next.focus(); }
    }
    if (e.key === "ArrowLeft" && col > 1) {
      const back = panel.current?.querySelector<HTMLElement>(`.mn-col${col - 1} [aria-current="true"]`);
      if (back) { e.preventDefault(); back.focus(); }
    }
  };

  /* pointing at (or focusing) an item opens its next level and changes the scene */
  const at1 = (i: number) => { setPath([i]); point(MENU[i].scene); };
  const at2 = (i: number) => { setPath([path[0], i]); point(l2Items[i].scene); };
  /* phone: tap drills in instead of navigating */
  const tap = (e: React.MouseEvent, level: number, i: number, node: MenuNode) => {
    if (wide || !node.groups?.length) return;
    e.preventDefault();
    if (level === 1) { setPath([i]); setDepth(1); } else { setPath([path[0], i]); setDepth(2); }
    point(node.scene);
  };

  if (!open) return null;

  const crumb = depth === 2 ? l2?.label : depth === 1 ? l1.label : "";
  return (
    <div className="mn" role="dialog" aria-modal="true" aria-label="Site menu" id="site-menu" ref={panel} data-view={view} data-depth={depth} data-scene={scene} data-world-ok={worldOK === null ? undefined : String(worldOK)}>
      {!three && (
        <div className="mn-photo" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img key={scene} src={SCENE_PHOTO[scene as SceneKey] ?? SCENE_PHOTO.hero} alt="" decoding="async" />
        </div>
      )}
      <div className="mn-scrim" aria-hidden="true" />
      <div className="mn-top">
        <a href="/" className="mn-logo" aria-label="Rawlins home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/pages/rawlinslogo-blue-wordmark.png" alt="Rawlins" width={140} height={34} />
        </a>
        <div className="mn-tools">
          <button type="button" className="mn-fix" aria-pressed={view === "picker"} onClick={() => { setView(view === "picker" ? "browse" : "picker"); point("grid"); }}>
            What are you trying to fix?
          </button>
          <label className="mn-search">
            <span className="sr-only">Search services, industries, case studies, and people</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
            <input type="search" placeholder="Search" value={query} onChange={(e) => { setQuery(e.target.value); setView(e.target.value ? "search" : "browse"); }} />
          </label>
        </div>
        <button type="button" className="mn-close" onClick={onClose} aria-label="Close menu">
          <span>Close</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>
      </div>

      {view === "browse" && (
        <div className="mn-body">
          {!wide && depth > 0 && (
            <button type="button" className="mn-back" onClick={() => setDepth(depth - 1)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
              <span>Back</span><b>{crumb}</b>
            </button>
          )}
          <ul className="mn-col mn-col1" onKeyDown={(e) => onColKey(e, 1)}>
            {MENU.map((n, i) => (
              <li key={n.id}>
                <a href={n.href} aria-current={path[0] === i ? "true" : undefined} aria-haspopup={!wide ? "true" : undefined}
                  onMouseEnter={() => wide && at1(i)} onFocus={() => wide && at1(i)} onClick={(e) => tap(e, 1, i, n)}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="mn-col mn-col2" key={`c2-${path[0]}`} onKeyDown={(e) => onColKey(e, 2)}>
            <li className="mn-overview"><a href={l1.href}>{wide ? "Overview" : `All of ${l1.label}`}</a></li>
            {l2Items.map((n, i) => (
              <li key={n.id}>
                <a href={n.href} aria-current={path[1] === i ? "true" : undefined}
                  onMouseEnter={() => wide && at2(i)} onFocus={() => wide && at2(i)} onClick={(e) => tap(e, 2, i, n)}>
                  <span>{n.label}</span>
                  {n.note && <small>{n.note}</small>}
                </a>
              </li>
            ))}
          </ul>
          <ul className="mn-col mn-col3" key={`c3-${path.join("-")}`} onKeyDown={(e) => onColKey(e, 3)} hidden={!l2?.groups?.length}>
            {l2 && <li className="mn-overview"><a href={l2.href}>{`Overview: ${l2.label}`}</a></li>}
            {l2?.groups?.map((g, gi) => (
              <li key={gi} className="mn-group">
                {g.title && g.title !== l2.label && <p className="mn-gt">{g.title}</p>}
                <ul className="mn-g">
                  {g.items.map((n) => (
                    <li key={n.id}>
                      <a href={n.href} onMouseEnter={() => wide && point(n.scene)} onFocus={() => wide && point(n.scene)}>
                        {n.label}{n.thin && !prod && <em className="mn-dev">Placeholder</em>}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <aside className="mn-feature" aria-label="Featured">
            <Feature node={featureNode} prod={prod} onPicker={() => { setView("picker"); point("grid"); }} />
          </aside>
        </div>
      )}

      {view === "picker" && (
        <div className="mn-body mn-picker">
          <h2>What are you trying to fix?</h2>
          <div className="mn-problems" role="group" aria-label="Problems">
            {PROBLEMS.map((p, i) => (
              <button key={p.q} type="button" aria-pressed={problem === i} onClick={() => setProblem(i)}>{p.q}</button>
            ))}
          </div>
          <div className="mn-answer" aria-live="polite">
            {problem !== null && (
              <ul>
                {PROBLEMS[problem].services.map((id) => {
                  const hit = serviceById(id);
                  return hit ? <li key={id}><a href={serviceHref(id)}><b>{hit.service.name}</b><span>{hit.area.name}</span></a></li> : null;
                })}
              </ul>
            )}
          </div>
          <button type="button" className="mn-link" onClick={() => setView("browse")}>Back to the menu</button>
        </div>
      )}

      {view === "search" && (
        <div className="mn-body mn-results" aria-live="polite">
          {query.trim().length < 2 ? <p>Keep typing…</p> : results.length ? (
            <ul>
              {results.map((h, i) => <li key={`${h.href}-${i}`}><a href={h.href}><b>{h.label}</b><span>{h.kind}</span></a></li>)}
            </ul>
          ) : <p>No matches. Try a service, an industry, a state, or a name.</p>}
        </div>
      )}

      <div className="mn-foot">
        <a href="/contact" className="mn-cta">Get in touch</a>
        <span className="mn-contact"><a href="mailto:info@rawlinsic.com">info@rawlinsic.com</a><a href="tel:+17758433822">(775) 843-3822</a></span>
      </div>
    </div>
  );
}

function Feature({ node, prod, onPicker }: { node: MenuNode; prod: boolean; onPicker: () => void }) {
  const f = node.feature;
  if (!f) return null;
  if (f.kind === "picker") {
    return (
      <div className="mn-card">
        <p className="mn-card-k">Start with the problem</p>
        <h3>What are you trying to fix?</h3>
        <p>Pick the one that sounds most like you. We&apos;ll show you where to start.</p>
        <button type="button" className="mn-card-cta" onClick={onPicker}>Open the problem picker</button>
      </div>
    );
  }
  if (f.kind === "case") {
    const c = caseById(f.id);
    if (!c || (prod && c.needsSignoff)) return null;
    return (
      <a className="mn-card" href={caseHref(c)}>
        <p className="mn-card-k">Case study · {c.status}</p>
        <h3>{c.title}</h3>
        <p>{caseWho(c, prod)}</p>
        <span className="mn-card-cta">Read the case study</span>
      </a>
    );
  }
  return (
    <a className="mn-card" href={f.href}>
      <p className="mn-card-k">Featured</p>
      <h3>{f.title}</h3>
      <p>{f.text}</p>
      <span className="mn-card-cta">{f.cta}</span>
    </a>
  );
}
