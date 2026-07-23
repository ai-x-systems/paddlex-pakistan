"use client";

import { motion } from "framer-motion";
import { CalendarCheck, Users, FileBarChart, CreditCard, LineChart, Building2 } from "lucide-react";
import { Eyebrow } from "@/components/section-head";

const capabilities = [
  { icon: CalendarCheck, label: "Bookings" },
  { icon: Users, label: "Staff Accounts" },
  { icon: FileBarChart, label: "Reports" },
  { icon: CreditCard, label: "Payments" },
  { icon: LineChart, label: "Analytics" },
  { icon: Building2, label: "Branch-ready" },
];

export function ClubManagement() {
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-7">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 items-center gap-8 rounded-[22px] border border-border bg-surface p-7 md:grid-cols-[1.1fr_1fr] md:p-9"
        >
          <div>
            <Eyebrow>Behind the scenes</Eyebrow>
            <h3 className="mb-3 text-[24px] font-extrabold tracking-tight md:text-[28px]">
              One platform runs the whole club.
            </h3>
            <p className="mb-6 max-w-md text-[14px] leading-relaxed text-muted">
              Reception, coaches, and management share a single dashboard — built to scale to
              additional branches without a rebuild.
            </p>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {capabilities.map((c) => (
                <div
                  key={c.label}
                  className="flex items-center gap-2 rounded-xl border border-border-soft bg-bg-1 px-3 py-2.5 text-[12.5px] text-muted"
                >
                  <c.icon className="h-3.5 w-3.5 shrink-0 text-brand-blue-2" />
                  {c.label}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border-soft bg-bg-1 p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-mono-brand text-[11px] uppercase tracking-wider text-muted-2">
                Owner overview
              </span>
              <span className="h-2 w-2 rounded-full bg-brand-green shadow-[0_0_8px_#C8FF00]" />
            </div>
            <div className="mb-4 grid grid-cols-3 gap-2.5">
              {[
                { l: "Today", v: "34" },
                { l: "Revenue", v: "₨118K" },
                { l: "Courts", v: "3/4" },
              ].map((s) => (
                <div key={s.l} className="rounded-lg border border-border-soft px-2.5 py-2">
                  <div className="font-mono-brand text-[15px] font-bold">{s.v}</div>
                  <div className="mt-0.5 text-[9.5px] uppercase tracking-wider text-muted-2">{s.l}</div>
                </div>
              ))}
            </div>
            <div className="flex h-14 items-end gap-1.5">
              {[38, 52, 34, 66, 58, 80, 90].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-gradient-to-b from-brand-blue-2 to-brand-blue opacity-90"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
