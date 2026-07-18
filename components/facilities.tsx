"use client";

import { motion } from "framer-motion";
import { SectionHead } from "@/components/section-head";
import { PhotoTile } from "@/components/photo-tile";

const courts = [
  {
    tag: "Court A",
    name: "Padel Court A",
    feats: ["Indoor", "Pro Lighting", "Tournament Ready"],
    img: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=800&q=80",
    tone: "blue" as const,
  },
  {
    tag: "Court B",
    name: "Padel Court B",
    feats: ["Outdoor", "Night Play", "Glass Walls"],
    img: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=800&q=80",
    tone: "green" as const,
  },
  {
    tag: "Court C",
    name: "Padel Court C",
    feats: ["Indoor", "Climate Control", "Beginner Friendly"],
    img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80",
    tone: "blueSoft" as const,
  },
  {
    tag: "Ground",
    name: "Football Ground",
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
          eyebrow="Facilities"
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
              className="group relative h-[340px] overflow-hidden rounded-[18px] border border-border bg-surface [clip-path:polygon(0_0,100%_0,100%_100%,26px_100%,0_calc(100%-26px))] transition-transform duration-500 hover:-translate-y-1.5"
            >
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 scale-100 transition-transform duration-700 ease-out group-hover:scale-110">
                  <PhotoTile src={c.img} alt={c.name} tone={c.tone} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-bg from-30% via-bg/70 to-transparent" />
              </div>
              <div className="relative z-10 flex h-full flex-col justify-end p-5">
                <span className="mb-2 font-mono-brand text-[10.5px] uppercase tracking-widest text-brand-green">
                  {c.tag}
                </span>
                <div className="mb-2.5 text-[19px] font-bold">{c.name}</div>
                <div className="flex flex-wrap gap-1.5">
                  {c.feats.map((f) => (
                    <span
                      key={f}
                      className="rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-1 text-[11px] text-muted"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
