"use client";

import Link from "next/link";
import { useAdmin } from "./AdminProvider";

export function AdminBar() {
  const { isAdmin, logout } = useAdmin();
  if (!isAdmin) return null;

  return (
    <div className="bg-ink text-white">
      <div className="container-wide flex h-10 items-center justify-between gap-4 text-xs font-medium">
        <p>Admin mode. Visitors do not see these controls.</p>
        <div className="flex items-center gap-4">
          <Link href="/#systems" className="opacity-80 hover:opacity-100">
            Systems
          </Link>
          <Link href="/#company" className="opacity-80 hover:opacity-100">
            Map pins
          </Link>
          <button type="button" onClick={() => void logout()} className="opacity-80 hover:opacity-100">
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
