/* All changes (Nicole, Nov 16): every Edit text change on the review version, newest first, with filters by person
   and by page. Review version only: anywhere else this address doesn't exist. Read from the record of changes
   (lib/edit-record.ts) this build was made from. */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RECORD from "@/lib/edit-record.json";
import type { RecordEntry } from "@/lib/edit-record";
import { isReviewVersion } from "@/lib/preview-gh";
import { pageNames } from "@/lib/page-names";
import { movedPath } from "@/lib/moved-pages";
import { Shell } from "@/components/site/ui";
import ReviewChanges from "@/components/v8/review-changes";

export const metadata: Metadata = { title: "All changes", robots: { index: false, follow: false } };

export default function Page() {
  if (process.env.VERCEL_ENV !== "preview" || !isReviewVersion()) notFound();
  const entries = [...(RECORD as { entries: RecordEntry[] }).entries].sort((a, b) => b.at.localeCompare(a.at)).map((e) => ({ ...e, page: movedPath(e.page || "/") }));
  return (
    <Shell>
      <section className="pg-sec pg-body chg-page">
        <div className="pg-wrap">
          <ReviewChanges entries={entries} names={pageNames(entries.map((e) => e.page))} />
        </div>
      </section>
    </Shell>
  );
}
