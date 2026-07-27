"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

// WhatsApp bubble sits at bottom-5 right-5 (md:bottom-7 right-7), 54px tall
// — its top edge lands at 74px (mobile) / 82px (desktop) from the bottom.
// This sits a clear ~20-24px above that, same right-edge alignment, and
// matches its lime color + hover treatment.
export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 600);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className={`fixed bottom-[94px] right-5 z-40 flex h-[42px] w-[42px] items-center justify-center rounded-full bg-brand-green text-[#0a0a0a] shadow-[0_4px_16px_rgba(0,0,0,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(200,255,0,0.4)] active:scale-95 md:bottom-[106px] md:right-7 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <ArrowUp className="h-[18px] w-[18px]" strokeWidth={2.2} />
    </button>
  );
}
