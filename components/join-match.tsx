"use client";

import { motion } from "framer-motion";
import { Users, Plus, Clock, MapPin } from "lucide-react";
import { SectionHead } from "@/components/section-head";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/toast-provider";

type OpenMatch = {
  court: string;
  date: string;
  time: string;
  level: string;
  filled: number;
  need: number;
  players: string[];
};

const matches: OpenMatch[] = [
  { court: "Court A", date: "Sat, 18 Jul", time: "7:00 PM", level: "Intermediate", filled: 2, need: 2, players: ["FZ", "AK"] },
  { court: "Court C", date: "Sun, 19 Jul", time: "6:00 PM", level: "Beginner friendly", filled: 3, need: 1, players: ["SR", "MH", "TB"] },
  { court: "Football Ground", date: "Sun, 19 Jul", time: "8:00 PM", level: "Casual 5-a-side", filled: 6, need: 4, players: ["ZK", "NA", "HR", "JW", "PL", "QS"] },
];

function Avatars({ initials }: { initials: string[] }) {
  return (
    <div className="flex -space-x-2.5">
      {initials.map((init, i) => (
        <div
          key={i}
          className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-surface text-[10.5px] font-bold text-bg"
          style={{ background: i % 2 === 0 ? "#4C82FF" : "#C8FF00" }}
        >
          {init}
        </div>
      ))}
    </div>
  );
}

export function JoinMatch() {
  const toast = useToast();

  return (
    <section id="join-match" className="py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-7">
        <SectionHead
          eyebrow="Find your four"
          title="Join a Match."
          sub="Only have one or two players? Fill an open match, or create your own and let the community fill it in."
        />

        <div className="grid grid-cols-1 gap-4.5 lg:grid-cols-3">
          {matches.map((m, i) => {
            const spotsLeft = m.need;
            const pct = Math.round((m.filled / (m.filled + m.need)) * 100);
            return (
              <motion.div
                key={m.court + m.time}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex flex-col rounded-[18px] border border-border bg-surface p-6"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full border border-brand-green/30 bg-brand-green/10 px-2.5 py-1 text-[11px] font-semibold text-brand-green">
                    Need {spotsLeft} player{spotsLeft > 1 ? "s" : ""}
                  </span>
                  <span className="text-[11.5px] text-muted-2">{m.level}</span>
                </div>

                <div className="mb-1.5 flex items-center gap-2 text-[15px] font-bold">
                  <MapPin className="h-4 w-4 text-brand-blue-2" />
                  {m.court}
                </div>
                <div className="mb-5 flex items-center gap-2 text-[13px] text-muted">
                  <Clock className="h-3.5 w-3.5" />
                  {m.date} &middot; {m.time}
                </div>

                <div className="mb-4 flex items-center justify-between">
                  <Avatars initials={m.players} />
                  <span className="font-mono-brand text-[12.5px] text-muted-2">
                    {m.filled}/{m.filled + m.need}
                  </span>
                </div>
                <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-border-soft">
                  <div className="h-full rounded-full bg-gradient-to-r from-brand-blue to-brand-green" style={{ width: `${pct}%` }} />
                </div>

                <Button
                  variant="outline"
                  className="mt-auto w-full"
                  onClick={() => toast("Join request sent — the group will confirm in the app")}
                >
                  <Users className="h-4 w-4" /> Join Match
                </Button>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4.5 flex flex-col items-center justify-between gap-4 rounded-[18px] border border-dashed border-border bg-bg-1 p-6 sm:flex-row"
        >
          <div>
            <div className="mb-1 text-[15px] font-bold">Have a court but no group?</div>
            <div className="text-[13px] text-muted">Create a match and we'll help fill your remaining spots.</div>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Button
              variant="outline"
              onClick={() => toast("Full match board arrives with the customer app")}
            >
              Browse Open Matches
            </Button>
            <Button onClick={() => toast("Match created — visible to nearby players now")}>
              <Plus className="h-4 w-4" /> Create Match
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
