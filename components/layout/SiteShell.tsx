import type { ReactNode } from "react";
import { AdminBar } from "@/components/admin/AdminBar";
import { CtaBanner } from "./CtaBanner";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { WhatsAppButton } from "./WhatsAppButton";

export function SiteShell({
  children,
  showCtaButton = true,
}: {
  children: ReactNode;
  showCtaButton?: boolean;
}) {
  return (
    <div className="flex min-h-full flex-col bg-background">
      <div data-sticky-header className="sticky top-0 z-50">
        <AdminBar />
        <Header />
      </div>
      <main className="flex-1">{children}</main>
      <CtaBanner showButton={showCtaButton} />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
