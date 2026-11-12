/* Sections deleted with the preview's "Delete section" button (Nicole only; off
   on Jacob's version). The layout hides them by selector before the page draws.
   Claude Code removes them from the code for good before launch. Written by
   app/api/preview-sections; Undo restores them. */
export type RemovedSection = { page: string; sel: string; heading: string; by: string; at: string };
export const REMOVED_SECTIONS: RemovedSection[] = [
  {
    "page": "/industries",
    "sel": "#talk",
    "heading": "Tell us what you’re working on",
    "by": "Nicole",
    "at": "2026-11-12T07:34:51.061Z"
  }
];
