"use client";
/* A list as a route you scroll down (the idea from livepeer.org/foundation,
   in Rawlins colors). An aqua line fills down through the stops with a light
   at its front; each stop lights and pings as the line reaches it, and its
   words come up to full strength in a card. The line follows where the list
   sits in the page (docTop), so it keeps filling while a section holds.
   Stops show a number ("01"), or a check mark for lists of outcomes.
   Next to a section heading (Sec), the heading stays put on the left while
   the route runs down the right (app/route.css). Reduced motion: shown lit. */
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { docTop } from "@/components/v8/panels";
import "@/app/route.css";

export type Stop = { n?: string; tag?: string; t?: string; d?: ReactNode; extra?: ReactNode };

const Check = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export default function RouteList({ stops, check, ordered = true, className }: { stops: Stop[]; check?: boolean; ordered?: boolean; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = ref.current;
    if (!list) return;
    const items = Array.from(list.querySelectorAll<HTMLElement>(".rt-stop"));
    if (!items.length) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    const tick = () => {
      raf = 0;
      const vh = window.innerHeight;
      const nodes = items.map((li) => { const n = li.querySelector<HTMLElement>(".rt-node")!; return li.offsetTop + n.offsetTop + n.offsetHeight / 2; });
      const first = nodes[0], last = nodes[nodes.length - 1];
      const reach = reduce.matches ? Infinity : vh * 0.62 - (docTop(list) - window.scrollY);
      const fill = Math.max(0, Math.min(last - first, reach - first));
      list.style.setProperty("--rt-top", `${first}px`);
      list.style.setProperty("--rt-len", `${last - first}px`);
      list.style.setProperty("--rt-fill", `${fill}px`);
      list.toggleAttribute("data-done", fill >= last - first - 1);
      items.forEach((li, i) => { const on = nodes[i] - first <= fill + 1; if (on !== li.hasAttribute("data-on")) li.toggleAttribute("data-on", on); });
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    const ro = new ResizeObserver(on);
    ro.observe(list);
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { ro.disconnect(); window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, []);

  const List = ordered ? "ol" : "ul";
  return (
    <div ref={ref} className={`rt-list${check ? " is-check" : ""}${className ? ` ${className}` : ""}`}>
      <span className="rt-rail" aria-hidden="true"><i className="rt-fill" /><i className="rt-light" /></span>
      <List>
        {stops.map((s, i) => (
          <li key={i} className="rt-stop" style={{ ["--i" as string]: i } as CSSProperties}>
            <span className="rt-node" aria-hidden="true">{check ? <Check /> : <b>{s.n ?? String(i + 1).padStart(2, "0")}</b>}</span>
            <div className="rt-txt">
              {s.tag && <p className="rt-tag">{s.tag}</p>}
              {s.t && <h3>{s.t}</h3>}
              {s.d && <div className="rt-d">{s.d}</div>}
              {s.extra}
            </div>
          </li>
        ))}
      </List>
    </div>
  );
}
