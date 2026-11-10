"use client";
/* Edit text on the preview (never on the live site: app/layout.tsx renders
   this only when VERCEL_ENV is "preview"). Click "Edit text", click any words
   on the page, type, and hit Save. Save sends old and new wording to
   /api/preview-edit, which finds the old wording in the site's files and
   commits the change to the branch this preview was built from. It sends the
   exact piece of text that changed and the words around it, so the right spot
   is found even when a sentence has a link in it or a wording repeats. Anything it
   can't place goes on EDITS-PENDING.md in the repo for Claude Code. */
import { useCallback, useEffect, useRef, useState } from "react";
import PreviewComments, { askName } from "@/components/v8/preview-comments";

type Change = { old: string; next: string; nodeOld?: string; nodeNew?: string; context?: string[] };
type Snap = { full: string; nodes: string[]; context: string[] };
const LEAF = "h1,h2,h3,h4,h5,p,li,blockquote,dt,dd,figcaption,b,strong,em,small,span,a,button,label,td,th";
const clean = (s: string) => s.replace(/\s+/g, " ").trim();
/* the words as written (textContent), not as styled: labels shown in capitals
   are written normally in the code */
const textOf = (el: Element) => el.textContent || "";
const textNodes = (el: Element) => { const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); const out: string[] = []; while (w.nextNode()) out.push(w.currentNode.nodeValue || ""); return out; };
/* words near the element on the page: its neighbors and its section heading,
   used to pick the right spot when the same wording is in several places */
const contextOf = (el: HTMLElement) => {
  const out: string[] = [];
  const add = (x: Element | null | undefined) => { const t = x ? clean(textOf(x)).slice(0, 80) : ""; if (t.length >= 6 && !out.includes(t)) out.push(t); };
  add(el.previousElementSibling); add(el.nextElementSibling);
  add(el.parentElement?.previousElementSibling); add(el.parentElement?.nextElementSibling);
  const sec = el.closest("section, header, footer, nav, li");
  add(sec?.querySelector("h1, h2, h3"));
  return out.filter((t) => t !== clean(textOf(el))).slice(0, 6);
};
/* what changed: the one text node it happened in, when the edit stays inside one */
const diff = (snap: Snap, now: string): Change => {
  const a = snap.full, b = now;
  let p = 0; while (p < a.length && p < b.length && a[p] === b[p]) p++;
  let s = 0; while (s < a.length - p && s < b.length - p && a[a.length - 1 - s] === b[b.length - 1 - s]) s++;
  const change: Change = { old: clean(a), next: clean(b), context: snap.context };
  let at = 0;
  for (const t of snap.nodes) {
    const end = at + t.length;
    if (p >= at && a.length - s <= end) { change.nodeOld = clean(t); change.nodeNew = clean(t.slice(0, p - at) + b.slice(p, b.length - s) + t.slice(a.length - s - at)); break; }
    at = end;
  }
  return change;
};

