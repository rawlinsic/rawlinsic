"use client";
/* "Tell us what you're trying to fix" (home closing; Nicole, Nov 10). Pick the
   problem that sounds most like you on the left; glowing lines draw out to the
   services we'd start with on the right, each a link to its page, and one
   button takes the problem straight to the contact form. "Write your own" (in
   the electric blue) swaps the services for a box to say it in your own words,
   which goes to the contact form too. No photo behind it, so it reads. Phones
   get the same thing stacked, without the lines. */
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";

export type FixSvc = { name: string; area: string; href: string; style?: CSSProperties };
export type Fix = { q: string; topic: string; services: FixSvc[] };

const OWN = -1;

export default function FixPicker({ fixes }: { fixes: Fix[] }) {
  const [sel, setSel] = useState(0);
  const [own, setOwn] = useState("");
  const [paths, setPaths] = useState<string[]>([]);
  const box = useRef<HTMLDivElement>(null);
  const draw = useCallback(() => {
    const b = box.current;
    if (!b || window.innerWidth < 960) { setPaths([]); return; }
    const from = b.querySelector<HTMLElement>(".fp-q[aria-pressed='true']");
    const to = Array.from(b.querySelectorAll<HTMLElement>(".fp-svc, .fp-own"));
    if (!from || !to.length) { setPaths([]); return; }
    const r0 = b.getBoundingClientRect(), f = from.getBoundingClientRect();
    const x1 = f.right - r0.left, y1 = f.top + f.height / 2 - r0.top;
    setPaths(to.map((t) => {
      const q = t.getBoundingClientRect();
      const x2 = q.left - r0.left, y2 = q.top + Math.min(q.height / 2, 40) - r0.top, dx = (x2 - x1) * 0.5;
      return `M${x1.toFixed(1)} ${y1.toFixed(1)} C${(x1 + dx).toFixed(1)} ${y1.toFixed(1)}, ${(x2 - dx).toFixed(1)} ${y2.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}`;
    }));
  }, []);
  useLayoutEffect(() => { draw(); }, [sel, draw]);
  useEffect(() => {
    const b = box.current;
    if (!b) return;
    const ro = new ResizeObserver(draw);
    ro.observe(b);
    window.addEventListener("resize", draw);
    return () => { ro.disconnect(); window.removeEventListener("resize", draw); };
  }, [draw]);

  const f = sel === OWN ? null : fixes[sel];
  const contact = f
    ? `/contact?topic=${encodeURIComponent(f.topic)}&msg=${encodeURIComponent(f.q + ".")}`
    : `/contact${own.trim() ? `?msg=${encodeURIComponent(own.trim())}` : ""}`;

  return (
    <div className="fp" ref={box}>
      <svg className="fp-lines" aria-hidden="true" key={sel}>
        {paths.map((d, i) => <path key={i} d={d} pathLength={1} style={{ ["--i" as string]: i } as CSSProperties} />)}
      </svg>
      <div className="fp-left">
        <p className="fp-k" id="fp-k">Pick the one that sounds most like you</p>
        <ul className="fp-list" aria-labelledby="fp-k">
          {fixes.map((x, i) => (
            <li key={x.q}>
              <button type="button" className="fp-q" aria-pressed={sel === i} onClick={() => setSel(i)}>
                <span className="fp-dot" aria-hidden="true" />{x.q}
              </button>
            </li>
          ))}
          <li>
            <button type="button" className="fp-q fp-q-own" aria-pressed={sel === OWN} onClick={() => setSel(OWN)}>
              <span className="fp-dot" aria-hidden="true" />Write your own
            </button>
          </li>
        </ul>
      </div>
      <div className="fp-right" aria-live="polite">
        {f ? (
          <>
            <p className="fp-k">Where we&apos;d start</p>
            <ul className="fp-svcs">
              {f.services.map((s) => (
                <li key={s.href} style={s.style}>
                  <a className="fp-svc" href={s.href}><b>{s.name}</b><span>{s.area}</span></a>
                </li>
              ))}
            </ul>
            <a className="v8-btn fp-go" href={contact}>Talk to us about this</a>
          </>
        ) : (
          <div className="fp-own">
            <label className="fp-k" htmlFor="fp-own-box">In your own words</label>
            <textarea id="fp-own-box" rows={5} value={own} onChange={(e) => setOwn(e.target.value)} placeholder="What's going on, and what would better look like?" />
            <a className="v8-btn fp-go" href={contact}>Send it to our team</a>
          </div>
        )}
      </div>
    </div>
  );
}
