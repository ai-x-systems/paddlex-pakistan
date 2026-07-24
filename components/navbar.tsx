"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Instagram, MessageCircle } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

// On-page anchor links — sections that exist on the homepage.
const links = [
  { href: "#facilities", label: "Facilities" },
  { href: "#coaching", label: "Coaching" },
  { href: "#gallery", label: "Gallery" },
  { href: "#faq", label: "FAQ" },
];

// Real app routes. Wallet is intentionally public per the brief (nav should
// read Home, Courts, Academy, Wallet, Contact). Booking/Notifications/Admin
// stay out of the primary nav — booking is reachable via "Book Now", and
// Admin is deliberately not surfaced to regular visitors.
const appLinks = [{ href: "/wallet", label: "Wallet" }];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 border-b border-border-soft bg-bg/75 backdrop-blur-xl">
      <div className="mx-auto flex h-[74px] max-w-6xl items-center justify-between px-5 md:px-7">
        <a href="#" className="text-[17px]">
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 text-[14.5px] font-medium text-muted md:flex">
          <a href="#" className="relative transition-colors hover:text-ink">
            Home
          </a>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="relative transition-colors hover:text-ink">
              {l.label}
            </a>
          ))}
          {appLinks.map((l) => (
            <Link key={l.href} href={l.href} className="relative transition-colors hover:text-ink">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://www.instagram.com/padelxpakistan/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hidden h-8 w-8 items-center justify-center rounded-full border border-border text-muted transition-all hover:border-brand-green hover:text-brand-green md:flex"
          >
            <Instagram className="h-[15px] w-[15px]" />
          </a>
          <a
            href="https://wa.me/923007233591?text=Hi!%20I'd%20like%20to%20book%20a%20court%20at%20Padel%20X."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="hidden h-8 w-8 items-center justify-center rounded-full border border-border text-muted transition-all hover:border-brand-green hover:text-brand-green md:flex"
          >
            <MessageCircle className="h-[15px] w-[15px]" />
          </a>
          <Button variant="outline" size="sm" className="hidden md:inline-flex" asChild>
            <a href="mailto:hello@padelxpakistan.pk">Contact</a>
          </Button>
          <Button size="sm" asChild>
            <a href="#booking-preview">Book Now</a>
          </Button>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-border md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mx-auto flex max-w-6xl flex-col gap-0.5 border-t border-border-soft px-5 pb-4">
          <a
            href="#"
            onClick={() => setOpen(false)}
            className="border-b border-border-soft py-3 text-[15px] text-muted"
          >
            Home
          </a>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-border-soft py-3 text-[15px] text-muted"
            >
              {l.label}
            </a>
          ))}
          {appLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-border-soft py-3 text-[15px] text-muted"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="mailto:hello@padelxpakistan.pk"
            onClick={() => setOpen(false)}
            className="border-b border-border-soft py-3 text-[15px] text-muted"
          >
            Contact
          </a>
          <div className="flex gap-2.5 py-3">
            <a
              href="https://www.instagram.com/padelxpakistan/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted"
            >
              <Instagram className="h-[15px] w-[15px]" />
            </a>
            <a
              href="https://wa.me/923007233591?text=Hi!%20I'd%20like%20to%20book%20a%20court%20at%20Padel%20X."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted"
            >
              <MessageCircle className="h-[15px] w-[15px]" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
