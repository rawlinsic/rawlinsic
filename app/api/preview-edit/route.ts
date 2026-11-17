/* Preview text editor (components/v8/preview-edit.tsx). Preview builds only.
   Takes { page, changes: [{ old, next }] }, finds each old wording in the
   site's source files on this preview's branch, and commits the new wording in
   one commit. A wording that isn't found exactly once (or needs characters that
   aren't safe to drop into code) goes on EDITS-PENDING.md for Claude Code.
   Needs, on Vercel, for Preview only: EDIT_GITHUB_TOKEN (write access to this
   repo). No passcode (Nicole's call): anyone with a preview link can edit that
   preview's branch, never main; every edit is its own commit, so it can be undone.
   Nov 11 (Nicole: "a save can never change code"): edits only land in page text, a save whose wording is
   already in the files changes nothing, and each changed file must read as the same code afterwards
   (lib/preview-edit-safe.ts); anything else goes on EDITS-PENDING.md with the reason.
   Nov 12: the page can be older than the files (a save takes about 2 minutes to show, and a page left open
   keeps its old wording). The page sends the commit it was built from; when its old wording isn't in the
   files, the saves made since that commit say what that wording became, and the edit lands on that. */
import { NextResponse } from "next/server";
import { place, writeAll, writeSpecial, writeWithBreaks, type Change } from "@/lib/preview-edit-match";
import { inText, onlyTextChanged, textSpans } from "@/lib/preview-edit-safe";
import { BACKUP_LOCKED, isBackupVersion } from "@/lib/preview-gh";
import { AREAS, INDUSTRIES, slugify } from "@/lib/content/site";
import { addMove, type MovedList } from "@/lib/moved-pages";
import { RECORD_PATH, core, newSaveId, parseRecord, recordText, type RecordEntry } from "@/lib/edit-record";

/* names that make a page's address (services and sub-sectors): renaming one moves the page, so the save also
   records the move in lib/moved-pages.json, which redirects the old address and keeps its comments showing (Nov 12) */
const ADDRESS_NAMES = new Set([...AREAS.flatMap((a) => a.services), ...INDUSTRIES.flatMap((i) => i.subsectors)].filter((x) => x.slug === slugify(x.name)).map((x) => x.name));

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GH = "https://api.github.com";
const SEARCH = /^(lib\/.*\.ts|components\/.*\.tsx?|app\/.*\.tsx?)$/;
const SKIP = /^(components\/home\/|components\/menu\/|app\/api\/|lib\/content\/removed-sections\.ts|lib\/preview-)/; // old code nothing uses, and this file

/* Nov 14 (Paul's saves stopped at 2:31 PM with "GitHub won't let the editor save yet"): each save read every source file
   with its own request (about 190 per save), so a busy hour ran out GitHub's 5,000-an-hour limit and every save after was
   refused with a message that blamed the token. Now the files come in a few GraphQL requests, a limit says so with the time
   it resets, and a save that crosses another save at the same moment is tried again. */
class GhError extends Error { constructor(msg: string, public status: number) { super(msg); } }
const pacific = (secs: number) => new Date(secs * 1000).toLocaleTimeString("en-US", { timeZone: "America/Los_Angeles", hour: "numeric", minute: "2-digit" });
const limitMsg = (reset: number) => `GitHub's hourly limit for the editor was reached${reset ? `; saves work again after ${pacific(reset)} Pacific` : "; saves work again within the hour"}`;
const cleanWs = (s: string) => s.replace(/\s+/g, " ").trim();

