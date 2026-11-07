"use client";
/* Drones & Advanced Air Mobility: Where we lead. The seven numbered areas
   (from the current site) as a list beside a photo. */
import type { CSSProperties } from "react";
import { WHERE_WE_LEAD } from "@/components/site/aam-data";

export function WhereWeLead({ photo }: { photo: string }) {
  return (
    <section className="av av-lead">
      <div className="v8-wrap av-lead-in">
        <div className="av-lead-copy">
          <h2 className="v8-h2">Where we lead</h2>
          <p className="v8-lead">Our team helped shape early guidance on drones and advanced air mobility and continues to support its evolution, working directly with transportation agencies and airports to turn strategy into deployable programs.</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="av-lead-photo" src={photo} alt="" loading="lazy" />
        </div>
        <ol className="av-lead-list">
          {WHERE_WE_LEAD.map((w, i) => (
            <li key={w.n} data-reveal style={{ ["--d" as string]: `${i * 60}ms` } as CSSProperties}>
              <span className="av-lead-n" aria-hidden="true">{w.n}</span>
              <div><h3>{w.t}</h3><p>{w.d}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

