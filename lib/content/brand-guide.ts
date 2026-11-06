/* Brand guide (/brand): color options for review.
   Today's values come from BRAND in lib/content/v8.ts (the 2025 Branding
   Guide palette plus the site's aqua glow). Whatever system and accent are
   picked go back into BRAND, so the site and this guide change in one place.
   CMYK: converted from sRGB with the U.S. Web Coated (SWOP) v2 profile
   (Adobe's North America default), relative colorimetric, on Nov 5, 2026.
   They are starting values: confirm with a print proof before a print run. */
import { BRAND } from "@/lib/content/v8";

export type CMYK = readonly [number, number, number, number];

const CMYK_TABLE: Record<string, CMYK> = {
  "#1D3759": [100, 83, 36, 45], "#4D688C": [82, 61, 27, 7], "#C4D8F2": [22, 8, 0, 0], "#DCE6F2": [13, 5, 1, 0],
  "#0D0D0D": [75, 68, 65, 90], "#203864": [100, 87, 32, 35], "#22D3EE": [64, 0, 9, 0], "#A5F3FC": [30, 0, 5, 0],
  "#0E7490": [95, 46, 32, 7], "#0E1A2B": [82, 71, 60, 82], "#0F1F35": [85, 73, 59, 78], "#2E6BC6": [87, 62, 0, 0],
  "#0F1B2D": [82, 72, 60, 81], "#4A5A70": [81, 65, 39, 22], "#D3DDEA": [16, 8, 3, 0], "#FFFFFF": [0, 0, 0, 0],
  "#EEF3F9": [5, 2, 0, 0], "#0E2240": [88, 76, 53, 74], "#081528": [81, 71, 60, 83], "#1F5BD8": [89, 70, 0, 0],
  "#3B5E8C": [92, 71, 22, 6], "#B7CCF5": [27, 14, 0, 0], "#0A1424": [80, 70, 60, 84], "#44536A": [84, 69, 40, 26],
  "#CED8E6": [18, 10, 4, 0], "#F2F5FA": [4, 2, 0, 0], "#E1E8F3": [11, 5, 1, 0], "#1F6FD6": [86, 59, 0, 0],
  "#16315A": [100, 84, 32, 49], "#5AA7F0": [61, 25, 0, 0], "#3E5F8A": [90, 69, 24, 7], "#A9D2FA": [31, 9, 0, 0],
  "#13213A": [86, 75, 57, 77], "#4B5D75": [81, 64, 37, 19], "#D6E2F0": [15, 6, 1, 0], "#F4F9FF": [3, 0, 0, 0],
  "#E3F0FD": [10, 2, 0, 0], "#1B2E45": [95, 77, 46, 66], "#0D1724": [80, 70, 60, 84], "#2F5F98": [96, 71, 14, 2],
  "#5F7793": [72, 51, 29, 5], "#C9D5E3": [20, 10, 4, 0], "#111A26": [80, 70, 60, 84], "#505E6F": [77, 61, 42, 22],
  "#D9E0E8": [14, 7, 4, 0], "#F5F7FA": [3, 1, 0, 0], "#E6EBF1": [9, 4, 2, 0], "#4C9AFF": [66, 37, 0, 0],
  "#BCD8FF": [24, 8, 0, 0], "#1D5FC9": [91, 69, 0, 0], "#9B8AFF": [49, 49, 0, 0], "#D6D0FF": [14, 17, 0, 0],
  "#5B47D6": [79, 78, 0, 0], "#34E0A1": [64, 0, 56, 0], "#B4F5DC": [28, 0, 20, 0], "#047857": [96, 29, 83, 18],
  "#FF7A45": [0, 67, 83, 0], "#FFD2BF": [0, 21, 21, 0], "#C2410C": [17, 91, 100, 10],
};

