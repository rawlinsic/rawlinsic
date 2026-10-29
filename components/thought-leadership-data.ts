export interface ThoughtLeadershipArticle {
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  authorRole: string;
  authorEmail: string;
  authorPhone: string;
  authorLinkedIn?: string;
  date: string;
  dateLabel: string;
  category: string;
  excerpt: string;
  image: string;
  /** Intrinsic dimensions of `image` so Next.js Image preserves the
   * actual aspect ratio instead of distorting it. */
  imageWidth?: number;
  imageHeight?: number;
  heroImage: string;
  authorImage: string;
  pdfUrl: string;
  /**
   * "qa"   — the Q&A accordion layout (default). Use "question" blocks
   *          to start accordion sections.
   * "essay"— linear reading flow. All blocks (intro, heading, paragraph,
   *          callout, list) render in order in the right column. No
   *          accordion, no Q badge.
   */
  format?: "qa" | "essay";
  /** When false, hide the "Q" badge + rename the "Q&A" label on the
   * accordion (used for articles where the accordion sections are not
   * questions, e.g. a key-actions list). Defaults to true. */
  showQBadge?: boolean;
  /** Label shown above the accordion — overrides the default "Q&A". */
  accordionLabel?: string;
  /** Optional "one final thought" call-out rendered directly under the
   * accordion, styled more prominently than an inline callout. */
  finalThought?: {
    label: string;
    text: string;
    body?: string;
  };
  /** Optional acknowledgment line rendered between the final thought
   * and the CTA section. */
  acknowledgment?: string;
  /** Optional CTA section rendered at the very bottom of the article,
   * matching the standard gold-accent CTA style used elsewhere on the
   * site. No `section-label` is shown above the title (per design). */
  cta?: {
    title: string;
    body: string;
    buttonLabel?: string;
    buttonHref?: string;
  };
  content: ArticleSection[];
}

export interface ArticleSection {
  type: "intro" | "question" | "answer" | "heading" | "paragraph" | "list" | "callout" | "divider" | "citation";
  text?: string;
  items?: string[];
  /** Optional footnote marker (e.g. "1") appended at the end of an "intro" block. */
  footnote?: string;
}

