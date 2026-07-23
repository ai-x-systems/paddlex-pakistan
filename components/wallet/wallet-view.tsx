"use client";

import { motion } from "framer-motion";
import { Wallet, TicketPercent, Building2, Plus, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/toast-provider";

const vouchers = [
  { code: "WELCOME500", desc: "PKR 500 off your next booking", expiry: "Expires 15 Aug", status: "active" as const },
  { code: "SUMMER10", desc: "10% off Football Ground bookings", expiry: "Expires 31 Aug", status: "active" as const },
  { code: "REFER1000", desc: "PKR 1,000 referral bonus", expiry: "Used 2 Jul", status: "used" as const },
];

const partnerDiscounts = [
  { partner: "HBL Cardholders", detail: "15% off weekday court bookings" },
  { partner: "Meezan Bank", detail: "PKR 300 cashback on coaching packages" },
  { partner: "UBL Rewards", detail: "5% off tournament entry fees" },
];

const transactions = [
  { date: "18 Jul", desc: "Padel Court A booking", amount: -3500, balance: 45000 },
  { date: "15 Jul", desc: "Club Credits top-up", amount: 10000, balance: 48500 },
  { date: "12 Jul", desc: "Coaching session — Bilal Ahmed", amount: -4500, balance: 38500 },
  { date: "9 Jul", desc: "Booking cashback", amount: 175, balance: 43000 },
  { date: "2 Jul", desc: "Referral bonus credited", amount: 1000, balance: 42825 },
];

const rechargeAmounts = [2000, 5000, 10000, 20000];

export function WalletView() {
  const toast = useToast();

  return (
    <div className="mx-auto max-w-4xl px-5 py-14 md:px-7 md:py-20">
      <div className="mb-10">
        <div className="mb-2 flex items-center gap-2 font-mono-brand text-xs font-semibold uppercase tracking-[0.14em] text-brand-green">
          <Wallet className="h-3.5 w-3.5" /> Account
        </div>
        <h1 className="text-[28px] font-extrabold tracking-tight md:text-[34px]">Wallet &amp; Club Credits</h1>
        <p className="mt-2 text-[14px] text-muted">Your balance, vouchers, and payment history in one place.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6 rounded-3xl border border-border bg-gradient-to-b from-surface to-bg-1 p-7"
      >
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="mb-1.5 text-[12px] uppercase tracking-wider text-muted-2">Current Balance</div>
            <div className="font-mono-brand text-[38px] font-extrabold text-brand-green">PKR 45,000</div>
            <div className="mt-2 flex items-center gap-1.5 text-[12px] text-muted-2">
              <Clock className="h-3.5 w-3.5" />
              PKR 5,000 of this balance expires 30 Aug
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {rechargeAmounts.map((a) => (
              <button
                key={a}
                onClick={() => toast(`PKR ${a.toLocaleString()} recharge — connects to gateway in production`)}
                className="rounded-full border border-border px-3.5 py-2 text-[12.5px] font-medium text-muted transition-all hover:border-brand-green hover:text-brand-green"
              >
                +{a.toLocaleString()}
              </button>
            ))}
            <Button onClick={() => toast("Recharge screen arrives with the customer app")}>
              <Plus className="h-4 w-4" /> Recharge Account
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="mb-6 grid grid-cols-1 gap-4.5 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-border bg-surface p-5.5"
        >
          <div className="mb-4 flex items-center gap-2 text-[13px] font-semibold">
            <TicketPercent className="h-4 w-4 text-brand-green" /> Promo Vouchers
          </div>
          <div className="flex flex-col gap-2.5">
            {vouchers.map((v) => (
              <div
                key={v.code}
                className={`rounded-xl border px-3.5 py-3 ${v.status === "used" ? "border-border-soft opacity-50" : "border-border-soft"}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono-brand text-[12.5px] font-bold">{v.code}</span>
                  <span className={`text-[10.5px] uppercase tracking-wider ${v.status === "used" ? "text-muted-2" : "text-brand-green"}`}>
                    {v.status === "used" ? "Used" : "Active"}
                  </span>
                </div>
                <div className="mt-1 text-[12px] text-muted">{v.desc}</div>
                <div className="mt-0.5 text-[11px] text-muted-2">{v.expiry}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="rounded-2xl border border-border bg-surface p-5.5"
        >
          <div className="mb-4 flex items-center gap-2 text-[13px] font-semibold">
            <Building2 className="h-4 w-4 text-brand-blue-2" /> Partner Discounts
          </div>
          <div className="flex flex-col gap-2.5">
            {partnerDiscounts.map((p) => (
              <div key={p.partner} className="rounded-xl border border-border-soft px-3.5 py-3">
                <div className="text-[12.5px] font-semibold">{p.partner}</div>
                <div className="mt-0.5 text-[12px] text-muted">{p.detail}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-border bg-surface p-5.5"
      >
        <div className="mb-4 text-[13px] font-semibold">Transaction History</div>
        <div className="flex flex-col">
          {transactions.map((t, i) => (
            <div
              key={i}
              className={`flex items-center justify-between py-3 text-[13px] ${i !== transactions.length - 1 ? "border-b border-border-soft" : ""}`}
            >
              <div>
                <div className="font-medium">{t.desc}</div>
                <div className="text-[11.5px] text-muted-2">{t.date}</div>
              </div>
              <div className="text-right">
                <div className={`font-mono-brand font-semibold ${t.amount > 0 ? "text-brand-green" : "text-ink"}`}>
                  {t.amount > 0 ? "+" : ""}PKR {t.amount.toLocaleString()}
                </div>
                <div className="text-[11px] text-muted-2">Bal. PKR {t.balance.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}