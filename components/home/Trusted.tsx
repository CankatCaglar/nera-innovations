"use client";

import { useSiteContent } from "@/lib/content";
import { Icon } from "@/lib/icons";
import { WorldMap } from "@/components/ui/WorldMap";

const stats = [
  { icon: "users", value: "100+", label: "Brands" },
  { icon: "globe", value: "10+", label: "Systems" },
  { icon: "star", value: "10", label: "Years" },
];

export function Trusted() {
  const { locations } = useSiteContent();

  return (
    <section id="company" className="bg-white py-20">
      <div className="container-wide grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="eyebrow">About Nera</p>
          <h2 className="heading-display mt-3 text-4xl text-ink sm:text-5xl">
            Trusted by brands
            <br />
            across the <span className="text-gold">world</span>.
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted">
            From local businesses to global brands, Nera teams have built growth
            systems for ambitious companies across industries.
          </p>
          <div className="mt-8 flex flex-wrap gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sand text-nera">
                  <Icon name={stat.icon} className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-lg font-semibold tracking-tight">{stat.value}</p>
                  <p className="text-sm text-muted">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <WorldMap locations={locations} className="min-h-[380px]" />
      </div>
    </section>
  );
}
