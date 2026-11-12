"use client";
/* Where we work (Nicole, Nov 11: "align to the current page on the current live site... that globe I think we still
   want... when you click or hover... it would expand out into like a flat map that would zoom in and show you
   projects that you can click on").

     globe   the live site's globe, redrawn in this site's colors: land as dots, a pin on each state with our work
             (Active, Areas we've served). It turns slowly and can be dragged. Only U.S. pins, as on the approved map.
     map     a click on the globe (or "Open the map") opens the flat U.S. map out of it. States with our work are
             lit; a number on a state is how many project pages it has. A click on a state zooms in on it and lists
             its projects beside the map, each one a link to its page.

   Data: public/world/globe.json (land dots) and public/world/us-map.json (state shapes), the same files the
   home scene uses. Links like /about/where-we-work#map-nevada open the map on that state (the lists further
   down the page use them). No motion beyond a fade for people who ask for reduced motion. */
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

export type WwProject = { title: string; href: string; photo?: string; tag: string };
type MapData = { w: number; h: number; states: { name: string; c: [number, number]; rings: number[][][] }[]; nation: number[][][] };
type Pin = { name: string; lat: number; lng: number; strong: boolean };

/* about the middle of each state with our work: [latitude, longitude] */
const LL: Record<string, [number, number]> = {
  Hawaii: [20.8, -156.9], Alaska: [63.5, -154.5], Nevada: [39.3, -116.6], Utah: [39.3, -111.7], Texas: [31.4, -99.3],
  Arkansas: [34.9, -92.4], Louisiana: [31.0, -92.0], Tennessee: [35.9, -86.4], Michigan: [44.3, -85.4], Iowa: [42.0, -93.5],
  Florida: [28.6, -82.4], Georgia: [32.7, -83.4], "North Carolina": [35.5, -79.4], Virginia: [37.5, -78.8], Maryland: [39.0, -76.8],
  Delaware: [39.0, -75.5], Pennsylvania: [40.9, -77.8], "New York": [42.9, -75.5], Ohio: [40.3, -82.8], Indiana: [39.9, -86.3],
  Wisconsin: [44.6, -89.9], Illinois: [40.0, -89.2], Missouri: [38.4, -92.5], Idaho: [44.4, -114.6], Washington: [47.4, -120.5],
  Oregon: [43.9, -120.6], Minnesota: [46.3, -94.3],
};
const D = Math.PI / 180;
const slug = (s: string) => s.toLowerCase().replace(/\s+/g, "-");
const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ── The globe ── */
function Globe({ pins, onOpen, paused }: { pins: Pin[]; onOpen: (state?: string) => void; paused: boolean }) {
  const cv = useRef<HTMLCanvasElement>(null);
  const [tip, setTip] = useState<{ x: number; y: number; name: string; strong: boolean } | null>(null);
  const live = useRef({ paused, onOpen, pins });
  live.current = { paused, onOpen, pins };

  useEffect(() => {
    const c = cv.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const still = reduced();
    /* lam, phi: which point of the globe faces us. The U.S. sits a little above the middle, as on the live site. */
    const s = { lam: -97 * D, phi: 30 * D, auto: 0, last: 0, hover: -1, drag: null as null | { x: number; y: number; lam: number; phi: number; moved: boolean }, pts: [] as { x: number; y: number; i: number }[] };
    let dots: Float32Array | null = null, raf = 0, seen = true;

    const draw = (now: number) => {
      const w = c.clientWidth, h = c.clientHeight;
      if (!w || !h) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      if (c.width !== Math.round(w * dpr) || c.height !== Math.round(h * dpr)) { c.width = Math.round(w * dpr); c.height = Math.round(h * dpr); }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const R = Math.min(w, h) / 2 - 22, cx = w / 2, cy = h / 2;
      const lam = s.lam + Math.sin(s.auto) * 0.2, cp = Math.cos(s.phi), sp = Math.sin(s.phi);
      /* glow behind, then the sphere */
      const halo = ctx.createRadialGradient(cx, cy, R * 0.92, cx, cy, R + 22);
      halo.addColorStop(0, "rgba(34, 211, 238, 0.30)"); halo.addColorStop(1, "rgba(34, 211, 238, 0)");
      ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(cx, cy, R + 22, 0, 7); ctx.fill();
      const ball = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.45, R * 0.05, cx, cy, R);
      ball.addColorStop(0, "#17305a"); ball.addColorStop(0.7, "#0b162a"); ball.addColorStop(1, "#070d18");
      ctx.fillStyle = ball; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.fill();
      ctx.strokeStyle = "rgba(165, 243, 252, 0.45)"; ctx.lineWidth = 1.2; ctx.stroke();
      /* land: the rest of the world first, the U.S. on top */
      if (dots) {
        for (let pass = 0; pass < 2; pass++) {
          ctx.fillStyle = pass ? "#22d3ee" : "rgba(170, 200, 240, 0.5)";
          for (let i = 0; i < dots.length; i += 4) {
            if (dots[i + 3] !== pass) continue;
            const dl = dots[i] - lam, cl = dots[i + 2], y0 = dots[i + 1], z0 = cl * Math.cos(dl);
            const z = y0 * sp + z0 * cp;
            if (z <= 0) continue;
            const x = cx + R * cl * Math.sin(dl), y = cy - R * (y0 * cp - z0 * sp), d = (pass ? 1.9 : 1.4) * (0.55 + 0.45 * z);
            ctx.fillRect(x - d / 2, y - d / 2, d, d);
          }
        }
      }
      /* pins */
      s.pts = [];
      live.current.pins.forEach((p, i) => {
        const dl = p.lng * D - lam, cl = Math.cos(p.lat * D), y0 = Math.sin(p.lat * D), z0 = cl * Math.cos(dl);
        const z = y0 * sp + z0 * cp;
        if (z <= 0.08) return;
        const x = cx + R * cl * Math.sin(dl), y = cy - R * (y0 * cp - z0 * sp);
        s.pts.push({ x, y, i });
        const on = s.hover === i, col = p.strong ? "34, 211, 238" : "143, 181, 236", u = Math.max(0.6, Math.min(1, R / 260)); // smaller pins on a small globe
        if (p.strong) {
          const k = still ? 0.5 : (now / 1900 + i * 0.137) % 1;
          ctx.strokeStyle = `rgba(${col}, ${0.65 * (1 - k)})`; ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.arc(x, y, (5 + k * 11) * u, 0, 7); ctx.stroke();
        }
        ctx.fillStyle = `rgba(${col}, 0.28)`; ctx.beginPath(); ctx.arc(x, y, (on ? 12 : 8.5) * u, 0, 7); ctx.fill();
        ctx.fillStyle = p.strong ? "#22d3ee" : "#a9c6f2"; ctx.beginPath(); ctx.arc(x, y, (on ? 6 : 4.4) * u, 0, 7); ctx.fill();
        ctx.strokeStyle = "#07101e"; ctx.lineWidth = 1.2; ctx.stroke();
      });
    };
    const loop = (now: number) => {
      raf = 0;
      if (!seen || live.current.paused) return;
      if (!s.drag && s.last) s.auto += Math.min(100, now - s.last) / 5200;
      s.last = now;
      draw(now);
      if (!still) raf = requestAnimationFrame(loop);
    };
    const kick = () => { if (!raf) { s.last = 0; raf = requestAnimationFrame(loop); } };

    fetch("/world/globe.json").then((r) => r.json()).then((d: { dots: number[] }) => {
      const n = Math.floor(d.dots.length / 3), a = new Float32Array(n * 4);
      for (let i = 0; i < n; i++) { const lat = d.dots[i * 3 + 1] * D; a[i * 4] = d.dots[i * 3] * D; a[i * 4 + 1] = Math.sin(lat); a[i * 4 + 2] = Math.cos(lat); a[i * 4 + 3] = d.dots[i * 3 + 2] ? 1 : 0; }
      dots = a; kick();
    }).catch(() => {});

    const at = (e: PointerEvent) => { const r = c.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
    const nearest = (x: number, y: number) => { let best = -1, bd = 16 * 16; for (const p of s.pts) { const q = (p.x - x) ** 2 + (p.y - y) ** 2; if (q < bd) { bd = q; best = p.i; } } return best; };
    const down = (e: PointerEvent) => { const p = at(e); s.drag = { x: p.x, y: p.y, lam: s.lam, phi: s.phi, moved: false }; c.setPointerCapture(e.pointerId); };
    const move = (e: PointerEvent) => {
      const p = at(e);
      if (s.drag) {
        const dx = p.x - s.drag.x, dy = p.y - s.drag.y, R = Math.min(c.clientWidth, c.clientHeight) / 2;
        if (Math.abs(dx) + Math.abs(dy) > 6) s.drag.moved = true;
        if (s.drag.moved) { s.lam = s.drag.lam - dx / R; s.phi = Math.max(-1.2, Math.min(1.2, s.drag.phi + dy / R)); setTip(null); if (still) draw(0); }
        return;
      }
      const i = nearest(p.x, p.y);
      if (i !== s.hover) {
        s.hover = i;
        const pin = live.current.pins[i], pt = s.pts.find((q) => q.i === i);
        setTip(pin && pt ? { x: pt.x, y: pt.y, name: pin.name, strong: pin.strong } : null);
        if (still) draw(0);
      }
    };
    const up = (e: PointerEvent) => {
      const d = s.drag; s.drag = null;
      if (c.hasPointerCapture(e.pointerId)) c.releasePointerCapture(e.pointerId);
      if (d && !d.moved) { const p = at(e), i = nearest(p.x, p.y); live.current.onOpen(i >= 0 ? live.current.pins[i].name : undefined); }
    };
    const leave = () => { if (!s.drag) { s.hover = -1; setTip(null); } };
    c.addEventListener("pointerdown", down); c.addEventListener("pointermove", move); c.addEventListener("pointerup", up);
    c.addEventListener("pointercancel", () => { s.drag = null; }); c.addEventListener("pointerleave", leave);
    const io = new IntersectionObserver(([en]) => { seen = en.isIntersecting; if (seen) kick(); });
    io.observe(c);
    const ro = new ResizeObserver(() => { if (still || !raf) draw(performance.now()); });
    ro.observe(c);
    const wake = window.setInterval(() => { if (!live.current.paused && seen && !still) kick(); }, 400);
    return () => { cancelAnimationFrame(raf); window.clearInterval(wake); io.disconnect(); ro.disconnect(); c.removeEventListener("pointerdown", down); c.removeEventListener("pointermove", move); c.removeEventListener("pointerup", up); c.removeEventListener("pointerleave", leave); };
  }, []);

  return (
    <div className="ww-globe">
      <canvas ref={cv} role="img" aria-label="A globe with a pin on each U.S. state where we have worked. Use the Open the map button to see the states and their projects." />
      {tip && <span className="ww-tip" style={{ left: tip.x, top: tip.y }}><b>{tip.name}</b>{tip.strong ? "Active" : "Areas we've served"}</span>}
    </div>
  );
}

