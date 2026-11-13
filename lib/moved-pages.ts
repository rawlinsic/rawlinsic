/* Pages whose address changed with a rename (lib/moved-pages.json; Nov 12: two comments were left on addresses
   that no longer existed after Edit text renamed their pages). */
import MOVED from "./moved-pages.json";

export type MovedList = Record<string, string>;
export const MOVED_SLUGS: MovedList = MOVED.slugs;

/* the address a page has now: each renamed segment followed to its latest name */
export const movedPath = (path: string, slugs: MovedList = MOVED_SLUGS) =>
  path.split("/").map((seg) => { let s = seg; for (let k = 0; k < 8 && slugs[s]; k++) s = slugs[s]; return s; }).join("/");

/* add a rename to the list: the new name is a live address again, and older names that led to the old one now
   lead to the new one (so a rename and back never loops) */
export function addMove(slugs: MovedList, from: string, to: string): MovedList {
  if (!from || !to || from === to) return slugs;
  const out: MovedList = { ...slugs, [from]: to };
  delete out[to];
  for (const k of Object.keys(out)) { if (out[k] === from) out[k] = to; if (out[k] === k) delete out[k]; }
  return out;
}
