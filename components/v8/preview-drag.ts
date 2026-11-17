"use client";
/* Moving the review bar and the comments list (Nicole, Nov 16: so they aren't stuck over the bottom of the page).
   Drag either by its handle, or use the arrow keys on the handle. Each stays where it was put, in this browser, from
   page to page (localStorage), and is kept fully on screen when the window changes size. "Reset position" on the bar
   puts both back. On phones the bar doesn't move freely: it sits at the top or the bottom (see preview-edit.tsx). */
import { useCallback, useEffect, useState, type CSSProperties, type KeyboardEvent, type PointerEvent, type RefObject } from "react";

type Pos = { x: number; y: number };
const RESET = "pe-reset-position";
const read = (key: string): Pos | null => { try { const v = JSON.parse(localStorage.getItem(key) || "null"); return v && Number.isFinite(v.x) && Number.isFinite(v.y) ? v : null; } catch { return null; } };
const write = (key: string, p: Pos | null) => { try { if (p) localStorage.setItem(key, JSON.stringify({ x: Math.round(p.x), y: Math.round(p.y) })); else localStorage.removeItem(key); } catch {} };

/* "Reset position": both the bar and the list go back to where they start */
export const resetPositions = () => { window.dispatchEvent(new Event(RESET)); };

/* shown: whether the box is on the page now (it is checked again when it appears) */
export function useDraggable(key: string, ref: RefObject<HTMLElement | null>, enabled = true, shown = true) {
  const [pos, setPos] = useState<Pos | null>(null);
  useEffect(() => { setPos(read(key)); }, [key]);
  /* fully on screen: an 8px margin on every side (a box bigger than the window keeps its top left corner showing) */
  const fit = useCallback((p: Pos): Pos => {
    const el = ref.current; if (!el) return p;
    const r = el.getBoundingClientRect(), m = 8;
    return { x: Math.max(m, Math.min(p.x, window.innerWidth - r.width - m)), y: Math.max(m, Math.min(p.y, window.innerHeight - r.height - m)) };
  }, [ref]);
  useEffect(() => {
    const back = () => { write(key, null); setPos(null); };
    window.addEventListener(RESET, back);
    return () => window.removeEventListener(RESET, back);
  }, [key]);
  // keep it on screen when the window or the box changes size
  const placed = enabled && !!pos;
  useEffect(() => {
    if (!placed || !shown) return;
    const on = () => setPos((p) => { if (!p) return p; const f = fit(p); return f.x === p.x && f.y === p.y ? p : f; });
    on();
    window.addEventListener("resize", on);
    window.visualViewport?.addEventListener("resize", on);
    const ro = typeof ResizeObserver !== "undefined" && ref.current ? new ResizeObserver(on) : null;
    if (ro && ref.current) ro.observe(ref.current);
    return () => { window.removeEventListener("resize", on); window.visualViewport?.removeEventListener("resize", on); ro?.disconnect(); };
  }, [placed, shown, fit, ref]);

  const onPointerDown = useCallback((e: PointerEvent<HTMLElement>) => {
    if (!enabled || e.button !== 0 || !ref.current) return;
    e.preventDefault();
    const r = ref.current.getBoundingClientRect();
    const dx = e.clientX - r.left, dy = e.clientY - r.top;
    const handle = e.currentTarget;
    handle.setPointerCapture?.(e.pointerId);
    document.documentElement.classList.add("pe-dragging");
    let last: Pos = { x: r.left, y: r.top };
    const move = (ev: globalThis.PointerEvent) => { last = fit({ x: ev.clientX - dx, y: ev.clientY - dy }); setPos(last); };
    const up = () => {
      handle.removeEventListener("pointermove", move); handle.removeEventListener("pointerup", up); handle.removeEventListener("pointercancel", up);
      document.documentElement.classList.remove("pe-dragging");
      write(key, last);
    };
    handle.addEventListener("pointermove", move); handle.addEventListener("pointerup", up); handle.addEventListener("pointercancel", up);
  }, [enabled, fit, key, ref]);
  /* the arrow keys on the handle move it too (Shift for bigger steps) */
  const onKeyDown = useCallback((e: KeyboardEvent<HTMLElement>) => {
    const d = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[e.key];
    if (!enabled || !d || !ref.current) return;
    e.preventDefault();
    const r = ref.current.getBoundingClientRect(), step = e.shiftKey ? 80 : 20;
    const p = fit({ x: r.left + d[0] * step, y: r.top + d[1] * step });
    setPos(p); write(key, p);
  }, [enabled, fit, key, ref]);

  const style: CSSProperties | undefined = placed && pos ? { left: pos.x, top: pos.y, right: "auto", bottom: "auto", transform: "none" } : undefined;
  return { style, moved: placed, handle: { onPointerDown, onKeyDown } };
}
