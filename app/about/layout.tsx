/* About pages. On Jacob's preview (any branch named for him) the About menu stays in the
   header, but the pages themselves aren't shown (Nicole, Nov 10). Everyone else sees them. */
import type { ReactNode } from "react";
import { aboutClosed } from "@/lib/preview-gh";
import { Hero, Shell } from "@/components/site/ui";
import { PAGE_PHOTO } from "@/lib/content/media";

export default function AboutLayout({ children }: { children: ReactNode }) {
  if (!aboutClosed()) return children;
  return (
    <Shell scene="hero" photo={PAGE_PHOTO.about}>
      <Hero crumbs={[["/about", "About"]]} kicker="About" title="This page isn't part of this preview."
        lead={<p>The About pages aren&rsquo;t open in this version of the site.</p>} />
    </Shell>
  );
}
