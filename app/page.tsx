import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
import Journey from "@/components/home/journey";

/* Home: the Rawlins story as a journey through a 3D world (handoff v7, 6).
   Dev-only blocks (placeholders, sign-off badges) never render in production. */
export default function Page() {
  const prod = process.env.VERCEL_ENV === "production";
  return (
    <>
      <SiteNav />
      <main className="jy-main">
        <Journey prod={prod} />
      </main>
      <SiteFooter />
    </>
  );
}
