"use client";

import { Icon } from "@/lib/icons";

const stats = [
  { icon: "star", value: "10+", label: "Years" },
  { icon: "users", value: "100+", label: "Brands" },
  { icon: "globe", value: "10+", label: "Patented Systems" },
  { icon: "pin", value: "10+", label: "Countries" },
];

export function CompanyStats() {
  return (
    <section className="bg-[#fbf8f3] py-12">
      <div className="container-wide grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex min-w-0 items-center gap-3 rounded-[24px] bg-white px-4 py-5 sm:gap-3.5 sm:px-6 sm:py-6"
          >
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sand text-nera sm:h-12 sm:w-12">
              <Icon name={stat.icon} className="h-5 w-5 sm:h-6 sm:w-6" />
            </span>
            <div className="min-w-0">
              <p className="text-lg font-semibold tracking-tight text-ink sm:text-xl">
                {stat.value}
              </p>
              <p className="text-[13px] leading-snug text-muted sm:text-base">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
