import { NextResponse } from "next/server";

/**
 * Dynamic QR code redirect.
 *
 * Any printed QR code should point at `https://rawlinsic.com/rc/<slug>`.
 * This route looks up the slug in the map below and issues a 302 redirect.
 * To change where an existing printed QR points, update the slug's target
 * here and redeploy — the printed code does NOT need to be regenerated.
 *
 * Examples you can use on printed materials right now:
 *   /rc/home       →  homepage (current default landing)
 *   /rc/contact    →  contact form
 *   /rc/podcast    →  podcast landing
 *   /rc/case       →  case studies landing
 *
 * Add a new slug here and it's live on next deploy.
 */
const REDIRECTS: Record<string, string> = {
  home: "/",
  contact: "/contact",
  careers: "/careers",
  about: "/about/our-people",
  people: "/about/our-people",
  insights: "/insights",
  articles: "/insights/thought-leadership",
  podcast: "/insights/podcast",
  case: "/insights/case-studies",
  "case-studies": "/insights/case-studies",
  /* straight to the redesigned pages, so a scan lands in one step (service pages scrub, 6.1).
     The old Operations section covered what is now Project Delivery and Operations &
     Maintenance; it goes to Operations & Maintenance by name. */
  capabilities: "/services",
  services: "/services",
  strategy: "/services/strategy-organization",
  operations: "/services/maintenance-operations",
  technology: "/services/digital-solutions",
  aam: "/services/drones-advanced-air-mobility",
  uas: "/services/drones-advanced-air-mobility",
  automation: "/services/digital-solutions/integration-automation",
  ai: "/services/digital-solutions/integration-automation",
};

const FALLBACK = "/";

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const key = (slug || "").toLowerCase().trim();
  const target = REDIRECTS[key] || FALLBACK;

  // Use 302 (temporary) so browsers/caches don't lock in the redirect,
  // and we keep the option to change the target later.
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rawlinsic.com";
  return NextResponse.redirect(new URL(target, siteUrl), { status: 302 });
}
