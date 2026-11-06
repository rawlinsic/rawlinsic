"use client";
/* Horizontal card rail with previous/next buttons (scroll-snap does the rest). */
import { useRef, type ReactNode } from "react";

export default function Rail({ label, children }: { label: string; children: ReactNode }) {
  const ref = useRef<HTMLUListElement>(null);
  const by = (d: number) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: d * ((card?.getBoundingClientRect().width ?? 320) + 16), behavior: "smooth" });
  };
  return (
    <div className="rl">
      <div className="rl-btns">
        <button type="button" onClick={() => by(-1)} aria-label={`Previous: ${label}`}>←</button>
        <button type="button" onClick={() => by(1)} aria-label={`Next: ${label}`}>→</button>
      </div>
      <ul ref={ref} className="rl-track" aria-label={label}>{children}</ul>
    </div>
  );
}
