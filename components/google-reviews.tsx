"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHead } from "@/components/section-head";

function GoogleG() {
  return (
    <svg viewBox="0 0 48 48" className="h-5 w-5">
      <path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-3.1-.4-4.6H24v9h11.8c-.5 2.8-2.1 5.1-4.4 6.7v5.5h7.1c4.2-3.9 6.6-9.6 6.6-16.6z" />
      <path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.3l-7.1-5.5c-2 1.3-4.5 2.1-7.4 2.1-5.7 0-10.5-3.8-12.2-9H4.5v5.7C8.1 41.1 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.8 28.3c-.4-1.3-.7-2.7-.7-4.3s.3-3 .7-4.3v-5.7H4.5C3 16.9 2 20.3 2 24s1 7.1 2.5 10l7.3-5.7z" />
      <path fill="#EA4335" d="M24 10.7c3.2 0 6.1 1.1 8.4 3.3l6.3-6.3C34.9 4.2 29.9 2 24 2 15.4 2 8.1 6.9 4.5 14l7.3 5.7c1.7-5.2 6.5-9 12.2-9z" />
    </svg>
  );
}

const reviews = [
  {
    quote: "Booking used to mean three WhatsApp messages and a wait. Now I pick a slot and I'm on court in a minute.",
    name: "Faizan Z.",
    role: "Weekly member",
    initials: "FZ",
    bg: "#4C82FF",
    fg: "#fff",
  },
  {
    quote: "Court A's lighting is genuinely tournament-grade. My league moved our matches here permanently.",
    name: "Sana R.",
    role: "Padel league captain",
    initials: "SR",
    bg: "#C8FF00",
    fg: "#0A0A0A",
  },
  {
    quote: "My daughter's been in coaching for two months — the coach-to-kid attention is real.",
    name: "Ahmed K.",
    role: "Parent, Coaching",
    initials: "AK",
    bg: "#4C82FF",
    fg: "#fff",
  },
  {
    quote: "Found a doubles partner through the Join a Match feature within a day. Genuinely useful, not gimmicky.",
    name: "Zara N.",
    role: "Casual player",
    initials: "ZN",
    bg: "#C8FF00",
    fg: "#0A0A0A",
  },
  {
    quote: "Ran our office 5-a-side tournament here. Smooth from registration to the final whistle.",
    name: "Owais H.",
    role: "Corporate event organizer",
    initials: "OH",
    bg: "#4C82FF",
    fg: "#fff",
  },
];

export function GoogleReviews() {
  const trackRef = useRef<HTMLDivElement>(null);

  function scroll(dir: 1 | -1) {
    trackRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  }

  return (
    <section className="py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-7">
        <div className="mb-13 flex flex-wrap items-end justify-between gap-6 md:mb-14">
          <div>
            <SectionHead eyebrow="Google Reviews" title="What players are saying." className="mb-0" />
            <div className="mt-3 flex items-center gap-2 text-[13px] text-muted">
              <GoogleG />
              <span className="font-semibold text-ink">4.9</span>
              <span className="text-brand-green">★★★★★</span>
              <span className="text-muted-2">based on 340+ Google reviews</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll(-1)}
              aria-label="Previous reviews"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-brand-green hover:text-brand-green"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="Next reviews"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-brand-green hover:text-brand-green"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <motion.div
          ref={trackRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="flex snap-x snap-mandatory gap-4.5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {reviews.map((r) => (
            <div
              key={r.name}
              className="w-[300px] shrink-0 snap-start rounded-[18px] border border-border bg-surface p-6.5 sm:w-[340px]"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-[13px] tracking-[2px] text-brand-green">★★★★★</span>
                <GoogleG />
              </div>
              <p className="mb-5.5 text-[14.5px] leading-relaxed">{r.quote}</p>
              <div className="flex items-center gap-3">
                <div
                  className="flex h-[38px] w-[38px] items-center justify-center rounded-full text-[13px] font-bold"
                  style={{ background: r.bg, color: r.fg }}
                >
                  {r.initials}
                </div>
                <div>
                  <div className="text-[13.5px] font-semibold">{r.name}</div>
                  <div className="text-[11.5px] text-muted-2">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
