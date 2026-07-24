"use client";

import { motion } from "framer-motion";
import {
  LayoutGrid,
  CircleDot,
  CircleDashed,
  Zap,
  User,
  Coffee,
  SquareParking,
  CreditCard,
} from "lucide-react";

const items = [
  { icon: LayoutGrid, title: "8 Padel Courts", desc: "Panoramic glass, individually bookable" },
  { icon: CircleDot, title: "1 Football Ground", desc: "Full-size futsal surface" },
  { icon: CircleDashed, title: "Pickleball", desc: "Dedicated court, hourly slots" },
  { icon: Zap, title: "Floodlit Till 2 AM", desc: "Play through the Karachi night" },
  { icon: User, title: "Pro Coaching", desc: "Kids, adults & private sessions" },
  { icon: Coffee, title: "Café & Lounge", desc: "Recover, refuel, hang around" },
  { icon: SquareParking, title: "Free Parking", desc: "On-site, secure" },
  { icon: CreditCard, title: "Play Credits", desc: "Book with wallet balance" },
];

// Compact quick-facts strip — a single bordered panel split into four columns
// by hairline dividers, each column stacking two icon+title+desc blocks.
// Sits right under the hero, ahead of the detailed Facilities cards.
export function FacilityHighlights() {
  return (
    <section className="py-14 md:py-16">
      <div className="mx-auto max-w-6xl px-5 md:px-7">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 divide-y divide-border rounded-[18px] border border-border bg-bg-1 sm:grid-cols-4 sm:divide-y-0 sm:divide-x"
        >
          {[0, 1, 2, 3].map((col) => (
            <div key={col} className="flex flex-col gap-8 p-6 md:p-7">
              {items.slice(col * 2, col * 2 + 2).map((it) => (
                <div key={it.title}>
                  <it.icon className="mb-3.5 h-5 w-5 text-brand-green" strokeWidth={1.8} />
                  <div className="mb-1 text-[13px] font-bold uppercase tracking-wide">{it.title}</div>
                  <div className="text-[13px] leading-relaxed text-muted">{it.desc}</div>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
