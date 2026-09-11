"use client";

import Link from "next/link";
import { featuredSystems, useSiteContent } from "@/lib/content";
import { Icon } from "@/lib/icons";

export function CompanySystems() {
  const { systems } = useSiteContent();
  const featured = featuredSystems(systems);

  return (
    <section className="bg-white py-20">
      <div className="container-wide">
        <div className="max-w-2xl">
          <p className="eyebrow">Our systems</p>
          <h2 className="heading-display mt-3 text-4xl text-ink sm:text-5xl">
            Where strategy, creativity and technology <span className="text-gold">meet</span>.
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            We combine marketing expertise with technology and data to create
            integrated systems. From strategy to execution, we design solutions
            that make a real difference.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {featured.map((system) => {
            const href = system.kind === "external" ? system.appUrl : `/systems/${system.slug}`;
            return (
              <Link
                key={system.id}
                href={href}
                target={system.kind === "external" ? "_blank" : undefined}
                className="card flex aspect-square flex-col justify-between rounded-[28px] p-6"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sand text-nera">
                  <Icon name={system.icon} className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">{system.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{system.tagline}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
