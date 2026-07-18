import { ToastProvider } from "@/components/toast-provider";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Facilities } from "@/components/facilities";
import { WhyPaddleX } from "@/components/why-paddlex";
import { BookingPreview } from "@/components/booking-preview";
import { Membership } from "@/components/membership";
import { Coaching } from "@/components/coaching";
import { Gallery } from "@/components/gallery";
import { Testimonials } from "@/components/testimonials";
import { AdminPreview } from "@/components/admin-preview";
import { AISection } from "@/components/ai-section";
import { ComingSoon } from "@/components/coming-soon";
import { FAQ } from "@/components/faq";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: "PaddleX Pakistan",
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
    <ToastProvider>
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
        <BookingPreview />
        <Membership />
        <Coaching />
        <Gallery />
        <Testimonials />
        <AdminPreview />
        <AISection />
        <ComingSoon />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </ToastProvider>
  );
}
