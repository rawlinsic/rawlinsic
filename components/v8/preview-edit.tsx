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
import PreviewComments, { askName, changeName, cssPath, savedName } from "@/components/v8/preview-comments";

type Change = { old: string; next: string; nodeOld?: string; nodeNew?: string; context?: string[]; breaks?: string };
type Snap = { full: string; nodes: string[]; context: string[] };
const LEAF = "h1,h2,h3,h4,h5,p,li,blockquote,dt,dd,figcaption,b,strong,em,small,span,a,button,label,td,th";
const clean = (s: string) => s.replace(/\s+/g, " ").trim();
/* the words as written (textContent), not as styled: labels shown in capitals
   are written normally in the code */
const textOf = (el: Node): string => {
  // like textContent, but a line break typed with Enter (or pasted) counts as a new line
  let out = "";
  el.childNodes.forEach((n) => {
    if (n.nodeType === 3) out += n.nodeValue || "";
    else if (n.nodeName === "BR") out += "\n";
    else { if (/^(DIV|P)$/.test(n.nodeName) && out && !out.endsWith("\n")) out += "\n"; out += textOf(n); }
  });
  return out;
};
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
  const change: Change = { old: clean(a), next: clean(b), context: snap.context, breaks: b.includes("\n") ? b.trim() : undefined };
  let at = 0;
  for (const t of snap.nodes) {
    const end = at + t.length;
    if (p >= at && a.length - s <= end) { change.nodeOld = clean(t); change.nodeNew = clean(t.slice(0, p - at) + b.slice(p, b.length - s) + t.slice(a.length - s - at)); break; }
    at = end;
  }
  return change;
};

/* every saved change made from this browser, newest last, so Undo can take it back */
type Done = { sha: string; label: string };
const loadHistory = (): Done[] => { try { return JSON.parse(localStorage.getItem("pe-history") || "[]"); } catch { return []; } };
const saveHistory = (h: Done[]) => { try { localStorage.setItem("pe-history", JSON.stringify(h.slice(-30))); } catch {} };
/* what Undo took back, newest last, so Redo can put it back (Nicole, Nov 12). A new save or delete clears it. */
const loadRedo = (): Done[] => { try { return JSON.parse(localStorage.getItem("pe-redo") || "[]"); } catch { return []; } };
const saveRedo = (h: Done[]) => { try { localStorage.setItem("pe-redo", JSON.stringify(h.slice(-30))); } catch {} };
/* the section a click means: the nearest section, or the page block it sits in */
const sectionOf = (t: Element) => t.closest<HTMLElement>("main section") || t.closest<HTMLElement>(".pnl > *");

/* review: the review version (the branch other people comment on). The tools start open, Comment comes first,
   and the bar shows whose name goes on the comments. */
