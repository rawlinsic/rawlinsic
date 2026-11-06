"use client";
/* Service pages: a slim bar of the page's sections that tracks where you are. */
import { useEffect, useState } from "react";
import { docTop } from "@/components/v8/panels";

export default function SectionNav({ items }: { items: [string, string][] }) {
  const [on, setOn] = useState(items[0]?.[0]);
  useEffect(() => {
    const els = items.map(([id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    let raf = 0;
    // the current section is the last one whose top has passed a line 35% down the screen
    const tick = () => {
      raf = 0;
      const line = window.scrollY + window.innerHeight * 0.35;
      let cur = els[0]?.id;
      for (const el of els) if (docTop(el) <= line) cur = el.id;
      if (cur) setOn(cur);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, [items]);
  return (
    <nav className="sn" aria-label="On this page">
      <ul>
        {items.map(([id, label]) => (
          <li key={id}><a href={`#${id}`} aria-current={on === id ? "true" : undefined}>{label}</a></li>
        ))}
      </ul>
    </nav>
  );
}
