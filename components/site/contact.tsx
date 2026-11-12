/* Get in touch: two ways in (Nicole, Nov 11). Pick what you're trying to fix (the home page's picker), or send a
   message with the form. The picker's button fills in the form. Live contact details kept; the form has the
   service-area field. */
import { AREAS, PROBLEMS, serviceById } from "@/lib/content/site";
import { PAGE_PHOTO } from "@/lib/content/media";
import { themeStyle } from "@/lib/content/v8";
import ContactWays from "@/components/site/contact-ways";
import { Hero, Shell } from "@/components/site/ui";

export function ContactPageNew() {
  const areaOf = (serviceId: string) => serviceById(serviceId)?.area;
  /* the same list the home page's "Tell us what you're trying to fix" uses */
  const fixes = PROBLEMS.map((p) => ({
    q: p.q, topic: areaOf(p.services[0])?.name ?? "Not sure",
    services: p.services.map((id) => serviceById(id)).filter(Boolean).map((h) => ({ name: h!.service.name, area: h!.area.name, href: `/services/${h!.area.slug}/${h!.service.slug}`, style: themeStyle(h!.area.id) })),
  }));
  return (
    <Shell scene="hero" photo={PAGE_PHOTO.contact}>
      <Hero crumbs={[["/contact", "Contact"]]} kicker="Contact Rawlins" title="Choose your starting point below."
        /* TODO(Nicole): lead line to come from Nicole (the "connect you with the person who has done the work" line was removed, Nov 9) */
        lead={null} />
      <ContactWays fixes={fixes} topics={[...AREAS.map((a) => a.name), "Not sure"]}
        details={
          <>
            <p className="pg-kicker">Get in touch</p>
            <h2 className="pg-h2">Send us a message</h2>
            <div className="pg-prose" style={{ marginTop: 14 }}>
              <p>Tell us about your organization and what you&rsquo;re working through.</p>
            </div>
            <dl className="pg-facts cf-facts">
              <div><dt>Email us</dt><dd><a href="mailto:info@rawlinsic.com">info@rawlinsic.com</a></dd></div>
              <div><dt>Call us</dt><dd><a href="tel:+17758433822">(775) 843-3822</a></dd></div>
              <div><dt>Connect</dt><dd><a href="https://www.linkedin.com/company/107078508/" target="_blank" rel="noopener noreferrer">LinkedIn</a></dd></div>
              <div><dt>Location</dt><dd><a href="https://www.google.com/maps/search/?api=1&query=10639+Professional+Cir%2C+Reno%2C+NV+89521" target="_blank" rel="noopener noreferrer">10639 Professional Cir, Reno, NV 89521</a></dd></div>
            </dl>
          </>
        } />
    </Shell>
  );
}
