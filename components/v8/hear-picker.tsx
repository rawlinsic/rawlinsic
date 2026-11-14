"use client";
/* "Challenges we hear" with "What we bring" as a picker, like the help picker on the home and Contact pages (Nicole,
   Nov 13: "more like the thing on the contact page with the lines ... so the text isn't all so reading heavy. don't
   change copy"). The challenges are on the left; the one picked draws a glowing line to what we bring, on the right.
   One is always open on computers (the first to start). Phones get the answer under the challenge tapped, no lines.
   Nov 13 (Nicole: "when you scroll, make it go through each of the challenges and not have to click each one"): with
   `scroll`, the section holds (components/v8/scene.tsx) and each stretch of scrolling opens the next challenge; a click
   glides to that challenge's stretch. */
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";

export default function HearPicker({ items, label = "What we bring", scroll = false }: { items: { q: string; b?: string }[]; label?: string; scroll?: boolean }) {
  const [sel, setSel] = useState(0);
  const [narrow, setNarrow] = useState(false);
  const [path, setPath] = useState("");
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const m = window.matchMedia("(max-width: 959px)");
    const set = () => setNarrow(m.matches);
    set(); m.addEventListener?.("change", set);
    return () => m.removeEventListener?.("change", set);
  }, []);
  const draw = useCallback(() => {
    const b = box.current;
    if (!b || window.innerWidth < 960) { setPath(""); return; }
    const from = b.querySelector<HTMLElement>(".fp-q[aria-pressed='true']");
    const to = b.querySelector<HTMLElement>(".hp-card");
    if (!from || !to) { setPath(""); return; }
    const r0 = b.getBoundingClientRect(), f = from.getBoundingClientRect(), q = to.getBoundingClientRect();
    const x1 = f.right - r0.left, y1 = f.top + f.height / 2 - r0.top;
    const x2 = q.left - r0.left, y2 = q.top + Math.min(q.height / 2, 48) - r0.top, dx = (x2 - x1) * 0.5;
    setPath(`M${x1.toFixed(1)} ${y1.toFixed(1)} C${(x1 + dx).toFixed(1)} ${y1.toFixed(1)}, ${(x2 - dx).toFixed(1)} ${y2.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}`);
  }, []);
  useLayoutEffect(() => { draw(); }, [sel, narrow, draw]);
  /* the challenge open follows the scroll through the held section (the same progress the scene uses) */
  useEffect(() => {
    if (!scroll) return;
    const sec = box.current?.closest<HTMLElement>(".scn");
    if (!sec) return;
    let raf = 0;
    const tick = () => {
      raf = 0;
      if (sec.dataset.static !== undefined) return;
      const r = sec.getBoundingClientRect();
      const total = sec.offsetHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, -r.top / Math.max(1, total)));
      const k = Math.min(items.length - 1, Math.floor(p * items.length));
      setSel((s) => (s === k ? s : k));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener("scroll", on, { passive: true });
    return () => { window.removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, [scroll, items.length]);
  useEffect(() => {
    const b = box.current;
    if (!b) return;
    const ro = new ResizeObserver(draw);
    ro.observe(b);
    window.addEventListener("resize", draw);
    return () => { ro.disconnect(); window.removeEventListener("resize", draw); };
  }, [draw]);
  const cur = items[sel];
  const card = cur?.b ? (
    <div className="hp-card" key={sel}>
      <p className="fp-k">{label}</p>
      <p className="hp-b">{cur.b}</p>
    </div>
  ) : null;
  return (
    <div className="fp hp" ref={box}>
      <svg className="fp-lines" aria-hidden="true" key={`l${sel}`}>
        {path && <path d={path} pathLength={1} style={{ ["--i" as string]: 0 } as CSSProperties} />}
      </svg>
      <div className="fp-left">
        <ul className="fp-list">
          {items.map((it, i) => (
            <li key={it.q}>
              <button type="button" className="fp-q hp-q" aria-pressed={sel === i} data-goto={scroll ? i : undefined} onClick={() => setSel(i)}>
                <span className="fp-dot" aria-hidden="true" />
                <span>&ldquo;{it.q.replace(/[.”"]+$/, "")}.&rdquo;</span>
              </button>
              {narrow && sel === i && card && <div className="fp-inline hp-inline" aria-live="polite">{card}</div>}
            </li>
          ))}
        </ul>
      </div>
      {!narrow && <div className="fp-right" aria-live="polite">{card}</div>}
    </div>
  );
}
