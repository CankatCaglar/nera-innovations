"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";

type AdminContextValue = {
  isAdmin: boolean;
  ready: boolean;
  logout: () => Promise<void>;
};

const AdminContext = createContext<AdminContextValue>({
  isAdmin: false,
  ready: false,
  logout: async () => undefined,
});

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [ready, setReady] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    let active = true;
    fetch("/api/admin/me", { cache: "no-store" })
      .then((response) => response.json())
      .then((data: { admin?: boolean }) => {
        if (!active) return;
        setIsAdmin(Boolean(data.admin));
        setReady(true);
      })
      .catch(() => {
        if (!active) return;
        setIsAdmin(false);
        setReady(true);
      });
    return () => {
      active = false;
    };
  }, [pathname]);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsAdmin(false);
    router.push("/");
    router.refresh();
  }

  return (
    <AdminContext.Provider value={{ isAdmin, ready, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
