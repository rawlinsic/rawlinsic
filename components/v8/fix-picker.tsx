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
const NONE = -2; // nothing picked yet: the list shows on its own (Nicole, Nov 12)

/* onGo: when the picker sits on the Contact page itself, its button hands the choice to the form there
   (topic and message) instead of going to /contact */
export default function FixPicker({ fixes, onGo }: { fixes: Fix[]; onGo?: (topic: string | undefined, msg: string) => void }) {
  const [sel, setSel] = useState(NONE);
  /* on phones, tapping the open one again closes it; on computers one choice is always open, so the lines and the
     services always show on the right (Nicole, Nov 13: "not nothing to the right") */
  const pick = (k: number) => setSel((cur) => (cur === k && window.innerWidth < 960 ? NONE : k));
  const [own, setOwn] = useState("");
  const [paths, setPaths] = useState<string[]>([]);
  /* phones (Nicole, Nov 12: it "doesn't make sense how it is"): the answer opens right under the choice you tap,
     not below all twelve choices */
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(max-width: 959px)");
    /* computers open with the first choice picked (Nicole, Nov 13); phones start with the list on its own */
    const set = () => { setNarrow(m.matches); if (!m.matches) setSel((c) => (c === NONE ? 0 : c)); };
    set(); m.addEventListener?.("change", set);
    return () => m.removeEventListener?.("change", set);
  }, []);
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

  const f = sel >= 0 ? fixes[sel] : null;
  const go = (e: { preventDefault(): void }) => { if (!onGo) return; e.preventDefault(); if (f) onGo(f.topic, `${f.q}.`); else onGo(undefined, own.trim()); };
  const contact = f
    ? `/contact?topic=${encodeURIComponent(f.topic)}&msg=${encodeURIComponent(f.q + ".")}`
    : `/contact${own.trim() ? `?msg=${encodeURIComponent(own.trim())}` : ""}`;

  const answer = sel === NONE ? null : f ? (
    <>
      <p className="fp-k">Where we&apos;d start</p>
      <ul className="fp-svcs">
        {f.services.map((s) => (
          <li key={s.href} style={s.style}>
            <a className="fp-svc" href={s.href}><b>{s.name}</b><span>{s.area}</span></a>
          </li>
        ))}
      </ul>
      <a className="v8-btn fp-go" href={contact} onClick={go}>Talk to us about this</a>
    </>
  ) : (
    <div className="fp-own">
      <label className="fp-k" htmlFor="fp-own-box">In your own words</label>
      <textarea id="fp-own-box" rows={5} value={own} onChange={(e) => setOwn(e.target.value)} placeholder="What's going on, and what would better look like?" />
      <a className="v8-btn fp-go" href={contact} onClick={go}>Send it to our team</a>
    </div>
  );

  return (
    <div className="fp" ref={box}>
      <svg className="fp-lines" aria-hidden="true" key={sel}>
        {paths.map((d, i) => <path key={i} d={d} pathLength={1} style={{ ["--i" as string]: i } as CSSProperties} />)}
      </svg>
      <div className="fp-left">
        <p className="fp-k" id="fp-k">Pick the one that sounds most like you</p>
        <ul className="fp-list" aria-labelledby="fp-k">
          {/* Write your own first (Nicole, Nov 13) */}
          <li>
            <button type="button" className="fp-q fp-q-own" aria-pressed={sel === OWN} onClick={() => pick(OWN)}>
              <span className="fp-dot" aria-hidden="true" />Write your own
            </button>
            {narrow && sel === OWN && <div className="fp-inline" aria-live="polite">{answer}</div>}
          </li>
          {fixes.map((x, i) => (
            <li key={x.q}>
              <button type="button" className="fp-q" aria-pressed={sel === i} onClick={() => pick(i)}>
                <span className="fp-dot" aria-hidden="true" />{x.q}
              </button>
              {narrow && sel === i && <div className="fp-inline" aria-live="polite">{answer}</div>}
            </li>
          ))}
        </ul>
      </div>
      {!narrow && <div className="fp-right" aria-live="polite">{answer}</div>}
    </div>
  );
}
