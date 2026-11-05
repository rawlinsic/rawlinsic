/* Which background version to show.
   - Photo version (default, and what launches): the live site's photos/video.
   - 3D version: the real-time world. Turn it on for everyone with
     RAWLINS_SCENES=3d, or preview it on non-production deployments by adding
     ?view=3d to any address (?view=photo switches back). */
export function want3D(): boolean {
  if (typeof window === "undefined") return false;
  if (process.env.RAWLINS_SCENES === "3d") return true;
  if (process.env.RAWLINS_ENV === "production") return false;
  try {
    const q = new URLSearchParams(window.location.search).get("view");
    if (q === "3d") sessionStorage.setItem("rw-view", "3d");
    if (q === "photo") sessionStorage.removeItem("rw-view");
    return sessionStorage.getItem("rw-view") === "3d";
  } catch {
    return false;
  }
}
