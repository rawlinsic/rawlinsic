"use client";
/* The home page's opening: a full-width navy block with a moving background
   drawn in code (no video, no photo). An abstract view at night from far above:
   glowing trails of light flow along sweeping lanes from both sides and merge
   into one wide arc low in the frame; a few thin, slow arcs cross above like
   flight paths; fine lines link points of light where paths meet, like a
   network. Navy (#0b1830 to #1d3759), aqua (#22d3ee, #a5f3fc), a little soft
   white. The center stays dark and calm behind the tagline; the brightest
   light is in the lower third and at the edges.
   - Loops with no seam: every moving thing is a function of time within one
     18-second cycle, so the last frame is the first.
   - 30 frames a second, device pixel ratio capped at 2, paused off screen and
     in a hidden tab; reduced motion shows one still frame.
   - A pause/play button (44px, visible focus ring); the canvas is aria-hidden.
   - Until the first frame is drawn, the block shows a still CSS version. */
import { useEffect, useRef, useState, type ReactNode } from "react";

type V = [number, number];
type Lane = [V, V, V, V];
type Dot = { lane: number; ph: number; k: number; off: number; size: number; col: number; a: number; tw: number };

const LOOP = 18; // seconds in one cycle
const FPS = 30;
const COLORS = ["#22d3ee", "#a5f3fc", "#f2fbff"]; // aqua, soft aqua, soft white
const smooth = (a: number, b: number, x: number) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
// a fixed random sequence, so the scene is the same on every load
const rng = (seed: number) => () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };

function bez(b: Lane, t: number): [V, V] {
  const u = 1 - t;
  const x = u * u * u * b[0][0] + 3 * u * u * t * b[1][0] + 3 * u * t * t * b[2][0] + t * t * t * b[3][0];
  const y = u * u * u * b[0][1] + 3 * u * u * t * b[1][1] + 3 * u * t * t * b[2][1] + t * t * t * b[3][1];
  const dx = 3 * u * u * (b[1][0] - b[0][0]) + 6 * u * t * (b[2][0] - b[1][0]) + 3 * t * t * (b[3][0] - b[2][0]);
  const dy = 3 * u * u * (b[1][1] - b[0][1]) + 6 * u * t * (b[2][1] - b[1][1]) + 3 * t * t * (b[3][1] - b[2][1]);
  const len = Math.hypot(dx, dy) || 1;
  return [[x, y], [-dy / len, dx / len]];
}
/* a soft glowing point, drawn once per color and stamped for every dot */
function sprite(color: string): HTMLCanvasElement {
  const c = document.createElement("canvas"); c.width = c.height = 32;
  const g = c.getContext("2d")!, r = g.createRadialGradient(16, 16, 0, 16, 16, 16);
  r.addColorStop(0, color); r.addColorStop(0.18, color); r.addColorStop(0.42, `${color}55`); r.addColorStop(1, `${color}00`);
  g.fillStyle = r; g.fillRect(0, 0, 32, 32);
  return c;
}