export default function PreviewEdit() {
  const [on, setOn] = useState(false);
  const [adding, setAdding] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const [count, setCount] = useState(0);
  const onCount = useCallback((n: number) => setCount(n), []);
  // clean view: hide every review mark (tools, pins, placeholder notes) to see the site as it will look
  const [cleanView, setCleanView] = useState(false);
  // the bar folds into a small tab on the left edge so it's out of the way (remembered per browser)
  const [min, setMin] = useState(true);
  useEffect(() => { try { setMin(localStorage.getItem("pe-min") !== "0"); } catch {} }, []);
  const fold = (v: boolean) => { setMin(v); try { localStorage.setItem("pe-min", v ? "1" : "0"); } catch {} };
  useEffect(() => { try { setCleanView(localStorage.getItem("pe-clean") === "1"); } catch {} }, []);
  useEffect(() => { document.documentElement.classList.toggle("pe-clean", cleanView); try { localStorage.setItem("pe-clean", cleanView ? "1" : "0"); } catch {} }, [cleanView]);
  const [changes, setChanges] = useState<Change[]>([]);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const snaps = useRef(new WeakMap<HTMLElement, Snap>());
  const edited = useRef(new Set<HTMLElement>());

  // in edit mode: clicks pick words to edit instead of following links
  useEffect(() => {
    if (!on) return;
    document.documentElement.classList.add("pe-on");
    const click = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest(".pe-bar")) return;
      e.preventDefault();
      e.stopPropagation();
      const el = t.closest<HTMLElement>(LEAF);
      if (!el || !clean(textOf(el))) return;
      if (!snaps.current.has(el)) snaps.current.set(el, { full: textOf(el), nodes: textNodes(el), context: contextOf(el) });
      el.contentEditable = "true";
      el.classList.add("pe-edit");
      el.focus();
    };
    const blur = (e: FocusEvent) => {
      const el = e.target as HTMLElement;
      if (!el.classList?.contains("pe-edit")) return;
      const snap = snaps.current.get(el);
      if (snap && clean(textOf(el)) !== clean(snap.full)) edited.current.add(el); else edited.current.delete(el);
      setChanges(Array.from(edited.current).map((x) => diff(snaps.current.get(x)!, textOf(x))).filter((c) => c.old !== c.next));
    };
    const key = (e: KeyboardEvent) => { if (e.key === "Enter" && (e.target as HTMLElement).classList?.contains("pe-edit")) { e.preventDefault(); (e.target as HTMLElement).blur(); } };
    document.addEventListener("click", click, true);
    document.addEventListener("focusout", blur, true);
    document.addEventListener("keydown", key, true);
    return () => {
      document.documentElement.classList.remove("pe-on");
      document.removeEventListener("click", click, true);
      document.removeEventListener("focusout", blur, true);
      document.removeEventListener("keydown", key, true);
    };
  }, [on]);

  const stop = () => { if (changes.length && !confirm("Leave edit mode and drop your unsaved changes?")) return; window.location.reload(); };

  const save = async () => {
    const name = askName(); if (!name) return;
    setBusy(true); setMsg("Saving…");
    try {
      const r = await fetch("/api/preview-edit", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ page: location.pathname, name, changes }) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) { setMsg(j.error || "Couldn't save. Nothing was changed."); return; }
      edited.current.clear(); setChanges([]);
      setMsg(`Saved ${j.applied} change${j.applied === 1 ? "" : "s"}${j.pending ? `, ${j.pending} on the list for Claude Code` : ""}. The preview updates in about 2 minutes.`);
    } catch { setMsg("Couldn't reach the server. Nothing was changed."); }
    finally { setBusy(false); }
  };

  const tab = (label: string, open: () => void) => (
    <button type="button" className="pe-tab" onClick={open} aria-label={label} title={label}>
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M4 17.5V20h2.5L17.8 8.7l-2.5-2.5L4 17.5zM19.7 6.8a1 1 0 0 0 0-1.4l-1.1-1.1a1 1 0 0 0-1.4 0l-1 1 2.5 2.5 1-1z" fill="currentColor" /></svg>
      <span>Review</span>{count > 0 && <b>{count}</b>}
    </button>
  );
  if (cleanView) return tab("Show the review tools", () => { setCleanView(false); fold(false); });
  if (min && !on && !adding) return (
    <>
      <PreviewComments adding={adding} onAdded={() => setAdding(false)} listOpen={false} onCount={onCount} hidden={false} />
      {tab("Open the review tools: edit text, comment", () => fold(false))}
    </>
  );

  return (
    <>
      <PreviewComments adding={adding} onAdded={() => setAdding(false)} listOpen={listOpen} onCount={onCount} hidden={cleanView} />
      <div className="pe-bar" role="region" aria-label="Review tools (preview only)">
        {on ? (
          <>
            <span className="pe-n">{changes.length} change{changes.length === 1 ? "" : "s"}</span>
            <button type="button" className="pe-btn pe-save" disabled={!changes.length || busy} onClick={save}>Save</button>
            <button type="button" className="pe-btn pe-ghost" onClick={stop}>Done</button>
          </>
        ) : adding ? (
          <>
            <span className="pe-n">Click the spot you want to comment on</span>
            <button type="button" className="pe-btn pe-ghost" onClick={() => setAdding(false)}>Cancel</button>
          </>
        ) : (
          <>
            <button type="button" className="pe-btn" onClick={() => { setOn(true); setMsg("Click any words to change them. Enter or click away to finish one."); }}>Edit text</button>
            <button type="button" className="pe-btn" onClick={() => { setAdding(true); setMsg(""); }}>Comment</button>
            <button type="button" className={`pe-btn pe-ghost${listOpen ? " is-on" : ""}`} onClick={() => setListOpen((v) => !v)}>Comments ({count})</button>
            <button type="button" className="pe-btn pe-ghost" onClick={() => { setCleanView(true); setListOpen(false); }} title="Hide the tools, comment pins, and placeholder notes">Clean view</button>
            <button type="button" className="pe-btn pe-ghost pe-fold" onClick={() => { fold(true); setListOpen(false); setMsg(""); }} aria-label="Hide the review tools" title="Hide the review tools">
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </>
        )}
        {msg && <p className="pe-msg" aria-live="polite">{msg}</p>}
      </div>
    </>
  );
}
