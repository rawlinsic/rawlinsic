"use client";
/* How the pieces fit (v9). The steps sit in a row of big, readable cards
   joined by one glowing line that draws itself while the section holds and
   you scroll. Each area keeps its own shape as a touch on the same row:
     loop, cycle  the line runs back around the cards to the first step
     track        the line runs on past the last step, like a schedule
     hub          every card stands on one base: the systems you already own
     ascent       the cards climb, and one straight line (and a drone) climbs with them
   The line is drawn from where the step markers really are on screen, so it
   fits any width. Phones get the steps stacked with the line down the side.
   The words are real text; the line is decoration. */
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import type { DiagramKind } from "@/lib/content/v8";

type Step = { t: string; d?: string };
type Art = { w: number; h: number; main: string; back?: string };

/* a line through the points: straight when level (or stacked), an S-curve when it climbs */
const through = (pts: [number, number][]) =>
  pts.reduce((acc, [x, y], i) => {
    if (!i) return `M ${x} ${y}`;
    const [px, py] = pts[i - 1];
    if (Math.abs(py - y) < 1 || Math.abs(px - x) < 1) return `${acc} L ${x} ${y}`;
    const mx = (px + x) / 2;
    return `${acc} C ${mx} ${py} ${mx} ${y} ${x} ${y}`;
  }, "");

/* the "and round again" label under loop and cycle diagrams is off (Nicole, Nov 11) */
const AGAIN: Partial<Record<DiagramKind, string>> = {};

export default function Fit({ kind, eyebrow, title, lead, steps, base = "The systems you already own" }: { kind: DiagramKind; eyebrow?: string; title: string; lead?: string; steps: readonly Step[]; base?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [art, setArt] = useState<Art | null>(null);
  const mk = useId().replace(/:/g, "");
  const n = steps.length;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const body = el.querySelector<HTMLElement>(".fit-body")!;
    const draw = () => {
      const b = body.getBoundingClientRect();
      const at = (e: Element) => { const r = e.getBoundingClientRect(); return [r.left + r.width / 2 - b.left, r.top + r.height / 2 - b.top] as [number, number]; };
      const nodes = Array.from(body.querySelectorAll(".fit-node")).map(at);
      if (!nodes.length) return;
      const stacked = nodes.length > 1 && Math.abs(nodes[1][0] - nodes[0][0]) < 2;
      const [fx, fy] = nodes[0], [lx, ly] = nodes[nodes.length - 1];
      let pts = nodes;
      if (!stacked && kind === "track") pts = [[0, fy], ...nodes, [b.width, ly]];
      /* ascent: one straight line through the steps, carried on to both edges (Nicole, Nov 10) */
      const straight = !stacked && kind === "ascent" && lx !== fx;
      if (straight) { const m = (ly - fy) / (lx - fx); pts = [[0, fy - m * fx], [b.width, ly + m * (b.width - lx)]]; }
      let back: string | undefined;
      const again = body.querySelector(".fit-again span");
      if (!stacked && again) {
        const lis = body.querySelectorAll(".fit-steps > li");
        const R = lis[lis.length - 1].getBoundingClientRect().right - b.left + 22;
        const L = lis[0].getBoundingClientRect().left - b.left - 22;
        const y = at(again)[1], r = 18;
        back = `M ${lx} ${ly} H ${R - r} Q ${R} ${ly} ${R} ${ly + r} V ${y - r} Q ${R} ${y} ${R - r} ${y} H ${L + r} Q ${L} ${y} ${L} ${y - r} V ${fy + r} Q ${L} ${fy} ${L + r} ${fy} H ${fx - 30}`;
      }
      setArt({ w: b.width, h: b.height, main: straight ? `M ${pts[0][0]} ${pts[0][1]} L ${pts[1][0]} ${pts[1][1]}` : through(pts), back });
    };
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(body);
    return () => ro.disconnect();
  }, [kind, n]);

  return (
    <div ref={ref} className={`fit fit-${kind}${n >= 5 ? " is-wide" : ""}`} data-step={0} style={{ ["--n" as string]: n } as CSSProperties}>
      <div className="fit-head">
        {eyebrow && <p className="v8-eyebrow">{eyebrow}</p>}
        <h2 className="v8-h2">{title}</h2>
        {/* a line under the title (John's review comment, Nov 12: meet the client where they are) */}
        {lead && <p className="fit-lead">{lead}</p>}
      </div>
      <div className="fit-body">
        {art && (
          <svg className="fit-art" width={art.w} height={art.h} viewBox={`0 0 ${art.w} ${art.h}`} aria-hidden="true" focusable="false">
            <defs>
              <marker id={`${mk}a`} viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" className="fit-arrow" />
              </marker>
            </defs>
            <path className="fit-track" d={art.main} />
            {/* the glow: a wide, faint copy of the line (a CSS glow filter here made scrolling stutter, Nov 11) */}
            <path className="fit-line fit-halo" d={art.main} pathLength={1} />
            <path className="fit-line" d={art.main} pathLength={1} markerEnd={kind === "track" ? `url(#${mk}a)` : undefined} />
            {art.back && <path className="fit-back" d={art.back} markerEnd={`url(#${mk}a)`} />}
            {/* the white dot that ran along the ascent line is off (Nicole, Nov 11) */}
          </svg>
        )}
        <ol className="fit-steps">
          {steps.map((s, i) => (
            <li key={`${i}-${s.t}`} style={{ ["--i" as string]: i } as CSSProperties}>
              <span className="fit-node" aria-hidden="true"><i>{String(i + 1).padStart(2, "0")}</i></span>
              {/* a step with no title is one sentence of text (the Operations & Maintenance "How we do it", Nov 12) */}
              <div className={`fit-card${s.t ? "" : " is-text"}`}>
                {s.t && <h3>{s.t}</h3>}
                {s.d && <p>{s.d}</p>}
              </div>
            </li>
          ))}
        </ol>
        {AGAIN[kind] && <p className="fit-again" aria-hidden="true"><span>{AGAIN[kind]}</span></p>}
        {kind === "hub" && <p className="fit-base"><span>{base}</span></p>}
      </div>
    </div>
  );
}
