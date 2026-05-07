import { NextResponse } from "next/server";

/* Recipients for careers / job application submissions. */
const RECIPIENTS = ["jobs@rawlinsic.com"];

/* In-memory rate limit (per-IP) for the API route. */
const RATE_WINDOW_MS = 60 * 1000;
const RATE_MAX = 5;
const rateMap = new Map<string, { count: number; start: number }>();

/* File upload constraints. Combined size kept under Vercel's
   default 4.5 MB serverless request body limit (after multipart
   overhead) by capping per-file at 2 MB and total at 4 MB. */
const MAX_FILE_BYTES = 2 * 1024 * 1024;
const MAX_TOTAL_BYTES = 4 * 1024 * 1024;
const ALLOWED_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "application/rtf",
  "text/rtf",
]);
const ALLOWED_EXT = /\.(pdf|doc|docx|txt|rtf)$/i;

function getClientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  const real = request.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now - entry.start > RATE_WINDOW_MS) {
    rateMap.set(ip, { count: 1, start: now });
    return false;
  }
  entry.count += 1;
  if (entry.count > RATE_MAX) return true;
  return false;
}

async function verifyRecaptcha(token: string | undefined): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
    });
    const data = await res.json();
    if (!data.success) return false;
    if (typeof data.score === "number" && data.score < 0.5) return false;
    return true;
  } catch (err) {
    console.error("reCAPTCHA verification error:", err);
    return false;
  }
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]+/g, "_").slice(0, 120);
}

async function fileToAttachment(file: File): Promise<{ filename: string; content: string }> {
  const buf = Buffer.from(await file.arrayBuffer());
  return {
    filename: sanitizeFilename(file.name || "attachment"),
    content: buf.toString("base64"),
  };
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again in a minute." },
        { status: 429 }
      );
    }

    const form = await request.formData();
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const role = String(form.get("role") || "Proposal Writer/Manager").trim();
    const location = String(form.get("location") || "").trim();
    const message = String(form.get("message") || "").trim();
    const honeypot = String(form.get("company-website") || "").trim();
    const recaptchaToken = String(form.get("recaptchaToken") || "").trim() || undefined;

    if (honeypot.length > 0) {
      return NextResponse.json({ success: true });
    }

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    if (
      name.length > 200 ||
      email.length > 200 ||
      role.length > 200 ||
      location.length > 200 ||
      message.length > 5000
    ) {
      return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const recaptchaOk = await verifyRecaptcha(recaptchaToken);
    if (!recaptchaOk) {
      return NextResponse.json(
        { error: "Could not verify that you are human. Please try again." },
        { status: 400 }
      );
    }

    const resume = form.get("resume");
    const coverLetter = form.get("coverLetter");

    if (!(resume instanceof File) || resume.size === 0) {
      return NextResponse.json(
        { error: "Please attach your resume." },
        { status: 400 }
      );
    }

    const candidates: File[] = [resume];
    if (coverLetter instanceof File && coverLetter.size > 0) candidates.push(coverLetter);

    let totalBytes = 0;
    for (const f of candidates) {
      if (f.size > MAX_FILE_BYTES) {
        return NextResponse.json(
          { error: `File "${f.name}" exceeds the 2 MB limit.` },
          { status: 400 }
        );
      }
      totalBytes += f.size;
      const typeOk = ALLOWED_MIME.has(f.type) || ALLOWED_EXT.test(f.name || "");
      if (!typeOk) {
        return NextResponse.json(
          { error: `Unsupported file type for "${f.name}". Please upload PDF, DOC, DOCX, RTF, or TXT.` },
          { status: 400 }
        );
      }
    }
    if (totalBytes > MAX_TOTAL_BYTES) {
      return NextResponse.json(
        { error: "Combined attachment size exceeds 4 MB." },
        { status: 400 }
      );
    }

    const attachments = await Promise.all(candidates.map(fileToAttachment));

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json(
        { error: "Email service not configured (RESEND_API_KEY missing on server)." },
        { status: 500 }
      );
    }

    const escape = (s: string) =>
      s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Rawlins IC Careers <careers@rawlinsic.com>",
        to: RECIPIENTS,
        subject: `New Application: ${escape(role)} — ${escape(name)}`,
        reply_to: email,
        html: `
          <h2>New Career Application</h2>
          <p><strong>Role:</strong> ${escape(role)}</p>
          <p><strong>Name:</strong> ${escape(name)}</p>
          <p><strong>Email:</strong> ${escape(email)}</p>
          <p><strong>Location:</strong> ${location ? escape(location) : "Not provided"}</p>
          <hr />
          <p><strong>Why this role is a fit:</strong></p>
          <p>${message ? escape(message).replace(/\n/g, "<br />") : "<em>No note provided.</em>"}</p>
          <hr />
          <p><strong>Attachments:</strong> ${attachments.map((a) => escape(a.filename)).join(", ")}</p>
        `,
        attachments,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Resend API error:", JSON.stringify(data));
      const m =
        (data && (data.message || data.error || data.name)) ||
        `Resend returned status ${res.status}`;
      return NextResponse.json(
        { error: `Email send failed: ${m}` },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Careers form error:", error);
    const m = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: `Server error: ${m}` }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    resendKeyPresent: Boolean(process.env.RESEND_API_KEY),
    recipientCount: RECIPIENTS.length,
    fromAddress: "Rawlins IC Careers <careers@rawlinsic.com>",
    maxFileBytes: MAX_FILE_BYTES,
    maxTotalBytes: MAX_TOTAL_BYTES,
  });
}
