import type { Metadata } from "next";
import TermsOfServicePage from "@/components/terms-of-service-page";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Rawlins terms of service. Review the terms governing your use of our website and services.",
};

export default function Page() {
  return <TermsOfServicePage />;
}
