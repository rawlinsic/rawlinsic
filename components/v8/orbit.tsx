"use client";
/* Who we work with, as a ring of photos around the headline (scale.com's
   "Real Research" move). The tiles sit on a tilted ring: tiles at the front
   are bigger and brighter, tiles at the back smaller and dimmer. As the
   section arrives the ring opens out from behind the headline, then turns as
   you scroll while the section holds. Each tile links to that industry.
   Under the headline, one name at a time steps through everyone we work with
   as you scroll (scale.com's changing word), big and readable, and its tile on
   the ring lights up. Under 1100px wide (phones and tablets) there's no ring:
   two rows of tiles slide sideways under the words as you scroll; reduced
   motion gets the ring standing still and the names as a list. No tile may sit
   on the words: any tile that would come within 32px of the text block (the
   eyebrow down to the bars) is pushed outward (full site pass, Part 1, 2.4). */
import { useEffect, useRef, type ReactNode } from "react";

/* note: preview-only label on a tile production keeps off the ring ("Placeholder photo", "No project yet") */
export type Tile = { src: string; label: string; href: string; sub?: string; note?: string };

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export default function Orbit({ tiles, children }: { tiles: Tile[]; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ring = el.querySelector<HTMLElement>(".orb-ring")!;
    const center = el.querySelector<HTMLElement>(".orb-center")!;
    const ts = Array.from(el.querySelectorAll<HTMLElement>(".orb-t"));
    const words = Array.from(el.querySelectorAll<HTMLElement>(".orb-word"));
    const bars = Array.from(el.querySelectorAll<HTMLElement>(".orb-bars i"));
    let cur = -1;
    const show = (k: number) => {
      if (k === cur) return;
      cur = k;
      [ts, words, bars].forEach((g) => g.forEach((x, i) => x.classList.toggle("is-on", i === k)));
      words.forEach((w, i) => w.querySelector("a")?.setAttribute("tabindex", i === k ? "0" : "-1"));
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const N = ts.length;
    let raf = 0, mode: "ring" | "strip" = "ring", still = false;

    /* the text block, eyebrow to bars, plus 32px, measured from the ring's center */
    const block = () => {
      const rr = ring.getBoundingClientRect();
      const cx = rr.left + rr.width / 2, cy = rr.top + rr.height / 2;
      let l = Infinity, t = Infinity, r = -Infinity, b = -Infinity;
      Array.from(center.children).forEach((k) => {
        const q = k.getBoundingClientRect();
        if (!q.width || !q.height) return;
        l = Math.min(l, q.left); t = Math.min(t, q.top); r = Math.max(r, q.right); b = Math.max(b, q.bottom);
      });
      return { l: l - cx - 32, t: t - cy - 32, r: r - cx + 32, b: b - cy + 32 };
    };
    const draw = (open: number, turn: number) => {
      const W = ring.clientWidth, H = ring.clientHeight;
      const box = block();
      // wide enough that the tiles pass around the words, not over them
      const rx = Math.min(W * 0.46, 700) * (0.35 + 0.65 * open);
      const ry = Math.min(H * 0.45, 370) * (0.35 + 0.65 * open);
      const base = Math.min(138, Math.max(92, W * 0.09));
      ts.forEach((t, i) => {
        const a = turn + (i / N) * Math.PI * 2;
        let x = Math.cos(a) * rx, y = Math.sin(a) * ry;
        const d = (1 + Math.cos(a - (3 * Math.PI) / 4)) / 2; // nearest at the lower left, as on scale.com
        const sc = 0.5 + 0.62 * d;
        /* keep clear of the words: push the tile out along its ray until it's outside the block */
        const half = (base * sc) / 2;
        if (x + half > box.l && x - half < box.r && y + half > box.t && y - half < box.b) {
          const th = x ? ((x > 0 ? box.r : -box.l) + half) / Math.abs(x) : Infinity;
          const tv = y ? ((y > 0 ? box.b : -box.t) + half) / Math.abs(y) : Infinity;
          const k = Math.max(1, Math.min(th, tv));
          x *= k; y *= k;
        }
        t.style.transform = `translate3d(${(x - base / 2).toFixed(1)}px, ${(y - base / 2).toFixed(1)}px, 0) scale(${sc.toFixed(3)})`;
        t.style.width = t.style.height = `${base}px`;
        t.style.opacity = String((0.25 + 0.75 * d) * Math.min(1, open * 1.4));
        t.style.zIndex = String(Math.round(d * 50));
      });
    };
    const tick = () => {
      raf = 0;
      const r = el.getBoundingClientRect(), vh = window.innerHeight;
      if (mode === "strip") {
        const q = Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)));
        el.style.setProperty("--ox", `${(-q * 40).toFixed(2)}%`);
        show(Math.min(N - 1, Math.floor(Math.max(0, Math.min(0.999, (vh * 0.55 - r.top) / Math.max(1, r.height * 0.8))) * N)));
        return;
      }
      if (still) { draw(1, -0.35); return; }
      const enter = Math.max(0, Math.min(1, (vh - r.top) / (vh * 0.9)));
      const hold = Math.max(0, Math.min(1, -r.top / Math.max(1, el.offsetHeight - vh)));
      draw(easeOut(enter), -1.1 + enter * 0.9 + hold * 1.6);
      show(Math.min(N - 1, Math.floor(hold * 0.999 * N)));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const setMode = () => {
      mode = window.innerWidth < 1100 ? "strip" : "ring";
      still = reduce.matches;
      el.dataset.mode = mode;
      if (still) el.dataset.static = ""; else delete el.dataset.static;
      if (mode === "strip") ts.forEach((t) => { t.style.cssText = ""; });
      tick();
    };
    setMode();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", setMode);
    reduce.addEventListener?.("change", setMode);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", setMode);
      reduce.removeEventListener?.("change", setMode);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={ref} className="h-orbit" aria-labelledby="orb-h">
      <div className="orb-stage">
        <div className="orb-ring" aria-hidden="true">
          {tiles.map((t) => (
            <a key={t.href + t.label} className="orb-t" href={t.href} tabIndex={-1}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.src} alt="" loading="lazy" />
              {t.note && <em className="v8-dev orb-dev">{t.note}</em>}
            </a>
          ))}
        </div>
        <div className="orb-center">
          {children}
          <ul className="orb-words" aria-label="Who we work with">
            {tiles.map((t, i) => (
              <li key={t.href + t.label} className={`orb-word${i ? "" : " is-on"}`}>
                <a href={t.href} tabIndex={i ? -1 : 0}>{t.label}</a>
                {t.sub && <span>{t.sub}</span>}
                {t.note && <em className="v8-dev">{t.note}</em>}
              </li>
            ))}
          </ul>
          <span className="orb-bars" aria-hidden="true">{tiles.map((t, i) => <i key={t.href + t.label} className={i ? "" : "is-on"} />)}</span>
        </div>
      </div>
    </section>
  );
}
