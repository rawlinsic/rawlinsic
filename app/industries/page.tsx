import type { Metadata } from "next";
import IndustriesIndexV8 from "@/components/v8/industries-index";

export const metadata: Metadata = {
  title: "WhoWeWorkWith",
  description: "Who Rawlins works with: state transportation departments and other public agencies, the contractors and engineering firms that build for them, and private firms.",
  alternates: { canonical: "/industries" },
};
/* the page brings its own header, footer and scrolling (components/site/ui.tsx Shell), like Insights */
export default function Page() {
  return <IndustriesIndexV8 />;
}
