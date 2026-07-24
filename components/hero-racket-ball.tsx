"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// Perforation holes scattered across the paddle face — precomputed so they
// read as a real padel racket's hole pattern rather than a generic blob.
const holes: Array<[number, number, number]> = [
  [-9, -20, 2.6], [0, -22, 2.8], [9, -20, 2.6],
  [-15, -12, 2.7], [-5, -13, 2.9], [5, -13, 2.9], [15, -12, 2.7],
  [-17, -2, 2.6], [-7, -3, 2.9], [3, -3, 2.9], [13, -2, 2.6],
  [-15, 7, 2.6], [-5, 7, 2.8], [5, 7, 2.8], [15, 7, 2.6],
  [-9, 15, 2.5], [0, 16, 2.6], [9, 15, 2.5],
];

const racketVariants = {
  hidden: { opacity: 0, x: 60, y: -20, rotate: -35, scale: 0.85 },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    rotate: [-35, 18, -6, 0],
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1], times: [0, 0.55, 0.8, 1] },
  },
};

const ballVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    x: [0, -18, -34, -20, -6],
    y: [0, -22, -32, -16, -4],
    scale: [0.7, 1, 0.9, 1, 0.85],
    transition: { delay: 0.5, duration: 1.1, ease: "easeInOut" },
  },
};

const glowVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: [0, 1, 0.55],
    transition: { delay: 1.4, duration: 1, ease: "easeOut" },
  },
};

const idleFloat = {
  y: [0, -12, 0],
  transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 1.6 },
};

// Large, standalone hero centerpiece — a richer, shaded padel racket + ball
// illustration (gradients, perforation holes, rim highlight) instead of a
// flat outline, with a subtle cursor-tilt effect on desktop for depth.
export function HeroRacketBall() {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 120, damping: 16, mass: 0.4 });
  const springY = useSpring(rawY, { stiffness: 120, damping: 16, mass: 0.4 });
  const rotateX = useTransform(springY, [-1, 1], [18, -18]);
  const rotateY = useTransform(springX, [-1, 1], [-24, 24]);
  const ballShiftX = useTransform(springX, [-1, 1], [-14, 14]);
  const ballShiftY = useTransform(springY, [-1, 1], [-11, 11]);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFinePointer || reducedMotion) return;

    function handleMove(e: PointerEvent) {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      rawX.set(Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width / 2))));
      rawY.set(Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2))));
    }
    function handleLeave() {
      rawX.set(0);
      rawY.set(0);
    }
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerleave", handleLeave);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerleave", handleLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={wrapRef} className="pointer-events-none absolute inset-0 overflow-visible" style={{ perspective: 900 }}>
      <motion.div
        variants={glowVariants}
        initial="hidden"
        animate="show"
        className="absolute right-2 top-0 h-[280px] w-[240px] rounded-full opacity-60 blur-[64px]"
        style={{ background: "radial-gradient(circle, #C8FF00 0%, transparent 70%)" }}
      />

      <motion.div animate={idleFloat} className="absolute right-0 top-0" style={{ transformStyle: "preserve-3d" }}>
        <motion.div
          variants={racketVariants}
          initial="hidden"
          animate="show"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        >
          <svg
            width="190"
            height="248"
            viewBox="0 0 76 100"
            fill="none"
            style={{ filter: "drop-shadow(0 14px 26px rgba(0,0,0,0.55)) drop-shadow(0 0 18px rgba(200,255,0,0.35))" }}
          >
            <defs>
              <radialGradient id="faceFill" cx="38%" cy="28%" r="75%">
                <stop offset="0%" stopColor="#3a3d1f" />
                <stop offset="55%" stopColor="#1c1e10" />
                <stop offset="100%" stopColor="#0c0d07" />
              </radialGradient>
              <linearGradient id="rimStroke" x1="0" y1="0" x2="76" y2="100" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#E9FF66" />
                <stop offset="100%" stopColor="#8FB800" />
              </linearGradient>
              <linearGradient id="gripFill" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2a2a2f" />
                <stop offset="100%" stopColor="#111114" />
              </linearGradient>
              <linearGradient id="sheen" x1="10" y1="4" x2="46" y2="46" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* paddle face */}
            <path
              d="M38 3C58 3 70 20 70 40C70 58 60 74 38 74C16 74 6 58 6 40C6 20 18 3 38 3Z"
              fill="url(#faceFill)"
              stroke="url(#rimStroke)"
              strokeWidth="2.4"
            />
            {/* glossy sheen highlight */}
            <path
              d="M20 12C26 8 33 6 39 7C31 10 24 16 20 26C16 20 16 15 20 12Z"
              fill="url(#sheen)"
            />
            {/* perforation holes */}
            <g transform="translate(38 40)">
              {holes.map(([hx, hy, r], i) => (
                <circle key={i} cx={hx} cy={hy} r={r} fill="#050505" fillOpacity="0.85" />
              ))}
            </g>
            {/* handle */}
            <rect x="32" y="72" width="12" height="8" fill="url(#gripFill)" />
            <rect x="30" y="78" width="16" height="20" rx="4" fill="url(#gripFill)" stroke="#3a3a40" strokeWidth="1" />
            <path d="M30 82h16M30 87h16M30 92h16" stroke="#0a0a0c" strokeWidth="1" opacity="0.6" />
          </svg>
        </motion.div>

        <motion.div
          variants={ballVariants}
          initial="hidden"
          animate="show"
          className="absolute left-9 top-16"
          style={{ x: ballShiftX, y: ballShiftY }}
        >
          <svg width="34" height="34" viewBox="0 0 34 34" style={{ filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.5))" }}>
            <defs>
              <radialGradient id="ballFill" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#F3FFA8" />
                <stop offset="45%" stopColor="#C8FF00" />
                <stop offset="100%" stopColor="#7C9900" />
              </radialGradient>
            </defs>
            <circle cx="17" cy="17" r="15" fill="url(#ballFill)" />
            <path
              d="M4 12C9 15 14 15 17 12C20 15 25 15 30 12"
              stroke="#0a0a0a"
              strokeWidth="1"
              opacity="0.3"
              fill="none"
            />
            <path
              d="M4 22C9 19 14 19 17 22C20 19 25 19 30 22"
              stroke="#0a0a0a"
              strokeWidth="1"
              opacity="0.3"
              fill="none"
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
