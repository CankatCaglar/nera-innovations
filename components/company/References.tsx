"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { brandReferences } from "@/lib/references";
import { Icon } from "@/lib/icons";

export function References() {
  const scroller = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const sync = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const max = Math.max(el.scrollWidth - el.clientWidth, 0);
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < max - 8);
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const frame = requestAnimationFrame(sync);
    const observer = new ResizeObserver(sync);
    observer.observe(el);
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  function go(dir: -1 | 1) {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <section className="bg-[#fbf8f3] py-20">
      <div className="container-wide grid items-center gap-10 lg:grid-cols-[0.78fr_1.22fr]">
        <div>
          <p className="eyebrow">Trusted by leading brands</p>
          <h2 className="heading-display mt-3 max-w-md text-4xl text-ink sm:text-5xl">
            Brands we are proud to work <span className="text-gold">with</span>.
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted">
            Over the last 10 years we have built marketing, technology and
            data-driven growth systems with leading brands across industries.
          </p>
        </div>

        <div>
          <div
            ref={scroller}
            className="overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="grid grid-flow-col grid-rows-2 auto-cols-[minmax(116px,140px)] gap-3 sm:auto-cols-[minmax(128px,148px)]">
              {brandReferences.map((brand) => (
                <div
                  key={brand.id}
                  className="flex aspect-square items-center justify-center rounded-[22px] bg-white px-3 text-center"
                >
                  <p className="text-[13px] font-semibold tracking-tight text-ink sm:text-sm">
                    {brand.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 flex justify-end gap-2">
            <button
              type="button"
              aria-label="Previous brands"
              onClick={() => go(-1)}
              className={`inline-flex h-9 w-9 items-center justify-center text-nera ${
                canPrev ? "" : "pointer-events-none opacity-30"
              }`}
            >
              <Icon name="arrow-left" className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next brands"
              onClick={() => go(1)}
              className={`inline-flex h-9 w-9 items-center justify-center text-nera ${
                canNext ? "" : "pointer-events-none opacity-30"
              }`}
            >
              <Icon name="arrow" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
