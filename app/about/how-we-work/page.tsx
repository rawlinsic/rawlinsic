import type { Metadata } from "next";
import { HowWeWork } from "@/components/site/more";
export const metadata: Metadata = { title: "How We Work", description: "We find what's broken, fix it, and stay until it runs: assess, rebuild, train, hand off.", alternates: { canonical: "/about/how-we-work" } };
export default function Page() { return <HowWeWork />; }
