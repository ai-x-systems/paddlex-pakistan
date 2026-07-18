"use client";

import {
  Smartphone, Wallet, Clock, MessageSquare, ShieldCheck, Trophy,
  Award, Bell, LineChart, Gift, Headphones, LayoutDashboard,
} from "lucide-react";
import { motion } from "framer-motion";
import { SectionHead } from "@/components/section-head";

const items = [
  { icon: Smartphone, title: "Mobile App", desc: "Android & iOS, built for one-tap rebooking." },
  { icon: Wallet, title: "Wallet", desc: "Top-ups, refunds and cashback in one balance." },
  { icon: Clock, title: "Real-Time Booking", desc: "Live slot locking — never double-booked." },
  { icon: MessageSquare, title: "AI Booking Assistant", desc: "Chat your way to a confirmed slot." },
  { icon: ShieldCheck, title: "Secure Payments", desc: "Card, wallet, bank transfer, JazzCash & EasyPaisa." },
  { icon: Trophy, title: "Tournament Management", desc: "Brackets, results and live leaderboards." },
  { icon: Award, title: "Player Rankings", desc: "Season leaderboards across every court." },
  { icon: Bell, title: "Push Notifications", desc: "Reminders, confirmations, holiday alerts." },
  { icon: LineChart, title: "Dashboard Analytics", desc: "Revenue, utilization and growth, in real time." },
  { icon: Gift, title: "Rewards Program", desc: "Referrals and cashback that compound over time." },
  { icon: Headphones, title: "Human Support", desc: "A real person, one tap away, always." },
  { icon: LayoutDashboard, title: "Admin Dashboard", desc: "Full facility control, no engineer required." },
];

export function ComingSoon() {
  return (
    <section className="py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-7">
        <SectionHead
          eyebrow="Coming soon"
          title="The full platform, rolling out in phases."
          sub="This landing page is Phase 1. Here's everything that follows it."
        />

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
              className="rounded-2xl border border-border-soft bg-bg-1 p-5.5 transition-colors duration-300 hover:border-brand-blue-2 hover:bg-surface-2"
            >
              <div className="mb-3.5 flex h-9 w-9 items-center justify-center rounded-[10px] bg-brand-blue/[0.14] text-brand-blue-2">
                <it.icon className="h-4 w-4" strokeWidth={1.8} />
              </div>
              <div className="mb-1 text-[14px] font-semibold">{it.title}</div>
              <div className="text-[12px] leading-relaxed text-muted-2">{it.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
