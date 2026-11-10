"use client";
/* The home opening as one scroll story (Nicole, Nov 9; scale.com's move). The
   section holds still while you scroll:
   1. the hero: the video fills the block, with the tagline and headline on it;
   2. the video zooms out into the layered glass frame (the planes fan out
      behind it) on navy;
   3. the frame moves right, then left, with words on the opposite side each
      time (HOME_STORY in site.ts and home.tsx). A side's eyebrow, headline,
      words, and button come in one after another as you scroll. A side with
      items (What sets us apart) steps through them one per scroll: the
      headline and words change, the frame shows that item's picture (the
      team, the numbers, a project you can click, a diagram), and a ticker
      shows where you are, with a skip button. It can open with an intro on
      its own: the headline's letters glow on as you scroll while the frame
      shows the items' titles lighting up one by one (no video). A
      one-message side can put a picture in the frame too (How we work: the
      five service areas as still tiles);
   4. like scale.com: the frame drifts up and fades while a glass block with
      the team statement rises from the bottom (its words light up, the first
      ones in electric blue) and the scrolling team strip rises on its left.
      The navy stays.
   Phones and reduced motion get the same pieces stacked: the hero, each side
   with its items and pictures, then the team block. The video is paused off
   screen, in a hidden tab, while a picture covers it, and for reduced motion;
   the button pauses and plays it. */
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { glideTo } from "@/components/v8/smooth";
import { docTop } from "@/components/v8/panels";

type R = { x: number; y: number; w: number; h: number };
export type StoryItem = { h: string; p: string; link?: { label: string; href: string }; visual?: ReactNode; phoneVisual?: ReactNode };
/* a side: one message (h, p, cta, and a picture for the frame), or items stepped through one per scroll,
   optionally after an intro that says what they are on its own first */
export type Step = { k?: string; h?: string; p?: string; cta?: { label: string; href: string }; visual?: ReactNode; intro?: { h: string; p?: string }; items?: StoryItem[] };

const ease = (t: number) => t * t * (3 - 2 * t);
const c01 = (x: number) => Math.max(0, Math.min(1, x));
const mix = (a: R, b: R, t: number): R => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, w: a.w + (b.w - a.w) * t, h: a.h + (b.h - a.h) * t });
const two = (n: number) => String(n).padStart(2, "0");
const PER = 0.85; // screen heights of scrolling per beat
const STEP = 1.7; // beats for a side with one message: its words come in one after another, with time to read
const LEAD = 0.45, ITEM = 1, INTRO = 1.3; // a side with items: a short lead-in, its intro on its own (letters glow on), then one beat per item
const PW = 720, PH = 500; // the frame's pictures are laid out at this size, then scaled to fit the frame

