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
      <div className="container-wide grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center justify-start gap-3.5 rounded-[24px] bg-white px-6 py-6"
          >
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sand text-nera">
              <Icon name={stat.icon} className="h-6 w-6" />
            </span>
            <div className="flex items-baseline gap-2">
              <p className="text-xl font-semibold tracking-tight text-ink">
                {stat.value}
              </p>
              <p className="text-base text-muted">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
