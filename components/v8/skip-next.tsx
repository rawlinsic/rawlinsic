"use client";
/* "Skip to the next section": for sections that hold while you scroll
   through their steps, so people can move on whenever they want. */
import { docTop, pinnedOffset } from "@/components/v8/panels";
import { glideTo } from "@/components/v8/smooth";

export default function SkipNext({ className }: { className?: string }) {
  const go = (e: React.MouseEvent<HTMLButtonElement>) => {
    let sec = e.currentTarget.closest<HTMLElement>(".pnl > *");
    let next = sec?.nextElementSibling as HTMLElement | null;
    while (next && next.matches(".sn, [data-nopanel]")) next = next.nextElementSibling as HTMLElement | null;
    if (!next) return;
    glideTo(Math.max(0, docTop(next) - pinnedOffset() + 1));
    sec = null;
  };
  return (
    <button type="button" className={`skip${className ? ` ${className}` : ""}`} onClick={go}>
      Skip to the next section
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
    </button>
  );
}
