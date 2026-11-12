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
const byPath = (sel: string) => { try { return sel ? document.querySelector<HTMLElement>(sel) : null; } catch { return null; } };
/* A comment never drops off the page (Nicole, Nov 12: "some of my comments were gone, don't delete them").
   Its spot is found three ways, in order:
     1. the saved path, if the element there still starts with the same words
     2. the element on the page whose words start most like the comment's saved words (a rebuilt page moves
        things, so the path goes stale while the words are still there)
     3. neither: the pin is parked at the right edge of the window, marked "its spot changed" */
const words = (s: string) => s.replace(/\s+/g, " ").trim();
const sameStart = (a: string, b: string) => { let i = 0; const n = Math.min(a.length, b.length); while (i < n && a[i] === b[i]) i++; return i; };
const byWords = (snippet: string): HTMLElement | null => {
  const key = words(snippet).slice(0, 80);
  if (key.length < 10) return null;
  let best: HTMLElement | null = null, score = 0, size = Infinity;
  document.querySelectorAll<HTMLElement>("main :is(h1,h2,h3,h4,p,li,a,button,figcaption,blockquote,section,header,nav,div,span,b), body > header :is(a,nav,div), footer :is(p,a,nav,div)").forEach((el) => {
    if (el.closest(".pe-bar, .pc-pop, .pc-list") || !el.getClientRects().length) return;
    const t = words(el.textContent || "");
    if (!t) return;
    const s = sameStart(key, t.slice(0, 80));
    if (s > score || (s === score && s > 0 && t.length < size)) { best = el; score = s; size = t.length; }
  });
  /* enough of the same opening words to be sure: most of a short snippet, or a good run of a long one */
  return best && score >= Math.min(key.length, 18) ? best : null;
};
/* A comment placed on an item inside one of the header's menus (Paul, Nov 12: he put 17 comments on menu
   items and thought they were erased). Those items are only on screen while the menu is open, and the menu
   is the same on every page, so such a comment:
     - shows on every page, not only the page it was made on
     - sits on its item while the menu is open
     - while the menu is closed, is counted in a number on the menu's name; a click on the number opens the menu */
const menuOf = (sel: string) => /^#hx-m-(\w+)/.exec(sel)?.[1] ?? null;
const menuButton = (m: string) => { const b = document.getElementById(`hx-b-${m}`); return b && b.getClientRects().length ? b : null; };
const find = (sel: string, snippet = ""): HTMLElement | null => {
  const el = byPath(sel);
  if (el && el.getClientRects().length) {
    const key = words(snippet).slice(0, 40);
    if (!key || sameStart(key, words(el.textContent || el.getAttribute("alt") || "").slice(0, 40)) >= Math.min(key.length, 12)) return el;
  }
  return byWords(snippet) || null;
};
const when = (iso: string) => { try { return new Date(iso).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }); } catch { return ""; } };
/* the name saved in this browser, and a way to change it */
export const savedName = () => { try { return localStorage.getItem("pe-name") || ""; } catch { return ""; } };
export const changeName = () => {
  const name = (prompt("Your name (it goes on your comments and changes so we know who made them)", savedName()) || "").trim();
  if (name) try { localStorage.setItem("pe-name", name); } catch {}
  return name || savedName();
};
/* two letters for a comment's pin, from the person's name */
const initials = (who: string) => (who.trim().split(/\s+/).slice(0, 2).map((w) => w[0] || "").join("") || "?").toUpperCase();
export const askName = () => {
  let name = "";
  try { name = localStorage.getItem("pe-name") || ""; } catch {}
  if (!name) { name = (prompt("Your name (it goes on your changes and comments so we know who made them)") || "").trim(); if (name) try { localStorage.setItem("pe-name", name); } catch {} }
  return name;
};

