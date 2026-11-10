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

export type Change = { old: string; next: string; nodeOld?: string; nodeNew?: string; context?: string[]; breaks?: string };
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
  // quote marks at the start or end of the text are left as they are: match the
  // words inside them, so the code's own string quotes are never mistaken for
  // the page's quote marks
  const edge = /^\s*[“"‘']+|[”"’']+\s*$/g;
  if (edge.test(o)) { edge.lastIndex = 0; o = o.replace(edge, ""); n = n.replace(edge, ""); }
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

export function place(files: Map<string, string>, c: Change, nested = false): { hits: Hit[]; next: string } | { why: string } {
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
        // repeated text changes everywhere (Nicole: "update that text across the
        // board"): every copy of the same label or sentence, and every copy of a
        // phrase of 4+ words; a word or two inside other sentences is left alone
        const whole = hits.filter((h) => isWhole(files.get(h.path) ?? "", h));
        if (vo.trim().split(/\s+/).length >= 4) return { hits, next: vn.trim() };
        if (whole.length) return { hits: whole, next: vn.trim() };
        // otherwise the words around it on the page pick the right spot
        const ranked = hits.map((h) => ({ h, s: score(files, h, c.context || []) })).sort((a, b) => b.s - a.s);
        if (ranked[0].s > 0 && ranked[0].s > ranked[1].s) return { hits: [ranked[0].h], next: vn.trim() };
      }
    }
  }
  // text the page puts together, like `All ${name} projects` or `${n} · ${label}`
  if (!nested) {
    for (const [o, n] of tries) { const t = template(files, o, n, c); if (t) return t; }
    for (const [o, n] of tries) { const t = phrase(files, o, n); if (t) return t; }
  }
  return { why: many ? `the same wording is in ${many} places and the page around it didn't say which` : "not found in the files, even as a template" };
}

const VAR = "(\\$\\{[^`\\n]*?\\}|\\{[^{}<>\\n]*?\\})"; // ${expr} in a template string, or {expr} in JSX
/* split the text into fixed words and up to two filled-in values, and look for a
   template in the code with the same fixed words around ${...} or {...} */
