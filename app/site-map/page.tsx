import type { Metadata } from "next";
import { SiteMapPage } from "@/components/site/more";
export const metadata: Metadata = { title: "Site Map", description: "Every page on rawlinsic.com.", alternates: { canonical: "/site-map" } };
export default function Page() { return <SiteMapPage />; }
