import type { Metadata } from "next";
import Header from "@/components/v8/header";
import Footer from "@/components/v8/footer";
import Reveal from "@/components/v8/reveal";
import IndustriesIndexV8 from "@/components/v8/industries-index";

export const metadata: Metadata = {
  title: "Who We Work With",
  description: "Transportation, Government & Public Works, Contractors & Engineering Firms, and the Private Sector.",
  alternates: { canonical: "/industries" },
};
export default function Page() {
  return (
    <>
      <Header />
      <main id="main-content" className="v8"><IndustriesIndexV8 /></main>
      <Footer />
      <Reveal />
    </>
  );
}
