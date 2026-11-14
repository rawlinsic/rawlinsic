/* Events as cards, used on News & Recognition and on the International page (Nicole, Nov 11).
     UpcomingEvents   "Where we'll be next": one wide row per event, soonest first
     PastEvents       "Where we've been": photo cards, newest first, each marked "Past event" so it's clear
   An event moves from the first list to the second on its own the day after it ends (lib/content/news.ts).
   Nov 13 (Nicole): every card has a picture ("we also need images for the where we'll be next not the big calendar
   date and then list that again"; "the other where we've been need images too"), the cards come up as you scroll like
   the other sections, and on News & Recognition the past events show three at a time in a row with arrows. */
import type { EventItem } from "@/lib/content/news";
import { Pin } from "@/components/site/people";
import Rail from "@/components/v8/rail";

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

/* The card's picture: the event's own photo; for an event whose photo is its header banner (words in the picture), the
   tall version made for cards; then `card` (a picture for this card only); the date only as a last resort. No faces
   (Nicole, Nov 13): every past event now has a picture of the event. */
function EventPic({ e }: { e: EventItem }) {
  const src = e.photo && !e.banner ? e.photo : e.banner ? e.tall ?? e.photo : e.card;
  /* eslint-disable-next-line @next/next/no-img-element */
  /* the tall card version has the event's banner a little above its middle */
  if (src) return <img className="evx-ph" src={src} alt="" loading="lazy" style={e.banner ? { objectPosition: "50% 30%" } : e.pos ? { objectPosition: e.pos } : undefined} />;
  return <span className="evx-ph evx-noph" aria-hidden="true"><DateBlock when={e.when} /></span>;
}

export function UpcomingEvents({ events }: { events: EventItem[] }) {
  return (
    <ul className="evx evx-next evx2">
      {events.map((e) => (
        <li key={e.title} data-reveal>
          <EventPic e={e} />
          <div className="evx-body">
            <p className="evx-tags">{e.intl && <i>International Markets</i>}{e.role && <i>{e.role}</i>}</p>
            <h3>{e.cardTitle ?? e.title}</h3>
            <p className="evx-where"><span className="evx-when">{e.when}</span>{e.where && <span className="evx-place"><Pin />{e.where}</span>}</p>
            {e.sessions?.length ? <Sessions e={e} /> : (e.line ?? e.note) && <p className="evx-text">{e.line ?? e.note}</p>}
            <p className="evx-go">
              <a className="ed-btn is-white" href="/contact#message">Plan to meet us</a>
              {e.href && <a className="ed-more" href={e.href} {...ext}>Event details</a>}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function PastCard({ e, reveal }: { e: EventItem; reveal?: boolean }) {
  return (
    <li className="has-photo" data-reveal={reveal ? "" : undefined}>
      {e.href ? <a className="evx-phl" href={e.href} {...ext} tabIndex={-1} aria-hidden="true"><EventPic e={e} /></a> : <EventPic e={e} />}
      <div className="evx-body">
        <p className="evx-tags"><i className="evx-over">Past event</i>{e.intl && <i>International Markets</i>}{e.role && <i>{e.role}</i>}</p>
        <h3>{e.href ? <a href={e.href} {...ext}>{e.title}</a> : e.title}</h3>
        <p className="evx-where"><span className="evx-when">{e.when}</span>{e.where && <span className="evx-place"><Pin />{e.where}</span>}</p>
        {e.sessions?.length ? <Sessions e={e} /> : (e.past ?? e.note) && <p className="evx-text">{e.past ?? e.note}</p>}
        {e.href && <p className="evx-go"><a className="ed-more" href={e.href} {...ext}>Read about it</a></p>}
      </div>
    </li>
  );
}

/* rail: four at a time in a row with arrows above it (News & Recognition, Nicole, Nov 13: "4 ... not three") */
export function PastEvents({ events, rail = false }: { events: EventItem[]; rail?: boolean }) {
  if (rail) return <div className="evx evx-past evx-rail"><Rail label="Where we've been">{events.map((e) => <PastCard key={e.title} e={e} />)}</Rail></div>;
  return <ul className="evx evx-past">{events.map((e) => <PastCard key={e.title} e={e} reveal />)}</ul>;
}
