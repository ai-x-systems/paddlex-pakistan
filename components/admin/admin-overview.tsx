"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard, RefreshCw, CalendarCheck, Percent, Users2, Bell,
  FileEdit, Activity, ShieldCheck,
} from "lucide-react";
import { useToast } from "@/components/toast-provider";

const overviewCards = [
  { icon: CalendarCheck, label: "Daily Bookings", value: "34", note: "Live from site" },
  { icon: Percent, label: "Court Usage", value: "78%", note: "Today, all courts" },
  { icon: Users2, label: "Coaches Active", value: "3 / 3", note: "On shift today" },
  { icon: Activity, label: "System Status", value: "Operational", note: "All services up" },
];

const contentItems = [
  { label: "Homepage hero banner", updated: "3 days ago" },
  { label: "Tournament listings", updated: "Today" },
  { label: "Coaching program pricing", updated: "1 week ago" },
  { label: "FAQ content", updated: "2 weeks ago" },
];

const roles = ["Owner", "Admin", "Manager", "Reception", "Coach", "Support"];

export function AdminOverview() {
  const toast = useToast();

  return (
    <div className="mx-auto max-w-5xl px-5 py-14 md:px-7 md:py-20">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2 font-mono-brand text-xs font-semibold uppercase tracking-[0.14em] text-brand-green">
            <LayoutDashboard className="h-3.5 w-3.5" /> Admin — Karachi Branch
          </div>
          <h1 className="text-[26px] font-extrabold tracking-tight md:text-[30px]">Overview</h1>
        </div>
        <div className="rounded-full border border-border-soft bg-bg-1 px-3.5 py-1.5 text-[11.5px] text-muted-2">
          Not linked from main navigation — internal use only
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex items-start gap-3 rounded-2xl border border-brand-blue/25 bg-brand-blue/[0.06] p-4"
      >
        <RefreshCw className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue-2" />
        <p className="text-[12.5px] leading-relaxed text-muted">
          Revenue, detailed reports, and daily analytics already live in PlayPro and are not
          duplicated here. Operational data below will synchronize from PlayPro after backend
          integration.
        </p>
      </motion.div>

      <div className="mb-6 grid grid-cols-2 gap-3.5 lg:grid-cols-4">
        {overviewCards.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="rounded-2xl border border-border bg-surface p-4.5"
          >
            <c.icon className="mb-3 h-4 w-4 text-brand-blue-2" />
            <div className="font-mono-brand text-[20px] font-bold">{c.value}</div>
            <div className="mt-0.5 text-[11.5px] text-muted">{c.label}</div>
            <div className="mt-1 text-[10.5px] text-muted-2">{c.note}</div>
          </motion.div>
        ))}
      </div>

      <div className="mb-6 rounded-2xl border border-dashed border-border bg-bg-1 p-4.5">
        <div className="mb-1 text-[13px] font-semibold">Revenue</div>
        <div className="text-[12.5px] text-muted-2">Synced from PlayPro — connect API to display live figures here.</div>
      </div>

      <div className="grid grid-cols-1 gap-4.5 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface p-5">
          <div className="mb-4 flex items-center gap-2 text-[13px] font-semibold">
            <FileEdit className="h-4 w-4 text-brand-green" /> Content Updates
          </div>
          <div className="flex flex-col gap-2">
            {contentItems.map((c) => (
              <div key={c.label} className="flex items-center justify-between rounded-lg bg-bg-1 px-3 py-2.5 text-[12.5px]">
                <span>{c.label}</span>
                <button
                  onClick={() => toast("Content editor arrives with full CMS integration")}
                  className="text-[11.5px] text-brand-blue-2 hover:underline"
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-5">
          <div className="mb-4 flex items-center gap-2 text-[13px] font-semibold">
            <ShieldCheck className="h-4 w-4 text-brand-blue-2" /> Staff Roles
          </div>
          <div className="flex flex-wrap gap-2">
            {roles.map((r) => (
              <span key={r} className="rounded-full border border-border-soft px-3 py-1.5 text-[12px] text-muted">
                {r}
              </span>
            ))}
          </div>
          <p className="mt-3.5 text-[11.5px] text-muted-2">
            Each role receives scoped permissions once role management connects to the production
            auth system.
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 rounded-2xl border border-border-soft bg-bg-1 p-4">
        <Bell className="h-4 w-4 text-muted-2" />
        <span className="text-[12.5px] text-muted">
          Booking and payment alerts route to the{" "}
          <a href="/notifications" className="text-brand-blue-2 hover:underline">Notification Center</a>.
        </span>
      </div>
    </div>
  );
}