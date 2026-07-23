"use client";

import { motion } from "framer-motion";
import { SectionHead } from "@/components/section-head";
import { PhotoTile } from "@/components/photo-tile";
import { Button } from "@/components/ui/button";

const courts = [
  {
    tag: "Court A",
    name: "Padel Court A",
    type: "Indoor",
    price: "PKR 3,500/hr",
    availability: "Open until 11 PM",
    feats: ["Indoor", "Pro Lighting", "Tournament Ready"],
    img: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=800&q=80",
    tone: "blue" as const,
  },
  {
    tag: "Court B",
    name: "Padel Court B",
    type: "Outdoor",
    price: "PKR 3,200/hr",
    availability: "Open until 12 AM",
    feats: ["Outdoor", "Night Play", "Glass Walls"],
    img: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=800&q=80",
    tone: "green" as const,
  },
  {
    tag: "Court C",
    name: "Padel Court C",
    type: "Indoor",
    price: "PKR 3,000/hr",
    availability: "Open until 11 PM",
    feats: ["Indoor", "Climate Control", "Beginner Friendly"],
    img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80",
    tone: "blueSoft" as const,
  },
  {
    tag: "Ground",
    name: "Football Ground",
    type: "Outdoor",
    price: "PKR 6,000/hr",
    availability: "Open until 1 AM",
    feats: ["Artificial Turf", "Full Size", "Premium Experience"],
    img: "https://images.unsplash.com/photo-1487466365202-1afdb86c764e?auto=format&fit=crop&w=800&q=80",
    tone: "greenSoft" as const,
  },
];

export function Facilities() {
  return (
    <section id="facilities" className="py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-7">
        <SectionHead
          eyebrow="Featured Courts"
          title={
            <>
              Four courts. One ground.
              <br />
              Zero compromise.
            </>
          }
          sub="Every surface is built to tournament spec — indoor and outdoor, day and floodlit night play."
        />

        <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-4">
          {courts.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative flex h-[380px] flex-col overflow-hidden rounded-[18px] border border-border bg-surface [clip-path:polygon(0_0,100%_0,100%_100%,26px_100%,0_calc(100%-26px))] transition-transform duration-500 hover:-translate-y-1.5"
            >
              <div className="relative h-[190px] overflow-hidden">
                <div className="absolute inset-0 scale-100 transition-transform duration-700 ease-out group-hover:scale-110">
                  <PhotoTile src={c.img} alt={c.name} tone={c.tone} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-surface from-10% to-transparent" />
                <span className="absolute left-3.5 top-3.5 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 font-mono-brand text-[10px] uppercase tracking-wider text-brand-green backdrop-blur-sm">
                  {c.tag}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-1.5 text-[17px] font-bold">{c.name}</div>
                <div className="mb-3.5 text-[11.5px] text-muted-2">
                  {c.type} &middot; {c.availability}
                </div>
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {c.feats.map((f) => (
                    <span key={f} className="rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-1 text-[11px] text-muted">
                      {f}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-border-soft pt-4">
                  <span className="font-mono-brand text-[14px] font-bold">{c.price}</span>
                  <Button size="sm" asChild>
                    <a href="#booking-preview">Book Now</a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
