import type { Metadata } from "next";
import { Logo } from "@/components/logo";
import { AdminOverview } from "@/components/admin/admin-overview";

export const metadata: Metadata = {
  title: "Admin | PaddleX Pakistan",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <div className="border-b border-border-soft">
        <div className="mx-auto flex h-[70px] max-w-5xl items-center justify-between px-5 md:px-7">
          <Logo />
          <span className="rounded-full border border-border px-3 py-1 font-mono-brand text-[11px] uppercase tracking-wider text-muted-2">
            Internal
          </span>
        </div>
      </div>
      <AdminOverview />
    </div>
  );
}