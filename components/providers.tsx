"use client";

import type { ReactNode } from "react";
import { AdminProvider } from "@/components/admin/AdminProvider";
import { SiteContentProvider } from "@/components/content/SiteContentProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AdminProvider>
      <SiteContentProvider>{children}</SiteContentProvider>
    </AdminProvider>
  );
}
