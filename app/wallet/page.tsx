import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WalletView } from "@/components/wallet/wallet-view";

export const metadata: Metadata = {
  title: "Wallet & Club Credits | PaddleX Pakistan",
  description: "Manage your PaddleX wallet balance, vouchers, and payment history.",
};

export default function WalletPage() {
  return (
    <>
      <Navbar />
      <main>
        <WalletView />
      </main>
      <Footer />
    </>
  );
}