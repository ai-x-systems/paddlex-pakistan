"use client";

import { motion } from "framer-motion";
import { SectionHead } from "@/components/section-head";

const cards = [
  { label: "Today's Bookings", value: "34", delta: "+6 vs yesterday", up: true },
  { label: "Revenue (Today)", value: "₨118K", delta: "+12.4%", up: true },
  { label: "Courts Available", value: "3 / 4", delta: "Court B — maintenance", up: false },
  { label: "Active Customers", value: "1,204", delta: "+38 this week", up: true },
];

const bars = [42, 58, 38, 71, 64, 88, 96];

const quickActions = ["Holiday Management", "Court Management", "Booking Calendar", "Payments & Refunds"];

export function AdminPreview() {
  return (
    <section className="py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-7">
        <SectionHead
          eyebrow="Behind the counter"
          title="One dashboard runs the whole facility."
          sub="Showcase only — this is what reception and the owner will see once Phase 2 ships."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-[22px] border border-border bg-surface"
        >
          <div className="flex items-center justify-between border-b border-border-soft bg-bg-1 px-5.5 py-4">
            <div className="flex items-center gap-2 text-[13px] font-semibold">
              <span className="h-2 w-2 rounded-full bg-brand-green shadow-[0_0_8px_#C8FF00]" />
              PadelX Admin — Karachi Branch
            </div>
            <div className="font-mono-brand text-[11.5px] text-muted-2">Sat, 18 Jul · Owner view</div>
          </div>

          <div className="grid grid-cols-1 gap-3.5 p-5.5 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((c) => (
              <div key={c.label} className="rounded-[14px] border border-border-soft p-4">
                <div className="mb-2 text-[11px] uppercase tracking-wider text-muted-2">{c.label}</div>
                <div className="font-mono-brand text-[22px] font-bold">{c.value}</div>
                <div className={`mt-1.5 text-[11px] ${c.up ? "text-brand-green" : "text-muted-2"}`}>{c.delta}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-3.5 px-5.5 pb-5.5 lg:grid-cols-[1.3fr_1fr]">
            <div className="rounded-[14px] border border-border-soft p-4.5">
              <div className="mb-4 font-mono-brand text-[12.5px] uppercase tracking-wider text-muted">
                Weekly bookings
              </div>
              <div className="flex h-[110px] items-end gap-2">
                {bars.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-[5px] bg-gradient-to-b from-brand-blue-2 to-brand-blue opacity-90"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
            <div className="rounded-[14px] border border-border-soft p-4.5">
              <div className="mb-4 font-mono-brand text-[12.5px] uppercase tracking-wider text-muted">
                Quick actions
              </div>
              <div className="flex flex-col gap-2.5">
                {quickActions.map((q) => (
                  <div
                    key={q}
                    className="flex items-center justify-between rounded-lg bg-white/[0.02] px-2.5 py-2.5 text-[12.5px] text-muted"
                  >
                    <span>{q}</span>
                    <b className="font-semibold text-ink">→</b>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
