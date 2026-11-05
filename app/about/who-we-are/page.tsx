import type { Metadata } from "next";
import { WhoWeAre } from "@/components/site/more";
export const metadata: Metadata = { title: "Who We Are", description: "Former agency leaders, working alongside an in-house automation and AI build team.", alternates: { canonical: "/about/who-we-are" } };
export default function Page() { return <WhoWeAre />; }
