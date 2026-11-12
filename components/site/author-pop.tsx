"use client";
/* An author's photo and name that open their bio right on the page (Nicole, Nov 11: "April's photo/bio should
   pop up ... and stay on that page, not go to the team page"). Pointing at it (or tabbing to it) shows a small
   card with the photo, title, and the start of the bio; a click opens the full bio in the same window the team
   sections use. Nothing here leaves the page. The card is drawn on the page body so no section can clip it. */
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { ProfileBody, holdPage, type Person } from "@/components/site/people";

/* the first sentences of the bio, up to about `max` characters */
const start = (text: string, max = 250) => {
  const first = text.split(/\n\s*\n/)[0].replace(/\s+/g, " ").trim();
  if (first.length <= max) return first;
  const cut = first.slice(0, max);
  const end = cut.lastIndexOf(". ");
  return end > 90 ? cut.slice(0, end + 1) : `${cut.slice(0, cut.lastIndexOf(" "))}…`;
};

export default function AuthorPop({ person, children, className }: { person: Person; children: ReactNode; className?: string }) {
  const [card, setCard] = useState<{ left: number; top: number; up: boolean } | null>(null);
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const dlg = useRef<HTMLDialogElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const hasBio = person.background.trim() !== "" && person.background.trim() !== "Coming soon!";

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
    holdPage(open);
  }, [open]);

  const show = useCallback(() => {
    window.clearTimeout(timer.current);
    const r = btn.current?.getBoundingClientRect();
    if (!r) return;
    const w = Math.min(400, window.innerWidth - 24);
    const up = r.bottom + 290 > window.innerHeight && r.top > 300; // not enough room below: open above
    setCard({ left: Math.max(12, Math.min(r.left, window.innerWidth - w - 12)), top: up ? r.top - 10 : r.bottom + 10, up });
  }, []);
  const hide = useCallback(() => { window.clearTimeout(timer.current); timer.current = window.setTimeout(() => setCard(null), 160); }, []);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  /* the card goes away when the page scrolls or Escape is pressed */
  useEffect(() => {
    if (!card) return;
    const off = () => setCard(null);
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") setCard(null); };
    window.addEventListener("scroll", off, { passive: true });
    document.addEventListener("keydown", key);
    return () => { window.removeEventListener("scroll", off); document.removeEventListener("keydown", key); };
  }, [card]);
  const full = () => { window.clearTimeout(timer.current); setCard(null); setOpen(true); };

  return (
    <>
      <button ref={btn} type="button" className={`apop${className ? ` ${className}` : ""}`} aria-haspopup="dialog" aria-label={`${person.name}: read bio`}
        onClick={full} onPointerEnter={(e) => { if (e.pointerType === "mouse") show(); }} onPointerLeave={hide}
        onFocus={() => { if (btn.current?.matches(":focus-visible")) show(); }} onBlur={hide}>
        {children}
      </button>
      {card && !open && createPortal(
        <div className={`apop-card${card.up ? " is-up" : ""}`} style={{ left: card.left, top: card.top }} role="presentation"
          onPointerEnter={() => window.clearTimeout(timer.current)} onPointerLeave={hide} onClick={full}>
          <span className="apop-top">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={person.photo} alt="" width={84} height={84} />
            <span><b>{person.name}</b><em>{person.role}</em>{person.formerly && <i>{person.formerly}</i>}</span>
          </span>
          {hasBio && <span className="apop-bio">{start(person.background)}</span>}
          <span className="apop-more">Read full bio</span>
        </div>,
        document.body,
      )}
      <dialog ref={dlg} className="pp-dialog" data-lenis-prevent onClose={() => setOpen(false)} onClick={(e) => { if (e.target === dlg.current) setOpen(false); }} aria-labelledby="pp-name">
        {open && (
          <div className="pp-dialog-in">
            <button type="button" className="pp-close" onClick={() => setOpen(false)} aria-label="Close profile">×</button>
            <ProfileBody p={person} />
          </div>
        )}
      </dialog>
    </>
  );
}
