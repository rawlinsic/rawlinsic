/* v8 design, brand palette (Nicole, Nov 5): blues, silver and greys, black,
   with a glowing aqua accent. The five areas share one palette; each is told
   apart by its own diagram and photography. Text colors pass WCAG AA. */
import type { CSSProperties } from "react";
import { PAGE_PHOTO, SERVICE_PHOTO } from "@/lib/content/media";
import type { CaseIndex } from "@/lib/content/site";

export type DiagramKind = "loop" | "track" | "cycle" | "hub" | "ascent";
export type AreaTheme = { n: string; color: string; ink: string; tint: string; soft: string; diagram: DiagramKind };

export const BRAND = {
  black: "#0a1220", deep: "#08111f", navy: "#1a3251", blue: "#1b5ccc", steel: "#4b6280",
  silver: "#c9d2dd", silver2: "#e8edf3", paper: "#f5f7fa", aqua: "#22d3ee", aquaSoft: "#a5f3fc", aquaInk: "#0e7490",
};
const area = (n: string, diagram: DiagramKind): AreaTheme => ({ n, color: BRAND.blue, ink: BRAND.blue, tint: "#eef3fb", soft: "#cfdcf0", diagram });
export const THEME: Record<string, AreaTheme> = {
  strategy: area("01", "loop"),
  delivery: area("02", "track"),
  om: area("03", "cycle"),
  tech: area("04", "hub"),
  aviation: area("05", "ascent"),
};

export const themeStyle = (areaId: string): CSSProperties => {
  const t = THEME[areaId];
  return { ["--a" as string]: t.color, ["--a-ink" as string]: t.ink, ["--a-tint" as string]: t.tint, ["--a-soft" as string]: t.soft };
};

/* A photo for each project card: a few chosen, then the state, then the first service */
const P = (f: string) => `/images/pages/${f}`;
const CASE_PHOTO: Record<string, string> = {
  "cs-pdn": P("auto-workflow.webp"),
  "cs-aero": P("engineersoperatingdrones.webp"),
  "cs-major": P("cs-hero-8.webp"),
  "cs-pbmc": P("majortrans.webp"),
  "cs-nyc-parks": P("cs-hero-9.webp"),
  "cs-proficiency": P("tnbig.webp"),
  "cs-transform": P("louisiana.webp"),
  "cs-txmaint": P("aam-highway-aerial.webp"),
  "cs-mi-pbo": P("transportation.webp"),
  "cs-riverside": P("cs-hero-3.webp"),
};
const STATE_PHOTO: Record<string, string> = {
  Tennessee: P("tnbig.webp"), Louisiana: P("louisiana.webp"), Nevada: P("nv.webp"), Michigan: P("michigan.webp"),
  "North Carolina": P("nc.webp"), Utah: P("utah.webp"), Virginia: P("virginia.webp"), Delaware: P("delaware.webp"),
};
export const casePhoto = (c: CaseIndex) => CASE_PHOTO[c.id] ?? STATE_PHOTO[c.states[0]] ?? SERVICE_PHOTO[c.services[0]] ?? PAGE_PHOTO.cases;

/* How we've grown: live-site photos matched to each stage */
export const STORY_PHOTO = [P("journey-foundation.webp"), P("auto-human.webp"), P("aam-helicopter.webp"), P("auto-data.webp")];

/* Home: projects to feature (production drops any that still need sign-off) */
export const FEATURED_CASES = ["cs-transform", "cs-pdn", "cs-proficiency", "cs-strategic", "cs-pbmc", "cs-local-am", "cs-major", "cs-aero", "cs-nyc-parks", "cs-ut-am"];
