"use client";
/* The five service tiles, popping out as you scroll (scale.com's move; Nicole,
   Nov 9). The section holds still while you scroll through it:
   1. it opens on the five photo tiles in a row, as before ("Our services");
   2. the first tile grows to fill half the screen and that area's words come in
      beside it, side by side;
   3. it settles back into a small preview along the bottom and the next tile
      pops out on the other side, through all five.
   The previews along the bottom show where you are and jump to an area.
   Phones and reduced motion get the same words and photos as stacked cards. */
import { useEffect, useRef, type CSSProperties } from "react";
import { glideTo } from "@/components/v8/smooth";
import { docTop } from "@/components/v8/panels";

export type TourArea = { id: string; name: string; tag: string; lead: string; href: string; photo: string; pos?: string; services: { name: string; href: string }[] };
type R = { x: number; y: number; w: number; h: number };

const PER = 0.95; // screen heights of scrolling per area
const ease = (t: number) => t * t * (3 - 2 * t);
const c01 = (x: number) => Math.max(0, Math.min(1, x));
const mix = (a: R, b: R, t: number): R => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, w: a.w + (b.w - a.w) * t, h: a.h + (b.h - a.h) * t });

export default function TilesTour({ label, areas, id, hideLabel }: { label: string; areas: TourArea[]; id?: string; hideLabel?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const n = areas.length;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const stage = el.querySelector<HTMLElement>(".tt-stage")!;
    const tiles = Array.from(el.querySelectorAll<HTMLElement>(".tt-tile"));
    const texts = Array.from(el.querySelectorAll<HTMLElement>(".tt-text"));
    const k = el.querySelector<HTMLElement>(".tt-k");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0, live = false, row: R[] = [], rail: R[] = [], feat: R[] = [], textBox = { top: 0, h: 0 };

    const layout = () => {
      const W = stage.clientWidth, H = stage.clientHeight;
      const pad = Math.max(12, Math.min(28, W * 0.016)), gap = 10;
      // 1. the row, like the home tiles (the first one wider)
      const wts = areas.map((_, i) => (i === 0 ? 3.3 : 1)), sum = wts.reduce((a, b) => a + b, 0);
      const unit = (W - 2 * pad - gap * (n - 1)) / sum, top = 58, rowH = Math.min(H - top - pad, Math.max(320, Math.min(560, window.innerHeight * 0.52)));
      let x = pad;
      row = wts.map((w) => { const r = { x, y: top, w: unit * w, h: rowH }; x += unit * w + gap; return r; });
      // 2. the previews along the bottom
      const tw = Math.max(84, Math.min(150, W * 0.095)), th = tw * 0.62, total = n * tw + (n - 1) * gap;
      const ry = H - th - pad;
      rail = areas.map((_, i) => ({ x: (W - total) / 2 + i * (tw + gap), y: ry, w: tw, h: th }));
      // 3. popped out: half the stage, alternating sides, above the previews
      const fw = W * 0.5 - pad * 1.5, fh = ry - pad * 2.2;
      feat = areas.map((_, i) => ({ x: i % 2 ? W - pad - fw : pad, y: pad, w: fw, h: fh }));
      textBox = { top: pad, h: fh };
      texts.forEach((t) => { t.style.top = `${textBox.top}px`; t.style.height = `${textBox.h}px`; });
    };
    const place = (t: HTMLElement, r: R, rad: number) => {
      t.style.transform = `translate3d(${r.x.toFixed(1)}px, ${r.y.toFixed(1)}px, 0)`;
      t.style.width = `${r.w.toFixed(1)}px`; t.style.height = `${r.h.toFixed(1)}px`;
      t.style.borderRadius = `${rad.toFixed(1)}px`;
    };
    const tick = () => {
      raf = 0;
      if (!live) return;
      const r = el.getBoundingClientRect(), total = Math.max(1, el.offsetHeight - stage.clientHeight);
      const s = c01((68 - r.top) / total) * n; // 0..n through the five areas
      const out = ease(c01(s / 0.35)); // the row folds into the previews as the first tile pops out
      tiles.forEach((t, i) => {
        const a = s - i;
        // each tile pops out as the one before settles (they cross, so the stage is never empty)
        const up = i === 0 ? c01(a / 0.3) : c01((a + 0.1) / 0.2), down = i === n - 1 ? 0 : c01((a - 0.9) / 0.1);
        const f = ease(Math.min(up, 1 - down)); // how popped out this tile is
        const rest = mix(row[i], rail[i], out);
        place(t, mix(rest, feat[i], f), 20 - 10 * out + 8 * f);
        t.style.setProperty("--lab", (1 - out).toFixed(3));
        t.style.zIndex = String(f > 0.01 ? 3 : 1);
        t.toggleAttribute("data-on", out > 0.5 && f > 0.5);
        const o = c01((f - 0.7) / 0.3);
        texts[i].style.setProperty("--o", o.toFixed(3));
        texts[i].toggleAttribute("data-on", o > 0.5);
      });
      if (k) k.style.opacity = (1 - c01(s / 0.2)).toFixed(3);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const mode = () => {
      live = window.innerWidth >= 960 && !reduce.matches;
      if (live) { delete el.dataset.static; layout(); tick(); }
      else { el.dataset.static = ""; tiles.forEach((t) => { t.style.cssText = ""; }); texts.forEach((t) => { t.style.cssText = ""; t.setAttribute("data-on", ""); }); }
    };
    // a preview along the bottom jumps to its area
    const go = (e: MouseEvent) => {
      if (!live) return;
      const t = (e.target as HTMLElement).closest<HTMLElement>(".tt-tile");
      if (!t || t.hasAttribute("data-on")) return;
      const s0 = ((68 - el.getBoundingClientRect().top) / Math.max(1, el.offsetHeight - stage.clientHeight)) * n;
      if (s0 < 0.2) return; // in the row they work as links, like the home tiles
      e.preventDefault();
      const i = Number(t.dataset.i), total = el.offsetHeight - stage.clientHeight;
      glideTo(docTop(el) - 68 + total * ((i + 0.5) / n));
    };
    mode();
    const ro = new ResizeObserver(() => { if (live) { layout(); tick(); } });
    ro.observe(stage);
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", mode);
    reduce.addEventListener?.("change", mode);
    el.addEventListener("click", go);
    return () => { ro.disconnect(); window.removeEventListener("scroll", on); window.removeEventListener("resize", mode); reduce.removeEventListener?.("change", mode); el.removeEventListener("click", go); cancelAnimationFrame(raf); };
  }, [n, areas]);

  return (
    <section ref={ref} id={id} className="tt" data-nofill data-nopanel aria-label={label} style={{ ["--tt-len" as string]: `calc(100vh + ${Math.round(n * PER * 100)}vh)` } as CSSProperties}>
      <div className="tt-stage">
        {!hideLabel && <p className="tt-k">{label}</p>}
        {areas.map((a, i) => (
          <div key={a.id} className="tt-area">
            <a className="tt-tile" href={a.href} data-i={i} aria-label={a.name}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={a.photo} alt="" loading={i ? "lazy" : "eager"} style={a.pos ? { objectPosition: a.pos } : undefined} />
              <span className="tt-name" aria-hidden="true">{a.name}</span>
            </a>
            <div className={`tt-text ${i % 2 ? "is-left" : "is-right"}`}>
              <p className="tt-tag">{a.tag}</p>
              <h3>{a.name}</h3>
              <p className="tt-lead">{a.lead}</p>
              <ul className="tt-svcs" aria-label={`${a.name} services`}>
                {a.services.map((s) => <li key={s.href}><a href={s.href}>{s.name}</a></li>)}
              </ul>
              <a className="v8-btn" href={a.href}>Explore {a.name}</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
