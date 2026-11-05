import type { Metadata } from "next";
import { ServicesPage } from "@/components/rd/pages";
export const metadata: Metadata = { title: "Services", description: "Strategy and organization, infrastructure, data, automation and AI, and aeronautics services for the organizations that run public infrastructure." };
export default function Page() { return <ServicesPage />; }
