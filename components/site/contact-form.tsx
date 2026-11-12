"use client";
/* Contact form: same submission path as the live site (/api/contact with
   reCAPTCHA v3 and the honeypot). New: "What can we help with?" lists the five
   service areas plus "Not sure" (sent as the existing `interest` field). */
import { useEffect, useRef, useState } from "react";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
declare global {
  interface Window { grecaptcha?: { ready: (cb: () => void) => void; execute: (siteKey: string, opts: { action: string }) => Promise<string> } }
}
type Form = { name: string; email: string; phone: string; organization: string; interest: string; message: string };
const EMPTY: Form = { name: "", email: "", phone: "", organization: "", interest: "", message: "" };

export default function ContactForm({ topics }: { topics: string[] }) {
  const [f, setF] = useState<Form>(EMPTY);
  const [honeypot, setHoneypot] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const done = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const t = sp.get("topic");
    if (t && topics.includes(t)) setF((x) => ({ ...x, interest: t }));
    /* home "Tell us what you're trying to fix": the problem the visitor picked */
    const m = sp.get("msg");
    if (m && m.length < 200) setF((x) => (x.message ? x : { ...x, message: m }));
  }, [topics]);
  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY || document.querySelector("script[data-recaptcha]")) return;
    const s = document.createElement("script");
    s.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    s.async = true;
    s.dataset.recaptcha = "1";
    document.head.appendChild(s);
  }, []);
  useEffect(() => { if (sent) done.current?.focus(); }, [sent]);

  const on = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setF((x) => ({ ...x, [e.target.name]: e.target.value }));
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      let recaptchaToken: string | undefined;
      if (RECAPTCHA_SITE_KEY && window.grecaptcha) {
        try {
          recaptchaToken = await new Promise<string>((res, rej) => window.grecaptcha!.ready(async () => {
            try { res(await window.grecaptcha!.execute(RECAPTCHA_SITE_KEY!, { action: "contact" })); } catch (err) { rej(err); }
          }));
        } catch (err) { console.error("reCAPTCHA execution error:", err); }
      }
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...f, honeypot, recaptchaToken }) });
      if (!r.ok) {
        let msg = `HTTP ${r.status}`;
        try { const d = await r.json(); if (d?.error) msg = d.error; } catch {}
        throw new Error(msg);
      }
      setSent(true);
    } catch (err) {
      const detail = err instanceof Error ? err.message : "Unknown error";
      alert(`Something went wrong sending your message.\n\n${detail}\n\nPlease try again, or email us directly at info@rawlinsic.com.`);
    } finally { setBusy(false); }
  };

  if (sent) return (
    <div className="cf-done" ref={done} tabIndex={-1} role="status">
      <h2 className="pg-h2">Message received</h2>
      <p>Thank you for reaching out. A member of our team will be in touch as soon as possible.</p>
      <button type="button" className="pg-btn" onClick={() => { setSent(false); setF(EMPTY); }}>Send another message</button>
    </div>
  );
  return (
    <form className="cf" onSubmit={submit} noValidate={false}>
      <div className="cf-hp" aria-hidden="true">
        <label htmlFor="company-website">Company Website</label>
        <input id="company-website" name="company-website" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>
      <div className="cf-row">
        <label>Name <span aria-hidden="true">*</span><input name="name" autoComplete="name" required value={f.name} onChange={on} /></label>
        <label>Email <span aria-hidden="true">*</span><input name="email" type="email" autoComplete="email" required value={f.email} onChange={on} /></label>
      </div>
      <div className="cf-row">
        <label>Organization or agency <span aria-hidden="true">*</span><input name="organization" autoComplete="organization" required value={f.organization} onChange={on} /></label>
        <label>Phone<input name="phone" type="tel" autoComplete="tel" value={f.phone} onChange={on} /></label>
      </div>
      <label>What can we help with? <span aria-hidden="true">*</span>
        <select name="interest" required value={f.interest} onChange={on}>
          <option value="" disabled>Choose one</option>
          {topics.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </label>
      <label>Message <span aria-hidden="true">*</span><textarea name="message" rows={6} required value={f.message} onChange={on} placeholder="What are you trying to fix?" /></label>
      <button type="submit" className="pg-btn pg-btn-primary cf-send" disabled={busy}>{busy ? "Sending…" : "Send message"}</button>
      {RECAPTCHA_SITE_KEY && (
        <p className="cf-note">This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a> apply.</p>
      )}
    </form>
  );
}