function template(files: Map<string, string>, o: string, n: string, c: Change): { hits: Hit[]; next: string } | null {
  const words = o.trim().split(/\s+/);
  if (words.length < 2 || words.length > 12) return null;
  const tries: number[][] = [];
  for (let a = 0; a < words.length; a++) for (let b = a + 1; b <= words.length; b++) {
    tries.push([a, b]);
    for (let a2 = b + 1; a2 < words.length; a2++) for (let b2 = a2 + 1; b2 <= words.length; b2++) tries.push([a, b, a2, b2]);
  }
  const part = (ws: string[]) => (ws.length ? pattern(ws.join(" ")).source.replace(/^\(\?<!\[A-Za-z0-9_\]\)|\(\?!\[A-Za-z0-9_\]\)$/g, "") : "");
  for (const cut of tries) {
    const segs: { fixed: boolean; ws: string[] }[] = [];
    let at = 0;
    for (let k = 0; k < cut.length; k += 2) { segs.push({ fixed: true, ws: words.slice(at, cut[k]) }); segs.push({ fixed: false, ws: words.slice(cut[k], cut[k + 1]) }); at = cut[k + 1]; }
    segs.push({ fixed: true, ws: words.slice(at) });
    if (!segs.some((g) => g.fixed && g.ws.join("").replace(/[^A-Za-z]/g, "").length >= 2) && !segs.some((g) => g.fixed && /[·|:–,-]/.test(g.ws.join("")))) continue;
    const src = segs.map((g) => (g.fixed ? (g.ws.length ? `(${part(g.ws)})` : "()") : VAR)).join("\\s*");
    let re: RegExp; try { re = new RegExp(src, "g"); } catch { continue; }
    const found: { path: string; m: RegExpMatchArray }[] = [];
    for (const [path, code] of Array.from(files.entries())) for (const m of Array.from(code.matchAll(re))) found.push({ path, m });
    if (!found.length) continue;
    // which piece did the edit touch?
    const a = o.trim(), b = n.trim();
    let p = 0; while (p < a.length && p < b.length && a[p] === b[p]) p++;
    let s2 = 0; while (s2 < a.length - p && s2 < b.length - p && a[a.length - 1 - s2] === b[b.length - 1 - s2]) s2++;
    const pieces = segs.map((g) => g.ws.join(" "));
    let pos = 0; const spans = pieces.map((t, i) => { const st = a.indexOf(t, pos); const r = { i, st, en: st + t.length }; if (st >= 0) pos = st + t.length; return r; });
    const hitSeg = spans.find((r) => r.st >= 0 && p >= r.st && a.length - s2 <= r.en && pieces[r.i]);
    if (!hitSeg) continue;
    const g = segs[hitSeg.i];
    const newPiece = (pieces[hitSeg.i].slice(0, p - hitSeg.st) + b.slice(p, b.length - s2) + pieces[hitSeg.i].slice(a.length - s2 - hitSeg.st)).trim();
    if (!g.fixed) {
      // the edit is in a filled-in value: change that value where it's written
      const inner = place(files, { old: pieces[hitSeg.i], next: newPiece, context: c.context }, true);
      if ("hits" in inner) return inner;
      continue;
    }
    // the edit is in the fixed words: change them in the template, in every copy of it
    const hits: Hit[] = [];
    for (const { path, m } of found) {
      let off = m.index ?? 0;
      for (let k = 0; k < segs.length; k++) {
        const grp = m[k + 1] ?? "";
        const idx = (files.get(path) ?? "").indexOf(grp, off);
        if (k === hitSeg.i) { hits.push({ path, index: idx, match: grp }); break; }
        off = idx + grp.length;
      }
    }
    if (hits.length) return { hits, next: newPiece };
  }
  return null;
}

/* last try: the smallest run of words around the change that is written
   somewhere as it is (a label, or a phrase found once) */
