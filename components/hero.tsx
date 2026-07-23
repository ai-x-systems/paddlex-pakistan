"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/animated-counter";
import { HeroShowcase } from "@/components/hero-showcase";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-28 md:pb-28 md:pt-32">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-35" />
      <div
        className="pointer-events-none absolute left-1/2 top-[-420px] h-[900px] w-[900px] -translate-x-1/2 rounded-full opacity-[0.16] blur-[140px]"
        style={{ background: "radial-gradient(circle, #2563EB 0%, transparent 65%)" }}
      />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-14 px-5 md:px-7 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
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
            className="mb-5 text-[38px] font-black leading-[1.03] tracking-[-0.035em] sm:text-[52px] md:text-[64px]"
          >
            Pakistan&apos;s Premium <span className="text-gradient">Padel &amp; Football</span> Experience
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mb-9 max-w-lg text-[16px] leading-relaxed text-muted md:text-[19px] lg:mx-0"
          >
            Book courts in seconds, manage reservations effortlessly, and enjoy a premium sports
            experience &mdash; built for players who don&apos;t wait in line.
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
              <a href="#facilities">View Facilities</a>
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
          className="hidden lg:block"
        >
          <HeroShowcase />
        </motion.div>
      </div>
    </section>
  );
}
