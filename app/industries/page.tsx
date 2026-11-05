import type { Metadata } from "next";
import { IndustriesPage } from "@/components/rd/pages";
export const metadata: Metadata = { title: "Industries", description: "State DOTs, local and regional government, aviation and airports, federal and multi-state programs, contractors, private sector, and international." };
export default function Page() { return <IndustriesPage />; }
