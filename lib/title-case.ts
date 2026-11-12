/* Title case for navigation labels (Nicole, Nov 11: "all the nav menus need to have appropriate words
   capitalized"). Capitalizes each word's first letter and leaves small words (a, and, of, to, with...) lowercase
   unless they start or end the label or follow a colon or question mark. Never lowercases anything else, so
   names and acronyms (AI, DOT, PMO) keep their capitals. */
const SMALL = new Set(["a", "an", "and", "as", "at", "but", "by", "for", "from", "in", "into", "nor", "of", "on", "or", "per", "the", "to", "via", "vs", "with", "&"]);
const cap = (w: string) => w.split("-").map((p) => p.replace(/^([^A-Za-z]*)([a-z])/, (_m, pre: string, c: string) => pre + c.toUpperCase())).join("-");

export function tc(s: string): string {
  const words = s.split(" ");
  return words.map((w, i) => {
    const bare = w.toLowerCase().replace(/[^a-z&]/g, "");
    const edge = i === 0 || i === words.length - 1 || /[:?!]$/.test(words[i - 1] ?? "");
    if (!edge && SMALL.has(bare)) return w.toLowerCase();
    return cap(w);
  }).join(" ");
}
