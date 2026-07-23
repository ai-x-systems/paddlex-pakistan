"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#facilities", label: "Facilities" },
  { href: "#coaches", label: "Coaches" },
  { href: "#join-match", label: "Find Players" },
  { href: "#tournaments", label: "Tournaments" },
  { href: "#gallery", label: "Gallery" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 border-b border-border-soft bg-bg/75 backdrop-blur-xl">
      <div className="mx-auto flex h-[74px] max-w-6xl items-center justify-between px-5 md:px-7">
        <a href="#" className="text-[17px]">
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 text-[14.5px] font-medium text-muted md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="relative transition-colors hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="hidden md:inline-flex" asChild>
            <a href="#contact">Contact</a>
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
          {links.map((l) => (
            
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-border-soft py-3 text-[15px] text-muted"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
