import { Instagram, MessageCircle } from "lucide-react";
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="border-t border-border-soft py-14">
      <div className="mx-auto max-w-6xl px-5 md:px-7">
        <div className="mb-11 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-3.5 max-w-[260px] text-[13.5px] leading-relaxed text-muted-2">
              Pakistan&apos;s premium padel &amp; football destination — Karachi.
            </p>
          </div>
          <div>
            <div className="mb-4 font-mono-brand text-xs uppercase tracking-wider text-muted-2">
              Quick Links
            </div>
            <div className="flex flex-col gap-2.5">
              <a href="#facilities" className="text-[13.5px] text-muted transition-colors hover:text-brand-green">Facilities</a>
              <a href="#membership" className="text-[13.5px] text-muted transition-colors hover:text-brand-green">Membership</a>
              <a href="#coaching" className="text-[13.5px] text-muted transition-colors hover:text-brand-green">Coaching</a>
              <a href="#faq" className="text-[13.5px] text-muted transition-colors hover:text-brand-green">FAQ</a>
            </div>
          </div>
          <div>
            <div className="mb-4 font-mono-brand text-xs uppercase tracking-wider text-muted-2">Visit</div>
            <div className="flex flex-col gap-2.5">
              <span className="text-[13.5px] text-muted">Karachi, Pakistan</span>
              <span className="text-[13.5px] text-muted">+92 300 000 0000</span>
              <span className="text-[13.5px] text-muted">hello@padelxpakistan.pk</span>
            </div>
          </div>
          <div>
            <div className="mb-4 font-mono-brand text-xs uppercase tracking-wider text-muted-2">Follow</div>
            <div className="flex gap-2.5">
              <a
                href="https://www.instagram.com/padelxpakistan/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-border text-muted transition-all hover:border-brand-green hover:text-brand-green"
              >
                <Instagram className="h-[15px] w-[15px]" />
              </a>
              <a
                href="https://wa.me/923000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-border text-muted transition-all hover:border-brand-green hover:text-brand-green"
              >
                <MessageCircle className="h-[15px] w-[15px]" />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border-soft pt-6 text-xs text-muted-2">
          <span>© 2026 PadelX Pakistan. All rights reserved.</span>
          <span className="font-mono-brand">Phase 1 demo — built for the sales presentation</span>
        </div>
      </div>
    </footer>
  );
}
