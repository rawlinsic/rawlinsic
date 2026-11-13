"use client";
/* Who we work with, built like scale.com's "Artificial Intelligence / Real
   ___" section (Nicole, Nov 10: "just copy scale's"). A single tilted ring of
   photos turns slowly and steadily around the words, on its own (one turn
   about every 60 seconds). Photos at the front (lower left) are big, photos at
   the back (upper right) small; all are fully visible, and the ring always
   fits inside the section. In the middle: "We work with", a line in the
   electric blue, a line of text, and one button (Nicole, Nov 10). Pointing
   at a photo pauses the ring, lights the photo, and fills the blue line with
   its name (Airports, Cities, ...). One steady ellipse: no tile is ever
   pushed or clamped, so nothing jumps. Under 1100px wide (phones and tablets) there's no ring: two rows of
   photos slide sideways as you scroll. Nov 12 (Nicole: on phones it "doesn't work"): under 1100px every photo shows
   whole, with its name, in a grid you can tap. Reduced motion: the ring stands still
   and the names show as a list. The ring pauses off screen and in a hidden
   tab. */
import { useEffect, useRef, type ReactNode } from "react";

/* note: preview-only label on a tile production keeps off the ring ("Placeholder photo", "No project yet") */
export type Tile = { src: string; label: string; href: string; sub?: string; note?: string };

const TURN = 60; // seconds per full turn
const STRIP_UNDER = 0; // screens narrower than this get the grid of photos with names instead of the ring
const TILT = -0.24; // the ring's tilt on screen (its right end higher), radians

/* after: shown under the ring on phones only (the home page's paragraph, which the ring would cover there) */
export default function Orbit({ tiles, children, cta, after }: { tiles: Tile[]; children: ReactNode; cta?: ReactNode; after?: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ring = el.querySelector<HTMLElement>(".orb-ring")!;
    const ts = Array.from(el.querySelectorAll<HTMLElement>(".orb-t"));
    const fill = el.querySelector<HTMLElement>(".orb-fill")!;
    const N = ts.length;
    const show = (k: number) => {
      ts.forEach((x, i) => x.classList.toggle("is-on", i === k));
      const next = k < 0 ? fill.dataset.default || "" : ts[k].dataset.name || "";
      if (fill.textContent !== next) fill.textContent = next;
      fill.style.setProperty("--fit", Math.min(1, 24 / Math.max(1, next.length)).toFixed(3));
      /* and never wider than the space it has (phones, Nov 12) */
      const room = (fill.parentElement?.clientWidth ?? 0) - 8, need = fill.scrollWidth;
      if (room > 0 && need > room) fill.style.setProperty("--fit", (parseFloat(fill.style.getPropertyValue("--fit")) * room / need).toFixed(3));
      fill.toggleAttribute("data-on", k >= 0);
    };
    const place = () => {};
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let mode: "ring" | "strip" = "ring", still = false, inView = false;
    let theta = 0, last = 0, loop = 0, raf = 0, held = -1, speed = 1, front = -1;
    const touch = window.matchMedia("(hover: none)").matches;

    const draw = () => {
      /* one steady tilted ellipse, like scale.com: nothing is pushed or clamped, so no tile ever jumps.
         The ellipse is sized so the tiles pass around the words, not over them. */
      const W = ring.clientWidth, H = ring.clientHeight;
      /* tighter around the words (Nicole, Nov 10: "too spaced out"), and the photos at the back not so tiny.
         Phones (Nov 12, like scale.com on a phone): bigger photos for the screen, and a wider ring whose ends run
         past the screen's edges, so the photos pass above, below, and beside the words, not over them */
      const phone = W < 700;
      const big = phone ? W * 0.27 : Math.min(160, Math.max(108, W * 0.1)), small = big * (phone ? 0.5 : 0.42);
      const rx = phone ? W * 0.56 : Math.max(0, Math.min(W / 2 - big / 2 - 30, 560, W * 0.4));
      const ry = phone ? H * 0.41 : Math.max(0, Math.min(H / 2 - big / 2 - 26, 330));
      const ct = Math.cos(TILT), st = Math.sin(TILT);
      ts.forEach((t, i) => {
        const a = theta + (i / N) * Math.PI * 2;
        const ex = Math.cos(a), ey = Math.sin(a);
        const x = rx * ex * ct - ry * ey * st, y = rx * ex * st + ry * ey * ct;
        const d = (1 - ex) / 2; // 1 = nearest (left end)
        const size = small + (big - small) * d, half = size / 2;
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
      draw(); place();
      /* phones and tablets can't point at a photo: the blue line names the photo at the front, as scale.com's does */
      if (touch && held < 0) {
        let k = 0, best = -2;
        ts.forEach((_, i) => { const c = Math.cos(theta + (i / N) * Math.PI * 2); if (-c > best) { best = -c; k = i; } });
        if (k !== front) { front = k; show(k); }
      }
      loop = requestAnimationFrame(frame);
    };
    const go = () => { if (!loop && inView && mode === "ring" && !still) { last = 0; loop = requestAnimationFrame(frame); } };
    /* phones and tablets: the rows slide with the scroll */
    const strip = () => {
      raf = 0;
      const r = el.getBoundingClientRect(), vh = window.innerHeight;
      const q = Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)));
      el.style.setProperty("--ox", `${(-q * 40).toFixed(2)}%`);
    };
    const on = () => { if (mode === "strip" && !raf) raf = requestAnimationFrame(strip); };
    const setMode = () => {
      /* Nov 12 (Nicole: phones like scale.com, as close to the computer as looks right): the ring on every screen.
         The grid of photos with names ("strip") stays below in case it's wanted back: set STRIP_UNDER to 1100. */
      mode = window.innerWidth < STRIP_UNDER ? "strip" : "ring";
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
      show(held);
    };
    const leave = () => { held = -1; show(-1); };
    ring.addEventListener("pointerover", over);
    ring.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", go);
    setMode();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", setMode);
    reduce.addEventListener?.("change", setMode);
    return () => {
      io.disconnect();
      cancelAnimationFrame(loop); cancelAnimationFrame(raf);
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
            <a key={t.src + t.label} className="orb-t" href={t.href} tabIndex={-1} data-name={t.label}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.src} alt="" loading="lazy" />
              {/* the name: shown on phones and tablets, and on the ring when you point at a photo */}
              <span>{t.label}</span>
            </a>
          ))}
        </div>
        <div className="orb-center">
          {children}
          {/* for keyboards and screen readers: the groups as links (the photos are decoration) */}
          <ul className="sr-only" aria-label="Who we work with">
            {Array.from(new Map(tiles.map((t) => [t.label, t.href])).entries()).map(([label, href]) => <li key={label}><a href={href}>{label}</a></li>)}
          </ul>
          {cta}
        </div>
      </div>
      {after && <div className="orb-after">{after}</div>}
    </section>
  );
}
