import type { Metadata } from "next";
import { AboutPage } from "@/components/rd/pages";
export const metadata: Metadata = { title: "About", description: "Who we are, how we work, our people, and where we work." };
export default function Page() { return <AboutPage />; }
