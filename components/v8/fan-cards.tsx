"use client";
/* Photo cards fanned out (Nicole's design idea, Nov 10, from scale.com): one card big in the middle, the
   others smaller behind it on each side. Click a side card (or use the arrows, the dots, a swipe, or the
   arrow keys) to bring it to the middle; the middle card opens. It moves on by itself every few seconds and
   holds while you point at it; with reduced motion it only moves when you ask. Styles: app/v10.css (fan-). */
import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";

/* text/more: shown when you point at the middle card (home What we do: the words the old tiles had) */
export type FanCard = { href: string; tag: string; title: string; photo: string; pos?: string; text?: string; more?: string };

/* tags: the line at the top of each card (off on home, Nicole, Nov 11). hoverFront: resting the pointer on a side
   card brings it to the middle (home, Nicole, Nov 11); a short pause first, and a pause after each move, so
   sweeping across the cards doesn't set them spinning */
export default function FanCards({ cards, label, start, tags = true, hoverFront = false }: { cards: FanCard[]; label: string; start?: number; tags?: boolean; hoverFront?: boolean }) {
  const n = cards.length;
  const [at, setAt] = useState(start ?? Math.floor(n / 2));
  const [hold, setHold] = useState(false);
  const down = useRef<number | null>(null);
  const lock = useRef(0), wait = useRef<number | null>(null);
  const go = useCallback((k: number) => { lock.current = Date.now() + 380; setAt(((k % n) + n) % n); }, [n]);
  /* right away (Nicole, Nov 11: "it needs to go right away"); a short lock stops cards swapping back and forth */
  const rest = (i: number) => {
    if (!hoverFront || window.matchMedia("(hover: none)").matches) return;
    if (Date.now() >= lock.current) go(i);
  };
  const leave = () => { if (wait.current) { window.clearTimeout(wait.current); wait.current = null; } };
  useEffect(() => () => leave(), []); // eslint-disable-line react-hooks/exhaustive-deps

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
              onClick={(e) => { if (d !== 0) { e.preventDefault(); go(i); } }}
              onPointerEnter={d !== 0 && a <= 2 ? (e) => { if (e.pointerType === "mouse") rest(i); } : undefined}
              onPointerMove={d !== 0 && a <= 2 ? (e) => { if (e.pointerType === "mouse") rest(i); } : undefined}
              onPointerLeave={leave}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.photo} alt="" loading="lazy" draggable={false} style={c.pos ? { objectPosition: c.pos } : undefined} />
              {tags && <span className="fan-tag"><i aria-hidden="true" />{c.tag}</span>}
              {c.text || c.more
                ? <span className="fan-body"><b>{c.title}</b><span className="fan-txt">{c.text && <span className="fan-q">{c.text}</span>}{c.more && <span className="fan-more">{c.more}</span>}</span></span>
                : <b>{c.title}</b>}
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
