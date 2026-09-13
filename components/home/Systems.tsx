"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAdmin } from "@/components/admin/AdminProvider";
import { featuredSystems, microSystems, useSiteContent } from "@/lib/content";
import { Icon } from "@/lib/icons";
import type { System } from "@/lib/types";

function systemHref(system: System) {
  if (system.kind === "external") return system.appUrl;
  return `/systems/${system.slug}`;
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
    <article className="card group relative flex min-h-[320px] flex-col overflow-hidden rounded-[28px] p-6">
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className="flex flex-1 flex-col transition-transform hover:-translate-y-0.5"
      >
        <div className="relative mb-6 flex h-40 items-center justify-center overflow-hidden rounded-2xl bg-transparent">
          {system.image ? (
            <Image
              src={system.image}
              alt=""
              fill
              sizes="(min-width: 1280px) 280px, (min-width: 768px) 40vw, 90vw"
              className="object-contain"
            />
          ) : (
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-sand text-nera">
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
      {isAdmin ? (
        <div className="absolute top-4 right-4 flex gap-2">
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
      featured: false,
      order: systems.length + 1,
      icon: "spark",
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
          <div className="mt-8 flex flex-wrap gap-3">
            {micros.map((system) => {
              const href = systemHref(system);
              const external = system.kind === "external";
              return (
                <div key={system.id} className="relative pt-4">
                  {isAdmin ? (
                    <>
                      <button
                        type="button"
                        aria-label={`Delete ${system.name}`}
                        onClick={() => setPendingDelete(system)}
                        className="absolute top-0 left-1 z-10 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-nera shadow-sm"
                      >
                        <Icon name="trash" className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        aria-label="Add to home"
                        disabled={featured.length >= 4}
                        onClick={() => void toggleFeatured(system)}
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
                    className="inline-flex items-center gap-2 rounded-full border border-black/6 bg-white px-4 py-2.5 text-sm font-medium text-ink shadow-sm transition-colors hover:border-nera/40 hover:text-nera"
                  >
                    <Icon name={system.icon} className="h-4 w-4 text-nera" />
                    {system.name}
                  </Link>
                </div>
              );
            })}
          </div>
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
