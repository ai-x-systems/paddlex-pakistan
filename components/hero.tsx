"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/animated-counter";

// The 3D racket needs a browser/WebGL context, so it's client-only and
// loaded lazily. While it loads, the lime-themed 2D racket/ball graphic
// renders instead, so the hero never shows a gap.
const Hero3DCenterpiece = dynamic(
  () => import("@/components/hero-3d-centerpiece").then((m) => m.Hero3DCenterpiece),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0">
        <HeroRacketBall />
      </div>
    ),
  }
);

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-28 md:pb-20">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-35" />

      {/* Full-bleed 3D layer — the racket positions and lights itself within
          this, the same way the reference's .hero__stage is a position:
          absolute; inset:0 background behind the text, not a boxed graphic. */}
      <Hero3DCenterpiece />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 md:px-7">
        <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-[62%] lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.02] px-4 py-1.5 text-[12.5px] text-muted"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green shadow-[0_0_10px_#C8FF00]" />
            Now booking &middot; Karachi
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-5 text-[clamp(30px,9.5vw,42px)] font-black uppercase leading-[1.03] tracking-[-0.03em] sm:text-[58px] md:text-[72px]"
          >
            Karachi&apos;s <span className="text-gradient">Multi-Sport</span> Arena
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mb-9 max-w-lg text-[16px] leading-relaxed text-muted md:text-[19px] lg:mx-0"
          >
            Eight floodlit padel courts, dedicated pickleball courts, and a full futsal ground
            &mdash; open till 2 AM, built for players who take their game seriously.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-16 flex flex-wrap items-center justify-center gap-3.5 lg:justify-start"
          >
            <Button size="lg" asChild>
              <a href="#booking-preview">Book a Court</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#academy">Explore Academy</a>
            </Button>
          </motion.div>

          <div className="mx-auto grid max-w-md grid-cols-3 border-t border-border-soft pt-8 lg:mx-0">
            <div className="text-center lg:text-left">
              <AnimatedCounter target={500} suffix="+" />
              <div className="mt-1.5 text-[12.5px] uppercase tracking-wider text-muted-2">Players</div>
            </div>
            <div className="text-center lg:text-left">
              <AnimatedCounter target={10000} suffix="+" />
              <div className="mt-1.5 text-[12.5px] uppercase tracking-wider text-muted-2">Bookings</div>
            </div>
            <div className="text-center lg:text-left">
              <AnimatedCounter target={4.9} decimal suffix="★" />
              <div className="mt-1.5 text-[12.5px] uppercase tracking-wider text-muted-2">Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue — bottom-right, vertical "Scroll" label with an animated
          dropping line, matching the reference's .hero__scroll exactly.
          Desktop-only (matches its 900px cutoff), decorative. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-8 right-6 z-10 hidden items-center gap-2 text-[12.8px] uppercase tracking-[0.24em] text-white/40 min-[900px]:flex"
        style={{ writingMode: "vertical-rl" }}
      >
        <span className="h-[52px] w-px animate-hero-scroll-drop bg-gradient-to-b from-brand-green to-transparent" />
        Scroll
      </div>
    </section>
  );
}
