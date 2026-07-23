"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check, ChevronLeft, Users, UserPlus, ListPlus, Clock3,
  CreditCard, Landmark, Wallet, AlertTriangle, Bell, Mail, Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/toast-provider";

type CourtKey = "A" | "B" | "C" | "F";
const courtNames: Record<CourtKey, string> = { A: "Padel Court A", B: "Padel Court B", C: "Padel Court C", F: "Football Ground" };
const courtRates: Record<CourtKey, number> = { A: 3500, B: 3200, C: 3000, F: 6000 };

const days = ["SAT", "SUN", "MON", "TUE", "WED", "THU", "FRI"];
const dateNums = [18, 19, 20, 21, 22, 23, 24];
const baseSlots = ["07:00", "08:00", "09:00", "10:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"];

function bookedFor(court: CourtKey, dayIdx: number) {
  const seed = court.charCodeAt(0) + dayIdx * 7;
  return baseSlots.filter((_, i) => (seed + i * 3) % 5 === 0);
}

const coaches = [
  { id: "bilal", name: "Coach Bilal Ahmed", fee: 4500, tag: "Advanced strategy" },
  { id: "hina", name: "Coach Hina Farooq", fee: 4000, tag: "Beginners & women's" },
  { id: "ali", name: "Coach Ali Raza", fee: 3800, tag: "Junior development" },
];

const openMatches = [
  { id: "m1", court: "Court A", time: "Sat, 18 Jul · 7:00 PM", need: 2 },
  { id: "m2", court: "Court C", time: "Sun, 19 Jul · 6:00 PM", need: 1 },
  { id: "m3", court: "Football Ground", time: "Sun, 19 Jul · 8:00 PM", need: 4 },
];

type Teaming = "full" | "need1" | "need2" | "join" | "waitlist";

const STEPS = ["Court", "Date", "Time", "Coach", "Teaming", "Payment", "Confirmation"];

