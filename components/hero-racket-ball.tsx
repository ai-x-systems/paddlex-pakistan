"use client";

import { motion } from "framer-motion";

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
    x: [0, -22, -44, -68, -84],
    y: [0, -14, -4, -16, 0],
    scale: [0.7, 1, 0.9, 1, 0.82],
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
  y: [0, -10, 0],
  transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2.4 },
};

// Large, standalone hero centerpiece — the racket/ball flourish scaled up and
// glowing lime-green, meant to sit beside the headline as a hero visual, not
// tucked into a small card corner like SignatureBookingAnimation.
export function HeroRacketBall() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-visible">
      <motion.div
        variants={glowVariants}
        initial="hidden"
        animate="show"
        className="absolute right-2 top-0 h-[260px] w-[220px] rounded-full opacity-60 blur-[60px]"
        style={{ background: "radial-gradient(circle, #C8FF00 0%, transparent 70%)" }}
      />

      <motion.div animate={idleFloat} className="absolute right-0 top-0">
        <motion.svg
          variants={racketVariants}
          initial="hidden"
          animate="show"
          width="150"
          height="196"
          viewBox="0 0 54 70"
          fill="none"
          style={{ filter: "drop-shadow(0 0 14px rgba(200,255,0,0.65))" }}
        >
          <ellipse cx="27" cy="24" rx="21" ry="23" stroke="#C8FF00" strokeWidth="3.5" />
          <path d="M27 47V66" stroke="#C8FF00" strokeWidth="4" strokeLinecap="round" />
          <path
            d="M14 24h26M27 5v38M18 11l18 26M36 11L18 37"
            stroke="#C8FF00"
            strokeWidth="1"
            opacity="0.5"
          />
        </motion.svg>

        <motion.div
          variants={ballVariants}
          initial="hidden"
          animate="show"
          className="absolute left-8 top-16 h-8 w-8 rounded-full bg-brand-green shadow-[0_0_24px_#C8FF00]"
        />
      </motion.div>
    </div>
  );
}
