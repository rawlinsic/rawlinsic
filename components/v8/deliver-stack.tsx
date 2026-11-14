/* Digital Solutions: What we deliver, as a stack that builds itself while the
   section holds and you scroll. 01 Data governance is the base; each layer
   drops onto the one below it, up to 05 Organizational change on top. Beside
   the stack, every layer's number, name, and line sit in a readable list, and
   the one being placed lights up. Phones and reduced motion get the finished
   stack and the full list. Words: content fixes v1 (Nov 5 2026), with the two
   links kept; the first four lines reworded by the Digital Solutions file v5 (Nov 13). */
import type { CSSProperties, ReactNode } from "react";
import Scene from "@/components/v8/scene";

const G = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);

const LAYERS: { n: string; t: string; line: ReactNode; g: ReactNode }[] = [
  { n: "01", t: "Data governance", line: <>We set up <a href="/services/digital-solutions/data-governance">owners, definitions, and rules</a> for an organization&apos;s data.</>, g: <><path d="M12 3l8 3v5c0 4.6-3.2 8.2-8 10-4.8-1.8-8-5.4-8-10V6z" /><path d="M9 12l2 2 4-4" /></> },
  { n: "02", t: "Digital tools and automation", line: "We build tools and automated workflows for repeated, manual steps.", g: <><path d="M5 3v4M3 5h4M19 15v4M17 17h4" /><path d="M12 4l2.2 5.8L20 12l-5.8 2.2L12 20l-2.2-5.8L4 12l5.8-2.2z" /></> },
  { n: "03", t: "Connected systems", line: "We connect the systems an organization already owns, so information is entered once.", g: <><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="12" cy="18" r="2.5" /><path d="M8.5 6h7M17 8.2l-4 7.5M7 8.2l4 7.5" /></> },
  { n: "04", t: "AI adoption", line: "We review where AI fits, rank the uses, and plan the rollout.", g: <><rect x="8" y="8" width="8" height="8" rx="1.5" /><path d="M10 8V5M14 8V5M10 19v-3M14 19v-3M8 10H5M8 14H5M19 10h-3M19 14h-3" /></> },
  { n: "05", t: "Organizational change", line: <>We help people take up <a href="/services/strategy-organization/change-management">the new way of working</a>, with training and support.</>, g: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9.5" r="2.2" /><path d="M4 19c0-2.8 2.2-5 5-5s5 2.2 5 5M15 14.5c2.3 0 4 1.8 4 4.5" /></> },
];

export default function DeliverStack() {
  return (
    <Scene steps={LAYERS.length} per={60} id="deliver" className="dls" label="What we deliver">
      <div className="v8-wrap dls-in">
        <div className="dls-copy">
          <p className="v8-eyebrow">From data to new ways of working</p>
          <h2 className="v8-h2">What we deliver</h2>
          <ol className="dls-list">
            {LAYERS.map((l, i) => (
              <li key={l.n} data-step={i}>
                <span className="dls-n" aria-hidden="true">{l.n}</span>
                <span className="dls-g" aria-hidden="true"><G>{l.g}</G></span>
                <div><h3>{l.t}</h3><p>{l.line}</p></div>
              </li>
            ))}
          </ol>
        </div>
        <div className="dls-art" aria-hidden="true">
          <div className="dls-iso">
            {LAYERS.map((l, i) => (
              <div key={l.n} className="dls-plate" data-step={i} style={{ ["--i" as string]: i } as CSSProperties}>
                <b>{l.n}</b>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Scene>
  );
}
