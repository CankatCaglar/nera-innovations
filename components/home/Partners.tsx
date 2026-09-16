"use client";

import { useSiteContent } from "@/lib/content";
import { BrandIcon } from "@/components/ui/BrandIcon";

export function PartnerRow() {
  const { partners } = useSiteContent();

  const items = [...partners].sort((a, b) => a.order - b.order);

  return (
    <div className="grid min-w-0 grid-cols-2 gap-x-4 gap-y-5 lg:flex lg:items-center lg:gap-0 lg:overflow-x-auto lg:overscroll-x-contain lg:scroll-smooth lg:[-ms-overflow-style:none] lg:[scrollbar-width:none] lg:[&::-webkit-scrollbar]:hidden">
      {items.map((partner, index) => (
        <div
          key={partner.id}
          className="flex min-w-0 items-center lg:shrink-0"
        >
          {index > 0 ? (
            <span className="mx-4 hidden h-8 w-px shrink-0 bg-line lg:mx-6 lg:block" />
          ) : null}
          <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <BrandIcon
              name={partner.name}
              className="h-6 w-6 shrink-0 text-ink sm:h-7 sm:w-7"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold tracking-tight text-ink">
                {partner.name}
              </p>
              <p className="truncate text-xs text-soft">{partner.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Partners() {
  return (
    <section className="bg-white py-16">
      <div className="container-wide">
        <div className="card overflow-x-clip rounded-[32px] px-5 py-8 sm:px-8 lg:px-10">
          <div className="grid min-w-0 items-center gap-8 lg:grid-cols-[0.55fr_minmax(0,1.45fr)]">
            <div>
              <p className="eyebrow">Our partners</p>
              <h2 className="heading-display mt-3 text-[25px] text-ink sm:text-[28px] lg:whitespace-nowrap">
                Stronger together.
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-7 text-muted">
                We collaborate with leading platforms to deliver smarter, more
                effective growth solutions.
              </p>
              <span className="mt-5 block h-0.5 w-10 bg-gold" />
            </div>
            <PartnerRow />
          </div>
        </div>
      </div>
    </section>
  );
}
