"use client";

import { Icon } from "@/lib/icons";

const stats = [
  { icon: "star", value: "10+", label: "Years" },
  { icon: "users", value: "100+", label: "Brands" },
  { icon: "globe", value: "10+", label: "Patented systems" },
  { icon: "pin", value: "4+", label: "Countries" },
];

export function CompanyStats() {
  return (
    <section className="bg-[#fbf8f3] py-12">
      <div className="container-wide grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-3 rounded-[24px] bg-white px-5 py-5"
          >
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sand text-nera">
              <Icon name={stat.icon} className="h-5 w-5" />
            </span>
              <div className="flex items-baseline gap-1.5">
                <p className="text-lg font-semibold tracking-tight text-ink">
                  {stat.value}
                </p>
                <p className="text-sm text-muted">{stat.label}</p>
              </div>
          </div>
        ))}
      </div>
    </section>
  );
}
