import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Client's real logo mark — /public/logo.png.
 * Used on its own (navbar, footer) since the artwork already includes the "PADEL X" wordmark.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-9 w-9 shrink-0 overflow-hidden rounded-md", className)}>
      <Image src="/logo.png" alt="PadelX Pakistan" fill sizes="36px" className="object-cover" priority />
    </div>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
    </div>
  );
}
