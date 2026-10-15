import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Favorites from "@/components/Favorites";
import Showcase from "@/components/Showcase";
import HowItWorks from "@/components/HowItWorks";
import MenuExplorer from "@/components/MenuExplorer";
import Reviews from "@/components/Reviews";
import FinalCta from "@/components/FinalCta";
import { site, telHref } from "@/data/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: site.name,
  description: site.description,
  servesCuisine: ["Tacos", "Pizza", "Chawarma", "Burgers", "Tajines"],
  telephone: site.phones.map((p) => telHref(p).replace("tel:", "")),
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: `${String(site.openHour).padStart(2, "0")}:00`,
    closes: "00:00",
  },
  hasMap: site.mapLink || undefined,
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <Marquee />
      <Favorites />
      <Showcase />
      <HowItWorks />
      <MenuExplorer />
      <Reviews />
      <FinalCta />
    </>
  );
}