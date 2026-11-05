import type { Metadata } from "next";
import { ContactPageNew } from "@/components/site/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Rawlins, 10639 Professional Cir, Reno, NV 89521. Tell us what you're trying to fix, and we'll connect you with the person on our team who has done it.",
  openGraph: {
    title: "Contact | Rawlins",
    description:
      "Reach Rawlins at 10639 Professional Cir, Reno, NV 89521.",
  },
};

export default function Page() {
  return <ContactPageNew />;
}
