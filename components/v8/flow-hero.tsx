"use client";
/* The home page's opening: a full-width navy block (scale.com's framed hero)
   with a field of light drawn by code, not filmed, so it shows no real place
   and fits anywhere: thousands of small dots streaming along sweeping curves,
   like traffic on lanes, gathering into one arc and scattering at the end (the
   idea from livepeer.org, in Rawlins aqua and white). The tagline sits over it,
   with "Scroll to explore". The animation pauses off screen; reduced motion
   gets one still frame. Give it a video (webm/mp4 + poster) and it plays that
   instead, muted and looping (the video is being made with Livepeer Agent). */
import { useEffect, useRef, type ReactNode } from "react";

type P = { lane: number; t: number; v: number; off: number; size: number; aqua: boolean; a: number };
type V = [number, number];

export type HeroVideo = { webm?: string; mp4?: string; poster?: string };

export default function FlowHero({ children, next, video }: { children: ReactNode; next?: string; video?: HeroVideo }) {
  const wrap = useRef<HTMLElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = wrap.current, canvas = cv.current;
    if (!el || !canvas || video) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, dpr = 1, raf = 0, visible = true;
    let lanes: [V, V, V, V][] = [];
    const ps: P[] = [];

    // lanes: curves that start spread out at the lower left and gather into one
    // sweeping arc that rises off the upper right, like roads joining a highway
    const layout = () => {
      const r = el.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = r.width; H = r.height;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`; canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = 9;
      lanes = Array.from({ length: n }, (_, i) => {
        const k = i / (n - 1);
        return [
          [W * (-0.05 + 0.25 * k), H * (1.08 + 0.05 * Math.sin(k * 3))],
          [W * (0.32 + 0.12 * k), H * (0.92 - 0.18 * k)],
          [W * (0.62 + 0.02 * k), H * (0.62 - 0.06 * k)],
          [W * (1.06 + 0.04 * k), H * (-0.06 + 0.1 * k)],
        ] as [V, V, V, V];
      });
      const want = Math.round(Math.min(2600, Math.max(900, (W * H) / 520)));
      while (ps.length < want) ps.push(spawn(Math.random()));
      ps.length = want;
    };
    const spawn = (t = 0): P => ({
      lane: Math.floor(Math.random() * 9), t, v: 0.0006 + Math.random() * 0.0016,
      off: (Math.random() + Math.random() + Math.random() - 1.5) * 1.3, size: Math.random() < 0.12 ? 2.2 : 1.1 + Math.random() * 0.9,
      aqua: Math.random() < 0.22, a: 0.35 + Math.random() * 0.6,
    });
    const at = (b: [V, V, V, V], t: number): [V, V] => {
      const u = 1 - t;
      const x = u * u * u * b[0][0] + 3 * u * u * t * b[1][0] + 3 * u * t * t * b[2][0] + t * t * t * b[3][0];
      const y = u * u * u * b[0][1] + 3 * u * u * t * b[1][1] + 3 * u * t * t * b[2][1] + t * t * t * b[3][1];
      const dx = 3 * u * u * (b[1][0] - b[0][0]) + 6 * u * t * (b[2][0] - b[1][0]) + 3 * t * t * (b[3][0] - b[2][0]);
      const dy = 3 * u * u * (b[1][1] - b[0][1]) + 6 * u * t * (b[2][1] - b[1][1]) + 3 * t * t * (b[3][1] - b[2][1]);
      const len = Math.hypot(dx, dy) || 1;
      return [[x, y], [-dy / len, dx / len]];
    };
    const draw = (step: boolean) => {
      ctx.clearRect(0, 0, W, H);
      const lanesGap = Math.max(10, H * 0.022);
      for (const p of ps) {
        if (step) { p.t += p.v; if (p.t > 1) Object.assign(p, spawn(0)); }
        const [[x, y], [nx, ny]] = at(lanes[p.lane], p.t);
        // tight on the arc, scattering as the dots leave it (livepeer's spray)
        const spread = lanesGap * (0.35 + Math.pow(p.t, 3) * 9);
        const px = x + nx * p.off * spread, py = y + ny * p.off * spread;
        const fade = Math.min(1, p.t * 6) * Math.min(1, (1 - p.t) * 5);
        ctx.globalAlpha = p.a * fade;
        ctx.fillStyle = p.aqua ? "#22d3ee" : "#e6f6ff";
        ctx.fillRect(px, py, p.size, p.size);
      }
      ctx.globalAlpha = 1;
    };
    const loop = () => { raf = 0; if (!visible) return; draw(true); raf = requestAnimationFrame(loop); };
    const start = () => { if (!raf && visible && !reduce) raf = requestAnimationFrame(loop); };

    layout();
    if (reduce) { for (let i = 0; i < 1; i++) draw(false); } else start();
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting && !document.hidden; if (visible) start(); }, { threshold: 0 });
    io.observe(el);
    const vis = () => { visible = !document.hidden; if (visible) start(); };
    document.addEventListener("visibilitychange", vis);
    const ro = new ResizeObserver(() => { layout(); if (reduce) draw(false); });
    ro.observe(el);
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); document.removeEventListener("visibilitychange", vis); };
  }, [video]);

  return (
    <div className="fh-wrap">
    <section ref={wrap} className="fh" aria-label="Rawlins">
      {video ? (
        <video className="fh-canvas" autoPlay muted loop playsInline preload="metadata" poster={video.poster} aria-hidden="true">
          {video.webm && <source src={video.webm} type="video/webm" />}
          {video.mp4 && <source src={video.mp4} type="video/mp4" />}
        </video>
      ) : (
        <canvas ref={cv} className="fh-canvas" aria-hidden="true" />
      )}
      <div className="fh-in">{children}</div>
      {next && (
        <a className="fh-next" href={next}>
          Scroll to explore <span aria-hidden="true">↓</span>
        </a>
      )}
    </section>
    </div>
  );
}
