import type { Metadata } from "next";
import { Btn, Hero, Shell } from "@/components/site/ui";
import { PAGE_PHOTO } from "@/lib/content/media";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for isn't here. Head back to the Rawlins home page, or open the menu to find what you need.",
};

export default function NotFound() {
  return (
    <Shell scene="rural" photo={PAGE_PHOTO.notFound}>
      <Hero kicker="404" title="This road doesn't go anywhere."
        lead={<p>The page you&apos;re looking for isn&apos;t here. It may have moved when we rebuilt the site.</p>}
        actions={<><Btn href="/" primary>Go to the home page</Btn><Btn href="/site-map">See the site map</Btn><Btn href="/contact">Get in touch</Btn></>} />
    </Shell>
  );
}
