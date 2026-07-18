import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={cn("h-8 w-8", className)}>
      <path d="M4 4L18 18M4 4V12M4 4H12" stroke="#F5F6F7" strokeWidth="3.4" strokeLinecap="square" />
      <path d="M36 4L22 18M36 4V12M36 4H28" stroke="#C8FF00" strokeWidth="3.4" strokeLinecap="square" />
      <path d="M4 36L18 22M4 36V28M4 36H12" stroke="#C8FF00" strokeWidth="3.4" strokeLinecap="square" />
      <path d="M36 36L22 22M36 36V28M36 36H28" stroke="#F5F6F7" strokeWidth="3.4" strokeLinecap="square" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5 font-extrabold tracking-tight", className)}>
      <LogoMark />
      <span>
        PADEL<span className="text-brand-green">X</span>
      </span>
    </div>
  );
}
