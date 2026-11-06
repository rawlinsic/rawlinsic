/* The five area diagrams ("how the pieces fit"), one shape per area:
   loop (plan to practice), track (project life cycle), cycle (asset life
   cycle), hub (what we build around the systems you own), ascent (define,
   enable, deliver). Labels are real text; the art is decoration. They
   animate when an ancestor gets .is-in (scroll reveal or active panel). */
import type { CSSProperties } from "react";
import type { DiagramKind } from "@/lib/content/v8";

type Step = { t: string; d?: string };
const R = 35;

function point(kind: DiagramKind, i: number, n: number): [number, number] {
  if (kind === "ascent") return [14 + i * (72 / Math.max(1, n - 1)), 74 - i * (48 / Math.max(1, n - 1))];
  const a = ((-90 + (360 / n) * i) * Math.PI) / 180;
  const r = kind === "hub" ? 38 : R;
  return [50 + r * Math.cos(a), 50 + r * Math.sin(a)];
}

function Art({ kind, n }: { kind: DiagramKind; n: number }) {
  if (kind === "track") return null;
  if (kind === "ascent") {
    const pts = Array.from({ length: n }, (_, i) => point(kind, i, n));
    const d = pts.reduce((acc, [x, y], i) => {
      if (!i) return `M4 92 Q ${(4 + x) / 2} 92 ${x} ${y}`;
      const [px, py] = pts[i - 1];
      return `${acc} Q ${(px + x) / 2} ${py} ${x} ${y}`;
    }, "") + ` Q ${pts[n - 1][0] + 6} ${pts[n - 1][1] - 10} 97 6`;
    return (
      <svg className="dg-art" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path className="dg-ground" d="M0 92 H100" />
        <path className="dg-path" d={d} pathLength={1} />
        <circle className="dg-drone" r="1.4"><animateMotion dur="6s" repeatCount="indefinite" path={d} /></circle>
      </svg>
    );
  }
  if (kind === "hub") {
    return (
      <svg className="dg-art" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {Array.from({ length: n }, (_, i) => { const [x, y] = point(kind, i, n); return <line key={i} className="dg-spoke" x1="50" y1="50" x2={x} y2={y} pathLength={1} style={{ ["--i" as string]: i } as CSSProperties} />; })}
      </svg>
    );
  }
  return (
    <svg className="dg-art" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <circle className="dg-ring" cx="50" cy="50" r={R} pathLength={1} />
      <g className="dg-orbit"><circle className="dg-dot" cx="50" cy={50 - R} r="1.6" /></g>
    </svg>
  );
}

export function Diagram({ kind, steps, detail, center }: { kind: DiagramKind; steps: readonly Step[]; detail?: boolean; center?: string }) {
  const n = steps.length;
  return (
    <figure className={`dg dg-${kind}${detail ? " dg-detail" : ""}`} style={{ ["--n" as string]: n } as CSSProperties}>
      <Art kind={kind} n={n} />
      {kind === "hub" && <span className="dg-center" aria-hidden="true">{center ?? "The systems you already own"}</span>}
      <ol className="dg-steps">
        {steps.map((s, i) => {
          const [x, y] = point(kind, i, n);
          return (
            <li key={s.t} style={{ ["--i" as string]: i, ["--x" as string]: `${x}%`, ["--y" as string]: `${y}%` } as CSSProperties}>
              <span className="dg-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <b>{s.t}</b>
              {detail && s.d && <span className="dg-d">{s.d}</span>}
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
