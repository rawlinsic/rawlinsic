"use client";
/* Who we work with, as a ring of photos around the headline (scale.com's
   "Real Research" move). The tiles sit on a tilted ring: tiles at the front
   are bigger and brighter, tiles at the back smaller and dimmer. As the
   section arrives the ring opens out from behind the headline, then turns as
   you scroll while the section holds. Each tile links to that industry.
   Phones get two rows of tiles that slide sideways as you scroll; reduced
   motion gets the ring standing still. */
import { useEffect, useRef, type ReactNode } from "react";

export type Tile = { src: string; label: string; href: string };

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export default function Orbit({ tiles, children }: { tiles: Tile[]; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ring = el.querySelector<HTMLElement>(".orb-ring")!;
    const ts = Array.from(el.querySelectorAll<HTMLElement>(".orb-t"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const N = ts.length;
    let raf = 0, mode: "ring" | "strip" = "ring", still = false;

    const draw = (open: number, turn: number) => {
      const W = ring.clientWidth, H = ring.clientHeight;
      const rx = Math.min(W * 0.44, 640) * (0.35 + 0.65 * open);
      const ry = Math.min(H * 0.36, 300) * (0.35 + 0.65 * open);
      const base = Math.min(138, Math.max(92, W * 0.09));
      ts.forEach((t, i) => {
        const a = turn + (i / N) * Math.PI * 2;
        const x = Math.cos(a) * rx, y = Math.sin(a) * ry;
        const d = (1 + Math.cos(a - (3 * Math.PI) / 4)) / 2; // nearest at the lower left, as on scale.com
        const sc = 0.5 + 0.62 * d;
        t.style.transform = `translate3d(${(x - base / 2).toFixed(1)}px, ${(y - base / 2).toFixed(1)}px, 0) scale(${sc.toFixed(3)})`;
        t.style.width = t.style.height = `${base}px`;
        t.style.opacity = String((0.25 + 0.75 * d) * Math.min(1, open * 1.4));
        t.style.zIndex = String(Math.round(d * 100));
      });
    };
    const tick = () => {
      raf = 0;
      const r = el.getBoundingClientRect(), vh = window.innerHeight;
      if (mode === "strip") {
        const q = Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)));
        el.style.setProperty("--ox", `${(-q * 40).toFixed(2)}%`);
        return;
      }
      if (still) { draw(1, -0.35); return; }
      const enter = Math.max(0, Math.min(1, (vh - r.top) / (vh * 0.9)));
      const hold = Math.max(0, Math.min(1, -r.top / Math.max(1, el.offsetHeight - vh)));
      draw(easeOut(enter), -1.1 + enter * 0.9 + hold * 1.6);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const setMode = () => {
      mode = window.innerWidth < 700 ? "strip" : "ring";
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
              <span>{t.label}</span>
            </a>
          ))}
        </div>
        <div className="orb-center">{children}</div>
      </div>
    </section>
  );
}
