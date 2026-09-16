"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useAdmin } from "@/components/admin/AdminProvider";
import { featuredSystems, microSystems, useSiteContent } from "@/lib/content";
import { Icon } from "@/lib/icons";
import type { System } from "@/lib/types";

function systemHref(system: System) {
  if (system.kind === "external") return system.appUrl;
  return `/systems/${system.slug}`;
}

function MicroSystemsRail({
  systems,
  isAdmin,
  featuredCount,
  onToggle,
  onDelete,
}: {
  systems: System[];
  isAdmin: boolean;
  featuredCount: number;
  onToggle: (system: System) => void;
  onDelete: (system: System) => void;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [overflowing, setOverflowing] = useState(false);

  function sync() {
    const el = scroller.current;
    if (!el) return;
    const width = Math.max(el.clientWidth, 1);
    const max = Math.max(el.scrollWidth - width, 0);
    setOverflowing(max > 8);
    setPages(max > 8 ? Math.max(2, Math.ceil(el.scrollWidth / width)) : 1);
    setPage(Math.round(el.scrollLeft / width));
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < max - 8);
  }

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
  }, [systems.length]);

  function go(dir: -1 | 1) {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  }

  function goTo(index: number) {
    const el = scroller.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
  }

  return (
    <div className="mt-6">
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          aria-label="Previous systems"
          onClick={() => go(-1)}
          className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/6 bg-white text-nera shadow-sm transition-opacity hover:border-nera/40 ${
            canPrev ? "" : "pointer-events-none opacity-30"
          }`}
        >
          <Icon name="arrow-left" className="h-4 w-4" />
        </button>
        <div
          ref={scroller}
          className={`flex w-0 min-w-0 flex-1 snap-x snap-mandatory items-center gap-3 overflow-x-auto scroll-smooth px-1 py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
            overflowing ? "" : "justify-center"
          }`}
        >
          {systems.map((system) => {
            const href = systemHref(system);
            const external = system.kind === "external";
            return (
              <div
                key={system.id}
                className={`relative shrink-0 snap-start ${isAdmin ? "pt-4" : ""}`}
              >
                {isAdmin ? (
                  <>
                    <button
                      type="button"
                      aria-label={`Delete ${system.name}`}
                      onClick={() => onDelete(system)}
                      className="absolute top-0 left-1 z-10 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-nera shadow-sm"
                    >
                      <Icon name="trash" className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      aria-label="Add to home"
                      disabled={featuredCount >= 4}
                      onClick={() => onToggle(system)}
                      className="absolute top-0 right-1 z-10 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-nera shadow-sm disabled:opacity-40"
                    >
                      <Icon name="plus" className="h-3.5 w-3.5" />
                    </button>
                  </>
                ) : null}
                <Link
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-black/6 bg-white px-4 py-2.5 text-sm font-medium text-ink shadow-sm transition-colors hover:border-nera/40 hover:text-nera"
                >
                  <Icon name={system.icon} className="h-4 w-4 text-nera" />
                  {system.name}
                </Link>
              </div>
            );
          })}
        </div>
        <button
          type="button"
          aria-label="Next systems"
          onClick={() => go(1)}
          className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/6 bg-white text-nera shadow-sm transition-opacity hover:border-nera/40 ${
            canNext ? "" : "pointer-events-none opacity-30"
          }`}
        >
          <Icon name="arrow" className="h-4 w-4" />
        </button>
      </div>
      {pages > 1 ? (
        <div className="mt-4 flex justify-center gap-1.5">
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
      ) : (
        <div className="mt-4 flex justify-center">
          <span className="h-1.5 w-1.5 rounded-full bg-nera/40" />
        </div>
      )}
    </div>
  );
}

