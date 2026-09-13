"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV } from "@/lib/constants";
import { scrollToHash } from "@/lib/scroll";
import { Button } from "@/components/ui/Button";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function handleNavClick(
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) {
    setOpen(false);
    if (pathname !== "/" || !href.startsWith("/#")) return;
    if (!scrollToHash(href)) return;
    event.preventDefault();
    window.history.replaceState(null, "", href);
  }

  return (
    <header className="border-b border-black/4 bg-white/90 backdrop-blur-xl">
      <div className="container-wide flex h-[84px] items-center justify-between gap-6 py-3">
        <Link
          href="/"
          className="shrink-0 bg-transparent"
          aria-label="Nera Innovations home"
          onClick={(event) => {
            if (pathname !== "/") return;
            event.preventDefault();
            setOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <Image
            src="/brand/logo-10.png"
            alt="Nera 10 Years"
            width={280}
            height={72}
            className="h-12 w-auto bg-transparent md:h-14"
            unoptimized
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-ink/80 lg:flex">
          {NAV.map((item) => {
            const active =
              item.href === "/company"
                ? pathname === "/company"
                : item.href === "/contact"
                  ? pathname === "/contact"
                  : false;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={(event) => handleNavClick(event, item.href)}
                className={`transition-colors hover:text-nera ${active ? "text-nera" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <Button href="/growth-review" arrow>
              Get Growth Review
            </Button>
          </div>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/8 lg:hidden"
            aria-label="Open menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <X className="h-5 w-5" strokeWidth={1.75} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-black/5 bg-white px-5 py-5 lg:hidden">
          <div className="flex flex-col gap-4 text-base font-medium">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(event) => handleNavClick(event, item.href)}
                className="py-1"
              >
                {item.label}
              </Link>
            ))}
            <Button href="/growth-review" arrow>
              Get Growth Review
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
