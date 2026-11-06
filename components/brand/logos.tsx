/* Logo concepts for the brand guide (exploration only; Nicole decides).
   Every mark is drawn on a 100×100 grid as plain strokes, so it stays crisp
   at any size and can go to Illustrator as is. Colors come from CSS
   variables: --lk (line ink) and --la (accent). On dark stages the accent
   glows (.lg-glow); in print and embroidery everything is flat. */
import type { CSSProperties, ReactNode } from "react";

export type ConceptId = "rising" | "circuit" | "nodeword" | "route" | "framed" | "noder";
export type Concept = {
  id: ConceptId; n: number; name: string; from: "yours" | "new"; says: string; watch: string;
  word: string; font: string; fontVar: string;
};

export const CONCEPTS: Concept[] = [
  { id: "rising", n: 1, name: "Rising R", from: "yours", says: "An R with a ramp rising off the leg: progress, momentum.", watch: "The arrow is a common symbol; keep the ramp shape our own.", word: "Rawlins", font: "Montserrat SemiBold", fontVar: "var(--f-montserrat)" },
  { id: "circuit", n: 2, name: "Circuit R", from: "yours", says: "An R drawn as two traces with nodes: engineering meets technology.", watch: "Too detailed under 32 px; needs the simple version for small uses.", word: "rawlins", font: "Outfit SemiBold", fontVar: "var(--f-outfit)" },
  { id: "nodeword", n: 3, name: "Node wordmark", from: "yours", says: "Our own lettering. The a and the dot of the i are glowing nodes.", watch: "Lowercase reads modern; check that Scott is fine moving off a capital R.", word: "", font: "Custom lettering", fontVar: "" },
  { id: "route", n: 4, name: "Route wordmark", from: "new", says: "Today's underline becomes a route that rises to a node.", watch: "Wide shape; the icon carries it at small sizes.", word: "", font: "Custom lettering", fontVar: "" },
  { id: "framed", n: 5, name: "Framed", from: "new", says: "Today's box and underline in clean type, with one lit corner.", watch: "Safest with Scott's rectangle; least new.", word: "Rawlins", font: "Source Sans 3 Bold", fontVar: "var(--font-sans)" },
  { id: "noder", n: 6, name: "Node R", from: "new", says: "A bold R with a glowing node in its bowl. Built for 16 px.", watch: "Simple on purpose; the wordmark and color do the rest.", word: "Rawlins", font: "Figtree SemiBold", fontVar: "var(--f-figtree)" },
];
export const conceptById = (id: ConceptId) => CONCEPTS.find((c) => c.id === id)!;

const ink = { stroke: "var(--lk)", fill: "none" } as const;
const acc = { stroke: "var(--la)", fill: "none" } as const;

/* ── the marks (icons), 100×100 ───────────────────────────────── */
function MarkArt({ id, simple }: { id: ConceptId; simple?: boolean }) {
  switch (id) {
    case "rising":
      return (
        <g strokeLinecap="round" strokeLinejoin="round">
          <path {...ink} strokeWidth={10} d="M26 86V16H52A18 18 0 0 1 52 52H26M42 52L66 86" />
          <path {...acc} className="lg-acc" strokeWidth={8} d="M58.8 75.8L92 30M78.4 33.4L92 30L93 44" />
        </g>
      );
    case "circuit":
      if (simple) {
        return (
          <g strokeLinecap="round" strokeLinejoin="round">
            <path {...ink} strokeWidth={12} d="M24 88V14H54A21 21 0 0 1 54 56H40L70 88" />
            <circle className="lg-acc" cx="24" cy="88" r="9" fill="var(--la)" />
          </g>
        );
      }
      return (
        <g strokeLinecap="round" strokeLinejoin="round">
          <path {...ink} strokeWidth={6} d="M18 86V12H56A23 23 0 0 1 56 58H46L74 86" />
          <path {...ink} strokeWidth={6} d="M32 74V26H55A9 9 0 0 1 55 44H42" />
          <g className="lg-acc" fill="var(--la)">
            <circle cx="18" cy="86" r="6" /><circle cx="74" cy="86" r="6" /><circle cx="32" cy="74" r="6" /><circle cx="42" cy="44" r="6" />
          </g>
        </g>
      );
    case "nodeword":
      return (
        <g strokeLinecap="round">
          <circle {...ink} strokeWidth={11} cx="46" cy="54" r="28" />
          <path {...ink} strokeWidth={11} d="M74 26V82" />
          <circle className="lg-acc" cx="46" cy="54" r="11" fill="var(--la)" />
        </g>
      );
    case "route":
      return (
        <g strokeLinecap="round" strokeLinejoin="round">
          <path {...ink} strokeWidth={12} d="M26 74V28M26 52A24 24 0 0 1 50 28" />
          <path {...acc} className="lg-acc" strokeWidth={7} d="M10 90H58C70 90 76 84 80 72L86 50" />
          <circle className="lg-acc" cx="86" cy="44" r="8" fill="var(--la)" />
        </g>
      );
    case "framed":
      return (
        <g>
          <path {...ink} strokeWidth={6} strokeLinecap="round" d="M70 6H16Q6 6 6 16V84Q6 94 16 94H84Q94 94 94 84V32" />
          <path {...acc} className="lg-acc" strokeWidth={6} strokeLinecap="round" d="M94 22V16Q94 6 84 6H80" />
          <text x="50" y="73" textAnchor="middle" fill="var(--lk)" style={{ font: "700 62px var(--font-sans)" }}>R</text>
        </g>
      );
    case "noder":
      return (
        <g strokeLinecap="round" strokeLinejoin="round">
          <path {...ink} strokeWidth={16} d="M24 88V14H50A19 19 0 0 1 50 52H24M44 52L72 88" />
          <circle className="lg-acc" cx="44" cy="33" r="7.5" fill="var(--la)" />
        </g>
      );
  }
}

