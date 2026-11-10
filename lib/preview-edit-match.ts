/* Where a wording on the page lives in the site's source files (the preview
   text editor: app/api/preview-edit/route.ts). Plain TypeScript so it can be
   tested on its own.
   For each edit it tries, in order: the exact piece of text that changed
   (one text node, so a link inside the sentence doesn't matter), then the
   whole element's text. Each is tried as written, without a trailing period
   the page adds, and without quote marks the page adds. If the same wording
   is in several places, the text around it on the page (the element's
   neighbors and section heading) picks the one that sits next to the same
   words in the code. */

export type Change = { old: string; next: string; nodeOld?: string; nodeNew?: string; context?: string[] };
export type Hit = { path: string; index: number; match: string };

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/* the wording as it may be written in code: any run of spaces or line breaks,
   and apostrophes or quotes written plain, curly, as entities, or escaped */
export const pattern = (s: string) =>
  new RegExp(
    (/^\w/.test(s.trim()) ? "(?<![A-Za-z0-9_])" : "") +
    s.trim().split(/\s+/).map((w) =>
      esc(w).replace(/&/g, "(?:&|&amp;)").replace(/['’]/g, "(?:'|’|&apos;|&#x27;|&rsquo;|\\\\')").replace(/["“”]/g, '(?:"|“|”|&quot;|\\\\")'),
    ).join("\\s+") +
    (/\w$/.test(s.trim()) ? "(?![A-Za-z0-9_])" : ""),
    "g",
  );

/* code comments, so wording that only appears in a comment isn't counted */
const comments = (src: string) => Array.from(src.matchAll(/\/\*[\s\S]*?\*\/|(?<=^|\s)\/\/[^\n]*/g)).map((m) => [m.index ?? 0, (m.index ?? 0) + m[0].length]);
const inComment = (spans: number[][], i: number) => spans.some(([a, b]) => i >= a && i < b);

export function findHits(files: Map<string, string>, text: string): Hit[] {
  const t = text.trim();
  if (t.length < 2) return [];
  const re = pattern(t), hits: Hit[] = [];
  for (const [path, src] of Array.from(files.entries())) {
    const cs = comments(src);
    for (const m of Array.from(src.matchAll(re))) if (!inComment(cs, m.index ?? 0)) hits.push({ path, index: m.index ?? 0, match: m[0] });
  }
  return hits;
}

/* is this hit the whole string or the whole piece of JSX text (a label), not
   part of a longer sentence? */
function isWhole(src: string, h: Hit): boolean {
  let a = h.index - 1; while (a >= 0 && /[ \t]/.test(src[a])) a--;
  let b = h.index + h.match.length; while (b < src.length && /[ \t]/.test(src[b])) b++;
  const before = src[a] ?? "", after = src[b] ?? "";
  if (/["'`]/.test(before) && after === before) return true; // "Label"
  if (/[>}\n]/.test(before) && /[<{\n]/.test(after)) return true; // >Label<
  return false;
}

/* the same edit, as the page may have changed it from the code */
function variants(o: string, n: string): [string, string][] {
  const out: [string, string][] = [[o, n]];
  const unq = (s: string) => s.trim().replace(/^[“"]\s*/, "").replace(/\s*[”"]$/, "");
  const unp = (s: string) => s.trim().replace(/[.!?]$/, "");
  if (unq(o) !== o.trim()) out.push([unq(o), unq(n)]);
  if (unp(o) !== o.trim()) out.push([unp(o), unp(n)]);
  if (unp(unq(o)) !== o.trim() && unp(unq(o)) !== unq(o) && unp(unq(o)) !== unp(o)) out.push([unp(unq(o)), unp(unq(n))]);
  return out;
}

/* how many of the page's nearby words sit close to this spot in the code */
function score(files: Map<string, string>, hit: Hit, context: string[]): number {
  const src = files.get(hit.path) ?? "";
  const near = src.slice(Math.max(0, hit.index - 2500), hit.index + 2500);
  let s = 0;
  for (const c of context) {
    const t = c.trim();
    if (t.length < 4) continue;
    try { if (pattern(t).test(near)) s += 2; else if (pattern(t).test(src)) s += 1; } catch { /* odd text, skip */ }
  }
  return s;
}

export function place(files: Map<string, string>, c: Change): { hits: Hit[]; next: string } | { why: string } {
  const tries: [string, string][] = [];
  if (c.nodeOld && c.nodeNew !== undefined && c.nodeOld.trim() && c.nodeOld.trim() !== c.old.trim()) tries.push([c.nodeOld, c.nodeNew]);
  tries.push([c.old, c.next]);
  let many = 0;
  for (const [o, n] of tries) {
    for (const [vo, vn] of variants(o, n)) {
      const hits = findHits(files, vo);
      if (hits.length === 1) return { hits, next: vn.trim() };
      if (hits.length > 1) {
        many = Math.max(many, hits.length);
        // a label (the element's whole text) kept as the same string in several
        // files, like a service name in the menu and on its page: rename every copy
        const whole = hits.filter((h) => isWhole(files.get(h.path) ?? "", h));
        if (o === c.old && whole.length) return { hits: whole, next: vn.trim() };
        // otherwise the words around it on the page pick the right spot
        const ranked = hits.map((h) => ({ h, s: score(files, h, c.context || []) })).sort((a, b) => b.s - a.s);
        if (ranked[0].s > 0 && ranked[0].s > ranked[1].s) return { hits: [ranked[0].h], next: vn.trim() };
      }
    }
  }
  return { why: many ? `the same wording is in ${many} places and the page around it didn't say which` : "not found in the files as written (it may be put together from pieces)" };
}

/* write the new wording the way the old one was written in that spot */
export function writeAll(src: string, hits: Hit[], next: string): string {
  return hits.slice().sort((a, b) => b.index - a.index).reduce((acc, h) => writeAs(acc, h, next), src);
}
export function writeAs(src: string, hit: Hit, next: string): string {
  let out = next;
  if (/&apos;|&#x27;/.test(hit.match)) out = out.replace(/'/g, "&apos;");
  else if (hit.match.includes("’") && !hit.match.includes("'")) out = out.replace(/'/g, "’");
  // typed straight double quotes become curly ones, which are safe in any string
  out = out.replace(/"([^"]*)"/g, "“$1”").replace(/"/g, "”");
  const line = src.slice(src.lastIndexOf("\n", hit.index) + 1, hit.index);
  const q = (line.match(/['"`][^'"`]*$/) || [""])[0][0];
  if (q === "'") out = out.replace(/'/g, "’");
  return src.slice(0, hit.index) + out + src.slice(hit.index + hit.match.length);
}
