import type { Metadata } from "next";
import { NewsPage } from "@/components/rd/pages";
export const metadata: Metadata = { title: "News & Events", description: "Conferences, awards, and announcements from Rawlins." };
export default function Page() { return <NewsPage />; }
