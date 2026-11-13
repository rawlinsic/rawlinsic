"use client";
/* Horizontal card rail with previous/next buttons (scroll-snap does the rest).
   Nov 13 (Nicole: "on any pages that have projects, put a thing above with arrows on all devices"): every row of
   projects uses this, with the arrows above the row on every screen. An arrow greys out when there is nothing more
   that way (or when the whole row already fits). */
import { useEffect, useRef, useState, type ReactNode } from "react";

export default function Rail({ label, children }: { label: string; children: ReactNode }) {
  const ref = useRef<HTMLUListElement>(null);
  const [ends, setEnds] = useState({ start: true, end: false });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const on = () => setEnds({ start: el.scrollLeft <= 2, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 });
    on();
    el.addEventListener("scroll", on, { passive: true });
    const ro = new ResizeObserver(on);
    ro.observe(el);
    return () => { el.removeEventListener("scroll", on); ro.disconnect(); };
  }, []);
  const by = (d: number) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: d * ((card?.getBoundingClientRect().width ?? 320) + 16), behavior: "smooth" });
  };
  return (
    <div className="rl">
      <div className="rl-btns">
        <button type="button" onClick={() => by(-1)} disabled={ends.start} aria-label={`Previous: ${label}`}>←</button>
        <button type="button" onClick={() => by(1)} disabled={ends.end} aria-label={`Next: ${label}`}>→</button>
      </div>
      <ul ref={ref} className="rl-track" aria-label={label}>{children}</ul>
    </div>
  );
}
