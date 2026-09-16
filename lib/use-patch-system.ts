"use client";

import { useCallback } from "react";
import { useSiteContent } from "@/lib/content";
import type { System } from "@/lib/types";

export function usePatchSystem(systemId: string) {
  const { systems, projects, partners, locations, saveContent } = useSiteContent();

  return useCallback(
    async (patch: Partial<System> | ((current: System) => System)) => {
      const current = systems.find((item) => item.id === systemId);
      if (!current) return;
      const nextSystem = typeof patch === "function" ? patch(current) : { ...current, ...patch };
      await saveContent({
        projects,
        partners,
        locations,
        systems: systems.map((item) => (item.id === systemId ? nextSystem : item)),
      });
    },
    [systemId, systems, projects, partners, locations, saveContent],
  );
}