export default function PreviewComments({ adding, onAdded, listOpen, onCount, hidden, onSaved, onDone, refresh }: { adding: boolean; onAdded: () => void; listOpen: boolean; onCount: (n: number) => void; hidden: boolean; /* a comment was saved / marked done (so Undo can take it back) */ onSaved?: (id: number, text: string) => void; onDone?: (id: number, text: string) => void; /* the bar undid or redid a comment: n counts the changes, id is the comment, open is whether it should now show */ refresh?: { n: number; id: number; open: boolean } }) {
  const [list, setList] = useState<C[]>([]);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [text, setText] = useState("");
  const [openId, setOpenId] = useState<number | null>(null);
  const [msg, setMsg] = useState("");
  const [, tick] = useState(0);
  const page = typeof window === "undefined" ? "/" : window.location.pathname;
  const box = useRef<HTMLTextAreaElement>(null);
  /* where each comment sits, remembered so the page isn't searched on every scroll frame; a comment with no
     spot is looked for again every couple of seconds (pages finish drawing late, menus open, cards turn) */
  const seen = useRef(new Map<number, { el: HTMLElement | null; t: number }>());
  const locate = (c: C) => {
    if (menuOf(c.sel)) { const el = byPath(c.sel); return el && el.getClientRects().length ? el : null; }
    const hit = seen.current.get(c.id), now = Date.now();
    if (hit && (hit.el ? hit.el.isConnected && hit.el.getClientRects().length > 0 : now - hit.t < 2000)) return hit.el;
    const el = find(c.sel, c.snippet);
    seen.current.set(c.id, { el, t: now });
    return el;
  };

  /* What this browser just changed (added, marked done, undone, redone). The saved list takes a little while
     to catch up after a change, so for a minute and a half these win over it: a comment just taken off doesn't
     pop back, and one just added or brought back doesn't drop out. */
  const mine = useRef(new Map<number, { open: boolean; c?: C; t: number }>());
  /* kept for this tab too, so going to another page and back (or reloading) within that time shows the same */
  const keep = () => { try { sessionStorage.setItem("pc-mine", JSON.stringify(Array.from(mine.current))); } catch {} };
  useEffect(() => { try { const raw = sessionStorage.getItem("pc-mine"); if (raw) (JSON.parse(raw) as [number, { open: boolean; c?: C; t: number }][]).forEach(([id, v]) => { if (!mine.current.has(id)) mine.current.set(id, v); }); } catch {} }, []);
  const settle = useCallback((items: C[]) => {
    const now = Date.now();
    let out = items;
    mine.current.forEach((v, id) => {
      if (now - v.t > 90000) { mine.current.delete(id); return; }
      if (!v.open) out = out.filter((c) => c.id !== id);
      else if (v.c && (v.c.page === page || menuOf(v.c.sel)) && !out.some((c) => c.id === id)) out = [...out, v.c];
    });
    return [...out].sort((a, b) => a.at.localeCompare(b.at));
  }, [page]);
  const load = useCallback(async () => {
    /* every open comment, then this page's plus the ones on menu items (those belong to every page) */
    try { const r = await fetch("/api/preview-comments"); const j = await r.json(); if (r.ok) setList(settle(((j.comments || []) as C[]).filter((c) => c.page === page || menuOf(c.sel)))); else setMsg(j.error || ""); } catch {}
  }, [page, settle]);
  useEffect(() => { load(); }, [load]);
  /* Undo or Redo of a comment from the bar: show the result at once */
  useEffect(() => {
    if (!refresh) return;
    const { id, open } = refresh;
    setList((l) => {
      const had = mine.current.get(id)?.c ?? l.find((c) => c.id === id);
      mine.current.set(id, { open, c: had, t: Date.now() }); keep();
      return settle(l);
    });
    if (open) { const t = window.setTimeout(load, 4000); return () => window.clearTimeout(t); } // in case this browser never had its words
  }, [refresh?.n]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { onCount(list.length); }, [list, onCount]);

  // keep pins on their spots as the page scrolls, slides, and resizes
  useEffect(() => {
    let raf = 0;
    const on = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; tick((n) => n + 1); }); };
    window.addEventListener("scroll", on, { passive: true }); window.addEventListener("resize", on);
    const t = setInterval(on, 1000);
    /* a menu opening or closing moves its comments between the menu's name and its items */
    const head = document.querySelector("header.hx");
    const mo = head ? new MutationObserver(on) : null;
    if (head && mo) mo.observe(head, { attributes: true, subtree: true, attributeFilter: ["hidden", "aria-expanded"] });
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); clearInterval(t); cancelAnimationFrame(raf); mo?.disconnect(); };
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
      mine.current.set(j.comment.id, { open: true, c: j.comment, t: Date.now() }); keep();
      setList((l) => [...l, j.comment]); setDraft(null); setText(""); setMsg(""); onAdded(); onSaved?.(j.comment.id, j.comment.text);
    } catch { setMsg("Couldn't reach the server. The comment wasn't saved."); }
  };
  const done = async (id: number) => {
    try { const r = await fetch("/api/preview-comments", { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ id }) }); if (r.ok) { const was = list.find((c) => c.id === id); mine.current.set(id, { open: false, c: was, t: Date.now() }); keep(); setList((l) => l.filter((c) => c.id !== id)); setOpenId(null); onDone?.(id, was?.text || ""); } } catch {}
  };
  const spot = (c: C) => {
    const el = locate(c); if (!el) return null;
    const r = el.getBoundingClientRect();
    if (!r.width && !r.height) return null;
    /* keep the pin inside the element even if it is now a different size */
    return { x: r.left + Math.min(1, Math.max(0, c.rx)) * r.width, y: r.top + Math.min(1, Math.max(0, c.ry)) * Math.min(r.height, 600) };
  };
  const show = (c: C) => {
    const m = menuOf(c.sel);
    if (m) { if (!locate(c)) menuButton(m)?.click(); window.setTimeout(() => setOpenId(c.id), 150); return; }
    const el = locate(c); el?.scrollIntoView({ block: "center", behavior: "smooth" }); setOpenId(c.id);
  };

  if (hidden) return null;
  const vw = typeof window === "undefined" ? 1400 : window.innerWidth;
  /* comments inside a menu that is closed right now, by menu (only where the menu's name is on screen: on a
     phone the menus are a different list, so there those comments park at the edge like any other) */
  const inMenu = new Map<string, C[]>();
  list.forEach((c) => { const m = menuOf(c.sel); if (m && !spot(c) && menuButton(m)) inMenu.set(m, [...(inMenu.get(m) || []), c]); });
  const tucked = new Set(Array.from(inMenu.values()).flat().map((c) => c.id));
  const lost = list.filter((c) => !spot(c) && !tucked.has(c.id)).map((c) => c.id);
  const vh = typeof window === "undefined" ? 800 : window.innerHeight;
  const over = typeof document === "undefined" ? null : document.querySelector<HTMLElement>("header.hx .hx-panel:not([hidden])")?.getBoundingClientRect() ?? null;
  const rows = Math.max(4, Math.floor((vh - 240) / 42)); // parked pins per column
  return (
    <>
      {list.map((c, i) => {
        /* no spot on the page any more: the pin is parked down the right edge, so the comment is still there to read */
        if (tucked.has(c.id)) return null; // counted on its menu's name until the menu opens
        const at = spot(c), parked = !at, k = lost.indexOf(c.id);
        /* an open menu covers part of the page: a page comment's pin under it would look like it is on a menu item */
        if (at && over && !menuOf(c.sel) && openId !== c.id && at.x >= over.left && at.x <= over.right && at.y >= over.top && at.y <= over.bottom) return null;
        const p = at ?? { x: vw - 30 - Math.floor(k / rows) * 42, y: 150 + (k % rows) * 42 };
        const open = openId === c.id;
        return (
          <div key={c.id}>
            {/* the pin shows who it's from (their initials); the name shows on hover and in the note */}
            <button type="button" className={`pc-pin${open ? " is-open" : ""}${parked ? " is-parked" : ""}`} style={{ left: p.x, top: p.y }} onClick={() => setOpenId(open ? null : c.id)} aria-label={`Comment ${i + 1} from ${c.who}${parked ? " (its spot on the page changed)" : ""}`} title={`${c.who}: ${c.text.slice(0, 80)}`}>{initials(c.who)}</button>
            {open && (
              <div className="pc-pop" style={{ left: Math.max(12, Math.min(p.x + 18, vw - 340)), top: p.y + 10 }}>
                <p className="pc-meta"><b>{c.who}</b> · {when(c.at)}</p>
                {parked && <p className="pc-meta">Its spot on the page changed.{c.snippet ? ` It was about “${c.snippet.slice(0, 60)}${c.snippet.length > 60 ? "…" : ""}”.` : ""}</p>}
                <p className="pc-text">{c.text}</p>
                <div className="pc-act"><button type="button" className="pe-btn" onClick={() => done(c.id)}>Mark done</button><button type="button" className="pe-btn pe-ghost" onClick={() => setOpenId(null)}>Close</button></div>
              </div>
            )}
          </div>
        );
      })}
      {/* a number on a menu's name: how many comments are on items inside it; a click opens the menu */}
      {Array.from(inMenu.entries()).map(([m, cs]) => {
        const b = menuButton(m); if (!b) return null;
        const r = b.getBoundingClientRect();
        const who = Array.from(new Set(cs.map((c) => c.who))).join(", ");
        return <button key={`menu-${m}`} type="button" className="pc-pin pc-menu" style={{ left: r.right - 8, top: r.top - 6 }} onClick={() => b.click()} aria-label={`${cs.length} comment${cs.length === 1 ? "" : "s"} inside the ${b.textContent} menu, from ${who}. Open the menu.`} title={`${cs.length} comment${cs.length === 1 ? "" : "s"} inside this menu (${who}). Click to open it.`}>{cs.length}</button>;
      })}
      {draft && (
        <div className="pc-pop pc-new" style={{ left: Math.min(draft.x + 12, vw - 340), top: draft.y + 12 }}>
          <p className="pc-meta"><b>New comment{savedName() ? ` from ${savedName()}` : ""}</b>{draft.snippet ? ` on “${draft.snippet.slice(0, 40)}${draft.snippet.length > 40 ? "…" : ""}”` : ""}</p>
          <textarea ref={box} value={text} onChange={(e) => setText(e.target.value)} rows={4} placeholder="What should change here?" onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) save(); }} />
          <div className="pc-act"><button type="button" className="pe-btn" disabled={!text.trim()} onClick={save}>Save comment</button><button type="button" className="pe-btn pe-ghost" onClick={() => { setDraft(null); onAdded(); }}>Cancel</button></div>
          {msg && <p className="pc-meta">{msg}</p>}
        </div>
      )}
      {listOpen && (
        <div className="pc-list" role="region" aria-label="Comments on this page">
          <p className="pc-meta"><b>{list.length ? `${list.length} open comment${list.length === 1 ? "" : "s"} on this page` : "No open comments on this page"}</b></p>
          <ol>{list.map((c, i) => <li key={c.id}><button type="button" onClick={() => show(c)}><span className="pc-n">{i + 1}</span><span><b>{c.who}</b> · {when(c.at)}<br />{c.text.length > 140 ? `${c.text.slice(0, 140)}…` : c.text}{!locate(c) && <em> (its spot changed; it's about “{c.snippet.slice(0, 40)}”)</em>}</span></button></li>)}</ol>
        </div>
      )}
    </>
  );
}