export default function HeroStory({ video, hero, steps, whyLeft, whyRight, next }: { video: { src: string; poster: string }; hero: ReactNode; steps: Step[]; whyLeft: ReactNode; whyRight: ReactNode; next?: string }) {
  const ref = useRef<HTMLElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const covered = useRef(false); // a picture (or nothing) is over the video, so it needn't play
  const kick = useRef<() => void>(() => {});
  const N = steps.length;
  const pre = steps.map((st) => (st.items?.length ? LEAD + (st.intro ? INTRO : 0) : 0)); // beats before the first item
  const lens = steps.map((st, i) => (st.items?.length ? pre[i] + st.items.length * ITEM : STEP));
  const starts = lens.map((_, i) => 1 + lens.slice(0, i).reduce((a, b) => a + b, 0));
  const sEnd = 1 + lens.reduce((a, b) => a + b, 0); // where the team block starts
  const beats = sEnd + 1.3; // zoom out, each side, the team block, a short hold
  const sig = lens.join(",") + "|" + pre.join(",");

  // the video: muted loop; paused off screen, in a hidden tab, while covered, and for reduced motion
  useEffect(() => {
    const el = ref.current, v = vid.current;
    if (!el || !v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { pausedRef.current = true; setPaused(true); }
    let visible = true;
    const sync = () => { if (visible && !document.hidden && !pausedRef.current && !covered.current) v.play().catch(() => {}); else v.pause(); };
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
    const pause = el.querySelector<HTMLElement>(".hs-pause");
    const pansBox = el.querySelector<HTMLElement>(".hs-pans");
    const lit = Array.from(why.querySelectorAll<HTMLElement>(".lit-w"));
    const items = texts.map((t) => Array.from(t.querySelectorAll<HTMLElement>(".hs-item:not(.hs-intro)")));
    const intros = texts.map((t) => t.querySelector<HTMLElement>(".hs-intro"));
    const glows = texts.map((t) => Array.from(t.querySelectorAll<HTMLElement>(".hs-gl")));
    const tickRows = texts.map((t) => (t.querySelector(".hs-intro") ? t.querySelector<HTMLElement>(".hs-tick") : null));
    const teasers = texts.map((_, i) => el.querySelector<HTMLElement>(`.hs-pan[data-step="${i}"][data-j="intro"]`));
    const teaseItems = teasers.map((t) => (t ? Array.from(t.querySelectorAll<HTMLElement>("li")) : []));
    const eyebrows = texts.map((t) => (t.querySelector(".hs-intro") ? t.querySelector<HTMLElement>(".hs-k") : null));
    const solo = texts.map((_, i) => el.querySelector<HTMLElement>(`.hs-pan[data-step="${i}"][data-j="-1"]`));
    const ticks = texts.map((t) => Array.from(t.querySelectorAll<HTMLElement>(".hs-tick-b")));
    const counts = texts.map((t) => t.querySelector<HTMLElement>(".hs-count"));
    const pans = texts.map((_, i) => Array.from(el.querySelectorAll<HTMLElement>(`.hs-pan[data-step="${i}"]:not([data-j="-1"]):not([data-j="intro"])`)));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0, live = false, full: R, center: R, sides: R[] = [];

    const layout = () => {
      const W = stage.clientWidth, H = stage.clientHeight, m = Math.max(8, Math.min(14, W * 0.01));
      full = { x: m, y: m, w: W - 2 * m, h: H - 2 * m };
      const cw = Math.min(W * 0.56, 920), ch = Math.min(cw / 1.6, H * 0.62);
      center = { x: (W - cw) / 2, y: (H - ch) / 2, w: cw, h: ch };
      const sw = Math.min(W * 0.44, 760), sh = Math.min(sw / 1.45, H * 0.66);
      sides = steps.map((_, i) => ({ x: i % 2 ? W * 0.47 - sw : W * 0.53, y: (H - sh) / 2, w: sw, h: sh })); // 1st right, 2nd left, ...
      if (pansBox) pansBox.style.setProperty("--fit", Math.min(sw / PW, sh / PH).toFixed(4));
    };
    const sideSign = (i: number) => (i % 2 ? -1 : 1);
    const tick = () => {
      raf = 0;
      if (!live) return;
      const r = el.getBoundingClientRect(), total = Math.max(1, el.offsetHeight - stage.clientHeight);
      const s = c01((68 - r.top) / total) * beats;
      let rect: R, x = 0, open = 1, media = 1;
      if (s < 1) { const t = ease(c01(s)); rect = mix(full, center, t); open = t; }
      else if (s < sEnd) {
        let k = 0;
        while (k < N - 1 && s >= starts[k + 1]) k++;
        const t = ease(c01((s - starts[k]) / 0.37));
        const prev = k === 0 ? center : sides[k - 1], px = k === 0 ? 0 : sideSign(k - 1);
        rect = mix(prev, sides[k], t); x = px + (sideSign(k) - px) * t;
      } else {
        // like scale.com: the frame drifts up and fades while the block and the
        // team strip rise from the bottom into place
        const u = s - sEnd, up = ease(c01(u / 0.7));
        const last = sides[N - 1];
        rect = { ...last, y: last.y - up * stage.clientHeight * 0.55 }; x = sideSign(N - 1); media = 1 - c01(u / 0.6);
      }
      vis.style.transform = `translate3d(${rect.x.toFixed(1)}px, ${rect.y.toFixed(1)}px, 0)`;
      vis.style.width = `${rect.w.toFixed(1)}px`; vis.style.height = `${rect.h.toFixed(1)}px`;
      vis.style.setProperty("--x", x.toFixed(3)); vis.style.setProperty("--open", open.toFixed(3));
      vis.style.setProperty("--rad", `${(28 - 10 * Math.min(1, s)).toFixed(1)}px`);
      vis.style.opacity = media.toFixed(3);
      el.style.setProperty("--zoom", c01(s).toFixed(3)); // navy comes up around the frame
      const h = 1 - c01(s / 0.22);
      heroEl.style.opacity = h.toFixed(3); heroEl.style.visibility = h < 0.01 ? "hidden" : "visible";
      let cover = 0;
      texts.forEach((t, i) => {
        const a = s - starts[i], many = items[i].length > 0;
        const inn = many ? c01((a - 0.1) / 0.4) : c01((a / STEP - 0.15) / 0.55);
        const out = i === N - 1 ? c01((s - sEnd) / 0.2) : c01((a - (lens[i] - 0.17)) / 0.17);
        t.style.setProperty("--in", inn.toFixed(3)); t.style.setProperty("--out", out.toFixed(3));
        t.style.visibility = inn > 0 && out < 1 ? "visible" : "hidden";
        t.toggleAttribute("data-on", inn > 0.8 && out < 0.5);
        const sp = solo[i];
        if (sp) { // a one-message side's picture fills the frame once it has moved over
          // it hands over to the next side's picture (crossfade), so the video doesn't come back in between
          const o = Math.min(c01((a - 0.3) / 0.3), 1 - (i === N - 1 ? c01((s - sEnd) / 0.3) : c01((a - (lens[i] - 0.1)) / 0.2)));
          sp.style.opacity = o.toFixed(3); sp.style.visibility = o > 0.01 ? "visible" : "hidden";
          cover = Math.max(cover, o);
        }
        const tz = teasers[i];
        if (tz) { // the TV during the intro: the five, lighting up one by one (no video)
          const o = Math.min(c01((a + 0.1) / 0.2), 1 - c01(((a - pre[i]) / ITEM + 0.12) / 0.14));
          tz.style.opacity = o.toFixed(3); tz.style.visibility = o > 0.01 ? "visible" : "hidden";
          cover = Math.max(cover, o);
          const nt = Math.round(c01((a - 0.3) / Math.max(0.3, pre[i] - 0.7)) * teaseItems[i].length);
          teaseItems[i].forEach((x, k) => x.classList.toggle("is-lit", k < nt));
        }
        if (!many) return;
        // one item at a time: the headline and words change, the frame's picture crossfades
        const n = items[i].length, p = (a - pre[i]) / ITEM, hasIntro = !!intros[i];
        const intro = intros[i], eb = eyebrows[i];
        if (intro) { // the intro says what's coming on its own, then steps aside for the first item
          const o = Math.min(c01((a - 0.1) / 0.25), 1 - c01((p + 0.16) / 0.1));
          intro.style.opacity = o.toFixed(3); intro.style.transform = `translateY(${((1 - o) * 14).toFixed(1)}px)`;
          intro.style.visibility = o > 0.01 ? "visible" : "hidden";
          const nl = Math.round(c01((a - 0.15) / Math.max(0.3, pre[i] - 0.6)) * glows[i].length); // the letters glow on as you scroll
          glows[i].forEach((x, k) => x.classList.toggle("is-lit", k < nl));
        }
        const tr = tickRows[i];
        if (tr) { const o = c01((p + 0.06) / 0.12); tr.style.opacity = o.toFixed(3); tr.style.visibility = o > 0.01 ? "visible" : "hidden"; } // ticker and skip come with the first item
        if (eb) { const o = c01((p + 0.06) / 0.12); eb.style.opacity = o.toFixed(3); eb.style.visibility = o > 0.01 ? "visible" : "hidden"; }
        items[i].forEach((it, j) => {
          const o = Math.min(j === 0 && !hasIntro ? c01((p + 0.35) / 0.25) : c01((p - (j - 0.06)) / 0.12), j === n - 1 ? 1 : 1 - c01((p - (j + 0.84)) / 0.1));
          it.style.opacity = o.toFixed(3); it.style.transform = `translateY(${((1 - o) * 14).toFixed(1)}px)`;
          it.style.visibility = o > 0.01 ? "visible" : "hidden";
        });
        pans[i].forEach((pn, j) => {
          const o = Math.min(j === 0 && !hasIntro ? c01((p + 0.3) / 0.3) : c01((p - (j - 0.12)) / 0.14), j === n - 1 ? 1 : 1 - c01((p - (j + 0.9)) / 0.12));
          pn.style.opacity = o.toFixed(3); pn.style.visibility = o > 0.01 ? "visible" : "hidden";
          pn.classList.toggle("is-on", o > 0.3); // diagrams draw in each time their item comes up
          cover = Math.max(cover, o);
        });
        const cur = Math.max(0, Math.min(n - 1, Math.floor(p + 0.06)));
        ticks[i].forEach((b, j) => { b.style.setProperty("--f", c01(p - j + 0.06).toFixed(3)); b.setAttribute("aria-current", j === cur ? "step" : "false"); });
        const c = counts[i], label = `${two(cur + 1)} / ${two(n)}`;
        if (c && c.textContent !== label) c.textContent = label;
      });
      const hide = cover > 0.99 || media < 0.01;
      if (hide !== covered.current) { covered.current = hide; kick.current(); }
      if (pause) { const po = media * (1 - cover); pause.style.opacity = po.toFixed(3); pause.style.visibility = po < 0.01 ? "hidden" : "visible"; } // goes with the video
      const wu = s - sEnd;
      why.style.setProperty("--wr", ease(c01(wu / 0.8)).toFixed(3)); // the block
      why.style.setProperty("--wl", ease(c01((wu - 0.12) / 0.8)).toFixed(3)); // the team strip, a beat behind
      why.toggleAttribute("data-on", wu > 0.5);
      const nl = Math.round(c01((wu - 0.35) / 0.7) * lit.length); // the block's words light up as it settles
      lit.forEach((w, i) => w.classList.toggle("is-lit", i < nl));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const mode = () => {
      live = window.innerWidth >= 960 && !reduce.matches;
      if (live) { delete el.dataset.static; layout(); tick(); }
      else {
        el.dataset.static = "";
        [vis, heroEl, why, ...texts, ...items.flat(), ...pans.flat(), ...intros, ...eyebrows, ...solo, ...teasers, ...tickRows, ...(pause ? [pause] : [])].forEach((n) => { if (n) n.style.cssText = ""; });
        glows.flat().forEach((x) => x.classList.add("is-lit"));
        lit.forEach((w) => w.classList.add("is-lit"));
        if (covered.current) { covered.current = false; kick.current(); }
      }
    };
    // the ticker jumps to an item; skip goes to the team block
    const go = (e: MouseEvent) => {
      const b = (e.target as HTMLElement).closest<HTMLElement>("[data-go]");
      if (!b || !live) return;
      e.preventDefault();
      const total = el.offsetHeight - stage.clientHeight;
      glideTo(docTop(el) - 68 + (Number(b.dataset.go) / beats) * total);
    };
    mode();
    const ro = new ResizeObserver(() => { if (live) { layout(); tick(); } });
    ro.observe(stage);
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", mode);
    reduce.addEventListener?.("change", mode);
    el.addEventListener("click", go);
    return () => { ro.disconnect(); window.removeEventListener("scroll", on); window.removeEventListener("resize", mode); reduce.removeEventListener?.("change", mode); el.removeEventListener("click", go); cancelAnimationFrame(raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [N, beats, sig, steps]);

  const toggle = () => { const p = !pausedRef.current; pausedRef.current = p; setPaused(p); kick.current(); };

  return (
    <section ref={ref} className="hs" data-nofill aria-label="Rawlins" style={{ ["--hs-len" as string]: `calc(100vh + ${Math.round(beats * PER * 100)}vh)` } as CSSProperties}>
      <div className="hs-stage">
        <div className="hs-navy" aria-hidden="true" />
        <div className="hs-top">
          <div className="hs-vis">
            <div className="hs-tilt">
              <div className="hs-plane hs-wire" aria-hidden="true" />
              <div className="hs-plane hs-dots" aria-hidden="true" />
              <div className="hs-plane hs-media">
                <video ref={vid} src={video.src} poster={video.poster} muted loop playsInline preload="auto" aria-hidden="true" />
                <i className="hs-shade" aria-hidden="true" />
                {steps.some((st) => st.items?.length || st.visual) && (
                  <div className="hs-pans">
                    {steps.map((st, i) => st.items?.length
                      ? [
                          st.intro ? (
                            <div key={`${i}-intro`} className="hs-pan hs-tease" data-step={i} data-j="intro" aria-hidden="true">
                              <div className="hs-pan-in"><ol>{st.items.map((it, j) => <li key={j}><span>{two(j + 1)}</span>{it.h}</li>)}</ol></div>
                            </div>
                          ) : null,
                          ...st.items.map((it, j) => <div key={`${i}-${j}`} className="hs-pan" data-step={i} data-j={j}><div className="hs-pan-in">{it.visual}</div></div>),
                        ]
                      : st.visual ? <div key={`${i}-solo`} className="hs-pan" data-step={i} data-j="-1"><div className="hs-pan-in">{st.visual}</div></div> : null)}
                  </div>
                )}
              </div>
              <div className="hs-plane hs-glass" aria-hidden="true" />
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
        {steps.map((st, i) => st.items?.length ? (
          <div key={i} className={`hs-step hs-many ${i % 2 ? "is-right" : "is-left"}`}>
            {st.k && (st.intro ? <p className="hs-k" aria-hidden="true">{st.k}</p> : <h2 className="hs-k">{st.k}</h2>)}
            <div className="hs-items">
              {st.intro && (
                <div className="hs-item hs-intro">
                  <h2 className="hs-glow">
                    <span className="sr-only">{st.intro.h}</span>
                    <span aria-hidden="true">{st.intro.h.split(" ").map((w, wi) => <span key={wi}>{wi > 0 && " "}<span className="hs-gw">{Array.from(w).map((ch, ci) => <span key={ci} className="hs-gl">{ch}</span>)}</span></span>)}</span>
                  </h2>
                  {st.intro.p && <p>{st.intro.p}</p>}
                </div>
              )}
              {st.items.map((it, j) => (
                <div key={j} className="hs-item">
                  <h3>{it.h}</h3>
                  <p>{it.p}</p>
                  {it.link && <a className="hs-link" href={it.link.href}>{it.link.label} <span aria-hidden="true">→</span></a>}
                  {(it.phoneVisual ?? it.visual) && <div className="hs-item-vis is-on">{it.phoneVisual ?? it.visual}</div>}
                </div>
              ))}
            </div>
            <div className="hs-tick">
              <ol aria-label={`${st.k ?? "Steps"}, ${st.items.length} in all`}>
                {st.items.map((it, j) => (
                  <li key={j}><button type="button" className="hs-tick-b" data-go={(starts[i] + pre[i] + j * ITEM + 0.45).toFixed(3)} aria-label={`${j + 1} of ${st.items!.length}: ${it.h}`}><i /></button></li>
                ))}
              </ol>
              <span className="hs-count" aria-hidden="true">01 / {two(st.items.length)}</span>
              <button type="button" className="skip hs-skip" data-go={(sEnd + 1.1).toFixed(3)}>
                Skip to the next section
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
              </button>
            </div>
          </div>
        ) : (
          <div key={i} className={`hs-step ${i % 2 ? "is-right" : "is-left"}`}>
            {st.k && <p className="hs-k">{st.k}</p>}
            {st.h && <h2>{st.h}</h2>}
            {st.p && <p>{st.p}</p>}
            {st.cta && <a className="v8-btn v8-btn-light hs-cta" href={st.cta.href}>{st.cta.label}</a>}
            {st.visual && <div className="hs-step-vis">{st.visual}</div>}
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
