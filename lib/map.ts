import type { MapLocation } from "./types";

const STORAGE_KEY = "nera-map-locations";

/** Matches public/images/world-land.svg (lon -180..180, lat 84..-56). */
export function projectLonLat(lon: number, lat: number) {
  return {
    x: ((lon + 180) / 360) * 100,
    y: ((84 - lat) / 140) * 100,
  };
}

export const COUNTRY_COORDS: Record<string, { lon: number; lat: number }> = {
  Canada: { lon: -114.0, lat: 56.1 },
  USA: { lon: -87.6, lat: 41.9 },
  Mexico: { lon: -102.5, lat: 23.6 },
  Brazil: { lon: -51.9, lat: -14.2 },
  "United Kingdom": { lon: -1.5, lat: 52.4 },
  Germany: { lon: 10.45, lat: 51.16 },
  France: { lon: 2.35, lat: 46.6 },
  Estonia: { lon: 24.75, lat: 59.44 },
  Türkiye: { lon: 27.14, lat: 38.42 },
  UAE: { lon: 55.27, lat: 25.2 },
  India: { lon: 78.96, lat: 20.59 },
  Japan: { lon: 139.69, lat: 35.68 },
  Australia: { lon: 133.8, lat: -25.3 },
  "South Africa": { lon: 24.7, lat: -28.5 },
};

export type PinAlign = "left" | "right" | "center";
export type PinSide = "above" | "below";
export type PinPlacement = { align: PinAlign; side: PinSide };

type Box = { left: number; top: number; right: number; bottom: number };

const LABEL = { w: 11.5, h: 11, gap: 1.6 };

function labelBox(x: number, y: number, align: PinAlign, side: PinSide): Box {
  const left =
    align === "left" ? x - LABEL.w : align === "right" ? x : x - LABEL.w / 2;
  const top = side === "above" ? y - LABEL.h - LABEL.gap : y + LABEL.gap;
  return { left, top, right: left + LABEL.w, bottom: top + LABEL.h };
}

function overlaps(a: Box, b: Box) {
  return !(
    a.right < b.left - 0.8 ||
    a.left > b.right + 0.8 ||
    a.bottom < b.top - 0.6 ||
    a.top > b.bottom + 0.6
  );
}

function inBounds(box: Box) {
  return box.left >= -1 && box.right <= 101 && box.top >= -1 && box.bottom <= 102;
}

function slotOrder(location: MapLocation): PinPlacement[] {
  const north = location.y < 26;
  const south = location.y > 40;
  const west = location.x < 28;
  const east = location.x > 78;

  const above: PinPlacement[] = west
    ? [
        { align: "right", side: "above" },
        { align: "center", side: "above" },
        { align: "left", side: "above" },
      ]
    : east
      ? [
          { align: "left", side: "above" },
          { align: "center", side: "above" },
          { align: "right", side: "above" },
        ]
      : [
          { align: "center", side: "above" },
          { align: "right", side: "above" },
          { align: "left", side: "above" },
        ];

  const below: PinPlacement[] = west
    ? [
        { align: "right", side: "below" },
        { align: "center", side: "below" },
        { align: "left", side: "below" },
      ]
    : east
      ? [
          { align: "left", side: "below" },
          { align: "center", side: "below" },
          { align: "right", side: "below" },
        ]
      : [
          { align: "center", side: "below" },
          { align: "right", side: "below" },
          { align: "left", side: "below" },
        ];

  if (north) return [...above, ...below];
  if (south) return [...below, ...above];
  return [...above, ...below];
}

/** Keeps pin dots on lon/lat and fans labels so they do not sit on each other. */
export function placeMapLabels(locations: MapLocation[]): Map<string, PinPlacement> {
  const placed: { id: string; box: Box; placement: PinPlacement }[] = [];
  const ordered = [...locations].sort((a, b) => a.y - b.y || a.x - b.x);

  for (const location of ordered) {
    const slots = slotOrder(location);
    let chosen: PinPlacement | undefined;

    for (const slot of slots) {
      const box = labelBox(location.x, location.y, slot.align, slot.side);
      if (!inBounds(box)) continue;
      if (placed.some((item) => overlaps(box, item.box))) continue;
      chosen = slot;
      placed.push({ id: location.id, box, placement: slot });
      break;
    }

    if (!chosen) {
      const fallback = slots[0];
      placed.push({
        id: location.id,
        box: labelBox(location.x, location.y, fallback.align, fallback.side),
        placement: fallback,
      });
    }
  }

  return new Map(placed.map((item) => [item.id, item.placement]));
}

export function loadLocalLocations(): MapLocation[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as MapLocation[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function persistLocalLocations(locations: MapLocation[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(locations));
}

export function upsertLocalLocation(location: MapLocation) {
  const current = loadLocalLocations().filter((item) => item.id !== location.id);
  persistLocalLocations([...current, location]);
}

export function removeLocalLocation(id: string) {
  persistLocalLocations(loadLocalLocations().filter((item) => item.id !== id));
}
