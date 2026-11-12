/* Privacy choices (Nov 11, 2026). One place that says what a visitor allowed:
   - analytics: true  -> optional tools may load (Microsoft Clarity: cookies, heat maps, anonymized session replays)
   - analytics: false -> nothing optional loads, and the cookie-free visit counts (Vercel Web Analytics) stop too
   - no choice yet    -> only the cookie-free visit counts run; Clarity waits for "Accept"
   A browser that sends Global Privacy Control (navigator.globalPrivacyControl) is treated as "Decline" unless the
   visitor later clicks "Accept" on this site themselves.
   The choice is kept in this browser (localStorage) under KEY, with the date it was made; the banner asks again
   when VERSION changes (when what we use changes). The "Privacy choices" link in the footer reopens the banner. */
export const CONSENT_KEY = "rawlins-privacy-choice";
export const CONSENT_VERSION = 2;
export const CONSENT_EVENT = "rawlins:consent"; // fired on window when the choice changes
export const OPEN_EVENT = "rawlins:privacy-choices"; // fire on window to reopen the banner

export type Choice = { analytics: boolean; v: number; at: number; gpc?: boolean };

export const gpcOn = (): boolean => {
  try { return typeof navigator !== "undefined" && (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true; }
  catch { return false; }
};

export function readChoice(): Choice | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const c = JSON.parse(raw) as Choice;
    return c && c.v === CONSENT_VERSION && typeof c.analytics === "boolean" ? c : null;
  } catch { return null; }
}

export function saveChoice(analytics: boolean): Choice {
  const c: Choice = { analytics, v: CONSENT_VERSION, at: Date.now(), gpc: gpcOn() || undefined };
  try { window.localStorage.setItem(CONSENT_KEY, JSON.stringify(c)); } catch { /* storage blocked: the choice lasts for this page only */ }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: c }));
  return c;
}

/* may the optional tools (Clarity) load? Only on an explicit "Accept" */
export const optionalAllowed = (): boolean => readChoice()?.analytics === true;
/* may the cookie-free visit counts run? Yes unless the visitor declined, or GPC is on and they haven't accepted */
export const countsAllowed = (): boolean => {
  const c = readChoice();
  if (c) return c.analytics;
  return !gpcOn();
};
