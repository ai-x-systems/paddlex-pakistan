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
  y: [0, -8, 0],
  transition: { duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 1.6 },
};

// Large, standalone hero centerpiece — a richer, shaded padel racket + ball
// illustration (gradients, perforation holes, rim highlight) instead of a
// flat outline, with a subtle cursor-tilt effect on desktop for depth.
export function HeroRacketBall() {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 220, damping: 24, mass: 0.25 });
  const springY = useSpring(rawY, { stiffness: 220, damping: 24, mass: 0.25 });
  const rotateX = useTransform(springY, [-1, 1], [7, -7]);
  const rotateY = useTransform(springX, [-1, 1], [-9, 9]);
  const ballShiftX = useTransform(springX, [-1, 1], [-5, 5]);
  const ballShiftY = useTransform(springY, [-1, 1], [-4, 4]);
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
              <linearGradient id="gripFill" x1="30" y1="72" x2="40" y2="100" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#EDE2A6" />
                <stop offset="50%" stopColor="#C8D96C" />
                <stop offset="100%" stopColor="#6F9A34" />
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
            {/* handle: tapered grip fading from pale wood-tone to green, with a rounded cap */}
            <path
              d="M33 72C32.6 79 31.5 86 31.4 92C31.3 96.5 32.2 100.5 35 100.5C37.8 100.5 38.7 96.5 38.6 92C38.5 86 37.4 79 37 72Z"
              fill="url(#gripFill)"
            />
            <path
              d="M33.3 74.5C32.6 82 32.1 89.5 32.3 96.5"
              stroke="#F7FFC2"
              strokeWidth="0.8"
              strokeLinecap="round"
              opacity="0.55"
              fill="none"
            />
            <path
              d="M36.7 74.5C37.4 82 37.9 89.5 37.7 96.5"
              stroke="#3F5C18"
              strokeWidth="0.8"
              strokeLinecap="round"
              opacity="0.5"
              fill="none"
            />
            <ellipse cx="35" cy="99.5" rx="3.1" ry="2" fill="#232316" opacity="0.9" />
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
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="55%" stopColor="#F1F1F1" />
                <stop offset="100%" stopColor="#C7C7C7" />
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