export const cmyk = (hex: string): CMYK | undefined => CMYK_TABLE[hex.toUpperCase()];
export const rgb = (hex: string): [number, number, number] => {
  const h = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) as [number, number, number];
};
const lum = (hex: string) => {
  const [r, g, b] = rgb(hex).map((v) => v / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
/* WCAG 2.2 contrast ratio */
export const contrast = (a: string, b: string) => {
  const x = lum(a), y = lum(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};
export type Level = "AAA" | "AA" | "AA large" | "Fail";
export const level = (ratio: number): Level => (ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : ratio >= 3 ? "AA large" : "Fail");

export type Swatch = { name: string; hex: string; job: string; kept?: boolean };

/* Today: 2025 Branding Guide + what the site adds */
export const TODAY: { guide: Swatch[]; site: Swatch[] } = {
  guide: [
    { name: "Navy", hex: BRAND.navy, job: "Headings, logo, dark panels" },
    { name: "Slate Blue", hex: BRAND.slate, job: "Secondary text, accents" },
    { name: "Light Blue", hex: BRAND.lightBlue, job: "Panels, lines" },
    { name: "Pale Blue", hex: BRAND.paleBlue, job: "Backgrounds" },
    { name: "Black", hex: BRAND.black, job: "Body text" },
  ],
  site: [
    { name: "Logo navy", hex: BRAND.logoNavy, job: "In the logo files" },
    { name: "Aqua glow", hex: BRAND.glow, job: "Glowing lines, nodes" },
    { name: "Aqua soft", hex: BRAND.glowSoft, job: "Glow highlights" },
    { name: "Aqua ink", hex: BRAND.glowInk, job: "Aqua text on light" },
  ],
};

/* Every system fills the same jobs, so any of them drops into the site tokens */
export type Theme = {
  primary: string; deep: string; secondary: string; support: string; light: string;
  ink: string; body: string; rule: string; paper: string; tint: string; pale: string;
};
export type BlueSystem = {
  id: "A" | "B" | "C" | "D"; name: string; line: string; changes: string[];
  primary: Swatch[]; secondary: Swatch[]; neutrals: Swatch[]; surfaces: Swatch[]; theme: Theme;
};

const sys = (s: Omit<BlueSystem, "theme">): BlueSystem => {
  const [primary, deep] = s.primary, [secondary, support, light] = s.secondary, [ink, body, rule] = s.neutrals, [paper, tint, pale] = s.surfaces;
  return { ...s, theme: { primary: primary.hex, deep: deep.hex, secondary: secondary.hex, support: support.hex, light: light.hex, ink: ink.hex, body: body.hex, rule: rule.hex, paper: paper.hex, tint: tint.hex, pale: pale.hex } };
};
const WHITE: Swatch = { name: "White", hex: "#FFFFFF", job: "Page" };

export const SYSTEMS: BlueSystem[] = [
  sys({
    id: "A", name: "Refined Navy", line: "Closest to today. Keeps the navy everyone knows and fills the gaps.",
    changes: ["One navy (logo and site match)", "Adds a true middle blue", "Blue-black text, not pure black", "Ice surface for long pages"],
    primary: [
      { name: "Rawlins Navy", hex: "#1D3759", job: "Logo, headings, dark panels", kept: true },
      { name: "Midnight", hex: "#0F1F35", job: "Dark stages behind glow" },
    ],
    secondary: [
      { name: "Signal Blue", hex: "#2E6BC6", job: "Links, buttons, charts" },
      { name: "Slate Blue", hex: "#4D688C", job: "Labels, icons", kept: true },
      { name: "Light Blue", hex: "#C4D8F2", job: "Lines, text on dark", kept: true },
    ],
    neutrals: [
      { name: "Blue Black", hex: "#0F1B2D", job: "Body text" },
      { name: "Gray Blue", hex: "#4A5A70", job: "Captions, notes" },
      { name: "Rule", hex: "#D3DDEA", job: "Borders, dividers" },
    ],
    surfaces: [WHITE, { name: "Ice", hex: "#EEF3F9", job: "Alternate sections" }, { name: "Pale Blue", hex: "#DCE6F2", job: "Cards, panels", kept: true }],
  }),
  sys({
    id: "B", name: "Deep Cobalt", line: "Darker and richer. A near-black navy with a strong cobalt.",
    changes: ["Navy goes deeper", "Cobalt does the work", "More contrast everywhere", "Feels premium, a bit corporate"],
    primary: [
      { name: "Deep Navy", hex: "#0E2240", job: "Logo, headings, dark panels" },
      { name: "Abyss", hex: "#081528", job: "Dark stages behind glow" },
    ],
    secondary: [
      { name: "Cobalt", hex: "#1F5BD8", job: "Links, buttons, charts" },
      { name: "Harbor Blue", hex: "#3B5E8C", job: "Labels, icons" },
      { name: "Cornflower", hex: "#B7CCF5", job: "Lines, text on dark" },
    ],
    neutrals: [
      { name: "Night Ink", hex: "#0A1424", job: "Body text" },
      { name: "Storm Gray", hex: "#44536A", job: "Captions, notes" },
      { name: "Rule", hex: "#CED8E6", job: "Borders, dividers" },
    ],
    surfaces: [WHITE, { name: "Frost", hex: "#F2F5FA", job: "Alternate sections" }, { name: "Mist", hex: "#E1E8F3", job: "Cards, panels" }],
  }),
  sys({
    id: "C", name: "Open Sky", line: "Lighter and brighter. A clear azure leads; navy holds the type.",
    changes: ["Bright azure leads", "Navy moves to type and footers", "Sky wash surfaces", "Most open and modern"],
    primary: [
      { name: "Azure", hex: "#1F6FD6", job: "Buttons, highlights, big shapes" },
      { name: "Navy", hex: "#16315A", job: "Headings, dark stages" },
    ],
    secondary: [
      { name: "Sky", hex: "#5AA7F0", job: "Charts, fills (not text)" },
      { name: "Harbor", hex: "#3E5F8A", job: "Labels, icons" },
      { name: "Cloud Blue", hex: "#A9D2FA", job: "Lines, text on dark" },
    ],
    neutrals: [
      { name: "Ink", hex: "#13213A", job: "Body text" },
      { name: "Slate Gray", hex: "#4B5D75", job: "Captions, notes" },
      { name: "Rule", hex: "#D6E2F0", job: "Borders, dividers" },
    ],
    surfaces: [WHITE, { name: "Air", hex: "#F4F9FF", job: "Alternate sections" }, { name: "Sky Wash", hex: "#E3F0FD", job: "Cards, panels" }],
  }),
  sys({
    id: "D", name: "Blueprint Steel", line: "Cool and engineered. Grayer blues; the accent does the talking.",
    changes: ["Steel navy, less saturated", "Blueprint blue for links", "Gray-blue neutrals", "Quietest; accent stands out most"],
    primary: [
      { name: "Steel Navy", hex: "#1B2E45", job: "Logo, headings, dark panels" },
      { name: "Graphite", hex: "#0D1724", job: "Dark stages behind glow" },
    ],
    secondary: [
      { name: "Blueprint", hex: "#2F5F98", job: "Links, buttons, charts" },
      { name: "Steel", hex: "#5F7793", job: "Labels, icons" },
      { name: "Haze", hex: "#C9D5E3", job: "Lines, text on dark" },
    ],
    neutrals: [
      { name: "Ink", hex: "#111A26", job: "Body text" },
      { name: "Iron Gray", hex: "#505E6F", job: "Captions, notes" },
      { name: "Rule", hex: "#D9E0E8", job: "Borders, dividers" },
    ],
    surfaces: [WHITE, { name: "Paper", hex: "#F5F7FA", job: "Alternate sections" }, { name: "Fog", hex: "#E6EBF1", job: "Cards, panels" }],
  }),
];

export type Accent = { id: string; n: string; name: string; line: string; why: string; glow: Swatch; soft: Swatch; ink: Swatch };
export const ACCENTS: Accent[] = [
  {
    id: "aqua", n: "1", name: "Aqua Glow", line: "On the site today", why: "Reads as light and technology on navy. Already built.",
    glow: { name: "Aqua", hex: BRAND.glow, job: "Glow lines, nodes, rules" }, soft: { name: "Aqua Soft", hex: BRAND.glowSoft, job: "Highlights on dark" }, ink: { name: "Aqua Ink", hex: BRAND.glowInk, job: "Accent text on light" },
  },
  {
    id: "electric", n: "2", name: "Electric Blue", line: "Stays all blue", why: "The most on-brand: blue on blue, only brighter.",
    glow: { name: "Electric", hex: "#4C9AFF", job: "Glow lines, nodes, rules" }, soft: { name: "Electric Soft", hex: "#BCD8FF", job: "Highlights on dark" }, ink: { name: "Electric Ink", hex: "#1D5FC9", job: "Accent text on light" },
  },
  {
    id: "violet", n: "3", name: "Indigo Violet", line: "Jacob's idea, Sep 24", why: "Cool, distinct, and uncommon in our industry.",
    glow: { name: "Violet", hex: "#9B8AFF", job: "Glow lines, nodes, rules" }, soft: { name: "Violet Soft", hex: "#D6D0FF", job: "Highlights on dark" }, ink: { name: "Violet Ink", hex: "#5B47D6", job: "Accent text on light" },
  },
  {
    id: "mint", n: "4", name: "Signal Mint", line: "Green light", why: "Reads as go and progress. Fresh against navy.",
    glow: { name: "Mint", hex: "#34E0A1", job: "Glow lines, nodes, rules" }, soft: { name: "Mint Soft", hex: "#B4F5DC", job: "Highlights on dark" }, ink: { name: "Mint Ink", hex: "#047857", job: "Accent text on light" },
  },
  {
    id: "orange", n: "5", name: "Signal Orange", line: "Work-zone orange", why: "Most pop against blue. Warm, but not gold.",
    glow: { name: "Orange", hex: "#FF7A45", job: "Glow lines, nodes, rules" }, soft: { name: "Orange Soft", hex: "#FFD2BF", job: "Highlights on dark" }, ink: { name: "Orange Ink", hex: "#C2410C", job: "Accent text on light" },
  },
];

export const systemById = (id: string) => SYSTEMS.find((s) => s.id === id) ?? SYSTEMS[0];
export const accentById = (id: string) => ACCENTS.find((a) => a.id === id) ?? ACCENTS[0];

/* CSS variables for the sample layouts */
export const mockVars = (s: BlueSystem, a: Accent): Record<string, string> => ({
  "--p": s.theme.primary, "--dp": s.theme.deep, "--s2": s.theme.secondary, "--sp": s.theme.support, "--lt": s.theme.light,
  "--ink": s.theme.ink, "--body": s.theme.body, "--rule": s.theme.rule, "--paper": s.theme.paper, "--tint": s.theme.tint, "--pale": s.theme.pale,
  "--g": a.glow.hex, "--gs": a.soft.hex, "--gi": a.ink.hex,
});

/* The pairs every system is checked on (text on background) */
export const SYSTEM_PAIRS: { label: string; fg: keyof Theme; bg: keyof Theme }[] = [
  { label: "Body text on white", fg: "ink", bg: "paper" },
  { label: "Captions on white", fg: "body", bg: "paper" },
  { label: "Captions on panel", fg: "body", bg: "pale" },
  { label: "Headings on white", fg: "primary", bg: "paper" },
  { label: "Middle blue as text", fg: "secondary", bg: "paper" },
  { label: "Labels on white", fg: "support", bg: "paper" },
  { label: "White on primary", fg: "paper", bg: "primary" },
  { label: "Light blue on dark stage", fg: "light", bg: "deep" },
];

/* Guide sections, in order (ready = built in this draft) */
export const BRAND_SECTIONS = [
  { num: "00", name: "Overview", ready: true }, { num: "01", name: "Who we are", ready: true }, { num: "02", name: "Color", ready: true },
  { num: "03", name: "Logo", ready: true }, { num: "04", name: "Typography", ready: true }, { num: "05", name: "Graphic language", ready: true },
  { num: "06", name: "Photography", ready: true }, { num: "07", name: "Voice and tone", ready: true }, { num: "08", name: "Templates", ready: true },
];

/* Recommended pick (shown on the decision slide; Nicole decides) */
export const PICK = { system: "A", accent: "aqua" } as const;

/* Wordmark typeface options and where each works. Checked live on Nov 5,
   2026 (sources in Rawlins Branding/brand-guide-2026-11-05/font-availability
   check): Microsoft's cloud-fonts list, fonts.adobe.com, Google Fonts' OFL
   metadata. Canva's built-in library is only visible signed in to the
   editor, so it is not checked yet. Custom upload: Canva Pro/Teams. */
export type Avail = { ok: "yes" | "no" | "part"; label: string };
export type WordmarkFont = { name: string; cssVar: string; note?: string; office: Avail; canva: Avail; adobe: Avail };
const install: Avail = { ok: "part", label: "Install + embed" };
const canvaTbd: Avail = { ok: "part", label: "Not checked yet" };
const adobeYes: Avail = { ok: "yes", label: "Yes (Adobe Fonts)" };
export const WORDMARK_FONTS: WordmarkFont[] = [
  { name: "Source Sans 3", cssVar: "var(--font-sans)", note: "the site's font", office: { ok: "yes", label: "Yes, as Source Sans Pro" }, canva: canvaTbd, adobe: adobeYes },
  { name: "Montserrat", cssVar: "var(--f-montserrat)", office: install, canva: canvaTbd, adobe: adobeYes },
  { name: "Outfit", cssVar: "var(--f-outfit)", office: install, canva: canvaTbd, adobe: adobeYes },
  { name: "Figtree", cssVar: "var(--f-figtree)", office: install, canva: canvaTbd, adobe: adobeYes },
  { name: "Inter", cssVar: "var(--f-inter)", office: install, canva: canvaTbd, adobe: adobeYes },
  { name: "IBM Plex Sans", cssVar: "var(--f-plex)", office: install, canva: canvaTbd, adobe: adobeYes },
];
