"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

// WhatsApp bubble sits at bottom-5 right-5 (md:bottom-7 right-7) at 54px.
// This sits directly above it with a clear gap, same right-edge alignment.
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
      className={`fixed bottom-[76px] right-5 z-40 flex h-[42px] w-[42px] items-center justify-center rounded-full border border-border bg-surface text-muted shadow-[0_4px_16px_rgba(0,0,0,0.35)] transition-all duration-300 hover:border-brand-green hover:text-brand-green md:bottom-[98px] md:right-7 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <ArrowUp className="h-[18px] w-[18px]" strokeWidth={2} />
    </button>
  );
}
