/* Renamed pages (Nov 12): comments and old addresses follow a page to its new name, and a rename and back never loops. */
import { describe, expect, it } from "vitest";
import { addMove, movedPath } from "@/lib/moved-pages";

describe("moved pages", () => {
  it("follows a renamed page, through more than one rename", () => {
    expect(movedPath("/services/strategy-organization/executive-advisory")).toBe("/services/strategy-organization/executive-advisory-services");
    expect(movedPath("/services/x/a", { a: "b", b: "c" })).toBe("/services/x/c");
    expect(movedPath("/services/x/live", { a: "b" })).toBe("/services/x/live");
  });
  it("a rename and back leaves the live address alone", () => {
    let m = addMove({}, "smart-mobility", "smart-mobility-remove");
    m = addMove(m, "smart-mobility-remove", "smart-mobility");
    expect(m).toEqual({ "smart-mobility-remove": "smart-mobility" });
    expect(movedPath("/services/d/smart-mobility", m)).toBe("/services/d/smart-mobility");
  });
  it("older names lead to the newest", () => {
    const m = addMove(addMove({}, "a", "b"), "b", "c");
    expect(m).toEqual({ a: "c", b: "c" });
  });
});
