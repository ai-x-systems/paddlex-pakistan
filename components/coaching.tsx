"use client";

import { SectionHead } from "@/components/section-head";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Program = {
  name: string;
  desc: string;
  sessions: string;
  duration: string;
  group: string;
  coach: string;
  price: string;
};

const kids: Program[] = [
  { name: "Junior Starters", desc: "Ages 6–10. Fundamentals, footwork, and racket control in a fun, structured group setting.", sessions: "8", duration: "60 min", group: "Max 6", coach: "Coach Ali", price: "PKR 12,000" },
  { name: "Junior Advanced", desc: "Ages 11–16. Match play, strategy, and competitive drills for tournament-track players.", sessions: "8", duration: "75 min", group: "Max 6", coach: "Coach Hina", price: "PKR 14,000" },
  { name: "Weekend Academy", desc: "A lighter Sat/Sun-only track for kids balancing school and other sports.", sessions: "4", duration: "60 min", group: "Max 8", coach: "Coach Ali", price: "PKR 7,500" },
];

const adults: Program[] = [
  { name: "Adult Group — Beginner", desc: "No experience needed. Rules, positioning, and your first rallies in a relaxed group.", sessions: "8", duration: "75 min", group: "Max 6", coach: "Coach Bilal", price: "PKR 15,000" },
  { name: "Adult Group — Intermediate", desc: "Sharpen your smash, volley and net game with players at your level.", sessions: "8", duration: "75 min", group: "Max 6", coach: "Coach Bilal", price: "PKR 16,500" },
  { name: "Women's Only Track", desc: "A dedicated women's group, coached by Hina, at a fixed weekday evening slot.", sessions: "8", duration: "75 min", group: "Max 6", coach: "Coach Hina", price: "PKR 15,000" },
];

const priv: Program[] = [
  { name: "Private 1:1", desc: "Fully personalized coaching, scheduled around you, with performance tracking.", sessions: "4", duration: "60 min", group: "1-on-1", coach: "Any coach", price: "PKR 20,000" },
  { name: "Private Duo", desc: "Bring a partner — split focused coaching between two players, same coach.", sessions: "4", duration: "75 min", group: "Max 2", coach: "Any coach", price: "PKR 26,000" },
  { name: "Performance Intensive", desc: "Tournament-prep block: video review, match strategy, and physical conditioning.", sessions: "8", duration: "90 min", group: "1-on-1", coach: "Coach Bilal", price: "PKR 38,000" },
];

function ProgramCard({ p }: { p: Program }) {
  return (
    <div className="rounded-[18px] border border-border bg-surface p-6.5">
      <div className="mb-1.5 text-[17px] font-bold">{p.name}</div>
      <p className="mb-5 text-[13.5px] leading-relaxed text-muted">{p.desc}</p>
      <div className="mb-5 grid grid-cols-2 gap-3">
        <MetaBox v={p.sessions} l="Sessions / mo" />
        <MetaBox v={p.duration} l="Duration" />
        <MetaBox v={p.group} l="Group size" />
        <MetaBox v={p.coach} l="Assigned coach" />
      </div>
      <div className="flex items-baseline justify-between border-t border-border-soft pt-4">
        <span className="text-[20px] font-extrabold">{p.price}</span>
        <span className="text-[12px] text-muted-2">/ month</span>
      </div>
    </div>
  );
}

function MetaBox({ v, l }: { v: string; l: string }) {
  return (
    <div className="rounded-[10px] border border-border-soft px-3 py-2.5">
      <div className="font-mono-brand text-[15px] font-bold">{v}</div>
      <div className="mt-0.5 text-[10.5px] uppercase tracking-wider text-muted-2">{l}</div>
    </div>
  );
}

export function Coaching() {
  return (
    <section id="coaching" className="py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-7">
        <SectionHead
          eyebrow="Coaching Academy"
          title="Structured programs, real coaches."
          sub="Kids, adults, and private 1:1 — every program has a fixed schedule, coach, and group size."
        />

        <Tabs defaultValue="kids">
          <TabsList className="mb-9">
            <TabsTrigger value="kids">Kids</TabsTrigger>
            <TabsTrigger value="adults">Adults</TabsTrigger>
            <TabsTrigger value="private">Private Coaching</TabsTrigger>
          </TabsList>

          <TabsContent value="kids" className="grid grid-cols-1 gap-4.5 md:grid-cols-3">
            {kids.map((p) => <ProgramCard key={p.name} p={p} />)}
          </TabsContent>
          <TabsContent value="adults" className="grid grid-cols-1 gap-4.5 md:grid-cols-3">
            {adults.map((p) => <ProgramCard key={p.name} p={p} />)}
          </TabsContent>
          <TabsContent value="private" className="grid grid-cols-1 gap-4.5 md:grid-cols-3">
            {priv.map((p) => <ProgramCard key={p.name} p={p} />)}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
