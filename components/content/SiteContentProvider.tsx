"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { seedContent } from "@/lib/seed";
import type { SiteContent } from "@/lib/types";

export async function loadSiteContent(): Promise<SiteContent> {
  try {
    const response = await fetch("/api/content", { cache: "no-store" });
    if (!response.ok) return seedContent;
    return (await response.json()) as SiteContent;
  } catch {
    return seedContent;
  }
}

type ContentContextValue = SiteContent & {
  ready: boolean;
  refresh: () => Promise<void>;
  saveContent: (next: SiteContent) => Promise<void>;
};

const ContentContext = createContext<ContentContextValue>({
  ...seedContent,
  ready: false,
  refresh: async () => undefined,
  saveContent: async () => undefined,
});

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(seedContent);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(async () => {
    const next = await loadSiteContent();
    setContent(next);
    setReady(true);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const saveContent = useCallback(async (next: SiteContent) => {
    const response = await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    });
    if (!response.ok) {
      throw new Error("Could not save content");
    }
    setContent(await response.json());
  }, []);

  return (
    <ContentContext.Provider value={{ ...content, ready, refresh, saveContent }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useSiteContent() {
  return useContext(ContentContext);
}
