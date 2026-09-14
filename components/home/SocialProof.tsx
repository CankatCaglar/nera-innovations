"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/lib/icons";

const quotes = [
  {
    brand: "SISKON",
    quote:
      "Working with Nera started a more durable growth path for our brand. Their strategy, creative work and the way the team operates helped us lift digital visibility in a way we can actually measure.",
    name: "Deniz Aksoy",
    role: "Marketing Director",
  },
  {
    brand: "DTC",
    quote:
      "Getting the product in front of the right audience came down to content and campaigns that were built with intent. Nera ran the process end to end and left a clear mark on the brand.",
    name: "Murat Yılmaz",
    role: "Brand Manager",
  },
  {
    brand: "AI SaaS",
    quote:
      "We were scaling quickly, and Nera’s strategic support became a real advantage. Their content and performance work helped us show up with more weight in international markets.",
    name: "Ece Demir",
    role: "Growth Team",
  },
  {
    brand: "Consumer AI",
    quote:
      "Nera’s contribution to our US market plan was substantial. They did not stop at content; the campaigns created qualified engagement and a direct line into sales.",
    name: "Ali Karaca",
    role: "Marketing Lead",
  },
  {
    brand: "HR Technology",
    quote:
      "We needed communication that could last, not a one-off burst. Nera made that need precise and then kept a steady, natural content rhythm in place.",
    name: "Selin Oral",
    role: "Growth Director",
  },
];

export function SocialProof() {
  const scroller = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const sync = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const width = Math.max(el.clientWidth, 1);
    const max = Math.max(el.scrollWidth - width, 0);
    setPages(max > 8 ? Math.max(2, Math.ceil(el.scrollWidth / width)) : 1);
    setPage(Math.min(Math.round(el.scrollLeft / width), 99));
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
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.85;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  function goTo(index: number) {
    const el = scroller.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
  }

  return (
    <section className="bg-white py-20">
      <div className="container-wide">
        <div className="max-w-2xl">
          <p className="eyebrow">What brands say</p>
          <h2 className="heading-display mt-3 text-4xl text-ink sm:text-5xl">
            Bigger results, built <span className="text-gold">together</span>.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted">
            We work with brands across industries on long-term growth systems,
            so every campaign, lead and conversation can compound.
          </p>
          <span className="mt-6 block h-0.5 w-10 bg-gold" />
        </div>

        <div
          ref={scroller}
          className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth py-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {quotes.map((item) => (
            <article
              key={item.brand}
              className="relative flex min-h-[280px] w-[85%] shrink-0 snap-start flex-col rounded-[28px] border border-black/5 bg-white p-6 sm:w-[calc((100%-1.25rem)/2)] sm:p-7 lg:w-[calc((100%-2.5rem)/3)] xl:w-[calc((100%-3.75rem)/4)]"
            >
              <p className="text-sm font-semibold tracking-tight text-gold">
                {item.brand}
              </p>
              <p className="mt-4 flex-1 text-sm leading-7 text-muted">
                {item.quote}
              </p>
              <div className="mt-6 border-t border-line pt-5">
                <p className="text-sm font-semibold tracking-tight text-ink">
                  {item.name}
                </p>
                <p className="mt-0.5 text-xs text-soft">{item.role}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            aria-label="Previous testimonials"
            onClick={() => go(-1)}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/6 bg-white text-nera shadow-sm transition-opacity hover:border-nera/40 ${
              canPrev ? "" : "pointer-events-none opacity-30"
            }`}
          >
            <Icon name="arrow-left" className="h-4 w-4" />
          </button>
          <div className="flex gap-1.5">
            {Array.from({ length: pages }, (_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to page ${index + 1}`}
                onClick={() => goTo(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === page ? "w-4 bg-nera" : "w-1.5 bg-nera/25"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next testimonials"
            onClick={() => go(1)}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/6 bg-white text-nera shadow-sm transition-opacity hover:border-nera/40 ${
              canNext ? "" : "pointer-events-none opacity-30"
            }`}
          >
            <Icon name="arrow" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
