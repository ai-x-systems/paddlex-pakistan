import { cn } from "@/lib/utils";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3.5 inline-flex items-center gap-2 font-mono-brand text-xs font-semibold uppercase tracking-[0.14em] text-brand-green">
      <svg viewBox="0 0 12 12" className="h-3 w-3">
        <path d="M1 1L11 11M1 11L11 1" stroke="#C8FF00" strokeWidth="1.6" />
      </svg>
      {children}
    </div>
  );
}

export function SectionHead({
  eyebrow,
  title,
  sub,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-13 flex flex-wrap items-end justify-between gap-6 md:mb-14", className)}>
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="max-w-xl text-[28px] font-extrabold leading-[1.08] tracking-tight md:text-[40px]">
          {title}
        </h2>
      </div>
      {sub && <p className="max-w-sm text-[15px] leading-relaxed text-muted">{sub}</p>}
    </div>
  );
}
