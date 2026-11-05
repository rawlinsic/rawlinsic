import type { Metadata } from "next";
import { ServicesIndex } from "@/components/site/services";

export const metadata: Metadata = {
  title: "What We Do",
  description: "Strategy & Organization, Project Delivery, Operations & Maintenance, Digital Solutions, and Drones & Advanced Air Mobility.",
  alternates: { canonical: "/services" },
};
export default function Page() { return <ServicesIndex />; }
