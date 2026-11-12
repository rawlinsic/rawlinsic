/* GitHub access for the preview review tools (Undo, Delete section). Preview
   builds only; never touches main. Needs EDIT_GITHUB_TOKEN (Vercel, Preview). */

export type GH = (path: string, init?: RequestInit) => Promise<any>; // eslint-disable-line @typescript-eslint/no-explicit-any

export function previewGitHub(): { gh: GH; branch: string } | { error: string; status: number } {
  if (process.env.VERCEL_ENV !== "preview") return { error: "Not available", status: 404 };
  const token = process.env.EDIT_GITHUB_TOKEN, branch = process.env.VERCEL_GIT_COMMIT_REF;
  if (!token) return { error: "The review tools aren't set up yet (GitHub token missing in Vercel).", status: 503 };
  if (!branch || branch === "main") return { error: "This preview's branch can't be changed.", status: 403 };
  const repo = `${process.env.VERCEL_GIT_REPO_OWNER || "rawlinsic"}/${process.env.VERCEL_GIT_REPO_SLUG || "rawlinsic"}`;
  const gh: GH = async (path, init) => {
    const r = await fetch(`https://api.github.com/repos/${repo}${path}`, { ...init, headers: { authorization: `Bearer ${token}`, accept: "application/vnd.github+json", "x-github-api-version": "2022-11-28", ...(init?.headers || {}) }, cache: "no-store" });
    if (!r.ok) { const e = new Error(`GitHub ${r.status}`) as Error & { status: number }; e.status = r.status; throw e; }
    return r.status === 204 ? null : r.json();
  };
  return { gh, branch };
}

/* The review version (Nicole, Nov 12): the branch other people comment on. Any branch with "review" as a word
   in its name. Comments carry each person's name, and Delete section is off. */
export const isReviewVersion = (branch = process.env.VERCEL_GIT_COMMIT_REF || "") => /(^|[-_/])review($|[-_/])/i.test(branch);

/* Only Nicole deletes sections: on by default, off on Jacob's version and on the review version. */
export const canDeleteSections = (branch = process.env.VERCEL_GIT_COMMIT_REF || "") => !/jacob/i.test(branch) && !isReviewVersion(branch);

/* Jacob's version (any branch named for him; Nicole, Nov 10): the About pages are closed and About shows
   only as a top-level menu word; links to the pages below go nowhere (JACOB_DEAD_LINKS). */
export const isJacobVersion = (branch = process.env.VERCEL_GIT_COMMIT_REF || "") => /jacob/i.test(branch);
export const aboutClosed = isJacobVersion;
/* links that do nothing on Jacob's version: [match, href]. "=" exact, "^" starts with */
export const JACOB_DEAD_LINKS: [string, string][] = [
  ["=", "/insights"], ["^", "/insights/news"], ["^", "/insights/thought-leadership"], ["^", "/insights/research"], ["^", "/insights/podcast"],
  ["^", "/about"], ["=", "/services"], ["^", "/industries/international"],
];

/* One commit on the branch with the given files (content null = delete the file). */
export async function commitFiles(gh: GH, branch: string, files: { path: string; content: string | null }[], message: string) {
  const ref = await gh(`/git/ref/heads/${encodeURIComponent(branch)}`);
  const head: string = ref.object.sha;
  const commit = await gh(`/git/commits/${head}`);
  const tree = await gh(`/git/trees`, { method: "POST", body: JSON.stringify({ base_tree: commit.tree.sha, tree: files.map((f) => (f.content === null ? { path: f.path, mode: "100644", type: "blob", sha: null } : { path: f.path, mode: "100644", type: "blob", content: f.content })) }) });
  const made = await gh(`/git/commits`, { method: "POST", body: JSON.stringify({ message, tree: tree.sha, parents: [head] }) });
  await gh(`/git/refs/heads/${encodeURIComponent(branch)}`, { method: "PATCH", body: JSON.stringify({ sha: made.sha, force: false }) });
  return made.sha as string;
}

export async function readFile(gh: GH, branch: string, path: string): Promise<string | null> {
  try { const f = await gh(`/contents/${path}?ref=${encodeURIComponent(branch)}`); return Buffer.from(f.content, "base64").toString("utf8"); }
  catch (e) { if ((e as { status?: number }).status === 404) return null; throw e; }
}
