"use client";
/* Edit text on the preview (never on the live site: app/layout.tsx renders
   this only when VERCEL_ENV is "preview"). Click "Edit text", click any words
   on the page, type, and hit Save. Save sends old and new wording to
   /api/preview-edit, which finds the old wording in the site's files and
   commits the change to the branch this preview was built from. Anything it
   can't place goes on EDITS-PENDING.md in the repo for Claude Code. */
import { useEffect, useRef, useState } from "react";

type Change = { old: string; next: string };
const LEAF = "h1,h2,h3,h4,h5,p,li,blockquote,dt,dd,figcaption,b,strong,em,small,span,a,button,label,td,th";
const clean = (s: string) => s.replace(/\s+/g, " ").trim();

export default function PreviewEdit() {
  const [on, setOn] = useState(false);
  const [changes, setChanges] = useState<Change[]>([]);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const orig = useRef(new WeakMap<HTMLElement, string>());
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
      if (!el || !clean(el.innerText || "")) return;
      if (!orig.current.has(el)) orig.current.set(el, clean(el.innerText));
      el.contentEditable = "true";
      el.classList.add("pe-edit");
      el.focus();
    };
    const blur = (e: FocusEvent) => {
      const el = e.target as HTMLElement;
      if (!el.classList?.contains("pe-edit")) return;
      const was = orig.current.get(el) ?? "", now = clean(el.innerText || "");
      if (now !== was) edited.current.add(el); else edited.current.delete(el);
      setChanges(Array.from(edited.current).map((x) => ({ old: orig.current.get(x) ?? "", next: clean(x.innerText || "") })).filter((c) => c.old !== c.next));
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
    // a name (not a password) so each change shows who made it; asked once, remembered here
    let name = "";
    try { name = localStorage.getItem("pe-name") || ""; } catch {}
    if (!name) {
      name = (prompt("Your name (it goes on your changes so we know who made them)") || "").trim();
      if (!name) return;
      try { localStorage.setItem("pe-name", name); } catch {}
    }
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

  return (
    <div className="pe-bar" role="region" aria-label="Edit text (preview only)">
      {!on ? (
        <button type="button" className="pe-btn" onClick={() => { setOn(true); setMsg("Click any words to change them. Enter or click away to finish one."); }}>Edit text</button>
      ) : (
        <>
          <span className="pe-n">{changes.length} change{changes.length === 1 ? "" : "s"}</span>
          <button type="button" className="pe-btn pe-save" disabled={!changes.length || busy} onClick={save}>Save</button>
          <button type="button" className="pe-btn pe-ghost" onClick={stop}>Done</button>
        </>
      )}
      {msg && <p className="pe-msg" aria-live="polite">{msg}</p>}
    </div>
  );
}
