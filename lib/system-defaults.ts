import { seedSystems } from "./seed";
import type { System, SystemFeature } from "./types";

export function getSeededSystem(id: string) {
  return seedSystems.find((item) => item.id === id) ?? null;
}

function text(value?: string) {
  return (value ?? "").trim();
}

export function isHeroChanged(system: System, seeded: System) {
  return (
    text(system.name) !== text(seeded.name) ||
    text(system.heroTitle) !== text(seeded.heroTitle) ||
    text(system.heroSubtitle) !== text(seeded.heroSubtitle) ||
    text(system.image) !== text(seeded.image) ||
    text(system.ctaLabel) !== text(seeded.ctaLabel)
  );
}

export function isFeatureChanged(feature: SystemFeature, seeded?: SystemFeature) {
  if (!seeded) return true;
  const points = feature.points ?? [];
  const original = seeded.points ?? [];
  return (
    text(feature.title) !== text(seeded.title) ||
    text(feature.body) !== text(seeded.body) ||
    text(feature.image) !== text(seeded.image) ||
    points.length !== original.length ||
    points.some((point, index) => text(point) !== text(original[index]))
  );
}

export function isDetailPageChanged(system: System, seeded: System) {
  if (isHeroChanged(system, seeded)) return true;
  if (system.features.length !== seeded.features.length) return true;
  return system.features.some((feature, index) =>
    isFeatureChanged(feature, seeded.features[index]),
  );
}

export function restoreDetailDefaults(current: System, seeded: System): System {
  return {
    ...current,
    name: seeded.name,
    heroTitle: seeded.heroTitle,
    heroSubtitle: seeded.heroSubtitle,
    image: seeded.image,
    ctaLabel: seeded.ctaLabel,
    features: seeded.features.map((feature) => ({
      ...feature,
      points: feature.points ? [...feature.points] : undefined,
    })),
  };
}