export default function PreviewEdit({ canDelete = false, review = false }: { canDelete?: boolean; review?: boolean }) {
  const [me, setMe] = useState("");
  useEffect(() => { setMe(savedName()); }, []);
  const [history, setHistory] = useState<Done[]>([]);
  const [redos, setRedos] = useState<Done[]>([]);
  useEffect(() => { setHistory(loadHistory()); setRedos(loadRedo()); }, []);
  const remember = (d: Done) => { const h = [...loadHistory(), d]; saveHistory(h); setHistory(h); saveRedo([]); setRedos([]); };
  const [deleting, setDeleting] = useState(false);
  const [on, setOn] = useState(false);
  const [adding, setAdding] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const [count, setCount] = useState(0);
  const onCount = useCallback((n: number) => setCount(n), []);
  // clean view: hide every review mark (tools, pins, placeholder notes) to see the site as it will look
  const [cleanView, setCleanView] = useState(false);
  // the bar folds into a small tab on the left edge so it's out of the way (remembered per browser)
  const [min, setMin] = useState(true);
  useEffect(() => { try { const v = localStorage.getItem("pe-min"); setMin(v === null ? !review : v !== "0"); } catch {} }, [review]);
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
      const now = textOf(el);
      if (snap && (clean(now) !== clean(snap.full) || now.includes("\n"))) edited.current.add(el); else edited.current.delete(el);
      setChanges(Array.from(edited.current).map((x) => diff(snaps.current.get(x)!, textOf(x))).filter((c) => c.old !== c.next || c.breaks));
    };
    // Enter adds a new line, Esc (or clicking away) finishes; pasting brings in plain words only
    const key = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (!t.classList?.contains("pe-edit")) return;
      if (e.key === "Escape") { e.preventDefault(); t.blur(); }
      else if (e.key === "Enter") { e.preventDefault(); document.execCommand("insertLineBreak"); }
    };
    const paste = (e: ClipboardEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest?.(".pe-edit")) return;
      e.preventDefault();
      const txt = (e.clipboardData?.getData("text/plain") || "").replace(/\r\n?/g, "\n");
      txt.split("\n").forEach((line, i) => { if (i) document.execCommand("insertLineBreak"); if (line) document.execCommand("insertText", false, line); });
    };
    document.addEventListener("paste", paste, true);
    document.addEventListener("click", click, true);
    document.addEventListener("focusout", blur, true);
    document.addEventListener("keydown", key, true);
    return () => {
      document.documentElement.classList.remove("pe-on");
      document.removeEventListener("click", click, true);
      document.removeEventListener("focusout", blur, true);
      document.removeEventListener("keydown", key, true);
      document.removeEventListener("paste", paste, true);
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
      if (j.commit) remember({ sha: j.commit, label: `${j.applied} text change${j.applied === 1 ? "" : "s"}` });
      /* already: wording that's already in the site, so nothing changed (Nov 11) */
      setMsg(!j.applied && !j.pending && j.already ? `Already saved: ${j.already === 1 ? "that wording is" : "those wordings are"} in the site. Nothing changed.` : `Saved ${j.applied} change${j.applied === 1 ? "" : "s"}${j.already ? `, ${j.already} already saved` : ""}${j.pending ? `, ${j.pending} on the list for Claude Code` : ""}. The preview updates in about 2 minutes.`);
    } catch { setMsg("Couldn't reach the server. Nothing was changed."); }
    finally { setBusy(false); }
  };

  const undo = async () => {
    const last = history[history.length - 1]; if (!last) return;
    if (!confirm(`Undo your last saved change (${last.label})?`)) return;
    setBusy(true); setMsg("Undoing…");
    try {
      const r = await fetch("/api/preview-undo", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ sha: last.sha, name: askName() }) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) { setMsg(j.error || "Couldn't undo. Nothing was changed."); if (r.status === 409 || r.status === 400) { const h = loadHistory().slice(0, -1); saveHistory(h); setHistory(h); } return; }
      const h = loadHistory().slice(0, -1); saveHistory(h); setHistory(h);
      if (j.commit) { const r2 = [...loadRedo(), { sha: j.commit as string, label: last.label }]; saveRedo(r2); setRedos(r2); }
      setMsg(`Undone: ${last.label}. Redo puts it back. The preview updates in about 2 minutes.`);
    } catch { setMsg("Couldn't reach the server. Nothing was changed."); }
    finally { setBusy(false); }
  };
  /* Redo: put back the change the last Undo took away (it undoes that Undo) */
  const redo = async () => {
    const last = redos[redos.length - 1]; if (!last) return;
    if (!confirm(`Redo: put back ${last.label}?`)) return;
    setBusy(true); setMsg("Redoing…");
    try {
      const r = await fetch("/api/preview-undo", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ sha: last.sha, name: askName(), redo: true }) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) { setMsg(j.error || "Couldn't redo. Nothing was changed."); if (r.status === 409 || r.status === 400) { const r2 = loadRedo().slice(0, -1); saveRedo(r2); setRedos(r2); } return; }
      const r2 = loadRedo().slice(0, -1); saveRedo(r2); setRedos(r2);
      if (j.commit) { const h = [...loadHistory(), { sha: j.commit as string, label: last.label }]; saveHistory(h); setHistory(h); }
      setMsg(`Redone: ${last.label}. The preview updates in about 2 minutes.`);
    } catch { setMsg("Couldn't reach the server. Nothing was changed."); }
    finally { setBusy(false); }
  };

  // delete mode (Nicole only): the next click picks a section to delete
  useEffect(() => {
    if (!deleting) return;
    document.documentElement.classList.add("pe-deleting");
    let hl: HTMLElement | null = null;
    const over = (e: MouseEvent) => { const t = e.target as HTMLElement; if (t.closest(".pe-bar")) return; const sec = sectionOf(t); if (sec !== hl) { hl?.classList.remove("pe-del-hl"); hl = sec; hl?.classList.add("pe-del-hl"); } };
    const click = async (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest(".pe-bar")) return;
      e.preventDefault(); e.stopPropagation();
      const sec = sectionOf(t); if (!sec) return;
      const heading = (sec.querySelector("h1, h2, h3")?.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80);
      if (!confirm(`Delete this section${heading ? `: “${heading}”` : ""}?\n\nIt comes off this version right away. Undo puts it back.`)) return;
      const name = askName(); if (!name) return;
      setBusy(true); setMsg("Deleting…");
      try {
        const r = await fetch("/api/preview-sections", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ page: location.pathname.replace(/\/$/, "") || "/", sel: cssPath(sec), heading, name }) });
        const j = await r.json().catch(() => ({}));
        if (!r.ok) { setMsg(j.error || "Couldn't delete it. Nothing was changed."); return; }
        sec.style.display = "none";
        remember({ sha: j.commit, label: `deleted section${heading ? ` “${heading.slice(0, 40)}”` : ""}` });
        setMsg("Deleted. Undo puts it back. The preview updates in about 2 minutes."); setDeleting(false);
      } catch { setMsg("Couldn't reach the server. Nothing was changed."); }
      finally { setBusy(false); }
    };
    document.addEventListener("mouseover", over, true);
    document.addEventListener("click", click, true);
    return () => { hl?.classList.remove("pe-del-hl"); document.documentElement.classList.remove("pe-deleting"); document.removeEventListener("mouseover", over, true); document.removeEventListener("click", click, true); };
  }, [deleting]); // eslint-disable-line react-hooks/exhaustive-deps

  const tab = (label: string, open: () => void) => (
    <button type="button" className="pe-tab" onClick={open} aria-label={label} title={label}>
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M4 17.5V20h2.5L17.8 8.7l-2.5-2.5L4 17.5zM19.7 6.8a1 1 0 0 0 0-1.4l-1.1-1.1a1 1 0 0 0-1.4 0l-1 1 2.5 2.5 1-1z" fill="currentColor" /></svg>
      <span>Review</span>{count > 0 && <b>{count}</b>}
    </button>
  );
  if (cleanView) return tab("Show the review tools", () => { setCleanView(false); fold(false); });
  if (min && !on && !adding && !deleting) return (
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
        ) : deleting ? (
          <>
            <span className="pe-n">Click the section to delete</span>
            <button type="button" className="pe-btn pe-ghost" onClick={() => setDeleting(false)}>Cancel</button>
          </>
        ) : adding ? (
          <>
            <span className="pe-n">Click the spot you want to comment on</span>
            <button type="button" className="pe-btn pe-ghost" onClick={() => setAdding(false)}>Cancel</button>
          </>
        ) : (
          <>
            {review
              ? <>
                  <button type="button" className="pe-btn" onClick={() => { const n = askName(); if (!n) return; setMe(n); setAdding(true); setMsg(""); }}>Comment</button>
                  <button type="button" className="pe-btn pe-ghost" onClick={() => { setOn(true); setMsg("Click any words to change them. Enter adds a new line. Esc or click away to finish."); }}>Edit text</button>
                </>
              : <>
                  <button type="button" className="pe-btn" onClick={() => { setOn(true); setMsg("Click any words to change them. Enter adds a new line. Esc or click away to finish."); }}>Edit text</button>
                  <button type="button" className="pe-btn" onClick={() => { setAdding(true); setMsg(""); }}>Comment</button>
                </>}
            {history.length > 0 && <button type="button" className="pe-btn pe-ghost" disabled={busy} onClick={undo} title={`Undo: ${history[history.length - 1].label}`}>Undo</button>}
            {redos.length > 0 && <button type="button" className="pe-btn pe-ghost" disabled={busy} onClick={redo} title={`Redo: ${redos[redos.length - 1].label}`}>Redo</button>}
            {canDelete && <button type="button" className="pe-btn pe-ghost pe-danger" onClick={() => { setDeleting(true); setMsg(""); }}>Delete section</button>}
            <button type="button" className={`pe-btn pe-ghost${listOpen ? " is-on" : ""}`} onClick={() => setListOpen((v) => !v)}>Comments ({count})</button>
            <button type="button" className="pe-btn pe-ghost" onClick={() => { setCleanView(true); setListOpen(false); }} title="Hide the tools, comment pins, and placeholder notes">Clean view</button>
            <button type="button" className="pe-btn pe-ghost pe-fold" onClick={() => { fold(true); setListOpen(false); setMsg(""); }} aria-label="Hide the review tools" title="Hide the review tools">
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </>
        )}
        {/* whose name goes on comments and changes from this browser */}
        {!on && !deleting && !adding && (
          <p className="pe-who">{me ? <>Commenting as <b>{me}</b></> : "Your name goes on your comments"} <button type="button" onClick={() => setMe(changeName())}>{me ? "Change" : "Add your name"}</button></p>
        )}
        {msg && <p className="pe-msg" aria-live="polite">{msg}</p>}
      </div>
    </>
  );
}
