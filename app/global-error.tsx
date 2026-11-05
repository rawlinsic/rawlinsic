"use client";
/* Last-resort error page (replaces the framework default). */
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, minHeight: "100vh", display: "grid", placeItems: "center", background: "#f7f9fc", color: "#0d1b2e", fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" }}>
        <main style={{ maxWidth: 560, padding: 24 }}>
          <h1 style={{ color: "#203864" }}>Something went wrong.</h1>
          <p>Please try again. If it keeps happening, email us at <a href="mailto:info@rawlinsic.com">info@rawlinsic.com</a>.</p>
          <p><button type="button" onClick={() => reset()} style={{ minHeight: 44, padding: "0 18px", borderRadius: 999, border: 0, background: "#1b5ccc", color: "#fff", fontWeight: 700, cursor: "pointer" }}>Try again</button> <a href="/" style={{ marginLeft: 12 }}>Go to the home page</a></p>
        </main>
      </body>
    </html>
  );
}
