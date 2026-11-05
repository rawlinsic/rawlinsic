/* Get in touch: live contact details kept; form adds the service-area field. */
import { AREAS } from "@/lib/content/site";
import ContactForm from "@/components/site/contact-form";
import { Hero, Shell } from "@/components/site/ui";

export function ContactPageNew() {
  return (
    <Shell scene="hero">
      <Hero crumbs={[["/contact", "Contact"]]} kicker="Contact Rawlins" title="Ready to partner with purpose?"
        lead={<p>Whether you&rsquo;re ready to engage or simply exploring what&rsquo;s possible, we&rsquo;d love to hear from you.</p>} />
      <section className="pg-sec">
        <div className="pg-wrap pg-two">
          <div>
            <p className="pg-kicker">Get in touch</p>
            <h2 className="pg-h2">Send us a message</h2>
            <div className="pg-prose" style={{ marginTop: 14 }}>
              <p>Our team is here to listen, advise, and partner with you. Share a bit about your organization and what you&rsquo;re working through, and we&rsquo;ll take it from there.</p>
            </div>
            <dl className="pg-facts cf-facts">
              <div><dt>Email us</dt><dd><a href="mailto:info@rawlinsic.com">info@rawlinsic.com</a></dd></div>
              <div><dt>Call us</dt><dd><a href="tel:+17758433822">(775) 843-3822</a></dd></div>
              <div><dt>Connect</dt><dd><a href="https://www.linkedin.com/company/107078508/" target="_blank" rel="noopener noreferrer">LinkedIn</a></dd></div>
              <div><dt>Location</dt><dd><a href="https://www.google.com/maps/search/?api=1&query=10639+Professional+Cir%2C+Reno%2C+NV+89521" target="_blank" rel="noopener noreferrer">10639 Professional Cir, Reno, NV 89521</a></dd></div>
            </dl>
          </div>
          <ContactForm topics={[...AREAS.map((a) => a.name), "Not sure"]} />
        </div>
      </section>
    </Shell>
  );
}
