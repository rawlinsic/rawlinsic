import type { Metadata } from "next";
import ProposalWriterManagerPage from "@/components/proposal-writer-manager-page";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rawlinsic.com";
const PATH = "/careers/proposal-writer-manager";

export const metadata: Metadata = {
  title: "Proposal Writer/Manager — Open Role at Rawlins Infra Consult",
  description:
    "Open opportunity at Rawlins Infra Consult: full-time, remote Proposal Writer/Manager. Lead strategic proposal development for our consulting and RAID divisions. US or GCC (UAE, Saudi Arabia, Qatar) preferred.",
  keywords: [
    "proposal writer",
    "proposal manager",
    "proposal writer job",
    "consulting jobs",
    "remote proposal writer",
    "GCC consulting jobs",
    "UAE proposal writer",
    "Saudi Arabia proposal manager",
    "Qatar consulting careers",
    "Rawlins Infra Consult",
    "RAID division",
    "business development consulting",
  ],
  alternates: {
    canonical: `${SITE_URL}${PATH}`,
  },
  openGraph: {
    type: "article",
    title: "Proposal Writer/Manager — Open Role at Rawlins Infra Consult",
    description:
      "Full-time, remote opportunity for a strategic Proposal Writer/Manager. US or GCC (UAE, Saudi Arabia, Qatar) preferred.",
    url: `${SITE_URL}${PATH}`,
    siteName: "Rawlins Infra Consult",
    images: [
      {
        url: "/images/pages/og-image.png",
        width: 1200,
        height: 630,
        alt: "Proposal Writer/Manager at Rawlins Infra Consult",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Proposal Writer/Manager — Rawlins Infra Consult",
    description:
      "Full-time, remote. Lead strategic proposal development across our consulting and RAID divisions.",
    images: ["/images/pages/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

/* ──────────────────────────────────────────────────────────────
   JobPosting structured data — Google's required schema for
   eligibility in Google for Jobs (the dedicated jobs UI in
   Search). Refer to https://developers.google.com/search/docs/
   appearance/structured-data/job-posting for the spec.
   ────────────────────────────────────────────────────────────── */
const POSTED_AT = "2026-05-07T00:00:00-08:00";
const VALID_THROUGH = "2026-08-07T23:59:59-08:00";

const JOB_POSTING_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: "Proposal Writer/Manager",
  description: `
    <p>Rawlins Infra Consult is seeking a strategic Proposal Writer/Manager to join our growing team. This role is critical to our business development efforts, responsible for crafting persuasive, high-quality proposals while coordinating with internal teams to ensure seamless proposal delivery. Candidates from US and GCC markets (particularly UAE, Saudi Arabia and Qatar) are preferred. This role supports both our core Rawlins business and our emerging RAID division.</p>
    <h3>Key Responsibilities</h3>
    <ul>
      <li>Strategic Proposal Development — create compelling, persuasive proposal documents that articulate our value proposition.</li>
      <li>Stakeholder Coordination — coordinate with 5–10+ team members to gather information, resumes, and subject matter expertise.</li>
      <li>Quality Assurance — ensure all contributed content aligns with original resumes and proposal requirements.</li>
      <li>Documentation &amp; Consolidation — synthesize multiple inputs into cohesive, professional proposal documents.</li>
      <li>Cross-functional Collaboration — work with graphic design, marketing, and other departments to integrate visuals and branding.</li>
      <li>Project Management — track timelines, deadlines, and deliverables across multiple contributors.</li>
    </ul>
    <h3>Required Skills &amp; Qualifications</h3>
    <ul>
      <li>Exceptional writing and communication skills.</li>
      <li>Strategic thinking and ability to understand client needs.</li>
      <li>Strong project coordination and organizational abilities.</li>
      <li>Experience managing multiple stakeholders and cross-functional teams.</li>
      <li>Attention to detail and consistency across complex documents.</li>
      <li>Proficiency with proposal management tools and Microsoft Office Suite.</li>
    </ul>
    <h3>Preferred Qualifications</h3>
    <ul>
      <li>Experience in business development, consulting, or government contracting.</li>
      <li>Familiarity with automation, integration, or technology services.</li>
      <li>Experience with proposal graphics and design coordination.</li>
    </ul>
  `,
  identifier: {
    "@type": "PropertyValue",
    name: "Rawlins Infra Consult",
    value: "rawlinsic-proposal-writer-manager-2026",
  },
  datePosted: POSTED_AT,
  validThrough: VALID_THROUGH,
  employmentType: "FULL_TIME",
  hiringOrganization: {
    "@type": "Organization",
    name: "Rawlins Infra Consult",
    sameAs: SITE_URL,
    logo: `${SITE_URL}/images/pages/rawlins-logo.png`,
  },
  jobLocationType: "TELECOMMUTE",
  applicantLocationRequirements: [
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Saudi Arabia" },
    { "@type": "Country", name: "Qatar" },
  ],
  directApply: true,
  url: `${SITE_URL}${PATH}`,
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JOB_POSTING_SCHEMA) }}
      />
      <ProposalWriterManagerPage />
    </>
  );
}
