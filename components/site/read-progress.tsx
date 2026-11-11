"use client";
/* A thin electric-blue bar under the menu that fills as you read an article */
import { useEffect, useRef } from "react";

export default function ReadProgress({ target }: { target: string }) {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = document.querySelector<HTMLElement>(target);
    if (!el || !bar.current) return;
    let raf = 0;
    const set = () => {
      raf = 0;
      const r = el.getBoundingClientRect(), vh = window.innerHeight;
      const p = Math.max(0, Math.min(1, (vh * 0.4 - r.top) / Math.max(1, r.height - vh * 0.5)));
      bar.current!.style.transform = `scaleX(${p.toFixed(4)})`;
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(set); };
    set();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, [target]);
  return <div className="ax-progress" aria-hidden="true"><div ref={bar} /></div>;
}