function phrase(files: Map<string, string>, o: string, n: string): { hits: Hit[]; next: string } | null {
  const a = o.trim(), b = n.trim();
  let p = 0; while (p < a.length && p < b.length && a[p] === b[p]) p++;
  let s2 = 0; while (s2 < a.length - p && s2 < b.length - p && a[a.length - 1 - s2] === b[b.length - 1 - s2]) s2++;
  // word edges in the old text
  const starts: number[] = [], ends: number[] = [];
  for (const m of Array.from(a.matchAll(/\S+/g))) { starts.push(m.index ?? 0); ends.push((m.index ?? 0) + m[0].length); }
  const first = starts.findIndex((st, i) => ends[i] >= p);
  let last = ends.findIndex((en) => en >= a.length - s2); if (last < 0) last = ends.length - 1;
  if (first < 0) return null;
  for (let size = last - first + 1; size <= starts.length; size++) {
    for (let i = Math.max(0, last - size + 1); i <= first && i + size <= starts.length; i++) {
      const st = starts[i], en = ends[i + size - 1];
      const piece = a.slice(st, en);
      const next = (piece.slice(0, p - st) + b.slice(p, b.length - s2) + piece.slice(a.length - s2 - st)).trim();
      if (piece.length < 3) continue;
      const hits = findHits(files, piece);
      const whole = hits.filter((h) => isWhole(files.get(h.path) ?? "", h));
      if (whole.length) return { hits: whole, next };
      if (hits.length === 1 && size >= 2) return { hits, next };
      // text the page shortens, like "Louisville" from "Louisville, Kentucky":
      // the piece written at the start of exactly one string, before a comma
      const heads = hits.filter((h) => { const src = files.get(h.path) ?? ""; return /["'`]/.test(src[h.index - 1] ?? "") && /^,\s/.test(src.slice(h.index + h.match.length, h.index + h.match.length + 2)); });
      if (heads.length === 1) return { hits: heads, next };
    }
  }
  return null;
}

/* write the new wording the way the old one was written in that spot */
/* the quote mark that opens the string this text sits in (if any), so a change
   that would swallow or add one, and break the code, is caught before saving */
export const delim = (src: string, i: number) => { const line = src.slice(src.lastIndexOf("\n", i - 1) + 1, i); return (line.match(/['"`][^'"`]*$/) || [""])[0][0] || ""; };
const raw = (x: string, q: string) => (x.replace(/\\./g, "").split(q).length - 1);
export function writeAll(src: string, hits: Hit[], next: string): string | null {
  let out = src;
  for (const h of hits.slice().sort((a, b) => b.index - a.index)) {
    const q = delim(out, h.index);
    const after = writeAs(out, h, next);
    const inserted = after.slice(h.index, h.index + (after.length - out.length) + h.match.length);
    if (q && raw(h.match, q) !== raw(inserted, q)) return null;
    out = after;
  }
  return out;
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

/* A line break (Enter) typed with Edit text, written the right way for where the words live in the code
   (Nicole, Nov 10: everything saves at once, breaks included): JSX text gets <br />, a JSX attribute string
   gets &#10;, a JS string gets \n (shown by the white-space: pre-line rule on text in v8.css). If the break
   can't be matched to the placed words, the words are still saved, on one line. */
const breakFor = (src: string, h: Hit) => {
  const line = src.slice(src.lastIndexOf("\n", h.index - 1) + 1, h.index);
  const q = delim(src, h.index);
  // JSX text: no open quote, or the last thing before the words is a tag's closing ">" (class="x">words)
  const lastQ = Math.max(line.lastIndexOf('"'), line.lastIndexOf("'"), line.lastIndexOf("`"));
  if (!q || line.lastIndexOf(">") > lastQ) return "<br />";
  return /[A-Za-z0-9_-]=$/.test(line.slice(0, line.lastIndexOf(q))) ? "&#10;" : "\\n";
};
const withBreaks = (text: string, lines: string[], token: string): string | null => {
  let out = text, from = 0;
  for (let k = 1; k < lines.length; k++) {
    const i = out.indexOf(" " + lines[k], from);
    if (i < 0) return null;
    out = out.slice(0, i) + token + out.slice(i + 1);
    from = i + token.length;
  }
  return out;
};
export function writeWithBreaks(src: string, hits: Hit[], next: string, lines: string[]): string | null {
  let out: string | null = src;
  for (const h of hits.slice().sort((a, b) => b.index - a.index)) {
    const broken = withBreaks(next, lines, breakFor(out!, h));
    out = (broken !== null ? writeAll(out!, [h], broken) : null) ?? writeAll(out!, [h], next);
    if (out === null) return null;
  }
  return out;
}

/* Text with characters that mean something in code (< > { } ` \\), written so it shows exactly as typed
   (Nicole, Nov 10: every save lands at once): JSX text gets {"..."}, strings get those characters escaped. */
export function writeSpecial(src: string, hits: Hit[], next: string): string | null {
  let out = src;
  for (const h of hits.slice().sort((a, b) => b.index - a.index)) {
    const line = out.slice(out.lastIndexOf("\n", h.index - 1) + 1, h.index);
    const q = delim(out, h.index);
    const lastQ = Math.max(line.lastIndexOf('"'), line.lastIndexOf("'"), line.lastIndexOf("`"));
    let text: string;
    if (!q || line.lastIndexOf(">") > lastQ) text = `{${JSON.stringify(next)}}`; // JSX text
    else if (/[A-Za-z0-9_-]=$/.test(line.slice(0, line.lastIndexOf(q)))) text = next.replace(/[<>{}`\\]/g, (c) => `&#${c.charCodeAt(0)};`); // JSX attribute
    else text = next.replace(/\\/g, "\\\\").replace(q === "`" ? /`|\$\{/g : /(?!)/g, (m) => (m === "`" ? "\\`" : "\\${"));
    out = out.slice(0, h.index) + text + out.slice(h.index + h.match.length);
  }
  return out;
}
