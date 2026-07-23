use client;

import { motion } from framer-motion;

const racketVariants = {
  hidden { opacity 0, x 50, y -10, rotate -35 },
  show {
    opacity 1,
    x 0,
    y 0,
    rotate [-35, 18, -6, 0],
    transition { duration 0.9, ease [0.16, 1, 0.3, 1], times [0, 0.55, 0.8, 1] },
  },
};

const ballVariants = {
  hidden { opacity 0 },
  show {
    opacity 1,
    x [0, -34, -72, -118, -150],
    y [0, -22, -6, -26, 0],
    scale [0.7, 1, 0.9, 1, 0.82],
    transition { delay 0.4, duration 0.9, ease easeInOut },
  },
};

const glowVariants = {
  hidden { opacity 0 },
  show {
    opacity [0, 1, 0],
    transition { delay 1.15, duration 0.9, ease easeOut },
  },
};

export function SignatureBookingAnimation() {
  return (
    div className=pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-3xl
      { highlight pulse on the whole panel }
      motion.div
        variants={glowVariants}
        initial=hidden
        whileInView=show
        viewport={{ once true, amount 0.5 }}
        className=absolute inset-0 rounded-3xl
        style={{ boxShadow 0 0 0 2px rgba(200,255,0,0.5), 0 0 50px rgba(200,255,0,0.25) }}
      

      div className=absolute -top-2 right-8 hidden mdblock
        { racket }
        motion.svg
          variants={racketVariants}
          initial=hidden
          whileInView=show
          viewport={{ once true, amount 0.5 }}
          width=54
          height=70
          viewBox=0 0 54 70
          fill=none
        
          ellipse cx=27 cy=24 rx=21 ry=23 stroke=#4C82FF strokeWidth=3.5 
          path d=M27 47V66 stroke=#4C82FF strokeWidth=4 strokeLinecap=round 
          path d=M14 24h26M27 5v38M18 11l18 26M36 11L18 37 stroke=#4C82FF strokeWidth=1 opacity=0.5 
        motion.svg

        { ball }
        motion.div
          variants={ballVariants}
          initial=hidden
          whileInView=show
          viewport={{ once true, amount 0.5 }}
          className=absolute left-3 top-6 h-3.5 w-3.5 rounded-full bg-brand-green shadow-[0_0_10px_#C8FF00]
        
      div
    div
  );
}