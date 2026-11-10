/* Sections deleted with the preview's "Delete section" button (Nicole only; off
   on Jacob's version). The layout hides them by selector before the page draws.
   Claude Code removes them from the code for good before launch. Written by
   app/api/preview-sections; Undo restores them. */
export type RemovedSection = { page: string; sel: string; heading: string; by: string; at: string };
export const REMOVED_SECTIONS: RemovedSection[] = [
  {
    "page": "/contact",
    "sel": "#claude-test-not-a-real-section",
    "heading": "Claude test (will undo)",
    "by": "Claude (test)",
    "at": "2026-11-10T03:30:10.003Z"
  }
];
