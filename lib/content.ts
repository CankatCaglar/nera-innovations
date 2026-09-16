import type { System } from "./types";

export {
  SiteContentProvider,
  useSiteContent,
  loadSiteContent,
} from "@/components/content/SiteContentProvider";

function sortByOrder<T extends { order: number }>(items: T[]) {
  return [...items].sort((a, b) => a.order - b.order);
}

export function featuredSystems(systems: System[]) {
  return sortByOrder(systems.filter((system) => system.featured)).slice(0, 4);
}

export function microSystems(systems: System[]) {
  return sortByOrder(systems.filter((system) => !system.featured));
}

export function getSystemBySlug(systems: System[], slug: string) {
  return systems.find((system) => system.slug === slug);
}

export function hasSystemDetailPage(system: System) {
  if (typeof system.hasDetailPage === "boolean") return system.hasDetailPage;
  return system.kind !== "micro";
}

export function systemHref(system: System) {
  if (system.kind === "external") return system.appUrl || null;
  if (!hasSystemDetailPage(system)) return null;
  return `/systems/${system.slug}`;
}
