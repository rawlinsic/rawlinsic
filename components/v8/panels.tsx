"use client";
/* Section-to-section scrolling (scale.com's move). Every direct child is a
   panel. A panel scrolls normally until its bottom meets the bottom of the
   screen, then holds while the next panel slides up over it as a rounded
   card. The panel being covered sinks back: it shrinks a little and dims
   into the dark behind it.
     --pt  on each panel: where it holds (its sticky top)
     --cv  on each covered panel: how far the next one has covered it, 0 to 1
     --sp  on [data-scrub="page"] elements: page scroll in screen heights, 0 to 1
   A fully covered panel is hidden, so a dimming panel fades to black.
   Reduced motion gets plain sections. */
import { useEffect, useRef, type ReactNode } from "react";

const NAV = 68;

export default function Panels({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const wrap = ref.current;
    if (!wrap) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const kids = Array.from(wrap.children) as HTMLElement[];
    const scrubs = Array.from(wrap.querySelectorAll<HTMLElement>('[data-scrub="page"]'));
    let raf = 0, live = false, vh = window.innerHeight;

    const place = () => {
      vh = window.innerHeight;
      kids.forEach((el) => el.style.setProperty("--pt", `${Math.min(NAV, vh - el.offsetHeight)}px`));
    };
    const tick = () => {
      raf = 0;
      if (!live) return;
      for (let i = 0; i < kids.length - 1; i++) {
        const top = kids[i + 1].getBoundingClientRect().top;
        const cv = Math.max(0, Math.min(1, (vh - top) / (vh - NAV)));
        const el = kids[i];
        if (cv > 0.001) { el.style.setProperty("--cv", cv.toFixed(4)); el.dataset.cv = ""; }
        else if ("cv" in el.dataset) { el.style.removeProperty("--cv"); delete el.dataset.cv; }
        // fully covered: take it off screen so the one on top dims to black, not to what's behind
        const gone = cv >= 0.999;
        if (gone !== ("gone" in el.dataset)) { if (gone) el.dataset.gone = ""; else delete el.dataset.gone; }
      }
      const sp = Math.max(0, Math.min(1, window.scrollY / (vh * 0.75)));
      scrubs.forEach((s) => s.style.setProperty("--sp", sp.toFixed(4)));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const mode = () => {
      live = !reduce.matches;
      if (live) { wrap.dataset.live = ""; place(); tick(); }
      else { delete wrap.dataset.live; kids.forEach((el) => { el.style.removeProperty("--cv"); delete el.dataset.cv; delete el.dataset.gone; }); scrubs.forEach((s) => s.style.setProperty("--sp", "1")); }
    };
    const ro = new ResizeObserver(() => { if (live) { place(); on(); } });
    kids.forEach((k) => ro.observe(k));
    mode();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", mode);
    reduce.addEventListener?.("change", mode);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", mode);
      reduce.removeEventListener?.("change", mode);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={ref} className={`pnl${className ? ` ${className}` : ""}`}>{children}</div>;
}