export const THOUGHT_LEADERSHIP: ThoughtLeadershipArticle[] = [
  {
    slug: "minimizing-data-governance-fatigue",
    title: "Minimizing Data Governance Fatigue to Maximize Value",
    subtitle: "Overcoming obstacles to achieve enterprise-wide impact",
    author: "April Blackburn",
    authorRole: "Infrastructure Advisor",
    authorEmail: "April@RawlinsIC.com",
    authorPhone: "(850) 228-1453",
    authorLinkedIn: "https://www.linkedin.com/in/april-blackburn-a2104b144/",
    date: "2026-04-01",
    dateLabel: "April 2026",
    category: "Technology Strategy",
    excerpt:
      "Many companies struggle to establish effective data governance. In this Q&A, April Blackburn discusses implementing effective data governance and the essential elements of a solid governance foundation.",
    image: "/images/tl-april-blackburn-banner.webp",
    imageWidth: 1600,
    imageHeight: 652,
    heroImage: "/images/pages/tl-hero.webp",
    authorImage: "/images/team/april.webp",
    pdfUrl: "/thought-leadership-april-blackburn-data-governance.pdf",
    format: "qa",
    content: [
      {
        type: "intro",
        text: "Many companies struggle to establish effective data governance. Research shows widespread adoption of data governance practices, yet maturity levels remain low.",
        footnote: "1",
      },
      {
        type: "citation",
        text: "Michelle Knight, \u201CData Management Trends in 2026: Moving Beyond Awareness to Action,\u201D Dataversity, December 17, 2025.",
      },
      {
        type: "paragraph",
        text: "We sat down with April Blackburn, who specializes in technology strategy at Rawlins, to discuss implementing effective data governance and the essential elements of a solid governance foundation. Over her career, April has led major enterprise-level initiatives, from modernizing legacy systems to transforming transportation agency operations.",
      },
      { type: "divider" },
      {
        type: "question",
        text: "What is data governance, and why does it matter for transportation agencies and other organizations?",
      },
      {
        type: "answer",
        text: "You really cannot talk about modern transportation without talking about data. It touches everything. Data governance sets out the conditions for effective decision-making based on trustworthy information; it is the framework of policies, roles, and processes that defines how data is owned, managed, and used across an organization. Simply put, data governance is about making sure data actually works for you rather than against you.",
      },
      {
        type: "paragraph",
        text: "A formalized data governance framework, as opposed to case-by-case practices, builds trust and helps the organization stay resilient as circumstances change. It also enables people to carry out mission-critical functions. Performance management, federal reporting, and predictive maintenance, for example, can only work well when the underlying data is consistent and trusted. Strong governance turns individual wins into repeatable, scalable practices.",
      },
      {
        type: "paragraph",
        text: "Data affects operations, asset management, planning, finance\u2014every part of an organization. When taking an enterprise view of data and governance, you are really asking how to manage this foundational asset so people throughout the organization can rely on it.",
      },
      { type: "divider" },
      {
        type: "question",
        text: "What are a few of the main barriers to good data governance, and how can they be overcome?",
      },
      {
        type: "answer",
        text: "One of the biggest barriers is data fatigue. Departments of Transportation (DOTs) and other organizations have long struggled to implement effective data governance, despite ongoing efforts. So, they are now asking fair questions: Haven\u2019t we already done this work? Why do we have to do more? Likely, in such cases, the work was limited or uneven, with governance addressing a system, a project, or a reporting need but not extending across the organization. When that happens, reporting becomes inconsistent, confidence in the data drops, and trust erodes. This situation leads to another barrier: silos.",
      },
      {
        type: "paragraph",
        text: "We have found that silos\u2014driven by legacy technology, organizational structures predating an enterprise-wide data strategy, high integration costs, and unclear data ownership\u2014often foster territorial behavior that impedes cross-functional data governance. Data managed strictly by departments or trapped in older systems becomes fragmented and hard to use consistently. DOTs make more progress when they focus on high-value, mission-critical data and organize governance around data domains, such as assets or finance, instead of organizational charts.",
      },
      {
        type: "paragraph",
        text: "Another challenge is that people often resist governance because they perceive it as an IT-driven compliance task rather than recognizing it as a foundational business capability across the organization; they also see governance as extra work on top of their regular responsibilities. However, when experience shows that well-designed governance reduces rework, improves data quality, and makes their jobs easier, excitement builds. Small wins create momentum because the value is visible.",
      },
      {
        type: "callout",
        text: "In reality, governance matters because it supports what leaders already care about\u2014funding, safety, performance, and defensible decisions. When that connection is clear, governance feels practical, not theoretical.",
      },
      {
        type: "paragraph",
        text: "When governance is done well, the framework acts like guardrails, rather than an unnecessary constraint, allowing people to move forward with clarity to deliver value efficiently and confidently. When data falls outside the guardrails, organizations lose time reworking and taking corrective measures, which can cause frustration and slow progress.",
      },
      {
        type: "paragraph",
        text: "Overcoming these barriers takes a practical, phased approach that meets DOTs and other organizations where they are. Governance works best when it starts with clear priorities, grows over time, and becomes part of how people already work. That approach builds trust, supports mission-critical functions, and helps all organizations move forward.",
      },
      { type: "divider" },
      {
        type: "question",
        text: "Earlier, you mentioned that many people mistakenly view data governance as an IT compliance task. Building on that point, who should be responsible for data governance?",
      },
      {
        type: "answer",
        text: "Yes, a common misconception is that IT owns data governance. Data governance does not belong to just one group. While IT enables data governance, the capability goes well beyond IT; and while compliance is a critical component of data governance, it represents only one dimension of its value.",
      },
      {
        type: "paragraph",
        text: "Data governance works best as a shared enterprise responsibility. IT is often where data governance starts because IT teams know how to build solutions and support them across the organization. But governance only sticks when the business is actively involved.",
      },
      {
        type: "paragraph",
        text: "When governance is fragmented or informal, organizations feel the effects quickly through inconsistencies in reporting, confusion around ownership, and a lack of confidence in performance measures. That makes it harder to make decisions and harder to defend them.",
      },
      {
        type: "paragraph",
        text: "Because data supports so many business areas, it is important for governance to reflect that reality. Clear roles and shared accountability help people trust the data and rely on it, even as leadership or priorities change.",
      },
      {
        type: "paragraph",
        text: "In general, organizations have to think beyond their own walls. In the case of DOTs, much of the data comes from consultants, metropolitan planning organizations, local agencies, sensors, and private providers. Governance should extend into that ecosystem. Expectations around quality, standards, and ownership need to be clear upfront, not figured out later.",
      },
      {
        type: "paragraph",
        text: "When a well-designed structure is in place, governance stops feeling like overhead. It becomes an embedded practice, driving better outcomes and preparing organizations to adopt technologies responsibly.",
      },
      { type: "divider" },
      {
        type: "question",
        text: "To wrap up, could you share the essential elements of a strong governance foundation and one key takeaway for each?",
      },
      {
        type: "answer",
        text: "If we are serious about modern transportation, we have to be serious about our data. Technology will only become more integral to everything we do. That means the foundation has to be solid.",
      },
      {
        type: "paragraph",
        text: "There are five elements we consider when building a strong data governance foundation:",
      },
      { type: "heading", text: "Ownership and Accountability" },
      {
        type: "paragraph",
        text: "Every major data domain needs a clearly defined owner and steward. Governance does not work without accountability. When ownership is unclear, issues sit unresolved and trust declines. When it is clear, decisions get made and standards hold.",
      },
      { type: "heading", text: "Policies and Standards" },
      {
        type: "paragraph",
        text: "Organizations need consistent definitions and agreed-upon rules for how data is created, used, and shared. These should support how the agency actually operates. Consistency is what allows leaders to rely on reports across divisions without second-guessing the results.",
      },
      { type: "heading", text: "Data Quality and Security" },
      {
        type: "paragraph",
        text: "Data must be accurate, complete, and protected. Quality cannot be assumed. It has to be monitored and reinforced. When leaders connect data quality to funding decisions, safety outcomes, and performance measures, governance becomes part of the business conversation, rather than an IT task.",
      },
      { type: "heading", text: "Lifecycle and Traceability" },
      {
        type: "paragraph",
        text: "Data does not just appear in a dashboard. It originates somewhere; it moves; it is transformed; and it is reported. People must be able to trace that path. They need to see where a number came from and reproduce it using the same data and logic. If results cannot be recreated, confidence drops quickly. Leaders cannot make sound decisions if they doubt the numbers.",
      },
      { type: "heading", text: "Culture and Leadership" },
      {
        type: "paragraph",
        text: "Governance is sustained by culture. Tools and policies matter, but leadership behavior matters more. Leaders set expectations by asking thoughtful questions about the data behind the information they receive. They remove organizational barriers and reinforce that stewardship is part of each role. When governance is reflected in performance discussions and leadership KPIs, it becomes embedded in how the organization operates.",
      },
      { type: "divider" },
      {
        type: "callout",
        text: "At the end of the day, governance is about trust. When people trust the data, they can justify investments, defend priorities, and move forward with confidence. Without that trust, progress slows. With it, agencies are positioned to use technology effectively and improve transportation outcomes.",
      },
    ],
  },
];
