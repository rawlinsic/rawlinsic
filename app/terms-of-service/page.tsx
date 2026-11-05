import type { Metadata } from "next";
import { TermsPage } from "@/components/site/legal-terms-of-service";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Rawlins terms of service. Review the terms governing your use of our website and services.",
};

export default function Page() {
  return <TermsPage />;
}
