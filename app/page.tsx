import Header from "@/components/v8/header";
import Footer from "@/components/v8/footer";
import Home from "@/components/v8/home";
import Reveal from "@/components/v8/reveal";

/* Home (v8 design on the handoff v8 structure). Dev-only marks never render in production. */
/* hourly, so an event drops off the day after it ends without a new deploy */
export const revalidate = 3600;
export default function Page() {
  return (
    <>
      <Header />
      <main id="main-content" className="v8 v8-home">
        <Home />
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
