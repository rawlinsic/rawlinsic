"use client";
/* Drones & Advanced Air Mobility: Where we lead, as a route you scroll down
   (the idea from livepeer.org/foundation, in our colors). The heading and photo
   stay put on the left while, on the right, a glowing aqua line fills down
   through the seven numbered stops (numbers from the current site). A light
   rides the front of the line; each stop lights up and pings as the line
   reaches it, and its words come up to full strength. The line follows where
   the list sits in the page, so it keeps filling while the section holds.
   Reduced motion: the whole route is shown lit. */
import { useEffect, useRef, type CSSProperties } from "react";
import { WHERE_WE_LEAD } from "@/components/site/aam-data";
import { docTop } from "@/components/v8/panels";
import "@/app/route.css";

export function WhereWeLead({ photo }: { photo: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = ref.current;
    if (!list) return;
    const items = Array.from(list.querySelectorAll<HTMLElement>(".rt-stop"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    const tick = () => {
      raf = 0;
      const vh = window.innerHeight;
      // where each stop's node sits along the list, and how far the line has come
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

  return (
    <section className="av av-lead rt">
      <div className="v8-wrap av-lead-in">
        <div className="av-lead-copy rt-side">
          <h2 className="v8-h2">Where we lead</h2>
          <p className="v8-lead">Our team helped shape early guidance on drones and advanced air mobility and continues to support its evolution, working directly with transportation agencies and airports to turn strategy into deployable programs.</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="av-lead-photo" src={photo} alt="" loading="lazy" />
        </div>
        <div ref={ref} className="rt-list">
          <span className="rt-rail" aria-hidden="true"><i className="rt-fill" /><i className="rt-light" /></span>
          <ol>
          {WHERE_WE_LEAD.map((w, i) => (
            <li key={w.n} className="rt-stop" style={{ ["--i" as string]: i } as CSSProperties}>
              <span className="rt-node" aria-hidden="true"><b>{w.n}</b></span>
              <div className="rt-txt"><h3>{w.t}</h3><p>{w.d}</p></div>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
