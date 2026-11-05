import Image from "next/image";
import Link from "next/link";
import { LINES, CROSS, INDUSTRIES, lineHref, crossHref, industryHref } from "@/lib/redesign-data";

const LOGO_URL =
  "/images/pages/rawlinslogo-white-wordmark.png";

const SOCIAL_FONT = "var(--font-dm-sans), 'DM Sans', sans-serif";

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-grid rd-footer-grid">
        <div>
          <Image src={LOGO_URL} alt="Rawlins" width={415} height={100} className="footer-logo-img" />
          {/* Draft positioning, not approved (Ben and Scott). */}
          <p className="footer-brand-desc">
            Former agency leaders helping the organizations that run public
            infrastructure plan, deliver, and adopt better ways of working.
          </p>
          <ul className="footer-links" style={{ marginTop: 18 }}>
            <li><a href="mailto:info@rawlinsic.com">info@rawlinsic.com</a></li>
            <li><a href="tel:+17758433822">(775) 843-3822</a></li>
            <li>
              <address style={{ fontStyle: "normal", lineHeight: 1.5 }}>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=10639+Professional+Cir%2C+Reno%2C+NV+89521"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Rawlins office location in Google Maps"
                >
                  10639 Professional Cir<br />
                  Reno, NV 89521
                </a>
              </address>
            </li>
          </ul>
          <div className="footer-social">
            <a href="https://www.linkedin.com/company/107078508/admin/dashboard/" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="LinkedIn">
              <span style={{ fontFamily: SOCIAL_FONT, fontSize: "20px", fontWeight: 700, color: "#060c16", lineHeight: 1, letterSpacing: "-0.5px" }}>in</span>
            </a>
            <a href="https://g.page/r/CSNh-GWp5ejQEAI/review" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Google">
              <span style={{ fontFamily: SOCIAL_FONT, fontSize: "22px", fontWeight: 700, color: "#060c16", lineHeight: 1 }}>G</span>
            </a>
          </div>
        </div>
        <div>
          <h3 className="footer-heading">Services</h3>
          <ul className="footer-links">
            {LINES.map((l) => (
              <li key={l.id}><Link href={lineHref(l)}>{l.menuName}</Link></li>
            ))}
            {CROSS.map((c) => (
              <li key={c.id}><Link href={crossHref(c)}>{c.name}</Link></li>
            ))}
            <li><Link href="/services">All Services</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="footer-heading">Industries</h3>
          <ul className="footer-links">
            {INDUSTRIES.map((i) => (
              <li key={i.id}><Link href={industryHref(i)}>{i.short}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="footer-heading">Insights</h3>
          <ul className="footer-links">
            <li><Link href="/insights/case-studies">Case Studies</Link></li>
            <li><Link href="/insights/thought-leadership">Thought Leadership</Link></li>
            <li><Link href="/insights/podcast">Podcast</Link></li>
            <li><Link href="/insights/news">News &amp; Events</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="footer-heading">Company</h3>
          <ul className="footer-links">
            <li><Link href="/about/who-we-are">Who We Are</Link></li>
            <li><Link href="/about/how-we-work">How We Work</Link></li>
            <li><Link href="/about/our-people">Our People</Link></li>
            <li><Link href="/about/areas-we-serve">Areas We Serve</Link></li>
            <li><Link href="/careers">Careers</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/site-map">Site Map</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} Rawlins. All rights reserved.</span>
        <span><a href="/privacy-policy" style={{ color: "inherit", textDecoration: "none" }}>Privacy Policy</a> &middot; <a href="/terms-of-service" style={{ color: "inherit", textDecoration: "none" }}>Terms of Service</a> &middot; <a href="/accessibility" style={{ color: "inherit", textDecoration: "none" }}>Accessibility</a></span>
      </div>
    </footer>
  );
}
