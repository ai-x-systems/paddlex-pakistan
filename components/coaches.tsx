"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Award } from "lucide-react";
import Link from "next/link";
import { SectionHead } from "@/components/section-head";

type Coach = {
  id: string;
  name: string;
  role: string;
  initials: string;
  bio: string;
  tags: string[];
};

const coaches: Coach[] = [
  {
    id: "ali",
    name: "Coach Ali",
    role: "Junior & Group Programs",
    initials: "AL",
    bio: "8+ years coaching juniors and beginner groups — patient, structured, and big on fundamentals.",
    tags: ["Kids", "Beginners", "PPR Certified"],
  },
  {
    id: "hina",
    name: "Coach Hina",
    role: "Women's & Advanced Juniors",
    initials: "HI",
    bio: "Runs the Women's Only track and the competitive junior program — tournament-tested and detail-oriented.",
    tags: ["Women's", "Advanced Juniors", "Tournament Prep"],
  },
  {
    id: "bilal",
    name: "Coach Bilal",
    role: "Adults & Private Coaching",
    initials: "BI",
    bio: "Specializes in adult development and 1:1 performance work, from first rally to match strategy.",
    tags: ["Adults", "Private 1:1", "Performance"],
  },
];

export function Coaches() {
  return (
    <section id="coaches" className="py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-7">
        <SectionHead
          eyebrow="Our Coaches"
          title="Learn from coaches who actually coach here."
          sub="Every program at Padel X Pakistan is run by a named, certified coach — not a rotating roster."
        />

        <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-3">
          {coaches.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group rounded-[18px] border border-border bg-surface p-6.5 transition-colors duration-300 hover:bg-surface-2"
            >
              <div className="mb-5 flex items-center gap-3.5">
                <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-brand-green/10 font-mono-brand text-[15px] font-bold text-brand-green">
                  {c.initials}
                </div>
                <div>
                  <div className="text-[16.5px] font-bold">{c.name}</div>
                  <div className="text-[12.5px] text-muted-2">{c.role}</div>
                </div>
              </div>

              <p className="mb-5 text-[13.5px] leading-relaxed text-muted">{c.bio}</p>

              <div className="mb-6 flex flex-wrap gap-1.5">
                {c.tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 rounded-full border border-border-soft px-2.5 py-1 text-[10.5px] font-medium text-muted-2"
                  >
                    <Award className="h-2.5 w-2.5" strokeWidth={2} />
                    {t}
                  </span>
                ))}
              </div>

              <Link
                href={`/coaches/${c.id}`}
                className="inline-flex items-center gap-1 border-t border-border-soft pt-4 text-[13px] font-semibold text-ink transition-colors group-hover:text-brand-green"
              >
                View Profile
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
