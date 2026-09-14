"use client";

import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/constants";
import { BrandIcon } from "@/components/ui/BrandIcon";

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onPointer(event: MouseEvent) {
      if (!panel.current?.contains(event.target as Node)) setOpen(false);
    }

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={panel} className="fixed right-5 bottom-5 z-50">
      {open ? (
        <div className="absolute right-0 bottom-[4.5rem] w-[min(calc(100vw-2.5rem),280px)] overflow-hidden rounded-[24px] border border-black/6 bg-white shadow-[0_18px_50px_rgba(22,19,17,0.16)]">
          <div className="flex items-center gap-3 bg-[#25D366] px-4 py-3.5 text-white">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
              <BrandIcon name="WhatsApp" className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold tracking-tight">Nera</p>
              <p className="text-[11px] text-white/80">Typically replies quickly</p>
            </div>
            <button
              type="button"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
              className="text-lg leading-none text-white/80 hover:text-white"
            >
              ×
            </button>
          </div>
          <div className="p-4">
            <p className="rounded-2xl rounded-tl-md bg-sand px-3.5 py-3 text-sm leading-6 text-ink">
              Hi. How can we help you grow?
            </p>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="mt-3 flex items-center justify-between rounded-2xl border border-black/6 px-3.5 py-3 transition-colors hover:border-nera/40"
            >
              <span>
                <span className="block text-[11px] font-semibold tracking-[0.14em] text-soft uppercase">
                  WhatsApp
                </span>
                <span className="mt-0.5 block text-sm font-semibold text-ink">
                  {SITE.phone}
                </span>
              </span>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366] text-white">
                <BrandIcon name="WhatsApp" className="h-4 w-4" />
              </span>
            </a>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        aria-label={open ? "Close WhatsApp" : "Chat with Nera on WhatsApp"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_rgba(37,211,102,0.35)] transition-transform hover:scale-105"
      >
        <BrandIcon name="WhatsApp" className="h-7 w-7" />
      </button>
    </div>
  );
}
