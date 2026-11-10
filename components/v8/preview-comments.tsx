"use client";
/* Comments on the preview (shown with the Edit text bar, preview builds only).
   "Comment", then click any spot on the page and type a note. Notes show as
   numbered pins where they were left, for everyone looking at this preview;
   click a pin to read it or mark it done. "Comments" lists every open note on
   the page. Stored encrypted by /api/preview-comments; Claude Code reads them
   from there and marks them done when they're handled. */
import { useCallback, useEffect, useRef, useState } from "react";

type C = { id: number; page: string; sel: string; rx: number; ry: number; snippet: string; text: string; who: string; at: string };
type Draft = { x: number; y: number; sel: string; rx: number; ry: number; snippet: string };

/* a path to the element that still finds it after the page reloads */
export const cssPath = (el: Element): string => {
  const parts: string[] = [];
  for (let e: Element | null = el; e && e !== document.body && parts.length < 14; e = e.parentElement) {
    if (e.id && /^[A-Za-z][\w-]*$/.test(e.id)) { parts.unshift(`#${e.id}`); break; }
    const tag = e.tagName.toLowerCase(), p = e.parentElement;
    const same = p ? Array.from(p.children).filter((x) => x.tagName === e!.tagName) : [];
    parts.unshift(same.length > 1 ? `${tag}:nth-of-type(${same.indexOf(e) + 1})` : tag);
  }
  return parts.join(" > ");
};
const find = (sel: string) => { try { return sel ? document.querySelector<HTMLElement>(sel) : null; } catch { return null; } };
const when = (iso: string) => { try { return new Date(iso).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }); } catch { return ""; } };
export const askName = () => {
  let name = "";
  try { name = localStorage.getItem("pe-name") || ""; } catch {}
  if (!name) { name = (prompt("Your name (it goes on your changes and comments so we know who made them)") || "").trim(); if (name) try { localStorage.setItem("pe-name", name); } catch {} }
  return name;
};

