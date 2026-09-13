import type { ReactNode } from "react";
import { AdminBar } from "@/components/admin/AdminBar";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { WhatsAppButton } from "./WhatsAppButton";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-col bg-background">
      <div className="sticky top-0 z-50">
        <AdminBar />
        <Header />
      </div>
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
