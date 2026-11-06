"use client";
/* Accessible tabs (arrow keys move between them). Panels are server-rendered. */
import { Children, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export default function Tabs({ labels, label, children }: { labels: string[]; label: string; children: ReactNode }) {
  const [i, setI] = useState(0);
  const id = useId();
  const btns = useRef<(HTMLButtonElement | null)[]>([]);
  const panels = Children.toArray(children);
  const key = (e: KeyboardEvent) => {
    const d = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (i + d + labels.length) % labels.length;
    setI(n);
    btns.current[n]?.focus();
  };
  return (
    <div className="tb">
      <div className="tb-list" role="tablist" aria-label={label} aria-orientation="vertical" onKeyDown={key}>
        {labels.map((l, k) => (
          <button key={l} ref={(b) => { btns.current[k] = b; }} type="button" role="tab" id={`${id}-t${k}`} aria-controls={`${id}-p${k}`}
            aria-selected={i === k} tabIndex={i === k ? 0 : -1} onClick={() => setI(k)}>
            <span className="tb-n">{String(k + 1).padStart(2, "0")}</span>{l}
          </button>
        ))}
      </div>
      {panels.map((p, k) => (
        <div key={k} role="tabpanel" id={`${id}-p${k}`} aria-labelledby={`${id}-t${k}`} hidden={i !== k} className="tb-panel">{p}</div>
      ))}
    </div>
  );
}
