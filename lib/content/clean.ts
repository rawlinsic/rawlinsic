/* The company is just "Rawlins". A few roster bios still use old names; this
   keeps them off every page until the bios themselves are updated. */
const RULES: [RegExp, string][] = [
  [/Rawlins Automation (?:&|and) Integration Division \(RAID\)/g, "the Rawlins automation and AI team"],
  [/\bbuilt RAID into\b/g, "built the automation and AI team into"],
  [/\bRIC['’]s\b/g, "Rawlins'"],
  [/\bRIC\b/g, "Rawlins"],
  [/\bRAID\b/g, "the automation and AI team"],
  [/\bAERO\b/g, "aviation"],
  [/Rawlins Infra Consult(?:, LLC)?/g, "Rawlins"],
];
export const cleanNames = (s: string) => RULES.reduce((t, [r, v]) => t.replace(r, v), s ?? "");
