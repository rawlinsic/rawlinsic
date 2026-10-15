import type { Metadata } from "next";
import PrivacyPolicyPage from "@/components/privacy-policy-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Rawlins privacy policy. Learn how we collect, use, and protect your personal information.",
};

export default function Page() {
  return <PrivacyPolicyPage />;
}
