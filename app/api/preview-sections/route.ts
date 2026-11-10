/* "Delete section" on the preview (Nicole only: off on Jacob's version). Adds
   the section to lib/content/removed-sections.ts on this preview's branch; the
   layout hides it before the page draws. Undo puts it back. */
import { NextResponse } from "next/server";
import { canDeleteSections, commitFiles, previewGitHub, readFile } from "@/lib/preview-gh";
import type { RemovedSection } from "@/lib/content/removed-sections";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const FILE = "lib/content/removed-sections.ts";

export async function POST(req: Request) {
  const s = previewGitHub(); if ("error" in s) return NextResponse.json({ error: s.error }, { status: s.status });
  if (!canDeleteSections(s.branch)) return NextResponse.json({ error: "Deleting sections is off on this version." }, { status: 403 });
  const b = await req.json().catch(() => null) as { page?: string; sel?: string; heading?: string; name?: string } | null;
  const clip = (x: unknown, n: number) => String(x ?? "").replace(/\s+/g, " ").trim().slice(0, n);
  const entry: RemovedSection = { page: clip(b?.page, 300) || "/", sel: clip(b?.sel, 600), heading: clip(b?.heading, 120), by: clip(b?.name, 40) || "someone", at: new Date().toISOString() };
  if (!entry.sel || /[{}<>;]/.test(entry.sel)) return NextResponse.json({ error: "Couldn't tell which section that was." }, { status: 400 });
  try {
    const src = await readFile(s.gh, s.branch, FILE);
    if (src === null) return NextResponse.json({ error: "The section list is missing on this version." }, { status: 500 });
    const m = /REMOVED_SECTIONS\s*:[^=]*=\s*/.exec(src);
    if (!m) return NextResponse.json({ error: "The section list is unreadable on this version." }, { status: 500 });
    const at = m.index + m[0].length;
    const list: RemovedSection[] = JSON.parse(src.slice(at, src.lastIndexOf("]") + 1) || "[]");
    if (!list.some((x) => x.page === entry.page && x.sel === entry.sel)) list.push(entry);
    const out = src.slice(0, at) + JSON.stringify(list, null, 2) + ";\n";
    const sha = await commitFiles(s.gh, s.branch, [{ path: FILE, content: out }], `Preview section deleted by ${entry.by} on ${entry.page}: ${entry.heading || entry.sel}\n\nMade with the preview Delete section button. Undo puts it back.`);
    return NextResponse.json({ ok: true, commit: sha });
  } catch (e) {
    return NextResponse.json({ error: `Couldn't delete it: ${(e as Error).message}. Nothing was changed.` }, { status: 500 });
  }
}
