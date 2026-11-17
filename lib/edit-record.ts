/* The record of every Edit text save on the review version (Nicole, Nov 16): who changed which words, when (Pacific),
   on which page, where the text lives in the code, and the wording before and after. Kept in lib/edit-record.json,
   one line per change. Filled once from the history of Edit text saves, and added to by every save
   (app/api/preview-edit/route.ts), Undo and Redo (app/api/preview-undo/route.ts), in the same commit as the change.
   The flags beside edited text (components/v8/preview-flags.tsx) and the all-changes page (/review/changes) read it.
   A save the editor garbled is followed by its own "fix" line, the correction Claude Code made by hand.
   When Claude Code places a change from EDITS-PENDING.md by hand, its line here goes from "list" to "applied". */

export type RecordEntry = {
  id: string; // the save: the same for every change in one save (backfilled ones: the commit's first 10 characters)
  at: string; // ISO time
  who: string;
  kind: "edit" | "fix" | "undo" | "redo";
  page: string;
  files: string[]; // where the text lives
  before: string;
  after: string;
  /* saved: placed by the editor; list: went to EDITS-PENDING.md for Claude Code; applied: from the list, placed by
     Claude Code later; breaks: the same words with line breaks added or taken out */
  status: "saved" | "list" | "applied" | "breaks";
  landed?: string; // what the editor actually wrote, where it garbled the save
  of?: string; // undo and redo: the save it takes back or puts back
};
export type Record_ = { entries: RecordEntry[] };

export const RECORD_PATH = "lib/edit-record.json";
/* one change a line, so each save adds a few lines to the file */
export const recordText = (entries: RecordEntry[]) => `{"entries": [\n${entries.map((e) => JSON.stringify(e)).join(",\n")}\n]}\n`;
export const parseRecord = (txt: string | null | undefined): RecordEntry[] => {
  try { const j = JSON.parse(txt || "") as Record_; return Array.isArray(j.entries) ? j.entries : []; } catch { return []; }
};
export const newSaveId = () => `s${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

const norm = (s: string) => s.replace(/\s+/g, " ").trim();

/* date and time in Pacific, e.g. "Nov 14, 2:57 PM" */
export const pacific = (iso: string, year = false) => {
  try { return new Date(iso).toLocaleString("en-US", { timeZone: "America/Los_Angeles", month: "short", day: "numeric", ...(year ? { year: "numeric" } : {}), hour: "numeric", minute: "2-digit" }); } catch { return iso; }
};

/* One piece of text's story: the original wording, then each change to it, oldest first. The last one is on the page now. */
export type Step = { who: string; at: string; kind: RecordEntry["kind"]; text: string; breaks?: boolean; landed?: string; fromList?: boolean };
export type Chain = { original: string; now: string; pages: string[]; steps: Step[] };

/* the words to compare: a numbered list item may be saved with its number ("07 ...") or without, and with the
   "For review" tag on the end or without, depending on where the person clicked */
export const core = (s: string) => norm(s).replace(/^\d{1,2}\s+/, "").replace(/\s*For review$/, "").trim();

export function chains(entries: RecordEntry[]): Chain[] {
  const out: Chain[] = [];
  const sorted = [...entries].sort((a, b) => a.at.localeCompare(b.at));
  for (const e of sorted) {
    if (e.status === "list") continue; // never placed: not on the page
    const b = core(e.before), a = core(e.after), shown = e.landed ?? e.after;
    let c: Chain | undefined;
    for (let i = out.length - 1; i >= 0 && !c; i--) if (core(out[i].now) === b) c = out[i];
    /* the same save made twice (or the same change saved from the item and from its sentence): nothing new */
    if (!c && a !== b && out.some((x) => core(x.now) === a)) continue;
    const step: Step = { who: e.who, at: e.at, kind: e.kind, text: e.after, ...(a === b || e.status === "breaks" ? { breaks: true } : {}), ...(e.landed ? { landed: e.landed } : {}), ...(e.status === "applied" ? { fromList: true } : {}) };
    if (c) {
      const last = c.steps[c.steps.length - 1];
      if (last && a === b && core(last.text) === a && last.breaks) continue; // the same line breaks saved twice
      c.steps.push(step); c.now = shown;
      if (!c.pages.includes(e.page)) c.pages.push(e.page);
    } else out.push({ original: e.before, now: shown, pages: [e.page], steps: [step] });
  }
  /* only text that is different from its original now (or whose line breaks were changed last), and still has words */
  return out.filter((c) => core(c.now) && (core(c.now) !== core(c.original) || !!c.steps[c.steps.length - 1].breaks));
}

/* Undo or Redo of a save: each of its lines turned around */
export function reversed(entries: RecordEntry[], of: string, id: string, who: string, kind: "undo" | "redo", at = new Date().toISOString()): RecordEntry[] {
  return entries.filter((e) => e.id === of && e.status !== "list" && e.status !== "applied").map((e) => ({ id, at, who, kind, page: e.page, files: e.files, before: e.landed ?? e.after, after: e.before, status: e.status === "breaks" ? "breaks" as const : "saved" as const, of }));
}
