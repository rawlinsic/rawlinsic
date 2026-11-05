/* Accessibility Statement: the live page's text, word for word, in the new design. */
import { Hero, Shell } from "@/components/site/ui";

export function AccessibilityPage() {
  return (
    <Shell>
      <Hero scene={false} crumbs={[["/accessibility", "Accessibility Statement"]]} title="Accessibility Statement" />
      <section className="pg-sec pg-body">
        <div className="pg-wrap pg-legal">
        <span><span>Commitment</span></span>

        <div>
          <p>Last updated: April 9, 2026</p>

          <div>
            <h2>Our Commitment</h2>
            <p>Rawlins is committed to ensuring that our website is accessible to all users, including individuals with disabilities. We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards, as recommended by the World Wide Web Consortium (W3C).</p>
          </div>

          <div>
            <h2>Accessibility Features</h2>
            <p>We have implemented the following measures to support accessibility on our website:</p>
            <ul>
              <li>Semantic HTML structure for screen reader compatibility</li>
              <li>Keyboard-navigable interactive elements</li>
              <li>Focus indicators for keyboard navigation</li>
              <li>Alt text descriptions for meaningful images</li>
              <li>Sufficient color contrast ratios for text content</li>
              <li>Responsive design that adapts to different screen sizes and zoom levels</li>
              <li>Support for reduced motion preferences</li>
              <li>ARIA attributes on interactive components</li>
              <li>Skip-to-content navigation for keyboard users</li>
            </ul>
          </div>

          <div>
            <h2>Conformance Status</h2>
            <p>We aim to conform to WCAG 2.1 Level AA. We regularly review and test our website to identify and address accessibility barriers. While we strive for full conformance, some content may not yet fully meet all standards. We are actively working to improve accessibility across our entire site.</p>
          </div>

          <div>
            <h2>Assistive Technology Compatibility</h2>
            <p>Our website is designed to be compatible with the following assistive technologies:</p>
            <ul>
              <li>Screen readers (including JAWS, NVDA, and VoiceOver)</li>
              <li>Screen magnification software</li>
              <li>Speech recognition software</li>
              <li>Keyboard-only navigation</li>
            </ul>
          </div>

          <div>
            <h2>Known Limitations</h2>
            <p>Despite our best efforts, some areas of our website may have accessibility limitations. These include:</p>
            <ul>
              <li>Some third-party content or embedded media may not fully conform to accessibility standards</li>
              <li>Certain interactive visualizations may have limited screen reader support</li>
              <li>Older PDF documents may not be fully accessible</li>
            </ul>
            <p>We are working to address these limitations and improve the overall accessibility of our content.</p>
          </div>

          <div>
            <h2>Feedback and Contact</h2>
            <p>We welcome your feedback on the accessibility of our website. If you encounter any accessibility barriers or have suggestions for improvement, please contact us:</p>
            <p>
              <strong>Rawlins</strong><br />
              Email: <a href="mailto:info@rawlinsic.com">info@rawlinsic.com</a><br />
              Phone: <a href="tel:+17758433822">(775) 843-3822</a><br />
              Website: <span>rawlinsic.com</span>
            </p>
            <p>We will make reasonable efforts to respond to your feedback within 5 business days and to address any accessibility concerns.</p>
          </div>

          <div>
            <h2>Enforcement Procedures</h2>
            <p>If you are not satisfied with our response to your accessibility concern, you may file a complaint with the U.S. Department of Justice, Civil Rights Division, or your local disability rights organization.</p>
          </div>
        </div>
      
        </div>
      </section>
    </Shell>
  );
}
