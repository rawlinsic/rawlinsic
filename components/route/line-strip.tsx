/* Service and heading pages, "The Route": the line this page sits on, with
   "you are here" and the previous and next stops, so you can ride the line. */
import { AREAS } from "@/lib/content/site";
import { LINE } from "@/lib/content/route";

export function LineStrip({ areaId, current }: { areaId: string; current?: string }) {
  const a = AREAS.find((x) => x.id === areaId)!;
  const L = LINE[a.id];
  const i = current ? a.services.findIndex((s) => s.id === current) : -1;
  return (
    <nav className="ls" aria-label={`${a.name} line`} style={{ ["--c" as string]: L.color, ["--n" as string]: a.services.length }}>
      <div className="ls-in">
        <a className="ls-name" href={`/services/${a.slug}`}><span className="rt-bullet">{L.code}</span>{a.name} line</a>
        <ol className="ls-stations">
          {a.services.map((s, k) => (
            <li key={s.id} className={k === i ? "is-here" : k < i ? "is-past" : ""}>
              <a href={`/services/${a.slug}/${s.slug}`} aria-current={k === i ? "page" : undefined}>
                <span className="ls-dot" aria-hidden="true" />
                <span className="ls-code">{L.code}{k + 1}</span>
                <span className="ls-label">{s.name}</span>
              </a>
            </li>
          ))}
        </ol>
        {k(i, a)}
      </div>
    </nav>
  );
}
function k(i: number, a: (typeof AREAS)[number]) {
  if (i < 0) return null;
  return (
    <p className="ls-here"><span>You are here: <b>{a.services[i].name}</b></span></p>
  );
}

/* Big "next stop" at the end of a service page */
export function NextStation({ areaId, current }: { areaId: string; current: string }) {
  const ai = AREAS.findIndex((x) => x.id === areaId);
  const a = AREAS[ai];
  const i = a.services.findIndex((s) => s.id === current);
  const next = a.services[i + 1];
  const nextArea = AREAS[(ai + 1) % AREAS.length];
  const target = next
    ? { href: `/services/${a.slug}/${next.slug}`, label: next.name, line: a, code: `${LINE[a.id].code}${i + 2}` }
    : { href: `/services/${nextArea.slug}`, label: `Transfer to the ${nextArea.name} line`, line: nextArea, code: LINE[nextArea.id].code };
  const prev = a.services[i - 1];
  return (
    <nav className="ns" aria-label="Ride the line" style={{ ["--c" as string]: LINE[target.line.id].color }}>
      <div className="ns-in">
        {prev ? <a className="ns-prev" href={`/services/${a.slug}/${prev.slug}`}><span>Previous stop</span><b>{prev.name}</b></a> : <a className="ns-prev" href={`/services/${a.slug}`}><span>Back to the line</span><b>{a.name}</b></a>}
        <a className="ns-next" href={target.href}><span>Next stop</span><b><i className="rt-bullet">{target.code}</i>{target.label}</b><em aria-hidden="true">→</em></a>
      </div>
    </nav>
  );
}
