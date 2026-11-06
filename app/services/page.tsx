import type { Metadata } from "next";
import { ServicesIndex } from "@/components/site/services";

export const metadata: Metadata = {
  title: "What We Do",
  description: "Strategy & Organization, Project Delivery, Operations & Maintenance, Digital Solutions, and Drones & Advanced Air Mobility.",
  alternates: { canonical: "/services" },
  /* archived (Nicole, Nov 5): kept so it can come back, but not in the menu, sitemap, or search results */
  robots: { index: false, follow: true },
};
export default function Page() { return <ServicesIndex />; }
