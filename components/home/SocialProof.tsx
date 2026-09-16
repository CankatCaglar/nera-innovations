"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/constants";
import { Icon } from "@/lib/icons";
import { BrandIcon } from "@/components/ui/BrandIcon";

const quotes = [
  {
    brand: "Tatilciden",
    quote:
      "Working with Nera Marketing Technologies & Workshops was a genuinely great experience. Their solution-focused approach and professionalism made a real difference in our processes, and they stayed in partnership with us at every step.",
    name: "Atakan Balta",
    url: SITE.googleReviews,
  },
  {
    brand: "Altınok Palet",
    quote:
      "They produce strong work, and they do not only do what they are asked. They look for how we can make a difference. The team is young, communicative and open to feedback. They listen to what the client wants and still guide with a professional point of view. They put a lasting relationship ahead of a quick win, which makes it easy to enjoy the work and keep the quality high.",
    name: "Deniz Altınok",
    url: "https://share.google/zMxLfoUZGm8fGJFkd",
  },
  {
    brand: "Bimaks",
    quote:
      "Nera Marketing is the professional partner I trust with my social media and web. I am very satisfied, and I recommend them.",
    name: "Alper Tunga Dost",
    url: "https://share.google/NaHCQ2A5jJ566duNY",
  },
  {
    brand: "Gorg",
    quote:
      "Marketing management is serious work and it has to be done by a team that knows the craft. At Nera you work with people who enjoy what they do, who are knowledgeable and who keep the process enjoyable. Their careful, creative solutions make the journey easier, they are extremely disciplined with time, and our brands feel in safe hands. Glad Nera is here.",
    name: "Ömer Sürücü",
    url: "https://share.google/5SrfPEhi9HRu9661A",
  },
  {
    brand: "Swatchloop",
    quote:
      "As Swatchloop, we really enjoy working with Ogün and the team on social media. They helped us reach our social media goals and much more. They are a responsive team that finds a solution to every problem, fast.",
    name: "Gökberk Devrim",
    url: "https://share.google/kQJvlsruqJvMnheXB",
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
          className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth py-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {quotes.map((item) => (
            <a
              key={item.brand}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`Read ${item.name}'s Google review`}
              className="group relative flex min-h-[280px] w-[85%] shrink-0 snap-start flex-col rounded-[28px] border border-black/5 bg-white p-6 transition-transform duration-200 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nera/40 sm:w-[calc((100%-1.25rem)/2)] sm:p-7 lg:w-[calc((100%-2.5rem)/3)] xl:w-[calc((100%-3.75rem)/4)]"
            >
              <p className="text-sm font-semibold tracking-tight text-gold">
                {item.brand}
              </p>
              <p className="mt-4 flex-1 text-sm leading-7 text-muted">
                {item.quote}
              </p>
              <div className="mt-6 flex items-end justify-between gap-3 border-t border-line pt-5">
                <p className="text-sm font-semibold tracking-tight text-ink">
                  {item.name}
                </p>
                <span className="inline-flex h-5 items-center gap-1.5 text-[11px] font-medium text-soft transition-colors group-hover:text-nera">
                  <BrandIcon name="Google" className="h-3.5 w-3.5" />
                  <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-200 group-hover:max-w-[5.5rem] group-hover:opacity-100">
                    View review
                  </span>
                </span>
              </div>
            </a>
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
