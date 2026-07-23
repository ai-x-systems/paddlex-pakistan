"use client";

import { motion } from "framer-motion";
import { Trophy, Users2 } from "lucide-react";
import { SectionHead } from "@/components/section-head";
import { Button } from "@/components/ui/button";
import { PhotoTile } from "@/components/photo-tile";
import { useToast } from "@/components/toast-provider";

const now = Date.now();

const tournaments = [
  {
    name: "Padel X Summer Cup",
    format: "Doubles Knockout",
    date: "Sat, 2 Aug",
    prize: "PKR 150,000",
    participants: "24 / 32 teams",
    img: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=700&q=80",
    tone: "blue" as const,
    target: now + 6 * 86400000 + 4 * 3600000,
  },
  {
    name: "Corporate 5-a-Side League",
    format: "Round Robin",
    date: "Sat, 9 Aug",
    prize: "PKR 100,000",
    participants: "9 / 12 teams",
    img: "https://images.unsplash.com/photo-1487466365202-1afdb86c764e?auto=format&fit=crop&w=700&q=80",
    tone: "greenSoft" as const,
    target: now + 14 * 86400000 + 9 * 3600000,
  },
  {
    name: "Junior Academy Cup",
    format: "Americano",
    date: "Sat, 16 Aug",
    prize: "Trophies + Gear",
    participants: "18 / 24 players",
    img: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=700&q=80",
    tone: "blueSoft" as const,
    target: now + 21 * 86400000 + 2 * 3600000,
  },
];

export function Tournaments() {
  const toast = useToast();

  return (
    <section id="tournaments" className="py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-7">
        <SectionHead
          eyebrow="Compete"
          title="Upcoming tournaments."
          sub="Registration, brackets, and live leaderboards — every event runs through the same platform."
        />

        <div className="grid grid-cols-1 gap-4.5 lg:grid-cols-3">
          {tournaments.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="overflow-hidden rounded-[18px] border border-border bg-surface"
            >
              <div className="relative h-[160px]">
                <PhotoTile src={t.img} alt={t.name} tone={t.tone} />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent" />
                <div className="absolute left-3.5 top-3.5 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm">
                  <Trophy className="h-3 w-3 text-brand-green" />
                  {t.format}
                </div>
              </div>
              <div className="p-5.5">
                <div className="mb-1 text-[17px] font-bold">{t.name}</div>
                <div className="mb-4 flex items-center justify-between text-[13px] text-muted">
                  <span className="flex items-center gap-1.5">
                    <Users2 className="h-3.5 w-3.5" />
                    {t.participants}
                  </span>
                  <span className="font-mono-brand text-[12px] text-muted-2">{t.date}</span>
                </div>

                <div className="mb-4 flex items-center justify-between rounded-xl border border-border-soft px-3.5 py-3">
                  <div>
                    <div className="text-[10.5px] uppercase tracking-wider text-muted-2">Prize pool</div>
                    <div className="font-mono-brand text-[15px] font-bold text-brand-green">{t.prize}</div>
                  </div>
                  <Countdown target={t.target} />
                </div>

                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => toast(`Registration for ${t.name} opens in the customer app`)}
                >
                  Register Interest
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
