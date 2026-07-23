import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Facilities } from "@/components/facilities";
import { WhyPaddleX } from "@/components/why-paddlex";
import { JoinMatch } from "@/components/join-match";
import { BookingPreview } from "@/components/booking-preview";
import { Tournaments } from "@/components/tournaments";
import { ClubManagement } from "@/components/club-management";
import { Gallery } from "@/components/gallery";
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
        <WhyPaddleX />
        <JoinMatch />
        <BookingPreview />
        <Tournaments />
        <ClubManagement />
        <Gallery />
        <GoogleReviews />
        <FAQ />
        <Contact />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