export default function PreviewComments({ adding, onAdded, listOpen, onCount, hidden }: { adding: boolean; onAdded: () => void; listOpen: boolean; onCount: (n: number) => void; hidden: boolean }) {
  const [list, setList] = useState<C[]>([]);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [text, setText] = useState("");
  const [openId, setOpenId] = useState<number | null>(null);
  const [msg, setMsg] = useState("");
  const [, tick] = useState(0);
  const page = typeof window === "undefined" ? "/" : window.location.pathname;
  const box = useRef<HTMLTextAreaElement>(null);

  const load = useCallback(async () => {
    try { const r = await fetch(`/api/preview-comments?page=${encodeURIComponent(page)}`); const j = await r.json(); if (r.ok) setList(j.comments || []); else setMsg(j.error || ""); } catch {}
  }, [page]);
  useEffect(() => { load(); }, [load]);
  useEffect(() => { onCount(list.length); }, [list, onCount]);

  // keep pins on their spots as the page scrolls, slides, and resizes
  useEffect(() => {
    let raf = 0;
    const on = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; tick((n) => n + 1); }); };
    window.addEventListener("scroll", on, { passive: true }); window.addEventListener("resize", on);
    const t = setInterval(on, 1000);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); clearInterval(t); cancelAnimationFrame(raf); };
  }, []);

  // comment mode: the next click on the page places a note there
  useEffect(() => {
    if (!adding) return;
    document.documentElement.classList.add("pc-adding");
    const click = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest(".pe-bar, .pc-pin, .pc-pop, .pc-list")) return;
      e.preventDefault(); e.stopPropagation();
      const el = t.closest<HTMLElement>("h1,h2,h3,h4,p,li,a,button,img,figure,blockquote,span,b,em,section,div") || t;
      const r = el.getBoundingClientRect();
      setDraft({ x: e.clientX, y: e.clientY, sel: cssPath(el), rx: r.width ? (e.clientX - r.left) / r.width : 0, ry: r.height ? (e.clientY - r.top) / r.height : 0, snippet: (el.textContent || el.getAttribute("alt") || "").replace(/\s+/g, " ").trim().slice(0, 120) });
      setText(""); setTimeout(() => box.current?.focus(), 30);
    };
    document.addEventListener("click", click, true);
    return () => { document.documentElement.classList.remove("pc-adding"); document.removeEventListener("click", click, true); };
  }, [adding]);

  const save = async () => {
    if (!draft || !text.trim()) return;
    const name = askName(); if (!name) return;
    setMsg("Saving…");
    try {
      const r = await fetch("/api/preview-comments", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ page, ...draft, text, name }) });
      const j = await r.json();
      if (!r.ok) { setMsg(j.error || "Couldn't save the comment."); return; }
      setList((l) => [...l, j.comment]); setDraft(null); setText(""); setMsg(""); onAdded();
    } catch { setMsg("Couldn't reach the server. The comment wasn't saved."); }
  };
  const done = async (id: number) => {
    try { const r = await fetch("/api/preview-comments", { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ id }) }); if (r.ok) { setList((l) => l.filter((c) => c.id !== id)); setOpenId(null); } } catch {}
  };
  const spot = (c: C) => {
    const el = find(c.sel); if (!el) return null;
    const r = el.getBoundingClientRect();
    if (!r.width && !r.height) return null;
    return { x: r.left + c.rx * r.width, y: r.top + c.ry * r.height };
  };
  const show = (c: C) => { const el = find(c.sel); el?.scrollIntoView({ block: "center", behavior: "smooth" }); setOpenId(c.id); };

  if (hidden) return null;
  const vw = typeof window === "undefined" ? 1400 : window.innerWidth;
  return (
    <>
      {list.map((c, i) => {
        const p = spot(c); if (!p) return null;
        const open = openId === c.id;
        return (
          <div key={c.id}>
            <button type="button" className={`pc-pin${open ? " is-open" : ""}`} style={{ left: p.x, top: p.y }} onClick={() => setOpenId(open ? null : c.id)} aria-label={`Comment ${i + 1} from ${c.who}`}>{i + 1}</button>
            {open && (
              <div className="pc-pop" style={{ left: Math.min(p.x + 18, vw - 340), top: p.y + 10 }}>
                <p className="pc-meta"><b>{c.who}</b> · {when(c.at)}</p>
                <p className="pc-text">{c.text}</p>
                <div className="pc-act"><button type="button" className="pe-btn" onClick={() => done(c.id)}>Mark done</button><button type="button" className="pe-btn pe-ghost" onClick={() => setOpenId(null)}>Close</button></div>
              </div>
            )}
          </div>
        );
      })}
      {draft && (
        <div className="pc-pop pc-new" style={{ left: Math.min(draft.x + 12, vw - 340), top: draft.y + 12 }}>
          <p className="pc-meta"><b>New comment</b>{draft.snippet ? ` on “${draft.snippet.slice(0, 40)}${draft.snippet.length > 40 ? "…" : ""}”` : ""}</p>
          <textarea ref={box} value={text} onChange={(e) => setText(e.target.value)} rows={4} placeholder="What should change here?" onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) save(); }} />
          <div className="pc-act"><button type="button" className="pe-btn" disabled={!text.trim()} onClick={save}>Save comment</button><button type="button" className="pe-btn pe-ghost" onClick={() => { setDraft(null); onAdded(); }}>Cancel</button></div>
          {msg && <p className="pc-meta">{msg}</p>}
        </div>
      )}
      {listOpen && (
        <div className="pc-list" role="region" aria-label="Comments on this page">
          <p className="pc-meta"><b>{list.length ? `${list.length} open comment${list.length === 1 ? "" : "s"} on this page` : "No open comments on this page"}</b></p>
          <ol>{list.map((c, i) => <li key={c.id}><button type="button" onClick={() => show(c)}><span className="pc-n">{i + 1}</span><span><b>{c.who}</b> · {when(c.at)}<br />{c.text.length > 140 ? `${c.text.slice(0, 140)}…` : c.text}{!find(c.sel) && <em> (its spot changed; it's about “{c.snippet.slice(0, 40)}”)</em>}</span></button></li>)}</ol>
        </div>
      )}
    </>
  );
}
