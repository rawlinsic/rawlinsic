/* Nov 13 (Nicole): no project for an unnamed client (no state listed) shows a picture of a place. This lists any that do;
   the list must be empty. */
import { describe, expect, it } from "vitest";
import { CASES } from "@/lib/content/site";
import { casePhoto, isPlacePhoto } from "@/lib/content/v8";

describe("unnamed-client project pictures", () => {
  it("no unnamed-client project shows a place picture", () => {
    const bad = CASES.filter((c) => c.states.length === 0 && isPlacePhoto(casePhoto(c))).map((c) => `${c.id}: ${casePhoto(c)}`);
    expect(bad).toEqual([]);
  });
});
