/* Undo for the preview review tools: takes back one saved change (an Edit text
   save or a deleted section) by putting its files back the way they were.
   Only commits made by the review tools, and only if nothing has changed those
   files since; otherwise it says so and nothing changes. Never touches main. */
import { NextResponse } from "next/server";
import { commitFiles, previewGitHub } from "@/lib/preview-gh";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const s = previewGitHub(); if ("error" in s) return NextResponse.json({ error: s.error }, { status: s.status });
  const body = await req.json().catch(() => null) as { sha?: string; name?: string } | null;
  const sha = String(body?.sha || "");
  if (!/^[0-9a-f]{40}$/.test(sha)) return NextResponse.json({ error: "Nothing to undo" }, { status: 400 });
  try {
    const c = await s.gh(`/commits/${sha}`);
    const first = String(c.commit?.message || "").split("\n")[0];
    if (!/^Preview (edit|section)/.test(first)) return NextResponse.json({ error: "Only changes made with the review tools can be undone here." }, { status: 400 });
    const parent = c.parents?.[0]?.sha;
    const restore: { path: string; content: string | null }[] = [];
    for (const f of c.files || []) {
      // nothing may have changed this file since
      let headBlob: string | null = null;
      try { headBlob = (await s.gh(`/contents/${f.filename}?ref=${encodeURIComponent(s.branch)}`)).sha; } catch (e) { if ((e as { status?: number }).status !== 404) throw e; }
      if (f.status === "removed" ? headBlob !== null : headBlob !== f.sha) {
        return NextResponse.json({ error: `Can't undo automatically: ${f.filename} was changed again after that. Ask Claude Code to undo it.` }, { status: 409 });
      }
      if (f.status === "added") restore.push({ path: f.filename, content: null });
      else { const p = await s.gh(`/contents/${f.filename}?ref=${parent}`); restore.push({ path: f.filename, content: Buffer.from(p.content, "base64").toString("utf8") }); }
    }
    if (!restore.length) return NextResponse.json({ error: "Nothing to undo" }, { status: 400 });
    const who = String(body?.name || "someone").replace(/[\r\n"`<>{}]/g, " ").trim().slice(0, 40) || "someone";
    const made = await commitFiles(s.gh, s.branch, restore, `Preview undo by ${who}: ${first}\n\nUndoes ${sha.slice(0, 7)}. Made with the preview Undo button.`);
    return NextResponse.json({ ok: true, commit: made });
  } catch (e) {
    return NextResponse.json({ error: `Couldn't undo: ${(e as Error).message}. Nothing was changed.` }, { status: 500 });
  }
}
