import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { NotificationCenter } from "@/components/notifications/notification-center";

export const metadata: Metadata = {
  title: "Notifications | PaddleX Pakistan",
  description: "Notification center demonstrating customer and reception alerts.",
};

export default function NotificationsPage() {
  return (
    <>
      <Navbar />
      <main>
        <NotificationCenter />
      </main>
      <Footer />
    </>
  );
}