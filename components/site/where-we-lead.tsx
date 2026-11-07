/* Drones & Advanced Air Mobility: Where we lead, as a route you scroll down.
   The heading and photo stay put on the left while the route (RouteList)
   fills down the seven numbered stops (numbers from the current site). */
import { WHERE_WE_LEAD } from "@/components/site/aam-data";
import RouteList from "@/components/v8/route-list";

export function WhereWeLead({ photo }: { photo: string }) {
  return (
    <section className="av av-lead rt">
      <div className="v8-wrap av-lead-in">
        <div className="av-lead-copy rt-side">
          <h2 className="v8-h2">Where we lead</h2>
          <p className="v8-lead">Our team helped shape early guidance on drones and advanced air mobility and continues to support its evolution, working directly with transportation agencies and airports to turn strategy into deployable programs.</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="av-lead-photo" src={photo} alt="" loading="lazy" />
        </div>
        <RouteList stops={WHERE_WE_LEAD.map((w) => ({ n: w.n, t: w.t, d: w.d }))} />
      </div>
    </section>
  );
}
