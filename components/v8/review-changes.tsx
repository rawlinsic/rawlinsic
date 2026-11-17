"use client";
/* The all-changes list on the review version (app/review/changes/page.tsx): every Edit text change, newest first,
   with filters by person and by page. Each shows who, when (Pacific), the page, where the text lives in the code,
   and the wording before and after. The editor and the flags leave this page's words alone (.chg-page). */
import { useState } from "react";
import { pacific, type RecordEntry } from "@/lib/edit-record";

const KIND: Record<RecordEntry["kind"], string> = { edit: "", fix: "Fix", undo: "Undo", redo: "Redo" };

export default function ReviewChanges({ entries, names }: { entries: RecordEntry[]; names: Record<string, string> }) {
  const [person, setPerson] = useState("");
  const [page, setPage] = useState("");
  const people = Array.from(new Set(entries.map((e) => e.who))).sort((a, b) => a.localeCompare(b));
  const pages = Array.from(new Set(entries.map((e) => e.page))).sort((a, b) => (names[a] || a).localeCompare(names[b] || b));
  const shown = entries.filter((e) => (!person || e.who === person) && (!page || e.page === page));
  return (
    <>
      <h1 className="chg-h1">All changes</h1>
      <p className="chg-lead">Every change made with Edit text on the review version, newest first. Times are Pacific.</p>
      <div className="chg-filters">
        <label>Person
          <select value={person} onChange={(e) => setPerson(e.target.value)}>
            <option value="">Everyone</option>
            {people.map((p) => <option key={p} value={p}>{p} ({entries.filter((e) => e.who === p).length})</option>)}
          </select>
        </label>
        <label>Page
          <select value={page} onChange={(e) => setPage(e.target.value)}>
            <option value="">Every page</option>
            {pages.map((p) => <option key={p} value={p}>{names[p] || p}</option>)}
          </select>
        </label>
        <p className="chg-count" aria-live="polite">{shown.length} of {entries.length}</p>
      </div>
      <ol className="chg-list">
        {shown.map((e, k) => (
          <li key={`${e.id}-${k}`} className={`chg-item is-${e.kind} is-${e.status}`}>
            <p className="chg-meta">
              {KIND[e.kind] && <span className="chg-tag">{KIND[e.kind]}</span>}
              <b>{e.who}</b> · {pacific(e.at, true)} PT · <a href={e.page}>{names[e.page] || e.page}</a>
            </p>
            <div className="chg-words">
              <div><span className="chg-k">Before</span><p>{e.before || <em>(no words)</em>}</p></div>
              <div><span className="chg-k">After</span><p>{e.after || <em>(taken out)</em>}</p></div>
            </div>
            {e.landed && <p className="chg-note">The editor garbled this save. It came out as “{e.landed}”.</p>}
            {e.status === "breaks" && <p className="chg-note">Line breaks changed.</p>}
            {e.status === "list" && <p className="chg-note">The editor couldn’t place this one. It went to the list for Claude Code and wasn’t placed.</p>}
            {e.status === "applied" && <p className="chg-note">The editor couldn’t place this one. Claude Code placed it from the list.</p>}
            {e.files.length > 0 && <p className="chg-files">Where the text lives: {e.files.map((f) => <code key={f}>{f}</code>)}</p>}
          </li>
        ))}
      </ol>
    </>
  );
}
