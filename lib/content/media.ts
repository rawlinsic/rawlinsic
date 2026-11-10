/* Background media for every page (photo version). One place to swap images:
   these are the live site's own photos (already licensed), matched to each
   page's topic per the handoff shot list (6B). When new licensed media
   arrives, change the path here. The 3D version uses the same scene keys.
   Photo rules (content updates v4, 9.1 and 9.2): only U.S. places or photos
   with no recognizable place, no other company's logos, no computer-generated
   scenes of work we don't do. Never use: journey-foundation, journey-evolution,
   majortrans, cs-hero-8, cs-hero-7, aam-highway-aerial, aam-infrastructure,
   transportation, tl-hero, home-team-bg, home-hero-poster and the home-hero-loop
   videos, connectingdots, aam-hero, aam-implementation-scaling, aam-enable-system,
   aam-enable, aam-lifecycle-drone, aam-logistics, aam-city-aerial, aam-skyline,
   journey-frontier, aam-control-room, home-about, aam-deliver, hero-poster,
   aam-policy-planning. A repeat is better than a wrong photo. */
import type { SceneKey } from "@/lib/content/site";

const P = (f: string) => `/images/pages/${f}`;

/* Scene keys (shared with the 3D world) → photo */
export const SCENE_PHOTO: Record<SceneKey, string> = {
  hero: P("transportation-aerial.webp"),
  people: P("aam-community-engagement.webp"),
  grid: P("cs-hero-6.webp"),
  capitol: P("utah.webp"),
  construction: P("transportation-aerial.webp"),
  dusk: P("cs-hero-5.webp"), // Detroit at night
  network: P("auto-team.webp"),
  drone: P("skylimit.webp"),
  interchange: P("transportation-aerial.webp"),
  rural: P("nv.webp"),
  crossing: P("tnbig.webp"), // Nashville and its bridges
  airport: P("aam-phase3.webp"),
  rail: P("cs-hero-10.webp"), // placeholder: Philadelphia from the Ben Franklin Bridge
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
  delivery: P("transportation-aerial.webp"),
  om: P("cs-hero-1.webp"), // Nashville, with a highway bridge
  tech: P("technology-bg.webp"), // the live site's Technology photo (Nicole, Nov 9)
  aviation: P("aam-policy-planning.webp"), // Alicia in the field, from the live site (Nicole, Nov 9)
};

/* Service pages (shot list 6B) */
export const SERVICE_PHOTO: Record<string, string> = {
  "strategic-planning": P("strategy-bg.webp"),
  "org-design": P("auto-human.webp"),
  "change-mgmt": P("aam-regulatory-navigation.webp"),
  workforce: P("aam-reg-navigation.webp"), // a member of our team speaking at a symposium
  "exec-advisory": P("strategy-bg.webp"),
  "program-delivery": P("transportation-aerial.webp"),
  "owners-rep": P("transportation-aerial.webp"),
  "alt-delivery": P("aam-team-meeting.webp"),
  procurement: P("auto-optimize.webp"),
  row: P("nv.webp"),
  construction: P("transportation-aerial.webp"),
  lpa: P("michigan.webp"),
  grants: P("tnbig.webp"),
  "asset-mgmt": P("tnbig.webp"),
  operations: P("cs-hero-1.webp"),
  traffic: P("transportation-aerial.webp"),
  portals: P("auto-workflow.webp"),
  automation: P("auto-network.webp"),
  "data-governance": P("auto-parallax.webp"),
  ai: P("auto-ai.webp"),
  dashboards: P("auto-data.webp"),
  "training-video": P("auto-team.webp"),
  "tech-strategy": P("technology-bg.webp"),
  "smart-mobility": P("cs-hero-5.webp"),
  "drone-programs": P("engineersoperatingdrones.webp"),
  "drone-aam": P("aam-aerial-view.webp"), // a real drone in flight
  "drone-emergency": P("aam-enable-quadrocopter.webp"), // a real drone in flight
  research: P("aam-define.webp"), // airport line drawing (also the Research page)
  "aero-division": P("aam-phase3.webp"),
};

/* Industries and sub-sectors */
export const INDUSTRY_PHOTO: Record<string, string> = {
  transport: P("cs-hero-6.webp"), // Salt Lake City, so the ring doesn't show the same photo twice
  gov: P("nc.webp"), // Charlotte
  contractors: P("aam-team-meeting.webp"),
  private: P("auto-dashboard.webp"),
  intl: P("home-split-3.webp"),
  "sub-highways": P("transportation-aerial.webp"),
  "sub-bridges": P("tnbig.webp"),
  "sub-aviation": P("aam-phase3.webp"),
  "sub-rail": P("cs-hero-10.webp"), // placeholder; the tile is off the home ring
  "sub-ports": P("cs-hero-10.webp"),
  "g-asset": P("michigan.webp"), // the local agency work was in Michigan
  "g-capital": P("cs-hero-4.webp"),
  "g-mpo": P("cs-hero-9.webp"),
  "g-federal": P("aam-aerial-view.webp"), // fits the drone standards work
};

/* Other pages */
export const PAGE_PHOTO: Record<string, string> = {
  services: P("transportation-aerial.webp"),
  industries: P("cs-hero-4.webp"),
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
  contact: P("cs-hero-2.webp"), // Reno, where our office is
  notFound: P("nv.webp"),
};

/* Home closing section: a still photo (the old hero video is no longer used;
   a licensed U.S. clip or an approved abstract loop can replace it later) */
export const HOME_CLOSING_PHOTO = P("cs-hero-5.webp");
/* Old home (journey) only: one photo per scene */
export const STATION_PHOTO: Record<string, string> = {
  hero0: P("transportation-aerial.webp"), hero1: P("transportation-aerial.webp"),
  people0: P("aam-community-engagement.webp"), people1: P("aam-community-engagement.webp"),
  grid0: P("cs-hero-6.webp"), grid1: P("cs-hero-6.webp"),
  capitol: AREA_PHOTO.strategy, construction: AREA_PHOTO.delivery, dusk: AREA_PHOTO.om, network: AREA_PHOTO.tech, drone: AREA_PHOTO.aviation,
  rural: INDUSTRY_PHOTO["sub-highways"], crossing: INDUSTRY_PHOTO["sub-bridges"], airport: INDUSTRY_PHOTO["sub-aviation"], rail: INDUSTRY_PHOTO["sub-rail"],
  harbor: INDUSTRY_PHOTO["sub-ports"], street: INDUSTRY_PHOTO.gov, site: INDUSTRY_PHOTO.contractors, office: INDUSTRY_PHOTO.private,
  map0: "map", map1: "map",
  rise0: P("cs-hero-2.webp"), rise1: P("cs-hero-5.webp"), rise2: P("aam-helicopter.webp"), rise3: P("journey-innovation.webp"),
  globe0: P("home-split-3.webp"), globe1: P("home-split-3.webp"),
};
