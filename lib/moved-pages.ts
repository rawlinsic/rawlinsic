/* Pages whose address changed with a rename (lib/moved-pages.json; Nov 12: two comments were left on addresses
   that no longer existed after Edit text renamed their pages). */
import MOVED from "./moved-pages.json";

export type MovedList = Record<string, string>;
export const MOVED_SLUGS: MovedList = MOVED.slugs;

/* the address a page has now: each renamed segment followed to its latest name */
/* whole-address moves (an area's address, Nov 13: /services/project-delivery is now /services/program-project-delivery).
   Kept apart from the slugs because the old area address is also the Project Delivery service's own segment. */
export const MOVED_PATHS: MovedList = (MOVED as { paths?: MovedList }).paths ?? {};
const byPrefix = (path: string, paths: MovedList) => {
  const from = Object.keys(paths).find((k) => path === k || path.startsWith(`${k}/`));
  return from ? paths[from] + path.slice(from.length) : path;
};
export const movedPath = (path: string, slugs: MovedList = MOVED_SLUGS, paths: MovedList = MOVED_PATHS) =>
  byPrefix(path, paths).split("/").map((seg) => { let s = seg; for (let k = 0; k < 8 && slugs[s]; k++) s = slugs[s]; return s; }).join("/");

/* add a rename to the list: the new name is a live address again, and older names that led to the old one now
   lead to the new one (so a rename and back never loops) */
export function addMove(slugs: MovedList, from: string, to: string): MovedList {
  if (!from || !to || from === to) return slugs;
  const out: MovedList = { ...slugs, [from]: to };
  delete out[to];
  for (const k of Object.keys(out)) { if (out[k] === from) out[k] = to; if (out[k] === k) delete out[k]; }
  return out;
}
