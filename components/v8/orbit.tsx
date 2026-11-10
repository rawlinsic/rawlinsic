"use client";
/* Who we work with, built like scale.com's "Artificial Intelligence / Real
   ___" section (Nicole, Nov 10: "just copy scale's"). A single tilted ring of
   photos turns slowly and steadily around the words, on its own (one turn
   about every 60 seconds). Photos at the front (lower left) are big, photos at
   the back (upper right) small; all are fully visible, and the ring always
   fits inside the section. In the middle: the headline, a second line that
   changes every couple of seconds through everyone we work with (in the
   electric blue, a link to that page), and one button. Pointing at a photo
   pauses the ring and shows that photo's name. The ring keeps clear of the
   words. Under 1100px wide (phones and tablets) there's no ring: two rows of
   photos slide sideways as you scroll. Reduced motion: the ring stands still
   and the names show as a list. The ring pauses off screen and in a hidden
   tab. */
import { useEffect, useRef, type ReactNode } from "react";

/* note: preview-only label on a tile production keeps off the ring ("Placeholder photo", "No project yet") */
export type Tile = { src: string; label: string; href: string; sub?: string; note?: string };

const TURN = 60; // seconds per full turn
const STEP = 2.4; // seconds per name
const TILT = -0.24; // the ring's tilt on screen (its right end higher), radians

