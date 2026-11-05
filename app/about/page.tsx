import type { Metadata } from "next";
import { AboutIndex } from "@/components/site/more";
export const metadata: Metadata = { title: "About", description: "Who we are, how we work, our people, and where we work.", alternates: { canonical: "/about" } };
export default function Page() { return <AboutIndex />; }
