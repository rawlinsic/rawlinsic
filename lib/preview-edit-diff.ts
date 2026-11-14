/* The page side of the preview editor: what changed in an element, and in which text node (components/v8/preview-edit.tsx).
   Kept here so it can be tested (__tests__/lib/preview-edit-diff.test.ts). */
export type Change = { old: string; next: string; nodeOld?: string; nodeNew?: string; context?: string[]; breaks?: string };
export type Snap = { full: string; nodes: string[]; context: string[] };
export const clean = (s: string) => s.replace(/\s+/g, " ").trim();

/* what changed: the one text node it happened in, when the edit stays inside one */
export const diff = (snap: Snap, now: string): Change => {
  const a = snap.full, b = now;
  let p = 0; while (p < a.length && p < b.length && a[p] === b[p]) p++;
  let s = 0; while (s < a.length - p && s < b.length - p && a[a.length - 1 - s] === b[b.length - 1 - s]) s++;
  const change: Change = { old: clean(a), next: clean(b), context: snap.context, breaks: b.includes("\n") ? b.trim() : undefined };
  /* `a` has line breaks added between blocks (textOf) that the text nodes don't: map a position in `a` to one in the nodes
     (Nov 14: counting it in `a` put Paul's edit one letter off, "training protational rogram") */
  const joined = snap.nodes.join("");
  const toNode: number[] = [];
  for (let k = 0, j = 0; k <= a.length; k++) { toNode.push(j); if (k < a.length && j < joined.length && a[k] === joined[j]) j++; }
  const pN = toNode[p], eN = toNode[a.length - s];
  let at = 0;
  for (const t of snap.nodes) {
    const end = at + t.length;
    if (pN >= at && eN <= end) { change.nodeOld = clean(t); change.nodeNew = clean(t.slice(0, pN - at) + b.slice(p, b.length - s) + t.slice(eN - at)); break; }
    at = end;
  }
  return change;
};
