/* Preview text editor (components/v8/preview-edit.tsx). Preview builds only.
   Takes { page, changes: [{ old, next }] }, finds each old wording in the
   site's source files on this preview's branch, and commits the new wording in
   one commit. A wording that isn't found exactly once (or needs characters that
   aren't safe to drop into code) goes on EDITS-PENDING.md for Claude Code.
   Needs, on Vercel, for Preview only: EDIT_GITHUB_TOKEN (write access to this
   repo). No passcode (Nicole's call): anyone with a preview link can edit that
   preview's branch, never main; every edit is its own commit, so it can be undone. */
import { NextResponse } from "next/server";
import { place, writeAll, writeWithBreaks, type Change } from "@/lib/preview-edit-match";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GH = "https://api.github.com";
const SEARCH = /^(lib\/.*\.ts|components\/.*\.tsx?|app\/.*\.tsx?)$/;
const SKIP = /^(components\/home\/|components\/menu\/|app\/api\/|lib\/content\/removed-sections\.ts|lib\/preview-)/; // old code nothing uses, and this file

export async function POST(req: Request) {
  if (process.env.VERCEL_ENV !== "preview") return NextResponse.json({ error: "Not available" }, { status: 404 });
  const token = process.env.EDIT_GITHUB_TOKEN;
  const branch = process.env.VERCEL_GIT_COMMIT_REF;
  const repo = `${process.env.VERCEL_GIT_REPO_OWNER || "rawlinsic"}/${process.env.VERCEL_GIT_REPO_SLUG || "rawlinsic"}`;
  if (!token) return NextResponse.json({ error: "The editor isn't set up yet (GitHub token missing in Vercel)." }, { status: 503 });
  if (!branch || branch === "main") return NextResponse.json({ error: "This preview's branch can't be edited." }, { status: 403 });

  const body = await req.json().catch(() => null) as { page?: string; name?: string; changes?: Change[] } | null;
  if (!body) return NextResponse.json({ error: "Nothing to save" }, { status: 400 });
  const who = String(body.name || "someone").replace(/[\r\n"`<>{}]/g, " ").trim().slice(0, 40) || "someone";
  const changes = (body.changes || []).filter((c) => c && typeof c.old === "string" && typeof c.next === "string" && c.old.trim() && (c.old !== c.next || (typeof c.breaks === "string" && c.breaks.includes("\n"))))
    .map((c) => ({ breaks: typeof c.breaks === "string" && c.breaks.includes("\n") ? c.breaks.slice(0, 4000) : undefined, old: c.old, next: c.next, nodeOld: typeof c.nodeOld === "string" ? c.nodeOld : undefined, nodeNew: typeof c.nodeNew === "string" ? c.nodeNew : undefined, context: Array.isArray(c.context) ? c.context.filter((x) => typeof x === "string").slice(0, 8) : [] }))
    .slice(0, 50);
  if (!changes.length) return NextResponse.json({ applied: 0, pending: 0 });

  const gh = async (path: string, init?: RequestInit) => {
    const r = await fetch(`${GH}/repos/${repo}${path}`, { ...init, headers: { authorization: `Bearer ${token}`, accept: "application/vnd.github+json", "x-github-api-version": "2022-11-28", ...(init?.headers || {}) }, cache: "no-store" });
    if (!r.ok) throw new Error(r.status === 403 || r.status === 404 ? "GitHub won't let the editor save yet (the token needs write access to the rawlinsic repo)" : `GitHub ${r.status} on ${path}`);
    return r.json();
  };

  try {
    const ref = await gh(`/git/ref/heads/${encodeURIComponent(branch)}`);
    const head: string = ref.object.sha;
    const commit = await gh(`/git/commits/${head}`);
    const tree = await gh(`/git/trees/${commit.tree.sha}?recursive=1`);
    const files: { path: string; sha: string }[] = tree.tree.filter((t: { type: string; path: string }) => t.type === "blob" && SEARCH.test(t.path) && !SKIP.test(t.path));
    // read every source file once (in batches)
    const text = new Map<string, string>();
    for (let i = 0; i < files.length; i += 25) {
      await Promise.all(files.slice(i, i + 25).map(async (f) => {
        const b = await gh(`/git/blobs/${f.sha}`);
        text.set(f.path, Buffer.from(b.content, b.encoding === "base64" ? "base64" : "utf8").toString("utf8"));
      }));
    }

    const changed = new Map<string, string>();
    const pending: { c: Change; why: string }[] = [];
    let applied = 0;
    for (const c of changes) {
      // new lines (Enter): placed like any edit, then written in as real line breaks
      const lines = c.breaks ? c.breaks.split("\n").map((l) => l.replace(/\s+/g, " ").trim()).filter(Boolean) : null;
      if (lines) c.next = lines.join(" ");
      if (/[<>{}`\\]/.test(c.next) || (c.nodeNew && /[<>{}`\\]/.test(c.nodeNew))) { pending.push({ c, why: "has characters that can't go straight into the code" }); continue; }
      // search the files as they are after the edits already placed in this save
      const now = new Map(Array.from(text.keys()).map((p) => [p, changed.get(p) ?? text.get(p)!] as [string, string]));
      const got = place(now, c);
      if ("why" in got) { pending.push({ c, why: got.why }); continue; }
      const writes = Array.from(new Set(got.hits.map((h) => h.path))).map((path) => {
        const hits = got.hits.filter((h) => h.path === path);
        return [path, lines && lines.length > 1 ? writeWithBreaks(now.get(path)!, hits, got.next, lines) : writeAll(now.get(path)!, hits, got.next)] as const;
      });
      if (writes.some(([, out]) => out === null)) { pending.push({ c, why: "found it, but changing it there automatically isn't safe" }); continue; }
      for (const [path, out] of writes) changed.set(path, out!);
      applied++;
    }

    const items: { path: string; mode: string; type: string; content: string }[] = Array.from(changed).map(([path, content]) => ({ path, mode: "100644", type: "blob", content }));
    if (pending.length) {
      let list = "# Edits from the preview editor that need Claude Code\n\nEach line: page, old wording, new wording, and why it couldn't be placed automatically.\n\n";
      try { const f = await gh(`/contents/EDITS-PENDING.md?ref=${encodeURIComponent(branch)}`); list = Buffer.from(f.content, "base64").toString("utf8"); } catch {}
      const day = new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
      list += pending.map(({ c, why }) => `- [ ] ${day} · ${who} · ${body.page || "?"} · "${c.old}" → "${c.next.trim()}" (${why})`).join("\n") + "\n";
      items.push({ path: "EDITS-PENDING.md", mode: "100644", type: "blob", content: list });
    }
    if (!items.length) return NextResponse.json({ applied: 0, pending: 0 });

    const newTree = await gh(`/git/trees`, { method: "POST", body: JSON.stringify({ base_tree: commit.tree.sha, tree: items }) });
    const message = `Preview edit by ${who} on ${body.page || "a page"}: ${applied} change${applied === 1 ? "" : "s"}${pending.length ? `, ${pending.length} for Claude Code` : ""}\n\n${changes.map((c) => `- "${c.old}" -> "${c.next.trim()}"`).join("\n")}\n\nMade with the preview Edit text button.`;
    const made = await gh(`/git/commits`, { method: "POST", body: JSON.stringify({ message, tree: newTree.sha, parents: [head] }) });
    await gh(`/git/refs/heads/${encodeURIComponent(branch)}`, { method: "PATCH", body: JSON.stringify({ sha: made.sha, force: false }) });
    return NextResponse.json({ applied, pending: pending.length, commit: made.sha });
  } catch (e) {
    return NextResponse.json({ error: `Couldn't save: ${(e as Error).message}. Nothing was changed. Try again in a minute.` }, { status: 500 });
  }
}
