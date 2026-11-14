/* Nov 14: Paul's two saves that landed one letter off. The element is <li><span>07</span><div>sentence</div></li>: the
   page's text adds a line break between the number and the sentence that the text nodes don't have. */
import { describe, expect, it } from "vitest";
import { diff } from "@/lib/preview-edit-diff";

const snap = (nodes: string[]) => ({ full: nodes[0] + "\n" + nodes.slice(1).join(""), nodes, context: [] });

describe("preview edit: the changed text node", () => {
  it("inserts a word in the right place", () => {
    const s = snap(["07", "Developed curricula for a graduate engineers training program in about a dozen disciplines"]);
    const c = diff(s, "07\nDeveloped curricula for a graduate engineers training rotational program in about a dozen disciplines");
    expect(c.nodeNew).toBe("Developed curricula for a graduate engineers training rotational program in about a dozen disciplines");
  });
  it("replaces a word in the right place", () => {
    const s = snap(["07", "Built negotiation memo templates, rate analysis tools, and an active contract list to watch contract expirations"]);
    const c = diff(s, "07\nBuilt negotiation memo templates, rate analysis tools, and an active contract list to monitor contract expirations");
    expect(c.nodeNew).toBe("Built negotiation memo templates, rate analysis tools, and an active contract list to monitor contract expirations");
  });
  it("still works with no added line break", () => {
    const c = diff({ full: "Our services", nodes: ["Our services"], context: [] }, "Our full services");
    expect(c.nodeNew).toBe("Our full services");
  });
});
