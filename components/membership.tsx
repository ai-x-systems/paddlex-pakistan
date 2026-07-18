"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { SectionHead } from "@/components/section-head";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/toast-provider";

const plans = [
  {
    tier: "Casual",
    price: "PKR 3,500",
    cycle: "/hr",
    note: "Pay as you play, no commitment",
    feats: ["Standard court rate", "Book up to 3 days ahead", "Wallet cashback on every booking"],
    cta: "Book a Court",
    variant: "outline" as const,
    action: "book",
  },
  {
    tier: "Weekly",
    price: "PKR 8,000",
    cycle: "/wk",
    note: "2 hours/week, rolls over once",
    feats: ["10% off standard rate", "Book up to 5 days ahead", "Priority slot access on weekends"],
    cta: "Choose Weekly",
    variant: "outline" as const,
    action: "toast",
  },
  {
    tier: "Monthly",
    price: "PKR 25,000",
    cycle: "/mo",
    note: "8 hours/month + 1 free session",
    feats: [
      "20% off standard rate",
      "Priority booking — 7 days ahead",
      "1 free coaching session/month",
      "Wallet reward on renewal",
    ],
    cta: "Choose Monthly",
    variant: "primary" as const,
    action: "toast",
    popular: true,
  },
  {
    tier: "Corporate",
    price: "Custom",
    cycle: "",
    note: "Multi-seat, team accounts",
    feats: [
      "Dedicated account manager",
      "Bulk hour packages",
      "Corporate event booking",
      "Consolidated monthly invoicing",
    ],
    cta: "Talk to Sales",
    variant: "outline" as const,
    action: "toast",
  },
];

export function Membership() {
  const toast = useToast();

  return (
    <section id="membership" className="py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-7">
        <SectionHead
          eyebrow="Membership"
          title="Play more, pay less."
          sub="From a single walk-in to a full corporate account — every tier earns wallet rewards."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((p, i) => (
            <motion.div
              key={p.tier}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={`relative flex flex-col rounded-[18px] border p-7 transition-transform duration-400 hover:-translate-y-1.5 ${
                p.popular
                  ? "border-brand-green bg-gradient-to-b from-brand-green/[0.06] to-surface"
                  : "border-border bg-surface hover:border-white/20"
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 right-6 rounded-full bg-brand-green px-3 py-1 text-[10.5px] font-bold uppercase tracking-wide text-bg">
                  Most popular
                </span>
              )}
              <div className="mb-3.5 font-mono-brand text-[13px] uppercase tracking-wider text-muted">
                {p.tier}
              </div>
              <div className="mb-0.5 text-[32px] font-extrabold tracking-tight">
                {p.price}
                <sup className="ml-0.5 text-[14px] font-medium text-muted">{p.cycle}</sup>
              </div>
              <div className="mb-5.5 text-[12.5px] text-muted-2">{p.note}</div>
              <ul className="mb-6.5 flex flex-1 flex-col gap-2.5">
                {p.feats.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[13.5px] text-muted">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-green" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                variant={p.variant}
                className="w-full"
                onClick={() =>
                  p.action === "book"
                    ? document.getElementById("booking-preview")?.scrollIntoView({ behavior: "smooth" })
                    : toast("Membership checkout arrives with the customer app")
                }
              >
                {p.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
