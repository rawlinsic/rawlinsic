import type { Metadata } from "next";
import { ContactPageNew } from "@/components/site/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Rawlins, 10639 Professional Cir, Reno, NV 89521.",
  openGraph: {
    title: "Contact | Rawlins",
    description:
      "Reach Rawlins at 10639 Professional Cir, Reno, NV 89521.",
  },
};

export default function Page() {
  return <ContactPageNew />;
}
