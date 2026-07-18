"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/toast-provider";

export function CTA() {
  const toast = useToast();

  return (
    <section className="py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-7">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[28px] border border-border bg-gradient-to-b from-surface to-bg-1 px-8 py-16 text-center"
        >
          <div
            className="pointer-events-none absolute left-1/2 top-[-300px] h-[600px] w-[600px] -translate-x-1/2 rounded-full opacity-[0.14] blur-[100px]"
            style={{ background: "radial-gradient(circle, #C8FF00, transparent 65%)" }}
          />
          <h2 className="relative mb-4 text-[28px] font-extrabold tracking-tight md:text-[46px]">
            Ready to Elevate Your Game?
          </h2>
          <p className="relative mb-7.5 text-muted">
            Karachi&apos;s premium padel &amp; football destination — book your first session today.
          </p>
          <div className="relative flex flex-wrap justify-center gap-3.5">
            <Button size="lg" asChild>
              <a href="#booking-preview">Book Court</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => toast("Demo mode — connects to Contact in production")}
            >
              Contact Us
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
