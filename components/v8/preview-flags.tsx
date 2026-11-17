"use client";
/* Flags beside edited text, on the review version (Nicole, Nov 16). Every piece of text on the page that differs from
   its original, by an Edit text save, gets a small flag at its end. Click it: the original wording, then each change
   oldest first (who, when in Pacific, their wording), the wording on the page now marked "Now", and a save the editor
   garbled followed by its fix. The same words in more than one place (the home page and the footer) are flagged in
   each place. The story comes from the record of changes (lib/edit-record.ts, /api/preview-record). Shown with the
   review bar (components/v8/preview-edit.tsx), which has the switch; off in Clean view. */
import { useEffect, useRef, useState } from "react";
import { movedPath } from "@/lib/moved-pages";
import { core, pacific, type Chain } from "@/lib/edit-record";
import { canSee } from "@/components/v8/preview-seen";

const LEAF = "h1,h2,h3,h4,h5,p,li,blockquote,dt,dd,figcaption,b,strong,em,small,span,a,button,label,td,th";
const TOOLS = ".pe-bar, .pe-tab, .pc-list, .pc-pop, .pc-pin, .pf-flag, .chg-page";
/* the words as the editor reads them (components/v8/preview-edit.tsx): a line break counts as a space */
const textOf = (el: Node): string => {
  let out = "";
  el.childNodes.forEach((n) => {
    if (n.nodeType === 3) out += n.nodeValue || "";
    else if (n.nodeName === "BR") out += "\n";
    else if (n.nodeType === 1) { if (/^(DIV|P)$/.test(n.nodeName) && out && !out.endsWith("\n")) out += "\n"; out += textOf(n); }
  });
  return out;
};
/* where the flag goes: just after the last line of the element's words */
const endOf = (el: HTMLElement) => {
  if (!el.isConnected) return null;
  const r = document.createRange(); r.selectNodeContents(el);
  const rs = r.getClientRects();
  const last = rs.length ? rs[rs.length - 1] : el.getBoundingClientRect();
  if (!last.width && !last.height) return null;
  const p = { x: last.right, y: last.top + last.height / 2 };
  return canSee(el, p.x - 3, p.y) ? p : null; // only while those words can be seen (components/v8/preview-seen.ts)
};
const latest = (c: Chain) => Date.parse(c.steps[c.steps.length - 1]?.at ?? "") || 0;
type Spot = { el: HTMLElement; chain: number };