/* ── The flat map ── */
const fullBox = (d: MapData): number[] => [0, 0, d.w, d.h];
function zoomBox(d: MapData, name: string): number[] {
  const st = d.states.find((x) => x.name === name);
  if (!st) return fullBox(d);
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const r of st.rings) for (const [x, y] of r) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  const ratio = d.w / d.h;
  let w = Math.max((x1 - x0) * 2.1, 250), h = w / ratio;
  if ((y1 - y0) * 1.7 > h) { h = (y1 - y0) * 1.7; w = h * ratio; }
  return [(x0 + x1) / 2 - w / 2, (y0 + y1) / 2 - h / 2, w, h];
}
const ringsPath = (rings: number[][][]) => rings.map((r) => `M${r.map(([x, y]) => `${x},${y}`).join("L")}Z`).join("");

function FlatMap({ data, active, served, counts, picked, onPick }: { data: MapData; active: Set<string>; served: Set<string>; counts: Record<string, number>; picked: string | null; onPick: (s: string | null) => void }) {
  const svg = useRef<SVGSVGElement>(null);
  const box = useRef<number[]>(fullBox(data));
  const [tip, setTip] = useState<{ x: number; y: number; name: string } | null>(null);
  /* the view glides to the picked state, and back out */
  useEffect(() => {
    const el = svg.current;
    if (!el) return;
    const to = picked ? zoomBox(data, picked) : fullBox(data), from = box.current.slice();
    const set = (b: number[]) => { box.current = b; el.setAttribute("viewBox", b.map((v) => v.toFixed(2)).join(" ")); };
    if (reduced()) { set(to); return; }
    let raf = 0;
    const t0 = performance.now();
    const step = (now: number) => {
      const k = Math.min(1, (now - t0) / 750), e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
      set(from.map((v, i) => v + (to[i] - v) * e));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [picked, data]);

  const label = (name: string) => `${name}: ${active.has(name) ? "Active" : "Areas we've served"}${counts[name] ? `, ${counts[name]} ${counts[name] === 1 ? "project" : "projects"}` : ""}`;
  const where = (e: React.PointerEvent) => { const r = svg.current?.parentElement?.getBoundingClientRect(); return r ? { x: e.clientX - r.left, y: e.clientY - r.top } : { x: 0, y: 0 }; };
  /* lit states are drawn last so their outline sits on top of their neighbors */
  const order = [...data.states].sort((a, b) => Number(active.has(a.name) || served.has(a.name)) - Number(active.has(b.name) || served.has(b.name)) || Number(a.name === picked) - Number(b.name === picked));
  return (
    <div className={`ww-map${picked ? " is-zoomed" : ""}`}>
      <svg ref={svg} viewBox={fullBox(data).join(" ")} role="group" aria-label="Map of the United States. States where we have worked are lit; choose one to see its projects.">
        {order.map((s) => {
          const act = active.has(s.name), on = act || served.has(s.name);
          return (
            <path key={s.name} d={ringsPath(s.rings)} className={`ww-st${on ? " is-on" : ""}${act ? " is-active" : ""}${picked === s.name ? " is-picked" : ""}`}
              {...(on ? {
                role: "button", tabIndex: 0, "aria-label": label(s.name), "aria-pressed": picked === s.name,
                onClick: () => onPick(picked === s.name ? null : s.name),
                onKeyDown: (e: React.KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onPick(picked === s.name ? null : s.name); } },
                onPointerMove: (e: React.PointerEvent) => { if (e.pointerType === "mouse") setTip({ ...where(e), name: s.name }); },
                onPointerLeave: () => setTip(null),
              } : { "aria-hidden": true })} />
          );
        })}
        <g className="ww-badges" aria-hidden="true">
          {data.states.filter((s) => counts[s.name]).map((s) => (
            <g key={s.name} transform={`translate(${s.c[0]} ${s.c[1]})`}><circle r="14" /><text dy="5.4">{counts[s.name]}</text></g>
          ))}
        </g>
      </svg>
      {tip && <span className="ww-tip" style={{ left: tip.x, top: tip.y }}><b>{tip.name}</b>{active.has(tip.name) ? "Active" : "Areas we've served"}{counts[tip.name] ? ` · ${counts[tip.name]} ${counts[tip.name] === 1 ? "project" : "projects"}` : ""}</span>}
    </div>
  );
}

const Arrow = ({ back }: { back?: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={back ? { transform: "scaleX(-1)" } : undefined}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

export default function WhereMap({ copy, active, served, projects }: { copy: ReactNode; active: string[]; served: string[]; projects: Record<string, WwProject[]> }) {
  const [mode, setMode] = useState<"globe" | "map">("globe");
  const [picked, setPicked] = useState<string | null>(null);
  const [data, setData] = useState<MapData | null>(null);
  const root = useRef<HTMLElement>(null);
  const aSet = useMemo(() => new Set(active), [active]);
  const sSet = useMemo(() => new Set(served), [served]);
  const pins = useMemo<Pin[]>(() => [...served, ...active].filter((n) => LL[n]).map((n) => ({ name: n, lat: LL[n][0], lng: LL[n][1], strong: active.includes(n) })), [active, served]);
  const counts = useMemo(() => Object.fromEntries(Object.entries(projects).map(([k, v]) => [k, v.length])), [projects]);
  const withPages = useMemo(() => Object.keys(projects).filter((k) => projects[k].length).sort((a, b) => projects[b].length - projects[a].length || a.localeCompare(b)), [projects]);

  useEffect(() => { fetch("/world/us-map.json").then((r) => r.json()).then(setData).catch(() => {}); }, []);
  const open = useCallback((state?: string) => { setMode("map"); setPicked(state && (aSet.has(state) || sSet.has(state)) ? state : null); }, [aSet, sSet]);
  /* #map-<state> opens the map on that state: the state lists further down the page link this way */
  useEffect(() => {
    const go = () => {
      const m = decodeURIComponent(window.location.hash).match(/^#map-(.+)$/);
      const st = m && [...active, ...served].find((x) => slug(x) === m[1]);
      if (!st) return;
      setMode("map"); setPicked(st);
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
      window.scrollTo({ top: 0, behavior: reduced() ? "auto" : "smooth" });
    };
    go();
    window.addEventListener("hashchange", go);
    return () => window.removeEventListener("hashchange", go);
  }, [active, served]);
  /* Escape steps back: out of a state, then back to the globe */
  useEffect(() => {
    if (mode !== "map") return;
    const key = (e: KeyboardEvent) => { if (e.key !== "Escape") return; if (picked) setPicked(null); else setMode("globe"); };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [mode, picked]);

  const list = picked ? projects[picked] ?? [] : [];
  const legend = (
    <ul className="ww-legend" aria-label="Map key">
      <li><i className="is-active" aria-hidden="true" />Active</li>
      <li><i aria-hidden="true" />Areas we&apos;ve served</li>
    </ul>
  );
  return (
    <header ref={root} className={`ed-hero is-dark ww is-${mode}${picked ? " has-pick" : ""}`} data-nofill>
      <div className="ed-wrap ww-stage">
        <div className="ww-view ww-view-globe" inert={mode !== "globe"}>
          <Globe pins={pins} onOpen={open} paused={mode !== "globe"} />
          <div className="ww-copy">
            {copy}
            {legend}
            <div className="ed-btns">
              <button type="button" className="ed-btn is-white" onClick={() => open()}>Open the map</button>
              <a className="ed-btn is-ghost" href="/insights/case-studies">See our projects</a>
            </div>
            <p className="ww-hint">Drag the globe to turn it. Click it to open the map, then pick a state to see its projects.</p>
          </div>
        </div>
        <div className="ww-view ww-view-map" inert={mode !== "map"}>
          <div className="ww-mapcol">
            {data ? <FlatMap data={data} active={aSet} served={sSet} counts={counts} picked={picked} onPick={setPicked} /> : <div className="ww-map" aria-hidden="true" />}
            {legend}
          </div>
          <aside className="ww-panel" aria-live="polite">
            <p className="ww-panel-top">
              <button type="button" className="ww-back" onClick={() => (picked ? setPicked(null) : setMode("globe"))}><Arrow back />{picked ? "All states" : "Back to the globe"}</button>
            </p>
            {picked ? (
              <>
                <p className="ww-status">{aSet.has(picked) ? "Active" : "Areas we've served"}</p>
                <h2>{picked}</h2>
                {list.length > 0 ? (
                  <ul className="ww-projs">
                    {list.map((p) => (
                      <li key={p.href}>
                        <a href={p.href}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          {p.photo && <img src={p.photo} alt="" loading="lazy" />}
                          <span><i>{p.tag}</i><b>{p.title}</b></span>
                          <Arrow />
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : <p className="ww-none">No project page for {picked} yet.</p>}
                <a className="ed-more" href="/insights/case-studies">See all projects</a>
              </>
            ) : (
              <>
                <h2>Pick a state</h2>
                <p className="ww-none">A number on a state is how many project pages it has.</p>
                <ul className="ww-quick">
                  {withPages.map((s) => <li key={s}><button type="button" onClick={() => setPicked(s)}>{s}<b>{counts[s]}</b></button></li>)}
                </ul>
              </>
            )}
          </aside>
        </div>
      </div>
    </header>
  );
}
