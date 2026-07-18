"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export function AnimatedCounter({
  target,
  decimal,
  suffix = "",
  duration = 1100,
}: {
  target: number;
  decimal?: boolean;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState("0" + suffix);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf: number;
    function tick(t: number) {
      const p = Math.min(1, (t - start) / duration);
      const current = target * p;
      setValue((decimal ? current.toFixed(1) : Math.floor(current).toLocaleString()) + suffix);
      if (p < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, decimal, suffix, duration]);

  return (
    <span ref={ref} className="font-mono-brand text-[28px] font-bold tracking-tight md:text-[32px]">
      {value}
    </span>
  );
}
