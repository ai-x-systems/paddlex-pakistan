import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://paddlex-pakistan.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "PaddleX Pakistan | Premium Padel & Football Booking",
  description:
    "Premium padel courts, football grounds, coaching academy and online booking platform in Karachi.",
  openGraph: {
    title: "PaddleX Pakistan | Premium Padel & Football Booking",
    description:
      "Premium padel courts, football grounds, coaching academy and online booking platform in Karachi.",
    url: siteUrl,
    siteName: "PaddleX Pakistan",
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PaddleX Pakistan | Premium Padel & Football Booking",
    description:
      "Premium padel courts, football grounds, coaching academy and online booking platform in Karachi.",
  },
  alternates: { canonical: siteUrl },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
