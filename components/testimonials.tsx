"use client";

import { motion } from "framer-motion";
import { SectionHead } from "@/components/section-head";

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
    quote: "My daughter's been in the Junior Advanced program for two months — the coach-to-kid attention is real.",
    name: "Ahmed K.",
    role: "Parent, Coaching Academy",
    initials: "AK",
    bg: "#4C82FF",
    fg: "#fff",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-7">
        <SectionHead eyebrow="Reviews" title="What players are saying." />

        <div className="grid grid-cols-1 gap-4.5 md:grid-cols-3">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-[18px] border border-border bg-surface p-6.5"
            >
              <div className="mb-4 tracking-[2px] text-brand-green">★★★★★</div>
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
