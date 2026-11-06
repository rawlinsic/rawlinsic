"use client";
/* The moving strip of our people beside the Why Rawlins card. Two columns
   drift opposite ways; hover or keyboard focus pauses them. Selecting a
   person opens their profile in a pop-up right here (the same window as
   Our people). Each card is still a real link to Our people, so a new-tab
   click or no JavaScript goes there instead. */
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ProfileBody, holdPage, type Person } from "@/components/site/people";

export default function PeopleStrip({ people }: { people: Person[] }) {
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
      <div className="wc-people" role="region" aria-label="Some of our people. Hover to pause; select a person to read their bio." data-paused={open ? "" : undefined}>
        {[0, 1].map((col) => {
          const list = people.filter((_, i) => i % 2 === col);
          return (
            <ul key={col} className={`wc-col${col ? " wc-col-down" : ""}`}>
              {[...list, ...list].map((p, i) => {
                const copy = i >= list.length;
                return (
                  <li key={`${p.slug}-${i}`} className="wc-p" aria-hidden={copy || undefined}>
                    <a href={`/about/our-people#${p.slug}`} tabIndex={copy ? -1 : undefined} onClick={(e) => pick(e, p)} aria-haspopup="dialog">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.photo} alt="" loading="lazy" />
                      <span><b>{p.name}</b><em>{p.formerly ?? p.role}</em></span>
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
            <ProfileBody p={open} />
            <p className="pp-more"><a href="/about/our-people">Meet everyone on our team</a></p>
          </div>
        )}
      </dialog>
    </>
  );
}
