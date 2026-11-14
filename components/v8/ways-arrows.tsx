"use client";
/* Arrows above a row that scrolls sideways (the services and modes photo panels on phones). Nicole, Nov 13: "each of the
   pages that has the services or modes or whatever like that scroll to the side, they all need to have arrows above them to
   let people know to scroll." It drives the row right after it, and greys an arrow out at that end. It shows only while the
   row actually scrolls (the CSS shows it on phones, where it does). */
import { useEffect, useRef, useState } from "react";

export default function WaysArrows({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ends, setEnds] = useState({ start: true, end: false, fits: true });
  const row = () => ref.current?.nextElementSibling as HTMLElement | null;
  useEffect(() => {
    const el = row();
    if (!el) return;
    const on = () => setEnds({ start: el.scrollLeft <= 2, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2, fits: el.scrollWidth <= el.clientWidth + 2 });
    on();
    el.addEventListener("scroll", on, { passive: true });
    const ro = new ResizeObserver(on);
    ro.observe(el);
    return () => { el.removeEventListener("scroll", on); ro.disconnect(); };
  }, []);
  const by = (d: number) => {
    const el = row();
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: d * ((card?.getBoundingClientRect().width ?? 300) + 10), behavior: "smooth" });
  };
  return (
    <div ref={ref} className={`rl-btns ways-btns${ends.fits ? " is-fits" : ""}`}>
      <button type="button" onClick={() => by(-1)} disabled={ends.start} aria-label={`Previous: ${label}`}>←</button>
      <button type="button" onClick={() => by(1)} disabled={ends.end} aria-label={`Next: ${label}`}>→</button>
    </div>
  );
}
