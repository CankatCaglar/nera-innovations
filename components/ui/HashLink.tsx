"use client";

import type { ReactNode } from "react";
import { scrollToHash } from "@/lib/scroll";

export function HashLink({
  href,
  className,
  children,
  "aria-label": ariaLabel,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      onClick={(event) => {
        event.preventDefault();
        if (!scrollToHash(href)) return;
        window.history.replaceState(null, "", href);
      }}
    >
      {children}
    </a>
  );
}
