"use client";

import { MessageCircle } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/923007233591?text=Hi!%20I'd%20like%20to%20know%20more%20about%20Padel%20X%20Pakistan.";

export function WhatsappButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Padel X Pakistan on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex h-[54px] w-[54px] items-center justify-center rounded-full bg-brand-green text-[#0a0a0a] shadow-[0_4px_20px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(200,255,0,0.4)] active:scale-95 md:bottom-7 md:right-7"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-brand-green/50 [animation-duration:2.2s]" />
      <MessageCircle className="h-6 w-6" strokeWidth={2} />
    </a>
  );
}
