"use client";
/* Service pages: a slim bar of the page's sections that tracks where you are. On a service page it also
   holds the area's other services in a list that opens from the left (Nicole, Nov 10: no second bar). */
import { useEffect, useRef, useState } from "react";
import { tc } from "@/lib/title-case";

/* top: the area's own page, listed first above its services (Nicole, Nov 12) */
export type SnMore = { label: string; links: { name: string; href: string; current?: boolean; top?: boolean }[] };
import { docTop } from "@/components/v8/panels";

export default function SectionNav({ items, more }: { items: [string, string][]; more?: SnMore }) {
  const [on, setOn] = useState(items[0]?.[0]);
  const box = useRef<HTMLDetailsElement>(null);
  /* phones (Nicole, Nov 13): the page's sections open from a three-line button at the right of the bar */
  const [list, setList] = useState(false);
  const nav = useRef<HTMLElement>(null);
  /* close the lists when you click anywhere else */
  useEffect(() => {
    const off = (e: MouseEvent) => {
      if (box.current?.open && !box.current.contains(e.target as Node)) box.current.open = false;
      if (nav.current && !nav.current.contains(e.target as Node)) setList(false);
    };
    document.addEventListener("click", off);
    return () => document.removeEventListener("click", off);
  }, []);
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
    <nav ref={nav} className={`sn${more ? " has-more" : ""}${list ? " is-open" : ""}`} aria-label="On this page">
      {more && (
        <details className="sn-more" ref={box} onToggle={(e) => { if ((e.currentTarget as HTMLDetailsElement).open) setList(false); }}>
          <summary>{tc(more.label)}</summary>
          <ul>{more.links.map((l) => <li key={l.href} className={l.top ? "is-top" : undefined}><a href={l.href} aria-current={l.current ? "page" : undefined}>{l.name}</a></li>)}</ul>
        </details>
      )}
      {more && (
        <button type="button" className="sn-burger" aria-label="Sections on this page" aria-expanded={list} aria-controls="sn-list"
          onClick={() => { setList((v) => !v); if (box.current) box.current.open = false; }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
        </button>
      )}
      <ul id="sn-list">
        {items.map(([id, label]) => (
          <li key={id}><a href={`#${id}`} aria-current={on === id ? "true" : undefined} onClick={() => setList(false)}>{tc(label)}</a></li>
        ))}
      </ul>
    </nav>
  );
}
