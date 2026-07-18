"use client";

import { SectionHead } from "@/components/section-head";
import { PhotoTile } from "@/components/photo-tile";

const items = [
  { img: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=700&q=80", tone: "blue" as const, h: 280, label: "Court A · Night Session" },
  { img: "https://images.unsplash.com/photo-1487466365202-1afdb86c764e?auto=format&fit=crop&w=700&q=80", tone: "greenSoft" as const, h: 200, label: "Football Ground" },
  { img: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=700&q=80", tone: "green" as const, h: 230, label: "Court B · Match Day" },
  { img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=700&q=80", tone: "blueSoft" as const, h: 190, label: "Coaching Session" },
  { img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=700&q=80", tone: "blue" as const, h: 240, label: "Tournament Finals" },
  { img: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=700&q=80", tone: "greenSoft" as const, h: 260, label: "Corporate Event" },
];

export function Gallery() {
  return (
    <section id="gallery" className="py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-7">
        <SectionHead
          eyebrow="Gallery"
          title="The club, in frame."
          sub="Placeholder set — every tile is a drop-in slot for the client's real photography."
        />

        <div className="columns-1 gap-3.5 sm:columns-2 lg:columns-3">
          {items.map((it) => (
            <div
              key={it.label}
              className="group relative mb-3.5 break-inside-avoid overflow-hidden rounded-2xl border border-border-soft"
              style={{ height: it.h }}
            >
              <div className="absolute inset-0 scale-100 transition-transform duration-700 ease-out group-hover:scale-110">
                <PhotoTile src={it.img} alt={it.label} tone={it.tone} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-3 left-3.5 font-mono-brand text-[11px] text-white/0 transition-colors duration-300 group-hover:text-white/85">
                {it.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
