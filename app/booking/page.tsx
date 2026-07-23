import { Suspense } from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BookingWizard } from "@/components/booking-flow/wizard";

export const metadata: Metadata = {
  title: "Book a Court | Padel X Pakistan",
  description: "Book your padel court or football ground in a few taps.",
};

export default function BookingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Suspense fallback={<div className="mx-auto max-w-3xl px-5 py-20 text-center text-muted">Loading booking flow…</div>}>
          <BookingWizard />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}