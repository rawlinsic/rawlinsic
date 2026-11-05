import type { Metadata } from "next";
import { Careers } from "@/components/site/more";
export const metadata: Metadata = {
  title: "Careers",
  description: "Work with Rawlins. Email jobs@rawlinsic.com to connect about opportunities.",
  alternates: { canonical: "/careers" },
};
export default function Page() { return <Careers />; }
