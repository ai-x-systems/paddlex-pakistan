"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SectionHead } from "@/components/section-head";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/toast-provider";

type CourtKey = "A" | "B" | "C" | "F";

const courtNames: Record<CourtKey, string> = {
  A: "Padel Court A",
  B: "Padel Court B",
  C: "Padel Court C",
  F: "Football Ground",
};
const courtRates: Record<CourtKey, number> = { A: 3500, B: 3200, C: 3000, F: 6000 };

const days = ["SAT", "SUN", "MON", "TUE", "WED", "THU", "FRI"];
const dateNums = [18, 19, 20, 21, 22, 23, 24];
const baseSlots = ["07:00", "08:00", "09:00", "10:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"];

function bookedFor(court: CourtKey, dayIdx: number) {
  const seed = court.charCodeAt(0) + dayIdx * 7;
  return baseSlots.filter((_, i) => (seed + i * 3) % 5 === 0);
}

export function BookingPreview() {
  const [court, setCourt] = useState<CourtKey>("A");
  const [dayIdx, setDayIdx] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);
  const toast = useToast();

  const booked = useMemo(() => bookedFor(court, dayIdx), [court, dayIdx]);
  const dateLabel = `${dateNums[dayIdx]} Jul`;
  const rate = courtRates[court];
  const endTime = slot ? `${parseInt(slot.split(":")[0], 10) + 1}:00` : null;

  function selectCourt(c: CourtKey) {
    setCourt(c);
    setSlot(null);
  }
  function selectDay(i: number) {
    setDayIdx(i);
    setSlot(null);
  }
  function bookNow() {
    if (!slot) {
      toast("Select a time slot first");
      return;
    }
    toast("Demo booking created — payment & confirmation ship in Phase 2 ✓");
  }

  return (
    <section id="booking-preview" className="py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-7">
        <SectionHead
          eyebrow="01 · Sport → Court → Time → Pay"
          title="Booking, previewed."
          sub="This is a live interface preview with sample availability — the real engine ships in Phase 2."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-surface to-bg-1"
        >
          <div className="flex items-center justify-between border-b border-border-soft px-6 py-5">
            <div className="text-[13.5px] font-semibold">{courtNames[court]} &middot; Karachi</div>
            <div className="flex gap-1.5">
              <span className="h-[9px] w-[9px] rounded-full bg-border" />
              <span className="h-[9px] w-[9px] rounded-full bg-border" />
              <span className="h-[9px] w-[9px] rounded-full bg-border" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr]">
            <div className="border-b border-border-soft p-6 md:border-b-0 md:border-r">
              <div className="mb-5 flex flex-wrap gap-2">
                {(Object.keys(courtNames) as CourtKey[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => selectCourt(c)}
                    className={`rounded-full border px-3.5 py-2 text-[13px] transition-all ${
                      court === c
                        ? "border-ink bg-ink font-semibold text-bg"
                        : "border-border text-muted"
                    }`}
                  >
                    {c === "F" ? "Football" : `Court ${c}`}
                  </button>
                ))}
              </div>

              <div className="mb-6 flex gap-2 overflow-x-auto pb-1.5">
                {days.map((d, i) => (
                  <button
                    key={d}
                    onClick={() => selectDay(i)}
                    className={`min-w-[58px] shrink-0 rounded-[14px] border px-1.5 py-2.5 text-center text-[12px] transition-all ${
                      dayIdx === i
                        ? "border-brand-blue-2 bg-brand-blue/15 text-brand-blue-2"
                        : "border-border text-muted"
                    }`}
                  >
                    {d}
                    <span className={`mt-0.5 block text-[15px] font-bold ${dayIdx === i ? "text-brand-blue-2" : "text-ink"}`}>
                      {dateNums[i]}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mb-2.5 font-mono-brand text-[12px] uppercase tracking-wider text-muted-2">
                Available slots &middot; {days[dayIdx]} {dateNums[dayIdx]} Jul
              </div>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {baseSlots.map((s) => {
                  const isBooked = booked.includes(s);
                  const isSelected = slot === s && !isBooked;
                  return (
                    <button
                      key={s}
                      disabled={isBooked}
                      onClick={() => setSlot(s)}
                      className={`rounded-[10px] border px-1.5 py-3 text-center font-mono-brand text-[12.5px] transition-all ${
                        isBooked
                          ? "cursor-not-allowed border-border text-muted line-through opacity-30"
                          : isSelected
                            ? "border-brand-green bg-brand-green font-bold text-bg"
                            : "border-border text-muted hover:border-brand-green hover:text-brand-green"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4.5 flex flex-wrap gap-4">
                <Legend color="bg-bg-1 border border-border" label="Available" />
                <Legend color="bg-brand-green" label="Selected" />
                <Legend color="bg-border opacity-50" label="Booked" />
              </div>
            </div>

            <div className="bg-white/[0.015] p-6">
              <div className="mb-4 font-mono-brand text-[12px] uppercase tracking-wider text-muted-2">
                Booking summary
              </div>
              <SummaryRow label="Court" value={courtNames[court]} />
              <SummaryRow label="Date" value={dateLabel} />
              <SummaryRow label="Time" value={slot ? `${slot} – ${endTime}` : "—"} />
              <SummaryRow label="Rate" value={`PKR ${rate.toLocaleString()}/hr`} />
              <div className="flex items-center justify-between py-4.5 text-[15px] font-bold">
                <span>Total</span>
                <span className="font-mono-brand text-brand-green">
                  PKR {slot ? rate.toLocaleString() : "0"}
                </span>
              </div>
              <Button className="w-full" onClick={bookNow}>
                Book Now
              </Button>
              <p className="mt-3.5 text-[11.5px] leading-relaxed text-muted-2">
                Interactive preview only — no payment is processed. The production build connects
                this screen to live availability, Stripe/PayFast, and instant confirmation.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-border-soft py-2.5 text-[13.5px] text-muted">
      <span>{label}</span>
      <span className="font-mono-brand text-ink">{value}</span>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-[11.5px] text-muted-2">
      <span className={`h-[9px] w-[9px] rounded-[3px] ${color}`} />
      {label}
    </div>
  );
}
