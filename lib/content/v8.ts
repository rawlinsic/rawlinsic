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
  "cs-aero": P("research-paul-wheeler-nashville-symposium-2025.webp"), // Paul Wheeler at the Tennessee Drone and AAM Symposium, Nashville, Nov 12, 2025 (AERO Media folder)
  // the same photos the live site uses for these projects (Nicole, Nov 11: "all project pictures need to be the same they
  // were"). Both files were on the v4 never-use list (majortrans: road signs that don't look U.S.; transportation: place
  // unknown); kept because the live site shows them. Flagged on the CHANGE-LIST.
  "cs-major": P("majortrans.webp"),
  "cs-pa-budget": P("transportation.webp"),
  "cs-nyc-parks": P("transportation.webp"),
  "cs-proficiency": P("tnbig.webp"),
  "cs-riverside": P("transportation.webp"),
  "cs-maint-model": P("transportation.webp"), // live "Other states" photo
  // where the live site's state page puts two or three projects on one card photo, the second one uses that page's own
  // header photo, so each card differs and every photo is still the live site's (Nicole, Nov 11)
  "cs-tn-ipd": P("cs-hero-1.webp"), // live Tennessee page header: Nashville with a highway bridge
  "cs-nc-am": P("cs-hero-3.webp"), // live North Carolina page header: Charlotte
  "cs-strategic": P("cs-hero-2.webp"), // live Nevada page header: Reno
  // private-sector projects: office and data photos with no place in them, one each so the cards differ
  /* Projects that aren't on the live site: one photo each, chosen for the work, never shared (Nicole, Nov 11: "get new
     pictures for the projects that align"). U.S. places or no recognizable place; unnamed-client projects show no
     place; no logos. Stock under the Unsplash or Pexels license (free commercial use, no credit required). */
  "cs-pbmc": P("project-pbmc.webp"), // interstate through wooded hills, Tennessee (Chattanooga); Pexels, "K" (@kelly): pexels.com/photo/road-below-a-mountain-2495407
  "cs-txmaint": P("project-txmaint.webp"), // asphalt distributor sealing a rural highway, no place shown; Unsplash, Tom Shamberger: unsplash.com/photos/-KAoVUNv9W0
  "cs-drt": P("project-drt.webp"), // drone view of a street after a storm, no signs or landmarks; Pexels, "K" (@kelly): pexels.com/photo/4170459
  "cs-pmdiv": P("project-pmdiv.webp"), // team mapping a process with sticky notes; Unsplash, Vitaly Gariev: unsplash.com/photos/2kHqlCwj35E
  "cs-workforce": P("project-workforce.webp"), // rows of hard hats (staffing); Unsplash, Declan Sun: unsplash.com/photos/LutB1xxyArA
  "cs-aerodiv": P("project-aerodiv.webp"), // jet on the taxiway at a Nevada general-aviation airport (Reno); Unsplash, Simon Hurry: unsplash.com/photos/Rn0kG2LXRvo
  "cs-partnering": P("project-partnering.webp"), // two people in hard hats reviewing plans on a bridge deck; Pexels, Mikael Blomkvist: pexels.com/photo/8961133
  "cs-ia-partnering": P("project-ia-partnering.webp"), // people around a table taking notes; Unsplash, Dylan Gillis: unsplash.com/photos/KdeqA3aTnBY
  "cs-db-partnering": P("project-db-partnering.webp"), // interstate work zone and a new flyover; Unsplash, Oscar Madison: unsplash.com/photos/Jc9BPRYzJg4
  "cs-pooled": P("project-pooled.webp"), // camera drone in flight; Unsplash, Mitch Nielsen: unsplash.com/photos/pWtNPCpvVA8
  "cs-pdn": P("project-pdn.webp"), // professional working on a laptop with project folders; Pexels, Sora Shimazaki: pexels.com/photo/5668861
  "cs-tn-tech": P("project-tn-tech.webp"), // leadership briefing in front of a screen; Unsplash, Vitaly Gariev: unsplash.com/photos/dekx74fJUt4
  "cs-hi": P("project-hi.webp"), // hard hat on construction plan sheets; Pexels, Thirdman: pexels.com/photo/5583255
  "cs-pv-pmo": P("project-pv-pmo.webp"), // engineer and manager reviewing project charts; Pexels, ANTONI SHKRABA production: pexels.com/photo/8278915
  "cs-local-am": P("project-local-am.webp"), // local road through fall color, Michigan (Boyne Falls); Pexels, Aaron Burden: pexels.com/photo/9559194
  "cs-transform": P("project-transform.webp"), // divided highway through farmland at sunrise, no signs; Pexels, Tom Fisk: pexels.com/photo/9708012
  "cs-nv-fleet": P("project-nv-fleet.webp"), // snow clearing on a mountain highway, no markings; Unsplash, Tom Shamberger: unsplash.com/photos/7CffibpcnuI
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
/* 03: Aaron Organ, from our team, speaking at a 2026 symposium; 04: people working together at their computers */
/* How we've grown photos (Nicole, Nov 10): our team for agency expertise and advisory (her photos), Alicia in the
   air taxi cabin from the live site's Drones page for drones and air mobility, and a data dashboard for data and AI */
export const STORY_PHOTO = [P("team-group-indoor.webp"), P("team-group-outdoor.webp"), P("aam-services-portfolio.webp"), P("auto-data.webp")];
/* where to center each one in its wide frame */
export const STORY_PHOTO_POS = ["50% 55%", "50% 62%", "50% 26%", "50% 50%"];

/* Home: Featured projects, Rawlins work only (no Before Rawlins cases) */
export const FEATURED_CASES = ["cs-transform", "cs-pdn", "cs-proficiency", "cs-strategic", "cs-pbmc", "cs-local-am", "cs-major", "cs-aero", "cs-nc-ipd", "cs-ia-partnering"];

/* "Challenges we hear" where the quotes are problems; "What we hear" where one is a want or a plan
   ("We want drones in the field...", "We need a plan for...") (Nicole, Nov 10: only where it makes sense) */
export const hearTitle = (quotes: readonly string[]) =>
  quotes.some((q) => /^\W*we (want|need a plan|'d like)\b/i.test(q) || /[.”"]\s*[“"]?we (want|need a plan)\b/i.test(q)) ? "What we hear" : "Challenges we hear";
