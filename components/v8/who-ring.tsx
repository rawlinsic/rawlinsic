/* Who we work with: the ring of photos around "We work with" (the home page's section; Nicole, Nov 13: also on the
   Transportation Sector page). One component so the two stay the same. */
import Orbit, { type Tile } from "@/components/v8/orbit";
import { INDUSTRIES, industryHref, subsectorHref } from "@/lib/content/site";
import { INDUSTRY_PHOTO } from "@/lib/content/media";

export default function WhoRing() {
  /* the ring (Nicole's Operations & Maintenance file v8, Part 3, Nov 12): who we work with, the same groups as the menu, not
     what an agency runs. Eight photos, the same on the live site and on previews, with no notes. Spread so neighbors come
     from different groups. Federal Government, Local Governments, Aeronautics Organizations, and Growing Companies keep
     the photos of the tiles they replace (Multi-State & Federal Programs, Local Agencies, Aeronautics Divisions, Private
     Firms). Off the ring: Government & Public Agencies, Airports, Transit Agencies, Ports & Harbors, Cities, and
     Metropolitan Planning Organizations. */
  const ind = (id: string) => INDUSTRIES.find((i) => i.id === id)!;
  const subOf = (iid: string, sid: string) => ind(iid).subsectors.find((x) => x.id === sid)!;
  const tiles: Tile[] = [
    { src: INDUSTRY_PHOTO.transport, label: "State DOTs", href: industryHref(ind("transport")) },
    { src: INDUSTRY_PHOTO.contractors, label: "Contractors", href: industryHref(ind("contractors")) },
    { src: INDUSTRY_PHOTO["g-federal"], label: "Federal Government", href: industryHref(ind("fed")) }, // Nov 13: its own page
    { src: "/images/pages/aam-policy-planning.webp", label: "Aeronautics Organizations", href: subsectorHref(ind("transport"), subOf("transport", "sub-aviation")) },
    /* a photo already on the site (the Organizational Design page) and not on the ring */
    { src: "/images/pages/auto-human.webp", label: "Engineering & Consulting Firms", href: industryHref(ind("eng")) },
    { src: INDUSTRY_PHOTO["g-asset"], label: "Local Governments", href: industryHref(ind("local")) },
    { src: INDUSTRY_PHOTO.private, label: "Growing Companies", href: industryHref(ind("growth")) },
    { src: INDUSTRY_PHOTO.intl, label: "International Agencies", href: industryHref(ind("intl")) },
  ];

  return (
    <>
      {/* 4 · who we work with: a ring of photos around the headline */}
      {/* on phones the paragraph sits under the ring (after), where the photos don't cover it (Nov 12) */}
      <Orbit tiles={tiles} cta={<a className="v8-btn orb-cta" href="/industries">See who we work with</a>} after={<p className="orb-lead">Most of our work is with the public agencies that own and run transportation systems, more than 30 to date. We also work with the private sector: contractors, engineering and consulting firms, and growing companies. Our work so far is across the United States, and our team can do it anywhere.</p>}>
        {/* like scale.com (Nicole, Nov 10): "We work with" and a blue line that fills in with the photo you point at */}
        <h2 id="orb-h" className="orb-h">We work with<span className="orb-fill" data-default="Public Agencies & Private Firms">Public Agencies & Private Firms</span></h2>
        <p className="orb-lead">Most of our work is with the public agencies that own and run transportation systems, more than 30 to date. We also work with the private sector: contractors, engineering and consulting firms, and growing companies. Our work so far is across the United States, and our team can do it anywhere.</p>
      </Orbit>
    </>
  );
}
