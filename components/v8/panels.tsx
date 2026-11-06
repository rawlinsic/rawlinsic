"use client";
/* Section-to-section scrolling (scale.com's move), used on every page.
   Every direct child is a panel. A panel scrolls normally until its bottom
   meets the bottom of the screen, then holds while the next panel slides up
   over it as a rounded card. The panel being covered sinks back: it shrinks
   a little and dims. A fully covered panel is hidden.
     --pt  on each panel: where it holds (its sticky top)
     --cv  on each covered panel: how far the next one has covered it, 0 to 1
     --sp  on [data-scrub="page"] elements: page scroll in screen heights, 0 to 1
   A page's "On this page" bar (.sn) stays pinned on top and panels hold
   just under it. Because held panels are no longer where the page layout
   puts them, docTop() gives the real place to scroll to for any element.
   Reduced motion gets plain sections. */
import { useEffect, useRef, type ReactNode } from "react";

const NAV = 68;
const NATURAL = new WeakMap<HTMLElement, number>(); // panel -> its top in the page when not held

/* Where an element sits in the page (for jump links), even inside a held panel. */
export function docTop(el: HTMLElement): number {
  let p: HTMLElement | null = el;
  while (p && !NATURAL.has(p)) p = p.parentElement;
  if (!p) return el.getBoundingClientRect().top + window.scrollY;
  return NATURAL.get(p)! + (p === el ? 0 : el.getBoundingClientRect().top - p.getBoundingClientRect().top);
}

/* Height of whatever is pinned under the site header (the "On this page" bar). */
export function pinnedOffset(): number {
  const sn = document.querySelector<HTMLElement>(".sn");
  return NAV + (sn ? sn.offsetHeight : 0);
}

export default function Panels({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const wrap = ref.current;
    if (!wrap) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const kids = (Array.from(wrap.children) as HTMLElement[]).filter((k) => !k.matches(".sn, [data-nopanel]"));
    const scrubs = Array.from(wrap.querySelectorAll<HTMLElement>('[data-scrub="page"]'));
    const sn = wrap.querySelector<HTMLElement>(":scope > .sn");
    let raf = 0, live = false, vh = window.innerHeight, tops: number[] = [];

    const place = () => {
      vh = window.innerHeight;
      // panels after the "On this page" bar hold just under it
      tops = kids.map((el) => (sn && sn.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING ? NAV + sn.offsetHeight : NAV));
      // measure where each panel sits when it is not held
      wrap.dataset.measure = "";
      kids.forEach((el) => NATURAL.set(el, el.getBoundingClientRect().top + window.scrollY));
      delete wrap.dataset.measure;
      kids.forEach((el, i) => el.style.setProperty("--pt", `${Math.min(tops[i], vh - el.offsetHeight)}px`));
    };
    const tick = () => {
      raf = 0;
      if (!live) return;
      const rs = kids.map((k) => k.getBoundingClientRect());
      for (let i = 0; i < kids.length - 1; i++) {
        const cur = rs[i], nx = rs[i + 1];
        const cv = Math.max(0, Math.min(1, (vh - nx.top) / (vh - tops[i + 1])));
        const el = kids[i];
        if (cv > 0.001) { el.style.setProperty("--cv", cv.toFixed(4)); el.dataset.cv = ""; }
        else if ("cv" in el.dataset) { el.style.removeProperty("--cv"); delete el.dataset.cv; }
        // hidden only once the panel in front covers everything of it that is on screen
        const gone = cv > 0.5 && nx.top <= Math.max(cur.top, tops[i]) + 1 && nx.bottom >= Math.min(cur.bottom, vh) - 1;
        if (gone !== ("gone" in el.dataset)) { if (gone) el.dataset.gone = ""; else delete el.dataset.gone; }
      }
      const sp = Math.max(0, Math.min(1, window.scrollY / (vh * 0.75)));
      scrubs.forEach((s) => s.style.setProperty("--sp", sp.toFixed(4)));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const mode = () => {
      live = !reduce.matches;
      if (live) { wrap.dataset.live = ""; place(); tick(); }
      else {
        delete wrap.dataset.live;
        kids.forEach((el) => { NATURAL.delete(el); el.style.removeProperty("--cv"); delete el.dataset.cv; delete el.dataset.gone; });
        scrubs.forEach((s) => s.style.setProperty("--sp", "1"));
      }
    };
    const ro = new ResizeObserver(() => { if (live) { place(); on(); } });
    kids.forEach((k) => ro.observe(k));
    mode();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", mode);
    reduce.addEventListener?.("change", mode);
    return () => {
      ro.disconnect();
      kids.forEach((el) => NATURAL.delete(el));
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", mode);
      reduce.removeEventListener?.("change", mode);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={ref} className={`pnl${className ? ` ${className}` : ""}`}>{children}</div>;
}
