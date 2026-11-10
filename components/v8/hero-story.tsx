"use client";
/* The home opening as one scroll story (Nicole, Nov 9; scale.com's move). The
   section holds still while you scroll:
   1. the hero: the video fills the block, with the tagline and headline on it;
   2. the video zooms out into the layered glass frame (the planes fan out
      behind it) on navy;
   3. the frame bounces right, left, right, with words on the opposite side
      each time (Nicole writes these; they're in HOME_STORY in site.ts);
   4. the frame flies to the left and turns into the scrolling team strip
      while the Why Rawlins panel slides in beside it.
   Phones and reduced motion get the same pieces stacked: the hero, the steps,
   then the Why Rawlins card. The video is paused off screen, in a hidden tab,
   and for reduced motion; the button pauses and plays it. */
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type R = { x: number; y: number; w: number; h: number };
export type Step = { k?: string; h: string; p: string };

const ease = (t: number) => t * t * (3 - 2 * t);
const c01 = (x: number) => Math.max(0, Math.min(1, x));
const mix = (a: R, b: R, t: number): R => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, w: a.w + (b.w - a.w) * t, h: a.h + (b.h - a.h) * t });
const PER = 0.85; // screen heights of scrolling per beat

export default function HeroStory({ video, hero, steps, whyLeft, whyRight, next }: { video: { src: string; poster: string }; hero: ReactNode; steps: Step[]; whyLeft: ReactNode; whyRight: ReactNode; next?: string }) {
  const ref = useRef<HTMLElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const kick = useRef<() => void>(() => {});
  const N = steps.length;
  const beats = N + 2.3; // zoom out, each step, the Why Rawlins panel, a short hold

  // the video: muted loop; paused off screen, in a hidden tab, and for reduced motion
  useEffect(() => {
    const el = ref.current, v = vid.current;
    if (!el || !v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { pausedRef.current = true; setPaused(true); }
    let visible = true;
    const sync = () => { if (visible && !document.hidden && !pausedRef.current) v.play().catch(() => {}); else v.pause(); };
    kick.current = sync;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync(); }, { threshold: 0 });
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => { io.disconnect(); document.removeEventListener("visibilitychange", sync); };
  }, []);

  // the scroll story
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const stage = el.querySelector<HTMLElement>(".hs-stage")!;
    const vis = el.querySelector<HTMLElement>(".hs-vis")!;
    const heroEl = el.querySelector<HTMLElement>(".hs-hero")!;
    const texts = Array.from(el.querySelectorAll<HTMLElement>(".hs-step"));
    const why = el.querySelector<HTMLElement>(".hs-why")!;
    const people = el.querySelector<HTMLElement>(".hs-why .wc-people");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0, live = false, full: R, center: R, sides: R[] = [], whyR: R;

    const layout = () => {
      const W = stage.clientWidth, H = stage.clientHeight, m = Math.max(8, Math.min(14, W * 0.01));
      full = { x: m, y: m, w: W - 2 * m, h: H - 2 * m };
      const cw = Math.min(W * 0.56, 920), ch = Math.min(cw / 1.6, H * 0.62);
      center = { x: (W - cw) / 2, y: (H - ch) / 2, w: cw, h: ch };
      const sw = Math.min(W * 0.44, 760), sh = Math.min(sw / 1.45, H * 0.66);
      sides = steps.map((_, i) => ({ x: i % 2 ? W * 0.47 - sw : W * 0.53, y: (H - sh) / 2, w: sw, h: sh })); // 1st right, 2nd left, ...
      if (people) {
        why.style.opacity = "1";
        const s = stage.getBoundingClientRect(), p = people.getBoundingClientRect();
        whyR = { x: p.left - s.left, y: p.top - s.top, w: p.width, h: p.height };
      } else whyR = { ...center };
    };
    const sideSign = (i: number) => (i % 2 ? -1 : 1);
    const tick = () => {
      raf = 0;
      if (!live) return;
      const r = el.getBoundingClientRect(), total = Math.max(1, el.offsetHeight - stage.clientHeight);
      const s = c01((68 - r.top) / total) * beats;
      let rect: R, x = 0, open = 1, media = 1;
      if (s < 1) { const t = ease(c01(s)); rect = mix(full, center, t); open = t; }
      else if (s < N + 1) {
        const k = Math.min(N - 1, Math.floor(s - 1)), u = s - 1 - k, t = ease(c01(u / 0.35));
        const prev = k === 0 ? center : sides[k - 1], px = k === 0 ? 0 : sideSign(k - 1);
        rect = mix(prev, sides[k], t); x = px + (sideSign(k) - px) * t;
      } else {
        const u = s - N - 1, t = ease(c01(u / 0.5));
        rect = mix(sides[N - 1], whyR, t); x = sideSign(N - 1) * (1 - t); open = 1 - t; media = 1 - c01((u - 0.25) / 0.35);
      }
      vis.style.transform = `translate3d(${rect.x.toFixed(1)}px, ${rect.y.toFixed(1)}px, 0)`;
      vis.style.width = `${rect.w.toFixed(1)}px`; vis.style.height = `${rect.h.toFixed(1)}px`;
      vis.style.setProperty("--x", x.toFixed(3)); vis.style.setProperty("--open", open.toFixed(3));
      vis.style.setProperty("--rad", `${(28 - 10 * Math.min(1, s)).toFixed(1)}px`);
      vis.style.opacity = media.toFixed(3);
      el.style.setProperty("--zoom", c01(s).toFixed(3)); // navy comes up around the frame
      const h = 1 - c01(s / 0.22);
      heroEl.style.opacity = h.toFixed(3); heroEl.style.visibility = h < 0.01 ? "hidden" : "visible";
      texts.forEach((t, i) => {
        const u = s - 1 - i;
        const inn = c01((u - 0.3) / 0.25), out = i === N - 1 ? c01((s - N - 1) / 0.2) : c01((u - 0.85) / 0.15);
        const o = Math.min(inn, 1 - out);
        t.style.setProperty("--o", o.toFixed(3)); t.toggleAttribute("data-on", o > 0.5);
      });
      const wu = s - N - 1;
      why.style.setProperty("--wl", c01((wu - 0.3) / 0.35).toFixed(3));
      why.style.setProperty("--wr", ease(c01(wu / 0.6)).toFixed(3));
      why.toggleAttribute("data-on", wu > 0.4);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const mode = () => {
      live = window.innerWidth >= 960 && !reduce.matches;
      if (live) { delete el.dataset.static; layout(); tick(); }
      else { el.dataset.static = ""; [vis, heroEl, why, ...texts].forEach((n) => { n.style.cssText = ""; }); }
    };
    mode();
    const ro = new ResizeObserver(() => { if (live) { layout(); tick(); } });
    ro.observe(stage);
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", mode);
    reduce.addEventListener?.("change", mode);
    return () => { ro.disconnect(); window.removeEventListener("scroll", on); window.removeEventListener("resize", mode); reduce.removeEventListener?.("change", mode); cancelAnimationFrame(raf); };
  }, [N, beats, steps]);

  const toggle = () => { const p = !pausedRef.current; pausedRef.current = p; setPaused(p); kick.current(); };

  return (
    <section ref={ref} className="hs" data-nofill aria-label="Rawlins" style={{ ["--hs-len" as string]: `calc(100vh + ${Math.round(beats * PER * 100)}vh)` } as CSSProperties}>
      <div className="hs-stage">
        <div className="hs-navy" aria-hidden="true" />
        <div className="hs-top">
          <div className="hs-vis" aria-hidden="true">
            <div className="hs-tilt">
              <div className="hs-plane hs-wire" />
              <div className="hs-plane hs-dots" />
              <div className="hs-plane hs-media">
                <video ref={vid} src={video.src} poster={video.poster} muted loop playsInline preload="auto" />
                <i className="hs-shade" />
              </div>
              <div className="hs-plane hs-glass" />
            </div>
          </div>
          <div className="hs-hero">{hero}</div>
          <button type="button" className="fh-pause hs-pause" onClick={toggle} aria-label={paused ? "Play background video" : "Pause background video"}>
            {paused
              ? <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
              : <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><rect x="6.5" y="5" width="3.6" height="14" rx="1" fill="currentColor" /><rect x="13.9" y="5" width="3.6" height="14" rx="1" fill="currentColor" /></svg>}
          </button>
          {next && <a className="fh-next hs-next" href={next}>Scroll to explore <span aria-hidden="true">↓</span></a>}
        </div>
        {steps.map((st, i) => (
          <div key={i} className={`hs-step ${i % 2 ? "is-right" : "is-left"}`}>
            {st.k && <p className="hs-k">{st.k}</p>}
            <h2>{st.h}</h2>
            <p>{st.p}</p>
          </div>
        ))}
        <div className="hs-why">
          <div className="wc-card">
            <div className="hs-why-left">{whyLeft}</div>
            <div className="hs-why-right">{whyRight}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
