/* v8 design: each area has its own color world and its own diagram, drawn
   from that area's "how the pieces fit" content. Text colors (ink) pass
   WCAG AA on white and on the area tint. No gold anywhere (Scott). */
import type { CSSProperties } from "react";
import { PAGE_PHOTO, SERVICE_PHOTO } from "@/lib/content/media";
import type { CaseIndex } from "@/lib/content/site";

export type DiagramKind = "loop" | "track" | "cycle" | "hub" | "ascent";
export type AreaTheme = { n: string; color: string; ink: string; tint: string; soft: string; diagram: DiagramKind };

export const THEME: Record<string, AreaTheme> = {
  strategy: { n: "01", color: "#5b54e8", ink: "#4338ca", tint: "#f2f1ff", soft: "#dddafe", diagram: "loop" },
  delivery: { n: "02", color: "#f26a2a", ink: "#c2410c", tint: "#fff4ed", soft: "#ffd8c2", diagram: "track" },
  om: { n: "03", color: "#18a06c", ink: "#0f7a52", tint: "#edf8f2", soft: "#c8eedb", diagram: "cycle" },
  tech: { n: "04", color: "#0ea5c6", ink: "#0e7490", tint: "#eaf8fb", soft: "#c3ebf4", diagram: "hub" },
  aviation: { n: "05", color: "#d63fa0", ink: "#a21c78", tint: "#fdf1f8", soft: "#f6cde6", diagram: "ascent" },
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
