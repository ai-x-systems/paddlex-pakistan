"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/animated-counter";
import { HeroRacketBall } from "@/components/hero-racket-ball";

// Real 3D centerpiece needs a browser/WebGL context, so it's client-only and
// loaded lazily. While it loads (or if WebGL genuinely isn't available), the
// existing 2D racket/ball graphic renders instead — same visual idea, just
// without the dependency, so the hero never shows a blank gap.
const Hero3DCenterpiece = dynamic(
  () => import("@/components/hero-3d-centerpiece").then((m) => m.Hero3DCenterpiece),
  {
    ssr: false,
    loading: () => (
      <div className="relative h-full w-full">
        <HeroRacketBall />
      </div>
    ),
  }
);

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-28 md:pb-20">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-35" />
      <div
        className="pointer-events-none absolute left-1/2 top-[-420px] h-[900px] w-[900px] -translate-x-1/2 rounded-full opacity-[0.16] blur-[140px]"
        style={{ background: "radial-gradient(circle, #2563EB 0%, transparent 65%)" }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-14 px-5 md:px-7 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-none lg:text-left">
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
            className="mb-5 text-[42px] font-black uppercase leading-[1.03] tracking-[-0.03em] sm:text-[58px] md:text-[72px]"
          >
            Karachi&apos;s <span className="text-gradient">Multi-Sport</span> Arena
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mb-9 max-w-lg text-[16px] leading-relaxed text-muted md:text-[19px] lg:mx-0"
          >
            Eight floodlit padel courts, a full football ground, and pickleball &mdash; open till
            2 AM, built for players who take their game seriously.
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
            {/* TODO: no Academy section exists yet — pointed at Facilities as a
                placeholder until that page/section is built. */}
            <Button size="lg" variant="outline" asChild>
              <a href="#facilities">Explore Academy</a>
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="relative mx-auto h-[340px] w-full max-w-[420px] lg:h-[460px]"
        >
          <Hero3DCenterpiece />
        </motion.div>
      </div>
    </section>
  );
}
