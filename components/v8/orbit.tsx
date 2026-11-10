"use client";
/* Who we work with, as a globe of photos turning slowly around the headline
   (Nicole, Nov 10: like scale.com's, on a light grey background, nothing off
   the page). The photos sit on a tilted sphere that keeps spinning on its own
   and turns a little faster as you scroll: photos at the front are bigger and
   brighter, photos at the back smaller and dimmer. The words always sit on
   top, on a soft halo, and a photo dims while it passes behind them. The globe always fits
   inside the section. Pointing at a photo pauses the spin so it can be
   clicked; each one links to that industry.
   Under the headline, one name at a time steps through everyone we work with
   as you scroll (scale.com's changing word), big and readable, and its tile on
   the ring lights up. Under 1100px wide (phones and tablets) there's no ring:
   two rows of tiles slide sideways under the words as you scroll; reduced
   motion gets the globe standing still and the names as a list. No tile may sit
   on the words: the words are above every tile, and within 32px of the text
   block (the eyebrow down to the bars) a tile dims (full site pass, Part 1, 2.4). */
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
    /* the photos' places on a sphere (spread evenly), turned by theta */
    const pts = ts.map((_, i) => { const y = 1 - (2 * (i + 0.5)) / N, r = Math.sqrt(1 - y * y), ph = i * 2.39996; return { x: Math.cos(ph) * r, y: y * 0.92, z: Math.sin(ph) * r }; });
    let theta = 0.6, speed = 1, target = 1, last = 0, loop = 0, inView = false;
    const draw = (open: number, turn: number) => {
      const W = ring.clientWidth, H = ring.clientHeight;
      const box = block();
      const base = Math.min(150, Math.max(96, W * 0.095)), big = 1.2;
      // the whole globe fits inside the section, with a margin
      const rx = Math.max(0, W / 2 - (base * big) / 2 - 28) * (0.45 + 0.55 * open);
      const ry = Math.max(0, H / 2 - (base * big) / 2 - 28) * (0.45 + 0.55 * open);
      const ca = Math.cos(turn), sa = Math.sin(turn), ct = Math.cos(0.3), st = Math.sin(0.3);
      ts.forEach((t, i) => {
        const p = pts[i];
        const x1 = p.x * ca + p.z * sa, z1 = -p.x * sa + p.z * ca;
        const y2 = p.y * ct - z1 * st, z2 = p.y * st + z1 * ct;
        const d = (z2 + 1) / 2; // 1 = nearest
        const sc = 0.48 + 0.72 * d, half = (base * sc) / 2;
        const x = x1 * rx, y = y2 * ry;
        /* behind the words (they always sit on top, on a soft halo), a photo dims and can't be clicked */
        const out = Math.max(box.l - (x + half), x - half - box.r, box.t - (y + half), y - half - box.b);
        const clear = Math.max(0, Math.min(1, out / 36));
        t.style.transform = `translate3d(${(x - base / 2).toFixed(1)}px, ${(y - base / 2).toFixed(1)}px, 0) scale(${sc.toFixed(3)})`;
        t.style.width = t.style.height = `${base}px`;
        // set as important so the lit tile can't jump in front of the words either
        t.style.setProperty("opacity", ((0.3 + 0.7 * d) * (0.3 + 0.7 * clear) * Math.min(1, open * 1.4)).toFixed(3), "important");
        t.style.setProperty("z-index", String(Math.round(d * 50)), "important");
        t.style.pointerEvents = clear > 0.6 ? "auto" : "none";
        t.style.filter = d < 0.35 ? `blur(${((0.35 - d) * 4).toFixed(1)}px)` : "";
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
      if (still) { draw(1, 0.6); return; }
      const enter = Math.max(0, Math.min(1, (vh - r.top) / (vh * 0.9)));
      const hold = Math.max(0, Math.min(1, -r.top / Math.max(1, el.offsetHeight - vh)));
      draw(easeOut(enter), theta + hold * 1.4);
      show(Math.min(N - 1, Math.floor(hold * 0.999 * N)));
    };
    /* the globe keeps turning on its own while it's on screen */
    const spin = (now: number) => {
      loop = 0;
      if (!inView || mode !== "ring" || still || document.hidden) return;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      speed += (target - speed) * 0.08;
      theta += dt * speed * ((Math.PI * 2) / 75); // one turn about every 75 seconds
      tick();
      loop = requestAnimationFrame(spin);
    };
    const go = () => { if (!loop) { last = 0; loop = requestAnimationFrame(spin); } };
    const io = new IntersectionObserver(([e]) => { inView = e.isIntersecting; if (inView) go(); }, { threshold: 0 });
    io.observe(el);
    const over = (e: Event) => { target = (e.target as HTMLElement).closest(".orb-t") ? 0 : 1; };
    const leave = () => { target = 1; };
    ring.addEventListener("pointerover", over);
    ring.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", go);
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const setMode = () => {
      mode = window.innerWidth < 1100 ? "strip" : "ring";
      still = reduce.matches;
      el.dataset.mode = mode;
      if (still) el.dataset.static = ""; else delete el.dataset.static;
      if (mode === "strip") ts.forEach((t) => { t.style.cssText = ""; });
      tick();
      go();
    };
    setMode();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", setMode);
    reduce.addEventListener?.("change", setMode);
    return () => {
      io.disconnect();
      cancelAnimationFrame(loop);
      ring.removeEventListener("pointerover", over);
      ring.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", go);
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
