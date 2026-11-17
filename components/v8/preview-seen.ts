"use client";
/* Whether a spot on the page can be seen right now: used by the flags beside edited text (preview-flags.tsx) and the
   comment pins (preview-comments.tsx), so each shows only on its own spot, and only while that spot shows (Nicole, Nov 16:
   "i only want them to show in the spots they are so it's not confusing"). Not seen:
     - faded out or hidden (a story step not reached yet, a hidden copy of the words)
     - cut off by a box around it (a card slid out of a carousel, a pane scrolled out of its box)
     - scrolled up under the site's header */

/* for browsers without checkVisibility: the element or one around it is see-through or hidden */
const faded = (el: HTMLElement) => { for (let n: HTMLElement | null = el; n; n = n.parentElement) { const s = getComputedStyle(n); if (s.opacity === "0" || s.visibility === "hidden") return true; } return false; };
/* the boxes around an element that cut off what spills out of them (worked out once per element) */
const clipMemo = new WeakMap<HTMLElement, HTMLElement[]>();
const clippers = (el: HTMLElement) => {
  let out = clipMemo.get(el);
  if (out) return out;
  out = [];
  for (let n = el.parentElement; n && n !== document.body; n = n.parentElement) {
    const s = getComputedStyle(n);
    if (s.overflowX !== "visible" || s.overflowY !== "visible") out.push(n);
  }
  clipMemo.set(el, out);
  return out;
};

export function canSee(el: HTMLElement, x: number, y: number): boolean {
  if (!el.isConnected) return false;
  const vis = (el as HTMLElement & { checkVisibility?: (o: object) => boolean }).checkVisibility;
  if (vis ? !vis.call(el, { opacityProperty: true, visibilityProperty: true }) : faded(el)) return false;
  for (const box of clippers(el)) {
    const r = box.getBoundingClientRect();
    if (x < r.left - 1 || x > r.right + 1 || y < r.top - 1 || y > r.bottom + 1) return false;
  }
  if (!el.closest("header.hx")) {
    const head = document.querySelector<HTMLElement>("header.hx")?.getBoundingClientRect().bottom ?? 0;
    if (y < head) return false;
  }
  return true;
}
