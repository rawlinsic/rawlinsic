"use client";
/* Accessible tabs (arrow keys move between them). Panels are server-rendered.
   Inside a held scroll scene (.scn), the tabs follow the scroll: each step
   of the scene shows the next tab, and choosing a tab scrolls to its step. */
import { Children, useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { docTop } from "@/components/v8/panels";
import { glideTo } from "@/components/v8/smooth";

export default function Tabs({ labels, label, children }: { labels: string[]; label: string; children: ReactNode }) {
  const [i, setI] = useState(0);
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const btns = useRef<(HTMLButtonElement | null)[]>([]);
  const panels = Children.toArray(children);
  const n = labels.length;

  const scene = () => {
    const s = root.current?.closest<HTMLElement>(".scn");
    return s && !s.hasAttribute("data-static") ? s : null;
  };
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      const s = scene();
      if (!s) return;
      const total = Math.max(1, s.offsetHeight - window.innerHeight);
      const p = Math.max(0, Math.min(1, (window.scrollY - docTop(s)) / total));
      setI(Math.min(n - 1, Math.floor(p * n)));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener("scroll", on, { passive: true });
    return () => { window.removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, [n]);
  const pick = (k: number) => {
    setI(k);
    const s = scene();
    if (s) glideTo(docTop(s) + Math.max(1, s.offsetHeight - window.innerHeight) * ((k + 0.15) / n));
  };
  const key = (e: KeyboardEvent) => {
    const d = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const k = (i + d + n) % n;
    pick(k);
    btns.current[k]?.focus();
  };
  return (
    <div className="tb" ref={root}>
      <div className="tb-list" role="tablist" aria-label={label} aria-orientation="vertical" onKeyDown={key}>
        {labels.map((l, k) => (
          <button key={l} ref={(b) => { btns.current[k] = b; }} type="button" role="tab" id={`${id}-t${k}`} aria-controls={`${id}-p${k}`}
            aria-selected={i === k} tabIndex={i === k ? 0 : -1} onClick={() => pick(k)}>
            {l}
          </button>
        ))}
      </div>
      {panels.map((p, k) => (
        <div key={k} role="tabpanel" id={`${id}-p${k}`} aria-labelledby={`${id}-t${k}`} hidden={i !== k} className="tb-panel">{p}</div>
      ))}
    </div>
  );
}
