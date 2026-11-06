"use client";
/* Slide deck shell for /brand: every slide is a 1920×1080 page scaled to
   fit the window. Arrow keys, buttons, swipe and a slide index move around;
   the URL hash keeps your place; print gives one slide per page. */
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

export type SlideMeta = { id: string; title: string; section: string };

export function Deck({ slides, children }: { slides: SlideMeta[]; children: ReactNode }) {
  const [i, setI] = useState(0);
  const [index, setIndex] = useState(false);
  const [scale, setScale] = useState(0);
  const view = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const n = slides.length;

  const go = useCallback((to: number) => setI(Math.max(0, Math.min(n - 1, to))), [n]);

  /* start from the hash, follow back/forward */
  useEffect(() => {
    const fromHash = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      const at = slides.findIndex((s) => s.id === id);
      if (at >= 0) setI(at);
    };
    fromHash();
    addEventListener("hashchange", fromHash);
    return () => removeEventListener("hashchange", fromHash);
  }, [slides]);

  /* show the current slide, keep the hash in step */
  useEffect(() => {
    const kids = stage.current?.children;
    if (kids) Array.from(kids).forEach((el, k) => el.classList.toggle("is-on", k === i));
    const id = slides[i]?.id;
    if (id && location.hash.slice(1) !== id) history.replaceState(null, "", `#${id}`);
    document.title = `${slides[i]?.title ?? "Brand guide"} | Rawlins brand guide`;
  }, [i, slides]);

  /* scale 1920×1080 to the space we have */
  useEffect(() => {
    const el = view.current;
    if (!el) return;
    const fit = () => setScale(Math.min(el.clientWidth / 1920, el.clientHeight / 1080));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, select, [contenteditable]")) return;
      if (index) { if (e.key === "Escape") setIndex(false); return; }
      if (["ArrowRight", "PageDown", " "].includes(e.key)) { e.preventDefault(); go(i + 1); }
      else if (["ArrowLeft", "PageUp"].includes(e.key)) { e.preventDefault(); go(i - 1); }
      else if (e.key === "Home") go(0);
      else if (e.key === "End") go(n - 1);
      else if (e.key === "i" || e.key === "g") setIndex(true);
      else if (e.key === "f") document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.();
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [i, n, go, index]);

  /* swipe on touch screens */
  useEffect(() => {
    const el = view.current;
    if (!el) return;
    let x0 = 0, y0 = 0;
    const down = (e: TouchEvent) => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; };
    const up = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(i + (dx < 0 ? 1 : -1));
    };
    el.addEventListener("touchstart", down, { passive: true });
    el.addEventListener("touchend", up, { passive: true });
    return () => { el.removeEventListener("touchstart", down); el.removeEventListener("touchend", up); };
  }, [i, go]);

  const sections = slides.reduce<{ name: string; items: { s: SlideMeta; k: number }[] }[]>((acc, s, k) => {
    const last = acc[acc.length - 1];
    if (last && last.name === s.section) last.items.push({ s, k });
    else acc.push({ name: s.section, items: [{ s, k }] });
    return acc;
  }, []);

  return (
    <div className={`bd${scale ? " is-ready" : ""}`} style={{ ["--s" as string]: scale || 0.5 }}>
      <div className="bd-view" ref={view}>
        <div className="bd-stage" ref={stage} aria-live="polite">{children}</div>
      </div>

      <nav className="bd-bar" aria-label="Slides">
        <a className="bd-brand" href="#cover" onClick={(e) => { e.preventDefault(); go(0); }}>Rawlins brand guide <em>Draft</em></a>
        <span className="bd-sec">{slides[i]?.section}</span>
        <div className="bd-ctl">
          <button type="button" onClick={() => go(i - 1)} disabled={i === 0} aria-label="Previous slide">←</button>
          <button type="button" className="bd-count" onClick={() => setIndex(true)} aria-label="Open slide index">
            {i + 1} <span>/ {n}</span>
          </button>
          <button type="button" onClick={() => go(i + 1)} disabled={i === n - 1} aria-label="Next slide">→</button>
        </div>
        <div className="bd-tools">
          <button type="button" onClick={() => setIndex(true)}>Index</button>
          <button type="button" onClick={() => print()} title="Print or save as PDF (one slide per page)">PDF</button>
        </div>
      </nav>

      {index && (
        <div className="bd-index" role="dialog" aria-modal="true" aria-label="Slide index" onClick={() => setIndex(false)}>
          <div className="bd-index-in" onClick={(e) => e.stopPropagation()}>
            <div className="bd-index-head">
              <p>Slide index</p>
              <button type="button" onClick={() => setIndex(false)} aria-label="Close index" autoFocus>Close ✕</button>
            </div>
            <div className="bd-index-grid">
              {sections.map((sec) => (
                <section key={sec.name}>
                  <h2>{sec.name}</h2>
                  <ol>
                    {sec.items.map(({ s, k }) => (
                      <li key={s.id}>
                        <button type="button" aria-current={k === i ? "true" : undefined} onClick={() => { go(k); setIndex(false); }}>
                          <span>{String(k + 1).padStart(2, "0")}</span>{s.title}
                        </button>
                      </li>
                    ))}
                  </ol>
                </section>
              ))}
            </div>
            <p className="bd-keys">← → move · I index · F full screen · PDF prints one slide per page</p>
          </div>
        </div>
      )}
    </div>
  );
}
