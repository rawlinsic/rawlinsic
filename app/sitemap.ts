import type { MetadataRoute } from "next";
import { THOUGHT_LEADERSHIP } from "@/components/thought-leadership-data";
import { AREAS, CASES, VISIBLE_INDUSTRIES, areaHref, caseHref, industryHref, subsectorHref } from "@/lib/content/site";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rawlinsic.com";

/* Built from the content layer, so new pages appear here automatically.
   The hidden International page is never listed. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const u = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly") =>
    ({ url: `${SITE_URL}${path}`, lastModified: now, changeFrequency, priority });
  return [
    u("/", 1, "weekly"),
    ...AREAS.map((a) => u(areaHref(a), 0.9)),
    ...AREAS.flatMap((a) => a.services.map((s) => u(`/services/${a.slug}/${s.slug}`, 0.8))),
    u("/industries", 0.9), ...VISIBLE_INDUSTRIES.map((i) => u(industryHref(i), 0.8)),
    ...VISIBLE_INDUSTRIES.flatMap((i) => i.subsectors.map((s) => u(subsectorHref(i, s), 0.7))),
    u("/insights", 0.8, "weekly"), u("/insights/case-studies", 0.8), u("/insights/news", 0.7, "weekly"),
    u("/insights/thought-leadership", 0.7, "weekly"), u("/insights/research", 0.6), u("/insights/podcast", 0.6, "weekly"),
    ...CASES.map((c) => u(caseHref(c), 0.7)),
    ...THOUGHT_LEADERSHIP.map((a) => ({ url: `${SITE_URL}/insights/thought-leadership/${a.slug}`, lastModified: new Date(a.date || now), changeFrequency: "monthly" as const, priority: 0.7 })),
    u("/about", 0.7), u("/about/who-we-are", 0.7), u("/about/how-we-work", 0.6), u("/about/our-people", 0.8), u("/about/where-we-work", 0.6),
    u("/careers", 0.6), u("/contact", 0.6, "yearly"), u("/site-map", 0.3, "yearly"),
    u("/privacy-policy", 0.3, "yearly"), u("/terms-of-service", 0.3, "yearly"), u("/accessibility", 0.3, "yearly"),
  ];
}
