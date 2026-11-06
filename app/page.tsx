import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
import RouteHome from "@/components/route/route-home";

/* Home, "The Route" concept: the Rawlins story as an eight-stop ride.
   A route bar tracks where you are; each section ends with a "Next stop".
   Dev-only blocks (placeholders, sign-off badges) never render in production. */
export default function Page() {
  const prod = process.env.VERCEL_ENV === "production";
  return (
    <>
      <SiteNav />
      <main className="rt-main">
        <RouteHome prod={prod} />
      </main>
      <SiteFooter />
    </>
  );
}