export async function POST(req: Request) {
  if (process.env.VERCEL_ENV !== "preview") return NextResponse.json({ error: "Not available" }, { status: 404 });
  const token = process.env.EDIT_GITHUB_TOKEN;
  const branch = process.env.VERCEL_GIT_COMMIT_REF;
  const repo = `${process.env.VERCEL_GIT_REPO_OWNER || "rawlinsic"}/${process.env.VERCEL_GIT_REPO_SLUG || "rawlinsic"}`;
  if (!token) return NextResponse.json({ error: "The editor isn't set up yet (GitHub token missing in Vercel)." }, { status: 503 });
  if (!branch || branch === "main") return NextResponse.json({ error: "This preview's branch can't be edited." }, { status: 403 });
  if (isBackupVersion(branch)) return NextResponse.json({ error: BACKUP_LOCKED }, { status: 403 });

  const body = await req.json().catch(() => null) as { page?: string; name?: string; built?: string; changes?: Change[] } | null;
  if (!body) return NextResponse.json({ error: "Nothing to save" }, { status: 400 });
  const who = String(body.name || "someone").replace(/[\r\n"`<>{}]/g, " ").trim().slice(0, 40) || "someone";
  const changes = (body.changes || []).filter((c) => c && typeof c.old === "string" && typeof c.next === "string" && c.old.trim() && (c.old !== c.next || (typeof c.breaks === "string" && c.breaks.includes("\n"))))
    .map((c) => ({ breaks: typeof c.breaks === "string" && c.breaks.includes("\n") ? c.breaks.slice(0, 4000) : undefined, old: c.old, next: c.next, nodeOld: typeof c.nodeOld === "string" ? c.nodeOld : undefined, nodeNew: typeof c.nodeNew === "string" ? c.nodeNew : undefined, context: Array.isArray(c.context) ? c.context.filter((x) => typeof x === "string").slice(0, 8) : [] }))
    .slice(0, 50);
  if (!changes.length) return NextResponse.json({ applied: 0, pending: 0 });

  /* a node change the page worked out must sit inside the whole change it sent (Nov 14: a page-side off-by-one turned
     "training rotational program" into "training protational rogram"); one that doesn't is dropped and the whole wording is used */
  for (const c of changes) if (c.nodeOld && c.nodeNew !== undefined && (!cleanWs(c.old).includes(cleanWs(c.nodeOld)) || !cleanWs(c.next).includes(cleanWs(c.nodeNew)))) { c.nodeOld = undefined; c.nodeNew = undefined; }

  const gh = async (path: string, init?: RequestInit) => {
    const r = await fetch(`${GH}/repos/${repo}${path}`, { ...init, headers: { authorization: `Bearer ${token}`, accept: "application/vnd.github+json", "x-github-api-version": "2022-11-28", ...(init?.headers || {}) }, cache: "no-store" });
    if (!r.ok) {
      const txt = await r.text().catch(() => "");
      if ((r.status === 403 || r.status === 429) && (r.headers.get("x-ratelimit-remaining") === "0" || /rate limit/i.test(txt))) throw new GhError(limitMsg(Number(r.headers.get("x-ratelimit-reset") || 0)), 429);
      if (r.status === 401 || r.status === 403) throw new GhError("GitHub won't let the editor save (the token needs write access to the rawlinsic repo)", r.status);
      throw new GhError(`GitHub ${r.status} on ${path}`, r.status);
    }
    return r.json();
  };
  /* every source file's text in a few requests (GraphQL, its own hourly allowance), by blob id; a file it can't give is read
     on its own */
  const readAll = async (files: { path: string; sha: string }[], text: Map<string, string>) => {
    for (let i = 0; i < files.length; i += 80) {
      const batch = files.slice(i, i + 80);
      let got: Record<string, { text?: string | null; isTruncated?: boolean } | null> | null = null;
      try {
        const q = `query { repository(owner: ${JSON.stringify(repo.split("/")[0])}, name: ${JSON.stringify(repo.split("/")[1])}) { ${batch.map((f, k) => `f${k}: object(oid: ${JSON.stringify(f.sha)}) { ... on Blob { text isTruncated } }`).join(" ")} } }`;
        const r = await fetch(`${GH}/graphql`, { method: "POST", headers: { authorization: `Bearer ${token}`, "content-type": "application/json" }, body: JSON.stringify({ query: q }), cache: "no-store" });
        const j = r.ok ? await r.json() : null;
        got = j && !j.errors ? j.data?.repository ?? null : null;
      } catch { got = null; }
      await Promise.all(batch.map(async (f, k) => {
        const o = got?.[`f${k}`];
        if (o && typeof o.text === "string" && !o.isTruncated) { text.set(f.path, o.text); return; }
        const b = await gh(`/git/blobs/${f.sha}`);
        text.set(f.path, Buffer.from(b.content, b.encoding === "base64" ? "base64" : "utf8").toString("utf8"));
      }));
    }
  };

  for (let attempt = 0; ; attempt++) try {
    const ref = await gh(`/git/ref/heads/${encodeURIComponent(branch)}`);
    const head: string = ref.object.sha;
    const commit = await gh(`/git/commits/${head}`);
    const tree = await gh(`/git/trees/${commit.tree.sha}?recursive=1`);
    const files: { path: string; sha: string }[] = tree.tree.filter((t: { type: string; path: string }) => t.type === "blob" && SEARCH.test(t.path) && !SKIP.test(t.path));
    // read every source file once
    const text = new Map<string, string>();
    await readAll(files, text);

    // saves made after this page was built, oldest first: [old wording, new wording]
    const built = typeof body.built === "string" && /^[0-9a-f]{40}$/.test(body.built) ? body.built : "";
    let later: [string, string][] | null = null;
    const laterSaves = async () => {
      if (later) return later;
      later = [];
      if (!built || built === head) return later;
      try {
        const cmp = await gh(`/compare/${built}...${head}?per_page=100`);
        for (const k of (cmp.commits || []) as { commit?: { message?: string } }[]) {
          const m = String(k.commit?.message || "");
          if (!/^Preview edit /.test(m)) continue;
          for (const line of m.split("\n")) { const x = /^- "(.*)" -> "(.*)"$/.exec(line); if (x) later.push([x[1].trim(), x[2].trim()]); }
        }
      } catch { later = []; } // can't tell: the edit goes on the list, as before
      return later;
    };
    const latest = (old: string, pairs: [string, string][]) => { let cur = old.trim(); for (const [a, b] of pairs) if (a === cur) cur = b; return cur; };

    const changed = new Map<string, string>();
    const pending: { c: Change; why: string }[] = [];
    const moves: [string, string][] = []; // pages this save renames (old address segment, new one)
    /* this save's lines for the record of changes (lib/edit-record.ts): placed, or on the list for Claude Code */
    const saveId = newSaveId(), at = new Date().toISOString();
    const recs: RecordEntry[] = [];
    const rec = (c: Change, status: RecordEntry["status"], files: string[]) => recs.push({ id: saveId, at, who, kind: "edit", page: String(body.page || ""), files, before: cleanWs(c.old), after: cleanWs(c.next), status: status === "saved" && core(c.old) === core(c.next) ? "breaks" : status });
    let applied = 0, already = 0;
    // page text in each file as it is now (worked out once per version of a file)
    const spanCache = new Map<string, { src: string; spans: [number, number][] }>();
    const spansFor = (path: string, src: string) => {
      const hit = spanCache.get(path);
      if (hit && hit.src === src) return hit.spans;
      let spans: [number, number][] = [];
      try { spans = textSpans(path, src); } catch { spans = []; } // can't read it: nothing in it counts as page text
      spanCache.set(path, { src, spans });
      return spans;
    };
    for (const c of changes) {
      // new lines (Enter): placed like any edit, then written in as real line breaks
      const lines = c.breaks ? c.breaks.split("\n").map((l) => l.replace(/\s+/g, " ").trim()).filter(Boolean) : null;
      if (lines) c.next = lines.join(" ");
      const special = /[<>{}`\\]/.test(c.next) || (!!c.nodeNew && /[<>{}`\\]/.test(c.nodeNew)); // written escaped, so it still saves at once
      // search the files as they are after the edits already placed in this save
      const now = new Map(Array.from(text.keys()).map((p) => [p, changed.get(p) ?? text.get(p)!] as [string, string]));
      const isText = (path: string, from: number, to: number) => inText(spansFor(path, now.get(path) ?? ""), from, to);
      let got = place(now, c, { isText });
      if ("why" in got) { // not in the files: the page may be older than a save that changed this wording
        const cur = latest(c.old, await laterSaves());
        if (cur !== c.old.trim()) {
          if (cur === c.next.trim()) { already++; continue; }
          const again = place(now, { ...c, old: cur, nodeOld: undefined, nodeNew: undefined }, { isText });
          if ("already" in again) { already++; continue; }
          if (!("why" in again)) { got = again; c.old = cur; c.nodeOld = undefined; c.nodeNew = undefined; } // the commit message then says what was really replaced
        }
      }
      if ("already" in got) { already++; continue; } // the new wording is already there: nothing to change
      if ("why" in got) { pending.push({ c, why: got.why }); rec(c, "list", []); continue; }
      const writes = Array.from(new Set(got.hits.map((h) => h.path))).map((path) => {
        const hits = got.hits.filter((h) => h.path === path);
        if (special) return [path, writeSpecial(now.get(path)!, hits, got.next)] as const;
        return [path, lines && lines.length > 1 ? writeWithBreaks(now.get(path)!, hits, got.next, lines) : writeAll(now.get(path)!, hits, got.next)] as const;
      });
      if (writes.some(([, out]) => out === null)) { pending.push({ c, why: "found it, but changing it there automatically isn't safe" }); rec(c, "list", []); continue; }
      // the file must read as the same code afterwards, with only page text different
      if (writes.some(([path, out]) => !onlyTextChanged(path, now.get(path)!, out!))) { pending.push({ c, why: "saving it there would have changed code, not just page text" }); rec(c, "list", []); continue; }
      for (const [path, out] of writes) changed.set(path, out!);
      applied++;
      rec(c, "saved", writes.map(([path]) => path));
      if (ADDRESS_NAMES.has(c.old.trim()) && slugify(got.next)) moves.push([slugify(c.old.trim()), slugify(got.next)]);
    }

    const items: { path: string; mode: string; type: string; content: string }[] = Array.from(changed).map(([path, content]) => ({ path, mode: "100644", type: "blob", content }));
    if (moves.length) {
      try {
        const f = await gh(`/contents/lib/moved-pages.json?ref=${encodeURIComponent(branch)}`);
        const data = JSON.parse(Buffer.from(f.content, "base64").toString("utf8")) as { slugs: MovedList };
        for (const [from, to] of moves) data.slugs = addMove(data.slugs || {}, from, to);
        items.push({ path: "lib/moved-pages.json", mode: "100644", type: "blob", content: JSON.stringify(data, null, 2) + "\n" });
      } catch { /* the list couldn't be read: the rename still saves; Claude Code adds the move by hand */ }
    }
    if (pending.length) {
      let list = "# Edits from the preview editor that need Claude Code\n\nEach line: page, old wording, new wording, and why it couldn't be placed automatically.\n\n";
      try { const f = await gh(`/contents/EDITS-PENDING.md?ref=${encodeURIComponent(branch)}`); list = Buffer.from(f.content, "base64").toString("utf8"); } catch {}
      const day = new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
      list += pending.map(({ c, why }) => `- [ ] ${day} · ${who} · ${body.page || "?"} · "${c.old}" → "${c.next.trim()}" (${why})`).join("\n") + "\n";
      items.push({ path: "EDITS-PENDING.md", mode: "100644", type: "blob", content: list });
    }
    if (!items.length) return NextResponse.json({ applied: 0, pending: 0, already });
    /* the record of changes gets this save's lines in the same commit (a record that can't be read is started again
       from the lines it can: never a reason to refuse the save) */
    if (recs.length) {
      let prior: RecordEntry[] = [];
      const blob = (tree.tree as { path: string; sha: string }[]).find((t) => t.path === RECORD_PATH);
      if (blob) { try { const b = await gh(`/git/blobs/${blob.sha}`); prior = parseRecord(Buffer.from(b.content, "base64").toString("utf8")); } catch (e) { if (e instanceof GhError && e.status === 429) throw e; } }
      if (prior.length || !blob) items.push({ path: RECORD_PATH, mode: "100644", type: "blob", content: recordText([...prior, ...recs]) });
    }

    const newTree = await gh(`/git/trees`, { method: "POST", body: JSON.stringify({ base_tree: commit.tree.sha, tree: items }) });
    const message = `Preview edit by ${who} on ${body.page || "a page"}: ${applied} change${applied === 1 ? "" : "s"}${pending.length ? `, ${pending.length} for Claude Code` : ""}\n\n${changes.map((c) => `- "${c.old}" -> "${c.next.trim()}"`).join("\n")}\n\nMade with the preview Edit text button.${recs.length ? `\nRecord: ${saveId}` : ""}`;
    const made = await gh(`/git/commits`, { method: "POST", body: JSON.stringify({ message, tree: newTree.sha, parents: [head] }) });
    await gh(`/git/refs/heads/${encodeURIComponent(branch)}`, { method: "PATCH", body: JSON.stringify({ sha: made.sha, force: false }) });
    return NextResponse.json({ applied, pending: pending.length, already, commit: made.sha });
  } catch (e) {
    // someone else's save landed between reading and writing: read again and redo this one (twice at most)
    if (e instanceof GhError && (e.status === 422 || e.status === 409) && attempt < 2) continue;
    const limit = e instanceof GhError && e.status === 429;
    return NextResponse.json({ error: `Couldn't save: ${(e as Error).message}. Nothing was changed${limit ? ". Your edits are still on this page: keep it open and press Save again then." : ". Try again in a minute."}` }, { status: limit ? 429 : 500 });
  }
}
