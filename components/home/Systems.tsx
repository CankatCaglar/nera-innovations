"use client";

import Image from "next/image";
import Link from "next/link";
import { featuredSystems, microSystems, useSiteContent } from "@/lib/content";
import { Icon } from "@/lib/icons";
import type { System } from "@/lib/types";

function systemHref(system: System) {
  if (system.kind === "external") return system.appUrl;
  return `/systems/${system.slug}`;
}

function SystemCard({ system }: { system: System }) {
  const href = systemHref(system);
  const external = system.kind === "external";

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="card group flex min-h-[320px] flex-col overflow-hidden rounded-[28px] p-6 transition-transform hover:-translate-y-1"
    >
      <div className="relative mb-6 flex h-36 items-center justify-center overflow-hidden rounded-2xl bg-sand">
        {system.image ? (
          <Image
            src={system.image}
            alt=""
            fill
            className="object-contain p-4"
          />
        ) : (
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-nera shadow-sm">
            <Icon name={system.icon} className="h-7 w-7" />
          </span>
        )}
      </div>
      <h3 className="text-2xl font-semibold tracking-tight text-ink">{system.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-muted">{system.tagline}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink group-hover:text-nera">
        {external ? "Visit" : "View product"}
        <Icon name={external ? "external" : "arrow"} className="h-4 w-4" />
      </span>
    </Link>
  );
}

export function Systems() {
  const { systems } = useSiteContent();
  const featured = featuredSystems(systems);
  const micros = microSystems(systems);

  return (
    <section id="systems" className="bg-cream py-20">
      <div className="container-wide">
        <div className="max-w-2xl">
          <p className="eyebrow">Systems</p>
          <h2 className="heading-display mt-3 text-4xl text-ink sm:text-5xl">
            Systems for modern <span className="text-gold">growth</span>
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted">
            Social first. Then the product stack that turns attention into a
            sales opportunity, and the smaller tools that keep the system moving.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featured.map((system) => (
            <SystemCard key={system.id} system={system} />
          ))}
        </div>

        {micros.length > 0 ? (
          <div className="mt-8 flex flex-wrap gap-3">
            {micros.map((system) => (
              <Link
                key={system.id}
                href={`/systems/${system.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-black/6 bg-white px-4 py-2.5 text-sm font-medium text-ink shadow-sm transition-colors hover:border-nera/40 hover:text-nera"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sand text-nera">
                  <Icon name={system.icon} className="h-4 w-4" />
                </span>
                {system.name}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
