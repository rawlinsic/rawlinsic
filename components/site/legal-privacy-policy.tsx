/* Privacy Policy: the live page's text, word for word, in the new design. */
import { Hero, Shell } from "@/components/site/ui";

export function PrivacyPage() {
  return (
    <Shell>
      <Hero scene={false} crumbs={[["/privacy-policy", "Privacy Policy"]]} title="Privacy Policy" />
      <section className="pg-sec pg-body">
        <div className="pg-wrap pg-legal">
        <span><span>Legal</span></span>

        <div>
          <p>Effective date: April 7, 2026. Last updated: November 11, 2026.</p>

          <div>
            <h2>1. Introduction</h2>
            <p>Rawlins Infra Consult, LLC (&ldquo;Rawlins,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting the privacy and security of your personal information. This Privacy Policy describes how we collect, use, disclose, store, and protect information obtained through our website at rawlinsic.com (the &ldquo;Site&rdquo;) and in connection with our consulting services.</p>
            <p>By accessing or using our Site, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree, please discontinue use of the Site.</p>
          </div>

          <div>
            <h2>2. Information We Collect</h2>
            <h3>I. Information You Provide Directly</h3>
            <p>We collect information that you voluntarily provide when you:</p>
            <ul>
              <li>Complete our contact or inquiry forms</li>
              <li>Send us an email or correspond with us</li>
              <li>Subscribe to newsletters or updates</li>
              <li>Apply for employment or career opportunities</li>
              <li>Engage with us as a client or business partner</li>
            </ul>
            <p>This information may include your name, email address, phone number, job title, organization name, and any other details you choose to share in your message.</p>

            <h3>II. Information Collected Automatically</h3>
            <p>When you visit our Site, we may automatically collect certain technical information, including:</p>
            <ul>
              <li>IP address and approximate geographic location</li>
              <li>Browser type, version, and language preferences</li>
              <li>Operating system and device information</li>
              <li>Pages visited, time spent on pages, and navigation paths</li>
              <li>Referring and exit URLs</li>
              <li>Date and time of access</li>
            </ul>

            <h3>III. Cookies and Similar Technologies</h3>
            {/* Nov 11, 2026: matched to what the site runs (components/cookie-banner.tsx, lib/consent.ts, components/clarity-loader.tsx).
                Google Analytics was listed but isn't used; Clarity used to load before any choice. */}
            <p>We use a small number of cookies and similar technologies to run the Site, to count visits, and, with your permission, to understand how pages are used. Cookies are small data files stored on your device. We do not use advertising cookies, and we do not sell or share your personal information for targeted advertising.</p>
            <p>When you first visit our Site, a privacy banner asks for your choice. Nothing optional loads until you choose Accept. You can change your choice at any time with the <strong>Privacy choices</strong> link at the bottom of every page. If your browser sends a Global Privacy Control signal, we treat it as a choice to decline optional tracking unless you choose Accept on our Site.</p>
            <p>We currently use the following services:</p>
            <ul>
              <li><strong>Vercel Web Analytics:</strong> A cookieless analytics service that counts page views in aggregate without setting cookies or tracking individual visitors across sessions. We also use Vercel custom events to understand how visitors use specific page elements, such as which sections are opened, PDF downloads, and button clicks. These events are anonymous and aggregated. These visit counts stop if you choose Decline or your browser sends a Global Privacy Control signal.</li>
              <li><strong>Microsoft Clarity:</strong> Loads only if you choose Accept. Clarity helps us understand how visitors use our Site through heat maps (where people click and how far they scroll) and session recordings (anonymized replays of visits). It sets cookies and captures interaction data such as mouse movements, clicks, and scrolling. Data is processed by Microsoft in accordance with its privacy policy. For more information, visit <a href="https://clarity.microsoft.com/terms">Microsoft Clarity&rsquo;s terms</a>. If you later choose Decline, Clarity stops and its cookies are removed.</li>
              <li><strong>Google reCAPTCHA:</strong> Our contact form uses Google reCAPTCHA to protect against spam and abuse. reCAPTCHA collects hardware and software information, such as device and application data, and sends it to Google for analysis. Google&rsquo;s <a href="https://policies.google.com/privacy">Privacy Policy</a> and <a href="https://policies.google.com/terms">Terms of Service</a> apply.</li>
              <li><strong>Podcast player:</strong> Our podcast page embeds a player from our podcast host, which may set its own cookies when the player loads.</li>
            </ul>
            <p>You may also manage or disable cookies through your browser settings; however, doing so may affect certain site functionality.</p>
          </div>

          <div>
            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect for the following purposes:</p>
            <ul>
              <li>To respond to inquiries, requests, and communications</li>
              <li>To deliver, manage, and improve our consulting services</li>
              <li>To send relevant updates, newsletters, and service information (with your consent where required)</li>
              <li>To analyze website usage and improve the Site&rsquo;s performance, content, and user experience</li>
              <li>To comply with applicable laws, regulations, and legal processes</li>
              <li>To protect the rights, safety, and property of Rawlins, our clients, and others</li>
              <li>To evaluate employment applications and manage recruitment processes</li>
            </ul>
          </div>

          <div>
            <h2>4. Information Sharing and Disclosure</h2>
            <p>We do not sell, rent, or trade your personal information to third parties for marketing purposes. We may share your information in the following limited circumstances:</p>
            <ul>
              <li><strong>Service providers:</strong> We may share information with trusted third-party vendors who perform services on our behalf (e.g., website hosting, analytics, email delivery), subject to confidentiality obligations.</li>
              <li><strong>Legal requirements:</strong> We may disclose information when required by law, subpoena, court order, or governmental regulation, or when we believe disclosure is necessary to protect our rights, prevent fraud, or ensure the safety of our users.</li>
              <li><strong>Business transfers:</strong> In the event of a merger, acquisition, reorganization, or sale of assets, your information may be transferred as part of that transaction.</li>
              <li><strong>With your consent:</strong> We may share information for other purposes when you have provided explicit consent.</li>
            </ul>
          </div>

          <div>
            <h2>5. Data Retention</h2>
            <p>We retain personal information for as long as necessary to fulfill the purposes for which it was collected, comply with legal obligations, resolve disputes, and enforce our agreements. When personal information is no longer needed, we will securely delete or anonymize it.</p>
          </div>

          <div>
            <h2>6. Data Security</h2>
            <p>We implement reasonable administrative, technical, and physical safeguards designed to protect your personal information from unauthorized access, use, alteration, and disclosure. These measures include encryption, access controls, and secure hosting environments. However, no method of electronic transmission or storage is completely secure, and we cannot guarantee absolute security.</p>
          </div>

          <div>
            <h2>7. Your Rights and Choices</h2>
            <p>Depending on your jurisdiction, you may have certain rights regarding your personal information, including:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of the personal information we hold about you.</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information.</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information, subject to certain exceptions.</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time by following the instructions in the communication or contacting us directly. Turn off optional tracking on our Site at any time with the Privacy choices link at the bottom of every page; we also honor Global Privacy Control signals.</li>
              <li><strong>Restriction:</strong> Request that we limit the processing of your personal information under certain circumstances.</li>
            </ul>
            <p>To exercise any of these rights, please contact us at <a href="mailto:info@rawlinsic.com">info@rawlinsic.com</a>. We will respond to your request within a reasonable timeframe and in accordance with applicable law.</p>
          </div>

          <div>
            <h2>8. Third-Party Links</h2>
            <p>Our Site may contain links to third-party websites, services, or platforms (e.g., LinkedIn, Google). We are not responsible for the privacy practices, content, or security of those third-party sites. We encourage you to review the privacy policies of any external sites you visit.</p>
          </div>

          <div>
            <h2>9. Children&rsquo;s Privacy</h2>
            <p>Our Site and services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected information from a child, we will take steps to delete it promptly.</p>
          </div>

          <div>
            <h2>10. International Users</h2>
            <p>Our Site is operated from the United States. If you are accessing our Site from outside the United States, please be aware that your information may be transferred to, stored, and processed in the United States, where data protection laws may differ from those in your jurisdiction.</p>
          </div>

          <div>
            <h2>11. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, legal requirements, or other factors. The updated policy will be posted on this page with a revised effective date. We encourage you to review this policy periodically. Your continued use of the Site following any changes constitutes your acceptance of the updated policy.</p>
          </div>

          <div>
            <h2>12. Contact Us</h2>
            <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:</p>
            <p>
              <strong>Rawlins Infra Consult, LLC</strong><br />
              Email: <a href="mailto:info@rawlinsic.com">info@rawlinsic.com</a><br />
              Phone: <a href="tel:+17758433822">(775) 843-3822</a><br />
              Website: <span>rawlinsic.com</span>
            </p>
          </div>
        </div>
      
        </div>
      </section>
    </Shell>
  );
}
