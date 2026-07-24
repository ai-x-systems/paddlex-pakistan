"use client";

import { MapPin, Clock, MessageCircle, Navigation } from "lucide-react";
import { SectionHead } from "@/components/section-head";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL =
  "https://wa.me/923007233591?text=Hi!%20I'd%20like%20to%20know%20more%20about%20Padel%20X%20Pakistan.";
const MAPS_DIRECTIONS_URL = "https://www.google.com/maps/dir/?api=1&destination=Padel+X+Pakistan,Karachi";
const MAPS_EMBED_URL = "https://www.google.com/maps?q=Karachi,Pakistan&output=embed";

const hours = [
  { day: "Monday – Friday", time: "7:00 AM – 12:00 AM" },
  { day: "Saturday – Sunday", time: "7:00 AM – 1:00 AM" },
];

export function Location() {
  return (
    <section id="location" className="py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-7">
        <SectionHead
          eyebrow="Find Us"
          title="One arena, easy to get to."
          sub="Drop in, book ahead, or message us on WhatsApp — Padel X Pakistan is in the heart of Karachi."
        />

        <div className="grid grid-cols-1 gap-4.5 lg:grid-cols-[1fr_0.85fr]">
          <div className="overflow-hidden rounded-[18px] border border-border">
            <iframe
              src={MAPS_EMBED_URL}
              title="Padel X Pakistan location map"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[340px] w-full grayscale invert-0 md:h-full"
              style={{ border: 0, filter: "grayscale(0.4) contrast(1.05)" }}
            />
          </div>

          <div className="flex flex-col gap-4.5">
            <div className="rounded-[18px] border border-border bg-surface p-6.5">
              <div className="mb-4.5 flex items-start gap-3.5">
                <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                  <MapPin className="h-5 w-5" strokeWidth={1.8} />
                </div>
                <div>
                  <div className="mb-1 text-[15px] font-bold">Address</div>
                  <p className="text-[13.5px] leading-relaxed text-muted">
                    Padel X Pakistan Arena, Karachi, Pakistan
                  </p>
                </div>
              </div>

              <div className="mb-5 flex items-start gap-3.5">
                <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                  <Clock className="h-5 w-5" strokeWidth={1.8} />
                </div>
                <div className="w-full">
                  <div className="mb-1 text-[15px] font-bold">Hours</div>
                  <div className="flex flex-col gap-1">
                    {hours.map((h) => (
                      <div key={h.day} className="flex items-baseline justify-between text-[13.5px] text-muted">
                        <span>{h.day}</span>
                        <span className="font-mono-brand text-[12px] text-muted-2">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full" asChild>
                <a href={MAPS_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">
                  <Navigation className="h-4 w-4" strokeWidth={2} />
                  Get Directions
                </a>
              </Button>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-[18px] border border-border bg-surface p-6.5">
              <div>
                <div className="mb-1 text-[15px] font-bold">Prefer to chat?</div>
                <p className="text-[13px] leading-relaxed text-muted">
                  Message us directly on WhatsApp — usually a reply within minutes.
                </p>
              </div>
              <Button size="sm" className="shrink-0" asChild>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" strokeWidth={2} />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
