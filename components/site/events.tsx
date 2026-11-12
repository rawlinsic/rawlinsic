/* Events as cards, used on News & Recognition and on the International page (Nicole, Nov 11).
     UpcomingEvents   "Where we'll be next": one wide row per event, soonest first, with the date in a block
     PastEvents       "Where we've been": photo cards, newest first, each marked "Past event" so it's clear
   An event moves from the first list to the second on its own the day after it ends (lib/content/news.ts). */
import type { EventItem } from "@/lib/content/news";
import { Pin } from "@/components/site/people";

const parts = (when: string) => {
  const m = when.match(/^([A-Za-z]+)\s+([\d–-]+)(?:,\s*(\d{4}))?$/);
  return m ? { mon: m[1], days: m[2], year: m[3] } : null;
};
function DateBlock({ when }: { when: string }) {
  const d = parts(when);
  return <span className={`evx-date${d ? "" : " is-text"}`}>{d ? <><em>{d.mon}</em><b>{d.days}</b>{d.year && <small>{d.year}</small>}</> : <b>{when}</b>}</span>;
}
const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
/* The sessions one of our people led at the event, under their name. Shown in place of the sentence that says the same. */
function Sessions({ e }: { e: EventItem }) {
  if (!e.sessions?.length) return null;
  return (
    <div className="evx-sess">
      {e.who && <p>{e.who}</p>}
      <ul>{e.sessions.map((x) => <li key={x.title}><span><b>{x.day}</b><i>{x.role}</i></span>{x.title}</li>)}</ul>
    </div>
  );
}

export function UpcomingEvents({ events }: { events: EventItem[] }) {
  return (
    <ul className="evx evx-next">
      {events.map((e) => (
        <li key={e.title} className={e.photo && !e.banner ? "has-photo" : e.badge ? "has-badge" : undefined}>
          <DateBlock when={e.when} />
          <div className="evx-body">
            <p className="evx-tags">{e.intl && <i>International Markets</i>}{e.role && <i>{e.role}</i>}</p>
            <h3>{e.cardTitle ?? e.title}</h3>
            {e.where && <p className="evx-where"><span className="evx-place"><Pin />{e.where}</span></p>}
            {e.sessions?.length ? <Sessions e={e} /> : (e.line ?? e.note) && <p className="evx-text">{e.line ?? e.note}</p>}
            <p className="evx-go">
              <a className="ed-btn is-white" href="/contact">Plan to meet us</a>
              {e.href && <a className="ed-more" href={e.href} {...ext}>Event details</a>}
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {e.photo && !e.banner ? <img className="evx-ph" src={e.photo} alt="" loading="lazy" style={e.pos ? { objectPosition: e.pos } : undefined} />
            /* eslint-disable-next-line @next/next/no-img-element */
            : e.badge ? <img className="evx-badge" src={e.badge} alt="" loading="lazy" /> : null}
        </li>
      ))}
    </ul>
  );
}

export function PastEvents({ events }: { events: EventItem[] }) {
  return (
    <ul className="evx evx-past">
      {events.map((e) => (
        <li key={e.title} className={e.photo && !e.banner ? "has-photo" : undefined}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {e.photo && !e.banner ? <img className="evx-ph" src={e.photo} alt="" loading="lazy" style={e.pos ? { objectPosition: e.pos } : undefined} />
            /* no photo on file: the date on a navy panel the same size, so the row of cards lines up */
            : <span className="evx-ph evx-noph" aria-hidden="true"><DateBlock when={e.when} /></span>}
          <div className="evx-body">
            <p className="evx-tags"><i className="evx-over">Past event</i>{e.intl && <i>International Markets</i>}{e.role && <i>{e.role}</i>}</p>
            <h3>{e.title}</h3>
            <p className="evx-where"><span className="evx-when">{e.when}</span>{e.where && <span className="evx-place"><Pin />{e.where}</span>}</p>
            {e.sessions?.length ? <Sessions e={e} /> : (e.past ?? e.note) && <p className="evx-text">{e.past ?? e.note}</p>}
            {e.href && <p className="evx-go"><a className="ed-more" href={e.href} {...ext}>Read about it</a></p>}
          </div>
        </li>
      ))}
    </ul>
  );
}
