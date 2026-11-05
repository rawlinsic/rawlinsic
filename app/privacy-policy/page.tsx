import type { Metadata } from "next";
import { PrivacyPage } from "@/components/site/legal-privacy-policy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Rawlins privacy policy. Learn how we collect, use, and protect your personal information.",
};

export default function Page() {
  return <PrivacyPage />;
}
