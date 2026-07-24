import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Facilities } from "@/components/facilities";
import { WhyPadelX } from "@/components/why-padelx";
import { JoinMatch } from "@/components/join-match";
import { BookingPreview } from "@/components/booking-preview";
import { Tournaments } from "@/components/tournaments";
import { ClubManagement } from "@/components/club-management";
import { Academy } from "@/components/academy";
import { Coaches } from "@/components/coaches";
import { Gallery } from "@/components/gallery";
import { Location } from "@/components/location";
import { GoogleReviews } from "@/components/google-reviews";
import { FAQ } from "@/components/faq";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: "Padel X Pakistan",
  description:
    "Premium padel courts, football grounds, coaching academy and online booking platform in Karachi.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Karachi",
    addressCountry: "PK",
  },
  sameAs: ["https://www.instagram.com/padelxpakistan/"],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <Hero />
        <div className="mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-border to-transparent" />
        <Facilities />
        <WhyPadelX />
        <JoinMatch />
        <BookingPreview />
        <Tournaments />
        <ClubManagement />
        <Academy />
        <Coaches />
        <Gallery />
        <Location />
        <GoogleReviews />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
