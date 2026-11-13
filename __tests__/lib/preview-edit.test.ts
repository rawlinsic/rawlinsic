/* The preview Edit text guard (Nov 11): a save never changes code. The first case is the save that once
   swapped "and" for "&" in code (d94d08a), rebuilt in small. */
import { describe, expect, it } from "vitest";
import { place, writeAll, type Change } from "@/lib/preview-edit-match";
import { inText, onlyTextChanged, textSpans } from "@/lib/preview-edit-safe";

const files = () => new Map<string, string>([
  ["lib/content/site.ts", `export const AREAS = [
  { id: "delivery", name: "Project Delivery", tag: "Getting programs & projects built", scene: "construction" },
];
export const isNew = (k: string) => k !== "Thought leadership";
export const LINE_STATUS: Record<string, string> = { "Winter operations and emergency readiness": "Content status: note" };
import * as THREE from "three";
export const NAV = [leaf("where", "Where we work", "/about/where-we-work")];`],
  ["components/site/more.tsx", `const memberSlug = (name: string) => name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-");
export function Note() { return <p className="cf-note">Google <a href="https://policies.google.com/privacy">Privacy Policy</a> and <a href="https://policies.google.com/terms">Terms of Service</a> apply.</p>; }
export function Rows() { return <ul>{RESEARCH.filter((r) => r.k !== "Thought leadership").map((r) => <li key={r.t}>{r.t}</li>)}</ul>; }`],
]);

function save(f: Map<string, string>, c: Change) {
  const isText = (p: string, a: number, b: number) => inText(textSpans(p, f.get(p) ?? ""), a, b);
  const got = place(f, c, { isText });
  if ("already" in got || "why" in got) return got;
  const out = new Map(f);
  for (const p of Array.from(new Set(got.hits.map((h) => h.path)))) {
    const w = writeAll(f.get(p)!, got.hits.filter((h) => h.path === p), got.next);
    if (w === null || !onlyTextChanged(p, f.get(p)!, w)) return { why: "would change code" };
    out.set(p, w);
  }
  return { out };
}

describe("preview Edit text never changes code", () => {
  it("does nothing when the same wording is saved a second time (the d94d08a save)", () => {
    const r = save(files(), { old: "Getting programs and projects built", next: "Getting programs & projects built", context: ["Project Delivery"] });
    expect(r).toEqual({ already: true });
  });

  it("won't change a code string even when asked for it directly", () => {
    for (const old of ["and", "three", "where", "/about/where-we-work", "cf-note"]) {
      const r = save(files(), { old, next: "Zqx" });
      expect("out" in r ? old : null).toBeNull();
    }
  });

  it("still saves page text, and keeps a label the code compares on matched with it", () => {
    const r = save(files(), { old: "Thought leadership", next: "Thought Leadership" });
    expect("out" in r).toBe(true);
    const more = (r as { out: Map<string, string> }).out.get("components/site/more.tsx")!;
    expect(more).toContain(`r.k !== "Thought Leadership"`);
    expect(more).toContain(`.replace(/&/g, "and")`);
  });

  it("still saves a sentence and a tag", () => {
    const a = save(files(), { old: "Where we work", next: "Where we've worked" });
    expect((a as { out: Map<string, string> }).out.get("lib/content/site.ts")).toContain(`leaf("where", "Where we've worked", "/about/where-we-work")`);
    const b = save(files(), { old: "Getting programs & projects built", next: "Getting projects built" });
    expect((b as { out: Map<string, string> }).out.get("lib/content/site.ts")).toContain(`tag: "Getting projects built"`);
  });

  it("refuses a change that would alter the code around the text", () => {
    const src = `export const A = { tag: "One two" };`;
    expect(onlyTextChanged("x.ts", src, `export const A = { tag: "One three" };`)).toBe(true);
    expect(onlyTextChanged("x.ts", src, `export const A = { tag: "One", two: "x" };`)).toBe(false);
    expect(onlyTextChanged("x.tsx", `const B = <p>Hi there</p>;`, `const B = <p>Hi<br />there</p>;`)).toBe(true);
    expect(onlyTextChanged("x.tsx", `const B = <p className="a">Hi</p>;`, `const B = <p className="b">Hi</p>;`)).toBe(false);
  });

  it("finds a paragraph that starts after a line break written in the string (Nov 12)", () => {
    const f = new Map<string, string>([["lib/content/catalog.ts", `export const SERVICES = { "x": { "intro": "First part.\\n\\nMaintenance quality assurance is part of it. Each has its own page." } };`]]);
    const del = save(f, { old: "Maintenance quality assurance is part of it. Each has its own page.", next: "" });
    expect((del as { out: Map<string, string> }).out.get("lib/content/catalog.ts")).toContain(`"intro": "First part.\\n\\n"`);
    const ed = save(f, { old: "Maintenance quality assurance is part of it.", next: "Quality assurance is part of it." });
    expect((ed as { out: Map<string, string> }).out.get("lib/content/catalog.ts")).toContain(`\\n\\nQuality assurance is part of it. Each`);
    // a word glued to letters is still not a match
    const g = new Map<string, string>([["lib/content/site.ts", `export const A = { tag: "Replanning matters" };`]]);
    expect("why" in place(g, { old: "planning matters", next: "x" })).toBe(true);
  });
});
