"use client";
/* Photo cards fanned out (Nicole's design idea, Nov 10, from scale.com): one card big in the middle, the
   others smaller behind it on each side. Click a side card (or use the arrows, the dots, a swipe, or the
   arrow keys) to bring it to the middle; the middle card opens. It moves on by itself every few seconds and
   holds while you point at it; with reduced motion it only moves when you ask. Styles: app/v10.css (fan-). */
import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";

export type FanCard = { href: string; tag: string; title: string; photo: string; pos?: string };

export default function FanCards({ cards, label, start }: { cards: FanCard[]; label: string; start?: number }) {
  const n = cards.length;
  const [at, setAt] = useState(start ?? Math.floor(n / 2));
  const [hold, setHold] = useState(false);
  const down = useRef<number | null>(null);
  const go = useCallback((k: number) => setAt(((k % n) + n) % n), [n]);

  useEffect(() => {
    if (hold || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setAt((a) => (a + 1) % n), 5200);
    return () => window.clearInterval(t);
  }, [hold, n]);

  const off = (i: number) => {
    let d = i - at;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); go(at - 1); }
    if (e.key === "ArrowRight") { e.preventDefault(); go(at + 1); }
  };
  const onDown = (e: PointerEvent) => { down.current = e.clientX; };
  const onUp = (e: PointerEvent) => {
    if (down.current === null) return;
    const dx = e.clientX - down.current;
    down.current = null;
    if (Math.abs(dx) > 50) go(at + (dx < 0 ? 1 : -1));
  };

  return (
    <div className="fan" role="region" aria-roledescription="carousel" aria-label={label} onKeyDown={onKey}
      onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)} onFocus={() => setHold(true)} onBlur={() => setHold(false)}>
      <div className="fan-stage" onPointerDown={onDown} onPointerUp={onUp}>
        {cards.map((c, i) => {
          const d = off(i), a = Math.abs(d);
          return (
            <a key={c.href + c.title} href={c.href} className={`fan-card${d === 0 ? " is-on" : ""}`} draggable={false}
              style={{ ["--d" as string]: d, ["--a" as string]: a } as CSSProperties}
              aria-hidden={a > 2 || undefined} tabIndex={d === 0 ? 0 : -1}
              aria-label={d === 0 ? `${c.tag}: ${c.title}` : `Show ${c.tag}: ${c.title}`}
              onClick={(e) => { if (d !== 0) { e.preventDefault(); go(i); } }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.photo} alt="" loading="lazy" draggable={false} style={c.pos ? { objectPosition: c.pos } : undefined} />
              <span className="fan-tag"><i aria-hidden="true" />{c.tag}</span>
              <b>{c.title}</b>
            </a>
          );
        })}
      </div>
      <div className="fan-ctrl">
        <button type="button" onClick={() => go(at - 1)} aria-label="Previous">←</button>
        <span className="fan-dots">{cards.map((c, i) => <button key={c.href + c.title} type="button" aria-label={`Show ${c.tag}`} aria-current={i === at || undefined} onClick={() => go(i)} />)}</span>
        <button type="button" onClick={() => go(at + 1)} aria-label="Next">→</button>
      </div>
    </div>
  );
}
