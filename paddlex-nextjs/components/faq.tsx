"use client";

import { SectionHead } from "@/components/section-head";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "How do bookings work?",
    a: "Pick a sport, a court, a date and a time slot, then pay online or reserve for walk-in payment. You'll get an instant confirmation and a reminder before your session.",
  },
  {
    q: "Can I cancel?",
    a: "Yes — cancellations made before the cutoff window are fully refunded to your wallet or original payment method. Late cancellations follow the posted policy.",
  },
  {
    q: "Do you offer coaching?",
    a: "Yes — structured programs for kids, adults and private 1:1 sessions, each with a fixed coach, schedule and group size. See the Coaching Academy section above.",
  },
  {
    q: "Do you host tournaments?",
    a: "Regularly. Registration opens on the site, with brackets, live results and a season leaderboard for both padel and football events.",
  },
  {
    q: "Can companies book events?",
    a: "Yes — our Corporate membership covers multi-seat team accounts, bulk-hour packages and full-facility event bookings with consolidated invoicing.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-7">
        <SectionHead eyebrow="FAQ" title="Good to know." />

        <Accordion type="single" collapsible defaultValue="item-0" className="max-w-2xl">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
