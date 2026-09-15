"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { brandReferences } from "@/lib/references";
import { Icon } from "@/lib/icons";

/* Each logo shape gets its own box so every tile reads at the same optical size. */
const logoFit = {
  crest: "h-[80%] w-[80%]",
  stacked: "h-[78%] w-[80%]",
  plate: "h-[64%] w-[68%]",
  wide: "h-[54%] w-[86%]",
} as const;

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
      <div className="container-wide grid items-center gap-10 lg:grid-cols-[minmax(240px,0.34fr)_minmax(0,1fr)]">
        <div>
          <p className="eyebrow">Trusted by leading brands</p>
          <h2 className="heading-display mt-3 max-w-md text-4xl text-ink sm:text-5xl">
            Brands we are proud to
            <br />
            work <span className="text-gold">with</span>.
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted">
            Over the last 10 years we have built marketing, technology and
            data-driven growth systems with leading brands across industries.
          </p>
        </div>

        <div className="min-w-0 lg:justify-self-stretch">
          <div
            ref={scroller}
            className="overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] lg:overflow-visible [&::-webkit-scrollbar]:hidden"
          >
            <div className="ml-auto grid w-full grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-flow-col lg:grid-cols-6 lg:grid-rows-2">
              {brandReferences.map((brand) => (
                <div
                  key={brand.id}
                  className="relative flex aspect-square items-center justify-center rounded-[22px] bg-white text-center"
                >
                  <div className={`relative ${logoFit[brand.fit]}`}>
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      fill
                      sizes="160px"
                      unoptimized
                      className="object-contain"
                    />
                  </div>
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
