"use client";
/* A moving strip of our people. Two lanes drift opposite ways: up and down
   beside the Why Rawlins card, or sideways (across) in "We've done the job".
   Hover or keyboard focus pauses them. Cards show the Rawlins title and
   location. Selecting a
   person opens their profile in a pop-up right here (the same window as
   Our people). Each card is still a real link to Our people, so a new-tab
   click or no JavaScript goes there instead. */
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { Pin, ProfileBody, holdPage, type Person } from "@/components/site/people";

export default function PeopleStrip({ people, across = false, showDev = false, lanes = 2 }: { people: Person[]; across?: boolean; showDev?: boolean; lanes?: number }) {
  const [open, setOpen] = useState<Person | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);
  const byPointer = useRef(false); // closed with the mouse: let the strip move again

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
    if (!open && byPointer.current) {
      byPointer.current = false;
      requestAnimationFrame(() => (document.activeElement as HTMLElement | null)?.blur());
    }
    holdPage(!!open);
  }, [open]);
  const shut = (pointer: boolean) => { byPointer.current = pointer; setOpen(null); };

  const pick = (e: MouseEvent<HTMLAnchorElement>, p: Person) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    setOpen(p);
  };

  return (
    <>
      <div className={`wc-people${across ? " ps-across" : ""}${lanes !== 2 ? " ps-lanes" : ""}`} style={lanes !== 2 ? ({ ["--lanes" as string]: lanes } as CSSProperties) : undefined} role="region" aria-label="Some of our people. Hover to pause; select a person to read their bio." data-paused={open ? "" : undefined}>
        {Array.from({ length: lanes }, (_, col) => col).map((col) => {
          const pick = people.filter((_, i) => i % lanes === col);
          /* a lane that moves down shows its first few, then brings in the end of its list from the top; so the
             rest go in reverse, and people still appear in the order given (Nicole, Nov 10: lanes up and down) */
          const list = !across && lanes !== 2 && col % 2 ? [...pick.slice(0, 3), ...pick.slice(3).reverse()] : pick;
          const base = list.length ? Array.from({ length: Math.ceil(4 / list.length) }, () => list).flat() : []; // a short lane repeats so it never runs out
          const lane = across ? `ps-row${col % 2 ? " ps-row-rev" : ""}` : `wc-col${col % 2 ? " wc-col-down" : ""}`;
          return (
            <ul key={col} className={lane}>
              {[...base, ...base].map((p, i) => {
                const copy = i >= list.length;
                return (
                  <li key={`${p.slug}-${i}`} className="wc-p" aria-hidden={copy || undefined}>
                    <a href={`/about/our-people#${p.slug}`} tabIndex={copy ? -1 : undefined} onClick={(e) => pick(e, p)} aria-haspopup="dialog">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.photo} alt="" loading="lazy" />
                      <span><b>{p.name}</b><em>{p.role}</em>{p.location && <small className="wc-loc"><Pin />{p.location}</small>}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          );
        })}
      </div>
      <dialog ref={dlg} className="pp-dialog" data-lenis-prevent onClose={() => setOpen(null)} onClick={(e) => { if (e.target === dlg.current) shut(true); }} aria-labelledby="pp-name">
        {open && (
          <div className="pp-dialog-in">
            <button type="button" className="pp-close" onClick={(e) => shut(e.detail > 0)} aria-label="Close profile">×</button>
            <ProfileBody p={open} showDev={showDev} />
            <p className="pp-more"><a href="/about/our-people">Meet everyone on our team</a></p>
          </div>
        )}
      </dialog>
    </>
  );
}
