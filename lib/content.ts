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
