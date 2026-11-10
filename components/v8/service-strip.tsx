/* Every service, drifting sideways in four lanes (Nicole, Nov 9: the How we
   work frame on the home page). Each card goes to that service's page.
   Hover or keyboard focus pauses the lanes; reduced motion shows them still
   and wrapped. The second copy in each lane only makes the loop seamless,
   so it's hidden from screen readers and skipped by Tab. */
import type { CSSProperties } from "react";

export type Svc = { name: string; area: string; href: string; photo: string; style?: CSSProperties };

export default function ServiceStrip({ services, label, lanes = 4 }: { services: Svc[]; label: string; lanes?: number }) {
  return (
    <div className="svs" role="region" aria-label={`${label}: select one to open its page`}>
      <p className="svs-k" aria-hidden="true">{label}</p>
      <div className="svs-lanes">
      {Array.from({ length: lanes }, (_, l) => {
        const list = services.filter((_, i) => i % lanes === l);
        return (
          <ul key={l} className={`svs-row${l % 2 ? " svs-rev" : ""}`}>
            {[...list, ...list].map((s, i) => {
              const copy = i >= list.length;
              return (
                <li key={`${s.href}-${i}`} aria-hidden={copy || undefined} style={s.style}>
                  <a href={s.href} tabIndex={copy ? -1 : undefined}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.photo} alt="" loading="lazy" />
                    <span><b>{s.name}</b><em>{s.area}</em></span>
                  </a>
                </li>
              );
            })}
          </ul>
        );
      })}
      </div>
    </div>
  );
}