export default function FlowHero({ children, next }: { children: ReactNode; next?: string }) {
  const wrap = useRef<HTMLElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const [paused, setPaused] = useState(false);
  const [still, setStill] = useState(false); // reduced motion
  const pausedRef = useRef(false);
  const kick = useRef<() => void>(() => {});

  useEffect(() => {
    const el = wrap.current, canvas = cv.current;
    if (!el || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setStill(reduce);
    if (reduce) { pausedRef.current = true; setPaused(true); }
    const sprites = COLORS.map(sprite);
    let W = 0, H = 0, raf = 0, visible = true, last = 0, clock = 0, prev = 0;
    let lanes: Lane[] = [], arcs: Lane[] = [], dots: Dot[] = [], nodes: { x: number; y: number; ph: number }[] = [], links: [number, number][] = [];

    const layout = () => {
      const r = el.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = r.width; H = r.height;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`; canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // lanes from both sides that sweep down and in, merging into one wide arc at the bottom
      lanes = [];
      const per = 7;
      for (const side of [0, 1]) for (let i = 0; i < per; i++) {
        const k = i / (per - 1), m = (x: number) => (side ? W - x : x);
        const y0 = H * (0.3 + 0.62 * k);
        lanes.push([[m(-0.03 * W), y0], [m((0.16 + 0.04 * k) * W), y0 + 0.1 * H * (1 - k)], [m(0.36 * W), H * (0.8 + 0.06 * k)], [m(0.5 * W), H * 1.07]]);
      }
      // thin flight paths crossing above
      arcs = [
        [[-0.05 * W, 0.44 * H], [0.28 * W, -0.06 * H], [0.72 * W, -0.06 * H], [1.05 * W, 0.4 * H]],
        [[-0.05 * W, 0.68 * H], [0.18 * W, 0.08 * H], [0.6 * W, -0.02 * H], [1.05 * W, 0.16 * H]],
        [[-0.05 * W, 0.14 * H], [0.42 * W, 0.02 * H], [0.8 * W, 0.12 * H], [1.05 * W, 0.62 * H]],
      ];
      // points where paths meet, linked like a network
      nodes = [];
      lanes.forEach((ln, i) => { if (i % 2 === 0) for (const t of [0.42, 0.66, 0.86]) { const [[x, y]] = bez(ln, t); nodes.push({ x, y, ph: (i * 7 + t * 10) % 1 }); } });
      arcs.forEach((a, i) => { for (const t of [0.08, 0.92]) { const [[x, y]] = bez(a, t); nodes.push({ x, y, ph: (i * 3 + t) % 1 }); } });
      links = [];
      const near = Math.max(90, W * 0.11);
      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) if (Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y) < near) links.push([i, j]);
      // the dots: a fixed set, each on its lane with a phase and a whole number of trips per cycle (seamless)
      const want = Math.round(Math.min(1800, Math.max(700, (W * H) / 640)));
      const rand = rng(7);
      dots = Array.from({ length: want }, () => {
        const c = rand();
        return { lane: Math.floor(rand() * lanes.length), ph: rand(), k: rand() < 0.65 ? 1 : 2, off: (rand() + rand() + rand() - 1.5) * 1.25, size: rand() < 0.1 ? 2.6 : 1.2 + rand() * 1.1, col: c < 0.6 ? 0 : c < 0.88 ? 1 : 2, a: 0.35 + rand() * 0.55, tw: rand() };
      });
    };

    /* calm center: light fades out around the tagline; brightest low and at the edges */
    const mask = (x: number, y: number) => {
      // the text block (tagline, headline, line, buttons) sits in the middle
      const ex = (x - 0.5 * W) / (0.43 * W), ey = (y - 0.5 * H) / (0.41 * H);
      const d = Math.sqrt(ex * ex + ey * ey);
      const calm = smooth(0.82, 1.3, d);
      const low = 0.45 + 0.55 * smooth(0.45 * H, 0.95 * H, y);
      const edge = 0.6 + 0.4 * smooth(0.18 * W, 0.46 * W, Math.abs(x - 0.5 * W));
      return calm * Math.max(low, edge);
    };

    const draw = (time: number) => {
      const c = (time % LOOP) / LOOP; // 0..1 through the cycle
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      // flight paths: faint thin lines with a slow light traveling along each
      ctx.lineWidth = 1;
      arcs.forEach((a, i) => {
        ctx.strokeStyle = "rgba(165, 243, 252, 0.07)";
        ctx.beginPath(); ctx.moveTo(a[0][0], a[0][1]); ctx.bezierCurveTo(a[1][0], a[1][1], a[2][0], a[2][1], a[3][0], a[3][1]); ctx.stroke();
        for (let j = 0; j < 14; j++) {
          const t = ((c + i / 3) % 1) - j * 0.006;
          if (t < 0) continue;
          const [[x, y]] = bez(a, t), f = (1 - j / 14) * mask(x, y) * Math.min(1, t * 8) * Math.min(1, (1 - t) * 8);
          if (f < 0.01) continue;
          ctx.globalAlpha = 0.55 * f; const s = 9 - j * 0.4; ctx.drawImage(sprites[j ? 1 : 2], x - s / 2, y - s / 2, s, s);
        }
      });
      // network: fine lines between points where paths meet, points that breathe
      ctx.lineWidth = 0.7;
      for (const [i, j] of links) {
        const p = nodes[i], q = nodes[j], f = Math.min(mask(p.x, p.y), mask(q.x, q.y));
        if (f < 0.02) continue;
        ctx.strokeStyle = `rgba(34, 211, 238, ${(0.1 * f).toFixed(3)})`;
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
      }
      for (const n of nodes) {
        const f = mask(n.x, n.y); if (f < 0.02) continue;
        const b = 0.55 + 0.45 * Math.sin(2 * Math.PI * (c * 3 + n.ph));
        ctx.globalAlpha = 0.8 * f * b; ctx.drawImage(sprites[1], n.x - 7, n.y - 7, 14, 14);
      }
      // the trails: dots flowing along the lanes into the arc
      const gap = Math.max(10, H * 0.024);
      for (const d of dots) {
        const t = (d.ph + c * d.k) % 1;
        const [[x, y], [nx, ny]] = bez(lanes[d.lane], t);
        const spread = gap * (1.25 - 0.85 * t); // strands tighten as they merge
        const px = x + nx * d.off * spread, py = y + ny * d.off * spread;
        const fade = Math.min(1, t * 7) * Math.min(1, (1 - t) * 7);
        const tw = 0.75 + 0.25 * Math.sin(2 * Math.PI * (c * 4 + d.tw));
        const f = d.a * fade * tw * mask(px, py);
        if (f < 0.01) continue;
        ctx.globalAlpha = f; const s = d.size * 4.2; ctx.drawImage(sprites[d.col], px - s / 2, py - s / 2, s, s);
      }
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = "source-over";
    };

    const frame = (now: number) => {
      raf = 0;
      if (!visible || pausedRef.current) return;
      if (now - last >= 1000 / FPS - 1) {
        clock += prev ? Math.min(0.1, (now - prev) / 1000) : 0; prev = now; last = now;
        draw(clock);
      }
      raf = requestAnimationFrame(frame);
    };
    const start = () => { if (!raf && visible && !pausedRef.current) { prev = 0; raf = requestAnimationFrame(frame); } };
    kick.current = () => { if (pausedRef.current) { cancelAnimationFrame(raf); raf = 0; } else start(); };

    layout();
    clock = LOOP * 0.37; // a good still frame to start from
    draw(clock); el.classList.add("is-live");
    start();
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting && !document.hidden; if (visible) start(); else { cancelAnimationFrame(raf); raf = 0; } }, { threshold: 0 });
    io.observe(el);
    const vis = () => { visible = !document.hidden; if (visible) start(); else { cancelAnimationFrame(raf); raf = 0; } };
    document.addEventListener("visibilitychange", vis);
    const ro = new ResizeObserver(() => { layout(); draw(clock); });
    ro.observe(el);
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); document.removeEventListener("visibilitychange", vis); };
  }, []);

  const toggle = () => { const p = !pausedRef.current; pausedRef.current = p; setPaused(p); kick.current(); };

  return (
    <div className="fh-wrap">
      <section ref={wrap} className="fh" aria-label="Rawlins">
        <canvas ref={cv} className="fh-canvas" aria-hidden="true" />
        <div className="fh-in">{children}</div>
        <button type="button" className="fh-pause" onClick={toggle} aria-label={paused ? "Play background animation" : "Pause background animation"} title={still && paused ? "Motion is reduced in your settings. Play anyway?" : undefined}>
          {paused
            ? <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
            : <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><rect x="6.5" y="5" width="3.6" height="14" rx="1" fill="currentColor" /><rect x="13.9" y="5" width="3.6" height="14" rx="1" fill="currentColor" /></svg>}
        </button>
        {next && (
          <a className="fh-next" href={next}>
            Scroll to explore <span aria-hidden="true">↓</span>
          </a>
        )}
      </section>
    </div>
  );
}
