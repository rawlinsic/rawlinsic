"use client";
/* What we do, as chapters (scale.com's hero move). The section holds still
   while you scroll. One layered glass visual stays on screen: it opens up
   for the intro, then holds beside each area's words and glides to the other
   side for the next area, swapping to that area's photo on the way. Words
   come and go per chapter. The rail at the bottom jumps to any area.
   Phones and reduced motion get the same content as stacked cards. */
import { useEffect, useRef } from "react";
import { glideTo } from "@/components/v8/smooth";
import { docTop } from "@/components/v8/panels";
import SkipNext from "@/components/v8/skip-next";

export type Chapter = { id: string; name: string; tag: string; lead: string; quote: string; href: string; photo: string; services: { name: string; href: string }[] };

const PER = 0.9; // screen heights of scrolling per chapter
const ease = (t: number) => t * t * (3 - 2 * t);

export default function Chapters({ intro, items }: { intro: { k: string; h: string; lead: string }; items: Chapter[] }) {
  const ref = useRef<HTMLElement>(null);
  const n = items.length; // chapters after the intro

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const vis = el.querySelector<HTMLElement>(".wwd-vis")!;
    const imgs = Array.from(el.querySelectorAll<HTMLElement>(".wwd-photo img"));
    const frames = Array.from(el.querySelectorAll<HTMLElement>("[data-frame]"));
    const rail = Array.from(el.querySelectorAll<HTMLElement>(".wwd-rail li"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0, live = false, last = -1;

    const tick = () => {
      raf = 0;
      if (!live) return;
      const r = el.getBoundingClientRect();
      const total = Math.max(1, el.offsetHeight - window.innerHeight);
      const p = Math.max(0, Math.min(1, -r.top / total));
      const s = p * (n + 0.5); // 0 = intro, k = chapter k; the last half step holds the last chapter
      const f = Math.floor(s), t = s - f;
      const g = Math.min(n, f + ease(Math.max(0, Math.min(1, (t - 0.5) / 0.5)))); // hold, then glide
      // the visual: intro = centered and closed; chapter k = right (odd) or left (even)
      const open = Math.min(1, g);
      const side = g < 1 ? g : Math.cos(Math.PI * (g - 1));
      vis.style.setProperty("--x", side.toFixed(4));
      vis.style.setProperty("--open", open.toFixed(4));
      imgs.forEach((im, k) => { im.style.opacity = String(Math.max(0, Math.min(1, 1 - Math.abs(Math.max(1, g) - (k + 1)) * 1.6)).toFixed(3)); });
      const active = Math.round(g);
      if (active !== last) {
        last = active;
        frames.forEach((fr) => { const k = Number(fr.dataset.frame); fr.dataset.state = k === active ? "on" : k < active ? "after" : "before"; });
      }
      rail.forEach((li, k) => li.style.setProperty("--lp", Math.max(0, Math.min(1, s - k - 0.5)).toFixed(3)));
      rail.forEach((li, k) => { const on = active === k + 1; if (on !== ("on" in li.dataset)) { if (on) li.dataset.on = ""; else delete li.dataset.on; } });
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const mode = () => {
      live = window.innerWidth >= 960 && !reduce.matches;
      if (live) { delete el.dataset.static; last = -1; tick(); }
      else { el.dataset.static = ""; frames.forEach((fr) => { fr.dataset.state = "on"; }); }
    };
    const go = (e: Event) => {
      const b = (e.target as HTMLElement).closest<HTMLElement>("[data-goto]");
      if (!b || !el.contains(b)) return;
      const k = Number(b.dataset.goto);
      if (!live) { el.querySelector<HTMLElement>(`[data-frame="${k}"]`)?.scrollIntoView({ block: "start" }); return; }
      const total = el.offsetHeight - window.innerHeight;
      glideTo(docTop(el) + total * ((k + 0.05) / (n + 0.5)));
    };
    mode();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", mode);
    reduce.addEventListener?.("change", mode);
    el.addEventListener("click", go);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", mode);
      reduce.removeEventListener?.("change", mode);
      el.removeEventListener("click", go);
      cancelAnimationFrame(raf);
    };
  }, [n]);

  return (
    <section ref={ref} id="what" className="wwd" aria-labelledby="wwd-h" style={{ ["--len" as string]: `${(n + 0.5) * PER * 100 + 100}vh` }}>
      <div className="wwd-stage">
        <div className="wwd-vis" aria-hidden="true">
          <div className="wwd-plane wwd-wire" />
          <div className="wwd-plane wwd-dots" />
          <div className="wwd-plane wwd-photo">
            {items.map((c, k) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img key={c.id} src={c.photo} alt="" loading={k ? "lazy" : "eager"} style={{ opacity: k ? 0 : 1 }} />
            ))}
          </div>
          <div className="wwd-plane wwd-glass" />
        </div>

        <div className="wwd-intro" data-frame={0}>
          <p className="v8-eyebrow">{intro.k}</p>
          <h2 id="wwd-h" className="v8-h2">{intro.h}</h2>
          <p className="v8-lead">{intro.lead}</p>
        </div>

        {items.map((c, k) => (
          <article key={c.id} className={`wwd-ch ${k % 2 ? "is-right" : "is-left"}`} data-frame={k + 1} aria-labelledby={`wwd-${c.id}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="wwd-ch-img" src={c.photo} alt="" loading="lazy" />
            <p className="wwd-k">{c.tag}</p>
            <h3 id={`wwd-${c.id}`}><a href={c.href}>{c.name}</a></h3>
            <p className="wwd-lead">{c.lead}</p>
            <blockquote className="wwd-q">{c.quote}</blockquote>
            <ul className="wwd-svcs" aria-label={`${c.name} services`}>
              {c.services.map((s) => <li key={s.href}><a href={s.href}>{s.name}</a></li>)}
            </ul>
            <a className="v8-btn v8-btn-glow" href={c.href}>Explore {c.name}</a>
          </article>
        ))}

        <SkipNext className="skip-wwd" />
        <nav className="wwd-rail" aria-label="Jump to an area">
          <ol>
            {items.map((c, k) => (
              <li key={c.id}><button type="button" data-goto={k + 1}>{c.name}<i aria-hidden="true" /></button></li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}
