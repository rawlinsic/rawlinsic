"use client";
/* Service pages: a slim bar of the page's sections that tracks where you are. */
import { useEffect, useState } from "react";

export default function SectionNav({ items }: { items: [string, string][] }) {
  const [on, setOn] = useState(items[0]?.[0]);
  useEffect(() => {
    const els = items.map(([id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver((es) => {
      const vis = es.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (vis[0]) setOn(vis[0].target.id);
    }, { rootMargin: "-30% 0px -60% 0px" });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
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