export default function Orbit({ tiles, children, cta }: { tiles: Tile[]; children: ReactNode; cta?: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ring = el.querySelector<HTMLElement>(".orb-ring")!;
    const center = el.querySelector<HTMLElement>(".orb-center")!;
    const ts = Array.from(el.querySelectorAll<HTMLElement>(".orb-t"));
    const words = Array.from(el.querySelectorAll<HTMLElement>(".orb-word"));
    const N = ts.length;
    let cur = -1;
    const show = (k: number) => {
      if (k === cur) return;
      cur = k;
      [ts, words].forEach((g) => g.forEach((x, i) => x.classList.toggle("is-on", i === k)));
      words.forEach((w, i) => w.querySelector("a")?.setAttribute("tabindex", i === k ? "0" : "-1"));
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let mode: "ring" | "strip" = "ring", still = false, inView = false;
    let theta = 0, last = 0, loop = 0, raf = 0, clock = 0, held = -1, speed = 1;

    /* the words' box (headline to button) plus 28px, from the ring's center */
    const block = () => {
      const rr = ring.getBoundingClientRect();
      const cx = rr.left + rr.width / 2, cy = rr.top + rr.height / 2;
      let l = Infinity, t = Infinity, r = -Infinity, b = -Infinity;
      center.querySelectorAll(".orb-h, .orb-word.is-on a, .orb-cta").forEach((k) => {
        const q = k.getBoundingClientRect();
        if (!q.width || !q.height) return;
        l = Math.min(l, q.left); t = Math.min(t, q.top); r = Math.max(r, q.right); b = Math.max(b, q.bottom);
      });
      return { l: l - cx - 28, t: t - cy - 28, r: r - cx + 28, b: b - cy + 28 };
    };
    const draw = () => {
      const W = ring.clientWidth, H = ring.clientHeight;
      const box = block();
      const big = Math.min(140, Math.max(100, W * 0.092)), small = big * 0.27;
      const rx = Math.max(0, Math.min(W / 2 - big / 2 - 24, W * 0.38));
      const ry = Math.max(0, Math.min(H / 2 - big / 2 - 20, H * 0.36));
      const ct = Math.cos(TILT), st = Math.sin(TILT);
      ts.forEach((t, i) => {
        const a = theta + (i / N) * Math.PI * 2;
        const ex = Math.cos(a), ey = Math.sin(a);
        let x = rx * ex * ct - ry * ey * st, y = rx * ex * st + ry * ey * ct;
        const d = (1 - ex) / 2; // 1 = nearest (left end)
        const size = small + (big - small) * d, half = size / 2;
        /* keep clear of the words: move out along the ray, but never past the section's edge */
        if (x + half > box.l && x - half < box.r && y + half > box.t && y - half < box.b) {
          const kx = x ? ((x > 0 ? box.r : -box.l) + half) / Math.abs(x) : Infinity;
          const ky = y ? ((y > 0 ? box.b : -box.t) + half) / Math.abs(y) : Infinity;
          const k = Math.max(1, Math.min(kx, ky));
          x *= k; y *= k;
        }
        x = Math.max(-W / 2 + half + 8, Math.min(W / 2 - half - 8, x));
        y = Math.max(-H / 2 + half + 8, Math.min(H / 2 - half - 8, y));
        t.style.transform = `translate3d(${(x - half).toFixed(1)}px, ${(y - half).toFixed(1)}px, 0)`;
        t.style.width = t.style.height = `${size.toFixed(1)}px`;
        t.style.zIndex = String(Math.round(d * 50));
      });
    };
    const frame = (now: number) => {
      loop = 0;
      if (!inView || mode !== "ring" || still || document.hidden) return;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      speed += ((held >= 0 ? 0 : 1) - speed) * 0.1;
      theta -= dt * speed * ((Math.PI * 2) / TURN); // the bottom moves right, the top left, as on scale.com
      draw();
      loop = requestAnimationFrame(frame);
    };
    const go = () => { if (!loop && inView && mode === "ring" && !still) { last = 0; loop = requestAnimationFrame(frame); } };
    /* the changing name: every couple of seconds, or the photo you point at */
    const cycle = () => { if (held < 0 && inView && !still) show((cur + 1) % N); };
    /* phones and tablets: the rows slide with the scroll */
    const strip = () => {
      raf = 0;
      const r = el.getBoundingClientRect(), vh = window.innerHeight;
      const q = Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)));
      el.style.setProperty("--ox", `${(-q * 40).toFixed(2)}%`);
    };
    const on = () => { if (mode === "strip" && !raf) raf = requestAnimationFrame(strip); };
    const setMode = () => {
      mode = window.innerWidth < 1100 ? "strip" : "ring";
      still = reduce.matches;
      el.dataset.mode = mode;
      if (still) el.dataset.static = ""; else delete el.dataset.static;
      if (mode === "strip") { ts.forEach((t) => { t.style.cssText = ""; }); strip(); }
      else draw();
      go();
    };
    const io = new IntersectionObserver(([e]) => { inView = e.isIntersecting; go(); }, { threshold: 0 });
    io.observe(el);
    const over = (e: Event) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>(".orb-t");
      held = t ? ts.indexOf(t) : -1;
      if (held >= 0) show(held);
    };
    const leave = () => { held = -1; };
    ring.addEventListener("pointerover", over);
    ring.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", go);
    show(0);
    setMode();
    clock = window.setInterval(cycle, STEP * 1000);
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", setMode);
    reduce.addEventListener?.("change", setMode);
    return () => {
      io.disconnect();
      cancelAnimationFrame(loop); cancelAnimationFrame(raf);
      window.clearInterval(clock);
      ring.removeEventListener("pointerover", over);
      ring.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", go);
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", setMode);
      reduce.removeEventListener?.("change", setMode);
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
            </a>
          ))}
        </div>
        <div className="orb-center">
          {children}
          <ul className="orb-words" aria-label="Who we work with">
            {tiles.map((t, i) => (
              <li key={t.href + t.label} className={`orb-word${i ? "" : " is-on"}`}>
                {/* a long name gets a little smaller, so it's never wider than the headline */}
                <a href={t.href} tabIndex={i ? -1 : 0} style={{ ["--fit" as string]: Math.min(1, 31 / t.label.length).toFixed(3) }}>{t.label}</a>
                {t.note && <em className="v8-dev">{t.note}</em>}
              </li>
            ))}
          </ul>
          {cta}
        </div>
      </div>
    </section>
  );
}
