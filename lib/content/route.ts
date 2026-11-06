/* "The Route" concept: the site as a transit system.
   Service areas are lines, services are stations, industries are transfer
   stations where lines meet. Line colors are wayfinding, not decoration. */
import { AREAS, VISIBLE_INDUSTRIES, serviceById } from "@/lib/content/site";
import { SERVICES } from "@/lib/content/catalog";

export const LINE: Record<string, { code: string; color: string; short: string }> = {
  strategy: { code: "S", color: "#5a55d9", short: "Strategy" },
  delivery: { code: "D", color: "#ef7d2d", short: "Delivery" },
  om: { code: "M", color: "#21966a", short: "Operations" },
  tech: { code: "T", color: "#2f7bf5", short: "Digital" },
  aviation: { code: "A", color: "#14a3cf", short: "Air" },
};

/* Station code for a service: line letter + position, e.g. D3 */
export function stationCode(serviceId: string) {
  const hit = serviceById(serviceId);
  if (!hit) return "";
  const i = hit.area.services.findIndex((s) => s.id === serviceId);
  return `${LINE[hit.area.id].code}${i + 1}`;
}

/* Which lines stop at an industry (from each service's "where we do this") */
export function linesAt(industryId: string) {
  return AREAS.filter((a) => a.services.some((s) => SERVICES[s.id]?.industries.includes(industryId))).map((a) => a.id);
}

export const TRANSFERS = VISIBLE_INDUSTRIES.map((i) => ({ industry: i, lines: linesAt(i.id) }));

/* The home route: eight stops */
export const STOPS = [
  { id: "departure", label: "Departure" },
  { id: "the-people", label: "We've done the job" },
  { id: "start", label: "Where are you starting?" },
  { id: "lines", label: "What we do" },
  { id: "transfers", label: "Who we work with" },
  { id: "proof", label: "The proof" },
  { id: "extension", label: "Where we're headed" },
  { id: "arrival", label: "Get in touch" },
] as const;
