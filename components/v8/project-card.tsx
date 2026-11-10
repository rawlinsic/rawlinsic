/* A project as a full card (Nicole, Nov 10: the cards were "so minimal"): the
   photo with its status on it, the areas it draws on, the title, the client,
   the challenge in a line or two, and a clear link. Used for Featured projects
   on home, area, service, and industry pages. */
import type { CSSProperties } from "react";
import { AREAS, caseHref, caseTag, serviceById, type CaseIndex } from "@/lib/content/site";
import { CASES as CASE_DATA } from "@/lib/content/catalog";
import { casePhoto, themeStyle } from "@/lib/content/v8";
import { CaseNote } from "@/components/site/ui";

const firstSentence = (s: string) => (s.match(/^.*?[.!?](\s|$)/)?.[0] ?? s).trim();

export default function ProjectCard({ c, style }: { c: CaseIndex; style?: CSSProperties }) {
  const areas = Array.from(new Set(c.services.map((s) => serviceById(s)?.area.id).filter(Boolean) as string[]));
  const ch = CASE_DATA[c.id]?.ch;
  const live = c.status === "Ongoing";
  return (
    <li className="pc pcx" style={style} data-reveal>
      <a href={caseHref(c)}>
        <span className="pcx-ph">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={casePhoto(c)} alt="" loading="lazy" />
          <span className={`pcx-status${live ? " is-live" : ""}`}>{caseTag(c)}</span>
        </span>
        <span className="pcx-body">
          {areas.length > 0 && (
            <span className="pcx-areas">{areas.map((id) => <i key={id} style={themeStyle(id)}>{AREAS.find((a) => a.id === id)!.name}</i>)}</span>
          )}
          <b>{c.title}</b>
          <span className="pcx-who">{c.who}</span>
          {ch && <span className="pcx-ch">{firstSentence(ch)}</span>}
          <CaseNote id={c.id} />
          <span className="pcx-more">See the project</span>
        </span>
      </a>
    </li>
  );
}
