"use client";

const WHATSAPP_URL =
  "https://wa.me/923007233591?text=Hi!%20I'd%20like%20to%20know%20more%20about%20Padel%20X%20Pakistan.";

function WhatsappGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.29-.15-1.71-.85-1.98-.94-.27-.1-.46-.15-.66.15-.2.29-.75.94-.92 1.13-.17.2-.34.22-.63.07-.29-.15-1.22-.45-2.32-1.43-.86-.77-1.44-1.71-1.61-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.5.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.52-.07-.15-.66-1.59-.9-2.18-.24-.57-.48-.5-.66-.51h-.56c-.2 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.44s1.05 2.83 1.19 3.03c.15.2 2.07 3.16 5.02 4.43.7.3 1.25.48 1.68.62.7.22 1.34.19 1.84.12.56-.08 1.71-.7 1.95-1.38.24-.68.24-1.26.17-1.38-.07-.13-.27-.2-.56-.35Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .17 5.32.17 11.88c0 2.09.55 4.14 1.6 5.94L0 24l6.34-1.66a11.87 11.87 0 0 0 5.71 1.45h.01c6.55 0 11.88-5.33 11.88-11.9a11.8 11.8 0 0 0-3.42-8.41ZM12.06 21.7h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.76.99 1-3.67-.24-.37a9.86 9.86 0 0 1-1.51-5.19c0-5.46 4.45-9.9 9.92-9.9a9.85 9.85 0 0 1 7.01 2.9 9.83 9.83 0 0 1 2.9 7.01c0 5.47-4.45 9.9-9.92 9.9Z"
      />
    </svg>
  );
}

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
      <WhatsappGlyph className="h-6 w-6" />
    </a>
  );
}
