"use client";
/* Scroll scene: the section holds still while you scroll through it, and
   what's inside moves with your scroll (scale.com-style chapters).
   One rAF loop writes CSS variables; nothing re-renders while scrolling:
     --p   progress through the whole scene, 0 to 1
     --s   the same in steps (0 to `steps`)
     --lp  on each [data-step] child: its own progress, 0 to 1
     data-state on each [data-step]: before | on | after
     --hx  for a [data-hscroll] track: how far to slide it sideways
   [data-goto="k"] buttons jump to step k. Phones (< 960px) and reduced
   motion get a plain, stacked layout with everything shown. */
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { glideTo } from "@/components/v8/smooth";
import { docTop } from "@/components/v8/panels";

/* fit (the life cycle and How we do it steps): a section taller than the screen can't be held, so it plays as it scrolls past
   instead, each step coming in as you go (Nicole, Nov 13: "it doesnt scroll through each number"; shrinking it to fit made the
   text too small). phone: held on phones too (the Challenges we hear picker, one challenge at a time). */
export default function Scene({ steps, per = 100, id, className, label, fit = false, phone = false, children }: { steps: number; per?: number; id?: string; className?: string; label?: string; fit?: boolean; phone?: boolean; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-step]"));
    const track = el.querySelector<HTMLElement>("[data-hscroll]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let live = false;
    let flow = false; // plays as it scrolls past, not held
    const setStatic = () => {
      el.dataset.static = "";
      el.style.setProperty("--p", "1");
      el.style.setProperty("--s", String(steps));
      items.forEach((it) => { it.style.setProperty("--lp", "1"); it.dataset.state = "on"; });
      if (track) el.style.setProperty("--hx", "0px");
    };
    const tick = () => {
      raf = 0;
      if (!live) return;
      const r = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      /* held: progress through the held stretch; flowing: from the section's top reaching the lower part of the screen to its
         bottom coming into view */
      const p = flow
        ? Math.max(0, Math.min(1, (window.innerHeight * 0.85 - r.top) / Math.max(1, r.height + window.innerHeight * 0.85 - window.innerHeight * 0.95)))
        : Math.max(0, Math.min(1, -r.top / Math.max(1, total)));
      const s = Math.min(steps - 0.0001, p * steps);
      el.style.setProperty("--p", p.toFixed(4));
      el.style.setProperty("--s", s.toFixed(4));
      items.forEach((it) => {
        const k = Number(it.dataset.step);
        it.style.setProperty("--lp", Math.max(0, Math.min(1, s - k)).toFixed(4));
        const st = s < k ? "before" : s >= k + 1 ? "after" : "on";
        if (it.dataset.state !== st) it.dataset.state = st;
      });
      if (track) {
        const max = Math.max(0, track.scrollWidth - (track.parentElement?.clientWidth ?? 0));
        el.style.setProperty("--hx", `${(-max * p).toFixed(1)}px`);
      }
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const stage = el.querySelector<HTMLElement>(".scn-stage")!;
    const mode = () => {
      flow = false;
      live = (window.innerWidth >= 960 || phone) && !reduce.matches;
      if (live && phone && window.innerWidth < 960) {
        /* phones: the stage sits under the header and the section bar */
        const hdr = document.querySelector<HTMLElement>("header")?.getBoundingClientRect().height ?? 64;
        const sn = document.querySelector<HTMLElement>(".sn");
        const snH = sn && getComputedStyle(sn).position === "sticky" ? sn.offsetHeight : 0;
        el.style.setProperty("--scn-top", `${Math.round(hdr + snH)}px`);
      }
      if (live) {
        delete el.dataset.static;
        // if what's inside is taller than the screen it can't be held without cutting it off: show it plainly (never shrunk;
        // Nicole, Nov 13: the service cards came out "all squished"). With `fit`, it then plays as it scrolls past.
        const inner = stage.firstElementChild as HTMLElement | null;
        /* on phones the picker shows one challenge at a time once held, so its full list isn't what has to fit */
        const phoneHeld = phone && window.innerWidth < 960;
        if (inner && !phoneHeld && inner.offsetHeight > stage.clientHeight + 2) {
          live = false; setStatic();
          if (fit && window.innerWidth >= 960) { flow = true; live = true; tick(); }
          return;
        }
        tick();
      } else setStatic();
    };
    const go = (e: Event) => {
      const b = (e.target as HTMLElement).closest<HTMLElement>("[data-goto]");
      if (!b || !el.contains(b)) return;
      const k = Number(b.dataset.goto);
      if (!live || flow) { const t = Array.from(el.querySelectorAll<HTMLElement>(`[data-step="${k}"]`)).pop(); t?.scrollIntoView({ behavior: reduce.matches ? "auto" : "smooth", block: "start" }); return; }
      const total = el.offsetHeight - window.innerHeight;
      glideTo(docTop(el) + total * ((k + 0.25) / steps));
    };
    mode();
    const inner0 = stage.firstElementChild as HTMLElement | null;
    const grow = inner0 ? new ResizeObserver(() => { if (live) mode(); }) : null;
    if (inner0) grow?.observe(inner0);
    grow?.observe(stage); // the stage gets shorter once the section bar under the header measures itself
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", mode);
    reduce.addEventListener?.("change", mode);
    el.addEventListener("click", go);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", mode);
      reduce.removeEventListener?.("change", mode);
      el.removeEventListener("click", go);
      grow?.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [steps, fit, phone]);
  return (
    <section ref={ref} id={id} className={`scn${className ? ` ${className}` : ""}`} aria-label={label} data-phone={phone ? "" : undefined} style={{ ["--steps" as string]: steps, ["--per" as string]: `${per}vh` } as CSSProperties}>
      <div className="scn-stage">{children}</div>
    </section>
  );
}
