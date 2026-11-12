/* The line drawing behind a service page's hero: one per area, so the five
   families of service pages each have their own look. Glowing aqua lines,
   drawn in on load and moving slowly. Pure decoration (hidden from screen
   readers); reduced motion shows it still.
     loop    Strategy & Organization: many priorities brought into one direction
     track   Project Delivery: the project life cycle, milestone to milestone
     cycle   Operations & Maintenance: the asset life cycle
     hub     Digital Solutions: tools built around the systems you own
     ascent  Drones & Advanced Air Mobility: a flight path climbing out */
import type { DiagramKind } from "@/lib/content/v8";

const ring = (cx: number, cy: number, r: number, n: number, from = 0) =>
  Array.from({ length: n }, (_, i) => {
    const a = ((from + (360 / n) * i) * Math.PI) / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const;
  });

function Art({ kind }: { kind: DiagramKind }) {
  if (kind === "loop") {
    // many priorities brought into one direction
    const ys = [80, 190, 300, 410, 520];
    const into = (y: number) => `M 20 ${y} C 300 ${y} 330 300 520 300`;
    return (
      <>
        {ys.map((y) => <path key={y} className={`svm-draw${y === 300 ? "" : " svm-faint"}`} d={into(y)} />)}
        <path className="svm-draw" d="M 520 300 H 790" />
        {ys.map((y, i) => <circle key={`n${y}`} className="svm-node svm-faint" cx="20" cy={y} r="6" style={{ animationDelay: `${i * 0.4}s` }} />)}
        <circle className="svm-node" cx="520" cy="300" r="9" />
        <circle className="svm-ping" cx="790" cy="300" r="10" />
      </>
    );
  }
  if (kind === "track") {
    const d = "M 10 520 C 170 520 210 430 330 430 S 470 310 560 310 S 690 170 790 150";
    return (
      <>
        <path className="svm-draw" d={d} />
        <path className="svm-draw svm-faint" d="M 10 560 C 170 560 210 470 330 470 S 470 350 560 350 S 690 210 790 190" />
        {[[10, 520], [330, 430], [560, 310], [790, 150]].map(([x, y], i) => <circle key={i} className="svm-node" cx={x} cy={y} r="8" style={{ animationDelay: `${i * 0.5}s` }} />)}
        <circle className="svm-ping" cx="790" cy="150" r="8" />
      </>
    );
  }
  if (kind === "cycle") {
    return (
      <>
        <g className="svm-spin">
          <circle className="svm-draw" cx="430" cy="300" r="230" />
          {ring(430, 300, 230, 4, 45).map(([x, y], i) => (
            <path key={i} className="svm-arrow" d="M -10 -9 L 4 0 L -10 9" transform={`translate(${x} ${y}) rotate(${45 + 90 * i + 90})`} />
          ))}
        </g>
        <g className="svm-spin svm-rev"><circle className="svm-draw svm-faint svm-dash" cx="430" cy="300" r="160" /></g>
        {ring(430, 300, 230, 4, 0).map(([x, y], i) => <circle key={i} className="svm-node" cx={x} cy={y} r="8" style={{ animationDelay: `${i * 0.5}s` }} />)}
      </>
    );
  }
  if (kind === "hub") {
    const outer = ring(430, 300, 230, 8, -90);
    return (
      <>
        <circle className="svm-draw svm-faint svm-dash" cx="430" cy="300" r="230" />
        {outer.map(([x, y], i) => <line key={`l${i}`} className="svm-flow" x1="430" y1="300" x2={x} y2={y} />)}
        {outer.map(([x, y], i) => <circle key={`n${i}`} className="svm-node" cx={x} cy={y} r="8" style={{ animationDelay: `${i * 0.3}s` }} />)}
        {ring(430, 300, 330, 5, -60).map(([x, y], i) => <circle key={`f${i}`} className="svm-node svm-faint" cx={x} cy={y} r="5" style={{ animationDelay: `${i * 0.4}s` }} />)}
        <circle className="svm-core" cx="430" cy="300" r="48" />
      </>
    );
  }
  // ascent
  const d = "M 30 540 Q 420 530 770 90";
  return (
    <>
      <path className="svm-draw svm-faint" d="M 0 560 H 800" />
      <path className="svm-draw svm-dash" d={d} />
      {[30, 62, 94].map((r, i) => <circle key={r} className="svm-ping" cx="770" cy="90" r={r} style={{ animationDelay: `${i * 0.7}s` }} />)}
      <circle className="svm-node" cx="30" cy="540" r="8" />
    </>
  );
}

export default function AreaMark({ kind }: { kind: DiagramKind }) {
  return (
    <svg className={`svm svm-${kind}`} viewBox="0 0 800 600" aria-hidden="true" focusable="false">
      <Art kind={kind} />
    </svg>
  );
}
