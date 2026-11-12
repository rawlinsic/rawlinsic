/* Extra project content from our records (Nov 10). Generic on purpose; every piece shows a preview-only
   "For review" flag (components/site/cases.tsx) so the client or Scott can remove it. */
/* Source keys (OneDrive root, read Nov 10):
   drafts   = Rawlins Branding/services-nav-2026-10-29/Rawlins Case Study Drafts v1 (Nov 2 2026).md
   findings = Rawlins Branding/sweep-2026-11-06/findings_cases.md
   fixes-v3 = Rawlins Website/CONTENT FIXES v3 - Nicole's calls, people's experience, services, new case studies, contract limits (Nov 6 2026).md
   pdn-acc  = 19-Pilot PDN Project/ACCOMPLISHMENTS.md */
export type CaseExtra = { when?: string; did?: string[]; res?: string[] };
export const CASE_EXTRA: Record<string, CaseExtra> = {
  "cs-proficiency": {
    when: "2023 to 2026", // source: drafts:13
    did: [
      "Wrote core and elective proficiencies, task sheets, and demonstration scoring sheets for each program", // source: drafts:21
      "Analyzed appraiser certification requirements and updated the functional organization chart", // source: drafts:23
      "Built a technical training request process: process map, instructions, and a recorded walkthrough", // source: drafts:24
      "Visited all four of the department's regions to support the worker proficiency rollout", // source: drafts:26
    ],
    res: [
      "Proficiency alignment process for engineering submitted to the department's human resources team", // source: drafts:32
      "Organizational financial analysis for the restructuring submitted", // source: drafts:32
    ],
  },
  "cs-tn-ipd": {
    did: [
      "Developed and put in place a project delivery network", // source: findings:8
      "Worked on maintenance quality assurance, an asset management vision, and a quality program", // source: findings:8
    ],
  },
  "cs-pbmc": {
    when: "2023 to 2025", // source: drafts:96
    did: [
      "Led the kickoff with department leadership and finalized field assessment standards and training", // source: drafts:104
      "Joined monthly ride-alongs with regional leadership after award", // source: drafts:107
      "Tracked lessons learned for future performance-based contracts", // source: drafts:108
      "Supported regional leadership's presentation at an industry conference", // source: drafts:108
    ],
  },
  "cs-aero": {
    when: "Since 2024", // source: drafts:220
    did: [
      "Developed a statewide framework for advanced air mobility", // source: drafts:233, findings:68
      "Added example vertiport site plans and graphics to the local planning guidance", // source: drafts:234
      "Prepared reports for the state's transportation innovation council", // source: drafts:236
      "Supported construction drone flights on a state route", // source: drafts:237
    ],
    res: [
      "Earlier statewide advanced air mobility tasks completed and delivered", // source: drafts:245
      "Final local planning guidance routed for the department's internal review", // source: drafts:244
    ],
  },
  "cs-transform": {
    when: "Since 2024", // source: drafts:132
    did: [
      "Developed risk management training and a risk register tool", // source: drafts:142
      "Updated the bridge prioritization screening app", // source: drafts:145, findings:98
      "Drafted screening criteria for choosing alternative delivery methods", // source: drafts:156
      "Researched consultant official-domicile rules in all 50 states", // source: drafts:151
    ],
    res: [
      "Contracting apps moved onto the department's own platform, with connections checked", // source: drafts:162
      "Program development manual draft sent to the department for comment", // source: findings:66, findings:98
    ],
  },
  "cs-pmdiv": {
    when: "Since 2025", // source: drafts:183
    did: [
      "Researched leading practices from peer state and federal agencies in eight areas, mapped to the project life cycle", // source: drafts:197
      "Wrote an executive overview of the project delivery life cycle", // source: drafts:194
      "Set data requirements and rollout communications for the performance measures", // source: drafts:193
      "Developing courses on scope, schedule, cost and budget, risk, quality, and stakeholder communication", // source: drafts:196, findings:50
    ],
  },
  "cs-txmaint": {
    when: "2025 to 2026", // source: drafts:55
    did: [
      "Presented performance-based maintenance and quality assurance concepts to department leadership and its maintenance executive committee", // source: drafts:66
      "Researched the department's pavement and maintenance manuals to set roadway rating criteria", // source: drafts:67
      "Recommended a technology pilot for automated data collection", // source: drafts:68
      "Drafted a two-page winter weather response infographic and a corridor exercise outline", // source: drafts:69
    ],
    res: [
      "Final comments submitted on the second district's specifications", // source: drafts:74
      "Closeout briefing held for department executives", // source: drafts:55
    ],
  },
  "cs-drt": {
    when: "Since 2025", // source: drafts:264
    did: [
      "Built the agenda and rotating-session format for the next response team training", // source: drafts:272
      "Coordinated planning for drone dock installations", // source: drafts:274
      "Prepared a drone fleet management memo with a vendor comparison", // source: drafts:275
      "Summarized the federal proposed rule on beyond-visual-line-of-sight operations", // source: drafts:275
    ],
  },
  "cs-local-am": {
    when: "2024 to 2025", // source: drafts:301
    did: [
      "Added international asset management case studies to the workshops at the state's request", // source: drafts:311
      "Held virtual follow-up meetings to confirm next steps", // source: drafts:312
      "Sent the state deliverable packages: workshop deck, notes, and action plan", // source: drafts:314
    ],
    res: [
      "Kickoffs held with participating cities and county road commissions", // source: drafts:309, drafts:318
    ],
  },
  "cs-workforce": {
    when: "2024 to 2025", // source: drafts:335
    did: [
      "Drafted a benchmarking framework and criteria for choosing peer agencies", // source: drafts:344
      "Drafted outreach and standard questions for peer agency meetings", // source: drafts:344
      "Helped prepare the kickoff and choose interviewees", // source: drafts:343
    ],
  },
  "cs-nc-ipd": {
    when: "2017 to 2021", // source: findings:8
    did: [
      "Helped develop flexible asset maintenance contracts", // source: findings:8
      "Improved processes in the department's technical services", // source: findings:8
      "Assessed the department's preconstruction disciplines", // source: findings:11
    ],
  },
  "cs-strategic": {
    when: "Since 2022", // source: drafts:368, findings:8
    did: [
      "Reviewed the earlier strategic plan and related department plans, and studied plans from other organizations", // source: drafts:377
      "Ran an internal assessment and a market analysis", // source: drafts:378
      "Held asset management visioning workshops with executive leadership", // source: drafts:378
    ],
    res: [
      "Draft deployment plan completed", // source: drafts:386
    ],
  },
  "cs-nv-fleet-program": {
    when: "2022 to 2023", // source: the operations and maintenance work reports, Oct 2022 to Mar 2023, and the amendment scopes
  },
  "cs-aerodiv": {
    when: "Since 2026", // source: drafts:406
  },
  "cs-de-tech": {
    when: "2024 to 2025", // source: findings:19
    res: [
      "One-page summary finalized with the plan", // source: findings:19
    ],
  },
  "cs-partnering": {
    when: "Since 2026", // source: drafts:470
    did: [
      "Coordinated the workshop agenda and approach with both leadership teams", // source: drafts:478
      "Named owner and contractor counterparts for each discipline", // source: drafts:479
      "Walked the team through the risk sharing approach", // source: drafts:481
      "Planned four survey rounds against the adopted goals, with both sides' results shown side by side", // source: drafts:482
    ],
  },
  "cs-ia-partnering": {
    when: "2025 to 2026", // source: findings:17, findings:102
  },
  "cs-db-partnering": {
    when: "2022 to 2026", // source: fixes-v3:222
  },
  "cs-pooled": {
    when: "Since 2026", // source: drafts:440, findings:95
    did: [
      "Built intended-use classes into the testing framework, drawing on national guidance and DOT practice", // source: drafts:450
      "Began identifying candidate projects for comparable pilots in at least three states", // source: drafts:452
    ],
    res: [
      "Working group backed the proposed direction at its consensus session", // source: drafts:456
    ],
  },
  "cs-pdn": {
    when: "Since 2026", // source: pdn-acc:5, pdn-acc:9
    did: [
      "Organized the resource library by discipline, with search, a download per discipline, and an updated date on every file", // source: pdn-acc:11
      "Published clean copies of every tool and template, with tracked changes and reviewer comments removed", // source: pdn-acc:10
      "Built a full preview copy of the site so reviewers could approve changes before go-live", // source: pdn-acc:20, pdn-acc:27
      "Checked every link in the manual, with none broken at release", // source: pdn-acc:41
    ],
    res: [
      "Site launched, and its next version went live after review with no downtime", // source: pdn-acc:9, pdn-acc:12, pdn-acc:27
      "Change requests move through every step without anyone typing a status", // source: pdn-acc:33
    ],
  },
  "cs-hi": {
    did: [
      "Logged each document's disposition in one tracking system", // source: findings:63
    ],
    res: [
      "Review of the wiki documents substantially complete", // source: findings:86
    ],
  },
};
