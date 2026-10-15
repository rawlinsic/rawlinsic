import type { Metadata } from "next";
import ContactPage from "@/components/contact-page";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Rawlins Infra Consult — based at 10639 Professional Cir, Reno, NV 89521, and serving clients worldwide. Our team is here to listen, advise, and partner with you.",
  openGraph: {
    title: "Contact | Rawlins Infra Consult",
    description:
      "Reach Rawlins Infra Consult — 10639 Professional Cir, Reno, NV 89521. Global consultancy at the intersection of strategy, operations, and technology.",
  },
};

export default function Page() {
  return <ContactPage />;
}
