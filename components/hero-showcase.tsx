"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

const courts = [
  { key: "A", name: "Padel Court A" },
  { key: "B", name: "Padel Court B" },
  { key: "C", name: "Padel Court C" },
  { key: "F", name: "Football Ground" },
];

const slots = ["16:00", "17:00", "18:00", "19:00", "20:00", "21:00"];

type Step = 0 | 1 | 2;
const STEP_DURATIONS: Record<Step, number> = { 0: 1800, 1: 1600, 2: 1800 };

export function HeroShowcase() {
  const [step, setStep] = useState<Step>(0);
  const [courtIdx, setCourtIdx] = useState(0);
  const [slotIdx, setSlotIdx] = useState(2);

  useEffect(() => {
    const t = setTimeout(() => {
      setStep((s) => {
        const next = ((s + 1) % 3) as Step;
        if (next === 0) {
          setCourtIdx((c) => (c + 1) % courts.length);
          setSlotIdx((i) => (i + 2) % slots.length);
        }
        return next;
      });
    }, STEP_DURATIONS[step]);
    return () => clearTimeout(t);
  }, [step]);

  const court = courts[courtIdx];

  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="relative mx-auto w-full max-w-[300px] overflow-hidden rounded-[28px] border border-border bg-surface/90 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur"
    >
      <div className="flex items-center justify-between border-b border-border-soft px-4 py-3">
        <span className="flex items-center gap-1.5 text-[11px] font-medium text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-green shadow-[0_0_8px_#C8FF00]" />
          Live availability
        </span>
        <span className="font-mono-brand text-[10px] text-muted-2">Karachi</span>
      </div>

      <div className="relative h-[260px] px-4 py-4">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="courts"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.35 }}
            >
              <div className="mb-3 font-mono-brand text-[10px] uppercase tracking-wider text-muted-2">
                Choose your court
              </div>
              <div className="mb-4 h-[100px] rounded-2xl bg-gradient-to-br from-brand-blue/25 via-surface-2 to-brand-green/10" />
              <div className="flex flex-wrap gap-1.5">
                {courts.map((c, i) => (
                  <span
                    key={c.key}
                    className={`rounded-full border px-2.5 py-1 text-[11px] transition-colors ${
                      i === courtIdx
                        ? "border-ink bg-ink font-semibold text-bg"
                        : "border-border text-muted"
                    }`}
                  >
                    {c.key === "F" ? "Football" : `Court ${c.key}`}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="slots"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.35 }}
            >
              <div className="mb-3 font-mono-brand text-[10px] uppercase tracking-wider text-muted-2">
                {court.name} &middot; Today
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {slots.map((s, i) => (
                  <span
                    key={s}
                    className={`rounded-[10px] border px-1.5 py-2.5 text-center font-mono-brand text-[11px] transition-colors ${
                      i === slotIdx
                        ? "border-brand-green bg-brand-green font-bold text-bg"
                        : "border-border text-muted"
                    }`}
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between rounded-2xl border border-border-soft bg-bg-1 px-3 py-2.5 text-[11px]">
                <span className="text-muted">Rate</span>
                <span className="font-mono-brand text-ink">PKR 3,000/hr</span>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              className="flex h-full flex-col items-center justify-center text-center"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-green"
              >
                <Check className="h-6 w-6 text-bg" strokeWidth={3} />
              </motion.span>
              <div className="mb-1 text-[15px] font-bold">Booking confirmed</div>
              <div className="text-[12px] text-muted">
                {court.name} &middot; {slots[slotIdx]}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
