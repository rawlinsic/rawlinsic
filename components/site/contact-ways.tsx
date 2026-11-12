"use client";
/* Contact: two ways in, side by side as a switch (Nicole, Nov 11: "maybe the contact page has the tell us what
   you're trying to fix section ... and the contact form? and design it really cool to where they can do either").
     Pick what you're trying to fix   the home page's picker; its button fills in the form and switches to it
     Send us a message                the contact form, with the ways to reach us beside it
   A link with ?topic= or ?msg= (from the home page's picker or a service page) opens on the form, and so
   does /contact#message. */
import { useEffect, useRef, useState, type ReactNode } from "react";
import FixPicker, { type Fix } from "@/components/v8/fix-picker";
import ContactForm from "@/components/site/contact-form";

type Way = "pick" | "write";

export default function ContactWays({ fixes, topics, details }: { fixes: Fix[]; topics: string[]; details: ReactNode }) {
  const [way, setWay] = useState<Way>("pick");
  const [formKey, setFormKey] = useState(0);
  const form = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    if (sp.get("topic") || sp.get("msg")) setWay("write");
    /* /contact#message opens straight on "Send us a message" and brings the form into view
       (the "Plan to meet us" buttons, Nicole, Nov 12) */
    const toForm = () => {
      if (window.location.hash !== "#message") return;
      setWay("write");
      /* jump (no glide: a glide can be cut short while the page is still settling), then once more after the
         sections have taken their places */
      const jump = () => { const el = form.current; if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 84, behavior: "auto" }); };
      window.setTimeout(jump, 250);
      window.setTimeout(jump, 900);
    };
    toForm();
    window.addEventListener("hashchange", toForm);
    return () => window.removeEventListener("hashchange", toForm);
  }, []);
  /* the picker's button: put the choice in the address (the form reads it there), show the form, and bring it into view */
  const fromPicker = (topic: string | undefined, msg: string) => {
    const sp = new URLSearchParams();
    if (topic) sp.set("topic", topic);
    if (msg) sp.set("msg", msg.slice(0, 190));
    window.history.replaceState(null, "", `${window.location.pathname}${sp.toString() ? `?${sp}` : ""}`);
    setFormKey((k) => k + 1);
    setWay("write");
    requestAnimationFrame(() => form.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };
  return (
    <section className="cw" data-nofill aria-label="Ways to reach us">
      <div className="cw-in">
        <div className="cw-switch" role="tablist" aria-label="Choose how to start">
          <button type="button" role="tab" id="cw-t-pick" aria-selected={way === "pick"} aria-controls="cw-p-pick" onClick={() => setWay("pick")}>
            <span className="cw-n" aria-hidden="true">01</span>
            <span><b>Pick what you&apos;re trying to fix</b><em>See where we&apos;d start, then send it to us</em></span>
          </button>
          <span className="cw-or" aria-hidden="true">or</span>
          <button type="button" role="tab" id="cw-t-write" aria-selected={way === "write"} aria-controls="cw-p-write" onClick={() => setWay("write")}>
            <span className="cw-n" aria-hidden="true">02</span>
            <span><b>Send us a message</b><em>Tell us about your organization in your own words</em></span>
          </button>
        </div>
        <div id="cw-p-pick" role="tabpanel" aria-labelledby="cw-t-pick" hidden={way !== "pick"} className="cw-panel">
          <FixPicker fixes={fixes} onGo={fromPicker} />
        </div>
        <div id="cw-p-write" role="tabpanel" aria-labelledby="cw-t-write" hidden={way !== "write"} className="cw-panel cw-write" ref={form}>
          <div className="cw-details">{details}</div>
          <ContactForm key={formKey} topics={topics} />
        </div>
      </div>
    </section>
  );
}