function SystemCard({
  system,
  isAdmin,
  featuredCount,
  onToggle,
  onDelete,
}: {
  system: System;
  isAdmin: boolean;
  featuredCount: number;
  onToggle: (system: System) => void;
  onDelete: (system: System) => void;
}) {
  const href = systemHref(system);
  const external = system.kind === "external";
  const canFeature = system.featured || featuredCount < 4;

  return (
    <article className="card group relative overflow-hidden rounded-[28px] p-6 sm:p-7">
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className="grid gap-5 transition-transform hover:-translate-y-0.5 sm:grid-cols-[minmax(0,1.05fr)_minmax(180px,1fr)] sm:items-center"
      >
        <div className="flex min-w-0 flex-col">
          <div className="flex items-center gap-3">
            <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-2xl border border-black/6 bg-white">
              {system.logo ? (
                <Image
                  src={system.logo}
                  alt=""
                  fill
                  sizes="44px"
                  className={
                    system.id === "repora" || system.id === "nera-social"
                      ? "object-contain p-1"
                      : "object-cover"
                  }
                />
              ) : null}
            </span>
            <h3 className="text-[28px] leading-none font-semibold tracking-tight text-ink">
              {system.name}
            </h3>
          </div>
          {system.tag ? (
            <p className="mt-5 text-sm font-medium text-gold">{system.tag}</p>
          ) : null}
          <p className="mt-2 flex-1 text-sm leading-6 text-muted">{system.tagline}</p>
          <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink group-hover:border-nera group-hover:text-nera">
            {external ? "Visit" : "View product"}
            <Icon name="arrow" className="h-4 w-4" />
          </span>
        </div>
        {system.image ? (
          <Image
            src={system.image}
            alt=""
            width={800}
            height={530}
            sizes="(min-width: 1024px) 22vw, 80vw"
            className={
              system.id === "score" || system.id === "flowin"
                ? "h-auto w-full object-contain"
                : "h-auto w-full rounded-[22px]"
            }
          />
        ) : (
          <span className="inline-flex h-40 items-center justify-center rounded-[22px] bg-sand text-nera">
            <Icon name={system.icon} className="h-10 w-10" />
          </span>
        )}
      </Link>
      {isAdmin ? (
        <div className="absolute bottom-4 right-4 z-10 flex gap-2">
          <button
            type="button"
            aria-label={system.featured ? "Remove from home" : "Add to home"}
            disabled={!canFeature && !system.featured}
            onClick={() => onToggle(system)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-nera shadow-sm disabled:opacity-40"
          >
            <Icon name={system.featured ? "minus" : "plus"} className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label={`Delete ${system.name}`}
            onClick={() => onDelete(system)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-nera shadow-sm"
          >
            <Icon name="trash" className="h-4 w-4" />
          </button>
        </div>
      ) : null}
    </article>
  );
}

export function Systems() {
  const { systems, projects, partners, locations, saveContent } = useSiteContent();
  const { isAdmin } = useAdmin();
  const featured = featuredSystems(systems);
  const micros = microSystems(systems);
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [pendingDelete, setPendingDelete] = useState<System | null>(null);

  async function toggleFeatured(system: System) {
    const currently = systems.filter((item) => item.featured).length;
    if (!system.featured && currently >= 4) return;
    await saveContent({
      projects,
      partners,
      locations,
      systems: systems.map((item) =>
        item.id === system.id ? { ...item, featured: !item.featured } : item,
      ),
    });
  }

  async function deleteSystem(system: System) {
    await saveContent({
      projects,
      partners,
      locations,
      systems: systems.filter((item) => item.id !== system.id),
    });
    setPendingDelete(null);
  }

  async function addSystem() {
    if (!name.trim() || !tagline.trim()) return;
    const slug = name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const next: System = {
      id: slug || `system-${Date.now()}`,
      name: name.trim(),
      slug: slug || `system-${Date.now()}`,
      kind: "micro",
      tagline: tagline.trim(),
      description: tagline.trim(),
      heroTitle: name.trim(),
      heroSubtitle: tagline.trim(),
      appUrl: "",
      tag: "",
      featured: false,
      order: systems.length + 1,
      icon: "spark",
      logo: "",
      features: [],
      faqs: [],
      resourceTitle: `${name.trim()} brief`,
      resourceDescription: tagline.trim(),
    };
    await saveContent({
      projects,
      partners,
      locations,
      systems: [...systems, next],
    });
    setName("");
    setTagline("");
  }

  return (
    <section id="systems" className="overflow-x-hidden bg-cream pt-20 pb-12">
      <div className="container-wide min-w-0">
        <div className="max-w-2xl">
          <h2 className="heading-display text-4xl text-ink sm:text-5xl">
            Systems for Modern <span className="text-gold">Growth</span>
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted">
            We connect the tools behind your marketing, sales, and customer
            journey so every campaign, lead, and opportunity can be tracked,
            automated, and improved.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {featured.map((system) => (
            <SystemCard
              key={system.id}
              system={system}
              isAdmin={isAdmin}
              featuredCount={featured.length}
              onToggle={(item) => void toggleFeatured(item)}
              onDelete={setPendingDelete}
            />
          ))}
        </div>

        {micros.length > 0 ? (
          <MicroSystemsRail
            systems={micros}
            isAdmin={isAdmin}
            featuredCount={featured.length}
            onToggle={(item) => void toggleFeatured(item)}
            onDelete={setPendingDelete}
          />
        ) : null}

        {isAdmin ? (
          <form
            className="mt-8 flex flex-wrap gap-3"
            onSubmit={(event) => {
              event.preventDefault();
              void addSystem();
            }}
          >
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="New system name"
              className="rounded-2xl border border-black/8 bg-white px-4 py-2.5 text-sm"
            />
            <input
              required
              value={tagline}
              onChange={(event) => setTagline(event.target.value)}
              placeholder="Short tagline"
              className="min-w-64 rounded-2xl border border-black/8 bg-white px-4 py-2.5 text-sm"
            />
            <button
              type="submit"
              className="rounded-full bg-nera px-4 py-2.5 text-sm font-semibold text-white"
            >
              Add system
            </button>
          </form>
        ) : null}
      </div>

      {pendingDelete ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-4 sm:items-center"
          onClick={() => setPendingDelete(null)}
        >
          <div
            className="w-full max-w-md rounded-[28px] bg-white p-7 shadow-[0_18px_50px_rgba(148,93,60,0.12)]"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="eyebrow">Delete system</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight">
              Are you sure?
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              {pendingDelete.name} will be removed from the site. This cannot be
              undone.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => void deleteSystem(pendingDelete)}
                className="rounded-full bg-nera px-5 py-3 text-sm font-semibold text-white"
              >
                Yes, delete
              </button>
              <button
                type="button"
                onClick={() => setPendingDelete(null)}
                className="rounded-full border border-black/8 bg-white px-5 py-3 text-sm font-semibold text-ink"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
