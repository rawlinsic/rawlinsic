/* v8 design. Colors: the 2025 Branding Guide palette (recorded in
   Rawlins Branding/BRAND-SOURCE-BRIEF.md) plus a glowing blue accent
   (Nicole, Nov 5). The five areas share one palette; each is told apart by
   its own diagram and photography. Text colors pass WCAG AA. */
import type { CSSProperties } from "react";
import { PAGE_PHOTO, SERVICE_PHOTO } from "@/lib/content/media";
import type { CaseIndex } from "@/lib/content/site";

export type DiagramKind = "loop" | "track" | "cycle" | "hub" | "ascent";
export type AreaTheme = { n: string; color: string; ink: string; tint: string; soft: string; diagram: DiagramKind };

export const BRAND = {
  navy: "#1D3759", logoNavy: "#203864", slate: "#4D688C", lightBlue: "#C4D8F2", paleBlue: "#DCE6F2", black: "#0D0D0D",
  glow: "#22D3EE", glowSoft: "#A5F3FC", glowInk: "#0E7490", deep: "#0E1A2B",
};
const area = (n: string, diagram: DiagramKind): AreaTheme => ({ n, color: BRAND.navy, ink: BRAND.navy, tint: BRAND.paleBlue, soft: BRAND.lightBlue, diagram });
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

/* A photo for each project card: a few chosen, then the state, then the first
   service. Photo rules (content updates v4, 9.1): U.S. places or no
   recognizable place; a case never shows a different city or state than the
   work; unnamed-client cases never show a state. */
const P = (f: string) => `/images/pages/${f}`;
const CASE_PHOTO: Record<string, string> = {
  "cs-pdn": P("auto-workflow.webp"),
  "cs-aero": P("engineersoperatingdrones.webp"),
  "cs-major": P("aam-team-meeting.webp"), // partnering; no U.S. river bridge photo in the library yet
  "cs-pbmc": P("transportation-aerial.webp"),
  "cs-nyc-parks": P("auto-optimize.webp"),
  "cs-proficiency": P("tnbig.webp"),
  "cs-transform": P("auto-human.webp"),
  "cs-txmaint": P("auto-optimize.webp"),
  "cs-riverside": P("strategy-bg.webp"),
  "cs-ia-partnering": P("aam-planning.webp"),
  "cs-workforce": P("auto-human.webp"),
  "cs-maint-model": P("transportation-aerial.webp"), // multi-state; its service photo (Nashville) would show the wrong place
  // private-sector projects: office and data photos with no place in them, one each so the cards differ
  "cs-pv-pmo": P("auto-capability.webp"),
  "cs-pv-reporting": P("auto-data.webp"),
  "cs-pv-service": P("auto-collab.webp"),
  "cs-pv-field": P("auto-workflow.webp"),
  "cs-pv-capacity": P("auto-dashboard.webp"),
};
const STATE_PHOTO: Record<string, string> = {
  Tennessee: P("tnbig.webp"), Louisiana: P("louisiana.webp"), Nevada: P("nv.webp"), Michigan: P("michigan.webp"),
  "North Carolina": P("nc.webp"), Utah: P("utah.webp"), Virginia: P("virginia.webp"), Delaware: P("delaware.webp"),
};
export const casePhoto = (c: CaseIndex) => CASE_PHOTO[c.id] ?? STATE_PHOTO[c.states[0]] ?? SERVICE_PHOTO[c.services[0]] ?? PAGE_PHOTO.cases;

/* How we've grown: live-site photos matched to each stage (first: Reno, where Rawlins started) */
export const STORY_PHOTO = [P("cs-hero-2.webp"), P("auto-human.webp"), P("aam-helicopter.webp"), P("auto-data.webp")];

/* Home: Featured projects, Rawlins work only (no Before Rawlins cases) */
export const FEATURED_CASES = ["cs-transform", "cs-pdn", "cs-proficiency", "cs-strategic", "cs-pbmc", "cs-local-am", "cs-major", "cs-aero", "cs-nc-ipd", "cs-ia-partnering"];
