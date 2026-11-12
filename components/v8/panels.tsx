"use client";
/* Section-to-section scrolling (scale.com's move), used on every page.
   Every direct child is a panel. A panel scrolls normally until its bottom
   meets the bottom of the screen, then holds while the next panel slides up
   over it as a rounded card. The panel being covered sinks back: it shrinks
   a little and dims. A fully covered panel is hidden.
   So nothing is covered while it is still being read: a panel shorter than
   the screen is grown to fill it (its content centered, like a slide), and
   every panel holds still for a short beat (DWELL) before the next one
   starts to come over it. Panels that hold on their own (scroll scenes)
   are left as they are, and the first panel (the hero) scrolls away
   normally.
   A panel holds only when the one after it is tall enough to cover the
   whole screen. If the next one is shorter (a slim band, a short section),
   the held panel would keep showing above and below it, so that panel
   scrolls away normally instead (Nicole, Nov 11: "a row coming out that
   covers another part", "the top row shows in the background").
     --pt  on each panel: where it holds (its sticky top)
     --cv  on each covered panel: how far the next one has covered it, 0 to 1
     --rad on each panel: 1 while it slides in as a rounded card, easing to 0
           (square corners) as it reaches its place, so no corners show
           under the header or the "On this page" bar
     --sp  on [data-scrub="page"] elements: page scroll in screen heights, 0 to 1
   A page's "On this page" bar (.sn) stays pinned on top and panels hold
   just under it. Because held panels are no longer where the page layout
   puts them, docTop() gives the real place to scroll to for any element.
   Reduced motion gets plain sections. */
import { useEffect, useRef, type ReactNode } from "react";

const NAV = 68;
const DWELL = 0.2; // screen heights the page holds still on a panel before the next one comes over it
const HELD = ".scn, .wwd, .h-orbit, [data-nofill]"; // panels with their own hold
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
    const kids = (Array.from(wrap.children) as HTMLElement[]).filter((k) => !k.matches(".sn, [data-nopanel], dialog, script, template"));
    const scrubs = Array.from(wrap.querySelectorAll<HTMLElement>('[data-scrub="page"]'));
    const sn = wrap.querySelector<HTMLElement>(":scope > .sn");
    let raf = 0, live = false, vh = window.innerHeight, tops: number[] = [];
    const rads: string[] = [];

    const place = () => {
      vh = window.innerHeight;
      // panels after the "On this page" bar hold just under it
      tops = kids.map((el) => (sn && sn.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING ? NAV + sn.offsetHeight : NAV));
      wrap.style.setProperty("--snh", `${sn ? sn.offsetHeight : 0}px`); // held scenes after the bar hold under it
      // fill the screen and hold a beat, so nothing is covered before it is read
      unfill();
      kids.forEach((el, i) => {
        if (i === 0 || i === kids.length - 1 || el.matches(HELD)) return;
        const room = vh - tops[i], h = el.offsetHeight;
        if (h < room - 1) {
          el.style.paddingTop = `${parseFloat(getComputedStyle(el).paddingTop) + (room - h) / 2}px`;
          el.style.minHeight = `${room}px`;
        }
      });
      // Later panels always sit in front of earlier ones. Sections carry their own z-index (some 2, some none),
      // so a section with none slid *under* the held one before it instead of over it (Who we are: the growth
      // row went under "Our story", Nicole, Nov 12). The "On this page" bar stays above them all (z-index 40).
      kids.forEach((el, i) => { el.style.zIndex = String(i + 2); });
      // which panels hold: only those whose next panel covers everything under the bars
      const holds = kids.map((_, i) => { const j = after(i), nx = kids[j]; return i > 0 && !!nx && nx.offsetHeight >= vh - tops[j] - 1; });
      // the beat before the next panel comes over: only where a panel holds (elsewhere it would just be a gap)
      kids.forEach((el, i) => { if (holds[i] && i !== kids.length - 1 && !el.matches(HELD)) el.style.marginBottom = `${Math.round(vh * DWELL)}px`; });
      // measure where each panel sits when it is not held
      wrap.dataset.measure = "";
      kids.forEach((el) => NATURAL.set(el, el.getBoundingClientRect().top + window.scrollY));
      delete wrap.dataset.measure;
      // the first panel (the hero) doesn't hold: it scrolls away normally, so what sits at
      // its bottom (photo panels, buttons) is never covered the moment you start scrolling
      // (a panel that doesn't hold gets the same treatment: it never sticks)
      kids.forEach((el, i) => el.style.setProperty("--pt", `${holds[i] ? Math.min(tops[i], vh - el.offsetHeight) : -el.offsetHeight}px`));
    };
    /* The next panel that is on the page. A section taken off with the preview's Delete section button is
       still in the markup but hidden, with no size: counting it as "the panel in front" made the one before
       it read as fully covered and hid it (Who we work with, Nov 12). */
    const after = (i: number) => { let j = i + 1; while (j < kids.length && kids[j].getClientRects().length === 0) j++; return j; };
    const unfill = () => kids.forEach((el) => { el.style.paddingTop = ""; el.style.minHeight = ""; el.style.marginBottom = ""; });
    const tick = () => {
      raf = 0;
      if (!live) return;
      const rs = kids.map((k) => k.getBoundingClientRect());
      for (let i = 1; i < kids.length; i++) {
        const rad = Math.max(0, Math.min(1, (rs[i].top - tops[i]) / (vh * 0.3))).toFixed(3);
        if (rad !== rads[i]) { rads[i] = rad; kids[i].style.setProperty("--rad", rad); }
      }
      for (let i = 0; i < kids.length - 1; i++) {
        const j = after(i), cur = rs[i], el = kids[i];
        if (j >= kids.length) { // nothing after it on the page: it is never covered
          if ("cv" in el.dataset) { el.style.removeProperty("--cv"); delete el.dataset.cv; }
          if ("gone" in el.dataset) delete el.dataset.gone;
          continue;
        }
        const nx = rs[j];
        // how much of this panel's on-screen part the next panel covers. Panels sit
        // end to end, so this stays 0 until the next one really slides over it:
        // nothing dims while it is still being read.
        const top = Math.max(cur.top, tops[j]), bot = Math.min(cur.bottom, vh);
        const cover = bot - top > 1 ? Math.max(0, Math.min(1, (bot - nx.top) / (bot - top))) : nx.top <= top + 1 ? 1 : 0;
        const cv = cover * cover; // eased: the part still showing stays readable until it is nearly covered
        if (cv > 0.001) { el.style.setProperty("--cv", cv.toFixed(4)); el.dataset.cv = ""; }
        else if ("cv" in el.dataset) { el.style.removeProperty("--cv"); delete el.dataset.cv; }
        // hidden once the panel in front has covered everything of it that is on screen, and it stays hidden
        // after that panel scrolls on: a held panel stays stuck to the end of the page, so without this it
        // showed again behind any later section with a see-through background (the closing band)
        const gone = cover > 0.999;
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
        unfill();
        kids.forEach((el) => { el.style.zIndex = ""; NATURAL.delete(el); el.style.removeProperty("--cv"); delete el.dataset.cv; delete el.dataset.gone; });
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