export function Mark({ id, size, simple, title }: { id: ConceptId; size: number; simple?: boolean; title?: string }) {
  return (
    <svg className="lg-mark" viewBox="0 0 100 100" width={size} height={size} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <MarkArt id={id} simple={simple ?? size < 40} />
    </svg>
  );
}

/* ── custom lowercase lettering: "rawlins" (x-height 50, stroke 11) ─ */
const LET = {
  r: "M6 100V50M6 78A28 28 0 0 1 34 50",
  aStem: "M97 50V100",
  w: "M114 50L127 100L140 62L153 100L166 50",
  l: "M184 18V100",
  i: "M204 50V100",
  n: "M224 100V50M224 72A22 22 0 0 1 268 72V100",
  s: "M322 58C316 51 298 48 291 56C283 65 294 72 305 75C318 78 326 85 320 94C313 103 293 101 286 92",
};
export function Lettering({ h, variant }: { h: number; variant: "node" | "route" }) {
  const vb = variant === "route" ? "0 8 362 128" : "0 8 332 102";
  const [, , vw, vh] = vb.split(" ").map(Number);
  return (
    <svg className="lg-letters" viewBox={vb} height={h} width={(h * vw) / vh} role="img" aria-label="Rawlins">
      <g {...ink} strokeWidth={11} strokeLinecap="round" strokeLinejoin="round">
        <path d={LET.r} /><circle cx="72" cy="75" r="25" /><path d={LET.aStem} /><path d={LET.w} />
        <path d={LET.l} /><path d={LET.i} /><path d={LET.n} /><path d={LET.s} />
      </g>
      {variant === "node" ? (
        <g className="lg-acc" fill="var(--la)">
          <circle cx="72" cy="75" r="9.5" />
          <circle cx="204" cy="28" r="8" />
        </g>
      ) : (
        <g>
          <circle cx="204" cy="29" r="6.5" fill="var(--lk)" />
          <path {...acc} className="lg-acc" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" d="M6 122H300C320 122 334 112 340 96L348 72" />
          <circle className="lg-acc" cx="350" cy="64" r="8" fill="var(--la)" />
        </g>
      )}
    </svg>
  );
}

/* ── lockups ──────────────────────────────────────────────────── */
export function Lockup({ id, h }: { id: ConceptId; h: number }) {
  const c = conceptById(id);
  if (id === "nodeword") return <Lettering h={h} variant="node" />;
  if (id === "route") return <Lettering h={h * 1.18} variant="route" />;
  if (id === "framed") return <FramedLogo h={h * 1.25} />;
  return (
    <span className="lg-lock" style={{ gap: h * 0.22 } as CSSProperties}>
      <Mark id={id} size={h} simple={false} />
      <span className="lg-word" style={{ fontFamily: c.fontVar, fontSize: h * 0.62 }}>{c.word}</span>
    </span>
  );
}

/* Framed: today's box and underline, clean type, one lit corner */
export function FramedLogo({ h }: { h: number }) {
  return (
    <svg className="lg-framed" viewBox="0 0 400 140" height={h} width={(h * 400) / 140} role="img" aria-label="Rawlins">
      <path {...ink} strokeWidth={6} strokeLinecap="round" d="M332 6H16Q6 6 6 16V124Q6 134 16 134H384Q394 134 394 124V46" />
      <path {...acc} className="lg-acc" strokeWidth={6} strokeLinecap="round" d="M394 30V16Q394 6 384 6H348" />
      <text x="200" y="92" textAnchor="middle" fill="var(--lk)" style={{ font: "700 86px var(--font-sans)", letterSpacing: "-0.01em" }}>Rawlins</text>
      <path {...ink} strokeWidth={5} strokeLinecap="round" d="M66 112H316" />
      <circle className="lg-acc" cx="334" cy="112" r="7" fill="var(--la)" />
    </svg>
  );
}

/* Scott's condition: a rectangular logo. Each concept in a box. */
export function Boxed({ id, h }: { id: ConceptId; h: number }) {
  if (id === "framed") return <FramedLogo h={h} />;
  return <span className="lg-box" style={{ padding: `${h * 0.2}px ${h * 0.32}px`, borderRadius: h * 0.08 }}><Lockup id={id} h={h * 0.5} /></span>;
}

/* color roles for a stage */
export const stage = (tone: "light" | "dark" | "mono-light" | "mono-dark"): CSSProperties =>
  ({
    light: { ["--lk"]: "var(--p)", ["--la"]: "var(--gi)" },
    dark: { ["--lk"]: "#ffffff", ["--la"]: "var(--g)" },
    "mono-light": { ["--lk"]: "var(--p)", ["--la"]: "var(--p)" },
    "mono-dark": { ["--lk"]: "#ffffff", ["--la"]: "#ffffff" },
  })[tone] as unknown as CSSProperties;

export function Stage({ tone, glow, className = "", children, style }: { tone: "light" | "dark" | "mono-light" | "mono-dark"; glow?: boolean; className?: string; children: ReactNode; style?: CSSProperties }) {
  return <div className={`lg-stage lg-${tone}${glow ? " lg-glow" : ""} ${className}`} style={{ ...stage(tone), ...style }}>{children}</div>;
}
