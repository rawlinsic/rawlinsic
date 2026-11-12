"use client";
/* Privacy banner (rewritten Nov 11, 2026; Nicole: "a privacy banner that is updated and accurate with the laws we
   need"). What it does, and what it says, match what the site actually runs (lib/consent.ts):
   - Accept and Decline are the same size, side by side, and nothing optional loads before a choice.
   - Microsoft Clarity (cookies, heat maps, anonymized session replays) loads only after Accept.
   - Decline also stops the cookie-free visit counts.
   - Global Privacy Control in the browser counts as Decline, and the banner says so.
   - "Privacy choices" in the footer reopens it, so a choice can be changed as easily as it was made.
   Old name kept (CookieBanner) so the layout import doesn't change; hasAnalyticsConsent is kept for old callers. */
import { useEffect, useState } from "react";
import Link from "next/link";
import { OPEN_EVENT, gpcOn, optionalAllowed, readChoice, saveChoice } from "@/lib/consent";

export function hasAnalyticsConsent(): boolean {
  return optionalAllowed();
}

export default function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [gpc, setGpc] = useState(false);
  const [current, setCurrent] = useState<boolean | null>(null);

  useEffect(() => {
    setGpc(gpcOn());
    const c = readChoice();
    setCurrent(c ? c.analytics : null);
    if (!c) setOpen(true);
    const reopen = () => { const now = readChoice(); setCurrent(now ? now.analytics : null); setGpc(gpcOn()); setOpen(true); };
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  if (!open) return null;
  const choose = (yes: boolean) => { saveChoice(yes); setCurrent(yes); setOpen(false); };

  return (
    <div className="pv" role="dialog" aria-modal="false" aria-labelledby="pv-h" aria-describedby="pv-t">
      <div className="pv-in">
        <h2 id="pv-h" className="pv-h">Your privacy choices</h2>
        <div id="pv-t" className="pv-t">
          <p>
            We count visits without cookies to see which pages are useful. With your OK, we also use Microsoft Clarity,
            which sets cookies and records how pages are used (clicks, scrolling, and anonymized session replays). We
            don&apos;t sell your information or use it for advertising.
          </p>
          {gpc && <p className="pv-gpc">Your browser is sending a Global Privacy Control signal, so optional tracking stays off unless you choose Accept.</p>}
          {current !== null && <p className="pv-now">Your current choice: {current ? "Accepted" : "Declined"}.</p>}
          <p>You can change this anytime from <b>Privacy choices</b> at the bottom of every page. <Link href="/privacy-policy">Privacy Policy</Link></p>
        </div>
        <div className="pv-actions">
          <button type="button" className="pv-btn" onClick={() => choose(false)}>Decline</button>
          <button type="button" className="pv-btn" onClick={() => choose(true)}>Accept</button>
        </div>
      </div>
    </div>
  );
}

/* the footer link that reopens the banner */
export function PrivacyChoicesLink({ className }: { className?: string }) {
  return (
    <button type="button" className={`pv-link${className ? ` ${className}` : ""}`} onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      Privacy choices
    </button>
  );
}
