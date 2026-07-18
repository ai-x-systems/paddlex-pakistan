"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MessageSquare, Clock, ArrowLeftRight, LineChart } from "lucide-react";
import { Eyebrow } from "@/components/section-head";

const feats = [
  { icon: MessageSquare, title: "Customer Support", desc: "Instant answers on pricing, hours, facilities and coaching — day or night." },
  { icon: Clock, title: "Smart Booking Assistant", desc: "Suggests open slots that match how and when you usually play." },
  { icon: ArrowLeftRight, title: "Human Handoff", desc: "The moment you say \"book\" or \"talk to someone,\" reception picks up the same thread." },
  { icon: LineChart, title: "Operations Analytics", desc: "Revenue trends, retention risk and promo timing surfaced automatically for the owner." },
];

const script: { who: "user" | "ai" | "handoff"; text: string }[] = [
  { who: "user", text: "Hi, what time does Court A close tonight?" },
  { who: "ai", text: "Court A is open until 11 PM tonight. Want me to show you open slots?" },
  { who: "user", text: "Yes — and I want to book one" },
  { who: "handoff", text: "↳ Handed off to Reception · Live Chat" },
];

function ChatMock() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timers = script.map((_, i) => setTimeout(() => setShown((s) => Math.max(s, i + 1)), i * 950));
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  return (
    <div ref={ref} className="overflow-hidden rounded-[20px] border border-border bg-surface">
      <div className="flex items-center gap-2.5 border-b border-border-soft px-4.5 py-4">
        <span className="h-2 w-2 rounded-full bg-brand-green shadow-[0_0_8px_#C8FF00]" />
        <span className="text-[13px] font-semibold">PadelX Assistant</span>
      </div>
      <div className="flex min-h-[280px] flex-col gap-3 p-5">
        {script.slice(0, shown).map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={
              m.who === "user"
                ? "max-w-[80%] self-end rounded-2xl rounded-br-[4px] bg-brand-blue px-4 py-2.5 text-[13.5px] leading-relaxed text-white"
                : m.who === "ai"
                  ? "max-w-[80%] self-start rounded-2xl rounded-bl-[4px] border border-border-soft bg-surface-2 px-4 py-2.5 text-[13.5px] leading-relaxed"
                  : "self-center rounded-2xl border border-brand-green/30 bg-brand-green/10 px-4 py-2.5 font-mono-brand text-[11.5px] text-brand-green"
            }
          >
            {m.text}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function AISection() {
  return (
    <section className="py-24 [background:radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(37,99,235,0.12),transparent_70%)] md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-7">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <Eyebrow>Coming in Phase 4</Eyebrow>
            <h2 className="mb-3.5 max-w-md text-[28px] font-extrabold leading-[1.08] tracking-tight md:text-[40px]">
              AI-Powered Sports Operations
            </h2>
            <p className="mb-7 max-w-md text-[15px] leading-relaxed text-muted">
              An assistant that knows real pricing and real availability — and knows exactly when
              to hand off to a human.
            </p>
            <div className="flex flex-col gap-4.5">
              {feats.map((f) => (
                <div key={f.title} className="flex gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-brand-green/10 text-brand-green">
                    <f.icon className="h-4 w-4" strokeWidth={1.8} />
                  </div>
                  <div>
                    <div className="mb-0.5 text-[14.5px] font-semibold">{f.title}</div>
                    <div className="text-[13px] leading-relaxed text-muted">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <ChatMock />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
