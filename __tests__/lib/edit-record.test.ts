import { describe, expect, it } from "vitest";
import RECORD from "@/lib/edit-record.json";
import { chains, core, parseRecord, recordText, reversed, type RecordEntry } from "@/lib/edit-record";

const entries = (RECORD as { entries: RecordEntry[] }).entries;
const e = (x: Partial<RecordEntry>): RecordEntry => ({ id: "a", at: "2026-11-16T10:00:00-08:00", who: "Nicole", kind: "edit", page: "/", files: [], before: "", after: "", status: "saved", ...x });

describe("edit record", () => {
  it("reads back what it writes", () => {
    expect(parseRecord(recordText(entries))).toEqual(entries);
  });
  it("follows one piece of text through its saves", () => {
    const c = chains([e({ before: "One", after: "Two" }), e({ id: "b", at: "2026-11-16T11:00:00-08:00", who: "Paul Sch", before: "Two", after: "Three" })]);
    expect(c).toHaveLength(1);
    expect(c[0].original).toBe("One");
    expect(c[0].now).toBe("Three");
    expect(c[0].steps.map((s) => s.who)).toEqual(["Nicole", "Paul Sch"]);
  });
  it("leaves out a save that went to the list and was never placed, and text put back as it was", () => {
    expect(chains([e({ before: "One", after: "Two", status: "list" })])).toHaveLength(0);
    const id = "s1";
    const saved = [e({ id, before: "One", after: "Two" })];
    expect(chains([...saved, ...reversed(saved, id, "u1", "Nicole", "undo", "2026-11-16T12:00:00-08:00")])).toHaveLength(0);
  });
  it("a garbled save is followed by its fix", () => {
    const c = chains([
      e({ before: "07 training program", after: "07 training rotational program", landed: "07 training protational rogram", who: "Paul Sch" }),
      e({ id: "f", at: "2026-11-16T12:00:00-08:00", who: "Claude Code", kind: "fix", before: "07 training protational rogram", after: "07 training rotational program" }),
    ]);
    expect(c).toHaveLength(1);
    expect(c[0].steps.map((s) => s.kind)).toEqual(["edit", "fix"]);
    expect(c[0].now).toBe("07 training rotational program");
  });
  it("an item's number and review tag don't split its story", () => {
    expect(core("07 Built a list to monitor expirations For review")).toBe("Built a list to monitor expirations");
  });
  it("the history so far: Jacob's and Paul's changes are there", () => {
    const c = chains(entries);
    expect(c.some((x) => x.steps.some((s) => s.who === "Jacob") && /recommendations into solutions/.test(x.now))).toBe(true);
    expect(c.some((x) => x.steps.some((s) => s.who === "Paul Sch") && x.pages.some((p) => p.includes("tennessee")))).toBe(true);
    expect(c.filter((x) => x.steps.some((s) => s.kind === "fix")).length).toBeGreaterThanOrEqual(5);
  });
});
