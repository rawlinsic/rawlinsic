/* Comments on the preview (components/v8/preview-edit.tsx). Preview builds only.
   Each comment is a GitHub issue on this repo, labeled preview-note and with
   this preview's branch, and its contents are encrypted (AES-256-GCM, key from
   EDIT_PASSCODE, set in Vercel for Preview only), so the public repo shows only
   a locked note. Anyone with the preview link can read and add them (Nicole's
   call: no password), the same people who can see the preview.
     GET   ?page=/path  open comments (all pages when page is left out)
     POST  { page, sel, rx, ry, snippet, text, name }  add one
     PATCH { id }  mark one done (closes the issue); { id, reopen: true } brings it back (Undo and Redo) */
import { NextResponse } from "next/server";
import { BACKUP_LOCKED, isBackupVersion } from "@/lib/preview-gh";
import { movedPath } from "@/lib/moved-pages";
import { createCipheriv, createDecipheriv, createHash, randomBytes } from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Note = { page: string; sel: string; rx: number; ry: number; snippet: string; text: string; who: string; at: string };
const GH = "https://api.github.com";
const MARK = /<!--pn1:([A-Za-z0-9+/=]+)-->/;

function setup() {
  if (process.env.VERCEL_ENV !== "preview") return { error: NextResponse.json({ error: "Not available" }, { status: 404 }) };
  const token = process.env.EDIT_GITHUB_TOKEN, secret = process.env.EDIT_PASSCODE || process.env.EDIT_GITHUB_TOKEN;
  const branch = process.env.VERCEL_GIT_COMMIT_REF;
  if (!token || !secret || !branch) return { error: NextResponse.json({ error: "Comments aren't set up yet (GitHub token missing in Vercel)." }, { status: 503 }) };
  const repo = `${process.env.VERCEL_GIT_REPO_OWNER || "rawlinsic"}/${process.env.VERCEL_GIT_REPO_SLUG || "rawlinsic"}`;
  const key = createHash("sha256").update(`preview-notes:${secret}`).digest();
  const gh = async (path: string, init?: RequestInit) => {
    const r = await fetch(`${GH}/repos/${repo}${path}`, { ...init, headers: { authorization: `Bearer ${token}`, accept: "application/vnd.github+json", "x-github-api-version": "2022-11-28", ...(init?.headers || {}) }, cache: "no-store" });
    if (!r.ok && r.status !== 422) throw new Error(`GitHub ${r.status}`);
    return r.status === 204 ? null : r.json();
  };
  const label = `on:${branch}`.slice(0, 50);
  return { gh, key, label };
}

const seal = (key: Buffer, note: Note) => {
  const iv = randomBytes(12), c = createCipheriv("aes-256-gcm", key, iv);
  const ct = Buffer.concat([c.update(JSON.stringify(note), "utf8"), c.final()]);
  return Buffer.concat([iv, c.getAuthTag(), ct]).toString("base64");
};
const open = (key: Buffer, b64: string): Note | null => {
  try {
    const buf = Buffer.from(b64, "base64"), d = createDecipheriv("aes-256-gcm", key, buf.subarray(0, 12));
    d.setAuthTag(buf.subarray(12, 28));
    return JSON.parse(Buffer.concat([d.update(buf.subarray(28)), d.final()]).toString("utf8"));
  } catch { return null; }
};
const clip = (x: unknown, n: number) => String(x ?? "").replace(/\s+/g, " ").trim().slice(0, n);

export async function GET(req: Request) {
  const s = setup(); if ("error" in s) return s.error;
  const page = new URL(req.url).searchParams.get("page");
  try {
    const out: (Note & { id: number })[] = [];
    for (let p = 1; p <= 5; p++) {
      const list = await s.gh(`/issues?labels=preview-note,${encodeURIComponent(s.label)}&state=open&per_page=100&page=${p}`);
      for (const it of list || []) { const m = MARK.exec(it.body || ""); const n = m && open(s.key, m[1]); if (n && (!page || movedPath(n.page) === page)) out.push({ id: it.number, ...n }); }
      if (!list || list.length < 100) break;
    }
    return NextResponse.json({ comments: out.sort((a, b) => a.at.localeCompare(b.at)) });
  } catch (e) { return NextResponse.json({ error: `Couldn't load comments: ${(e as Error).message}` }, { status: 500 }); }
}

export async function POST(req: Request) {
  if (isBackupVersion()) return NextResponse.json({ error: BACKUP_LOCKED }, { status: 403 }); // a backup copy takes no comments
  const s = setup(); if ("error" in s) return s.error;
  const b = await req.json().catch(() => null) as Partial<Note> & { name?: string } | null;
  if (!b || !clip(b.text, 4000)) return NextResponse.json({ error: "Nothing to save" }, { status: 400 });
  const note: Note = { page: clip(b.page, 300) || "/", sel: clip(b.sel, 600), rx: Number(b.rx) || 0, ry: Number(b.ry) || 0, snippet: clip(b.snippet, 120), text: String(b.text).trim().slice(0, 4000), who: clip(b.name, 40) || "someone", at: new Date().toISOString() };
  try {
    for (const name of ["preview-note", s.label]) await s.gh(`/labels`, { method: "POST", body: JSON.stringify({ name, color: "22d3ee" }) }); // 422 if it exists already
    const it = await s.gh(`/issues`, { method: "POST", body: JSON.stringify({ title: `Preview note on ${note.page}`, labels: ["preview-note", s.label], body: `Encrypted note from the preview site. Open the preview to read it.\n\n<!--pn1:${seal(s.key, note)}-->` }) });
    return NextResponse.json({ comment: { id: it.number, ...note } });
  } catch (e) { return NextResponse.json({ error: `Couldn't save the comment: ${(e as Error).message}` }, { status: 500 }); }
}

export async function PATCH(req: Request) {
  if (isBackupVersion()) return NextResponse.json({ error: BACKUP_LOCKED }, { status: 403 }); // a backup copy takes no comments
  const s = setup(); if ("error" in s) return s.error;
  const b = await req.json().catch(() => null) as { id?: number; reopen?: boolean } | null;
  if (!b?.id) return NextResponse.json({ error: "Which comment?" }, { status: 400 });
  try {
    const it = await s.gh(`/issues/${Number(b.id)}`);
    if (!(it.labels || []).some((l: { name: string }) => l.name === "preview-note")) return NextResponse.json({ error: "Not a preview comment" }, { status: 400 });
    /* reopen: Undo of "Mark done", or Redo of a comment that Undo took back. Only on this version's own comments. */
    if (b.reopen && !(it.labels || []).some((l: { name: string }) => l.name === s.label)) return NextResponse.json({ error: "That comment belongs to another version." }, { status: 400 });
    await s.gh(`/issues/${Number(b.id)}`, { method: "PATCH", body: JSON.stringify(b.reopen ? { state: "open" } : { state: "closed", state_reason: "completed" }) });
    return NextResponse.json({ ok: true });
  } catch (e) { return NextResponse.json({ error: `Couldn't ${b.reopen ? "bring it back" : "mark it done"}: ${(e as Error).message}` }, { status: 500 }); }
}
