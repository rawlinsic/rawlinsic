import type { Metadata } from "next";
import ProposalWriterManagerPage from "@/components/proposal-writer-manager-page";

export const metadata: Metadata = {
  title: "Proposal Writer/Manager | Careers",
  description:
    "Open opportunity at Rawlins Infra Consult: Proposal Writer/Manager — full-time, remote. Candidates preferred in US or GCC markets (UAE, Saudi Arabia, Qatar).",
};

export default function Page() {
  return <ProposalWriterManagerPage />;
}
