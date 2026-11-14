/* Get in touch: two ways in (Nicole, Nov 11). Pick what you're trying to fix (the home page's picker), or send a
   message with the form. The picker's button fills in the form. Live contact details kept; the form has the
   service-area field. */
import { AREAS, PROBLEMS, serviceById } from "@/lib/content/site";
import { PAGE_PHOTO } from "@/lib/content/media";
import { themeStyle } from "@/lib/content/v8";
import ContactWays from "@/components/site/contact-ways";
import { Shell } from "@/components/site/ui";
import { EdHero } from "@/components/site/editorial";

export function ContactPageNew() {
  const areaOf = (serviceId: string) => serviceById(serviceId)?.area;
  /* the same list the home page's "Tell us what you're trying to fix" uses */
  const fixes = PROBLEMS.map((p) => ({
    q: p.q, topic: areaOf(p.services[0])?.name ?? "Not sure",
    services: p.services.map((id) => serviceById(id)).filter(Boolean).map((h) => ({ name: h!.service.name, area: h!.area.name, href: `/services/${h!.area.slug}/${h!.service.slug}`, style: themeStyle(h!.area.id) })),
  }));
  return (
    <Shell>
      {/* Nov 13 (Nicole: the top "needs a redesign ... not the whole page navy ... pick something cool"): a light top with the
          title on the left and the Nevada photo in a glowing, layered frame on the right; the navy section below stays */}
      <EdHero crumbs={[["/contact", "Contact"]]} kicker="Contact Rawlins" title={<>Tell us what you&apos;d like <em>help with.</em></>}
        aside={<div className="ct-ph"><span className="ct-ph-back" aria-hidden="true" /><span className="ct-ph-mid" aria-hidden="true" />{/* eslint-disable-next-line @next/next/no-img-element */}<img src={PAGE_PHOTO.contact} alt="" /></div>} />
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
              {/* the LinkedIn icon in place of the word (Nicole, Nov 12); the same icon as the footer's */}
              <div><dt>Connect</dt><dd><a className="cf-in" href="https://www.linkedin.com/company/107078508/" target="_blank" rel="noopener noreferrer" aria-label="Rawlins on LinkedIn"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.6 8.65 21 11.2 21 14.4V21h-4v-5.8c0-1.38-.03-3.16-1.93-3.16-1.93 0-2.22 1.5-2.22 3.06V21H9z" /></svg></a></dd></div>
              <div><dt>Location</dt><dd><a href="https://www.google.com/maps/search/?api=1&query=10639+Professional+Cir%2C+Reno%2C+NV+89521" target="_blank" rel="noopener noreferrer">10639 Professional Cir, Reno, NV 89521</a></dd></div>
            </dl>
          </>
        } />
    </Shell>
  );
}
