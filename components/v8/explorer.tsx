"use client";
/* Home "What we do": on wide screens the section pins and walks through the
   five areas as you scroll; the page takes on each area's color. The panels
   are server-rendered children (data-i). On phones the panels simply stack. */
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type Item = { name: string; n: string; tint: string; color: string };

export default function Explorer({ items, children }: { items: Item[]; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const tick = () => {
      raf = 0;
      if (window.innerWidth < 960) return;
      const r = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p = Math.max(0, Math.min(0.9999, -r.top / Math.max(1, total)));
      setActive(Math.floor(p * items.length));
      el.style.setProperty("--xp", p.toFixed(4));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, [items.length]);

  /* the active panel gets .is-on so its diagram plays again */
  useEffect(() => {
    ref.current?.querySelectorAll<HTMLElement>(".ex-panel").forEach((p) => p.classList.toggle("is-on", Number(p.dataset.i) === active));
  }, [active]);

  const go = (i: number) => {
    const el = ref.current;
    if (!el) return;
    if (window.innerWidth < 960) { el.querySelector<HTMLElement>(`[data-i="${i}"]`)?.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
    const total = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY + total * ((i + 0.35) / items.length);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div ref={ref} className="ex" data-active={active} style={{ ["--bg" as string]: items[active].tint, ["--count" as string]: items.length } as CSSProperties}>
      <div className="ex-stage">
        <nav className="ex-nav" aria-label="The five areas">
          <ol>
            {items.map((it, i) => (
              <li key={it.name}>
                <button type="button" onClick={() => go(i)} aria-current={active === i ? "true" : undefined} style={{ ["--c" as string]: it.color } as CSSProperties}>
                  <span className="ex-n">{it.n}</span><span className="ex-l">{it.name}</span>
                </button>
              </li>
            ))}
          </ol>
          <div className="ex-meter" aria-hidden="true"><i /></div>
        </nav>
        <div className="ex-panels">{children}</div>
      </div>
    </div>
  );
}
