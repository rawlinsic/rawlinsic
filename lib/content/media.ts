/* Background media for every page (photo version). One place to swap images:
   these are the live site's own photos (already licensed), matched to each
   page's topic per the handoff shot list (6B). When new licensed media
   arrives, change the path here. The 3D version uses the same scene keys. */
import type { SceneKey } from "@/lib/content/site";

const P = (f: string) => `/images/pages/${f}`;

/* Scene keys (shared with the 3D world) → photo */
export const SCENE_PHOTO: Record<SceneKey, string> = {
  hero: P("home-hero-poster.webp"),
  people: P("aam-community-engagement.webp"),
  grid: P("cs-hero-6.webp"),
  capitol: P("utah.webp"),
  construction: P("connectingdots.webp"),
  dusk: P("journey-evolution.webp"),
  network: P("home-team-bg.webp"),
  drone: P("skylimit.webp"),
  interchange: P("transportation-aerial.webp"),
  rural: P("cs-hero-7.webp"),
  crossing: P("journey-foundation.webp"),
  airport: P("aam-phase3.webp"),
  rail: P("aam-hero.webp"),
  harbor: P("cs-hero-10.webp"), // mood placeholder until a harbor photo is licensed
  street: P("michigan.webp"),
  site: P("aam-planning.webp"),
  office: P("auto-dashboard.webp"),
  map: P("tnbig.webp"),
  rise: P("aam-helicopter.webp"),
  sky: P("aam-helicopter.webp"),
  globe: P("home-split-3.webp"),
};

/* Heading pages */
export const AREA_PHOTO: Record<string, string> = {
  strategy: P("strategy-bg.webp"),
  delivery: P("connectingdots.webp"),
  om: P("aam-implementation-scaling.webp"), // U.S. bridge inspection crew (content fixes v1, section 7); was majortrans.webp
  tech: P("auto-team.webp"),
  aviation: P("skylimit.webp"),
};

/* Service pages (shot list 6B) */
export const SERVICE_PHOTO: Record<string, string> = {
  "strategic-planning": P("aam-highway-aerial.webp"),
  "org-design": P("auto-human.webp"),
  "change-mgmt": P("aam-regulatory-navigation.webp"),
  workforce: P("aam-enable.webp"),
  "exec-advisory": P("strategy-bg.webp"),
  "program-delivery": P("transportation-aerial.webp"),
  "owners-rep": P("aam-enable-system.webp"),
  "alt-delivery": P("aam-team-meeting.webp"),
  procurement: P("auto-optimize.webp"),
  row: P("cs-hero-7.webp"),
  construction: P("cs-hero-8.webp"),
  lpa: P("michigan.webp"),
  grants: P("tnbig.webp"),
  "asset-mgmt": P("aam-implementation-scaling.webp"),
  operations: P("majortrans.webp"),
  traffic: P("aam-infrastructure.webp"),
  portals: P("auto-workflow.webp"),
  automation: P("auto-network.webp"),
  "data-governance": P("auto-parallax.webp"),
  ai: P("auto-ai.webp"),
  dashboards: P("auto-data.webp"),
  "training-video": P("auto-team.webp"),
  "tech-strategy": P("technology-bg.webp"),
  "smart-mobility": P("aam-hero.webp"),
  "drone-programs": P("engineersoperatingdrones.webp"),
  "drone-aam": P("aam-city-aerial.webp"),
  "drone-emergency": P("aam-logistics.webp"),
  research: P("aam-lifecycle-drone.webp"),
  "aero-division": P("aam-phase3.webp"),
};

/* Industries and sub-sectors */
export const INDUSTRY_PHOTO: Record<string, string> = {
  transport: P("transportation-aerial.webp"),
  gov: P("michigan.webp"),
  contractors: P("aam-planning.webp"),
  private: P("auto-dashboard.webp"),
  intl: P("home-split-3.webp"),
  "sub-highways": P("transportation.webp"),
  "sub-bridges": P("journey-foundation.webp"),
  "sub-aviation": P("aam-phase3.webp"),
  "sub-rail": P("aam-hero.webp"),
  "sub-ports": P("cs-hero-10.webp"),
  "g-asset": P("virginia.webp"),
  "g-capital": P("cs-hero-4.webp"),
  "g-mpo": P("cs-hero-9.webp"),
  "g-federal": P("cs-hero-2.webp"),
};

/* Other pages */
export const PAGE_PHOTO: Record<string, string> = {
  services: P("aam-highway-aerial.webp"),
  industries: P("tl-hero.webp"),
  cases: P("tnbig.webp"),
  about: P("aam-community-engagement.webp"),
  who: P("aam-community-engagement.webp"),
  how: P("auto-human.webp"),
  insights: P("insights-hero.webp"),
  news: P("aam-reg-navigation.webp"),
  research: P("aam-define.webp"),
  thought: P("home-tl-bg.webp"),
  podcast: P("insights-card-3.webp"),
  careers: P("auto-collab.webp"),
  contact: P("cs-hero-3.webp"),
  notFound: P("cs-hero-7.webp"),
};

/* Home: the live site's hero video, then one photo per scene */
export const HOME_VIDEO = { mp4: "/videos/home-hero-loop.mp4", webm: "/videos/home-hero-loop.webm", poster: P("home-hero-poster.webp") };
export const STATION_PHOTO: Record<string, string> = {
  hero0: P("home-hero-poster.webp"), hero1: P("home-hero-poster.webp"),
  people0: P("aam-community-engagement.webp"), people1: P("aam-community-engagement.webp"),
  grid0: P("cs-hero-6.webp"), grid1: P("cs-hero-6.webp"),
  capitol: AREA_PHOTO.strategy, construction: AREA_PHOTO.delivery, dusk: AREA_PHOTO.om, network: AREA_PHOTO.tech, drone: AREA_PHOTO.aviation,
  rural: INDUSTRY_PHOTO["sub-highways"], crossing: INDUSTRY_PHOTO["sub-bridges"], airport: INDUSTRY_PHOTO["sub-aviation"], rail: INDUSTRY_PHOTO["sub-rail"],
  harbor: INDUSTRY_PHOTO["sub-ports"], street: INDUSTRY_PHOTO.gov, site: INDUSTRY_PHOTO.contractors, office: INDUSTRY_PHOTO.private,
  map0: "map", map1: "map",
  rise0: P("journey-foundation.webp"), rise1: P("journey-evolution.webp"), rise2: P("aam-helicopter.webp"), rise3: P("journey-innovation.webp"),
  globe0: P("home-split-3.webp"), globe1: P("home-split-3.webp"),
};
