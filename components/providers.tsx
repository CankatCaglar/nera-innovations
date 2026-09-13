"use client";

import type { ReactNode } from "react";
import { AdminProvider } from "@/components/admin/AdminProvider";
import { SiteContentProvider } from "@/components/content/SiteContentProvider";
import { ScrollToTopOnReload } from "@/components/layout/ScrollToTopOnReload";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AdminProvider>
      <SiteContentProvider>
        <ScrollToTopOnReload />
        {children}
      </SiteContentProvider>
    </AdminProvider>
  );
}
