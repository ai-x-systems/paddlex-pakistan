"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell, CalendarCheck, AlarmClock, Wallet, CreditCard, XCircle,
  UserPlus, Banknote, AlertTriangle, CalendarX,
} from "lucide-react";

type Notif = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  time: string;
  unread?: boolean;
  tone: "green" | "blue" | "red";
};

const customerNotifs: Notif[] = [
  { icon: CalendarCheck, title: "Booking Confirmed", desc: "Padel Court A · Sat 18 Jul, 7:00 PM", time: "2 min ago", unread: true, tone: "green" },
  { icon: Wallet, title: "Remaining Balance", desc: "PKR 45,000 remaining after your last booking", time: "2 min ago", unread: true, tone: "blue" },
  { icon: AlarmClock, title: "Booking Reminder", desc: "Your session starts in 2 hours — Court A", time: "1 hr ago", tone: "blue" },
  { icon: CreditCard, title: "Payment Successful", desc: "PKR 3,500 paid via Club Credits", time: "3 hr ago", tone: "green" },
  { icon: XCircle, title: "Booking Cancelled", desc: "Football Ground · Sun 12 Jul — refunded to wallet", time: "2 days ago", tone: "red" },
];

const receptionNotifs: Notif[] = [
  { icon: UserPlus, title: "New Booking", desc: "Faizan Z. booked Court A for 7:00 PM today", time: "2 min ago", unread: true, tone: "green" },
  { icon: Banknote, title: "Payment Received", desc: "PKR 3,500 received via Club Credits — Booking #4821", time: "2 min ago", unread: true, tone: "green" },
  { icon: AlertTriangle, title: "Customer Low Balance", desc: "Ahmed K.'s wallet balance is below PKR 2,000", time: "40 min ago", tone: "red" },
  { icon: CalendarX, title: "Booking Cancelled", desc: "Sana R. cancelled Court B · Sun 19 Jul, 6 PM", time: "1 hr ago", tone: "red" },
];

const toneClasses: Record<Notif["tone"], string> = {
  green: "bg-brand-green/10 text-brand-green",
  blue: "bg-brand-blue/15 text-brand-blue-2",
  red: "bg-red-400/10 text-red-400",
};

export function NotificationCenter() {
  const [tab, setTab] = useState<"customer" | "reception">("customer");
  const list = tab === "customer" ? customerNotifs : receptionNotifs;

  return (
    <div className="mx-auto max-w-2xl px-5 py-14 md:px-7 md:py-20">
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-2 font-mono-brand text-xs font-semibold uppercase tracking-[0.14em] text-brand-green">
          <Bell className="h-3.5 w-3.5" /> Notification Center
        </div>
        <h1 className="text-[28px] font-extrabold tracking-tight md:text-[34px]">Stay in the loop.</h1>
        <p className="mt-2 text-[14px] text-muted">
          UI demonstration — production delivery covers push, WhatsApp, SMS, and email.
        </p>
      </div>

      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setTab("customer")}
          className={`rounded-full border px-4 py-2 text-[13px] font-medium transition-all ${
            tab === "customer" ? "border-brand-blue-2 bg-brand-blue/15 text-brand-blue-2" : "border-border text-muted"
          }`}
        >
          Customer view
        </button>
        <button
          onClick={() => setTab("reception")}
          className={`rounded-full border px-4 py-2 text-[13px] font-medium transition-all ${
            tab === "reception" ? "border-brand-blue-2 bg-brand-blue/15 text-brand-blue-2" : "border-border text-muted"
          }`}
        >
          Reception view
        </button>
      </div>

      <div className="flex flex-col gap-2.5">
        {list.map((n, i) => (
          <motion.div
            key={n.title + i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="flex items-start gap-3.5 rounded-2xl border border-border bg-surface p-4"
          >
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${toneClasses[n.tone]}`}>
              <n.icon className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[13.5px] font-semibold">{n.title}</span>
                {n.unread && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />}
              </div>
              <div className="mt-0.5 text-[12.5px] text-muted">{n.desc}</div>
            </div>
            <span className="shrink-0 text-[11px] text-muted-2">{n.time}</span>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-dashed border-border bg-bg-1 p-5 text-center">
        <p className="text-[12.5px] text-muted-2">
          Delivery channels: <span className="text-ink">Push</span> &middot; <span className="text-ink">WhatsApp</span> &middot;{" "}
          <span className="text-ink">SMS</span> &middot; <span className="text-ink">Email</span> — wired to a single event once
          PlayPro integration is confirmed.
        </p>
      </div>
    </div>
  );
}