/* The record of Edit text changes (lib/edit-record.ts), as the flags beside edited text use it: each piece of text
   that differs from its original, with its story. Preview builds only. The record is the one this build was made
   from, the same as the page's own words. */
import { NextResponse } from "next/server";
import RECORD from "@/lib/edit-record.json";
import { chains, type RecordEntry } from "@/lib/edit-record";
import { movedPath } from "@/lib/moved-pages";

export const dynamic = "force-static";

export function GET() {
  if (process.env.VERCEL_ENV !== "preview") return NextResponse.json({ error: "Not available" }, { status: 404 });
  const list = chains((RECORD as { entries: RecordEntry[] }).entries).map((c) => ({ ...c, pages: c.pages.map((p) => movedPath(p)) }));
  return NextResponse.json({ chains: list });
}