export function BookingWizard() {
  const params = useSearchParams();
  const toast = useToast();

  const [step, setStep] = useState(1);
  const [court, setCourt] = useState<CourtKey>((params.get("court") as CourtKey) || "A");
  const [dayIdx, setDayIdx] = useState(Number(params.get("day") ?? 0));
  const [slot, setSlot] = useState<string | null>(params.get("slot"));
  const [addCoach, setAddCoach] = useState(false);
  const [coachId, setCoachId] = useState(coaches[0].id);
  const [teaming, setTeaming] = useState<Teaming>("full");
  const [matchId, setMatchId] = useState(openMatches[0].id);
  const [payMethod, setPayMethod] = useState<"credits" | "card" | "bank">("credits");
  const [demoInsufficient, setDemoInsufficient] = useState(false);

  const booked = useMemo(() => bookedFor(court, dayIdx), [court, dayIdx]);
  const coach = coaches.find((c) => c.id === coachId)!;
  const coachFee = addCoach ? coach.fee : 0;
  const courtFee = courtRates[court];
  const total = courtFee + coachFee;

  const balance = demoInsufficient ? 2000 : 50000;
  const remaining = balance - total;
  const insufficient = remaining < 0;

  function next() {
    if (step === 3 && !slot) {
      toast("Select a time slot to continue");
      return;
    }
    setStep((s) => Math.min(7, s + 1));
  }
  function back() {
    setStep((s) => Math.max(1, s - 1));
  }
  function confirmPay() {
    if (insufficient) {
      toast("Insufficient balance — recharge to continue");
      return;
    }
    setStep(7);
  }
  function resetFlow() {
    setStep(1);
    setSlot(null);
    setAddCoach(false);
    setTeaming("full");
    setDemoInsufficient(false);
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-7 md:py-20">
      <div className="mb-9 flex items-center gap-1.5 overflow-x-auto pb-1">
        {STEPS.map((label, i) => {
          const n = i + 1;
          const active = n === step;
          const done = n < step;
          return (
            <div key={label} className="flex shrink-0 items-center gap-1.5">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full font-mono-brand text-[11px] font-bold transition-colors ${
                  active ? "bg-brand-green text-bg" : done ? "bg-brand-blue-2 text-white" : "border border-border text-muted-2"
                }`}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : n}
              </div>
              <span className={`hidden text-[11.5px] sm:inline ${active ? "font-semibold text-ink" : "text-muted-2"}`}>
                {label}
              </span>
              {n < 7 && <span className="mx-1.5 h-px w-4 bg-border-soft sm:w-6" />}
            </div>
          );
        })}
      </div>

      <div className="rounded-3xl border border-border bg-surface p-6 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {step === 1 && (
              <StepShell title="Choose your court" sub="Every court shows live indicative pricing.">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {(Object.keys(courtNames) as CourtKey[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => setCourt(c)}
                      className={`rounded-2xl border p-4 text-left transition-all ${
                        court === c ? "border-brand-green bg-brand-green/[0.06]" : "border-border hover:border-white/25"
                      }`}
                    >
                      <div className="mb-1 text-[13.5px] font-bold">{courtNames[c]}</div>
                      <div className="font-mono-brand text-[12px] text-muted-2">PKR {courtRates[c].toLocaleString()}/hr</div>
                    </button>
                  ))}
                </div>
              </StepShell>
            )}

            {step === 2 && (
              <StepShell title="Pick a date" sub="Next 7 days shown — full calendar in the live product.">
                <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-7">
                  {days.map((d, i) => (
                    <button
                      key={d}
                      onClick={() => { setDayIdx(i); setSlot(null); }}
                      className={`rounded-2xl border p-3 text-center transition-all ${
                        dayIdx === i ? "border-brand-blue-2 bg-brand-blue/15 text-brand-blue-2" : "border-border text-muted"
                      }`}
                    >
                      <div className="text-[11px]">{d}</div>
                      <div className="mt-1 text-[16px] font-bold">{dateNums[i]}</div>
                    </button>
                  ))}
                </div>
              </StepShell>
            )}

            {step === 3 && (
              <StepShell title="Select a time" sub={`${courtNames[court]} · ${days[dayIdx]} ${dateNums[dayIdx]} Jul`}>
                <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-5">
                  {baseSlots.map((s) => {
                    const isBooked = booked.includes(s);
                    const isSelected = slot === s;
                    return (
                      <button
                        key={s}
                        disabled={isBooked}
                        onClick={() => setSlot(s)}
                        className={`rounded-xl border py-3 text-center font-mono-brand text-[13px] transition-all ${
                          isBooked
                            ? "cursor-not-allowed border-border text-muted-2 line-through opacity-30"
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
              </StepShell>
            )}

            {step === 4 && (
              <StepShell title="Add a coach?" sub="Optional — skip if this is just court time.">
                <button
                  onClick={() => setAddCoach((v) => !v)}
                  className="mb-5 flex w-full items-center justify-between rounded-xl border border-border-soft bg-bg-1 px-4 py-3.5"
                >
                  <span className="text-[13.5px] font-medium">Add a coach to this session</span>
                  <span className={`relative h-6 w-11 rounded-full transition-colors ${addCoach ? "bg-brand-green" : "bg-border"}`}>
                    <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-bg transition-transform ${addCoach ? "translate-x-[22px]" : "translate-x-0.5"}`} />
                  </span>
                </button>

                {addCoach && (
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                    {coaches.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setCoachId(c.id)}
                        className={`rounded-xl border p-3.5 text-left transition-all ${
                          coachId === c.id ? "border-brand-green bg-brand-green/[0.06]" : "border-border hover:border-white/25"
                        }`}
                      >
                        <div className="mb-0.5 text-[13px] font-bold">{c.name}</div>
                        <div className="mb-2 text-[11px] text-muted-2">{c.tag}</div>
                        <div className="font-mono-brand text-[12px] text-brand-green">+PKR {c.fee.toLocaleString()}</div>
                      </button>
                    ))}
                  </div>
                )}
              </StepShell>
            )}

            {step === 5 && (
              <StepShell title="Teaming" sub="Padel needs four — tell us what you've got.">
                <div className="flex flex-col gap-2.5">
                  <TeamOption icon={Users} active={teaming === "full"} onClick={() => setTeaming("full")}
                    title="I already have 4 players" desc="No team-up needed — this is a private booking." />
                  <TeamOption icon={UserPlus} active={teaming === "need1"} onClick={() => setTeaming("need1")}
                    title="Need 1 player" desc="We'll list this as an open spot for others to join." />
                  <TeamOption icon={UserPlus} active={teaming === "need2"} onClick={() => setTeaming("need2")}
                    title="Need 2 players" desc="We'll list this as an open match needing a pair." />
                  <TeamOption icon={ListPlus} active={teaming === "join"} onClick={() => setTeaming("join")}
                    title="Join an existing open match" desc="Skip court/date/time above — jump straight into a match." />
                  <TeamOption icon={Clock3} active={teaming === "waitlist"} onClick={() => setTeaming("waitlist")}
                    title="Add me to the waiting list" desc="No open matches right now? We'll notify you the moment one forms." />
                </div>

                {teaming === "join" && (
                  <div className="mt-4 flex flex-col gap-2">
                    {openMatches.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setMatchId(m.id)}
                        className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-all ${
                          matchId === m.id ? "border-brand-green bg-brand-green/[0.06]" : "border-border-soft"
                        }`}
                      >
                        <div>
                          <div className="text-[13px] font-semibold">{m.court}</div>
                          <div className="text-[11.5px] text-muted-2">{m.time}</div>
                        </div>
                        <span className="rounded-full border border-brand-green/30 bg-brand-green/10 px-2.5 py-1 text-[10.5px] font-semibold text-brand-green">
                          Need {m.need}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </StepShell>
            )}

            {step === 6 && (
              <StepShell title="Payment" sub="Club Credits deduct instantly — other methods are shown for reference.">
                <div className="mb-5 flex gap-2">
                  {[
                    { k: "credits" as const, label: "Club Credits", icon: Wallet },
                    { k: "card" as const, label: "Card", icon: CreditCard },
                    { k: "bank" as const, label: "Bank / PayFast", icon: Landmark },
                  ].map((m) => (
                    <button
                      key={m.k}
                      onClick={() => setPayMethod(m.k)}
                      className={`flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[12.5px] font-medium transition-all ${
                        payMethod === m.k ? "border-brand-blue-2 bg-brand-blue/15 text-brand-blue-2" : "border-border text-muted"
                      }`}
                    >
                      <m.icon className="h-3.5 w-3.5" /> {m.label}
                    </button>
                  ))}
                </div>

                <div className="mb-5 rounded-xl border border-border-soft p-4">
                  <SummaryRow label="Court" value={`${courtNames[court]} · ${days[dayIdx]} ${dateNums[dayIdx]} Jul, ${slot ?? "—"}`} />
                  <SummaryRow label="Coach" value={addCoach ? coach.name : "Not added"} />
                  <SummaryRow label="Teaming" value={teamingLabel(teaming)} />
                  <div className="mt-2 flex items-center justify-between border-t border-border-soft pt-2.5">
                    <span className="text-[13px] font-semibold">Total</span>
                    <span className="font-mono-brand text-[15px] font-bold text-brand-green">PKR {total.toLocaleString()}</span>
                  </div>
                </div>

                {payMethod === "credits" && (
                  <div className="rounded-xl border border-border-soft bg-bg-1 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-[12px] uppercase tracking-wider text-muted-2">Wallet &amp; Club Credits</span>
                      <button
                        onClick={() => setDemoInsufficient((v) => !v)}
                        className="rounded-full border border-border-soft px-2.5 py-1 text-[10px] text-muted-2 transition-colors hover:border-brand-green hover:text-brand-green"
                      >
                        Demo: {demoInsufficient ? "low balance" : "full balance"}
                      </button>
                    </div>

                    <div className="mb-3 flex items-center justify-between rounded-lg bg-surface px-3.5 py-3">
                      <span className="text-[12.5px] text-muted">Current Balance</span>
                      <span className="font-mono-brand text-[15px] font-bold">PKR {balance.toLocaleString()}</span>
                    </div>
                    <div className="mb-1 text-center text-muted-2">↓</div>
                    <div className="mb-3 flex items-center justify-between rounded-lg bg-surface px-3.5 py-3">
                      <span className="text-[12.5px] text-muted">Court &amp; Add-ons</span>
                      <span className="font-mono-brand text-[15px] font-bold text-brand-green">− PKR {total.toLocaleString()}</span>
                    </div>
                    <div className="mb-1 text-center text-muted-2">↓</div>
                    <div className="mb-4 flex items-center justify-between rounded-lg border border-border-soft px-3.5 py-3">
                      <span className="text-[12.5px] font-semibold">Remaining Balance</span>
                      <span className={`font-mono-brand text-[15px] font-bold ${insufficient ? "text-red-400" : "text-brand-green"}`}>
                        PKR {Math.max(remaining, 0).toLocaleString()}
                      </span>
                    </div>

                    {insufficient ? (
                      <div className="flex flex-col gap-3 rounded-xl border border-red-400/30 bg-red-400/[0.06] p-3.5">
                        <div className="flex items-start gap-2 text-[12.5px] leading-relaxed text-red-300">
                          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                          Insufficient account balance. Please recharge your account before making another booking.
                        </div>
                        <Button variant="outline" className="w-full" onClick={() => toast("Recharge screen arrives with the customer app")}>
                          Recharge Account
                        </Button>
                      </div>
                    ) : (
                      <Button className="w-full" onClick={confirmPay}>
                        Confirm &amp; Pay with Club Credits
                      </Button>
                    )}
                  </div>
                )}

                {payMethod === "card" && (
                  <div className="grid grid-cols-2 gap-3 rounded-xl border border-border-soft bg-bg-1 p-4">
                    <input disabled placeholder="Card number" className="col-span-2 rounded-lg border border-border bg-surface px-3.5 py-2.5 text-[13px] text-muted-2 placeholder:text-muted-2" />
                    <input disabled placeholder="MM/YY" className="rounded-lg border border-border bg-surface px-3.5 py-2.5 text-[13px] text-muted-2 placeholder:text-muted-2" />
                    <input disabled placeholder="CVC" className="rounded-lg border border-border bg-surface px-3.5 py-2.5 text-[13px] text-muted-2 placeholder:text-muted-2" />
                    <Button className="col-span-2 w-full" onClick={confirmPay}>
                      Pay PKR {total.toLocaleString()}
                    </Button>
                  </div>
                )}

                {payMethod === "bank" && (
                  <div className="flex flex-col gap-2.5 rounded-xl border border-border-soft bg-bg-1 p-4">
                    <div className="text-[12.5px] text-muted">Choose a gateway:</div>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full border border-border-soft px-3 py-1.5 text-[12px]">Bank Gateway</span>
                      <span className="rounded-full border border-border-soft px-3 py-1.5 text-[12px]">PayFast</span>
                      <span className="rounded-full border border-border-soft px-3 py-1.5 text-[11.5px] text-muted-2 opacity-60">JazzCash — coming soon</span>
                      <span className="rounded-full border border-border-soft px-3 py-1.5 text-[11.5px] text-muted-2 opacity-60">EasyPaisa — coming soon</span>
                    </div>
                    <Button className="mt-1 w-full" onClick={confirmPay}>
                      Continue to Gateway
                    </Button>
                  </div>
                )}
              </StepShell>
            )}

            {step === 7 && (
              <div className="py-4 text-center">
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-brand-green"
                >
                  <Check className="h-7 w-7 text-bg" strokeWidth={3} />
                </motion.div>
                <h2 className="mb-2 text-[22px] font-extrabold">Booking Confirmed</h2>
                <p className="mb-7 text-[13.5px] text-muted">
                  {courtNames[court]} &middot; {days[dayIdx]} {dateNums[dayIdx]} Jul &middot; {slot}
                </p>

                <div className="mx-auto mb-6 max-w-sm rounded-xl border border-border-soft bg-bg-1 p-4 text-left">
                  <div className="mb-1 flex items-center gap-2 text-[11.5px] uppercase tracking-wider text-muted-2">
                    <Bell className="h-3.5 w-3.5" /> Notification
                  </div>
                  <div className="text-[13.5px] font-semibold">
                    Remaining Balance: <span className="font-mono-brand text-brand-green">PKR {Math.max(remaining, 0).toLocaleString()}</span>
                  </div>
                </div>

                <div className="mx-auto mb-8 flex max-w-sm flex-col gap-2">
                  <NotifRow icon={Smartphone} label="Booking Confirmed" sub="Push notification sent" />
                  <NotifRow icon={Mail} label="Booking Confirmed" sub="Email receipt sent" />
                </div>

                <div className="flex flex-wrap justify-center gap-3">
                  <Button variant="outline" onClick={resetFlow}>Book Another</Button>
                  <Button asChild>
                    <Link href="/">Return to Homepage</Link>
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {step < 7 && (
          <div className="mt-8 flex items-center justify-between border-t border-border-soft pt-6">
            <button
              onClick={back}
              disabled={step === 1}
              className="flex items-center gap-1.5 text-[13px] text-muted-2 transition-colors hover:text-ink disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
            {step !== 6 && (
              <Button onClick={next}>{step === 5 ? "Continue to Payment" : "Continue"}</Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function StepShell({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-1 text-[19px] font-extrabold tracking-tight">{title}</h2>
      <p className="mb-6 text-[13px] text-muted">{sub}</p>
      {children}
    </div>
  );
}

function TeamOption({
  icon: Icon, active, onClick, title, desc,
}: {
  icon: React.ComponentType<{ className?: string }>;
  active: boolean;
  onClick: () => void;
  title: string;
  desc: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-start gap-3 rounded-xl border p-3.5 text-left transition-all ${
        active ? "border-brand-green bg-brand-green/[0.06]" : "border-border-soft hover:border-white/25"
      }`}
    >
      <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${active ? "bg-brand-green text-bg" : "bg-bg-1 text-muted-2"}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <div className="text-[13.5px] font-semibold">{title}</div>
        <div className="text-[12px] text-muted-2">{desc}</div>
      </div>
    </button>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-1.5 text-[12.5px]">
      <span className="text-muted-2">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}

function NotifRow({ icon: Icon, label, sub }: { icon: React.ComponentType<{ className?: string }>; label: string; sub: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border-soft px-3.5 py-2.5">
      <Icon className="h-4 w-4 text-brand-blue-2" />
      <div className="text-left">
        <div className="text-[12.5px] font-medium">{label}</div>
        <div className="text-[11px] text-muted-2">{sub}</div>
      </div>
    </div>
  );
}

function teamingLabel(t: Teaming) {
  switch (t) {
    case "full": return "Private booking (4 players)";
    case "need1": return "Listed — need 1 player";
    case "need2": return "Listed — need 2 players";
    case "join": return "Joining an open match";
    case "waitlist": return "Added to waiting list";
  }
}