export default function PreviewFlags() {
  const [list, setList] = useState<Chain[]>([]);
  const [spots, setSpots] = useState<Spot[]>([]);
  const [openAt, setOpenAt] = useState<HTMLElement | null>(null);
  const [, tick] = useState(0);
  const pop = useRef<HTMLDivElement>(null);
  useEffect(() => { fetch("/api/preview-record").then((r) => r.json()).then((j) => setList(j.chains || [])).catch(() => {}); }, []);

  /* find the edited text on this page, and again every few seconds (pages finish drawing late, menus open, cards turn) */
  useEffect(() => {
    if (!list.length) return;
    const page = movedPath(location.pathname.replace(/\/+$/, "") || "/");
    const byText = new Map<string, number[]>();
    list.forEach((c, i) => { const k = core(c.now); if (k) byText.set(k, [...(byText.get(k) || []), i]); });
    const scan = () => {
      const hits = new Map<HTMLElement, number[]>();
      document.querySelectorAll<HTMLElement>(LEAF).forEach((el) => {
        if (el.closest(TOOLS) || el.closest(".pf-pop")) return;
        const ids = byText.get(core(textOf(el)));
        if (!ids) return;
        /* short words ("Contact us") are common: flagged on the page they were changed on, and in the header and footer */
        const ok = ids.filter((i) => core(list[i].now).length >= 24 || list[i].pages.includes(page) || !!el.closest("header.hx, footer"));
        if (ok.length) hits.set(el, ok);
      });
      const found: Spot[] = [];
      hits.forEach((ids, el) => {
        /* an element and the one inside it with the same words: the flag goes on the inner one */
        for (const other of Array.from(hits.keys())) if (other !== el && el.contains(other)) return;
        found.push({ el, chain: ids.reduce((a, b) => (latest(list[b]) > latest(list[a]) ? b : a)) });
      });
      setSpots((prev) => (prev.length === found.length && prev.every((s, k) => s.el === found[k].el && s.chain === found[k].chain) ? prev : found));
    };
    scan();
    const t = window.setInterval(scan, 2500);
    return () => window.clearInterval(t);
  }, [list]);

  // keep the flags on their words as the page scrolls, slides, and resizes
  useEffect(() => {
    let raf = 0;
    const on = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; tick((n) => n + 1); }); };
    window.addEventListener("scroll", on, { passive: true }); window.addEventListener("resize", on);
    const t = window.setInterval(on, 1000);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); window.clearInterval(t); cancelAnimationFrame(raf); };
  }, []);
  // Esc or a click elsewhere closes the panel
  useEffect(() => {
    if (!openAt) return;
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") setOpenAt(null); };
    const click = (e: MouseEvent) => { const t = e.target as HTMLElement; if (!t.closest(".pf-pop, .pf-flag")) setOpenAt(null); };
    document.addEventListener("keydown", key); document.addEventListener("mousedown", click);
    return () => { document.removeEventListener("keydown", key); document.removeEventListener("mousedown", click); };
  }, [openAt]);

  if (typeof window === "undefined" || !spots.length) return null;
  const vw = window.innerWidth, vh = window.innerHeight;
  const open = spots.find((s) => s.el === openAt);
  return (
    <>
      {spots.map((s, k) => {
        const p = endOf(s.el);
        if (!p || p.y < -20 || p.y > vh + 20) return null;
        const c = list[s.chain], last = c.steps[c.steps.length - 1];
        return (
          <button key={k} type="button" className={`pf-flag${s.el === openAt ? " is-open" : ""}`} style={{ left: Math.min(p.x + 4, vw - 26), top: p.y }}
            onClick={() => setOpenAt(s.el === openAt ? null : s.el)}
            aria-label={`Changed text: last changed by ${last.who}, ${pacific(last.at)} Pacific. Show the original and each change.`} title={`Changed by ${Array.from(new Set(c.steps.map((x) => x.who))).join(", ")}`}>
            <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true"><path d="M5 21V4h11l-1.6 3.5L16 11H7v10H5z" fill="currentColor" /></svg>
          </button>
        );
      })}
      {open && (() => {
        const p = endOf(open.el) ?? { x: vw / 2, y: vh / 2 };
        const c = list[open.chain];
        /* opens on the side of the flag with more room, and never past the window's edge */
        const below = vh - p.y >= p.y;
        const room = Math.max(160, (below ? vh - p.y : p.y) - 28);
        return (
          <div ref={pop} className="pc-pop pf-pop" role="dialog" aria-label="Changes to this text" style={{ left: Math.max(12, Math.min(p.x - 150, vw - 372)), maxHeight: Math.min(room, 560), ...(below ? { top: p.y + 16 } : { bottom: vh - p.y + 16 }) }}>
            <ol className="pf-steps">
              <li><p className="pf-who"><b>Original</b></p><p className="pf-text">{c.original || <em>(no words)</em>}</p></li>
              {c.steps.map((s, k) => {
                const now = k === c.steps.length - 1;
                return (
                  <li key={k} className={now ? "is-now" : undefined}>
                    <p className="pf-who">
                      {s.kind === "fix" && <span className="pf-tag">Fix</span>}
                      {s.kind === "undo" && <span className="pf-tag">Undo</span>}
                      {s.kind === "redo" && <span className="pf-tag">Redo</span>}
                      <b>{s.who}</b> · {pacific(s.at)} PT
                      {now && <span className="pf-now">Now</span>}
                    </p>
                    <p className="pf-text">{s.text || <em>(taken out)</em>}</p>
                    {s.landed && <p className="pf-note">The editor garbled this save. It came out as “{s.landed}”.</p>}
                    {s.breaks && <p className="pf-note">Line breaks changed.</p>}
                    {s.fromList && <p className="pf-note">Placed by Claude Code from the list of edits it couldn’t place itself.</p>}
                  </li>
                );
              })}
            </ol>
            <div className="pc-act"><a className="pe-btn pe-ghost" href="/review/changes">All changes</a><button type="button" className="pe-btn pe-ghost" onClick={() => setOpenAt(null)}>Close</button></div>
          </div>
        );
      })()}
    </>
  );
}
