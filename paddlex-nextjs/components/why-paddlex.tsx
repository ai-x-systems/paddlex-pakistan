"use client";

import { motion } from "framer-motion";
import { Zap, Trophy, Users, ShieldCheck, Heart, Sparkles } from "lucide-react";
import { SectionHead } from "@/components/section-head";

const items = [
  { icon: Zap, title: "Easy Booking", desc: "Pick a court, pick a slot, pay — done in under a minute, no phone calls needed." },
  { icon: Trophy, title: "Premium Courts", desc: "Professional-grade surfaces, lighting and glass panels maintained to tournament standard." },
  { icon: Users, title: "Professional Coaching", desc: "Structured programs for kids, adults, and private 1:1 sessions with certified coaches." },
  { icon: ShieldCheck, title: "Secure Payments", desc: "Card, wallet or bank transfer — every payment generates an instant invoice and receipt." },
  { icon: Heart, title: "Friendly Community", desc: "Leaderboards, tournaments and a growing player base you'll actually recognize." },
  { icon: Sparkles, title: "Future AI Assistant", desc: "A concierge that answers instantly and hands off to reception the moment you're ready to book." },
];

export function WhyPaddleX() {
  return (
    <section className="py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-7">
        <SectionHead eyebrow="Why PaddleX" title="Built like a product, run like a club." />

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[18px] border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="bg-bg-1 p-7 transition-colors duration-300 hover:bg-surface-2"
            >
              <div className="mb-4.5 flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                <it.icon className="h-5 w-5" strokeWidth={1.8} />
              </div>
              <div className="mb-2 text-[16px] font-bold">{it.title}</div>
              <div className="text-[14px] leading-relaxed text-muted">{it.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
