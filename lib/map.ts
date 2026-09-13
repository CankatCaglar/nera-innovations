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
  Canada: { lon: -120.0, lat: 55.2 },
  USA: { lon: -80.0, lat: 38.0 },
  Mexico: { lon: -102.5, lat: 23.6 },
  Brazil: { lon: -51.9, lat: -14.2 },
  "United Kingdom": { lon: -1.5, lat: 52.4 },
  Germany: { lon: 10.45, lat: 51.16 },
  France: { lon: 2.35, lat: 46.6 },
  Estonia: { lon: 25.0, lat: 58.6 },
  Türkiye: { lon: 35.2, lat: 39.0 },
  UAE: { lon: 54.4, lat: 24.4 },
  India: { lon: 78.96, lat: 20.59 },
  Japan: { lon: 138.25, lat: 36.2 },
  Australia: { lon: 133.8, lat: -25.3 },
  "South Africa": { lon: 24.7, lat: -28.5 },
};

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
