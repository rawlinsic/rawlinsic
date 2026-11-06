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

export default function Scene({ steps, per = 100, id, className, label, children }: { steps: number; per?: number; id?: string; className?: string; label?: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-step]"));
    const track = el.querySelector<HTMLElement>("[data-hscroll]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let live = false;
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
      const p = Math.max(0, Math.min(1, -r.top / Math.max(1, total)));
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
      live = window.innerWidth >= 960 && !reduce.matches;
      if (live) {
        delete el.dataset.static;
        // if what's inside is taller than the screen it can't be held without cutting it off: show it plainly
        const inner = stage.firstElementChild as HTMLElement | null;
        if (inner && inner.offsetHeight > stage.clientHeight + 2) { live = false; setStatic(); return; }
        tick();
      } else setStatic();
    };
    const go = (e: Event) => {
      const b = (e.target as HTMLElement).closest<HTMLElement>("[data-goto]");
      if (!b || !el.contains(b)) return;
      const k = Number(b.dataset.goto);
      if (!live) { const t = Array.from(el.querySelectorAll<HTMLElement>(`[data-step="${k}"]`)).pop(); t?.scrollIntoView({ behavior: reduce.matches ? "auto" : "smooth", block: "start" }); return; }
      const total = el.offsetHeight - window.innerHeight;
      glideTo(docTop(el) + total * ((k + 0.25) / steps));
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
  }, [steps]);
  return (
    <section ref={ref} id={id} className={`scn${className ? ` ${className}` : ""}`} aria-label={label} style={{ ["--steps" as string]: steps, ["--per" as string]: `${per}vh` } as CSSProperties}>
      <div className="scn-stage">{children}</div>
    </section>
  );
}
