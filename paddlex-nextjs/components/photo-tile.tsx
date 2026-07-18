"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const gradients: Record<string, string> = {
  blue: "bg-[radial-gradient(circle_at_30%_20%,rgba(37,99,235,0.5),transparent_55%),linear-gradient(160deg,#151a2e,#0c0d10_70%)]",
  green: "bg-[radial-gradient(circle_at_70%_30%,rgba(200,255,0,0.25),transparent_55%),linear-gradient(160deg,#131414,#0c0d10_70%)]",
  blueSoft: "bg-[radial-gradient(circle_at_40%_70%,rgba(37,99,235,0.35),transparent_55%),linear-gradient(200deg,#12151f,#0c0d10_70%)]",
  greenSoft: "bg-[radial-gradient(circle_at_60%_25%,rgba(200,255,0,0.3),transparent_55%),linear-gradient(160deg,#111a11,#0c0d10_70%)]",
};

export function PhotoTile({
  src,
  alt,
  tone = "blue",
  className,
}: {
  src: string;
  alt: string;
  tone?: keyof typeof gradients;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <div className={cn("absolute inset-0", gradients[tone], className)} aria-hidden />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, 25vw"
      className={cn("object-cover", className)}
      onError={() => setFailed(true)}
    />
  );
}
