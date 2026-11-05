import type { Metadata } from "next";
import { AccessibilityPage } from "@/components/site/legal-accessibility";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "Rawlins accessibility statement. Learn about our commitment to digital accessibility.",
};

export default function Page() {
  return <AccessibilityPage />;
}
